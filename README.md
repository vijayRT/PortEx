# PortEx

Quickly export and import extensions. Designed for simplicity.

[Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync#overview) is a pretty amazing extension for VS Code. But when your main dev machine breaks down and your IT guy wants you to use a temporary laptop for a few days, you are going to need your extensions exported and imported without the hassle of setting up GitHub tokens.

PortEx gets the names of all your extensions exported into a JSON file onto Hastebin and provides you with the link to the Hastebin drop. On your other machine, all you will need is PortEx to import the extensions.

## Features

#Export 

Export extensions from your current VS Code install by opening up the Command Palette `Ctrl+Shift+P` and entering **Export VSCode Extensions**.

A list of your VS Code Extensions will be exported to Hastebin in JSON format.

#Import

Import extensions by opening up the Commmand Palette `Ctrl+Shift+P` and entering **Import VSCode Extensions**.

In the popup that opens, drop the Hastebin link previously generated and sit tight while PortEx installs all your extensions.

That's it. You are ready to use all the extensions you had.
