"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", { value: true });
var tf = require("@tensorflow/tfjs");
var DEFAULT_STYLE_CHECKPOINT = 'https://storage.googleapis.com/magentadata/js/checkpoints/style/arbitrary/predictor';
var DEFAULT_TRANSFORM_CHECKPOINT = 'https://storage.googleapis.com/magentadata/js/checkpoints/style/arbitrary/transformer';
var ArbitraryStyleTransferNetwork = (function () {
    function ArbitraryStyleTransferNetwork(styleCheckpointURL, transformCheckpointURL) {
        if (styleCheckpointURL === void 0) { styleCheckpointURL = DEFAULT_STYLE_CHECKPOINT; }
        if (transformCheckpointURL === void 0) { transformCheckpointURL = DEFAULT_TRANSFORM_CHECKPOINT; }
        this.initialized = false;
        this.styleCheckpointURL = styleCheckpointURL;
        this.transformCheckpointURL = transformCheckpointURL;
    }
    ArbitraryStyleTransferNetwork.prototype.isInitialized = function () {
        return this.initialized;
    };
    ArbitraryStyleTransferNetwork.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.dispose();
                        return [4, Promise.all([
                                tf.loadFrozenModel(this.styleCheckpointURL + '/tensorflowjs_model.pb', this.styleCheckpointURL + '/weights_manifest.json'),
                                tf.loadFrozenModel(this.transformCheckpointURL + '/tensorflowjs_model.pb', this.transformCheckpointURL + '/weights_manifest.json'),
                            ])];
                    case 1:
                        _a = _b.sent(), this.styleNet = _a[0], this.transformNet = _a[1];
                        this.initialized = true;
                        console.log('Initialized Arbitrary Style Transfer network');
                        return [2];
                }
            });
        });
    };
    ArbitraryStyleTransferNetwork.prototype.dispose = function () {
        if (this.styleNet) {
            this.styleNet.dispose();
        }
        if (this.transformNet) {
            this.transformNet.dispose();
        }
        this.initialized = false;
    };
    ArbitraryStyleTransferNetwork.prototype.predictStyleParameters = function (style) {
        var _this = this;
        return tf.tidy(function () {
            return _this.styleNet.predict(tf.fromPixels(style).toFloat().div(tf.scalar(255)).expandDims());
        });
    };
    ArbitraryStyleTransferNetwork.prototype.produceStylized = function (content, bottleneck) {
        var _this = this;
        return tf.tidy(function () {
            var image = _this.transformNet.predict([
                tf.fromPixels(content).toFloat().div(tf.scalar(255)).expandDims(),
                bottleneck
            ]);
            return image.squeeze();
        });
    };
    ArbitraryStyleTransferNetwork.prototype.stylize = function (content, style, strength) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var styleRepresentation = _this.predictStyleParameters(style);
            if (strength !== undefined) {
                styleRepresentation = styleRepresentation.mul(tf.scalar(strength))
                    .add(_this.predictStyleParameters(content).mul(tf.scalar(1.0 - strength)));
            }
            var stylized = _this.produceStylized(content, styleRepresentation);
            return tf.toPixels(stylized).then(function (bytes) {
                var imageData = new ImageData(bytes, stylized.shape[1], stylized.shape[0]);
                styleRepresentation.dispose();
                stylized.dispose();
                resolve(imageData);
            });
        });
    };
    return ArbitraryStyleTransferNetwork;
}());
exports.ArbitraryStyleTransferNetwork = ArbitraryStyleTransferNetwork;
//# sourceMappingURL=model.js.map