<p align="center">
    <img alt="Notifier" src="https://user-images.githubusercontent.com/30192068/90972832-ee2c5200-e539-11ea-8951-d1103dc2583d.png" width=100% />
</p>

# Rucio Desktop : Developer Documentation
v0.1.5

# Table of Contents

<!--ts-->

* [Introduction](#introduction)
* [Tech Stack](#tech-stack)
* [Contributing to the project](#contributing-to-the-project)
* [Setting Up a Developement Environment](#setting-up-a-development-environment)
    * [Installing FUSE-POSIX Interface](#installing-fuse-posix-interface)
    * [Installing NodeJS](#installing-nodejs)
    * [Setting up the repository](#setting-up-the-repository)
    * [Setup Scripts](#setup-scripts)
    * [Troubleshooting](#troubleshooting)
* [Component Reference](#component-reference)
* [API Reference](https://github.com/rucio/desktop/tree/master/docs/dev/API%20Docs)
* [Support](#support)
* [Extra Notes](#extra-notes)
<!--te-->

## Introduction
Welcome to Rucio Desktop's Developer Documentation!
Rucio Desktop (codename: rocinante) is a GUI desktop client for Rucio - Exascale Scientific Data Management Framework. 
It was built by [@viveknigam3003](https://github.com/viveknigam3003) and has been improved with the help of our open-source [contributors](https://github.com/rucio/desktop/blob/master/AUTHORS.md).

We __highly recommend__ that before contributing to the project you must get yourself familiar with Rucio itself, since the application highly relies on Rucio for most of its APIs and functionality. Some references are attached below:

* [Rucio Documentation](https://rucio.readthedocs.io/en/latest/)
* [Rucio - Scientific data management (paper)](https://arxiv.org/abs/1902.09857)
* [rucio/rucio](https://github.com/rucio/rucio)

## Tech Stack

Before contributing to the project, you must be familiar with the tech stack used to build this project.

* ReactJS `(^16.13.1 and above)`
* React Router
* Redux
* ExpressJS
* Electron `(^9.1)`

### Note on React JS v16.13

Rocinante is build with ReactJS.
The version of React used at the time of development was v16.13.1.
This means that the application uses features such as [Hooks](https://reactjs.org/docs/hooks-intro.html) and [Context](https://reactjs.org/docs/context.html).
The app also avoids the usage of classes hence completely using the functional programming paradigm.

## Contributing to the project

To read about contribution guidelines refer to our [CONTRIBUTION GUIDE](https://github.com/rucio/desktop/blob/master/CONTRIBUTING.md)

## Setting Up a Developement Environment

Setting up a development environment for Rocinante requires some prerequisites to use the app with it's complete functionality.
You may skip the installation of the FUSE-POSIX interface if you don't wish to use the __Explore__ section of the application.

### Installing FUSE-POSIX Interface

Refer to the [FUSE-POSIX](https://github.com/rucio/fuse-posix#getting-started) installation guide for setting up RucioFS on your UNIX based machine.

### Installing NodeJS

To run the application from source you will need NodeJS (LTS) installed on your system.
Download the correct binary from the [NPM Official Website](https://nodejs.org/en/). After installing `node` on your system check the version using.

```shell
$ node -v
v12.16.2

$ npm -v
6.14.6
```

Make sure that the `node` version > 12.16 (LTS) or is equal to the current release.


### Setting up the repository and dependencies

Fork the repository and then clone your private repository directly on your system.

```shell
$ git clone https://github.com/<your-username>/desktop.git
$ ./tools/setup-dev.js
```

### Starting a dev environment

The following helper script will start the development server which will be available on __http://localhost:3005__

```shell
$ npm run dev
```

This will give you the following output if the script succeeds

```shell

Compiled successfully!
[0] 
[0] You can now view rocinante in the browser.
[0] 
[0]   Local:            http://localhost:3005
[0]   On Your Network:  http://<your.public.ip>:3005
[0] 
[0] Note that the development build is not optimized.
[0] To create a production build, use npm run build.
[0] 
[1] [nodemon] 2.0.4
[1] [nodemon] to restart at any time, enter `rs`
[1] [nodemon] watching path(s): *.*
[1] [nodemon] watching extensions: js,mjs,json
[1] [nodemon] starting `node app.js`
[1] [INFO] Rucio running at http://localhost:3004

```

This shall give you the minimal dev testing setup.
If you wish to see how the app will behave post production, you will also need to start the Electron app.

To run the desktop app window for the software. 
Open another terminal window and run:

```shell
$ npm run electron
```

### Troubleshooting

* Use `ctrl +` / `ctrl -` to Zoom in or Zoom out of the the application if the resolution seems off.

* Use `ctrl + R` or `cmd + R` (on MacOS) to refresh/reset the app if app freezes or crashes.

* To __Reset the development environment__ use the following helper tool

```shell
$ ./tools/reset-env.js
```

## Support
If you are looking for support, join us on our Slack [#support](https://rucio.slack.com/messages/#support) channel, or send an email to our public mailing list [rucio-users@googlegroups.com](mailto:rucio-users@googlegroups.com).

## Extra Notes

This project is under development as part of the Google Summer of Code 2020 project for CERN-HSF's Rucio.
It is not yet ready for production release.
This software is tested on Ubuntu 18.04 LTS.
