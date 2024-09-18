(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./build.definitions/MDKApp/i18n/i18n.properties":
/*!*******************************************************!*\
  !*** ./build.definitions/MDKApp/i18n/i18n.properties ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = "Customers=Customers\nCustomer_Detail=Customer Detail\nCreate_Customer_Detail=Create Customer Detail\nUpdate_Customer_Detail=Update Customer Detail\nCreate_SalesOrderHeader=Create SalesOrderHeader\nProducts=Products\nProduct_Detail=Product Detail\nCreate_Product_Detail=Create Product Detail\nUpdate_Product_Detail=Update Product Detail\nCreate_PurchaseOrderItem=Create PurchaseOrderItem\nCreate_SalesOrderItem=Create SalesOrderItem\nPurchaseOrderHeaders=PurchaseOrderHeaders\nPurchaseOrderHeader_Detail=PurchaseOrderHeader Detail\nCreate_PurchaseOrderHeader_Detail=Create PurchaseOrderHeader Detail\nUpdate_PurchaseOrderHeader_Detail=Update PurchaseOrderHeader Detail\nPurchaseOrderItems=PurchaseOrderItems\nPurchaseOrderItem_Detail=PurchaseOrderItem Detail\nCreate_PurchaseOrderItem_Detail=Create PurchaseOrderItem Detail\nUpdate_PurchaseOrderItem_Detail=Update PurchaseOrderItem Detail\nSalesOrderHeaders=SalesOrderHeaders\nSalesOrderHeader_Detail=SalesOrderHeader Detail\nCreate_SalesOrderHeader_Detail=Create SalesOrderHeader Detail\nUpdate_SalesOrderHeader_Detail=Update SalesOrderHeader Detail\nSalesOrderItems=SalesOrderItems\nSalesOrderItem_Detail=SalesOrderItem Detail\nCreate_SalesOrderItem_Detail=Create SalesOrderItem Detail\nUpdate_SalesOrderItem_Detail=Update SalesOrderItem Detail"

/***/ }),

/***/ "./build.definitions/MDKApp/Rules/Application/AppUpdateFailure.js":
/*!************************************************************************!*\
  !*** ./build.definitions/MDKApp/Rules/Application/AppUpdateFailure.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateFailure)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function AppUpdateFailure(clientAPI) {
    let result = clientAPI.actionResults.AppUpdate.error.toString();
    var message;
    console.log(result);
    if (result.startsWith('Error: Uncaught app extraction failure:')) {
        result = 'Error: Uncaught app extraction failure:';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body: 404 Not Found: Requested route')) {
        result = 'Application instance is not up or running';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body')) {
        result = 'Service instance not found.';
    }

    switch (result) {
        case 'Service instance not found.':
            message = 'Mobile App Update feature is not assigned or not running for your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response Error Response Status: 404 | Body: Failed to find a matched endpoint':
            message = 'Mobile App Update feature is not assigned to your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response failed: Error: Optional(OAuth2Error.tokenRejected: The newly acquired or refreshed token got rejected.)':
            message = 'The Mobile App Update feature is not assigned to your application or there is no Application metadata deployed. Please check your application in Mobile Services and try again.';
            break;
        case 'Error: Uncaught app extraction failure:':
            message = 'Error extracting metadata. Please redeploy and try again.';
            break;
        case 'Application instance is not up or running':
            message = 'Communication failure. Verify that the BindMobileApplicationRoutesToME Application route is running in your BTP space cockpit.';
            break;
        default:
            message = result;
            break;
    }
    return clientAPI.getPageProxy().executeAction({
        "Name": "/MDKApp/Actions/Application/AppUpdateFailureMessage.action",
        "Properties": {
            "Duration": 0,
            "Message": message
        }
    });
}

/***/ }),

/***/ "./build.definitions/MDKApp/Rules/Application/AppUpdateSuccess.js":
/*!************************************************************************!*\
  !*** ./build.definitions/MDKApp/Rules/Application/AppUpdateSuccess.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateSuccess)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function sleep(ms) {
    return (new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve();
        }, ms);
    }));
}
function AppUpdateSuccess(clientAPI) {
    var message;
    // Force a small pause to let the progress banner show in case there is no new version available
    return sleep(500).then(function() {
        let result = clientAPI.actionResults.AppUpdate.data;
        console.log(result);

        let versionNum = result.split(': ')[1];
        if (result.startsWith('Current version is already up to date')) {
            return clientAPI.getPageProxy().executeAction({
                "Name": "/MDKApp/Actions/Application/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Message": `You are already using the latest version: ${versionNum}`,
                    "NumberOfLines": 2
                }
            });
        } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
            message = 'No Application metadata found. Please deploy your application and try again.';
            return clientAPI.getPageProxy().executeAction({
                "Name": "/MDKApp/Actions/Application/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Duration": 5,
                    "Message": message,
                    "NumberOfLines": 2
                }
            });
        }
    });
}

/***/ }),

/***/ "./build.definitions/MDKApp/Rules/Application/ClientIsMultiUserMode.js":
/*!*****************************************************************************!*\
  !*** ./build.definitions/MDKApp/Rules/Application/ClientIsMultiUserMode.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ClientIsMultiUserMode)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ClientIsMultiUserMode(clientAPI) {
    return clientAPI.isAppInMultiUserMode();
}

/***/ }),

/***/ "./build.definitions/MDKApp/Rules/Application/GetClientSupportVersions.js":
/*!********************************************************************************!*\
  !*** ./build.definitions/MDKApp/Rules/Application/GetClientSupportVersions.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetClientSupportVersions)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function GetClientSupportVersions(clientAPI) {
    let versionInfo = clientAPI.getVersionInfo();
    let versionStr = '';
    Object.keys(versionInfo).forEach(function(key, index) {
        // key: the name of the object key
        // index: the ordinal position of the key within the object
        //console.log(`Key: ${key}   Index: ${index}`);
        if (key != 'Application Version') {
            versionStr += `${key}: ${versionInfo[key]}\n`;
        }
    });
    return versionStr;
}

/***/ }),

/***/ "./build.definitions/MDKApp/Rules/Application/GetClientVersion.js":
/*!************************************************************************!*\
  !*** ./build.definitions/MDKApp/Rules/Application/GetClientVersion.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetClientVersion)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function GetClientVersion(clientAPI) {
    let versionInfo = clientAPI.getVersionInfo();
    if (versionInfo.hasOwnProperty('Application Version')) {
        return versionInfo['Application Version'];
    }
}

/***/ }),

/***/ "./build.definitions/MDKApp/Rules/Application/OnWillUpdate.js":
/*!********************************************************************!*\
  !*** ./build.definitions/MDKApp/Rules/Application/OnWillUpdate.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OnWillUpdate)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OnWillUpdate(clientAPI) {
    return clientAPI.executeAction('/MDKApp/Actions/Application/OnWillUpdate.action').then((result) => {
        if (result.data) {
            let close_com_sap_edm_sampleservice_v2 = clientAPI.executeAction('/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/CloseOffline.action');
            let close_com_sap_edm_sampleservice_v4 = clientAPI.executeAction('/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/CloseOffline.action');
            return Promise.all([close_com_sap_edm_sampleservice_v2, close_com_sap_edm_sampleservice_v4]).then(() => {
                Promise.resolve();
            }).catch((err) => {
                Promise.reject('Offline Odata Close Failed ' + err.message);
            });
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/MDKApp/Rules/Application/ResetAppSettingsAndLogout.js":
/*!*********************************************************************************!*\
  !*** ./build.definitions/MDKApp/Rules/Application/ResetAppSettingsAndLogout.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResetAppSettingsAndLogout)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ResetAppSettingsAndLogout(clientAPI) {
    let logger = clientAPI.getLogger();
    let platform = clientAPI.nativescript.platformModule;
    let appSettings = clientAPI.nativescript.appSettingsModule;
    var appId;
    if (platform && (platform.isIOS || platform.isAndroid)) {
        appId = clientAPI.evaluateTargetPath('#Application/#AppData/MobileServiceAppId');
    } else {
        appId = 'WindowsClient';
    }
    try {
        // Remove any other app specific settings
        appSettings.getAllKeys().forEach(key => {
            if (key.substring(0, appId.length) === appId) {
                appSettings.remove(key);
            }
        });
    } catch (err) {
        logger.log(`ERROR: AppSettings cleanup failure - ${err}`, 'ERROR');
    } finally {
        // Logout 
        return clientAPI.getPageProxy().executeAction('/MDKApp/Actions/Application/Reset.action');
    }
}

/***/ }),

/***/ "./build.definitions/MDKApp/Rules/Logging/LogLevels.js":
/*!*************************************************************!*\
  !*** ./build.definitions/MDKApp/Rules/Logging/LogLevels.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LogLevels)
/* harmony export */ });
function LogLevels(clientAPI) {
    var levels = [];
    levels.push({
        'DisplayValue': 'Error',
        'ReturnValue': 'Error',
    });
    levels.push({
        'DisplayValue': 'Warning',
        'ReturnValue': 'Warn',
    });
    levels.push({
        'DisplayValue': 'Info',
        'ReturnValue': 'Info',
    });
    levels.push({
        'DisplayValue': 'Debug',
        'ReturnValue': 'Debug',
    });
    levels.push({
        'DisplayValue': 'Trace',
        'ReturnValue': 'Trace',
    });
    return levels;
}

/***/ }),

/***/ "./build.definitions/MDKApp/Rules/Logging/SetTraceCategories.js":
/*!**********************************************************************!*\
  !*** ./build.definitions/MDKApp/Rules/Logging/SetTraceCategories.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SetTraceCategories)
/* harmony export */ });
function SetTraceCategories(clientAPI) {
    var logger = clientAPI.getLogger();
    const sectionedTable = clientAPI.getPageProxy().getControl('SectionedTable');
    const fcsection = sectionedTable.getSection('FormCellSection0');
    const traceCategory = fcsection.getControl('TracingCategoriesListPicker');
    const odataTrace = fcsection.getControl('odataTrace');

    try {
        if (traceCategory.getValue()) {
            var values = traceCategory.getValue();
            var categories = [];

            if (values && values.length) {
                categories = values.map((value) => {
                    return 'mdk.trace.' + value.ReturnValue;
                });
            }
            clientAPI.setDebugSettings(odataTrace.getValue(), true, categories);
        }
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

/***/ }),

/***/ "./build.definitions/MDKApp/Rules/Logging/SetUserLogLevel.js":
/*!*******************************************************************!*\
  !*** ./build.definitions/MDKApp/Rules/Logging/SetUserLogLevel.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SetUserLogLevel)
/* harmony export */ });
function SetUserLogLevel(clientAPI) {
    try {
        if (clientAPI.getValue() && clientAPI.getValue()[0]) {
            var logger = clientAPI.getLogger();
            var listPickerValue = clientAPI.getValue()[0].ReturnValue;
            if (listPickerValue) {
                switch (listPickerValue) {
                    case 'Debug':
                        logger.setLevel('Debug');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Error':
                        logger.setLevel('Error');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Warn':
                        logger.setLevel('Warn');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Info':
                        logger.setLevel('Info');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Trace':
                        logger.setLevel('Trace');
                        ShowTraceOptions(clientAPI, true);
                        break;
                    default:
                        // eslint-disable-next-line no-console
                        console.log(`unrecognized key ${listPickerValue}`);
                }
                return listPickerValue;
            }
        }
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

function ShowTraceOptions(clientAPI, tracingEnabled) {
    let categories = clientAPI.getPageProxy().getControl('SectionedTable').getControl('TracingCategoriesListPicker');
    let odataTrace = clientAPI.getPageProxy().getControl('SectionedTable').getControl('odataTrace');

    categories.setVisible(tracingEnabled);
    odataTrace.setVisible(tracingEnabled);
}

/***/ }),

/***/ "./build.definitions/MDKApp/Rules/Logging/ToggleLogging.js":
/*!*****************************************************************!*\
  !*** ./build.definitions/MDKApp/Rules/Logging/ToggleLogging.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ToggleLogging)
/* harmony export */ });
function ToggleLogging(clientAPI) {
    try {
        var logger = clientAPI.getLogger();
        const sectionedTable = clientAPI.getPageProxy().getControl('SectionedTable');
        const fcsection = sectionedTable.getSection('FormCellSection0');
        const enableLogSwitch = fcsection.getControl('EnableLogSwitch');
        const logLevelListPicker = fcsection.getControl('LogLevelListPicker');
        let switchValue = enableLogSwitch.getValue();
        if (switchValue) {
            logger.on();
            logLevelListPicker.setVisible(true);
            logLevelListPicker.setEditable(true);
            logLevelListPicker.redraw();
        } else {
            logger.off();
            logLevelListPicker.setEditable(false);
            logLevelListPicker.setVisible(false);
            logLevelListPicker.redraw();
        }
        return switchValue;
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

/***/ }),

/***/ "./build.definitions/MDKApp/Rules/Logging/TraceCategories.js":
/*!*******************************************************************!*\
  !*** ./build.definitions/MDKApp/Rules/Logging/TraceCategories.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TraceCategories)
/* harmony export */ });
function TraceCategories(clientAPI) {
    var categories = ['action', 'api', 'app', 'binding', 'branding',
        'core', 'i18n', 'lcms', 'logging', 'odata', 'onboarding', 'profiling', 'push',
        'restservice', 'settings', 'targetpath', 'ui'
    ];

    var values = [];
    categories.forEach((category) => {
        values.push({
            'DisplayValue': category,
            'ReturnValue': category,
        });
    });

    return values;
}

/***/ }),

/***/ "./build.definitions/MDKApp/Rules/Logging/UserLogSetting.js":
/*!******************************************************************!*\
  !*** ./build.definitions/MDKApp/Rules/Logging/UserLogSetting.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserLogSetting)
/* harmony export */ });
function UserLogSetting(clientAPI) {

    try {
        var logger = clientAPI.getLogger();

        const sectionedTable = clientAPI.getControl('SectionedTable');
        const fcsection = sectionedTable.getSection('FormCellSection0');
        const enableLogSwitch = fcsection.getControl('EnableLogSwitch');
        const logLevelListPicker = fcsection.getControl('LogLevelListPicker');
        const traceCategory = fcsection.getControl('TracingCategoriesListPicker');
        const odataTrace = fcsection.getControl('odataTrace');


        //Persist the user logging preferences
        if (logger) {
            console.log("in logger state");
            if (logger.isTurnedOn()) {
                if (enableLogSwitch) {
                    enableLogSwitch.setValue(true);
                }
                if (logLevelListPicker) {
                    logLevelListPicker.setEditable(true);
                }
            } else {
                if (enableLogSwitch) {
                    enableLogSwitch.setValue(false);
                }
                if (logLevelListPicker) {
                    logLevelListPicker.setEditable(false);
                }
            }
            var logLevel = logger.getLevel();
            if (logLevel) {
                if (logLevelListPicker) {
                    logLevelListPicker.setValue([logLevel]);
                }
            }
            if (logLevel === 'Trace') {
                traceCategory.setVisible(true);
                odataTrace.setVisible(true);
            }

            //Upon selecting a value in the List picker and clicking the back button 
            //will enable the onload page rule. This will set the selected value
            //in the control
            if (logLevelListPicker.getValue()[0]) {
                var returnValue = logLevelListPicker.getValue()[0].ReturnValue;
                if (returnValue) {
                    logLevelListPicker.setValue([returnValue]);
                    logger.setLevel(returnValue);
                }
            }
        }
    } catch (exception) {
        // eslint-disable-next-line no-console
        console.log(String(exception), 'Error User Logger could not be set');
    }
}

/***/ }),

/***/ "./build.definitions/MDKApp/Rules/Service/Initialize.js":
/*!**************************************************************!*\
  !*** ./build.definitions/MDKApp/Rules/Service/Initialize.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Initialize)
/* harmony export */ });
function Initialize(context) {

    // Perform pre data initialization task

    // Initialize all your Data sources
    let _com_sap_edm_sampleservice_v2 = context.executeAction('/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/InitializeOffline.action');
    let _com_sap_edm_sampleservice_v4 = context.executeAction('/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/InitializeOffline.action');

    //You can add more service initialize actions here

    return Promise.all([_com_sap_edm_sampleservice_v2, _com_sap_edm_sampleservice_v4]).then(() => {
        // After Initializing the DB connections

        // Display successful initialization  message to the user
        return context.executeAction({

            "Name": "/MDKApp/Actions/GenericToastMessage.action",
            "Properties": {
                "Message": "Application Services Initialized",
                "Animated": true,
                "Duration": 1,
                "IsIconHidden": true,
                "NumberOfLines": 1
            }
        });
    }).catch(() => {
        return false;
    });
}

/***/ }),

/***/ "./build.definitions/MDKApp/Rules/com_sap_edm_sampleservice_v2/ErrorArchive_CheckForSyncError.js":
/*!*******************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Rules/com_sap_edm_sampleservice_v2/ErrorArchive_CheckForSyncError.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CheckForSyncError)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} context
 */
function CheckForSyncError(context) {
    context.count('/MDKApp/Services/com_sap_edm_sampleservice_v2.service', 'ErrorArchive', '').then(errorCount => {
        if (errorCount > 0) {
            return context.getPageProxy().executeAction('/MDKApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action').then(function() {
                return Promise.reject(false);
            });
        }
    });
}

/***/ }),

/***/ "./build.definitions/MDKApp/Rules/com_sap_edm_sampleservice_v4/Customers/Customers_DeleteConfirmation.js":
/*!***************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Rules/com_sap_edm_sampleservice_v4/Customers/Customers_DeleteConfirmation.js ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
    return clientAPI.executeAction('/MDKApp/Actions/DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/Customers_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Delete entity failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/MDKApp/Rules/com_sap_edm_sampleservice_v4/ErrorArchive_CheckForSyncError.js":
/*!*******************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Rules/com_sap_edm_sampleservice_v4/ErrorArchive_CheckForSyncError.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CheckForSyncError)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} context
 */
function CheckForSyncError(context) {
    context.count('/MDKApp/Services/com_sap_edm_sampleservice_v4.service', 'ErrorArchive', '').then(errorCount => {
        if (errorCount > 0) {
            return context.getPageProxy().executeAction('/MDKApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action').then(function() {
                return Promise.reject(false);
            });
        }
    });
}

/***/ }),

/***/ "./build.definitions/MDKApp/Rules/com_sap_edm_sampleservice_v4/Products/Products_CreateEntity.js":
/*!*******************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Rules/com_sap_edm_sampleservice_v4/Products/Products_CreateEntity.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CreateEntity)
/* harmony export */ });
function CreateEntity(clientAPI) {
    return clientAPI.executeAction({
        'Name': '/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/Products_CreateEntity.action',
        'Properties': {
            'OnSuccess': ''
        }
    }).then((result) => {
        let newEntity = JSON.parse(result.data);
        return clientAPI.executeAction({
            'Name': '/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/Products_UploadStream.action',
            'Properties': {
                'Target': {
                    'ReadLink': newEntity['@odata.readLink']
                }
            }
        });
    });
}

/***/ }),

/***/ "./build.definitions/MDKApp/Rules/com_sap_edm_sampleservice_v4/Products/Products_DeleteConfirmation.js":
/*!*************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Rules/com_sap_edm_sampleservice_v4/Products/Products_DeleteConfirmation.js ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
    return clientAPI.executeAction('/MDKApp/Actions/DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/Products_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Delete entity failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/MDKApp/Rules/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/PurchaseOrderHeaders_DeleteConfirmation.js":
/*!*************************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Rules/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/PurchaseOrderHeaders_DeleteConfirmation.js ***!
  \*************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
    return clientAPI.executeAction('/MDKApp/Actions/DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/PurchaseOrderHeaders_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Delete entity failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/MDKApp/Rules/com_sap_edm_sampleservice_v4/PurchaseOrderItems/PurchaseOrderItems_DeleteConfirmation.js":
/*!*********************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Rules/com_sap_edm_sampleservice_v4/PurchaseOrderItems/PurchaseOrderItems_DeleteConfirmation.js ***!
  \*********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
    return clientAPI.executeAction('/MDKApp/Actions/DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderItems/PurchaseOrderItems_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Delete entity failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/MDKApp/Rules/com_sap_edm_sampleservice_v4/SalesOrderHeaders/SalesOrderHeaders_DeleteConfirmation.js":
/*!*******************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Rules/com_sap_edm_sampleservice_v4/SalesOrderHeaders/SalesOrderHeaders_DeleteConfirmation.js ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
    return clientAPI.executeAction('/MDKApp/Actions/DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/SalesOrderHeaders_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Delete entity failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/MDKApp/Rules/com_sap_edm_sampleservice_v4/SalesOrderItems/SalesOrderItems_DeleteConfirmation.js":
/*!***************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Rules/com_sap_edm_sampleservice_v4/SalesOrderItems/SalesOrderItems_DeleteConfirmation.js ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
    return clientAPI.executeAction('/MDKApp/Actions/DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderItems/SalesOrderItems_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Delete entity failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/application-index.js":
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let application_app = __webpack_require__(/*! ./Application.app */ "./build.definitions/Application.app")
	let mdkapp_actions_application_appupdate_action = __webpack_require__(/*! ./MDKApp/Actions/Application/AppUpdate.action */ "./build.definitions/MDKApp/Actions/Application/AppUpdate.action")
	let mdkapp_actions_application_appupdatefailuremessage_action = __webpack_require__(/*! ./MDKApp/Actions/Application/AppUpdateFailureMessage.action */ "./build.definitions/MDKApp/Actions/Application/AppUpdateFailureMessage.action")
	let mdkapp_actions_application_appupdateprogressbanner_action = __webpack_require__(/*! ./MDKApp/Actions/Application/AppUpdateProgressBanner.action */ "./build.definitions/MDKApp/Actions/Application/AppUpdateProgressBanner.action")
	let mdkapp_actions_application_appupdatesuccessmessage_action = __webpack_require__(/*! ./MDKApp/Actions/Application/AppUpdateSuccessMessage.action */ "./build.definitions/MDKApp/Actions/Application/AppUpdateSuccessMessage.action")
	let mdkapp_actions_application_logout_action = __webpack_require__(/*! ./MDKApp/Actions/Application/Logout.action */ "./build.definitions/MDKApp/Actions/Application/Logout.action")
	let mdkapp_actions_application_navtoabout_action = __webpack_require__(/*! ./MDKApp/Actions/Application/NavToAbout.action */ "./build.definitions/MDKApp/Actions/Application/NavToAbout.action")
	let mdkapp_actions_application_navtoactivitylog_action = __webpack_require__(/*! ./MDKApp/Actions/Application/NavToActivityLog.action */ "./build.definitions/MDKApp/Actions/Application/NavToActivityLog.action")
	let mdkapp_actions_application_navtosupport_action = __webpack_require__(/*! ./MDKApp/Actions/Application/NavToSupport.action */ "./build.definitions/MDKApp/Actions/Application/NavToSupport.action")
	let mdkapp_actions_application_onwillupdate_action = __webpack_require__(/*! ./MDKApp/Actions/Application/OnWillUpdate.action */ "./build.definitions/MDKApp/Actions/Application/OnWillUpdate.action")
	let mdkapp_actions_application_reset_action = __webpack_require__(/*! ./MDKApp/Actions/Application/Reset.action */ "./build.definitions/MDKApp/Actions/Application/Reset.action")
	let mdkapp_actions_application_resetmessage_action = __webpack_require__(/*! ./MDKApp/Actions/Application/ResetMessage.action */ "./build.definitions/MDKApp/Actions/Application/ResetMessage.action")
	let mdkapp_actions_application_usermenupopover_action = __webpack_require__(/*! ./MDKApp/Actions/Application/UserMenuPopover.action */ "./build.definitions/MDKApp/Actions/Application/UserMenuPopover.action")
	let mdkapp_actions_closemodalpage_cancel_action = __webpack_require__(/*! ./MDKApp/Actions/CloseModalPage_Cancel.action */ "./build.definitions/MDKApp/Actions/CloseModalPage_Cancel.action")
	let mdkapp_actions_closemodalpage_complete_action = __webpack_require__(/*! ./MDKApp/Actions/CloseModalPage_Complete.action */ "./build.definitions/MDKApp/Actions/CloseModalPage_Complete.action")
	let mdkapp_actions_closepage_action = __webpack_require__(/*! ./MDKApp/Actions/ClosePage.action */ "./build.definitions/MDKApp/Actions/ClosePage.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v2_service_closeoffline_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/CloseOffline.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/CloseOffline.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v2_service_closeofflinefailuremessage_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/CloseOfflineFailureMessage.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/CloseOfflineFailureMessage.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v2_service_closeofflinesuccessmessage_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/CloseOfflineSuccessMessage.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/CloseOfflineSuccessMessage.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v2_service_downloadoffline_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/DownloadOffline.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/DownloadOffline.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v2_service_downloadstartedmessage_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/DownloadStartedMessage.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/DownloadStartedMessage.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v2_service_initializeoffline_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/InitializeOffline.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/InitializeOffline.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v2_service_initializeofflinefailuremessage_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/InitializeOfflineFailureMessage.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/InitializeOfflineFailureMessage.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v2_service_syncfailuremessage_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/SyncFailureMessage.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/SyncFailureMessage.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v2_service_syncstartedmessage_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/SyncStartedMessage.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/SyncStartedMessage.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v2_service_uploadoffline_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/UploadOffline.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/UploadOffline.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_customers_customers_createentity_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/Customers_CreateEntity.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/Customers_CreateEntity.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_customers_customers_createsalesorderheader_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/Customers_CreateSalesOrderHeader.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/Customers_CreateSalesOrderHeader.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_customers_customers_deleteentity_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/Customers_DeleteEntity.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/Customers_DeleteEntity.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_customers_customers_detailpopover_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/Customers_DetailPopover.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/Customers_DetailPopover.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_customers_customers_updateentity_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/Customers_UpdateEntity.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/Customers_UpdateEntity.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_customers_navtocustomers_create_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/NavToCustomers_Create.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/NavToCustomers_Create.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_customers_navtocustomers_createsalesorderheader_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/NavToCustomers_CreateSalesOrderHeader.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/NavToCustomers_CreateSalesOrderHeader.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_customers_navtocustomers_detail_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/NavToCustomers_Detail.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/NavToCustomers_Detail.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_customers_navtocustomers_edit_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/NavToCustomers_Edit.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/NavToCustomers_Edit.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_customers_navtocustomers_list_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/NavToCustomers_List.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/NavToCustomers_List.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_products_navtoproducts_create_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/NavToProducts_Create.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/NavToProducts_Create.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_products_navtoproducts_createpurchaseorderitem_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/NavToProducts_CreatePurchaseOrderItem.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/NavToProducts_CreatePurchaseOrderItem.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_products_navtoproducts_createsalesorderitem_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/NavToProducts_CreateSalesOrderItem.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/NavToProducts_CreateSalesOrderItem.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_products_navtoproducts_detail_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/NavToProducts_Detail.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/NavToProducts_Detail.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_products_navtoproducts_edit_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/NavToProducts_Edit.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/NavToProducts_Edit.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_products_navtoproducts_list_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/NavToProducts_List.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/NavToProducts_List.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_products_products_createentity_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/Products_CreateEntity.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/Products_CreateEntity.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_products_products_createpurchaseorderitem_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/Products_CreatePurchaseOrderItem.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/Products_CreatePurchaseOrderItem.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_products_products_createsalesorderitem_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/Products_CreateSalesOrderItem.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/Products_CreateSalesOrderItem.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_products_products_deleteentity_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/Products_DeleteEntity.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/Products_DeleteEntity.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_products_products_detailpopover_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/Products_DetailPopover.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/Products_DetailPopover.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_products_products_opendocument_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/Products_OpenDocument.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/Products_OpenDocument.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_products_products_updateentity_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/Products_UpdateEntity.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/Products_UpdateEntity.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_products_products_uploadstream_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/Products_UploadStream.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/Products_UploadStream.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderheaders_navtopurchaseorderheaders_create_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Create.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Create.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderheaders_navtopurchaseorderheaders_createpurchaseorderitem_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_CreatePurchaseOrderItem.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_CreatePurchaseOrderItem.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderheaders_navtopurchaseorderheaders_detail_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Detail.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Detail.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderheaders_navtopurchaseorderheaders_edit_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Edit.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Edit.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderheaders_navtopurchaseorderheaders_list_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_List.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_List.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderheaders_purchaseorderheaders_createentity_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/PurchaseOrderHeaders_CreateEntity.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/PurchaseOrderHeaders_CreateEntity.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderheaders_purchaseorderheaders_createpurchaseorderitem_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/PurchaseOrderHeaders_CreatePurchaseOrderItem.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/PurchaseOrderHeaders_CreatePurchaseOrderItem.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderheaders_purchaseorderheaders_deleteentity_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/PurchaseOrderHeaders_DeleteEntity.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/PurchaseOrderHeaders_DeleteEntity.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderheaders_purchaseorderheaders_detailpopover_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/PurchaseOrderHeaders_DetailPopover.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/PurchaseOrderHeaders_DetailPopover.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderheaders_purchaseorderheaders_updateentity_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/PurchaseOrderHeaders_UpdateEntity.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/PurchaseOrderHeaders_UpdateEntity.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderitems_navtopurchaseorderitems_create_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderItems/NavToPurchaseOrderItems_Create.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderItems/NavToPurchaseOrderItems_Create.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderitems_navtopurchaseorderitems_detail_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderitems_navtopurchaseorderitems_edit_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderItems/NavToPurchaseOrderItems_Edit.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderItems/NavToPurchaseOrderItems_Edit.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderitems_navtopurchaseorderitems_list_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderItems/NavToPurchaseOrderItems_List.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderItems/NavToPurchaseOrderItems_List.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderitems_purchaseorderitems_createentity_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderItems/PurchaseOrderItems_CreateEntity.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderItems/PurchaseOrderItems_CreateEntity.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderitems_purchaseorderitems_deleteentity_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderItems/PurchaseOrderItems_DeleteEntity.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderItems/PurchaseOrderItems_DeleteEntity.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderitems_purchaseorderitems_updateentity_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderItems/PurchaseOrderItems_UpdateEntity.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderItems/PurchaseOrderItems_UpdateEntity.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderheaders_navtosalesorderheaders_create_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/NavToSalesOrderHeaders_Create.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/NavToSalesOrderHeaders_Create.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderheaders_navtosalesorderheaders_createsalesorderitem_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/NavToSalesOrderHeaders_CreateSalesOrderItem.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/NavToSalesOrderHeaders_CreateSalesOrderItem.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderheaders_navtosalesorderheaders_detail_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderheaders_navtosalesorderheaders_edit_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/NavToSalesOrderHeaders_Edit.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/NavToSalesOrderHeaders_Edit.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderheaders_navtosalesorderheaders_list_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/NavToSalesOrderHeaders_List.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/NavToSalesOrderHeaders_List.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderheaders_salesorderheaders_createentity_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/SalesOrderHeaders_CreateEntity.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/SalesOrderHeaders_CreateEntity.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderheaders_salesorderheaders_createsalesorderitem_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/SalesOrderHeaders_CreateSalesOrderItem.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/SalesOrderHeaders_CreateSalesOrderItem.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderheaders_salesorderheaders_deleteentity_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/SalesOrderHeaders_DeleteEntity.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/SalesOrderHeaders_DeleteEntity.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderheaders_salesorderheaders_detailpopover_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/SalesOrderHeaders_DetailPopover.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/SalesOrderHeaders_DetailPopover.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderheaders_salesorderheaders_updateentity_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/SalesOrderHeaders_UpdateEntity.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/SalesOrderHeaders_UpdateEntity.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderitems_navtosalesorderitems_create_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderItems/NavToSalesOrderItems_Create.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderItems/NavToSalesOrderItems_Create.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderitems_navtosalesorderitems_detail_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderItems/NavToSalesOrderItems_Detail.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderItems/NavToSalesOrderItems_Detail.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderitems_navtosalesorderitems_edit_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderItems/NavToSalesOrderItems_Edit.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderItems/NavToSalesOrderItems_Edit.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderitems_navtosalesorderitems_list_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderItems/NavToSalesOrderItems_List.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderItems/NavToSalesOrderItems_List.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderitems_salesorderitems_createentity_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderItems/SalesOrderItems_CreateEntity.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderItems/SalesOrderItems_CreateEntity.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderitems_salesorderitems_deleteentity_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderItems/SalesOrderItems_DeleteEntity.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderItems/SalesOrderItems_DeleteEntity.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderitems_salesorderitems_updateentity_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderItems/SalesOrderItems_UpdateEntity.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderItems/SalesOrderItems_UpdateEntity.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_service_closeoffline_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/CloseOffline.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/CloseOffline.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_service_closeofflinefailuremessage_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/CloseOfflineFailureMessage.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/CloseOfflineFailureMessage.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_service_closeofflinesuccessmessage_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/CloseOfflineSuccessMessage.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/CloseOfflineSuccessMessage.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_service_downloadoffline_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/DownloadOffline.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/DownloadOffline.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_service_downloadstartedmessage_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/DownloadStartedMessage.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/DownloadStartedMessage.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_service_initializeoffline_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/InitializeOffline.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/InitializeOffline.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_service_initializeofflinefailuremessage_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/InitializeOfflineFailureMessage.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/InitializeOfflineFailureMessage.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_service_syncfailuremessage_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/SyncFailureMessage.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/SyncFailureMessage.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_service_syncstartedmessage_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/SyncStartedMessage.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/SyncStartedMessage.action")
	let mdkapp_actions_com_sap_edm_sampleservice_v4_service_uploadoffline_action = __webpack_require__(/*! ./MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/UploadOffline.action */ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/UploadOffline.action")
	let mdkapp_actions_createentityfailuremessage_action = __webpack_require__(/*! ./MDKApp/Actions/CreateEntityFailureMessage.action */ "./build.definitions/MDKApp/Actions/CreateEntityFailureMessage.action")
	let mdkapp_actions_createentitysuccessmessage_action = __webpack_require__(/*! ./MDKApp/Actions/CreateEntitySuccessMessage.action */ "./build.definitions/MDKApp/Actions/CreateEntitySuccessMessage.action")
	let mdkapp_actions_deleteconfirmation_action = __webpack_require__(/*! ./MDKApp/Actions/DeleteConfirmation.action */ "./build.definitions/MDKApp/Actions/DeleteConfirmation.action")
	let mdkapp_actions_deleteentityfailuremessage_action = __webpack_require__(/*! ./MDKApp/Actions/DeleteEntityFailureMessage.action */ "./build.definitions/MDKApp/Actions/DeleteEntityFailureMessage.action")
	let mdkapp_actions_deleteentitysuccessmessage_action = __webpack_require__(/*! ./MDKApp/Actions/DeleteEntitySuccessMessage.action */ "./build.definitions/MDKApp/Actions/DeleteEntitySuccessMessage.action")
	let mdkapp_actions_errorarchive_errorarchive_syncfailure_action = __webpack_require__(/*! ./MDKApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action */ "./build.definitions/MDKApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action")
	let mdkapp_actions_errorarchive_navtoerrorarchive_detail_action = __webpack_require__(/*! ./MDKApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action */ "./build.definitions/MDKApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action")
	let mdkapp_actions_errorarchive_navtoerrorarchive_list_action = __webpack_require__(/*! ./MDKApp/Actions/ErrorArchive/NavToErrorArchive_List.action */ "./build.definitions/MDKApp/Actions/ErrorArchive/NavToErrorArchive_List.action")
	let mdkapp_actions_genericbannermessage_action = __webpack_require__(/*! ./MDKApp/Actions/GenericBannerMessage.action */ "./build.definitions/MDKApp/Actions/GenericBannerMessage.action")
	let mdkapp_actions_genericmessagebox_action = __webpack_require__(/*! ./MDKApp/Actions/GenericMessageBox.action */ "./build.definitions/MDKApp/Actions/GenericMessageBox.action")
	let mdkapp_actions_genericnavigation_action = __webpack_require__(/*! ./MDKApp/Actions/GenericNavigation.action */ "./build.definitions/MDKApp/Actions/GenericNavigation.action")
	let mdkapp_actions_generictoastmessage_action = __webpack_require__(/*! ./MDKApp/Actions/GenericToastMessage.action */ "./build.definitions/MDKApp/Actions/GenericToastMessage.action")
	let mdkapp_actions_logging_loguploadfailure_action = __webpack_require__(/*! ./MDKApp/Actions/Logging/LogUploadFailure.action */ "./build.definitions/MDKApp/Actions/Logging/LogUploadFailure.action")
	let mdkapp_actions_logging_loguploadsuccessful_action = __webpack_require__(/*! ./MDKApp/Actions/Logging/LogUploadSuccessful.action */ "./build.definitions/MDKApp/Actions/Logging/LogUploadSuccessful.action")
	let mdkapp_actions_logging_uploadlog_action = __webpack_require__(/*! ./MDKApp/Actions/Logging/UploadLog.action */ "./build.definitions/MDKApp/Actions/Logging/UploadLog.action")
	let mdkapp_actions_logging_uploadlogprogress_action = __webpack_require__(/*! ./MDKApp/Actions/Logging/UploadLogProgress.action */ "./build.definitions/MDKApp/Actions/Logging/UploadLogProgress.action")
	let mdkapp_actions_updateentityfailuremessage_action = __webpack_require__(/*! ./MDKApp/Actions/UpdateEntityFailureMessage.action */ "./build.definitions/MDKApp/Actions/UpdateEntityFailureMessage.action")
	let mdkapp_actions_updateentitysuccessmessage_action = __webpack_require__(/*! ./MDKApp/Actions/UpdateEntitySuccessMessage.action */ "./build.definitions/MDKApp/Actions/UpdateEntitySuccessMessage.action")
	let mdkapp_actions_uploadstreamfailuremessage_action = __webpack_require__(/*! ./MDKApp/Actions/UploadStreamFailureMessage.action */ "./build.definitions/MDKApp/Actions/UploadStreamFailureMessage.action")
	let mdkapp_actions_uploadstreamsuccessmessage_action = __webpack_require__(/*! ./MDKApp/Actions/UploadStreamSuccessMessage.action */ "./build.definitions/MDKApp/Actions/UploadStreamSuccessMessage.action")
	let mdkapp_globals_application_appdefinition_version_global = __webpack_require__(/*! ./MDKApp/Globals/Application/AppDefinition_Version.global */ "./build.definitions/MDKApp/Globals/Application/AppDefinition_Version.global")
	let mdkapp_globals_application_applicationname_global = __webpack_require__(/*! ./MDKApp/Globals/Application/ApplicationName.global */ "./build.definitions/MDKApp/Globals/Application/ApplicationName.global")
	let mdkapp_globals_application_supportemail_global = __webpack_require__(/*! ./MDKApp/Globals/Application/SupportEmail.global */ "./build.definitions/MDKApp/Globals/Application/SupportEmail.global")
	let mdkapp_globals_application_supportphone_global = __webpack_require__(/*! ./MDKApp/Globals/Application/SupportPhone.global */ "./build.definitions/MDKApp/Globals/Application/SupportPhone.global")
	let mdkapp_i18n_i18n_properties = __webpack_require__(/*! ./MDKApp/i18n/i18n.properties */ "./build.definitions/MDKApp/i18n/i18n.properties")
	let mdkapp_jsconfig_json = __webpack_require__(/*! ./MDKApp/jsconfig.json */ "./build.definitions/MDKApp/jsconfig.json")
	let mdkapp_pages_application_about_page = __webpack_require__(/*! ./MDKApp/Pages/Application/About.page */ "./build.definitions/MDKApp/Pages/Application/About.page")
	let mdkapp_pages_application_support_page = __webpack_require__(/*! ./MDKApp/Pages/Application/Support.page */ "./build.definitions/MDKApp/Pages/Application/Support.page")
	let mdkapp_pages_application_useractivitylog_page = __webpack_require__(/*! ./MDKApp/Pages/Application/UserActivityLog.page */ "./build.definitions/MDKApp/Pages/Application/UserActivityLog.page")
	let mdkapp_pages_com_sap_edm_sampleservice_v4_customers_customers_create_page = __webpack_require__(/*! ./MDKApp/Pages/com_sap_edm_sampleservice_v4_Customers/Customers_Create.page */ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_Customers/Customers_Create.page")
	let mdkapp_pages_com_sap_edm_sampleservice_v4_customers_customers_createsalesorderheader_page = __webpack_require__(/*! ./MDKApp/Pages/com_sap_edm_sampleservice_v4_Customers/Customers_CreateSalesOrderHeader.page */ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_Customers/Customers_CreateSalesOrderHeader.page")
	let mdkapp_pages_com_sap_edm_sampleservice_v4_customers_customers_detail_page = __webpack_require__(/*! ./MDKApp/Pages/com_sap_edm_sampleservice_v4_Customers/Customers_Detail.page */ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_Customers/Customers_Detail.page")
	let mdkapp_pages_com_sap_edm_sampleservice_v4_customers_customers_edit_page = __webpack_require__(/*! ./MDKApp/Pages/com_sap_edm_sampleservice_v4_Customers/Customers_Edit.page */ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_Customers/Customers_Edit.page")
	let mdkapp_pages_com_sap_edm_sampleservice_v4_customers_customers_list_page = __webpack_require__(/*! ./MDKApp/Pages/com_sap_edm_sampleservice_v4_Customers/Customers_List.page */ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_Customers/Customers_List.page")
	let mdkapp_pages_com_sap_edm_sampleservice_v4_products_products_create_page = __webpack_require__(/*! ./MDKApp/Pages/com_sap_edm_sampleservice_v4_Products/Products_Create.page */ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_Products/Products_Create.page")
	let mdkapp_pages_com_sap_edm_sampleservice_v4_products_products_createpurchaseorderitem_page = __webpack_require__(/*! ./MDKApp/Pages/com_sap_edm_sampleservice_v4_Products/Products_CreatePurchaseOrderItem.page */ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_Products/Products_CreatePurchaseOrderItem.page")
	let mdkapp_pages_com_sap_edm_sampleservice_v4_products_products_createsalesorderitem_page = __webpack_require__(/*! ./MDKApp/Pages/com_sap_edm_sampleservice_v4_Products/Products_CreateSalesOrderItem.page */ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_Products/Products_CreateSalesOrderItem.page")
	let mdkapp_pages_com_sap_edm_sampleservice_v4_products_products_detail_page = __webpack_require__(/*! ./MDKApp/Pages/com_sap_edm_sampleservice_v4_Products/Products_Detail.page */ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_Products/Products_Detail.page")
	let mdkapp_pages_com_sap_edm_sampleservice_v4_products_products_edit_page = __webpack_require__(/*! ./MDKApp/Pages/com_sap_edm_sampleservice_v4_Products/Products_Edit.page */ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_Products/Products_Edit.page")
	let mdkapp_pages_com_sap_edm_sampleservice_v4_products_products_list_page = __webpack_require__(/*! ./MDKApp/Pages/com_sap_edm_sampleservice_v4_Products/Products_List.page */ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_Products/Products_List.page")
	let mdkapp_pages_com_sap_edm_sampleservice_v4_purchaseorderheaders_purchaseorderheaders_create_page = __webpack_require__(/*! ./MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderHeaders/PurchaseOrderHeaders_Create.page */ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderHeaders/PurchaseOrderHeaders_Create.page")
	let mdkapp_pages_com_sap_edm_sampleservice_v4_purchaseorderheaders_purchaseorderheaders_createpurchaseorderitem_page = __webpack_require__(/*! ./MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderHeaders/PurchaseOrderHeaders_CreatePurchaseOrderItem.page */ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderHeaders/PurchaseOrderHeaders_CreatePurchaseOrderItem.page")
	let mdkapp_pages_com_sap_edm_sampleservice_v4_purchaseorderheaders_purchaseorderheaders_detail_page = __webpack_require__(/*! ./MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderHeaders/PurchaseOrderHeaders_Detail.page */ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderHeaders/PurchaseOrderHeaders_Detail.page")
	let mdkapp_pages_com_sap_edm_sampleservice_v4_purchaseorderheaders_purchaseorderheaders_edit_page = __webpack_require__(/*! ./MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderHeaders/PurchaseOrderHeaders_Edit.page */ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderHeaders/PurchaseOrderHeaders_Edit.page")
	let mdkapp_pages_com_sap_edm_sampleservice_v4_purchaseorderheaders_purchaseorderheaders_list_page = __webpack_require__(/*! ./MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderHeaders/PurchaseOrderHeaders_List.page */ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderHeaders/PurchaseOrderHeaders_List.page")
	let mdkapp_pages_com_sap_edm_sampleservice_v4_purchaseorderitems_purchaseorderitems_create_page = __webpack_require__(/*! ./MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderItems/PurchaseOrderItems_Create.page */ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderItems/PurchaseOrderItems_Create.page")
	let mdkapp_pages_com_sap_edm_sampleservice_v4_purchaseorderitems_purchaseorderitems_detail_page = __webpack_require__(/*! ./MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderItems/PurchaseOrderItems_Detail.page */ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderItems/PurchaseOrderItems_Detail.page")
	let mdkapp_pages_com_sap_edm_sampleservice_v4_purchaseorderitems_purchaseorderitems_edit_page = __webpack_require__(/*! ./MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderItems/PurchaseOrderItems_Edit.page */ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderItems/PurchaseOrderItems_Edit.page")
	let mdkapp_pages_com_sap_edm_sampleservice_v4_purchaseorderitems_purchaseorderitems_list_page = __webpack_require__(/*! ./MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderItems/PurchaseOrderItems_List.page */ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderItems/PurchaseOrderItems_List.page")
	let mdkapp_pages_com_sap_edm_sampleservice_v4_salesorderheaders_salesorderheaders_create_page = __webpack_require__(/*! ./MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderHeaders/SalesOrderHeaders_Create.page */ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderHeaders/SalesOrderHeaders_Create.page")
	let mdkapp_pages_com_sap_edm_sampleservice_v4_salesorderheaders_salesorderheaders_createsalesorderitem_page = __webpack_require__(/*! ./MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderHeaders/SalesOrderHeaders_CreateSalesOrderItem.page */ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderHeaders/SalesOrderHeaders_CreateSalesOrderItem.page")
	let mdkapp_pages_com_sap_edm_sampleservice_v4_salesorderheaders_salesorderheaders_detail_page = __webpack_require__(/*! ./MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderHeaders/SalesOrderHeaders_Detail.page */ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderHeaders/SalesOrderHeaders_Detail.page")
	let mdkapp_pages_com_sap_edm_sampleservice_v4_salesorderheaders_salesorderheaders_edit_page = __webpack_require__(/*! ./MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderHeaders/SalesOrderHeaders_Edit.page */ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderHeaders/SalesOrderHeaders_Edit.page")
	let mdkapp_pages_com_sap_edm_sampleservice_v4_salesorderheaders_salesorderheaders_list_page = __webpack_require__(/*! ./MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderHeaders/SalesOrderHeaders_List.page */ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderHeaders/SalesOrderHeaders_List.page")
	let mdkapp_pages_com_sap_edm_sampleservice_v4_salesorderitems_salesorderitems_create_page = __webpack_require__(/*! ./MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderItems/SalesOrderItems_Create.page */ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderItems/SalesOrderItems_Create.page")
	let mdkapp_pages_com_sap_edm_sampleservice_v4_salesorderitems_salesorderitems_detail_page = __webpack_require__(/*! ./MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderItems/SalesOrderItems_Detail.page */ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderItems/SalesOrderItems_Detail.page")
	let mdkapp_pages_com_sap_edm_sampleservice_v4_salesorderitems_salesorderitems_edit_page = __webpack_require__(/*! ./MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderItems/SalesOrderItems_Edit.page */ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderItems/SalesOrderItems_Edit.page")
	let mdkapp_pages_com_sap_edm_sampleservice_v4_salesorderitems_salesorderitems_list_page = __webpack_require__(/*! ./MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderItems/SalesOrderItems_List.page */ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderItems/SalesOrderItems_List.page")
	let mdkapp_pages_errorarchive_errorarchive_detail_page = __webpack_require__(/*! ./MDKApp/Pages/ErrorArchive/ErrorArchive_Detail.page */ "./build.definitions/MDKApp/Pages/ErrorArchive/ErrorArchive_Detail.page")
	let mdkapp_pages_errorarchive_errorarchive_list_page = __webpack_require__(/*! ./MDKApp/Pages/ErrorArchive/ErrorArchive_List.page */ "./build.definitions/MDKApp/Pages/ErrorArchive/ErrorArchive_List.page")
	let mdkapp_pages_main_page = __webpack_require__(/*! ./MDKApp/Pages/Main.page */ "./build.definitions/MDKApp/Pages/Main.page")
	let mdkapp_rules_application_appupdatefailure_js = __webpack_require__(/*! ./MDKApp/Rules/Application/AppUpdateFailure.js */ "./build.definitions/MDKApp/Rules/Application/AppUpdateFailure.js")
	let mdkapp_rules_application_appupdatesuccess_js = __webpack_require__(/*! ./MDKApp/Rules/Application/AppUpdateSuccess.js */ "./build.definitions/MDKApp/Rules/Application/AppUpdateSuccess.js")
	let mdkapp_rules_application_clientismultiusermode_js = __webpack_require__(/*! ./MDKApp/Rules/Application/ClientIsMultiUserMode.js */ "./build.definitions/MDKApp/Rules/Application/ClientIsMultiUserMode.js")
	let mdkapp_rules_application_getclientsupportversions_js = __webpack_require__(/*! ./MDKApp/Rules/Application/GetClientSupportVersions.js */ "./build.definitions/MDKApp/Rules/Application/GetClientSupportVersions.js")
	let mdkapp_rules_application_getclientversion_js = __webpack_require__(/*! ./MDKApp/Rules/Application/GetClientVersion.js */ "./build.definitions/MDKApp/Rules/Application/GetClientVersion.js")
	let mdkapp_rules_application_onwillupdate_js = __webpack_require__(/*! ./MDKApp/Rules/Application/OnWillUpdate.js */ "./build.definitions/MDKApp/Rules/Application/OnWillUpdate.js")
	let mdkapp_rules_application_resetappsettingsandlogout_js = __webpack_require__(/*! ./MDKApp/Rules/Application/ResetAppSettingsAndLogout.js */ "./build.definitions/MDKApp/Rules/Application/ResetAppSettingsAndLogout.js")
	let mdkapp_rules_com_sap_edm_sampleservice_v2_errorarchive_checkforsyncerror_js = __webpack_require__(/*! ./MDKApp/Rules/com_sap_edm_sampleservice_v2/ErrorArchive_CheckForSyncError.js */ "./build.definitions/MDKApp/Rules/com_sap_edm_sampleservice_v2/ErrorArchive_CheckForSyncError.js")
	let mdkapp_rules_com_sap_edm_sampleservice_v4_customers_customers_deleteconfirmation_js = __webpack_require__(/*! ./MDKApp/Rules/com_sap_edm_sampleservice_v4/Customers/Customers_DeleteConfirmation.js */ "./build.definitions/MDKApp/Rules/com_sap_edm_sampleservice_v4/Customers/Customers_DeleteConfirmation.js")
	let mdkapp_rules_com_sap_edm_sampleservice_v4_errorarchive_checkforsyncerror_js = __webpack_require__(/*! ./MDKApp/Rules/com_sap_edm_sampleservice_v4/ErrorArchive_CheckForSyncError.js */ "./build.definitions/MDKApp/Rules/com_sap_edm_sampleservice_v4/ErrorArchive_CheckForSyncError.js")
	let mdkapp_rules_com_sap_edm_sampleservice_v4_products_products_createentity_js = __webpack_require__(/*! ./MDKApp/Rules/com_sap_edm_sampleservice_v4/Products/Products_CreateEntity.js */ "./build.definitions/MDKApp/Rules/com_sap_edm_sampleservice_v4/Products/Products_CreateEntity.js")
	let mdkapp_rules_com_sap_edm_sampleservice_v4_products_products_deleteconfirmation_js = __webpack_require__(/*! ./MDKApp/Rules/com_sap_edm_sampleservice_v4/Products/Products_DeleteConfirmation.js */ "./build.definitions/MDKApp/Rules/com_sap_edm_sampleservice_v4/Products/Products_DeleteConfirmation.js")
	let mdkapp_rules_com_sap_edm_sampleservice_v4_purchaseorderheaders_purchaseorderheaders_deleteconfirmation_js = __webpack_require__(/*! ./MDKApp/Rules/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/PurchaseOrderHeaders_DeleteConfirmation.js */ "./build.definitions/MDKApp/Rules/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/PurchaseOrderHeaders_DeleteConfirmation.js")
	let mdkapp_rules_com_sap_edm_sampleservice_v4_purchaseorderitems_purchaseorderitems_deleteconfirmation_js = __webpack_require__(/*! ./MDKApp/Rules/com_sap_edm_sampleservice_v4/PurchaseOrderItems/PurchaseOrderItems_DeleteConfirmation.js */ "./build.definitions/MDKApp/Rules/com_sap_edm_sampleservice_v4/PurchaseOrderItems/PurchaseOrderItems_DeleteConfirmation.js")
	let mdkapp_rules_com_sap_edm_sampleservice_v4_salesorderheaders_salesorderheaders_deleteconfirmation_js = __webpack_require__(/*! ./MDKApp/Rules/com_sap_edm_sampleservice_v4/SalesOrderHeaders/SalesOrderHeaders_DeleteConfirmation.js */ "./build.definitions/MDKApp/Rules/com_sap_edm_sampleservice_v4/SalesOrderHeaders/SalesOrderHeaders_DeleteConfirmation.js")
	let mdkapp_rules_com_sap_edm_sampleservice_v4_salesorderitems_salesorderitems_deleteconfirmation_js = __webpack_require__(/*! ./MDKApp/Rules/com_sap_edm_sampleservice_v4/SalesOrderItems/SalesOrderItems_DeleteConfirmation.js */ "./build.definitions/MDKApp/Rules/com_sap_edm_sampleservice_v4/SalesOrderItems/SalesOrderItems_DeleteConfirmation.js")
	let mdkapp_rules_logging_loglevels_js = __webpack_require__(/*! ./MDKApp/Rules/Logging/LogLevels.js */ "./build.definitions/MDKApp/Rules/Logging/LogLevels.js")
	let mdkapp_rules_logging_settracecategories_js = __webpack_require__(/*! ./MDKApp/Rules/Logging/SetTraceCategories.js */ "./build.definitions/MDKApp/Rules/Logging/SetTraceCategories.js")
	let mdkapp_rules_logging_setuserloglevel_js = __webpack_require__(/*! ./MDKApp/Rules/Logging/SetUserLogLevel.js */ "./build.definitions/MDKApp/Rules/Logging/SetUserLogLevel.js")
	let mdkapp_rules_logging_togglelogging_js = __webpack_require__(/*! ./MDKApp/Rules/Logging/ToggleLogging.js */ "./build.definitions/MDKApp/Rules/Logging/ToggleLogging.js")
	let mdkapp_rules_logging_tracecategories_js = __webpack_require__(/*! ./MDKApp/Rules/Logging/TraceCategories.js */ "./build.definitions/MDKApp/Rules/Logging/TraceCategories.js")
	let mdkapp_rules_logging_userlogsetting_js = __webpack_require__(/*! ./MDKApp/Rules/Logging/UserLogSetting.js */ "./build.definitions/MDKApp/Rules/Logging/UserLogSetting.js")
	let mdkapp_rules_service_initialize_js = __webpack_require__(/*! ./MDKApp/Rules/Service/Initialize.js */ "./build.definitions/MDKApp/Rules/Service/Initialize.js")
	let mdkapp_services_com_sap_edm_sampleservice_v2_service = __webpack_require__(/*! ./MDKApp/Services/com_sap_edm_sampleservice_v2.service */ "./build.definitions/MDKApp/Services/com_sap_edm_sampleservice_v2.service")
	let mdkapp_services_com_sap_edm_sampleservice_v4_service = __webpack_require__(/*! ./MDKApp/Services/com_sap_edm_sampleservice_v4.service */ "./build.definitions/MDKApp/Services/com_sap_edm_sampleservice_v4.service")
	let mdkapp_styles_styles_css = __webpack_require__(/*! ./MDKApp/Styles/Styles.css */ "./build.definitions/MDKApp/Styles/Styles.css")
	let mdkapp_styles_styles_json = __webpack_require__(/*! ./MDKApp/Styles/Styles.json */ "./build.definitions/MDKApp/Styles/Styles.json")
	let mdkapp_styles_styles_less = __webpack_require__(/*! ./MDKApp/Styles/Styles.less */ "./build.definitions/MDKApp/Styles/Styles.less")
	let mdkapp_styles_styles_nss = __webpack_require__(/*! ./MDKApp/Styles/Styles.nss */ "./build.definitions/MDKApp/Styles/Styles.nss")
	let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
	let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")
	
	module.exports = {
		application_app : application_app,
		mdkapp_actions_application_appupdate_action : mdkapp_actions_application_appupdate_action,
		mdkapp_actions_application_appupdatefailuremessage_action : mdkapp_actions_application_appupdatefailuremessage_action,
		mdkapp_actions_application_appupdateprogressbanner_action : mdkapp_actions_application_appupdateprogressbanner_action,
		mdkapp_actions_application_appupdatesuccessmessage_action : mdkapp_actions_application_appupdatesuccessmessage_action,
		mdkapp_actions_application_logout_action : mdkapp_actions_application_logout_action,
		mdkapp_actions_application_navtoabout_action : mdkapp_actions_application_navtoabout_action,
		mdkapp_actions_application_navtoactivitylog_action : mdkapp_actions_application_navtoactivitylog_action,
		mdkapp_actions_application_navtosupport_action : mdkapp_actions_application_navtosupport_action,
		mdkapp_actions_application_onwillupdate_action : mdkapp_actions_application_onwillupdate_action,
		mdkapp_actions_application_reset_action : mdkapp_actions_application_reset_action,
		mdkapp_actions_application_resetmessage_action : mdkapp_actions_application_resetmessage_action,
		mdkapp_actions_application_usermenupopover_action : mdkapp_actions_application_usermenupopover_action,
		mdkapp_actions_closemodalpage_cancel_action : mdkapp_actions_closemodalpage_cancel_action,
		mdkapp_actions_closemodalpage_complete_action : mdkapp_actions_closemodalpage_complete_action,
		mdkapp_actions_closepage_action : mdkapp_actions_closepage_action,
		mdkapp_actions_com_sap_edm_sampleservice_v2_service_closeoffline_action : mdkapp_actions_com_sap_edm_sampleservice_v2_service_closeoffline_action,
		mdkapp_actions_com_sap_edm_sampleservice_v2_service_closeofflinefailuremessage_action : mdkapp_actions_com_sap_edm_sampleservice_v2_service_closeofflinefailuremessage_action,
		mdkapp_actions_com_sap_edm_sampleservice_v2_service_closeofflinesuccessmessage_action : mdkapp_actions_com_sap_edm_sampleservice_v2_service_closeofflinesuccessmessage_action,
		mdkapp_actions_com_sap_edm_sampleservice_v2_service_downloadoffline_action : mdkapp_actions_com_sap_edm_sampleservice_v2_service_downloadoffline_action,
		mdkapp_actions_com_sap_edm_sampleservice_v2_service_downloadstartedmessage_action : mdkapp_actions_com_sap_edm_sampleservice_v2_service_downloadstartedmessage_action,
		mdkapp_actions_com_sap_edm_sampleservice_v2_service_initializeoffline_action : mdkapp_actions_com_sap_edm_sampleservice_v2_service_initializeoffline_action,
		mdkapp_actions_com_sap_edm_sampleservice_v2_service_initializeofflinefailuremessage_action : mdkapp_actions_com_sap_edm_sampleservice_v2_service_initializeofflinefailuremessage_action,
		mdkapp_actions_com_sap_edm_sampleservice_v2_service_syncfailuremessage_action : mdkapp_actions_com_sap_edm_sampleservice_v2_service_syncfailuremessage_action,
		mdkapp_actions_com_sap_edm_sampleservice_v2_service_syncstartedmessage_action : mdkapp_actions_com_sap_edm_sampleservice_v2_service_syncstartedmessage_action,
		mdkapp_actions_com_sap_edm_sampleservice_v2_service_uploadoffline_action : mdkapp_actions_com_sap_edm_sampleservice_v2_service_uploadoffline_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_customers_customers_createentity_action : mdkapp_actions_com_sap_edm_sampleservice_v4_customers_customers_createentity_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_customers_customers_createsalesorderheader_action : mdkapp_actions_com_sap_edm_sampleservice_v4_customers_customers_createsalesorderheader_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_customers_customers_deleteentity_action : mdkapp_actions_com_sap_edm_sampleservice_v4_customers_customers_deleteentity_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_customers_customers_detailpopover_action : mdkapp_actions_com_sap_edm_sampleservice_v4_customers_customers_detailpopover_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_customers_customers_updateentity_action : mdkapp_actions_com_sap_edm_sampleservice_v4_customers_customers_updateentity_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_customers_navtocustomers_create_action : mdkapp_actions_com_sap_edm_sampleservice_v4_customers_navtocustomers_create_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_customers_navtocustomers_createsalesorderheader_action : mdkapp_actions_com_sap_edm_sampleservice_v4_customers_navtocustomers_createsalesorderheader_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_customers_navtocustomers_detail_action : mdkapp_actions_com_sap_edm_sampleservice_v4_customers_navtocustomers_detail_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_customers_navtocustomers_edit_action : mdkapp_actions_com_sap_edm_sampleservice_v4_customers_navtocustomers_edit_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_customers_navtocustomers_list_action : mdkapp_actions_com_sap_edm_sampleservice_v4_customers_navtocustomers_list_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_products_navtoproducts_create_action : mdkapp_actions_com_sap_edm_sampleservice_v4_products_navtoproducts_create_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_products_navtoproducts_createpurchaseorderitem_action : mdkapp_actions_com_sap_edm_sampleservice_v4_products_navtoproducts_createpurchaseorderitem_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_products_navtoproducts_createsalesorderitem_action : mdkapp_actions_com_sap_edm_sampleservice_v4_products_navtoproducts_createsalesorderitem_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_products_navtoproducts_detail_action : mdkapp_actions_com_sap_edm_sampleservice_v4_products_navtoproducts_detail_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_products_navtoproducts_edit_action : mdkapp_actions_com_sap_edm_sampleservice_v4_products_navtoproducts_edit_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_products_navtoproducts_list_action : mdkapp_actions_com_sap_edm_sampleservice_v4_products_navtoproducts_list_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_products_products_createentity_action : mdkapp_actions_com_sap_edm_sampleservice_v4_products_products_createentity_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_products_products_createpurchaseorderitem_action : mdkapp_actions_com_sap_edm_sampleservice_v4_products_products_createpurchaseorderitem_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_products_products_createsalesorderitem_action : mdkapp_actions_com_sap_edm_sampleservice_v4_products_products_createsalesorderitem_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_products_products_deleteentity_action : mdkapp_actions_com_sap_edm_sampleservice_v4_products_products_deleteentity_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_products_products_detailpopover_action : mdkapp_actions_com_sap_edm_sampleservice_v4_products_products_detailpopover_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_products_products_opendocument_action : mdkapp_actions_com_sap_edm_sampleservice_v4_products_products_opendocument_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_products_products_updateentity_action : mdkapp_actions_com_sap_edm_sampleservice_v4_products_products_updateentity_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_products_products_uploadstream_action : mdkapp_actions_com_sap_edm_sampleservice_v4_products_products_uploadstream_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderheaders_navtopurchaseorderheaders_create_action : mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderheaders_navtopurchaseorderheaders_create_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderheaders_navtopurchaseorderheaders_createpurchaseorderitem_action : mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderheaders_navtopurchaseorderheaders_createpurchaseorderitem_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderheaders_navtopurchaseorderheaders_detail_action : mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderheaders_navtopurchaseorderheaders_detail_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderheaders_navtopurchaseorderheaders_edit_action : mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderheaders_navtopurchaseorderheaders_edit_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderheaders_navtopurchaseorderheaders_list_action : mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderheaders_navtopurchaseorderheaders_list_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderheaders_purchaseorderheaders_createentity_action : mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderheaders_purchaseorderheaders_createentity_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderheaders_purchaseorderheaders_createpurchaseorderitem_action : mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderheaders_purchaseorderheaders_createpurchaseorderitem_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderheaders_purchaseorderheaders_deleteentity_action : mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderheaders_purchaseorderheaders_deleteentity_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderheaders_purchaseorderheaders_detailpopover_action : mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderheaders_purchaseorderheaders_detailpopover_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderheaders_purchaseorderheaders_updateentity_action : mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderheaders_purchaseorderheaders_updateentity_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderitems_navtopurchaseorderitems_create_action : mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderitems_navtopurchaseorderitems_create_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderitems_navtopurchaseorderitems_detail_action : mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderitems_navtopurchaseorderitems_detail_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderitems_navtopurchaseorderitems_edit_action : mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderitems_navtopurchaseorderitems_edit_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderitems_navtopurchaseorderitems_list_action : mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderitems_navtopurchaseorderitems_list_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderitems_purchaseorderitems_createentity_action : mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderitems_purchaseorderitems_createentity_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderitems_purchaseorderitems_deleteentity_action : mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderitems_purchaseorderitems_deleteentity_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderitems_purchaseorderitems_updateentity_action : mdkapp_actions_com_sap_edm_sampleservice_v4_purchaseorderitems_purchaseorderitems_updateentity_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderheaders_navtosalesorderheaders_create_action : mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderheaders_navtosalesorderheaders_create_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderheaders_navtosalesorderheaders_createsalesorderitem_action : mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderheaders_navtosalesorderheaders_createsalesorderitem_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderheaders_navtosalesorderheaders_detail_action : mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderheaders_navtosalesorderheaders_detail_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderheaders_navtosalesorderheaders_edit_action : mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderheaders_navtosalesorderheaders_edit_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderheaders_navtosalesorderheaders_list_action : mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderheaders_navtosalesorderheaders_list_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderheaders_salesorderheaders_createentity_action : mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderheaders_salesorderheaders_createentity_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderheaders_salesorderheaders_createsalesorderitem_action : mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderheaders_salesorderheaders_createsalesorderitem_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderheaders_salesorderheaders_deleteentity_action : mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderheaders_salesorderheaders_deleteentity_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderheaders_salesorderheaders_detailpopover_action : mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderheaders_salesorderheaders_detailpopover_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderheaders_salesorderheaders_updateentity_action : mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderheaders_salesorderheaders_updateentity_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderitems_navtosalesorderitems_create_action : mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderitems_navtosalesorderitems_create_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderitems_navtosalesorderitems_detail_action : mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderitems_navtosalesorderitems_detail_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderitems_navtosalesorderitems_edit_action : mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderitems_navtosalesorderitems_edit_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderitems_navtosalesorderitems_list_action : mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderitems_navtosalesorderitems_list_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderitems_salesorderitems_createentity_action : mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderitems_salesorderitems_createentity_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderitems_salesorderitems_deleteentity_action : mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderitems_salesorderitems_deleteentity_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderitems_salesorderitems_updateentity_action : mdkapp_actions_com_sap_edm_sampleservice_v4_salesorderitems_salesorderitems_updateentity_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_service_closeoffline_action : mdkapp_actions_com_sap_edm_sampleservice_v4_service_closeoffline_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_service_closeofflinefailuremessage_action : mdkapp_actions_com_sap_edm_sampleservice_v4_service_closeofflinefailuremessage_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_service_closeofflinesuccessmessage_action : mdkapp_actions_com_sap_edm_sampleservice_v4_service_closeofflinesuccessmessage_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_service_downloadoffline_action : mdkapp_actions_com_sap_edm_sampleservice_v4_service_downloadoffline_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_service_downloadstartedmessage_action : mdkapp_actions_com_sap_edm_sampleservice_v4_service_downloadstartedmessage_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_service_initializeoffline_action : mdkapp_actions_com_sap_edm_sampleservice_v4_service_initializeoffline_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_service_initializeofflinefailuremessage_action : mdkapp_actions_com_sap_edm_sampleservice_v4_service_initializeofflinefailuremessage_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_service_syncfailuremessage_action : mdkapp_actions_com_sap_edm_sampleservice_v4_service_syncfailuremessage_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_service_syncstartedmessage_action : mdkapp_actions_com_sap_edm_sampleservice_v4_service_syncstartedmessage_action,
		mdkapp_actions_com_sap_edm_sampleservice_v4_service_uploadoffline_action : mdkapp_actions_com_sap_edm_sampleservice_v4_service_uploadoffline_action,
		mdkapp_actions_createentityfailuremessage_action : mdkapp_actions_createentityfailuremessage_action,
		mdkapp_actions_createentitysuccessmessage_action : mdkapp_actions_createentitysuccessmessage_action,
		mdkapp_actions_deleteconfirmation_action : mdkapp_actions_deleteconfirmation_action,
		mdkapp_actions_deleteentityfailuremessage_action : mdkapp_actions_deleteentityfailuremessage_action,
		mdkapp_actions_deleteentitysuccessmessage_action : mdkapp_actions_deleteentitysuccessmessage_action,
		mdkapp_actions_errorarchive_errorarchive_syncfailure_action : mdkapp_actions_errorarchive_errorarchive_syncfailure_action,
		mdkapp_actions_errorarchive_navtoerrorarchive_detail_action : mdkapp_actions_errorarchive_navtoerrorarchive_detail_action,
		mdkapp_actions_errorarchive_navtoerrorarchive_list_action : mdkapp_actions_errorarchive_navtoerrorarchive_list_action,
		mdkapp_actions_genericbannermessage_action : mdkapp_actions_genericbannermessage_action,
		mdkapp_actions_genericmessagebox_action : mdkapp_actions_genericmessagebox_action,
		mdkapp_actions_genericnavigation_action : mdkapp_actions_genericnavigation_action,
		mdkapp_actions_generictoastmessage_action : mdkapp_actions_generictoastmessage_action,
		mdkapp_actions_logging_loguploadfailure_action : mdkapp_actions_logging_loguploadfailure_action,
		mdkapp_actions_logging_loguploadsuccessful_action : mdkapp_actions_logging_loguploadsuccessful_action,
		mdkapp_actions_logging_uploadlog_action : mdkapp_actions_logging_uploadlog_action,
		mdkapp_actions_logging_uploadlogprogress_action : mdkapp_actions_logging_uploadlogprogress_action,
		mdkapp_actions_updateentityfailuremessage_action : mdkapp_actions_updateentityfailuremessage_action,
		mdkapp_actions_updateentitysuccessmessage_action : mdkapp_actions_updateentitysuccessmessage_action,
		mdkapp_actions_uploadstreamfailuremessage_action : mdkapp_actions_uploadstreamfailuremessage_action,
		mdkapp_actions_uploadstreamsuccessmessage_action : mdkapp_actions_uploadstreamsuccessmessage_action,
		mdkapp_globals_application_appdefinition_version_global : mdkapp_globals_application_appdefinition_version_global,
		mdkapp_globals_application_applicationname_global : mdkapp_globals_application_applicationname_global,
		mdkapp_globals_application_supportemail_global : mdkapp_globals_application_supportemail_global,
		mdkapp_globals_application_supportphone_global : mdkapp_globals_application_supportphone_global,
		mdkapp_i18n_i18n_properties : mdkapp_i18n_i18n_properties,
		mdkapp_jsconfig_json : mdkapp_jsconfig_json,
		mdkapp_pages_application_about_page : mdkapp_pages_application_about_page,
		mdkapp_pages_application_support_page : mdkapp_pages_application_support_page,
		mdkapp_pages_application_useractivitylog_page : mdkapp_pages_application_useractivitylog_page,
		mdkapp_pages_com_sap_edm_sampleservice_v4_customers_customers_create_page : mdkapp_pages_com_sap_edm_sampleservice_v4_customers_customers_create_page,
		mdkapp_pages_com_sap_edm_sampleservice_v4_customers_customers_createsalesorderheader_page : mdkapp_pages_com_sap_edm_sampleservice_v4_customers_customers_createsalesorderheader_page,
		mdkapp_pages_com_sap_edm_sampleservice_v4_customers_customers_detail_page : mdkapp_pages_com_sap_edm_sampleservice_v4_customers_customers_detail_page,
		mdkapp_pages_com_sap_edm_sampleservice_v4_customers_customers_edit_page : mdkapp_pages_com_sap_edm_sampleservice_v4_customers_customers_edit_page,
		mdkapp_pages_com_sap_edm_sampleservice_v4_customers_customers_list_page : mdkapp_pages_com_sap_edm_sampleservice_v4_customers_customers_list_page,
		mdkapp_pages_com_sap_edm_sampleservice_v4_products_products_create_page : mdkapp_pages_com_sap_edm_sampleservice_v4_products_products_create_page,
		mdkapp_pages_com_sap_edm_sampleservice_v4_products_products_createpurchaseorderitem_page : mdkapp_pages_com_sap_edm_sampleservice_v4_products_products_createpurchaseorderitem_page,
		mdkapp_pages_com_sap_edm_sampleservice_v4_products_products_createsalesorderitem_page : mdkapp_pages_com_sap_edm_sampleservice_v4_products_products_createsalesorderitem_page,
		mdkapp_pages_com_sap_edm_sampleservice_v4_products_products_detail_page : mdkapp_pages_com_sap_edm_sampleservice_v4_products_products_detail_page,
		mdkapp_pages_com_sap_edm_sampleservice_v4_products_products_edit_page : mdkapp_pages_com_sap_edm_sampleservice_v4_products_products_edit_page,
		mdkapp_pages_com_sap_edm_sampleservice_v4_products_products_list_page : mdkapp_pages_com_sap_edm_sampleservice_v4_products_products_list_page,
		mdkapp_pages_com_sap_edm_sampleservice_v4_purchaseorderheaders_purchaseorderheaders_create_page : mdkapp_pages_com_sap_edm_sampleservice_v4_purchaseorderheaders_purchaseorderheaders_create_page,
		mdkapp_pages_com_sap_edm_sampleservice_v4_purchaseorderheaders_purchaseorderheaders_createpurchaseorderitem_page : mdkapp_pages_com_sap_edm_sampleservice_v4_purchaseorderheaders_purchaseorderheaders_createpurchaseorderitem_page,
		mdkapp_pages_com_sap_edm_sampleservice_v4_purchaseorderheaders_purchaseorderheaders_detail_page : mdkapp_pages_com_sap_edm_sampleservice_v4_purchaseorderheaders_purchaseorderheaders_detail_page,
		mdkapp_pages_com_sap_edm_sampleservice_v4_purchaseorderheaders_purchaseorderheaders_edit_page : mdkapp_pages_com_sap_edm_sampleservice_v4_purchaseorderheaders_purchaseorderheaders_edit_page,
		mdkapp_pages_com_sap_edm_sampleservice_v4_purchaseorderheaders_purchaseorderheaders_list_page : mdkapp_pages_com_sap_edm_sampleservice_v4_purchaseorderheaders_purchaseorderheaders_list_page,
		mdkapp_pages_com_sap_edm_sampleservice_v4_purchaseorderitems_purchaseorderitems_create_page : mdkapp_pages_com_sap_edm_sampleservice_v4_purchaseorderitems_purchaseorderitems_create_page,
		mdkapp_pages_com_sap_edm_sampleservice_v4_purchaseorderitems_purchaseorderitems_detail_page : mdkapp_pages_com_sap_edm_sampleservice_v4_purchaseorderitems_purchaseorderitems_detail_page,
		mdkapp_pages_com_sap_edm_sampleservice_v4_purchaseorderitems_purchaseorderitems_edit_page : mdkapp_pages_com_sap_edm_sampleservice_v4_purchaseorderitems_purchaseorderitems_edit_page,
		mdkapp_pages_com_sap_edm_sampleservice_v4_purchaseorderitems_purchaseorderitems_list_page : mdkapp_pages_com_sap_edm_sampleservice_v4_purchaseorderitems_purchaseorderitems_list_page,
		mdkapp_pages_com_sap_edm_sampleservice_v4_salesorderheaders_salesorderheaders_create_page : mdkapp_pages_com_sap_edm_sampleservice_v4_salesorderheaders_salesorderheaders_create_page,
		mdkapp_pages_com_sap_edm_sampleservice_v4_salesorderheaders_salesorderheaders_createsalesorderitem_page : mdkapp_pages_com_sap_edm_sampleservice_v4_salesorderheaders_salesorderheaders_createsalesorderitem_page,
		mdkapp_pages_com_sap_edm_sampleservice_v4_salesorderheaders_salesorderheaders_detail_page : mdkapp_pages_com_sap_edm_sampleservice_v4_salesorderheaders_salesorderheaders_detail_page,
		mdkapp_pages_com_sap_edm_sampleservice_v4_salesorderheaders_salesorderheaders_edit_page : mdkapp_pages_com_sap_edm_sampleservice_v4_salesorderheaders_salesorderheaders_edit_page,
		mdkapp_pages_com_sap_edm_sampleservice_v4_salesorderheaders_salesorderheaders_list_page : mdkapp_pages_com_sap_edm_sampleservice_v4_salesorderheaders_salesorderheaders_list_page,
		mdkapp_pages_com_sap_edm_sampleservice_v4_salesorderitems_salesorderitems_create_page : mdkapp_pages_com_sap_edm_sampleservice_v4_salesorderitems_salesorderitems_create_page,
		mdkapp_pages_com_sap_edm_sampleservice_v4_salesorderitems_salesorderitems_detail_page : mdkapp_pages_com_sap_edm_sampleservice_v4_salesorderitems_salesorderitems_detail_page,
		mdkapp_pages_com_sap_edm_sampleservice_v4_salesorderitems_salesorderitems_edit_page : mdkapp_pages_com_sap_edm_sampleservice_v4_salesorderitems_salesorderitems_edit_page,
		mdkapp_pages_com_sap_edm_sampleservice_v4_salesorderitems_salesorderitems_list_page : mdkapp_pages_com_sap_edm_sampleservice_v4_salesorderitems_salesorderitems_list_page,
		mdkapp_pages_errorarchive_errorarchive_detail_page : mdkapp_pages_errorarchive_errorarchive_detail_page,
		mdkapp_pages_errorarchive_errorarchive_list_page : mdkapp_pages_errorarchive_errorarchive_list_page,
		mdkapp_pages_main_page : mdkapp_pages_main_page,
		mdkapp_rules_application_appupdatefailure_js : mdkapp_rules_application_appupdatefailure_js,
		mdkapp_rules_application_appupdatesuccess_js : mdkapp_rules_application_appupdatesuccess_js,
		mdkapp_rules_application_clientismultiusermode_js : mdkapp_rules_application_clientismultiusermode_js,
		mdkapp_rules_application_getclientsupportversions_js : mdkapp_rules_application_getclientsupportversions_js,
		mdkapp_rules_application_getclientversion_js : mdkapp_rules_application_getclientversion_js,
		mdkapp_rules_application_onwillupdate_js : mdkapp_rules_application_onwillupdate_js,
		mdkapp_rules_application_resetappsettingsandlogout_js : mdkapp_rules_application_resetappsettingsandlogout_js,
		mdkapp_rules_com_sap_edm_sampleservice_v2_errorarchive_checkforsyncerror_js : mdkapp_rules_com_sap_edm_sampleservice_v2_errorarchive_checkforsyncerror_js,
		mdkapp_rules_com_sap_edm_sampleservice_v4_customers_customers_deleteconfirmation_js : mdkapp_rules_com_sap_edm_sampleservice_v4_customers_customers_deleteconfirmation_js,
		mdkapp_rules_com_sap_edm_sampleservice_v4_errorarchive_checkforsyncerror_js : mdkapp_rules_com_sap_edm_sampleservice_v4_errorarchive_checkforsyncerror_js,
		mdkapp_rules_com_sap_edm_sampleservice_v4_products_products_createentity_js : mdkapp_rules_com_sap_edm_sampleservice_v4_products_products_createentity_js,
		mdkapp_rules_com_sap_edm_sampleservice_v4_products_products_deleteconfirmation_js : mdkapp_rules_com_sap_edm_sampleservice_v4_products_products_deleteconfirmation_js,
		mdkapp_rules_com_sap_edm_sampleservice_v4_purchaseorderheaders_purchaseorderheaders_deleteconfirmation_js : mdkapp_rules_com_sap_edm_sampleservice_v4_purchaseorderheaders_purchaseorderheaders_deleteconfirmation_js,
		mdkapp_rules_com_sap_edm_sampleservice_v4_purchaseorderitems_purchaseorderitems_deleteconfirmation_js : mdkapp_rules_com_sap_edm_sampleservice_v4_purchaseorderitems_purchaseorderitems_deleteconfirmation_js,
		mdkapp_rules_com_sap_edm_sampleservice_v4_salesorderheaders_salesorderheaders_deleteconfirmation_js : mdkapp_rules_com_sap_edm_sampleservice_v4_salesorderheaders_salesorderheaders_deleteconfirmation_js,
		mdkapp_rules_com_sap_edm_sampleservice_v4_salesorderitems_salesorderitems_deleteconfirmation_js : mdkapp_rules_com_sap_edm_sampleservice_v4_salesorderitems_salesorderitems_deleteconfirmation_js,
		mdkapp_rules_logging_loglevels_js : mdkapp_rules_logging_loglevels_js,
		mdkapp_rules_logging_settracecategories_js : mdkapp_rules_logging_settracecategories_js,
		mdkapp_rules_logging_setuserloglevel_js : mdkapp_rules_logging_setuserloglevel_js,
		mdkapp_rules_logging_togglelogging_js : mdkapp_rules_logging_togglelogging_js,
		mdkapp_rules_logging_tracecategories_js : mdkapp_rules_logging_tracecategories_js,
		mdkapp_rules_logging_userlogsetting_js : mdkapp_rules_logging_userlogsetting_js,
		mdkapp_rules_service_initialize_js : mdkapp_rules_service_initialize_js,
		mdkapp_services_com_sap_edm_sampleservice_v2_service : mdkapp_services_com_sap_edm_sampleservice_v2_service,
		mdkapp_services_com_sap_edm_sampleservice_v4_service : mdkapp_services_com_sap_edm_sampleservice_v4_service,
		mdkapp_styles_styles_css : mdkapp_styles_styles_css,
		mdkapp_styles_styles_json : mdkapp_styles_styles_json,
		mdkapp_styles_styles_less : mdkapp_styles_styles_less,
		mdkapp_styles_styles_nss : mdkapp_styles_styles_nss,
		tsconfig_json : tsconfig_json,
		version_mdkbundlerversion : version_mdkbundlerversion
	}

/***/ }),

/***/ "./build.definitions/MDKApp/Styles/Styles.css":
/*!****************************************************!*\
  !*** ./build.definitions/MDKApp/Styles/Styles.css ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
div.MDKPage

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function

.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }
*/
	`, "",{"version":3,"sources":["webpack://./build.definitions/MDKApp/Styles/Styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\ndiv.MDKPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n\t"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/MDKApp/Styles/Styles.less":
/*!*****************************************************!*\
  !*** ./build.definitions/MDKApp/Styles/Styles.less ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
Page

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function

.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }
*/`, "",{"version":3,"sources":["webpack://./build.definitions/MDKApp/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/MDKApp/Styles/Styles.nss":
/*!****************************************************!*\
  !*** ./build.definitions/MDKApp/Styles/Styles.nss ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ``, "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "../../../../css-loader/dist/runtime/api.js":
/*!**************************************************!*\
  !*** ../../../../css-loader/dist/runtime/api.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "../../../../css-loader/dist/runtime/sourceMaps.js":
/*!*********************************************************!*\
  !*** ../../../../css-loader/dist/runtime/sourceMaps.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/Application/About.page":
/*!***************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/Application/About.page ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"KeyAndValues":[{"_Name":"KeyValue0","KeyName":"User ID","Value":"#Application/#AppData/UserId","Visible":true},{"Value":"#Application/#AppData/DeviceId","_Name":"KeyValue1","KeyName":"Device ID","Visible":true},{"Value":"/MDKApp/Globals/Application/ApplicationName.global","_Name":"KeyValue2","KeyName":"Application","Visible":true},{"Value":"/MDKApp/Globals/Application/AppDefinition_Version.global","_Name":"KeyValue3","KeyName":"Application Metadata Version","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}},{"KeyAndValues":[{"Value":"/MDKApp/Rules/Application/GetClientVersion.js","_Name":"KeyValue4","KeyName":"Client Version","Visible":"$(PLT,true,true,false)"},{"Value":"/MDKApp/Rules/Application/GetClientSupportVersions.js","_Name":"KeyValue5","KeyName":"Client Support Versions","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue1","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"About","Caption":"About","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Done","SystemItem":"Done","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/MDKApp/Actions/CloseModalPage_Complete.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/Application/Support.page":
/*!*****************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/Application/Support.page ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ContactCell","_Name":"SectionContactCellTable1","EmptySection":{"FooterVisible":false},"ContactCells":[{"ContactCell":{"_Name":"ContactCellItem0","Headline":"Contact Support","ActivityItems":[{"ActivityType":"Phone","ActivityValue":"/MDKApp/Globals/Application/SupportPhone.global"},{"ActivityType":"Email","ActivityValue":"/MDKApp/Globals/Application/SupportEmail.global"},{"ActivityType":"Message","ActivityValue":"/MDKApp/Globals/Application/SupportPhone.global"}]}}]},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":false,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.SimplePropertyCollection","_Name":"SectionSimplePropertyCollection0","Visible":"$(PLT,true,true,false)","EmptySection":{"FooterVisible":false},"SimplePropertyCells":[{"SimplePropertyCell":{"_Name":"SectionSimplePropertyCell0","KeyName":"Activity Log","AccessoryType":"DisclosureIndicator","Visible":"$(PLT,true,true,false)","OnPress":"/MDKApp/Actions/Application/NavToActivityLog.action"}}],"Layout":{"NumberOfColumns":1,"MinimumInteritemSpacing":66}}]}],"_Type":"Page","_Name":"Settings","Caption":"Settings","PrefersLargeCaption":false,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Done","SystemItem":"Done","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/MDKApp/Actions/CloseModalPage_Complete.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/Application/UserActivityLog.page":
/*!*************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/Application/UserActivityLog.page ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"Controls":[{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"EnableLogSwitch","IsVisible":true,"Separator":true,"Caption":"Enable Logging","OnValueChange":"/MDKApp/Rules/Logging/ToggleLogging.js","IsEditable":true},{"IsSearchEnabled":false,"_Type":"Control.Type.FormCell.ListPicker","_Name":"LogLevelListPicker","IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":false,"Caption":"Log Level","OnValueChange":"/MDKApp/Rules/Logging/SetUserLogLevel.js","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":true,"AllowDefaultValueIfOneItem":false,"IsEditable":false,"PickerItems":"/MDKApp/Rules/Logging/LogLevels.js"},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"TracingCategoriesListPicker","IsVisible":false,"Separator":true,"AllowMultipleSelection":true,"AllowEmptySelection":true,"Caption":"Tracing Categories","PickerPrompt":"Select Categories for Tracing","OnValueChange":"/MDKApp/Rules/Logging/SetTraceCategories.js","IsSelectedSectionEnabled":true,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"IsEditable":true,"PickerItems":"/MDKApp/Rules/Logging/TraceCategories.js"},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"odataTrace","IsVisible":false,"Separator":true,"Caption":"OData Tracing","OnValueChange":"/MDKApp/Rules/Logging/SetTraceCategories.js","IsEditable":true}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"FormCellSection0"},{"Controls":[{"_Type":"Control.Type.FormCell.Button","_Name":"Send","IsVisible":true,"Separator":true,"Title":"Send Activity Log","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","Enabled":true,"OnPress":"/MDKApp/Actions/Logging/UploadLogProgress.action"}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"FormCellSection1"}]}],"_Type":"Page","_Name":"UserActivityLog","Caption":"Activity Log","PrefersLargeCaption":false,"OnLoaded":"/MDKApp/Rules/Logging/UserLogSetting.js"}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/ErrorArchive/ErrorArchive_Detail.page":
/*!******************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/ErrorArchive/ErrorArchive_Detail.page ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"KeyAndValues":[{"Value":"{Message}","_Name":"KeyValue0","KeyName":"Error","Visible":true},{"Value":"{RequestBody}","_Name":"KeyValue1","KeyName":"Request Body","Visible":true},{"Value":"{RequestURL}","_Name":"KeyValue2","KeyName":"Request URL","Visible":true},{"Value":"{HTTPStatusCode}","_Name":"KeyValue3","KeyName":"HTTP Status Code","Visible":true},{"Value":"{RequestMethod}","_Name":"KeyValue4","KeyName":"Request Method","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"ErrorArchive_Detail","Caption":"Details","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/ErrorArchive/ErrorArchive_List.page":
/*!****************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/ErrorArchive/ErrorArchive_List.page ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Header":{"_Type":"SectionCommon.Type.Header","_Name":"SectionHeader_com_sap_edm_sampleservice_v2","AccessoryType":"None","UseTopPadding":true,"Caption":"com_sap_edm_sampleservice_v2"},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.ObjectTable","Target":{"Service":"/MDKApp/Services/com_sap_edm_sampleservice_v2.service","EntitySet":"ErrorArchive"},"_Name":"SectionObjectTable_com_sap_edm_sampleservice_v2","Visible":true,"EmptySection":{"Caption":"No record found!","FooterVisible":false},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true,"LeadingItems":[],"TrailingItems":[]},"Title":"","Subhead":"","Footnote":"","StatusText":"","PreserveIconStackSpacing":false,"AccessoryType":"None","Tags":[],"AvatarStack":{"ImageIsCircular":false,"ImageHasBorder":false},"AvatarGrid":{"ImageIsCircular":true},"OnPress":"/MDKApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action","Selected":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}},{"Header":{"_Type":"SectionCommon.Type.Header","_Name":"SectionHeader_com_sap_edm_sampleservice_v4","AccessoryType":"None","UseTopPadding":true,"Caption":"com_sap_edm_sampleservice_v4"},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.ObjectTable","Target":{"Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service","EntitySet":"ErrorArchive"},"_Name":"SectionObjectTable_com_sap_edm_sampleservice_v4","Visible":true,"EmptySection":{"Caption":"No record found!","FooterVisible":false},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true,"LeadingItems":[],"TrailingItems":[]},"Title":"{HTTPStatusCode}","Subhead":"{RequestURL}","Footnote":"{Message}","StatusText":"{RequestMethod}","PreserveIconStackSpacing":false,"AccessoryType":"None","Tags":[],"AvatarStack":{"ImageIsCircular":false,"ImageHasBorder":false},"AvatarGrid":{"ImageIsCircular":true},"OnPress":"/MDKApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action","Selected":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}}]}],"_Type":"Page","_Name":"ErrorArchive_List","Caption":"Error List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/Main.page":
/*!**************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/Main.page ***!
  \**************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Layout":{"LayoutType":"Vertical","HorizontalAlignment":"Leading"},"_Type":"Section.Type.ButtonTable","_Name":"SectionButtonTable1_com_sap_edm_sampleservice_v2","Header":{"_Type":"SectionCommon.Type.Header","_Name":"SectionHeader_com_sap_edm_sampleservice_v2","AccessoryType":"None","UseTopPadding":true,"Caption":"com_sap_edm_sampleservice_v2","Items":[{"_Type":"SectionHeaderItem.Type.Label","_Name":"SectionHeaderItemTypeLabel_com_sap_edm_sampleservice_v2","Visible":true,"Position":"Left","Title":"com_sap_edm_sampleservice_v2"},{"_Type":"SectionHeaderItem.Type.Button","_Name":"SectionHeaderItemTypeButton_com_sap_edm_sampleservice_v2","Title":"Sync","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","Visible":true,"Enabled":true,"Position":"Right","OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/SyncStartedMessage.action"}]},"Visible":true,"EmptySection":{"FooterVisible":false},"Buttons":[{"_Type":"ButtonTable.Type.Button","_Name":"ButtonTableTypeButton0","Title":"Customers","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","FullWidth":false,"Visible":true,"Enabled":true,"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/NavToCustomers_List.action"},{"_Type":"ButtonTable.Type.Button","_Name":"ButtonTableTypeButton1","Title":"Products","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","FullWidth":false,"Visible":true,"Enabled":true,"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/NavToProducts_List.action"},{"_Type":"ButtonTable.Type.Button","_Name":"ButtonTableTypeButton2","Title":"PurchaseOrderHeaders","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","FullWidth":false,"Visible":true,"Enabled":true,"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_List.action"},{"_Type":"ButtonTable.Type.Button","_Name":"ButtonTableTypeButton3","Title":"PurchaseOrderItems","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","FullWidth":false,"Visible":true,"Enabled":true,"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderItems/NavToPurchaseOrderItems_List.action"},{"_Type":"ButtonTable.Type.Button","_Name":"ButtonTableTypeButton4","Title":"SalesOrderHeaders","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","FullWidth":false,"Visible":true,"Enabled":true,"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/NavToSalesOrderHeaders_List.action"},{"_Type":"ButtonTable.Type.Button","_Name":"ButtonTableTypeButton5","Title":"SalesOrderItems","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","FullWidth":false,"Visible":true,"Enabled":true,"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderItems/NavToSalesOrderItems_List.action"}]},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Layout":{"LayoutType":"Vertical","HorizontalAlignment":"Leading"},"_Type":"Section.Type.ButtonTable","_Name":"SectionButtonTable1_com_sap_edm_sampleservice_v4","Header":{"_Type":"SectionCommon.Type.Header","_Name":"SectionHeader_com_sap_edm_sampleservice_v4","AccessoryType":"None","UseTopPadding":true,"Caption":"com_sap_edm_sampleservice_v4","Items":[{"_Type":"SectionHeaderItem.Type.Label","_Name":"SectionHeaderItemTypeLabel_com_sap_edm_sampleservice_v4","Visible":true,"Position":"Left","Title":"com_sap_edm_sampleservice_v4"},{"_Type":"SectionHeaderItem.Type.Button","_Name":"SectionHeaderItemTypeButton_com_sap_edm_sampleservice_v4","Title":"Sync","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","Visible":true,"Enabled":true,"Position":"Right","OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/SyncStartedMessage.action"}]},"Visible":true,"EmptySection":{"FooterVisible":false},"Buttons":[{"_Type":"ButtonTable.Type.Button","_Name":"ButtonTableTypeButton6","Title":"Customers","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","FullWidth":false,"Visible":true,"Enabled":true,"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/NavToCustomers_List.action"},{"_Type":"ButtonTable.Type.Button","_Name":"ButtonTableTypeButton7","Title":"Products","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","FullWidth":false,"Visible":true,"Enabled":true,"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/NavToProducts_List.action"},{"_Type":"ButtonTable.Type.Button","_Name":"ButtonTableTypeButton8","Title":"PurchaseOrderHeaders","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","FullWidth":false,"Visible":true,"Enabled":true,"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_List.action"},{"_Type":"ButtonTable.Type.Button","_Name":"ButtonTableTypeButton9","Title":"PurchaseOrderItems","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","FullWidth":false,"Visible":true,"Enabled":true,"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderItems/NavToPurchaseOrderItems_List.action"},{"_Type":"ButtonTable.Type.Button","_Name":"ButtonTableTypeButton10","Title":"SalesOrderHeaders","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","FullWidth":false,"Visible":true,"Enabled":true,"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/NavToSalesOrderHeaders_List.action"},{"_Type":"ButtonTable.Type.Button","_Name":"ButtonTableTypeButton11","Title":"SalesOrderItems","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","FullWidth":false,"Visible":true,"Enabled":true,"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderItems/NavToSalesOrderItems_List.action"}]}]}],"_Type":"Page","_Name":"Main","Caption":"Main","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"User Menu","Icon":"sap-icon://customer","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/MDKApp/Actions/Application/UserMenuPopover.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_Customers/Customers_Create.page":
/*!*****************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_Customers/Customers_Create.page ***!
  \*****************************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/Customers_CreateEntity.action","Position":"Right","SystemItem":"Save"}]},"Caption":"$(L,Create_Customer_Detail)","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"City","_Name":"City","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Country","_Name":"Country","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CustomerID","KeyboardType":"Number","_Name":"CustomerID","_Type":"Control.Type.FormCell.SimpleProperty"},{"Mode":"Date","_Name":"DateOfBirth","Caption":"DateOfBirth","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"EmailAddress","_Name":"EmailAddress","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Gender","_Name":"Gender","Segments":["Male","Female","Other","None","Unknown"],"_Type":"Control.Type.FormCell.SegmentedControl"},{"Caption":"FirstName","_Name":"FirstName","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"HouseNumber","_Name":"HouseNumber","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LastName","_Name":"LastName","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"PhoneNumber","_Name":"PhoneNumber","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"PostalCode","_Name":"PostalCode","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Street","_Name":"Street","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Customers_Create","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_Customers/Customers_CreateSalesOrderHeader.page":
/*!*********************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_Customers/Customers_CreateSalesOrderHeader.page ***!
  \*********************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/Customers_CreateSalesOrderHeader.action","Position":"Right","SystemItem":"Save"}]},"Caption":"$(L,Create_SalesOrderHeader)","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Mode":"Datetime","_Name":"CreatedAt","Caption":"CreatedAt","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"CurrencyCode","_Name":"CurrencyCode","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CustomerID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":false,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{CustomerID}","ReturnValue":"{CustomerID}","Target":{"EntitySet":"Customers","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service"}},"_Name":"CustomerID","_Type":"Control.Type.FormCell.ListPicker","Value":"{CustomerID}"},{"Caption":"GrossAmount","KeyboardType":"Number","_Name":"GrossAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LifeCycleStatus","_Name":"LifeCycleStatus","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LifeCycleStatusName","_Name":"LifeCycleStatusName","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"NetAmount","KeyboardType":"Number","_Name":"NetAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SalesOrderID","KeyboardType":"Number","_Name":"SalesOrderID","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"TaxAmount","KeyboardType":"Number","_Name":"TaxAmount","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Customers_CreateSalesOrderHeader","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_Customers/Customers_Detail.page":
/*!*****************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_Customers/Customers_Detail.page ***!
  \*****************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"$(L,Customer_Detail)","DesignTimeTarget":{"Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service","EntitySet":"Customers","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/NavToCustomers_Edit.action","Position":"Right","SystemItem":"Edit"},{"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/Customers_DetailPopover.action","Position":"Right","Caption":"More"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{FirstName}","Subhead":"{City}","BodyText":"","Footnote":"{CustomerID}","Description":"{Country}","StatusText":"{DateOfBirth}","StatusImage":"","SubstatusImage":"","SubstatusText":"{EmailAddress}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"City","Value":"{City}"},{"KeyName":"Country","Value":"{Country}"},{"KeyName":"CustomerID","Value":"{CustomerID}"},{"KeyName":"DateOfBirth","Value":"{DateOfBirth}"},{"KeyName":"EmailAddress","Value":"{EmailAddress}"},{"KeyName":"FirstName","Value":"{FirstName}"},{"KeyName":"HouseNumber","Value":"{HouseNumber}"},{"KeyName":"LastName","Value":"{LastName}"},{"KeyName":"PhoneNumber","Value":"{PhoneNumber}"},{"KeyName":"PostalCode","Value":"{PostalCode}"},{"KeyName":"Street","Value":"{Street}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"Address","_Type":"SectionCommon.Type.Header"},"KeyAndValues":[{"KeyName":"HouseNumber","Value":"{Address/HouseNumber}"},{"KeyName":"Street","Value":"{Address/Street}"},{"KeyName":"City","Value":"{Address/City}"},{"KeyName":"Country","Value":"{Address/Country}"},{"KeyName":"PostalCode","Value":"{Address/PostalCode}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValueAddress","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"SalesOrders","_Type":"SectionCommon.Type.Header"},"ObjectCell":{"AccessoryType":"DisclosureIndicator","Description":"{CurrencyCode}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{LifeCycleStatusName}","Footnote":"{CustomerID}","PreserveIconStackSpacing":false,"StatusText":"{GrossAmount}","Subhead":"{CreatedAt}","SubstatusText":"{LifeCycleStatus}","OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/SalesOrders","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service"},"_Type":"Section.Type.ObjectTable"}],"DataSubscriptions":["SalesOrderHeaders"],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Customers_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_Customers/Customers_Edit.page":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_Customers/Customers_Edit.page ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"$(L,Update_Customer_Detail)","DesignTimeTarget":{"Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service","EntitySet":"Customers","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","SystemItem":"Cancel","OnPress":"/MDKApp/Actions/CloseModalPage_Cancel.action"},{"Position":"Right","SystemItem":"Save","OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/Customers_UpdateEntity.action"}]},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"City","_Name":"City","Value":"{City}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Country","_Name":"Country","Value":"{Country}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CustomerID","_Name":"CustomerID","Value":"{CustomerID}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty","IsEditable":false},{"Mode":"Date","_Name":"DateOfBirth","Value":"{DateOfBirth}","Caption":"DateOfBirth","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"EmailAddress","_Name":"EmailAddress","Value":"{EmailAddress}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Gender","_Name":"Gender","Value":"{Gender}","Segments":["Male","Female","Other","None","Unknown"],"_Type":"Control.Type.FormCell.SegmentedControl"},{"Caption":"FirstName","_Name":"FirstName","Value":"{FirstName}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"HouseNumber","_Name":"HouseNumber","Value":"{HouseNumber}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LastName","_Name":"LastName","Value":"{LastName}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"PhoneNumber","_Name":"PhoneNumber","Value":"{PhoneNumber}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"PostalCode","_Name":"PostalCode","Value":"{PostalCode}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Street","_Name":"Street","Value":"{Street}","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Customers_Edit","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_Customers/Customers_List.page":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_Customers/Customers_List.page ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"$(L,Customers)","ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/NavToCustomers_Create.action","Position":"Right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false,"_Type":"SectionCommon.Type.Header"},"ObjectCell":{"AccessoryType":"DisclosureIndicator","Description":"{Country}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/NavToCustomers_Detail.action","StatusImage":"","Title":"{FirstName}","Footnote":"{CustomerID}","PreserveIconStackSpacing":false,"StatusText":"{DateOfBirth}","Subhead":"{City}","SubstatusText":"{EmailAddress}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Customers","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Customers_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_Products/Products_Create.page":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_Products/Products_Create.page ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MDKApp/Rules/com_sap_edm_sampleservice_v4/Products/Products_CreateEntity.js","Position":"Right","SystemItem":"Save"}]},"Caption":"$(L,Create_Product_Detail)","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"Category","_Name":"Category","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CategoryName","_Name":"CategoryName","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CurrencyCode","_Name":"CurrencyCode","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionDepth","KeyboardType":"Number","_Name":"DimensionDepth","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionHeight","KeyboardType":"Number","_Name":"DimensionHeight","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionUnit","_Name":"DimensionUnit","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionWidth","KeyboardType":"Number","_Name":"DimensionWidth","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LongDescription","_Name":"LongDescription","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Name","_Name":"Name","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"PictureUrl","_Name":"PictureUrl","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Price","KeyboardType":"Number","_Name":"Price","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ProductID","KeyboardType":"Number","_Name":"ProductID","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"QuantityUnit","_Name":"QuantityUnit","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ShortDescription","_Name":"ShortDescription","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SupplierID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{SupplierName}","ReturnValue":"{SupplierID}","Target":{"EntitySet":"Suppliers","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service"}},"_Name":"SupplierID","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"Weight","KeyboardType":"Number","_Name":"Weight","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"WeightUnit","_Name":"WeightUnit","_Type":"Control.Type.FormCell.SimpleProperty"},{"AttachmentTitle":"Picture","AttachmentAddTitle":"Browse","AttachmentActionType":["AddPhoto","TakePhoto","SelectFile"],"AllowedFileTypes":["jpg","png","gif"],"_Name":"Picture","_Type":"Control.Type.FormCell.Attachment"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Products_Create","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_Products/Products_CreatePurchaseOrderItem.page":
/*!********************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_Products/Products_CreatePurchaseOrderItem.page ***!
  \********************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/Products_CreatePurchaseOrderItem.action","Position":"Right","SystemItem":"Save"}]},"Caption":"$(L,Create_PurchaseOrderItem)","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"CurrencyCode","_Name":"CurrencyCode","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"GrossAmount","KeyboardType":"Number","_Name":"GrossAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ItemNumber","KeyboardType":"Number","_Name":"ItemNumber","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"NetAmount","KeyboardType":"Number","_Name":"NetAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ProductID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":false,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{Name}","ReturnValue":"{ProductID}","Target":{"EntitySet":"Products","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service"}},"_Name":"ProductID","_Type":"Control.Type.FormCell.ListPicker","Value":"{ProductID}"},{"Caption":"PurchaseOrderID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{PurchaseOrderID}","ReturnValue":"{PurchaseOrderID}","Target":{"EntitySet":"PurchaseOrderHeaders","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service"}},"_Name":"PurchaseOrderID","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"Quantity","KeyboardType":"Number","_Name":"Quantity","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"QuantityUnit","_Name":"QuantityUnit","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"TaxAmount","KeyboardType":"Number","_Name":"TaxAmount","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Products_CreatePurchaseOrderItem","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_Products/Products_CreateSalesOrderItem.page":
/*!*****************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_Products/Products_CreateSalesOrderItem.page ***!
  \*****************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/Products_CreateSalesOrderItem.action","Position":"Right","SystemItem":"Save"}]},"Caption":"$(L,Create_SalesOrderItem)","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"CurrencyCode","_Name":"CurrencyCode","_Type":"Control.Type.FormCell.SimpleProperty"},{"Mode":"Date","_Name":"DeliveryDate","Caption":"DeliveryDate","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"GrossAmount","KeyboardType":"Number","_Name":"GrossAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ItemNumber","KeyboardType":"Number","_Name":"ItemNumber","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"NetAmount","KeyboardType":"Number","_Name":"NetAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ProductID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":false,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{Name}","ReturnValue":"{ProductID}","Target":{"EntitySet":"Products","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service"}},"_Name":"ProductID","_Type":"Control.Type.FormCell.ListPicker","Value":"{ProductID}"},{"Caption":"Quantity","KeyboardType":"Number","_Name":"Quantity","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"QuantityUnit","_Name":"QuantityUnit","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SalesOrderID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{SalesOrderID}","ReturnValue":"{SalesOrderID}","Target":{"EntitySet":"SalesOrderHeaders","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service"}},"_Name":"SalesOrderID","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"TaxAmount","KeyboardType":"Number","_Name":"TaxAmount","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Products_CreateSalesOrderItem","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_Products/Products_Detail.page":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_Products/Products_Detail.page ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"$(L,Product_Detail)","DesignTimeTarget":{"Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service","EntitySet":"Products","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/NavToProducts_Edit.action","Position":"Right","SystemItem":"Edit"},{"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/Products_DetailPopover.action","Position":"Right","Caption":"More"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service/{@odata.readLink}/Picture","HeadlineText":"{Name}","Subhead":"{Category}","BodyText":"","Footnote":"{CurrencyCode}","Description":"{CategoryName}","StatusText":"{DimensionDepth}","StatusImage":"","SubstatusImage":"","SubstatusText":"{DimensionHeight}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"Category","Value":"{Category}"},{"KeyName":"CategoryName","Value":"{CategoryName}"},{"KeyName":"CurrencyCode","Value":"{CurrencyCode}"},{"KeyName":"DimensionDepth","Value":"{DimensionDepth}"},{"KeyName":"DimensionHeight","Value":"{DimensionHeight}"},{"KeyName":"DimensionUnit","Value":"{DimensionUnit}"},{"KeyName":"DimensionWidth","Value":"{DimensionWidth}"},{"KeyName":"LongDescription","Value":"{LongDescription}"},{"KeyName":"Name","Value":"{Name}"},{"KeyName":"PictureUrl","Value":"{PictureUrl}"},{"KeyName":"Price","Value":"{Price}"},{"KeyName":"ProductID","Value":"{ProductID}"},{"KeyName":"QuantityUnit","Value":"{QuantityUnit}"},{"KeyName":"ShortDescription","Value":"{ShortDescription}"},{"KeyName":"SupplierID","Value":"{SupplierID}"},{"KeyName":"Weight","Value":"{Weight}"},{"KeyName":"WeightUnit","Value":"{WeightUnit}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"PurchaseOrderItems","_Type":"SectionCommon.Type.Header"},"ObjectCell":{"AccessoryType":"DisclosureIndicator","Description":"{GrossAmount}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{ProductID}","Footnote":"{ItemNumber}","PreserveIconStackSpacing":false,"StatusText":"{NetAmount}","Subhead":"{CurrencyCode}","SubstatusText":"{PurchaseOrderID}","OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/PurchaseOrderItems","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service"},"_Type":"Section.Type.ObjectTable"},{"Header":{"Caption":"SalesOrderItems","_Type":"SectionCommon.Type.Header"},"ObjectCell":{"AccessoryType":"DisclosureIndicator","Description":"{DeliveryDate}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{ProductID}","Footnote":"{GrossAmount}","PreserveIconStackSpacing":false,"StatusText":"{ItemNumber}","Subhead":"{CurrencyCode}","SubstatusText":"{NetAmount}","OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderItems/NavToSalesOrderItems_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/SalesOrderItems","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service"},"_Type":"Section.Type.ObjectTable"}],"DataSubscriptions":["PurchaseOrderItems","SalesOrderItems"],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Products_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_Products/Products_Edit.page":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_Products/Products_Edit.page ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"$(L,Update_Product_Detail)","DesignTimeTarget":{"Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service","EntitySet":"Products","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","SystemItem":"Cancel","OnPress":"/MDKApp/Actions/CloseModalPage_Cancel.action"},{"Position":"Right","SystemItem":"Save","OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/Products_UpdateEntity.action"}]},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"Category","_Name":"Category","Value":"{Category}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CategoryName","_Name":"CategoryName","Value":"{CategoryName}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CurrencyCode","_Name":"CurrencyCode","Value":"{CurrencyCode}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionDepth","_Name":"DimensionDepth","Value":"{DimensionDepth}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionHeight","_Name":"DimensionHeight","Value":"{DimensionHeight}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionUnit","_Name":"DimensionUnit","Value":"{DimensionUnit}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionWidth","_Name":"DimensionWidth","Value":"{DimensionWidth}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LongDescription","_Name":"LongDescription","Value":"{LongDescription}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Name","_Name":"Name","Value":"{Name}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"PictureUrl","_Name":"PictureUrl","Value":"{PictureUrl}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Price","_Name":"Price","Value":"{Price}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ProductID","_Name":"ProductID","Value":"{ProductID}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty","IsEditable":false},{"Caption":"QuantityUnit","_Name":"QuantityUnit","Value":"{QuantityUnit}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ShortDescription","_Name":"ShortDescription","Value":"{ShortDescription}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SupplierID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{SupplierName}","ReturnValue":"{SupplierID}","Target":{"EntitySet":"Suppliers","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service"}},"Value":"{SupplierID}","_Name":"SupplierID","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"Weight","_Name":"Weight","Value":"{Weight}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"WeightUnit","_Name":"WeightUnit","Value":"{WeightUnit}","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Products_Edit","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_Products/Products_List.page":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_Products/Products_List.page ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"$(L,Products)","ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/NavToProducts_Create.action","Position":"Right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false,"_Type":"SectionCommon.Type.Header"},"ObjectCell":{"AccessoryType":"DisclosureIndicator","Description":"{CategoryName}","AvatarStack":{"Avatars":[{"Image":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service/{@odata.readLink}/Picture"}],"ImageIsCircular":false},"Icons":[],"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/NavToProducts_Detail.action","StatusImage":"","Title":"{Name}","Footnote":"{CurrencyCode}","PreserveIconStackSpacing":false,"StatusText":"{DimensionDepth}","Subhead":"{Category}","SubstatusText":"{DimensionHeight}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Products","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Products_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderHeaders/PurchaseOrderHeaders_Create.page":
/*!***************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderHeaders/PurchaseOrderHeaders_Create.page ***!
  \***************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/PurchaseOrderHeaders_CreateEntity.action","Position":"Right","SystemItem":"Save"}]},"Caption":"$(L,Create_PurchaseOrderHeader_Detail)","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"CurrencyCode","_Name":"CurrencyCode","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"GrossAmount","KeyboardType":"Number","_Name":"GrossAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"NetAmount","KeyboardType":"Number","_Name":"NetAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"PurchaseOrderID","KeyboardType":"Number","_Name":"PurchaseOrderID","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SupplierID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{SupplierName}","ReturnValue":"{SupplierID}","Target":{"EntitySet":"Suppliers","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service"}},"_Name":"SupplierID","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"TaxAmount","KeyboardType":"Number","_Name":"TaxAmount","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"PurchaseOrderHeaders_Create","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderHeaders/PurchaseOrderHeaders_CreatePurchaseOrderItem.page":
/*!********************************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderHeaders/PurchaseOrderHeaders_CreatePurchaseOrderItem.page ***!
  \********************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/PurchaseOrderHeaders_CreatePurchaseOrderItem.action","Position":"Right","SystemItem":"Save"}]},"Caption":"$(L,Create_PurchaseOrderItem)","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"CurrencyCode","_Name":"CurrencyCode","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"GrossAmount","KeyboardType":"Number","_Name":"GrossAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ItemNumber","KeyboardType":"Number","_Name":"ItemNumber","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"NetAmount","KeyboardType":"Number","_Name":"NetAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ProductID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{Name}","ReturnValue":"{ProductID}","Target":{"EntitySet":"Products","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service"}},"_Name":"ProductID","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"PurchaseOrderID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":false,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{PurchaseOrderID}","ReturnValue":"{PurchaseOrderID}","Target":{"EntitySet":"PurchaseOrderHeaders","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service"}},"_Name":"PurchaseOrderID","_Type":"Control.Type.FormCell.ListPicker","Value":"{PurchaseOrderID}"},{"Caption":"Quantity","KeyboardType":"Number","_Name":"Quantity","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"QuantityUnit","_Name":"QuantityUnit","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"TaxAmount","KeyboardType":"Number","_Name":"TaxAmount","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"PurchaseOrderHeaders_CreatePurchaseOrderItem","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderHeaders/PurchaseOrderHeaders_Detail.page":
/*!***************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderHeaders/PurchaseOrderHeaders_Detail.page ***!
  \***************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"$(L,PurchaseOrderHeader_Detail)","DesignTimeTarget":{"Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service","EntitySet":"PurchaseOrderHeaders","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Edit.action","Position":"Right","SystemItem":"Edit"},{"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/PurchaseOrderHeaders_DetailPopover.action","Position":"Right","Caption":"More"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{PurchaseOrderID}","Subhead":"{CurrencyCode}","BodyText":"","Footnote":"{NetAmount}","Description":"{GrossAmount}","StatusText":"{SupplierID}","StatusImage":"","SubstatusImage":"","SubstatusText":"{TaxAmount}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"CurrencyCode","Value":"{CurrencyCode}"},{"KeyName":"GrossAmount","Value":"{GrossAmount}"},{"KeyName":"NetAmount","Value":"{NetAmount}"},{"KeyName":"PurchaseOrderID","Value":"{PurchaseOrderID}"},{"KeyName":"SupplierID","Value":"{SupplierID}"},{"KeyName":"TaxAmount","Value":"{TaxAmount}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"Items","_Type":"SectionCommon.Type.Header"},"ObjectCell":{"AccessoryType":"DisclosureIndicator","Description":"{GrossAmount}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{ProductID}","Footnote":"{ItemNumber}","PreserveIconStackSpacing":false,"StatusText":"{NetAmount}","Subhead":"{CurrencyCode}","SubstatusText":"{PurchaseOrderID}","OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/Items","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service"},"_Type":"Section.Type.ObjectTable"}],"DataSubscriptions":["PurchaseOrderItems"],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"PurchaseOrderHeaders_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderHeaders/PurchaseOrderHeaders_Edit.page":
/*!*************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderHeaders/PurchaseOrderHeaders_Edit.page ***!
  \*************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"$(L,Update_PurchaseOrderHeader_Detail)","DesignTimeTarget":{"Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service","EntitySet":"PurchaseOrderHeaders","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","SystemItem":"Cancel","OnPress":"/MDKApp/Actions/CloseModalPage_Cancel.action"},{"Position":"Right","SystemItem":"Save","OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/PurchaseOrderHeaders_UpdateEntity.action"}]},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"CurrencyCode","_Name":"CurrencyCode","Value":"{CurrencyCode}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"GrossAmount","_Name":"GrossAmount","Value":"{GrossAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"NetAmount","_Name":"NetAmount","Value":"{NetAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"PurchaseOrderID","_Name":"PurchaseOrderID","Value":"{PurchaseOrderID}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty","IsEditable":false},{"Caption":"SupplierID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{SupplierName}","ReturnValue":"{SupplierID}","Target":{"EntitySet":"Suppliers","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service"}},"Value":"{SupplierID}","_Name":"SupplierID","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"TaxAmount","_Name":"TaxAmount","Value":"{TaxAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"PurchaseOrderHeaders_Edit","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderHeaders/PurchaseOrderHeaders_List.page":
/*!*************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderHeaders/PurchaseOrderHeaders_List.page ***!
  \*************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"$(L,PurchaseOrderHeaders)","ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Create.action","Position":"Right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false,"_Type":"SectionCommon.Type.Header"},"ObjectCell":{"AccessoryType":"DisclosureIndicator","Description":"{GrossAmount}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Detail.action","StatusImage":"","Title":"{PurchaseOrderID}","Footnote":"{NetAmount}","PreserveIconStackSpacing":false,"StatusText":"{SupplierID}","Subhead":"{CurrencyCode}","SubstatusText":"{TaxAmount}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"PurchaseOrderHeaders","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"PurchaseOrderHeaders_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderItems/PurchaseOrderItems_Create.page":
/*!***********************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderItems/PurchaseOrderItems_Create.page ***!
  \***********************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderItems/PurchaseOrderItems_CreateEntity.action","Position":"Right","SystemItem":"Save"}]},"Caption":"$(L,Create_PurchaseOrderItem_Detail)","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"CurrencyCode","_Name":"CurrencyCode","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"GrossAmount","KeyboardType":"Number","_Name":"GrossAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ItemNumber","KeyboardType":"Number","_Name":"ItemNumber","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"NetAmount","KeyboardType":"Number","_Name":"NetAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ProductID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{Name}","ReturnValue":"{ProductID}","Target":{"EntitySet":"Products","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service"}},"_Name":"ProductID","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"PurchaseOrderID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{PurchaseOrderID}","ReturnValue":"{PurchaseOrderID}","Target":{"EntitySet":"PurchaseOrderHeaders","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service"}},"_Name":"PurchaseOrderID","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"Quantity","KeyboardType":"Number","_Name":"Quantity","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"QuantityUnit","_Name":"QuantityUnit","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"TaxAmount","KeyboardType":"Number","_Name":"TaxAmount","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"PurchaseOrderItems_Create","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderItems/PurchaseOrderItems_Detail.page":
/*!***********************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderItems/PurchaseOrderItems_Detail.page ***!
  \***********************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"$(L,PurchaseOrderItem_Detail)","DesignTimeTarget":{"Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service","EntitySet":"PurchaseOrderItems","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderItems/NavToPurchaseOrderItems_Edit.action","Position":"Right","SystemItem":"Edit"},{"OnPress":"/MDKApp/Rules/com_sap_edm_sampleservice_v4/PurchaseOrderItems/PurchaseOrderItems_DeleteConfirmation.js","Position":"Right","SystemItem":"Trash"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{ProductID}","Subhead":"{CurrencyCode}","BodyText":"","Footnote":"{ItemNumber}","Description":"{GrossAmount}","StatusText":"{NetAmount}","StatusImage":"","SubstatusImage":"","SubstatusText":"{PurchaseOrderID}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"CurrencyCode","Value":"{CurrencyCode}"},{"KeyName":"GrossAmount","Value":"{GrossAmount}"},{"KeyName":"ItemNumber","Value":"{ItemNumber}"},{"KeyName":"NetAmount","Value":"{NetAmount}"},{"KeyName":"ProductID","Value":"{ProductID}"},{"KeyName":"PurchaseOrderID","Value":"{PurchaseOrderID}"},{"KeyName":"Quantity","Value":"{Quantity}"},{"KeyName":"QuantityUnit","Value":"{QuantityUnit}"},{"KeyName":"TaxAmount","Value":"{TaxAmount}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"PurchaseOrderItems_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderItems/PurchaseOrderItems_Edit.page":
/*!*********************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderItems/PurchaseOrderItems_Edit.page ***!
  \*********************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"$(L,Update_PurchaseOrderItem_Detail)","DesignTimeTarget":{"Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service","EntitySet":"PurchaseOrderItems","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","SystemItem":"Cancel","OnPress":"/MDKApp/Actions/CloseModalPage_Cancel.action"},{"Position":"Right","SystemItem":"Save","OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderItems/PurchaseOrderItems_UpdateEntity.action"}]},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"CurrencyCode","_Name":"CurrencyCode","Value":"{CurrencyCode}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"GrossAmount","_Name":"GrossAmount","Value":"{GrossAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ItemNumber","_Name":"ItemNumber","Value":"{ItemNumber}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty","IsEditable":false},{"Caption":"NetAmount","_Name":"NetAmount","Value":"{NetAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ProductID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{Name}","ReturnValue":"{ProductID}","Target":{"EntitySet":"Products","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service"}},"Value":"{ProductID}","_Name":"ProductID","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"PurchaseOrderID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{PurchaseOrderID}","ReturnValue":"{PurchaseOrderID}","Target":{"EntitySet":"PurchaseOrderHeaders","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service"}},"Value":"{PurchaseOrderID}","_Name":"PurchaseOrderID","_Type":"Control.Type.FormCell.ListPicker","IsEditable":false},{"Caption":"Quantity","_Name":"Quantity","Value":"{Quantity}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"QuantityUnit","_Name":"QuantityUnit","Value":"{QuantityUnit}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"TaxAmount","_Name":"TaxAmount","Value":"{TaxAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"PurchaseOrderItems_Edit","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderItems/PurchaseOrderItems_List.page":
/*!*********************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderItems/PurchaseOrderItems_List.page ***!
  \*********************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"$(L,PurchaseOrderItems)","ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderItems/NavToPurchaseOrderItems_Create.action","Position":"Right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false,"_Type":"SectionCommon.Type.Header"},"ObjectCell":{"AccessoryType":"DisclosureIndicator","Description":"{GrossAmount}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action","StatusImage":"","Title":"{ProductID}","Footnote":"{ItemNumber}","PreserveIconStackSpacing":false,"StatusText":"{NetAmount}","Subhead":"{CurrencyCode}","SubstatusText":"{PurchaseOrderID}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"PurchaseOrderItems","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"PurchaseOrderItems_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderHeaders/SalesOrderHeaders_Create.page":
/*!*********************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderHeaders/SalesOrderHeaders_Create.page ***!
  \*********************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/SalesOrderHeaders_CreateEntity.action","Position":"Right","SystemItem":"Save"}]},"Caption":"$(L,Create_SalesOrderHeader_Detail)","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Mode":"Datetime","_Name":"CreatedAt","Caption":"CreatedAt","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"CurrencyCode","_Name":"CurrencyCode","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CustomerID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{CustomerID}","ReturnValue":"{CustomerID}","Target":{"EntitySet":"Customers","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service"}},"_Name":"CustomerID","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"GrossAmount","KeyboardType":"Number","_Name":"GrossAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LifeCycleStatus","_Name":"LifeCycleStatus","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LifeCycleStatusName","_Name":"LifeCycleStatusName","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"NetAmount","KeyboardType":"Number","_Name":"NetAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SalesOrderID","KeyboardType":"Number","_Name":"SalesOrderID","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"TaxAmount","KeyboardType":"Number","_Name":"TaxAmount","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"SalesOrderHeaders_Create","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderHeaders/SalesOrderHeaders_CreateSalesOrderItem.page":
/*!***********************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderHeaders/SalesOrderHeaders_CreateSalesOrderItem.page ***!
  \***********************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/SalesOrderHeaders_CreateSalesOrderItem.action","Position":"Right","SystemItem":"Save"}]},"Caption":"$(L,Create_SalesOrderItem)","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"CurrencyCode","_Name":"CurrencyCode","_Type":"Control.Type.FormCell.SimpleProperty"},{"Mode":"Date","_Name":"DeliveryDate","Caption":"DeliveryDate","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"GrossAmount","KeyboardType":"Number","_Name":"GrossAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ItemNumber","KeyboardType":"Number","_Name":"ItemNumber","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"NetAmount","KeyboardType":"Number","_Name":"NetAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ProductID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{Name}","ReturnValue":"{ProductID}","Target":{"EntitySet":"Products","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service"}},"_Name":"ProductID","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"Quantity","KeyboardType":"Number","_Name":"Quantity","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"QuantityUnit","_Name":"QuantityUnit","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SalesOrderID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":false,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{SalesOrderID}","ReturnValue":"{SalesOrderID}","Target":{"EntitySet":"SalesOrderHeaders","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service"}},"_Name":"SalesOrderID","_Type":"Control.Type.FormCell.ListPicker","Value":"{SalesOrderID}"},{"Caption":"TaxAmount","KeyboardType":"Number","_Name":"TaxAmount","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"SalesOrderHeaders_CreateSalesOrderItem","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderHeaders/SalesOrderHeaders_Detail.page":
/*!*********************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderHeaders/SalesOrderHeaders_Detail.page ***!
  \*********************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"$(L,SalesOrderHeader_Detail)","DesignTimeTarget":{"Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service","EntitySet":"SalesOrderHeaders","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/NavToSalesOrderHeaders_Edit.action","Position":"Right","SystemItem":"Edit"},{"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/SalesOrderHeaders_DetailPopover.action","Position":"Right","Caption":"More"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{LifeCycleStatusName}","Subhead":"{CreatedAt}","BodyText":"","Footnote":"{CustomerID}","Description":"{CurrencyCode}","StatusText":"{GrossAmount}","StatusImage":"","SubstatusImage":"","SubstatusText":"{LifeCycleStatus}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"CreatedAt","Value":"{CreatedAt}"},{"KeyName":"CurrencyCode","Value":"{CurrencyCode}"},{"KeyName":"CustomerID","Value":"{CustomerID}"},{"KeyName":"GrossAmount","Value":"{GrossAmount}"},{"KeyName":"LifeCycleStatus","Value":"{LifeCycleStatus}"},{"KeyName":"LifeCycleStatusName","Value":"{LifeCycleStatusName}"},{"KeyName":"NetAmount","Value":"{NetAmount}"},{"KeyName":"SalesOrderID","Value":"{SalesOrderID}"},{"KeyName":"TaxAmount","Value":"{TaxAmount}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"Items","_Type":"SectionCommon.Type.Header"},"ObjectCell":{"AccessoryType":"DisclosureIndicator","Description":"{DeliveryDate}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{ProductID}","Footnote":"{GrossAmount}","PreserveIconStackSpacing":false,"StatusText":"{ItemNumber}","Subhead":"{CurrencyCode}","SubstatusText":"{NetAmount}","OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderItems/NavToSalesOrderItems_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/Items","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service"},"_Type":"Section.Type.ObjectTable"}],"DataSubscriptions":["SalesOrderItems"],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"SalesOrderHeaders_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderHeaders/SalesOrderHeaders_Edit.page":
/*!*******************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderHeaders/SalesOrderHeaders_Edit.page ***!
  \*******************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"$(L,Update_SalesOrderHeader_Detail)","DesignTimeTarget":{"Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service","EntitySet":"SalesOrderHeaders","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","SystemItem":"Cancel","OnPress":"/MDKApp/Actions/CloseModalPage_Cancel.action"},{"Position":"Right","SystemItem":"Save","OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/SalesOrderHeaders_UpdateEntity.action"}]},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Mode":"Datetime","_Name":"CreatedAt","Value":"{CreatedAt}","Caption":"CreatedAt","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"CurrencyCode","_Name":"CurrencyCode","Value":"{CurrencyCode}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CustomerID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{CustomerID}","ReturnValue":"{CustomerID}","Target":{"EntitySet":"Customers","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service"}},"Value":"{CustomerID}","_Name":"CustomerID","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"GrossAmount","_Name":"GrossAmount","Value":"{GrossAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LifeCycleStatus","_Name":"LifeCycleStatus","Value":"{LifeCycleStatus}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LifeCycleStatusName","_Name":"LifeCycleStatusName","Value":"{LifeCycleStatusName}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"NetAmount","_Name":"NetAmount","Value":"{NetAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SalesOrderID","_Name":"SalesOrderID","Value":"{SalesOrderID}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty","IsEditable":false},{"Caption":"TaxAmount","_Name":"TaxAmount","Value":"{TaxAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"SalesOrderHeaders_Edit","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderHeaders/SalesOrderHeaders_List.page":
/*!*******************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderHeaders/SalesOrderHeaders_List.page ***!
  \*******************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"$(L,SalesOrderHeaders)","ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/NavToSalesOrderHeaders_Create.action","Position":"Right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false,"_Type":"SectionCommon.Type.Header"},"ObjectCell":{"AccessoryType":"DisclosureIndicator","Description":"{CurrencyCode}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action","StatusImage":"","Title":"{LifeCycleStatusName}","Footnote":"{CustomerID}","PreserveIconStackSpacing":false,"StatusText":"{GrossAmount}","Subhead":"{CreatedAt}","SubstatusText":"{LifeCycleStatus}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"SalesOrderHeaders","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"SalesOrderHeaders_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderItems/SalesOrderItems_Create.page":
/*!*****************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderItems/SalesOrderItems_Create.page ***!
  \*****************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderItems/SalesOrderItems_CreateEntity.action","Position":"Right","SystemItem":"Save"}]},"Caption":"$(L,Create_SalesOrderItem_Detail)","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"CurrencyCode","_Name":"CurrencyCode","_Type":"Control.Type.FormCell.SimpleProperty"},{"Mode":"Date","_Name":"DeliveryDate","Caption":"DeliveryDate","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"GrossAmount","KeyboardType":"Number","_Name":"GrossAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ItemNumber","KeyboardType":"Number","_Name":"ItemNumber","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"NetAmount","KeyboardType":"Number","_Name":"NetAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ProductID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{Name}","ReturnValue":"{ProductID}","Target":{"EntitySet":"Products","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service"}},"_Name":"ProductID","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"Quantity","KeyboardType":"Number","_Name":"Quantity","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"QuantityUnit","_Name":"QuantityUnit","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SalesOrderID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{SalesOrderID}","ReturnValue":"{SalesOrderID}","Target":{"EntitySet":"SalesOrderHeaders","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service"}},"_Name":"SalesOrderID","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"TaxAmount","KeyboardType":"Number","_Name":"TaxAmount","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"SalesOrderItems_Create","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderItems/SalesOrderItems_Detail.page":
/*!*****************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderItems/SalesOrderItems_Detail.page ***!
  \*****************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"$(L,SalesOrderItem_Detail)","DesignTimeTarget":{"Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service","EntitySet":"SalesOrderItems","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderItems/NavToSalesOrderItems_Edit.action","Position":"Right","SystemItem":"Edit"},{"OnPress":"/MDKApp/Rules/com_sap_edm_sampleservice_v4/SalesOrderItems/SalesOrderItems_DeleteConfirmation.js","Position":"Right","SystemItem":"Trash"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{ProductID}","Subhead":"{CurrencyCode}","BodyText":"","Footnote":"{GrossAmount}","Description":"{DeliveryDate}","StatusText":"{ItemNumber}","StatusImage":"","SubstatusImage":"","SubstatusText":"{NetAmount}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"CurrencyCode","Value":"{CurrencyCode}"},{"KeyName":"DeliveryDate","Value":"{DeliveryDate}"},{"KeyName":"GrossAmount","Value":"{GrossAmount}"},{"KeyName":"ItemNumber","Value":"{ItemNumber}"},{"KeyName":"NetAmount","Value":"{NetAmount}"},{"KeyName":"ProductID","Value":"{ProductID}"},{"KeyName":"Quantity","Value":"{Quantity}"},{"KeyName":"QuantityUnit","Value":"{QuantityUnit}"},{"KeyName":"SalesOrderID","Value":"{SalesOrderID}"},{"KeyName":"TaxAmount","Value":"{TaxAmount}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"SalesOrderItems_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderItems/SalesOrderItems_Edit.page":
/*!***************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderItems/SalesOrderItems_Edit.page ***!
  \***************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"$(L,Update_SalesOrderItem_Detail)","DesignTimeTarget":{"Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service","EntitySet":"SalesOrderItems","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","SystemItem":"Cancel","OnPress":"/MDKApp/Actions/CloseModalPage_Cancel.action"},{"Position":"Right","SystemItem":"Save","OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderItems/SalesOrderItems_UpdateEntity.action"}]},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"CurrencyCode","_Name":"CurrencyCode","Value":"{CurrencyCode}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Mode":"Date","_Name":"DeliveryDate","Value":"{DeliveryDate}","Caption":"DeliveryDate","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"GrossAmount","_Name":"GrossAmount","Value":"{GrossAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ItemNumber","_Name":"ItemNumber","Value":"{ItemNumber}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty","IsEditable":false},{"Caption":"NetAmount","_Name":"NetAmount","Value":"{NetAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ProductID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{Name}","ReturnValue":"{ProductID}","Target":{"EntitySet":"Products","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service"}},"Value":"{ProductID}","_Name":"ProductID","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"Quantity","_Name":"Quantity","Value":"{Quantity}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"QuantityUnit","_Name":"QuantityUnit","Value":"{QuantityUnit}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SalesOrderID","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{SalesOrderID}","ReturnValue":"{SalesOrderID}","Target":{"EntitySet":"SalesOrderHeaders","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service"}},"Value":"{SalesOrderID}","_Name":"SalesOrderID","_Type":"Control.Type.FormCell.ListPicker","IsEditable":false},{"Caption":"TaxAmount","_Name":"TaxAmount","Value":"{TaxAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"SalesOrderItems_Edit","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderItems/SalesOrderItems_List.page":
/*!***************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderItems/SalesOrderItems_List.page ***!
  \***************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"$(L,SalesOrderItems)","ActionBar":{"Items":[{"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderItems/NavToSalesOrderItems_Create.action","Position":"Right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false,"_Type":"SectionCommon.Type.Header"},"ObjectCell":{"AccessoryType":"DisclosureIndicator","Description":"{DeliveryDate}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderItems/NavToSalesOrderItems_Detail.action","StatusImage":"","Title":"{ProductID}","Footnote":"{GrossAmount}","PreserveIconStackSpacing":false,"StatusText":"{ItemNumber}","Subhead":"{CurrencyCode}","SubstatusText":"{NetAmount}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"SalesOrderItems","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"SalesOrderItems_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"_Name":"MDKApp","Version":"/MDKApp/Globals/Application/AppDefinition_Version.global","MainPage":"/MDKApp/Pages/Main.page","OnLaunch":"/MDKApp/Rules/Service/Initialize.js","OnWillUpdate":"/MDKApp/Rules/Application/OnWillUpdate.js","OnDidUpdate":"/MDKApp/Rules/Service/Initialize.js","Styles":"/MDKApp/Styles/Styles.less","Localization":"/MDKApp/i18n/i18n.properties","_SchemaVersion":"24.7","StyleSheets":{"Styles":{"css":"/MDKApp/Styles/Styles.css","ios":"/MDKApp/Styles/Styles.nss","android":"/MDKApp/Styles/Styles.json"}}}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Application/AppUpdate.action":
/*!***********************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Application/AppUpdate.action ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/MDKApp/Rules/Application/AppUpdateFailure.js","OnSuccess":"/MDKApp/Rules/Application/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Application/AppUpdateFailureMessage.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Application/AppUpdateFailureMessage.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Application/AppUpdateProgressBanner.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Application/AppUpdateProgressBanner.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/MDKApp/Actions/Application/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Application/AppUpdateSuccessMessage.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Application/AppUpdateSuccessMessage.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Application/Logout.action":
/*!********************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Application/Logout.action ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logout","SkipReset":true}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Application/NavToAbout.action":
/*!************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Application/NavToAbout.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"PageToOpen":"/MDKApp/Pages/Application/About.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Application/NavToActivityLog.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Application/NavToActivityLog.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"PageToOpen":"/MDKApp/Pages/Application/UserActivityLog.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Application/NavToSupport.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Application/NavToSupport.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"NavigationType":"Cross","PageToOpen":"/MDKApp/Pages/Application/Support.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Application/OnWillUpdate.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Application/OnWillUpdate.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Application/Reset.action":
/*!*******************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Application/Reset.action ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logout","SkipReset":false}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Application/ResetMessage.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Application/ResetMessage.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","Title":"Reset","OKCaption":"Yes","OnOK":"/MDKApp/Rules/Application/ResetAppSettingsAndLogout.js","CancelCaption":"No"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Application/UserMenuPopover.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Application/UserMenuPopover.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Enabled":true,"Icon":"sap-icon://synchronize","OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/SyncStartedMessage.action","Title":"Sync Changes","Visible":"$(PLT,true,true,false)"},{"Enabled":true,"Icon":"sap-icon://headset","OnPress":"/MDKApp/Actions/Application/NavToSupport.action","Title":"Support","Visible":true},{"Enabled":true,"Icon":"sap-icon://refresh","OnPress":"/MDKApp/Actions/Application/AppUpdateProgressBanner.action","Title":"Check for Updates","Visible":"$(PLT,true,true,false)"},{"Enabled":true,"Icon":"sap-icon://hint","OnPress":"/MDKApp/Actions/Application/NavToAbout.action","Title":"About","Visible":true},{"Enabled":true,"Icon":"sap-icon://reset","OnPress":"/MDKApp/Actions/Application/ResetMessage.action","Title":"Reset","Visible":true},{"Enabled":true,"Icon":"sap-icon://log","OnPress":"/MDKApp/Actions/Application/Logout.action","Title":"Logout","Visible":"/MDKApp/Rules/Application/ClientIsMultiUserMode.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/CloseModalPage_Cancel.action":
/*!***********************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/CloseModalPage_Cancel.action ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/CloseModalPage_Complete.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/CloseModalPage_Complete.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/ClosePage.action":
/*!***********************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/ClosePage.action ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/CreateEntityFailureMessage.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/CreateEntityFailureMessage.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Create entity failure - {#ActionResults:create/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/CreateEntitySuccessMessage.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/CreateEntitySuccessMessage.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity created","IsIconHidden":true,"OnSuccess":"/MDKApp/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/DeleteConfirmation.action":
/*!********************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/DeleteConfirmation.action ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"Delete current entity?","Title":"Confirmation","OKCaption":"OK","CancelCaption":"Cancel","ActionResult":{"_Name":"DeleteConfirmation"}}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/DeleteEntityFailureMessage.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/DeleteEntityFailureMessage.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Delete entity failure - {#ActionResults:delete/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/DeleteEntitySuccessMessage.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/DeleteEntitySuccessMessage.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity deleted","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/MDKApp/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","Message":"Upload failed!","Duration":0,"Animated":false,"OnActionLabelPress":"/MDKApp/Actions/ErrorArchive/NavToErrorArchive_List.action","ActionLabel":"View Errors"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDKApp/Pages/ErrorArchive/ErrorArchive_Detail.page","NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/ErrorArchive/NavToErrorArchive_List.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/ErrorArchive/NavToErrorArchive_List.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDKApp/Pages/ErrorArchive/ErrorArchive_List.page","NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/GenericBannerMessage.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/GenericBannerMessage.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","ActionResult":{"_Name":"GenericBannerMessage"},"Message":"Message"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/GenericMessageBox.action":
/*!*******************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/GenericMessageBox.action ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"GenericMessageBox"},"Message":"Message","OKCaption":"OK"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/GenericNavigation.action":
/*!*******************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/GenericNavigation.action ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"GenericNavigation"},"PageToOpen":"/MDKApp/Pages/Main.page"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/GenericToastMessage.action":
/*!*********************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/GenericToastMessage.action ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ToastMessage","ActionResult":{"_Name":"GenericToastMessage"},"Message":"Message"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Logging/LogUploadFailure.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Logging/LogUploadFailure.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Uploading log file failed with error: {#ActionResults:UploadLog/error}","OKCaption":"OK","Title":"Log Upload Failed","_Type":"Action.Type.Message"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Logging/LogUploadSuccessful.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Logging/LogUploadSuccessful.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":3,"IsIconHidden":false,"MaxNumberOfLines":1,"Message":"Log File Uploaded","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Logging/UploadLog.action":
/*!*******************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Logging/UploadLog.action ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = {"ActionResult":{"_Name":"UploadLog"},"ActivityIndicatorText":"Uploading...","OnFailure":"/MDKApp/Actions/Logging/LogUploadFailure.action","OnSuccess":"/MDKApp/Actions/Logging/LogUploadSuccessful.action","ShowActivityIndicator":false,"_Type":"Action.Type.Logger.Upload"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/Logging/UploadLogProgress.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/Logging/UploadLogProgress.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionMessage":"Logs Uploaded","CompletionTimeout":2,"Message":"Uploading Log Files...","OnSuccess":"/MDKApp/Actions/Logging/UploadLog.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/UpdateEntityFailureMessage.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/UpdateEntityFailureMessage.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Update entity failure - {#ActionResults:update/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/UpdateEntitySuccessMessage.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/UpdateEntitySuccessMessage.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity updated","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/MDKApp/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/UploadStreamFailureMessage.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/UploadStreamFailureMessage.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Upload stream failure - {#ActionResults:uploadstream/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/UploadStreamSuccessMessage.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/UploadStreamSuccessMessage.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Stream uploaded","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/MDKApp/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/CloseOffline.action":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/CloseOffline.action ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OfflineOData.Close","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v2.service","Force":true,"ActionResult":{"_Name":"close"},"OnSuccess":"/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/CloseOfflineSuccessMessage.action","OnFailure":"/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/CloseOfflineFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/CloseOfflineFailureMessage.action":
/*!*****************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/CloseOfflineFailureMessage.action ***!
  \*****************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failure closing data service - {#ActionResults:close/error}","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/CloseOfflineSuccessMessage.action":
/*!*****************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/CloseOfflineSuccessMessage.action ***!
  \*****************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Data service closed successfully","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/DownloadOffline.action":
/*!******************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/DownloadOffline.action ***!
  \******************************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MDKApp/Services/com_sap_edm_sampleservice_v2.service","DefiningRequests":[],"_Type":"Action.Type.OfflineOData.Download","ActionResult":{"_Name":"sync"},"OnFailure":"/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/SyncFailureMessage.action","OnSuccess":"/MDKApp/Rules/com_sap_edm_sampleservice_v2/ErrorArchive_CheckForSyncError.js"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/DownloadStartedMessage.action":
/*!*************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/DownloadStartedMessage.action ***!
  \*************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Download in progress...","CompletionMessage":"Download Successful","CompletionTimeout":7,"OnSuccess":"/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/DownloadOffline.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/InitializeOffline.action":
/*!********************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/InitializeOffline.action ***!
  \********************************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MDKApp/Services/com_sap_edm_sampleservice_v2.service","DefiningRequests":[],"_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"ActivityIndicatorText":"Downloading...","ActionResult":{"_Name":"init"},"OnFailure":"/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/InitializeOfflineFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/InitializeOfflineFailureMessage.action":
/*!**********************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/InitializeOfflineFailureMessage.action ***!
  \**********************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/SyncFailureMessage.action":
/*!*********************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/SyncFailureMessage.action ***!
  \*********************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Sync offline data service failure - {#ActionResults:sync/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/SyncStartedMessage.action":
/*!*********************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/SyncStartedMessage.action ***!
  \*********************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Upload in progress...","CompletionMessage":"Sync completed","CompletionTimeout":7,"OnSuccess":"/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/UploadOffline.action","OnFailure":"/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/SyncFailureMessage.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/UploadOffline.action":
/*!****************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/UploadOffline.action ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MDKApp/Services/com_sap_edm_sampleservice_v2.service","_Type":"Action.Type.OfflineOData.Upload","ActionResult":{"_Name":"sync"},"OnSuccess":"/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/DownloadStartedMessage.action","OnFailure":"/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/SyncFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/Customers_CreateEntity.action":
/*!***************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/Customers_CreateEntity.action ***!
  \***************************************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/MDKApp/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MDKApp/Actions/CreateEntitySuccessMessage.action","Properties":{"City":"#Control:City/#Value","Country":"#Control:Country/#Value","CustomerID":"#Control:CustomerID/#Value","DateOfBirth":"#Control:DateOfBirth/#Value","EmailAddress":"#Control:EmailAddress/#Value","FirstName":"#Control:FirstName/#Value","HouseNumber":"#Control:HouseNumber/#Value","LastName":"#Control:LastName/#Value","PhoneNumber":"#Control:PhoneNumber/#Value","PostalCode":"#Control:PostalCode/#Value","Street":"#Control:Street/#Value"},"Target":{"EntitySet":"Customers","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/Customers_CreateSalesOrderHeader.action":
/*!*************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/Customers_CreateSalesOrderHeader.action ***!
  \*************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ParentLink":{"Property":"SalesOrders","Target":{"EntitySet":"Customers","ReadLink":"{@odata.readLink}"}},"OnFailure":"/MDKApp/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MDKApp/Actions/CreateEntitySuccessMessage.action","Properties":{"CreatedAt":"#Control:CreatedAt/#Value","CurrencyCode":"#Control:CurrencyCode/#Value","CustomerID":"#Control:CustomerID/#SelectedValue","GrossAmount":"#Control:GrossAmount/#Value","LifeCycleStatus":"#Control:LifeCycleStatus/#Value","LifeCycleStatusName":"#Control:LifeCycleStatusName/#Value","NetAmount":"#Control:NetAmount/#Value","SalesOrderID":"#Control:SalesOrderID/#Value","TaxAmount":"#Control:TaxAmount/#Value"},"Target":{"EntitySet":"SalesOrderHeaders","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateRelatedEntity"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/Customers_DeleteEntity.action":
/*!***************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/Customers_DeleteEntity.action ***!
  \***************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"Customers","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/MDKApp/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/MDKApp/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/Customers_DetailPopover.action":
/*!****************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/Customers_DetailPopover.action ***!
  \****************************************************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Title":"Add SalesOrderHeader","OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/NavToCustomers_CreateSalesOrderHeader.action"},{"Title":"Delete","OnPress":"/MDKApp/Rules/com_sap_edm_sampleservice_v4/Customers/Customers_DeleteConfirmation.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/Customers_UpdateEntity.action":
/*!***************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/Customers_UpdateEntity.action ***!
  \***************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"Customers","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service","ReadLink":"{@odata.readLink}"},"Properties":{"City":"#Control:City/#Value","Country":"#Control:Country/#Value","CustomerID":"#Control:CustomerID/#Value","DateOfBirth":"#Control:DateOfBirth/#Value","EmailAddress":"#Control:EmailAddress/#Value","FirstName":"#Control:FirstName/#Value","HouseNumber":"#Control:HouseNumber/#Value","LastName":"#Control:LastName/#Value","PhoneNumber":"#Control:PhoneNumber/#Value","PostalCode":"#Control:PostalCode/#Value","Street":"#Control:Street/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/MDKApp/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/MDKApp/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/NavToCustomers_Create.action":
/*!**************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/NavToCustomers_Create.action ***!
  \**************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDKApp/Pages/com_sap_edm_sampleservice_v4_Customers/Customers_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/NavToCustomers_CreateSalesOrderHeader.action":
/*!******************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/NavToCustomers_CreateSalesOrderHeader.action ***!
  \******************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDKApp/Pages/com_sap_edm_sampleservice_v4_Customers/Customers_CreateSalesOrderHeader.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/NavToCustomers_Detail.action":
/*!**************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/NavToCustomers_Detail.action ***!
  \**************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDKApp/Pages/com_sap_edm_sampleservice_v4_Customers/Customers_Detail.page"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/NavToCustomers_Edit.action":
/*!************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/NavToCustomers_Edit.action ***!
  \************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDKApp/Pages/com_sap_edm_sampleservice_v4_Customers/Customers_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/NavToCustomers_List.action":
/*!************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Customers/NavToCustomers_List.action ***!
  \************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDKApp/Pages/com_sap_edm_sampleservice_v4_Customers/Customers_List.page"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/NavToProducts_Create.action":
/*!************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/NavToProducts_Create.action ***!
  \************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDKApp/Pages/com_sap_edm_sampleservice_v4_Products/Products_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/NavToProducts_CreatePurchaseOrderItem.action":
/*!*****************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/NavToProducts_CreatePurchaseOrderItem.action ***!
  \*****************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDKApp/Pages/com_sap_edm_sampleservice_v4_Products/Products_CreatePurchaseOrderItem.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/NavToProducts_CreateSalesOrderItem.action":
/*!**************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/NavToProducts_CreateSalesOrderItem.action ***!
  \**************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDKApp/Pages/com_sap_edm_sampleservice_v4_Products/Products_CreateSalesOrderItem.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/NavToProducts_Detail.action":
/*!************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/NavToProducts_Detail.action ***!
  \************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDKApp/Pages/com_sap_edm_sampleservice_v4_Products/Products_Detail.page"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/NavToProducts_Edit.action":
/*!**********************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/NavToProducts_Edit.action ***!
  \**********************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDKApp/Pages/com_sap_edm_sampleservice_v4_Products/Products_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/NavToProducts_List.action":
/*!**********************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/NavToProducts_List.action ***!
  \**********************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDKApp/Pages/com_sap_edm_sampleservice_v4_Products/Products_List.page"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/Products_CreateEntity.action":
/*!*************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/Products_CreateEntity.action ***!
  \*************************************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/MDKApp/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MDKApp/Actions/CreateEntitySuccessMessage.action","Properties":{"Category":"#Control:Category/#Value","CategoryName":"#Control:CategoryName/#Value","CurrencyCode":"#Control:CurrencyCode/#Value","DimensionDepth":"#Control:DimensionDepth/#Value","DimensionHeight":"#Control:DimensionHeight/#Value","DimensionUnit":"#Control:DimensionUnit/#Value","DimensionWidth":"#Control:DimensionWidth/#Value","LongDescription":"#Control:LongDescription/#Value","Name":"#Control:Name/#Value","PictureUrl":"#Control:PictureUrl/#Value","Price":"#Control:Price/#Value","ProductID":"#Control:ProductID/#Value","QuantityUnit":"#Control:QuantityUnit/#Value","ShortDescription":"#Control:ShortDescription/#Value","SupplierID":"#Control:SupplierID/#SelectedValue","Weight":"#Control:Weight/#Value","WeightUnit":"#Control:WeightUnit/#Value"},"Target":{"EntitySet":"Products","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/Products_CreatePurchaseOrderItem.action":
/*!************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/Products_CreatePurchaseOrderItem.action ***!
  \************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ParentLink":{"Property":"PurchaseOrderItems","Target":{"EntitySet":"Products","ReadLink":"{@odata.readLink}"}},"OnFailure":"/MDKApp/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MDKApp/Actions/CreateEntitySuccessMessage.action","Properties":{"CurrencyCode":"#Control:CurrencyCode/#Value","GrossAmount":"#Control:GrossAmount/#Value","ItemNumber":"#Control:ItemNumber/#Value","NetAmount":"#Control:NetAmount/#Value","ProductID":"#Control:ProductID/#SelectedValue","PurchaseOrderID":"#Control:PurchaseOrderID/#SelectedValue","Quantity":"#Control:Quantity/#Value","QuantityUnit":"#Control:QuantityUnit/#Value","TaxAmount":"#Control:TaxAmount/#Value"},"Target":{"EntitySet":"PurchaseOrderItems","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateRelatedEntity"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/Products_CreateSalesOrderItem.action":
/*!*********************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/Products_CreateSalesOrderItem.action ***!
  \*********************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ParentLink":{"Property":"SalesOrderItems","Target":{"EntitySet":"Products","ReadLink":"{@odata.readLink}"}},"OnFailure":"/MDKApp/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MDKApp/Actions/CreateEntitySuccessMessage.action","Properties":{"CurrencyCode":"#Control:CurrencyCode/#Value","DeliveryDate":"#Control:DeliveryDate/#Value","GrossAmount":"#Control:GrossAmount/#Value","ItemNumber":"#Control:ItemNumber/#Value","NetAmount":"#Control:NetAmount/#Value","ProductID":"#Control:ProductID/#SelectedValue","Quantity":"#Control:Quantity/#Value","QuantityUnit":"#Control:QuantityUnit/#Value","SalesOrderID":"#Control:SalesOrderID/#SelectedValue","TaxAmount":"#Control:TaxAmount/#Value"},"Target":{"EntitySet":"SalesOrderItems","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateRelatedEntity"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/Products_DeleteEntity.action":
/*!*************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/Products_DeleteEntity.action ***!
  \*************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"Products","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/MDKApp/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/MDKApp/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/Products_DetailPopover.action":
/*!**************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/Products_DetailPopover.action ***!
  \**************************************************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Title":"Open Document","OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/Products_OpenDocument.action"},{"Title":"Add PurchaseOrderItem","OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/NavToProducts_CreatePurchaseOrderItem.action"},{"Title":"Add SalesOrderItem","OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/NavToProducts_CreateSalesOrderItem.action"},{"Title":"Delete","OnPress":"/MDKApp/Rules/com_sap_edm_sampleservice_v4/Products/Products_DeleteConfirmation.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/Products_OpenDocument.action":
/*!*************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/Products_OpenDocument.action ***!
  \*************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OpenDocument","Path":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service/{@odata.readLink}/Picture","MimeType":"image/jpeg"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/Products_UpdateEntity.action":
/*!*************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/Products_UpdateEntity.action ***!
  \*************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"Products","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service","ReadLink":"{@odata.readLink}"},"Properties":{"Category":"#Control:Category/#Value","CategoryName":"#Control:CategoryName/#Value","CurrencyCode":"#Control:CurrencyCode/#Value","DimensionDepth":"#Control:DimensionDepth/#Value","DimensionHeight":"#Control:DimensionHeight/#Value","DimensionUnit":"#Control:DimensionUnit/#Value","DimensionWidth":"#Control:DimensionWidth/#Value","LongDescription":"#Control:LongDescription/#Value","Name":"#Control:Name/#Value","PictureUrl":"#Control:PictureUrl/#Value","Price":"#Control:Price/#Value","ProductID":"#Control:ProductID/#Value","QuantityUnit":"#Control:QuantityUnit/#Value","ShortDescription":"#Control:ShortDescription/#Value","SupplierID":"#Control:SupplierID/#SelectedValue","Weight":"#Control:Weight/#Value","WeightUnit":"#Control:WeightUnit/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/MDKApp/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/MDKApp/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/Products_UploadStream.action":
/*!*************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Products/Products_UploadStream.action ***!
  \*************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UploadStream","Target":{"Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service","EntitySet":"Products","ReadLink":"{@odata.readLink}"},"Properties":{"Picture":"#Control:Picture/#Value"},"ShowActivityIndicator":true,"ActionResult":{"_Name":"uploadstream"},"OnSuccess":"/MDKApp/Actions/UploadStreamSuccessMessage.action","OnFailure":"/MDKApp/Actions/UploadStreamFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Create.action":
/*!************************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Create.action ***!
  \************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderHeaders/PurchaseOrderHeaders_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_CreatePurchaseOrderItem.action":
/*!*****************************************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_CreatePurchaseOrderItem.action ***!
  \*****************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderHeaders/PurchaseOrderHeaders_CreatePurchaseOrderItem.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Detail.action":
/*!************************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Detail.action ***!
  \************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderHeaders/PurchaseOrderHeaders_Detail.page"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Edit.action":
/*!**********************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Edit.action ***!
  \**********************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderHeaders/PurchaseOrderHeaders_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_List.action":
/*!**********************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_List.action ***!
  \**********************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderHeaders/PurchaseOrderHeaders_List.page"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/PurchaseOrderHeaders_CreateEntity.action":
/*!*************************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/PurchaseOrderHeaders_CreateEntity.action ***!
  \*************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/MDKApp/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MDKApp/Actions/CreateEntitySuccessMessage.action","Properties":{"CurrencyCode":"#Control:CurrencyCode/#Value","GrossAmount":"#Control:GrossAmount/#Value","NetAmount":"#Control:NetAmount/#Value","PurchaseOrderID":"#Control:PurchaseOrderID/#Value","SupplierID":"#Control:SupplierID/#SelectedValue","TaxAmount":"#Control:TaxAmount/#Value"},"Target":{"EntitySet":"PurchaseOrderHeaders","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/PurchaseOrderHeaders_CreatePurchaseOrderItem.action":
/*!************************************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/PurchaseOrderHeaders_CreatePurchaseOrderItem.action ***!
  \************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ParentLink":{"Property":"Items","Target":{"EntitySet":"PurchaseOrderHeaders","ReadLink":"{@odata.readLink}"}},"OnFailure":"/MDKApp/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MDKApp/Actions/CreateEntitySuccessMessage.action","Properties":{"CurrencyCode":"#Control:CurrencyCode/#Value","GrossAmount":"#Control:GrossAmount/#Value","ItemNumber":"#Control:ItemNumber/#Value","NetAmount":"#Control:NetAmount/#Value","ProductID":"#Control:ProductID/#SelectedValue","PurchaseOrderID":"#Control:PurchaseOrderID/#SelectedValue","Quantity":"#Control:Quantity/#Value","QuantityUnit":"#Control:QuantityUnit/#Value","TaxAmount":"#Control:TaxAmount/#Value"},"Target":{"EntitySet":"PurchaseOrderItems","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateRelatedEntity"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/PurchaseOrderHeaders_DeleteEntity.action":
/*!*************************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/PurchaseOrderHeaders_DeleteEntity.action ***!
  \*************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"PurchaseOrderHeaders","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/MDKApp/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/MDKApp/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/PurchaseOrderHeaders_DetailPopover.action":
/*!**************************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/PurchaseOrderHeaders_DetailPopover.action ***!
  \**************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Title":"Add PurchaseOrderItem","OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_CreatePurchaseOrderItem.action"},{"Title":"Delete","OnPress":"/MDKApp/Rules/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/PurchaseOrderHeaders_DeleteConfirmation.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/PurchaseOrderHeaders_UpdateEntity.action":
/*!*************************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderHeaders/PurchaseOrderHeaders_UpdateEntity.action ***!
  \*************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"PurchaseOrderHeaders","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service","ReadLink":"{@odata.readLink}"},"Properties":{"CurrencyCode":"#Control:CurrencyCode/#Value","GrossAmount":"#Control:GrossAmount/#Value","NetAmount":"#Control:NetAmount/#Value","PurchaseOrderID":"#Control:PurchaseOrderID/#Value","SupplierID":"#Control:SupplierID/#SelectedValue","TaxAmount":"#Control:TaxAmount/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/MDKApp/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/MDKApp/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderItems/NavToPurchaseOrderItems_Create.action":
/*!********************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderItems/NavToPurchaseOrderItems_Create.action ***!
  \********************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderItems/PurchaseOrderItems_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action":
/*!********************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action ***!
  \********************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderItems/PurchaseOrderItems_Detail.page"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderItems/NavToPurchaseOrderItems_Edit.action":
/*!******************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderItems/NavToPurchaseOrderItems_Edit.action ***!
  \******************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderItems/PurchaseOrderItems_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderItems/NavToPurchaseOrderItems_List.action":
/*!******************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderItems/NavToPurchaseOrderItems_List.action ***!
  \******************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDKApp/Pages/com_sap_edm_sampleservice_v4_PurchaseOrderItems/PurchaseOrderItems_List.page"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderItems/PurchaseOrderItems_CreateEntity.action":
/*!*********************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderItems/PurchaseOrderItems_CreateEntity.action ***!
  \*********************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/MDKApp/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MDKApp/Actions/CreateEntitySuccessMessage.action","Properties":{"CurrencyCode":"#Control:CurrencyCode/#Value","GrossAmount":"#Control:GrossAmount/#Value","ItemNumber":"#Control:ItemNumber/#Value","NetAmount":"#Control:NetAmount/#Value","ProductID":"#Control:ProductID/#SelectedValue","PurchaseOrderID":"#Control:PurchaseOrderID/#SelectedValue","Quantity":"#Control:Quantity/#Value","QuantityUnit":"#Control:QuantityUnit/#Value","TaxAmount":"#Control:TaxAmount/#Value"},"Target":{"EntitySet":"PurchaseOrderItems","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderItems/PurchaseOrderItems_DeleteEntity.action":
/*!*********************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderItems/PurchaseOrderItems_DeleteEntity.action ***!
  \*********************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"PurchaseOrderItems","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/MDKApp/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/MDKApp/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderItems/PurchaseOrderItems_UpdateEntity.action":
/*!*********************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/PurchaseOrderItems/PurchaseOrderItems_UpdateEntity.action ***!
  \*********************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"PurchaseOrderItems","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service","ReadLink":"{@odata.readLink}"},"Properties":{"CurrencyCode":"#Control:CurrencyCode/#Value","GrossAmount":"#Control:GrossAmount/#Value","ItemNumber":"#Control:ItemNumber/#Value","NetAmount":"#Control:NetAmount/#Value","ProductID":"#Control:ProductID/#SelectedValue","PurchaseOrderID":"#Control:PurchaseOrderID/#SelectedValue","Quantity":"#Control:Quantity/#Value","QuantityUnit":"#Control:QuantityUnit/#Value","TaxAmount":"#Control:TaxAmount/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/MDKApp/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/MDKApp/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/NavToSalesOrderHeaders_Create.action":
/*!******************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/NavToSalesOrderHeaders_Create.action ***!
  \******************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderHeaders/SalesOrderHeaders_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/NavToSalesOrderHeaders_CreateSalesOrderItem.action":
/*!********************************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/NavToSalesOrderHeaders_CreateSalesOrderItem.action ***!
  \********************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderHeaders/SalesOrderHeaders_CreateSalesOrderItem.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action":
/*!******************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/NavToSalesOrderHeaders_Detail.action ***!
  \******************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderHeaders/SalesOrderHeaders_Detail.page"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/NavToSalesOrderHeaders_Edit.action":
/*!****************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/NavToSalesOrderHeaders_Edit.action ***!
  \****************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderHeaders/SalesOrderHeaders_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/NavToSalesOrderHeaders_List.action":
/*!****************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/NavToSalesOrderHeaders_List.action ***!
  \****************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderHeaders/SalesOrderHeaders_List.page"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/SalesOrderHeaders_CreateEntity.action":
/*!*******************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/SalesOrderHeaders_CreateEntity.action ***!
  \*******************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/MDKApp/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MDKApp/Actions/CreateEntitySuccessMessage.action","Properties":{"CreatedAt":"#Control:CreatedAt/#Value","CurrencyCode":"#Control:CurrencyCode/#Value","CustomerID":"#Control:CustomerID/#SelectedValue","GrossAmount":"#Control:GrossAmount/#Value","LifeCycleStatus":"#Control:LifeCycleStatus/#Value","LifeCycleStatusName":"#Control:LifeCycleStatusName/#Value","NetAmount":"#Control:NetAmount/#Value","SalesOrderID":"#Control:SalesOrderID/#Value","TaxAmount":"#Control:TaxAmount/#Value"},"Target":{"EntitySet":"SalesOrderHeaders","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/SalesOrderHeaders_CreateSalesOrderItem.action":
/*!***************************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/SalesOrderHeaders_CreateSalesOrderItem.action ***!
  \***************************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ParentLink":{"Property":"Items","Target":{"EntitySet":"SalesOrderHeaders","ReadLink":"{@odata.readLink}"}},"OnFailure":"/MDKApp/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MDKApp/Actions/CreateEntitySuccessMessage.action","Properties":{"CurrencyCode":"#Control:CurrencyCode/#Value","DeliveryDate":"#Control:DeliveryDate/#Value","GrossAmount":"#Control:GrossAmount/#Value","ItemNumber":"#Control:ItemNumber/#Value","NetAmount":"#Control:NetAmount/#Value","ProductID":"#Control:ProductID/#SelectedValue","Quantity":"#Control:Quantity/#Value","QuantityUnit":"#Control:QuantityUnit/#Value","SalesOrderID":"#Control:SalesOrderID/#SelectedValue","TaxAmount":"#Control:TaxAmount/#Value"},"Target":{"EntitySet":"SalesOrderItems","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateRelatedEntity"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/SalesOrderHeaders_DeleteEntity.action":
/*!*******************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/SalesOrderHeaders_DeleteEntity.action ***!
  \*******************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"SalesOrderHeaders","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/MDKApp/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/MDKApp/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/SalesOrderHeaders_DetailPopover.action":
/*!********************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/SalesOrderHeaders_DetailPopover.action ***!
  \********************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Title":"Add SalesOrderItem","OnPress":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/NavToSalesOrderHeaders_CreateSalesOrderItem.action"},{"Title":"Delete","OnPress":"/MDKApp/Rules/com_sap_edm_sampleservice_v4/SalesOrderHeaders/SalesOrderHeaders_DeleteConfirmation.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/SalesOrderHeaders_UpdateEntity.action":
/*!*******************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderHeaders/SalesOrderHeaders_UpdateEntity.action ***!
  \*******************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"SalesOrderHeaders","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service","ReadLink":"{@odata.readLink}"},"Properties":{"CreatedAt":"#Control:CreatedAt/#Value","CurrencyCode":"#Control:CurrencyCode/#Value","CustomerID":"#Control:CustomerID/#SelectedValue","GrossAmount":"#Control:GrossAmount/#Value","LifeCycleStatus":"#Control:LifeCycleStatus/#Value","LifeCycleStatusName":"#Control:LifeCycleStatusName/#Value","NetAmount":"#Control:NetAmount/#Value","SalesOrderID":"#Control:SalesOrderID/#Value","TaxAmount":"#Control:TaxAmount/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/MDKApp/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/MDKApp/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderItems/NavToSalesOrderItems_Create.action":
/*!**************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderItems/NavToSalesOrderItems_Create.action ***!
  \**************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderItems/SalesOrderItems_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderItems/NavToSalesOrderItems_Detail.action":
/*!**************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderItems/NavToSalesOrderItems_Detail.action ***!
  \**************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderItems/SalesOrderItems_Detail.page"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderItems/NavToSalesOrderItems_Edit.action":
/*!************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderItems/NavToSalesOrderItems_Edit.action ***!
  \************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderItems/SalesOrderItems_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderItems/NavToSalesOrderItems_List.action":
/*!************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderItems/NavToSalesOrderItems_List.action ***!
  \************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDKApp/Pages/com_sap_edm_sampleservice_v4_SalesOrderItems/SalesOrderItems_List.page"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderItems/SalesOrderItems_CreateEntity.action":
/*!***************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderItems/SalesOrderItems_CreateEntity.action ***!
  \***************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/MDKApp/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MDKApp/Actions/CreateEntitySuccessMessage.action","Properties":{"CurrencyCode":"#Control:CurrencyCode/#Value","DeliveryDate":"#Control:DeliveryDate/#Value","GrossAmount":"#Control:GrossAmount/#Value","ItemNumber":"#Control:ItemNumber/#Value","NetAmount":"#Control:NetAmount/#Value","ProductID":"#Control:ProductID/#SelectedValue","Quantity":"#Control:Quantity/#Value","QuantityUnit":"#Control:QuantityUnit/#Value","SalesOrderID":"#Control:SalesOrderID/#SelectedValue","TaxAmount":"#Control:TaxAmount/#Value"},"Target":{"EntitySet":"SalesOrderItems","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderItems/SalesOrderItems_DeleteEntity.action":
/*!***************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderItems/SalesOrderItems_DeleteEntity.action ***!
  \***************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"SalesOrderItems","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/MDKApp/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/MDKApp/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderItems/SalesOrderItems_UpdateEntity.action":
/*!***************************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/SalesOrderItems/SalesOrderItems_UpdateEntity.action ***!
  \***************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"SalesOrderItems","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service","ReadLink":"{@odata.readLink}"},"Properties":{"CurrencyCode":"#Control:CurrencyCode/#Value","DeliveryDate":"#Control:DeliveryDate/#Value","GrossAmount":"#Control:GrossAmount/#Value","ItemNumber":"#Control:ItemNumber/#Value","NetAmount":"#Control:NetAmount/#Value","ProductID":"#Control:ProductID/#SelectedValue","Quantity":"#Control:Quantity/#Value","QuantityUnit":"#Control:QuantityUnit/#Value","SalesOrderID":"#Control:SalesOrderID/#SelectedValue","TaxAmount":"#Control:TaxAmount/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/MDKApp/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/MDKApp/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/CloseOffline.action":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/CloseOffline.action ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OfflineOData.Close","Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service","Force":true,"ActionResult":{"_Name":"close"},"OnSuccess":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/CloseOfflineSuccessMessage.action","OnFailure":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/CloseOfflineFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/CloseOfflineFailureMessage.action":
/*!*****************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/CloseOfflineFailureMessage.action ***!
  \*****************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failure closing data service - {#ActionResults:close/error}","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/CloseOfflineSuccessMessage.action":
/*!*****************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/CloseOfflineSuccessMessage.action ***!
  \*****************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Data service closed successfully","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/DownloadOffline.action":
/*!******************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/DownloadOffline.action ***!
  \******************************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service","DefiningRequests":[{"Name":"Customers","Query":"Customers"},{"Name":"Products","Query":"Products"},{"Name":"PurchaseOrderHeaders","Query":"PurchaseOrderHeaders"},{"Name":"PurchaseOrderItems","Query":"PurchaseOrderItems"},{"Name":"SalesOrderHeaders","Query":"SalesOrderHeaders"},{"Name":"SalesOrderItems","Query":"SalesOrderItems"}],"_Type":"Action.Type.OfflineOData.Download","ActionResult":{"_Name":"sync"},"OnFailure":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/SyncFailureMessage.action","OnSuccess":"/MDKApp/Rules/com_sap_edm_sampleservice_v4/ErrorArchive_CheckForSyncError.js"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/DownloadStartedMessage.action":
/*!*************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/DownloadStartedMessage.action ***!
  \*************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Download in progress...","CompletionMessage":"Download Successful","CompletionTimeout":7,"OnSuccess":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/DownloadOffline.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/InitializeOffline.action":
/*!********************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/InitializeOffline.action ***!
  \********************************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service","DefiningRequests":[{"Name":"Customers","Query":"Customers"},{"Name":"Products","Query":"Products"},{"Name":"PurchaseOrderHeaders","Query":"PurchaseOrderHeaders"},{"Name":"PurchaseOrderItems","Query":"PurchaseOrderItems"},{"Name":"SalesOrderHeaders","Query":"SalesOrderHeaders"},{"Name":"SalesOrderItems","Query":"SalesOrderItems"}],"_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"ActivityIndicatorText":"Downloading...","ActionResult":{"_Name":"init"},"OnFailure":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/InitializeOfflineFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/InitializeOfflineFailureMessage.action":
/*!**********************************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/InitializeOfflineFailureMessage.action ***!
  \**********************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/SyncFailureMessage.action":
/*!*********************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/SyncFailureMessage.action ***!
  \*********************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Sync offline data service failure - {#ActionResults:sync/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/SyncStartedMessage.action":
/*!*********************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/SyncStartedMessage.action ***!
  \*********************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Upload in progress...","CompletionMessage":"Sync completed","CompletionTimeout":7,"OnSuccess":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/UploadOffline.action","OnFailure":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/SyncFailureMessage.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/UploadOffline.action":
/*!****************************************************************************************************!*\
  !*** ./build.definitions/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/UploadOffline.action ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MDKApp/Services/com_sap_edm_sampleservice_v4.service","_Type":"Action.Type.OfflineOData.Upload","ActionResult":{"_Name":"sync"},"OnSuccess":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/DownloadStartedMessage.action","OnFailure":"/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/SyncFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDKApp/Globals/Application/AppDefinition_Version.global":
/*!***********************************************************************************!*\
  !*** ./build.definitions/MDKApp/Globals/Application/AppDefinition_Version.global ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/MDKApp/Globals/Application/ApplicationName.global":
/*!*****************************************************************************!*\
  !*** ./build.definitions/MDKApp/Globals/Application/ApplicationName.global ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"MDK App","_Type":"String"}

/***/ }),

/***/ "./build.definitions/MDKApp/Globals/Application/SupportEmail.global":
/*!**************************************************************************!*\
  !*** ./build.definitions/MDKApp/Globals/Application/SupportEmail.global ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"support@mycompany.com","_Type":"String"}

/***/ }),

/***/ "./build.definitions/MDKApp/Globals/Application/SupportPhone.global":
/*!**************************************************************************!*\
  !*** ./build.definitions/MDKApp/Globals/Application/SupportPhone.global ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1-800-677-7271","_Type":"String"}

/***/ }),

/***/ "./build.definitions/MDKApp/Services/com_sap_edm_sampleservice_v2.service":
/*!********************************************************************************!*\
  !*** ./build.definitions/MDKApp/Services/com_sap_edm_sampleservice_v2.service ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"com.sap.edm.sampleservice.v2","OfflineEnabled":true,"LanguageURLParam":"","OnlineOptions":{},"OfflineOptions":{"StoreParameters":{}},"PathSuffix":"","SourceType":"Mobile","ServiceUrl":""}

/***/ }),

/***/ "./build.definitions/MDKApp/Services/com_sap_edm_sampleservice_v4.service":
/*!********************************************************************************!*\
  !*** ./build.definitions/MDKApp/Services/com_sap_edm_sampleservice_v4.service ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"com.sap.edm.sampleservice.v4","OfflineEnabled":true,"LanguageURLParam":"","OnlineOptions":{},"OfflineOptions":{"StoreParameters":{}},"PathSuffix":"","SourceType":"Mobile","ServiceUrl":""}

/***/ }),

/***/ "./build.definitions/version.mdkbundlerversion":
/*!*****************************************************!*\
  !*** ./build.definitions/version.mdkbundlerversion ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = "1.1\n";

/***/ }),

/***/ "./build.definitions/MDKApp/Styles/Styles.json":
/*!*****************************************************!*\
  !*** ./build.definitions/MDKApp/Styles/Styles.json ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ "./build.definitions/MDKApp/jsconfig.json":
/*!************************************************!*\
  !*** ./build.definitions/MDKApp/jsconfig.json ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"include":["Rules/**/*",".typings/**/*"]}');

/***/ }),

/***/ "./build.definitions/tsconfig.json":
/*!*****************************************!*\
  !*** ./build.definitions/tsconfig.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"compilerOptions":{"module":"esnext","target":"es2019","moduleResolution":"node","lib":["esnext","dom"],"experimentalDecorators":true,"emitDecoratorMetadata":true,"removeComments":true,"inlineSourceMap":true,"noEmitOnError":false,"noEmitHelpers":true,"baseUrl":".","plugins":[{"transform":"@nativescript/webpack/dist/transformers/NativeClass","type":"raw"}]},"exclude":["node_modules"]}');

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
/******/ 			id: moduleId,
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
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./build.definitions/application-index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bundle.js.map