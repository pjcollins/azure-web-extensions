import tl = require('azure-pipelines-task-lib/task');
import path = require('path');
import { readlinkSync } from 'fs';

async function run() {
    try {
        const uriToInstall: string = tl.getInput('uri', true);
        const packageVersion: string = tl.getInput('version', false);

        var bootsSuffix = 'tool';
        var versionArgs = '';
        if (packageVersion) {
            bootsSuffix = packageVersion;
            versionArgs = ' --version=' + packageVersion;
        }

        var tmpDir = tl.getVariable('Agent.TempDirectory');
        var bootsToolDir = path.join(tmpDir, 'boots-' + bootsSuffix);
        var bootsTool = tl.which(path.join(bootsToolDir, 'boots'));
        var dotnetTool = tl.which('dotnet');

        if (!bootsTool) {
            var dotnet = tl.tool(dotnetTool);
            dotnet.line('tool install boots --tool-path=\"' + bootsToolDir + '\"' + versionArgs);
            await dotnet.exec();
            bootsTool = tl.which(path.join(bootsToolDir, 'boots'));
        }

        // Workaround error 'the required library libhostfxr.dylib could not be found.'
        // https://github.com/dotnet/cli/issues/9114#issuecomment-494226139
        if (tl.getPlatform() === tl.Platform.MacOS) {
            try {
                var dotnetToolLink = readlinkSync(dotnetTool);
                if (typeof dotnetToolLink == 'string') {
                    tl.setVariable("DOTNET_ROOT", path.dirname(dotnetToolLink));
                }
            } catch (err) {
            }
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
