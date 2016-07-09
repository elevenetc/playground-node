const electron = require('electron')
//const exec = require('child_process').exec;
const pbcopyProc = require('child_process').spawn('pbcopy');
const app = electron.app
const BrowserWindow = electron.BrowserWindow
let win;

function createWindow() {
  win = new BrowserWindow({width: 800, height: 600});
  win.loadURL(`file://${__dirname}/index.html`);
  //win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	app.quit();
  // if (process.platform !== 'darwin') {
  //   app.quit();
  // }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

function pbcopy(data) { 
	pbcopyProc.stdin.write(data);
	pbcopyProc.stdin.end(); 
}

console.log('writing>');
pbcopy('xxx-ddd')
console.log('end writing>');