//importing libraries and dependencies
const express = require("express");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/api");

const app = express();
const port = process.env.PORT || 8001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//routes request
app.use("/", apiRoutes.router);

// serve the application at the given port
app.listen(port, () => {                                 
    console.log(`Listening at http://localhost:${port}/`);
});