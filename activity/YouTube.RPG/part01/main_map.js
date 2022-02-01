"use strict";
/**
 * マップ表示までのコード
 * 
 * コードはABC順が良いかも。
 * 今は、分かりやすいようにまとめている。
 * 
 * YouTube[https://www.youtube.com/playlist?list=PLJ86MSrhnFKVcfaffKPYkvfkPg4qRsijs]
 * ＃５の前半まで終了＜＞
 */


/**
 * 固定関数
 */
//使用フォント
const FONT = "48px monospace";
//仮想画面サイズ
const HEIGHT = 120;
const WIDTH = 128;
//補間処理
const SMOOTH = 0;
//タイル
const TILECOLUMN = 4;//桁数
const TILEROW = 4;//行数
const TILESIZE = 8;//タイルサイズ(ドット);
//マップ
const gFileMap = "img/map.png";
const gFilePlayer = "img/player.png";

const MAP_WIDTH = 32;//マップ幅
const MAP_HEIGHT = 32;//マップ高さ
const gMap = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 3, 3, 7, 7, 7, 7, 7, 7, 7, 7, 7, 6, 6, 3, 6, 3, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 3, 3, 6, 6, 7, 7, 7, 2, 2, 2, 7, 7, 7, 7, 7, 7, 7, 6, 3, 0, 0, 0, 3, 3, 0, 6, 6, 6, 0, 0, 0,
    0, 0, 3, 3, 6, 6, 6, 7, 7, 2, 2, 2, 7, 7, 2, 2, 2, 7, 7, 6, 3, 3, 3, 6, 6, 3, 6, 13, 6, 0, 0, 0,
    0, 3, 3, 10, 11, 3, 3, 6, 7, 7, 2, 2, 2, 2, 2, 2, 1, 1, 7, 6, 6, 6, 6, 6, 3, 0, 6, 6, 6, 0, 0, 0,
    0, 0, 3, 3, 3, 0, 3, 3, 3, 7, 7, 2, 2, 2, 2, 7, 7, 1, 1, 6, 6, 6, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 7, 7, 7, 7, 2, 7, 6, 3, 1, 3, 6, 6, 6, 3, 0, 0, 0, 3, 3, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 7, 2, 7, 6, 3, 1, 3, 3, 6, 6, 3, 0, 0, 0, 3, 3, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 7, 7, 7, 6, 3, 1, 1, 3, 3, 6, 3, 3, 0, 0, 3, 3, 3, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 6, 7, 7, 7, 6, 3, 1, 1, 3, 3, 6, 3, 3, 0, 3, 12, 3, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 6, 7, 7, 6, 3, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 6, 6, 6, 6, 3, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 6, 6, 3, 3, 3, 3, 1, 1, 3, 3, 3, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 5, 3, 3, 3, 6, 6, 6, 3, 3, 3, 1, 1, 1, 1, 1, 3, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 8, 9, 3, 3, 3, 6, 6, 6, 6, 3, 3, 3, 3, 3, 3, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 3, 3, 3, 3, 3, 3, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 6, 3, 3, 3, 3, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 6, 3, 6, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 3, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 3, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 6, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0,
    7, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 0, 0, 0, 0, 0,
    7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7,
];

/**
 * 変数
 */
//描画系の変数？
let gScreen;
let gImgMap;
let gImgPlayer;

//内部カウンター
let gFtame = 0;

//キャンバス
let gWidth;//実画面の幅
let gHeight;//実画面の高さ

/**
 * <subClass>
 * タイマーイベント timeEvwnt
 * 繰り返し実行
 */
function WmTimer() {
    gFtame++;//内部カウンター追加
    WmPaint();
}

/**
 * ブラウザサイズ変更イベント
 * 画面の初期化一回実行
 */
function WmSize() {

    const ca = document.getElementById("main"); //mainキャンバスの要素取得
    ca.width = window.innerWidth;				//キャンバスの幅をブラウザの幅へ変更
    ca.height = window.innerHeight;				//キャンバスの高さをブラウザの高さへ変更

    const g = ca.getContext("2d");				//2D描画コンテキスト取得
    g.imageSmoothingEnabled = g.msImageSmoothingEnabled = SMOOTH;//保管処理

    //実画面サイズを計測。ドットアスペクト比を維持したままで最大計測する。
    gWidth = ca.width;
    gHeight = ca.height;
    if (gWidth / WIDTH < gHeight / HEIGHT) {
        gHeight = gWidth * HEIGHT / WIDTH;//縦長。縦幅を減らす
    } else {
        gWidht = gHeight * WIDTH / HEIGHT;//横長。横幅を減らす
    }
}

/**
 * キャンバスの設定
 */
function DrawMain() {
    const g = gScreen.getContext("2d");				//2D描画コンテキスト取得

    //マップ描画
    for (let y = 0; y < 32; y++) {
        for (let x = 0; x < 64; x++) {
            DrawTile(g, x * TILESIZE, y * TILESIZE, gMap[y * MAP_WIDTH + x]);
        }
    }

    // g.font = FONT;								//文字フォント設定
    // let x = gFtame / 10;
    // let y = 64;
    // g.fillText("Hello World" + gFtame, x, y);//文字表示
    g.drawImage(gImgPlayer, 0, 0);//プレイヤー
}

/**
 * マップ関係
 */
function DrawTile(g, x, y, idx) {
    const ix = (idx % TILECOLUMN) * TILESIZE;
    const iy = Math.floor(idx / TILECOLUMN) * TILESIZE;

    g.drawImage(gImgMap, ix, iy, TILESIZE, TILESIZE, x, y, TILESIZE, TILESIZE);
}

/**
 * 描画
 */
function WmPaint() {
    DrawMain();
    const ca = document.getElementById("main"); //mainキャンバスの要素取得
    const g = ca.getContext("2d");				//2D描画コンテキスト取得

    //仮想画面の内容を転送
    g.drawImage(gScreen, 0, 0, gScreen.width, gScreen.height, 0, 0, gWidth, gHeight);//仮想画面のイメージを実画面へ転送
}

/**
 * 画像の設定
 */
function LoadImage() {
    gImgMap = new Image();
    gImgMap.src = gFileMap;//マップ読み込み

    gImgPlayer = new Image();
    gImgPlayer.src = gFilePlayer;//Player読み込み

}

/**
 * <main>
 * ブラウザー起動イベント 
 */
window.onload = function () {
    LoadImage();

    gScreen = document.createElement("canvas");//仮想画面を作成
    //仮想画面のサイズ設定
    gScreen.width = WIDTH;
    gScreen.height = HEIGHT;

    WmSize();
    window.addEventListener("resize", function () { WmSize() });//画面サイズ初期化、変更時に実行
    setInterval(function () { WmTimer() }, 33);	//33ms間隔で、WmTimer()を呼び出す。（約30.3fps）

}