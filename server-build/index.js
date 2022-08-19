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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nmongoose.connect('mongodb://localhost:27017/123', {\n  useNewUrlParser: true,\n  useUnifiedTopology: true,\n  serverSelectionTimeoutMS: 5000,\n  autoIndex: false,\n  // Don't build indexes\n  maxPoolSize: 10,\n  // Maintain up to 10 socket connections\n  serverSelectionTimeoutMS: 5000,\n  // Keep trying to send operations for 5 seconds\n  socketTimeoutMS: 45000,\n  // Close sockets after 45 seconds of inactivity\n  family: 4 // Use IPv4, skip trying IPv6\n\n});\nconst NFT = mongoose.model('NFT', {\n  title: {\n    type: String\n  },\n  desc: {\n    type: String\n  },\n  imgFormat: {\n    type: String\n  },\n  img: {\n    type: Buffer\n  },\n  creator: {\n    type: String\n  },\n  creatorImg: {\n    type: String\n  },\n  currentBid: {\n    type: Number\n  },\n  category: {\n    type: String\n  },\n  expirationDate: {\n    type: Date\n  },\n  likes: {\n    type: Number,\n    required: false,\n    default: 0\n  }\n});\n\nconst create = async nft => {\n  const _nft = new NFT(nft);\n\n  _nft.save().then(() => {\n    console.log(\"created new nft\");\n  }).catch(e => {\n    console.log(e);\n  });\n};\n\nconst getAll = fn => {\n  NFT.find({}).then(nfts => {\n    fn(nfts);\n  }).catch(e => {\n    console.log(e);\n  });\n};\n\nconst like = (isLiked, _id) => {\n  console.log(isLiked.isLiked);\n  if (isLiked.isLiked) NFT.findOneAndUpdate({\n    _id: _id\n  }, {\n    $inc: {\n      'likes': -1\n    }\n  }).exec();else NFT.findOneAndUpdate({\n    _id: _id\n  }, {\n    $inc: {\n      'likes': 1\n    }\n  }).exec();\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  create,\n  getAll,\n  like\n});\n\n//# sourceURL=webpack://ntf-marketplace/./server/db/nft.js?");

/***/ }),

/***/ "./server/index.js":
/*!*************************!*\
  !*** ./server/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _db_nft__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./db/nft */ \"./server/db/nft.js\");\n\n\nvar bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\n\n\nconst cors = __webpack_require__(/*! cors */ \"cors\");\n\nconst app = express__WEBPACK_IMPORTED_MODULE_0__();\napp.use(bodyParser.json({\n  limit: '50mb'\n}));\napp.use(bodyParser.urlencoded({\n  parameterLimit: 10000000,\n  limit: '50mb',\n  extended: true\n}));\napp.use(cors());\nconst port = 3001;\napp.get('/login', (req, res) => {\n  res.send({\n    token: 'test123'\n  });\n});\napp.post('/create', (req, resp) => {\n  _db_nft__WEBPACK_IMPORTED_MODULE_1__[\"default\"].create(req.body);\n  resp.send(req.body);\n});\napp.get('/market', (req, resp) => {\n  _db_nft__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getAll(result => {\n    resp.send(result);\n  });\n});\napp.post('/market/:_id', (req, resp) => {\n  _db_nft__WEBPACK_IMPORTED_MODULE_1__[\"default\"].like(req.body, req.params._id);\n  resp.send(req.body);\n});\napp.listen(port, () => {\n  console.log(`Server is listening on port ${port}`);\n});\n\n//# sourceURL=webpack://ntf-marketplace/./server/index.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("body-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

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