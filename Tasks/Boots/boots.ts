import tl = require('azure-pipelines-task-lib/task');
import path = require('path');
import { readlink } from 'fs';

async function run() {
    try {
        const uriToInstall: string = tl.getInput('uri', true);

        var tmpDir = tl.getVariable('Agent.TempDirectory');
        var bootsToolDir = path.join(tmpDir, 'boots-tool');
        var bootsTool = tl.which(path.join(bootsToolDir, 'boots'));
        var dotnetTool = tl.which('dotnet');

        if (!bootsTool) {
            var dotnet = tl.tool(dotnetTool);
            dotnet.line('tool install boots --version 0.1.0.251-beta --tool-path ' + bootsToolDir);
            await dotnet.exec();
            bootsTool = tl.which(path.join(bootsToolDir, 'boots'));
        }

        // Workaround error 'the required library libhostfxr.dylib could not be found.'
        // https://github.com/dotnet/cli/issues/9114#issuecomment-494226139
        if (tl.getPlatform() === tl.Platform.MacOS) {
            await readlink(dotnetTool, (err, linkString) : void => {
                if (linkString) {
                    tl.setVariable("DOTNET_ROOT", path.dirname(linkString));
                }
            });
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
