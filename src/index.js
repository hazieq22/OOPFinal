const { app, BrowserWindow } = require('electron');
const path = require('path');

var mainWindow
var addWindow
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  var mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
  Menu.SetApplicationMenu(mainMenu)
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ipcMain.on("item:add", function(e,item){   //terima dari add.js dan listkan kat main window
  mainWindow.webContents.send("item:add", item)  
  addWindow.close()
})


//Create an array of menus

var mainMenuTemplate = [
  {
    label:'File',
    submenu:[
      {
        label: 'Help',
        click(){
            addWindow = new BrowserWindow({
            width: 500,
            height: 400,
            title:"Add new item",

            webPreferences:{
              nodeIntegration: true,
              contextIsolation: false
            }

          });
        // and load the index.html of the app.
        addWindow.loadFile(path.join(__dirname, 'add.html'));
      }
    },
    {
      label: 'Clear all item',
      click(){
        mainWindow.webContents.send("item:clear");
      }
    },
    {
      label: 'Quit/Exit',
      click(){
        app.quit()
      }
    }
  ]
},
{
  label:"Help"
}
];