// -----------------------------------------------------------------------------
// モジュールのインポート
const server = require("express")();
const line = require("@line/bot-sdk"); // Messaging APIのSDKをインポート

// -----------------------------------------------------------------------------
// パラメータ設定
const line_config = {
    channelAccessToken: process.env.LINE_ACCESS_TOKEN, // 環境変数からアクセストークンをセットしています
    channelSecret: process.env.LINE_CHANNEL_SECRET // 環境変数からChannel Secretをセットしています
};

// -----------------------------------------------------------------------------
// Webサーバー設定
server.listen(process.env.PORT || 3000);

// APIコールのためのクライアントインスタンスを作成
const bot = new line.Client(line_config);

// -----------------------------------------------------------------------------
// ルーター設定
server.post('/webhook', line.middleware(line_config), (req, res, next) => {
    // 先行してLINE側にステータスコード200でレスポンスする。
    res.sendStatus(200);

    // すべてのイベント処理のプロミスを格納する配列。
    let events_processed = [];

    // イベントオブジェクトを順次処理。
    req.body.events.forEach((event) => {
        // この処理の対象をイベントタイプがメッセージで、かつ、テキストタイプだった場合に限定。
        if (event.type == "message" && event.message.type == "text"){
            // ユーザーからのテキストメッセージが「こんにちは」だった場合のみ反応。
            if (event.message.text == "こんにちは"){
                //requestをrequire
                var request = require('request');

                var webclient = require("request");
                
                require('date-utils');
                
                var dt = new Date();
                var YYYY = dt.toFormat("YYYY");
                var MM = dt.toFormat("MM");
                var DD = dt.toFormat("DD");
                var HH = dt.toFormat("HH24");
                var MI = dt.toFormat("MI");
 
                webclient.get({
                    url: "https://docs.google.com/forms/d/14JZkRLaUFCkdfUXpWSt00hfaKYnXwS_QcdcaapoEJTw/formResponse",
                         qs: {
                           c: "0",
                           w: "1",
                        "entry.458666233_year": YYYY,
                        "entry.458666233_month": MM,
                        "entry.458666233_day": DD,
                        "entry.963651361": "date-utilsテスト",
                        "entry.820423629": "いけるかな",
                        "entry.551857105_hour": HH,
                        "entry.551857105_minute": MI
                          }
                    }, function (error, response, body) {
                    console.log(body);
                });
                // replyMessage()で返信し、そのプロミスをevents_processedに追加。
                events_processed.push(bot.replyMessage(event.replyToken, {
                    type: "text",
                    text: "がんばれ"
                }));
            }
        }
    });

    // すべてのイベント処理が終了したら何個のイベントが処理されたか出力。
    Promise.all(events_processed).then(
        (response) => {
            console.log(`${response.length} event(s) processed.`);
        }
    );
});