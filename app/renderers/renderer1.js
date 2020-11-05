const { ipcRenderer } = require('electron');
const util = require('../utils/util');

let renderer2 = util.$('renderer2');
const menuButton2 = util.$(`renderer2Button`);
let renderBuild = new util.HtmlBuilder(renderer2);
renderBuild.createPChild('p0', 'this is render 2 ');
renderBuild.createPChild('p2', 'laziness of Irene');


ipcRenderer.on('main-message', (event, arg) => {
  util.$('p2').innerHTML = 'active element set in the main: ' + JSON.stringify(arg);
})


menuButton2.addEventListener('click', () => {
  ipcRenderer.send('render-message', 'this comes from render 2');
}
);
