"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"App\": function() { return /* binding */ App; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\nfunction _defineProperty(obj, key, value) {\n    if (key in obj) {\n        Object.defineProperty(obj, key, {\n            value: value,\n            enumerable: true,\n            configurable: true,\n            writable: true\n        });\n    } else {\n        obj[key] = value;\n    }\n    return obj;\n}\nfunction _objectSpread(target) {\n    for(var i = 1; i < arguments.length; i++){\n        var source = arguments[i] != null ? arguments[i] : {};\n        var ownKeys = Object.keys(source);\n        if (typeof Object.getOwnPropertySymbols === \"function\") {\n            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {\n                return Object.getOwnPropertyDescriptor(source, sym).enumerable;\n            }));\n        }\n        ownKeys.forEach(function(key) {\n            _defineProperty(target, key, source[key]);\n        });\n    }\n    return target;\n}\n\nvar ref = __webpack_require__(/*! abort-controller */ \"./node_modules/abort-controller/browser.js\"), AbortController = ref.default;\nvar wrapper = (__webpack_require__(/*! ../lib/store */ \"./lib/store.ts\").wrapper);\nvar ref1 = __webpack_require__(/*! node-fetch */ \"./node_modules/node-fetch/browser.js\"), fetch = ref1.default, Headers = ref1.Headers, Request = ref1.Request, Response = ref1.Response;\nObject.assign(globalThis, {\n    fetch: fetch,\n    Headers: Headers,\n    Request: Request,\n    Response: Response,\n    AbortController: AbortController\n});\nfunction App(param) {\n    var Component = param.Component, pageProps = param.pageProps;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, _objectSpread({}, pageProps), void 0, false, {\n        fileName: \"/Users/chibuzordaniel/coris-v2/pages/_app.tsx\",\n        lineNumber: 16,\n        columnNumber: 11\n    }, this);\n}\n_c = App;\n/* harmony default export */ __webpack_exports__[\"default\"] = (_c1 = wrapper.withRedux(App));\nvar _c, _c1;\n$RefreshReg$(_c, \"App\");\n$RefreshReg$(_c1, \"%default%\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxJQUFxQ0EsR0FBMkIsR0FBM0JBLG1CQUFPLENBQUMsb0VBQWtCLENBQUMsRUFBeERDLGVBQXdCLEdBQUtELEdBQTJCLENBQXhEQyxPQUFPO0FBQ2YsSUFBTSxPQUFTLEdBQUtELG1FQUFMO0FBQ2YsSUFBdURBLElBQXFCLEdBQXJCQSxtQkFBTyxDQUFDLHdEQUFZLENBQUMsRUFBcEVDLEtBQWMsR0FBaUNELElBQXFCLENBQXBFQyxPQUFPLEVBQVNJLE9BQU8sR0FBd0JMLElBQXFCLENBQXBESyxPQUFPLEVBQUVDLE9BQU8sR0FBZU4sSUFBcUIsQ0FBM0NNLE9BQU8sRUFBRUMsUUFBUSxHQUFLUCxJQUFxQixDQUFsQ08sUUFBUTtBQUdsREMsTUFBTSxDQUFDQyxNQUFNLENBQUNDLFVBQVUsRUFBRTtJQUN4Qk4sS0FBSyxFQUFMQSxLQUFLO0lBQ0xDLE9BQU8sRUFBUEEsT0FBTztJQUNQQyxPQUFPLEVBQVBBLE9BQU87SUFDUEMsUUFBUSxFQUFSQSxRQUFRO0lBQ1JMLGVBQWUsRUFBZkEsZUFBZTtDQUNoQixDQUFDLENBQUM7QUFFSSxTQUFTUyxHQUFHLENBQUMsS0FBa0MsRUFBRTtRQUFsQ0MsU0FBUyxHQUFYLEtBQWtDLENBQWhDQSxTQUFTLEVBQUVDLFNBQVMsR0FBdEIsS0FBa0MsQ0FBckJBLFNBQVM7SUFDeEMscUJBQVEsOERBQUNELFNBQVMsb0JBQUtDLFNBQVM7Ozs7WUFBSSxDQUFDO0NBQ3RDO0FBRmVGLEtBQUFBLEdBQUc7QUFJbkIsK0RBQWVSLE1BQUFBLE9BQU8sQ0FBQ1csU0FBUyxDQUFDSCxHQUFHLENBQUMsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9wYWdlcy9fYXBwLnRzeD8yZmJlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFByb3BzIH0gZnJvbSBcIm5leHQvYXBwXCI7XG5jb25zdCB7IGRlZmF1bHQ6IEFib3J0Q29udHJvbGxlciB9ID0gcmVxdWlyZShcImFib3J0LWNvbnRyb2xsZXJcIik7XG5jb25zdCB7IHdyYXBwZXIgfSA9IHJlcXVpcmUoXCIuLi9saWIvc3RvcmVcIik7XG5jb25zdCB7IGRlZmF1bHQ6IGZldGNoLCBIZWFkZXJzLCBSZXF1ZXN0LCBSZXNwb25zZSB9ID0gcmVxdWlyZShcIm5vZGUtZmV0Y2hcIik7XG5cblxuT2JqZWN0LmFzc2lnbihnbG9iYWxUaGlzLCB7XG4gIGZldGNoLFxuICBIZWFkZXJzLFxuICBSZXF1ZXN0LFxuICBSZXNwb25zZSxcbiAgQWJvcnRDb250cm9sbGVyLFxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9OiBBcHBQcm9wcykge1xuICByZXR1cm4gIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz47XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdyYXBwZXIud2l0aFJlZHV4KEFwcCk7XG4iXSwibmFtZXMiOlsicmVxdWlyZSIsImRlZmF1bHQiLCJBYm9ydENvbnRyb2xsZXIiLCJ3cmFwcGVyIiwiZmV0Y2giLCJIZWFkZXJzIiwiUmVxdWVzdCIsIlJlc3BvbnNlIiwiT2JqZWN0IiwiYXNzaWduIiwiZ2xvYmFsVGhpcyIsIkFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsIndpdGhSZWR1eCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ })

});