import { Cookies } from "react-cookie";
import axios from "axios";
import { getAccountConfig } from "./User";
const cookies = new Cookies();

export async function fetchRSEs(account, server) {
  const [cfg] = getAccountConfig(account, server);
  const serverObj = {
    name: cfg.server_name,
    host: cfg.rucio_host,
    auth: cfg.auth_host,
  };

  const payload = {
    certlocation: cfg.ca_cert,
    server: serverObj,
    token: "",
  };

  try {
    payload.token = cookies.get(cfg.server_name);
  } catch (err) {
    return 401;
  }

  try {
    const response = axios.post("/rses", {
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
