import { Cookies } from "react-cookie";
import axios from "axios";
import { getAllServersByNames } from "./Servers";
const cookies = new Cookies();

/**
 * Saves the login information of the current user in local storage.
 * The info can be used to retrieve the token again when it expires.
 *
 * @param {String} authtype "userpass" OR "x509"
 * @param {String} account
 * @param {String} username
 * @param {String} password
 */
export function saveCurrentUser(authtype, account, username, password) {
  localStorage.setItem("authtype", authtype);
  localStorage.setItem("CURR_ACCOUNT", account);
  localStorage.setItem("CURR_USERNAME", username);
  localStorage.setItem("CURR_PASSWORD", password);
  localStorage.setItem("APP_USER", "Rucio User");
}

/**
 * Removes the user details from local storage.
 */
export function purgeCurrentUser() {
  localStorage.removeItem("CURR_ACCOUNT");
  localStorage.removeItem("CURR_USERNAME");
  localStorage.removeItem("CURR_PASSWORD");
}

/**
 * Returns an object with current user's credentials
 */
export function getCurrentUser() {
  return {
    account: localStorage.getItem("CURR_ACCOUNT"),
    username: localStorage.getItem("CURR_USERNAME"),
    password: localStorage.getItem("CURR_PASSWORD"),
  };
}

/**
 * Returns true if valid AuthTokens are present in Cookies corresponding to connected servers.
 */
export function authTokensPresent() {
  var authTokens = [];
  const servers = getAllServersByNames();
  if (servers.length === 0) return false;

  for (var i = 0; i < servers.length; i++) {
    var tokenValue = cookies.get(servers[i]);
    if (tokenValue !== undefined) authTokens.push(tokenValue);
  }

  return authTokens.length > 0;
}

export function addNewAccountConfig(
  account,
  username,
  password,
  servername,
  hostserver,
  authserver,
  certlocation,
  clientkey,
  clientcert,
  mountpoint,
  authtype
) {
  const newAccountConfig = {
    account: account,
    username: username,
    password: password,
    server_name: servername,
    rucio_host: hostserver,
    auth_host: authserver,
    ca_cert: certlocation,
    client_cert: clientcert,
    client_key: clientkey,
    mountpoint: mountpoint,
    auth_type: authtype,
    client_x509_proxy: "$X509_USER_PROXY",
    request_retries: 3,
  };

  try {
    const accountConfigs = JSON.parse(localStorage.getItem("Accounts"));
    accountConfigs.push(newAccountConfig);
    localStorage.setItem("Accounts", JSON.stringify(accountConfigs));
    saveUserConfigs(servername + ".cfg", "client", newAccountConfig);
  } catch (err) {
    const accountConfigs = [];
    accountConfigs.push(newAccountConfig);
    localStorage.setItem("Accounts", JSON.stringify(accountConfigs));
    saveUserConfigs(servername + ".cfg", "client", newAccountConfig);
  }
}

/**
 * Returns the current account config by `account` and `server_name`
 * @param {String} account
 * @param {String} server
 */
export function getAccountConfig(account, server) {
  const allConfigs = JSON.parse(localStorage.getItem("Accounts"));
  for (let i = 0; i < allConfigs.length; i++) {
    if (
      account === allConfigs[i].account &&
      server === allConfigs[i].server_name
    ) {
      return [allConfigs[i], i];
    }
  }

  return false;
}

/**
 * Persists the `params` Object containing configuration at `index` in LocalStorage
 * @param {Object} params
 * @param {number} index
 */
export async function updateConfig(params, index) {
  const accounts = JSON.parse(localStorage.getItem("Accounts"));
  try {
    accounts.splice(index, 1, params);
    localStorage.setItem("Accounts", JSON.stringify(accounts));
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Deletes the Account config at `index` from Local Storage
 * @param {number} index 
 */
export async function deleteConfig(index) {
  const accounts = JSON.parse(localStorage.getItem("Accounts"));
  try {
    accounts.splice(index, 1);
    localStorage.setItem("Accounts", JSON.stringify(accounts));
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Takes in servername and returns the current account's config file corresponding to the server.
 * @param {String} servername
 */
export function getCurrentAccountConfig(servername = "") {
  const accountConfigs = JSON.parse(localStorage.getItem("Accounts"));
  const currentUser = getCurrentUser();
  for (let i = 0; i < accountConfigs.length; i++) {
    if (
      servername === accountConfigs[i].server_name &&
      currentUser.account === accountConfigs[i].account
    )
      return accountConfigs[i];
  }

  return {};
}

export function saveUserConfigs(filepath, block, params) {
  const payload = { filepath: filepath, block: block, params: params };

  return axios.post("/savecfg", { payload });
}
