const { ipcRenderer } = require('electron');

const $ = function (name) {
  return document.getElementById(name);
}


let is1Visible = false;
let is2Visible = false;

function HtmlBuilder(el) {
  this.currentElement = el;
  this.createChild = function (newElement, idName) {
    let htmlChild = document.createElement(newElement);
    htmlChild.setAttribute('id', idName);
    this.currentElement.appendChild(htmlChild);
  }

  this.createButtonChild = function (idName, buttonText) {
    let buttonChild = document.createElement('button');
    buttonChild.innerHTML = buttonText;
    buttonChild.setAttribute('id', idName);
    // buttonChild.addEventListener('click', openWindow())
    this.currentElement.appendChild(buttonChild);
  }
}

let menu = $('menu');
let menuBuild = new HtmlBuilder(menu);
menuBuild.createButtonChild('openWindow1', 'open/close renderer 1');
menuBuild.createButtonChild('openWindow2', 'open/close renderer 2');
menuBuild.createButtonChild('renderer1Button', 'button renderer 1');
menuBuild.createButtonChild('renderer2Button', 'button renderer 2');

let openWindow1Button = $('openWindow1');
let openWindow2Button = $('openWindow2');
let renderer1Button = $(`renderer1Button`);
$(`renderer${1}`).setAttribute('class', 'noshow');
$(`renderer${2}`).setAttribute('class', 'noshow');
renderer1Button.setAttribute('class', 'noshow');
renderer2Button.setAttribute('class', 'noshow');


openWindow1Button.addEventListener('click', function openWindow(){
  let nr = 1;
  is1Visible = !is1Visible;
  let class1Val = is1Visible ? 'show' : 'noshow';
  let class2Val = is2Visible ?  'noshow' : 'show' ;
  $(`renderer${nr}`).setAttribute('class', class1Val);
  $(`renderer1Button`).setAttribute('class', class1Val);

});

openWindow2Button.addEventListener('click', function openWindow(){
  let nr = 2;
  is2Visible = !is2Visible;
  let class1Val = is1Visible ?  'noshow' : 'show' ;
  let class2Val = is2Visible ? 'show' : 'noshow';
  $(`renderer${nr}`).setAttribute('class', class2Val)
  $(`renderer2Button`).setAttribute('class', class2Val);


});




