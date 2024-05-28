---
sidebar_position: 2
---

# Installation

## User Script loader

### Install a user script manager (prerequisite)

    * install [Violentmonkey](https://violentmonkey.github.io/#installation) (recommended, open source) for your browser following the linked instructions 
    * or [Tampermonkey](https://www.tampermonkey.net/) (closed source, includes questionable tracking)
    * for (mobile) Safarie you could use [Userscripts](https://apps.apple.com/de/app/userscripts/id1463298887)

### Install one of WCE's loader user script

    * just open the link in your browser and confirming the installation with your choosen user script manager:
    1. [WCE with FUSAM loader](https://wce.netlify.app/wce-fusam-loader.user.js) (recommended)
        * make sure to also remove the old FUSAM loader
    2. or [WCE loader](https://wce.netlify.app/wce-loader.user.js) (without FUSAM):
        * make sure you still load [FUSAM following their introductions](https://sidiousious.gitlab.io/bc-addon-loader/)

:::warning
Make sure that the old FBC version isn't loaded through FUSAM anymore
:::

## Bookmarklet

<a class="button button--primary button--block" href="javascript:(() => {if(!window.FUSAM) return alert('error: load FUSAM first!'); let s = document.body.appendChild(document.createElement('script')); s.type= 'module'; s.src='https://wce.netlify.app/wce.js';})();">WCE loader</a>

* drag and drop the above button to your bookmark bar
* or create new Bookmark and add the following code as the URL of the new bookmark:
```js
javascript:(() => {if(!window.FUSAM) return alert('error: load FUSAM first!'); let s = document.body.appendChild(document.createElement('script')); s.type= 'module'; s.src='https://wce.netlify.app/wce.js';})();
```
* make sure to load this Bookmarklet after FUSAM has loaded (and the `Addon Manager` button is visible)

## Beta releases

* install the beta loaders: [WCE with FUSAM loader](https://beta--wce.netlify.app/wce-fusam-loader.user.js) or [WCE loader](https://beta--wce.netlify.app/wce-loader.user.js)
* or the bookmarklet with the `https://beta--wce.netlify.app/wce.js` URL