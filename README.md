# PKI WhosNext Application
PKI R&D requires every team member to share the latest news from any industry in the bi-weekly group meeting. Everyone will be given 1 minute. This application will give an order randomly 
and help control the time used by each team member.

Overview
===
The WhosNext application is written purely with HTML5 + TypeScript + AngularJS, following the best practices advised by Microsoft.
 
- Main UI
 
![Whos Next Main UI](https://raw.githubusercontent.com/daxnet/pkiwhosnext/master/other/whosnext1.png)

- Visual Studio Code

![Visual Studio Code](https://raw.githubusercontent.com/daxnet/pkiwhosnext/master/other/whosnext2_vscode.png)

Source Code
===
The source code is written in HTML5 + TypeScript + AngularJS, using Microsoft Visual Studio Code. To use VS Code to compile and play around the application, please make sure you have used the correct version of TypeScript. As Microsoft SDKs also provides an earlier version of TypeScript, compile the application against that version will not work.

To change the tsc compiler, open the `task.json` file under `.vscode` folder, locate the following line, and change the `command` parameter:

    {
	"version": "0.1.0",

	// The command is tsc. Assumes that tsc has been installed using npm install -g typescript
	"command": "<!-- *** CHANGE THIS ACCORDINGLY *** -->",

	// The command is a shell script
	"isShellCommand": true,

	// Show the output window only if unrecognized errors occur.
	"showOutput": "silent",

	// Tell the tsc compiler to use the tsconfig.json from the open folder.
	"args": ["-p", "."],

	// use the standard tsc problem matcher to find compile problems
	// in the output.
	"problemMatcher": "$tsc"
	}

In order to protect the staff's privacy, employee avatars are not included in this repository. For PerkinElmer staffs who want to study the source code and compile and play around, please download the avatars from ``\\shadev308\Sharing\People\sunnychen\pkiwhosnext\images.zip``, and extract all the files and put it to the root folder of this application. After that, you can open the `index.html` to start the application.

