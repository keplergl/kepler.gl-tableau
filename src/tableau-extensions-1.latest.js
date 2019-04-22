window["tableau"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist-extensions/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 72);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// This file re-exports everything which is part of the shared embedding api public interface
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(115));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * This is your main. This is where you re-export everything you want to be publicly available.
 *
 * The build enforces that the file has the same name as the global variable that is exported.
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
// The following polyfills are needed for IE11
__webpack_require__(55);
__webpack_require__(116);
__export(__webpack_require__(119));
__export(__webpack_require__(120));
__export(__webpack_require__(121));
__export(__webpack_require__(122));
__export(__webpack_require__(58));
__export(__webpack_require__(59));
__export(__webpack_require__(126));
__export(__webpack_require__(60));
// These are the exports from the messaging stuff
__export(__webpack_require__(129));
__export(__webpack_require__(40));
// Export a hardcoded version of the internal contract. This should match what's in package.json.
// Normally, we'd use some sort of webpack replacement to inject this into code, but that doesn't
// work with the module-dev-scripts and this isn't too much work.
// If you forget to keep this in sync with package.json, a test will fail so we should be ok.
exports.INTERNAL_CONTRACT_VERSION = {
    major: 1,
    minor: 10,
    fix: 1
};
// Export the version number of messaging for consumers to use.
// Be very careful making any updates to this contract which break version compatibility.
exports.MESSAGING_VERSION = {
    major: 1,
    minor: 0,
    fix: 0
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(45)('wks');
var uid = __webpack_require__(26);
var Symbol = __webpack_require__(3).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof window.self != 'undefined' && window.self.Math == Math ? window.self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Custom error class that extends the default JavaScript Error object.
 * This allows us to provide a field with a specific error code
 * so that developers can more easily programmatically respond
 * to error scenarios.
 */
var TableauError = /** @class */ (function (_super) {
    __extends(TableauError, _super);
    function TableauError(_errorCode, message) {
        var _this = _super.call(this, _errorCode + ": " + message) || this;
        _this._errorCode = _errorCode;
        /*tslint:disable-next-line */
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        // Error inheritance does not work propertly when compiling to ES5, this is a workaround to force
        // the proto chain to be built correctly.  See the github link above for details.
        Object.setPrototypeOf(_this, TableauError.prototype);
        return _this;
    }
    Object.defineProperty(TableauError.prototype, "errorCode", {
        get: function () {
            return this._errorCode;
        },
        enumerable: true,
        configurable: true
    });
    return TableauError;
}(Error));
exports.TableauError = TableauError;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Export everything which had been previously in the api-shared module
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var Dashboard_1 = __webpack_require__(114);
exports.Dashboard = Dashboard_1.Dashboard;
var EventListenerManager_1 = __webpack_require__(39);
exports.EventListenerManager = EventListenerManager_1.EventListenerManager;
var TableauError_1 = __webpack_require__(4);
exports.TableauError = TableauError_1.TableauError;
var VersionNumber_1 = __webpack_require__(57);
exports.VersionNumber = VersionNumber_1.VersionNumber;
var InternalToExternalEnumMappings_1 = __webpack_require__(14);
exports.InternalToExternalEnumMappings = InternalToExternalEnumMappings_1.InternalToExternalEnumMappings;
var TableauEvent_1 = __webpack_require__(62);
exports.TableauEvent = TableauEvent_1.TableauEvent;
var SingleEventManagerImpl_1 = __webpack_require__(42);
exports.SingleEventManagerImpl = SingleEventManagerImpl_1.SingleEventManagerImpl;
var DashboardImpl_1 = __webpack_require__(132);
exports.DashboardImpl = DashboardImpl_1.DashboardImpl;
var ServiceImplBase_1 = __webpack_require__(12);
exports.ServiceImplBase = ServiceImplBase_1.ServiceImplBase;
var ErrorHelpers_1 = __webpack_require__(8);
exports.ErrorHelpers = ErrorHelpers_1.ErrorHelpers;
__export(__webpack_require__(143));
__export(__webpack_require__(145));
__export(__webpack_require__(7));


/***/ }),
/* 6 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SharedApiExternalContract_1 = __webpack_require__(0);
var TableauError_1 = __webpack_require__(4);
var ServiceRegistryImpl = /** @class */ (function () {
    function ServiceRegistryImpl() {
        this._services = {};
    }
    ServiceRegistryImpl.prototype.registerService = function (service) {
        this._services[service.serviceName] = service;
    };
    ServiceRegistryImpl.prototype.getService = function (serviceName) {
        if (!this._services.hasOwnProperty(serviceName)) {
            throw new TableauError_1.TableauError(SharedApiExternalContract_1.ErrorCodes.InternalError, "Service not registered: " + serviceName);
        }
        return this._services[serviceName];
    };
    return ServiceRegistryImpl;
}());
/**
 * static class used for getting access to the single instance
 * of the ApiServiceRegistry
 */
var ApiServiceRegistry = /** @class */ (function () {
    // Private to avoid anyone constructing this
    function ApiServiceRegistry() {
    }
    Object.defineProperty(ApiServiceRegistry, "instance", {
        /**
         * Gets the singleton instance of the ServiceRegistry
         */
        get: function () {
            if (!window.__tableauApiServiceRegistry) {
                ApiServiceRegistry.setInstance(new ServiceRegistryImpl());
            }
            if (!window.__tableauApiServiceRegistry) {
                throw new TableauError_1.TableauError(SharedApiExternalContract_1.ErrorCodes.InternalError, 'Service registry failed');
            }
            return window.__tableauApiServiceRegistry;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Helper method to override the registry instance. Can be used by unit tests
     *
     * @param {ServiceRegistry} serviceRegistry The new registry
     */
    ApiServiceRegistry.setInstance = function (serviceRegistry) {
        window.__tableauApiServiceRegistry = serviceRegistry;
    };
    return ApiServiceRegistry;
}());
exports.ApiServiceRegistry = ApiServiceRegistry;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SharedApiExternalContract_1 = __webpack_require__(0);
var Param_1 = __webpack_require__(43);
var TableauError_1 = __webpack_require__(4);
/**
 * This class is used to construct common errors throughout the external
 * projects (api-shared, extensions-api, etc.).  It has some duplication with
 * the ErrorHelpers class in api-core, but is separate due to the need to throw
 * an external TableauError vs. an InternalTableauError.
 */
var ErrorHelpers = /** @class */ (function () {
    function ErrorHelpers() {
    }
    /**
     * Throws with code InternalError.
     *
     * @param apiName name of api that was called.
     */
    ErrorHelpers.apiNotImplemented = function (apiName) {
        return new TableauError_1.TableauError(SharedApiExternalContract_1.ErrorCodes.InternalError, apiName + " API not yet implemented.");
    };
    /**
     * Throws an internal error if argument is null or undefined.
     *
     * @param argumentValue value to verify
     * @param argumentName name of argument to verify
     */
    /*tslint:disable-next-line */
    ErrorHelpers.verifyInternalValue = function (argumentValue, argumentName) {
        if (argumentValue === null || argumentValue === undefined) {
            throw new TableauError_1.TableauError(SharedApiExternalContract_1.ErrorCodes.InternalError, argumentValue + " is invalid value for: " + argumentName);
        }
    };
    /**
     * Throws an InvalidParameter error if argument is null or undefined.
     *
     * @param argumentValue value to verify
     * @param argumentName name of argument to verify
     */
    /*tslint:disable-next-line */
    ErrorHelpers.verifyParameter = function (argumentValue, argumentName) {
        if (argumentValue === null || argumentValue === undefined) {
            throw new TableauError_1.TableauError(SharedApiExternalContract_1.ErrorCodes.InvalidParameter, argumentValue + " is invalid value for paramter: " + argumentName);
        }
    };
    /**
     * Throws an InvalidParameter error if argument is empty string, null or undefined.
     *
     * @param argumentValue value to verify
     * @param argumentName name of argument to verify
     */
    /*tslint:disable-next-line */
    ErrorHelpers.verifyStringParameter = function (argumentValue, argumentName) {
        if (argumentValue === null || argumentValue === undefined || argumentValue === '') {
            throw new TableauError_1.TableauError(SharedApiExternalContract_1.ErrorCodes.InvalidParameter, argumentValue + " is invalid value for paramter: " + argumentName);
        }
    };
    /**
     * Verifies passed value is a valid value for that enum.
     * Throws an InvalidParameter error if the enum value is not valid.
     *
     * String enums are {string : string} dictionaries which are not reverse mappable
     * This is an ugly workaround
     *
     * @param enumValue value to verify
     * @param enumType enum to verify against
     */
    /*tslint:disable-next-line */
    ErrorHelpers.verifyEnumValue = function (enumValue, enumType) {
        var isValid = false;
        Object.keys(enumType).forEach(function (enumKey) {
            if (enumType[enumKey] === enumValue.toString()) {
                isValid = true;
            }
        });
        if (!isValid) {
            throw new TableauError_1.TableauError(SharedApiExternalContract_1.ErrorCodes.InvalidParameter, enumValue + " is invalid value for enum: " + enumType);
        }
    };
    /**
     * Verifies the params min and max for applying range filter.
     * Throws with error code InvalidParameter if range is invalid.
     *
     * @param min range min
     * @param max range max
     */
    /*tslint:disable-next-line */
    ErrorHelpers.verifyRangeParamType = function (min, max) {
        if (!min && !max) {
            throw new TableauError_1.TableauError(SharedApiExternalContract_1.ErrorCodes.InvalidParameter, 'Unexpected invalid param value, at least one of min or max is required.');
        }
        if (min && !Param_1.Param.isTypeNumber(min) && !Param_1.Param.isTypeDate(min)) {
            throw new TableauError_1.TableauError(SharedApiExternalContract_1.ErrorCodes.InvalidParameter, 'Unexpected invalid param value, only Date and number are allowed for parameter min.');
        }
        if (max && !Param_1.Param.isTypeNumber(max) && !Param_1.Param.isTypeDate(max)) {
            throw new TableauError_1.TableauError(SharedApiExternalContract_1.ErrorCodes.InvalidParameter, 'Unexpected invalid param value, only Date and number are allowed for parameter max.');
        }
        if (min && max && typeof (min) !== typeof (max)) {
            throw new TableauError_1.TableauError(SharedApiExternalContract_1.ErrorCodes.InvalidParameter, 'Unexpected invalid param value, parameters min and max should be of the same type.');
        }
    };
    /**
     * Verifies that the zoneId is present in the current dashboard and is Floating.
     * Throws with error code InvalidParameter if either condition is false.
     *
     * @param dashboardObjects An array of all DashboardObjects in the current dashboard
     * @param zoneID ZoneId to be validated
     */
    ErrorHelpers.verifyZoneIsValid = function (dashboardObjects, zoneID) {
        var isValid = dashboardObjects.some(function (dashboardObject) {
            return dashboardObject.id === zoneID && dashboardObject.isFloating;
        });
        if (!isValid) {
            throw new TableauError_1.TableauError(SharedApiExternalContract_1.ErrorCodes.InvalidParameter, "Unexpected invalid param value, Zone Id: " + zoneID + " is either not present or is a fixed zone.");
        }
    };
    return ErrorHelpers;
}());
exports.ErrorHelpers = ErrorHelpers;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(10);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var core = __webpack_require__(6);
var hide = __webpack_require__(13);
var redefine = __webpack_require__(17);
var ctx = __webpack_require__(19);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var InternalToExternalEnumMappings_1 = __webpack_require__(14);
var TableauError_1 = __webpack_require__(4);
var EnumConverter_1 = __webpack_require__(41);
/**
 * Each ServceImpl should extend this base class for the sake of
 * proper error handling.  This base handles the conversion
 * from internal errors to external errors that we throw to developers
 */
var ServiceImplBase = /** @class */ (function () {
    function ServiceImplBase(_dispatcher) {
        this._dispatcher = _dispatcher;
    }
    ServiceImplBase.prototype.execute = function (verb, params) {
        return this._dispatcher.execute(verb, params).catch(function (error) {
            // Any internal error that comes from the dispatcher should be converted
            // to an external error using the enum mapper for error codes.
            var internalError = error;
            var externalErrorCode = InternalToExternalEnumMappings_1.InternalToExternalEnumMappings.errorCode.convert(internalError.errorCode, EnumConverter_1.ShouldThrow.No);
            throw new TableauError_1.TableauError(externalErrorCode, internalError.message);
        });
    };
    return ServiceImplBase;
}());
exports.ServiceImplBase = ServiceImplBase;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(21);
var createDesc = __webpack_require__(46);
module.exports = __webpack_require__(18) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
var SharedApiExternalContract_1 = __webpack_require__(0);
var api_internal_contract_js_1 = __webpack_require__(1);
var EnumConverter_1 = __webpack_require__(41);
/* tslint:disable:typedef - Disable this to make declaring these classes a bit easier */
/**
 * Maps enums used by the internal-api-contract to the enums used
 * in the external-api-contract, which developers code against.
 */
var InternalToExternalEnumMappings = /** @class */ (function () {
    function InternalToExternalEnumMappings() {
    }
    InternalToExternalEnumMappings.extensionContext = new EnumConverter_1.EnumConverter((_a = {},
        _a[api_internal_contract_js_1.ExtensionContext.Desktop] = SharedApiExternalContract_1.ExtensionContext.Desktop,
        _a[api_internal_contract_js_1.ExtensionContext.Server] = SharedApiExternalContract_1.ExtensionContext.Server,
        _a));
    InternalToExternalEnumMappings.extensionMode = new EnumConverter_1.EnumConverter((_b = {},
        _b[api_internal_contract_js_1.ExtensionMode.Authoring] = SharedApiExternalContract_1.ExtensionMode.Authoring,
        _b[api_internal_contract_js_1.ExtensionMode.Viewing] = SharedApiExternalContract_1.ExtensionMode.Viewing,
        _b));
    InternalToExternalEnumMappings.columnType = new EnumConverter_1.EnumConverter((_c = {},
        _c[api_internal_contract_js_1.ColumnType.Continuous] = SharedApiExternalContract_1.ColumnType.Continuous,
        _c[api_internal_contract_js_1.ColumnType.Discrete] = SharedApiExternalContract_1.ColumnType.Discrete,
        _c));
    InternalToExternalEnumMappings.fieldAggregationType = new EnumConverter_1.EnumConverter((_d = {},
        _d[api_internal_contract_js_1.FieldAggregationType.Attr] = SharedApiExternalContract_1.FieldAggregationType.Attr,
        _d[api_internal_contract_js_1.FieldAggregationType.Avg] = SharedApiExternalContract_1.FieldAggregationType.Avg,
        _d[api_internal_contract_js_1.FieldAggregationType.Count] = SharedApiExternalContract_1.FieldAggregationType.Count,
        _d[api_internal_contract_js_1.FieldAggregationType.Countd] = SharedApiExternalContract_1.FieldAggregationType.Countd,
        _d[api_internal_contract_js_1.FieldAggregationType.Day] = SharedApiExternalContract_1.FieldAggregationType.Day,
        _d[api_internal_contract_js_1.FieldAggregationType.End] = SharedApiExternalContract_1.FieldAggregationType.End,
        _d[api_internal_contract_js_1.FieldAggregationType.Hour] = SharedApiExternalContract_1.FieldAggregationType.Hour,
        _d[api_internal_contract_js_1.FieldAggregationType.InOut] = SharedApiExternalContract_1.FieldAggregationType.InOut,
        _d[api_internal_contract_js_1.FieldAggregationType.Kurtosis] = SharedApiExternalContract_1.FieldAggregationType.Kurtosis,
        _d[api_internal_contract_js_1.FieldAggregationType.Max] = SharedApiExternalContract_1.FieldAggregationType.Max,
        _d[api_internal_contract_js_1.FieldAggregationType.Mdy] = SharedApiExternalContract_1.FieldAggregationType.Mdy,
        _d[api_internal_contract_js_1.FieldAggregationType.Median] = SharedApiExternalContract_1.FieldAggregationType.Median,
        _d[api_internal_contract_js_1.FieldAggregationType.Min] = SharedApiExternalContract_1.FieldAggregationType.Min,
        _d[api_internal_contract_js_1.FieldAggregationType.Minute] = SharedApiExternalContract_1.FieldAggregationType.Minute,
        _d[api_internal_contract_js_1.FieldAggregationType.MonthYear] = SharedApiExternalContract_1.FieldAggregationType.MonthYear,
        _d[api_internal_contract_js_1.FieldAggregationType.None] = SharedApiExternalContract_1.FieldAggregationType.None,
        _d[api_internal_contract_js_1.FieldAggregationType.Qtr] = SharedApiExternalContract_1.FieldAggregationType.Qtr,
        _d[api_internal_contract_js_1.FieldAggregationType.Quart1] = SharedApiExternalContract_1.FieldAggregationType.Quart1,
        _d[api_internal_contract_js_1.FieldAggregationType.Quart3] = SharedApiExternalContract_1.FieldAggregationType.Quart3,
        _d[api_internal_contract_js_1.FieldAggregationType.Second] = SharedApiExternalContract_1.FieldAggregationType.Second,
        _d[api_internal_contract_js_1.FieldAggregationType.Skewness] = SharedApiExternalContract_1.FieldAggregationType.Skewness,
        _d[api_internal_contract_js_1.FieldAggregationType.Stdev] = SharedApiExternalContract_1.FieldAggregationType.Stdev,
        _d[api_internal_contract_js_1.FieldAggregationType.Stdevp] = SharedApiExternalContract_1.FieldAggregationType.Stdevp,
        _d[api_internal_contract_js_1.FieldAggregationType.Sum] = SharedApiExternalContract_1.FieldAggregationType.Sum,
        _d[api_internal_contract_js_1.FieldAggregationType.TruncDay] = SharedApiExternalContract_1.FieldAggregationType.TruncDay,
        _d[api_internal_contract_js_1.FieldAggregationType.TruncHour] = SharedApiExternalContract_1.FieldAggregationType.TruncHour,
        _d[api_internal_contract_js_1.FieldAggregationType.TruncMinute] = SharedApiExternalContract_1.FieldAggregationType.TruncMinute,
        _d[api_internal_contract_js_1.FieldAggregationType.TruncMonth] = SharedApiExternalContract_1.FieldAggregationType.TruncMonth,
        _d[api_internal_contract_js_1.FieldAggregationType.TruncQtr] = SharedApiExternalContract_1.FieldAggregationType.TruncQtr,
        _d[api_internal_contract_js_1.FieldAggregationType.TruncSecond] = SharedApiExternalContract_1.FieldAggregationType.TruncSecond,
        _d[api_internal_contract_js_1.FieldAggregationType.TruncWeek] = SharedApiExternalContract_1.FieldAggregationType.TruncWeek,
        _d[api_internal_contract_js_1.FieldAggregationType.TruncYear] = SharedApiExternalContract_1.FieldAggregationType.TruncYear,
        _d[api_internal_contract_js_1.FieldAggregationType.User] = SharedApiExternalContract_1.FieldAggregationType.User,
        _d[api_internal_contract_js_1.FieldAggregationType.Var] = SharedApiExternalContract_1.FieldAggregationType.Var,
        _d[api_internal_contract_js_1.FieldAggregationType.Varp] = SharedApiExternalContract_1.FieldAggregationType.Varp,
        _d[api_internal_contract_js_1.FieldAggregationType.Week] = SharedApiExternalContract_1.FieldAggregationType.Week,
        _d[api_internal_contract_js_1.FieldAggregationType.Weekday] = SharedApiExternalContract_1.FieldAggregationType.Weekday,
        _d[api_internal_contract_js_1.FieldAggregationType.Year] = SharedApiExternalContract_1.FieldAggregationType.Year,
        _d));
    InternalToExternalEnumMappings.fieldRoleType = new EnumConverter_1.EnumConverter((_e = {},
        _e[api_internal_contract_js_1.FieldRoleType.Dimension] = SharedApiExternalContract_1.FieldRoleType.Dimension,
        _e[api_internal_contract_js_1.FieldRoleType.Measure] = SharedApiExternalContract_1.FieldRoleType.Measure,
        _e[api_internal_contract_js_1.FieldRoleType.Unknown] = SharedApiExternalContract_1.FieldRoleType.Unknown,
        _e));
    InternalToExternalEnumMappings.sheetType = new EnumConverter_1.EnumConverter((_f = {},
        _f[api_internal_contract_js_1.SheetType.Dashboard] = SharedApiExternalContract_1.SheetType.Dashboard,
        _f[api_internal_contract_js_1.SheetType.Story] = SharedApiExternalContract_1.SheetType.Story,
        _f[api_internal_contract_js_1.SheetType.Worksheet] = SharedApiExternalContract_1.SheetType.Worksheet,
        _f));
    InternalToExternalEnumMappings.dashboardObjectType = new EnumConverter_1.EnumConverter((_g = {},
        _g[api_internal_contract_js_1.DashboardObjectType.Extension] = SharedApiExternalContract_1.DashboardObjectType.Extension,
        _g[api_internal_contract_js_1.DashboardObjectType.Blank] = SharedApiExternalContract_1.DashboardObjectType.Blank,
        _g[api_internal_contract_js_1.DashboardObjectType.Image] = SharedApiExternalContract_1.DashboardObjectType.Image,
        _g[api_internal_contract_js_1.DashboardObjectType.Legend] = SharedApiExternalContract_1.DashboardObjectType.Legend,
        _g[api_internal_contract_js_1.DashboardObjectType.PageFilter] = SharedApiExternalContract_1.DashboardObjectType.PageFilter,
        _g[api_internal_contract_js_1.DashboardObjectType.ParameterControl] = SharedApiExternalContract_1.DashboardObjectType.ParameterControl,
        _g[api_internal_contract_js_1.DashboardObjectType.QuickFilter] = SharedApiExternalContract_1.DashboardObjectType.QuickFilter,
        _g[api_internal_contract_js_1.DashboardObjectType.Text] = SharedApiExternalContract_1.DashboardObjectType.Text,
        _g[api_internal_contract_js_1.DashboardObjectType.Title] = SharedApiExternalContract_1.DashboardObjectType.Title,
        _g[api_internal_contract_js_1.DashboardObjectType.WebPage] = SharedApiExternalContract_1.DashboardObjectType.WebPage,
        _g[api_internal_contract_js_1.DashboardObjectType.Worksheet] = SharedApiExternalContract_1.DashboardObjectType.Worksheet,
        _g));
    InternalToExternalEnumMappings.dataType = new EnumConverter_1.EnumConverter((_h = {},
        _h[api_internal_contract_js_1.DataType.Bool] = SharedApiExternalContract_1.DataType.Bool,
        _h[api_internal_contract_js_1.DataType.Date] = SharedApiExternalContract_1.DataType.Date,
        _h[api_internal_contract_js_1.DataType.DateTime] = SharedApiExternalContract_1.DataType.DateTime,
        _h[api_internal_contract_js_1.DataType.Float] = SharedApiExternalContract_1.DataType.Float,
        _h[api_internal_contract_js_1.DataType.Int] = SharedApiExternalContract_1.DataType.Int,
        _h[api_internal_contract_js_1.DataType.String] = SharedApiExternalContract_1.DataType.String,
        _h));
    InternalToExternalEnumMappings.filterUpdateType = new EnumConverter_1.EnumConverter((_j = {},
        _j[api_internal_contract_js_1.FilterUpdateType.Add] = SharedApiExternalContract_1.FilterUpdateType.Add,
        _j[api_internal_contract_js_1.FilterUpdateType.All] = SharedApiExternalContract_1.FilterUpdateType.All,
        _j[api_internal_contract_js_1.FilterUpdateType.Remove] = SharedApiExternalContract_1.FilterUpdateType.Remove,
        _j[api_internal_contract_js_1.FilterUpdateType.Replace] = SharedApiExternalContract_1.FilterUpdateType.Replace,
        _j));
    InternalToExternalEnumMappings.allowableValues = new EnumConverter_1.EnumConverter((_k = {},
        _k[api_internal_contract_js_1.DomainRestrictionType.All] = SharedApiExternalContract_1.ParameterValueType.All,
        _k[api_internal_contract_js_1.DomainRestrictionType.List] = SharedApiExternalContract_1.ParameterValueType.List,
        _k[api_internal_contract_js_1.DomainRestrictionType.Range] = SharedApiExternalContract_1.ParameterValueType.Range,
        _k));
    InternalToExternalEnumMappings.dateStepPeriod = new EnumConverter_1.EnumConverter((_l = {},
        _l[api_internal_contract_js_1.DateStepPeriod.Years] = SharedApiExternalContract_1.PeriodType.Years,
        _l[api_internal_contract_js_1.DateStepPeriod.Quarters] = SharedApiExternalContract_1.PeriodType.Quarters,
        _l[api_internal_contract_js_1.DateStepPeriod.Months] = SharedApiExternalContract_1.PeriodType.Months,
        _l[api_internal_contract_js_1.DateStepPeriod.Weeks] = SharedApiExternalContract_1.PeriodType.Weeks,
        _l[api_internal_contract_js_1.DateStepPeriod.Days] = SharedApiExternalContract_1.PeriodType.Days,
        _l[api_internal_contract_js_1.DateStepPeriod.Hours] = SharedApiExternalContract_1.PeriodType.Hours,
        _l[api_internal_contract_js_1.DateStepPeriod.Minutes] = SharedApiExternalContract_1.PeriodType.Minutes,
        _l[api_internal_contract_js_1.DateStepPeriod.Seconds] = SharedApiExternalContract_1.PeriodType.Seconds,
        _l));
    InternalToExternalEnumMappings.dateRangeType = new EnumConverter_1.EnumConverter((_m = {},
        _m[api_internal_contract_js_1.DateRangeType.Current] = SharedApiExternalContract_1.DateRangeType.Current,
        _m[api_internal_contract_js_1.DateRangeType.Last] = SharedApiExternalContract_1.DateRangeType.Last,
        _m[api_internal_contract_js_1.DateRangeType.LastN] = SharedApiExternalContract_1.DateRangeType.LastN,
        _m[api_internal_contract_js_1.DateRangeType.Next] = SharedApiExternalContract_1.DateRangeType.Next,
        _m[api_internal_contract_js_1.DateRangeType.NextN] = SharedApiExternalContract_1.DateRangeType.NextN,
        _m[api_internal_contract_js_1.DateRangeType.ToDate] = SharedApiExternalContract_1.DateRangeType.ToDate,
        _m));
    InternalToExternalEnumMappings.errorCode = new EnumConverter_1.EnumConverter((_o = {},
        _o[api_internal_contract_js_1.ErrorCodes.INITIALIZATION_ERROR] = SharedApiExternalContract_1.ErrorCodes.InternalError,
        _o[api_internal_contract_js_1.ErrorCodes.INTERNAL_ERROR] = SharedApiExternalContract_1.ErrorCodes.InternalError,
        _o[api_internal_contract_js_1.ErrorCodes.MISSING_ENUM_MAPPING] = SharedApiExternalContract_1.ErrorCodes.InternalError,
        _o[api_internal_contract_js_1.ErrorCodes.MISSING_PARAMETER] = SharedApiExternalContract_1.ErrorCodes.InternalError,
        _o[api_internal_contract_js_1.ErrorCodes.PERMISSION_DENIED] = SharedApiExternalContract_1.ErrorCodes.InternalError,
        _o[api_internal_contract_js_1.ErrorCodes.PRES_MODEL_PARSING_ERROR] = SharedApiExternalContract_1.ErrorCodes.InternalError,
        _o[api_internal_contract_js_1.ErrorCodes.UNKNOWN_VERB_ID] = SharedApiExternalContract_1.ErrorCodes.InternalError,
        _o[api_internal_contract_js_1.ErrorCodes.VERSION_NOT_CONFIGURED] = SharedApiExternalContract_1.ErrorCodes.APINotInitialized,
        _o[api_internal_contract_js_1.ErrorCodes.VISIBILITY_ERROR] = SharedApiExternalContract_1.ErrorCodes.VisibilityError,
        _o), SharedApiExternalContract_1.ErrorCodes.InternalError);
    InternalToExternalEnumMappings.filterType = new EnumConverter_1.EnumConverter((_p = {},
        _p[api_internal_contract_js_1.FilterType.Categorical] = SharedApiExternalContract_1.FilterType.Categorical,
        _p[api_internal_contract_js_1.FilterType.Range] = SharedApiExternalContract_1.FilterType.Range,
        _p[api_internal_contract_js_1.FilterType.RelativeDate] = SharedApiExternalContract_1.FilterType.RelativeDate,
        _p[api_internal_contract_js_1.FilterType.Hierarchical] = SharedApiExternalContract_1.FilterType.Hierarchical,
        _p));
    return InternalToExternalEnumMappings;
}());
exports.InternalToExternalEnumMappings = InternalToExternalEnumMappings;
/* tslint:enable:typedef */


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// This file re-exports everything which is part of the extensions api public interface
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
// Export everything from the shared file
__export(__webpack_require__(0));


/***/ }),
/* 16 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var hide = __webpack_require__(13);
var has = __webpack_require__(22);
var SRC = __webpack_require__(26)('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(6).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(27)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(23);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(9);
var IE8_DOM_DEFINE = __webpack_require__(75);
var toPrimitive = __webpack_require__(76);
var dP = Object.defineProperty;

exports.f = __webpack_require__(18) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(16);
var TAG = __webpack_require__(2)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 26 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(10);
var document = __webpack_require__(3).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(82);
var enumBugKeys = __webpack_require__(48);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(33);
var defined = __webpack_require__(30);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(16);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(29);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(45)('keys');
var uid = __webpack_require__(26);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(21).f;
var has = __webpack_require__(22);
var TAG = __webpack_require__(2)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(30);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(23);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Contract = __webpack_require__(0);
var TableauError_1 = __webpack_require__(4);
/**
 * Class designed to register and unregister handlers from a user. Only those events
 * which are added via AddNewEventType will be supported by this instance
 */
var EventListenerManager = /** @class */ (function () {
    function EventListenerManager() {
        this._eventListenerManagers = {};
    }
    EventListenerManager.prototype.addEventListener = function (eventType, handler) {
        if (!this._eventListenerManagers.hasOwnProperty(eventType)) {
            throw new TableauError_1.TableauError(Contract.ErrorCodes.UnsupportedEventName, "Cannot add event, unsupported event type: " + eventType);
        }
        return this._eventListenerManagers[eventType].addEventListener(handler);
    };
    EventListenerManager.prototype.removeEventListener = function (eventType, handler) {
        if (!this._eventListenerManagers.hasOwnProperty(eventType)) {
            throw new TableauError_1.TableauError(Contract.ErrorCodes.UnsupportedEventName, "Cannot remove event, unsupported event type: " + eventType);
        }
        return this._eventListenerManagers[eventType].removeEventListener(handler);
    };
    EventListenerManager.prototype.addNewEventType = function (eventManager) {
        this._eventListenerManagers[eventManager.eventType] = eventManager;
    };
    return EventListenerManager;
}());
exports.EventListenerManager = EventListenerManager;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Enum defining the 4 different types of messages we have defined
 */
var MessageType;
(function (MessageType) {
    MessageType["Initialize"] = "initialize";
    MessageType["Notification"] = "notification";
    MessageType["Command"] = "command";
    MessageType["CommandResponse"] = "command-response";
})(MessageType = exports.MessageType || (exports.MessageType = {}));


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SharedApiExternalContract_1 = __webpack_require__(0);
var TableauError_1 = __webpack_require__(4);
/**
 * This class converts from a source enum value to destination enum
 * value given a mapping from source to destination when constructed.
 *
 * Note: This exact same class is defined in api-core.  Given its small
 * nature, it is not worth having in a separate project to share this between
 * api-core and api-shared.  If more utility functionality is added that is used by api-core
 * and api-shared but has no other dependecies, a utiltity project might be merited,
 * and this class could be moved.
 */
var EnumConverter = /** @class */ (function () {
    function EnumConverter(_mappings, _defaultVal) {
        this._mappings = _mappings;
        this._defaultVal = _defaultVal;
    }
    EnumConverter.prototype.convert = function (enumVal, throwIfMissing) {
        if (throwIfMissing === void 0) { throwIfMissing = ShouldThrow.Yes; }
        if (this._mappings.hasOwnProperty(enumVal)) {
            return this._mappings[enumVal];
        }
        if (this._defaultVal !== undefined && throwIfMissing !== ShouldThrow.Yes) {
            return this._defaultVal;
        }
        throw new TableauError_1.TableauError(SharedApiExternalContract_1.ErrorCodes.InternalError, "Enum Mapping not found for: " + enumVal);
    };
    return EnumConverter;
}());
exports.EnumConverter = EnumConverter;
var ShouldThrow;
(function (ShouldThrow) {
    ShouldThrow["Yes"] = "yes";
    ShouldThrow["No"] = "no";
})(ShouldThrow = exports.ShouldThrow || (exports.ShouldThrow = {}));


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This class implements the SingleEventManager interface for a single type of Tableau event
 *
 * @template TEventType The Tableau event type this class specializes
 */
var SingleEventManagerImpl = /** @class */ (function () {
    function SingleEventManagerImpl(eventType) {
        this._eventType = eventType;
        this._handlers = [];
    }
    Object.defineProperty(SingleEventManagerImpl.prototype, "eventType", {
        get: function () {
            return this._eventType;
        },
        enumerable: true,
        configurable: true
    });
    SingleEventManagerImpl.prototype.addEventListener = function (handler) {
        var _this = this;
        this._handlers.push(handler);
        return function () { return _this.removeEventListener(handler); };
    };
    SingleEventManagerImpl.prototype.removeEventListener = function (handler) {
        var beforeCount = this._handlers.length;
        this._handlers = this._handlers.filter(function (h) { return h !== handler; });
        return beforeCount > this._handlers.length;
    };
    SingleEventManagerImpl.prototype.triggerEvent = function (eventGenerator) {
        for (var _i = 0, _a = this._handlers; _i < _a.length; _i++) {
            var handler = _a[_i];
            try {
                var eventModel = eventGenerator();
                handler(eventModel);
            }
            catch (e) {
                // Since this handler could be outside our control, just catch anything it throws and continue on
                continue;
            }
        }
    };
    return SingleEventManagerImpl;
}());
exports.SingleEventManagerImpl = SingleEventManagerImpl;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SharedApiExternalContract_1 = __webpack_require__(0);
var TableauError_1 = __webpack_require__(4);
var Param = /** @class */ (function () {
    function Param() {
    }
    /**
     * serializes the date into the format that the server expects.
     * @param date the date to serialize
     */
    Param.serializeDateForPlatform = function (date) {
        var year = date.getUTCFullYear();
        var month = date.getUTCMonth() + 1;
        var day = date.getUTCDate();
        var hh = date.getUTCHours();
        var mm = date.getUTCMinutes();
        var sec = date.getUTCSeconds();
        return year + "-" + month + "-" + day + " " + hh + ":" + mm + ":" + sec;
    };
    Param.serializeBooleanForPlatform = function (bool) {
        return bool ? 'true' : 'false';
    };
    Param.serializeNumberForPlatform = function (num) {
        return num.toString(10);
    };
    /**
     * Verifies the input is a number
     */
    /* tslint:disable:no-any */
    Param.isTypeNumber = function (input) {
        return typeof (input) === 'number' || input instanceof Number;
    };
    /* tslint:enable:no-any */
    /**
     * Verifies the input is a Date
     */
    /* tslint:disable:no-any */
    Param.isTypeDate = function (input) {
        return input instanceof Date;
    };
    /* tslint:enable:no-any */
    /* tslint:disable-next-line:no-any */
    Param.isTypeString = function (input) {
        return typeof (input) === 'string' || input instanceof String;
    };
    /* tslint:disable-next-line:no-any */
    Param.isTypeBool = function (input) {
        return typeof (input) === 'boolean' || input instanceof Boolean;
    };
    /* tslint:disable-next-line:no-any */
    Param.serializeParamterValue = function (value) {
        if (Param.isTypeNumber(value)) {
            return Param.serializeNumberForPlatform(value);
        }
        else if (Param.isTypeDate(value)) {
            return Param.serializeDateForPlatform(value);
        }
        else if (Param.isTypeBool(value)) {
            return Param.serializeBooleanForPlatform(value);
        }
        else if (Param.isTypeString(value)) {
            return value;
        }
        else {
            throw new TableauError_1.TableauError(SharedApiExternalContract_1.ErrorCodes.InternalError, "Unexpected invalid value for: " + value);
        }
    };
    return Param;
}());
exports.Param = Param;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DataTable = /** @class */ (function () {
    function DataTable(_data, _columns, _totalRowCount, _isTotalRowCountLimited, _isSummaryData, _marksInfo) {
        this._data = _data;
        this._columns = _columns;
        this._totalRowCount = _totalRowCount;
        this._isTotalRowCountLimited = _isTotalRowCountLimited;
        this._isSummaryData = _isSummaryData;
        this._marksInfo = _marksInfo;
        // TODO: get rid of this in redesign.
        this._name = _isSummaryData ? 'Summary Data Table' : 'Underlying Data Table';
    }
    Object.defineProperty(DataTable.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "columns", {
        get: function () {
            return this._columns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "marksInfo", {
        get: function () {
            return this._marksInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "totalRowCount", {
        get: function () {
            return this._totalRowCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "isTotalRowCountLimited", {
        get: function () {
            return this._isTotalRowCountLimited;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTable.prototype, "isSummaryData", {
        get: function () {
            return this._isSummaryData;
        },
        enumerable: true,
        configurable: true
    });
    return DataTable;
}());
exports.DataTable = DataTable;
var MarkInfo = /** @class */ (function () {
    function MarkInfo(_type, _color, _tupleId) {
        this._type = _type;
        this._color = _color;
        this._tupleId = _tupleId;
    }
    Object.defineProperty(MarkInfo.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkInfo.prototype, "color", {
        get: function () {
            return this._color;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkInfo.prototype, "tupleId", {
        get: function () {
            return this._tupleId;
        },
        enumerable: true,
        configurable: true
    });
    return MarkInfo;
}());
exports.MarkInfo = MarkInfo;
var Column = /** @class */ (function () {
    function Column(_fieldName, _dataType, // TODO: this shoudl be an enum type
    _isReferenced, _index) {
        this._fieldName = _fieldName;
        this._dataType = _dataType;
        this._isReferenced = _isReferenced;
        this._index = _index;
    }
    Object.defineProperty(Column.prototype, "fieldName", {
        get: function () {
            return this._fieldName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "dataType", {
        get: function () {
            return this._dataType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "isReferenced", {
        get: function () {
            return this._isReferenced;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "index", {
        get: function () {
            return this._index;
        },
        enumerable: true,
        configurable: true
    });
    return Column;
}());
exports.Column = Column;
var DataValue = /** @class */ (function () {
    /* tslint:disable:no-any */
    function DataValue(_value, _formattedValue) {
        this._value = _value;
        this._formattedValue = _formattedValue;
    }
    Object.defineProperty(DataValue.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataValue.prototype, "formattedValue", {
        get: function () {
            return this._formattedValue;
        },
        enumerable: true,
        configurable: true
    });
    return DataValue;
}());
exports.DataValue = DataValue;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(6);
var global = __webpack_require__(3);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(25) ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(25);
var $export = __webpack_require__(11);
var redefine = __webpack_require__(17);
var hide = __webpack_require__(13);
var Iterators = __webpack_require__(20);
var $iterCreate = __webpack_require__(79);
var setToStringTag = __webpack_require__(36);
var getPrototypeOf = __webpack_require__(85);
var ITERATOR = __webpack_require__(2)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 48 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(3).document;
module.exports = document && document.documentElement;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(2)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(13)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(9);
var aFunction = __webpack_require__(23);
var SPECIES = __webpack_require__(2)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(19);
var invoke = __webpack_require__(95);
var html = __webpack_require__(49);
var cel = __webpack_require__(28);
var global = __webpack_require__(3);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(16)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(9);
var isObject = __webpack_require__(10);
var newPromiseCapability = __webpack_require__(38);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(109);
module.exports = __webpack_require__(6).Object.assign;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var EventListenerManager_1 = __webpack_require__(39);
var Sheet = /** @class */ (function (_super) {
    __extends(Sheet, _super);
    function Sheet(_sheetImpl) {
        var _this = _super.call(this) || this;
        _this._sheetImpl = _sheetImpl;
        return _this;
    }
    Object.defineProperty(Sheet.prototype, "name", {
        get: function () {
            return this._sheetImpl.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sheet.prototype, "sheetType", {
        get: function () {
            return this._sheetImpl.sheetType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sheet.prototype, "size", {
        get: function () {
            return this._sheetImpl.size;
        },
        enumerable: true,
        configurable: true
    });
    Sheet.prototype.findParameterAsync = function (parameterName) {
        return this._sheetImpl.findParameterAsync(parameterName, this);
    };
    Sheet.prototype.getParametersAsync = function () {
        return this._sheetImpl.getParametersAsync(this);
    };
    return Sheet;
}(EventListenerManager_1.EventListenerManager));
exports.Sheet = Sheet;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SharedApiExternalContract_1 = __webpack_require__(0);
var TableauError_1 = __webpack_require__(4);
/**
 * Represents the current version of the extensions library
 */
var VersionNumber = /** @class */ (function () {
    // private constructor so everyone uses the singleton instance
    // build numbers have this form: M.m.f-pre.N
    function VersionNumber(versionString, isAlpha) {
        var partStr = versionString.split('-');
        this.build = this.getBuildNumber(partStr[1]);
        versionString = partStr[0];
        var parts = versionString.split('.').map(function (p) { return parseInt(p, 10); });
        if (parts.length !== 3) {
            throw new TableauError_1.TableauError(SharedApiExternalContract_1.ErrorCodes.InternalError, "Invalid version number: " + versionString);
        }
        this.major = parts[0];
        this.minor = parts[1];
        this.fix = parts[2];
        this.isAlpha = isAlpha;
    }
    Object.defineProperty(VersionNumber, "Instance", {
        /**
         * Gets the singleton instance of the version number.
         */
        get: function () {
            return VersionNumber._instance;
        },
        enumerable: true,
        configurable: true
    });
    VersionNumber.SetVersionNumber = function (numString, isAlpha) {
        VersionNumber._instance = new VersionNumber(numString, isAlpha);
    };
    VersionNumber.prototype.getBuildNumber = function (preReleaseString) {
        var noBuildNumber = -1;
        if (!preReleaseString) {
            return noBuildNumber;
        }
        // The preRelease string has this form: pre.N, but we don't depend on the actual string being 'pre'
        var partStr = preReleaseString.split('.');
        return partStr[1] ? parseInt(partStr[1], 10) : noBuildNumber;
    };
    Object.defineProperty(VersionNumber.prototype, "formattedValue", {
        get: function () {
            return this.major + "." + this.minor + "." + this.fix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VersionNumber.prototype, "fullFormattedValue", {
        get: function () {
            return this.major + "." + this.minor + "." + this.fix + "-pre." + this.build;
        },
        enumerable: true,
        configurable: true
    });
    return VersionNumber;
}());
exports.VersionNumber = VersionNumber;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Declare this key type and export the NotificationId to make this behave like a string enum
var VerbId;
(function (VerbId) {
    VerbId["ApplyCategoricalFilter"] = "categorical-filter";
    VerbId["ApplyRangeFilter"] = "range-filter";
    VerbId["ClearFilter"] = "clear-filter";
    VerbId["InitializeExtension"] = "initialize-extension";
    VerbId["GetDataSummaryData"] = "get-summary-data";
    VerbId["GetUnderlyingData"] = "get-underlying-data";
    VerbId["GetDataSourceData"] = "get-datasource-data";
    VerbId["SaveExtensionSettings"] = "save-extension-settings";
    VerbId["GetSelectedMarks"] = "get-selected-marks";
    VerbId["GetHighlightedMarks"] = "get-highlighted-marks";
    VerbId["GetParametersForSheet"] = "get-parameters-for-sheet";
    VerbId["FindParameter"] = "find-parameter";
    VerbId["ChangeParameterValue"] = "change-parameter-value";
    VerbId["ClearSelectedMarks"] = "clear-selected-marks";
    VerbId["SelectByValue"] = "select-by-value";
    VerbId["GetDataSources"] = "get-data-sources";
    VerbId["RefreshDataSource"] = "refresh-data-source";
    VerbId["GetFilters"] = "get-filters";
    VerbId["GetFieldAndDataSource"] = "get-field-and-datasource";
    VerbId["GetCategoricalDomain"] = "get-categorical-domain";
    VerbId["GetRangeDomain"] = "get-range-domain";
    VerbId["GetJoinDescription"] = "get-join-description";
    VerbId["GetConnectionDescriptionSummaries"] = "get-connection-description-summaries";
    VerbId["DisplayDialog"] = "display-dialog";
    VerbId["CloseDialog"] = "close-dialog";
    VerbId["TestConversionVerb"] = "test-conversion-verb";
    VerbId["GetField"] = "get-field";
    VerbId["GetDataSource"] = "get-datasource";
    VerbId["GetActiveTables"] = "get-active-tables";
    VerbId["SetZoneVisibility"] = "set-zone-visibility";
    VerbId["BlockExtension"] = "block-extension";
})(VerbId = exports.VerbId || (exports.VerbId = {}));


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var StackingVersionConverter_1 = __webpack_require__(123);
var IdentityVersionConverter_1 = __webpack_require__(124);
var VersionTranslations_1 = __webpack_require__(125);
/**
 * @returns true if lhs < rhs (ignoring fix number)
 * @param lhs
 * @param rhs
 */
function VersionLessThan(lhs, rhs) {
    if (lhs.major > rhs.major) {
        return false;
    }
    if (lhs.major < rhs.major) {
        return true;
    }
    return (lhs.minor < rhs.minor);
}
exports.VersionLessThan = VersionLessThan;
/**
 * @returns true if lhs == rhs (ignoring fix number)
 * @param lhs
 * @param rhs
 */
function VersionEqualTo(lhs, rhs) {
    return (lhs.major === rhs.major) && (lhs.minor === rhs.minor);
}
exports.VersionEqualTo = VersionEqualTo;
/**
 * @deprecated This function is deprecated, and will not be called from api-platform in 2019.2+.
 *
 * Creates a new InternalContractVersionConverter which has the ability to upgrade and downgrade the contract between the two versions
 * which are specified. If externalMajorVersion is greater than platformMajorVersion, an error will be thrown because
 * we won't know how to do those conversions.
 *
 * @see CreateCompatibleVersionConverter
 *
 * @param externalMajorVersion The version of the internal api which the external module is using
 * @param platformMajorVersion The version of the internal api which the platform is using
 */
function CreateVersionConverter(externalMajorVersion, platformMajorVersion) {
    // A mapping from the source version of a model -> the next version of the model. Each major
    // version bump can have an array of conversions to perform in order
    var executeUpgrades = {
        0: []
    };
    var executeDowngrades = {
        0: [],
        1: [VersionTranslations_1.DowngradeV2WorksheetNames]
    };
    var notificationDowngrades = {
        0: []
    };
    if (!Number.isInteger(externalMajorVersion) ||
        !Number.isInteger(platformMajorVersion) ||
        externalMajorVersion < 0 ||
        platformMajorVersion < 0) {
        throw new Error("Versions must be positive integers:\n    externalMajorVersion=" + externalMajorVersion + " platformMajorVersion=" + platformMajorVersion);
    }
    if (externalMajorVersion > platformMajorVersion) {
        throw new Error("External version must be less than or equal to platform version.\n    externalMajorVersion=" + externalMajorVersion + " platformMajorVersion=" + platformMajorVersion);
    }
    if (externalMajorVersion === platformMajorVersion) {
        // If we are using the exact same versions, just use the identity converter
        return new IdentityVersionConverter_1.IdentityVersionConverter();
    }
    // Walk the span between the versions we have here and collect the upgrade and downgrades necessary
    var neededExecuteUpgrades = [];
    for (var i = externalMajorVersion; i < platformMajorVersion; i++) {
        if (i in executeUpgrades) {
            neededExecuteUpgrades.push.apply(neededExecuteUpgrades, executeUpgrades[i]);
        }
    }
    // Walk the span between them backwards to get the necessary downgrades
    var neededExecuteDowngrades = [];
    var neededNotificationDowngrades = [];
    for (var i = platformMajorVersion - 1; i >= externalMajorVersion; i--) {
        if (i in executeDowngrades) {
            neededExecuteDowngrades.push.apply(neededExecuteDowngrades, executeDowngrades[i]);
        }
        if (i in notificationDowngrades) {
            neededNotificationDowngrades.push.apply(neededNotificationDowngrades, notificationDowngrades[i]);
        }
    }
    return new StackingVersionConverter_1.StackingVersionConverter(externalMajorVersion, platformMajorVersion, neededExecuteUpgrades, neededExecuteDowngrades, neededNotificationDowngrades);
}
exports.CreateVersionConverter = CreateVersionConverter;
// A mapping from an older client version of internal-contract to the current platform version of this contract.
// Each version bump can have an array of translations to perform in order. Notice that this is
// different than the major upgrades/downgrades above because it handles both major and minor version changes.
// Also please note: downgradeExecuteCall is handled on the client/external side rather than platform side.
// When updating the major or minor version of our internal-contract, you will need to update these data structures.
// * If there are translations to add, add them to the version to "upgrade from" or "downgrade to".
exports.ExecuteMinorUpgrades = {
    1: {
        9: [],
    }
};
exports.ExecuteMinorDowngrades = {
    1: {
        9: [],
    }
};
exports.NotificationMinorDowngrades = {
    1: {
        9: [],
    }
};
/**
 * Creates a new InternalContractVersionConverter which has the ability to upgrade and downgrade the contract between the two versions
 * which are specified. If externalMajorVersion is greater than platformMajorVersion, an error will be thrown because
 * we won't know how to do those conversions. As compared to CreateVersionConverter, this converter can also handle
 * minor updates, with upgrade/downgrade for both major and minor updates.
 *
 * @param externalVersion VersionNumber of the internal api which the external module is using
 * @param platformVersion VersionNumber of the internal api which the platform is using
 */
function CreateCompatibleVersionConverter(externalVersion, platformVersion) {
    return CreateCompatibleVersionConverterWithTranslators(externalVersion, platformVersion, exports.ExecuteMinorUpgrades, exports.ExecuteMinorDowngrades, exports.NotificationMinorDowngrades);
}
exports.CreateCompatibleVersionConverter = CreateCompatibleVersionConverter;
/**
 * Implementation of CreateCompatibleVersionConverter. This function takes the upgrade, downgrade, and
 * notification arrays so that all the logic can be tested.
 *
 * @param externalVersion VersionNumber of the internal api which the external module is using
 * @param platformVersion VersionNumber of the internal api which the platform is using
 * @param upgrades MajorMinorTranslators for upgrades
 * @param downgrades MajorMinorTranslators for downgrades
 * @param notificationDowngrades MajorMinorTranslators for notification downgrades
 */
function CreateCompatibleVersionConverterWithTranslators(externalVersion, platformVersion, upgrades, downgrades, notificationDowngrades) {
    var externalMajorVersion = externalVersion.major;
    var externalMinorVersion = externalVersion.minor;
    var platformMajorVersion = platformVersion.major;
    if (externalMajorVersion > platformMajorVersion) {
        throw new Error("External version must be less than or equal to platform version.\n    externalMajorVersion=" + externalMajorVersion + " platformMajorVersion=" + platformMajorVersion);
    }
    // If we are using the exact same versions (major.minor), just use the identity converter
    if (VersionEqualTo(externalVersion, platformVersion)) {
        return new IdentityVersionConverter_1.IdentityVersionConverter();
    }
    // Walk the span between the versions we have here and collect the upgrade and downgrades necessary
    var neededExecuteUpgrades = GetNeededTranslations(externalMajorVersion, platformMajorVersion, externalMinorVersion, upgrades);
    var neededExecuteDowngrades = GetNeededTranslations(externalMajorVersion, platformMajorVersion, externalMinorVersion, downgrades);
    var neededNotificationDowngrades = GetNeededTranslations(externalMajorVersion, platformMajorVersion, externalMinorVersion, notificationDowngrades);
    // We want to apply the downgrades in reverse order in case of dependencies between them
    neededExecuteDowngrades.reverse();
    neededNotificationDowngrades.reverse();
    return StackingVersionConverter_1.StackingVersionConverter.fromData(externalVersion, platformVersion, neededExecuteUpgrades, neededExecuteDowngrades, neededNotificationDowngrades);
}
exports.CreateCompatibleVersionConverterWithTranslators = CreateCompatibleVersionConverterWithTranslators;
function GetNeededTranslations(externalMajorVersion, platformMajorVersion, externalMinorVersion, majorMinorTranslators) {
    var neededTranslations = [];
    for (var major = externalMajorVersion; major <= platformMajorVersion; major++) {
        if (major in majorMinorTranslators) {
            var start = (major === externalMajorVersion) ? externalMinorVersion : 0;
            var maximumMinorVersion = GetMaximumMinorIndex(Object.keys(majorMinorTranslators[major]));
            for (var minor = start; minor <= maximumMinorVersion; minor++) {
                if (minor in majorMinorTranslators[major]) {
                    neededTranslations.push.apply(neededTranslations, majorMinorTranslators[major][minor]);
                }
            }
        }
    }
    return neededTranslations;
}
function GetMaximumMinorIndex(minorVersions) {
    return minorVersions.map(function (a) { return Number(a); }).reduce(function (a, b) { return a > b ? a : b; });
}
exports.GetMaximumMinorIndex = GetMaximumMinorIndex;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-any
/**
 * This version converter doesn't actually do anything but is useful for testing or when we have
 * a matching platform and external version number
*/
var ExternalIdentityVersionConverter = /** @class */ (function () {
    function ExternalIdentityVersionConverter() {
    }
    ExternalIdentityVersionConverter.prototype.downgradeExecuteCall = function (verb, parameters) {
        return {
            verb: verb,
            parameters: parameters
        };
    };
    ExternalIdentityVersionConverter.prototype.upgradeExecuteReturn = function (executeResponse) {
        return executeResponse;
    };
    ExternalIdentityVersionConverter.prototype.upgradeNotification = function (notification) {
        return notification;
    };
    return ExternalIdentityVersionConverter;
}());
exports.ExternalIdentityVersionConverter = ExternalIdentityVersionConverter;


/***/ }),
/* 61 */
/***/ (function(module, exports) {

(function () {
  var validator = new RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$", "i");

  function gen(count) {
    var out = "";
    for (var i=0; i<count; i++) {
      out += (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return out;
  }

  function Guid(guid) {
    if (!guid) throw new TypeError("Invalid argument; `value` has no value.");
      
    this.value = Guid.EMPTY;
    
    if (guid && guid instanceof Guid) {
      this.value = guid.toString();

    } else if (guid && Object.prototype.toString.call(guid) === "[object String]" && Guid.isGuid(guid)) {
      this.value = guid;
    }
    
    this.equals = function(other) {
      // Comparing string `value` against provided `guid` will auto-call
      // toString on `guid` for comparison
      return Guid.isGuid(other) && this.value == other;
    };

    this.isEmpty = function() {
      return this.value === Guid.EMPTY;
    };
    
    this.toString = function() {
      return this.value;
    };
    
    this.toJSON = function() {
      return this.value;
    };
  };

  Guid.EMPTY = "00000000-0000-0000-0000-000000000000";

  Guid.isGuid = function(value) {
    return value && (value instanceof Guid || validator.test(value.toString()));
  };

  Guid.create = function() {
    return new Guid([gen(2), gen(1), gen(1), gen(1), gen(3)].join("-"));
  };

  Guid.raw = function() {
    return [gen(2), gen(1), gen(1), gen(1), gen(3)].join("-");
  };

  if(typeof module != 'undefined' && module.exports) {
    module.exports = Guid;
  }
  else if (typeof window != 'undefined') {
    window.Guid = Guid;
  }
})();


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TableauEvent = /** @class */ (function () {
    function TableauEvent(type) {
        this._type = type;
    }
    Object.defineProperty(TableauEvent.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    return TableauEvent;
}());
exports.TableauEvent = TableauEvent;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ServiceRegistry_1 = __webpack_require__(7);
var ErrorHelpers_1 = __webpack_require__(8);
var SheetImpl = /** @class */ (function () {
    function SheetImpl(_sheetInfoImpl) {
        this._sheetInfoImpl = _sheetInfoImpl;
    }
    Object.defineProperty(SheetImpl.prototype, "name", {
        get: function () {
            return this._sheetInfoImpl.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SheetImpl.prototype, "sheetType", {
        get: function () {
            return this._sheetInfoImpl.sheetType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SheetImpl.prototype, "sheetPath", {
        get: function () {
            return this._sheetInfoImpl.sheetPath;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SheetImpl.prototype, "size", {
        get: function () {
            return this._sheetInfoImpl.sheetSize;
        },
        enumerable: true,
        configurable: true
    });
    SheetImpl.prototype.findParameterAsync = function (parameterName, sheet) {
        ErrorHelpers_1.ErrorHelpers.verifyParameter(parameterName, 'parameterName');
        ErrorHelpers_1.ErrorHelpers.verifyParameter(sheet, 'sheet');
        var service = ServiceRegistry_1.ApiServiceRegistry.instance.getService("parameters-service" /* Parameters */);
        return service.findParameterByNameAsync(parameterName, sheet);
    };
    SheetImpl.prototype.getParametersAsync = function (sheet) {
        ErrorHelpers_1.ErrorHelpers.verifyParameter(sheet, 'sheet');
        var service = ServiceRegistry_1.ApiServiceRegistry.instance.getService("parameters-service" /* Parameters */);
        return service.getParametersForSheetAsync(this.sheetPath, sheet);
    };
    return SheetImpl;
}());
exports.SheetImpl = SheetImpl;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DataSource = /** @class */ (function () {
    function DataSource(_dataSourceImpl) {
        this._dataSourceImpl = _dataSourceImpl;
    }
    Object.defineProperty(DataSource.prototype, "name", {
        get: function () {
            return this._dataSourceImpl.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataSource.prototype, "id", {
        get: function () {
            return this._dataSourceImpl.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataSource.prototype, "fields", {
        get: function () {
            return this._dataSourceImpl.fields;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataSource.prototype, "extractUpdateTime", {
        get: function () {
            return this._dataSourceImpl.extractUpdateTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataSource.prototype, "isExtract", {
        get: function () {
            return this._dataSourceImpl.isExtract;
        },
        enumerable: true,
        configurable: true
    });
    DataSource.prototype.refreshAsync = function () {
        return this._dataSourceImpl.refreshAsync();
    };
    DataSource.prototype.getActiveTablesAsync = function () {
        return this._dataSourceImpl.getActiveTablesAsync();
    };
    DataSource.prototype.getConnectionSummariesAsync = function () {
        return this._dataSourceImpl.getConnectionSummariesAsync();
    };
    DataSource.prototype.getUnderlyingDataAsync = function (options) {
        return this._dataSourceImpl.getUnderlyingDataAsync(options);
    };
    return DataSource;
}());
exports.DataSource = DataSource;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FieldImpl_1 = __webpack_require__(66);
var ConnectionSummary_1 = __webpack_require__(139);
var Field_1 = __webpack_require__(67);
var TableSummary_1 = __webpack_require__(140);
var ServiceRegistry_1 = __webpack_require__(7);
var ErrorHelpers_1 = __webpack_require__(8);
var DataSourceImpl = /** @class */ (function () {
    function DataSourceImpl(_dataSourceInfo) {
        var _this = this;
        this._dataSourceInfo = _dataSourceInfo;
        this._fields = _dataSourceInfo.fields.map(function (fieldModel) {
            var fieldImpl = new FieldImpl_1.FieldImpl(fieldModel, _this);
            return new Field_1.Field(fieldImpl);
        });
    }
    Object.defineProperty(DataSourceImpl.prototype, "name", {
        get: function () {
            return this._dataSourceInfo.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataSourceImpl.prototype, "id", {
        get: function () {
            return this._dataSourceInfo.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataSourceImpl.prototype, "extractUpdateTime", {
        get: function () {
            return this._dataSourceInfo.extractUpdateTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataSourceImpl.prototype, "fields", {
        get: function () {
            return this._fields;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataSourceImpl.prototype, "isExtract", {
        get: function () {
            return this._dataSourceInfo.isExtract;
        },
        enumerable: true,
        configurable: true
    });
    DataSourceImpl.prototype.refreshAsync = function () {
        var dataSourceService = ServiceRegistry_1.ApiServiceRegistry.instance.getService("data-source-service" /* DataSourceService */);
        return dataSourceService.refreshAsync(this._dataSourceInfo.id);
    };
    DataSourceImpl.prototype.getConnectionSummariesAsync = function () {
        var dataSourceService = ServiceRegistry_1.ApiServiceRegistry.instance.getService("data-source-service" /* DataSourceService */);
        return dataSourceService.getConnectionSummariesAsync(this._dataSourceInfo.id).then(function (summaries) {
            return summaries.map(function (summary) { return new ConnectionSummary_1.ConnectionSummary(summary); });
        });
    };
    DataSourceImpl.prototype.getActiveTablesAsync = function () {
        var dataSourceService = ServiceRegistry_1.ApiServiceRegistry.instance.getService("data-source-service" /* DataSourceService */);
        return dataSourceService.getActiveTablesAsync(this._dataSourceInfo.id).then(function (tableInfos) {
            return tableInfos.map(function (tableInfo) { return new TableSummary_1.TableSummary(tableInfo); });
        });
    };
    DataSourceImpl.prototype.getUnderlyingDataAsync = function (options) {
        var getDataService = ServiceRegistry_1.ApiServiceRegistry.instance.getService("get-data-service" /* GetData */);
        options = options || {};
        return getDataService.getDataSourceDataAsync(this.id, !!options.ignoreAliases, options.maxRows || 0, // 0 and [] are defaults
        options.columnsToInclude || []);
    };
    DataSourceImpl.prototype.initializeWithPublicInterfaces = function (dataSource) {
        ErrorHelpers_1.ErrorHelpers.verifyInternalValue(dataSource, 'dataSource');
        this._fields = this._dataSourceInfo.fields.map(function (fieldModel) {
            var fieldImpl = new FieldImpl_1.FieldImpl(fieldModel, dataSource);
            return new Field_1.Field(fieldImpl);
        });
    };
    return DataSourceImpl;
}());
exports.DataSourceImpl = DataSourceImpl;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var InternalToExternalEnumMappings_1 = __webpack_require__(14);
var FieldImpl = /** @class */ (function () {
    function FieldImpl(_fieldInfo, _parentDataSource) {
        this._fieldInfo = _fieldInfo;
        this._parentDataSource = _parentDataSource;
    }
    Object.defineProperty(FieldImpl.prototype, "name", {
        get: function () {
            return this._fieldInfo.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FieldImpl.prototype, "id", {
        get: function () {
            return this._fieldInfo.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FieldImpl.prototype, "description", {
        get: function () {
            return this._fieldInfo.description;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FieldImpl.prototype, "aggregation", {
        get: function () {
            return InternalToExternalEnumMappings_1.InternalToExternalEnumMappings.fieldAggregationType.convert(this._fieldInfo.aggregation);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FieldImpl.prototype, "dataSource", {
        get: function () {
            return this._parentDataSource;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FieldImpl.prototype, "role", {
        get: function () {
            return InternalToExternalEnumMappings_1.InternalToExternalEnumMappings.fieldRoleType.convert(this._fieldInfo.role);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FieldImpl.prototype, "isHidden", {
        get: function () {
            return this._fieldInfo.isHidden;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FieldImpl.prototype, "isGenerated", {
        get: function () {
            return this._fieldInfo.isGenerated;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FieldImpl.prototype, "isCalculatedField", {
        get: function () {
            return this._fieldInfo.isCalculatedField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FieldImpl.prototype, "isCombinedField", {
        get: function () {
            return this._fieldInfo.isCombinedField;
        },
        enumerable: true,
        configurable: true
    });
    return FieldImpl;
}());
exports.FieldImpl = FieldImpl;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ErrorHelpers_1 = __webpack_require__(8);
var Field = /** @class */ (function () {
    function Field(_fieldImpl) {
        this._fieldImpl = _fieldImpl;
    }
    Object.defineProperty(Field.prototype, "name", {
        get: function () {
            return this._fieldImpl.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "id", {
        get: function () {
            return this._fieldImpl.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "description", {
        get: function () {
            return this._fieldImpl.description;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "aggregation", {
        get: function () {
            return this._fieldImpl.aggregation;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "dataSource", {
        get: function () {
            return this._fieldImpl.dataSource;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "role", {
        get: function () {
            return this._fieldImpl.role;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "isHidden", {
        get: function () {
            return this._fieldImpl.isHidden;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "isGenerated", {
        get: function () {
            return this._fieldImpl.isGenerated;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "isCalculatedField", {
        get: function () {
            return this._fieldImpl.isCalculatedField;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "columnType", {
        get: function () {
            throw ErrorHelpers_1.ErrorHelpers.apiNotImplemented('Field.columnType');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "isCombinedField", {
        get: function () {
            return this._fieldImpl.isCombinedField;
        },
        enumerable: true,
        configurable: true
    });
    return Field;
}());
exports.Field = Field;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var TableauSheetEvent_1 = __webpack_require__(69);
var TableauWorksheetEvent = /** @class */ (function (_super) {
    __extends(TableauWorksheetEvent, _super);
    function TableauWorksheetEvent(type, _worksheet) {
        var _this = _super.call(this, type, _worksheet) || this;
        _this._worksheet = _worksheet;
        return _this;
    }
    Object.defineProperty(TableauWorksheetEvent.prototype, "worksheet", {
        get: function () {
            return this._worksheet;
        },
        enumerable: true,
        configurable: true
    });
    return TableauWorksheetEvent;
}(TableauSheetEvent_1.TableauSheetEvent));
exports.TableauWorksheetEvent = TableauWorksheetEvent;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var TableauEvent_1 = __webpack_require__(62);
var TableauSheetEvent = /** @class */ (function (_super) {
    __extends(TableauSheetEvent, _super);
    function TableauSheetEvent(type, sheet) {
        var _this = _super.call(this, type) || this;
        _this._sheet = sheet;
        return _this;
    }
    Object.defineProperty(TableauSheetEvent.prototype, "sheet", {
        get: function () {
            return this._sheet;
        },
        enumerable: true,
        configurable: true
    });
    return TableauSheetEvent;
}(TableauEvent_1.TableauEvent));
exports.TableauSheetEvent = TableauSheetEvent;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Defines which type of getData call to make.
 */
var GetDataType;
(function (GetDataType) {
    GetDataType["Summary"] = "summary";
    GetDataType["Underlying"] = "underlying";
})(GetDataType = exports.GetDataType || (exports.GetDataType = {}));


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _a, _b, _c, _d;
var EnumConverter_1 = __webpack_require__(41);
var SharedApiExternalContract_1 = __webpack_require__(0);
var api_internal_contract_js_1 = __webpack_require__(1);
/* tslint:disable:typedef - Disable this to make declaring these classes a bit easier */
/**
 * Maps enums used by the external-api-contract to the enums used
 * in the internal-api-contract, which developers code against.
 */
var ExternalToInternalEnumMappings = /** @class */ (function () {
    function ExternalToInternalEnumMappings() {
    }
    ExternalToInternalEnumMappings.filterDomainType = new EnumConverter_1.EnumConverter((_a = {},
        _a[SharedApiExternalContract_1.FilterDomainType.Relevant] = api_internal_contract_js_1.FilterDomainType.Relevant,
        _a[SharedApiExternalContract_1.FilterDomainType.Database] = api_internal_contract_js_1.FilterDomainType.Database,
        _a));
    ExternalToInternalEnumMappings.nullOptions = new EnumConverter_1.EnumConverter((_b = {},
        _b[SharedApiExternalContract_1.FilterNullOption.AllValues] = api_internal_contract_js_1.FilterNullOption.AllValues,
        _b[SharedApiExternalContract_1.FilterNullOption.NonNullValues] = api_internal_contract_js_1.FilterNullOption.NonNullValues,
        _b[SharedApiExternalContract_1.FilterNullOption.NullValues] = api_internal_contract_js_1.FilterNullOption.NullValues,
        _b));
    ExternalToInternalEnumMappings.filterUpdateType = new EnumConverter_1.EnumConverter((_c = {},
        _c[SharedApiExternalContract_1.FilterUpdateType.Add] = api_internal_contract_js_1.FilterUpdateType.Add,
        _c[SharedApiExternalContract_1.FilterUpdateType.All] = api_internal_contract_js_1.FilterUpdateType.All,
        _c[SharedApiExternalContract_1.FilterUpdateType.Remove] = api_internal_contract_js_1.FilterUpdateType.Remove,
        _c[SharedApiExternalContract_1.FilterUpdateType.Replace] = api_internal_contract_js_1.FilterUpdateType.Replace,
        _c));
    ExternalToInternalEnumMappings.setVisibilityType = new EnumConverter_1.EnumConverter((_d = {},
        _d[SharedApiExternalContract_1.ZoneVisibilityType.Show] = true,
        _d[SharedApiExternalContract_1.ZoneVisibilityType.Hide] = false,
        _d));
    return ExternalToInternalEnumMappings;
}());
exports.ExternalToInternalEnumMappings = ExternalToInternalEnumMappings;
/* tslint:enable:typedef */


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * This is your main. This is where you re-export everything you want to be publicly available.
 *
 * The build enforces that the file has the same name as the global variable that is exported.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// The following polyfills are needed for IE11
__webpack_require__(73);
__webpack_require__(103);
__webpack_require__(55);
// Due to the way we configured webpack, we should be exporting things which will be under
// a global variable called "tableau". Export everything we want to be visible under tableau
// from this file.
var ExtensionsImpl_1 = __webpack_require__(113);
var Extensions_1 = __webpack_require__(169);
var ApiShared_1 = __webpack_require__(5);
var isAlpha = false; // typeof EXTENSION_VERSION_IS_ALPHA !== 'undefined' ? EXTENSION_VERSION_IS_ALPHA : false;
ApiShared_1.VersionNumber.SetVersionNumber( true ? "1.2.0-pre.10" : '0.0.0', isAlpha);
var extensionImpl = new ExtensionsImpl_1.ExtensionsImpl();
exports.extensions = new Extensions_1.Extensions(extensionImpl);
// Export Enums
// These show up under the tableau object. I.e. tableau.ExtensionContext.Server
var ExtensionsApiExternalContract_1 = __webpack_require__(15);
exports.ExtensionContext = ExtensionsApiExternalContract_1.ExtensionContext;
exports.ExtensionMode = ExtensionsApiExternalContract_1.ExtensionMode;
exports.AnalyticsObjectType = ExtensionsApiExternalContract_1.AnalyticsObjectType;
exports.ColumnType = ExtensionsApiExternalContract_1.ColumnType;
exports.DashboardObjectType = ExtensionsApiExternalContract_1.DashboardObjectType;
exports.DataType = ExtensionsApiExternalContract_1.DataType;
exports.DateRangeType = ExtensionsApiExternalContract_1.DateRangeType;
exports.EncodingType = ExtensionsApiExternalContract_1.EncodingType;
exports.ErrorCodes = ExtensionsApiExternalContract_1.ErrorCodes;
exports.FieldAggregationType = ExtensionsApiExternalContract_1.FieldAggregationType;
exports.FieldRoleType = ExtensionsApiExternalContract_1.FieldRoleType;
exports.FilterDomainType = ExtensionsApiExternalContract_1.FilterDomainType;
exports.FilterType = ExtensionsApiExternalContract_1.FilterType;
exports.FilterUpdateType = ExtensionsApiExternalContract_1.FilterUpdateType;
exports.FilterNullOption = ExtensionsApiExternalContract_1.FilterNullOption;
exports.MarkType = ExtensionsApiExternalContract_1.MarkType;
exports.ParameterValueType = ExtensionsApiExternalContract_1.ParameterValueType;
exports.PeriodType = ExtensionsApiExternalContract_1.PeriodType;
exports.QuickTableCalcType = ExtensionsApiExternalContract_1.QuickTableCalcType;
exports.SelectionUpdateType = ExtensionsApiExternalContract_1.SelectionUpdateType;
exports.SheetType = ExtensionsApiExternalContract_1.SheetType;
exports.SortDirection = ExtensionsApiExternalContract_1.SortDirection;
exports.TableauEventType = ExtensionsApiExternalContract_1.TableauEventType;
exports.TrendLineModelType = ExtensionsApiExternalContract_1.TrendLineModelType;
exports.ZoneVisibilityType = ExtensionsApiExternalContract_1.ZoneVisibilityType;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(74);
__webpack_require__(77);
__webpack_require__(86);
__webpack_require__(89);
__webpack_require__(101);
__webpack_require__(102);
module.exports = __webpack_require__(6).Promise;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(24);
var test = {};
test[__webpack_require__(2)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(17)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(18) && !__webpack_require__(27)(function () {
  return Object.defineProperty(__webpack_require__(28)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(10);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(78)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(47)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(29);
var defined = __webpack_require__(30);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(80);
var descriptor = __webpack_require__(46);
var setToStringTag = __webpack_require__(36);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(13)(IteratorPrototype, __webpack_require__(2)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(9);
var dPs = __webpack_require__(81);
var enumBugKeys = __webpack_require__(48);
var IE_PROTO = __webpack_require__(35)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(28)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(49).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(21);
var anObject = __webpack_require__(9);
var getKeys = __webpack_require__(31);

module.exports = __webpack_require__(18) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(22);
var toIObject = __webpack_require__(32);
var arrayIndexOf = __webpack_require__(83)(false);
var IE_PROTO = __webpack_require__(35)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(32);
var toLength = __webpack_require__(34);
var toAbsoluteIndex = __webpack_require__(84);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(29);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(22);
var toObject = __webpack_require__(37);
var IE_PROTO = __webpack_require__(35)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(87);
var getKeys = __webpack_require__(31);
var redefine = __webpack_require__(17);
var global = __webpack_require__(3);
var hide = __webpack_require__(13);
var Iterators = __webpack_require__(20);
var wks = __webpack_require__(2);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(50);
var step = __webpack_require__(88);
var Iterators = __webpack_require__(20);
var toIObject = __webpack_require__(32);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(47)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 88 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(25);
var global = __webpack_require__(3);
var ctx = __webpack_require__(19);
var classof = __webpack_require__(24);
var $export = __webpack_require__(11);
var isObject = __webpack_require__(10);
var aFunction = __webpack_require__(23);
var anInstance = __webpack_require__(90);
var forOf = __webpack_require__(91);
var speciesConstructor = __webpack_require__(51);
var task = __webpack_require__(52).set;
var microtask = __webpack_require__(96)();
var newPromiseCapabilityModule = __webpack_require__(38);
var perform = __webpack_require__(53);
var userAgent = __webpack_require__(97);
var promiseResolve = __webpack_require__(54);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(2)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(98)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(36)($Promise, PROMISE);
__webpack_require__(99)(PROMISE);
Wrapper = __webpack_require__(6)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(100)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 90 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(19);
var call = __webpack_require__(92);
var isArrayIter = __webpack_require__(93);
var anObject = __webpack_require__(9);
var toLength = __webpack_require__(34);
var getIterFn = __webpack_require__(94);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(9);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(20);
var ITERATOR = __webpack_require__(2)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(24);
var ITERATOR = __webpack_require__(2)('iterator');
var Iterators = __webpack_require__(20);
module.exports = __webpack_require__(6).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 95 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var macrotask = __webpack_require__(52).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(16)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(17);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(3);
var dP = __webpack_require__(21);
var DESCRIPTORS = __webpack_require__(18);
var SPECIES = __webpack_require__(2)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(2)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(11);
var core = __webpack_require__(6);
var global = __webpack_require__(3);
var speciesConstructor = __webpack_require__(51);
var promiseResolve = __webpack_require__(54);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(11);
var newPromiseCapability = __webpack_require__(38);
var perform = __webpack_require__(53);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(104);
module.exports = __webpack_require__(6).Array.find;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(11);
var $find = __webpack_require__(105)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(50)(KEY);


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(19);
var IObject = __webpack_require__(33);
var toObject = __webpack_require__(37);
var toLength = __webpack_require__(34);
var asc = __webpack_require__(106);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(107);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(10);
var isArray = __webpack_require__(108);
var SPECIES = __webpack_require__(2)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(16);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(11);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(110) });


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(31);
var gOPS = __webpack_require__(111);
var pIE = __webpack_require__(112);
var toObject = __webpack_require__(37);
var IObject = __webpack_require__(33);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(27)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 111 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 112 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ApiShared_1 = __webpack_require__(5);
var DashboardContent_1 = __webpack_require__(158);
var Environment_1 = __webpack_require__(159);
var ExtensionsApiExternalContract_1 = __webpack_require__(15);
var RegisterAllExtensionsServices_1 = __webpack_require__(160);
var Settings_1 = __webpack_require__(164);
var SettingsImpl_1 = __webpack_require__(165);
var ApiShared_2 = __webpack_require__(5);
var UI_1 = __webpack_require__(166);
var UIImpl_1 = __webpack_require__(167);
var VersionNumber_1 = __webpack_require__(57);
var VersionedExternalApiDispatcher_1 = __webpack_require__(168);
var api_internal_contract_js_1 = __webpack_require__(1);
var ExtensionsImpl = /** @class */ (function () {
    function ExtensionsImpl() {
    }
    ExtensionsImpl.prototype.initializeAsync = function (isExtensionDialog, contextMenuCallbacks) {
        var _this = this;
        if (!this._initializationPromise) {
            this._initializationPromise = new Promise(function (resolve, reject) {
                var initOptions = { isAlpha: VersionNumber_1.VersionNumber.Instance.isAlpha };
                // First thing we want to do is check to see if there is a desktop dispatcher already registered for us
                if (api_internal_contract_js_1.InternalApiDispatcherHolder.hasDesktopApiDispatcherPromise(initOptions)) {
                    // Running in desktop, use this promise
                    var desktopDispatcherPromise = api_internal_contract_js_1.InternalApiDispatcherHolder.getDesktopDispatcherPromise(initOptions);
                    desktopDispatcherPromise.then(function (dispatcherFactory) {
                        return _this.onDispatcherReceived(dispatcherFactory, isExtensionDialog, contextMenuCallbacks);
                    })
                        .then(function (openPayload) {
                        resolve(openPayload);
                    }).catch(function (error) {
                        reject(error);
                    });
                }
                else {
                    // We must be running in server, so we should try to kick of the server dispatcher bootstrapping
                    var onDispatcherReceivedCallback_1 = _this.onDispatcherReceived.bind(_this);
                    ApiShared_1.doCrossFrameBootstrap(window, api_internal_contract_js_1.INTERNAL_CONTRACT_VERSION, initOptions).then(function (factory) {
                        return onDispatcherReceivedCallback_1(factory, isExtensionDialog, contextMenuCallbacks);
                    }).then(function (openPayload) {
                        resolve(openPayload);
                    }).catch(function (error) {
                        reject(error);
                    });
                }
            });
        }
        return this._initializationPromise;
    };
    ExtensionsImpl.prototype.onDispatcherReceived = function (dispatcherFactory, isExtensionDialog, contextMenuFunctions) {
        var _this = this;
        var dispatcher = dispatcherFactory(api_internal_contract_js_1.INTERNAL_CONTRACT_VERSION);
        // Call to register all the services which will use the newly initialized dispatcher
        RegisterAllExtensionsServices_1.registerInitializationExtensionsServices(dispatcher);
        // Get the initialization service and initialize this extension
        var initializationService = ApiShared_1.ApiServiceRegistry.instance.getService("InitializationService" /* InitializationService */);
        var callbackMapKeys = (contextMenuFunctions) ? Object.keys(contextMenuFunctions) : [];
        return initializationService.initializeDashboardExtensionsAsync(isExtensionDialog, callbackMapKeys).then(function (result) {
            if (!result.extensionInstance.locator.dashboardPath) {
                throw new ApiShared_2.TableauError(ExtensionsApiExternalContract_1.ErrorCodes.InternalError, 'Unexpected error during initialization.');
            }
            // If we receive an invalid plaform version, this means that platform is runnning 1.4 or 2.1 and
            // doesn't pass the platform version to external. In this case we assume the platform version to be 1.9
            var platformVersion = result.extensionEnvironment.platformVersion
                ? result.extensionEnvironment.platformVersion
                : { major: 1, minor: 9, fix: 0 };
            // Wrap our existing dispatcher in a dispatcher that can downgrade/upgrade for an older platform.
            if (VersionedExternalApiDispatcher_1.VersionedExternalApiDispatcher.needsVersionConverter(platformVersion)) {
                dispatcher = new VersionedExternalApiDispatcher_1.VersionedExternalApiDispatcher(dispatcher, platformVersion);
            }
            // Registration of services must happen before initializing content and environment
            ApiShared_1.registerAllSharedServices(dispatcher);
            RegisterAllExtensionsServices_1.registerAllExtensionsServices(dispatcher);
            _this.dashboardContent = _this.initializeDashboardContent(result.extensionDashboardInfo, result.extensionInstance.locator.dashboardPath);
            _this.environment = new Environment_1.Environment(result.extensionEnvironment);
            _this.settings = _this.initializeSettings(result.extensionSettingsInfo);
            _this.ui = new UI_1.UI(new UIImpl_1.UIImpl());
            // After initialization has completed, setup listeners for the callback functions that
            // are meant to be triggered whenever a context menu item is clicked.
            _this.initializeContextMenuCallbacks(contextMenuFunctions);
            // In the normal initialization case, this will be an empty string.  When returning from initializeAsync to the
            // developer, we just ingore that string.  In the case of initializing from an extension dialog, this string
            // is an optional payload sent from the parent extension.
            return result.extensionDialogPayload;
        });
    };
    ExtensionsImpl.prototype.initializeDashboardContent = function (info, sheetPath) {
        var dashboardImpl = new ApiShared_1.DashboardImpl(info, sheetPath);
        var dashboard = new ApiShared_1.Dashboard(dashboardImpl);
        return new DashboardContent_1.DashboardContent(dashboard);
    };
    ExtensionsImpl.prototype.initializeSettings = function (settingsInfo) {
        var settingsImpl = new SettingsImpl_1.SettingsImpl(settingsInfo);
        return new Settings_1.Settings(settingsImpl);
    };
    ExtensionsImpl.prototype.initializeContextMenuCallbacks = function (contextMenuFunctions) {
        var notificationService = ApiShared_1.ApiServiceRegistry.instance.getService("notification-service" /* Notification */);
        // Unregister function not used since these notifications should be
        // observed for the full lifetime of the extension.
        notificationService.registerHandler(api_internal_contract_js_1.NotificationId.ContextMenuClick, function (model) {
            // Let through any context menu event, these are already filtered on api-core
            // based on the extension locator.
            return true;
        }, function (event) {
            // Execute the function associated with this context menu ID
            if (contextMenuFunctions) {
                if (!contextMenuFunctions[event.id]) {
                    throw new ApiShared_2.TableauError(ExtensionsApiExternalContract_1.ErrorCodes.InternalError, "Received unexpected context menu Id from event: " + event.id);
                }
                contextMenuFunctions[event.id]();
            }
        });
    };
    return ExtensionsImpl;
}());
exports.ExtensionsImpl = ExtensionsImpl;


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Sheet_1 = __webpack_require__(56);
var Dashboard = /** @class */ (function (_super) {
    __extends(Dashboard, _super);
    function Dashboard(_dashboardImpl) {
        var _this = _super.call(this, _dashboardImpl) || this;
        _this._dashboardImpl = _dashboardImpl;
        _dashboardImpl.initializeWithPublicInterfaces(_this);
        return _this;
    }
    Object.defineProperty(Dashboard.prototype, "worksheets", {
        get: function () {
            return this._dashboardImpl.worksheets;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dashboard.prototype, "objects", {
        get: function () {
            return this._dashboardImpl.objects;
        },
        enumerable: true,
        configurable: true
    });
    Dashboard.prototype.setZoneVisibilityAsync = function (zoneVisibilityMap) {
        return this._dashboardImpl.setZoneVisibilityAsync(zoneVisibilityMap);
    };
    return Dashboard;
}(Sheet_1.Sheet));
exports.Dashboard = Dashboard;


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// All enum values made available to Extensions developers.
// Enums should be kept in alphabetical order.
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The context in which the Extensions is currently running.
 */
var ExtensionContext;
(function (ExtensionContext) {
    ExtensionContext["Desktop"] = "desktop";
    ExtensionContext["Server"] = "server";
})(ExtensionContext = exports.ExtensionContext || (exports.ExtensionContext = {}));
/**
 * The mode in which the Extensions is currently running.
 */
var ExtensionMode;
(function (ExtensionMode) {
    ExtensionMode["Authoring"] = "authoring";
    ExtensionMode["Viewing"] = "viewing";
})(ExtensionMode = exports.ExtensionMode || (exports.ExtensionMode = {}));
var AnalyticsObjectType;
(function (AnalyticsObjectType) {
    AnalyticsObjectType["Cluster"] = "cluster";
    AnalyticsObjectType["Forecast"] = "forecast";
    AnalyticsObjectType["TrendLine"] = "trend-line";
})(AnalyticsObjectType = exports.AnalyticsObjectType || (exports.AnalyticsObjectType = {}));
var ColumnType;
(function (ColumnType) {
    ColumnType["Discrete"] = "discrete";
    ColumnType["Continuous"] = "continuous";
})(ColumnType = exports.ColumnType || (exports.ColumnType = {}));
/**
 * What the object represents in a dashboard.
 */
var DashboardObjectType;
(function (DashboardObjectType) {
    DashboardObjectType["Blank"] = "blank";
    DashboardObjectType["Worksheet"] = "worksheet";
    DashboardObjectType["QuickFilter"] = "quick-filter";
    DashboardObjectType["ParameterControl"] = "parameter-control";
    DashboardObjectType["PageFilter"] = "page-filter";
    DashboardObjectType["Legend"] = "legend";
    DashboardObjectType["Title"] = "title";
    DashboardObjectType["Text"] = "text";
    DashboardObjectType["Image"] = "image";
    DashboardObjectType["WebPage"] = "web-page";
    DashboardObjectType["Extension"] = "extension";
})(DashboardObjectType = exports.DashboardObjectType || (exports.DashboardObjectType = {}));
/**
 * The different types of data a value can have
 */
var DataType;
(function (DataType) {
    DataType["String"] = "string";
    DataType["Int"] = "int";
    DataType["Float"] = "float";
    DataType["Bool"] = "bool";
    DataType["Date"] = "date";
    DataType["DateTime"] = "date-time";
    DataType["Spatial"] = "spatial";
})(DataType = exports.DataType || (exports.DataType = {}));
/**
 * Valid date ranges for a relative date filter.
 */
var DateRangeType;
(function (DateRangeType) {
    DateRangeType["Last"] = "last";
    DateRangeType["LastN"] = "last-n";
    DateRangeType["Next"] = "next";
    DateRangeType["NextN"] = "next-n";
    DateRangeType["Current"] = "current";
    DateRangeType["ToDate"] = "to-date";
})(DateRangeType = exports.DateRangeType || (exports.DateRangeType = {}));
var EncodingType;
(function (EncodingType) {
    EncodingType["Column"] = "column";
    EncodingType["Row"] = "row";
    EncodingType["Page"] = "page";
    EncodingType["Filter"] = "filter";
    EncodingType["MarksType"] = "marks-type";
    EncodingType["MeasureValues"] = "measure-values";
    EncodingType["Color"] = "color";
    EncodingType["Size"] = "size";
    EncodingType["Label"] = "label";
    EncodingType["Detail"] = "detail";
    EncodingType["Tooltip"] = "tooltip";
    EncodingType["Shape"] = "shape";
    EncodingType["Path"] = "path";
    EncodingType["Angle"] = "angle";
})(EncodingType = exports.EncodingType || (exports.EncodingType = {}));
/**
 * All error codes used by the Extensions API.
 */
var ErrorCodes;
(function (ErrorCodes) {
    /**
     * Thrown when caller attempts to execute command before initialization has completed.
     */
    ErrorCodes["APINotInitialized"] = "api-not-initialized";
    /**
     * Thrown when caller attempts to execute command while extension is not visible.
     */
    ErrorCodes["VisibilityError"] = "visibility-error";
    /**
     * Only one dialog can be opened at time with the UI namespace functionality.
     */
    ErrorCodes["DialogAlreadyOpen"] = "dialog-already-open";
    /**
     * The open dialog was closed by the user.
     */
    ErrorCodes["DialogClosedByUser"] = "dialog-closed-by-user";
    /**
     * An error occurred within the Tableau Extensions API. Contact Tableau Support.
     */
    ErrorCodes["InternalError"] = "internal-error";
    /**
     * A dialog must start on the same domain as the parent extenion.
     */
    ErrorCodes["InvalidDomainDialog"] = "invalid-dialog-domain";
    /**
     * A parameter is not the correct data type or format. The name of the parameter is specified in the Error.message field.
     */
    ErrorCodes["InvalidParameter"] = "invalid-parameter";
    /**
     * Can occur if the extension interacts with a filter that has been removed from the worksheet.
     */
    ErrorCodes["MissingFilter"] = "missing-filter";
    /**
     * Can occur if the extension interacts with a parameter that has been removed from the worksheet.
     */
    ErrorCodes["MissingParameter"] = "missing-parameter";
    /**
     * Internal Server Error
     */
    ErrorCodes["ServerError"] = "server-error";
    /**
     * Developer cannot save settings while another save is still in progress.
     */
    ErrorCodes["SettingSaveInProgress"] = "setting-save-in-progress";
    /**
     * An unknown event name was specified in the call to Viz.addEventListeneror Viz.removeEventListener.
     */
    ErrorCodes["UnsupportedEventName"] = "unsupported-event-name";
    /**
     * A method was used for a type of datasource that doesn't support that method (see getActiveTablesAsync for an example)
     */
    ErrorCodes["UnsupportedMethodForDataSourceType"] = "unsupported-method-for-data-source-type";
})(ErrorCodes = exports.ErrorCodes || (exports.ErrorCodes = {}));
/**
 *  Type of aggregation on a field.
 */
var FieldAggregationType;
(function (FieldAggregationType) {
    FieldAggregationType["Sum"] = "sum";
    FieldAggregationType["Avg"] = "avg";
    FieldAggregationType["Min"] = "min";
    FieldAggregationType["Max"] = "max";
    FieldAggregationType["Stdev"] = "stdev";
    FieldAggregationType["Stdevp"] = "stdevp";
    FieldAggregationType["Var"] = "var";
    FieldAggregationType["Varp"] = "varp";
    FieldAggregationType["Count"] = "count";
    FieldAggregationType["Countd"] = "countd";
    FieldAggregationType["Median"] = "median";
    FieldAggregationType["Attr"] = "attr";
    FieldAggregationType["None"] = "none";
    FieldAggregationType["Year"] = "year";
    FieldAggregationType["Qtr"] = "qtr";
    FieldAggregationType["Month"] = "month";
    FieldAggregationType["Day"] = "day";
    FieldAggregationType["Hour"] = "hour";
    FieldAggregationType["Minute"] = "minute";
    FieldAggregationType["Second"] = "second";
    FieldAggregationType["Week"] = "week";
    FieldAggregationType["Weekday"] = "weekday";
    FieldAggregationType["MonthYear"] = "month-year";
    FieldAggregationType["Mdy"] = "mdy";
    FieldAggregationType["End"] = "end";
    FieldAggregationType["TruncYear"] = "trunc-year";
    FieldAggregationType["TruncQtr"] = "trunc-qtr";
    FieldAggregationType["TruncMonth"] = "trunc-month";
    FieldAggregationType["TruncWeek"] = "trunc-week";
    FieldAggregationType["TruncDay"] = "trunc-day";
    FieldAggregationType["TruncHour"] = "trunc-hour";
    FieldAggregationType["TruncMinute"] = "trunc-minute";
    FieldAggregationType["TruncSecond"] = "trunc-second";
    FieldAggregationType["Quart1"] = "quart1";
    FieldAggregationType["Quart3"] = "quart3";
    FieldAggregationType["Skewness"] = "skewness";
    FieldAggregationType["Kurtosis"] = "kurtosis";
    FieldAggregationType["InOut"] = "in-out";
    FieldAggregationType["User"] = "user";
})(FieldAggregationType = exports.FieldAggregationType || (exports.FieldAggregationType = {}));
/**
 * Role of a field.
 */
var FieldRoleType;
(function (FieldRoleType) {
    FieldRoleType["Dimension"] = "dimension";
    FieldRoleType["Measure"] = "measure";
    FieldRoleType["Unknown"] = "unknown";
})(FieldRoleType = exports.FieldRoleType || (exports.FieldRoleType = {}));
/**
 * An enumeration of the valid types of filters that can be applied.
 */
var FilterType;
(function (FilterType) {
    FilterType["Categorical"] = "categorical";
    FilterType["Range"] = "range";
    FilterType["Hierarchical"] = "hierarchical";
    FilterType["RelativeDate"] = "relative-date";
})(FilterType = exports.FilterType || (exports.FilterType = {}));
/**
 * The different update types for applying filter
 */
var FilterUpdateType;
(function (FilterUpdateType) {
    FilterUpdateType["Add"] = "add";
    FilterUpdateType["All"] = "all";
    FilterUpdateType["Replace"] = "replace";
    FilterUpdateType["Remove"] = "remove";
})(FilterUpdateType = exports.FilterUpdateType || (exports.FilterUpdateType = {}));
/**
 * The domain type for a filter
 */
var FilterDomainType;
(function (FilterDomainType) {
    /**
     * The domain values that are relevant to the specified filter
     * i.e. the domain is restricted by a previous filter
     */
    FilterDomainType["Relevant"] = "relevant";
    /**
     * list of all possible domain values from database
     */
    FilterDomainType["Database"] = "database";
})(FilterDomainType = exports.FilterDomainType || (exports.FilterDomainType = {}));
/**
 * The option for specifying which values to include for filtering
 * Indicates what to do with null values for a given filter or mark selection call.
 */
var FilterNullOption;
(function (FilterNullOption) {
    FilterNullOption["NullValues"] = "null-values";
    FilterNullOption["NonNullValues"] = "non-null-values";
    FilterNullOption["AllValues"] = "all-values";
})(FilterNullOption = exports.FilterNullOption || (exports.FilterNullOption = {}));
/**
 * Type of mark for a given marks card in a viz.
 */
var MarkType;
(function (MarkType) {
    MarkType["Bar"] = "bar";
    MarkType["Line"] = "line";
    MarkType["Area"] = "area";
    MarkType["Square"] = "square";
    MarkType["Circle"] = "circle";
    MarkType["Shape"] = "shape";
    MarkType["Text"] = "text";
    MarkType["Map"] = "map";
    MarkType["Pie"] = "pie";
    MarkType["GanttBar"] = "gantt-bar";
    MarkType["Polygon"] = "polygon";
})(MarkType = exports.MarkType || (exports.MarkType = {}));
/**
 * An enumeration describing the different types of allowable values.
 * This is used for restricting the domain of a parameter
 */
var ParameterValueType;
(function (ParameterValueType) {
    ParameterValueType["All"] = "all";
    ParameterValueType["List"] = "list";
    ParameterValueType["Range"] = "range";
})(ParameterValueType = exports.ParameterValueType || (exports.ParameterValueType = {}));
/**
 * Date period used in filters and in parameters.
 */
var PeriodType;
(function (PeriodType) {
    PeriodType["Years"] = "years";
    PeriodType["Quarters"] = "quarters";
    PeriodType["Months"] = "months";
    PeriodType["Weeks"] = "weeks";
    PeriodType["Days"] = "days";
    PeriodType["Hours"] = "hours";
    PeriodType["Minutes"] = "minutes";
    PeriodType["Seconds"] = "seconds";
})(PeriodType = exports.PeriodType || (exports.PeriodType = {}));
var QuickTableCalcType;
(function (QuickTableCalcType) {
    QuickTableCalcType["RunningTotal"] = "running-total";
    QuickTableCalcType["Difference"] = "difference";
    QuickTableCalcType["PercentDifference"] = "percent-difference";
    QuickTableCalcType["PercentOfTotal"] = "percent-of-total";
    QuickTableCalcType["Rank"] = "rank";
    QuickTableCalcType["Percentile"] = "percentile";
    QuickTableCalcType["MovingAverage"] = "moving-average";
    QuickTableCalcType["YTDTotal"] = "ytd-total";
    QuickTableCalcType["CompoundGrowthRate"] = "compound-growth-rate";
    QuickTableCalcType["YearOverYearGrowth"] = "year-over-year-growth";
    QuickTableCalcType["YTDGrowth"] = "ytd-growth";
    QuickTableCalcType["Undefined"] = "undefined";
})(QuickTableCalcType = exports.QuickTableCalcType || (exports.QuickTableCalcType = {}));
/**
 * Enum for specifying the selection type for select marks api.
 */
var SelectionUpdateType;
(function (SelectionUpdateType) {
    SelectionUpdateType["Replace"] = "select-replace";
    SelectionUpdateType["Add"] = "select-add";
    SelectionUpdateType["Remove"] = "select-remove";
})(SelectionUpdateType = exports.SelectionUpdateType || (exports.SelectionUpdateType = {}));
/**
 * The type of sheet a Sheet object represents
 */
var SheetType;
(function (SheetType) {
    SheetType["Dashboard"] = "dashboard";
    SheetType["Story"] = "story";
    SheetType["Worksheet"] = "worksheet";
})(SheetType = exports.SheetType || (exports.SheetType = {}));
var SortDirection;
(function (SortDirection) {
    SortDirection["Increasing"] = "increasing";
    SortDirection["Decreasing"] = "decreasing";
})(SortDirection = exports.SortDirection || (exports.SortDirection = {}));
/**
 * Represents a certain type of event which can be listened for
 */
var TableauEventType;
(function (TableauEventType) {
    /** Raised when any filter has changed state.*/
    TableauEventType["FilterChanged"] = "filter-changed";
    /** The selected marks on a visualization has changed */
    TableauEventType["MarkSelectionChanged"] = "mark-selection-changed";
    /** A parameter has had its value modified */
    TableauEventType["ParameterChanged"] = "parameter-changed";
    /** Settings have been changed for this extension. */
    TableauEventType["SettingsChanged"] = "settings-changed";
})(TableauEventType = exports.TableauEventType || (exports.TableauEventType = {}));
var TrendLineModelType;
(function (TrendLineModelType) {
    TrendLineModelType["Linear"] = "linear";
    TrendLineModelType["Logarithmic"] = "logarithmic";
    TrendLineModelType["Exponential"] = "exponential";
    TrendLineModelType["Polynomial"] = "polynomial";
})(TrendLineModelType = exports.TrendLineModelType || (exports.TrendLineModelType = {}));
/**
 * Enum that represents the visibility state of a zone
 * @since 1.1.0
 */
var ZoneVisibilityType;
(function (ZoneVisibilityType) {
    /** Used for turning on the visibity of a zone in the dashboard.*/
    ZoneVisibilityType["Show"] = "show";
    /** Used for turning off the visibity of a zone in the dashboard.*/
    ZoneVisibilityType["Hide"] = "hide";
})(ZoneVisibilityType = exports.ZoneVisibilityType || (exports.ZoneVisibilityType = {}));


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(117);
module.exports = __webpack_require__(6).Number.isInteger;


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(11);

$export($export.S, 'Number', { isInteger: __webpack_require__(118) });


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(10);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ExtensionContext;
(function (ExtensionContext) {
    ExtensionContext["Desktop"] = "desktop";
    ExtensionContext["Server"] = "server";
    ExtensionContext["Unknown"] = "unknown";
})(ExtensionContext = exports.ExtensionContext || (exports.ExtensionContext = {}));
var ExtensionMode;
(function (ExtensionMode) {
    ExtensionMode["Authoring"] = "authoring";
    ExtensionMode["Viewing"] = "viewing";
    ExtensionMode["Unknown"] = "unknown";
})(ExtensionMode = exports.ExtensionMode || (exports.ExtensionMode = {}));
var ColumnType;
(function (ColumnType) {
    ColumnType["Discrete"] = "discrete";
    ColumnType["Continuous"] = "continuous";
})(ColumnType = exports.ColumnType || (exports.ColumnType = {}));
var DashboardObjectType;
(function (DashboardObjectType) {
    DashboardObjectType["Blank"] = "blank";
    DashboardObjectType["Worksheet"] = "worksheet";
    DashboardObjectType["QuickFilter"] = "quick-filter";
    DashboardObjectType["ParameterControl"] = "parameter-control";
    DashboardObjectType["PageFilter"] = "page-filter";
    DashboardObjectType["Legend"] = "legend";
    DashboardObjectType["Title"] = "title";
    DashboardObjectType["Text"] = "text";
    DashboardObjectType["Image"] = "image";
    DashboardObjectType["WebPage"] = "web-page";
    DashboardObjectType["Extension"] = "extension";
})(DashboardObjectType = exports.DashboardObjectType || (exports.DashboardObjectType = {}));
var DataType;
(function (DataType) {
    DataType["String"] = "string";
    DataType["Int"] = "int";
    DataType["Float"] = "float";
    DataType["Bool"] = "bool";
    DataType["Date"] = "date";
    DataType["DateTime"] = "date-time";
    DataType["Spatial"] = "spatial";
})(DataType = exports.DataType || (exports.DataType = {}));
var EncodedDataType;
(function (EncodedDataType) {
    EncodedDataType["Number"] = "number";
    EncodedDataType["String"] = "string";
    EncodedDataType["Date"] = "date";
    EncodedDataType["Boolean"] = "boolean";
})(EncodedDataType = exports.EncodedDataType || (exports.EncodedDataType = {}));
var ErrorCodes;
(function (ErrorCodes) {
    ErrorCodes["INITIALIZATION_ERROR"] = "initialization-error";
    ErrorCodes["INTERNAL_ERROR"] = "internal-error";
    ErrorCodes["MISSING_ENUM_MAPPING"] = "missing-enum-mapping";
    ErrorCodes["MISSING_PARAMETER"] = "missing-parameter";
    ErrorCodes["PERMISSION_DENIED"] = "permission-denied";
    ErrorCodes["PRES_MODEL_PARSING_ERROR"] = "pres-model-parsing-error";
    ErrorCodes["VERSION_NOT_CONFIGURED"] = "version-not-configured";
    ErrorCodes["VISIBILITY_ERROR"] = "visibility-error";
    ErrorCodes["UNKNOWN_VERB_ID"] = "unknown-verb-id";
})(ErrorCodes = exports.ErrorCodes || (exports.ErrorCodes = {}));
var FieldAggregationType;
(function (FieldAggregationType) {
    FieldAggregationType["Sum"] = "sum";
    FieldAggregationType["Avg"] = "avg";
    FieldAggregationType["Min"] = "min";
    FieldAggregationType["Max"] = "max";
    FieldAggregationType["Stdev"] = "stdev";
    FieldAggregationType["Stdevp"] = "stdevp";
    FieldAggregationType["Var"] = "var";
    FieldAggregationType["Varp"] = "varp";
    FieldAggregationType["Count"] = "count";
    FieldAggregationType["Countd"] = "countd";
    FieldAggregationType["Median"] = "median";
    FieldAggregationType["Attr"] = "attr";
    FieldAggregationType["None"] = "none";
    FieldAggregationType["Year"] = "year";
    FieldAggregationType["Qtr"] = "qtr";
    FieldAggregationType["Month"] = "month";
    FieldAggregationType["Day"] = "day";
    FieldAggregationType["Hour"] = "hour";
    FieldAggregationType["Minute"] = "minute";
    FieldAggregationType["Second"] = "second";
    FieldAggregationType["Week"] = "week";
    FieldAggregationType["Weekday"] = "weekday";
    FieldAggregationType["MonthYear"] = "month-year";
    FieldAggregationType["Mdy"] = "mdy";
    FieldAggregationType["End"] = "end";
    FieldAggregationType["TruncYear"] = "trunc-year";
    FieldAggregationType["TruncQtr"] = "trunc-qtr";
    FieldAggregationType["TruncMonth"] = "trunc-month";
    FieldAggregationType["TruncWeek"] = "trunc-week";
    FieldAggregationType["TruncDay"] = "trunc-day";
    FieldAggregationType["TruncHour"] = "trunc-hour";
    FieldAggregationType["TruncMinute"] = "trunc-minute";
    FieldAggregationType["TruncSecond"] = "trunc-second";
    FieldAggregationType["Quart1"] = "quart1";
    FieldAggregationType["Quart3"] = "quart3";
    FieldAggregationType["Skewness"] = "skewness";
    FieldAggregationType["Kurtosis"] = "kurtosis";
    FieldAggregationType["InOut"] = "in-out";
    FieldAggregationType["User"] = "user";
})(FieldAggregationType = exports.FieldAggregationType || (exports.FieldAggregationType = {}));
var FieldRoleType;
(function (FieldRoleType) {
    FieldRoleType["Dimension"] = "dimension";
    FieldRoleType["Measure"] = "measure";
    FieldRoleType["Unknown"] = "unknown";
})(FieldRoleType = exports.FieldRoleType || (exports.FieldRoleType = {}));
/**
 *  The different update types for applying filter.
 */
var FilterUpdateType;
(function (FilterUpdateType) {
    FilterUpdateType["Add"] = "add";
    FilterUpdateType["All"] = "all";
    FilterUpdateType["Replace"] = "replace";
    FilterUpdateType["Remove"] = "remove";
})(FilterUpdateType = exports.FilterUpdateType || (exports.FilterUpdateType = {}));
var SheetType;
(function (SheetType) {
    SheetType["Dashboard"] = "dashboard";
    SheetType["Story"] = "story";
    SheetType["Worksheet"] = "worksheet";
})(SheetType = exports.SheetType || (exports.SheetType = {}));
var DomainRestrictionType;
(function (DomainRestrictionType) {
    DomainRestrictionType["All"] = "all";
    DomainRestrictionType["List"] = "list";
    DomainRestrictionType["Range"] = "range";
})(DomainRestrictionType = exports.DomainRestrictionType || (exports.DomainRestrictionType = {}));
var DateStepPeriod;
(function (DateStepPeriod) {
    DateStepPeriod["Years"] = "years";
    DateStepPeriod["Quarters"] = "quarters";
    DateStepPeriod["Months"] = "months";
    DateStepPeriod["Weeks"] = "weeks";
    DateStepPeriod["Days"] = "days";
    DateStepPeriod["Hours"] = "hours";
    DateStepPeriod["Minutes"] = "minutes";
    DateStepPeriod["Seconds"] = "seconds";
})(DateStepPeriod = exports.DateStepPeriod || (exports.DateStepPeriod = {}));
/**
 * The option for specifying which values to include for filtering.
 */
var FilterNullOption;
(function (FilterNullOption) {
    FilterNullOption["NullValues"] = "nullvalues";
    FilterNullOption["NonNullValues"] = "nonnullvalues";
    FilterNullOption["AllValues"] = "allvalues";
})(FilterNullOption = exports.FilterNullOption || (exports.FilterNullOption = {}));
/**
 * The type of filter domain
 */
var FilterDomainType;
(function (FilterDomainType) {
    FilterDomainType["Relevant"] = "relevant";
    FilterDomainType["Database"] = "database";
})(FilterDomainType = exports.FilterDomainType || (exports.FilterDomainType = {}));
/**
 * Internal enum for specifying the selection type for select marks api.
 */
var SelectionUpdateType;
(function (SelectionUpdateType) {
    SelectionUpdateType["Replace"] = "select-replace";
    SelectionUpdateType["Add"] = "select-add";
    SelectionUpdateType["Remove"] = "select-remove";
})(SelectionUpdateType = exports.SelectionUpdateType || (exports.SelectionUpdateType = {}));
/**
 * Internal enum for specifying the included values type for range selection.
 */
var QuantitativeIncludedValues;
(function (QuantitativeIncludedValues) {
    QuantitativeIncludedValues["IncludeNull"] = "include-null";
    QuantitativeIncludedValues["IncludeNonNull"] = "include-non-null";
    QuantitativeIncludedValues["IncludeAll"] = "include-all";
})(QuantitativeIncludedValues = exports.QuantitativeIncludedValues || (exports.QuantitativeIncludedValues = {}));
/**
 * Type of mark for a given marks card in a viz.
 */
var MarkType;
(function (MarkType) {
    MarkType["Bar"] = "bar";
    MarkType["Line"] = "line";
    MarkType["Area"] = "area";
    MarkType["Square"] = "square";
    MarkType["Circle"] = "circle";
    MarkType["Shape"] = "shape";
    MarkType["Text"] = "text";
    MarkType["Map"] = "map";
    MarkType["Pie"] = "pie";
    MarkType["GanttBar"] = "gantt-bar";
    MarkType["Polygon"] = "polygon";
})(MarkType = exports.MarkType || (exports.MarkType = {}));
/**
 * Internal enum for specifying the type of filter
 */
var FilterType;
(function (FilterType) {
    FilterType["Categorical"] = "categorical";
    FilterType["Range"] = "range";
    FilterType["RelativeDate"] = "relativeDate";
    FilterType["Hierarchical"] = "hierarchical";
})(FilterType = exports.FilterType || (exports.FilterType = {}));
/**
 * Internal enum for specifying the DateRangeType of a relative date filter
 */
var DateRangeType;
(function (DateRangeType) {
    /**
     * Refers to the last day, week, month, etc. of the date period.
     */
    DateRangeType["Last"] = "last";
    /**
     * Refers to the last N days, weeks, months, etc. of the date period.
     */
    DateRangeType["LastN"] = "lastN";
    /**
     * Refers to the next day, week, month, etc. of the date period.
     */
    DateRangeType["Next"] = "next";
    /**
     * Refers to the next N days, weeks, months, etc. of the date period.
     */
    DateRangeType["NextN"] = "nextN";
    /**
     * Refers to the current day, week, month, etc. of the date period.
     */
    DateRangeType["Current"] = "current";
    /**
     * Refers to everything up to and including the current day, week, month, etc. of the date period.
     */
    DateRangeType["ToDate"] = "toDate";
})(DateRangeType = exports.DateRangeType || (exports.DateRangeType = {}));
/**
 * Used to determine if the launching of an extension dialog succeeded or failed.
 */
var ExtensionDialogResult;
(function (ExtensionDialogResult) {
    ExtensionDialogResult["DialogAlreadyOpen"] = "dialog-already-open";
    ExtensionDialogResult["InvalidDomain"] = "invalid-domain";
    ExtensionDialogResult["Success"] = "success";
})(ExtensionDialogResult = exports.ExtensionDialogResult || (exports.ExtensionDialogResult = {}));


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Verbs_1 = __webpack_require__(58);
var JsApiInternalContract_1 = __webpack_require__(1);
var InternalApiDispatcherHolder;
(function (InternalApiDispatcherHolder) {
    function getDesktopDispatcherPromise(options) {
        if ((!options || typeof options.isAlpha === 'undefined') && !window.__warningIssued) {
            // tslint:disable-next-line:no-console
            console.warn('This is an alpha version of the Extensions API. Please upgrade to an official release.');
            window.__warningIssued = true;
        }
        else if (options && options.isAlpha && window.__platformIsOfficialRelease) {
            window.__tableauDesktopDispatcher.then(function (dispatcherFactory) {
                var dispatcher = dispatcherFactory(JsApiInternalContract_1.INTERNAL_CONTRACT_VERSION);
                dispatcher.execute(Verbs_1.VerbId.BlockExtension, {});
                return;
            });
        }
        return window.__tableauDesktopDispatcher;
    }
    InternalApiDispatcherHolder.getDesktopDispatcherPromise = getDesktopDispatcherPromise;
    // Because we use the absence of options  to identify versions <= 1.0.0 we must pass them here as well
    function hasDesktopApiDispatcherPromise(options) {
        return !!InternalApiDispatcherHolder.getDesktopDispatcherPromise(options);
    }
    InternalApiDispatcherHolder.hasDesktopApiDispatcherPromise = hasDesktopApiDispatcherPromise;
    function setDesktopDispatcherPromise(dispatcher, options) {
        window.__tableauDesktopDispatcher = dispatcher;
        if (options) {
            window.__platformIsOfficialRelease = options.platformIsOfficialRelease;
        }
    }
    InternalApiDispatcherHolder.setDesktopDispatcherPromise = setDesktopDispatcherPromise;
})(InternalApiDispatcherHolder = exports.InternalApiDispatcherHolder || (exports.InternalApiDispatcherHolder = {}));


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NotificationId;
(function (NotificationId) {
    NotificationId["SelectedMarksChanged"] = "selected-marks-changed";
    NotificationId["ParameterChanged"] = "parameter-changed";
    NotificationId["FilterChanged"] = "filter-changed";
    NotificationId["ExtensionDialogUpdate"] = "extension-dialog-update";
    NotificationId["SettingsChanged"] = "settings-changed";
    NotificationId["ContextMenuClick"] = "context-menu-click";
    NotificationId["TestConversionNotification"] = "test-conversion-notification";
})(NotificationId = exports.NotificationId || (exports.NotificationId = {}));


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ParameterId;
(function (ParameterId) {
    ParameterId["ExtensionLocator"] = "extension-locator";
    ParameterId["ExtensionBootstrapInfo"] = "extension-bootstrap-info";
    ParameterId["ExtensionSettingsInfo"] = "extension-settings-info";
    ParameterId["VisualId"] = "visual-id";
    ParameterId["SheetPath"] = "sheet-path";
    ParameterId["IgnoreAliases"] = "ignore-aliases";
    ParameterId["IgnoreSelection"] = "ignore-selection";
    ParameterId["IncludeAllColumns"] = "include-all-columns";
    ParameterId["MaxRows"] = "max-rows";
    ParameterId["UnderlyingDataTable"] = "underlying-data-table";
    ParameterId["UnderlyingSummaryDataTable"] = "underlying-summary-data-table";
    ParameterId["DataSourceDataTable"] = "data-source-data-table";
    ParameterId["SettingsValues"] = "settings-values";
    ParameterId["SelectedData"] = "selected-data";
    ParameterId["HighlightedData"] = "highlighted-data";
    // Filter Params
    ParameterId["FieldName"] = "field-name";
    ParameterId["FilterValues"] = "filter-values";
    ParameterId["FilterUpdateType"] = "filter-update-type";
    ParameterId["IsExcludeMode"] = "is-exclude";
    ParameterId["FilterRangeMin"] = "filter-range-min";
    ParameterId["FilterRangeMax"] = "filter-range-max";
    ParameterId["FilterRangeNullOption"] = "filter-range-null-option";
    ParameterId["WorksheetFilters"] = "worksheet-filters";
    ParameterId["FieldId"] = "field-id";
    ParameterId["DomainType"] = "domain-type";
    ParameterId["CategoricalDomain"] = "categorical-domain";
    ParameterId["QuantitativeDomain"] = "quantitative-dmain";
    ParameterId["Field"] = "field";
    ParameterId["WorksheetName"] = "worksheet-name";
    ParameterId["DashboardName"] = "dashboard";
    ParameterId["ParameterInfo"] = "parameter-info";
    ParameterId["ParameterInfos"] = "parameter-infos";
    ParameterId["ParameterCaption"] = "paremeter-caption";
    ParameterId["ParameterFieldName"] = "parameter-field-name";
    ParameterId["ParameterValue"] = "parameter-value";
    ParameterId["Selection"] = "selection";
    ParameterId["SelectionUpdateType"] = "selectionUpdateType";
    ParameterId["HierValSelectionModels"] = "hierarchicalValueSelectionModels";
    ParameterId["QuantRangeSelectionModels"] = "quantativeRangeSelectionModels";
    ParameterId["DimValSelectionModels"] = "dimensionValueSelectionModels";
    ParameterId["ActiveTablesInfo"] = "active-tables-info";
    ParameterId["DataSource"] = "data-source";
    ParameterId["DataSourceId"] = "data-source-id";
    ParameterId["DeltaTimeMs"] = "delta-time-ms";
    ParameterId["ShouldRefreshDS"] = "should-refresh-ds";
    ParameterId["DataSchema"] = "data-schema";
    ParameterId["DataSourceName"] = "data-source-name";
    ParameterId["ColumnsToInclude"] = "columns-to-include";
    ParameterId["JoinDescription"] = "join-description";
    ParameterId["ConnectionDescriptionSummaries"] = "connection-description-summaries";
    ParameterId["ExtensionDialogUrl"] = "extension-dialog-url";
    ParameterId["ExtensionDialogPayload"] = "extension-dialog-payload";
    ParameterId["IsExtensionDialog"] = "is-extension-dialog";
    ParameterId["ExtensionDialogH"] = "extension-dialog-height";
    ParameterId["ExtensionDialogW"] = "extension-dialog-width";
    ParameterId["ExtensionDialogResult"] = "extension-dialog-result";
    ParameterId["ExtensionContextMenuIds"] = "extension-context-menu-ids";
    ParameterId["TestConversionParameter"] = "test-conversion-parameter";
    ParameterId["Dashboard"] = "dashboard";
    ParameterId["ZoneIdsVisibilityMap"] = "zone-ids-visibility-map";
})(ParameterId = exports.ParameterId || (exports.ParameterId = {}));


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-any
/**
 * The version converter is designed to allow the platform and external modules
 * to seemlessly communicate over two different versions of the internal API. The only
 * mode it supports is external's version <= platform's version. When executing
 * commands, it is used to upgrade the external representation to what platform knows on the way in
 * and downgrade the representations on the way out. Similarly for notifications, it can
 * downgrade those on the way from platform to external.
 */
var StackingVersionConverter = /** @class */ (function () {
    /**
     * Creates a new instance of the StackingVersionConverter
     *
     * @param _externalMajorVersion The major version of the internal contract api-external-js is using
     * @param _platformMajorVersion The major version of the internal contract the api-platform-js is using
     * @param _upgradeExecuteTranslations Ordered list of the translations to perform when upgrading cmd parameters
     * @param _downgradeExecuteTranslations Ordered list of downgrade translations to perform after a cmd
     * @param _downgradeNotificationTranslations Ordered list of downgrade translations to perform on a notification
     */
    function StackingVersionConverter(_externalMajorVersion, _platformMajorVersion, _upgradeExecuteTranslations, _downgradeExecuteTranslations, _downgradeNotificationTranslations) {
        this._externalMajorVersion = _externalMajorVersion;
        this._platformMajorVersion = _platformMajorVersion;
        this._upgradeExecuteTranslations = _upgradeExecuteTranslations;
        this._downgradeExecuteTranslations = _downgradeExecuteTranslations;
        this._downgradeNotificationTranslations = _downgradeNotificationTranslations;
        if (this._externalMajorVersion > this._platformMajorVersion) {
            throw new Error("Cannot convert between external version " + this._externalMajorVersion + " and " + this._platformMajorVersion);
        }
    }
    /**
      * Creates a new instance of the StackingVersionConverter
      *
      * @param _externalVersion The version of the internal contract api-external-js is using
      * @param _platformVersion The version of the internal contract the api-platform-js is using
      * @param _upgradeExecuteTranslations Ordered list of the translations to perform when upgrading cmd parameters
      * @param _downgradeExecuteTranslations Ordered list of downgrade translations to perform after a cmd
      * @param _downgradeNotificationTranslations Ordered list of downgrade translations to perform on a notification
      */
    StackingVersionConverter.fromData = function (externalVersion, platformVersion, upgradeExecuteTranslations, downgradeExecuteTranslations, downgradeNotificationTranslations) {
        return new this(externalVersion.major, platformVersion.major, upgradeExecuteTranslations, downgradeExecuteTranslations, downgradeNotificationTranslations);
    };
    StackingVersionConverter.prototype.upgradeExecuteCall = function (verb, parameters) {
        // Perform the upgrade of the verb and parameters to the level that platform is using
        var upgraded = { verb: verb, parameters: parameters };
        for (var _i = 0, _a = this._upgradeExecuteTranslations; _i < _a.length; _i++) {
            var upgradeTranslation = _a[_i];
            upgraded = upgradeTranslation(upgraded.verb, upgraded.parameters);
        }
        return upgraded;
    };
    StackingVersionConverter.prototype.downgradeExecuteReturn = function (executeResponse) {
        // Downgrade the response to what the external module is expecting
        var downgraded = executeResponse;
        for (var _i = 0, _a = this._downgradeExecuteTranslations; _i < _a.length; _i++) {
            var downgradeTranslation = _a[_i];
            downgraded = downgradeTranslation(downgraded);
        }
        return downgraded;
    };
    StackingVersionConverter.prototype.downgradeNotification = function (notification) {
        // Downgrade the notification to what the external module is expecting
        var downgraded = notification;
        for (var _i = 0, _a = this._downgradeNotificationTranslations; _i < _a.length; _i++) {
            var downgradeTranslation = _a[_i];
            downgraded = downgradeTranslation(downgraded);
        }
        return downgraded;
    };
    return StackingVersionConverter;
}());
exports.StackingVersionConverter = StackingVersionConverter;


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-any
/**
 * This version converter doesn't actually do anything but is useful for testing or when we have
 * a matching platform and internal version number
*/
var IdentityVersionConverter = /** @class */ (function () {
    function IdentityVersionConverter() {
    }
    IdentityVersionConverter.prototype.upgradeExecuteCall = function (verb, parameters) {
        return {
            verb: verb,
            parameters: parameters
        };
    };
    IdentityVersionConverter.prototype.downgradeExecuteReturn = function (executeResponse) {
        return executeResponse;
    };
    IdentityVersionConverter.prototype.downgradeNotification = function (notification) {
        return notification;
    };
    return IdentityVersionConverter;
}());
exports.IdentityVersionConverter = IdentityVersionConverter;


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// This is where we will start to define some of these translations.
// When modifying existing models, add the requisite conversion functions here, then use them
// in the VersionConverterFactory implementation. Import old versions as you would any other module
// 0 <-> Translations
// Uncomment this line to import from the V0 definition of the API
// import * as V0 from '@tableau-api-internal-contract-js_v0';
// 1 <-> 2 Translations
// Uncomment this line to import from the V1 definition of the API
// import * as V1 from '@tableau-api-internal-contract-js_v1';
function DowngradeV2WorksheetNames(executeResponse) {
    // Fix the dashboard friendly name issue. The structures are compatible,
    // so we still return the original reply, but we copy the SheetInfo.name
    // into the DashboardZone.name, where v1 wants to find it.
    var bootstrapInfo = executeResponse.result;
    if (bootstrapInfo.extensionDashboardInfo !== undefined) {
        bootstrapInfo.extensionDashboardInfo.zones.forEach(function (zone) {
            if (zone.sheetInfo) {
                zone.name = zone.sheetInfo.name;
            }
        });
    }
    return executeResponse;
}
exports.DowngradeV2WorksheetNames = DowngradeV2WorksheetNames;


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var VersionConverterFactory_1 = __webpack_require__(59);
var ExternalIdentityVersionConverter_1 = __webpack_require__(60);
var ExternalStackingVersionConverter_1 = __webpack_require__(127);
var ExternalVersionTranslations_1 = __webpack_require__(128);
// A mapping from the current client version of internal-contract to an older platform version of the contract.
// Each version bump can have an array of translations to perform in order.
// These translations handle downgradeExecuteCall and upgradeExecuteReturn and are meant to be called on the
// client/external side.
// When updating the major or minor version of our internal-contract, you will need to update these data structures.
// * If there are translations to add, add them to the version to 'upgrade from' or 'downgrade to'.
exports.ExecuteMinorDowngradeCallExternal = {
    1: {
        9: [] // Note that we put downgrades from 1.10 to 1.9 in the [1][9] bucket
    }
};
exports.ExecuteMinorUpgradeReturnExternal = {
    1: {
        9: [ExternalVersionTranslations_1.UpgradeDataTableTypes] // Note that we put upgrades from 1.9 to 1.10 in the [1][9] bucket
    }
};
exports.ExecuteMinorUpgradeNotification = {
    1: {
        9: [] // Note that we put upgrades from 1.9 to 1.10 in the [1][9] bucket
    }
};
/**
 * Creates a new ExternalContractVersionConverter which has the ability to upgrade and downgrade
 * the contract between the two versions which are specified. If externalMajorVersion is less than
 * platformMajorVersion, an ExternalIdentityVersionConverter will be returned.
 * Handles upgrade/downgrade for both major and minor updates.
 *
 * @param externalVersion VersionNumber of the internal api which the external module is using
 * @param platformVersion VersionNumber of the internal api which the platform is using
 */
function CreateExternalCompatibleVersionConverter(externalVersion, platformVersion) {
    return CreateExternalCompatibleVersionConverterWithTranslators(externalVersion, platformVersion, exports.ExecuteMinorDowngradeCallExternal, exports.ExecuteMinorUpgradeReturnExternal, exports.ExecuteMinorUpgradeNotification);
}
exports.CreateExternalCompatibleVersionConverter = CreateExternalCompatibleVersionConverter;
/**
 * Implementation of CreateExternalCompatibleVersionConverterWithTranslators.
 * This function takes the upgrade, downgrade arrays so that all the logic can be tested.
 *
 * @param externalVersion VersionNumber of the internal contract which the external module is using
 * @param platformVersion VersionNumber of the internal contract which the platform is using
 * @param upgrades MajorMinorTranslators for response upgrades
 * @param downgrades MajorMinorTranslators for execute call downgrades
 */
function CreateExternalCompatibleVersionConverterWithTranslators(externalVersion, platformVersion, downgrades, upgrades, upgradeNotifications) {
    var externalMajorVersion = externalVersion.major;
    var platformMajorVersion = platformVersion.major;
    var platformMinorVersion = platformVersion.minor;
    // This check is present in VersionConverterFactory. We throw the same error here as well.
    // Hence we only need to check the minor versions for translations.
    if (externalMajorVersion > platformMajorVersion) {
        throw new Error("External version must be less than or equal to platform version.\n    externalMajorVersion=" + externalMajorVersion + " platformMajorVersion=" + platformMajorVersion);
    }
    if (externalMajorVersion < platformMajorVersion || VersionConverterFactory_1.VersionEqualTo(externalVersion, platformVersion)) {
        return new ExternalIdentityVersionConverter_1.ExternalIdentityVersionConverter();
    }
    // Walk the span between the versions we have here and collect the upgrade and downgrades necessary
    var neededExecuteCallDowngrade = GetNeededExternalTranslations(platformMajorVersion, platformMinorVersion, downgrades);
    var neededExecuteReturnUpgrades = GetNeededExternalTranslations(platformMajorVersion, platformMinorVersion, upgrades);
    var neededNotificationUpgrades = GetNeededExternalTranslations(platformMajorVersion, platformMinorVersion, upgradeNotifications);
    // Reverse the downgrade calls, so that we start the downgrade from the external version to the platform version
    neededExecuteCallDowngrade.reverse();
    return new ExternalStackingVersionConverter_1.ExternalStackingVersionConverter(externalVersion, platformVersion, neededExecuteCallDowngrade, neededExecuteReturnUpgrades, neededNotificationUpgrades);
}
exports.CreateExternalCompatibleVersionConverterWithTranslators = CreateExternalCompatibleVersionConverterWithTranslators;
function GetNeededExternalTranslations(platformMajorVersion, platformMinorVersion, majorMinorTranslators) {
    var neededTranslations = [];
    if (platformMajorVersion in majorMinorTranslators) {
        var start = platformMinorVersion;
        var maximumMinorVersion = VersionConverterFactory_1.GetMaximumMinorIndex(Object.keys(majorMinorTranslators[platformMajorVersion]));
        for (var minor = start; minor <= maximumMinorVersion; minor++) {
            if (minor in majorMinorTranslators[platformMajorVersion]) {
                neededTranslations.push.apply(neededTranslations, majorMinorTranslators[platformMajorVersion][minor]);
            }
        }
    }
    return neededTranslations;
}


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-any
/**
 * The version converter is designed to allow the platform and external modules
 * to seemlessly communicate over two different versions of the internal API. This converter
 * supports external's version(minor) >= platform's version(minor). When executing
 * commands, it is used to downgrade the external representation to what platform knows on the way in
 * and upgrade the representations on the way out.
 */
var ExternalStackingVersionConverter = /** @class */ (function () {
    /**
     * Creates a new instance of the StackingVersionConverter
     *
     * @param _externalVersion The version of the internal contract api-external-js is using
     * @param _platformVersion The version of the internal contract the api-platform-js is using
     * @param _downgradeExecuteCallTranslations Ordered list of the translations to perform when downgrading cmd parameters
     * @param _upgradeExecuteReturnTranslations Ordered list of upgrade translations to perform after a cmd is executed
     * @param _upgradeNotificationTranslations Ordered list of upgrade notfications to perform on events
     */
    function ExternalStackingVersionConverter(_externalVersion, _platformVersion, _downgradeExecuteCallTranslations, _upgradeExecuteReturnTranslations, _upgradeNotificationTranslations) {
        this._externalVersion = _externalVersion;
        this._platformVersion = _platformVersion;
        this._downgradeExecuteCallTranslations = _downgradeExecuteCallTranslations;
        this._upgradeExecuteReturnTranslations = _upgradeExecuteReturnTranslations;
        this._upgradeNotificationTranslations = _upgradeNotificationTranslations;
        if (this._externalVersion.major > this._platformVersion.major) {
            throw new Error("Cannot convert between external version " + this._externalVersion.major + "\n      and " + this._platformVersion.major);
        }
    }
    ExternalStackingVersionConverter.prototype.downgradeExecuteCall = function (verb, parameters) {
        // Perform the downgrade of the verb and parameters to the level that platform is using
        var downgraded = { verb: verb, parameters: parameters };
        for (var _i = 0, _a = this._downgradeExecuteCallTranslations; _i < _a.length; _i++) {
            var downgradeTranslation = _a[_i];
            downgraded = downgradeTranslation(downgraded.verb, downgraded.parameters);
        }
        return downgraded;
    };
    ExternalStackingVersionConverter.prototype.upgradeExecuteReturn = function (executeResponse) {
        // Perform the upgrade of the response to what the external module is expecting
        var upgraded = executeResponse;
        for (var _i = 0, _a = this._upgradeExecuteReturnTranslations; _i < _a.length; _i++) {
            var upgradeTranslation = _a[_i];
            upgraded = upgradeTranslation(upgraded);
        }
        return upgraded;
    };
    ExternalStackingVersionConverter.prototype.upgradeNotification = function (notification) {
        // Perform the upgrade of notification to what the external module is expecting
        var upgraded = notification;
        for (var _i = 0, _a = this._upgradeNotificationTranslations; _i < _a.length; _i++) {
            var upgradeNotification = _a[_i];
            upgraded = upgradeNotification(upgraded);
        }
        return upgraded;
    };
    return ExternalStackingVersionConverter;
}());
exports.ExternalStackingVersionConverter = ExternalStackingVersionConverter;


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var JsApiInternalContract_1 = __webpack_require__(1);
// 1.2 -> 1.0 Translations
// Uncomment this line to import from the V1 definition of the API
// import * as V1 from '@tableau-api-internal-contract-js_v1';
/**
 * Prior to 2019.2 (internal-contract v1.9), DataValue.value were all strings.
 * Go through all DataValue objects. If we have a string, but the type should not be a string,
 * convert it to the correct type. The type of DataValue.value is 'any' in the contract, so
 * this change doesn't need any updates to classes or types.
*/
function UpgradeDataTableTypes(executeResponse) {
    if (!executeResponse) {
        return executeResponse;
    }
    var oldUnderlyingDataTable = executeResponse.result;
    if (oldUnderlyingDataTable.data !== undefined && oldUnderlyingDataTable.isSummary !== undefined) {
        convertDataValues(oldUnderlyingDataTable.data);
        return executeResponse;
    }
    var oldSelectedMarksTable = executeResponse.result;
    if (oldSelectedMarksTable.data !== undefined && Array.isArray(oldSelectedMarksTable.data)) {
        oldSelectedMarksTable.data.forEach(function (marksTable) {
            convertDataValues(marksTable);
        });
        return executeResponse;
    }
    return executeResponse;
}
exports.UpgradeDataTableTypes = UpgradeDataTableTypes;
function convertDataValues(table) {
    // dataTable is a two-dimensional array of data. First index is the row, second is the column.
    if (table === undefined || table.dataTable === undefined || !Array.isArray(table.dataTable)) {
        return;
    }
    table.dataTable.forEach(function (row) {
        row.forEach(function (dataValue, columnIndex) {
            var value = dataValue.value;
            if (value !== null) {
                dataValue.value = convertToType(value, table.headers[columnIndex].dataType);
            }
        });
    });
}
function convertToType(valueAsString, type) {
    switch (type) {
        case JsApiInternalContract_1.DataType.Bool:
            return isSpecial(valueAsString) ? valueAsString : valueAsString.toLowerCase() === 'true';
        case JsApiInternalContract_1.DataType.Int:
        case JsApiInternalContract_1.DataType.Float:
            return isSpecial(valueAsString) ? valueAsString : Number(valueAsString);
        case JsApiInternalContract_1.DataType.Date:
        case JsApiInternalContract_1.DataType.DateTime:
        // Discrete dates are type DataType.Int, and handled above.
        // Continuous dates are just strings in this format: "YYYY-MM-DD [HH:MM:SS]"
        // fallthrough...
        case JsApiInternalContract_1.DataType.Spatial:
        case JsApiInternalContract_1.DataType.String:
        default:
            return valueAsString;
    }
}
function isSpecial(valueAsString) {
    // Special values come to us as '%null%', '%all%', '%wildcard%', '%missing%'...
    // (See DataValueFormatter.cpp)
    if (valueAsString.length > 0 && valueAsString[0] === '%' && valueAsString[valueAsString.length - 1] === '%') {
        return true;
    }
    return false;
}


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var guid = __webpack_require__(61);
var CrossFramePreparedMessage_1 = __webpack_require__(130);
var MessageTypes_1 = __webpack_require__(40);
var MessageTypeChecks_1 = __webpack_require__(131);
/**
 * The CrossFrameMessenger is the primary export from the api-messaging module. An instance of
 * this class can be instantiated on both sides of a frame boundary to facilitate communication
 * in both directions between the frames. This class implements both the dispatcher and the listener
 * portions, but doesn't require callers to care about both.
 */
var CrossFrameMessenger = /** @class */ (function () {
    /**
     * Creates an instance of CrossFrameMessenger. If you would like to use the CrossFrameMessenger as a MessageListener,
     * be sure to call StartListening and register message handlers.
     * @param thisWindow The window object which the CrossFrameMessenger lives. An onMessage listener will be added here.
     * @param [otherWindow] Optional otherWindow which messages will be posted to.
     *                      If defined, incoming messages must originate from otherWindow to be passed on
     * @param [otherWindowOrigin] The target origin which otherWindow must have in order to receive dispatched messages.
     *                            This value will be sent as the targetOrigin of a postMessage
     *                            (https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
     */
    function CrossFrameMessenger(thisWindow, otherWindow, otherWindowOrigin) {
        this.thisWindow = thisWindow;
        this.otherWindow = otherWindow;
        this.otherWindowOrigin = otherWindowOrigin;
        // Make sure to call StartListening
    }
    ///// MessageListener Implementation
    CrossFrameMessenger.prototype.startListening = function () {
        var _this = this;
        // Check if we already are listening, if not, hook up a message listener
        if (!this.unregisterFunction) {
            var boundHandler_1 = this.onMessageReceived.bind(this);
            this.thisWindow.addEventListener('message', boundHandler_1, true);
            this.unregisterFunction = function () { return _this.thisWindow.removeEventListener('message', boundHandler_1, true); };
        }
    };
    CrossFrameMessenger.prototype.stopListening = function () {
        // Stop listening if we have started listening
        if (this.unregisterFunction) {
            this.unregisterFunction();
            this.unregisterFunction = undefined;
        }
    };
    CrossFrameMessenger.prototype.setInitializeMessageHandler = function (handler) {
        this.initializeMessageHandler = handler;
    };
    CrossFrameMessenger.prototype.setCommandResponseMessageHandler = function (handler) {
        this.commandResponseMessageHandler = handler;
    };
    CrossFrameMessenger.prototype.setCommandMessageHandler = function (handler) {
        this.commandMessageHandler = handler;
    };
    CrossFrameMessenger.prototype.setNotificationMessageHandler = function (handler) {
        this.notificationMessageHandler = handler;
    };
    ///// MessageDispatcher Implementation
    /**
     * @param apiVersion api-internal-contract-js version (exported in JsApiInternalConntract)
     * @param crossFrameVersion crossframe messaging version (exported in JsApiInternalConntract)
     * @param options additional options that can be passed at initialization (information about the version of
     *                external being used for example)
     */
    CrossFrameMessenger.prototype.prepareInitializationMessage = function (apiVersion, crossFrameVersion, options) {
        var message = {
            msgGuid: guid.raw(),
            msgType: MessageTypes_1.MessageType.Initialize,
            crossFrameVersion: crossFrameVersion,
            apiVersion: apiVersion,
            options: options
        };
        return this.prepareMessage(message);
    };
    CrossFrameMessenger.prototype.prepareCommandMessage = function (verbId, parameters) {
        var message = {
            msgGuid: guid.raw(),
            msgType: MessageTypes_1.MessageType.Command,
            verbId: verbId,
            parameters: parameters
        };
        return this.prepareMessage(message);
    };
    CrossFrameMessenger.prototype.prepareCommandResponseMessage = function (commandGuid, data, error) {
        var message = {
            msgGuid: guid.raw(),
            msgType: MessageTypes_1.MessageType.CommandResponse,
            commandGuid: commandGuid,
            data: data,
            error: error
        };
        return this.prepareMessage(message);
    };
    CrossFrameMessenger.prototype.prepareNotificationMessage = function (notificationId, data) {
        var message = {
            msgGuid: guid.raw(),
            msgType: MessageTypes_1.MessageType.Notification,
            notificationId: notificationId,
            data: data
        };
        return this.prepareMessage(message);
    };
    /**
     * Prepares a pending message for sending and returns the prepared message
     *
     * @param msg The message to be sent to this.otherWindow
     * @returns The prepared message
     */
    CrossFrameMessenger.prototype.prepareMessage = function (msg) {
        if (!this.otherWindow || !this.otherWindowOrigin) {
            throw 'Other window not initialized, cannot dispatch messages';
        }
        var preparedMessage = new CrossFramePreparedMessage_1.CrossFramePreparedMessage(msg, this.otherWindow, this.otherWindowOrigin);
        return preparedMessage;
    };
    /**
     * Called when a message is received. Does some validation of the message, and then
     * calls an appropriate message handler if one is defined
     *
     * @param event The incoming MessageEvent
     */
    CrossFrameMessenger.prototype.onMessageReceived = function (event) {
        // If we have an otherWindow defined, make sure the message is coming from there
        if (this.otherWindow && event.source !== this.otherWindow) {
            return;
        }
        // Do some validation on event.data to make sure that we have received a real message
        if (!event.data) {
            return;
        }
        var message = event.data;
        if (!MessageTypeChecks_1.isMessage(message)) {
            return;
        }
        // Check the declared message type, validate the message, and call an appropriate hander if one exists
        switch (message.msgType) {
            case MessageTypes_1.MessageType.Initialize: {
                if (!MessageTypeChecks_1.isInitMessage(message) || !this.initializeMessageHandler) {
                    return;
                }
                this.initializeMessageHandler(message, event.source);
                break;
            }
            case MessageTypes_1.MessageType.CommandResponse: {
                if (!MessageTypeChecks_1.isCommandResponseMessage(message) || !this.commandResponseMessageHandler) {
                    return;
                }
                this.commandResponseMessageHandler(message, event.source);
                break;
            }
            case MessageTypes_1.MessageType.Command: {
                if (!MessageTypeChecks_1.isCommandMessage(message) || !this.commandMessageHandler) {
                    return;
                }
                this.commandMessageHandler(message, event.source);
                break;
            }
            case MessageTypes_1.MessageType.Notification: {
                if (!MessageTypeChecks_1.isNotificationMessage(message) || !this.notificationMessageHandler) {
                    return;
                }
                this.notificationMessageHandler(message, event.source);
                break;
            }
            default:
        }
    };
    return CrossFrameMessenger;
}());
exports.CrossFrameMessenger = CrossFrameMessenger;


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Implementation of the PreparedMessage interface used to post messages between
 * two frames using window.postMessage
 */
var CrossFramePreparedMessage = /** @class */ (function () {
    /**
     * Creates an instance of CrossFramePreparedMessage.
     * @param _message The message to be sent
     * @param _target The target window where the message will be sent
     * @param _origin The targetOrigin where this message can be received
     */
    function CrossFramePreparedMessage(_message, _target, _origin) {
        this._message = _message;
        this._target = _target;
        this._origin = _origin;
    }
    Object.defineProperty(CrossFramePreparedMessage.prototype, "messageGuid", {
        get: function () { return this._message.msgGuid; },
        enumerable: true,
        configurable: true
    });
    CrossFramePreparedMessage.prototype.send = function () {
        this._target.postMessage(this._message, this._origin);
        return this;
    };
    return CrossFramePreparedMessage;
}());
exports.CrossFramePreparedMessage = CrossFramePreparedMessage;


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var guid = __webpack_require__(61);
var MessageTypes_1 = __webpack_require__(40);
/* tslint:disable no-any */
function isMessage(data) {
    if (!data) {
        return false;
    }
    var message = data;
    if (!message || !message.msgGuid || !message.msgType) {
        return false;
    }
    if (!guid.isGuid(message.msgGuid)) {
        return false;
    }
    if (typeof message.msgType !== 'string') {
        return false;
    }
    var messageTypes = [MessageTypes_1.MessageType.Command, MessageTypes_1.MessageType.CommandResponse, MessageTypes_1.MessageType.Initialize, MessageTypes_1.MessageType.Notification];
    if (messageTypes.indexOf(message.msgType) < 0) {
        return false;
    }
    return true;
}
exports.isMessage = isMessage;
function isVersion(versionNumber) {
    if (!versionNumber) {
        return false;
    }
    var v = versionNumber;
    if (typeof v !== 'object') {
        return false;
    }
    if (typeof v.fix !== 'number' || typeof v.minor !== 'number' || typeof v.major !== 'number') {
        return false;
    }
    return true;
}
exports.isVersion = isVersion;
function isInitMessage(message) {
    if (!isMessage(message)) {
        return false;
    }
    var initMessage = message;
    if (initMessage.msgType !== MessageTypes_1.MessageType.Initialize) {
        return false;
    }
    if (!initMessage.apiVersion || !isVersion(initMessage.apiVersion)) {
        return false;
    }
    if (!initMessage.crossFrameVersion || !isVersion(initMessage.crossFrameVersion)) {
        return false;
    }
    return true;
}
exports.isInitMessage = isInitMessage;
function isCommandResponseMessage(message) {
    if (!isMessage(message)) {
        return false;
    }
    var crMessage = message;
    if (crMessage.msgType !== MessageTypes_1.MessageType.CommandResponse) {
        return false;
    }
    if (!guid.isGuid(crMessage.commandGuid)) {
        return false;
    }
    if (!crMessage.data && !crMessage.error) {
        return false;
    }
    return true;
}
exports.isCommandResponseMessage = isCommandResponseMessage;
function isCommandMessage(message) {
    if (!isMessage(message)) {
        return false;
    }
    var commandMessage = message;
    if (commandMessage.msgType !== MessageTypes_1.MessageType.Command) {
        return false;
    }
    if (!commandMessage.parameters || typeof commandMessage.parameters !== 'object') {
        return false;
    }
    if (!commandMessage.verbId || typeof commandMessage.verbId !== 'string') {
        return false;
    }
    return true;
}
exports.isCommandMessage = isCommandMessage;
function isNotificationMessage(message) {
    if (!isMessage(message)) {
        return false;
    }
    var notificationMessage = message;
    if (notificationMessage.msgType !== MessageTypes_1.MessageType.Notification) {
        return false;
    }
    if (!notificationMessage.data) {
        return false;
    }
    if (!notificationMessage.notificationId || typeof notificationMessage.notificationId !== 'string') {
        return false;
    }
    return true;
}
exports.isNotificationMessage = isNotificationMessage;


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Contract = __webpack_require__(0);
var ServiceRegistry_1 = __webpack_require__(7);
var DashboardObject_1 = __webpack_require__(133);
var api_internal_contract_js_1 = __webpack_require__(1);
var ErrorHelpers_1 = __webpack_require__(8);
var InternalToExternalEnumMappings_1 = __webpack_require__(14);
var Point_1 = __webpack_require__(134);
var SheetImpl_1 = __webpack_require__(63);
var SheetInfoImpl_1 = __webpack_require__(135);
var Size_1 = __webpack_require__(136);
var Worksheet_1 = __webpack_require__(137);
var WorksheetImpl_1 = __webpack_require__(138);
var DashboardImpl = /** @class */ (function (_super) {
    __extends(DashboardImpl, _super);
    function DashboardImpl(_info, _sheetPath) {
        var _this = _super.call(this, new SheetInfoImpl_1.SheetInfoImpl(_info.name, Contract.SheetType.Dashboard, new Size_1.Size(_info.size.h, _info.size.w))) || this;
        _this._info = _info;
        _this._sheetPath = _sheetPath;
        return _this;
    }
    Object.defineProperty(DashboardImpl.prototype, "worksheets", {
        get: function () {
            return this._worksheets;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DashboardImpl.prototype, "objects", {
        get: function () {
            return this._objects;
        },
        enumerable: true,
        configurable: true
    });
    DashboardImpl.prototype.initializeWithPublicInterfaces = function (dashboard) {
        ErrorHelpers_1.ErrorHelpers.verifyInternalValue(dashboard, 'dashboard');
        this._worksheets = new Array();
        this._objects = new Array();
        // Process all the zones which are contained in this dashboard
        for (var _i = 0, _a = this._info.zones; _i < _a.length; _i++) {
            var zone = _a[_i];
            var worksheet = undefined;
            var zoneSize = new Size_1.Size(zone.height, zone.width);
            if (zone.zoneType === api_internal_contract_js_1.DashboardObjectType.Worksheet) {
                // zone.sheetInfo was not initialized prior to internal-contract 1.6.0
                var worksheetName = zone.sheetInfo ? zone.sheetInfo.name : zone.name;
                var sheetInfo = new SheetInfoImpl_1.SheetInfoImpl(worksheetName, Contract.SheetType.Worksheet, zoneSize);
                var vizId = {
                    worksheet: worksheetName,
                    dashboard: this._info.name,
                    storyboard: this._sheetPath.storyboard,
                    flipboardZoneID: this._sheetPath.flipboardZoneID,
                    storyPointID: this._sheetPath.storyPointID
                };
                var worksheetImpl = new WorksheetImpl_1.WorksheetImpl(sheetInfo, vizId, dashboard);
                worksheet = new Worksheet_1.Worksheet(worksheetImpl);
                this._worksheets.push(worksheet);
            }
            var zonePoint = new Point_1.Point(zone.x, zone.y);
            var dashboardObject = new DashboardObject_1.DashboardObject(dashboard, InternalToExternalEnumMappings_1.InternalToExternalEnumMappings.dashboardObjectType.convert(zone.zoneType), zonePoint, zoneSize, worksheet, zone.name, zone.isFloating || false, // before 1.6.0 we didn't have isFloating, so we assume false
            zone.isVisible || true, // before 1.6.0 we didn't have isVisible, so we assume true
            zone.zoneId);
            this._objects.push(dashboardObject);
        }
    };
    DashboardImpl.prototype.setZoneVisibilityAsync = function (zoneVisibilityMap) {
        var zoneService = ServiceRegistry_1.ApiServiceRegistry.instance.getService("zone-service" /* Zone */);
        return zoneService.setVisibilityAsync(/*Dashboard Name*/ this.name, this.objects, zoneVisibilityMap);
    };
    return DashboardImpl;
}(SheetImpl_1.SheetImpl));
exports.DashboardImpl = DashboardImpl;


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Implementation of the dashboard objects - the zones in a dashboard.
 * This does not follow the Impl pattern as it is just a property bag.
 */
var DashboardObject = /** @class */ (function () {
    function DashboardObject(_dashboard, _type, _position, _size, _worksheet, _name, _isFloating, _isVisible, _id) {
        this._dashboard = _dashboard;
        this._type = _type;
        this._position = _position;
        this._size = _size;
        this._worksheet = _worksheet;
        this._name = _name;
        this._isFloating = _isFloating;
        this._isVisible = _isVisible;
        this._id = _id;
    }
    Object.defineProperty(DashboardObject.prototype, "dashboard", {
        get: function () {
            return this._dashboard;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DashboardObject.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DashboardObject.prototype, "position", {
        get: function () {
            return this._position;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DashboardObject.prototype, "size", {
        get: function () {
            return this._size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DashboardObject.prototype, "worksheet", {
        get: function () {
            return this._worksheet;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DashboardObject.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DashboardObject.prototype, "isFloating", {
        get: function () {
            return this._isFloating;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DashboardObject.prototype, "isVisible", {
        get: function () {
            return this._isVisible;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DashboardObject.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    return DashboardObject;
}());
exports.DashboardObject = DashboardObject;


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Point = /** @class */ (function () {
    function Point(_x, _y) {
        this._x = _x;
        this._y = _y;
    }
    Object.defineProperty(Point.prototype, "x", {
        get: function () {
            return this._x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "y", {
        get: function () {
            return this._y;
        },
        enumerable: true,
        configurable: true
    });
    return Point;
}());
exports.Point = Point;


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SharedApiExternalContract_1 = __webpack_require__(0);
var SheetInfoImpl = /** @class */ (function () {
    function SheetInfoImpl(_name, _sheetType, _sheetSize) {
        this._name = _name;
        this._sheetType = _sheetType;
        this._sheetSize = _sheetSize;
    }
    Object.defineProperty(SheetInfoImpl.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SheetInfoImpl.prototype, "sheetSize", {
        get: function () {
            return this._sheetSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SheetInfoImpl.prototype, "sheetType", {
        get: function () {
            return this._sheetType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SheetInfoImpl.prototype, "sheetPath", {
        get: function () {
            return {
                sheetName: this.name,
                isDashboard: this.sheetType === SharedApiExternalContract_1.SheetType.Dashboard
                // TODO - Stories
            };
        },
        enumerable: true,
        configurable: true
    });
    return SheetInfoImpl;
}());
exports.SheetInfoImpl = SheetInfoImpl;


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Size = /** @class */ (function () {
    function Size(_height, _width) {
        this._height = _height;
        this._width = _width;
    }
    Object.defineProperty(Size.prototype, "height", {
        get: function () {
            return this._height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Size.prototype, "width", {
        get: function () {
            return this._width;
        },
        enumerable: true,
        configurable: true
    });
    return Size;
}());
exports.Size = Size;


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Sheet_1 = __webpack_require__(56);
var Worksheet = /** @class */ (function (_super) {
    __extends(Worksheet, _super);
    function Worksheet(_worksheetImpl) {
        var _this = _super.call(this, _worksheetImpl) || this;
        _this._worksheetImpl = _worksheetImpl;
        // Call to initialize events and then call down to the event listener manager to handle things
        _this._worksheetImpl.initializeEvents(_this).forEach(function (e) { return _this.addNewEventType(e); });
        return _this;
    }
    Object.defineProperty(Worksheet.prototype, "parentDashboard", {
        get: function () {
            return this._worksheetImpl.parentDashboard;
        },
        enumerable: true,
        configurable: true
    });
    Worksheet.prototype.applyFilterAsync = function (fieldName, values, updateType, options) {
        return this._worksheetImpl.applyFilterAsync(fieldName, values, updateType, options);
    };
    Worksheet.prototype.applyRangeFilterAsync = function (fieldName, filterOptions) {
        return this._worksheetImpl.applyRangeFilterAsync(fieldName, filterOptions);
    };
    Worksheet.prototype.clearFilterAsync = function (fieldName) {
        return this._worksheetImpl.clearFilterAsync(fieldName);
    };
    Worksheet.prototype.getDataSourcesAsync = function () {
        return this._worksheetImpl.getDataSourcesAsync();
    };
    Worksheet.prototype.getFiltersAsync = function () {
        return this._worksheetImpl.getFiltersAsync();
    };
    Worksheet.prototype.getSelectedMarksAsync = function () {
        return this._worksheetImpl.getSelectedMarksAsync();
    };
    Worksheet.prototype.getHighlightedMarksAsync = function () {
        return this._worksheetImpl.getHighlightedMarksAsync();
    };
    Worksheet.prototype.getSummaryDataAsync = function (options) {
        return this._worksheetImpl.getSummaryDataAsync(options);
    };
    Worksheet.prototype.getUnderlyingDataAsync = function (options) {
        return this._worksheetImpl.getUnderlyingDataAsync(options);
    };
    Worksheet.prototype.clearSelectedMarksAsync = function () {
        return this._worksheetImpl.clearSelectedMarksAsync();
    };
    Worksheet.prototype.selectMarksByIDAsync = function (marksInfo, updateType) {
        return this._worksheetImpl.selectMarksByIdAsync(marksInfo, updateType);
    };
    Worksheet.prototype.selectMarksByValueAsync = function (selections, selectionUpdateType) {
        return this._worksheetImpl.selectMarksByValueAsync(selections, selectionUpdateType);
    };
    Worksheet.prototype.selectMarksByIdAsync = function (selections, selectionUpdateType) {
        return this._worksheetImpl.selectMarksByIdAsync(selections, selectionUpdateType);
    };
    return Worksheet;
}(Sheet_1.Sheet));
exports.Worksheet = Worksheet;


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Contract = __webpack_require__(0);
var api_internal_contract_js_1 = __webpack_require__(1);
var DataSource_1 = __webpack_require__(64);
var DataSourceImpl_1 = __webpack_require__(65);
var SheetImpl_1 = __webpack_require__(63);
var SingleEventManagerImpl_1 = __webpack_require__(42);
var FilterChangedEvent_1 = __webpack_require__(141);
var MarksSelectedEvent_1 = __webpack_require__(142);
var GetDataService_1 = __webpack_require__(70);
var ServiceRegistry_1 = __webpack_require__(7);
var ErrorHelpers_1 = __webpack_require__(8);
var visualIdsAreEqual = function (a, b) {
    return a && b &&
        a.worksheet === b.worksheet &&
        a.dashboard === b.dashboard &&
        a.storyboard === b.storyboard &&
        a.storyPointID === b.storyPointID &&
        a.flipboardZoneID === b.flipboardZoneID;
};
var WorksheetImpl = /** @class */ (function (_super) {
    __extends(WorksheetImpl, _super);
    function WorksheetImpl(sheetInfoImpl, _visualId, _parentDashboard) {
        var _this = _super.call(this, sheetInfoImpl) || this;
        _this._visualId = _visualId;
        _this._parentDashboard = _parentDashboard;
        return _this;
    }
    Object.defineProperty(WorksheetImpl.prototype, "parentDashboard", {
        get: function () {
            return this._parentDashboard;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Helper method which goes through and registers each event type this impl knows about
     * with the NotificationService. It returns an array of SingleEventManager objects which
     * can then be passed to an EventListenerManager to handle user registration / unregistration.
     *
     * @param {Worksheet} worksheet The worksheet object which will be included with the event notifications
     * @returns {Array<SingleEventManager>} Collection of event managers to pass to an EventListenerManager
     */
    WorksheetImpl.prototype.initializeEvents = function (worksheet) {
        var _this = this;
        var results = new Array();
        var notificationService;
        try {
            notificationService = ServiceRegistry_1.ApiServiceRegistry.instance.getService("notification-service" /* Notification */);
        }
        catch (e) {
            // If we don't have this service registered, just return
            return results;
        }
        // Initialize all of the event managers we'll need (one for each event type)
        var marksEvent = new SingleEventManagerImpl_1.SingleEventManagerImpl(Contract.TableauEventType.MarkSelectionChanged);
        notificationService.registerHandler(api_internal_contract_js_1.NotificationId.SelectedMarksChanged, function (model) {
            var visualId = model;
            return visualIdsAreEqual(visualId, _this.visualId);
        }, function (viz) {
            marksEvent.triggerEvent(function () { return new MarksSelectedEvent_1.MarksSelectedEvent(worksheet); });
        });
        var filterEvent = new SingleEventManagerImpl_1.SingleEventManagerImpl(Contract.TableauEventType.FilterChanged);
        notificationService.registerHandler(api_internal_contract_js_1.NotificationId.FilterChanged, function (model) {
            var filterEventResponse = model;
            return _this.visualId.worksheet === filterEventResponse.visualId.worksheet;
        }, function (event) {
            filterEvent.triggerEvent(function () { return new FilterChangedEvent_1.FilterChangedEvent(worksheet, event.fieldName); });
        });
        results.push(marksEvent);
        results.push(filterEvent);
        // TODO - other event types
        return results;
    };
    Object.defineProperty(WorksheetImpl.prototype, "visualId", {
        get: function () {
            return this._visualId;
        },
        enumerable: true,
        configurable: true
    });
    WorksheetImpl.prototype.applyFilterAsync = function (fieldName, values, updateType, options) {
        console.log('we are in WorksheetImpl.prototype.applyFilterAsync', fieldName, values, updateType, options);
        ErrorHelpers_1.ErrorHelpers.verifyEnumValue(updateType, Contract.FilterUpdateType);
        var service = ServiceRegistry_1.ApiServiceRegistry.instance.getService("filter-service" /* Filter */);
        return service.applyFilterAsync(this.visualId, fieldName, values, updateType, options);
    };
    WorksheetImpl.prototype.applyRangeFilterAsync = function (fieldName, filterOptions) {
        ErrorHelpers_1.ErrorHelpers.verifyParameter(fieldName, 'fieldName');
        ErrorHelpers_1.ErrorHelpers.verifyParameter(filterOptions, 'filterOptions');
        if (filterOptions.nullOption) {
            ErrorHelpers_1.ErrorHelpers.verifyEnumValue(filterOptions.nullOption, Contract.FilterNullOption);
        }
        else {
            ErrorHelpers_1.ErrorHelpers.verifyRangeParamType(filterOptions.min, filterOptions.max);
        }
        var service = ServiceRegistry_1.ApiServiceRegistry.instance.getService("filter-service" /* Filter */);
        return service.applyRangeFilterAsync(this.visualId, fieldName, filterOptions);
    };
    WorksheetImpl.prototype.clearFilterAsync = function (fieldName) {
        ErrorHelpers_1.ErrorHelpers.verifyParameter(fieldName, 'fieldName');
        var service = ServiceRegistry_1.ApiServiceRegistry.instance.getService("filter-service" /* Filter */);
        return service.clearFilterAsync(this.visualId, fieldName);
    };
    WorksheetImpl.prototype.getDataSourcesAsync = function () {
        var _this = this;
        var service = ServiceRegistry_1.ApiServiceRegistry.instance.getService("data-source-service" /* DataSourceService */);
        return service.getDataSourcesAsync(this.visualId).then(function (result) {
            var dataSchema = result;
            var worksheetDataSourceInfo = dataSchema.worksheetDataSchemaMap[_this.name];
            var dataSources = [];
            // First, add the primary datasource.  By convention, it comes first in the returned array.
            var primaryId = worksheetDataSourceInfo.primaryDataSource;
            dataSources.push(_this.createDataSourceFromInfo(dataSchema.dataSources[primaryId]));
            // Then, loop through any secondary data sources and add them.
            for (var _i = 0, _a = worksheetDataSourceInfo.referencedDataSourceList; _i < _a.length; _i++) {
                var secondaryId = _a[_i];
                if (secondaryId !== primaryId) {
                    dataSources.push(_this.createDataSourceFromInfo(dataSchema.dataSources[secondaryId]));
                }
            }
            return dataSources;
        });
    };
    WorksheetImpl.prototype.getFiltersAsync = function () {
        var service = ServiceRegistry_1.ApiServiceRegistry.instance.getService("filter-service" /* Filter */);
        return service.getFiltersAsync(this.visualId);
    };
    WorksheetImpl.prototype.getSelectedMarksAsync = function () {
        var service = ServiceRegistry_1.ApiServiceRegistry.instance.getService("get-data-service" /* GetData */);
        return service.getSelectedMarksAsync(this.visualId);
    };
    WorksheetImpl.prototype.getHighlightedMarksAsync = function () {
        var service = ServiceRegistry_1.ApiServiceRegistry.instance.getService("get-data-service" /* GetData */);
        return service.getHighlightedMarksAsync(this.visualId);
    };
    WorksheetImpl.prototype.getSummaryDataAsync = function (options) {
        var service = ServiceRegistry_1.ApiServiceRegistry.instance.getService("get-data-service" /* GetData */);
        options = options || {};
        return service.getUnderlyingDataAsync(this.visualId, GetDataService_1.GetDataType.Summary, !!options.ignoreAliases, !!options.ignoreSelection, true, 0);
    };
    WorksheetImpl.prototype.getUnderlyingDataAsync = function (options) {
        var service = ServiceRegistry_1.ApiServiceRegistry.instance.getService("get-data-service" /* GetData */);
        options = options || {};
        return service.getUnderlyingDataAsync(this.visualId, GetDataService_1.GetDataType.Underlying, !!options.ignoreAliases, !!options.ignoreSelection, !!options.includeAllColumns, options.maxRows || 0);
    };
    WorksheetImpl.prototype.clearSelectedMarksAsync = function () {
        var service = ServiceRegistry_1.ApiServiceRegistry.instance.getService("selection-service" /* Selection */);
        return service.clearSelectedMarksAsync(this.visualId);
    };
    WorksheetImpl.prototype.selectMarksByValueAsync = function (selections, selectionUpdateType) {
        ErrorHelpers_1.ErrorHelpers.verifyParameter(selections, 'fieldName');
        ErrorHelpers_1.ErrorHelpers.verifyEnumValue(selectionUpdateType, Contract.SelectionUpdateType);
        var service = ServiceRegistry_1.ApiServiceRegistry.instance.getService("selection-service" /* Selection */);
        return service.selectMarksByValueAsync(this.visualId, selections, selectionUpdateType);
    };
    WorksheetImpl.prototype.selectMarksByIdAsync = function (selections, selectionUpdateType) {
        ErrorHelpers_1.ErrorHelpers.verifyParameter(selections, 'fieldName');
        ErrorHelpers_1.ErrorHelpers.verifyEnumValue(selectionUpdateType, Contract.SelectionUpdateType);
        var service = ServiceRegistry_1.ApiServiceRegistry.instance.getService("selection-service" /* Selection */);
        return service.selectMarksByIdAsync(this.visualId, selections, selectionUpdateType);
    };
    WorksheetImpl.prototype.createDataSourceFromInfo = function (dataSourceInfo) {
        var dataSourceImpl = new DataSourceImpl_1.DataSourceImpl(dataSourceInfo);
        var dataSource = new DataSource_1.DataSource(dataSourceImpl);
        dataSourceImpl.initializeWithPublicInterfaces(dataSource);
        return dataSource;
    };
    return WorksheetImpl;
}(SheetImpl_1.SheetImpl));
exports.WorksheetImpl = WorksheetImpl;


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Implementation of a connection summary.
 * This does not follow the Impl pattern as it is just a property bag.
 */
var ConnectionSummary = /** @class */ (function () {
    function ConnectionSummary(_connectionInfo) {
        this._connectionInfo = _connectionInfo;
    }
    Object.defineProperty(ConnectionSummary.prototype, "name", {
        get: function () {
            return this._connectionInfo.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionSummary.prototype, "id", {
        get: function () {
            return this._connectionInfo.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionSummary.prototype, "serverURI", {
        get: function () {
            return this._connectionInfo.serverURI;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectionSummary.prototype, "type", {
        get: function () {
            return this._connectionInfo.type;
        },
        enumerable: true,
        configurable: true
    });
    return ConnectionSummary;
}());
exports.ConnectionSummary = ConnectionSummary;


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Implementation of a table summary.
 * This does not follow the Impl pattern as it is just a property bag.
 */
var TableSummary = /** @class */ (function () {
    function TableSummary(_tableInfo) {
        this._tableInfo = _tableInfo;
    }
    Object.defineProperty(TableSummary.prototype, "name", {
        get: function () {
            return this._tableInfo.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableSummary.prototype, "id", {
        get: function () {
            return this._tableInfo.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableSummary.prototype, "connectionId", {
        get: function () {
            return this._tableInfo.connectionId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableSummary.prototype, "customSQL", {
        get: function () {
            return this._tableInfo.customSQL;
        },
        enumerable: true,
        configurable: true
    });
    return TableSummary;
}());
exports.TableSummary = TableSummary;


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Contract = __webpack_require__(0);
var TableauError_1 = __webpack_require__(4);
var TableauWorksheetEvent_1 = __webpack_require__(68);
var FilterChangedEvent = /** @class */ (function (_super) {
    __extends(FilterChangedEvent, _super);
    function FilterChangedEvent(worksheet, _fieldName) {
        var _this = _super.call(this, Contract.TableauEventType.FilterChanged, worksheet) || this;
        _this._fieldName = _fieldName;
        return _this;
    }
    Object.defineProperty(FilterChangedEvent.prototype, "fieldName", {
        get: function () {
            return this._fieldName;
        },
        enumerable: true,
        configurable: true
    });
    FilterChangedEvent.prototype.getFilterAsync = function () {
        var _this = this;
        return this._worksheet.getFiltersAsync().then(function (filters) {
            // TODO: Filtering of the filters should eventually be done platform side.
            var eventedFilter = filters.find(function (filter) { return (filter.fieldName === _this._fieldName); });
            if (!eventedFilter) {
                // We shouldn't hit this unless the filter was removed from the worksheet
                // after the event was raised.
                throw new TableauError_1.TableauError(Contract.ErrorCodes.MissingFilter, "cannot find filter: " + _this._fieldName);
            }
            return eventedFilter;
        });
    };
    return FilterChangedEvent;
}(TableauWorksheetEvent_1.TableauWorksheetEvent));
exports.FilterChangedEvent = FilterChangedEvent;


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Contract = __webpack_require__(0);
var TableauWorksheetEvent_1 = __webpack_require__(68);
var MarksSelectedEvent = /** @class */ (function (_super) {
    __extends(MarksSelectedEvent, _super);
    function MarksSelectedEvent(worksheet) {
        return _super.call(this, Contract.TableauEventType.MarkSelectionChanged, worksheet) || this;
    }
    MarksSelectedEvent.prototype.getMarksAsync = function () {
        return this.worksheet.getSelectedMarksAsync();
    };
    return MarksSelectedEvent;
}(TableauWorksheetEvent_1.TableauWorksheetEvent));
exports.MarksSelectedEvent = MarksSelectedEvent;


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var api_internal_contract_js_1 = __webpack_require__(1);
var CrossFrameDispatcher_1 = __webpack_require__(144);
// Checks to see if we are running in an iframe currently: https://stackoverflow.com/a/326076/8821153
function inIframe(thisWindow) {
    try {
        return thisWindow.self !== thisWindow.parent;
    }
    catch (e) {
        return true;
    }
}
/**
 * Attempts to bootstrap the extension with a cross-frame parent where Tableau is running
 *
 * @param thisWindow The window which we are running in (injected for unit testing purposes)
 * @param internalContractVersion The version number of the internal contract we are using
 * @returns A promise which is doing the actual bootstrapping
 */
function doCrossFrameBootstrap(thisWindow, internalContractVersion, options) {
    return new Promise(function (resolve, reject) {
        var parent;
        // Normally, we are running inside an iframe.  The exception to this is
        // when we are running as an extension inside a dialog as part of the UINamespace
        // functionality.  In that case, we want the opener of this window rather than the parent.
        if (!inIframe(thisWindow)) {
            parent = thisWindow.opener;
        }
        else {
            parent = thisWindow.parent;
        }
        if (!parent) {
            reject('This extension is not running inside an iframe, desktop, or popup window. Initialization failed.');
        }
        // Create the messenger which will do he communication between this window and our parent
        // Since we don't know where we are running yet, we have to make this initial origin '*'. Once
        // we have successfully initialized our extension, we will limit where we send messages
        var messenger = new api_internal_contract_js_1.CrossFrameMessenger(thisWindow, parent, '*');
        // Prepare to send an initialization message to the parent frame
        var initializationMessage = messenger.prepareInitializationMessage(internalContractVersion, api_internal_contract_js_1.MESSAGING_VERSION, options);
        // When we receive a response back from the parent, we check to make sure the guids match and then we know
        // that the parent is aware of us and we can start communicating
        messenger.setCommandResponseMessageHandler(function (msg) {
            // Verify we are getting a response from our initialize message
            if (msg.commandGuid === initializationMessage.messageGuid) {
                // The versioning of the dispatcher happens on the other side of our frame, and
                // in a wrapper on this side. This one doesn't have any version knowledge.
                var dispatcherFactory = function () { return new CrossFrameDispatcher_1.CrossFrameDispatcher(messenger); };
                resolve(dispatcherFactory);
            }
        });
        // Now that our handlers are ready, start listening and send our initialization message
        messenger.startListening();
        initializationMessage.send();
    });
}
exports.doCrossFrameBootstrap = doCrossFrameBootstrap;


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This is an implementation of the InternalApiDispatcher interface which functions by passing messages
 * across a frame boundary. This is usually between the code where our javscript library has been included
 * by a 3rd party dev and another frame where Tableau server has content.
 */
var CrossFrameDispatcher = /** @class */ (function () {
    /**
     * Creates an instance of CrossFrameDispatcher which will use the given messenger to communicate
     * @param _messenger an instantiated and listening messenger object
     */
    function CrossFrameDispatcher(_messenger) {
        this._messenger = _messenger;
        // Collection of pending promises which are waiting to be resolved. When we receive a response back from the other frame,
        // these promises can be either resolved or rejected
        this._pendingPromises = {};
        // The collection of notification handlers which have been registered with this dispatcher
        this._notificationHandlers = [];
        if (!this._messenger) {
            throw 'Missing messenger object';
        }
        // Set up our message handlers. We only care about incoming notifications and command responses
        this._messenger.setCommandResponseMessageHandler(this.onCommandResponse.bind(this));
        this._messenger.setNotificationMessageHandler(this.onNotification.bind(this));
    }
    ////// Start InternalApiDispatcher implementation
    CrossFrameDispatcher.prototype.execute = function (verb, parameters) {
        var _this = this;
        // To execute a verb, we first prepare a command message and then define a promise.
        var preparedMessage = this._messenger.prepareCommandMessage(verb, parameters);
        var promise = new Promise(function (resolve, reject) {
            // Save off the pending promise by the messageGuid we are about to send. When a response is
            // received, we'll be able to resolve this promise with the result
            _this._pendingPromises[preparedMessage.messageGuid] = { resolve: resolve, reject: reject };
        });
        // Actually send the message and return the promise
        preparedMessage.send();
        return promise;
    };
    CrossFrameDispatcher.prototype.registerNotificationHandler = function (handler) {
        this._notificationHandlers.push(handler);
    };
    CrossFrameDispatcher.prototype.unregisterNotificationHandler = function (handler) {
        this._notificationHandlers = this._notificationHandlers.filter(function (h) { return h !== handler; });
    };
    ////// End InternalApiDispatcher implementation
    CrossFrameDispatcher.prototype.onCommandResponse = function (response) {
        // We got a command response, look through the pending promises and resolve
        if (Object.keys(this._pendingPromises).indexOf(response.commandGuid) < 0) {
            return; // We don't have any reference to this command, just return
        }
        var pendingPromise = this._pendingPromises[response.commandGuid];
        // If we have an error defined, reject the promise
        if (response.error) {
            pendingPromise.reject(response.error);
        }
        // If we have data defined, resolve the promise
        if (response.data) {
            pendingPromise.resolve({ result: response.data });
        }
        // Clean up our pending promises object
        delete this._pendingPromises[response.commandGuid];
    };
    CrossFrameDispatcher.prototype.onNotification = function (notificationMessage) {
        // Go through each notification handler we have registered and let them know a notification came in
        for (var _i = 0, _a = this._notificationHandlers; _i < _a.length; _i++) {
            var handler = _a[_i];
            try {
                handler({ notificationId: notificationMessage.notificationId, data: notificationMessage.data });
            }
            catch (e) {
                // Ignore this. Wrap in try/catch so if one handler errors, the other still get the message
            }
        }
    };
    return CrossFrameDispatcher;
}());
exports.CrossFrameDispatcher = CrossFrameDispatcher;


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ServiceRegistry_1 = __webpack_require__(7);
var DataSourceServiceImpl_1 = __webpack_require__(146);
var FilterServiceImpl_1 = __webpack_require__(147);
var GetDataServiceImpl_1 = __webpack_require__(149);
var NotificationServiceImpl_1 = __webpack_require__(150);
var ParametersServiceImpl_1 = __webpack_require__(151);
var SelectionServiceImpl_1 = __webpack_require__(155);
var ZoneServiceImpl_1 = __webpack_require__(157);
function registerAllSharedServices(dispatcher) {
    ServiceRegistry_1.ApiServiceRegistry.instance.registerService(new DataSourceServiceImpl_1.DataSourceServiceImpl(dispatcher));
    ServiceRegistry_1.ApiServiceRegistry.instance.registerService(new GetDataServiceImpl_1.GetDataServiceImpl(dispatcher));
    ServiceRegistry_1.ApiServiceRegistry.instance.registerService(new FilterServiceImpl_1.FilterServiceImpl(dispatcher));
    ServiceRegistry_1.ApiServiceRegistry.instance.registerService(new NotificationServiceImpl_1.NotificationServiceImpl(dispatcher));
    ServiceRegistry_1.ApiServiceRegistry.instance.registerService(new ParametersServiceImpl_1.ParametersServiceImpl(dispatcher));
    ServiceRegistry_1.ApiServiceRegistry.instance.registerService(new SelectionServiceImpl_1.SelectionServiceImpl(dispatcher));
    ServiceRegistry_1.ApiServiceRegistry.instance.registerService(new ZoneServiceImpl_1.ZoneServiceImpl(dispatcher));
}
exports.registerAllSharedServices = registerAllSharedServices;


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var SharedApiExternalContract_1 = __webpack_require__(0);
var api_internal_contract_js_1 = __webpack_require__(1);
var ServiceImplBase_1 = __webpack_require__(12);
var TableauError_1 = __webpack_require__(4);
var Field_1 = __webpack_require__(67);
var FieldImpl_1 = __webpack_require__(66);
var DataSource_1 = __webpack_require__(64);
var DataSourceImpl_1 = __webpack_require__(65);
var DataSourceServiceImpl = /** @class */ (function (_super) {
    __extends(DataSourceServiceImpl, _super);
    function DataSourceServiceImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DataSourceServiceImpl.prototype, "serviceName", {
        get: function () {
            return "data-source-service" /* DataSourceService */;
        },
        enumerable: true,
        configurable: true
    });
    DataSourceServiceImpl.prototype.refreshAsync = function (dataSourceId) {
        var _a;
        var parameters = (_a = {},
            _a[api_internal_contract_js_1.ParameterId.DataSourceId] = dataSourceId,
            _a[api_internal_contract_js_1.ParameterId.DeltaTimeMs] = 0,
            _a[api_internal_contract_js_1.ParameterId.ShouldRefreshDS] = true,
            _a);
        return this.execute(api_internal_contract_js_1.VerbId.RefreshDataSource, parameters).then(function (response) {
            return;
        });
    };
    DataSourceServiceImpl.prototype.getActiveTablesAsync = function (dataSourceId) {
        var _a;
        var joinParameters = (_a = {}, _a[api_internal_contract_js_1.ParameterId.DataSourceId] = dataSourceId, _a);
        // Get the description of the tables used by this connection
        return this.execute(api_internal_contract_js_1.VerbId.GetActiveTables, joinParameters).then(function (joinResponse) {
            var tableInfos = joinResponse.result;
            // getActiveTables is unsupported for cubes and GA. We do not have a connection type property
            // available from the platform (intentionally, to reduce code churn as new connections are added).
            // Instead,just check if any tables are returned. This array will be empty for any non-table based datasource.
            if (tableInfos.tables.length === 0) {
                throw new TableauError_1.TableauError(SharedApiExternalContract_1.ErrorCodes.UnsupportedMethodForDataSourceType, "getActiveTables is not supported for: " + dataSourceId);
            }
            return tableInfos.tables;
        });
    };
    DataSourceServiceImpl.prototype.getDataSourcesAsync = function (visualId) {
        var _a;
        var parameters = (_a = {}, _a[api_internal_contract_js_1.ParameterId.VisualId] = visualId, _a);
        return this.execute(api_internal_contract_js_1.VerbId.GetDataSources, parameters).then(function (response) {
            var dataSchema = response.result;
            return dataSchema;
        });
    };
    DataSourceServiceImpl.prototype.getConnectionSummariesAsync = function (dataSourceId) {
        var _a;
        var params = (_a = {}, _a[api_internal_contract_js_1.ParameterId.DataSourceId] = dataSourceId, _a);
        // Get the description of the tables used by this connection
        return this.execute(api_internal_contract_js_1.VerbId.GetConnectionDescriptionSummaries, params).then(function (response) {
            var descriptionSummaries = response.result;
            return descriptionSummaries;
        });
    };
    DataSourceServiceImpl.prototype.getFieldAsync = function (fieldId) {
        var _this = this;
        var _a;
        var fieldIdComponents = this.parseFieldId(fieldId);
        var dataSourceId = fieldIdComponents[1];
        var fieldName = fieldIdComponents[2];
        var verb = api_internal_contract_js_1.VerbId.GetDataSource;
        var parameters = (_a = {}, _a[api_internal_contract_js_1.ParameterId.DataSourceId] = dataSourceId, _a);
        return this.execute(verb, parameters).then(function (response) {
            var dataSource = response.result;
            var field = dataSource.fields.find(function (f) {
                return f.name === fieldName;
            });
            if (field === undefined) {
                throw new TableauError_1.TableauError(SharedApiExternalContract_1.ErrorCodes.InternalError, "Unable to find field with id '" + fieldId + "'");
            }
            return _this.convertField(field, _this.convertDataSource(dataSource));
        });
    };
    DataSourceServiceImpl.prototype.convertField = function (field, dataSource) {
        return new Field_1.Field(new FieldImpl_1.FieldImpl(field, dataSource));
    };
    DataSourceServiceImpl.prototype.convertDataSource = function (dataSource) {
        return new DataSource_1.DataSource(new DataSourceImpl_1.DataSourceImpl(dataSource));
    };
    DataSourceServiceImpl.prototype.parseFieldId = function (fieldId) {
        // we can expect exec to return a match to the entire field id at element 0, the datasource id at element 1
        // and the field name at element 2. Field id format is [dataSoucreId].[fieldName]
        return /^\[(.+)\]\.\[(.+)\]$/.exec(fieldId);
    };
    return DataSourceServiceImpl;
}(ServiceImplBase_1.ServiceImplBase));
exports.DataSourceServiceImpl = DataSourceServiceImpl;


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Contract = __webpack_require__(0);
var api_internal_contract_js_1 = __webpack_require__(1);
var ExternalToInternalEnumMappings_1 = __webpack_require__(71);
var InternalToExternalEnumMappings_1 = __webpack_require__(14);
var FilterModels_1 = __webpack_require__(148);
var ServiceImplBase_1 = __webpack_require__(12);
var GetDataModels_1 = __webpack_require__(44);
var Param_1 = __webpack_require__(43);
var FilterServiceImpl = /** @class */ (function (_super) {
    __extends(FilterServiceImpl, _super);
    function FilterServiceImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(FilterServiceImpl.prototype, "serviceName", {
        get: function () {
            return "filter-service" /* Filter */;
        },
        enumerable: true,
        configurable: true
    });
    FilterServiceImpl.prototype.applyFilterAsync = function (visualId, fieldName, values, updateType, filterOptions) {
        var verb = api_internal_contract_js_1.VerbId.ApplyCategoricalFilter;
        var parameters = {};
        parameters[api_internal_contract_js_1.ParameterId.VisualId] = visualId;
        parameters[api_internal_contract_js_1.ParameterId.FieldName] = fieldName;
        parameters[api_internal_contract_js_1.ParameterId.FilterValues] = values;
        parameters[api_internal_contract_js_1.ParameterId.FilterUpdateType] = ExternalToInternalEnumMappings_1.ExternalToInternalEnumMappings.filterUpdateType.convert(updateType);
        parameters[api_internal_contract_js_1.ParameterId.IsExcludeMode] =
            (filterOptions === undefined || filterOptions.isExcludeMode === undefined) ? false : filterOptions.isExcludeMode;
        return this.execute(verb, parameters).then(function (response) {
            return fieldName;
        });
    };
    FilterServiceImpl.prototype.applyRangeFilterAsync = function (visualId, fieldName, filterOptions) {
        var verb = api_internal_contract_js_1.VerbId.ApplyRangeFilter;
        var parameters = {};
        if (filterOptions.min) {
            var min = void 0;
            if (filterOptions.min instanceof Date) {
                min = Param_1.Param.serializeDateForPlatform(filterOptions.min);
            }
            else {
                min = filterOptions.min;
            }
            parameters[api_internal_contract_js_1.ParameterId.FilterRangeMin] = min;
        }
        if (filterOptions.max) {
            var max = void 0;
            if (filterOptions.max instanceof Date) {
                max = Param_1.Param.serializeDateForPlatform(filterOptions.max);
            }
            else {
                max = filterOptions.max;
            }
            parameters[api_internal_contract_js_1.ParameterId.FilterRangeMax] = max;
        }
        // The null option is used with min+max for 'include-range' or 'include-range-or-null'
        if (filterOptions.nullOption) {
            parameters[api_internal_contract_js_1.ParameterId.FilterRangeNullOption] = ExternalToInternalEnumMappings_1.ExternalToInternalEnumMappings.nullOptions.convert(filterOptions.nullOption);
        }
        parameters[api_internal_contract_js_1.ParameterId.FieldName] = fieldName;
        parameters[api_internal_contract_js_1.ParameterId.VisualId] = visualId;
        return this.execute(verb, parameters).then(function (response) {
            return fieldName;
        });
    };
    FilterServiceImpl.prototype.clearFilterAsync = function (visualId, fieldName) {
        var verb = api_internal_contract_js_1.VerbId.ClearFilter;
        var parameters = {};
        parameters[api_internal_contract_js_1.ParameterId.VisualId] = visualId;
        parameters[api_internal_contract_js_1.ParameterId.FieldName] = fieldName;
        return this.execute(verb, parameters).then(function (resposne) {
            return fieldName;
        });
    };
    FilterServiceImpl.prototype.getFiltersAsync = function (visualId) {
        var _this = this;
        var verb = api_internal_contract_js_1.VerbId.GetFilters;
        var parameters = {};
        parameters[api_internal_contract_js_1.ParameterId.VisualId] = visualId;
        return this.execute(verb, parameters).then(function (response) {
            var filters = response.result;
            return _this.convertDomainFilters(filters);
        });
    };
    FilterServiceImpl.prototype.getCategoricalDomainAsync = function (worksheetName, fieldId, domainType) {
        var _this = this;
        var verb = api_internal_contract_js_1.VerbId.GetCategoricalDomain;
        var parameters = {};
        parameters[api_internal_contract_js_1.ParameterId.VisualId] = {
            worksheet: worksheetName
        };
        parameters[api_internal_contract_js_1.ParameterId.FieldId] = fieldId;
        parameters[api_internal_contract_js_1.ParameterId.DomainType] = ExternalToInternalEnumMappings_1.ExternalToInternalEnumMappings.filterDomainType.convert(domainType);
        return this.execute(verb, parameters).then(function (response) {
            var domain = response.result;
            return _this.convertCategoricalDomain(domain, domainType);
        });
    };
    FilterServiceImpl.prototype.getRangeDomainAsync = function (worksheetName, fieldId, domainType) {
        var _this = this;
        var verb = api_internal_contract_js_1.VerbId.GetRangeDomain;
        var parameters = {};
        parameters[api_internal_contract_js_1.ParameterId.VisualId] = {
            worksheet: worksheetName
        };
        parameters[api_internal_contract_js_1.ParameterId.FieldId] = fieldId;
        parameters[api_internal_contract_js_1.ParameterId.DomainType] = ExternalToInternalEnumMappings_1.ExternalToInternalEnumMappings.filterDomainType.convert(domainType);
        return this.execute(verb, parameters).then(function (response) {
            var domain = response.result;
            return _this.convertRangeDomain(domain, domainType);
        });
    };
    // Helper Methods
    FilterServiceImpl.prototype.convertDomainFilters = function (domainFilters) {
        var _this = this;
        var filters = [];
        domainFilters.forEach(function (domainFilter) {
            switch (domainFilter.filterType) {
                case api_internal_contract_js_1.FilterType.Categorical: {
                    var filter = domainFilter;
                    if (filter) {
                        filters.push(_this.convertCategoricalFilter(filter));
                    }
                    else {
                        throw new Error('Invalid Categorical Filter');
                    }
                    break;
                }
                case api_internal_contract_js_1.FilterType.Range: {
                    var filter = domainFilter;
                    if (filter) {
                        filters.push(_this.convertRangeFilter(filter));
                    }
                    else {
                        throw new Error('Invalid Range Filter');
                    }
                    break;
                }
                case api_internal_contract_js_1.FilterType.RelativeDate: {
                    var filter = domainFilter;
                    if (filter) {
                        filters.push(_this.convertRelativeDateFilter(filter));
                    }
                    else {
                        throw new Error('Invalid Relative Date Filter');
                    }
                    break;
                }
                default: {
                    break;
                }
            }
        });
        return filters;
    };
    FilterServiceImpl.prototype.convertCategoricalFilter = function (domainFilter) {
        console.log('we are in filter in tableau api', domainFilter);
        var appliedValues = domainFilter.values.map(function (dv) {
            return new GetDataModels_1.DataValue(dv.value, dv.formattedValue);
        });
        return new FilterModels_1.CategoricalFilter(domainFilter.visualId.worksheet, domainFilter.fieldCaption, domainFilter.fieldName, Contract.FilterType.Categorical, appliedValues, domainFilter.isExclude);
    };
    FilterServiceImpl.prototype.convertRangeFilter = function (domainFilter) {
        var minValue = new GetDataModels_1.DataValue(domainFilter.min.value, domainFilter.min.formattedValue);
        var maxValue = new GetDataModels_1.DataValue(domainFilter.max.value, domainFilter.max.formattedValue);
        return new FilterModels_1.RangeFilter(domainFilter.visualId.worksheet, domainFilter.fieldCaption, domainFilter.fieldName, Contract.FilterType.Range, minValue, maxValue, domainFilter.includeNullValues);
    };
    FilterServiceImpl.prototype.convertRelativeDateFilter = function (domainFilter) {
        var anchorDateValue = new GetDataModels_1.DataValue(domainFilter.anchorDate.value, domainFilter.anchorDate.formattedValue);
        return new FilterModels_1.RelativeDateFilter(domainFilter.visualId.worksheet, domainFilter.fieldCaption, domainFilter.fieldName, Contract.FilterType.RelativeDate, anchorDateValue, InternalToExternalEnumMappings_1.InternalToExternalEnumMappings.dateStepPeriod.convert(domainFilter.periodType), InternalToExternalEnumMappings_1.InternalToExternalEnumMappings.dateRangeType.convert(domainFilter.rangeType), domainFilter.rangeN);
    };
    FilterServiceImpl.prototype.convertCategoricalDomain = function (domain, domainType) {
        var values = domain.values.map(function (domainDv) {
            return new GetDataModels_1.DataValue(domainDv.value, domainDv.formattedValue);
        });
        return new FilterModels_1.CategoricalDomain(values, domainType);
    };
    FilterServiceImpl.prototype.convertRangeDomain = function (domain, domainType) {
        var min = new GetDataModels_1.DataValue(domain.min.value, domain.min.formattedValue);
        var max = new GetDataModels_1.DataValue(domain.max.value, domain.max.formattedValue);
        return new FilterModels_1.RangeDomain(min, max, domainType);
    };
    return FilterServiceImpl;
}(ServiceImplBase_1.ServiceImplBase));
exports.FilterServiceImpl = FilterServiceImpl;


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Contract = __webpack_require__(0);
var ServiceRegistry_1 = __webpack_require__(7);
var ErrorHelpers_1 = __webpack_require__(8);
var Filter = /** @class */ (function () {
    function Filter(_worksheetName, _fieldName, _filterType, _fieldId) {
        this._worksheetName = _worksheetName;
        this._fieldName = _fieldName;
        this._filterType = _filterType;
        this._fieldId = _fieldId;
    }
    Object.defineProperty(Filter.prototype, "worksheetName", {
        get: function () {
            return this._worksheetName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Filter.prototype, "fieldName", {
        get: function () {
            return this._fieldName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Filter.prototype, "fieldId", {
        get: function () {
            return this._fieldId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Filter.prototype, "filterType", {
        get: function () {
            return this._filterType;
        },
        enumerable: true,
        configurable: true
    });
    Filter.prototype.getFieldAsync = function () {
        var service = ServiceRegistry_1.ApiServiceRegistry.instance.getService("data-source-service" /* DataSourceService */);
        return service.getFieldAsync(this._fieldId);
    };
    return Filter;
}());
exports.Filter = Filter;
var CategoricalFilter = /** @class */ (function (_super) {
    __extends(CategoricalFilter, _super);
    function CategoricalFilter(worksheetName, fieldName, fieldId, filterType, _appliedValues, _isExcludeMode) {
        var _this = _super.call(this, worksheetName, fieldName, filterType, fieldId) || this;
        _this._appliedValues = _appliedValues;
        _this._isExcludeMode = _isExcludeMode;
        return _this;
    }
    Object.defineProperty(CategoricalFilter.prototype, "appliedValues", {
        get: function () {
            return this._appliedValues;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CategoricalFilter.prototype, "isExcludeMode", {
        get: function () {
            return this._isExcludeMode;
        },
        enumerable: true,
        configurable: true
    });
    CategoricalFilter.prototype.getDomainAsync = function (domainType) {
        if (!domainType) {
            domainType = Contract.FilterDomainType.Relevant;
        }
        ErrorHelpers_1.ErrorHelpers.verifyEnumValue(domainType, Contract.FilterDomainType);
        var service = ServiceRegistry_1.ApiServiceRegistry.instance.getService("filter-service" /* Filter */);
        return service.getCategoricalDomainAsync(this._worksheetName, this._fieldId, domainType);
    };
    return CategoricalFilter;
}(Filter));
exports.CategoricalFilter = CategoricalFilter;
var RangeFilter = /** @class */ (function (_super) {
    __extends(RangeFilter, _super);
    function RangeFilter(worksheetName, fieldName, fieldId, filterType, _min, _max, _includeNullValues) {
        var _this = _super.call(this, worksheetName, fieldName, filterType, fieldId) || this;
        _this._min = _min;
        _this._max = _max;
        _this._includeNullValues = _includeNullValues;
        return _this;
    }
    Object.defineProperty(RangeFilter.prototype, "minValue", {
        get: function () {
            return this._min;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RangeFilter.prototype, "maxValue", {
        get: function () {
            return this._max;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RangeFilter.prototype, "includeNullValues", {
        get: function () {
            return this._includeNullValues;
        },
        enumerable: true,
        configurable: true
    });
    RangeFilter.prototype.getDomainAsync = function (domainType) {
        var service = ServiceRegistry_1.ApiServiceRegistry.instance.getService("filter-service" /* Filter */);
        if (!domainType) {
            domainType = Contract.FilterDomainType.Relevant;
        }
        ErrorHelpers_1.ErrorHelpers.verifyEnumValue(domainType, Contract.FilterDomainType);
        return service.getRangeDomainAsync(this._worksheetName, this._fieldId, domainType);
    };
    return RangeFilter;
}(Filter));
exports.RangeFilter = RangeFilter;
var RelativeDateFilter = /** @class */ (function (_super) {
    __extends(RelativeDateFilter, _super);
    function RelativeDateFilter(worksheetName, fieldName, fieldId, filterType, _anchorDate, _periodType, _rangeType, _rangeN) {
        var _this = _super.call(this, worksheetName, fieldName, filterType, fieldId) || this;
        _this._anchorDate = _anchorDate;
        _this._periodType = _periodType;
        _this._rangeType = _rangeType;
        _this._rangeN = _rangeN;
        return _this;
    }
    Object.defineProperty(RelativeDateFilter.prototype, "anchorDate", {
        get: function () {
            return this._anchorDate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RelativeDateFilter.prototype, "periodType", {
        get: function () {
            return this._periodType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RelativeDateFilter.prototype, "rangeType", {
        get: function () {
            return this._rangeType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RelativeDateFilter.prototype, "rangeN", {
        get: function () {
            return this._rangeN;
        },
        enumerable: true,
        configurable: true
    });
    return RelativeDateFilter;
}(Filter));
exports.RelativeDateFilter = RelativeDateFilter;
var CategoricalDomain = /** @class */ (function () {
    function CategoricalDomain(_values, _domainType) {
        this._values = _values;
        this._domainType = _domainType;
    }
    Object.defineProperty(CategoricalDomain.prototype, "values", {
        get: function () {
            return this._values;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CategoricalDomain.prototype, "type", {
        get: function () {
            return this._domainType;
        },
        enumerable: true,
        configurable: true
    });
    return CategoricalDomain;
}());
exports.CategoricalDomain = CategoricalDomain;
var RangeDomain = /** @class */ (function () {
    function RangeDomain(_min, _max, _domainType) {
        this._min = _min;
        this._max = _max;
        this._domainType = _domainType;
    }
    Object.defineProperty(RangeDomain.prototype, "type", {
        get: function () {
            return this._domainType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RangeDomain.prototype, "min", {
        get: function () {
            return this._min;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RangeDomain.prototype, "max", {
        get: function () {
            return this._max;
        },
        enumerable: true,
        configurable: true
    });
    return RangeDomain;
}());
exports.RangeDomain = RangeDomain;


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var api_internal_contract_js_1 = __webpack_require__(1);
var ServiceImplBase_1 = __webpack_require__(12);
var GetDataModels_1 = __webpack_require__(44);
var GetDataService_1 = __webpack_require__(70);
var GetDataServiceImpl = /** @class */ (function (_super) {
    __extends(GetDataServiceImpl, _super);
    function GetDataServiceImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(GetDataServiceImpl.prototype, "serviceName", {
        get: function () {
            return "get-data-service" /* GetData */;
        },
        enumerable: true,
        configurable: true
    });
    GetDataServiceImpl.prototype.getMaxRowLimit = function () {
        return 10000;
    };
    GetDataServiceImpl.prototype.getLimitedMaxRows = function (requestedRows) {
        var rowCountLimit = this.getMaxRowLimit() + 1;
        return (requestedRows > 0 && requestedRows < rowCountLimit) ? requestedRows : rowCountLimit;
    };
    GetDataServiceImpl.prototype.getUnderlyingDataAsync = function (visualId, getType, ignoreAliases, ignoreSelection, includeAllColumns, maxRows) {
        var _this = this;
        // Create all of our parameters
        var verb = getType === GetDataService_1.GetDataType.Summary ? api_internal_contract_js_1.VerbId.GetDataSummaryData : api_internal_contract_js_1.VerbId.GetUnderlyingData;
        var requestMaxRows = verb === api_internal_contract_js_1.VerbId.GetUnderlyingData ? this.getLimitedMaxRows(maxRows) : maxRows;
        var parameters = {};
        parameters[api_internal_contract_js_1.ParameterId.VisualId] = visualId;
        parameters[api_internal_contract_js_1.ParameterId.IgnoreAliases] = ignoreAliases;
        parameters[api_internal_contract_js_1.ParameterId.IgnoreSelection] = ignoreSelection;
        parameters[api_internal_contract_js_1.ParameterId.IncludeAllColumns] = includeAllColumns;
        parameters[api_internal_contract_js_1.ParameterId.MaxRows] = requestMaxRows;
        return this.execute(verb, parameters).then(function (response) {
            var responseData = response.result;
            return _this.processResultsTable(responseData.data, responseData.isSummary);
        });
    };
    GetDataServiceImpl.prototype.getSelectedMarksAsync = function (visualId) {
        var _this = this;
        var _a;
        var parameters = (_a = {}, _a[api_internal_contract_js_1.ParameterId.VisualId] = visualId, _a);
        return this.execute(api_internal_contract_js_1.VerbId.GetSelectedMarks, parameters).then(function (response) {
            var responseData = response.result;
            return {
                data: responseData.data.map(function (table) { return _this.processResultsTable(table, true); })
            };
        });
    };
    GetDataServiceImpl.prototype.getHighlightedMarksAsync = function (visualId) {
        var _this = this;
        var _a;
        var parameters = (_a = {}, _a[api_internal_contract_js_1.ParameterId.VisualId] = visualId, _a);
        return this.execute(api_internal_contract_js_1.VerbId.GetHighlightedMarks, parameters).then(function (response) {
            var responseData = response.result;
            return {
                data: responseData.data.map(function (table) { return _this.processResultsTable(table, true); })
            };
        });
    };
    GetDataServiceImpl.prototype.getDataSourceDataAsync = function (dataSourceId, ignoreAliases, maxRows, columnsToInclude) {
        var _this = this;
        var _a;
        var parameters = (_a = {},
            _a[api_internal_contract_js_1.ParameterId.DataSourceId] = dataSourceId,
            _a[api_internal_contract_js_1.ParameterId.IgnoreAliases] = ignoreAliases,
            _a[api_internal_contract_js_1.ParameterId.MaxRows] = this.getLimitedMaxRows(maxRows),
            _a[api_internal_contract_js_1.ParameterId.ColumnsToInclude] = columnsToInclude,
            _a);
        return this.execute(api_internal_contract_js_1.VerbId.GetDataSourceData, parameters).then(function (response) {
            var responseData = response.result;
            return _this.processResultsTable(responseData.data, false);
        });
    };
    GetDataServiceImpl.prototype.processResultsTable = function (responseData, isSummary) {
        var headers = responseData.headers.map(function (h) { return new GetDataModels_1.Column(h.fieldCaption, h.dataType, h.isReferenced, h.index); });
        // TODO This should be controlled by a flag indicating whether this api will respond marks info or not
        var marks;
        if (responseData.marks) {
            marks = responseData.marks.map(function (h) { return new GetDataModels_1.MarkInfo(h.type, h.color, h.tupleId); });
        }
        // Limit+1 is our sentinal that underlying data contains more rows than user is allowed to fetch.
        // Remove the last element so we always return MaxRowLimit
        var isTotalRowCountLimited = isSummary === false && responseData.dataTable.length === this.getMaxRowLimit() + 1;
        if (isTotalRowCountLimited) {
            responseData.dataTable.length -= 1;
        }
        var table = responseData.dataTable.map(function (row) {
            return row.map(function (cell) {
                return new GetDataModels_1.DataValue(cell.value, cell.formattedValue);
            });
        });
        if (marks) {
            return new GetDataModels_1.DataTable(table, headers, table.length, isTotalRowCountLimited, isSummary, marks);
        }
        return new GetDataModels_1.DataTable(table, headers, table.length, isTotalRowCountLimited, isSummary);
    };
    return GetDataServiceImpl;
}(ServiceImplBase_1.ServiceImplBase));
exports.GetDataServiceImpl = GetDataServiceImpl;


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Registration = /** @class */ (function () {
    function Registration(_filterFn, _callbackFn) {
        this._filterFn = _filterFn;
        this._callbackFn = _callbackFn;
        // Nothing Here
    }
    Registration.prototype.onNotification = function (notificationModel) {
        if (this._filterFn(notificationModel)) {
            this._callbackFn(notificationModel);
        }
    };
    return Registration;
}());
var NotificationServiceImpl = /** @class */ (function () {
    function NotificationServiceImpl(dispatcher) {
        this.dispatcher = dispatcher;
        this._handlers = {};
        this.dispatcher.registerNotificationHandler(this.onNotification.bind(this));
    }
    Object.defineProperty(NotificationServiceImpl.prototype, "serviceName", {
        get: function () {
            return "notification-service" /* Notification */;
        },
        enumerable: true,
        configurable: true
    });
    NotificationServiceImpl.prototype.registerHandler = function (id, filterFn, handler) {
        var _this = this;
        var handlers = this._handlers[id] || new Array();
        var registration = new Registration(filterFn, handler);
        handlers.push(registration);
        this._handlers[id] = handlers;
        return function () { return _this.removeRegistration(id, registration); };
    };
    NotificationServiceImpl.prototype.hasHandlersForNotificationType = function (id) {
        return this._handlers.hasOwnProperty(id);
    };
    NotificationServiceImpl.prototype.onNotification = function (notification) {
        if (!this.hasHandlersForNotificationType(notification.notificationId)) {
            return;
        }
        // Go through and check for all the handlers of this particular notification
        this._handlers[notification.notificationId].forEach(function (h) { return h.onNotification(notification.data); });
    };
    NotificationServiceImpl.prototype.removeRegistration = function (id, registration) {
        if (!this.hasHandlersForNotificationType(id)) {
            return;
        }
        this._handlers[id] = this._handlers[id].filter(function (reg) { return reg !== registration; });
    };
    return NotificationServiceImpl;
}());
exports.NotificationServiceImpl = NotificationServiceImpl;


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Contract = __webpack_require__(0);
var api_internal_contract_js_1 = __webpack_require__(1);
var ServiceImplBase_1 = __webpack_require__(12);
var ParameterImpl_1 = __webpack_require__(152);
var Parameter_1 = __webpack_require__(154);
var TableauError_1 = __webpack_require__(4);
var ParametersServiceImpl = /** @class */ (function (_super) {
    __extends(ParametersServiceImpl, _super);
    function ParametersServiceImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ParametersServiceImpl.prototype, "serviceName", {
        get: function () {
            return "parameters-service" /* Parameters */;
        },
        enumerable: true,
        configurable: true
    });
    ParametersServiceImpl.prototype.getParametersForSheetAsync = function (sheetPath, sheet) {
        var _a;
        var parameters = (_a = {},
            _a[api_internal_contract_js_1.ParameterId.SheetPath] = sheetPath,
            _a);
        return this.execute(api_internal_contract_js_1.VerbId.GetParametersForSheet, parameters).then(function (response) {
            // TODO - Check for error
            var result = response.result;
            return result.map(function (parameterInfo) {
                var impl = new ParameterImpl_1.ParameterImpl(parameterInfo);
                return new Parameter_1.Parameter(impl, sheet);
            });
        });
    };
    ParametersServiceImpl.prototype.changeParameterValueAsync = function (fieldName, newValue) {
        var _a;
        var parameters = (_a = {},
            _a[api_internal_contract_js_1.ParameterId.ParameterFieldName] = fieldName,
            _a[api_internal_contract_js_1.ParameterId.ParameterValue] = newValue,
            _a);
        return this.execute(api_internal_contract_js_1.VerbId.ChangeParameterValue, parameters).then(function (response) {
            var result = response.result;
            return result;
        });
    };
    ParametersServiceImpl.prototype.findParameterByNameAsync = function (name, sheet) {
        return this.findParameterAsync(sheet, name, undefined);
    };
    ParametersServiceImpl.prototype.findParameterByGlobalFieldNameAsync = function (fieldName, sheet) {
        return this.findParameterAsync(sheet, undefined, fieldName);
    };
    ParametersServiceImpl.prototype.findParameterAsync = function (sheet, name, fieldName) {
        var parameters = {};
        if (name !== undefined) {
            parameters[api_internal_contract_js_1.ParameterId.ParameterCaption] = name;
        }
        else if (fieldName !== undefined) {
            parameters[api_internal_contract_js_1.ParameterId.ParameterFieldName] = fieldName;
        }
        else {
            throw new TableauError_1.TableauError(Contract.ErrorCodes.InvalidParameter, 'name or fieldName must be provided to find parameter');
        }
        return this.execute(api_internal_contract_js_1.VerbId.FindParameter, parameters).then(function (response) {
            var instanceOfParameterInfo = function (object) {
                return 'fieldName' in object;
            };
            // We need to check to see if we got a valid response back again
            if (instanceOfParameterInfo(response.result)) {
                var result = response.result;
                var impl = new ParameterImpl_1.ParameterImpl(result);
                return new Parameter_1.Parameter(impl, sheet);
            }
            else {
                return undefined;
            }
        });
    };
    return ParametersServiceImpl;
}(ServiceImplBase_1.ServiceImplBase));
exports.ParametersServiceImpl = ParametersServiceImpl;


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Contract = __webpack_require__(0);
var api_internal_contract_js_1 = __webpack_require__(1);
var InternalToExternalEnumMappings_1 = __webpack_require__(14);
var ParameterChangedEvent_1 = __webpack_require__(153);
var GetDataModels_1 = __webpack_require__(44);
var ServiceRegistry_1 = __webpack_require__(7);
var SingleEventManagerImpl_1 = __webpack_require__(42);
var ErrorHelpers_1 = __webpack_require__(8);
var Param_1 = __webpack_require__(43);
var ParameterImpl = /** @class */ (function () {
    function ParameterImpl(parameterInfo) {
        this.setParameterInfo(parameterInfo);
    }
    Object.defineProperty(ParameterImpl.prototype, "name", {
        get: function () {
            return this._parameterInfo.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParameterImpl.prototype, "currentValue", {
        get: function () {
            return new GetDataModels_1.DataValue(this._parameterInfo.currentValue.value, this._parameterInfo.currentValue.formattedValue);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParameterImpl.prototype, "dataType", {
        get: function () {
            return InternalToExternalEnumMappings_1.InternalToExternalEnumMappings.dataType.convert(this._parameterInfo.dataType);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParameterImpl.prototype, "id", {
        get: function () {
            return this._globalFieldName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParameterImpl.prototype, "allowableValues", {
        get: function () {
            return this._allowableValues;
        },
        enumerable: true,
        configurable: true
    });
    ParameterImpl.prototype.changeValueAsync = function (newValue) {
        var _this = this;
        ErrorHelpers_1.ErrorHelpers.verifyParameter(newValue, 'newValue');
        var coercedValue = Param_1.Param.serializeParamterValue(newValue);
        var parametersService = ServiceRegistry_1.ApiServiceRegistry.instance.getService("parameters-service" /* Parameters */);
        return parametersService.changeParameterValueAsync(this._globalFieldName, coercedValue).then(function (parameterInfo) {
            _this.setParameterInfo(parameterInfo);
            return _this.currentValue;
        });
    };
    /**
     * Helper method which goes through and registers each event type this impl knows about
     * with the NotificationService. It returns an array of SingleEventManager objects which
     * can then be passed to an EventListenerManager to handle user registration / unregistration.
     *
     * @param sheet The sheet object which will be included with the event notifications
     * @returns {Array<SingleEventManager>} Collection of event managers to pass to an EventListenerManager
     */
    ParameterImpl.prototype.initializeEvents = function (sheet) {
        var _this = this;
        ErrorHelpers_1.ErrorHelpers.verifyInternalValue(sheet, 'sheet');
        var results = new Array();
        var notificationService;
        try {
            notificationService = ServiceRegistry_1.ApiServiceRegistry.instance.getService("notification-service" /* Notification */);
        }
        catch (e) {
            // If we don't have this service registered, just return
            return results;
        }
        // Initialize all of the event managers we'll need (one for each event type)
        var parameterEvent = new SingleEventManagerImpl_1.SingleEventManagerImpl(Contract.TableauEventType.ParameterChanged);
        notificationService.registerHandler(api_internal_contract_js_1.NotificationId.ParameterChanged, function (model) {
            var fieldName = model;
            return fieldName === _this._globalFieldName;
        }, function (fieldName) {
            parameterEvent.triggerEvent(function () { return new ParameterChangedEvent_1.ParameterChangedEvent(fieldName, sheet); });
        });
        results.push(parameterEvent);
        return results;
    };
    ParameterImpl.prototype.setParameterInfo = function (parameterInfo) {
        this._parameterInfo = parameterInfo;
        this._globalFieldName = parameterInfo.fieldName;
        var type = InternalToExternalEnumMappings_1.InternalToExternalEnumMappings.allowableValues.convert(parameterInfo.allowableValuesType);
        var listValues;
        var minValue;
        var maxValue;
        var stepSize;
        var dateStepPeriod;
        if (type === Contract.ParameterValueType.List) {
            var values = parameterInfo.allowableValues || [];
            listValues = values.map(function (val) { return new GetDataModels_1.DataValue(val.value, val.formattedValue); });
        }
        else if (type === Contract.ParameterValueType.Range) {
            minValue = parameterInfo.minValue && new GetDataModels_1.DataValue(parameterInfo.minValue.value, parameterInfo.minValue.formattedValue);
            maxValue = parameterInfo.maxValue && new GetDataModels_1.DataValue(parameterInfo.maxValue.value, parameterInfo.maxValue.formattedValue);
            stepSize = parameterInfo.stepSize;
            dateStepPeriod = parameterInfo.dateStepPeriod &&
                InternalToExternalEnumMappings_1.InternalToExternalEnumMappings.dateStepPeriod.convert(parameterInfo.dateStepPeriod);
        }
        this._allowableValues = {
            type: type,
            allowableValues: listValues,
            minValue: minValue,
            maxValue: maxValue,
            stepSize: stepSize,
            dateStepPeriod: dateStepPeriod
        };
    };
    return ParameterImpl;
}());
exports.ParameterImpl = ParameterImpl;


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Contract = __webpack_require__(0);
var ServiceRegistry_1 = __webpack_require__(7);
var TableauError_1 = __webpack_require__(4);
var TableauSheetEvent_1 = __webpack_require__(69);
var ParameterChangedEvent = /** @class */ (function (_super) {
    __extends(ParameterChangedEvent, _super);
    function ParameterChangedEvent(_globalFieldName, sheet) {
        var _this = _super.call(this, Contract.TableauEventType.ParameterChanged, sheet) || this;
        _this._globalFieldName = _globalFieldName;
        return _this;
    }
    ParameterChangedEvent.prototype.getParameterAsync = function () {
        var _this = this;
        // Call down to our service to get the parameter back via its field name
        var service = ServiceRegistry_1.ApiServiceRegistry.instance.getService("parameters-service" /* Parameters */);
        return service.findParameterByGlobalFieldNameAsync(this._globalFieldName, this.sheet).then(function (parameter) {
            if (parameter === undefined) {
                throw new TableauError_1.TableauError(Contract.ErrorCodes.MissingParameter, "Cannot find parameter: " + _this._globalFieldName);
            }
            return parameter;
        });
    };
    return ParameterChangedEvent;
}(TableauSheetEvent_1.TableauSheetEvent));
exports.ParameterChangedEvent = ParameterChangedEvent;


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var EventListenerManager_1 = __webpack_require__(39);
/**
 * Implementation of the Parameter contract. Calls down to the impl
 * class for almost all of the work it does.
 */
var Parameter = /** @class */ (function (_super) {
    __extends(Parameter, _super);
    function Parameter(parameterImpl, sheet) {
        var _this = _super.call(this) || this;
        _this.parameterImpl = parameterImpl;
        // Initialize our event handling for this class
        _this.parameterImpl.initializeEvents(sheet).forEach(function (e) { return _this.addNewEventType(e); });
        return _this;
    }
    Object.defineProperty(Parameter.prototype, "name", {
        get: function () {
            return this.parameterImpl.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Parameter.prototype, "currentValue", {
        get: function () {
            return this.parameterImpl.currentValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Parameter.prototype, "dataType", {
        get: function () {
            return this.parameterImpl.dataType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Parameter.prototype, "allowableValues", {
        get: function () {
            return this.parameterImpl.allowableValues;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Parameter.prototype, "id", {
        get: function () {
            return this.parameterImpl.id;
        },
        enumerable: true,
        configurable: true
    });
    Parameter.prototype.changeValueAsync = function (newValue) {
        return this.parameterImpl.changeValueAsync(newValue);
    };
    return Parameter;
}(EventListenerManager_1.EventListenerManager));
exports.Parameter = Parameter;


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Contract = __webpack_require__(0);
var api_internal_contract_js_1 = __webpack_require__(1);
var SelectionModels_1 = __webpack_require__(156);
var ServiceImplBase_1 = __webpack_require__(12);
var TableauError_1 = __webpack_require__(4);
var SelectionServiceImpl = /** @class */ (function (_super) {
    __extends(SelectionServiceImpl, _super);
    function SelectionServiceImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SelectionServiceImpl.prototype, "serviceName", {
        get: function () {
            return "selection-service" /* Selection */;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Method to clear all the selected marks for the given worksheet.
     *
     * @param visualId
     */
    SelectionServiceImpl.prototype.clearSelectedMarksAsync = function (visualId) {
        var _a;
        var parameters = (_a = {}, _a[api_internal_contract_js_1.ParameterId.VisualId] = visualId, _a);
        return this.execute(api_internal_contract_js_1.VerbId.ClearSelectedMarks, parameters).then(function (response) {
            return; // Expecting an empty model and hence the void response.
        });
    };
    /**
     * Method to select marks for the given worksheet.
     *
     * @param visualId
     * @param selectionCriteria
     * @param selectionUpdateType
     */
    SelectionServiceImpl.prototype.selectMarksByValueAsync = function (visualId, selectionCriterias, selectionUpdateType) {
        var _a;
        if (selectionCriterias.length === 0) {
            throw new TableauError_1.TableauError(Contract.ErrorCodes.InvalidParameter, 'Selection criteria missing for selecting marks by value');
        }
        var selectionType = this.validateSelectionUpdateType(selectionUpdateType);
        var selectionCriteriaType = this.validateSelectionCriteria(selectionCriterias[0]);
        var selectionModelContainer = this.parseSelectionMarks(selectionCriterias, selectionCriteriaType);
        var parameters = (_a = {},
            _a[api_internal_contract_js_1.ParameterId.VisualId] = visualId,
            _a[api_internal_contract_js_1.ParameterId.SelectionUpdateType] = selectionType,
            _a);
        switch (selectionCriteriaType) {
            case SelectionCriteriaType.HierarchicalType: {
                parameters[api_internal_contract_js_1.ParameterId.HierValSelectionModels] = selectionModelContainer.hierModelArr;
                break;
            }
            case SelectionCriteriaType.RangeType: {
                parameters[api_internal_contract_js_1.ParameterId.QuantRangeSelectionModels] = selectionModelContainer.quantModelArr;
                break;
            }
            case SelectionCriteriaType.DimensionType: {
                parameters[api_internal_contract_js_1.ParameterId.DimValSelectionModels] = selectionModelContainer.dimModelArr;
                break;
            }
            default:
                break;
        }
        return this.execute(api_internal_contract_js_1.VerbId.SelectByValue, parameters).then(function (response) {
            // Expecting an empty model and hence the void response.
            return;
            // TODO Investigate the error response with multiple output params and throw error accordingly.
        });
    };
    /**
   * Method to select marks for the given worksheet.
   *
   * @param visualId
   * @param MarkInfo
   * @param selectionUpdateType
   */
    SelectionServiceImpl.prototype.selectMarksByIdAsync = function (visualId, marks, selectionUpdateType) {
        var _a;
        if (marks.length === 0) {
            throw new TableauError_1.TableauError(Contract.ErrorCodes.InvalidParameter, 'Marks info missing for selecting marks by Id');
        }
        var selectionType = this.validateSelectionUpdateType(selectionUpdateType);
        var selectionModelContainer = this.parseSelectionIds(marks);
        var parameters = (_a = {},
            _a[api_internal_contract_js_1.ParameterId.VisualId] = visualId,
            _a[api_internal_contract_js_1.ParameterId.SelectionUpdateType] = selectionType,
            _a[api_internal_contract_js_1.ParameterId.Selection] = selectionModelContainer.selection,
            _a);
        return this.execute(api_internal_contract_js_1.VerbId.SelectByValue, parameters).then(function (response) {
            // Expecting an empty model and hence the void response.
            return;
            // TODO Investigate the error response with multiple output params and throw error accordingly.
        });
    };
    /**
     * Method to prepare the pres models for selection by MarksInfo
     * @param marks
     */
    SelectionServiceImpl.prototype.parseSelectionIds = function (marks) {
        var ids = [];
        var selectionModelContainer = new SelectionModels_1.SelectionModelsContainer();
        for (var i = 0; i < marks.length; i++) {
            var tupleId = marks[i].tupleId;
            if (tupleId !== undefined && tupleId !== null) { // If tuple id is provided use that instead of pair
                ids.push(tupleId.toString()); // collect the tuple ids
            }
            else {
                throw new TableauError_1.TableauError(Contract.ErrorCodes.InternalError, 'tupleId parsing error');
            }
        }
        if (ids.length !== 0) { // tuple ids based selection
            var tupleSelectionModel = new SelectionModels_1.TupleSelectionModel();
            tupleSelectionModel.selectionType = 'tuples';
            tupleSelectionModel.objectIds = ids;
            selectionModelContainer.selection = tupleSelectionModel;
        }
        return selectionModelContainer;
    };
    /**
     * Method to prepare the pres models for selection by values.
     *
     * Supports 3 types for selection:
     * 1) hierarchical value based selection
     * 2) range value based selection
     * 3) Dimension value based selection
     *
     * @param marks
     * @param hierModelArr
     * @param dimModelArr
     * @param quantModelArr
     * @param selection
     */
    SelectionServiceImpl.prototype.parseSelectionMarks = function (selectionCriterias, selectionType) {
        var selectionModelContainer = new SelectionModels_1.SelectionModelsContainer();
        var mixedSelectionsError = false;
        for (var i = 0; i < selectionCriterias.length; i++) {
            var st = selectionCriterias[i];
            if (st.fieldName && (st.value !== undefined && st.value !== null)) {
                var catRegex = new RegExp('(\[[A-Za-z0-9]+]).*', 'g');
                var rangeOption = st.value;
                if (catRegex.test(st.fieldName)) { // Hierarchical value selection
                    if (selectionType === SelectionCriteriaType.HierarchicalType) {
                        var hierModel = this.addToParamsList(st.fieldName, st.value);
                        selectionModelContainer.hierModelArr.push(hierModel);
                    }
                    else {
                        mixedSelectionsError = true;
                        break;
                    }
                }
                else if (rangeOption.min !== undefined
                    && rangeOption.max !== undefined) { // Range value selection
                    if (selectionType === SelectionCriteriaType.RangeType) {
                        var quantModel = this.addToRangeParamsList(st.fieldName, rangeOption);
                        selectionModelContainer.quantModelArr.push(quantModel);
                    }
                    else {
                        mixedSelectionsError = true;
                        break;
                    }
                }
                else { // Dimension value selection
                    if (selectionType === SelectionCriteriaType.DimensionType) {
                        var dimModel = this.addToParamsList(st.fieldName, st.value);
                        selectionModelContainer.dimModelArr.push(dimModel);
                    }
                    else {
                        mixedSelectionsError = true;
                        break;
                    }
                }
            }
        }
        if (mixedSelectionsError) {
            throw new TableauError_1.TableauError(Contract.ErrorCodes.InternalError, 'Selection Criteria parsing error');
        }
        return selectionModelContainer;
    };
    /**
     *
     * @param selectionCriterias Validate and determine the selection criterias type.
     */
    SelectionServiceImpl.prototype.validateSelectionCriteria = function (selectionCriteria) {
        var selectionType;
        // Determine the type of selection, this command is by looking at the first selection
        var crit = selectionCriteria;
        var catRegex = new RegExp('(\[[A-Za-z0-9]+]).*', 'g');
        var rangeOption = crit.value;
        if (crit.fieldName && (crit.value !== undefined && crit.value !== null)) {
            if (catRegex.test(crit.fieldName)) { // Hierarchical value selection
                selectionType = SelectionCriteriaType.HierarchicalType;
            }
            else if (rangeOption.min !== undefined
                && rangeOption.max !== undefined) { // Range value selection
                selectionType = SelectionCriteriaType.RangeType;
            }
            else { // Dimersion value selection
                selectionType = SelectionCriteriaType.DimensionType;
            }
        }
        else {
            throw new TableauError_1.TableauError(Contract.ErrorCodes.InternalError, 'Selection Criteria parsing error');
        }
        return selectionType;
    };
    /**
     * Method to transform the key value pair into value based pres model object.
     *
     * @param valueSelectionModel
     * @param fieldName
     * @param value
     */
    SelectionServiceImpl.prototype.addToParamsList = function (fieldName, value) {
        var valueSelectionModel = new SelectionModels_1.ValueSelectionModel();
        var markValues = [];
        if (value instanceof Array) {
            var valueArr = value;
            for (var i = 0; i < valueArr.length; i++) {
                markValues.push(valueArr[i].toString());
            }
        }
        else {
            markValues.push(value.toString());
        }
        valueSelectionModel.qualifiedFieldCaption = fieldName;
        valueSelectionModel.selectValues = markValues;
        return valueSelectionModel;
    };
    /**
     * Method to transform the key value pair into range based selection pres model.
     *
     * TODO: Need to handle the parsing of date type values.
     *
     * @param valueSelectionModel
     * @param fieldName
     * @param value
     */
    SelectionServiceImpl.prototype.addToRangeParamsList = function (fieldName, value) {
        var rangeSelectionModel = new SelectionModels_1.RangeSelectionModel();
        rangeSelectionModel.qualifiedFieldCaption = fieldName;
        if (value.max !== undefined && value.max !== null) {
            rangeSelectionModel.maxValue = value.max.toString();
        }
        if (value.min !== undefined && value.min !== null) {
            rangeSelectionModel.minValue = value.min.toString();
        }
        rangeSelectionModel.included = this.validateNullOptionType(value.nullOption);
        return rangeSelectionModel;
    };
    /**
     * Method to validate the selection update type.
     *
     * @param selectionUpdateType
     */
    SelectionServiceImpl.prototype.validateSelectionUpdateType = function (selectionUpdateType) {
        if (selectionUpdateType === Contract.SelectionUpdateType.Replace) {
            return api_internal_contract_js_1.SelectionUpdateType.Replace;
        }
        else if (selectionUpdateType === Contract.SelectionUpdateType.Add) {
            return api_internal_contract_js_1.SelectionUpdateType.Add;
        }
        else if (selectionUpdateType === Contract.SelectionUpdateType.Remove) {
            return api_internal_contract_js_1.SelectionUpdateType.Remove;
        }
        return api_internal_contract_js_1.SelectionUpdateType.Replace;
    };
    /**
     * Method to validate the include type for range selection.
     *
     * @param nullOption
     */
    SelectionServiceImpl.prototype.validateNullOptionType = function (nullOption) {
        if (nullOption) {
            if (nullOption === Contract.FilterNullOption.NullValues) {
                return api_internal_contract_js_1.QuantitativeIncludedValues.IncludeNull;
            }
            else if (nullOption === Contract.FilterNullOption.NonNullValues) {
                return api_internal_contract_js_1.QuantitativeIncludedValues.IncludeNonNull;
            }
            else if (nullOption === Contract.FilterNullOption.AllValues) {
                return api_internal_contract_js_1.QuantitativeIncludedValues.IncludeAll;
            }
        }
        return api_internal_contract_js_1.QuantitativeIncludedValues.IncludeAll;
    };
    return SelectionServiceImpl;
}(ServiceImplBase_1.ServiceImplBase));
exports.SelectionServiceImpl = SelectionServiceImpl;
/**
 * Enum for the different selection criteria types.
 */
var SelectionCriteriaType;
(function (SelectionCriteriaType) {
    SelectionCriteriaType[SelectionCriteriaType["HierarchicalType"] = 1] = "HierarchicalType";
    SelectionCriteriaType[SelectionCriteriaType["RangeType"] = 2] = "RangeType";
    SelectionCriteriaType[SelectionCriteriaType["DimensionType"] = 3] = "DimensionType";
    SelectionCriteriaType[SelectionCriteriaType["TuplesType"] = 4] = "TuplesType";
})(SelectionCriteriaType || (SelectionCriteriaType = {}));


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Selection Model.
 */
var SelectionModel = /** @class */ (function () {
    function SelectionModel() {
    }
    return SelectionModel;
}());
exports.SelectionModel = SelectionModel;
/**
 * Value based selection model. Meant for hierarchical, range and categorical selections.
 */
var ValueSelectionModel = /** @class */ (function (_super) {
    __extends(ValueSelectionModel, _super);
    function ValueSelectionModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectValues = [];
        return _this;
    }
    return ValueSelectionModel;
}(SelectionModel));
exports.ValueSelectionModel = ValueSelectionModel;
/**
 * Hierarchical value selection model
 */
var HierarchicalSelectionModel = /** @class */ (function (_super) {
    __extends(HierarchicalSelectionModel, _super);
    function HierarchicalSelectionModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return HierarchicalSelectionModel;
}(ValueSelectionModel));
exports.HierarchicalSelectionModel = HierarchicalSelectionModel;
/**
 * Range based value selection model
 */
var RangeSelectionModel = /** @class */ (function (_super) {
    __extends(RangeSelectionModel, _super);
    function RangeSelectionModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RangeSelectionModel;
}(SelectionModel));
exports.RangeSelectionModel = RangeSelectionModel;
/**
 * Dimension value selection model
 */
var DimensionSelectionModel = /** @class */ (function (_super) {
    __extends(DimensionSelectionModel, _super);
    function DimensionSelectionModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DimensionSelectionModel;
}(ValueSelectionModel));
exports.DimensionSelectionModel = DimensionSelectionModel;
/**
 * Tuple based selection model
 */
var TupleSelectionModel = /** @class */ (function () {
    function TupleSelectionModel() {
        this.objectIds = [];
    }
    return TupleSelectionModel;
}());
exports.TupleSelectionModel = TupleSelectionModel;
/**
 * Container class to populate all the selection models when parsing input
 */
var SelectionModelsContainer = /** @class */ (function () {
    function SelectionModelsContainer() {
        this.hierModelArr = [];
        this.dimModelArr = [];
        this.quantModelArr = [];
    }
    return SelectionModelsContainer;
}());
exports.SelectionModelsContainer = SelectionModelsContainer;


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorHelpers_1 = __webpack_require__(8);
var ExternalToInternalEnumMappings_1 = __webpack_require__(71);
var api_internal_contract_js_1 = __webpack_require__(1);
var ServiceImplBase_1 = __webpack_require__(12);
var SharedApiExternalContract_1 = __webpack_require__(0);
var ZoneServiceImpl = /** @class */ (function (_super) {
    __extends(ZoneServiceImpl, _super);
    function ZoneServiceImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ZoneServiceImpl.prototype, "serviceName", {
        get: function () {
            return "zone-service" /* Zone */;
        },
        enumerable: true,
        configurable: true
    });
    ZoneServiceImpl.prototype.setVisibilityAsync = function (dashboard, dashboardObjects, zoneVisibilityMap) {
        var _a;
        Object.keys(zoneVisibilityMap).forEach(function (key) {
            ErrorHelpers_1.ErrorHelpers.verifyEnumValue(zoneVisibilityMap[key], SharedApiExternalContract_1.ZoneVisibilityType);
            ErrorHelpers_1.ErrorHelpers.verifyZoneIsValid(dashboardObjects, Number.parseInt(key, 10));
        });
        var parameters = (_a = {},
            _a[api_internal_contract_js_1.ParameterId.Dashboard] = dashboard,
            _a[api_internal_contract_js_1.ParameterId.ZoneIdsVisibilityMap] = {},
            _a);
        Object.keys(zoneVisibilityMap).forEach(function (key) {
            parameters[api_internal_contract_js_1.ParameterId.ZoneIdsVisibilityMap][key] = ExternalToInternalEnumMappings_1.ExternalToInternalEnumMappings.setVisibilityType.convert(zoneVisibilityMap[key]);
        });
        return this.execute(api_internal_contract_js_1.VerbId.SetZoneVisibility, parameters).then(function (response) {
            return;
        });
    };
    return ZoneServiceImpl;
}(ServiceImplBase_1.ServiceImplBase));
exports.ZoneServiceImpl = ZoneServiceImpl;


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Implementation of the external DashboardContent namespace.
 * This does not follow the Impl pattern as DashboardContent is
 * currently just a (single) property bag.
 */
var DashboardContent = /** @class */ (function () {
    function DashboardContent(_dashboard) {
        this._dashboard = _dashboard;
    }
    Object.defineProperty(DashboardContent.prototype, "dashboard", {
        get: function () {
            return this._dashboard;
        },
        enumerable: true,
        configurable: true
    });
    return DashboardContent;
}());
exports.DashboardContent = DashboardContent;


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ApiShared_1 = __webpack_require__(5);
/**
 * Implementation of the external environment namespace.
 * Environment does not follow the Impl pattern as it is
 * just a property bag.
 */
var Environment = /** @class */ (function () {
    function Environment(extensionEnvironment) {
        this._apiVersion = ApiShared_1.VersionNumber.Instance && ApiShared_1.VersionNumber.Instance.formattedValue; // maj.min.fix (no build)
        this._context = ApiShared_1.InternalToExternalEnumMappings.extensionContext.convert(extensionEnvironment.extensionContext);
        this._language = extensionEnvironment.extensionLanguage;
        this._locale = extensionEnvironment.extensionLocale;
        this._mode = ApiShared_1.InternalToExternalEnumMappings.extensionMode.convert(extensionEnvironment.extensionMode);
        this._operatingSystem = extensionEnvironment.operatingSystem;
        this._tableauVersion = extensionEnvironment.tableauVersion;
    }
    Object.defineProperty(Environment.prototype, "apiVersion", {
        get: function () {
            return this._apiVersion;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Environment.prototype, "context", {
        get: function () {
            return this._context;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Environment.prototype, "language", {
        get: function () {
            return this._language;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Environment.prototype, "locale", {
        get: function () {
            return this._locale;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Environment.prototype, "mode", {
        get: function () {
            return this._mode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Environment.prototype, "operatingSystem", {
        get: function () {
            return this._operatingSystem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Environment.prototype, "tableauVersion", {
        get: function () {
            return this._tableauVersion;
        },
        enumerable: true,
        configurable: true
    });
    return Environment;
}());
exports.Environment = Environment;


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ApiShared_1 = __webpack_require__(5);
var InitializationServiceImpl_1 = __webpack_require__(161);
var SettingsServiceImpl_1 = __webpack_require__(162);
var UIServiceImpl_1 = __webpack_require__(163);
function registerAllExtensionsServices(dispatcher) {
    ApiShared_1.ApiServiceRegistry.instance.registerService(new SettingsServiceImpl_1.SettingsServiceImpl(dispatcher));
    ApiShared_1.ApiServiceRegistry.instance.registerService(new UIServiceImpl_1.UIServiceImpl(dispatcher));
}
exports.registerAllExtensionsServices = registerAllExtensionsServices;
function registerInitializationExtensionsServices(dispatcher) {
    ApiShared_1.ApiServiceRegistry.instance.registerService(new InitializationServiceImpl_1.InitializationServiceImpl(dispatcher));
}
exports.registerInitializationExtensionsServices = registerInitializationExtensionsServices;


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ApiShared_1 = __webpack_require__(5);
var api_internal_contract_js_1 = __webpack_require__(1);
var InitializationServiceImpl = /** @class */ (function (_super) {
    __extends(InitializationServiceImpl, _super);
    function InitializationServiceImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(InitializationServiceImpl.prototype, "serviceName", {
        get: function () {
            return "InitializationService" /* InitializationService */;
        },
        enumerable: true,
        configurable: true
    });
    InitializationServiceImpl.prototype.initializeDashboardExtensionsAsync = function (isExtensionDialog, contextMenuIds) {
        var _a;
        var params = (_a = {},
            _a[api_internal_contract_js_1.ParameterId.ExtensionContextMenuIds] = contextMenuIds,
            _a[api_internal_contract_js_1.ParameterId.IsExtensionDialog] = isExtensionDialog,
            _a);
        return this.execute(api_internal_contract_js_1.VerbId.InitializeExtension, params).then(function (response) {
            // TODO - Validate return value
            var result = response.result;
            return result;
        });
    };
    return InitializationServiceImpl;
}(ApiShared_1.ServiceImplBase));
exports.InitializationServiceImpl = InitializationServiceImpl;


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ExtensionsApiExternalContract_1 = __webpack_require__(15);
var ApiShared_1 = __webpack_require__(5);
var api_internal_contract_js_1 = __webpack_require__(1);
var ApiShared_2 = __webpack_require__(5);
var SettingsServiceImpl = /** @class */ (function (_super) {
    __extends(SettingsServiceImpl, _super);
    function SettingsServiceImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SettingsServiceImpl.prototype, "serviceName", {
        get: function () {
            return "SettingsService" /* SettingsService */;
        },
        enumerable: true,
        configurable: true
    });
    SettingsServiceImpl.prototype.saveSettingsAsync = function (settings) {
        var _a;
        var parameters = (_a = {}, _a[api_internal_contract_js_1.ParameterId.SettingsValues] = settings, _a);
        return this.execute(api_internal_contract_js_1.VerbId.SaveExtensionSettings, parameters).then(function (value) {
            var result = value.result;
            if (!result || !result.settingsValues) {
                throw new ApiShared_2.TableauError(ExtensionsApiExternalContract_1.ErrorCodes.InternalError, 'Unexpected error savings settings.');
            }
            return (result.settingsValues);
        });
    };
    return SettingsServiceImpl;
}(ApiShared_1.ServiceImplBase));
exports.SettingsServiceImpl = SettingsServiceImpl;


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ExtensionsApiExternalContract_1 = __webpack_require__(15);
var api_internal_contract_js_1 = __webpack_require__(1);
var ApiShared_1 = __webpack_require__(5);
var DEFAULT_DIALOG_HEIGHT = 400; // in pixels
var DEFAULT_DIALOG_WIDTH = 600; // in pixels
var UIServiceImpl = /** @class */ (function (_super) {
    __extends(UIServiceImpl, _super);
    function UIServiceImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UIServiceImpl.prototype, "serviceName", {
        get: function () {
            return "UIService" /* UIService */;
        },
        enumerable: true,
        configurable: true
    });
    UIServiceImpl.prototype.displayDialogAsync = function (url, payload, options) {
        var _a;
        var parameters = (_a = {},
            _a[api_internal_contract_js_1.ParameterId.ExtensionDialogUrl] = url,
            _a[api_internal_contract_js_1.ParameterId.ExtensionDialogPayload] = payload,
            _a);
        var h = ((options) && (options.height)) ? options.height : DEFAULT_DIALOG_HEIGHT;
        var w = ((options) && (options.width)) ? options.width : DEFAULT_DIALOG_WIDTH;
        // On the platform side, we do something reasonable regardess of whether the passed
        // height and width are too large or too small.  But this likely indicates a developer error,
        // so we throw an error here to help with debugging.
        if (h <= 0 || w <= 0) {
            throw new ApiShared_1.TableauError(ExtensionsApiExternalContract_1.ErrorCodes.InvalidParameter, 'Size parameters for displayDialogAsync must be positive');
        }
        parameters[api_internal_contract_js_1.ParameterId.ExtensionDialogH] = h;
        parameters[api_internal_contract_js_1.ParameterId.ExtensionDialogW] = w;
        return this.execute(api_internal_contract_js_1.VerbId.DisplayDialog, parameters).then(function (response) {
            var dialogResult = response.result;
            switch (dialogResult) {
                case api_internal_contract_js_1.ExtensionDialogResult.DialogAlreadyOpen:
                    throw new ApiShared_1.TableauError(ExtensionsApiExternalContract_1.ErrorCodes.DialogAlreadyOpen, 'There already exists an open dialog for this extension.');
                case api_internal_contract_js_1.ExtensionDialogResult.InvalidDomain:
                    throw new ApiShared_1.TableauError(ExtensionsApiExternalContract_1.ErrorCodes.InvalidDomainDialog, 'The url of an extension dialog must match the domain of the parent extension.');
                default: // Success case
                    return;
            }
        });
    };
    UIServiceImpl.prototype.closeDialog = function (payload) {
        var _a;
        var parameters = (payload) ? (_a = {}, _a[api_internal_contract_js_1.ParameterId.ExtensionDialogPayload] = payload, _a) : {};
        return this.execute(api_internal_contract_js_1.VerbId.CloseDialog, parameters).then(function (response) {
            return;
        });
    };
    return UIServiceImpl;
}(ApiShared_1.ServiceImplBase));
exports.UIServiceImpl = UIServiceImpl;


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ApiShared_1 = __webpack_require__(5);
/**
 * Implementation of the external settings namespace.
 */
var Settings = /** @class */ (function (_super) {
    __extends(Settings, _super);
    function Settings(_settingsImpl) {
        var _this = _super.call(this) || this;
        _this._settingsImpl = _settingsImpl;
        // Initialize our event handling for this class
        _this._settingsImpl.initializeEvents().forEach(function (e) { return _this.addNewEventType(e); });
        return _this;
    }
    Settings.prototype.erase = function (key) {
        this._settingsImpl.erase(key);
    };
    Settings.prototype.get = function (key) {
        return this._settingsImpl.get(key);
    };
    Settings.prototype.getAll = function () {
        return this._settingsImpl.getAll();
    };
    Object.defineProperty(Settings.prototype, "isModified", {
        get: function () {
            return this._settingsImpl.isModified;
        },
        enumerable: true,
        configurable: true
    });
    Settings.prototype.saveAsync = function () {
        return this._settingsImpl.saveAsync();
    };
    Settings.prototype.set = function (key, value) {
        this._settingsImpl.set(key, value);
    };
    return Settings;
}(ApiShared_1.EventListenerManager));
exports.Settings = Settings;


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Contract = __webpack_require__(15);
var api_internal_contract_js_1 = __webpack_require__(1);
var ApiShared_1 = __webpack_require__(5);
var SettingsChangedEvent = /** @class */ (function (_super) {
    __extends(SettingsChangedEvent, _super);
    function SettingsChangedEvent(_newSettings) {
        var _this = _super.call(this, Contract.TableauEventType.SettingsChanged) || this;
        _this._newSettings = _newSettings;
        return _this;
    }
    Object.defineProperty(SettingsChangedEvent.prototype, "newSettings", {
        get: function () {
            return this._newSettings;
        },
        enumerable: true,
        configurable: true
    });
    return SettingsChangedEvent;
}(ApiShared_1.TableauEvent));
var SettingsImpl = /** @class */ (function () {
    function SettingsImpl(settingsInfo) {
        // Since promises can't be introspected for state, keep a variable that
        // indicates a save is in progress, so that set/erase can't be called during a save.
        this._saveInProgress = false;
        this.initializeSettings(settingsInfo);
    }
    SettingsImpl.prototype.erase = function (key) {
        ApiShared_1.ErrorHelpers.verifyParameter(key, 'key');
        // Only make a modification if we have the key already
        if (this._currentSettings[key]) {
            this.verifySettingsAreUnlocked();
            delete this._currentSettings[key];
            this._isModified = true;
        }
    };
    SettingsImpl.prototype.get = function (key) {
        ApiShared_1.ErrorHelpers.verifyParameter(key, 'key');
        return this._currentSettings[key];
    };
    SettingsImpl.prototype.getAll = function () {
        // Returns a mutable copy of the settings
        return Object.assign({}, this._currentSettings);
    };
    Object.defineProperty(SettingsImpl.prototype, "isModified", {
        get: function () {
            return this._isModified;
        },
        enumerable: true,
        configurable: true
    });
    SettingsImpl.prototype.saveAsync = function () {
        var _this = this;
        this.verifySettingsAreUnlocked();
        // Just resolve immediately if settings are unchanged
        if (!this._isModified) {
            return Promise.resolve(this._currentSettings);
        }
        this._saveInProgress = true;
        // Use the settings service to save settings to twb
        var settingsService = ApiShared_1.ApiServiceRegistry.instance.getService("SettingsService" /* SettingsService */);
        return settingsService.saveSettingsAsync(this._currentSettings).then(function (newSettings) {
            _this._saveInProgress = false;
            _this._isModified = false;
            if (_this._currentSettings === undefined) {
                _this._currentSettings = newSettings;
            }
            else {
                Object.assign(_this._currentSettings, newSettings);
            }
            return newSettings;
        });
    };
    SettingsImpl.prototype.set = function (key, value) {
        ApiShared_1.ErrorHelpers.verifyStringParameter(key, 'key'); // Key shouldn't be an empty string.
        ApiShared_1.ErrorHelpers.verifyParameter(value, 'value'); // Empty string value is allowed.
        this.verifySettingsAreUnlocked();
        this._currentSettings[key] = value;
        this._isModified = true;
    };
    /**
     * Initializes all events relevant to settings object.  This is only a settingsUpdate event currently.
     *
     * @returns {Array<SingleEventManager>} Collection of event managers to pass to an EventListenerManager.
     */
    SettingsImpl.prototype.initializeEvents = function () {
        var _this = this;
        var results = new Array();
        var notificationService;
        try {
            notificationService = ApiShared_1.ApiServiceRegistry.instance.getService("notification-service" /* Notification */);
        }
        catch (e) {
            // If we don't have this service registered, just return
            return results;
        }
        var settingsChangedEvent = new ApiShared_1.SingleEventManagerImpl(Contract.TableauEventType.SettingsChanged);
        notificationService.registerHandler(api_internal_contract_js_1.NotificationId.SettingsChanged, function (model) {
            return true;
        }, function (event) {
            _this._currentSettings = event.newSettings;
            settingsChangedEvent.triggerEvent(function () { return new SettingsChangedEvent(event.newSettings); });
        });
        results.push(settingsChangedEvent);
        return results;
    };
    SettingsImpl.prototype.initializeSettings = function (settingsInfo) {
        ApiShared_1.ErrorHelpers.verifyParameter(settingsInfo, 'settingsInfo');
        ApiShared_1.ErrorHelpers.verifyParameter(settingsInfo.settingsValues, 'settingsInfo.SettingsValues');
        this._currentSettings = settingsInfo.settingsValues;
        // Reset the isModified flag
        this._isModified = false;
    };
    /**
     * This helper should be called before any local update to this.currentSettings.
     * Checks if a current save call is still in progress and throws an error if so.
     */
    SettingsImpl.prototype.verifySettingsAreUnlocked = function () {
        if (this._saveInProgress) {
            throw new ApiShared_1.TableauError(Contract.ErrorCodes.SettingSaveInProgress, SettingsImpl.ASYNC_SAVE_IN_PROGRESS);
        }
    };
    SettingsImpl.ASYNC_SAVE_IN_PROGRESS = 'Async Save is in progress, updating settings is not allowed.';
    return SettingsImpl;
}());
exports.SettingsImpl = SettingsImpl;


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Implementation of the external UI namespace.
 */
var UI = /** @class */ (function () {
    function UI(_impl) {
        this._impl = _impl;
    }
    UI.prototype.displayDialogAsync = function (url, payload, options) {
        return this._impl.displayDialogAsync(url, payload, options);
    };
    UI.prototype.closeDialog = function (payload) {
        this._impl.closeDialog(payload);
    };
    return UI;
}());
exports.UI = UI;


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Contract = __webpack_require__(15);
var api_internal_contract_js_1 = __webpack_require__(1);
var ApiShared_1 = __webpack_require__(5);
var UIImpl = /** @class */ (function () {
    function UIImpl() {
    }
    UIImpl.prototype.displayDialogAsync = function (url, payload, options) {
        var uiService = ApiShared_1.ApiServiceRegistry.instance.getService("UIService" /* UIService */);
        var notificationService = ApiShared_1.ApiServiceRegistry.instance.getService("notification-service" /* Notification */);
        return new Promise(function (resolve, reject) {
            uiService.displayDialogAsync(url, payload || '', options).then(function () {
                var unregisterFn = notificationService.registerHandler(api_internal_contract_js_1.NotificationId.ExtensionDialogUpdate, function (model) {
                    return true; // Let through any dialog update event
                }, function (event) {
                    if (event.isCloseEvent) {
                        resolve(event.closePayload);
                    }
                    else {
                        reject(new ApiShared_1.TableauError(Contract.ErrorCodes.DialogClosedByUser, 'Extension dialog closed by user.'));
                    }
                    unregisterFn();
                });
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    UIImpl.prototype.closeDialog = function (payload) {
        var uiService = ApiShared_1.ApiServiceRegistry.instance.getService("UIService" /* UIService */);
        uiService.closeDialog(payload);
    };
    return UIImpl;
}());
exports.UIImpl = UIImpl;


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var api_internal_contract_js_1 = __webpack_require__(1);
/**
 * Implementation of the InternalApiDispatcher which supports upgrading and downgrading the input
 * internal contract to the version that this module is built against
 *
 * @class VersionedExternalApiDispatcher
 * @implements {InternalApiDispatcher}
 */
var VersionedExternalApiDispatcher = /** @class */ (function () {
    /**
     * Creates a new instance of the VersionedExternalApiDispatcher
     * We have multiple version converting dispatchers that work together.
     * If needed, the VersionedExternalApiDispatcher wraps either the InternalApiDispatcher (desktop)
     * or the CrossFrameDispatcher (server).
     * The Internal/CrossFrame dispatchers handle an updated platform with an older external library.
     * (The CrossFrameDispatcher sends messages across the frame, and it is handled by the PresLayerHandler.)
     * Meanwhile, the VersionedExternalApiDispatcher handles an updated external library with an older platform.
  
     * @param _apiDelegateDispatcher The delegate that does the actual work.
     * @param platformVersionNumber The version of the internal contract which the platform module is using.
     * This number will be used to figure out how to downgrade incoming commands and upgrade the results
     */
    function VersionedExternalApiDispatcher(_apiDelegateDispatcher, platformVersionNumber) {
        var _this = this;
        this._apiDelegateDispatcher = _apiDelegateDispatcher;
        this._versionConverter = api_internal_contract_js_1.CreateExternalCompatibleVersionConverter(api_internal_contract_js_1.INTERNAL_CONTRACT_VERSION, platformVersionNumber);
        this._notificationHandlers = [];
        _apiDelegateDispatcher.registerNotificationHandler(function (notification) {
            if (_this._notificationHandlers.length === 0) {
                return;
            }
            var upgradedNotification = _this._versionConverter.upgradeNotification(notification);
            _this._notificationHandlers.forEach(function (handler) {
                handler(upgradedNotification);
            });
        });
    }
    VersionedExternalApiDispatcher.needsVersionConverter = function (platformVersion) {
        // If our platform is less than external library version, then we need a converter
        return api_internal_contract_js_1.VersionLessThan(platformVersion, api_internal_contract_js_1.INTERNAL_CONTRACT_VERSION);
    };
    VersionedExternalApiDispatcher.prototype.execute = function (verb, parameters) {
        var _this = this;
        var downgradeParameters = this._versionConverter.downgradeExecuteCall(verb, parameters);
        return this._apiDelegateDispatcher.execute(downgradeParameters.verb, downgradeParameters.parameters).then(function (response) {
            var upgradeResponse = _this._versionConverter.upgradeExecuteReturn(response);
            return upgradeResponse;
        });
    };
    VersionedExternalApiDispatcher.prototype.registerNotificationHandler = function (handler) {
        this._notificationHandlers.push(handler);
    };
    VersionedExternalApiDispatcher.prototype.unregisterNotificationHandler = function (handler) {
        this._notificationHandlers = this._notificationHandlers.filter(function (h) { return h !== handler; });
    };
    return VersionedExternalApiDispatcher;
}());
exports.VersionedExternalApiDispatcher = VersionedExternalApiDispatcher;


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Implementation of the external Extensions namespace.
 */
var Extensions = /** @class */ (function () {
    function Extensions(extensionImpl) {
        this.extensionImpl = extensionImpl;
        this.extensionImpl = extensionImpl;
    }
    Object.defineProperty(Extensions.prototype, "dashboardContent", {
        get: function () {
            return this.extensionImpl.dashboardContent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Extensions.prototype, "environment", {
        get: function () {
            return this.extensionImpl.environment;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Extensions.prototype, "settings", {
        get: function () {
            return this.extensionImpl.settings;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Extensions.prototype, "ui", {
        get: function () {
            return this.extensionImpl.ui;
        },
        enumerable: true,
        configurable: true
    });
    Extensions.prototype.initializeAsync = function (contextMenuCallbacks) {
        return this.extensionImpl.initializeAsync(false, contextMenuCallbacks).then();
    };
    Extensions.prototype.initializeDialogAsync = function () {
        return this.extensionImpl.initializeAsync(true);
    };
    return Extensions;
}());
exports.Extensions = Extensions;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzQ2YzVjMzY4Y2YxMzdlNWU4MDMiLCJ3ZWJwYWNrOi8vLy4uLy4uL3NyYy9TaGFyZWRBcGlFeHRlcm5hbENvbnRyYWN0LnRzIiwid2VicGFjazovLy8uLi8uLi9zcmMvSnNBcGlJbnRlcm5hbENvbnRyYWN0LnRzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL193a3MuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vc3JjL0FwaVNoYXJlZC9UYWJsZWF1RXJyb3IudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uL3NyYy9BcGlTaGFyZWQudHMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL3NyYy9BcGlTaGFyZWQvU2VydmljZXMvU2VydmljZVJlZ2lzdHJ5LnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9zcmMvQXBpU2hhcmVkL1V0aWxzL0Vycm9ySGVscGVycy50cyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pcy1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2V4cG9ydC5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vLi4vc3JjL0FwaVNoYXJlZC9TZXJ2aWNlcy9pbXBsL1NlcnZpY2VJbXBsQmFzZS50cyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faGlkZS5qcyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vc3JjL0FwaVNoYXJlZC9FbnVtTWFwcGluZ3MvSW50ZXJuYWxUb0V4dGVybmFsRW51bU1hcHBpbmdzLnRzIiwid2VicGFjazovLy8uLi8uLi9zcmMvRXh0ZW5zaW9uc0FwaUV4dGVybmFsQ29udHJhY3QudHMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NvZi5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fcmVkZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19jdHguanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2l0ZXJhdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19oYXMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NsYXNzb2YuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2xpYnJhcnkuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3VpZC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZmFpbHMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWludGVnZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2RlZmluZWQuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pb2JqZWN0LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3NoYXJlZC1rZXkuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3NldC10by1zdHJpbmctdGFnLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX25ldy1wcm9taXNlLWNhcGFiaWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL3NyYy9BcGlTaGFyZWQvRXZlbnRMaXN0ZW5lck1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL3NyYy9tZXNzYWdpbmcvaW50ZXJmYWNlL01lc3NhZ2VUeXBlcy50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vc3JjL0FwaVNoYXJlZC9VdGlscy9FbnVtQ29udmVydGVyLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9zcmMvQXBpU2hhcmVkL0ltcGwvU2luZ2xlRXZlbnRNYW5hZ2VySW1wbC50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vc3JjL0FwaVNoYXJlZC9VdGlscy9QYXJhbS50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vc3JjL0FwaVNoYXJlZC9Nb2RlbHMvR2V0RGF0YU1vZGVscy50cyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2hhcmVkLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pdGVyLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faHRtbC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYWRkLXRvLXVuc2NvcGFibGVzLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zcGVjaWVzLWNvbnN0cnVjdG9yLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190YXNrLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19wZXJmb3JtLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19wcm9taXNlLXJlc29sdmUuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ZuL29iamVjdC9hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL3NyYy9BcGlTaGFyZWQvU2hlZXQudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL3NyYy9BcGlTaGFyZWQvVmVyc2lvbk51bWJlci50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vc3JjL2NvbnRyYWN0L1ZlcmJzLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi9zcmMvdmVyc2lvbmluZy9WZXJzaW9uQ29udmVydGVyRmFjdG9yeS50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vc3JjL3ZlcnNpb25pbmcvZXh0ZXJuYWwvRXh0ZXJuYWxJZGVudGl0eVZlcnNpb25Db252ZXJ0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9ndWlkL2d1aWQuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL3NyYy9BcGlTaGFyZWQvRXZlbnRzL1RhYmxlYXVFdmVudC50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vc3JjL0FwaVNoYXJlZC9JbXBsL1NoZWV0SW1wbC50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vc3JjL0FwaVNoYXJlZC9EYXRhU291cmNlLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9zcmMvQXBpU2hhcmVkL0ltcGwvRGF0YVNvdXJjZUltcGwudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL3NyYy9BcGlTaGFyZWQvSW1wbC9GaWVsZEltcGwudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL3NyYy9BcGlTaGFyZWQvRmllbGQudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL3NyYy9BcGlTaGFyZWQvRXZlbnRzL1RhYmxlYXVXb3Jrc2hlZXRFdmVudC50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vc3JjL0FwaVNoYXJlZC9FdmVudHMvVGFibGVhdVNoZWV0RXZlbnQudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL3NyYy9BcGlTaGFyZWQvU2VydmljZXMvR2V0RGF0YVNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL3NyYy9BcGlTaGFyZWQvRW51bU1hcHBpbmdzL0V4dGVybmFsVG9JbnRlcm5hbEVudW1NYXBwaW5ncy50cyIsIndlYnBhY2s6Ly8vLi4vLi4vc3JjL0V4dGVuc2lvbnNBcGkudHMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ZuL3Byb21pc2UuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1wcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc3RyaW5nLWF0LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pdGVyLWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWRwcy5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190by1hYnNvbHV0ZS1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWdwby5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5hcnJheS5pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXRlci1zdGVwLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzNi5wcm9taXNlLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hbi1pbnN0YW5jZS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZm9yLW9mLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pdGVyLWNhbGwuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2lzLWFycmF5LWl0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pbnZva2UuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX21pY3JvdGFzay5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdXNlci1hZ2VudC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fcmVkZWZpbmUtYWxsLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zZXQtc3BlY2llcy5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXRlci1kZXRlY3QuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM3LnByb21pc2UuZmluYWxseS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczcucHJvbWlzZS50cnkuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ZuL2FycmF5L2ZpbmQuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2LmFycmF5LmZpbmQuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FycmF5LW1ldGhvZHMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2FycmF5LXNwZWNpZXMtY3JlYXRlLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hcnJheS1zcGVjaWVzLWNvbnN0cnVjdG9yLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pcy1hcnJheS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1waWUuanMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL3NyYy9FeHRlbnNpb25zQXBpL0ltcGwvRXh0ZW5zaW9uc0ltcGwudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL3NyYy9BcGlTaGFyZWQvRGFzaGJvYXJkLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi9zcmMvRXh0ZXJuYWxDb250cmFjdC9FbnVtcy50cyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvZm4vbnVtYmVyL2lzLWludGVnZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXM2Lm51bWJlci5pcy1pbnRlZ2VyLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pcy1pbnRlZ2VyLmpzIiwid2VicGFjazovLy8uLi8uLi8uLi9zcmMvY29udHJhY3QvRW51bXMudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL3NyYy9pbnRlcmZhY2UvSW50ZXJuYWxBcGlEaXNwYXRjaGVyLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi9zcmMvY29udHJhY3QvTm90aWZpY2F0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vc3JjL2NvbnRyYWN0L1BhcmFtZXRlcnMudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL3NyYy92ZXJzaW9uaW5nL1N0YWNraW5nVmVyc2lvbkNvbnZlcnRlci50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vc3JjL3ZlcnNpb25pbmcvSWRlbnRpdHlWZXJzaW9uQ29udmVydGVyLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi9zcmMvdmVyc2lvbmluZy9WZXJzaW9uVHJhbnNsYXRpb25zLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9zcmMvdmVyc2lvbmluZy9leHRlcm5hbC9FeHRlcm5hbFZlcnNpb25Db252ZXJ0ZXJGYWN0b3J5LnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9zcmMvdmVyc2lvbmluZy9leHRlcm5hbC9FeHRlcm5hbFN0YWNraW5nVmVyc2lvbkNvbnZlcnRlci50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vc3JjL3ZlcnNpb25pbmcvZXh0ZXJuYWwvRXh0ZXJuYWxWZXJzaW9uVHJhbnNsYXRpb25zLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi9zcmMvbWVzc2FnaW5nL0Nyb3NzRnJhbWVNZXNzZW5nZXIudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL3NyYy9tZXNzYWdpbmcvQ3Jvc3NGcmFtZVByZXBhcmVkTWVzc2FnZS50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vc3JjL21lc3NhZ2luZy9NZXNzYWdlVHlwZUNoZWNrcy50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vc3JjL0FwaVNoYXJlZC9JbXBsL0Rhc2hib2FyZEltcGwudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL3NyYy9BcGlTaGFyZWQvRGFzaGJvYXJkT2JqZWN0LnRzIiwid2VicGFjazovLy8uLi8uLi8uLi9zcmMvQXBpU2hhcmVkL1BvaW50LnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9zcmMvQXBpU2hhcmVkL0ltcGwvU2hlZXRJbmZvSW1wbC50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vc3JjL0FwaVNoYXJlZC9TaXplLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi9zcmMvQXBpU2hhcmVkL1dvcmtzaGVldC50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vc3JjL0FwaVNoYXJlZC9JbXBsL1dvcmtzaGVldEltcGwudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL3NyYy9BcGlTaGFyZWQvQ29ubmVjdGlvblN1bW1hcnkudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uL3NyYy9BcGlTaGFyZWQvVGFibGVTdW1tYXJ5LnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9zcmMvQXBpU2hhcmVkL0V2ZW50cy9GaWx0ZXJDaGFuZ2VkRXZlbnQudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL3NyYy9BcGlTaGFyZWQvRXZlbnRzL01hcmtzU2VsZWN0ZWRFdmVudC50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vc3JjL0FwaVNoYXJlZC9Dcm9zc0ZyYW1lL0Nyb3NzRnJhbWVCb290c3RyYXAudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL3NyYy9BcGlTaGFyZWQvQ3Jvc3NGcmFtZS9Dcm9zc0ZyYW1lRGlzcGF0Y2hlci50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vc3JjL0FwaVNoYXJlZC9TZXJ2aWNlcy9SZWdpc3RlckFsbFNoYXJlZFNlcnZpY2VzLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi8uLi9zcmMvQXBpU2hhcmVkL1NlcnZpY2VzL2ltcGwvRGF0YVNvdXJjZVNlcnZpY2VJbXBsLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi8uLi9zcmMvQXBpU2hhcmVkL1NlcnZpY2VzL2ltcGwvRmlsdGVyU2VydmljZUltcGwudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL3NyYy9BcGlTaGFyZWQvTW9kZWxzL0ZpbHRlck1vZGVscy50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vLi4vc3JjL0FwaVNoYXJlZC9TZXJ2aWNlcy9pbXBsL0dldERhdGFTZXJ2aWNlSW1wbC50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vLi4vc3JjL0FwaVNoYXJlZC9TZXJ2aWNlcy9pbXBsL05vdGlmaWNhdGlvblNlcnZpY2VJbXBsLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi8uLi9zcmMvQXBpU2hhcmVkL1NlcnZpY2VzL2ltcGwvUGFyYW1ldGVyc1NlcnZpY2VJbXBsLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9zcmMvQXBpU2hhcmVkL0ltcGwvUGFyYW1ldGVySW1wbC50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vc3JjL0FwaVNoYXJlZC9FdmVudHMvUGFyYW1ldGVyQ2hhbmdlZEV2ZW50LnRzIiwid2VicGFjazovLy8uLi8uLi8uLi9zcmMvQXBpU2hhcmVkL1BhcmFtZXRlci50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vLi4vc3JjL0FwaVNoYXJlZC9TZXJ2aWNlcy9pbXBsL1NlbGVjdGlvblNlcnZpY2VJbXBsLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9zcmMvQXBpU2hhcmVkL01vZGVscy9TZWxlY3Rpb25Nb2RlbHMudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uL3NyYy9BcGlTaGFyZWQvU2VydmljZXMvaW1wbC9ab25lU2VydmljZUltcGwudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL3NyYy9FeHRlbnNpb25zQXBpL05hbWVzcGFjZXMvRGFzaGJvYXJkQ29udGVudC50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vc3JjL0V4dGVuc2lvbnNBcGkvTmFtZXNwYWNlcy9FbnZpcm9ubWVudC50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vc3JjL0V4dGVuc2lvbnNBcGkvU2VydmljZXMvUmVnaXN0ZXJBbGxFeHRlbnNpb25zU2VydmljZXMudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uLy4uL3NyYy9FeHRlbnNpb25zQXBpL1NlcnZpY2VzL0ltcGwvSW5pdGlhbGl6YXRpb25TZXJ2aWNlSW1wbC50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vLi4vc3JjL0V4dGVuc2lvbnNBcGkvU2VydmljZXMvSW1wbC9TZXR0aW5nc1NlcnZpY2VJbXBsLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi8uLi9zcmMvRXh0ZW5zaW9uc0FwaS9TZXJ2aWNlcy9JbXBsL1VJU2VydmljZUltcGwudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL3NyYy9FeHRlbnNpb25zQXBpL05hbWVzcGFjZXMvU2V0dGluZ3MudHMiLCJ3ZWJwYWNrOi8vLy4uLy4uLy4uLy4uL3NyYy9FeHRlbnNpb25zQXBpL0ltcGwvU2V0dGluZ3NJbXBsLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9zcmMvRXh0ZW5zaW9uc0FwaS9OYW1lc3BhY2VzL1VJLnRzIiwid2VicGFjazovLy8uLi8uLi8uLi8uLi9zcmMvRXh0ZW5zaW9uc0FwaS9JbXBsL1VJSW1wbC50cyIsIndlYnBhY2s6Ly8vLi4vLi4vc3JjL1ZlcnNpb25lZEV4dGVybmFsQXBpRGlzcGF0Y2hlci50cyIsIndlYnBhY2s6Ly8vLi4vLi4vLi4vLi4vc3JjL0V4dGVuc2lvbnNBcGkvTmFtZXNwYWNlcy9FeHRlbnNpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtB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bEQsQ0FBQztJQUNILGlCQUFDO0FBQUQsQ0FBQztBQTVCWSxnQ0FBVSIsImZpbGUiOiJ0YWJsZWF1LmV4dGVuc2lvbnMuMS4yLjAtcHJlLjEwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QtZXh0ZW5zaW9ucy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA3Mik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNzQ2YzVjMzY4Y2YxMzdlNWU4MDMiLCIvLyBUaGlzIGZpbGUgcmUtZXhwb3J0cyBldmVyeXRoaW5nIHdoaWNoIGlzIHBhcnQgb2YgdGhlIHNoYXJlZCBlbWJlZGRpbmcgYXBpIHB1YmxpYyBpbnRlcmZhY2VcblxuZXhwb3J0ICogZnJvbSAnLi9FeHRlcm5hbENvbnRyYWN0L0RhdGFTb3VyY2VJbnRlcmZhY2VzJztcbmV4cG9ydCAqIGZyb20gJy4vRXh0ZXJuYWxDb250cmFjdC9EYXRhVGFibGVJbnRlcmZhY2VzJztcbmV4cG9ydCAqIGZyb20gJy4vRXh0ZXJuYWxDb250cmFjdC9FbnVtcyc7XG5leHBvcnQgKiBmcm9tICcuL0V4dGVybmFsQ29udHJhY3QvRXZlbnRJbnRlcmZhY2VzJztcbmV4cG9ydCAqIGZyb20gJy4vRXh0ZXJuYWxDb250cmFjdC9GaWx0ZXJJbnRlcmZhY2VzJztcbmV4cG9ydCAqIGZyb20gJy4vRXh0ZXJuYWxDb250cmFjdC9TZWxlY3Rpb25JbnRlcmZhY2VzJztcbmV4cG9ydCAqIGZyb20gJy4vRXh0ZXJuYWxDb250cmFjdC9QYXJhbWV0ZXJJbnRlcmZhY2VzJztcbmV4cG9ydCAqIGZyb20gJy4vRXh0ZXJuYWxDb250cmFjdC9TZWxlY3Rpb25JbnRlcmZhY2VzJztcbmV4cG9ydCAqIGZyb20gJy4vRXh0ZXJuYWxDb250cmFjdC9TaGVldEludGVyZmFjZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9FeHRlcm5hbENvbnRyYWN0L1RhYmxlYXVFcnJvcic7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vc3JjL1NoYXJlZEFwaUV4dGVybmFsQ29udHJhY3QudHMiLCIvKipcbiAqIFRoaXMgaXMgeW91ciBtYWluLiBUaGlzIGlzIHdoZXJlIHlvdSByZS1leHBvcnQgZXZlcnl0aGluZyB5b3Ugd2FudCB0byBiZSBwdWJsaWNseSBhdmFpbGFibGUuXG4gKlxuICogVGhlIGJ1aWxkIGVuZm9yY2VzIHRoYXQgdGhlIGZpbGUgaGFzIHRoZSBzYW1lIG5hbWUgYXMgdGhlIGdsb2JhbCB2YXJpYWJsZSB0aGF0IGlzIGV4cG9ydGVkLlxuICovXG5cbi8vIFRoZSBmb2xsb3dpbmcgcG9seWZpbGxzIGFyZSBuZWVkZWQgZm9yIElFMTFcbmltcG9ydCAnY29yZS1qcy9mbi9vYmplY3QvYXNzaWduJztcbmltcG9ydCAnY29yZS1qcy9mbi9udW1iZXIvaXMtaW50ZWdlcic7XG5cbmV4cG9ydCAqIGZyb20gJy4vY29udHJhY3QvRW51bXMnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2UvSW50ZXJuYWxBcGlEaXNwYXRjaGVyJztcbmV4cG9ydCAqIGZyb20gJy4vY29udHJhY3QvTW9kZWxzJztcbmV4cG9ydCAqIGZyb20gJy4vY29udHJhY3QvTm90aWZpY2F0aW9ucyc7XG5leHBvcnQgKiBmcm9tICcuL2NvbnRyYWN0L1BhcmFtZXRlcnMnO1xuZXhwb3J0ICogZnJvbSAnLi9jb250cmFjdC9WZXJicyc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS9Jbml0aWFsaXphdGlvbk9wdGlvbnMnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2UvVmVyc2lvbk51bWJlcic7XG5leHBvcnQgKiBmcm9tICcuL3ZlcnNpb25pbmcvVmVyc2lvbkNvbnZlcnRlckZhY3RvcnknO1xuZXhwb3J0ICogZnJvbSAnLi92ZXJzaW9uaW5nL2V4dGVybmFsL0V4dGVybmFsVmVyc2lvbkNvbnZlcnRlckZhY3RvcnknO1xuZXhwb3J0ICogZnJvbSAnLi92ZXJzaW9uaW5nL0ludGVybmFsQ29udHJhY3RWZXJzaW9uQ29udmVydGVyJztcbmV4cG9ydCAqIGZyb20gJy4vdmVyc2lvbmluZy9leHRlcm5hbC9FeHRlcm5hbENvbnRyYWN0VmVyc2lvbkNvbnZlcnRlcic7XG5leHBvcnQgKiBmcm9tICcuL3ZlcnNpb25pbmcvZXh0ZXJuYWwvRXh0ZXJuYWxJZGVudGl0eVZlcnNpb25Db252ZXJ0ZXInO1xuXG4vLyBUaGVzZSBhcmUgdGhlIGV4cG9ydHMgZnJvbSB0aGUgbWVzc2FnaW5nIHN0dWZmXG5cbmV4cG9ydCAqIGZyb20gJy4vbWVzc2FnaW5nL0Nyb3NzRnJhbWVNZXNzZW5nZXInO1xuZXhwb3J0ICogZnJvbSAnLi9tZXNzYWdpbmcvaW50ZXJmYWNlL01lc3NhZ2VEaXNwYXRjaGVyJztcbmV4cG9ydCAqIGZyb20gJy4vbWVzc2FnaW5nL2ludGVyZmFjZS9NZXNzYWdlTGlzdGVuZXInO1xuZXhwb3J0ICogZnJvbSAnLi9tZXNzYWdpbmcvaW50ZXJmYWNlL01lc3NhZ2VUeXBlcyc7XG5leHBvcnQgKiBmcm9tICcuL21lc3NhZ2luZy9pbnRlcmZhY2UvTWVzc2VuZ2VyJztcbmV4cG9ydCAqIGZyb20gJy4vbWVzc2FnaW5nL2ludGVyZmFjZS9QcmVwYXJlZE1lc3NhZ2UnO1xuXG4vLyBFeHBvcnQgYSBoYXJkY29kZWQgdmVyc2lvbiBvZiB0aGUgaW50ZXJuYWwgY29udHJhY3QuIFRoaXMgc2hvdWxkIG1hdGNoIHdoYXQncyBpbiBwYWNrYWdlLmpzb24uXG4vLyBOb3JtYWxseSwgd2UnZCB1c2Ugc29tZSBzb3J0IG9mIHdlYnBhY2sgcmVwbGFjZW1lbnQgdG8gaW5qZWN0IHRoaXMgaW50byBjb2RlLCBidXQgdGhhdCBkb2Vzbid0XG4vLyB3b3JrIHdpdGggdGhlIG1vZHVsZS1kZXYtc2NyaXB0cyBhbmQgdGhpcyBpc24ndCB0b28gbXVjaCB3b3JrLlxuLy8gSWYgeW91IGZvcmdldCB0byBrZWVwIHRoaXMgaW4gc3luYyB3aXRoIHBhY2thZ2UuanNvbiwgYSB0ZXN0IHdpbGwgZmFpbCBzbyB3ZSBzaG91bGQgYmUgb2suXG5leHBvcnQgY29uc3QgSU5URVJOQUxfQ09OVFJBQ1RfVkVSU0lPTiA9IHtcbiAgbWFqb3I6IDEsXG4gIG1pbm9yOiAxMCxcbiAgZml4OiAxXG59O1xuXG4vLyBFeHBvcnQgdGhlIHZlcnNpb24gbnVtYmVyIG9mIG1lc3NhZ2luZyBmb3IgY29uc3VtZXJzIHRvIHVzZS5cbi8vIEJlIHZlcnkgY2FyZWZ1bCBtYWtpbmcgYW55IHVwZGF0ZXMgdG8gdGhpcyBjb250cmFjdCB3aGljaCBicmVhayB2ZXJzaW9uIGNvbXBhdGliaWxpdHkuXG5leHBvcnQgY29uc3QgTUVTU0FHSU5HX1ZFUlNJT04gPSB7XG4gIG1ham9yOiAxLFxuICBtaW5vcjogMCxcbiAgZml4OiAwXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uL3NyYy9Kc0FwaUludGVybmFsQ29udHJhY3QudHMiLCJ2YXIgc3RvcmUgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgnd2tzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG52YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuU3ltYm9sO1xudmFyIFVTRV9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09ICdmdW5jdGlvbic7XG5cbnZhciAkZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XG4gICAgVVNFX1NZTUJPTCAmJiBTeW1ib2xbbmFtZV0gfHwgKFVTRV9TWU1CT0wgPyBTeW1ib2wgOiB1aWQpKCdTeW1ib2wuJyArIG5hbWUpKTtcbn07XG5cbiRleHBvcnRzLnN0b3JlID0gc3RvcmU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL193a3MuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYgKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpIF9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIENvbnRyYWN0IGZyb20gJy4uL1NoYXJlZEFwaUV4dGVybmFsQ29udHJhY3QnO1xuXG4vKipcbiAqIEN1c3RvbSBlcnJvciBjbGFzcyB0aGF0IGV4dGVuZHMgdGhlIGRlZmF1bHQgSmF2YVNjcmlwdCBFcnJvciBvYmplY3QuXG4gKiBUaGlzIGFsbG93cyB1cyB0byBwcm92aWRlIGEgZmllbGQgd2l0aCBhIHNwZWNpZmljIGVycm9yIGNvZGVcbiAqIHNvIHRoYXQgZGV2ZWxvcGVycyBjYW4gbW9yZSBlYXNpbHkgcHJvZ3JhbW1hdGljYWxseSByZXNwb25kXG4gKiB0byBlcnJvciBzY2VuYXJpb3MuXG4gKi9cbmV4cG9ydCBjbGFzcyBUYWJsZWF1RXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lcnJvckNvZGU6IENvbnRyYWN0LkVycm9yQ29kZXMsIG1lc3NhZ2U6IHN0cmluZykge1xuICAgIHN1cGVyKGAke19lcnJvckNvZGV9OiAke21lc3NhZ2V9YCk7XG5cbiAgICAvKnRzbGludDpkaXNhYmxlLW5leHQtbGluZSAqL1xuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC13aWtpL2Jsb2IvbWFzdGVyL0JyZWFraW5nLUNoYW5nZXMubWQjZXh0ZW5kaW5nLWJ1aWx0LWlucy1saWtlLWVycm9yLWFycmF5LWFuZC1tYXAtbWF5LW5vLWxvbmdlci13b3JrXG4gICAgLy8gRXJyb3IgaW5oZXJpdGFuY2UgZG9lcyBub3Qgd29yayBwcm9wZXJ0bHkgd2hlbiBjb21waWxpbmcgdG8gRVM1LCB0aGlzIGlzIGEgd29ya2Fyb3VuZCB0byBmb3JjZVxuICAgIC8vIHRoZSBwcm90byBjaGFpbiB0byBiZSBidWlsdCBjb3JyZWN0bHkuICBTZWUgdGhlIGdpdGh1YiBsaW5rIGFib3ZlIGZvciBkZXRhaWxzLlxuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBUYWJsZWF1RXJyb3IucHJvdG90eXBlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZXJyb3JDb2RlKCk6IENvbnRyYWN0LkVycm9yQ29kZXMge1xuICAgIHJldHVybiB0aGlzLl9lcnJvckNvZGU7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9zcmMvQXBpU2hhcmVkL1RhYmxlYXVFcnJvci50cyIsIi8vIEV4cG9ydCBldmVyeXRoaW5nIHdoaWNoIGhhZCBiZWVuIHByZXZpb3VzbHkgaW4gdGhlIGFwaS1zaGFyZWQgbW9kdWxlXG5cbmV4cG9ydCB7IERhc2hib2FyZCB9IGZyb20gJy4vQXBpU2hhcmVkL0Rhc2hib2FyZCc7XG5leHBvcnQgeyBFdmVudExpc3RlbmVyTWFuYWdlciB9IGZyb20gJy4vQXBpU2hhcmVkL0V2ZW50TGlzdGVuZXJNYW5hZ2VyJztcbmV4cG9ydCB7IFNpbmdsZUV2ZW50TWFuYWdlciB9IGZyb20gJy4vQXBpU2hhcmVkL1NpbmdsZUV2ZW50TWFuYWdlcic7XG5leHBvcnQgeyBUYWJsZWF1RXJyb3IgfSBmcm9tICcuL0FwaVNoYXJlZC9UYWJsZWF1RXJyb3InO1xuZXhwb3J0IHsgVmVyc2lvbk51bWJlciB9IGZyb20gJy4vQXBpU2hhcmVkL1ZlcnNpb25OdW1iZXInO1xuXG5leHBvcnQgeyBJbnRlcm5hbFRvRXh0ZXJuYWxFbnVtTWFwcGluZ3MgfSBmcm9tICcuL0FwaVNoYXJlZC9FbnVtTWFwcGluZ3MvSW50ZXJuYWxUb0V4dGVybmFsRW51bU1hcHBpbmdzJztcbmV4cG9ydCB7IFRhYmxlYXVFdmVudCB9IGZyb20gJy4vQXBpU2hhcmVkL0V2ZW50cy9UYWJsZWF1RXZlbnQnO1xuZXhwb3J0IHsgU2luZ2xlRXZlbnRNYW5hZ2VySW1wbCB9IGZyb20gJy4vQXBpU2hhcmVkL0ltcGwvU2luZ2xlRXZlbnRNYW5hZ2VySW1wbCc7XG5leHBvcnQgeyBEYXNoYm9hcmRJbXBsIH0gZnJvbSAnLi9BcGlTaGFyZWQvSW1wbC9EYXNoYm9hcmRJbXBsJztcbmV4cG9ydCB7IFNlcnZpY2VJbXBsQmFzZSB9IGZyb20gJy4vQXBpU2hhcmVkL1NlcnZpY2VzL2ltcGwvU2VydmljZUltcGxCYXNlJztcbmV4cG9ydCB7IEVycm9ySGVscGVycyB9IGZyb20gJy4vQXBpU2hhcmVkL1V0aWxzL0Vycm9ySGVscGVycyc7XG5cbmV4cG9ydCAqIGZyb20gJy4vQXBpU2hhcmVkL0Nyb3NzRnJhbWUvQ3Jvc3NGcmFtZUJvb3RzdHJhcCc7XG5leHBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9BcGlTaGFyZWQvU2VydmljZXMvTm90aWZpY2F0aW9uU2VydmljZSc7XG5cbmV4cG9ydCAqIGZyb20gJy4vQXBpU2hhcmVkL1NlcnZpY2VzL1JlZ2lzdGVyQWxsU2hhcmVkU2VydmljZXMnO1xuZXhwb3J0ICogZnJvbSAnLi9BcGlTaGFyZWQvU2VydmljZXMvU2VydmljZVJlZ2lzdHJ5JztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi9zcmMvQXBpU2hhcmVkLnRzIiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHsgdmVyc2lvbjogJzIuNS43JyB9O1xuaWYgKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpIF9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2NvcmUuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgRXJyb3JDb2RlcyB9IGZyb20gJy4uLy4uL1NoYXJlZEFwaUV4dGVybmFsQ29udHJhY3QnO1xuXG5pbXBvcnQgeyBUYWJsZWF1RXJyb3IgfSBmcm9tICcuLi9UYWJsZWF1RXJyb3InO1xuXG4vKipcbiAqIEJhc2UgaW50ZXJmYWNlIGZvciBhbiBhcGkgc2VydmljZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFwaVNlcnZpY2Uge1xuICAvKipcbiAgICogR2V0cyB0aGUgbmFtZSBmb3IgdGhpcyBzZXJ2aWNlLlxuICAgKi9cbiAgcmVhZG9ubHkgc2VydmljZU5hbWU6IHN0cmluZztcbn1cblxuLyoqXG4gKiBDb2xsZWN0aW9uIG9mIHNlcnZpY2UgbmFtZSB3aGljaCB3aWxsIGJlIHJlZ2lzdGVyZWQgaW4gdGhlIGFwaS1zaGFyZWQgcHJvamVjdFxuICovXG5leHBvcnQgY29uc3QgZW51bSBTZXJ2aWNlTmFtZXMge1xuICBEYXRhU291cmNlU2VydmljZSA9ICdkYXRhLXNvdXJjZS1zZXJ2aWNlJyxcbiAgR2V0RGF0YSA9ICdnZXQtZGF0YS1zZXJ2aWNlJyxcbiAgRmlsdGVyID0gJ2ZpbHRlci1zZXJ2aWNlJyxcbiAgTm90aWZpY2F0aW9uID0gJ25vdGlmaWNhdGlvbi1zZXJ2aWNlJyxcbiAgUGFyYW1ldGVycyA9ICdwYXJhbWV0ZXJzLXNlcnZpY2UnLFxuICBTZWxlY3Rpb24gPSAnc2VsZWN0aW9uLXNlcnZpY2UnLFxuICBab25lID0gJ3pvbmUtc2VydmljZSdcbn1cblxuLyoqXG4gKiBEbyBzb21lIGdsb2JhYmwgZGVjbGFyYXRpb25zIHNvIHdlIGNhbiBjcmVhdGUgYSBzaW5nbGV0b24gb24gdGhlIHdpbmRvdyBvYmplY3RcbiAqL1xuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgV2luZG93IHsgX190YWJsZWF1QXBpU2VydmljZVJlZ2lzdHJ5OiBTZXJ2aWNlUmVnaXN0cnkgfCB1bmRlZmluZWQ7IH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBTZXJ2aWNlUmVnaXN0cnkge1xuICAvKipcbiAgICogUmVnaXN0ZXJzIGEgbmV3IHNlcnZpY2UgaW50byB0aGUgc2VydmljZSByZWdpc3RyeS4gQW55IGV4aXN0aW5nIG9uZSB3aWxsXG4gICAqIGJlIG92ZXJ3cml0dGVuLiB0aGUgc2VydmljZSBpcyByZWdpc3RlcmVkIHVuZGVyIHNlcnZpY2Uuc2VydmljZU5hbWVcbiAgICpcbiAgICogQHBhcmFtIHtBcGlTZXJ2aWNlfSBzZXJ2aWNlIFRoZSBzZXJ2aXZlIHRvIHJlZ2lzdGVyXG4gICAqL1xuICByZWdpc3RlclNlcnZpY2Uoc2VydmljZTogQXBpU2VydmljZSk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyB0aGUgZ2l2ZW4gc2VydmljZSBmcm9tIHRoZSByZWdpc3RyeS4gSWYgdGhlcmUgaXMgbm90IGFcbiAgICogc2VydmljZSByZWdpc3RlcmVkIHVuZGVyIHRoYXQgbmFtZSwgdGhyb3dzIGFuZCBlcnJvclxuICAgKlxuICAgKiBAdGVtcGxhdGUgVCBUaGUgdHlwZSBvZiB0aGUgc2VydmljZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2VydmljZU5hbWUgVGhlIG5hbWUgb2YgdGhlIHNlcnZpY2UuXG4gICAqIEByZXR1cm5zIHtUfSBUaGUgcmVxdWVzdGVkIHNlcnZpY2VcbiAgICovXG4gIGdldFNlcnZpY2U8VCBleHRlbmRzIEFwaVNlcnZpY2U+KHNlcnZpY2VOYW1lOiBzdHJpbmcpOiBUO1xufVxuXG5jbGFzcyBTZXJ2aWNlUmVnaXN0cnlJbXBsIGltcGxlbWVudHMgU2VydmljZVJlZ2lzdHJ5IHtcbiAgcHJpdmF0ZSBfc2VydmljZXM6IHsgW3NlcnZpY2VOYW1lOiBzdHJpbmddOiBBcGlTZXJ2aWNlOyB9O1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9zZXJ2aWNlcyA9IHt9O1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyU2VydmljZShzZXJ2aWNlOiBBcGlTZXJ2aWNlKTogdm9pZCB7XG4gICAgdGhpcy5fc2VydmljZXNbc2VydmljZS5zZXJ2aWNlTmFtZV0gPSBzZXJ2aWNlO1xuICB9XG5cbiAgcHVibGljIGdldFNlcnZpY2U8VCBleHRlbmRzIEFwaVNlcnZpY2U+KHNlcnZpY2VOYW1lOiBzdHJpbmcpOiBUIHtcbiAgICBpZiAoIXRoaXMuX3NlcnZpY2VzLmhhc093blByb3BlcnR5KHNlcnZpY2VOYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IFRhYmxlYXVFcnJvcihFcnJvckNvZGVzLkludGVybmFsRXJyb3IsIGBTZXJ2aWNlIG5vdCByZWdpc3RlcmVkOiAke3NlcnZpY2VOYW1lfWApO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9zZXJ2aWNlc1tzZXJ2aWNlTmFtZV0gYXMgVDtcbiAgfVxufVxuXG4vKipcbiAqIHN0YXRpYyBjbGFzcyB1c2VkIGZvciBnZXR0aW5nIGFjY2VzcyB0byB0aGUgc2luZ2xlIGluc3RhbmNlXG4gKiBvZiB0aGUgQXBpU2VydmljZVJlZ2lzdHJ5XG4gKi9cbmV4cG9ydCBjbGFzcyBBcGlTZXJ2aWNlUmVnaXN0cnkge1xuICAvKipcbiAgICogR2V0cyB0aGUgc2luZ2xldG9uIGluc3RhbmNlIG9mIHRoZSBTZXJ2aWNlUmVnaXN0cnlcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IGluc3RhbmNlKCk6IFNlcnZpY2VSZWdpc3RyeSB7XG4gICAgaWYgKCF3aW5kb3cuX190YWJsZWF1QXBpU2VydmljZVJlZ2lzdHJ5KSB7XG4gICAgICBBcGlTZXJ2aWNlUmVnaXN0cnkuc2V0SW5zdGFuY2UobmV3IFNlcnZpY2VSZWdpc3RyeUltcGwoKSk7XG4gICAgfVxuXG4gICAgaWYgKCF3aW5kb3cuX190YWJsZWF1QXBpU2VydmljZVJlZ2lzdHJ5KSB7XG4gICAgICB0aHJvdyBuZXcgVGFibGVhdUVycm9yKEVycm9yQ29kZXMuSW50ZXJuYWxFcnJvciwgJ1NlcnZpY2UgcmVnaXN0cnkgZmFpbGVkJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHdpbmRvdy5fX3RhYmxlYXVBcGlTZXJ2aWNlUmVnaXN0cnk7XG4gIH1cblxuICAvKipcbiAgICogSGVscGVyIG1ldGhvZCB0byBvdmVycmlkZSB0aGUgcmVnaXN0cnkgaW5zdGFuY2UuIENhbiBiZSB1c2VkIGJ5IHVuaXQgdGVzdHNcbiAgICpcbiAgICogQHBhcmFtIHtTZXJ2aWNlUmVnaXN0cnl9IHNlcnZpY2VSZWdpc3RyeSBUaGUgbmV3IHJlZ2lzdHJ5XG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHNldEluc3RhbmNlKHNlcnZpY2VSZWdpc3RyeT86IFNlcnZpY2VSZWdpc3RyeSk6IHZvaWQge1xuICAgIHdpbmRvdy5fX3RhYmxlYXVBcGlTZXJ2aWNlUmVnaXN0cnkgPSBzZXJ2aWNlUmVnaXN0cnk7XG4gIH1cblxuICAvLyBQcml2YXRlIHRvIGF2b2lkIGFueW9uZSBjb25zdHJ1Y3RpbmcgdGhpc1xuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkgeyB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vLi4vc3JjL0FwaVNoYXJlZC9TZXJ2aWNlcy9TZXJ2aWNlUmVnaXN0cnkudHMiLCJpbXBvcnQgeyBFcnJvckNvZGVzIH0gZnJvbSAnLi4vLi4vU2hhcmVkQXBpRXh0ZXJuYWxDb250cmFjdCc7XG5cbmltcG9ydCB7IFBhcmFtIH0gZnJvbSAnLi9QYXJhbSc7XG5cbmltcG9ydCB7IFRhYmxlYXVFcnJvciB9IGZyb20gJy4uL1RhYmxlYXVFcnJvcic7XG5pbXBvcnQgeyBEYXNoYm9hcmRPYmplY3QgfSBmcm9tICcuLi9EYXNoYm9hcmRPYmplY3QnO1xuXG4vKipcbiAqIFRoaXMgY2xhc3MgaXMgdXNlZCB0byBjb25zdHJ1Y3QgY29tbW9uIGVycm9ycyB0aHJvdWdob3V0IHRoZSBleHRlcm5hbFxuICogcHJvamVjdHMgKGFwaS1zaGFyZWQsIGV4dGVuc2lvbnMtYXBpLCBldGMuKS4gIEl0IGhhcyBzb21lIGR1cGxpY2F0aW9uIHdpdGhcbiAqIHRoZSBFcnJvckhlbHBlcnMgY2xhc3MgaW4gYXBpLWNvcmUsIGJ1dCBpcyBzZXBhcmF0ZSBkdWUgdG8gdGhlIG5lZWQgdG8gdGhyb3dcbiAqIGFuIGV4dGVybmFsIFRhYmxlYXVFcnJvciB2cy4gYW4gSW50ZXJuYWxUYWJsZWF1RXJyb3IuXG4gKi9cbmV4cG9ydCBjbGFzcyBFcnJvckhlbHBlcnMge1xuICAvKipcbiAgICogVGhyb3dzIHdpdGggY29kZSBJbnRlcm5hbEVycm9yLlxuICAgKlxuICAgKiBAcGFyYW0gYXBpTmFtZSBuYW1lIG9mIGFwaSB0aGF0IHdhcyBjYWxsZWQuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGFwaU5vdEltcGxlbWVudGVkKGFwaU5hbWU6IHN0cmluZyk6IFRhYmxlYXVFcnJvciB7XG4gICAgcmV0dXJuIG5ldyBUYWJsZWF1RXJyb3IoRXJyb3JDb2Rlcy5JbnRlcm5hbEVycm9yLCBgJHthcGlOYW1lfSBBUEkgbm90IHlldCBpbXBsZW1lbnRlZC5gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaHJvd3MgYW4gaW50ZXJuYWwgZXJyb3IgaWYgYXJndW1lbnQgaXMgbnVsbCBvciB1bmRlZmluZWQuXG4gICAqXG4gICAqIEBwYXJhbSBhcmd1bWVudFZhbHVlIHZhbHVlIHRvIHZlcmlmeVxuICAgKiBAcGFyYW0gYXJndW1lbnROYW1lIG5hbWUgb2YgYXJndW1lbnQgdG8gdmVyaWZ5XG4gICAqL1xuICAvKnRzbGludDpkaXNhYmxlLW5leHQtbGluZSAqL1xuICBwdWJsaWMgc3RhdGljIHZlcmlmeUludGVybmFsVmFsdWUoYXJndW1lbnRWYWx1ZTogYW55LCBhcmd1bWVudE5hbWU6IHN0cmluZykge1xuICAgIGlmIChhcmd1bWVudFZhbHVlID09PSBudWxsIHx8IGFyZ3VtZW50VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IFRhYmxlYXVFcnJvcihFcnJvckNvZGVzLkludGVybmFsRXJyb3IsIGAke2FyZ3VtZW50VmFsdWV9IGlzIGludmFsaWQgdmFsdWUgZm9yOiAke2FyZ3VtZW50TmFtZX1gKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhyb3dzIGFuIEludmFsaWRQYXJhbWV0ZXIgZXJyb3IgaWYgYXJndW1lbnQgaXMgbnVsbCBvciB1bmRlZmluZWQuXG4gICAqXG4gICAqIEBwYXJhbSBhcmd1bWVudFZhbHVlIHZhbHVlIHRvIHZlcmlmeVxuICAgKiBAcGFyYW0gYXJndW1lbnROYW1lIG5hbWUgb2YgYXJndW1lbnQgdG8gdmVyaWZ5XG4gICAqL1xuICAvKnRzbGludDpkaXNhYmxlLW5leHQtbGluZSAqL1xuICBwdWJsaWMgc3RhdGljIHZlcmlmeVBhcmFtZXRlcihhcmd1bWVudFZhbHVlOiBhbnksIGFyZ3VtZW50TmFtZTogc3RyaW5nKSB7XG4gICAgaWYgKGFyZ3VtZW50VmFsdWUgPT09IG51bGwgfHwgYXJndW1lbnRWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgVGFibGVhdUVycm9yKEVycm9yQ29kZXMuSW52YWxpZFBhcmFtZXRlciwgYCR7YXJndW1lbnRWYWx1ZX0gaXMgaW52YWxpZCB2YWx1ZSBmb3IgcGFyYW10ZXI6ICR7YXJndW1lbnROYW1lfWApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaHJvd3MgYW4gSW52YWxpZFBhcmFtZXRlciBlcnJvciBpZiBhcmd1bWVudCBpcyBlbXB0eSBzdHJpbmcsIG51bGwgb3IgdW5kZWZpbmVkLlxuICAgKlxuICAgKiBAcGFyYW0gYXJndW1lbnRWYWx1ZSB2YWx1ZSB0byB2ZXJpZnlcbiAgICogQHBhcmFtIGFyZ3VtZW50TmFtZSBuYW1lIG9mIGFyZ3VtZW50IHRvIHZlcmlmeVxuICAgKi9cbiAgLyp0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgKi9cbiAgcHVibGljIHN0YXRpYyB2ZXJpZnlTdHJpbmdQYXJhbWV0ZXIoYXJndW1lbnRWYWx1ZTogc3RyaW5nLCBhcmd1bWVudE5hbWU6IHN0cmluZykge1xuICAgIGlmIChhcmd1bWVudFZhbHVlID09PSBudWxsIHx8IGFyZ3VtZW50VmFsdWUgPT09IHVuZGVmaW5lZCB8fCBhcmd1bWVudFZhbHVlID09PSAnJykge1xuICAgICAgdGhyb3cgbmV3IFRhYmxlYXVFcnJvcihFcnJvckNvZGVzLkludmFsaWRQYXJhbWV0ZXIsIGAke2FyZ3VtZW50VmFsdWV9IGlzIGludmFsaWQgdmFsdWUgZm9yIHBhcmFtdGVyOiAke2FyZ3VtZW50TmFtZX1gKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVmVyaWZpZXMgcGFzc2VkIHZhbHVlIGlzIGEgdmFsaWQgdmFsdWUgZm9yIHRoYXQgZW51bS5cbiAgICogVGhyb3dzIGFuIEludmFsaWRQYXJhbWV0ZXIgZXJyb3IgaWYgdGhlIGVudW0gdmFsdWUgaXMgbm90IHZhbGlkLlxuICAgKlxuICAgKiBTdHJpbmcgZW51bXMgYXJlIHtzdHJpbmcgOiBzdHJpbmd9IGRpY3Rpb25hcmllcyB3aGljaCBhcmUgbm90IHJldmVyc2UgbWFwcGFibGVcbiAgICogVGhpcyBpcyBhbiB1Z2x5IHdvcmthcm91bmRcbiAgICpcbiAgICogQHBhcmFtIGVudW1WYWx1ZSB2YWx1ZSB0byB2ZXJpZnlcbiAgICogQHBhcmFtIGVudW1UeXBlIGVudW0gdG8gdmVyaWZ5IGFnYWluc3RcbiAgICovXG4gIC8qdHNsaW50OmRpc2FibGUtbmV4dC1saW5lICovXG4gIHB1YmxpYyBzdGF0aWMgdmVyaWZ5RW51bVZhbHVlPEVudW1UeXBlPihlbnVtVmFsdWU6IEVudW1UeXBlLCBlbnVtVHlwZTogYW55KSB7XG4gICAgbGV0IGlzVmFsaWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBPYmplY3Qua2V5cyhlbnVtVHlwZSkuZm9yRWFjaCgoZW51bUtleSkgPT4ge1xuICAgICAgaWYgKGVudW1UeXBlW2VudW1LZXldID09PSBlbnVtVmFsdWUudG9TdHJpbmcoKSkge1xuICAgICAgICBpc1ZhbGlkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICghaXNWYWxpZCkge1xuICAgICAgdGhyb3cgbmV3IFRhYmxlYXVFcnJvcihFcnJvckNvZGVzLkludmFsaWRQYXJhbWV0ZXIsIGAke2VudW1WYWx1ZX0gaXMgaW52YWxpZCB2YWx1ZSBmb3IgZW51bTogJHtlbnVtVHlwZX1gKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVmVyaWZpZXMgdGhlIHBhcmFtcyBtaW4gYW5kIG1heCBmb3IgYXBwbHlpbmcgcmFuZ2UgZmlsdGVyLlxuICAgKiBUaHJvd3Mgd2l0aCBlcnJvciBjb2RlIEludmFsaWRQYXJhbWV0ZXIgaWYgcmFuZ2UgaXMgaW52YWxpZC5cbiAgICpcbiAgICogQHBhcmFtIG1pbiByYW5nZSBtaW5cbiAgICogQHBhcmFtIG1heCByYW5nZSBtYXhcbiAgICovXG4gIC8qdHNsaW50OmRpc2FibGUtbmV4dC1saW5lICovXG4gIHB1YmxpYyBzdGF0aWMgdmVyaWZ5UmFuZ2VQYXJhbVR5cGUobWluOiBhbnksIG1heDogYW55KTogdm9pZCB7XG4gICAgaWYgKCFtaW4gJiYgIW1heCkge1xuICAgICAgdGhyb3cgbmV3IFRhYmxlYXVFcnJvcihFcnJvckNvZGVzLkludmFsaWRQYXJhbWV0ZXIsXG4gICAgICAgICdVbmV4cGVjdGVkIGludmFsaWQgcGFyYW0gdmFsdWUsIGF0IGxlYXN0IG9uZSBvZiBtaW4gb3IgbWF4IGlzIHJlcXVpcmVkLicpO1xuICAgIH1cblxuICAgIGlmIChtaW4gJiYgIVBhcmFtLmlzVHlwZU51bWJlcihtaW4pICYmICFQYXJhbS5pc1R5cGVEYXRlKG1pbikpIHtcbiAgICAgIHRocm93IG5ldyBUYWJsZWF1RXJyb3IoRXJyb3JDb2Rlcy5JbnZhbGlkUGFyYW1ldGVyLFxuICAgICAgICAnVW5leHBlY3RlZCBpbnZhbGlkIHBhcmFtIHZhbHVlLCBvbmx5IERhdGUgYW5kIG51bWJlciBhcmUgYWxsb3dlZCBmb3IgcGFyYW1ldGVyIG1pbi4nKTtcbiAgICB9XG5cbiAgICBpZiAobWF4ICYmICFQYXJhbS5pc1R5cGVOdW1iZXIobWF4KSAmJiAhUGFyYW0uaXNUeXBlRGF0ZShtYXgpKSB7XG4gICAgICB0aHJvdyBuZXcgVGFibGVhdUVycm9yKEVycm9yQ29kZXMuSW52YWxpZFBhcmFtZXRlcixcbiAgICAgICAgJ1VuZXhwZWN0ZWQgaW52YWxpZCBwYXJhbSB2YWx1ZSwgb25seSBEYXRlIGFuZCBudW1iZXIgYXJlIGFsbG93ZWQgZm9yIHBhcmFtZXRlciBtYXguJyk7XG4gICAgfVxuXG4gICAgaWYgKG1pbiAmJiBtYXggJiYgdHlwZW9mIChtaW4pICE9PSB0eXBlb2YgKG1heCkpIHtcbiAgICAgIHRocm93IG5ldyBUYWJsZWF1RXJyb3IoRXJyb3JDb2Rlcy5JbnZhbGlkUGFyYW1ldGVyLFxuICAgICAgICAnVW5leHBlY3RlZCBpbnZhbGlkIHBhcmFtIHZhbHVlLCBwYXJhbWV0ZXJzIG1pbiBhbmQgbWF4IHNob3VsZCBiZSBvZiB0aGUgc2FtZSB0eXBlLicpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBWZXJpZmllcyB0aGF0IHRoZSB6b25lSWQgaXMgcHJlc2VudCBpbiB0aGUgY3VycmVudCBkYXNoYm9hcmQgYW5kIGlzIEZsb2F0aW5nLlxuICAgKiBUaHJvd3Mgd2l0aCBlcnJvciBjb2RlIEludmFsaWRQYXJhbWV0ZXIgaWYgZWl0aGVyIGNvbmRpdGlvbiBpcyBmYWxzZS5cbiAgICpcbiAgICogQHBhcmFtIGRhc2hib2FyZE9iamVjdHMgQW4gYXJyYXkgb2YgYWxsIERhc2hib2FyZE9iamVjdHMgaW4gdGhlIGN1cnJlbnQgZGFzaGJvYXJkXG4gICAqIEBwYXJhbSB6b25lSUQgWm9uZUlkIHRvIGJlIHZhbGlkYXRlZFxuICAgKi9cbiAgcHVibGljIHN0YXRpYyB2ZXJpZnlab25lSXNWYWxpZChkYXNoYm9hcmRPYmplY3RzOiBBcnJheTxEYXNoYm9hcmRPYmplY3Q+LCB6b25lSUQ6IG51bWJlcik6IHZvaWQge1xuXG4gICAgbGV0IGlzVmFsaWQgPSBkYXNoYm9hcmRPYmplY3RzLnNvbWUoKGRhc2hib2FyZE9iamVjdCkgPT4ge1xuICAgICAgcmV0dXJuIGRhc2hib2FyZE9iamVjdC5pZCA9PT0gem9uZUlEICYmIGRhc2hib2FyZE9iamVjdC5pc0Zsb2F0aW5nO1xuICAgIH0pO1xuXG4gICAgaWYgKCFpc1ZhbGlkKSB7XG4gICAgICB0aHJvdyBuZXcgVGFibGVhdUVycm9yKEVycm9yQ29kZXMuSW52YWxpZFBhcmFtZXRlcixcbiAgICAgICAgYFVuZXhwZWN0ZWQgaW52YWxpZCBwYXJhbSB2YWx1ZSwgWm9uZSBJZDogJHt6b25lSUR9IGlzIGVpdGhlciBub3QgcHJlc2VudCBvciBpcyBhIGZpeGVkIHpvbmUuYCk7XG4gICAgfVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vLi4vc3JjL0FwaVNoYXJlZC9VdGlscy9FcnJvckhlbHBlcnMudHMiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hbi1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pcy1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuL19yZWRlZmluZScpO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uICh0eXBlLCBuYW1lLCBzb3VyY2UpIHtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkY7XG4gIHZhciBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HO1xuICB2YXIgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuUztcbiAgdmFyIElTX1BST1RPID0gdHlwZSAmICRleHBvcnQuUDtcbiAgdmFyIElTX0JJTkQgPSB0eXBlICYgJGV4cG9ydC5CO1xuICB2YXIgdGFyZ2V0ID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIHx8IChnbG9iYWxbbmFtZV0gPSB7fSkgOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdO1xuICB2YXIgZXhwb3J0cyA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pO1xuICB2YXIgZXhwUHJvdG8gPSBleHBvcnRzW1BST1RPVFlQRV0gfHwgKGV4cG9ydHNbUFJPVE9UWVBFXSA9IHt9KTtcbiAgdmFyIGtleSwgb3duLCBvdXQsIGV4cDtcbiAgaWYgKElTX0dMT0JBTCkgc291cmNlID0gbmFtZTtcbiAgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IChvd24gPyB0YXJnZXQgOiBzb3VyY2UpW2tleV07XG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICBleHAgPSBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHRlbmQgZ2xvYmFsXG4gICAgaWYgKHRhcmdldCkgcmVkZWZpbmUodGFyZ2V0LCBrZXksIG91dCwgdHlwZSAmICRleHBvcnQuVSk7XG4gICAgLy8gZXhwb3J0XG4gICAgaWYgKGV4cG9ydHNba2V5XSAhPSBvdXQpIGhpZGUoZXhwb3J0cywga2V5LCBleHApO1xuICAgIGlmIChJU19QUk9UTyAmJiBleHBQcm90b1trZXldICE9IG91dCkgZXhwUHJvdG9ba2V5XSA9IG91dDtcbiAgfVxufTtcbmdsb2JhbC5jb3JlID0gY29yZTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgIC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAgLy8gd3JhcFxuJGV4cG9ydC5VID0gNjQ7ICAvLyBzYWZlXG4kZXhwb3J0LlIgPSAxMjg7IC8vIHJlYWwgcHJvdG8gbWV0aG9kIGZvciBgbGlicmFyeWBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2V4cG9ydC5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgRXJyb3JDb2RlcyB9IGZyb20gJy4uLy4uLy4uL1NoYXJlZEFwaUV4dGVybmFsQ29udHJhY3QnO1xuXG5pbXBvcnQge1xuICBFeGVjdXRlUGFyYW1ldGVycyxcbiAgRXhlY3V0ZVJlc3BvbnNlLFxuICBJbnRlcm5hbEFwaURpc3BhdGNoZXIsXG4gIEludGVybmFsVGFibGVhdUVycm9yLFxuICBWZXJiSWRcbn0gZnJvbSAnQHRhYmxlYXUvYXBpLWludGVybmFsLWNvbnRyYWN0LWpzJztcblxuaW1wb3J0IHsgSW50ZXJuYWxUb0V4dGVybmFsRW51bU1hcHBpbmdzIH0gZnJvbSAnLi4vLi4vRW51bU1hcHBpbmdzL0ludGVybmFsVG9FeHRlcm5hbEVudW1NYXBwaW5ncyc7XG5pbXBvcnQgeyBUYWJsZWF1RXJyb3IgfSBmcm9tICcuLi8uLi9UYWJsZWF1RXJyb3InO1xuaW1wb3J0IHsgU2hvdWxkVGhyb3cgfSBmcm9tICcuLi8uLi9VdGlscy9FbnVtQ29udmVydGVyJztcblxuLyoqXG4gKiBFYWNoIFNlcnZjZUltcGwgc2hvdWxkIGV4dGVuZCB0aGlzIGJhc2UgY2xhc3MgZm9yIHRoZSBzYWtlIG9mXG4gKiBwcm9wZXIgZXJyb3IgaGFuZGxpbmcuICBUaGlzIGJhc2UgaGFuZGxlcyB0aGUgY29udmVyc2lvblxuICogZnJvbSBpbnRlcm5hbCBlcnJvcnMgdG8gZXh0ZXJuYWwgZXJyb3JzIHRoYXQgd2UgdGhyb3cgdG8gZGV2ZWxvcGVyc1xuICovXG5leHBvcnQgY2xhc3MgU2VydmljZUltcGxCYXNlIHtcbiAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgX2Rpc3BhdGNoZXI6IEludGVybmFsQXBpRGlzcGF0Y2hlcikgeyB9XG5cbiAgcHJvdGVjdGVkIGV4ZWN1dGUodmVyYjogVmVyYklkLCBwYXJhbXM6IEV4ZWN1dGVQYXJhbWV0ZXJzKTogUHJvbWlzZTxFeGVjdXRlUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5fZGlzcGF0Y2hlci5leGVjdXRlKHZlcmIsIHBhcmFtcykuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAvLyBBbnkgaW50ZXJuYWwgZXJyb3IgdGhhdCBjb21lcyBmcm9tIHRoZSBkaXNwYXRjaGVyIHNob3VsZCBiZSBjb252ZXJ0ZWRcbiAgICAgIC8vIHRvIGFuIGV4dGVybmFsIGVycm9yIHVzaW5nIHRoZSBlbnVtIG1hcHBlciBmb3IgZXJyb3IgY29kZXMuXG4gICAgICBjb25zdCBpbnRlcm5hbEVycm9yID0gZXJyb3IgYXMgSW50ZXJuYWxUYWJsZWF1RXJyb3I7XG4gICAgICBjb25zdCBleHRlcm5hbEVycm9yQ29kZTogRXJyb3JDb2RlcyA9IEludGVybmFsVG9FeHRlcm5hbEVudW1NYXBwaW5ncy5lcnJvckNvZGUuY29udmVydChpbnRlcm5hbEVycm9yLmVycm9yQ29kZSwgU2hvdWxkVGhyb3cuTm8pO1xuICAgICAgdGhyb3cgbmV3IFRhYmxlYXVFcnJvcihleHRlcm5hbEVycm9yQ29kZSwgaW50ZXJuYWxFcnJvci5tZXNzYWdlKTtcbiAgICB9KTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uLy4uLy4uL3NyYy9BcGlTaGFyZWQvU2VydmljZXMvaW1wbC9TZXJ2aWNlSW1wbEJhc2UudHMiLCJ2YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19oaWRlLmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge1xuICBDb2x1bW5UeXBlIGFzIEV4dGVybmFsQ29sdW1uVHlwZSxcbiAgRGFzaGJvYXJkT2JqZWN0VHlwZSBhcyBFeHRlcm5hbERhc2hib2FyZE9iamVjdFR5cGUsXG4gIERhdGFUeXBlIGFzIEV4dGVybmFsRGF0YVR5cGUsXG4gIERhdGVSYW5nZVR5cGUgYXMgRXh0ZXJuYWxEYXRlUmFuZ2VUeXBlLFxuICBFcnJvckNvZGVzIGFzIEV4dGVybmFsRXJyb3JDb2RlcyxcbiAgRXh0ZW5zaW9uQ29udGV4dCBhcyBFeHRlcm5hbEV4dGVuc2lvbnNDb250ZXh0LFxuICBFeHRlbnNpb25Nb2RlIGFzIEV4dGVybmFsRXh0ZW5zaW9uc01vZGUsXG4gIEZpZWxkQWdncmVnYXRpb25UeXBlIGFzIEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUsXG4gIEZpZWxkUm9sZVR5cGUgYXMgRXh0ZXJuYWxGaWVsZFJvbGVUeXBlLFxuICBGaWx0ZXJUeXBlIGFzIEV4dGVybmFsRmlsdGVyVHlwZSxcbiAgRmlsdGVyVXBkYXRlVHlwZSBhcyBFeHRlcm5hbEZpbHRlclVwZGF0ZVR5cGUsXG4gIFBhcmFtZXRlclZhbHVlVHlwZSBhcyBFeHRlcm5hbFBhcmFtZXRlclZhbHVlVHlwZSxcbiAgUGVyaW9kVHlwZSBhcyBFeHRlcm5hbERhdGVQZXJpb2QsXG4gIFNoZWV0VHlwZSBhcyBFeHRlcm5hbFNoZWV0VHlwZSxcbn0gZnJvbSAnLi4vLi4vU2hhcmVkQXBpRXh0ZXJuYWxDb250cmFjdCc7XG5cbmltcG9ydCB7XG4gIENvbHVtblR5cGUgYXMgSW50ZXJuYWxDb2x1bW5UeXBlLFxuICBEYXNoYm9hcmRPYmplY3RUeXBlIGFzIEludGVybmFsRGFzaGJvYXJkT2JqZWN0VHlwZSxcbiAgRGF0YVR5cGUgYXMgSW50ZXJuYWxEYXRhVHlwZSxcbiAgRGF0ZVJhbmdlVHlwZSBhcyBJbnRlcm5hbERhdGVSYW5nZVR5cGUsXG4gIERhdGVTdGVwUGVyaW9kIGFzIEludGVybmFsRGF0ZVN0ZXBQZXJpb2QsXG4gIERvbWFpblJlc3RyaWN0aW9uVHlwZSBhcyBJbnRlcm5hbERvbWFpblJlc3RyaWN0aW9uVHlwZSxcbiAgRXJyb3JDb2RlcyBhcyBJbnRlcm5hbEVycm9yQ29kZXMsXG4gIEV4dGVuc2lvbkNvbnRleHQgYXMgSW50ZXJuYWxFeHRlbnNpb25zQ29udGV4dCxcbiAgRXh0ZW5zaW9uTW9kZSBhcyBJbnRlcm5hbEV4dGVuc2lvbnNNb2RlLFxuICBGaWVsZEFnZ3JlZ2F0aW9uVHlwZSBhcyBJbnRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLFxuICBGaWVsZFJvbGVUeXBlIGFzIEludGVybmFsRmllbGRSb2xlVHlwZSxcbiAgRmlsdGVyVHlwZSBhcyBJbnRlcm5hbEZpbHRlclR5cGUsXG4gIEZpbHRlclVwZGF0ZVR5cGUgYXMgSW50ZXJuYWxGaWx0ZXJVcGRhdGVUeXBlLFxuICBTaGVldFR5cGUgYXMgSW50ZXJuYWxTaGVldFR5cGUsXG59IGZyb20gJ0B0YWJsZWF1L2FwaS1pbnRlcm5hbC1jb250cmFjdC1qcyc7XG5cbmltcG9ydCB7IEVudW1Db252ZXJ0ZXIgfSBmcm9tICcuLi9VdGlscy9FbnVtQ29udmVydGVyJztcblxuLyogdHNsaW50OmRpc2FibGU6dHlwZWRlZiAtIERpc2FibGUgdGhpcyB0byBtYWtlIGRlY2xhcmluZyB0aGVzZSBjbGFzc2VzIGEgYml0IGVhc2llciAqL1xuLyoqXG4gKiBNYXBzIGVudW1zIHVzZWQgYnkgdGhlIGludGVybmFsLWFwaS1jb250cmFjdCB0byB0aGUgZW51bXMgdXNlZFxuICogaW4gdGhlIGV4dGVybmFsLWFwaS1jb250cmFjdCwgd2hpY2ggZGV2ZWxvcGVycyBjb2RlIGFnYWluc3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBJbnRlcm5hbFRvRXh0ZXJuYWxFbnVtTWFwcGluZ3Mge1xuICBwdWJsaWMgc3RhdGljIGV4dGVuc2lvbkNvbnRleHQgPSBuZXcgRW51bUNvbnZlcnRlcjxJbnRlcm5hbEV4dGVuc2lvbnNDb250ZXh0LCBFeHRlcm5hbEV4dGVuc2lvbnNDb250ZXh0Pih7XG4gICAgW0ludGVybmFsRXh0ZW5zaW9uc0NvbnRleHQuRGVza3RvcF06IEV4dGVybmFsRXh0ZW5zaW9uc0NvbnRleHQuRGVza3RvcCxcbiAgICBbSW50ZXJuYWxFeHRlbnNpb25zQ29udGV4dC5TZXJ2ZXJdOiBFeHRlcm5hbEV4dGVuc2lvbnNDb250ZXh0LlNlcnZlclxuICB9KTtcblxuICBwdWJsaWMgc3RhdGljIGV4dGVuc2lvbk1vZGUgPSBuZXcgRW51bUNvbnZlcnRlcjxJbnRlcm5hbEV4dGVuc2lvbnNNb2RlLCBFeHRlcm5hbEV4dGVuc2lvbnNNb2RlPih7XG4gICAgW0ludGVybmFsRXh0ZW5zaW9uc01vZGUuQXV0aG9yaW5nXTogRXh0ZXJuYWxFeHRlbnNpb25zTW9kZS5BdXRob3JpbmcsXG4gICAgW0ludGVybmFsRXh0ZW5zaW9uc01vZGUuVmlld2luZ106IEV4dGVybmFsRXh0ZW5zaW9uc01vZGUuVmlld2luZ1xuICB9KTtcblxuICBwdWJsaWMgc3RhdGljIGNvbHVtblR5cGUgPSBuZXcgRW51bUNvbnZlcnRlcjxJbnRlcm5hbENvbHVtblR5cGUsIEV4dGVybmFsQ29sdW1uVHlwZT4oe1xuICAgIFtJbnRlcm5hbENvbHVtblR5cGUuQ29udGludW91c106IEV4dGVybmFsQ29sdW1uVHlwZS5Db250aW51b3VzLFxuICAgIFtJbnRlcm5hbENvbHVtblR5cGUuRGlzY3JldGVdOiBFeHRlcm5hbENvbHVtblR5cGUuRGlzY3JldGVcbiAgfSk7XG5cbiAgcHVibGljIHN0YXRpYyBmaWVsZEFnZ3JlZ2F0aW9uVHlwZSA9IG5ldyBFbnVtQ29udmVydGVyPEludGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUsIEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGU+KHtcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5BdHRyXTogRXh0ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5BdHRyLFxuICAgIFtJbnRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLkF2Z106IEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuQXZnLFxuICAgIFtJbnRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLkNvdW50XTogRXh0ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5Db3VudCxcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5Db3VudGRdOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLkNvdW50ZCxcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5EYXldOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLkRheSxcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5FbmRdOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLkVuZCxcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5Ib3VyXTogRXh0ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5Ib3VyLFxuICAgIFtJbnRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLkluT3V0XTogRXh0ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5Jbk91dCxcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5LdXJ0b3Npc106IEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuS3VydG9zaXMsXG4gICAgW0ludGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuTWF4XTogRXh0ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5NYXgsXG4gICAgW0ludGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuTWR5XTogRXh0ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5NZHksXG4gICAgW0ludGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuTWVkaWFuXTogRXh0ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5NZWRpYW4sXG4gICAgW0ludGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuTWluXTogRXh0ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5NaW4sXG4gICAgW0ludGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuTWludXRlXTogRXh0ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5NaW51dGUsXG4gICAgW0ludGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuTW9udGhZZWFyXTogRXh0ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5Nb250aFllYXIsXG4gICAgW0ludGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuTm9uZV06IEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuTm9uZSxcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5RdHJdOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlF0cixcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5RdWFydDFdOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlF1YXJ0MSxcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5RdWFydDNdOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlF1YXJ0MyxcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5TZWNvbmRdOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlNlY29uZCxcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5Ta2V3bmVzc106IEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuU2tld25lc3MsXG4gICAgW0ludGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuU3RkZXZdOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlN0ZGV2LFxuICAgIFtJbnRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlN0ZGV2cF06IEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuU3RkZXZwLFxuICAgIFtJbnRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlN1bV06IEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuU3VtLFxuICAgIFtJbnRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlRydW5jRGF5XTogRXh0ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5UcnVuY0RheSxcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5UcnVuY0hvdXJdOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlRydW5jSG91cixcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5UcnVuY01pbnV0ZV06IEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuVHJ1bmNNaW51dGUsXG4gICAgW0ludGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuVHJ1bmNNb250aF06IEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuVHJ1bmNNb250aCxcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5UcnVuY1F0cl06IEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuVHJ1bmNRdHIsXG4gICAgW0ludGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuVHJ1bmNTZWNvbmRdOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlRydW5jU2Vjb25kLFxuICAgIFtJbnRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlRydW5jV2Vla106IEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuVHJ1bmNXZWVrLFxuICAgIFtJbnRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlRydW5jWWVhcl06IEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuVHJ1bmNZZWFyLFxuICAgIFtJbnRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlVzZXJdOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlVzZXIsXG4gICAgW0ludGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuVmFyXTogRXh0ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5WYXIsXG4gICAgW0ludGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuVmFycF06IEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuVmFycCxcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5XZWVrXTogRXh0ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5XZWVrLFxuICAgIFtJbnRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLldlZWtkYXldOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLldlZWtkYXksXG4gICAgW0ludGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuWWVhcl06IEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuWWVhcixcbiAgfSk7XG5cbiAgcHVibGljIHN0YXRpYyBmaWVsZFJvbGVUeXBlID0gbmV3IEVudW1Db252ZXJ0ZXI8SW50ZXJuYWxGaWVsZFJvbGVUeXBlLCBFeHRlcm5hbEZpZWxkUm9sZVR5cGU+KHtcbiAgICBbSW50ZXJuYWxGaWVsZFJvbGVUeXBlLkRpbWVuc2lvbl06IEV4dGVybmFsRmllbGRSb2xlVHlwZS5EaW1lbnNpb24sXG4gICAgW0ludGVybmFsRmllbGRSb2xlVHlwZS5NZWFzdXJlXTogRXh0ZXJuYWxGaWVsZFJvbGVUeXBlLk1lYXN1cmUsXG4gICAgW0ludGVybmFsRmllbGRSb2xlVHlwZS5Vbmtub3duXTogRXh0ZXJuYWxGaWVsZFJvbGVUeXBlLlVua25vd24sXG4gIH0pO1xuXG4gIHB1YmxpYyBzdGF0aWMgc2hlZXRUeXBlID0gbmV3IEVudW1Db252ZXJ0ZXI8SW50ZXJuYWxTaGVldFR5cGUsIEV4dGVybmFsU2hlZXRUeXBlPih7XG4gICAgW0ludGVybmFsU2hlZXRUeXBlLkRhc2hib2FyZF06IEV4dGVybmFsU2hlZXRUeXBlLkRhc2hib2FyZCxcbiAgICBbSW50ZXJuYWxTaGVldFR5cGUuU3RvcnldOiBFeHRlcm5hbFNoZWV0VHlwZS5TdG9yeSxcbiAgICBbSW50ZXJuYWxTaGVldFR5cGUuV29ya3NoZWV0XTogRXh0ZXJuYWxTaGVldFR5cGUuV29ya3NoZWV0XG4gIH0pO1xuXG4gIHB1YmxpYyBzdGF0aWMgZGFzaGJvYXJkT2JqZWN0VHlwZSA9IG5ldyBFbnVtQ29udmVydGVyPEludGVybmFsRGFzaGJvYXJkT2JqZWN0VHlwZSwgRXh0ZXJuYWxEYXNoYm9hcmRPYmplY3RUeXBlPih7XG4gICAgW0ludGVybmFsRGFzaGJvYXJkT2JqZWN0VHlwZS5FeHRlbnNpb25dOiBFeHRlcm5hbERhc2hib2FyZE9iamVjdFR5cGUuRXh0ZW5zaW9uLFxuICAgIFtJbnRlcm5hbERhc2hib2FyZE9iamVjdFR5cGUuQmxhbmtdOiBFeHRlcm5hbERhc2hib2FyZE9iamVjdFR5cGUuQmxhbmssXG4gICAgW0ludGVybmFsRGFzaGJvYXJkT2JqZWN0VHlwZS5JbWFnZV06IEV4dGVybmFsRGFzaGJvYXJkT2JqZWN0VHlwZS5JbWFnZSxcbiAgICBbSW50ZXJuYWxEYXNoYm9hcmRPYmplY3RUeXBlLkxlZ2VuZF06IEV4dGVybmFsRGFzaGJvYXJkT2JqZWN0VHlwZS5MZWdlbmQsXG4gICAgW0ludGVybmFsRGFzaGJvYXJkT2JqZWN0VHlwZS5QYWdlRmlsdGVyXTogRXh0ZXJuYWxEYXNoYm9hcmRPYmplY3RUeXBlLlBhZ2VGaWx0ZXIsXG4gICAgW0ludGVybmFsRGFzaGJvYXJkT2JqZWN0VHlwZS5QYXJhbWV0ZXJDb250cm9sXTogRXh0ZXJuYWxEYXNoYm9hcmRPYmplY3RUeXBlLlBhcmFtZXRlckNvbnRyb2wsXG4gICAgW0ludGVybmFsRGFzaGJvYXJkT2JqZWN0VHlwZS5RdWlja0ZpbHRlcl06IEV4dGVybmFsRGFzaGJvYXJkT2JqZWN0VHlwZS5RdWlja0ZpbHRlcixcbiAgICBbSW50ZXJuYWxEYXNoYm9hcmRPYmplY3RUeXBlLlRleHRdOiBFeHRlcm5hbERhc2hib2FyZE9iamVjdFR5cGUuVGV4dCxcbiAgICBbSW50ZXJuYWxEYXNoYm9hcmRPYmplY3RUeXBlLlRpdGxlXTogRXh0ZXJuYWxEYXNoYm9hcmRPYmplY3RUeXBlLlRpdGxlLFxuICAgIFtJbnRlcm5hbERhc2hib2FyZE9iamVjdFR5cGUuV2ViUGFnZV06IEV4dGVybmFsRGFzaGJvYXJkT2JqZWN0VHlwZS5XZWJQYWdlLFxuICAgIFtJbnRlcm5hbERhc2hib2FyZE9iamVjdFR5cGUuV29ya3NoZWV0XTogRXh0ZXJuYWxEYXNoYm9hcmRPYmplY3RUeXBlLldvcmtzaGVldFxuICB9KTtcblxuICBwdWJsaWMgc3RhdGljIGRhdGFUeXBlID0gbmV3IEVudW1Db252ZXJ0ZXI8SW50ZXJuYWxEYXRhVHlwZSwgRXh0ZXJuYWxEYXRhVHlwZT4oe1xuICAgIFtJbnRlcm5hbERhdGFUeXBlLkJvb2xdOiBFeHRlcm5hbERhdGFUeXBlLkJvb2wsXG4gICAgW0ludGVybmFsRGF0YVR5cGUuRGF0ZV06IEV4dGVybmFsRGF0YVR5cGUuRGF0ZSxcbiAgICBbSW50ZXJuYWxEYXRhVHlwZS5EYXRlVGltZV06IEV4dGVybmFsRGF0YVR5cGUuRGF0ZVRpbWUsXG4gICAgW0ludGVybmFsRGF0YVR5cGUuRmxvYXRdOiBFeHRlcm5hbERhdGFUeXBlLkZsb2F0LFxuICAgIFtJbnRlcm5hbERhdGFUeXBlLkludF06IEV4dGVybmFsRGF0YVR5cGUuSW50LFxuICAgIFtJbnRlcm5hbERhdGFUeXBlLlN0cmluZ106IEV4dGVybmFsRGF0YVR5cGUuU3RyaW5nXG4gIH0pO1xuXG4gIHB1YmxpYyBzdGF0aWMgZmlsdGVyVXBkYXRlVHlwZSA9IG5ldyBFbnVtQ29udmVydGVyPEludGVybmFsRmlsdGVyVXBkYXRlVHlwZSwgRXh0ZXJuYWxGaWx0ZXJVcGRhdGVUeXBlPih7XG4gICAgW0ludGVybmFsRmlsdGVyVXBkYXRlVHlwZS5BZGRdOiBFeHRlcm5hbEZpbHRlclVwZGF0ZVR5cGUuQWRkLFxuICAgIFtJbnRlcm5hbEZpbHRlclVwZGF0ZVR5cGUuQWxsXTogRXh0ZXJuYWxGaWx0ZXJVcGRhdGVUeXBlLkFsbCxcbiAgICBbSW50ZXJuYWxGaWx0ZXJVcGRhdGVUeXBlLlJlbW92ZV06IEV4dGVybmFsRmlsdGVyVXBkYXRlVHlwZS5SZW1vdmUsXG4gICAgW0ludGVybmFsRmlsdGVyVXBkYXRlVHlwZS5SZXBsYWNlXTogRXh0ZXJuYWxGaWx0ZXJVcGRhdGVUeXBlLlJlcGxhY2VcbiAgfSk7XG5cbiAgcHVibGljIHN0YXRpYyBhbGxvd2FibGVWYWx1ZXMgPSBuZXcgRW51bUNvbnZlcnRlcjxJbnRlcm5hbERvbWFpblJlc3RyaWN0aW9uVHlwZSwgRXh0ZXJuYWxQYXJhbWV0ZXJWYWx1ZVR5cGU+KHtcbiAgICBbSW50ZXJuYWxEb21haW5SZXN0cmljdGlvblR5cGUuQWxsXTogRXh0ZXJuYWxQYXJhbWV0ZXJWYWx1ZVR5cGUuQWxsLFxuICAgIFtJbnRlcm5hbERvbWFpblJlc3RyaWN0aW9uVHlwZS5MaXN0XTogRXh0ZXJuYWxQYXJhbWV0ZXJWYWx1ZVR5cGUuTGlzdCxcbiAgICBbSW50ZXJuYWxEb21haW5SZXN0cmljdGlvblR5cGUuUmFuZ2VdOiBFeHRlcm5hbFBhcmFtZXRlclZhbHVlVHlwZS5SYW5nZVxuICB9KTtcblxuICBwdWJsaWMgc3RhdGljIGRhdGVTdGVwUGVyaW9kID0gbmV3IEVudW1Db252ZXJ0ZXI8SW50ZXJuYWxEYXRlU3RlcFBlcmlvZCwgRXh0ZXJuYWxEYXRlUGVyaW9kPih7XG4gICAgW0ludGVybmFsRGF0ZVN0ZXBQZXJpb2QuWWVhcnNdOiBFeHRlcm5hbERhdGVQZXJpb2QuWWVhcnMsXG4gICAgW0ludGVybmFsRGF0ZVN0ZXBQZXJpb2QuUXVhcnRlcnNdOiBFeHRlcm5hbERhdGVQZXJpb2QuUXVhcnRlcnMsXG4gICAgW0ludGVybmFsRGF0ZVN0ZXBQZXJpb2QuTW9udGhzXTogRXh0ZXJuYWxEYXRlUGVyaW9kLk1vbnRocyxcbiAgICBbSW50ZXJuYWxEYXRlU3RlcFBlcmlvZC5XZWVrc106IEV4dGVybmFsRGF0ZVBlcmlvZC5XZWVrcyxcbiAgICBbSW50ZXJuYWxEYXRlU3RlcFBlcmlvZC5EYXlzXTogRXh0ZXJuYWxEYXRlUGVyaW9kLkRheXMsXG4gICAgW0ludGVybmFsRGF0ZVN0ZXBQZXJpb2QuSG91cnNdOiBFeHRlcm5hbERhdGVQZXJpb2QuSG91cnMsXG4gICAgW0ludGVybmFsRGF0ZVN0ZXBQZXJpb2QuTWludXRlc106IEV4dGVybmFsRGF0ZVBlcmlvZC5NaW51dGVzLFxuICAgIFtJbnRlcm5hbERhdGVTdGVwUGVyaW9kLlNlY29uZHNdOiBFeHRlcm5hbERhdGVQZXJpb2QuU2Vjb25kc1xuICB9KTtcblxuICBwdWJsaWMgc3RhdGljIGRhdGVSYW5nZVR5cGUgPSBuZXcgRW51bUNvbnZlcnRlcjxJbnRlcm5hbERhdGVSYW5nZVR5cGUsIEV4dGVybmFsRGF0ZVJhbmdlVHlwZT4oe1xuICAgIFtJbnRlcm5hbERhdGVSYW5nZVR5cGUuQ3VycmVudF06IEV4dGVybmFsRGF0ZVJhbmdlVHlwZS5DdXJyZW50LFxuICAgIFtJbnRlcm5hbERhdGVSYW5nZVR5cGUuTGFzdF06IEV4dGVybmFsRGF0ZVJhbmdlVHlwZS5MYXN0LFxuICAgIFtJbnRlcm5hbERhdGVSYW5nZVR5cGUuTGFzdE5dOiBFeHRlcm5hbERhdGVSYW5nZVR5cGUuTGFzdE4sXG4gICAgW0ludGVybmFsRGF0ZVJhbmdlVHlwZS5OZXh0XTogRXh0ZXJuYWxEYXRlUmFuZ2VUeXBlLk5leHQsXG4gICAgW0ludGVybmFsRGF0ZVJhbmdlVHlwZS5OZXh0Tl06IEV4dGVybmFsRGF0ZVJhbmdlVHlwZS5OZXh0TixcbiAgICBbSW50ZXJuYWxEYXRlUmFuZ2VUeXBlLlRvRGF0ZV06IEV4dGVybmFsRGF0ZVJhbmdlVHlwZS5Ub0RhdGVcbiAgfSk7XG5cbiAgcHVibGljIHN0YXRpYyBlcnJvckNvZGUgPSBuZXcgRW51bUNvbnZlcnRlcjxJbnRlcm5hbEVycm9yQ29kZXMsIEV4dGVybmFsRXJyb3JDb2Rlcz4oe1xuICAgIFtJbnRlcm5hbEVycm9yQ29kZXMuSU5JVElBTElaQVRJT05fRVJST1JdOiBFeHRlcm5hbEVycm9yQ29kZXMuSW50ZXJuYWxFcnJvcixcbiAgICBbSW50ZXJuYWxFcnJvckNvZGVzLklOVEVSTkFMX0VSUk9SXTogRXh0ZXJuYWxFcnJvckNvZGVzLkludGVybmFsRXJyb3IsXG4gICAgW0ludGVybmFsRXJyb3JDb2Rlcy5NSVNTSU5HX0VOVU1fTUFQUElOR106IEV4dGVybmFsRXJyb3JDb2Rlcy5JbnRlcm5hbEVycm9yLFxuICAgIFtJbnRlcm5hbEVycm9yQ29kZXMuTUlTU0lOR19QQVJBTUVURVJdOiBFeHRlcm5hbEVycm9yQ29kZXMuSW50ZXJuYWxFcnJvcixcbiAgICBbSW50ZXJuYWxFcnJvckNvZGVzLlBFUk1JU1NJT05fREVOSUVEXTogRXh0ZXJuYWxFcnJvckNvZGVzLkludGVybmFsRXJyb3IsXG4gICAgW0ludGVybmFsRXJyb3JDb2Rlcy5QUkVTX01PREVMX1BBUlNJTkdfRVJST1JdOiBFeHRlcm5hbEVycm9yQ29kZXMuSW50ZXJuYWxFcnJvcixcbiAgICBbSW50ZXJuYWxFcnJvckNvZGVzLlVOS05PV05fVkVSQl9JRF06IEV4dGVybmFsRXJyb3JDb2Rlcy5JbnRlcm5hbEVycm9yLFxuICAgIFtJbnRlcm5hbEVycm9yQ29kZXMuVkVSU0lPTl9OT1RfQ09ORklHVVJFRF06IEV4dGVybmFsRXJyb3JDb2Rlcy5BUElOb3RJbml0aWFsaXplZCxcbiAgICBbSW50ZXJuYWxFcnJvckNvZGVzLlZJU0lCSUxJVFlfRVJST1JdOiBFeHRlcm5hbEVycm9yQ29kZXMuVmlzaWJpbGl0eUVycm9yLFxuICB9LCBFeHRlcm5hbEVycm9yQ29kZXMuSW50ZXJuYWxFcnJvcik7XG5cbiAgcHVibGljIHN0YXRpYyBmaWx0ZXJUeXBlID0gbmV3IEVudW1Db252ZXJ0ZXI8SW50ZXJuYWxGaWx0ZXJUeXBlLCBFeHRlcm5hbEZpbHRlclR5cGU+KHtcbiAgICBbSW50ZXJuYWxGaWx0ZXJUeXBlLkNhdGVnb3JpY2FsXTogRXh0ZXJuYWxGaWx0ZXJUeXBlLkNhdGVnb3JpY2FsLFxuICAgIFtJbnRlcm5hbEZpbHRlclR5cGUuUmFuZ2VdOiBFeHRlcm5hbEZpbHRlclR5cGUuUmFuZ2UsXG4gICAgW0ludGVybmFsRmlsdGVyVHlwZS5SZWxhdGl2ZURhdGVdOiBFeHRlcm5hbEZpbHRlclR5cGUuUmVsYXRpdmVEYXRlLFxuICAgIFtJbnRlcm5hbEZpbHRlclR5cGUuSGllcmFyY2hpY2FsXTogRXh0ZXJuYWxGaWx0ZXJUeXBlLkhpZXJhcmNoaWNhbFxuICB9KTtcbn1cbi8qIHRzbGludDplbmFibGU6dHlwZWRlZiAqL1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uLy4uL3NyYy9BcGlTaGFyZWQvRW51bU1hcHBpbmdzL0ludGVybmFsVG9FeHRlcm5hbEVudW1NYXBwaW5ncy50cyIsIi8vIFRoaXMgZmlsZSByZS1leHBvcnRzIGV2ZXJ5dGhpbmcgd2hpY2ggaXMgcGFydCBvZiB0aGUgZXh0ZW5zaW9ucyBhcGkgcHVibGljIGludGVyZmFjZVxuXG4vLyBFeHBvcnQgZXZlcnl0aGluZyBmcm9tIHRoZSBzaGFyZWQgZmlsZVxuZXhwb3J0ICogZnJvbSAnLi9TaGFyZWRBcGlFeHRlcm5hbENvbnRyYWN0JztcblxuLy8gRXhwb3J0IHRoZSBuYW1lc3BhY2VzIHdoaWNoIGFyZSBzcGVjaWZpYyB0byBleHRlbnNpb25zXG5leHBvcnQgeyBFeHRlbnNpb25zIH0gZnJvbSAnLi9FeHRlcm5hbENvbnRyYWN0L05hbWVzcGFjZXMvRXh0ZW5zaW9ucyc7XG5leHBvcnQgeyBEYXNoYm9hcmRDb250ZW50IH0gZnJvbSAnLi9FeHRlcm5hbENvbnRyYWN0L05hbWVzcGFjZXMvRGFzaGJvYXJkQ29udGVudCc7XG5leHBvcnQgeyBFbnZpcm9ubWVudCB9IGZyb20gJy4vRXh0ZXJuYWxDb250cmFjdC9OYW1lc3BhY2VzL0Vudmlyb25tZW50JztcbmV4cG9ydCB7IFNldHRpbmdzIH0gZnJvbSAnLi9FeHRlcm5hbENvbnRyYWN0L05hbWVzcGFjZXMvU2V0dGluZ3MnO1xuZXhwb3J0ICogZnJvbSAnLi9FeHRlcm5hbENvbnRyYWN0L05hbWVzcGFjZXMvVUknO1xuZXhwb3J0ICogZnJvbSAnLi9FeHRlcm5hbENvbnRyYWN0L05hbWVzcGFjZXMvVGFibGVhdSc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vc3JjL0V4dGVuc2lvbnNBcGlFeHRlcm5hbENvbnRyYWN0LnRzIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY29mLmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBTUkMgPSByZXF1aXJlKCcuL191aWQnKSgnc3JjJyk7XG52YXIgVE9fU1RSSU5HID0gJ3RvU3RyaW5nJztcbnZhciAkdG9TdHJpbmcgPSBGdW5jdGlvbltUT19TVFJJTkddO1xudmFyIFRQTCA9ICgnJyArICR0b1N0cmluZykuc3BsaXQoVE9fU1RSSU5HKTtcblxucmVxdWlyZSgnLi9fY29yZScpLmluc3BlY3RTb3VyY2UgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuICR0b1N0cmluZy5jYWxsKGl0KTtcbn07XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChPLCBrZXksIHZhbCwgc2FmZSkge1xuICB2YXIgaXNGdW5jdGlvbiA9IHR5cGVvZiB2YWwgPT0gJ2Z1bmN0aW9uJztcbiAgaWYgKGlzRnVuY3Rpb24pIGhhcyh2YWwsICduYW1lJykgfHwgaGlkZSh2YWwsICduYW1lJywga2V5KTtcbiAgaWYgKE9ba2V5XSA9PT0gdmFsKSByZXR1cm47XG4gIGlmIChpc0Z1bmN0aW9uKSBoYXModmFsLCBTUkMpIHx8IGhpZGUodmFsLCBTUkMsIE9ba2V5XSA/ICcnICsgT1trZXldIDogVFBMLmpvaW4oU3RyaW5nKGtleSkpKTtcbiAgaWYgKE8gPT09IGdsb2JhbCkge1xuICAgIE9ba2V5XSA9IHZhbDtcbiAgfSBlbHNlIGlmICghc2FmZSkge1xuICAgIGRlbGV0ZSBPW2tleV07XG4gICAgaGlkZShPLCBrZXksIHZhbCk7XG4gIH0gZWxzZSBpZiAoT1trZXldKSB7XG4gICAgT1trZXldID0gdmFsO1xuICB9IGVsc2Uge1xuICAgIGhpZGUoTywga2V5LCB2YWwpO1xuICB9XG4vLyBhZGQgZmFrZSBGdW5jdGlvbiN0b1N0cmluZyBmb3IgY29ycmVjdCB3b3JrIHdyYXBwZWQgbWV0aG9kcyAvIGNvbnN0cnVjdG9ycyB3aXRoIG1ldGhvZHMgbGlrZSBMb0Rhc2ggaXNOYXRpdmVcbn0pKEZ1bmN0aW9uLnByb3RvdHlwZSwgVE9fU1RSSU5HLCBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuIHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgJiYgdGhpc1tTUkNdIHx8ICR0b1N0cmluZy5jYWxsKHRoaXMpO1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19yZWRlZmluZS5qc1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19kZXNjcmlwdG9ycy5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIHRoYXQsIGxlbmd0aCkge1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZiAodGhhdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZm47XG4gIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uICgvKiAuLi5hcmdzICovKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fY3R4LmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faXRlcmF0b3JzLmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKTtcbnZhciBkUCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gZFAoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKSB0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZiAoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKSBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWRwLmpzXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9faGFzLmpzXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBnZXR0aW5nIHRhZyBmcm9tIDE5LjEuMy42IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcoKVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xudmFyIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuLy8gRVMzIHdyb25nIGhlcmVcbnZhciBBUkcgPSBjb2YoZnVuY3Rpb24gKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGl0W2tleV07XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIE8sIFQsIEI7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mIChUID0gdHJ5R2V0KE8gPSBPYmplY3QoaXQpLCBUQUcpKSA9PSAnc3RyaW5nJyA/IFRcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IEFSRyA/IGNvZihPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChCID0gY29mKE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogQjtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19jbGFzc29mLmpzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZhbHNlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fbGlicmFyeS5qc1xuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlkID0gMDtcbnZhciBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsraWQgKyBweCkudG9TdHJpbmcoMzYpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL191aWQuanNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2ZhaWxzLmpzXG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2RvbS1jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgPSBNYXRoLmNlaWw7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fdG8taW50ZWdlci5qc1xuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCA9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2RlZmluZWQuanNcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19vYmplY3Qta2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWlvYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19pb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLWxlbmd0aC5qc1xuLy8gbW9kdWxlIGlkID0gMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCdrZXlzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHNoYXJlZFtrZXldIHx8IChzaGFyZWRba2V5XSA9IHVpZChrZXkpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zaGFyZWQta2V5LmpzXG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZGVmID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIHRhZywgc3RhdCkge1xuICBpZiAoaXQgJiYgIWhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSkgZGVmKGl0LCBUQUcsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogdGFnIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3NldC10by1zdHJpbmctdGFnLmpzXG4vLyBtb2R1bGUgaWQgPSAzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3RvLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuLy8gMjUuNC4xLjUgTmV3UHJvbWlzZUNhcGFiaWxpdHkoQylcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5cbmZ1bmN0aW9uIFByb21pc2VDYXBhYmlsaXR5KEMpIHtcbiAgdmFyIHJlc29sdmUsIHJlamVjdDtcbiAgdGhpcy5wcm9taXNlID0gbmV3IEMoZnVuY3Rpb24gKCQkcmVzb2x2ZSwgJCRyZWplY3QpIHtcbiAgICBpZiAocmVzb2x2ZSAhPT0gdW5kZWZpbmVkIHx8IHJlamVjdCAhPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoJ0JhZCBQcm9taXNlIGNvbnN0cnVjdG9yJyk7XG4gICAgcmVzb2x2ZSA9ICQkcmVzb2x2ZTtcbiAgICByZWplY3QgPSAkJHJlamVjdDtcbiAgfSk7XG4gIHRoaXMucmVzb2x2ZSA9IGFGdW5jdGlvbihyZXNvbHZlKTtcbiAgdGhpcy5yZWplY3QgPSBhRnVuY3Rpb24ocmVqZWN0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMuZiA9IGZ1bmN0aW9uIChDKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZUNhcGFiaWxpdHkoQyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fbmV3LXByb21pc2UtY2FwYWJpbGl0eS5qc1xuLy8gbW9kdWxlIGlkID0gMzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICogYXMgQ29udHJhY3QgZnJvbSAnLi4vU2hhcmVkQXBpRXh0ZXJuYWxDb250cmFjdCc7XG5cbmltcG9ydCB7IFNpbmdsZUV2ZW50TWFuYWdlciB9IGZyb20gJy4vU2luZ2xlRXZlbnRNYW5hZ2VyJztcbmltcG9ydCB7IFRhYmxlYXVFcnJvciB9IGZyb20gJy4vVGFibGVhdUVycm9yJztcblxuLyoqXG4gKiBDbGFzcyBkZXNpZ25lZCB0byByZWdpc3RlciBhbmQgdW5yZWdpc3RlciBoYW5kbGVycyBmcm9tIGEgdXNlci4gT25seSB0aG9zZSBldmVudHNcbiAqIHdoaWNoIGFyZSBhZGRlZCB2aWEgQWRkTmV3RXZlbnRUeXBlIHdpbGwgYmUgc3VwcG9ydGVkIGJ5IHRoaXMgaW5zdGFuY2VcbiAqL1xuZXhwb3J0IGNsYXNzIEV2ZW50TGlzdGVuZXJNYW5hZ2VyIGltcGxlbWVudHMgQ29udHJhY3QuRXZlbnRMaXN0ZW5lck1hbmFnZXIge1xuICBwcml2YXRlIF9ldmVudExpc3RlbmVyTWFuYWdlcnM6IHsgW3RhYmxlYXVFdmVudFR5cGU6IHN0cmluZ106IFNpbmdsZUV2ZW50TWFuYWdlcjsgfTtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fZXZlbnRMaXN0ZW5lck1hbmFnZXJzID0ge307XG4gIH1cblxuICBwdWJsaWMgYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGU6IENvbnRyYWN0LlRhYmxlYXVFdmVudFR5cGUsXG4gICAgaGFuZGxlcjogQ29udHJhY3QuVGFibGVhdUV2ZW50SGFuZGxlckZuKTogQ29udHJhY3QuVGFibGVhdUV2ZW50VW5yZWdpc3RlckZuIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50TGlzdGVuZXJNYW5hZ2Vycy5oYXNPd25Qcm9wZXJ0eShldmVudFR5cGUpKSB7XG4gICAgICB0aHJvdyBuZXcgVGFibGVhdUVycm9yKENvbnRyYWN0LkVycm9yQ29kZXMuVW5zdXBwb3J0ZWRFdmVudE5hbWUsIGBDYW5ub3QgYWRkIGV2ZW50LCB1bnN1cHBvcnRlZCBldmVudCB0eXBlOiAke2V2ZW50VHlwZX1gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fZXZlbnRMaXN0ZW5lck1hbmFnZXJzW2V2ZW50VHlwZV0uYWRkRXZlbnRMaXN0ZW5lcihoYW5kbGVyKTtcbiAgfVxuXG4gIHB1YmxpYyByZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50VHlwZTogQ29udHJhY3QuVGFibGVhdUV2ZW50VHlwZSwgaGFuZGxlcjogQ29udHJhY3QuVGFibGVhdUV2ZW50SGFuZGxlckZuKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLl9ldmVudExpc3RlbmVyTWFuYWdlcnMuaGFzT3duUHJvcGVydHkoZXZlbnRUeXBlKSkge1xuICAgICAgdGhyb3cgbmV3IFRhYmxlYXVFcnJvcihDb250cmFjdC5FcnJvckNvZGVzLlVuc3VwcG9ydGVkRXZlbnROYW1lLCBgQ2Fubm90IHJlbW92ZSBldmVudCwgdW5zdXBwb3J0ZWQgZXZlbnQgdHlwZTogJHtldmVudFR5cGV9YCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2V2ZW50TGlzdGVuZXJNYW5hZ2Vyc1tldmVudFR5cGVdLnJlbW92ZUV2ZW50TGlzdGVuZXIoaGFuZGxlcik7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWRkTmV3RXZlbnRUeXBlKGV2ZW50TWFuYWdlcjogU2luZ2xlRXZlbnRNYW5hZ2VyKTogdm9pZCB7XG4gICAgdGhpcy5fZXZlbnRMaXN0ZW5lck1hbmFnZXJzW2V2ZW50TWFuYWdlci5ldmVudFR5cGVdID0gZXZlbnRNYW5hZ2VyO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vc3JjL0FwaVNoYXJlZC9FdmVudExpc3RlbmVyTWFuYWdlci50cyIsImltcG9ydCB7IFZlcnNpb25OdW1iZXIsIFZlcmJJZCwgRXhlY3V0ZVBhcmFtZXRlcnMsIE1vZGVsLCBOb3RpZmljYXRpb25JZCB9IGZyb20gJy4uLy4uL0pzQXBpSW50ZXJuYWxDb250cmFjdCc7XG5pbXBvcnQgeyBJbml0aWFsaXphdGlvbk9wdGlvbnMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvSW5pdGlhbGl6YXRpb25PcHRpb25zJztcblxuLyoqXG4gKiBFbnVtIGRlZmluaW5nIHRoZSA0IGRpZmZlcmVudCB0eXBlcyBvZiBtZXNzYWdlcyB3ZSBoYXZlIGRlZmluZWRcbiAqL1xuZXhwb3J0IGVudW0gTWVzc2FnZVR5cGUge1xuICBJbml0aWFsaXplID0gJ2luaXRpYWxpemUnLFxuICBOb3RpZmljYXRpb24gPSAnbm90aWZpY2F0aW9uJyxcbiAgQ29tbWFuZCA9ICdjb21tYW5kJyxcbiAgQ29tbWFuZFJlc3BvbnNlID0gJ2NvbW1hbmQtcmVzcG9uc2UnXG59XG5cbi8qKlxuICogVGhlIE1lc3NhZ2UgaW50ZXJmYWNlIGlzIHRoZSBiYXNlIGludGVyZmFjZSBmb3IgYWxsIHRoZSBvdGhlclxuICogbWVzc2FnZSB0eXBlIGludGVyZmFjZXMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTWVzc2FnZSB7XG4gIC8qKlxuICAgKiBBIHVuaXF1ZSBpZCBmb3IgdGhpcyBtZXNzYWdlXG4gICAqL1xuICBtc2dHdWlkOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSB0eXBlIG9mIHRoaXMgbWVzc2FnZVxuICAgKi9cbiAgbXNnVHlwZTogTWVzc2FnZVR5cGU7XG59XG5cbi8qKlxuICogVGhlIGluaXRpYWxpemUgbWVzc2FnZSBpcyB0aGUgZmlyc3QgbWVzc2FnZSB3aGljaCB3aWxsIGJlIHNlbnRcbiAqIGZyb20gdGhlIGphdmFzY3JpcHQgdG8gc2V0IHVwIGNvbW11bmljYXRpb25zXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSW5pdGlhbGl6ZU1lc3NhZ2UgZXh0ZW5kcyBNZXNzYWdlIHtcbiAgLyoqXG4gICAqIFRoZSB2ZXJzaW9uIG9mIHRoZSBhcGkgd2hpY2ggdGhlIHNlbmRlciB3YW50cyB0byB1c2VcbiAgICovXG4gIGFwaVZlcnNpb246IFZlcnNpb25OdW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSB2ZXJzaW9uIG9mIHRoaXMgbWVzc2FnaW5nIGNvbnRyYWN0IHRvIGJlIHVzZWQuIEZvciBub3csIHRoZXJlXG4gICAqIHNob3VsZCBvbmx5IGJlIGEgc2luZ2xlIHZlcnNpb24gYnV0IHNlbmRpbmcgdGhpcyBhbG9uZyBzaG91bGQgaGVscFxuICAgKiBpZiB3ZSBuZWVkIHRvIGFkZCBhIG5ldyB2ZXJzaW9uIGluIGEgZnV0dXJlIHJlbGVhc2VcbiAgICovXG4gIGNyb3NzRnJhbWVWZXJzaW9uOiBWZXJzaW9uTnVtYmVyO1xuXG4gIC8qKlxuICAgKiBBZGRpdGlvbmFsIG9wdGlvbnMgdGhhdCBjYW4gYmUgcGFzc2VkIGF0IHRoZSB0aW1lIG9mIGluaXRpYWxpemF0aW9uXG4gICAqL1xuICBvcHRpb25zPzogSW5pdGlhbGl6YXRpb25PcHRpb25zO1xufVxuXG4vKipcbiAqIFRoaXMgbWVzc2FnZSBpcyBzZW50IHdoZW4gYSBub3RpZmljYXRpb24gb2NjdXJzIGZyb20gdGhlIHByZXNsYXllclxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5vdGlmaWNhdGlvbk1lc3NhZ2UgZXh0ZW5kcyBNZXNzYWdlIHtcbiAgLyoqXG4gICAqIFRoZSBpZCBmb3IgdGhpcyB0eXBlIG9mIG5vdGlmaWNhdGlvblxuICAgKi9cbiAgbm90aWZpY2F0aW9uSWQ6IE5vdGlmaWNhdGlvbklkO1xuXG4gIC8qKlxuICAgKiBUaGUgZGF0YSB3aGljaCBjYW1lIGFsb25nIHdpdGggdGhlIG5vdGlmaWNhdGlvblxuICAgKi9cbiAgZGF0YTogTW9kZWw7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBjYWxsaW5nIGFuIGludGVybmFsIGNvbnRyYWN0IGNvbW1hbmRcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDb21tYW5kTWVzc2FnZSBleHRlbmRzIE1lc3NhZ2Uge1xuICAvKipcbiAgICogVGhlIGlkIG9mIHRoZSBjb21tYW5kIHdoaWNoIHNob3VsZCBiZSBleGVjdXRlZFxuICAgKi9cbiAgdmVyYklkOiBWZXJiSWQ7XG5cbiAgLyoqXG4gICAqIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBwYXJhbWV0ZXJzIGZvciB0aGUgY29tbWFuZFxuICAgKi9cbiAgcGFyYW1ldGVyczogRXhlY3V0ZVBhcmFtZXRlcnM7XG59XG5cbi8qKlxuICogVGhpcyBtZXNzYWdlIGlzIHNlbnQgaW4gcmVzcG9uc2UgdG8gYSBDb21tYW5kTWVzc2FnZSB3aXRoIHRoZVxuICogcmVzdWx0IG9mIHRoYXQgY29tbWFuZHMgaW52b2NhdGlvblxuICovXG5leHBvcnQgaW50ZXJmYWNlIENvbW1hbmRSZXNwb25zZU1lc3NhZ2UgZXh0ZW5kcyBNZXNzYWdlIHtcbiAgLyoqXG4gICAqIEd1aWQgb2YgdGhlIENvbW1hbmRNZXNzYWdlIHdoaWNoIHRoaXMgaXMgaW4gcmVzcG9uc2UgdG9cbiAgICovXG4gIGNvbW1hbmRHdWlkOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIElmIHRoZXJlIHdhcyBhbiBlcnJvciByZXR1cm5lZCBmcm9tIHRoZSBjb21tYW5kLCB0aGlzIHdpbGwgYmUgZGVmaW5lZFxuICAgKiBhbmQgY29udGFpbiB0aGUgZXJyb3JcbiAgICovXG4gIGVycm9yPzogTW9kZWw7XG5cbiAgLyoqXG4gICAqIElmIHRoZSBjb21tYW5kIGV4ZWN1dGVkIHN1Y2Nlc3NmdWxseSwgdGhpcyB3aWxsIGNvbnRhaW4gdGhlIGNvbW1hbmQgcmVzdWx0XG4gICAqL1xuICBkYXRhPzogTW9kZWw7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vLi4vc3JjL21lc3NhZ2luZy9pbnRlcmZhY2UvTWVzc2FnZVR5cGVzLnRzIiwiaW1wb3J0IHsgRXJyb3JDb2RlcyB9IGZyb20gJy4uLy4uL1NoYXJlZEFwaUV4dGVybmFsQ29udHJhY3QnO1xuXG5pbXBvcnQgeyBUYWJsZWF1RXJyb3IgfSBmcm9tICcuLi9UYWJsZWF1RXJyb3InO1xuXG4vKipcbiAqIFRoaXMgY2xhc3MgY29udmVydHMgZnJvbSBhIHNvdXJjZSBlbnVtIHZhbHVlIHRvIGRlc3RpbmF0aW9uIGVudW1cbiAqIHZhbHVlIGdpdmVuIGEgbWFwcGluZyBmcm9tIHNvdXJjZSB0byBkZXN0aW5hdGlvbiB3aGVuIGNvbnN0cnVjdGVkLlxuICpcbiAqIE5vdGU6IFRoaXMgZXhhY3Qgc2FtZSBjbGFzcyBpcyBkZWZpbmVkIGluIGFwaS1jb3JlLiAgR2l2ZW4gaXRzIHNtYWxsXG4gKiBuYXR1cmUsIGl0IGlzIG5vdCB3b3J0aCBoYXZpbmcgaW4gYSBzZXBhcmF0ZSBwcm9qZWN0IHRvIHNoYXJlIHRoaXMgYmV0d2VlblxuICogYXBpLWNvcmUgYW5kIGFwaS1zaGFyZWQuICBJZiBtb3JlIHV0aWxpdHkgZnVuY3Rpb25hbGl0eSBpcyBhZGRlZCB0aGF0IGlzIHVzZWQgYnkgYXBpLWNvcmVcbiAqIGFuZCBhcGktc2hhcmVkIGJ1dCBoYXMgbm8gb3RoZXIgZGVwZW5kZWNpZXMsIGEgdXRpbHRpdHkgcHJvamVjdCBtaWdodCBiZSBtZXJpdGVkLFxuICogYW5kIHRoaXMgY2xhc3MgY291bGQgYmUgbW92ZWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBFbnVtQ29udmVydGVyPFRTb3VyY2VUeXBlIGV4dGVuZHMgc3RyaW5nLCBURGVzdGluYXRpb25UeXBlPiB7XG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9tYXBwaW5nczogeyBbZW51bVZhbDogc3RyaW5nXTogVERlc3RpbmF0aW9uVHlwZTsgfSxcbiAgICBwcml2YXRlIF9kZWZhdWx0VmFsPzogVERlc3RpbmF0aW9uVHlwZSkgeyB9XG5cbiAgcHVibGljIGNvbnZlcnQoZW51bVZhbDogVFNvdXJjZVR5cGUsIHRocm93SWZNaXNzaW5nOiBTaG91bGRUaHJvdyA9IFNob3VsZFRocm93Llllcyk6IFREZXN0aW5hdGlvblR5cGUge1xuICAgIGlmICh0aGlzLl9tYXBwaW5ncy5oYXNPd25Qcm9wZXJ0eShlbnVtVmFsKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX21hcHBpbmdzW2VudW1WYWwgYXMgc3RyaW5nXTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZGVmYXVsdFZhbCAhPT0gdW5kZWZpbmVkICYmIHRocm93SWZNaXNzaW5nICE9PSBTaG91bGRUaHJvdy5ZZXMpIHtcbiAgICAgIHJldHVybiB0aGlzLl9kZWZhdWx0VmFsO1xuICAgIH1cblxuICAgIHRocm93IG5ldyBUYWJsZWF1RXJyb3IoRXJyb3JDb2Rlcy5JbnRlcm5hbEVycm9yLCBgRW51bSBNYXBwaW5nIG5vdCBmb3VuZCBmb3I6ICR7ZW51bVZhbH1gKTtcbiAgfVxufVxuXG5leHBvcnQgZW51bSBTaG91bGRUaHJvdyB7XG4gIFllcyA9ICd5ZXMnLFxuICBObyA9ICdubycsXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vLi4vc3JjL0FwaVNoYXJlZC9VdGlscy9FbnVtQ29udmVydGVyLnRzIiwiaW1wb3J0ICogYXMgQ29udHJhY3QgZnJvbSAnLi4vLi4vU2hhcmVkQXBpRXh0ZXJuYWxDb250cmFjdCc7XG5cbmltcG9ydCB7IFNpbmdsZUV2ZW50TWFuYWdlciB9IGZyb20gJy4uL1NpbmdsZUV2ZW50TWFuYWdlcic7XG5cbi8qKlxuICogVGhpcyBjbGFzcyBpbXBsZW1lbnRzIHRoZSBTaW5nbGVFdmVudE1hbmFnZXIgaW50ZXJmYWNlIGZvciBhIHNpbmdsZSB0eXBlIG9mIFRhYmxlYXUgZXZlbnRcbiAqXG4gKiBAdGVtcGxhdGUgVEV2ZW50VHlwZSBUaGUgVGFibGVhdSBldmVudCB0eXBlIHRoaXMgY2xhc3Mgc3BlY2lhbGl6ZXNcbiAqL1xuZXhwb3J0IGNsYXNzIFNpbmdsZUV2ZW50TWFuYWdlckltcGw8VEV2ZW50VHlwZSBleHRlbmRzIENvbnRyYWN0LlRhYmxlYXVFdmVudD4gaW1wbGVtZW50cyBTaW5nbGVFdmVudE1hbmFnZXIge1xuICBwcml2YXRlIF9ldmVudFR5cGU6IENvbnRyYWN0LlRhYmxlYXVFdmVudFR5cGU7XG4gIHByaXZhdGUgX2hhbmRsZXJzOiBBcnJheTwoZXZlbnRPYmo6IFRFdmVudFR5cGUpID0+IHZvaWQ+O1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihldmVudFR5cGU6IENvbnRyYWN0LlRhYmxlYXVFdmVudFR5cGUpIHtcbiAgICB0aGlzLl9ldmVudFR5cGUgPSBldmVudFR5cGU7XG4gICAgdGhpcy5faGFuZGxlcnMgPSBbXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZXZlbnRUeXBlKCk6IENvbnRyYWN0LlRhYmxlYXVFdmVudFR5cGUge1xuICAgIHJldHVybiB0aGlzLl9ldmVudFR5cGU7XG4gIH1cblxuICBwdWJsaWMgYWRkRXZlbnRMaXN0ZW5lcihoYW5kbGVyOiAoZXZlbnRPYmo6IFRFdmVudFR5cGUpID0+IHZvaWQpOiBDb250cmFjdC5UYWJsZWF1RXZlbnRVbnJlZ2lzdGVyRm4ge1xuICAgIHRoaXMuX2hhbmRsZXJzLnB1c2goaGFuZGxlcik7XG4gICAgcmV0dXJuICgpID0+IHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihoYW5kbGVyKTtcbiAgfVxuXG4gIHB1YmxpYyByZW1vdmVFdmVudExpc3RlbmVyKGhhbmRsZXI6IChldmVudE9iajogVEV2ZW50VHlwZSkgPT4gdm9pZCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGJlZm9yZUNvdW50ID0gdGhpcy5faGFuZGxlcnMubGVuZ3RoO1xuICAgIHRoaXMuX2hhbmRsZXJzID0gdGhpcy5faGFuZGxlcnMuZmlsdGVyKGggPT4gaCAhPT0gaGFuZGxlcik7XG4gICAgcmV0dXJuIGJlZm9yZUNvdW50ID4gdGhpcy5faGFuZGxlcnMubGVuZ3RoO1xuICB9XG5cbiAgcHVibGljIHRyaWdnZXJFdmVudChldmVudEdlbmVyYXRvcjogKCkgPT4gVEV2ZW50VHlwZSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgaGFuZGxlciBvZiB0aGlzLl9oYW5kbGVycykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZXZlbnRNb2RlbCA9IGV2ZW50R2VuZXJhdG9yKCk7XG4gICAgICAgIGhhbmRsZXIoZXZlbnRNb2RlbCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIFNpbmNlIHRoaXMgaGFuZGxlciBjb3VsZCBiZSBvdXRzaWRlIG91ciBjb250cm9sLCBqdXN0IGNhdGNoIGFueXRoaW5nIGl0IHRocm93cyBhbmQgY29udGludWUgb25cbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vLi4vc3JjL0FwaVNoYXJlZC9JbXBsL1NpbmdsZUV2ZW50TWFuYWdlckltcGwudHMiLCJpbXBvcnQgeyBFcnJvckNvZGVzIH0gZnJvbSAnLi4vLi4vU2hhcmVkQXBpRXh0ZXJuYWxDb250cmFjdCc7XG5cbmltcG9ydCB7IFRhYmxlYXVFcnJvciB9IGZyb20gJy4uL1RhYmxlYXVFcnJvcic7XG5cbmV4cG9ydCBjbGFzcyBQYXJhbSB7XG4gIC8qKlxuICAgKiBzZXJpYWxpemVzIHRoZSBkYXRlIGludG8gdGhlIGZvcm1hdCB0aGF0IHRoZSBzZXJ2ZXIgZXhwZWN0cy5cbiAgICogQHBhcmFtIGRhdGUgdGhlIGRhdGUgdG8gc2VyaWFsaXplXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHNlcmlhbGl6ZURhdGVGb3JQbGF0Zm9ybShkYXRlOiBEYXRlKTogc3RyaW5nIHtcbiAgICBjb25zdCB5ZWFyOiBudW1iZXIgPSBkYXRlLmdldFVUQ0Z1bGxZZWFyKCk7XG4gICAgY29uc3QgbW9udGg6IG51bWJlciA9IGRhdGUuZ2V0VVRDTW9udGgoKSArIDE7XG4gICAgY29uc3QgZGF5OiBudW1iZXIgPSBkYXRlLmdldFVUQ0RhdGUoKTtcbiAgICBjb25zdCBoaDogbnVtYmVyID0gZGF0ZS5nZXRVVENIb3VycygpO1xuICAgIGNvbnN0IG1tOiBudW1iZXIgPSBkYXRlLmdldFVUQ01pbnV0ZXMoKTtcbiAgICBjb25zdCBzZWM6IG51bWJlciA9IGRhdGUuZ2V0VVRDU2Vjb25kcygpO1xuICAgIHJldHVybiBgJHt5ZWFyfS0ke21vbnRofS0ke2RheX0gJHtoaH06JHttbX06JHtzZWN9YDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgc2VyaWFsaXplQm9vbGVhbkZvclBsYXRmb3JtKGJvb2w6IGJvb2xlYW4pOiBzdHJpbmcge1xuICAgIHJldHVybiBib29sID8gJ3RydWUnIDogJ2ZhbHNlJztcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgc2VyaWFsaXplTnVtYmVyRm9yUGxhdGZvcm0obnVtOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiBudW0udG9TdHJpbmcoMTApO1xuICB9XG5cbiAgLyoqXG4gICAqIFZlcmlmaWVzIHRoZSBpbnB1dCBpcyBhIG51bWJlclxuICAgKi9cbiAgLyogdHNsaW50OmRpc2FibGU6bm8tYW55ICovXG4gIHB1YmxpYyBzdGF0aWMgaXNUeXBlTnVtYmVyKGlucHV0OiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdHlwZW9mIChpbnB1dCkgPT09ICdudW1iZXInIHx8IGlucHV0IGluc3RhbmNlb2YgTnVtYmVyO1xuICB9XG4gIC8qIHRzbGludDplbmFibGU6bm8tYW55ICovXG5cbiAgLyoqXG4gICAqIFZlcmlmaWVzIHRoZSBpbnB1dCBpcyBhIERhdGVcbiAgICovXG4gIC8qIHRzbGludDpkaXNhYmxlOm5vLWFueSAqL1xuICBwdWJsaWMgc3RhdGljIGlzVHlwZURhdGUoaW5wdXQ6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpbnB1dCBpbnN0YW5jZW9mIERhdGU7XG4gIH1cbiAgLyogdHNsaW50OmVuYWJsZTpuby1hbnkgKi9cblxuICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55ICovXG4gIHB1YmxpYyBzdGF0aWMgaXNUeXBlU3RyaW5nKGlucHV0OiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdHlwZW9mIChpbnB1dCkgPT09ICdzdHJpbmcnIHx8IGlucHV0IGluc3RhbmNlb2YgU3RyaW5nO1xuICB9XG5cbiAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueSAqL1xuICBwdWJsaWMgc3RhdGljIGlzVHlwZUJvb2woaW5wdXQ6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0eXBlb2YgKGlucHV0KSA9PT0gJ2Jvb2xlYW4nIHx8IGlucHV0IGluc3RhbmNlb2YgQm9vbGVhbjtcbiAgfVxuXG4gIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnkgKi9cbiAgcHVibGljIHN0YXRpYyBzZXJpYWxpemVQYXJhbXRlclZhbHVlKHZhbHVlOiBhbnkpOiBzdHJpbmcge1xuICAgIGlmIChQYXJhbS5pc1R5cGVOdW1iZXIodmFsdWUpKSB7XG4gICAgICByZXR1cm4gUGFyYW0uc2VyaWFsaXplTnVtYmVyRm9yUGxhdGZvcm0odmFsdWUgYXMgbnVtYmVyKTtcbiAgICB9IGVsc2UgaWYgKFBhcmFtLmlzVHlwZURhdGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gUGFyYW0uc2VyaWFsaXplRGF0ZUZvclBsYXRmb3JtKHZhbHVlIGFzIERhdGUpO1xuICAgIH0gZWxzZSBpZiAoUGFyYW0uaXNUeXBlQm9vbCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBQYXJhbS5zZXJpYWxpemVCb29sZWFuRm9yUGxhdGZvcm0odmFsdWUgYXMgYm9vbGVhbik7XG4gICAgfSBlbHNlIGlmIChQYXJhbS5pc1R5cGVTdHJpbmcodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUYWJsZWF1RXJyb3IoRXJyb3JDb2Rlcy5JbnRlcm5hbEVycm9yLCBgVW5leHBlY3RlZCBpbnZhbGlkIHZhbHVlIGZvcjogJHt2YWx1ZX1gKTtcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi8uLi9zcmMvQXBpU2hhcmVkL1V0aWxzL1BhcmFtLnRzIiwiaW1wb3J0ICogYXMgQ29udHJhY3QgZnJvbSAnLi4vLi4vU2hhcmVkQXBpRXh0ZXJuYWxDb250cmFjdCc7XG5cbmV4cG9ydCBjbGFzcyBEYXRhVGFibGUgaW1wbGVtZW50cyBDb250cmFjdC5EYXRhVGFibGUge1xuICBwcml2YXRlIF9uYW1lOiBzdHJpbmc7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2RhdGE6IEFycmF5PEFycmF5PENvbnRyYWN0LkRhdGFWYWx1ZT4+LFxuICAgIHByaXZhdGUgX2NvbHVtbnM6IEFycmF5PENvbnRyYWN0LkNvbHVtbj4sXG4gICAgcHJpdmF0ZSBfdG90YWxSb3dDb3VudDogbnVtYmVyLFxuICAgIHByaXZhdGUgX2lzVG90YWxSb3dDb3VudExpbWl0ZWQ6IGJvb2xlYW4sXG4gICAgcHJpdmF0ZSBfaXNTdW1tYXJ5RGF0YTogYm9vbGVhbixcbiAgICBwcml2YXRlIF9tYXJrc0luZm8/OiBBcnJheTxNYXJrSW5mbz4pIHtcbiAgICAvLyBUT0RPOiBnZXQgcmlkIG9mIHRoaXMgaW4gcmVkZXNpZ24uXG4gICAgdGhpcy5fbmFtZSA9IF9pc1N1bW1hcnlEYXRhID8gJ1N1bW1hcnkgRGF0YSBUYWJsZScgOiAnVW5kZXJseWluZyBEYXRhIFRhYmxlJztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICB9XG5cbiAgcHVibGljIGdldCBkYXRhKCk6IEFycmF5PEFycmF5PENvbnRyYWN0LkRhdGFWYWx1ZT4+IHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgY29sdW1ucygpOiBBcnJheTxDb250cmFjdC5Db2x1bW4+IHtcbiAgICByZXR1cm4gdGhpcy5fY29sdW1ucztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbWFya3NJbmZvKCk6IEFycmF5PENvbnRyYWN0Lk1hcmtJbmZvPiB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX21hcmtzSW5mbztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdG90YWxSb3dDb3VudCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl90b3RhbFJvd0NvdW50O1xuICB9XG5cbiAgcHVibGljIGdldCBpc1RvdGFsUm93Q291bnRMaW1pdGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc1RvdGFsUm93Q291bnRMaW1pdGVkO1xuICB9XG5cbiAgcHVibGljIGdldCBpc1N1bW1hcnlEYXRhKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc1N1bW1hcnlEYXRhO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNYXJrSW5mbyBpbXBsZW1lbnRzIENvbnRyYWN0Lk1hcmtJbmZvIHtcbiAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX3R5cGU6IENvbnRyYWN0Lk1hcmtUeXBlLFxuICAgIHByaXZhdGUgX2NvbG9yOiBzdHJpbmcsXG4gICAgcHJpdmF0ZSBfdHVwbGVJZD86IE51bWJlclxuICApIHsgfVxuXG4gIHB1YmxpYyBnZXQgdHlwZSgpOiBDb250cmFjdC5NYXJrVHlwZSB7XG4gICAgcmV0dXJuIHRoaXMuX3R5cGU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGNvbG9yKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbG9yO1xuICB9XG5cbiAgcHVibGljIGdldCB0dXBsZUlkKCk6IE51bWJlciB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX3R1cGxlSWQ7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbHVtbiBpbXBsZW1lbnRzIENvbnRyYWN0LkNvbHVtbiB7XG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9maWVsZE5hbWU6IHN0cmluZyxcbiAgICBwcml2YXRlIF9kYXRhVHlwZTogQ29udHJhY3QuRGF0YVR5cGUsIC8vIFRPRE86IHRoaXMgc2hvdWRsIGJlIGFuIGVudW0gdHlwZVxuICAgIHByaXZhdGUgX2lzUmVmZXJlbmNlZDogYm9vbGVhbixcbiAgICBwcml2YXRlIF9pbmRleDogbnVtYmVyKSB7IH1cblxuICBwdWJsaWMgZ2V0IGZpZWxkTmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9maWVsZE5hbWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGRhdGFUeXBlKCk6IENvbnRyYWN0LkRhdGFUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YVR5cGU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGlzUmVmZXJlbmNlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNSZWZlcmVuY2VkO1xuICB9XG5cbiAgcHVibGljIGdldCBpbmRleCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9pbmRleDtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGF0YVZhbHVlIGltcGxlbWVudHMgQ29udHJhY3QuRGF0YVZhbHVlIHtcbiAgLyogdHNsaW50OmRpc2FibGU6bm8tYW55ICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF92YWx1ZTogYW55LFxuICAgIHByaXZhdGUgX2Zvcm1hdHRlZFZhbHVlOiBzdHJpbmcpIHsgfVxuXG4gIHB1YmxpYyBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGZvcm1hdHRlZFZhbHVlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2Zvcm1hdHRlZFZhbHVlO1xuICB9XG4gIC8qIHRzbGludDplbmFibGU6bm8tYW55ICovXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vLi4vc3JjL0FwaVNoYXJlZC9Nb2RlbHMvR2V0RGF0YU1vZGVscy50cyIsInZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nO1xudmFyIHN0b3JlID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xuXG4obW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IHt9KTtcbn0pKCd2ZXJzaW9ucycsIFtdKS5wdXNoKHtcbiAgdmVyc2lvbjogY29yZS52ZXJzaW9uLFxuICBtb2RlOiByZXF1aXJlKCcuL19saWJyYXJ5JykgPyAncHVyZScgOiAnZ2xvYmFsJyxcbiAgY29weXJpZ2h0OiAnwqkgMjAxOCBEZW5pcyBQdXNoa2FyZXYgKHpsb2lyb2NrLnJ1KSdcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fc2hhcmVkLmpzXG4vLyBtb2R1bGUgaWQgPSA0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChiaXRtYXAsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGU6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWU6IHZhbHVlXG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qc1xuLy8gbW9kdWxlIGlkID0gNDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgPSByZXF1aXJlKCcuL19saWJyYXJ5Jyk7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyICRpdGVyQ3JlYXRlID0gcmVxdWlyZSgnLi9faXRlci1jcmVhdGUnKTtcbnZhciBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJyk7XG52YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBCVUdHWSA9ICEoW10ua2V5cyAmJiAnbmV4dCcgaW4gW10ua2V5cygpKTsgLy8gU2FmYXJpIGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxudmFyIEZGX0lURVJBVE9SID0gJ0BAaXRlcmF0b3InO1xudmFyIEtFWVMgPSAna2V5cyc7XG52YXIgVkFMVUVTID0gJ3ZhbHVlcyc7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQmFzZSwgTkFNRSwgQ29uc3RydWN0b3IsIG5leHQsIERFRkFVTFQsIElTX1NFVCwgRk9SQ0VEKSB7XG4gICRpdGVyQ3JlYXRlKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcbiAgdmFyIGdldE1ldGhvZCA9IGZ1bmN0aW9uIChraW5kKSB7XG4gICAgaWYgKCFCVUdHWSAmJiBraW5kIGluIHByb3RvKSByZXR1cm4gcHJvdG9ba2luZF07XG4gICAgc3dpdGNoIChraW5kKSB7XG4gICAgICBjYXNlIEtFWVM6IHJldHVybiBmdW5jdGlvbiBrZXlzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiBmdW5jdGlvbiB2YWx1ZXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgfTtcbiAgdmFyIFRBRyA9IE5BTUUgKyAnIEl0ZXJhdG9yJztcbiAgdmFyIERFRl9WQUxVRVMgPSBERUZBVUxUID09IFZBTFVFUztcbiAgdmFyIFZBTFVFU19CVUcgPSBmYWxzZTtcbiAgdmFyIHByb3RvID0gQmFzZS5wcm90b3R5cGU7XG4gIHZhciAkbmF0aXZlID0gcHJvdG9bSVRFUkFUT1JdIHx8IHByb3RvW0ZGX0lURVJBVE9SXSB8fCBERUZBVUxUICYmIHByb3RvW0RFRkFVTFRdO1xuICB2YXIgJGRlZmF1bHQgPSAkbmF0aXZlIHx8IGdldE1ldGhvZChERUZBVUxUKTtcbiAgdmFyICRlbnRyaWVzID0gREVGQVVMVCA/ICFERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoJ2VudHJpZXMnKSA6IHVuZGVmaW5lZDtcbiAgdmFyICRhbnlOYXRpdmUgPSBOQU1FID09ICdBcnJheScgPyBwcm90by5lbnRyaWVzIHx8ICRuYXRpdmUgOiAkbmF0aXZlO1xuICB2YXIgbWV0aG9kcywga2V5LCBJdGVyYXRvclByb3RvdHlwZTtcbiAgLy8gRml4IG5hdGl2ZVxuICBpZiAoJGFueU5hdGl2ZSkge1xuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YoJGFueU5hdGl2ZS5jYWxsKG5ldyBCYXNlKCkpKTtcbiAgICBpZiAoSXRlcmF0b3JQcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUgJiYgSXRlcmF0b3JQcm90b3R5cGUubmV4dCkge1xuICAgICAgLy8gU2V0IEBAdG9TdHJpbmdUYWcgdG8gbmF0aXZlIGl0ZXJhdG9yc1xuICAgICAgc2V0VG9TdHJpbmdUYWcoSXRlcmF0b3JQcm90b3R5cGUsIFRBRywgdHJ1ZSk7XG4gICAgICAvLyBmaXggZm9yIHNvbWUgb2xkIGVuZ2luZXNcbiAgICAgIGlmICghTElCUkFSWSAmJiB0eXBlb2YgSXRlcmF0b3JQcm90b3R5cGVbSVRFUkFUT1JdICE9ICdmdW5jdGlvbicpIGhpZGUoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcbiAgICB9XG4gIH1cbiAgLy8gZml4IEFycmF5I3t2YWx1ZXMsIEBAaXRlcmF0b3J9Lm5hbWUgaW4gVjggLyBGRlxuICBpZiAoREVGX1ZBTFVFUyAmJiAkbmF0aXZlICYmICRuYXRpdmUubmFtZSAhPT0gVkFMVUVTKSB7XG4gICAgVkFMVUVTX0JVRyA9IHRydWU7XG4gICAgJGRlZmF1bHQgPSBmdW5jdGlvbiB2YWx1ZXMoKSB7IHJldHVybiAkbmF0aXZlLmNhbGwodGhpcyk7IH07XG4gIH1cbiAgLy8gRGVmaW5lIGl0ZXJhdG9yXG4gIGlmICgoIUxJQlJBUlkgfHwgRk9SQ0VEKSAmJiAoQlVHR1kgfHwgVkFMVUVTX0JVRyB8fCAhcHJvdG9bSVRFUkFUT1JdKSkge1xuICAgIGhpZGUocHJvdG8sIElURVJBVE9SLCAkZGVmYXVsdCk7XG4gIH1cbiAgLy8gUGx1ZyBmb3IgbGlicmFyeVxuICBJdGVyYXRvcnNbTkFNRV0gPSAkZGVmYXVsdDtcbiAgSXRlcmF0b3JzW1RBR10gPSByZXR1cm5UaGlzO1xuICBpZiAoREVGQVVMVCkge1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICB2YWx1ZXM6IERFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChWQUxVRVMpLFxuICAgICAga2V5czogSVNfU0VUID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoS0VZUyksXG4gICAgICBlbnRyaWVzOiAkZW50cmllc1xuICAgIH07XG4gICAgaWYgKEZPUkNFRCkgZm9yIChrZXkgaW4gbWV0aG9kcykge1xuICAgICAgaWYgKCEoa2V5IGluIHByb3RvKSkgcmVkZWZpbmUocHJvdG8sIGtleSwgbWV0aG9kc1trZXldKTtcbiAgICB9IGVsc2UgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoQlVHR1kgfHwgVkFMVUVTX0JVRyksIE5BTUUsIG1ldGhvZHMpO1xuICB9XG4gIHJldHVybiBtZXRob2RzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2l0ZXItZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSA0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX2VudW0tYnVnLWtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDQ4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xubW9kdWxlLmV4cG9ydHMgPSBkb2N1bWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19odG1sLmpzXG4vLyBtb2R1bGUgaWQgPSA0OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAyMi4xLjMuMzEgQXJyYXkucHJvdG90eXBlW0BAdW5zY29wYWJsZXNdXG52YXIgVU5TQ09QQUJMRVMgPSByZXF1aXJlKCcuL193a3MnKSgndW5zY29wYWJsZXMnKTtcbnZhciBBcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuaWYgKEFycmF5UHJvdG9bVU5TQ09QQUJMRVNdID09IHVuZGVmaW5lZCkgcmVxdWlyZSgnLi9faGlkZScpKEFycmF5UHJvdG8sIFVOU0NPUEFCTEVTLCB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgQXJyYXlQcm90b1tVTlNDT1BBQkxFU11ba2V5XSA9IHRydWU7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fYWRkLXRvLXVuc2NvcGFibGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA1MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjMuMjAgU3BlY2llc0NvbnN0cnVjdG9yKE8sIGRlZmF1bHRDb25zdHJ1Y3RvcilcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbnZhciBTUEVDSUVTID0gcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE8sIEQpIHtcbiAgdmFyIEMgPSBhbk9iamVjdChPKS5jb25zdHJ1Y3RvcjtcbiAgdmFyIFM7XG4gIHJldHVybiBDID09PSB1bmRlZmluZWQgfHwgKFMgPSBhbk9iamVjdChDKVtTUEVDSUVTXSkgPT0gdW5kZWZpbmVkID8gRCA6IGFGdW5jdGlvbihTKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL19zcGVjaWVzLWNvbnN0cnVjdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA1MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgaW52b2tlID0gcmVxdWlyZSgnLi9faW52b2tlJyk7XG52YXIgaHRtbCA9IHJlcXVpcmUoJy4vX2h0bWwnKTtcbnZhciBjZWwgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIHNldFRhc2sgPSBnbG9iYWwuc2V0SW1tZWRpYXRlO1xudmFyIGNsZWFyVGFzayA9IGdsb2JhbC5jbGVhckltbWVkaWF0ZTtcbnZhciBNZXNzYWdlQ2hhbm5lbCA9IGdsb2JhbC5NZXNzYWdlQ2hhbm5lbDtcbnZhciBEaXNwYXRjaCA9IGdsb2JhbC5EaXNwYXRjaDtcbnZhciBjb3VudGVyID0gMDtcbnZhciBxdWV1ZSA9IHt9O1xudmFyIE9OUkVBRFlTVEFURUNIQU5HRSA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnO1xudmFyIGRlZmVyLCBjaGFubmVsLCBwb3J0O1xudmFyIHJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGlkID0gK3RoaXM7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgaWYgKHF1ZXVlLmhhc093blByb3BlcnR5KGlkKSkge1xuICAgIHZhciBmbiA9IHF1ZXVlW2lkXTtcbiAgICBkZWxldGUgcXVldWVbaWRdO1xuICAgIGZuKCk7XG4gIH1cbn07XG52YXIgbGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgcnVuLmNhbGwoZXZlbnQuZGF0YSk7XG59O1xuLy8gTm9kZS5qcyAwLjkrICYgSUUxMCsgaGFzIHNldEltbWVkaWF0ZSwgb3RoZXJ3aXNlOlxuaWYgKCFzZXRUYXNrIHx8ICFjbGVhclRhc2spIHtcbiAgc2V0VGFzayA9IGZ1bmN0aW9uIHNldEltbWVkaWF0ZShmbikge1xuICAgIHZhciBhcmdzID0gW107XG4gICAgdmFyIGkgPSAxO1xuICAgIHdoaWxlIChhcmd1bWVudHMubGVuZ3RoID4gaSkgYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICBxdWV1ZVsrK2NvdW50ZXJdID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gICAgICBpbnZva2UodHlwZW9mIGZuID09ICdmdW5jdGlvbicgPyBmbiA6IEZ1bmN0aW9uKGZuKSwgYXJncyk7XG4gICAgfTtcbiAgICBkZWZlcihjb3VudGVyKTtcbiAgICByZXR1cm4gY291bnRlcjtcbiAgfTtcbiAgY2xlYXJUYXNrID0gZnVuY3Rpb24gY2xlYXJJbW1lZGlhdGUoaWQpIHtcbiAgICBkZWxldGUgcXVldWVbaWRdO1xuICB9O1xuICAvLyBOb2RlLmpzIDAuOC1cbiAgaWYgKHJlcXVpcmUoJy4vX2NvZicpKHByb2Nlc3MpID09ICdwcm9jZXNzJykge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGN0eChydW4sIGlkLCAxKSk7XG4gICAgfTtcbiAgLy8gU3BoZXJlIChKUyBnYW1lIGVuZ2luZSkgRGlzcGF0Y2ggQVBJXG4gIH0gZWxzZSBpZiAoRGlzcGF0Y2ggJiYgRGlzcGF0Y2gubm93KSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIERpc3BhdGNoLm5vdyhjdHgocnVuLCBpZCwgMSkpO1xuICAgIH07XG4gIC8vIEJyb3dzZXJzIHdpdGggTWVzc2FnZUNoYW5uZWwsIGluY2x1ZGVzIFdlYldvcmtlcnNcbiAgfSBlbHNlIGlmIChNZXNzYWdlQ2hhbm5lbCkge1xuICAgIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICBwb3J0ID0gY2hhbm5lbC5wb3J0MjtcbiAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGxpc3RlbmVyO1xuICAgIGRlZmVyID0gY3R4KHBvcnQucG9zdE1lc3NhZ2UsIHBvcnQsIDEpO1xuICAvLyBCcm93c2VycyB3aXRoIHBvc3RNZXNzYWdlLCBza2lwIFdlYldvcmtlcnNcbiAgLy8gSUU4IGhhcyBwb3N0TWVzc2FnZSwgYnV0IGl0J3Mgc3luYyAmIHR5cGVvZiBpdHMgcG9zdE1lc3NhZ2UgaXMgJ29iamVjdCdcbiAgfSBlbHNlIGlmIChnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lciAmJiB0eXBlb2YgcG9zdE1lc3NhZ2UgPT0gJ2Z1bmN0aW9uJyAmJiAhZ2xvYmFsLmltcG9ydFNjcmlwdHMpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKGlkICsgJycsICcqJyk7XG4gICAgfTtcbiAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGxpc3RlbmVyLCBmYWxzZSk7XG4gIC8vIElFOC1cbiAgfSBlbHNlIGlmIChPTlJFQURZU1RBVEVDSEFOR0UgaW4gY2VsKCdzY3JpcHQnKSkge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBodG1sLmFwcGVuZENoaWxkKGNlbCgnc2NyaXB0JykpW09OUkVBRFlTVEFURUNIQU5HRV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGh0bWwucmVtb3ZlQ2hpbGQodGhpcyk7XG4gICAgICAgIHJ1bi5jYWxsKGlkKTtcbiAgICAgIH07XG4gICAgfTtcbiAgLy8gUmVzdCBvbGQgYnJvd3NlcnNcbiAgfSBlbHNlIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgc2V0VGltZW91dChjdHgocnVuLCBpZCwgMSksIDApO1xuICAgIH07XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IHNldFRhc2ssXG4gIGNsZWFyOiBjbGVhclRhc2tcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL190YXNrLmpzXG4vLyBtb2R1bGUgaWQgPSA1MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHsgZTogZmFsc2UsIHY6IGV4ZWMoKSB9O1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHsgZTogdHJ1ZSwgdjogZSB9O1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9fcGVyZm9ybS5qc1xuLy8gbW9kdWxlIGlkID0gNTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IHJlcXVpcmUoJy4vX25ldy1wcm9taXNlLWNhcGFiaWxpdHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQywgeCkge1xuICBhbk9iamVjdChDKTtcbiAgaWYgKGlzT2JqZWN0KHgpICYmIHguY29uc3RydWN0b3IgPT09IEMpIHJldHVybiB4O1xuICB2YXIgcHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eS5mKEMpO1xuICB2YXIgcmVzb2x2ZSA9IHByb21pc2VDYXBhYmlsaXR5LnJlc29sdmU7XG4gIHJlc29sdmUoeCk7XG4gIHJldHVybiBwcm9taXNlQ2FwYWJpbGl0eS5wcm9taXNlO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvX3Byb21pc2UtcmVzb2x2ZS5qc1xuLy8gbW9kdWxlIGlkID0gNTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmFzc2lnbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ZuL29iamVjdC9hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDU1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIENvbnRyYWN0IGZyb20gJy4uL1NoYXJlZEFwaUV4dGVybmFsQ29udHJhY3QnO1xuXG5pbXBvcnQgeyBFdmVudExpc3RlbmVyTWFuYWdlciB9IGZyb20gJy4vRXZlbnRMaXN0ZW5lck1hbmFnZXInO1xuXG5pbXBvcnQgeyBTaGVldEltcGwgfSBmcm9tICcuL0ltcGwvU2hlZXRJbXBsJztcblxuZXhwb3J0IGNsYXNzIFNoZWV0IGV4dGVuZHMgRXZlbnRMaXN0ZW5lck1hbmFnZXIgaW1wbGVtZW50cyBDb250cmFjdC5TaGVldCB7XG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zaGVldEltcGw6IFNoZWV0SW1wbCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fc2hlZXRJbXBsLm5hbWU7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNoZWV0VHlwZSgpOiBDb250cmFjdC5TaGVldFR5cGUge1xuICAgIHJldHVybiB0aGlzLl9zaGVldEltcGwuc2hlZXRUeXBlO1xuICB9XG5cbiAgcHVibGljIGdldCBzaXplKCk6IENvbnRyYWN0LlNpemUge1xuICAgIHJldHVybiB0aGlzLl9zaGVldEltcGwuc2l6ZTtcbiAgfVxuXG4gIHB1YmxpYyBmaW5kUGFyYW1ldGVyQXN5bmMocGFyYW1ldGVyTmFtZTogc3RyaW5nKTogUHJvbWlzZTxDb250cmFjdC5QYXJhbWV0ZXIgfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fc2hlZXRJbXBsLmZpbmRQYXJhbWV0ZXJBc3luYyhwYXJhbWV0ZXJOYW1lLCB0aGlzKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRQYXJhbWV0ZXJzQXN5bmMoKTogUHJvbWlzZTxBcnJheTxDb250cmFjdC5QYXJhbWV0ZXI+PiB7XG4gICAgcmV0dXJuIHRoaXMuX3NoZWV0SW1wbC5nZXRQYXJhbWV0ZXJzQXN5bmModGhpcyk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9zcmMvQXBpU2hhcmVkL1NoZWV0LnRzIiwiaW1wb3J0IHsgVmVyc2lvbk51bWJlciBhcyBWZXJzaW9uTnVtYmVyQ29udHJhY3QgfSBmcm9tICdAdGFibGVhdS9hcGktaW50ZXJuYWwtY29udHJhY3QtanMnO1xuaW1wb3J0IHsgRXJyb3JDb2RlcyB9IGZyb20gJy4uL1NoYXJlZEFwaUV4dGVybmFsQ29udHJhY3QnO1xuaW1wb3J0IHsgVGFibGVhdUVycm9yIH0gZnJvbSAnLi9UYWJsZWF1RXJyb3InO1xuXG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgY3VycmVudCB2ZXJzaW9uIG9mIHRoZSBleHRlbnNpb25zIGxpYnJhcnlcbiAqL1xuZXhwb3J0IGNsYXNzIFZlcnNpb25OdW1iZXIgaW1wbGVtZW50cyBWZXJzaW9uTnVtYmVyQ29udHJhY3Qge1xuICAvLyBVc2luZyBzb21lIHdlYnBhY2sgdHJpY2tzLCB3ZSBjYW4gaW5qZWN0IHRoaXMgdmVyc2lvbiBpbnRvIG91ciBjb2RlIChraW5kYSBsaWtlIGMrKyBwcmVwcm9jZXNzb3Igc3R1ZmYpXG4gIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogVmVyc2lvbk51bWJlcjtcblxuICAvKipcbiAgICogR2V0cyB0aGUgc2luZ2xldG9uIGluc3RhbmNlIG9mIHRoZSB2ZXJzaW9uIG51bWJlci5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IEluc3RhbmNlKCk6IFZlcnNpb25OdW1iZXIge1xuICAgIHJldHVybiBWZXJzaW9uTnVtYmVyLl9pbnN0YW5jZTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgU2V0VmVyc2lvbk51bWJlcihudW1TdHJpbmc6IHN0cmluZywgaXNBbHBoYTogYm9vbGVhbik6IHZvaWQge1xuICAgIFZlcnNpb25OdW1iZXIuX2luc3RhbmNlID0gbmV3IFZlcnNpb25OdW1iZXIobnVtU3RyaW5nLCBpc0FscGhhKTtcbiAgfVxuXG4gIHB1YmxpYyByZWFkb25seSBtYWpvcjogbnVtYmVyO1xuICBwdWJsaWMgcmVhZG9ubHkgbWlub3I6IG51bWJlcjtcbiAgcHVibGljIHJlYWRvbmx5IGZpeDogbnVtYmVyO1xuICBwdWJsaWMgcmVhZG9ubHkgYnVpbGQ6IG51bWJlcjtcbiAgcHVibGljIHJlYWRvbmx5IGlzQWxwaGE6IGJvb2xlYW47XG5cbiAgLy8gcHJpdmF0ZSBjb25zdHJ1Y3RvciBzbyBldmVyeW9uZSB1c2VzIHRoZSBzaW5nbGV0b24gaW5zdGFuY2VcbiAgLy8gYnVpbGQgbnVtYmVycyBoYXZlIHRoaXMgZm9ybTogTS5tLmYtcHJlLk5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3Rvcih2ZXJzaW9uU3RyaW5nOiBzdHJpbmcsIGlzQWxwaGE6IGJvb2xlYW4pIHtcbiAgICBsZXQgcGFydFN0ciA9IHZlcnNpb25TdHJpbmcuc3BsaXQoJy0nKTtcbiAgICB0aGlzLmJ1aWxkID0gdGhpcy5nZXRCdWlsZE51bWJlcihwYXJ0U3RyWzFdKTtcbiAgICB2ZXJzaW9uU3RyaW5nID0gcGFydFN0clswXTtcblxuICAgIGNvbnN0IHBhcnRzID0gdmVyc2lvblN0cmluZy5zcGxpdCgnLicpLm1hcChwID0+IHBhcnNlSW50KHAsIDEwKSk7XG4gICAgaWYgKHBhcnRzLmxlbmd0aCAhPT0gMykge1xuICAgICAgdGhyb3cgbmV3IFRhYmxlYXVFcnJvcihFcnJvckNvZGVzLkludGVybmFsRXJyb3IsIGBJbnZhbGlkIHZlcnNpb24gbnVtYmVyOiAke3ZlcnNpb25TdHJpbmd9YCk7XG4gICAgfVxuXG4gICAgdGhpcy5tYWpvciA9IHBhcnRzWzBdO1xuICAgIHRoaXMubWlub3IgPSBwYXJ0c1sxXTtcbiAgICB0aGlzLmZpeCA9IHBhcnRzWzJdO1xuICAgIHRoaXMuaXNBbHBoYSA9IGlzQWxwaGE7XG4gIH1cblxuICBwcml2YXRlIGdldEJ1aWxkTnVtYmVyKHByZVJlbGVhc2VTdHJpbmc6IHN0cmluZyk6IG51bWJlciB7XG4gICAgY29uc3Qgbm9CdWlsZE51bWJlcjogbnVtYmVyID0gLTE7XG4gICAgaWYgKCFwcmVSZWxlYXNlU3RyaW5nKSB7XG4gICAgICByZXR1cm4gbm9CdWlsZE51bWJlcjtcbiAgICB9XG5cbiAgICAvLyBUaGUgcHJlUmVsZWFzZSBzdHJpbmcgaGFzIHRoaXMgZm9ybTogcHJlLk4sIGJ1dCB3ZSBkb24ndCBkZXBlbmQgb24gdGhlIGFjdHVhbCBzdHJpbmcgYmVpbmcgJ3ByZSdcbiAgICBsZXQgcGFydFN0ciA9IHByZVJlbGVhc2VTdHJpbmcuc3BsaXQoJy4nKTtcbiAgICByZXR1cm4gcGFydFN0clsxXSA/IHBhcnNlSW50KHBhcnRTdHJbMV0sIDEwKSA6IG5vQnVpbGROdW1iZXI7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGZvcm1hdHRlZFZhbHVlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAke3RoaXMubWFqb3J9LiR7dGhpcy5taW5vcn0uJHt0aGlzLmZpeH1gO1xuICB9XG5cbiAgcHVibGljIGdldCBmdWxsRm9ybWF0dGVkVmFsdWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7dGhpcy5tYWpvcn0uJHt0aGlzLm1pbm9yfS4ke3RoaXMuZml4fS1wcmUuJHt0aGlzLmJ1aWxkfWA7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9zcmMvQXBpU2hhcmVkL1ZlcnNpb25OdW1iZXIudHMiLCIvLyBEZWNsYXJlIHRoaXMga2V5IHR5cGUgYW5kIGV4cG9ydCB0aGUgTm90aWZpY2F0aW9uSWQgdG8gbWFrZSB0aGlzIGJlaGF2ZSBsaWtlIGEgc3RyaW5nIGVudW1cbmV4cG9ydCBlbnVtIFZlcmJJZCB7XG4gIEFwcGx5Q2F0ZWdvcmljYWxGaWx0ZXIgPSAnY2F0ZWdvcmljYWwtZmlsdGVyJyxcbiAgQXBwbHlSYW5nZUZpbHRlciA9ICdyYW5nZS1maWx0ZXInLFxuICBDbGVhckZpbHRlciA9ICdjbGVhci1maWx0ZXInLFxuICBJbml0aWFsaXplRXh0ZW5zaW9uID0gJ2luaXRpYWxpemUtZXh0ZW5zaW9uJyxcbiAgR2V0RGF0YVN1bW1hcnlEYXRhID0gJ2dldC1zdW1tYXJ5LWRhdGEnLFxuICBHZXRVbmRlcmx5aW5nRGF0YSA9ICdnZXQtdW5kZXJseWluZy1kYXRhJyxcbiAgR2V0RGF0YVNvdXJjZURhdGEgPSAnZ2V0LWRhdGFzb3VyY2UtZGF0YScsXG4gIFNhdmVFeHRlbnNpb25TZXR0aW5ncyA9ICdzYXZlLWV4dGVuc2lvbi1zZXR0aW5ncycsXG4gIEdldFNlbGVjdGVkTWFya3MgPSAnZ2V0LXNlbGVjdGVkLW1hcmtzJyxcbiAgR2V0SGlnaGxpZ2h0ZWRNYXJrcyA9ICdnZXQtaGlnaGxpZ2h0ZWQtbWFya3MnLFxuICBHZXRQYXJhbWV0ZXJzRm9yU2hlZXQgPSAnZ2V0LXBhcmFtZXRlcnMtZm9yLXNoZWV0JyxcbiAgRmluZFBhcmFtZXRlciA9ICdmaW5kLXBhcmFtZXRlcicsXG4gIENoYW5nZVBhcmFtZXRlclZhbHVlID0gJ2NoYW5nZS1wYXJhbWV0ZXItdmFsdWUnLFxuICBDbGVhclNlbGVjdGVkTWFya3MgPSAnY2xlYXItc2VsZWN0ZWQtbWFya3MnLFxuICBTZWxlY3RCeVZhbHVlID0gJ3NlbGVjdC1ieS12YWx1ZScsXG4gIEdldERhdGFTb3VyY2VzID0gJ2dldC1kYXRhLXNvdXJjZXMnLFxuICBSZWZyZXNoRGF0YVNvdXJjZSA9ICdyZWZyZXNoLWRhdGEtc291cmNlJyxcbiAgR2V0RmlsdGVycyA9ICdnZXQtZmlsdGVycycsXG4gIEdldEZpZWxkQW5kRGF0YVNvdXJjZSA9ICdnZXQtZmllbGQtYW5kLWRhdGFzb3VyY2UnLFxuICBHZXRDYXRlZ29yaWNhbERvbWFpbiA9ICdnZXQtY2F0ZWdvcmljYWwtZG9tYWluJyxcbiAgR2V0UmFuZ2VEb21haW4gPSAnZ2V0LXJhbmdlLWRvbWFpbicsXG4gIEdldEpvaW5EZXNjcmlwdGlvbiA9ICdnZXQtam9pbi1kZXNjcmlwdGlvbicsXG4gIEdldENvbm5lY3Rpb25EZXNjcmlwdGlvblN1bW1hcmllcyA9ICdnZXQtY29ubmVjdGlvbi1kZXNjcmlwdGlvbi1zdW1tYXJpZXMnLFxuICBEaXNwbGF5RGlhbG9nID0gJ2Rpc3BsYXktZGlhbG9nJyxcbiAgQ2xvc2VEaWFsb2cgPSAnY2xvc2UtZGlhbG9nJyxcbiAgVGVzdENvbnZlcnNpb25WZXJiID0gJ3Rlc3QtY29udmVyc2lvbi12ZXJiJyxcbiAgR2V0RmllbGQgPSAnZ2V0LWZpZWxkJyxcbiAgR2V0RGF0YVNvdXJjZSA9ICdnZXQtZGF0YXNvdXJjZScsXG4gIEdldEFjdGl2ZVRhYmxlcyA9ICdnZXQtYWN0aXZlLXRhYmxlcycsXG4gIFNldFpvbmVWaXNpYmlsaXR5ID0gJ3NldC16b25lLXZpc2liaWxpdHknLFxuICBCbG9ja0V4dGVuc2lvbiA9ICdibG9jay1leHRlbnNpb24nXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vc3JjL2NvbnRyYWN0L1ZlcmJzLnRzIiwiaW1wb3J0IHsgSW50ZXJuYWxDb250cmFjdFZlcnNpb25Db252ZXJ0ZXIgfSBmcm9tICcuL0ludGVybmFsQ29udHJhY3RWZXJzaW9uQ29udmVydGVyJztcbmltcG9ydCAqIGFzIFRyYW5zbGF0aW9ucyBmcm9tICcuL1ZlcnNpb25UcmFuc2xhdGlvbnMnO1xuaW1wb3J0IHsgU3RhY2tpbmdWZXJzaW9uQ29udmVydGVyIH0gZnJvbSAnLi9TdGFja2luZ1ZlcnNpb25Db252ZXJ0ZXInO1xuaW1wb3J0IHsgSWRlbnRpdHlWZXJzaW9uQ29udmVydGVyIH0gZnJvbSAnLi9JZGVudGl0eVZlcnNpb25Db252ZXJ0ZXInO1xuaW1wb3J0IHsgRG93bmdyYWRlVjJXb3Jrc2hlZXROYW1lcyB9IGZyb20gJy4vVmVyc2lvblRyYW5zbGF0aW9ucyc7XG5pbXBvcnQgeyBWZXJzaW9uTnVtYmVyIH0gZnJvbSAnLi4vSnNBcGlJbnRlcm5hbENvbnRyYWN0JztcblxuLyoqXG4gKiBAcmV0dXJucyB0cnVlIGlmIGxocyA8IHJocyAoaWdub3JpbmcgZml4IG51bWJlcilcbiAqIEBwYXJhbSBsaHNcbiAqIEBwYXJhbSByaHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFZlcnNpb25MZXNzVGhhbihsaHM6IFZlcnNpb25OdW1iZXIsIHJoczogVmVyc2lvbk51bWJlcik6IGJvb2xlYW4ge1xuICBpZiAobGhzLm1ham9yID4gcmhzLm1ham9yKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChsaHMubWFqb3IgPCByaHMubWFqb3IpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gKGxocy5taW5vciA8IHJocy5taW5vcik7XG59XG5cbi8qKlxuICogQHJldHVybnMgdHJ1ZSBpZiBsaHMgPT0gcmhzIChpZ25vcmluZyBmaXggbnVtYmVyKVxuICogQHBhcmFtIGxoc1xuICogQHBhcmFtIHJoc1xuICovXG5leHBvcnQgZnVuY3Rpb24gVmVyc2lvbkVxdWFsVG8obGhzOiBWZXJzaW9uTnVtYmVyLCByaHM6IFZlcnNpb25OdW1iZXIpOiBib29sZWFuIHtcbiAgcmV0dXJuIChsaHMubWFqb3IgPT09IHJocy5tYWpvcikgJiYgKGxocy5taW5vciA9PT0gcmhzLm1pbm9yKTtcbn1cblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBUaGlzIGZ1bmN0aW9uIGlzIGRlcHJlY2F0ZWQsIGFuZCB3aWxsIG5vdCBiZSBjYWxsZWQgZnJvbSBhcGktcGxhdGZvcm0gaW4gMjAxOS4yKy5cbiAqXG4gKiBDcmVhdGVzIGEgbmV3IEludGVybmFsQ29udHJhY3RWZXJzaW9uQ29udmVydGVyIHdoaWNoIGhhcyB0aGUgYWJpbGl0eSB0byB1cGdyYWRlIGFuZCBkb3duZ3JhZGUgdGhlIGNvbnRyYWN0IGJldHdlZW4gdGhlIHR3byB2ZXJzaW9uc1xuICogd2hpY2ggYXJlIHNwZWNpZmllZC4gSWYgZXh0ZXJuYWxNYWpvclZlcnNpb24gaXMgZ3JlYXRlciB0aGFuIHBsYXRmb3JtTWFqb3JWZXJzaW9uLCBhbiBlcnJvciB3aWxsIGJlIHRocm93biBiZWNhdXNlXG4gKiB3ZSB3b24ndCBrbm93IGhvdyB0byBkbyB0aG9zZSBjb252ZXJzaW9ucy5cbiAqXG4gKiBAc2VlIENyZWF0ZUNvbXBhdGlibGVWZXJzaW9uQ29udmVydGVyXG4gKlxuICogQHBhcmFtIGV4dGVybmFsTWFqb3JWZXJzaW9uIFRoZSB2ZXJzaW9uIG9mIHRoZSBpbnRlcm5hbCBhcGkgd2hpY2ggdGhlIGV4dGVybmFsIG1vZHVsZSBpcyB1c2luZ1xuICogQHBhcmFtIHBsYXRmb3JtTWFqb3JWZXJzaW9uIFRoZSB2ZXJzaW9uIG9mIHRoZSBpbnRlcm5hbCBhcGkgd2hpY2ggdGhlIHBsYXRmb3JtIGlzIHVzaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDcmVhdGVWZXJzaW9uQ29udmVydGVyKGV4dGVybmFsTWFqb3JWZXJzaW9uOiBudW1iZXIsIHBsYXRmb3JtTWFqb3JWZXJzaW9uOiBudW1iZXIpOiBJbnRlcm5hbENvbnRyYWN0VmVyc2lvbkNvbnZlcnRlciB7XG5cbiAgLy8gQSBtYXBwaW5nIGZyb20gdGhlIHNvdXJjZSB2ZXJzaW9uIG9mIGEgbW9kZWwgLT4gdGhlIG5leHQgdmVyc2lvbiBvZiB0aGUgbW9kZWwuIEVhY2ggbWFqb3JcbiAgLy8gdmVyc2lvbiBidW1wIGNhbiBoYXZlIGFuIGFycmF5IG9mIGNvbnZlcnNpb25zIHRvIHBlcmZvcm0gaW4gb3JkZXJcbiAgY29uc3QgZXhlY3V0ZVVwZ3JhZGVzOiB7IFt2ZXJzaW9uOiBudW1iZXJdOiBBcnJheTxUcmFuc2xhdGlvbnMuVXBncmFkZUV4ZWN1dGVDYWxsPiB9ID0ge1xuICAgIDA6IFtdXG4gIH07XG5cbiAgY29uc3QgZXhlY3V0ZURvd25ncmFkZXM6IHsgW3ZlcnNpb246IG51bWJlcl06IEFycmF5PFRyYW5zbGF0aW9ucy5Eb3duZ3JhZGVFeGVjdXRlUmV0dXJuPiB9ID0ge1xuICAgIDA6IFtdLFxuICAgIDE6IFtEb3duZ3JhZGVWMldvcmtzaGVldE5hbWVzXVxuICB9O1xuXG4gIGNvbnN0IG5vdGlmaWNhdGlvbkRvd25ncmFkZXM6IHsgW3ZlcnNpb246IG51bWJlcl06IEFycmF5PFRyYW5zbGF0aW9ucy5Eb3duZ3JhZGVOb3RpZmljYXRpb24+IH0gPSB7XG4gICAgMDogW11cbiAgfTtcblxuICBpZiAoIU51bWJlci5pc0ludGVnZXIoZXh0ZXJuYWxNYWpvclZlcnNpb24pIHx8XG4gICAgIU51bWJlci5pc0ludGVnZXIocGxhdGZvcm1NYWpvclZlcnNpb24pIHx8XG4gICAgZXh0ZXJuYWxNYWpvclZlcnNpb24gPCAwIHx8XG4gICAgcGxhdGZvcm1NYWpvclZlcnNpb24gPCAwKSB7XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoYFZlcnNpb25zIG11c3QgYmUgcG9zaXRpdmUgaW50ZWdlcnM6XG4gICAgZXh0ZXJuYWxNYWpvclZlcnNpb249JHtleHRlcm5hbE1ham9yVmVyc2lvbn0gcGxhdGZvcm1NYWpvclZlcnNpb249JHtwbGF0Zm9ybU1ham9yVmVyc2lvbn1gKTtcbiAgfVxuXG4gIGlmIChleHRlcm5hbE1ham9yVmVyc2lvbiA+IHBsYXRmb3JtTWFqb3JWZXJzaW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBFeHRlcm5hbCB2ZXJzaW9uIG11c3QgYmUgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIHBsYXRmb3JtIHZlcnNpb24uXG4gICAgZXh0ZXJuYWxNYWpvclZlcnNpb249JHtleHRlcm5hbE1ham9yVmVyc2lvbn0gcGxhdGZvcm1NYWpvclZlcnNpb249JHtwbGF0Zm9ybU1ham9yVmVyc2lvbn1gKTtcbiAgfVxuXG4gIGlmIChleHRlcm5hbE1ham9yVmVyc2lvbiA9PT0gcGxhdGZvcm1NYWpvclZlcnNpb24pIHtcbiAgICAvLyBJZiB3ZSBhcmUgdXNpbmcgdGhlIGV4YWN0IHNhbWUgdmVyc2lvbnMsIGp1c3QgdXNlIHRoZSBpZGVudGl0eSBjb252ZXJ0ZXJcbiAgICByZXR1cm4gbmV3IElkZW50aXR5VmVyc2lvbkNvbnZlcnRlcigpO1xuICB9XG5cbiAgLy8gV2FsayB0aGUgc3BhbiBiZXR3ZWVuIHRoZSB2ZXJzaW9ucyB3ZSBoYXZlIGhlcmUgYW5kIGNvbGxlY3QgdGhlIHVwZ3JhZGUgYW5kIGRvd25ncmFkZXMgbmVjZXNzYXJ5XG4gIGxldCBuZWVkZWRFeGVjdXRlVXBncmFkZXM6IEFycmF5PFRyYW5zbGF0aW9ucy5VcGdyYWRlRXhlY3V0ZUNhbGw+ID0gW107XG4gIGZvciAobGV0IGkgPSBleHRlcm5hbE1ham9yVmVyc2lvbjsgaSA8IHBsYXRmb3JtTWFqb3JWZXJzaW9uOyBpKyspIHtcbiAgICBpZiAoaSBpbiBleGVjdXRlVXBncmFkZXMpIHtcbiAgICAgIG5lZWRlZEV4ZWN1dGVVcGdyYWRlcy5wdXNoKC4uLmV4ZWN1dGVVcGdyYWRlc1tpXSk7XG4gICAgfVxuICB9XG5cbiAgLy8gV2FsayB0aGUgc3BhbiBiZXR3ZWVuIHRoZW0gYmFja3dhcmRzIHRvIGdldCB0aGUgbmVjZXNzYXJ5IGRvd25ncmFkZXNcbiAgbGV0IG5lZWRlZEV4ZWN1dGVEb3duZ3JhZGVzOiBBcnJheTxUcmFuc2xhdGlvbnMuRG93bmdyYWRlRXhlY3V0ZVJldHVybj4gPSBbXTtcbiAgbGV0IG5lZWRlZE5vdGlmaWNhdGlvbkRvd25ncmFkZXM6IEFycmF5PFRyYW5zbGF0aW9ucy5Eb3duZ3JhZGVOb3RpZmljYXRpb24+ID0gW107XG4gIGZvciAobGV0IGkgPSBwbGF0Zm9ybU1ham9yVmVyc2lvbiAtIDE7IGkgPj0gZXh0ZXJuYWxNYWpvclZlcnNpb247IGktLSkge1xuICAgIGlmIChpIGluIGV4ZWN1dGVEb3duZ3JhZGVzKSB7XG4gICAgICBuZWVkZWRFeGVjdXRlRG93bmdyYWRlcy5wdXNoKC4uLmV4ZWN1dGVEb3duZ3JhZGVzW2ldKTtcbiAgICB9XG5cbiAgICBpZiAoaSBpbiBub3RpZmljYXRpb25Eb3duZ3JhZGVzKSB7XG4gICAgICBuZWVkZWROb3RpZmljYXRpb25Eb3duZ3JhZGVzLnB1c2goLi4ubm90aWZpY2F0aW9uRG93bmdyYWRlc1tpXSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBTdGFja2luZ1ZlcnNpb25Db252ZXJ0ZXIoXG4gICAgZXh0ZXJuYWxNYWpvclZlcnNpb24sIHBsYXRmb3JtTWFqb3JWZXJzaW9uLCBuZWVkZWRFeGVjdXRlVXBncmFkZXMsIG5lZWRlZEV4ZWN1dGVEb3duZ3JhZGVzLCBuZWVkZWROb3RpZmljYXRpb25Eb3duZ3JhZGVzKTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNYWpvck1pbm9yVHJhbnNsYXRvcnM8VD4geyBbbWFqb3I6IG51bWJlcl06IHsgW21pbm9yOiBudW1iZXJdOiBBcnJheTxUPiB9OyB9XG5cbi8vIEEgbWFwcGluZyBmcm9tIGFuIG9sZGVyIGNsaWVudCB2ZXJzaW9uIG9mIGludGVybmFsLWNvbnRyYWN0IHRvIHRoZSBjdXJyZW50IHBsYXRmb3JtIHZlcnNpb24gb2YgdGhpcyBjb250cmFjdC5cbi8vIEVhY2ggdmVyc2lvbiBidW1wIGNhbiBoYXZlIGFuIGFycmF5IG9mIHRyYW5zbGF0aW9ucyB0byBwZXJmb3JtIGluIG9yZGVyLiBOb3RpY2UgdGhhdCB0aGlzIGlzXG4vLyBkaWZmZXJlbnQgdGhhbiB0aGUgbWFqb3IgdXBncmFkZXMvZG93bmdyYWRlcyBhYm92ZSBiZWNhdXNlIGl0IGhhbmRsZXMgYm90aCBtYWpvciBhbmQgbWlub3IgdmVyc2lvbiBjaGFuZ2VzLlxuLy8gQWxzbyBwbGVhc2Ugbm90ZTogZG93bmdyYWRlRXhlY3V0ZUNhbGwgaXMgaGFuZGxlZCBvbiB0aGUgY2xpZW50L2V4dGVybmFsIHNpZGUgcmF0aGVyIHRoYW4gcGxhdGZvcm0gc2lkZS5cbi8vIFdoZW4gdXBkYXRpbmcgdGhlIG1ham9yIG9yIG1pbm9yIHZlcnNpb24gb2Ygb3VyIGludGVybmFsLWNvbnRyYWN0LCB5b3Ugd2lsbCBuZWVkIHRvIHVwZGF0ZSB0aGVzZSBkYXRhIHN0cnVjdHVyZXMuXG4vLyAqIElmIHRoZXJlIGFyZSB0cmFuc2xhdGlvbnMgdG8gYWRkLCBhZGQgdGhlbSB0byB0aGUgdmVyc2lvbiB0byBcInVwZ3JhZGUgZnJvbVwiIG9yIFwiZG93bmdyYWRlIHRvXCIuXG5leHBvcnQgY29uc3QgRXhlY3V0ZU1pbm9yVXBncmFkZXM6IE1ham9yTWlub3JUcmFuc2xhdG9yczxUcmFuc2xhdGlvbnMuVXBncmFkZUV4ZWN1dGVDYWxsPiA9IHtcbiAgMToge1xuICAgIDk6IFtdLCAgICAgICAgICAgICAgICAgICAgLy8gTm90ZSB0aGF0IHdlIHB1dCB1cGdyYWRlcyBmcm9tIDEuOSB0byAxLjEwIGluIHRoZSBbMV1bOV0gYnVja2V0XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBFeGVjdXRlTWlub3JEb3duZ3JhZGVzOiBNYWpvck1pbm9yVHJhbnNsYXRvcnM8VHJhbnNsYXRpb25zLkRvd25ncmFkZUV4ZWN1dGVSZXR1cm4+ID0ge1xuICAxOiB7XG4gICAgOTogW10sXG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBOb3RpZmljYXRpb25NaW5vckRvd25ncmFkZXM6IE1ham9yTWlub3JUcmFuc2xhdG9yczxUcmFuc2xhdGlvbnMuRG93bmdyYWRlTm90aWZpY2F0aW9uPiA9IHtcbiAgMToge1xuICAgIDk6IFtdLFxuICB9XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgSW50ZXJuYWxDb250cmFjdFZlcnNpb25Db252ZXJ0ZXIgd2hpY2ggaGFzIHRoZSBhYmlsaXR5IHRvIHVwZ3JhZGUgYW5kIGRvd25ncmFkZSB0aGUgY29udHJhY3QgYmV0d2VlbiB0aGUgdHdvIHZlcnNpb25zXG4gKiB3aGljaCBhcmUgc3BlY2lmaWVkLiBJZiBleHRlcm5hbE1ham9yVmVyc2lvbiBpcyBncmVhdGVyIHRoYW4gcGxhdGZvcm1NYWpvclZlcnNpb24sIGFuIGVycm9yIHdpbGwgYmUgdGhyb3duIGJlY2F1c2VcbiAqIHdlIHdvbid0IGtub3cgaG93IHRvIGRvIHRob3NlIGNvbnZlcnNpb25zLiBBcyBjb21wYXJlZCB0byBDcmVhdGVWZXJzaW9uQ29udmVydGVyLCB0aGlzIGNvbnZlcnRlciBjYW4gYWxzbyBoYW5kbGVcbiAqIG1pbm9yIHVwZGF0ZXMsIHdpdGggdXBncmFkZS9kb3duZ3JhZGUgZm9yIGJvdGggbWFqb3IgYW5kIG1pbm9yIHVwZGF0ZXMuXG4gKlxuICogQHBhcmFtIGV4dGVybmFsVmVyc2lvbiBWZXJzaW9uTnVtYmVyIG9mIHRoZSBpbnRlcm5hbCBhcGkgd2hpY2ggdGhlIGV4dGVybmFsIG1vZHVsZSBpcyB1c2luZ1xuICogQHBhcmFtIHBsYXRmb3JtVmVyc2lvbiBWZXJzaW9uTnVtYmVyIG9mIHRoZSBpbnRlcm5hbCBhcGkgd2hpY2ggdGhlIHBsYXRmb3JtIGlzIHVzaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBDcmVhdGVDb21wYXRpYmxlVmVyc2lvbkNvbnZlcnRlcihcbiAgZXh0ZXJuYWxWZXJzaW9uOiBWZXJzaW9uTnVtYmVyLFxuICBwbGF0Zm9ybVZlcnNpb246IFZlcnNpb25OdW1iZXIpOiBJbnRlcm5hbENvbnRyYWN0VmVyc2lvbkNvbnZlcnRlciB7XG5cbiAgcmV0dXJuIENyZWF0ZUNvbXBhdGlibGVWZXJzaW9uQ29udmVydGVyV2l0aFRyYW5zbGF0b3JzKFxuICAgIGV4dGVybmFsVmVyc2lvbixcbiAgICBwbGF0Zm9ybVZlcnNpb24sXG4gICAgRXhlY3V0ZU1pbm9yVXBncmFkZXMsXG4gICAgRXhlY3V0ZU1pbm9yRG93bmdyYWRlcyxcbiAgICBOb3RpZmljYXRpb25NaW5vckRvd25ncmFkZXMpO1xufVxuXG4vKipcbiAqIEltcGxlbWVudGF0aW9uIG9mIENyZWF0ZUNvbXBhdGlibGVWZXJzaW9uQ29udmVydGVyLiBUaGlzIGZ1bmN0aW9uIHRha2VzIHRoZSB1cGdyYWRlLCBkb3duZ3JhZGUsIGFuZFxuICogbm90aWZpY2F0aW9uIGFycmF5cyBzbyB0aGF0IGFsbCB0aGUgbG9naWMgY2FuIGJlIHRlc3RlZC5cbiAqXG4gKiBAcGFyYW0gZXh0ZXJuYWxWZXJzaW9uIFZlcnNpb25OdW1iZXIgb2YgdGhlIGludGVybmFsIGFwaSB3aGljaCB0aGUgZXh0ZXJuYWwgbW9kdWxlIGlzIHVzaW5nXG4gKiBAcGFyYW0gcGxhdGZvcm1WZXJzaW9uIFZlcnNpb25OdW1iZXIgb2YgdGhlIGludGVybmFsIGFwaSB3aGljaCB0aGUgcGxhdGZvcm0gaXMgdXNpbmdcbiAqIEBwYXJhbSB1cGdyYWRlcyBNYWpvck1pbm9yVHJhbnNsYXRvcnMgZm9yIHVwZ3JhZGVzXG4gKiBAcGFyYW0gZG93bmdyYWRlcyBNYWpvck1pbm9yVHJhbnNsYXRvcnMgZm9yIGRvd25ncmFkZXNcbiAqIEBwYXJhbSBub3RpZmljYXRpb25Eb3duZ3JhZGVzIE1ham9yTWlub3JUcmFuc2xhdG9ycyBmb3Igbm90aWZpY2F0aW9uIGRvd25ncmFkZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIENyZWF0ZUNvbXBhdGlibGVWZXJzaW9uQ29udmVydGVyV2l0aFRyYW5zbGF0b3JzKFxuICBleHRlcm5hbFZlcnNpb246IFZlcnNpb25OdW1iZXIsXG4gIHBsYXRmb3JtVmVyc2lvbjogVmVyc2lvbk51bWJlcixcbiAgdXBncmFkZXM6IE1ham9yTWlub3JUcmFuc2xhdG9yczxUcmFuc2xhdGlvbnMuVXBncmFkZUV4ZWN1dGVDYWxsPixcbiAgZG93bmdyYWRlczogTWFqb3JNaW5vclRyYW5zbGF0b3JzPFRyYW5zbGF0aW9ucy5Eb3duZ3JhZGVFeGVjdXRlUmV0dXJuPixcbiAgbm90aWZpY2F0aW9uRG93bmdyYWRlczogTWFqb3JNaW5vclRyYW5zbGF0b3JzPFRyYW5zbGF0aW9ucy5Eb3duZ3JhZGVOb3RpZmljYXRpb24+KTogSW50ZXJuYWxDb250cmFjdFZlcnNpb25Db252ZXJ0ZXIge1xuXG4gIGNvbnN0IGV4dGVybmFsTWFqb3JWZXJzaW9uOiBudW1iZXIgPSBleHRlcm5hbFZlcnNpb24ubWFqb3I7XG4gIGNvbnN0IGV4dGVybmFsTWlub3JWZXJzaW9uOiBudW1iZXIgPSBleHRlcm5hbFZlcnNpb24ubWlub3I7XG4gIGNvbnN0IHBsYXRmb3JtTWFqb3JWZXJzaW9uOiBudW1iZXIgPSBwbGF0Zm9ybVZlcnNpb24ubWFqb3I7XG5cbiAgaWYgKGV4dGVybmFsTWFqb3JWZXJzaW9uID4gcGxhdGZvcm1NYWpvclZlcnNpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEV4dGVybmFsIHZlcnNpb24gbXVzdCBiZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gcGxhdGZvcm0gdmVyc2lvbi5cbiAgICBleHRlcm5hbE1ham9yVmVyc2lvbj0ke2V4dGVybmFsTWFqb3JWZXJzaW9ufSBwbGF0Zm9ybU1ham9yVmVyc2lvbj0ke3BsYXRmb3JtTWFqb3JWZXJzaW9ufWApO1xuICB9XG5cbiAgLy8gSWYgd2UgYXJlIHVzaW5nIHRoZSBleGFjdCBzYW1lIHZlcnNpb25zIChtYWpvci5taW5vciksIGp1c3QgdXNlIHRoZSBpZGVudGl0eSBjb252ZXJ0ZXJcbiAgaWYgKFZlcnNpb25FcXVhbFRvKGV4dGVybmFsVmVyc2lvbiwgcGxhdGZvcm1WZXJzaW9uKSkge1xuICAgIHJldHVybiBuZXcgSWRlbnRpdHlWZXJzaW9uQ29udmVydGVyKCk7XG4gIH1cblxuICAvLyBXYWxrIHRoZSBzcGFuIGJldHdlZW4gdGhlIHZlcnNpb25zIHdlIGhhdmUgaGVyZSBhbmQgY29sbGVjdCB0aGUgdXBncmFkZSBhbmQgZG93bmdyYWRlcyBuZWNlc3NhcnlcbiAgbGV0IG5lZWRlZEV4ZWN1dGVVcGdyYWRlczogQXJyYXk8VHJhbnNsYXRpb25zLlVwZ3JhZGVFeGVjdXRlQ2FsbD4gPVxuICAgIEdldE5lZWRlZFRyYW5zbGF0aW9ucyhleHRlcm5hbE1ham9yVmVyc2lvbiwgcGxhdGZvcm1NYWpvclZlcnNpb24sIGV4dGVybmFsTWlub3JWZXJzaW9uLCB1cGdyYWRlcyk7XG5cbiAgbGV0IG5lZWRlZEV4ZWN1dGVEb3duZ3JhZGVzOiBBcnJheTxUcmFuc2xhdGlvbnMuRG93bmdyYWRlRXhlY3V0ZVJldHVybj4gPVxuICAgIEdldE5lZWRlZFRyYW5zbGF0aW9ucyhleHRlcm5hbE1ham9yVmVyc2lvbiwgcGxhdGZvcm1NYWpvclZlcnNpb24sIGV4dGVybmFsTWlub3JWZXJzaW9uLCBkb3duZ3JhZGVzKTtcblxuICBsZXQgbmVlZGVkTm90aWZpY2F0aW9uRG93bmdyYWRlczogQXJyYXk8VHJhbnNsYXRpb25zLkRvd25ncmFkZU5vdGlmaWNhdGlvbj4gPVxuICAgIEdldE5lZWRlZFRyYW5zbGF0aW9ucyhleHRlcm5hbE1ham9yVmVyc2lvbiwgcGxhdGZvcm1NYWpvclZlcnNpb24sIGV4dGVybmFsTWlub3JWZXJzaW9uLCBub3RpZmljYXRpb25Eb3duZ3JhZGVzKTtcblxuICAvLyBXZSB3YW50IHRvIGFwcGx5IHRoZSBkb3duZ3JhZGVzIGluIHJldmVyc2Ugb3JkZXIgaW4gY2FzZSBvZiBkZXBlbmRlbmNpZXMgYmV0d2VlbiB0aGVtXG4gIG5lZWRlZEV4ZWN1dGVEb3duZ3JhZGVzLnJldmVyc2UoKTtcbiAgbmVlZGVkTm90aWZpY2F0aW9uRG93bmdyYWRlcy5yZXZlcnNlKCk7XG5cbiAgcmV0dXJuIFN0YWNraW5nVmVyc2lvbkNvbnZlcnRlci5mcm9tRGF0YShcbiAgICBleHRlcm5hbFZlcnNpb24sIHBsYXRmb3JtVmVyc2lvbiwgbmVlZGVkRXhlY3V0ZVVwZ3JhZGVzLCBuZWVkZWRFeGVjdXRlRG93bmdyYWRlcywgbmVlZGVkTm90aWZpY2F0aW9uRG93bmdyYWRlcyk7XG59XG5cbmZ1bmN0aW9uIEdldE5lZWRlZFRyYW5zbGF0aW9uczxUPihcbiAgZXh0ZXJuYWxNYWpvclZlcnNpb246IG51bWJlcixcbiAgcGxhdGZvcm1NYWpvclZlcnNpb246IG51bWJlcixcbiAgZXh0ZXJuYWxNaW5vclZlcnNpb246IG51bWJlcixcbiAgbWFqb3JNaW5vclRyYW5zbGF0b3JzOiBNYWpvck1pbm9yVHJhbnNsYXRvcnM8VD4pOiBBcnJheTxUPiB7XG5cbiAgbGV0IG5lZWRlZFRyYW5zbGF0aW9uczogQXJyYXk8VD4gPSBbXTtcblxuICBmb3IgKGxldCBtYWpvciA9IGV4dGVybmFsTWFqb3JWZXJzaW9uOyBtYWpvciA8PSBwbGF0Zm9ybU1ham9yVmVyc2lvbjsgbWFqb3IrKykge1xuICAgIGlmIChtYWpvciBpbiBtYWpvck1pbm9yVHJhbnNsYXRvcnMpIHtcbiAgICAgIGxldCBzdGFydCA9IChtYWpvciA9PT0gZXh0ZXJuYWxNYWpvclZlcnNpb24pID8gZXh0ZXJuYWxNaW5vclZlcnNpb24gOiAwO1xuICAgICAgbGV0IG1heGltdW1NaW5vclZlcnNpb24gPSBHZXRNYXhpbXVtTWlub3JJbmRleChPYmplY3Qua2V5cyhtYWpvck1pbm9yVHJhbnNsYXRvcnNbbWFqb3JdKSk7XG4gICAgICBmb3IgKGxldCBtaW5vciA9IHN0YXJ0OyBtaW5vciA8PSBtYXhpbXVtTWlub3JWZXJzaW9uOyBtaW5vcisrKSB7XG4gICAgICAgIGlmIChtaW5vciBpbiBtYWpvck1pbm9yVHJhbnNsYXRvcnNbbWFqb3JdKSB7XG4gICAgICAgICAgbmVlZGVkVHJhbnNsYXRpb25zLnB1c2goLi4ubWFqb3JNaW5vclRyYW5zbGF0b3JzW21ham9yXVttaW5vcl0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5lZWRlZFRyYW5zbGF0aW9ucztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEdldE1heGltdW1NaW5vckluZGV4KG1pbm9yVmVyc2lvbnM6IEFycmF5PHN0cmluZz4pOiBudW1iZXIge1xuICByZXR1cm4gbWlub3JWZXJzaW9ucy5tYXAoKGEpID0+IE51bWJlcihhKSkucmVkdWNlKChhLCBiKSA9PiBhID4gYiA/IGEgOiBiKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9zcmMvdmVyc2lvbmluZy9WZXJzaW9uQ29udmVydGVyRmFjdG9yeS50cyIsImltcG9ydCB7IEV4dGVybmFsQ29udHJhY3RWZXJzaW9uQ29udmVydGVyIH0gZnJvbSAnLi9FeHRlcm5hbENvbnRyYWN0VmVyc2lvbkNvbnZlcnRlcic7XG5pbXBvcnQgeyBFeGVjdXRlUGFyYW1ldGVycywgRXhlY3V0ZVJlc3BvbnNlLCBOb3RpZmljYXRpb24sIFZlcmJJZCB9IGZyb20gJy4uLy4uL0pzQXBpSW50ZXJuYWxDb250cmFjdCc7XG5cbi8vIHRzbGludDpkaXNhYmxlOm5vLWFueVxuXG4vKipcbiAqIFRoaXMgdmVyc2lvbiBjb252ZXJ0ZXIgZG9lc24ndCBhY3R1YWxseSBkbyBhbnl0aGluZyBidXQgaXMgdXNlZnVsIGZvciB0ZXN0aW5nIG9yIHdoZW4gd2UgaGF2ZVxuICogYSBtYXRjaGluZyBwbGF0Zm9ybSBhbmQgZXh0ZXJuYWwgdmVyc2lvbiBudW1iZXJcbiovXG5leHBvcnQgY2xhc3MgRXh0ZXJuYWxJZGVudGl0eVZlcnNpb25Db252ZXJ0ZXIgaW1wbGVtZW50cyBFeHRlcm5hbENvbnRyYWN0VmVyc2lvbkNvbnZlcnRlciB7XG4gIHB1YmxpYyBkb3duZ3JhZGVFeGVjdXRlQ2FsbCh2ZXJiOiBhbnksIHBhcmFtZXRlcnM6IGFueSk6IHsgdmVyYjogVmVyYklkOyBwYXJhbWV0ZXJzOiBFeGVjdXRlUGFyYW1ldGVyczsgfSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZlcmI6IHZlcmIgYXMgVmVyYklkLFxuICAgICAgcGFyYW1ldGVyczogcGFyYW1ldGVycyBhcyBFeGVjdXRlUGFyYW1ldGVyc1xuICAgIH07XG4gIH1cblxuICBwdWJsaWMgdXBncmFkZUV4ZWN1dGVSZXR1cm4oZXhlY3V0ZVJlc3BvbnNlOiBFeGVjdXRlUmVzcG9uc2UpOiBFeGVjdXRlUmVzcG9uc2Uge1xuICAgIHJldHVybiBleGVjdXRlUmVzcG9uc2U7XG4gIH1cblxuICBwdWJsaWMgdXBncmFkZU5vdGlmaWNhdGlvbihub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbik6IE5vdGlmaWNhdGlvbiB7XG4gICAgcmV0dXJuIG5vdGlmaWNhdGlvbjtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uLy4uL3NyYy92ZXJzaW9uaW5nL2V4dGVybmFsL0V4dGVybmFsSWRlbnRpdHlWZXJzaW9uQ29udmVydGVyLnRzIiwiKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHZhbGlkYXRvciA9IG5ldyBSZWdFeHAoXCJeW2EtejAtOV17OH0tW2EtejAtOV17NH0tW2EtejAtOV17NH0tW2EtejAtOV17NH0tW2EtejAtOV17MTJ9JFwiLCBcImlcIik7XG5cbiAgZnVuY3Rpb24gZ2VuKGNvdW50KSB7XG4gICAgdmFyIG91dCA9IFwiXCI7XG4gICAgZm9yICh2YXIgaT0wOyBpPGNvdW50OyBpKyspIHtcbiAgICAgIG91dCArPSAoKCgxK01hdGgucmFuZG9tKCkpKjB4MTAwMDApfDApLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMSk7XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG4gIH1cblxuICBmdW5jdGlvbiBHdWlkKGd1aWQpIHtcbiAgICBpZiAoIWd1aWQpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGFyZ3VtZW50OyBgdmFsdWVgIGhhcyBubyB2YWx1ZS5cIik7XG4gICAgICBcbiAgICB0aGlzLnZhbHVlID0gR3VpZC5FTVBUWTtcbiAgICBcbiAgICBpZiAoZ3VpZCAmJiBndWlkIGluc3RhbmNlb2YgR3VpZCkge1xuICAgICAgdGhpcy52YWx1ZSA9IGd1aWQudG9TdHJpbmcoKTtcblxuICAgIH0gZWxzZSBpZiAoZ3VpZCAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZ3VpZCkgPT09IFwiW29iamVjdCBTdHJpbmddXCIgJiYgR3VpZC5pc0d1aWQoZ3VpZCkpIHtcbiAgICAgIHRoaXMudmFsdWUgPSBndWlkO1xuICAgIH1cbiAgICBcbiAgICB0aGlzLmVxdWFscyA9IGZ1bmN0aW9uKG90aGVyKSB7XG4gICAgICAvLyBDb21wYXJpbmcgc3RyaW5nIGB2YWx1ZWAgYWdhaW5zdCBwcm92aWRlZCBgZ3VpZGAgd2lsbCBhdXRvLWNhbGxcbiAgICAgIC8vIHRvU3RyaW5nIG9uIGBndWlkYCBmb3IgY29tcGFyaXNvblxuICAgICAgcmV0dXJuIEd1aWQuaXNHdWlkKG90aGVyKSAmJiB0aGlzLnZhbHVlID09IG90aGVyO1xuICAgIH07XG5cbiAgICB0aGlzLmlzRW1wdHkgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlID09PSBHdWlkLkVNUFRZO1xuICAgIH07XG4gICAgXG4gICAgdGhpcy50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgfTtcbiAgICBcbiAgICB0aGlzLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgfTtcbiAgfTtcblxuICBHdWlkLkVNUFRZID0gXCIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDBcIjtcblxuICBHdWlkLmlzR3VpZCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICYmICh2YWx1ZSBpbnN0YW5jZW9mIEd1aWQgfHwgdmFsaWRhdG9yLnRlc3QodmFsdWUudG9TdHJpbmcoKSkpO1