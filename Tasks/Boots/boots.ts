import tl = require('azure-pipelines-task-lib/task');
import path = require('path');

async function run() {
    try {
        const uriToInstall: string = tl.getInput('uri', true);

        var tmpDir = tl.getVariable('Agent.TempDirectory');
        var bootsToolDir = path.join(tmpDir, 'boots-tool');
        var bootsTool = tl.which(path.join(bootsToolDir, 'boots'));

        if (!bootsTool) {
            var dotnet = tl.tool('dotnet');
            dotnet.line('tool install boots --version 0.1.0.251-beta --tool-path ' + bootsToolDir);
            await dotnet.exec();
            bootsTool = tl.which(path.join(bootsToolDir, 'boots'));
        }

        var boots = tl.tool(bootsTool);
        boots.line(uriToInstall);
        await boots.exec();
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();
