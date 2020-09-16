# Rucio Desktop : Developer Documentation

## API Reference

Rucio Desktop holds a client side node server which serves several easy REST APIs to connect to Rucio instances and also to the FUSE-POSIX interface.
Most of the APIs are wrappers around the [Rucio RESTful APIs](https://rucio.readthedocs.io/en/latest/rest.html) and simplify the workflow by combining some of them thorugh Javascript Promises and other methods. 
ALl the REST API wrappers follow a single `POST` method and use [Axios](https://github.com/axios/axios) or [Superagent](https://visionmedia.github.io/superagent/) to send requests to Rucio Servers.

**Testing the APIs**

You can either test the APIs by command-line methods using cURL or you may use tools such as Postman to test the APIs.

## Available APIs

<!--ts-->

- [Authentication](API_Auth.md)
- [Server Config](API_Config.md)
- [FUSE Module](#fuse-module)
- [DID Metadata](API_Metadata.md)
- [Rucio RSEs](API_RSEs.md)

<!--te-->

