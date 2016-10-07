/// <reference path="./jquery.d.ts"/>

function showProgressAnim(selector: string): void {
  $(selector).html("<span clsas='progress-anim'></span>");
}

function showSuccessMsg(selector: string, msg: string): void {
  $(selector).html(`
    <div class="alert alert-success">
      ${msg}
      <button type="button" 
              dismiss=".alert" 
              aria-hidden="true"
              aria-label="Close">
        &times;
      </button>
    </div>
  `);
}

function showErrorMsg(selector: string, msg: string): void {
  $(selector).html(`
    <div class="alert alert-error">
      ${msg}
      <button type="button" 
              dismiss=".alert" 
              aria-hidden="true"
              aria-label="Close">
        &times;
      </button>
    </div>
  `);
}

// Make buttons on alerts close the alert
jQuery(function($) {
  $(document).on("click.close", '[dismiss]', function(event) {
    event.preventDefault();
    let $this = $(this);

    $this.closest($this.attr("dismiss")).trigger("remove");
  });

  $(document).on("remove", ".alert", function(event) {
    event.preventDefault();

    $(event.target).remove();
  });
});
