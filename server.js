const express = require("express");
// const api = require("./routes/api");
const app = express();
const port = 3000;

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/csp", (req, res) => {
    res.header("Content-Security-Policy", "script-src 'self'"); // CSPが有効になるためインラインスクリプトが実行されなくなる
    res.render("csp");
});

app.listen(port, () => {
    console.log(`Server is running on https://localhost:${port}`);
});
