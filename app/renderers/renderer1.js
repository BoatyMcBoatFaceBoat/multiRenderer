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
  const renderBuild = new Pane();
  const elt = renderBuild.getElement();
  elt.setAttribute('style', 'background: blue;');
  elt.addEventListener('keyup', event => {
    if (event.ctrlKey && !event.shiftKey && !event.altKey && !event.metaKey) {
      switch (event.charCode) {
        case 'l': console.log('left'); break;
        case 'r': console.log('right'); break;
        case 'u': console.log('up'); break;
        case 'd': console.log('down'); break;
        default:  console.log(event.key + ', ' + event.code);
      }
    } else {
      console.log('not ctrl: ' + event.key + ', ' + event.code);
    }

  });
  // console.log(elt);
  util.createPChild(elt, 'this is text in render1');
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
