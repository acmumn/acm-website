/// <reference path="./jquery.d.ts"/>

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
