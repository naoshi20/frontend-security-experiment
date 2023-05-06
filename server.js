const crypto = require("crypto");
const express = require("express");
// const api = require("./routes/api");
const csrf = require("./routes/csrf");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(
    express.static("public", {
        setHeaders: (res, path, stat) => {
            res.header("X-Frame-Options", "SAMEORIGIN");
        },
    })
);

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

app.use("/csrf", csrf);

app.use(express.urlencoded({ extended: true }));
app.post("/signup", (req, res) => {
    console.log(req.body);
    console.log("test");
    res.send("アカウント登録しました");
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
