#!/usr/bin/env node
const { execSync } = require("child_process");
const packageJSON = require("../package.json");

console.log(`\n***** Rucio Desktop v${packageJSON.version} Development Setup *****\n`);
console.log(`-> Installing critical dependencies...`);

execSync("npm i --save listr execa", (err) => {
  if (err) console.log(err);
  else console.log("-> Completed pre-setup tasks!");
});

const runTasks = () => {
  const execa = require("execa");
  const Listr = require("listr");

  const tasks = new Listr([
    {
      title: "Setting Git Repository",
      task: () =>
        new Listr([
          {
            title: "Setting upstream to rucio/desktop",
            task: () =>
              execa("git", [
                "remote",
                "add",
                "upstream",
                "https://github.com/rucio/desktop.git",
              ]),
          },
          {
            title: "Fetching Upstream",
            task: () => execa("git", ["fetch", "--all"]),
          },
        ]),
    },
    {
      title: "Installing dependencies with npm",
      task: () => execa("npm", ["install"]),
    },
  ]);
  tasks.run().catch((err) => {
    console.error(err);
  });
};

runTasks();
