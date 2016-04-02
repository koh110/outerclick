OuterClick
==================================================

OuterClick will fire the events when you click outside of the element.

for client-side library.

# Installation

```
npm install outerclick
```

# Usage

## Script tag

```javascript
<script src="node_modules/outerclick/dist/outerclick.js"></script>
```

## Browserify / Webpack

```javascript
var outerclick = require('outerclick');
```

## add event listener

```javascript
outerclick.addListener('.target', function(e) {
  console.log('outer clicked!', e);
});
```

# Supported browsers

this library depends on matches() method.  
http://caniuse.com/#feat=matchesselector

# License

MIT
