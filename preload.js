const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // Expose a function to send data to the main process
  saveData: (data) => ipcRenderer.send('save-data', data),
  // Expose a function to request data from the main process
  loadData: () => ipcRenderer.invoke('load-data'),
  getSoundPath: (soundFileName) => ipcRenderer.invoke('get-sound-path', soundFileName),
});