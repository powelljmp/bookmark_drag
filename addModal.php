<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">
			<span aria-hidden="true">&times;</span>
			<span class="sr-only">Close</span>
		</button>
        <h4 class="modal-title" id="exampleModalLabel">New Site</h4>
      </div>
      <div class="modal-body">
        <form role="form">
		
          <div class="form-group">
            <label for="recipient-name" class="control-label">Title:</label>
            <input type="text" class="form-control" id="site-title">
          </div>
		  
          <div class="form-group">
			<label for="message-text" class="control-label">URL:</label>
			<input type="text" class="form-control" id="site-url">
          </div>
		  
		  <div class="form-group">
			<label for="message-text" class="control-label">LAYER:</label>
			<input type="text" class="form-control" id="site-layer">
          </div>
		  
		   <div class="form-group">
			<label for="message-text" class="control-label">TAG:</label>
			<input type="text" class="form-control" id="site-tags">
          </div>
		  
		  <input type="hidden" id="site-id" />
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-success">Add</button>
      </div>
    </div>
  </div>
</div>