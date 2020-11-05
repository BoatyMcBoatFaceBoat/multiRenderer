const { ipcRenderer } = require('electron');

const $ = function (name) {
  return document.getElementById(name);
}

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
    this.currentElement.appendChild(buttonChild);
  }
  this.createPChild = function(idName, pText) {
    let pChild = document.createElement('p');
    pChild.setAttribute('id', idName);
    pChild.innerHTML = pText
    this.currentElement.appendChild(pChild);
  }
}

let renderer2 = $('renderer2');
let renderBuild = new HtmlBuilder(renderer2);
renderBuild.createPChild('p0', 'this is render 2 ');
renderBuild.createPChild('p2', 'this is render 2 ');

let menuButton2 = $(`renderer2Button`);

ipcRenderer.on('main-message', (event, arg) => {
  $('p2').innerHTML = 'active element set in the main: ' + JSON.stringify(arg);
})

menuButton2.addEventListener('click', () => {
    ipcRenderer.send('render-message', 'this comes from render 2');
  }
);

