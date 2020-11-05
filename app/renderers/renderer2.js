const { ipcRenderer } = require('electron');
const util = require('../utils/util');

let renderer1 = util.$('renderer1');
const menuButton1 = util.$(`renderer1Button`);
let renderBuild = new util.HtmlBuilder(renderer1);
renderBuild.createPChild('p0', 'this is render 1 ');
renderBuild.createPChild('p1', 'this is render 1 ');


ipcRenderer.on('main-message', (event, arg) => {
  util.$('p1').innerHTML = 'active element set in the main: ' + JSON.stringify(arg);
})


menuButton1.addEventListener('click', () => {
  ipcRenderer.send('render-message', 'this comes from render 1');
}
);
