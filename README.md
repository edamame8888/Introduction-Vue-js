# Introduction-Vue-js
Vue.js入門のサンプルコードのまとめ

# Book
- title: Vue.js入門: 基礎から実践アプリケーション開発まで
- author: 川口和也、喜多啓介、手島拓也、片山真也、野田陽平

# まとめ
## 2章 Vue.jsの基本
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

#### 4 イベントハンドリング(v-on)
Vue.jsではv-onディレクティブを利用してイベントをハンドリングしてデータを変更します。
```html
v-on: イベント名="式として実行したい属性値"
```
使用例
```html
<input type="number" v-on:change="item.quantity = $event.target.value" v-bind:value="item.quantity" min="0">
//v-on: を @ に置き代えれれるンゴ
<input type="number" @change="item.quantity = $event.target.value" v-bind:value="item.quantity" min="0">
```
※省略記法はサーバサイドのテンプレートエンジンで扱う場合に不正な記述と見なされてエラーになる場合があります。

#### 5 フォーム入力バインディング(v-model)
Vue.jsではv-modelを用いいることで双方向バインディングを実現することができる。
```html
<input type="number" v-model="item.quantity" min="0">
```
上記のように記述することで、v-on:inputと同じ振る舞いを実現できます。

### 2.10 ライフサイクルフック一覧とフロー
Vueインスタンスには、生成から消滅までに到るまでのライフサイクルがある。  

| フックの名前  | フックが呼ばれるタイミング |
| ------------- | ------------- |
| beforeCreate  | インスタンスが生成され、データが初期化される前  |
| created  | インスタンスが作成され、データが初期化された後  |
| beforeMount  | インスタンスがDOM要素にマウントされる前  |
| beforeUpdate  | データが変更され、DOMに適用される前  |
| updated  | データが変更され、DOMに適用された後  |
| beforeDestroy  | Vueインスタンスが破棄される前  |
| afterDestroy  | Vueインスタンスが破棄された後  |

### 2.11 メソッド(methods)
Vueインスタンスのメソッドは、データの変更やサーバーにHTTPリクエストを送る際に用いる。
```js
  methods: {
    メソッド名: function() {
      //処理
    }
  }
```  
定義されたメソッドはVueインスタンスのメソッドとして呼び出せます。
よくあるのは、v-onディレクティブの属性値にバインディングして、Viewのイベントが発生した時に呼び出す形です。
```html
  <button v-bind:disabled="!canBuy" v-on:click="doBuy">購入</button>
  //v-onディレクティブの属性値には、メソッド名または式を指定できます。
  <button v-bind:disabled="!canBuy" v-on:click="doBuy($event)">購入</button>
```  

## 3章 コンポーネントの基礎

### 3.1 コンポーネントとは何か
Webフロントエンドの開発において、コンポーネントといったときはUIのモジュール化したものを総合的に指す  
Vue.jsを用いる場合は、Vue.jsのコンポーネントを指すことが多い  
呼び方は、Vueのコンポーネントと、UIのコンポーネントといって使い分けると良い  
コンポーネントを使うと再利用性の向上・品質の向上・保守性の高まりという恩恵がある  
```js
  Vue.components('list-item' ,{
    template: '<li>foo</li>'
  })
```  

### 3.2 Vueコンポーネントの定義
定義の方法にはVue.component()を使ったカスタムタグ方式と、Vue.extend()を使ったサブコンストラクタ方式がある。  

### 3.3 コンポーネント間の通信
Vue.jsの各コンポーネントはそれぞれ独立したスコープをもつ  

親コンポーネント -- props --> 子コンポーネント  
親コンポーネント -- event --> 子コンポーネント  

- props  
あらかじめ親でデータを定義しておき、テンプレート中で属性として子に渡す。  
子はpropsオプションに{属性名: バリデーションなどのオプション}を定義しておきます。  
バリデーションを指定しておくと、条件を満たさない場合はコンソール上に警告を発します。  


- event  
子コンポーネントから親コンポーネントへの通信では、カスタムイベントを使用します。  
Vueインスタンスには、以下のようなイベントのインターフェイスが実装されます。  

| 用途  | インターフェイス |
| ------------- | ------------- |
| イベントのlisten  | $on(eventName)  |
| イベントのtrigger  | $emit(eventName)  |


### 3.4 コンポーネントの設計
コンポーネントの分割のベースとなる考え方として、AtomicDesinという設計手法が優秀..
(勉強しないと^^;)

## 4章 , 5章 は一旦飛ばすンゴ

## 6章 単一ファイルコンポーネントによる開発

### 6.1 ツールのインストール
Vue CLIをnpmからインストールしました。

### 6.2 単一ファイルコンポーネントとは
_単一ファイルコンポーネントとは?_  
Vue.jsのコンポーネントを単独のファイルとして作成する機能です。

### 6.3 単一ファイルコンポーネントの仕様
#### <template>ブロック
テンプレートを書き込むブロック  
Vue.jsで提供する文法がそのまま利用可能  

#### <script>ブロック
UIの振る舞いをスクリプトで制御するブロック  
JavaScrptが利用可能  

#### <style>ブロック
UIの見た目を制御するブロック  
スタイル言語は標準でCSSだお。

### 6.5 単一ファイルコンポーネントの動作を体験する
保存した単一ファイルコンポーネントのディレクトリに移動したい後にビルドコマンドを実行
```bash
vue serve hello.vue --open
```
