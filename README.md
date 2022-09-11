# jsramverk-backend

Jsramverk-backend is a student project made for practise.

This is an exercise made for learning how create a API.

This is an API made to be used along side a text-editor.

## About

Jsramverk-backend is an API made for creating-, editing- and viewing- documents.

## Example Usage

A site featuring a text-editor, were users everywhere can use to view, create and update documents is in need of an API to fetch-, update- and creat new- documents.
That is where jsramverk-backend comes in.
Jsramverk is an API made for creating-, editing- and viewing- documents in all shapes and sizes.

## Installation

To install this API, one must first download the content featured in this folder and place it in the desired directory.
Afterwards one must then the command `npm install`.

After node (npm) has installed all the dependencies, one must simply run the API with the command `npm start`.

## Structure

Everything, excluding dependencies, can be found in the **/src** directory.
There, one can find the main file, **/src/app.js** and folders with descriptive names.
Each folder contained in the **/src** directory has files described by the folder name.

In the **/src/db** folder are two folders that contain files wich either interact with the database itself (src/db/action) or files that sort the action to be taken by context provided by the content of the POST-requests (src/db/sort).
