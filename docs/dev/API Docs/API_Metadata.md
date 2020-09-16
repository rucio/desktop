# Rucio Desktop API Reference
## DID Metadata

To support the [FUSE module](https://github.com/rucio/fuse-posix), Rucio Desktop provides metadata retrieval for DIDs. 
The Metadata APIs are the wrappers around the Rucio REST APIs and provide simplified `POST` Requests to http://localhost:3004.

| Endpoints | Short Description |
| --------- | ----------------- |
| [/metadata](#post-metadata) | Get Metadata for a DID |

---

### `POST /metadata`

* **Usage** : Retrieves an object with DID metadata.

* **Request Body**: JS Object with following keys

```JS

const payload = {
  certlocation: String,
  serverHost: String,
  token: String,
  scope: String,
  did: String,
};

```

#### Payload Keys

`certlocation` (Type: String) : Location of the CA_Cert issued by Rucio. 
Used to make HTTPS requests.

`serverHost` (Type: Object) : should be of String type, containing the Server Hostname.

`token` (Type: String) : Holds the value for `X-Rucio-Auth-Token` received for the `server` at time of login.

`scope` (Type: String) : Scope name

`did` (Type: String) : DID name to get metadata

#### Response: 

Array of RSEs on the `server` with the following keys for each object

```JSON

{
    "account": "root",
    "adler32": "4d5******",
    "name": "file3",
    "bytes": 10485760,
    "length": 1,
    "scope": "test",
    "type": "FILE",
    "md5": "d98bec0b12*****************"
}

```

Other Response Codes:
	
* **200** OK – DIDs found.
* **401** Unauthorized – Invalid Auth Token.
* **500** Internal Server Error – Internal Error.