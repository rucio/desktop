import axios from "axios";

/**
 * Attempts login with `authtype` Strategy from Rucio-Server
 * @param {String} authtype "userpass" or "x509"
 * @param {String} account Valid Rucio Account
 * @param {String} username Account identity: Username
 * @param {String} password Account identity: Password
 * @param {String} clientcert 
 */
export function login(
  authtype,
  account,
  username,
  password,
) {
  const payload = {
    currentUser:
      authtype === "userpass"
        ? { account: account, username: username, password: password }
        : { account: account },
    configs: JSON.parse(localStorage.getItem("Accounts")),
    authtype: authtype
  };

  return axios.post("/login", {
    payload,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}
