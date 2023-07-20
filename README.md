# streamonkey-player-snippet
This repository offers a premade player widget for integration of the [streamomkey-player](https://github.com/streamonkey/streamonkey-player) into a website. 

This widget scales according and shows/hides elements according to its parent container. A demo implementation can be found within the examples folder.

## Basic Usage

Import the '''streamonkey-player.iife.js''' into the head section of your website like this:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    ...
    
    <script src="https://unpkg.com/streamonkey-player-snippet@latest/dist/streamonkey-player.iife.js"></script>
  </head>
```

You can either import the [unpkg-link](https://unpkg.com/streamonkey-player-snippet@latest/dist/streamonkey-player.iife.js) directly or build the javascript file within this project using ```npm run build```.

The widget needs an existing container to attach to. To achieve this, add an element in the desired dimensions to your page and issue a unique query selector to it. After the DOM has been rendered you can call the widget with `initStreamonkeyPlayer()` like this:

```js
let myContainer = document.querySelector("#myContainerId");
initStreamonkeyPlayer(myContainer, "[myMountPoint]", options);
```

The mountPoint is your mount point name issued to you by streaMonkey and usually consists of the station name.

# Options

```js
interface SnippetOptions  {
  covers: {
    URL: string; //URL to an image of a station logo or a backend service that returns a browser-compatible image on request. Requests will be triggered upon metadata update
    fallback: string; // image URL to a fallback image in case the covers URL does not provide a valid image
  };
  aggregator: string; // IMPORTANT: The widget will not work without setting a proper aggregator name! Please contact customer support if your aggregator is unknown
  placeholders?: {
    title?: string; // the text to display within the widget when no title metadata are available
    artist?: string; // the text to display within the widget when no title metadata are available
  };
}
```

# Advanced Options

The documentation for advanced options can be found [here](https://github.com/streamonkey/streamonkey-player#additional-options).
