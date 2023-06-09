npm install
node server.js

## TLS(HTTPS 化)の仕組み

事前準備

1. SSL サーバ証明書をサーバにインストール

セッション

1. クライアントからサーバーに TLS 接続要求
2. サーバからクライアントに公開鍵（公開鍵暗号方式における暗号化用）付き SSL サーバ証明書を送信
3. Web ブラウザにあらかじめ登録されているルート証明書と、サーバーから送られてきた証明書をハッシュで照合。(SSL サーバー証明書は 3 または 4 階層からできていて、その最上位の階層にあるのがルート証明書。)
4. クライアント側でサーバ証明書から（共通鍵暗号方式における）秘密鍵を生成
5. 公開鍵（公開鍵暗号方式における暗号化用）にて（共通鍵暗号方式における）秘密鍵を暗号化
6. サーバに（共通鍵暗号方式における）秘密鍵を送信
7. 以降のやり取りには（共通鍵暗号方式における）秘密鍵を用いて暗号化・復号化する

参考：https://medium-company.com/ssl-%E4%BB%95%E7%B5%84%E3%81%BF/#SSL
