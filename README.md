# Beautify Extension of S1 Forum
Beautify the surface on Discuz forums, for Firefox and Chrome.


## Code Structure

### Manifest
Controls which websites (URLs) this extension can be loaded on and components of this extension.

Main file: `manifest.json`

### Content Script

Runs automatically when user visit a page. It decorates the page.

Main file: `beautify.js`

Depends on: `browser-polyfill.js`, `common.js`

### Popup
Popup allow the user to manually configure the extension's behavior.

Main file: `popup.html` 

Depends on: `browser-polyfill.js`, `common.js`, `popup.js`.
