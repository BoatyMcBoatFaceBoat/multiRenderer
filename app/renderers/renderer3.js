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

let renderer3 = $('renderer3');
let renderBuild = new HtmlBuilder(renderer3);
renderBuild.createPChild('p0', 'this is render 3 ');

renderBuild.createPChild('p3', 'this is render 3 ');
ipcRenderer.on('main-message', (event, arg) => {
  $('p3').innerHTML = 'active element set in the main: ' + JSON.stringify(arg);
})