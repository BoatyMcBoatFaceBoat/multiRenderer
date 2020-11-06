const { ipcRenderer } = require('electron');
const util = require('../utils/util');
const paneful = require('../utils/pane-container');

let renderer1 = util.$('renderer1');
const menuButton1 = util.$(`renderer1Button`);
// let renderBuild = new util.HtmlBuilder(renderer1);
const renderBuild = document.createElement('pane-container');
console.log(renderBuild);

util.createPChild(renderBuild, 'this is render 1 ');
const p1 = util.createPChild(renderBuild, 'laziness of Irene');


ipcRenderer.on('main-message', (event, arg) => {
  p1.innerHTML = 'active element set in the main: ' + JSON.stringify(arg);
})


menuButton1.addEventListener('click', () => {
  ipcRenderer.send('render-message', 'this comes from render 1');
}
);

renderer1.appendChild(renderBuild);
