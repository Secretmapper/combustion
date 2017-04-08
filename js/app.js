(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("initialize.js", function(exports, require, module) {
'use strict';

document.addEventListener('DOMContentLoaded', function () {
  // do your setup here
});
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;

});

require.register("js/main.js", function(exports, require, module) {
'use strict';

//Write your stuff
//Add something to module.exports
//Require it from HTML as `var main = require(`js/main.js`)`
//Require it from another JS script as `var main = require(`./main.js`)`
(function () {
   'use strict';
})();
;

var _temp = function () {
   if (typeof __REACT_HOT_LOADER__ === 'undefined') {
      return;
   }
}();

;

});

require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');

"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (f) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }g.jade = f();
  }
})(function () {
  var define, module, exports;return function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
        }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
          var n = t[o][1][e];return s(n ? n : e);
        }, l, l.exports, e, t, n, r);
      }return n[o].exports;
    }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
      s(r[o]);
    }return s;
  }({ 1: [function (require, module, exports) {
      'use strict';

      /**
       * Merge two attribute objects giving precedence
       * to values in object `b`. Classes are special-cased
       * allowing for arrays and merging/joining appropriately
       * resulting in a string.
       *
       * @param {Object} a
       * @param {Object} b
       * @return {Object} a
       * @api private
       */

      exports.merge = function merge(a, b) {
        if (arguments.length === 1) {
          var attrs = a[0];
          for (var i = 1; i < a.length; i++) {
            attrs = merge(attrs, a[i]);
          }
          return attrs;
        }
        var ac = a['class'];
        var bc = b['class'];

        if (ac || bc) {
          ac = ac || [];
          bc = bc || [];
          if (!Array.isArray(ac)) ac = [ac];
          if (!Array.isArray(bc)) bc = [bc];
          a['class'] = ac.concat(bc).filter(nulls);
        }

        for (var key in b) {
          if (key != 'class') {
            a[key] = b[key];
          }
        }

        return a;
      };

      /**
       * Filter null `val`s.
       *
       * @param {*} val
       * @return {Boolean}
       * @api private
       */

      function nulls(val) {
        return val != null && val !== '';
      }

      /**
       * join array as classes.
       *
       * @param {*} val
       * @return {String}
       */
      exports.joinClasses = joinClasses;
      function joinClasses(val) {
        return (Array.isArray(val) ? val.map(joinClasses) : val && (typeof val === "undefined" ? "undefined" : _typeof(val)) === 'object' ? Object.keys(val).filter(function (key) {
          return val[key];
        }) : [val]).filter(nulls).join(' ');
      }

      /**
       * Render the given classes.
       *
       * @param {Array} classes
       * @param {Array.<Boolean>} escaped
       * @return {String}
       */
      exports.cls = function cls(classes, escaped) {
        var buf = [];
        for (var i = 0; i < classes.length; i++) {
          if (escaped && escaped[i]) {
            buf.push(exports.escape(joinClasses([classes[i]])));
          } else {
            buf.push(joinClasses(classes[i]));
          }
        }
        var text = joinClasses(buf);
        if (text.length) {
          return ' class="' + text + '"';
        } else {
          return '';
        }
      };

      exports.style = function (val) {
        if (val && (typeof val === "undefined" ? "undefined" : _typeof(val)) === 'object') {
          return Object.keys(val).map(function (style) {
            return style + ':' + val[style];
          }).join(';');
        } else {
          return val;
        }
      };
      /**
       * Render the given attribute.
       *
       * @param {String} key
       * @param {String} val
       * @param {Boolean} escaped
       * @param {Boolean} terse
       * @return {String}
       */
      exports.attr = function attr(key, val, escaped, terse) {
        if (key === 'style') {
          val = exports.style(val);
        }
        if ('boolean' == typeof val || null == val) {
          if (val) {
            return ' ' + (terse ? key : key + '="' + key + '"');
          } else {
            return '';
          }
        } else if (0 == key.indexOf('data') && 'string' != typeof val) {
          if (JSON.stringify(val).indexOf('&') !== -1) {
            console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' + 'will be escaped to `&amp;`');
          };
          if (val && typeof val.toISOString === 'function') {
            console.warn('Jade will eliminate the double quotes around dates in ' + 'ISO form after 2.0.0');
          }
          return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
        } else if (escaped) {
          if (val && typeof val.toISOString === 'function') {
            console.warn('Jade will stringify dates in ISO form after 2.0.0');
          }
          return ' ' + key + '="' + exports.escape(val) + '"';
        } else {
          if (val && typeof val.toISOString === 'function') {
            console.warn('Jade will stringify dates in ISO form after 2.0.0');
          }
          return ' ' + key + '="' + val + '"';
        }
      };

      /**
       * Render the given attributes object.
       *
       * @param {Object} obj
       * @param {Object} escaped
       * @return {String}
       */
      exports.attrs = function attrs(obj, terse) {
        var buf = [];

        var keys = Object.keys(obj);

        if (keys.length) {
          for (var i = 0; i < keys.length; ++i) {
            var key = keys[i],
                val = obj[key];

            if ('class' == key) {
              if (val = joinClasses(val)) {
                buf.push(' ' + key + '="' + val + '"');
              }
            } else {
              buf.push(exports.attr(key, val, false, terse));
            }
          }
        }

        return buf.join('');
      };

      /**
       * Escape the given string of `html`.
       *
       * @param {String} html
       * @return {String}
       * @api private
       */

      var jade_encode_html_rules = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;'
      };
      var jade_match_html = /[&<>"]/g;

      function jade_encode_char(c) {
        return jade_encode_html_rules[c] || c;
      }

      exports.escape = jade_escape;
      function jade_escape(html) {
        var result = String(html).replace(jade_match_html, jade_encode_char);
        if (result === '' + html) return html;else return result;
      };

      /**
       * Re-throw the given `err` in context to the
       * the jade in `filename` at the given `lineno`.
       *
       * @param {Error} err
       * @param {String} filename
       * @param {String} lineno
       * @api private
       */

      exports.rethrow = function rethrow(err, filename, lineno, str) {
        if (!(err instanceof Error)) throw err;
        if ((typeof window != 'undefined' || !filename) && !str) {
          err.message += ' on line ' + lineno;
          throw err;
        }
        try {
          str = str || require('fs').readFileSync(filename, 'utf8');
        } catch (ex) {
          rethrow(err, null, lineno);
        }
        var context = 3,
            lines = str.split('\n'),
            start = Math.max(lineno - context, 0),
            end = Math.min(lines.length, lineno + context);

        // Error context
        var context = lines.slice(start, end).map(function (line, i) {
          var curr = i + start + 1;
          return (curr == lineno ? '  > ' : '    ') + curr + '| ' + line;
        }).join('\n');

        // Alter exception message
        err.path = filename;
        err.message = (filename || 'Jade') + ':' + lineno + '\n' + context + '\n\n' + err.message;
        throw err;
      };

      exports.DebugItem = function DebugItem(lineno, filename) {
        this.lineno = lineno;
        this.filename = filename;
      };
    }, { "fs": 2 }], 2: [function (require, module, exports) {}, {}] }, {}, [1])(1);
});
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;


//# sourceMappingURL=/js/app.js.map