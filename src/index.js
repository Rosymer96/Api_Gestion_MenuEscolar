const express = require('express');
const cors = require('cors'); // import cors
const server = express();
const PORT = 3500;

server.use(cors());

// Middleware to parse JSON bodies
server.use(express.json());

require("dotenv").config();

const router = require("./routes/api.routes");


server.use("/api", router);


// puerto a traves de cual escucho

server.listen(PORT, () => {
  console.log(`Server running http://localhost:${PORT}`);
});
