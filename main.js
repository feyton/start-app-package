#!/usr/bin/env node
import { existsSync, promises as fsPromises } from "fs";
import path, { join } from "path";
import { createInterface } from "readline";
const __dirname = path.resolve();

const rlPrompt = `\nWelcome to createApp interface.\nStarting...`;

// Text to be written to the files
const modelText = `//The models file is used to define the models that will be used to 
// link on database

// import mongoose from "mongoose";
// const { Schema, model } = mongoose;

//define your models here



//export your modules here
export {}

`;

const routeTxt = `//Use this file to specify the routes for the app
//remember to include this routes in the index
import { Router } from "express";
import * as views from "./views.js";
import * as middleware from "./middleware.js";

const router = Router()

//write your routes here


//Keep this line at the bottom

export default router;
`;
const viewsTxt = `//This is where all business logic is handled
//Equivalent to middleware. Create functions that process request here
//Remember to import all in routes
import * as models from "./models.js";

//add your function to export
export {}
`;
const validatorTxt = `//This is where all requests checks are handled like validation
// import {body, check, validationResult} from "express-validator";
//import * as models from "./models.js"; //import if needed


//add your function to export

`;
const utilsText = `//Hanle all other utility functions here and import them into other files
export {}
`;

const middlewareTxt = `//Add prerequest check here to be used in routes
export {}
`;
// A welcome message

console.log(rlPrompt);
// Where business happens
const createFiles = async (dir) => {
  await fsPromises.appendFile(join(dir, "routes.js"), routeTxt, (err) => {
    throw err;
  });
  await fsPromises.appendFile(join(dir, "models.js"), modelText, (err) => {
    throw err;
  });
  await fsPromises.appendFile(
    join(dir, "validator.js"),
    validatorTxt,
    (err) => {
      throw err;
    }
  );
  await fsPromises.appendFile(
    join(dir, "middleware.js"),
    middlewareTxt,
    (err) => {
      throw err;
    }
  );
  await fsPromises.appendFile(join(dir, "utils.js"), utilsText, (err) => {
    throw err;
  });
  await fsPromises.appendFile(join(dir, "views.js"), viewsTxt, (err) => {
    throw err;
  });

  console.log(join(dir, "middleware.js"));
};

//checking if we are not overwriting files

const checkDir = async (dir) => {
  try {
    if (!existsSync(dir)) {
      //create directories
      console.log(`\tCreating directories...\n\n`);
      await fsPromises.mkdir(dir, { recursive: true }); //enable recursive to create subdirectories when they are there
      await createFiles(dir);
      console.log(`Your new app has been created successfully.\n`);
    } else {
      console.log(`\n\tThe app/directory already exits!\n`);
    }
  } catch (error) {
    console.log(error);
  }
};
let appName;

var questions = [
  `What's the name of the app we are creating today?\n \t`,
  `What is the name of your app?\n\t`,
  `Read? Give it a name..\n\t`,
  `\tGet ready to be amazed. Name your app first:\n\t`,
];
var closingMessage = [
  `\tHappy coding today\n`,
  `\tHappy hacking today...`,
  `\tIt was so good to get it started\n`,
];
const getAppName = createInterface({
  input: process.stdin,
  output: process.stdout,
});
getAppName.question(
  questions[Math.floor(Math.random() * questions.length)],
  async (inputName) => {
    if (!inputName || inputName.length < 1 || inputName == undefined) {
      console.log(`\n\tA name is required to create an app!\n`);
      process.exit(1);
    }
    appName = inputName;
    if (appName == "undefined") {
      console.log(
        `\n\tA name is required  to create an app! Don't just hit enter..`
      );
      process.exit(1);
    }
    console.log(`\n\tWe are creating your app -${appName}!`);
    getAppName.close();
  }
);

getAppName.on("close", async () => {
  const appDir = join(__dirname, "src", `${appName}App`); //get current directory, replace the "src" with your root
  await checkDir(appDir);
  console.log(
    closingMessage[Math.floor(Math.random() * closingMessage.length)] //random texts are my favorite
  );
  process.exit(0);
});

getAppName.on("SIGINT", () => {
  //check if the user exit by hitting CTRL + C or CTRL + D and give them a goodbye
  console.log(`\n\tSorry to see you go so sudden `);
  process.exit(1);
});
