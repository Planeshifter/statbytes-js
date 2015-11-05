# statbytes-js
StatBytes presentation on JavaScript

## Abstract

In this talk, I will give a practical introduction to using JavaScript for visualization tasks and scientific computing. JavaScript, once maligned as a simple tool to create animations for websites, today powers complex, data-intensive web applications both server- and client-side via [Node.js](http://www.nodejs.org).

I will start by outlining a modern workflow based on [browserify](http://browserify.org/), which modularizes development and gives oneself access to >150,000 NPM modules to be used in the Browser. [NPM](http://www.npmjs.com/), the official Node.js package manager, has eclipsed all other language package managers both in terms of sheer size, as well as rate of growth. JavaScript packages exist for incredibly diverse applications such as robotics, cryptography, infrastructure management, and natural language processing.

Next, I will give an introduction to data visualization with Mike Bostock's [D3.js](http://d3js.org/) library (D3 standing for "Data-Driven Documents"). Main concepts of the library such as selections and data binding will be discussed. As an example, we will discuss the creation of an interactive histogram, which can be manipulated by user input.

Finally, I will demonstrate usage of novel open-source JavaScript library [compute-io](https://github.com/compute-io) for statistical computations and how to integrate it into the previously laid out workflow. The goal of compute-io, a project by Athan Reines, is to build a numerical computing environment for JavaScript comparable to the features of languages such as Matlab, R or Python. I have become a major contributor of this effort, and amongst others implemented a comprehensive library for working with statistical distributions. We will discuss the API of these tools and how they can be used to power statistics on the Web.

## Prerequisites

- If you wish to execute the code examples on your own computer, you should have the following installed: JavaScript runtime [Node.js](https://nodejs.org/en/), which comes with package manager [NPM](https://www.npmjs.com)
- During the presentation, we will create a little data visualization with d3. Unzip [sandbox.zip](https://github.com/Planeshifter/statbytes-js/raw/master/sandbox.zip) into a folder and you are ready to follow along.

## Slides

- [Open in new Browser window](http://statbytes.philipp-burckhardt.com)
