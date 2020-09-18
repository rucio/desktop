<div align="center">
    <img alt="Desktop_Docs" src="https://user-images.githubusercontent.com/30192068/93555023-8a5b4480-f992-11ea-8aee-0f70ca53697e.png" width=100% />
</div>

# Rucio Desktop : User Documentation
v0.1.2

# Table of Contents

<!--ts-->

* [Description](#description)
    * [Features](#features)
* [Installation](#installation)
    * [Prerequisites](#pre-requisites)
    * [Download the latest binaries](#download-the-binaries)
    * [Build from source](#build-from-source)
* [Usage Guide](#usage-guide)
    * [Initial Setup](#initial-setup)
    * [Explorer](#explorer)
    * [Storage](#storage)
    * [Settings](#settings)
    * [Accounts](#accounts)
* [Developer Documentation](https://github.com/rucio/desktop/tree/master/docs/dev)
* [Support](#support)
* [Extra Notes](#extra-notes)

<!--te-->

## Description

Rucio Desktop (codename: rocinante) is a GUI desktop client for Rucio - Exascale Scientific Data Management Framework. It is a new and easier way to use Rucio with a modern user experience rich interface. 

### Features

* __Explore the Rucio Namespace__: Combined with the Rucio's latest [FUSE-POSIX interface](https://github.com/rucio/fuse-posix), you can now easily navigate through multiple Rucio namespaces on different servers. Rucio Desktop allows allows the users to view file metadata in just a click.

* __Server Configurations__: Manage and edit all your server configurations right from the application in an elegant and quick way. You can all more than one servers and update the configurations in real-time.

* __Mutli-Account Setup__: Get info about all your Rucio accounts on multiple-servers and update the configurations without the hassle of typing commands in a command line.

## Installation

### Pre-requisites
To use Rucio Desktop's Explore feature, you will have to install Rucio FUSE-POSIX interface, since the application relies on it to connect to Rucio Namespaces.

__NOTE:__ The file download feature on the Explorer only works on CentOS and Debian based systems due to some missing dependencies for Ubuntu based systems. This shall be fixed in a future release.

### Download the Binaries

Binaries for Debian, CentOS, and MacOS shall be available after first official release. Currently the software is in its development phase.

### Build From Source

Instructions to build from source shall be available with Rucio Desktop v0.3, currently you can run and test out the software in development mode.

Instructions to setup development environment can be found [here](https://github.com/rucio/desktop/tree/master/docs/dev#setting-up-a-developement-environment).

## Support
If you are looking for support, join us on our Slack [#support](https://rucio.slack.com/messages/#support) channel, or send an email to our public mailing list [rucio-users@googlegroups.com](mailto:rucio-users@googlegroups.com).

## Extra Notes

This project is under development as part of the Google Summer of Code 2020 project for CERN-HSF's Rucio.
It is not yet ready for production release.
This software is tested on Ubuntu 18.04 LTS.
