import React, { useState } from "react";
import UserDetails from "./AddAccountPages/UserDetails";
import ServerDetails from "./AddAccountPages/ServerDetails";
import OtherDetails from "./AddAccountPages/OtherDetails";
import Success from "./AddAccountPages/Success";
import { addNewAccountConfig } from "../Utils/User";

function AddAccount() {
  const [step, setStep] = useState(1);
  const [account, setAccount] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [serverName, setServerName] = useState("");
  const [rucioHost, setRucioHost] = useState("");
  const [authHost, setAuthHost] = useState("");
  const [certlocation, setCertlocation] = useState("");
  const [clientcert, setClientcert] = useState();
  const [clientkey, setClientkey] = useState();
  const [mountpoint, setMountpoint] = useState("");
  const [authtype, setAuthtype] = useState("");

  function nextStep() {
    const newStep = step;
    setStep(newStep + 1);
  }

  function prevStep() {
    const newStep = step;
    setStep(newStep - 1);
  }

  function handleSubmit() {
    addNewAccountConfig(
      account,
      username,
      password,
      serverName,
      rucioHost,
      authHost,
      certlocation,
      clientkey,
      clientcert,
      mountpoint,
      authtype
    );
  }

  switch (step) {
    case 1:
      return (
        <UserDetails
          nextStep={nextStep}
          account={account}
          setAccount={setAccount}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          authtype={authtype}
          setAuthtype={setAuthtype}
          clientcert={clientcert}
          setClientcert={setClientcert}
          clientkey={clientkey}
          setClientkey={setClientkey}
        />
      );
    case 2:
      return (
        <ServerDetails
          prevStep={prevStep}
          nextStep={nextStep}
          serverName={serverName}
          setServerName={setServerName}
          rucioHost={rucioHost}
          setRucioHost={setRucioHost}
          authHost={authHost}
          setAuthHost={setAuthHost}
        />
      );
    case 3:
      return (
        <OtherDetails
          prevStep={prevStep}
          nextStep={nextStep}
          handleSubmit={handleSubmit}
          certlocation={certlocation}
          setCertlocation={setCertlocation}
          mountpoint={mountpoint}
          setMountpoint={setMountpoint}
        />
      );
    case 4:
      return <Success account={account} serverName={serverName} />;
    default:
      return <div>404 Not Found</div>;
  }
}

export default AddAccount;
