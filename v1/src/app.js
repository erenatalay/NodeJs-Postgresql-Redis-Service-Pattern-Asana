const express = require("express");
const helmet = require("helmet");
const config = require("./config");
const routers = require("./api-routes");
const loaders = require("./loaders");
const events = require("./scripts/events");
const fileUpload = require("express-fileupload");
const path = require("path")
config();
loaders();
events();
const app = express();
app.use("/uploads",express.static(path.join(__dirname,"./","uploads")));
app.use(express.json());
app.use(helmet());
app.use(fileUpload());
//routers
app.use("/api",routers);

app.listen(process.env.APP_PORT,() => {
    console.log(`${process.env.APP_PORT} Port Server Start`)
  
})