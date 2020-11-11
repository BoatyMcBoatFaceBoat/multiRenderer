const { ipcRenderer } = require('electron');
const util = require('../utils/util');
const Pane = require('../panes/pane');

const fn = __filename.split('/').pop();
ipcRenderer.on('open-renderer1', (event, arg) => {
  const at = Pane.focus || util.$('content');
  const renderBuild = new Pane({parent: at});
  const elt = renderBuild.getElement();
  // elt.setAttribute('style', 'background: blue;');
  // elt.addEventListener('keyup', event => {
  //   console.log('event: ' + event);
  //   elt.setAttribute('style', 'background: blue;');
  //   if (event.ctrlKey && !event.shiftKey && !event.altKey && !event.metaKey) {
  //     switch (event.charCode) {
  //       case 'l': console.log('left'); break;
  //       case 'r': console.log('right'); break;
  //       case 'u': console.log('up'); break;
  //       case 'd': console.log('down'); break;
  //       default:  console.log(event.charCode + ': ' + event.key + ', ' + event.code);
  //     }
  //   } else {
  //     console.log('not ctrl: ' + event.key + ', ' + event.code);
  //   }
  // });

  // console.log(elt);
  util.createPChild(elt, 'this is text in ' + fn);
  at.appendChild(elt);
});
