# Checker Tool

**node-addon-api** provides a [checker tool](https://github.com/GamingXBlood/darkbot/tree/f9e31883d400da8a46698bbabbd10b1696eccf00/node_modules/node-addon-api/tools/check-napi.js) that will inspect a given directory tree, identifying all Node.js native addons therein, and further indicating for each addon whether it is an N-API addon.

## To use the checker tool:

1. Install the application with `npm install`.
2. If the application does not depend on **node-addon-api**, copy the checker tool into the application's directory.
3. If the application does not depend on **node-addon-api**, run the checker tool from the application's directory:

   ```bash
   node ./check-napi.js
   ```

   Otherwise, the checker tool can be run from the application's `node_modules/` subdirectory:

   ```bash
   node ./node_modules/node-addon-api/tools/check-napi.js
   ```

The tool accepts the root directory from which to start checking for Node.js native addons as a single optional command line parameter. If ommitted it will start checking from the current directory \(`.`\).

