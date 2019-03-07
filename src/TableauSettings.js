const tableauExt = window.tableau.extensions;

let EnvName = "DEFAULT";

export function setEnvName(s) {
  EnvName = s;
}

export const ShouldUse = true;

/**
 * Switches the callbacks of the transactional `updateAndSave` and `eraseAndSave`
 * to be called AFTER the change has been saved instead of dispatching them immediately.
 *
 * The value can be overidden for each call.
 */
export const DeferCallbacks = true;

/**
 * Should value be stringified before saving?
 * (the current code seems to rely on non-string values, which is against the
 * signature in the API docs).
 */
export const StringifyValues = false;

/**
 * Log errors for the Tableau log
 */
function logError(...args) {
  console.log(args.map(a => a.toString()).join('    '))
}

/**
 * Log some JSON-like data in the Tableau log
 */
function logData(tag, data, formatData=false) {
  let dataStr = formatData ? JSON.stringify(data, null, "\t") : JSON.stringify(data);
  console.log(EnvName + " [ DATA: " + tag + " ] " + dataStr);
}

/**
 * Does a very basic diffing by key for logging setting changes
 */
function diffData(a, b) {
  if (a === b)
    return [];
  if (typeof a !== typeof b)
    return ['type mismatch'];
  if (typeof a !== 'object')
    return [{ key: "<VALUE>", before: a, after: b}];

  let keys = {}, keysA = Object.keys(a), keysB = Object.keys(b);
  keysA.concat(keysB).forEach(k => { keys[k] = 1; });

  let changes = [];

  Object.keys(keys).forEach(k => {
    let av = a[k], bv = b[k];
    if (av === bv) return;

    changes.push({ key: k, before: av, after: bv });
  });

  return changes;
}

/**
 * We'll chain saving our Tableau Settings on this Promise
 * so we'll always add to the end of the saving chain
 */
let tableauSettingsSavePromise = Promise.resolve({});

/**
 * The current saved settings for quick access
 */
let tableauCurrentSavedSettings = {};


/**
 * Initialize the current settings stored in tableauCurrentSavedSettings
 */
export function init() {
  tableauCurrentSavedSettings = tableauExt.settings.getAll();
}


/**
 * Saves the Tableau settings as soon as previous save(s) has completed
 */
export function save(opId="") {


  function onSaveSuccess(newSettings) {
    logData(opId + " saveTableauSettings::onSaveSuccess::diff" , diffData(tableauCurrentSavedSettings, newSettings));
    tableauCurrentSavedSettings = tableauExt.settings.getAll();
    return newSettings;
  }

  tableauSettingsSavePromise = tableauSettingsSavePromise
    .then(_ => {
      let saveResult = tableauExt.settings.saveAsync();
      return saveResult.then(onSaveSuccess);
    })
    .catch(err => {
      logError("Error while saving Extension Settings", err.message);
      return tableauCurrentSavedSettings;
    });

  return tableauSettingsSavePromise;
}


/**
 * Transforms the settings while updating the global state too
 */
function transformSettings(callback, afterSaveCallback, opId="") {
  // Update each new setting after any previous op completed
  function onPreviousOpComplete() {
    callback();
    tableauCurrentSavedSettings = tableauExt.settings.getAll();
    return tableauCurrentSavedSettings;
  }


  // wait for any previous save / update to complete
  // then update the settings
  // then save them
  tableauSettingsSavePromise = Promise.resolve(tableauSettingsSavePromise)
    .then(_ => onPreviousOpComplete());

  save(opId);

  if (afterSaveCallback) {
    tableauSettingsSavePromise = tableauSettingsSavePromise
      .then(settings => {
        afterSaveCallback(settings);
        return settings;
      });
  }

  return tableauSettingsSavePromise;
}


let currentOpId = 0;

/**
 * Update the settings by setting each key found in `newSettings` to the new
 * value and call `callback` either before or after the save completes depending
 * on `deferCallback`.
 */
export function updateAndSave(newSettings, callback, deferCallback=DeferCallbacks) {
  let opId = currentOpId;
  currentOpId++;
  logData(opId + " TableauSettings.updateAndSave", newSettings);

  // call back right away to allow changing a component state
  // from an event handler
  if (!deferCallback && callback) {

    // flatten every setting value to a string
    let flatSettings = newSettings;
    if (StringifyValues) {
      Object.keys(newSettings).forEach(key => {
        flatSettings[key] = newSettings[key].toString();
      });
    }

    // merge the old and new so we can set
    let mergedSettings = Object.assign({}, tableauCurrentSavedSettings, flatSettings);

    // do the callback with the merged settings
    callback(mergedSettings);
  }

  return transformSettings(() => {
    Object.keys(newSettings).forEach(key => {
      tableauExt.settings.set(key, newSettings[key]);
    });
  }, settings => {
    if (deferCallback && callback) {
      callback(settings);
    }
  }, opId);
}


/**
 * Erase each key found in `keys` and call `callback` either before or after the
 * save completes depending on `deferCallback`.
 */
export function eraseAndSave(keys, callback, deferCallback=DeferCallbacks) {
  let opId = currentOpId;
  currentOpId++;
  logData(opId + " TableauSettings.eraseAndSave", keys);


  // call back right away to allow changing a component state
  // from an event handler
  if (!deferCallback && callback) {
    // remove keys from the global dict
    keys.forEach(key => {
      delete tableauCurrentSavedSettings[key];
    });

    callback(tableauCurrentSavedSettings);
  }

  return transformSettings(() => {
    keys.forEach(key => tableauExt.settings.erase(key));
  }, settings => {
    if (deferCallback && callback) {
      callback(settings);
    }
  }, opId);

}



