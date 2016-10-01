/// <reference path="./jquery.d.ts"/>

// Make buttons on alerts close the alert
jQuery(function($) {
  $(document).on("click.close", '[dismiss]', function(event) {
    event.preventDefault();
    var $this = $(this);
    console.log("lol");

    $this.closest($this.attr("dismiss")).remove();
  });
});
