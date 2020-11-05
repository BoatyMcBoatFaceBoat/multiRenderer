const { app, BrowserWindow, ipcMain } = require('electron');

const fs = require('fs');

let devMode = true;
const windows = new Set();

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


class activeElem {
  constructor(el){
    this.setName = el;
  }

  set setName(firstEl) {
    this.name = firstEl
  }

  get getName(){
    return this.name;
  }

  changeName(newName) {
    this.name = newName;
  }
}

let chosenElem = new activeElem("no active element chosen");

// ipcMain.handle('renderer1-message', async (event, content) => {
//   console.log(`message recieved in main: ${content}`);
//   chosenElem.changeName(content);
//   return chosenElem.getName;
//   // const newWindow = await createWindow();
//   // return newWindow;

// })

ipcMain.on('render-message', (event, arg) => {
  chosenElem.changeName(arg)
  event.reply('main-message', chosenElem.getName);
})
