'use strict';

import * as vscode from 'vscode';
var shell = require('shelljs');
const hastebin = require('hastebin-gen');
const parse = require('url-parse');
var os = require('os');
var axios = require('axios');

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
    let importDisposable = vscode.commands.registerCommand('extension.import', () => {
        let inputBoxOptions = {
            prompt: "Paste the Hastebin link here"
        };
        vscode.window.showInputBox(inputBoxOptions).then((link: any) => {
            console.log(link);
            installExtensions(link);    
        });
    });
    context.subscriptions.push(exportDisposable);
    context.subscriptions.push(importDisposable);
}

function getExecPath() {
    let whichCommand = (os.type() === "Windows_NT") ? `where code` : `which code`;
    let execPath = shell.exec(whichCommand, {silent:true}).stdout;
    console.log(execPath);
    execPath = execPath.split('\n')[0].replace(/\\Code.exe/, `\\bin\\code`);
    return execPath;
}

function getExtensionList(execPath: string) {
    execPath = `"${execPath}" --list-extensions`;
    let execList = shell.exec(execPath).stdout.split("\n");
    execList.pop();
    return execList;
}

function installExtensions(link: string) {
    vscode.window.showInformationMessage('Hold on. Your extensions are being installed.');
    axios.get(link).then((response: any) => {
        let execPath = getExecPath();
        for(let i in response.data.extensions) {
            console.log(`${execPath} --install-extension ${response.data.extensions[i]}`)
            shell.exec(`${execPath} --install-extension ${response.data.extensions[i]}`);
        }
    });
}
// this method is called when your extension is deactivated
export function deactivate() {
}