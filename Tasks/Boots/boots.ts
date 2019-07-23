import tl = require('azure-pipelines-task-lib/task');

async function run() {
    try {
        const uriToInstall: string = tl.getInput('uri', true);

        var dotnet = tl.tool('dotnet');
        dotnet.line('tool install --global boots --version 0.1.0.251-beta');
        await dotnet.exec();

        var boots = tl.tool('boots');
        boots.line(uriToInstall);
        await boots.exec();
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();
