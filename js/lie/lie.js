function submit() {
    //テキスト取得
    const txbox = document.getElementById("search");
    const keywd = txbox.value;

    const list = eroKeyWD(); //json
    // const list = new Array("えろ", "ちんこ")

    list.forEach(element => {
        if (element == keywd) {
            console.log("ここはエロサイトに繋がります")
        }
    });
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
            key_list[i] = data[i].key;   //リスト追加
            console.log(data[i].id + " : " + data[i].key);  //jsonデータのIDごとの取得
        }
    });
    console.log("list=" + key_list[1]);

    return key_list;
}