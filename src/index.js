//todos los imports necesarios
const express = require("express");
const cors = require("cors");

require("dotenv").config();

const router = require("./routes/api.routes");

// crear un servidor y configuracion
const server = express();
server.use(express.json());
server.use(cors());

server.use("/api", router);   //Descomentar cuando creen sus endpoints si mandara error.

// puerto a traves de cual escucho
const PORT = 3500;
server.listen(PORT, () => {
  console.log(`Server running http://localhost:${PORT}`);
});
