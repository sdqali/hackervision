(function () {
  var Widget = require("widget").Widget;
  var tabs = require('tabs');
  var self = require("self");
  var contextMenu = require("context-menu");
  var hotkeys = require ("hotkeys");

  exports.main = function() {
    var doActualWork = function () {
    };

    var createMenuItemFor = function (kontext) {
      return  contextMenu.Item({
        label: "Toggle Hackervision",
        image: self.data.url ("images/icon.png"),
        context: kontext,
        contentScript: 'self.on("click", function () {' +
          '  self.postMessage();' +
          '});',
        onMessage: function () {
          doActualWork ();
        }
      });
    };

    var createWidget = function () {
      new Widget({
        id: "sdqali-hackervision",
        label: "Toggle Hackervision",
        contentURL: self.data.url ("images/icon.png"),
        onClick: function(event) {
          doActualWork ();
        }
      });
    };

    var assignHotKeys = function () {
      return hotkeys.Hotkey({
        combo: "accel-alt-shift-c",
        onPress: function() {
          doActualWork ();
        }
      });
    };

    createMenuItemFor (contextMenu.SelectionContext ());
    createMenuItemFor (contextMenu.PageContext ());
    createWidget ();
    assignHotKeys ();
  };
}) ();
