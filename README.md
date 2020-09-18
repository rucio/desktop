<div align="center">
    <img alt="Rucio Desktop" src="https://user-images.githubusercontent.com/30192068/93554908-37818d00-f992-11ea-934d-aaacfa04f072.png" width=100% />
</div>

# Rucio Desktop
![GitHub package.json version](https://img.shields.io/github/package-json/v/rucio/desktop?style=flat-square)

## Description

Rucio Desktop is a new and easier way to use Rucio with a modern graphical user interface. You can download Rucio Desktop and use it as a client or a Rucio admin. It provides a simpler workflow in comparision to traditional command-line interface provided by Rucio for both type of users.

<div align="center">
    <img alt="Desktop" src="https://user-images.githubusercontent.com/30192068/91706755-73e47900-eb9c-11ea-818f-92dc91a51766.png" width=100% />
</div>

### Key Features
* **Multi-Account Setup**: Add all your accounts associated with Rucio in the app and manage them in a really efficient way, right from your desktop in a few clicks.
* **Explorer**: Browse the Rucio namespace for all your connected servers using the [FUSE-POSIX](https://github.com/rucio/fuse-posix) interface.
* **Storage**: Manage RSE Configurations & Protocols for your connected Rucio Instance. Rollback settings to previous versions in a click.
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

For Detailed Instructions refer to our Usage Guide [here](https://github.com/rucio/desktop/tree/master/docs).

## Documentation

* [User Documentation](https://github.com/rucio/desktop/tree/master/docs) - includes client setup and usage guide.

* [Developer Documentation](https://github.com/rucio/desktop/tree/master/docs/dev) - Includes instructions for setting up dev environment, Component and API references.

## Contributing

If you are interested in contributing to this project to add features or make bug fixes, we would encourage you to have a look at our [CONTRIBUTION GUIDE](CONTRIBUTING.md).

A huge thanks to all the [contributors](AUTHORS.md) of Rucio Desktop!

## Extra Notes

* This project is under development as part of the Google Summer of Code 2020 project for CERN-HSF's Rucio.
* It is not yet ready for production release.
* This software is tested on Ubuntu 18.04 LTS.
* Using the Explore feature in the app requires installation of [FUSE-POSIX](https://github.com/rucio/fuse-posix) Interface on the system.
