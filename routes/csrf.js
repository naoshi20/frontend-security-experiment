const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const router = express.Router();

// セッションにCookieを設定する
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
    // 検証用のため、ユーザー名とパスワードは固定
    if (username !== "user1" || password !== "Passw0rd!#") {
        res.status(403);
        res.send("ログイン失敗");
        return;
    }
    // セッションにユーザー名を格納
    sessionData = req.session;
    sessionData.username = username;

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

    const { to, amount } = req.body;
    res.send(`${to}へ${amount}円送金しました`);
});

// 他のJSからインポートできるようにするためにモジュールをエクスポート
module.exports = router;
