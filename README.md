# Introduction-Vue-js
Vue.js入門のサンプルコードのまとめ

# Book
- title: Vue.js入門: 基礎から実践アプリケーション開発まで
- author: 川口和也、喜多啓介、手島拓也、片山真也、野田陽平

# 学んだこと

### 2.2 Vue.jsの導入
Vue.jsの最新バージョンの導入は
```html
   <script src="https://cdn.jsdelivr.net/npm/vue"></script>  
```
を読み込むことでできる。

### 2.5 UIのデータ定義(data)
- dataプロパティ: データの値を変更が検知され自動で画面の更新が行われた
- question: app.jsの読み込みは{{ hoge }}の後に書かなければ表示されなかった。
- $watchメソッド
```js
    vm.$watch(function (){
      //監視対象の値を返す関数
      return hoge
    }, function (quantity) {
      //値が変わった場合に呼ばれるコールバック関数
      hoge
    })
```
