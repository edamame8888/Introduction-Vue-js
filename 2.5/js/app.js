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
]
var vm = new Vue({
  el: '#app',
  data: {
    items: items
  }
})

window.vm = vm

vm.$watch(function (){
  //鉛筆の個数
  return this.items[0].quantity
}, function (quantity) {
  console.log(quantity)
})
