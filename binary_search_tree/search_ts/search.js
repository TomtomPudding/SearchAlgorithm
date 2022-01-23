"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
exports.__esModule = true;
var BinaryTree = /** @class */ (function () {
    function BinaryTree(dataList, left, right) {
        if (left === void 0) { left = null; }
        if (right === void 0) { right = null; }
        this.left = null;
        this.right = null;
        if (dataList.length > 1) {
            this.value = dataList[0];
            this.addAll(dataList);
        }
        else {
            this.value = dataList[0];
            this.left = left;
            this.right = right;
        }
    }
    BinaryTree.prototype.addAll = function (dataList) {
        if (dataList.length <= 0)
            throw new Error("初期値が不正です");
        this.value = dataList[0];
        for (var _i = 0, _a = dataList.slice(1); _i < _a.length; _i++) {
            var data = _a[_i];
            this.add(data);
        }
    };
    BinaryTree.prototype.add = function (data) {
        var _a, _b;
        if (this.value > data) {
            if (((_a = this.left) === null || _a === void 0 ? void 0 : _a.value) != null) {
                var tree = new BinaryTree([this.left.value], this.left.left, this.left.right);
                tree.add(data);
                this.left = tree;
            }
            else {
                this.left = { value: data, left: null, right: null };
            }
        }
        else if (this.value < data) {
            if (((_b = this.right) === null || _b === void 0 ? void 0 : _b.value) != null) {
                var tree = new BinaryTree([this.right.value], this.right.left, this.right.right);
                tree.add(data);
                this.right = tree;
            }
            else {
                this.right = { value: data, left: null, right: null };
            }
        }
        else {
            console.log(this.value, data, "既に存在する値です");
        }
    };
    BinaryTree.prototype.find = function (data) {
        if (this.value > data) {
            if (this.left == null)
                return false;
            return new BinaryTree([this.left.value], this.left.left, this.left.right).find(data);
        }
        else if (this.value < data) {
            if (this.right == null)
                return false;
            return new BinaryTree([this.right.value], this.right.left, this.right.right).find(data);
        }
        else {
            return true;
        }
    };
    return BinaryTree;
}());
var fs = require("fs");
var readline = require("readline");
function getDataList(file) {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function () {
        var stream, rl, dataList, rl_1, rl_1_1, line, e_1_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    stream = fs.createReadStream(file);
                    rl = readline.createInterface({
                        input: stream
                    });
                    dataList = [];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 12]);
                    rl_1 = __asyncValues(rl);
                    _b.label = 2;
                case 2: return [4 /*yield*/, rl_1.next()];
                case 3:
                    if (!(rl_1_1 = _b.sent(), !rl_1_1.done)) return [3 /*break*/, 5];
                    line = rl_1_1.value;
                    dataList.push(Number(line));
                    _b.label = 4;
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _b.trys.push([7, , 10, 11]);
                    if (!(rl_1_1 && !rl_1_1.done && (_a = rl_1["return"]))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _a.call(rl_1)];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12: return [2 /*return*/, dataList];
            }
        });
    });
}
;
getDataList("data_1000000.txt").then(function (dataList) {
    var startTime = Date.now();
    var tree = new BinaryTree(dataList);
    var endTime = Date.now();
    console.log("二分探査木 生成: ", (endTime - startTime) / 1000);
    startTime = Date.now();
    for (var i = 0; i < 10000000; i++) {
        tree.find(i);
    }
    endTime = Date.now();
    console.log("二分探査木 検索: ", (endTime - startTime) / 1000);
});
