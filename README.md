TinyMCE-Statistics
==================

A simple statistic plugin for TinyMCE 

**Features**
 - Adds the menu item "View -> Statistcs"
 - Shows the number of words and characters and calculates the average word length
 - Shows the number of links, images, tables and lists if the respective plugins are installed

**Install**
 1. Copy the statistics/plugin.min.js file into your plugin folder
 2. Initialization Example:  

```javascript
    tinymce.init({
      plugins: "statistics"
    });
```
