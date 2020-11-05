const { ipcRenderer } = require('electron');
const util = require('../utils/util');

let renderer3 = util.$('renderer3');
let renderBuild = new util.HtmlBuilder(renderer3);
renderBuild.createPChild('p0', 'this is render 3 ');

renderBuild.createPChild('p3', 'Also laziness');
ipcRenderer.on('main-message', (event, arg) => {
  util.$('p3').innerHTML = 'active element set in the main: ' + JSON.stringify(arg);
})
