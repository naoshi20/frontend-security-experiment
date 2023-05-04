const crypto = require("crypto");
const express = require("express");
// const api = require("./routes/api");
const app = express();
const port = 3000;

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/csp", (req, res) => {
    const nonceValue = crypto.randomBytes(16).toString("base64");
    console.log(nonceValue);
    res.header("Content-Security-Policy", `script-src 'nonce-${nonceValue}'`); // CSPが有効になるためインラインスクリプトが実行されなくなる
    res.render("csp", { nonce: nonceValue });
});

app.listen(port, () => {
    console.log(`Server is running on https://localhost:${port}`);
});
