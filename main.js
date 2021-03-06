const {app, BrowserWindow, Menu, shell} = require('electron')
  
  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  let win
  
  function createWindow () {
    // Create the window
    win = new BrowserWindow(
      {
        width: 800,
        height: 600,
        minWidth: 160,
        minHeight: 80,
        title: 'FamilySearchDesktop',
        icon: 'FamilySearch.png',
        show: false
      }
    )
    makeMenu()
  
    // Load the FamilySearch website
    win.loadURL('https://www.familysearch.org')
      
    win.once('ready-to-show', () => {
      win.show()
    })
  
    // Emitted when the window is closed.
    win.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null
    })
  }
  
  function makeMenu () {
  
    const menuItems = [
      {
        label: 'View',
        submenu: [
          {role: 'reload'},
          {type: 'separator'},
          {role: 'zoomin'},
          {role: 'zoomout'},
          {type: 'separator'},
          {role: 'togglefullscreen'}
        ]
      },
      {
        role: 'help',
        submenu: [
          {
            label: 'Report Bug',
            click () { shell.openExternal('https://github.com/hyperdriveguy/fsdesktop/issues') }
          },
          {
            label: 'Source Code',
            click () { shell.openExternal('https://github.com/hyperdriveguy/fsdesktop') }
          }
        ]
      }
    ]
    
    const menu = Menu.buildFromTemplate(menuItems)
    Menu.setApplicationMenu(menu)
  
  }
  
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow)
  
  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    if (win === null) {
      createWindow()
    }
  })
