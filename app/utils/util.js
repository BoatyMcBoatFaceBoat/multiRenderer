// export function HtmlBuilder(el) {
//   this.currentElement = el;
//   this.createChild = function (newElement, idName) {
//     let htmlChild = document.createElement(newElement);
//     htmlChild.setAttribute('id', idName);
//     this.currentElement.appendChild(htmlChild);
//   }
//   this.createButtonChild = function (idName, buttonText) {
//     let buttonChild = document.createElement('button');
//     buttonChild.innerHTML = buttonText;
//     buttonChild.setAttribute('id', idName);
//     this.currentElement.appendChild(buttonChild);
//   }
//   this.createPChild = function(idName, pText) {
//     let pChild = document.createElement('p');
//     pChild.setAttribute('id', idName);
//     pChild.innerHTML = pText
//     this.currentElement.appendChild(pChild);
//   }
// }

// export function $(name) {
//   return document.getElementById(name);
// }