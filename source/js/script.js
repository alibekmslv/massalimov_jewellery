'use strict';

var noJsElement = document.querySelector('.no-js');

if (noJsElement) {
  noJsElement.classList.remove('no-js');
}

// Mobile menu related vars
var siteHeaderElement = document.querySelector('.site-header');
var menuButtonElement = document.querySelector('.menu-button');
var menuLayoutElement = document.querySelector('.site-header__inner-layout');
var isMenuOpen = false;

// Login modal related vars
var loginPopupTriggers = document.querySelectorAll('.login-popup-trigger');
var modalElement = document.querySelector('.modal');

if (modalElement) {
  var closeModalButtonElement = modalElement.querySelector('.close-button');
  var loginEmailInputElement = modalElement.querySelector('input[name="login-email"]');
}

// Accordion related vars
var sectionFaqAccordionElement = document.querySelector('.faq-accordion-trigger');
var filterFormAccordionElement = document.querySelector('.filter-form-accordion-trigger');

function openMenu() {
  siteHeaderElement.classList.add('site-header--open');
  menuButtonElement.classList.add('menu-button--open');
  menuLayoutElement.classList.add('site-header__inner-layout--open');
  isMenuOpen = true;
}

function closeMenu() {
  siteHeaderElement.classList.remove('site-header--open');
  menuButtonElement.classList.remove('menu-button--open');
  menuLayoutElement.classList.remove('site-header__inner-layout--open');
  isMenuOpen = false;
}

function menuButtonClickHandler() {
  if (!isMenuOpen) {
    openMenu();
  } else {
    closeMenu();
  }
}

if (menuButtonElement && siteHeaderElement && menuLayoutElement) {
  menuButtonElement.addEventListener('click', menuButtonClickHandler);
}

function closeLoginModal() {
  modalElement.classList.remove('modal--open');
  closeModalButtonElement.removeEventListener('click', closeLoginModalHandler);
  modalElement.removeEventListener('click', backdropClickHandler);
  document.removeEventListener('keydown', documentKeydownHandler);
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
  if (e.key === 'Escape') {
    closeLoginModal();
  }
}

function openModal() {
  modalElement.classList.add('modal--open');

  if (isMenuOpen) {
    closeMenu();
  }

  if (loginEmailInputElement) {
    loginEmailInputElement.focus();
  }

  if (closeModalButtonElement) {
    closeModalButtonElement.addEventListener('click', closeLoginModalHandler);
  }

  modalElement.addEventListener('click', backdropClickHandler);

  document.addEventListener('keydown', documentKeydownHandler);
}

function openLoginModalHandler(e) {
  e.preventDefault();
  openModal();
}

if (loginPopupTriggers && modalElement) {
  loginPopupTriggers.forEach(function (item) {
    item.addEventListener('click', openLoginModalHandler);
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
    item.classList.toggle('accordion__item--open');
  };
};

Accordion.prototype.init = function () {
  if (this.accordionElement) {
    this.accordionItemElements = this.accordionElement.querySelectorAll('.accordion__item');

    if (this.accordionItemElements) {
      this.accordionItemElements.forEach(function (item) {
        var accordionButtonElement = item.querySelector('.accordion__button');
        var accordionHeaderElement = item.querySelector('.accordion__header');

        if (accordionButtonElement) {
          accordionButtonElement.addEventListener('click', this.accordionElementHandler(item));
        }

        if (this.isAccordionHeaderClickable && accordionHeaderElement) {
          accordionHeaderElement.addEventListener('click', this.accordionElementHandler(item));
        }
      }.bind(this));
    }
  }
};

var faqAccordion = new Accordion(sectionFaqAccordionElement, true);
faqAccordion.init();
var filterFormAccordion = new Accordion(filterFormAccordionElement, true);
filterFormAccordion.init();
