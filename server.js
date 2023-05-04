const express = require("express");
// const api = require("./routes/api");
const app = express();
const port = 3000;

app.use(express.static("public"));

app.listen(port, () => {
    console.log(`Server is running on https://localhost:${port}`);
});
