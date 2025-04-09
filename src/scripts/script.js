"use strict";

var noJsElement = document.querySelector(".no-js");

if (noJsElement) {
  noJsElement.classList.remove("no-js");
}

// Mobile menu related vars
var siteHeaderElement = document.querySelector(".site-header");
var menuButtonElement = document.querySelector(".menu-button");
var menuLayoutElement = document.querySelector(".site-header__inner-layout");
var isMenuOpen = false;

// Login modal related vars
var loginPopupTriggers = document.querySelectorAll(".login-popup-trigger");
var modalElement = document.querySelector(".modal");

if (modalElement) {
  var closeModalButtonElement = modalElement.querySelector(".close-button");
  var loginEmailInputElement = modalElement.querySelector(
    'input[name="login-email"]'
  );
}

// Accordion related vars
var sectionFaqAccordionElement = document.querySelector(
  ".faq-accordion-trigger"
);
var filterFormAccordionElement = document.querySelector(
  ".filter-form-accordion-trigger"
);

// Filter Menu Related Vars
var openFilterButtonElement = document.querySelector(
  ".filter-form__open-button"
);
var closeFilterButtonElement = document.querySelector(
  ".filter-form__close-button"
);
var filterFormElement = document.querySelector(".filter-form__form");
var pageBodyElement = document.querySelector(".page-body");

// Form Validation Related Vars
var subscribeEmailElement = document.querySelector('[name="subscribe-email"]');
var subscribeFormElement = document.querySelector(".site-footer__form");
var loginEmailElement = document.querySelector('[name="login-email"]');
var loginFormElement = document.querySelector(".login-form__form");

function openMenu() {
  siteHeaderElement.classList.add("site-header--open");
  menuButtonElement.classList.add("menu-button--open");
  menuLayoutElement.classList.add("site-header__inner-layout--open");
  pageBodyElement.classList.add("page-body--locked");
  pageBodyElement.addEventListener("click", pageBodyElementClickHandler);
  isMenuOpen = true;
}

function closeMenu() {
  siteHeaderElement.classList.remove("site-header--open");
  menuButtonElement.classList.remove("menu-button--open");
  menuLayoutElement.classList.remove("site-header__inner-layout--open");
  pageBodyElement.classList.remove("page-body--locked");
  isMenuOpen = false;
}

function menuButtonClickHandler() {
  if (!isMenuOpen) {
    openMenu();
  } else {
    closeMenu();
  }
}

if (
  menuButtonElement &&
  siteHeaderElement &&
  menuLayoutElement &&
  pageBodyElement
) {
  menuButtonElement.addEventListener("click", menuButtonClickHandler);
}

function closeLoginModal() {
  modalElement.classList.remove("modal--open");
  closeModalButtonElement.removeEventListener("click", closeLoginModalHandler);
  modalElement.removeEventListener("click", backdropClickHandler);
  document.removeEventListener("keydown", documentKeydownHandler);
}

function closeLoginModalHandler() {
  closeLoginModal();
}

function backdropClickHandler(e) {
  if (e.target === modalElement) {
    closeLoginModal();
  }
}

function documentKeydownHandler(e) {
  if (e.key === "Escape") {
    closeLoginModal();
  }
}

function openModal() {
  modalElement.classList.add("modal--open");

  if (isMenuOpen) {
    closeMenu();
  }

  if (loginEmailInputElement) {
    loginEmailInputElement.focus();
  }

  if (closeModalButtonElement) {
    closeModalButtonElement.addEventListener("click", closeLoginModalHandler);
  }

  modalElement.addEventListener("click", backdropClickHandler);

  document.addEventListener("keydown", documentKeydownHandler);
}

function openLoginModalHandler(e) {
  e.preventDefault();
  openModal();
}

if (loginPopupTriggers && modalElement) {
  loginPopupTriggers.forEach(function (item) {
    item.addEventListener("click", openLoginModalHandler);
  });
}

// Accordion
var Accordion = function (accordionElement, isAccordionHeaderClickable) {
  this.accordionElement = accordionElement;
  this.isAccordionHeaderClickable = isAccordionHeaderClickable;
  this.accordionItemElements = null;
};

Accordion.prototype.accordionElementHandler = function (item) {
  return function () {
    item.classList.toggle("accordion__item--open");
  };
};

Accordion.prototype.init = function () {
  if (this.accordionElement) {
    this.accordionItemElements =
      this.accordionElement.querySelectorAll(".accordion__item");

    if (this.accordionItemElements) {
      this.accordionItemElements.forEach(
        function (item) {
          var accordionButtonElement = item.querySelector(".accordion__button");
          var accordionHeaderElement = item.querySelector("h3");

          if (accordionButtonElement) {
            accordionButtonElement.addEventListener(
              "click",
              this.accordionElementHandler(item)
            );
          }

          if (this.isAccordionHeaderClickable && accordionHeaderElement) {
            accordionHeaderElement.addEventListener(
              "click",
              this.accordionElementHandler(item)
            );
          }
        }.bind(this)
      );
    }
  }
};

var faqAccordion = new Accordion(sectionFaqAccordionElement, true);
faqAccordion.init();
var filterFormAccordion = new Accordion(filterFormAccordionElement, true);
filterFormAccordion.init();

// Filter Menu
function closeFilterMenu() {
  filterFormElement.classList.remove("filter-form__form--open");
}

function openFilterMenu() {
  pageBodyElement.classList.add("page-body--locked");
  filterFormElement.classList.add("filter-form__form--open");

  pageBodyElement.addEventListener("click", pageBodyElementClickHandler);
}

function pageBodyLockedRemove() {
  pageBodyElement.classList.remove("page-body--locked");
  pageBodyElement.removeEventListener("click", pageBodyElementClickHandler);

  if (isMenuOpen) {
    closeMenu();
  }

  if (filterFormElement) {
    closeFilterMenu();
  }
}

function pageBodyElementClickHandler(e) {
  if (e.target === pageBodyElement) {
    pageBodyLockedRemove();
  }
}

function openFilterButtonClickHandler(e) {
  e.stopPropagation();

  if (pageBodyElement && filterFormElement) {
    openFilterMenu();
  }
}

function closeFilterButtonClickHandler() {
  if (pageBodyElement && filterFormElement) {
    closeFilterMenu();
    pageBodyLockedRemove();
  }
}

if (openFilterButtonElement) {
  openFilterButtonElement.addEventListener(
    "click",
    openFilterButtonClickHandler
  );
}

if (closeFilterButtonElement) {
  closeFilterButtonElement.addEventListener(
    "click",
    closeFilterButtonClickHandler
  );
}

// Form Validation
var Validator = function (inputElement, formElement) {
  this.inputElement = inputElement;
  this.inputsParentElement = this.inputElement.parentNode;
  this.formElement = formElement;
  this.previousValue = null;
  this.typingTimer = null;
};

Validator.prototype.checkValidity = function () {
  if (!this.inputElement.validity.valid && this.inputsParentElement) {
    this.inputsParentElement.classList.add("input-text--invalid");
  } else {
    this.inputsParentElement.classList.remove("input-text--invalid");
  }
};

Validator.prototype.typingLogic = function () {
  if (this.inputElement.value !== this.previousValue) {
    clearTimeout(this.typingTimer);

    if (this.inputElement.value) {
      this.typingTimer = setTimeout(this.checkValidity.bind(this), 750);
    } else {
      this.inputsParentElement.classList.remove("input-text--invalid");
    }
  }

  this.previousValue = this.inputElement.value;
};

Validator.prototype.init = function () {
  if (this.inputElement) {
    this.inputElement.addEventListener(
      "keyup",
      function (e) {
        localStorage.setItem(this.inputElement.name, e.target.value);
        this.typingLogic();
      }.bind(this)
    );

    this.inputElement.value = localStorage.getItem(this.inputElement.name);
  }

  if (this.inputElement.value) {
    this.checkValidity();
  }

  if (this.formElement && this.inputElement) {
    this.formElement.addEventListener(
      "submit",
      function () {
        this.inputElement.value = "";
        localStorage.removeItem(this.inputElement.name);
      }.bind(this)
    );
  }
};

var subscribeEmailValidator = new Validator(
  subscribeEmailElement,
  subscribeFormElement
);
subscribeEmailValidator.init();

var loginFormValidator = new Validator(loginEmailElement, loginFormElement);
loginFormValidator.init();
