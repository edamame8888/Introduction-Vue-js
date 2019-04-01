# Introduction-Vue-js
Vue.js入門のサンプルコードのまとめ

# Book
- title: Vue.js入門: 基礎から実践アプリケーション開発まで
- author: 川口和也、喜多啓介、手島拓也、片山真也、野田陽平

# まとめ
## 2章
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

### 2.7 フィルタ(filters)
js側の処理
```js
  filters:{
    フィルタ名 :function (value) {
      // return
    }
  }
```
html側の処理
```html
  {{ 値 : フィルタ名 }}
```

### 2.8 算出プロパティ(computed)
js側の処理
```js
  computed:{ //関数として実装,参照時はプロパティとして機能
    算出プロパティ名: function() {
      //return ...
    }
  }
```

### 2.9 ディレクティブ
#### 1 条件付きレンダリング(v-if/v-show)
html側の処理
```html
  <p v-if="引数">
    //真なら表示、偽なら非表示
  </p>
  <p v-show="引数">
    //真なら表示、偽なら非表示
  </p>
```
- v-if,v-showの使い分け: 頻繁に評価結果が変わるとき -> v-show

#### 2 クラスとスタイルのバインディング
特定の条件が成立するとき、UIの見た目を変えたい -> v-bindディレクティブを使おう！
```html
v-bind: 属性名="データを展開した属性値"
```

style変更、class変更時のhtmlの例
```html
  //style
  <div :style="プロパティ名"> </div>
  //class
  <p :class="{error: !canBuy}"> </p>
```

#### 3 リストレンダリング(v-for)
リストレンダリングをしたい -> v-forディレクティブを使おう！
```html
v-for="要素 in 配列"
```
v-bind:key=〜で生成時に一意なキーを各要素に与えられる。
これは、Vue.jsのパフォーマンスとおの理由で与えられるもので必須である。
```html
<ul>
  <li v-for="item in arr" v-bind:key="item">{{item}}</li>
</ul>
```
