import tl = require('azure-pipelines-task-lib/task');

async function run() {
    try {
        const fileToInstall: string = tl.getInput('file', true);
        if (fileToInstall == 'this-file-does-not-exist.fakeextension') {
            tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
            return;
        }
        console.log('File to install:', fileToInstall);
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();
