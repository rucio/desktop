<div align="center">
    <img alt="Notifier" src="https://user-images.githubusercontent.com/30192068/90972709-254e3380-e539-11ea-9f81-8fc13e3055f5.png" width=100% />
</div>

# Rucio Desktop
![GitHub package.json version](https://img.shields.io/github/package-json/v/rucio/desktop?style=flat-square)
![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/rucio/desktop/react?style=flat-square)
![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/rucio/desktop/dev/electron?style=flat-square)

## Description

Rucio Desktop is a new and easier way to use Rucio with a modern graphical user interface.

### Key Features
* **Multi-Account Setup**: Add all your accounts associated with Rucio in the app and manage them in a really efficient way, right from your desktop in a few clicks.
* **Explorer**: Browse the Rucio namespace for all your connected servers using the [FUSE-POSIX](https://github.com/rucio/fuse-posix) interface.
* **Admin and User Panel**: Login to the app as a Rucio Admin or a Rucio User and manage all your account settings right from the app.
* **Server Configuration**: (For Rucio-Admin Accounts) Manage server configurations with ease.
Create, add, update, and delete `config` sections and options.

## Usage

#### Connecting your Rucio Account

After you start the app for the first time, you'll need to connect your Rucio account to the app.
Simply click on __Add your Rucio account__ and setup a new account with your USERPASS or X509 credentials, and the server details.

After setting up the account, you'll be able to log into the app using that account.

#### Adding Multiple Rucio Accounts

You can also set up multiple Rucio Accounts on the app. 
Simply add more accounts from __Add your Rucio account__ utility from the Login screen or once logged in, click go to **Accounts** and click on **Add a New Account** there.
After adding the details log in to the app using any added account. 
The app will authenticate all the added accounts automatically.

For Detailed Instructions refer to our Usage Guide [here](https://github.com/viveknigam3003/rocinante/blob/master/docs/README.md).

## Documentation

* [User Documentation](https://github.com/viveknigam3003/rocinante/tree/master/docs) - includes client setup and usage guide.

* [Developer Documentation](https://github.com/viveknigam3003/rocinante/tree/master/docs/dev) - Includes instructions for setting up dev environment, Component and API references.

## Extra Notes

* This project is under development as part of the Google Summer of Code 2020 project for CERN-HSF's Rucio.
* It is not yet ready for production release.
* This software is tested on Ubuntu 18.04 LTS.
* Using the Explore feature in the app requires installation of [FUSE-POSIX](https://github.com/rucio/fuse-posix) Interface on the system.
