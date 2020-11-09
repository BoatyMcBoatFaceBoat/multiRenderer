const { ipcRenderer } = require('electron');
const util = require('../utils/util');
const Pane = require('../panes/pane');

// const menubtn = document.getElementById('snokkie');
// menubtn.addEventListener('click', do1);

ipcRenderer.on('open-renderer1', (event, arg) => {
  do1();
})

function do1() {
  const at = util.$('content');
  // const menuButton1 = util.$(`renderer1Button`);
  // let renderBuild = new util.HtmlBuilder(renderer1);
  // const renderBuild = null;
  const renderBuild = new Pane();
  const elt = renderBuild.getElement();
  console.log(elt);

  // const renderBuild = document.createElement('pane');
  // const renderBuild = new util.HtmlBuilder(at);
  let pChild = document.createElement('p');
  pChild.innerHTML = 'this is text in render1';
  elt.appendChild(pChild);
  at.appendChild(elt);
  // const pane1 = util.$('div1');
  // const paneBuild = new util.HtmlBuilder(pane1);
  // paneBuild.createPChild('p1', 'this is renderer 1');
  // at || throw new Error('no content found');
  // at.appendChild(renderBuild);
  // util.createPChild(renderBuild, 'this is render 1 ');
  // const p1 = util.createPChild(renderBuild, 'laziness of Irene');






  // menuButton1.addEventListener('click', () => {
  //   ipcRenderer.send('render-message', 'this comes from render 1');
  // }
  // );

  // renderer1.appendChild(renderBuild);
}
