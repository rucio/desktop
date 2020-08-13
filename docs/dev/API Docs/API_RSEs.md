# Rucio Desktop API Reference
## Rucio Storage Elements

The Storage feature of Rucio Desktop heavily relies on Rucio REST APIs for RSEs or Rucio Storage Elements for performing major CRUD operations for RSE Settings, Attributes, and Protocols. The RSE APIs are the wrappers around the Rucio REST APIs and provide simplified `POST` Requests to http://localhost:3004.

### Endpoints

```HTTP
POST /rses
```

* **Usage** : Retrieves an array of Rucio Storage Elements for a Rucio `server`.

* **Request Body**: JS Object with following keys

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

#### Payload Keys

`certlocation` (Type: String) : Location of the CA_Cert issued by Rucio. Used to make HTTPS requests.

`server` (Type: Object) : Server Details `{name, host}`. 

* `name` key should be the name specified in `server_name` key of Account Configurations at the time of adding a new account.

* `host` should be of String type, containing the Server Hostname.

Example:

```JS

const server = {
  name: "rucio-server-x509",
  host: "rucio-host",
};

```

`token` (Type: String) : Holds the value for `X-Rucio-Auth-Token` received for the `server` at time of login.

* **Response**: Array of RSEs on the `server` with the following keys for each object

```JS

[
  ...{
    rse_type: "DISK",
    region_code: null,
    ISP: null,
    updated_at: "Fri, 07 Aug 2020 11:53:21 UTC",
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

Other Response Codes:
	
* **200** OK – DIDs found.
* **400** Bad Request – Invalid RSE Expression.
* **401** Unauthorized – Invalid Auth Token.
* **500** Internal Server Error – Internal Error.

All response codes can be found in Rucio's `GET /rses` Documentation [here](https://rucio.readthedocs.io/en/latest/restapi/rse.html#get--rses-)

---

```HTTP
POST /rse/info
```

* **Usage** : Retrieves an object containing Settings and Protocols for a given `rse`

* **Request Body**: JS Object with following keys

```JS

const payload = {
  certlocation: String,
  server: {
    name: String,
    host: String,
  },
  token: String,
  rse: String,
};

```

`certlocation` (Type: String) : Location of the CA_Cert issued by Rucio. Used to make HTTPS requests.

`server` (Type: Object) : Server Details `{name, host}`. 

* `name` key should be the name specified in `server_name` key of Account Configurations at the time of adding a new account.

* `host` should be of String type, containing the Server Hostname.

`token` (Type: String) : Holds the value for `X-Rucio-Auth-Token` received for the `server` at time of login.

`rse` (Type: String) : Rucio Storage Element (RSE) name to get INFO.

* **Response**: Object with info about the RSE.

Response Data Example:

```javascript

const responseData = {
  third_party_copy_protocol: 1,
  rse_type: "DISK",
  domain: ["lan", "wan"],
  availability_delete: true,
  delete_protocol: 1,
  availability_read: true,
  deterministic: true,
  write_protocol: 1,
  read_protocol: 1,
  staging_area: false,
  credentials: null,
  availability_write: true,
  lfn2pfn_algorithm: "hash",
  rse: "XRD1",
  sign_url: null,
  qos_class: null,
  volatile: false,
  verify_checksum: true,
  id: "685dc52f932d4de697e8d2c335559739",
  protocols: [
    {
      extended_attributes: null,
      hostname: "xrd1",
      prefix: "//rucio",
      domains: {
        wan: { read: 1, write: 1, third_party_copy: 1, delete: 1 },
        lan: { read: 1, write: 1, delete: 1 },
      },
      scheme: "root",
      port: 1094,
      impl: "rucio.rse.protocols.gfal.Default",
    },
  ],
};

```

Other Response Codes:

* **200**: SUCCESS
* **401**: Invalid Credentials
* **500**: Internal Server Error (or Application Error)

---

```HTTP
POST /rse/attr
```

* **Usage** : Retrieves an object containing Attributes for a given `rse`

* **Request Body**: JS Object with following keys

```JS

const payload = {
  certlocation: String,
  server: {
    name: String,
    host: String,
  },
  token: String,
  rse: String,
};

```

`certlocation` (Type: String) : Location of the CA_Cert issued by Rucio. Used to make HTTPS requests.

`server` (Type: Object) : Server Details `{name, host}`. 

* `name` key should be the name specified in `server_name` key of Account Configurations at the time of adding a new account.

* `host` should be of String type, containing the Server Hostname.

`token` (Type: String) : Holds the value for `X-Rucio-Auth-Token` received for the `server` at time of login.

`rse` (Type: String) : Rucio Storage Element (RSE) name to get Attributes.

* **Response**: Object with RSE Attributes.

Response Data Example:

```JS

{ fts: "https://fts:8446", XRD1: true }

```

Other Response Codes:

* **200**: SUCCESS
* **401**: Invalid Credentials
* **500**: Internal Server Error (or Application Error)

---

```HTTP
POST /rse/protocols
```

* **Usage** : Retrieves an object containing Protocols for a given `rse`

* **Request Body**: JS Object with following keys

```JS

const payload = {
  certlocation: String,
  server: {
    name: String,
    host: String,
  },
  token: String,
  rse: String,
};

```

`certlocation` (Type: String) : Location of the CA_Cert issued by Rucio. Used to make HTTPS requests.

`server` (Type: Object) : Server Details `{name, host}`. 

* `name` key should be the name specified in `server_name` key of Account Configurations at the time of adding a new account.

* `host` should be of String type, containing the Server Hostname.

`token` (Type: String) : Holds the value for `X-Rucio-Auth-Token` received for the `server` at time of login.

`rse` (Type: String) : Rucio Storage Element (RSE) name to get Protocols.

* **Response**: Object with RSE Protocols.

Response Data Example:

```JS

const responseData = [
  {
    extended_attributes: null,
    hostname: "xrd1",
    prefix: "//rucio",
    domains: {
      wan: { read: 1, write: 1, third_party_copy: 1, delete: 1 },
      lan: { read: 1, write: 1, delete: 1 },
    },
    scheme: "root",
    port: 1094,
    impl: "rucio.rse.protocols.gfal.Default",
  },
];

```

Other Response Codes:

* **200**: SUCCESS
* **401**: Invalid Credentials
* **500**: Internal Server Error (or Application Error)

---

```HTTP
POST /rse/usage
```

* **Usage** : Retrieves an object containing Usage info for a given `rse`

* **Request Body**: JS Object with following keys

```JS

const payload = {
  certlocation: String,
  server: {
    name: String,
    host: String,
  },
  token: String,
  rse: String,
};

```

`certlocation` (Type: String) : Location of the CA_Cert issued by Rucio. Used to make HTTPS requests.

`server` (Type: Object) : Server Details `{name, host}`. 

* `name` key should be the name specified in `server_name` key of Account Configurations at the time of adding a new account.

* `host` should be of String type, containing the Server Hostname.

`token` (Type: String) : Holds the value for `X-Rucio-Auth-Token` received for the `server` at time of login.

`rse` (Type: String) : Rucio Storage Element (RSE) name to get RSE Usage.

* **Response**: Object with RSE Protocols.

Response Data Example:

```JS

const responseData = {
  files: 0,
  used: 0,
  rse: "XRD1",
  updated_at: "Fri, 07 Aug 2020 11:53:25 UTC",
  free: null,
  source: "rucio",
  total: 0,
  rse_id: "685dc52f932d4de697e8d2c335559739",
};

```

Other Response Codes:

* **200**: SUCCESS
* **401**: Invalid Credentials
* **500**: Internal Server Error (or Application Error)

---