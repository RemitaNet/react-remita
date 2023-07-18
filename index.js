"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() {
    if (typeof WeakMap !== "function") return null;
    var cache = new WeakMap();
    _getRequireWildcardCache = function _getRequireWildcardCache() {
        return cache;
    };
    return cache;
}

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return {
            "default": obj
        };
    }
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj["default"] = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}

function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
    }
    return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived),
            result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}

function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}

function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
        return true;
    } catch (e) {
        return false;
    }
}

function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}

var cachedScripts = [];

var RemitaPayment = /*#__PURE__*/ function (_Component) {
    _inherits(RemitaPayment, _Component);

    var _super = _createSuper(RemitaPayment);

    function RemitaPayment(props) {
        var _this;

        _classCallCheck(this, RemitaPayment);

        _this = _super.call(this, props);
        _this.state = {
            loaded: false,
            error: false
        };
        return _this;
    }

    _createClass(RemitaPayment, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            var live = this.props.live;
            var script;
            var src = !live ? "https://remitademo.net/payment/v1/remita-pay-inline.bundle.js" : "https://login.remita.net/payment/v1/remita-pay-inline.bundle.js";

            if (cachedScripts.includes(src)) {
                this.setState({
                    loaded: true,
                    error: false
                });
            } else {
                cachedScripts.push(src);
                script = document.createElement("script");
                script.src = src;
                script.async = true;

                var onScriptLoad = function onScriptLoad() {
                    _this2.setState({
                        loaded: true,
                        error: false
                    });
                };

                var onScriptError = function onScriptError() {
                    var index = cachedScripts.indexOf(src);
                    if (index >= 0) cachedScripts.splice(index, 1);
                    script.remove();

                    _this2.setState({
                        loaded: true,
                        error: true
                    });
                };

                script.addEventListener("load", onScriptLoad);
                script.addEventListener("complete", onScriptLoad);
                script.addEventListener("error", onScriptError);
                document.body.appendChild(script);
            }
        }
    }, {
        key: "startPayment",
        value: function startPayment() {
            var _this$props$remitaDat = this.props.remitaData,
                onSuccess = _this$props$remitaDat.onSuccess,
                onClose = _this$props$remitaDat.onClose,
                key = _this$props$remitaDat.key,
                customerId = _this$props$remitaDat.customerId,
                firstName = _this$props$remitaDat.firstName,
                lastName = _this$props$remitaDat.lastName,
                email = _this$props$remitaDat.email,
                amount = _this$props$remitaDat.amount,
                channel = null ? null : _this$props$remitaDat.channel,
                narration = _this$props$remitaDat.narration,
                onError = _this$props$remitaDat.onError;

            if (this.state.loaded) {
                var payload = {
                    key: key,
                    customerId: customerId,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    amount: amount,
                    channel: channel,
                    narration: narration,
                    onSuccess: onSuccess,
                    onError: onError,
                    onClose: onClose
                };
                var paymentEngine = RmPaymentEngine.init(payload);
                paymentEngine.showPaymentWidget();
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var _this$props = this.props,
                className = _this$props.className,
                text = _this$props.text;
            return /*#__PURE__*/ _react["default"].createElement("button", {
                className: className,
                onClick: function onClick() {
                    return _this3.startPayment();
                }
            }, text || "Pay");
        }
    }]);

    return RemitaPayment;
}(_react.Component);

exports["default"] = RemitaPayment;