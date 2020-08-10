import { Cookies } from "react-cookie";

/**
 * Returns an array of all the server-names for the servers present.
 * This is useful since the tokens are stored in cookies with the server's hostname as the key.
 */
export function getAllServersByNames() {
  const serverNames = [];
  const accounts = JSON.parse(localStorage.getItem("Accounts"));
  for (let i = 0; i < accounts.length; i++){
    const name = accounts[i].server_name;
    serverNames.push(name);
  }

  return serverNames
}

export function serverStatus() {
  const cookies = new Cookies();
  const status = [];
  const servernames = getAllServersByNames();

  // UPDATE LOGIC! THIS DOESN'T WORK
  for (let i = 0; i < servernames.length; i++){
    if (cookies.get(servernames[i]) !== undefined)
      status.push({server: servernames[i], status: "Connected"})
    else {
      status.push({server: servernames[i], status: "Disconnected"})
    }
  }
  
  return status;
}