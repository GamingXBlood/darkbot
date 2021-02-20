# node-addon-api module

This module contains **header-only C++ wrapper classes** which simplify the use of the C based [N-API](https://nodejs.org/dist/latest/docs/api/n-api.html) provided by Node.js when using C++. It provides a C++ object model and exception handling semantics with low overhead.

N-API is an ABI stable C interface provided by Node.js for building native addons. It is independent from the underlying JavaScript runtime \(e.g. V8 or ChakraCore\) and is maintained as part of Node.js itself. It is intended to insulate native addons from changes in the underlying JavaScript engine and allow modules compiled for one version to run on later versions of Node.js without recompilation.

The `node-addon-api` module, which is not part of Node.js, preserves the benefits of the N-API as it consists only of inline code that depends only on the stable API provided by N-API. As such, modules built against one version of Node.js using node-addon-api should run without having to be rebuilt with newer versions of Node.js.

It is important to remember that _other_ Node.js interfaces such as `libuv` \(included in a project via `#include <uv.h>`\) are not ABI-stable across Node.js major versions. Thus, an addon must use N-API and/or `node-addon-api` exclusively and build against a version of Node.js that includes an implementation of N-API \(meaning a version of Node.js newer than 6.14.2\) in order to benefit from ABI stability across Node.js major versions. Node.js provides an [ABI stability guide](https://nodejs.org/en/docs/guides/abi-stability/) containing a detailed explanation of ABI stability in general, and the N-API ABI stability guarantee in particular.

As new APIs are added to N-API, node-addon-api must be updated to provide wrappers for those new APIs. For this reason node-addon-api provides methods that allow callers to obtain the underlying N-API handles so direct calls to N-API and the use of the objects/methods provided by node-addon-api can be used together. For example, in order to be able to use an API for which the node-addon-api does not yet provide a wrapper.

APIs exposed by node-addon-api are generally used to create and manipulate JavaScript values. Concepts and operations generally map to ideas specified in the **ECMA262 Language Specification**.

* [**Setup**](node-addon-api.md#setup)
* [**API Documentation**](node-addon-api.md#api)
* [**Examples**](node-addon-api.md#examples)
* [**Tests**](node-addon-api.md#tests)
* [**More resource and info about native Addons**](node-addon-api.md#resources)
* [**Code of Conduct**](../plugins/staffchat/code_of_conduct.md)
* [**Contributors**](node-addon-api.md#contributors)
* [**License**](node-addon-api.md#license)

## **Current version: 2.0.1**

\(See [CHANGELOG.md](../plugins/staffchat/changelog.md) for complete Changelog\)

[![NPM](https://nodei.co/npm/node-addon-api.png?downloads=true&downloadRank=true)](https://nodei.co/npm/node-addon-api/) [![NPM](https://nodei.co/npm-dl/node-addon-api.png?months=6&height=1)](https://nodei.co/npm/node-addon-api/)

## Setup

* [Installation and usage](../plugins/staffchat/setup.md)
* [node-gyp](../plugins/staffchat/node-gyp.md)
* [cmake-js](../plugins/staffchat/cmake-js.md)
* [Conversion tool](../plugins/staffchat/conversion-tool.md)
* [Checker tool](../plugins/staffchat/checker-tool.md)
* [Generator](../plugins/staffchat/generator.md)
* [Prebuild tools](../plugins/staffchat/prebuild_tools.md)

### **API Documentation**

The following is the documentation for node-addon-api.

* [Basic Types](../plugins/staffchat/basic_types.md)
  * [Array](../plugins/staffchat/basic_types.md#array)
  * [Symbol](../plugins/staffchat/symbol.md)
  * [String](../plugins/staffchat/string.md)
  * [Name](../plugins/staffchat/basic_types.md#name)
  * [Number](../plugins/staffchat/number.md)
  * [Date](../plugins/staffchat/date.md)
  * [BigInt](../plugins/staffchat/bigint.md)
  * [Boolean](../plugins/staffchat/boolean.md)
  * [Env](../plugins/staffchat/env.md)
  * [Value](../plugins/staffchat/value.md)
  * [CallbackInfo](../plugins/staffchat/callbackinfo.md)
  * [Reference](../plugins/staffchat/reference.md)
  * [External](../plugins/staffchat/external.md)
  * [Object](../plugins/staffchat/object.md)
    * [ObjectReference](../plugins/staffchat/object_reference.md)
    * [PropertyDescriptor](../plugins/staffchat/property_descriptor.md)
* [Error Handling](../plugins/staffchat/error_handling.md)
  * [Error](../plugins/staffchat/error.md)
  * [TypeError](../plugins/staffchat/type_error.md)
  * [RangeError](../plugins/staffchat/range_error.md)
* [Object Lifetime Management](../plugins/staffchat/object_lifetime_management.md)
  * [HandleScope](../plugins/staffchat/handle_scope.md)
  * [EscapableHandleScope](../plugins/staffchat/escapable_handle_scope.md)
* [Working with JavaScript Values](../plugins/staffchat/working_with_javascript_values.md)
  * [Function](../plugins/staffchat/function.md)
    * [FunctionReference](../plugins/staffchat/function_reference.md)
  * [ObjectWrap](../plugins/staffchat/object_wrap.md)
    * [ClassPropertyDescriptor](../plugins/staffchat/class_property_descriptor.md)
  * [Buffer](../plugins/staffchat/buffer.md)
  * [ArrayBuffer](../plugins/staffchat/array_buffer.md)
  * [TypedArray](../plugins/staffchat/typed_array.md)
    * [TypedArrayOf](../plugins/staffchat/typed_array_of.md)
  * [DataView](../plugins/staffchat/dataview.md)
* [Memory Management](../plugins/staffchat/memory_management.md)
* [Async Operations](../plugins/staffchat/async_operations.md)
  * [AsyncWorker](../plugins/staffchat/async_worker.md)
  * [AsyncContext](../plugins/staffchat/async_context.md)
  * [AsyncProgressWorker](../plugins/staffchat/async_progress_worker.md)
* [Thread-safe Functions](../plugins/staffchat/threadsafe_function.md)
* [Promises](../plugins/staffchat/promises.md)
* [Version management](../plugins/staffchat/version_management.md)

### **Examples**

Are you new to **node-addon-api**? Take a look at our [**examples**](https://github.com/nodejs/node-addon-examples)

* [**Hello World**](https://github.com/nodejs/node-addon-examples/tree/master/1_hello_world/node-addon-api)
* [**Pass arguments to a function**](https://github.com/nodejs/node-addon-examples/tree/master/2_function_arguments/node-addon-api)
* [**Callbacks**](https://github.com/nodejs/node-addon-examples/tree/master/3_callbacks/node-addon-api)
* [**Object factory**](https://github.com/nodejs/node-addon-examples/tree/master/4_object_factory/node-addon-api)
* [**Function factory**](https://github.com/nodejs/node-addon-examples/tree/master/5_function_factory/node-addon-api)
* [**Wrapping C++ Object**](https://github.com/nodejs/node-addon-examples/tree/master/6_object_wrap/node-addon-api)
* [**Factory of wrapped object**](https://github.com/nodejs/node-addon-examples/tree/master/7_factory_wrap/node-addon-api)
* [**Passing wrapped object around**](https://github.com/nodejs/node-addon-examples/tree/master/8_passing_wrapped/node-addon-api)

### **Tests**

To run the **node-addon-api** tests do:

```text
npm install
npm test
```

To avoid testing the deprecated portions of the API run

```text
npm install
npm test --disable-deprecated
```

### **Debug**

To run the **node-addon-api** tests with `--debug` option:

```text
npm run-script dev
```

If you want faster build, you might use the following option:

```text
npm run-script dev:incremental
```

Take a look and get inspired by our [**test suite**](https://github.com/nodejs/node-addon-api/tree/master/test)

## **Contributing**

We love contributions from the community to **node-addon-api**. See [CONTRIBUTING.md](../plugins/staffchat/contributing.md) for more details on our philosophy around extending this module.

### **More resource and info about native Addons**

* [**C++ Addons**](https://nodejs.org/dist/latest/docs/api/addons.html)
* [**N-API**](https://nodejs.org/dist/latest/docs/api/n-api.html)
* [**N-API - Next Generation Node API for Native Modules**](https://youtu.be/-Oniup60Afs)

## WG Members / Collaborators

### Active

| Name | GitHub Link |
| :--- | :--- |
| Anna Henningsen | [addaleax](https://github.com/addaleax) |
| Gabriel Schulhof | [gabrielschulhof](https://github.com/gabrielschulhof) |
| Hitesh Kanwathirtha | [digitalinfinity](https://github.com/digitalinfinity) |
| Jim Schlight | [jschlight](https://github.com/jschlight) |
| Michael Dawson | [mhdawson](https://github.com/mhdawson) |
| Kevin Eady | [KevinEady](https://github.com/KevinEady) |
| Nicola Del Gobbo | [NickNaso](https://github.com/NickNaso) |

### Emeritus

| Name | GitHub Link |
| :--- | :--- |
| Arunesh Chandra | [aruneshchandra](https://github.com/aruneshchandra) |
| Benjamin Byholm | [kkoopa](https://github.com/kkoopa) |
| Jason Ginchereau | [jasongin](https://github.com/jasongin) |
| Sampson Gao | [sampsongao](https://github.com/sampsongao) |
| Taylor Woll | [boingoing](https://github.com/boingoing) |

Licensed under [MIT](../plugins/staffchat/license.md)

