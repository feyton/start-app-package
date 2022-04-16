## start-app-package
[![NPM](https://nodei.co/npm/startapp-node.png?mini=true)](https://npmjs.org/package/startapp-node)

## Introduction
Before I started developing application with Node.js, I was using Django- A python web framework.
What I liked most about Django was the structure especially the **App** scope, where everything is scoped and you just export urls outside that scope. When it come to Node js development the structure are scattered and when you are orking as a team it become cumbersome to find a file in controllers, routes, middlewares while these files have the same purpose they are in same scope. That is where this package comes in. <br/> **What I liked about Django in the speed and scalability of node.js application built with Express**

## Getting started
This package is a **Development dependency** and to use it follow the steps mentioned bellow

> Installation


`npm install -D start-app`
> Usage: Add the following script to your `package.json`

`"startapp": "npx startapp-node "`

> Creating your first application

Run: `npm run startapp <name-of-app>` Replace the **name** with the scope you will be working in. For example, if you are dealing with users. You just run `npm run startapp`

## How it works
By default, the package assume that you have all your application files in `./src` directory. That is where all scoped version will be added.

## How to contribute


## About author