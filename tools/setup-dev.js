#!/usr/bin/env node
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
