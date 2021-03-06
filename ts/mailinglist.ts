/// <reference path="./jquery.d.ts"/>
/// <reference path="./forms.d.ts"/>

// Mailing list submission.

// The embedded form code with have a URL *similar* to this one
// inside its action attribute.
// To get the correct one, substitute `post-json' for `post', add
// `&c=?' at the end, and replace `&amp;' with `&'
let mailchimp: string = "https://umn.us9.list-manage.com/subscribe/post-json?u=2c841b4ee5209c21859b59f29&id=59e9b0fdbe&c=?";

// Name for the fake parameter in the form.
let botcatcherParam: string = "b_2c841b4ee5209c21859b59f29_59e9b0fdbe";

jQuery(function($) {
  $("#mailinglist-form").submit(function(event) {
    event.preventDefault();

    console.log("Attempting to add to mailing list...");
    showProgressAnim("#mailinglist-form-status");

    let email = $("#mailinglist-form-email").val();
    let firstname = $("#mailinglist-form-firstname").val();
    let lastname = $("#mailinglist-form-lastname").val();
    let botcatcher = $("#mailinglist-form-botcatcher").val();

    console.log("Sending data to Mailchimp...");

    $.post({
      url: mailchimp,
      crossDomain: true,
      dataType: "json",
      data: {
        "EMAIL": email,
        "FNAME": firstname,
        "LNAME": lastname,
        botcatcherParam: botcatcher
      },
      success: success,
      error: error
    });
  });

  function success(data) {
    console.log(data);

    if(data.result === "success") {
      $("#mailinglist-form").trigger("reset");
      showSuccessMsg(
        "#mailinglist-form-status",
        "Thanks, we just need you to confirm your email!"
      );
    } else {
      showErrorMsg("#mailinglist-form-status", "Whoops, looks like you're already subscribed.");
    }
  }

  function error() {
    console.log("Failed to sign up for mailing list.");

    showErrorMsg("#mailinglist-form-status", "Something went wrong. Is your internet working?");
  }
});
