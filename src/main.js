const express = require("express");
const app = express();

require("dotenv").config();
app.use(express.json());

const PORT = process.env.PORT || 3030;
const Auth = require("./Routes/Auth");
const Registration = require("./Routes/Registration");
const errorHandler = require("./Services/utils/ErrorHanlder");

app.use(Auth);
app.use(errorHandler);
app.use(Registration);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});