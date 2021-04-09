webpackHotUpdate_N_E("pages/shopping",{

/***/ "./components/ecommerce/segmentMenu.js":
/*!*********************************************!*\
  !*** ./components/ecommerce/segmentMenu.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react_instantsearch_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-instantsearch-dom */ \"./node_modules/react-instantsearch-dom/dist/es/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _segmentMenu_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./segmentMenu.module.scss */ \"./components/ecommerce/segmentMenu.module.scss\");\n/* harmony import */ var _segmentMenu_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_segmentMenu_module_scss__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ \"./node_modules/classnames/index.js\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var _redux_reducers_ecommerce_ux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../redux/reducers/ecommerce/ux */ \"./redux/reducers/ecommerce/ux.js\");\n/* harmony import */ var _redux_reducers_ecommerce_sizes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../redux/reducers/ecommerce/sizes */ \"./redux/reducers/ecommerce/sizes.js\");\nvar _this = undefined,\n    _jsxFileName = \"/Users/psfr937/Development/main/dg-web-server/components/ecommerce/segmentMenu.js\",\n    _s = $RefreshSig$();\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;\n\n\n\nvar namespace = 'refinementList';\n\n\n\n\n\nvar MySearchBox = function MySearchBox(_ref) {\n  _s();\n\n  var currentRefinement = _ref.currentRefinement,\n      refine = _ref.refine;\n  var selectedSegment = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__[\"useSelector\"])(function (state) {\n    return state.ux.selectedSegment;\n  });\n  var sizes = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__[\"useSelector\"])(function (state) {\n    return state.sizes;\n  });\n  var segments = sizes.readyStatus !== _redux_reducers_ecommerce_sizes__WEBPACK_IMPORTED_MODULE_6__[\"FETCH_SIZES_SUCCESS\"] ? [] : Object.keys(sizes.data).map(function (k) {\n    return sizes.data[k];\n  });\n\n  var _onClick = function onClick(s) {\n    dispatch({\n      type: _redux_reducers_ecommerce_ux__WEBPACK_IMPORTED_MODULE_5__[\"SET_UX_VALUE\"],\n      key: 'selectedSegment',\n      value: s.value\n    });\n    refine(s.value);\n  };\n\n  var sizeButtonClass = function sizeButtonClass(value) {\n    return selectedSegment === value ? classnames__WEBPACK_IMPORTED_MODULE_3___default()(_segmentMenu_module_scss__WEBPACK_IMPORTED_MODULE_2___default.a.sizeItem, _segmentMenu_module_scss__WEBPACK_IMPORTED_MODULE_2___default.a.selected) : _segmentMenu_module_scss__WEBPACK_IMPORTED_MODULE_2___default.a.sizeItem;\n  };\n\n  return __jsx(\"div\", {\n    className: _segmentMenu_module_scss__WEBPACK_IMPORTED_MODULE_2___default.a.sizeList,\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 28,\n      columnNumber: 10\n    }\n  }, segments.map(function (s) {\n    return __jsx(\"button\", {\n      className: sizeButtonClass(s.value),\n      onClick: function onClick() {\n        return _onClick(s);\n      },\n      __self: _this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 30,\n        columnNumber: 10\n      }\n    }, s.label);\n  }));\n};\n\n_s(MySearchBox, \"Lb3YQNqhtLM2UPPiesXwk/mBie0=\", false, function () {\n  return [react_redux__WEBPACK_IMPORTED_MODULE_4__[\"useSelector\"], react_redux__WEBPACK_IMPORTED_MODULE_4__[\"useSelector\"]];\n});\n\n_c = MySearchBox;\n/* harmony default export */ __webpack_exports__[\"default\"] = (_c2 = Object(react_instantsearch_dom__WEBPACK_IMPORTED_MODULE_0__[\"connectRefinementList\"])(MySearchBox));\n\nvar _c, _c2;\n\n$RefreshReg$(_c, \"MySearchBox\");\n$RefreshReg$(_c2, \"%default%\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9lY29tbWVyY2Uvc2VnbWVudE1lbnUuanM/MzY0OSJdLCJuYW1lcyI6WyJuYW1lc3BhY2UiLCJNeVNlYXJjaEJveCIsImN1cnJlbnRSZWZpbmVtZW50IiwicmVmaW5lIiwic2VsZWN0ZWRTZWdtZW50IiwidXNlU2VsZWN0b3IiLCJzdGF0ZSIsInV4Iiwic2l6ZXMiLCJzZWdtZW50cyIsInJlYWR5U3RhdHVzIiwiRkVUQ0hfU0laRVNfU1VDQ0VTUyIsIk9iamVjdCIsImtleXMiLCJkYXRhIiwibWFwIiwiayIsIm9uQ2xpY2siLCJzIiwiZGlzcGF0Y2giLCJ0eXBlIiwiU0VUX1VYX1ZBTFVFIiwia2V5IiwidmFsdWUiLCJzaXplQnV0dG9uQ2xhc3MiLCJjbGFzc25hbWVzIiwic3QiLCJzaXplSXRlbSIsInNlbGVjdGVkIiwic2l6ZUxpc3QiLCJsYWJlbCIsImNvbm5lY3RSZWZpbmVtZW50TGlzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBLElBQU1BLFNBQVMsR0FBRyxnQkFBbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNQyxXQUFXLEdBQUcsU0FBZEEsV0FBYyxPQUFtQztBQUFBOztBQUFBLE1BQWhDQyxpQkFBZ0MsUUFBaENBLGlCQUFnQztBQUFBLE1BQWJDLE1BQWEsUUFBYkEsTUFBYTtBQUdyRCxNQUFNQyxlQUFlLEdBQUdDLCtEQUFXLENBQUMsVUFBQUMsS0FBSztBQUFBLFdBQUlBLEtBQUssQ0FBQ0MsRUFBTixDQUFTSCxlQUFiO0FBQUEsR0FBTixDQUFuQztBQUNBLE1BQU1JLEtBQUssR0FBR0gsK0RBQVcsQ0FBQyxVQUFBQyxLQUFLO0FBQUEsV0FBSUEsS0FBSyxDQUFDRSxLQUFWO0FBQUEsR0FBTixDQUF6QjtBQUNBLE1BQU1DLFFBQVEsR0FBSUQsS0FBSyxDQUFDRSxXQUFOLEtBQXNCQyxtRkFBdkIsR0FBOEMsRUFBOUMsR0FDYkMsTUFBTSxDQUFDQyxJQUFQLENBQVlMLEtBQUssQ0FBQ00sSUFBbEIsRUFBd0JDLEdBQXhCLENBQTRCLFVBQUFDLENBQUM7QUFBQSxXQUFJUixLQUFLLENBQUNNLElBQU4sQ0FBV0UsQ0FBWCxDQUFKO0FBQUEsR0FBN0IsQ0FESjs7QUFHQSxNQUFNQyxRQUFPLEdBQUcsU0FBVkEsT0FBVSxDQUFDQyxDQUFELEVBQU87QUFDbkJDLFlBQVEsQ0FBQztBQUFDQyxVQUFJLEVBQUVDLHlFQUFQO0FBQXFCQyxTQUFHLEVBQUUsaUJBQTFCO0FBQTZDQyxXQUFLLEVBQUVMLENBQUMsQ0FBQ0s7QUFBdEQsS0FBRCxDQUFSO0FBQ0FwQixVQUFNLENBQUNlLENBQUMsQ0FBQ0ssS0FBSCxDQUFOO0FBQ0gsR0FIRDs7QUFLQSxNQUFNQyxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLENBQUNELEtBQUQsRUFBVztBQUNqQyxXQUFPbkIsZUFBZSxLQUFLbUIsS0FBcEIsR0FBNEJFLGlEQUFVLENBQUNDLCtEQUFFLENBQUNDLFFBQUosRUFBY0QsK0RBQUUsQ0FBQ0UsUUFBakIsQ0FBdEMsR0FBbUVGLCtEQUFFLENBQUNDLFFBQTdFO0FBQ0QsR0FGRDs7QUFLQSxTQUFPO0FBQUssYUFBUyxFQUFFRCwrREFBRSxDQUFDRyxRQUFuQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0pwQixRQUFRLENBQUNNLEdBQVQsQ0FBYyxVQUFBRyxDQUFDO0FBQUEsV0FDWDtBQUNDLGVBQVMsRUFBRU0sZUFBZSxDQUFDTixDQUFDLENBQUNLLEtBQUgsQ0FEM0I7QUFDc0MsYUFBTyxFQUFFO0FBQUEsZUFBTU4sUUFBTyxDQUFDQyxDQUFELENBQWI7QUFBQSxPQUQvQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BRUNBLENBQUMsQ0FBQ1ksS0FGSCxDQURXO0FBQUEsR0FBZixDQURJLENBQVA7QUFhRCxDQS9CRDs7R0FBTTdCLFc7VUFHb0JJLHVELEVBQ1ZBLHVEOzs7S0FKVkosVztBQWlDUyxxRUFBQThCLHFGQUFxQixDQUFDOUIsV0FBRCxDQUFwQyIsImZpbGUiOiIuL2NvbXBvbmVudHMvZWNvbW1lcmNlL3NlZ21lbnRNZW51LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29ubmVjdFJlZmluZW1lbnRMaXN0IH0gZnJvbSAncmVhY3QtaW5zdGFudHNlYXJjaC1kb20nXG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHN0IGZyb20gXCIuL3NlZ21lbnRNZW51Lm1vZHVsZS5zY3NzXCJcbmNvbnN0IG5hbWVzcGFjZSA9ICdyZWZpbmVtZW50TGlzdCc7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJ1xuaW1wb3J0IHt1c2VTZWxlY3Rvcn0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XG5pbXBvcnQgeyBTRVRfVVhfVkFMVUUgfSBmcm9tIFwiLi4vLi4vcmVkdXgvcmVkdWNlcnMvZWNvbW1lcmNlL3V4XCI7XG5pbXBvcnQge0ZFVENIX1NJWkVTX1NVQ0NFU1N9IGZyb20gXCIuLi8uLi9yZWR1eC9yZWR1Y2Vycy9lY29tbWVyY2Uvc2l6ZXNcIjtcblxuY29uc3QgTXlTZWFyY2hCb3ggPSAoeyBjdXJyZW50UmVmaW5lbWVudCwgcmVmaW5lIH0pID0+IHtcblxuXG4gIGNvbnN0IHNlbGVjdGVkU2VnbWVudCA9IHVzZVNlbGVjdG9yKHN0YXRlID0+IHN0YXRlLnV4LnNlbGVjdGVkU2VnbWVudCk7XG4gIGNvbnN0IHNpemVzID0gdXNlU2VsZWN0b3Ioc3RhdGUgPT4gc3RhdGUuc2l6ZXMpO1xuICBjb25zdCBzZWdtZW50cyA9IChzaXplcy5yZWFkeVN0YXR1cyAhPT0gRkVUQ0hfU0laRVNfU1VDQ0VTUykgPyBbXVxuICAgIDogT2JqZWN0LmtleXMoc2l6ZXMuZGF0YSkubWFwKGsgPT4gc2l6ZXMuZGF0YVtrXSk7XG5cbiAgY29uc3Qgb25DbGljayA9IChzKSA9PiB7XG4gICAgICBkaXNwYXRjaCh7dHlwZTogU0VUX1VYX1ZBTFVFLCBrZXk6ICdzZWxlY3RlZFNlZ21lbnQnLCB2YWx1ZTogcy52YWx1ZX0pO1xuICAgICAgcmVmaW5lKHMudmFsdWUpXG4gIH07XG5cbiAgY29uc3Qgc2l6ZUJ1dHRvbkNsYXNzID0gKHZhbHVlKSA9PiB7XG4gICAgcmV0dXJuIHNlbGVjdGVkU2VnbWVudCA9PT0gdmFsdWUgPyBjbGFzc25hbWVzKHN0LnNpemVJdGVtLCBzdC5zZWxlY3RlZCkgOiBzdC5zaXplSXRlbVxuICB9XG5cblxuICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e3N0LnNpemVMaXN0fT5cbiAgICB7c2VnbWVudHMubWFwKCBzID0+IChcbiAgICAgICAgIDxidXR0b25cbiAgICAgICAgICBjbGFzc05hbWU9e3NpemVCdXR0b25DbGFzcyhzLnZhbHVlKX0gb25DbGljaz17KCkgPT4gb25DbGljayhzKX0+XG4gICAgICAgICB7cy5sYWJlbH1cbiAgICAgICAgPC9idXR0b24+XG4gICAgKSlcbiAgICB9XG5cbiAgICAgIDwvZGl2PlxuXG5cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdFJlZmluZW1lbnRMaXN0KE15U2VhcmNoQm94KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/ecommerce/segmentMenu.js\n");

/***/ })

})