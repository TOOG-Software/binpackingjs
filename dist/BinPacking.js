/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("BinPacking", [], factory);
	else if(typeof exports === 'object')
		exports["BinPacking"] = factory();
	else
		root["BinPacking"] = factory();
})(this, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./2D/Bin.js":
/*!*******************!*\
  !*** ./2D/Bin.js ***!
  \*******************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   FreeSpaceBox: function() { return /* binding */ FreeSpaceBox; },\n/* harmony export */   \"default\": function() { return /* binding */ Bin; }\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"../node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var _Box__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Box */ \"./2D/Box.js\");\n/* harmony import */ var _heuristics_BestShortSideFit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./heuristics/BestShortSideFit */ \"./2D/heuristics/BestShortSideFit.js\");\nfunction ownKeys(e, r) {var t = Object.keys(e);if (Object.getOwnPropertySymbols) {var o = Object.getOwnPropertySymbols(e);r && (o = o.filter(function (r) {return Object.getOwnPropertyDescriptor(e, r).enumerable;})), t.push.apply(t, o);}return t;}function _objectSpread(e) {for (var r = 1; r < arguments.length; r++) {var t = null != arguments[r] ? arguments[r] : {};r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(e, r, t[r]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));});}return e;}\n\n\nclass Bin {\n\n\n\n\n\n\n  constructor(width, height, heuristic) {(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"width\", null);(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"height\", null);(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"boxes\", []);(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"heuristic\", null);(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"freeRectangles\", []);\n    this.width = width;\n    this.height = height;\n    this.freeRectangles = [new FreeSpaceBox(width, height)];\n    this.heuristic = heuristic || new _heuristics_BestShortSideFit__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n  }\n\n  get area() {\n    return this.width * this.height;\n  }\n\n  get efficiency() {\n    let boxesArea = 0;\n    this.boxes.forEach((box) => {\n      boxesArea += box.area;\n    });\n    return boxesArea * 100 / this.area;\n  }\n\n  get label() {\n    return `${this.width}x${this.height} ${this.efficiency}%`;\n  }\n\n  insert(box) {\n    if (box.packed) return false;\n\n    this.heuristic.findPositionForNewNode(box, this.freeRectangles);\n    if (!box.packed) return false;\n\n    let numRectanglesToProcess = this.freeRectangles.length;\n    let i = 0;\n\n    while (i < numRectanglesToProcess) {\n      if (this.splitFreeNode(this.freeRectangles[i], box)) {\n        this.freeRectangles.splice(i, 1);\n        numRectanglesToProcess--;\n      } else {\n        i++;\n      }\n    }\n\n    this.pruneFreeList();\n    this.boxes.push(box);\n\n    return true;\n  }\n\n  scoreFor(box) {\n    let copyBox = new _Box__WEBPACK_IMPORTED_MODULE_1__[\"default\"](box.width, box.height, box.constrainRotation);\n    let score = this.heuristic.findPositionForNewNode(\n      copyBox,\n      this.freeRectangles\n    );\n    return score;\n  }\n\n  isLargerThan(box) {\n    return (\n      this.width >= box.width && this.height >= box.height ||\n      this.height >= box.width && this.width >= box.height);\n\n  }\n\n  splitFreeNode(freeNode, usedNode) {\n    // Test with SAT if the rectangles even intersect.\n    if (\n    usedNode.x >= freeNode.x + freeNode.width ||\n    usedNode.x + usedNode.width <= freeNode.x ||\n    usedNode.y >= freeNode.y + freeNode.height ||\n    usedNode.y + usedNode.height <= freeNode.y)\n    {\n      return false;\n    }\n\n    this.trySplitFreeNodeVertically(freeNode, usedNode);\n    this.trySplitFreeNodeHorizontally(freeNode, usedNode);\n\n    return true;\n  }\n\n  trySplitFreeNodeVertically(freeNode, usedNode) {\n    if (\n    usedNode.x < freeNode.x + freeNode.width &&\n    usedNode.x + usedNode.width > freeNode.x)\n    {\n      this.tryLeaveFreeSpaceAtTop(freeNode, usedNode);\n      this.tryLeaveFreeSpaceAtBottom(freeNode, usedNode);\n    }\n  }\n\n  tryLeaveFreeSpaceAtTop(freeNode, usedNode) {\n    if (usedNode.y > freeNode.y && usedNode.y < freeNode.y + freeNode.height) {\n      let newNode = _objectSpread({}, freeNode);\n      newNode.height = usedNode.y - newNode.y;\n      this.freeRectangles.push(newNode);\n    }\n  }\n\n  tryLeaveFreeSpaceAtBottom(freeNode, usedNode) {\n    if (usedNode.y + usedNode.height < freeNode.y + freeNode.height) {\n      let newNode = _objectSpread({}, freeNode);\n      newNode.y = usedNode.y + usedNode.height;\n      newNode.height =\n      freeNode.y + freeNode.height - (usedNode.y + usedNode.height);\n      this.freeRectangles.push(newNode);\n    }\n  }\n\n  trySplitFreeNodeHorizontally(freeNode, usedNode) {\n    if (\n    usedNode.y < freeNode.y + freeNode.height &&\n    usedNode.y + usedNode.height > freeNode.y)\n    {\n      this.tryLeaveFreeSpaceOnLeft(freeNode, usedNode);\n      this.tryLeaveFreeSpaceOnRight(freeNode, usedNode);\n    }\n  }\n\n  tryLeaveFreeSpaceOnLeft(freeNode, usedNode) {\n    if (usedNode.x > freeNode.x && usedNode.x < freeNode.x + freeNode.width) {\n      let newNode = _objectSpread({}, freeNode);\n      newNode.width = usedNode.x - newNode.x;\n      this.freeRectangles.push(newNode);\n    }\n  }\n\n  tryLeaveFreeSpaceOnRight(freeNode, usedNode) {\n    if (usedNode.x + usedNode.width < freeNode.x + freeNode.width) {\n      let newNode = _objectSpread({}, freeNode);\n      newNode.x = usedNode.x + usedNode.width;\n      newNode.width =\n      freeNode.x + freeNode.width - (usedNode.x + usedNode.width);\n      this.freeRectangles.push(newNode);\n    }\n  }\n\n  /**\n   * Goes through the free rectangle list and removes any redundant entries.\n   */\n  pruneFreeList() {\n    let i = 0;\n    while (i < this.freeRectangles.length) {\n      let j = i + 1;\n      if (j === this.freeRectangles.length) {\n        break;\n      }\n      while (j < this.freeRectangles.length) {\n        if (\n        this.isContainedIn(this.freeRectangles[i], this.freeRectangles[j]))\n        {\n          this.freeRectangles.splice(i, 1);\n          i--;\n          break;\n        }\n        if (\n        this.isContainedIn(this.freeRectangles[j], this.freeRectangles[i]))\n        {\n          this.freeRectangles.splice(j, 1);\n        } else {\n          j++;\n        }\n      }\n      i++;\n    }\n  }\n\n  isContainedIn(rectA, rectB) {\n    return (\n      rectA &&\n      rectB &&\n      rectA.x >= rectB.x &&\n      rectA.y >= rectB.y &&\n      rectA.x + rectA.width <= rectB.x + rectB.width &&\n      rectA.y + rectA.height <= rectB.y + rectB.height);\n\n  }\n}\n\nclass FreeSpaceBox {\n\n\n\n\n\n  constructor(width, height) {(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"x\", 0);(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"y\", 0);(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"width\", null);(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"height\", null);\n    this.width = width;\n    this.height = height;\n  }\n}\n\n//# sourceURL=webpack://BinPacking/./2D/Bin.js?");

/***/ }),

/***/ "./2D/Box.js":
/*!*******************!*\
  !*** ./2D/Box.js ***!
  \*******************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Box; }\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"../node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\nclass Box {\n\n\n\n\n\n\n\n\n  constructor(width, height) {let constrainRotation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"width\", null);(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"height\", null);(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"constrainRotation\", false);(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"x\", 0);(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"y\", 0);(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"packed\", false);\n    this.width = width;\n    this.height = height;\n\n    // Avoid the packer to try the rotated dimensions\n    this.constrainRotation = constrainRotation;\n  }\n\n  rotate() {\n    let { width, height } = this;\n    this.width = height;\n    this.height = width;\n  }\n\n  get label() {\n    return `${this.width}x${this.height} at [${this.x},${this.y}]`;\n  }\n\n  get area() {\n    return this.width * this.height;\n  }\n\n}\n\n//# sourceURL=webpack://BinPacking/./2D/Box.js?");

/***/ }),

/***/ "./2D/Packer.js":
/*!**********************!*\
  !*** ./2D/Packer.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Packer; }\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"../node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var _Score__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Score */ \"./2D/Score.js\");\n/* harmony import */ var _ScoreBoard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ScoreBoard */ \"./2D/ScoreBoard.js\");\n\n\n\nclass Packer {\n\n\n\n\n  constructor(bins) {(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"bins\", []);(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"unpackedBoxes\", []);\n    this.bins = bins;\n  }\n\n  pack(boxes) {let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n    let packedBoxes = [];\n    let entry;\n\n    boxes = boxes.filter((box) => !box.packed);\n    if (boxes.length === 0) return packedBoxes;\n\n    let limit = options.limit || _Score__WEBPACK_IMPORTED_MODULE_1__[\"default\"].MAX_INT;\n    let board = new _ScoreBoard__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.bins, boxes);\n    let r = 0;\n    while (entry = board.bestFit()) {\n      entry.bin.insert(entry.box);\n      board.removeBox(entry.box);\n      board.recalculateBin(entry.bin);\n      packedBoxes.push(entry.box);\n      if (packedBoxes.length >= limit) {\n        break;\n      }\n    };\n\n    this.unpackedBoxes = boxes.filter((box) => {\n      return !box.packed;\n    });\n\n    return packedBoxes;\n  }\n\n}\n\n//# sourceURL=webpack://BinPacking/./2D/Packer.js?");

/***/ }),

/***/ "./2D/Score.js":
/*!*********************!*\
  !*** ./2D/Score.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Score; }\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"../node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\nclass Score {\n\n\n\n\n\n  constructor(score_1, score_2) {(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"score_1\", Score.MAX_INT);(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"score_2\", Score.MAX_INT);\n    if (typeof score_1 != 'undefined') this.score_1 = score_1;\n    if (typeof score_2 != 'undefined') this.score_2 = score_2;\n  }\n\n  /**\n   * Lower is better\n   */\n  valueOf() {\n    return this.score_1 + this.score_2;\n  }\n\n  assign(other) {\n    this.score_1 = other.score_1;\n    this.score_2 = other.score_2;\n  }\n\n  isBlank() {\n    return this.score_1 === Score.MAX_INT;\n  }\n\n  decreaseBy(delta) {\n    this.score_1 += delta;\n    this.score_2 += delta;\n  }\n\n}(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(Score, \"MAX_INT\", Number.MAX_SAFE_INTEGER);\n\n//# sourceURL=webpack://BinPacking/./2D/Score.js?");

/***/ }),

/***/ "./2D/ScoreBoard.js":
/*!**************************!*\
  !*** ./2D/ScoreBoard.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ ScoreBoard; }\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"../node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var _ScoreBoardEntry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ScoreBoardEntry */ \"./2D/ScoreBoardEntry.js\");\n // #       box_1 box_2 box_3 ...\n// # bin_1  100   200    0\n// # bin_2   0     5     0\n// # bin_3   9    100    0\n// # ...\n\n\nclass ScoreBoard {\n\n\n\n  constructor(bins, boxes) {(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"entries\", []);\n    bins.forEach((bin) => {\n      this.addBinEntries(bin, boxes);\n    });\n  }\n\n  debug() {\n    __webpack_require__(/*! console.table */ \"../node_modules/console.table/index.js\");\n    console.table(this.entries.map((entry) => ({ bin: entry.bin.label, box: entry.box.label, score: entry.score })));\n  }\n\n  addBinEntries(bin, boxes) {\n    boxes.forEach((box) => {\n      let entry = new _ScoreBoardEntry__WEBPACK_IMPORTED_MODULE_1__[\"default\"](bin, box);\n      entry.calculate();\n      this.entries.push(entry);\n    });\n  }\n\n  any() {\n    return this.boxes.some((box) => box);\n  }\n\n  largestNotFitingBox() {\n    let unfit = null;\n    let fittingBoxes = this.entries.filter((entry) => entry.fit).map((entry) => entry.box);\n\n    this.entries.forEach((entry) => {\n      if (!this.fittingBoxes.contains(entry.box)) {\n        return;\n      }\n      if (unfit === null || unfit.box.area < entry.box.area) {\n        this.unfit = entry;\n      }\n    });\n\n    return unfit.box ? unfit : false;\n  }\n\n  bestFit() {\n    let best = null;\n    for (let i = 0; i < this.entries.length; i++) {\n      let entry = this.entries[i];\n      if (!entry.fit()) {\n        continue;\n      }\n      if (best === null || entry.score < best.score) {\n        best = entry;\n      }\n    }\n    return best;\n  }\n\n  removeBox(box) {\n    this.entries = this.entries.filter((entry) => {\n      return entry.box !== box;\n    });\n  }\n\n  addBin(bin) {\n    this.addBinEntries(bin, this.currentBoxes());\n  }\n\n  recalculateBin(bin) {\n    this.entries.filter((entry) => entry.bin === bin).forEach((entry) => entry.calculate());\n  }\n\n  currentBoxes() {\n    return [...new Set(this.entries.map((entry) => entry.box))];\n  }\n\n}\n\n//# sourceURL=webpack://BinPacking/./2D/ScoreBoard.js?");

/***/ }),

/***/ "./2D/ScoreBoardEntry.js":
/*!*******************************!*\
  !*** ./2D/ScoreBoardEntry.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ ScoreBoardEntry; }\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"../node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\nclass ScoreBoardEntry {\n\n\n\n\n\n  constructor(bin, box) {(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"bin\", null);(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"box\", null);(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, \"score\", null);\n    this.bin = bin;\n    this.box = box;\n  }\n\n  calculate() {\n    this.score = this.bin.scoreFor(this.box);\n    return this.score;\n  }\n\n  fit() {\n    return !this.score.isBlank();\n  }\n\n}\n\n//# sourceURL=webpack://BinPacking/./2D/ScoreBoardEntry.js?");

/***/ }),

/***/ "./2D/heuristics/Base.js":
/*!*******************************!*\
  !*** ./2D/heuristics/Base.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Base; }\n/* harmony export */ });\n/* harmony import */ var _Score__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Score */ \"./2D/Score.js\");\n\n\nclass Base {\n\n  findPositionForNewNode(box, freeRects) {\n    let bestScore = new _Score__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    let width = box.width;\n    let height = box.height;\n\n    freeRects.forEach((freeRect) => {\n      this.tryPlaceRectIn(freeRect, box, width, height, bestScore);\n      if (!box.constrainRotation) {\n        this.tryPlaceRectIn(freeRect, box, height, width, bestScore);\n      }\n    });\n\n    return bestScore;\n  }\n\n  tryPlaceRectIn(freeRect, box, rectWidth, rectHeight, bestScore) {\n    if (freeRect.width >= rectWidth && freeRect.height >= rectHeight) {\n      let score = this.calculateScore(freeRect, rectWidth, rectHeight);\n      if (score < bestScore) {\n        box.x = freeRect.x;\n        box.y = freeRect.y;\n        box.width = rectWidth;\n        box.height = rectHeight;\n        box.packed = true;\n        bestScore.assign(score);\n      }\n    }\n  }\n\n  calculateScore(freeRect, rectWidth, rectHeight) {\n    throw \"NotImplementedError\";\n  }\n\n}\n\n//# sourceURL=webpack://BinPacking/./2D/heuristics/Base.js?");

/***/ }),

/***/ "./2D/heuristics/BestAreaFit.js":
/*!**************************************!*\
  !*** ./2D/heuristics/BestAreaFit.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ BestAreaFit; }\n/* harmony export */ });\n/* harmony import */ var _Base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base */ \"./2D/heuristics/Base.js\");\n/* harmony import */ var _Score__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Score */ \"./2D/Score.js\");\n\n\n\nclass BestAreaFit extends _Base__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n\n  calculateScore(freeRect, rectWidth, rectHeight) {\n    let areaFit = freeRect.width * freeRect.height - rectWidth * rectHeight;\n    let leftOverHoriz = Math.abs(freeRect.width - rectWidth);\n    let leftOverVert = Math.abs(freeRect.height - rectHeight);\n    let shortSideFit = Math.min(leftOverHoriz, leftOverVert);\n    return new _Score__WEBPACK_IMPORTED_MODULE_1__[\"default\"](areaFit, shortSideFit);\n  }\n\n}\n\n//# sourceURL=webpack://BinPacking/./2D/heuristics/BestAreaFit.js?");

/***/ }),

/***/ "./2D/heuristics/BestLongSideFit.js":
/*!******************************************!*\
  !*** ./2D/heuristics/BestLongSideFit.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ BestLongSideFit; }\n/* harmony export */ });\n/* harmony import */ var _Base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base */ \"./2D/heuristics/Base.js\");\n/* harmony import */ var _Score__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Score */ \"./2D/Score.js\");\n\n\n\nclass BestLongSideFit extends _Base__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n\n  calculateScore(freeRect, rectWidth, rectHeight) {\n    let leftOverHoriz = Math.abs(freeRect.width - rectWidth);\n    let leftOverVert = Math.abs(freeRect.height - rectHeight);\n    let args = [leftOverHoriz, leftOverVert].sort((a, b) => a - b).reverse();\n    return new _Score__WEBPACK_IMPORTED_MODULE_1__[\"default\"](args[0], args[1]);\n  }\n\n}\n\n//# sourceURL=webpack://BinPacking/./2D/heuristics/BestLongSideFit.js?");

/***/ }),

/***/ "./2D/heuristics/BestShortSideFit.js":
/*!*******************************************!*\
  !*** ./2D/heuristics/BestShortSideFit.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ BestShortSideFit; }\n/* harmony export */ });\n/* harmony import */ var _Base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base */ \"./2D/heuristics/Base.js\");\n/* harmony import */ var _Score__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Score */ \"./2D/Score.js\");\n\n\n\nclass BestShortSideFit extends _Base__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n\n  calculateScore(freeRect, rectWidth, rectHeight) {\n    let leftOverHoriz = Math.abs(freeRect.width - rectWidth);\n    let leftOverVert = Math.abs(freeRect.height - rectHeight);\n    let args = [leftOverHoriz, leftOverVert].sort((a, b) => a - b);\n    let score = new _Score__WEBPACK_IMPORTED_MODULE_1__[\"default\"](args[0], args[1]);\n    return score;\n  }\n\n}\n\n//# sourceURL=webpack://BinPacking/./2D/heuristics/BestShortSideFit.js?");

/***/ }),

/***/ "./2D/heuristics/BottomLeft.js":
/*!*************************************!*\
  !*** ./2D/heuristics/BottomLeft.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ BottomLeft; }\n/* harmony export */ });\n/* harmony import */ var _Base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base */ \"./2D/heuristics/Base.js\");\n/* harmony import */ var _Score__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Score */ \"./2D/Score.js\");\n\n\n\nclass BottomLeft extends _Base__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n\n  calculateScore(freeRect, rectWidth, rectHeight) {\n    let topSideY = freeRect.y + rectHeight;\n    return new _Score__WEBPACK_IMPORTED_MODULE_1__[\"default\"](topSideY, freeRect.x);\n  }\n\n}\n\n//# sourceURL=webpack://BinPacking/./2D/heuristics/BottomLeft.js?");

/***/ }),

/***/ "./2D/heuristics/index.js":
/*!********************************!*\
  !*** ./2D/heuristics/index.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   BestAreaFit: function() { return /* reexport safe */ _BestAreaFit__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; },\n/* harmony export */   BestLongSideFit: function() { return /* reexport safe */ _BestLongSideFit__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; },\n/* harmony export */   BestShortSideFit: function() { return /* reexport safe */ _BestShortSideFit__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; },\n/* harmony export */   BottomLeft: function() { return /* reexport safe */ _BottomLeft__WEBPACK_IMPORTED_MODULE_3__[\"default\"]; }\n/* harmony export */ });\n/* harmony import */ var _BestAreaFit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BestAreaFit */ \"./2D/heuristics/BestAreaFit.js\");\n/* harmony import */ var _BestLongSideFit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BestLongSideFit */ \"./2D/heuristics/BestLongSideFit.js\");\n/* harmony import */ var _BestShortSideFit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BestShortSideFit */ \"./2D/heuristics/BestShortSideFit.js\");\n/* harmony import */ var _BottomLeft__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BottomLeft */ \"./2D/heuristics/BottomLeft.js\");\n\n\n\n\n\n//# sourceURL=webpack://BinPacking/./2D/heuristics/index.js?");

/***/ }),

/***/ "./2D/index.js":
/*!*********************!*\
  !*** ./2D/index.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Bin: function() { return /* reexport safe */ _Bin__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; },\n/* harmony export */   Box: function() { return /* reexport safe */ _Box__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; },\n/* harmony export */   Packer: function() { return /* reexport safe */ _Packer__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; },\n/* harmony export */   heuristics: function() { return /* reexport module object */ _heuristics__WEBPACK_IMPORTED_MODULE_3__; }\n/* harmony export */ });\n/* harmony import */ var _Bin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Bin */ \"./2D/Bin.js\");\n/* harmony import */ var _Box__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Box */ \"./2D/Box.js\");\n/* harmony import */ var _Packer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Packer */ \"./2D/Packer.js\");\n/* harmony import */ var _heuristics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./heuristics */ \"./2D/heuristics/index.js\");\n\n\n\n\n\n\n\n//# sourceURL=webpack://BinPacking/./2D/index.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   BP2D: function() { return /* reexport module object */ _2D__WEBPACK_IMPORTED_MODULE_0__; }\n/* harmony export */ });\n/* harmony import */ var _2D__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./2D */ \"./2D/index.js\");\n\n\n\n\n//# sourceURL=webpack://BinPacking/./index.js?");

/***/ }),

/***/ "../node_modules/clone/clone.js":
/*!**************************************!*\
  !*** ../node_modules/clone/clone.js ***!
  \**************************************/
/***/ (function(module) {

eval("var clone = (function() {\n'use strict';\n\n/**\n * Clones (copies) an Object using deep copying.\n *\n * This function supports circular references by default, but if you are certain\n * there are no circular references in your object, you can save some CPU time\n * by calling clone(obj, false).\n *\n * Caution: if `circular` is false and `parent` contains circular references,\n * your program may enter an infinite loop and crash.\n *\n * @param `parent` - the object to be cloned\n * @param `circular` - set to true if the object to be cloned may contain\n *    circular references. (optional - true by default)\n * @param `depth` - set to a number if the object is only to be cloned to\n *    a particular depth. (optional - defaults to Infinity)\n * @param `prototype` - sets the prototype to be used when cloning an object.\n *    (optional - defaults to parent prototype).\n*/\nfunction clone(parent, circular, depth, prototype) {\n  var filter;\n  if (typeof circular === 'object') {\n    depth = circular.depth;\n    prototype = circular.prototype;\n    filter = circular.filter;\n    circular = circular.circular\n  }\n  // maintain two arrays for circular references, where corresponding parents\n  // and children have the same index\n  var allParents = [];\n  var allChildren = [];\n\n  var useBuffer = typeof Buffer != 'undefined';\n\n  if (typeof circular == 'undefined')\n    circular = true;\n\n  if (typeof depth == 'undefined')\n    depth = Infinity;\n\n  // recurse this function so we don't reset allParents and allChildren\n  function _clone(parent, depth) {\n    // cloning null always returns null\n    if (parent === null)\n      return null;\n\n    if (depth == 0)\n      return parent;\n\n    var child;\n    var proto;\n    if (typeof parent != 'object') {\n      return parent;\n    }\n\n    if (clone.__isArray(parent)) {\n      child = [];\n    } else if (clone.__isRegExp(parent)) {\n      child = new RegExp(parent.source, __getRegExpFlags(parent));\n      if (parent.lastIndex) child.lastIndex = parent.lastIndex;\n    } else if (clone.__isDate(parent)) {\n      child = new Date(parent.getTime());\n    } else if (useBuffer && Buffer.isBuffer(parent)) {\n      if (Buffer.allocUnsafe) {\n        // Node.js >= 4.5.0\n        child = Buffer.allocUnsafe(parent.length);\n      } else {\n        // Older Node.js versions\n        child = new Buffer(parent.length);\n      }\n      parent.copy(child);\n      return child;\n    } else {\n      if (typeof prototype == 'undefined') {\n        proto = Object.getPrototypeOf(parent);\n        child = Object.create(proto);\n      }\n      else {\n        child = Object.create(prototype);\n        proto = prototype;\n      }\n    }\n\n    if (circular) {\n      var index = allParents.indexOf(parent);\n\n      if (index != -1) {\n        return allChildren[index];\n      }\n      allParents.push(parent);\n      allChildren.push(child);\n    }\n\n    for (var i in parent) {\n      var attrs;\n      if (proto) {\n        attrs = Object.getOwnPropertyDescriptor(proto, i);\n      }\n\n      if (attrs && attrs.set == null) {\n        continue;\n      }\n      child[i] = _clone(parent[i], depth - 1);\n    }\n\n    return child;\n  }\n\n  return _clone(parent, depth);\n}\n\n/**\n * Simple flat clone using prototype, accepts only objects, usefull for property\n * override on FLAT configuration object (no nested props).\n *\n * USE WITH CAUTION! This may not behave as you wish if you do not know how this\n * works.\n */\nclone.clonePrototype = function clonePrototype(parent) {\n  if (parent === null)\n    return null;\n\n  var c = function () {};\n  c.prototype = parent;\n  return new c();\n};\n\n// private utility functions\n\nfunction __objToStr(o) {\n  return Object.prototype.toString.call(o);\n};\nclone.__objToStr = __objToStr;\n\nfunction __isDate(o) {\n  return typeof o === 'object' && __objToStr(o) === '[object Date]';\n};\nclone.__isDate = __isDate;\n\nfunction __isArray(o) {\n  return typeof o === 'object' && __objToStr(o) === '[object Array]';\n};\nclone.__isArray = __isArray;\n\nfunction __isRegExp(o) {\n  return typeof o === 'object' && __objToStr(o) === '[object RegExp]';\n};\nclone.__isRegExp = __isRegExp;\n\nfunction __getRegExpFlags(re) {\n  var flags = '';\n  if (re.global) flags += 'g';\n  if (re.ignoreCase) flags += 'i';\n  if (re.multiline) flags += 'm';\n  return flags;\n};\nclone.__getRegExpFlags = __getRegExpFlags;\n\nreturn clone;\n})();\n\nif ( true && module.exports) {\n  module.exports = clone;\n}\n\n\n//# sourceURL=webpack://BinPacking/../node_modules/clone/clone.js?");

/***/ }),

/***/ "../node_modules/console.table/index.js":
/*!**********************************************!*\
  !*** ../node_modules/console.table/index.js ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("(function () {\n  'use strict';\n\n  function setupConsoleTable() {\n    if (typeof console === 'undefined') {\n      throw new Error('Weird, console object is undefined');\n    }\n    if (typeof console.table === 'function') {\n      // if it is not OUR function, overwrite it\n      if (console.table === consoleTable) {\n        return;\n      }\n    }\n\n    function isType(t, x) {\n      return typeof x === t;\n    }\n\n    var isString = isType.bind(null, 'string');\n\n    function isArrayOf(isTypeFn, a) {\n      return Array.isArray(a) &&\n        a.every(isTypeFn);\n    }\n\n    var isArrayOfStrings = isArrayOf.bind(null, isString);\n    var isArrayOfArrays = isArrayOf.bind(null, Array.isArray);\n\n    var Table = __webpack_require__(/*! easy-table */ \"../node_modules/easy-table/table.js\");\n\n    function arrayToString(arr) {\n      var t = new Table();\n      arr.forEach(function (record) {\n        if (typeof record === 'string' ||\n          typeof record === 'number') {\n          t.cell('item', record);\n        } else {\n          // assume plain object\n          Object.keys(record).forEach(function (property) {\n            t.cell(property, record[property]);\n          });\n        }\n        t.newRow();\n      });\n      return t.toString();\n    }\n\n    function printTableWithColumnTitles(titles, items,noConsole) {\n      var t = new Table();\n      items.forEach(function (item) {\n        item.forEach(function (value, k) {\n          t.cell(titles[k], value);\n        });\n        t.newRow();\n      });\n      var str = t.toString();\n\n      return noConsole ? str : console.log(str);\n    }\n\n    function printTitleTable(title, arr) {\n      var str = arrayToString(arr);\n      var rowLength = str.indexOf('\\n');\n      if (rowLength > 0) {\n        if (title.length > rowLength) {\n          rowLength = title.length;\n        }\n        console.log(title);\n        var sep = '-', k, line = '';\n        for (k = 0; k < rowLength; k += 1) {\n          line += sep;\n       }\n        console.log(line);\n      }\n      console.log(str);\n    }\n\n    function getTitleTable(title, arr) {\n      var str = arrayToString(arr);\n      var rowLength = str.indexOf('\\n');\n      var strToReturn = '';\n      if (rowLength > 0) {\n        if (title.length > rowLength) {\n          rowLength = title.length;\n        }\n        \n        strToReturn += title + '\\n';\n        var sep = '-', k, line = '';\n        for (k = 0; k < rowLength; k += 1) {\n          line += sep;\n        }\n\t\n        strToReturn += line + '\\n';\n      }\n\n      return strToReturn + str;\n    }\n\n    function objectToArray(obj) {\n      var keys = Object.keys(obj);\n      return keys.map(function (key) {\n        return {\n          key: key,\n          value: obj[key]\n        };\n      });\n    }\n\n    function objectToString(obj) {\n      return arrayToString(objectToArray(obj));\n    }\n\n    function consoleTable () {\n      var args = Array.prototype.slice.call(arguments);\n\n      if (args.length === 2 &&\n        typeof args[0] === 'string' &&\n        Array.isArray(args[1])) {\n\n        return printTitleTable(args[0], args[1]);\n      }\n\n      if (args.length === 2 &&\n        isArrayOfStrings(args[0]) &&\n        isArrayOfArrays(args[1])) {\n        return printTableWithColumnTitles(args[0], args[1]);\n      }\n\n      args.forEach(function (k) {\n        if (typeof k === 'string') {\n          return console.log(k);\n        } else if (Array.isArray(k)) {\n          console.log(arrayToString(k));\n        } else if (typeof k === 'object') {\n          console.log(objectToString(k));\n        }\n      });\n    }\n\n    module.exports.getTable = function(){\n      var args = Array.prototype.slice.call(arguments);\n\n      var strToReturn = '';\n\n      if (args.length === 2 &&\n        typeof args[0] === 'string' &&\n        Array.isArray(args[1])) {\n\n        return getTitleTable(args[0], args[1]);\n      }\n\n      if (args.length === 2 &&\n        isArrayOfStrings(args[0]) &&\n        isArrayOfArrays(args[1])) {\n        return printTableWithColumnTitles(args[0], args[1],true);\n      }\n\n      args.forEach(function (k,i) {\n        if (typeof k === 'string') {\n          strToReturn += k;\n\t  if (i !== args.length - 1){\n\t    strToReturn += '\\n';\n\t  }\n          return ;\n        } else if (Array.isArray(k)) {\n          strToReturn += arrayToString(k) + '\\n';\n        } else if (typeof k === 'object') {\n          strToReturn += objectToString(k);\n        }\n      });\n\n      return strToReturn;\n    };\n\n    console.table = consoleTable;\n  }\n\n  setupConsoleTable();\n}());\n\n\n//# sourceURL=webpack://BinPacking/../node_modules/console.table/index.js?");

/***/ }),

/***/ "../node_modules/defaults/index.js":
/*!*****************************************!*\
  !*** ../node_modules/defaults/index.js ***!
  \*****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var clone = __webpack_require__(/*! clone */ \"../node_modules/clone/clone.js\");\n\nmodule.exports = function(options, defaults) {\n  options = options || {};\n\n  Object.keys(defaults).forEach(function(key) {\n    if (typeof options[key] === 'undefined') {\n      options[key] = clone(defaults[key]);\n    }\n  });\n\n  return options;\n};\n\n//# sourceURL=webpack://BinPacking/../node_modules/defaults/index.js?");

/***/ }),

/***/ "../node_modules/easy-table/table.js":
/*!*******************************************!*\
  !*** ../node_modules/easy-table/table.js ***!
  \*******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("var wcwidth\n\ntry {\n  wcwidth = __webpack_require__(/*! wcwidth */ \"../node_modules/wcwidth/index.js\")\n} catch(e) {}\n\nmodule.exports = Table\n\nfunction Table() {\n  this.rows = []\n  this.row = {__printers : {}}\n}\n\n/**\n * Push the current row to the table and start a new one\n *\n * @returns {Table} `this`\n */\n\nTable.prototype.newRow = function() {\n  this.rows.push(this.row)\n  this.row = {__printers : {}}\n  return this\n}\n\n/**\n * Write cell in the current row\n *\n * @param {String} col          - Column name\n * @param {Any} val             - Cell value\n * @param {Function} [printer]  - Printer function to format the value\n * @returns {Table} `this`\n */\n\nTable.prototype.cell = function(col, val, printer) {\n  this.row[col] = val\n  this.row.__printers[col] = printer || string\n  return this\n}\n\n/**\n * String to separate columns\n */\n\nTable.prototype.separator = '  '\n\nfunction string(val) {\n  return val === undefined ? '' : ''+val\n}\n\nfunction length(str) {\n  var s = str.replace(/\\u001b\\[\\d+m/g, '')\n  return wcwidth == null ? s.length : wcwidth(s)\n}\n\n/**\n * Default printer\n */\n\nTable.string = string\n\n/**\n * Create a printer which right aligns the content by padding with `ch` on the left\n *\n * @param {String} ch\n * @returns {Function}\n */\n\nTable.leftPadder = leftPadder\n\nfunction leftPadder(ch) {\n  return function(val, width) {\n    var str = string(val)\n    var len = length(str)\n    var pad = width > len ? Array(width - len + 1).join(ch) : ''\n    return pad + str\n  }\n}\n\n/**\n * Printer which right aligns the content\n */\n\nvar padLeft = Table.padLeft = leftPadder(' ')\n\n/**\n * Create a printer which pads with `ch` on the right\n *\n * @param {String} ch\n * @returns {Function}\n */\n\nTable.rightPadder = rightPadder\n\nfunction rightPadder(ch) {\n  return function padRight(val, width) {\n    var str = string(val)\n    var len = length(str)\n    var pad = width > len ? Array(width - len + 1).join(ch) : ''\n    return str + pad\n  }\n}\n\nvar padRight = rightPadder(' ')\n\n/**\n * Create a printer for numbers\n *\n * Will do right alignment and optionally fix the number of digits after decimal point\n *\n * @param {Number} [digits] - Number of digits for fixpoint notation\n * @returns {Function}\n */\n\nTable.number = function(digits) {\n  return function(val, width) {\n    if (val == null) return ''\n    if (typeof val != 'number')\n      throw new Error(''+val + ' is not a number')\n    var str = digits == null ? val+'' : val.toFixed(digits)\n    return padLeft(str, width)\n  }\n}\n\nfunction each(row, fn) {\n  for(var key in row) {\n    if (key == '__printers') continue\n    fn(key, row[key])\n  }\n}\n\n/**\n * Get list of columns in printing order\n *\n * @returns {string[]}\n */\n\nTable.prototype.columns = function() {\n  var cols = {}\n  for(var i = 0; i < 2; i++) { // do 2 times\n    this.rows.forEach(function(row) {\n      var idx = 0\n      each(row, function(key) {\n        idx = Math.max(idx, cols[key] || 0)\n        cols[key] = idx\n        idx++\n      })\n    })\n  }\n  return Object.keys(cols).sort(function(a, b) {\n    return cols[a] - cols[b]\n  })\n}\n\n/**\n * Format just rows, i.e. print the table without headers and totals\n *\n * @returns {String} String representaion of the table\n */\n\nTable.prototype.print = function() {\n  var cols = this.columns()\n  var separator = this.separator\n  var widths = {}\n  var out = ''\n\n  // Calc widths\n  this.rows.forEach(function(row) {\n    each(row, function(key, val) {\n      var str = row.__printers[key].call(row, val)\n      widths[key] = Math.max(length(str), widths[key] || 0)\n    })\n  })\n\n  // Now print\n  this.rows.forEach(function(row) {\n    var line = ''\n    cols.forEach(function(key) {\n      var width = widths[key]\n      var str = row.hasOwnProperty(key)\n        ? ''+row.__printers[key].call(row, row[key], width)\n        : ''\n      line += padRight(str, width) + separator\n    })\n    line = line.slice(0, -separator.length)\n    out += line + '\\n'\n  })\n\n  return out\n}\n\n/**\n * Format the table\n *\n * @returns {String}\n */\n\nTable.prototype.toString = function() {\n  var cols = this.columns()\n  var out = new Table()\n\n  // copy options\n  out.separator = this.separator\n\n  // Write header\n  cols.forEach(function(col) {\n    out.cell(col, col)\n  })\n  out.newRow()\n  out.pushDelimeter(cols)\n\n  // Write body\n  out.rows = out.rows.concat(this.rows)\n\n  // Totals\n  if (this.totals && this.rows.length) {\n    out.pushDelimeter(cols)\n    this.forEachTotal(out.cell.bind(out))\n    out.newRow()\n  }\n\n  return out.print()\n}\n\n/**\n * Push delimeter row to the table (with each cell filled with dashs during printing)\n *\n * @param {String[]} [cols]\n * @returns {Table} `this`\n */\n\nTable.prototype.pushDelimeter = function(cols) {\n  cols = cols || this.columns()\n  cols.forEach(function(col) {\n    this.cell(col, undefined, leftPadder('-'))\n  }, this)\n  return this.newRow()\n}\n\n/**\n * Compute all totals and yield the results to `cb`\n *\n * @param {Function} cb - Callback function with signature `(column, value, printer)`\n */\n\nTable.prototype.forEachTotal = function(cb) {\n  for(var key in this.totals) {\n    var aggr = this.totals[key]\n    var acc = aggr.init\n    var len = this.rows.length\n    this.rows.forEach(function(row, idx) {\n      acc = aggr.reduce.call(row, acc, row[key], idx, len)\n    })\n    cb(key, acc, aggr.printer)\n  }\n}\n\n/**\n * Format the table so that each row represents column and each column represents row\n *\n * @param {Object} [opts]\n * @param {String} [ops.separator] - Column separation string\n * @param {Function} [opts.namePrinter] - Printer to format column names\n * @returns {String}\n */\n\nTable.prototype.printTransposed = function(opts) {\n  opts = opts || {}\n  var out = new Table\n  out.separator = opts.separator || this.separator\n  this.columns().forEach(function(col) {\n    out.cell(0, col, opts.namePrinter)\n    this.rows.forEach(function(row, idx) {\n      out.cell(idx+1, row[col], row.__printers[col])\n    })\n    out.newRow()\n  }, this)\n  return out.print()\n}\n\n/**\n * Sort the table\n *\n * @param {Function|string[]} [cmp] - Either compare function or a list of columns to sort on\n * @returns {Table} `this`\n */\n\nTable.prototype.sort = function(cmp) {\n  if (typeof cmp == 'function') {\n    this.rows.sort(cmp)\n    return this\n  }\n\n  var keys = Array.isArray(cmp) ? cmp : this.columns()\n\n  var comparators = keys.map(function(key) {\n    var order = 'asc'\n    var m = /(.*)\\|\\s*(asc|des)\\s*$/.exec(key)\n    if (m) {\n      key = m[1]\n      order = m[2]\n    }\n    return function (a, b) {\n      return order == 'asc'\n        ? compare(a[key], b[key])\n        : compare(b[key], a[key])\n    }\n  })\n\n  return this.sort(function(a, b) {\n    for (var i = 0; i < comparators.length; i++) {\n      var order = comparators[i](a, b)\n      if (order != 0) return order\n    }\n    return 0\n  })\n}\n\nfunction compare(a, b) {\n  if (a === b) return 0\n  if (a === undefined) return 1\n  if (b === undefined) return -1\n  if (a === null) return 1\n  if (b === null) return -1\n  if (a > b) return 1\n  if (a < b) return -1\n  return compare(String(a), String(b))\n}\n\n/**\n * Add a total for the column\n *\n * @param {String} col - column name\n * @param {Object} [opts]\n * @param {Function} [opts.reduce = sum] - reduce(acc, val, idx, length) function to compute the total value\n * @param {Function} [opts.printer = padLeft] - Printer to format the total cell\n * @param {Any} [opts.init = 0] - Initial value for reduction\n * @returns {Table} `this`\n */\n\nTable.prototype.total = function(col, opts) {\n  opts = opts || {}\n  this.totals = this.totals || {}\n  this.totals[col] = {\n    reduce: opts.reduce || Table.aggr.sum,\n    printer: opts.printer || padLeft,\n    init: opts.init == null ? 0 : opts.init\n  }\n  return this\n}\n\n/**\n * Predefined helpers for totals\n */\n\nTable.aggr = {}\n\n/**\n * Create a printer which formats the value with `printer`,\n * adds the `prefix` to it and right aligns the whole thing\n *\n * @param {String} prefix\n * @param {Function} printer\n * @returns {printer}\n */\n\nTable.aggr.printer = function(prefix, printer) {\n  printer = printer || string\n  return function(val, width) {\n    return padLeft(prefix + printer(val), width)\n  }\n}\n\n/**\n * Sum reduction\n */\n\nTable.aggr.sum = function(acc, val) {\n  return acc + val\n}\n\n/**\n * Average reduction\n */\n\nTable.aggr.avg = function(acc, val, idx, len) {\n  acc = acc + val\n  return idx + 1 == len ? acc/len : acc\n}\n\n/**\n * Print the array or object\n *\n * @param {Array|Object} obj - Object to print\n * @param {Function|Object} [format] - Format options\n * @param {Function} [cb] - Table post processing and formating\n * @returns {String}\n */\n\nTable.print = function(obj, format, cb) {\n  var opts = format || {}\n\n  format = typeof format == 'function'\n    ? format\n    : function(obj, cell) {\n      for(var key in obj) {\n        if (!obj.hasOwnProperty(key)) continue\n        var params = opts[key] || {}\n        cell(params.name || key, obj[key], params.printer)\n      }\n    }\n\n  var t = new Table\n  var cell = t.cell.bind(t)\n\n  if (Array.isArray(obj)) {\n    cb = cb || function(t) { return t.toString() }\n    obj.forEach(function(item) {\n      format(item, cell)\n      t.newRow()\n    })\n  } else {\n    cb = cb || function(t) { return t.printTransposed({separator: ' : '}) }\n    format(obj, cell)\n    t.newRow()\n  }\n\n  return cb(t)\n}\n\n/**\n * Same as `Table.print()` but yields the result to `console.log()`\n */\n\nTable.log = function(obj, format, cb) {\n  console.log(Table.print(obj, format, cb))\n}\n\n/**\n * Same as `.toString()` but yields the result to `console.log()`\n */\n\nTable.prototype.log = function() {\n  console.log(this.toString())\n}\n\n\n//# sourceURL=webpack://BinPacking/../node_modules/easy-table/table.js?");

/***/ }),

/***/ "../node_modules/wcwidth/combining.js":
/*!********************************************!*\
  !*** ../node_modules/wcwidth/combining.js ***!
  \********************************************/
/***/ (function(module) {

eval("module.exports = [\n    [ 0x0300, 0x036F ], [ 0x0483, 0x0486 ], [ 0x0488, 0x0489 ],\n    [ 0x0591, 0x05BD ], [ 0x05BF, 0x05BF ], [ 0x05C1, 0x05C2 ],\n    [ 0x05C4, 0x05C5 ], [ 0x05C7, 0x05C7 ], [ 0x0600, 0x0603 ],\n    [ 0x0610, 0x0615 ], [ 0x064B, 0x065E ], [ 0x0670, 0x0670 ],\n    [ 0x06D6, 0x06E4 ], [ 0x06E7, 0x06E8 ], [ 0x06EA, 0x06ED ],\n    [ 0x070F, 0x070F ], [ 0x0711, 0x0711 ], [ 0x0730, 0x074A ],\n    [ 0x07A6, 0x07B0 ], [ 0x07EB, 0x07F3 ], [ 0x0901, 0x0902 ],\n    [ 0x093C, 0x093C ], [ 0x0941, 0x0948 ], [ 0x094D, 0x094D ],\n    [ 0x0951, 0x0954 ], [ 0x0962, 0x0963 ], [ 0x0981, 0x0981 ],\n    [ 0x09BC, 0x09BC ], [ 0x09C1, 0x09C4 ], [ 0x09CD, 0x09CD ],\n    [ 0x09E2, 0x09E3 ], [ 0x0A01, 0x0A02 ], [ 0x0A3C, 0x0A3C ],\n    [ 0x0A41, 0x0A42 ], [ 0x0A47, 0x0A48 ], [ 0x0A4B, 0x0A4D ],\n    [ 0x0A70, 0x0A71 ], [ 0x0A81, 0x0A82 ], [ 0x0ABC, 0x0ABC ],\n    [ 0x0AC1, 0x0AC5 ], [ 0x0AC7, 0x0AC8 ], [ 0x0ACD, 0x0ACD ],\n    [ 0x0AE2, 0x0AE3 ], [ 0x0B01, 0x0B01 ], [ 0x0B3C, 0x0B3C ],\n    [ 0x0B3F, 0x0B3F ], [ 0x0B41, 0x0B43 ], [ 0x0B4D, 0x0B4D ],\n    [ 0x0B56, 0x0B56 ], [ 0x0B82, 0x0B82 ], [ 0x0BC0, 0x0BC0 ],\n    [ 0x0BCD, 0x0BCD ], [ 0x0C3E, 0x0C40 ], [ 0x0C46, 0x0C48 ],\n    [ 0x0C4A, 0x0C4D ], [ 0x0C55, 0x0C56 ], [ 0x0CBC, 0x0CBC ],\n    [ 0x0CBF, 0x0CBF ], [ 0x0CC6, 0x0CC6 ], [ 0x0CCC, 0x0CCD ],\n    [ 0x0CE2, 0x0CE3 ], [ 0x0D41, 0x0D43 ], [ 0x0D4D, 0x0D4D ],\n    [ 0x0DCA, 0x0DCA ], [ 0x0DD2, 0x0DD4 ], [ 0x0DD6, 0x0DD6 ],\n    [ 0x0E31, 0x0E31 ], [ 0x0E34, 0x0E3A ], [ 0x0E47, 0x0E4E ],\n    [ 0x0EB1, 0x0EB1 ], [ 0x0EB4, 0x0EB9 ], [ 0x0EBB, 0x0EBC ],\n    [ 0x0EC8, 0x0ECD ], [ 0x0F18, 0x0F19 ], [ 0x0F35, 0x0F35 ],\n    [ 0x0F37, 0x0F37 ], [ 0x0F39, 0x0F39 ], [ 0x0F71, 0x0F7E ],\n    [ 0x0F80, 0x0F84 ], [ 0x0F86, 0x0F87 ], [ 0x0F90, 0x0F97 ],\n    [ 0x0F99, 0x0FBC ], [ 0x0FC6, 0x0FC6 ], [ 0x102D, 0x1030 ],\n    [ 0x1032, 0x1032 ], [ 0x1036, 0x1037 ], [ 0x1039, 0x1039 ],\n    [ 0x1058, 0x1059 ], [ 0x1160, 0x11FF ], [ 0x135F, 0x135F ],\n    [ 0x1712, 0x1714 ], [ 0x1732, 0x1734 ], [ 0x1752, 0x1753 ],\n    [ 0x1772, 0x1773 ], [ 0x17B4, 0x17B5 ], [ 0x17B7, 0x17BD ],\n    [ 0x17C6, 0x17C6 ], [ 0x17C9, 0x17D3 ], [ 0x17DD, 0x17DD ],\n    [ 0x180B, 0x180D ], [ 0x18A9, 0x18A9 ], [ 0x1920, 0x1922 ],\n    [ 0x1927, 0x1928 ], [ 0x1932, 0x1932 ], [ 0x1939, 0x193B ],\n    [ 0x1A17, 0x1A18 ], [ 0x1B00, 0x1B03 ], [ 0x1B34, 0x1B34 ],\n    [ 0x1B36, 0x1B3A ], [ 0x1B3C, 0x1B3C ], [ 0x1B42, 0x1B42 ],\n    [ 0x1B6B, 0x1B73 ], [ 0x1DC0, 0x1DCA ], [ 0x1DFE, 0x1DFF ],\n    [ 0x200B, 0x200F ], [ 0x202A, 0x202E ], [ 0x2060, 0x2063 ],\n    [ 0x206A, 0x206F ], [ 0x20D0, 0x20EF ], [ 0x302A, 0x302F ],\n    [ 0x3099, 0x309A ], [ 0xA806, 0xA806 ], [ 0xA80B, 0xA80B ],\n    [ 0xA825, 0xA826 ], [ 0xFB1E, 0xFB1E ], [ 0xFE00, 0xFE0F ],\n    [ 0xFE20, 0xFE23 ], [ 0xFEFF, 0xFEFF ], [ 0xFFF9, 0xFFFB ],\n    [ 0x10A01, 0x10A03 ], [ 0x10A05, 0x10A06 ], [ 0x10A0C, 0x10A0F ],\n    [ 0x10A38, 0x10A3A ], [ 0x10A3F, 0x10A3F ], [ 0x1D167, 0x1D169 ],\n    [ 0x1D173, 0x1D182 ], [ 0x1D185, 0x1D18B ], [ 0x1D1AA, 0x1D1AD ],\n    [ 0x1D242, 0x1D244 ], [ 0xE0001, 0xE0001 ], [ 0xE0020, 0xE007F ],\n    [ 0xE0100, 0xE01EF ]\n]\n\n\n//# sourceURL=webpack://BinPacking/../node_modules/wcwidth/combining.js?");

/***/ }),

/***/ "../node_modules/wcwidth/index.js":
/*!****************************************!*\
  !*** ../node_modules/wcwidth/index.js ***!
  \****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
eval("\n\nvar defaults = __webpack_require__(/*! defaults */ \"../node_modules/defaults/index.js\")\nvar combining = __webpack_require__(/*! ./combining */ \"../node_modules/wcwidth/combining.js\")\n\nvar DEFAULTS = {\n  nul: 0,\n  control: 0\n}\n\nmodule.exports = function wcwidth(str) {\n  return wcswidth(str, DEFAULTS)\n}\n\nmodule.exports.config = function(opts) {\n  opts = defaults(opts || {}, DEFAULTS)\n  return function wcwidth(str) {\n    return wcswidth(str, opts)\n  }\n}\n\n/*\n *  The following functions define the column width of an ISO 10646\n *  character as follows:\n *  - The null character (U+0000) has a column width of 0.\n *  - Other C0/C1 control characters and DEL will lead to a return value\n *    of -1.\n *  - Non-spacing and enclosing combining characters (general category\n *    code Mn or Me in the\n *    Unicode database) have a column width of 0.\n *  - SOFT HYPHEN (U+00AD) has a column width of 1.\n *  - Other format characters (general category code Cf in the Unicode\n *    database) and ZERO WIDTH\n *    SPACE (U+200B) have a column width of 0.\n *  - Hangul Jamo medial vowels and final consonants (U+1160-U+11FF)\n *    have a column width of 0.\n *  - Spacing characters in the East Asian Wide (W) or East Asian\n *    Full-width (F) category as\n *    defined in Unicode Technical Report #11 have a column width of 2.\n *  - All remaining characters (including all printable ISO 8859-1 and\n *    WGL4 characters, Unicode control characters, etc.) have a column\n *    width of 1.\n *  This implementation assumes that characters are encoded in ISO 10646.\n*/\n\nfunction wcswidth(str, opts) {\n  if (typeof str !== 'string') return wcwidth(str, opts)\n\n  var s = 0\n  for (var i = 0; i < str.length; i++) {\n    var n = wcwidth(str.charCodeAt(i), opts)\n    if (n < 0) return -1\n    s += n\n  }\n\n  return s\n}\n\nfunction wcwidth(ucs, opts) {\n  // test for 8-bit control characters\n  if (ucs === 0) return opts.nul\n  if (ucs < 32 || (ucs >= 0x7f && ucs < 0xa0)) return opts.control\n\n  // binary search in table of non-spacing characters\n  if (bisearch(ucs)) return 0\n\n  // if we arrive here, ucs is not a combining or C0/C1 control character\n  return 1 +\n      (ucs >= 0x1100 &&\n       (ucs <= 0x115f ||                       // Hangul Jamo init. consonants\n        ucs == 0x2329 || ucs == 0x232a ||\n        (ucs >= 0x2e80 && ucs <= 0xa4cf &&\n         ucs != 0x303f) ||                     // CJK ... Yi\n        (ucs >= 0xac00 && ucs <= 0xd7a3) ||    // Hangul Syllables\n        (ucs >= 0xf900 && ucs <= 0xfaff) ||    // CJK Compatibility Ideographs\n        (ucs >= 0xfe10 && ucs <= 0xfe19) ||    // Vertical forms\n        (ucs >= 0xfe30 && ucs <= 0xfe6f) ||    // CJK Compatibility Forms\n        (ucs >= 0xff00 && ucs <= 0xff60) ||    // Fullwidth Forms\n        (ucs >= 0xffe0 && ucs <= 0xffe6) ||\n        (ucs >= 0x20000 && ucs <= 0x2fffd) ||\n        (ucs >= 0x30000 && ucs <= 0x3fffd)));\n}\n\nfunction bisearch(ucs) {\n  var min = 0\n  var max = combining.length - 1\n  var mid\n\n  if (ucs < combining[0][0] || ucs > combining[max][1]) return false\n\n  while (max >= min) {\n    mid = Math.floor((min + max) / 2)\n    if (ucs > combining[mid][1]) min = mid + 1\n    else if (ucs < combining[mid][0]) max = mid - 1\n    else return true\n  }\n\n  return false\n}\n\n\n//# sourceURL=webpack://BinPacking/../node_modules/wcwidth/index.js?");

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!********************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ _defineProperty; }\n/* harmony export */ });\n/* harmony import */ var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPropertyKey.js */ \"../node_modules/@babel/runtime/helpers/esm/toPropertyKey.js\");\n\nfunction _defineProperty(obj, key, value) {\n  key = (0,_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(key);\n  if (key in obj) {\n    Object.defineProperty(obj, key, {\n      value: value,\n      enumerable: true,\n      configurable: true,\n      writable: true\n    });\n  } else {\n    obj[key] = value;\n  }\n  return obj;\n}\n\n//# sourceURL=webpack://BinPacking/../node_modules/@babel/runtime/helpers/esm/defineProperty.js?");

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/toPrimitive.js":
/*!*****************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/toPrimitive.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ _toPrimitive; }\n/* harmony export */ });\n/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ \"../node_modules/@babel/runtime/helpers/esm/typeof.js\");\n\nfunction _toPrimitive(input, hint) {\n  if ((0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(input) !== \"object\" || input === null) return input;\n  var prim = input[Symbol.toPrimitive];\n  if (prim !== undefined) {\n    var res = prim.call(input, hint || \"default\");\n    if ((0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(res) !== \"object\") return res;\n    throw new TypeError(\"@@toPrimitive must return a primitive value.\");\n  }\n  return (hint === \"string\" ? String : Number)(input);\n}\n\n//# sourceURL=webpack://BinPacking/../node_modules/@babel/runtime/helpers/esm/toPrimitive.js?");

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/toPropertyKey.js":
/*!*******************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/toPropertyKey.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ _toPropertyKey; }\n/* harmony export */ });\n/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ \"../node_modules/@babel/runtime/helpers/esm/typeof.js\");\n/* harmony import */ var _toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toPrimitive.js */ \"../node_modules/@babel/runtime/helpers/esm/toPrimitive.js\");\n\n\nfunction _toPropertyKey(arg) {\n  var key = (0,_toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(arg, \"string\");\n  return (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(key) === \"symbol\" ? key : String(key);\n}\n\n//# sourceURL=webpack://BinPacking/../node_modules/@babel/runtime/helpers/esm/toPropertyKey.js?");

/***/ }),

/***/ "../node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ _typeof; }\n/* harmony export */ });\nfunction _typeof(o) {\n  \"@babel/helpers - typeof\";\n\n  return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) {\n    return typeof o;\n  } : function (o) {\n    return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o;\n  }, _typeof(o);\n}\n\n//# sourceURL=webpack://BinPacking/../node_modules/@babel/runtime/helpers/esm/typeof.js?");

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});