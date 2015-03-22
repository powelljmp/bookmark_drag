<!doctype html>
<html>
<head>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">
<link rel="stylesheet" href="styles.css" />

</head>
<body>
<div id="addSite">
	<i class="glyphicon glyphicon-plus"></i>
</div>



<div id="box">
	<!-- 
	<div id="basic" class="draggie">
		<div class="total-centered">Drag me</div>
	</div>
	<div id="gridded">
		<div class="draggie" id="B001" data-id="B001">
			<div class="edit">
				<i class="glyphicon glyphicon-pencil"></i>
				<i class="glyphicon glyphicon-remove"></i>
			</div>
			<div class="fav"><img src="favicon_whale.png" /></div>
			<div class="info">
				<div class="title">Docker</div>
				<div class="url">
					<ul>
						<li>https://www.docker.com/</li>
					</ul>
				</div>		
			</div>
		</div>
	</div>
	-->
</div>

<?php
include ('editModal.php');
include ('addModal.php');
?>

<script src="jquery-1.11.2.js"></script>
<script src="draggabilly.pkgd.js"></script>
<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>
<script src="custom.js"></script>
</body>
</html>