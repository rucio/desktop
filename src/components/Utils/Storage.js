/*
 * Copyright European Organization for Nuclear Research (CERN)
 * Licensed under the Apache License, Version 2.0 (the "License");
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Authors:
 * - Vivek Nigam, <viveknigam.nigam3@gmail.com>, 2020
 */

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
  rseId,
  scheme,
  hostname,
  port,
  protocolObj,
  initialValues
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
    rse_id: rseId,
    scheme: scheme,
    hostname: hostname,
    port: port,
    protocolObj: protocolObj,
    initialValues: initialValues,
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

export function updateRSESettings(
  account,
  server,
  rse,
  rseId,
  params,
  initialValues
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
    rse_id: rseId,
    params: params,
    initialValues: initialValues,
  };
  
  try {
    payload.token = cookies.get(cfg.server_name);
  } catch (err) {
    return 401;
  }

  try {
    const response = axios.post("/rse/setting/update", {
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

export function getRSEChangelog(rseId) {
  const payload = {
    rse_id: rseId,
  };

  try {
    const response = axios.post("/rse/changelog", {
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
