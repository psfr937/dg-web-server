webpackHotUpdate_N_E("pages/_app",{

/***/ "./redux/actions/ecommerce/inventories.js":
/*!************************************************!*\
  !*** ./redux/actions/ecommerce/inventories.js ***!
  \************************************************/
/*! exports provided: EMPTY_INVENTORY, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EMPTY_INVENTORY\", function() { return EMPTY_INVENTORY; });\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _api_ecommerce_inventories__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../api/ecommerce/inventories */ \"./api/ecommerce/inventories.js\");\n/* harmony import */ var _helpers_handleErrors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../helpers/handleErrors */ \"./helpers/handleErrors.js\");\n/* harmony import */ var _reducers_ecommerce_oneInventory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../reducers/ecommerce/oneInventory */ \"./redux/reducers/ecommerce/oneInventory.js\");\n/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux-saga/effects */ \"./node_modules/redux-saga/dist/redux-saga-effects-npm-proxy.esm.js\");\n/* harmony import */ var _reducers_cms_editInventory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../reducers/cms/editInventory */ \"./redux/reducers/cms/editInventory.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/router */ \"./node_modules/next/dist/client/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);\n\n\nvar _marked = /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(fetchOneInventory),\n    _marked2 = /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(emptyInventory);\n\n\n\n\n\n\n\nvar EMPTY_INVENTORY = 'EMPTY_INVENTORY';\n\nfunction fetchOneInventory(_ref) {\n  var pid, oneInventory, json, newErr;\n  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function fetchOneInventory$(_context) {\n    while (1) {\n      switch (_context.prev = _context.next) {\n        case 0:\n          pid = _ref.pid;\n          oneInventory = Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__[\"select\"])(function (state) {\n            return state.oneInventory;\n          });\n\n          if (!(pid in oneInventory && (oneInventory[pid].readyStatus === _reducers_ecommerce_oneInventory__WEBPACK_IMPORTED_MODULE_3__[\"FETCH_ONE_INVENTORY_SUCCESS\"] || oneInventory[pid].readyStatus === _reducers_ecommerce_oneInventory__WEBPACK_IMPORTED_MODULE_3__[\"FETCH_ONE_INVENTORY_REQUESTING\"]))) {\n            _context.next = 4;\n            break;\n          }\n\n          return _context.abrupt(\"return\");\n\n        case 4:\n          _context.next = 6;\n          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__[\"put\"])({\n            type: _reducers_ecommerce_oneInventory__WEBPACK_IMPORTED_MODULE_3__[\"SELECT_INVENTORY_ID\"],\n            id: parseInt(pid)\n          });\n\n        case 6:\n          _context.next = 8;\n          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__[\"put\"])({\n            type: _reducers_ecommerce_oneInventory__WEBPACK_IMPORTED_MODULE_3__[\"FETCH_ONE_INVENTORY_REQUESTING\"]\n          });\n\n        case 8:\n          _context.prev = 8;\n          _context.next = 11;\n          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__[\"call\"])(_api_ecommerce_inventories__WEBPACK_IMPORTED_MODULE_1__[\"default\"].get, pid);\n\n        case 11:\n          json = _context.sent;\n          _context.next = 14;\n          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__[\"all\"])([Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__[\"put\"])({\n            type: _reducers_cms_editInventory__WEBPACK_IMPORTED_MODULE_5__[\"CLONE_INVENTORY\"],\n            pid: pid,\n            data: json.data.data\n          }), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__[\"put\"])({\n            type: _reducers_ecommerce_oneInventory__WEBPACK_IMPORTED_MODULE_3__[\"FETCH_ONE_INVENTORY_SUCCESS\"],\n            data: json.data.data\n          })]);\n\n        case 14:\n          _context.next = 25;\n          break;\n\n        case 16:\n          _context.prev = 16;\n          _context.t0 = _context[\"catch\"](8);\n          console.log(_context.t0);\n          console.log(typeof _context.t0);\n          console.log(JSON.stringify(_context.t0));\n          newErr = Object(_helpers_handleErrors__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_context.t0);\n          _context.next = 24;\n          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__[\"put\"])({\n            type: _reducers_ecommerce_oneInventory__WEBPACK_IMPORTED_MODULE_3__[\"FETCH_ONE_INVENTORY_FAILURE\"],\n            err: newErr\n          });\n\n        case 24:\n          Router.push('/error');\n\n        case 25:\n        case \"end\":\n          return _context.stop();\n      }\n    }\n  }, _marked, null, [[8, 16]]);\n}\n\nfunction emptyInventory(_ref2) {\n  var data;\n  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function emptyInventory$(_context2) {\n    while (1) {\n      switch (_context2.prev = _context2.next) {\n        case 0:\n          data = _ref2.data;\n          _context2.next = 3;\n          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__[\"all\"])([Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__[\"put\"])({\n            type: _reducers_cms_editInventory__WEBPACK_IMPORTED_MODULE_5__[\"CLONE_INVENTORY\"],\n            data: data\n          }), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__[\"put\"])({\n            type: _reducers_ecommerce_oneInventory__WEBPACK_IMPORTED_MODULE_3__[\"FETCH_ONE_INVENTORY_SUCCESS\"],\n            data: data\n          })]);\n\n        case 3:\n        case \"end\":\n          return _context2.stop();\n      }\n    }\n  }, _marked2);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ([Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__[\"takeEvery\"])(_reducers_ecommerce_oneInventory__WEBPACK_IMPORTED_MODULE_3__[\"FETCH_ONE_INVENTORY\"], fetchOneInventory), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__[\"takeEvery\"])(EMPTY_INVENTORY, emptyInventory)]);\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcmVkdXgvYWN0aW9ucy9lY29tbWVyY2UvaW52ZW50b3JpZXMuanM/ZWI0ZCJdLCJuYW1lcyI6WyJmZXRjaE9uZUludmVudG9yeSIsImVtcHR5SW52ZW50b3J5IiwiRU1QVFlfSU5WRU5UT1JZIiwicGlkIiwib25lSW52ZW50b3J5Iiwic2VsZWN0Iiwic3RhdGUiLCJyZWFkeVN0YXR1cyIsIkZFVENIX09ORV9JTlZFTlRPUllfU1VDQ0VTUyIsIkZFVENIX09ORV9JTlZFTlRPUllfUkVRVUVTVElORyIsInB1dCIsInR5cGUiLCJTRUxFQ1RfSU5WRU5UT1JZX0lEIiwiaWQiLCJwYXJzZUludCIsImNhbGwiLCJpbnZlbnRvcnlBUEkiLCJnZXQiLCJqc29uIiwiYWxsIiwiQ0xPTkVfSU5WRU5UT1JZIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJKU09OIiwic3RyaW5naWZ5IiwibmV3RXJyIiwiaGFuZGxlRXJyb3JzIiwiRkVUQ0hfT05FX0lOVkVOVE9SWV9GQUlMVVJFIiwiZXJyIiwiUm91dGVyIiwicHVzaCIsInRha2VFdmVyeSIsIkZFVENIX09ORV9JTlZFTlRPUlkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7a0dBY1VBLGlCO21HQTJCQUMsYzs7QUF6Q1Y7QUFDQTtBQUVBO0FBTUE7QUFDQTtBQUNBO0FBQ08sSUFBTUMsZUFBZSxHQUFHLGlCQUF4Qjs7QUFFUCxTQUFVRixpQkFBVjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBOEJHLGFBQTlCLFFBQThCQSxHQUE5QjtBQUNNQyxzQkFETixHQUNxQkMsaUVBQU0sQ0FBQyxVQUFBQyxLQUFLO0FBQUEsbUJBQUlBLEtBQUssQ0FBQ0YsWUFBVjtBQUFBLFdBQU4sQ0FEM0I7O0FBQUEsZ0JBR0tELEdBQUcsSUFBSUMsWUFBUCxLQUNBQSxZQUFZLENBQUNELEdBQUQsQ0FBWixDQUFrQkksV0FBbEIsS0FBa0NDLDRGQUFsQyxJQUNDSixZQUFZLENBQUNELEdBQUQsQ0FBWixDQUFrQkksV0FBbEIsS0FBbUNFLCtGQUZwQyxDQUhMO0FBQUE7QUFBQTtBQUFBOztBQUFBOztBQUFBO0FBQUE7QUFRRSxpQkFBTUMsOERBQUcsQ0FBQztBQUFDQyxnQkFBSSxFQUFFQyxvRkFBUDtBQUE0QkMsY0FBRSxFQUFFQyxRQUFRLENBQUNYLEdBQUQ7QUFBeEMsV0FBRCxDQUFUOztBQVJGO0FBQUE7QUFTRSxpQkFBTU8sOERBQUcsQ0FBQztBQUFDQyxnQkFBSSxFQUFFRiwrRkFBOEJBO0FBQXJDLFdBQUQsQ0FBVDs7QUFURjtBQUFBO0FBQUE7QUFZaUIsaUJBQU1NLCtEQUFJLENBQUNDLGtFQUFZLENBQUNDLEdBQWQsRUFBbUJkLEdBQW5CLENBQVY7O0FBWmpCO0FBWVVlLGNBWlY7QUFBQTtBQWFJLGlCQUFNQyw4REFBRyxDQUFDLENBQ1JULDhEQUFHLENBQUM7QUFBQ0MsZ0JBQUksRUFBRVMsMkVBQVA7QUFBd0JqQixlQUFHLEVBQUVBLEdBQTdCO0FBQWtDa0IsZ0JBQUksRUFBRUgsSUFBSSxDQUFDRyxJQUFMLENBQVVBO0FBQWxELFdBQUQsQ0FESyxFQUVSWCw4REFBRyxDQUFDO0FBQUNDLGdCQUFJLEVBQUVILDRGQUFQO0FBQW9DYSxnQkFBSSxFQUFFSCxJQUFJLENBQUNHLElBQUwsQ0FBVUE7QUFBcEQsV0FBRCxDQUZLLENBQUQsQ0FBVDs7QUFiSjtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBa0JJQyxpQkFBTyxDQUFDQyxHQUFSO0FBQ0FELGlCQUFPLENBQUNDLEdBQVIsQ0FBWSxrQkFBWjtBQUNBRCxpQkFBTyxDQUFDQyxHQUFSLENBQVlDLElBQUksQ0FBQ0MsU0FBTCxhQUFaO0FBQ01DLGdCQXJCVixHQXFCbUJDLHFFQUFZLGFBckIvQjtBQUFBO0FBc0JJLGlCQUFNakIsOERBQUcsQ0FBQztBQUFDQyxnQkFBSSxFQUFFaUIsNEZBQVA7QUFBb0NDLGVBQUcsRUFBRUg7QUFBekMsV0FBRCxDQUFUOztBQXRCSjtBQXVCSUksZ0JBQU0sQ0FBQ0MsSUFBUCxDQUFZLFFBQVo7O0FBdkJKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQTJCQSxTQUFVOUIsY0FBVjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBMkJvQixjQUEzQixTQUEyQkEsSUFBM0I7QUFBQTtBQUVJLGlCQUFNRiw4REFBRyxDQUFDLENBQ1JULDhEQUFHLENBQUM7QUFBQ0MsZ0JBQUksRUFBRVMsMkVBQVA7QUFBeUJDLGdCQUFJLEVBQUVBO0FBQS9CLFdBQUQsQ0FESyxFQUVSWCw4REFBRyxDQUFDO0FBQUNDLGdCQUFJLEVBQUVILDRGQUFQO0FBQW9DYSxnQkFBSSxFQUFFQTtBQUExQyxXQUFELENBRkssQ0FBRCxDQUFUOztBQUZKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVVlLGdFQUNiVyxvRUFBUyxDQUFDQyxvRkFBRCxFQUFzQmpDLGlCQUF0QixDQURJLEVBRWJnQyxvRUFBUyxDQUFDOUIsZUFBRCxFQUFrQkQsY0FBbEIsQ0FGSSxDQUFmIiwiZmlsZSI6Ii4vcmVkdXgvYWN0aW9ucy9lY29tbWVyY2UvaW52ZW50b3JpZXMuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaW52ZW50b3J5QVBJIGZyb20gJy4uLy4uLy4uL2FwaS9lY29tbWVyY2UvaW52ZW50b3JpZXMnXG5pbXBvcnQgaGFuZGxlRXJyb3JzIGZyb20gXCIuLi8uLi8uLi9oZWxwZXJzL2hhbmRsZUVycm9yc1wiO1xuXG5pbXBvcnQge1xuICBGRVRDSF9PTkVfSU5WRU5UT1JZX0ZBSUxVUkUsXG4gIEZFVENIX09ORV9JTlZFTlRPUllfU1VDQ0VTUyxcbiAgRkVUQ0hfT05FX0lOVkVOVE9SWV9SRVFVRVNUSU5HLCBGRVRDSF9PTkVfSU5WRU5UT1JZLCBTRUxFQ1RfSU5WRU5UT1JZX0lEXG59IGZyb20gXCIuLi8uLi9yZWR1Y2Vycy9lY29tbWVyY2Uvb25lSW52ZW50b3J5XCI7XG5cbmltcG9ydCB7IGFsbCwgc2VsZWN0LCBwdXQsIGNhbGwsIGZvcmssIHRha2VFdmVyeSB9IGZyb20gXCJyZWR1eC1zYWdhL2VmZmVjdHNcIlxuaW1wb3J0IHtDTE9ORV9JTlZFTlRPUll9IGZyb20gXCIuLi8uLi9yZWR1Y2Vycy9jbXMvZWRpdEludmVudG9yeVwiO1xuaW1wb3J0IHJvdXRlciBmcm9tICduZXh0L3JvdXRlcidcbmV4cG9ydCBjb25zdCBFTVBUWV9JTlZFTlRPUlkgPSAnRU1QVFlfSU5WRU5UT1JZJztcblxuZnVuY3Rpb24gKmZldGNoT25lSW52ZW50b3J5KHsgcGlkIH0pe1xuICBsZXQgb25lSW52ZW50b3J5ID0gc2VsZWN0KHN0YXRlID0+IHN0YXRlLm9uZUludmVudG9yeSk7XG5cbiAgaWYocGlkIGluIG9uZUludmVudG9yeSAmJlxuICAgIChvbmVJbnZlbnRvcnlbcGlkXS5yZWFkeVN0YXR1cyA9PT0gRkVUQ0hfT05FX0lOVkVOVE9SWV9TVUNDRVNTIHx8XG4gICAgICBvbmVJbnZlbnRvcnlbcGlkXS5yZWFkeVN0YXR1cyA9PT0gIEZFVENIX09ORV9JTlZFTlRPUllfUkVRVUVTVElORylcbiAgKSByZXR1cm47XG5cbiAgeWllbGQgcHV0KHt0eXBlOiBTRUxFQ1RfSU5WRU5UT1JZX0lELCBpZDogcGFyc2VJbnQocGlkKX0pO1xuICB5aWVsZCBwdXQoe3R5cGU6IEZFVENIX09ORV9JTlZFTlRPUllfUkVRVUVTVElOR30pO1xuXG4gIHRyeSB7XG4gICAgY29uc3QganNvbiA9IHlpZWxkIGNhbGwoaW52ZW50b3J5QVBJLmdldCwgcGlkKTtcbiAgICB5aWVsZCBhbGwoW1xuICAgICAgcHV0KHt0eXBlOiBDTE9ORV9JTlZFTlRPUlksIHBpZDogcGlkLCBkYXRhOiBqc29uLmRhdGEuZGF0YX0pLFxuICAgICAgcHV0KHt0eXBlOiBGRVRDSF9PTkVfSU5WRU5UT1JZX1NVQ0NFU1MsIGRhdGE6IGpzb24uZGF0YS5kYXRhfSksXG4gICAgXSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgY29uc29sZS5sb2codHlwZW9mIGVycik7XG4gICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyKSk7XG4gICAgY29uc3QgbmV3RXJyID0gaGFuZGxlRXJyb3JzKGVycik7XG4gICAgeWllbGQgcHV0KHt0eXBlOiBGRVRDSF9PTkVfSU5WRU5UT1JZX0ZBSUxVUkUsIGVycjogbmV3RXJyfSlcbiAgICBSb3V0ZXIucHVzaCgnL2Vycm9yJylcbiAgfVxufVxuXG5mdW5jdGlvbiAqZW1wdHlJbnZlbnRvcnkoeyBkYXRhIH0pe1xuXG4gICAgeWllbGQgYWxsKFtcbiAgICAgIHB1dCh7dHlwZTogQ0xPTkVfSU5WRU5UT1JZLCAgZGF0YTogZGF0YX0pLFxuICAgICAgcHV0KHt0eXBlOiBGRVRDSF9PTkVfSU5WRU5UT1JZX1NVQ0NFU1MsIGRhdGE6IGRhdGF9KSxcbiAgICBdKTtcblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFtcbiAgdGFrZUV2ZXJ5KEZFVENIX09ORV9JTlZFTlRPUlksIGZldGNoT25lSW52ZW50b3J5KSxcbiAgdGFrZUV2ZXJ5KEVNUFRZX0lOVkVOVE9SWSwgZW1wdHlJbnZlbnRvcnkpXG5dIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./redux/actions/ecommerce/inventories.js\n");

/***/ })

})