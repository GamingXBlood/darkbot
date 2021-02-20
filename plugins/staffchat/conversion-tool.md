# Conversion Tool

To make the migration to **node-addon-api** easier, we have provided a script to help complete some tasks.

## To use the conversion script:

1. Go to your module directory

```text
cd [module_path]
```

1. Install node-addon-api module

```text
npm install node-addon-api
```

1. Run node-addon-api conversion script

```text
node ./node_modules/node-addon-api/tools/conversion.js ./
```

1. While this script makes conversion easier, it still cannot fully convert

   the module. The next step is to try to build the module and complete the

   remaining conversions necessary to allow it to compile and pass all of the

   module's tests.

