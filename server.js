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
    res.header(
        "Content-Security-Policy",
        `script-src 'nonce-${nonceValue}' 'strict-dynamic';` +
            "object-src 'none';" +
            "base-uri 'none';" // strict-dynamicを追加することで動的にスクリプト要素を生成することが可能となる
    ); // CSPが有効になるためインラインスクリプトが実行されなくなる
    res.render("csp", { nonce: nonceValue });
});

app.listen(port, () => {
    console.log(`Server is running on https://localhost:${port}`);
});

// TODO: https:/localhost:443でサーバに接続できない。
const https = require("https");
const fs = require("fs");

const HTTPS_PORT = 443;
https
    .createServer({
        key: fs.readFileSync("localhost+1-key.pem"),
        cert: fs.readFileSync("localhost+1.pem"),
        app,
    })
    .listen(HTTPS_PORT, function () {
        console.log(`Server is running on https://localhost:${HTTPS_PORT}`);
    });
