'use strict';

var noJsElement = document.querySelector('.no-js');

if (noJsElement) {
  noJsElement.classList.remove('no-js');
}

var siteHeaderElement = document.querySelector('.site-header');
var menuButtonElement = document.querySelector('.menu-button');
var menuLayoutElement = document.querySelector('.site-header__inner-layout');

if (menuButtonElement && siteHeaderElement && menuLayoutElement) {
  menuButtonElement.addEventListener('click', function () {
    siteHeaderElement.classList.toggle('site-header--open');
    menuButtonElement.classList.toggle('menu-button--open');
    menuLayoutElement.classList.toggle('site-header__inner-layout--open');
  });
}
