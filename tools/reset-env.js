#!/usr/bin/env node
const execa = require("execa");
const Listr = require("listr");

const tasks = new Listr([
  {
    title: "Cleaning Cache",
    task: () => execa("npm", ["cache", "clean", "--force"]),
  },
  {
    title: "Cleaning Up Node Modules",
    task: () =>
      execa("rm", ["-rf", "node_modules"]).then(() =>
        execa("rm", ["package-lock.json"])
      ),
  },
  {
    title: "Installing Dependencies",
    task: () => execa("npm", ["install"]),
  },
]);

tasks.run().catch((err) => {
  console.error(err);
});
