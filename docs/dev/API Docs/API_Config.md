# Rucio Desktop API Reference
## Rucio Server Configurations

When you connect to a server using Rucio Desktop you can alter the Server Configs easily in the Settings section.
All the changes are made in real-time to server instances and facilitated by REST API wrappers around [Rucio Config APIs](https://rucio.readthedocs.io/en/latest/restapi/config.html).
 The wrappers provide simplified `POST` Requests to http://localhost:3004.

| Endpoints | Short Description |
| --------- | ----------------- |
| [/config](#post-config) | Get all config parameters for a server. |
| [/addconfig](#post-addconfig) | Add a configuration `section`, `option`, `value` for a server. |
| [/delconfig](#post-delconfig) | Deletes a configuration `section` and `option` |

---

### `POST /config`

* **Usage** : Get Configs for a `server`.

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

* **Response**: Object with server configs in the following fashion

```JS
{
  section: { option: value },
  quota: { SCRATCHDISK: 55, LOCALUSERSGROUP: 65 },
};
```

Other Response Codes:
	
* **401** Unauthorized – Invalid Auth Token.
* **500** Internal Server Error – Internal Error.

---
### `POST /addconfig`

* **Usage** : Add a config `{section, option, value}` for a `server`.

* **Request Body**: JS Object with following keys

```JS

const payload = {
  certlocation: String,
  server: {
    name: String,
    host: String,
  },
  token: String,
  values: {
    section: String,
    option: String,
    value: String || Boolean || Number,
  },
};

```
#### Payload Keys

`certlocation` (Type: String) : Location of the CA_Cert issued by Rucio. Used to make HTTPS requests.

`server` (Type: Object) : Server Details `{name, host}`. 

* `name` key should be the name specified in `server_name` key of Account Configurations at the time of adding a new account.

* `host` should be of String type, containing the Server Hostname.

`values` (Type: Object) : Values to add to the server config.

* **Response**: 

**200** OK – Config Added.

**401** Unauthorized – Invalid Auth Token.

**500** Internal Server Error – Internal Error.

---

### `POST /delconfig`

* **Usage** : Deletes a config `{section, option}` for a `server`.

* **Request Body**: JS Object with following keys

```JS

const payload = {
  certlocation: String,
  server: {
    name: String,
    host: String,
  },
  token: String,
  values: {
    section: String,
    option: String,
  },
};

```
#### Payload Keys

`certlocation` (Type: String) : Location of the CA_Cert issued by Rucio. Used to make HTTPS requests.

`server` (Type: Object) : Server Details `{name, host}`. 

* `name` key should be the name specified in `server_name` key of Account Configurations at the time of adding a new account.

* `host` should be of String type, containing the Server Hostname.

`values` (Type: Object) : Values to delete from the server config.

* **Response**: 

**200** OK – Config Added.

**401** Unauthorized – Invalid Auth Token.

**500** Internal Server Error – Internal Error.