# Rucio Desktop : Developer Documentation

## API Reference

Rucio Desktop holds a client side node server which serves several easy REST APIs to connect to Rucio instances and also to the FUSE-POSIX interface.

## REST API Endpoints

<!--ts-->

- [Authentication](#authentication)
- [Server Config](#server-config)
- [FUSE Module](#fuse-module)
- [DID Metadata](#did-metadata)
- [Rucio RSEs](#rucio-rses)
<!--te-->

### Rucio RSEs

```HTTPS
GET /rses
```

BODY:

```JS
const payload = {
  certlocation: String,
  server: {
    name: String,
    host: String,
  },
  token: String,
};
```

Response Data:

```JS
[
  ...{
    rse_type: String,
    region_code: null,
    ISP: null,
    updated_at: Date,
    vo: "def",
    qos_class: null,
    id: "d5ce986de4f5492db5a33190f3f4c4e4",
    deleted_at: null,
    availability: 7,
    city: null,
    deterministic: true,
    continent: null,
    volatile: false,
    country_name: null,
    ASN: null,
    deleted: false,
    rse: "BNL-BOTO",
    latitude: null,
    staging_area: false,
    created_at: "Fri, 07 Aug 2020 11:53:21 UTC",
    time_zone: null,
    longitude: null,
  },
];
```
