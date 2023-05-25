# Beautify Extension of S1 Forum
Beautify the surface on S1 forum, for Firefox and Chrome.

### Manifest and Cross-Browser

As of 2023, Chrome uses manifest V3, Firefox uses V2.

Chrome V3 enables Promise based APIs. (while v2 uses callbacks)

Firefox V2 has some specific configurations, but it uses Promise based APIs. V3 just launched support, may take > 1 year to mature.

```bash
s1-beautify/
    manifest-chrome.json # chrome manifest
    manifest-firefox.json # firefox manifest
```
Build the code
```bash
./build-chrome.sh # build chrome
./build-firefox.sh # build firefox 
```

## Code Structure

### Manifest
Controls which websites (URLs) this extension can be loaded on and components of this extension.

Main file: `manifest.json`

### Content Script

Runs automatically when user visit a page. It decorates the page.

Main file: `content.js`

Depends on: `common.js`

### Popup
Popup allow the user to manually configure the extension's behavior.

Main file: `popup.html` 

Depends on: `common.js`, `popup.js`.
