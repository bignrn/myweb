/*
2021.7.31
参考：https://torisky.com/javascript%EF%BC%9A%E3%82%B5%E3%82%A4%E3%82%B3%E3%83%AD%E3%82%92%E6%8C%AF%E3%82%8B/
json取得cors
https://qiita.com/att55/items/2154a8aad8bf1409db2b
https://javascript.keicode.com/newjs/fetch.php
https://lealog.hateblo.jp/entry/2011/12/16/234332
 */
var count;  //サイコロの空振り回数
var flg = true; //ストップする　と　サイコロを振るの変更
var fileDirectry = "./img/dices/";  //ディレクトリのURL
//画像ファイルの名前
var imgs = ["icon_140540_256", "icon_140550_256", "icon_140570_256", "icon_140580_256", "icon_140590_256",
    "icon_140600_256", "icon_140610_256", "icon_140620_256", "icon_140630_256", "icon_140640_256"];
var oldIndex = 0;   //古いサイコロの記憶
const url = "../json/topic.json";

/**
 * IDを取得するfnction付き変数
 * @param id
 * @returns {HTMLElement}
 */
var $id =
    function (id) {
        return document.getElementById(id)
    }
/**
 * ロード時に実行
 */
window.addEventListener("load", function () {
    shake();
    createList();
})

/**
 * 話題リストを作成
 */
function createList() {
    //Topicを入れる
    $.getJSON(url, (data) => {                                  //jsonを取得する。サーバーを経由していないと実行されない。CRF？が原因。
        for (var i = 0; i < data.length; i++) {
            var li = document.createElement('li');              //<li>タグを生成する
            li.textContent = data[i].id + " : " + data[i].title;//jsonデータのIDごとの取得
            $id("list").appendChild(li);                        //ここで<div>に挿入
        }
    });
}
/**
 * メインメソッド
 */
function saikoro() {
    console.log("flg=" + flg)
    if (flg == true) {
        //ボタンテキスト変更
        $id("btn-dice").textContent = "ストップする"
        console.log("スタート")
        flg = false

        count = 0;
        anime();
    } else {
        flg = true
    }
}
/**
 * サイコロを振るときのアニメーション
 */
function anime() {
    var maxCount = 300;
    if (count > maxCount || flg == true) {
        count = 0;
        //ボタンテキスト変更
        $id("btn-dice").textContent = "サイコロを投げる"
        console.log("ストップ")
        return 0;
    }
    shake();
    count++;
    setTimeout(anime, 50)   //anime()を50ms間隔で表示を切り替える
}
/**
 * サイコロを振る
 */
function shake() {
    //サイコロの絵柄 --err:同じ絵柄の時表示されない
    var Index = Math.floor(Math.random() * imgs.length);
    console.log(imgs[Index]);

    if (oldIndex != Index && Index != 0) {
        var saimage = imgs[Index] + ".png"; //imageURLを生成
        $id("diceID").innerHTML = "<img src= '../" + fileDirectry + saimage + "' alt='" + saimage + "'>"
        //Topicを入れる

        $.getJSON(url, (data) => {
            //random
            var rand = Math.floor(Math.random() * data.length)

            //変数格納
            var id = data[rand].id
            var title = data[rand].title

            //ランダム値からTopic表示
            $id("p1").textContent = "Topic:" + id + " " + title

            //統計データの収集

        });
        oldIndex = Index;   //前のサイコロと被らないようにする。
    } else {
        shake();    //再帰処理
    }
}