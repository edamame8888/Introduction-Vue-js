var items = [{
    name: '鉛筆',
    price: 300,
    quantity: 0
  },
  {
    name: 'ノート',
    price: 400,
    quantity: 0
  },
  {
    name: '消しゴム',
    price: 500,
    quantity: 0
  }
];

// ロードされ、Vueがグローバル変数として定義されているか確認
console.assert(typeof Vue !== 'undefined');

var vm = new Vue({
  el: '#app',
  data: {
    items: items
  },
  filters: { //この説で追加したフィルターの追加
    numberWithDelimiter: function (value){
      if ( !value ) {
        return '0'
      }
      return value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,')
    }
  },
  methods: {
    doBuy: function() {
      // 本来はここでサーバーとの通信をおこなう
      alert(this.totalPriceWithTax + '円のお買い上げ！')
      this.items.forEach( function (item) {
        item.quantity = 0
      })
    }
  },
  computed: { //算出プロパティ
    totalPrice: function() {
      return this.items.reduce(function(sum,item) {
        return sum + (item.price * item.quantity)
      },0)
    },
    totalPriceWithTax: function () {
      //算出プロパティに依存した算出プロパティも定義できる
      return Math.floor(this.totalPrice * 1.08)
    },
    canBuy: function () {
      return this.totalPrice >= 1000 //1000円以上で購入可能にする
    },
    errorMessageStyle: function () {
      //canBuyが偽のときに赤く表示する
      return {
        border: this.canBuy ? '' : '1px solid red',
        color: this.canBuy ? '' : 'red'
      }
    }
  }
});
