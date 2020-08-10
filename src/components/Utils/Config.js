import { getCurrentAccountConfig } from "./User";
import { Cookies } from "react-cookie";
import axios from "axios";
const cookies = new Cookies();

/**
 * GETs all the Config sections from the `server`. Works only for ADMIN accounts
 * @param {String} server Rucio Host
 */
export async function getConfig(server) {
  const currentAccountConfig = getCurrentAccountConfig(server);
  const serverObj = {
    name: currentAccountConfig.server_name,
    host: currentAccountConfig.rucio_host,
    auth: currentAccountConfig.auth_host,
  };

  const payload = {
    certlocation: currentAccountConfig.ca_cert,
    server: serverObj,
    token: "",
  };

  try {
    payload.token = cookies.get(currentAccountConfig.server_name);
  } catch (err) {
    return 401;
  }

  try {
    const response = axios.post("/config", {
      payload,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (err) {
    return 500;
  }
}

/**
 * Attempts to add the config `section` with `option` and `value` on the `server`. Works only for ADMIN accounts
 * @param {String} server Rucio Host
 * @param {{section: String, option: String, value: any}} values
 */
export async function addConfig(server, values) {
  const currentAccountConfig = getCurrentAccountConfig(server);
  const serverObj = {
    name: currentAccountConfig.server_name,
    host: currentAccountConfig.rucio_host,
    auth: currentAccountConfig.auth_host,
  };

  const payload = {
    certlocation: currentAccountConfig.ca_cert,
    server: serverObj,
    token: "",
    values: values,
  };

  try {
    payload.token = cookies.get(currentAccountConfig.server_name);
  } catch (err) {
    return 401;
  }

  try {
    const response = axios.post("/addconfig", {
      payload,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (err) {
    return 500;
  }
}

/**
 * Attempts to delete the config `section` with `option` on the `server`. Works only for ADMIN accounts
 * @param {String} server Rucio Host
 * @param {{section: String, option: String}} values
 */
export async function delConfig(server, values) {
  const currentAccountConfig = getCurrentAccountConfig(server);
  const serverObj = {
    name: currentAccountConfig.server_name,
    host: currentAccountConfig.rucio_host,
    auth: currentAccountConfig.auth_host,
  };

  const payload = {
    certlocation: currentAccountConfig.ca_cert,
    server: serverObj,
    token: "",
    values: values,
  };

  try {
    payload.token = cookies.get(currentAccountConfig.server_name);
  } catch (err) {
    return 401;
  }

  try {
    const response = axios.post("/delconfig", {
      payload,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (err) {
    return 500;
  }
}
