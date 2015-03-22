var modalEdit 	= $('#editModal');
var modalAdd 	= $('#addModal');


// -- on objects added dynamically -- //
$(document).on("click", ".edit i.glyphicon-pencil", function(){
	var parentTag = $( this ).parent().parent();
	//alert("test this "+parentTag);		 
	//parentTag.find(".title").text("test");
	//alert( parentTag.find(".url ul li").text() );	
	 
	// get values
	modalEdit.find('#site-title').val( parentTag.find(".title").text() )
	modalEdit.find('#site-url').val( parentTag.find(".url ul li").text() )
	
	modalEdit.find('#site-layer').val( parentTag.data('layer') )	
	modalEdit.find('#site-tags').val( parentTag.data('tags') )
	
	modalEdit.find('#site-id').val( parentTag.data('id') )
	 
	 //call modal
	 $('#editModal').modal({
		keyboard: true
	 })		
})


// -- Delete item -- //
$(document).on("click", ".edit i.glyphicon-remove", function(){
	var parentTag = $( this ).parent().parent();
	removeItem(parentTag.data('id'));
	$( "#"+parentTag.data('id') ).remove();
})


// -- event catches --//
//-- on modal, clean modal --//
modalEdit.on('hidden.bs.modal', function () {
    cleanEditModal();//clean modal
})

// -- on doc ready -- //
$(document).ready(function(){
	
	$("#editModal .btn-success").click(function(){	
		// get values
		var title = modalEdit.find('#site-title').val()
		var url = modalEdit.find('#site-url').val()
		var id = modalEdit.find('#site-id').val()
		var layer = modalEdit.find('#site-layer').val()
		var tags = modalEdit.find('#site-tags').val()
		
		saveItem(id,title,url,layer,tags)
		
		//update item's display
		$('#'+id).find('.url').text(url);
		$('#'+id).find('.title').text(title);
		$('#'+id).find('.title').text(title);
	
		$('#'+id).attr("data-layer",layer); //setter
		
		$('#editModal').modal('hide');//close modal				
	});
	
	// -- Add site -- //	
	$("#addSite").click(function(){
		//call modal
		 $('#addModal').modal({
			keyboard: true
		 })		
	});	
	
	// -- Modal Add site -- //	
	$("#addModal .btn-success").click(function(){	
	
		var title = modalAdd.find('#site-title').val()
		var url = modalAdd.find('#site-url').val()
		var layer = modalAdd.find('#site-layer').val()
		var tags = modalAdd.find('#site-tags').val()
	
		// -- get unquie key --// 
		var newID = ts();
		
		genSiteEntry(newID,title,url,0,0,layer,tags);
		
		saveItem(newID,title,url,layer,tags)
		
		cleanEditModal();//clean modal
		
		$('#addModal').modal('hide')
	});
	
	//load json file
	loadJson()
});	//end of document	


// -- Basic functions -- //
// -- Basic functions -- //
function removeItem(id){	
	$.ajax({
		type:"GET",
		url:"save.php",
		data: {id: id, delete:true },
		dataType: "json",
		datatype:"jsondata",
		success:function(response){
			
		}		
	});
}

function saveItem(id,title,url,layer,tags){
	
	var xx = $('#'+id).offset().left;
	var yy = $('#'+id).offset().top; 
	
	if(!title){
		title =  $('#'+id).find('.title').text()
	}
	if(!url){
		url =  $('#'+id).find('.url').text()
	}	
	if(!layer){
		layer =  $('#'+id).data('layer')
	}
		
	$.ajax({
		type:"GET",
		url:"save.php",
		data: {id: id, url:url, title:title, x:xx, y:yy, layer:layer, tags:tags },
		dataType: "json",
		datatype:"jsondata",
		success:function(response){
			alert("saved" +response);
		}		
	});
}

function loadJson(){
	var jqxhr = $.getJSON( "example2.json?"+ts(), function() {})
	.done(function(data) {
console.log( "success" );
		$.each(data, function(key, val){
			genSiteEntry(key, val.title, val.url, val.x, val.y, val.layer, val.tags)	
		})
	})
	.fail(function() {
console.log( "error" );
	})
	.always(function() {
console.log( "complete" );
	});
}

function cleanEditModal(){
	modalEdit.find('#site-title').val("");
	modalEdit.find('#site-url').val("");
	modalEdit.find('#site-id').val("");	
	modalEdit.find('#site-layer').val("");	
	modalEdit.find('#site-tags').val("");	
	
	modalAdd.find('#site-title').val("");
	modalAdd.find('#site-url').val("");
	modalAdd.find('#site-id').val("");	
	modalAdd.find('#site-layer').val("");
	modalAdd.find('#site-tags').val("");	
}

function ts() {
	var d = new Date();
	var h = addZero(d.getHours(), 2);
	var m = addZero(d.getMinutes(), 2);
	var s = addZero(d.getSeconds(), 2);
	var ms = addZero(d.getMilliseconds(), 3);
	
	var t = "S" + h + m + s + ms;
	return t;
}	

function addZero(x,n) {
	if (x.toString().length < n) {
		x = "0" + x;
	}
	return x;
}

function genSiteEntry(newID, title, url, posX, posY, layer, tags){
	var getLocation = function(href) {
		var l = document.createElement("a");
		l.href = href;
		return l;
	};
	
	var googleService = "http://www.google.com/s2/favicons?domain="
	var siteURL = url
	
	//clean http
	siteURL = siteURL.replace("http://", ""); 
	siteURL = siteURL.replace("https://", ""); 
	
	var ll = getLocation(googleService+siteURL);
//console.log("load google url "+ll);
	var f = new Image();
	
	f.src = ll ;//+ 'favicon.ico';
	f.onerror = function(){
		// fall back
		f.src = "favicon_whale.png";
	}
//alert(ll.hostname);
//alert(f.src);	
	
	var style = "";
	if( posX && posY ) {
		style =  'style="position:absolute; top:'+posY+'px;  left:'+posX+'px;"';
	}

	var h = '<div class="draggie" id="'+newID+'" data-layer="'+layer+'" data-id="'+newID+'" '+style+' >';
	h += '<div class="edit">'
	h += '<i class="glyphicon glyphicon-pencil"></i>';
	h += '<i class="glyphicon glyphicon-remove"></i>';
	h += '</div>';
	h += '<div class="fav"><img src="'+f.src+'" /></div>';
	h += '<div class="info">';
	h += '<div class="title">'+title+'</div>';
	h += '<div class="url">';
	h += '<ul>';
	h += '<li><a href="http://'+siteURL+'" target="_blank">'+siteURL+'</a></li>';
	h += '</ul>';
	h += '</div>';	
	h += '</div>';		
	h += '</div>';

	$("#box").append(h);//add html to dom
	addDraggieListener(newID);//add listener
}

function addDraggieListener(newID){
console.log("Add listener to "+newID);
	var elemA = document.querySelector("#"+newID);
	var draggie = new Draggabilly( elemA, {
		grid: [ 10, 10 ]
	});
	draggie.on( 'dragEnd', onDragEnd ); //add event listener
}

function onDragEnd( instance, event, pointer ) {
	var item = $(this);
console.log(item)	
	
	var a = instance.element.id; //odd way for ID
console.log(instance)	
console.log(instance.element.id)	
	saveItem(a);
	
console.log( 
		'dragEnd on ' + event.type +
		pointer.pageX + ', ' + pointer.pageY +
		' position at ' + instance.position.x + ', ' + instance.position.y + 
		' pp is '
	);
}