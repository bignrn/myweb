function submit() {
    //テキスト取得
    const txbox = document.getElementById("search");
    const keywd = txbox.value;

    eroKeyWD(keywd); //json

    //ローカルテスト↓
    // const list = new Array("えろ", "ちんこ")

    // var URL = "https://www.google.com/search?q=" + keywd;

    // //条件で上書きします
    // tips -> listだと何回も実行されて表示がバグる
    // list.some(element => {
    //     console.log(element + ":" + keywd)
    //     if (element == keywd) {
    //         console.log("ここはエロサイトに繋がります")
    //         URL = "./BBAAAA.html"
    //         return true;
    //     }
    // });

    // location.href = URL
    //ローカルテスト↑
}

/**
 * エロWordのリスト作成
 */
function eroKeyWD(key) {
    //Topicを入れる
    url = "json/ero_keywd.json";

    $.getJSON(url, (data) => {      //jsonを取得する。サーバーを経由していないと実行されない。CRF？が原因。
        const maxIdx = data.length; //マックスレングス
        var key_list = Array(maxIdx)

        //検索
        for (var i = 0; i < maxIdx; i++) {
            if (key == data[i].key) {
                console.log("条件にヒットしました。");
                location.href = "./BBAAAA.html"
            }
        }
    });
    //何もなかったら
    if (key === null) {
        location.href = "https://www.google.com/search?q=" + key;
    } else {
        console.log("未入力")
        const txbox = document.getElementById("search");
        txbox.innerText = "検索文字を入れてください。"
    }
}