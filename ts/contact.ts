/// <reference path="./jquery.d.ts"/>
/// <reference path="./forms.d.ts"/>

// Points to a contact application controlled by ACM UMN.
let appUrl : string = "https://script.google.com/macros/s/AKfycbzi8_j_lIAduviC4oCqVrwXz8rMq2Ed_Ytw8cALhxYEtzEPvGg/exec";

jQuery(function($) {
  $("#contact-form").submit(function(event) {
    event.preventDefault();

    console.log("Attempting to contact ACM UMN...");
    showProgressAnim("#conatct-form-status");

    let email = $("#contact-form-email").val();
    let subject = $("#contact-form-subject").val();
    let message = $("#contact-form-message").val();

    console.log("Sending data to server...");

    $.post({
      url: appUrl,
      crossDomain: true,
      dataType: "json",
      data: {
        "email": email,
        "subject": subject,
        "message": message
      },
      success: success,
      error: error
    });
  });

  function success(data) {
    console.log(data);

    if(data.succeed) {
      showSuccessMsg(
        "#contact-form-status",
        "Thanks, we got your message! We'll reply as soon as we can."
      );
      // clear form fields
      $("#contact-form").trigger("reset");
    } else {
      showErrorMsg("#contact-form-status", data.reason);
    }
  }

  function error() {
    console.log("Failed to send to server.");

    showErrorMsg("#contact-form-status", "Something went wrong. Is your internet working?");
  }
});
