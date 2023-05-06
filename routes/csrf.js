const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const router = express.Router();

// セッションにCookieを設定する
// Note Session data is not saved in the cookie itself, just the session ID. Session data is stored server-side.
// https://github.com/expressjs/session
router.use(
    session({
        secret: "session",
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 60 * 1000 * 5,
        },
    })
);

// フォームデータを読み取れるようにする
router.use(express.urlencoded({ extended: true }));
// クッキーを読み取れるようにする
router.use(cookieParser());

let sessionData = {};

router.post("/login", (req, res) => {
    console.log(req);

    const { username, password } = req.body;
    // 認証
    if (username !== "user1" || password !== "Passw0rd!#") {
        res.status(403);
        res.send("ログイン失敗");
        return;
    }
    // 認証に成功したらセッションにユーザー名を格納
    sessionData = req.session;
    sessionData.username = username;

    // CSRF対策のためにランダムなIDをcookieに保存させる
    const crypto = require("crypto");
    const token = crypto.randomUUID();
    res.cookie("csrf_token"),
        token,
        {
            secure: true,
        };

    // CSRF検証用ページへリダイレクト
    res.redirect("/csrf_test.html");
});

router.post("/remit", (req, res) => {
    if (
        !req.session.username ||
        req.session.username !== sessionData.username
    ) {
        res.status(403);
        res.send("ログインしていません。");
        return;
    }

    // サーバ側のセッションには保存してないからcookieのトークンが正しいとするね。
    // 偽物ならトークンは持ってても中身にはアクセスできないはずだからbodyに含めてリクエスト送れないっしょ。
    // Cookieの性質：送り先ごとに情報を保存しており送り先にはCookieを必ず付与する。すなわち、罠サイトからのリクエストにもCookieは付与される。しかし、罠サイトではCookieの中身にアクセスすることはできない。
    if (req.cookies["csrf_token"] !== req.body["csrf_token"]) {
        res.status(400);
        res.send("不正なリクエストです。");
        return;
    }

    const { to, amount } = req.body;
    res.send(`${to}へ${amount}円送金しました`);
});

// 他のJSからインポートできるようにするためにモジュールをエクスポート
module.exports = router;
