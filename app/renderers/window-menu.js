const { ipcRenderer } = require('electron');
const util = require('../utils/util');

let is1Visible = false;
let is2Visible = false;

let menu = util.$('menu');
let menuBuild = new util.HtmlBuilder(menu);
menuBuild.createButtonChild('openWindow1', 'open/close renderer 1');
menuBuild.createButtonChild('openWindow2', 'open/close renderer 2');
menuBuild.createButtonChild('renderer1Button', 'button renderer 1');
menuBuild.createButtonChild('renderer2Button', 'button renderer 2');

let openWindow1Button = util.$('openWindow1');
let openWindow2Button = util.$('openWindow2');
let renderer1Button = util.$(`renderer1Button`);
util.$(`renderer${1}`).setAttribute('class', 'noshow');
util.$(`renderer${2}`).setAttribute('class', 'noshow');
renderer1Button.setAttribute('class', 'noshow');
renderer2Button.setAttribute('class', 'noshow');


openWindow1Button.addEventListener('click', function openWindow(){
  let nr = 1;
  is1Visible = !is1Visible;
  let class1Val = is1Visible ? 'show' : 'noshow';
  let class2Val = is2Visible ?  'noshow' : 'show' ;
  util.$(`renderer${nr}`).setAttribute('class', class1Val);
  util.$(`renderer1Button`).setAttribute('class', class1Val);

});

openWindow2Button.addEventListener('click', function openWindow(){
  let nr = 2;
  is2Visible = !is2Visible;
  let class1Val = is1Visible ?  'noshow' : 'show' ;
  let class2Val = is2Visible ? 'show' : 'noshow';
  util.$(`renderer${nr}`).setAttribute('class', class2Val)
  util.$(`renderer2Button`).setAttribute('class', class2Val);
});
