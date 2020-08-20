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

export async function fetchRSEInfo(account, server, rse) {
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
    rse: rse,
  };

  try {
    payload.token = cookies.get(cfg.server_name);
  } catch (err) {
    return 401;
  }

  try {
    const response = axios.post("/rse/info", {
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

export async function fetchRSEAttributes(account, server, rse) {
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
    rse: rse,
  };

  try {
    payload.token = cookies.get(cfg.server_name);
  } catch (err) {
    return 401;
  }

  try {
    const response = axios.post("/rse/attr", {
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

export async function fetchRSEUsage(account, server, rse) {
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
    rse: rse,
  };

  try {
    payload.token = cookies.get(cfg.server_name);
  } catch (err) {
    return 401;
  }

  try {
    const response = axios.post("/rse/usage", {
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

export async function updateProtocol(
  account,
  server,
  rse,
  scheme,
  hostname,
  port,
  protocolObj,
  initialValues,
) {
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
    rse: rse,
    scheme: scheme,
    hostname: hostname,
    port: port,
    protocolObj: protocolObj,
    initialValues: initialValues
  };

  try {
    payload.token = cookies.get(cfg.server_name);
  } catch (err) {
    return 401;
  }

  try {
    const response = axios.post("/rse/protocol/update", {
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
