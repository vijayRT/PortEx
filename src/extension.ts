'use strict';

import * as vscode from 'vscode';
var shell = require('shelljs');
const hastebin = require('hastebin-gen');
const parse = require('url-parse');
export function activate(context: vscode.ExtensionContext) {
    let exportDisposable = vscode.commands.registerCommand('extension.export', () => {
        vscode.window.showInformationMessage('Hold on. Your extensions are being exported.');
        let execPath: string = "";
        execPath = getExecPath();
        console.log("Exec path:" + execPath);
        if (execPath !== null) {
            let execList = getExtensionList(execPath);
            let hastebinData = {
                "OS": process.env.OS,
                "extensions": execList
            };
            hastebin(JSON.stringify(hastebinData, undefined, 4), "json").then((r:any) => {
                var URL = new parse(r);
                URL.pathname = ("/raw" + URL.pathname).replace(/.json/, "");
                console.log(URL.toString());
                shell.exec(`start ${URL.toString()}`, {silent: true});
            }).catch(console.error);
        }
    });
    context.subscriptions.push(exportDisposable);
}

function getExecPath() {
    let execPath = shell.exec('where code', {silent:true}).stdout;
    console.log(execPath);
    execPath = execPath.split('\n')[0].replace(/\\Code.exe/, `\\bin\\code`);
    execPath = `"${execPath}" --list-extensions`;
    return execPath;
}

function getExtensionList(execPath: string) {
    let execList = shell.exec(execPath).stdout.split("\n");
    execList.pop();
    return execList;
}

// this method is called when your extension is deactivated
export function deactivate() {
}