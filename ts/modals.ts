/// <reference path="jquery.d.ts"/>

// Utility functions for modals

let currentModal: HTMLElement;
let modalDir: string = "/modals/";
let lastFocus: HTMLElement;

/*
 * First: MAKE SURE THAT STRING IS SCRUBBED OR TRUSTED.
 * Second: Assumes that there's only a single toplevel element in the string.
 */
function toElement(html: string): HTMLElement {
  let e = document.createElement("div");
  e.innerHTML = html;
  return <HTMLElement> e.firstElementChild;
}

function showModal(selector: string, name: string): boolean {
  if(currentModal) return false;

  $.get({
    url: modalDir + name,
    dataType: "html",
    success: showModal
  });

  function showModal(html: string): void {
    let element = toElement(html);
    $(selector).after(element);
    $(document.body).css("overflow", "hidden");
    lastFocus = <HTMLElement> document.activeElement;
    element.setAttribute("tabindex", "0");
    element.focus();
    currentModal = element;

    $(element).find(".modal-overlay").css("animation", "fadein-overlay 0.2s linear");
    $(element).find(".modal-body").css("animation", "fadein-body 0.2s linear");

    $(document).on("focusin", restrictFocus);
  }
}

function restrictFocus(event: Event) {
  if(currentModal && !currentModal.contains(<Node> event.target)) {
    event.stopPropagation();
    currentModal.focus();
  }
}

jQuery(document).on("remove", ".modal", function(event) {
  event.preventDefault();
  let $this = $(this);

  $(document.body).css("overflow", "scroll");

  $(currentModal).find(".modal-overlay").css("animation", "fadeout-overlay 0.2s linear");
  $(currentModal).find(".modal-body").css("animation", "fadeout-body 0.2s linear");
  setTimeout(
    (function(element) {
      return function() { $(element).remove(); }
    })(currentModal),
    200
  );
  
  currentModal = null;
  lastFocus.focus();

  $(document).off("focusin", restrictFocus);
});
