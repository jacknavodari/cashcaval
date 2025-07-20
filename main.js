import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFilePath = path.join(app.getPath('userData'), 'data.json');

// Ensure the data file exists
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, JSON.stringify({ expenses: [], revenues: [] }));
}

ipcMain.on('save-data', (event, data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data));
});

ipcMain.handle('load-data', async (event) => {
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
});

ipcMain.handle('get-sound-path', async (event, soundFileName) => {
  return path.join(app.getAppPath(), 'public', 'sounds', soundFileName);
});

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  win.loadFile(path.join(__dirname, 'public', 'index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});