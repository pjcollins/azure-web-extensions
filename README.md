# Azure DevOps Web Extensions
Web extensions for Azure DevOps

# Azure Pipeline Tasks
[![Build Status](https://dev.azure.com/pjcollins/OSS/_apis/build/status/azure-web-extensions?branchName=master)](https://dev.azure.com/pjcollins/OSS/_build/latest?definitionId=1&branchName=master)

## Use In Your YAML Pipeline
##### Ensure the extension is installed in your Azure DevOps instance
 * Visit the [Marketplace](https://marketplace.visualstudio.com/items?itemName=pjcollins.azp-utilities-boots) and install
 the extension.
 
##### Add the task to a build or release, or use it from YAML
```yaml
steps:
- task: Boots@1
  displayName: Install Xamarin.Android
  inputs:
    uri: https://aka.ms/xamarin-android-commercial-d16-2-windows
```

## Build and Test Locally
#### Dependencies
 * Install [Node](https://nodejs.org/).
 * Install the TypeScript Compiler.
    * `npm install -g typescript`
 * Install Mocha for testing.
    * `npm install -g mocha`
 * Install tfx-cli for packaging.
    * `npm install -g tfx-cli`

#### Building
Open a terminal and navigate to the task directory you want to work on, and run the following commands.
 * `npm install`
 * `tsc`

#### Running
Once a task is built, you can run it with `node`.
 * `node boots.js`

#### Testing
If tests exist, they can be ran with `mocha`.
 * `mocha Tests\suite.js`

#### Packaging
Run the following to package the extension as a vsix.
 * `tfx extension create --manifest-globs Tasks\vss-extension.json`
