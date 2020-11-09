const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const Pane = require('./panes/pane');

const fs = require('fs');

let devMode = true;
const windows = new Set();
const views = {};
const isMac = process.platform === 'darwin';

const menuTemplate = [
  {
    label: 'View',
    submenu: [
      { label: 'render &1',
        click: () => { console.log(`trying to show 1`) }
        // click: () => { showView(1) }
      },
      { label: 'render &2',
        click: () => { console.log(`trying to show 2`) }
        // click: () => { showView(2) }
      },
      { label: 'render &3',
        click: () => { console.log(`trying to show 3`) }
        // click: () => { showView(3) }
      },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac ? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ] : [
        { role: 'close' }
      ])
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://electronjs.org')
        }
      }
    ]
  }
];
const menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);

const createWindow = function() {
  let newTopWindow = new BrowserWindow({
    width: '500px',
    height: '500px',
    show: false ,
    webPreferences: {
      nodeIntegration: true
    }
  });

  newTopWindow.loadFile(`${__dirname}/index.html`);
  let mainpane = new Pane;

  if (devMode) {
    newTopWindow.openDevTools();
  }

  newTopWindow.once('ready-to-show', () => {
    newTopWindow.show();
  });

  newTopWindow.on('closed', () => {
    windows.delete(newTopWindow);
  });

  windows.add(newTopWindow);
  return newTopWindow;
};


app.on('ready', () => createWindow());

//
// class activeElem {
//   constructor(el){
//     this.setName = el;
//   }
//
//   set setName(firstEl) {
//     this.name = firstEl
//   }
//
//   get getName(){
//     return this.name;
//   }
//
//   changeName(newName) {
//     this.name = newName;
//   }
// }
//
// let chosenElem = new activeElem("no active element chosen");

// ipcMain.handle('renderer1-message', async (event, content) => {
//   console.log(`message recieved in main: ${content}`);
//   chosenElem.changeName(content);
//   return chosenElem.getName;
//   // const newWindow = await createWindow();
//   // return newWindow;

// })

// function showView(nr) {
//   if (typeof views[nr] === 'undefined') {
//     const mod = './renderers/renderer' + nr;
//     views[nr] = (function() {
//       console.log(`trying to create an instance of ${mod}`);
//       const dom = require(mod);
//       console.log(`creating an instance of ${mod}`);
//       return dom;
//     })();
//   }
// }
ipcMain.on('render-message', (event, arg) => {
  chosenElem.changeName(arg)
  event.reply('main-message', chosenElem.getName);
})
