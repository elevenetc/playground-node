const electron = require('electron')
const ncp = require('copy-paste');
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
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

var currentBuffer = null;

setInterval(function(){
	var buff = ncp.paste();
	if(currentBuffer !== buff){
		currentBuffer = buff;
		console.log('buffer updated:' + currentBuffer);	
	}
	
}, 1000);