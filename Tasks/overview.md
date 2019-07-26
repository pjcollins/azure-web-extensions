# Boots & Utilities
Custom tasks for Azure Pipelines. Featuring Boots!

## Boots
The `Boots` Azure Pipeline Task provides a convienent way to use [boots](https://github.com/jonathanpeppers/boots), a [.NET global tool](https://docs.microsoft.com/en-us/dotnet/core/tools/global-tools) for "bootstrapping" vsix & pkg files.

Once you've installed this extension, the `Boots` task can be added to an Azure Pipelines Build or Release definition, or  it can be used from YAML:

```yaml
steps:
- task: Boots@1
  displayName: Install Xamarin.Android
  inputs:
    uri: https://aka.ms/xamarin-android-commercial-d16-2-windows
```

## More Info

The source for this extension can be found on [GitHub](https://github.com/pjcollins/azure-web-extensions). Additional tasks may be added in the future. Feel free to submit a pull request!
