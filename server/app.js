const express = require("express");
const cors = require("cors");
const port = 3004;
const app = express();
const files = require("./routes/files");
const metadata = require("./routes/metadata");
const auth = require("./routes/auth");
const config = require("./routes/config");
const usercfg = require("./routes/usercfgs");

app.use(cors({ origin: "http://localhost:3005" }));
app.use(express.json());
app.use(auth);
app.use(files);
app.use(metadata);
app.use(config);
app.use(usercfg);

app.listen(port, () =>
  console.log(`[INFO] Rucio running at http://localhost:${port}`)
);
