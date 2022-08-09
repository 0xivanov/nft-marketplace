/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./server/db/nft.js":
/*!**************************!*\
  !*** ./server/db/nft.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nmongoose.connect('mongodb://localhost:27017/db', {\n  useNewUrlParser: true\n});\nconst NFT = mongoose.model('NFT', {\n  title: {\n    type: String\n  },\n  desc: {\n    type: String\n  },\n  imgFormat: {\n    type: String\n  },\n  img: {\n    type: Buffer\n  },\n  creator: {\n    type: String\n  },\n  creatorImg: {\n    type: String\n  },\n  currentBid: {\n    type: Number\n  },\n  category: {\n    type: String\n  },\n  expirationDate: {\n    type: Date\n  },\n  views: {\n    type: Number,\n    required: false,\n    default: 0\n  },\n  likes: {\n    type: Number,\n    required: false,\n    default: 0\n  }\n});\n\nconst create = async nft => {\n  const _nft = new NFT(nft);\n\n  _nft.save().then(() => {\n    console.log(NFT);\n  }).catch(e => {\n    console.log(e);\n  });\n};\n\nconst getAll = fn => {\n  NFT.find({}).then(nfts => {\n    fn(nfts);\n  }).catch(e => {\n    console.log(e);\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  create,\n  getAll\n});\n\n//# sourceURL=webpack://ntf-marketplace/./server/db/nft.js?");

/***/ }),

/***/ "./server/index.js":
/*!*************************!*\
  !*** ./server/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _db_nft__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./db/nft */ \"./server/db/nft.js\");\n\n\nvar bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\n\nconst app = express__WEBPACK_IMPORTED_MODULE_0__();\napp.use(bodyParser.json({\n  limit: '50mb'\n}));\napp.use(bodyParser.urlencoded({\n  parameterLimit: 10000000,\n  limit: '50mb',\n  extended: true\n}));\nconst port = 3001;\napp.post('/create', (req, resp) => {\n  console.log(req.body);\n  _db_nft__WEBPACK_IMPORTED_MODULE_1__[\"default\"].create(req.body);\n  resp.send(req.body);\n});\napp.get('/market', (req, resp) => {\n  _db_nft__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getAll(result => {\n    resp.send(result);\n  });\n});\napp.listen(port, () => {\n  console.log(`Server is listening on port ${port}`);\n});\n\n//# sourceURL=webpack://ntf-marketplace/./server/index.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("body-parser");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./server/index.js");
/******/ 	
/******/ })()
;