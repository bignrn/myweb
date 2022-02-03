function submit() {
    //テキスト取得
    const txbox = document.getElementById("search");
    const keywd = txbox.value;

    eroKeyWD();
}

/**
 * エロWordのリスト作成
 */
function eroKeyWD() {
    //Topicを入れる
    url = "json/ero_keywd.json";

    $.getJSON(url, (data) => {                                  //jsonを取得する。サーバーを経由していないと実行されない。CRF？が原因。
        const maxIdx = data.length; //マックスレングス
        var key_list = Array(maxIdx)
        for (var i = 0; i < maxIdx; i++) {
            key_list[i] = data[i].title;   //リスト追加
            console.log(data[i].id + " : " + data[i].key);  //jsonデータのIDごとの取得
        }
    });
}