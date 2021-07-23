<template>
    <div class="count-round" @click="increment">
        <p>{{ count }}</p>
    </div> 
</template>

<script>
// Use Vuex
import store from '../store/store'
export default {
  computed: {
    count () {
      return store.state.count
    }
  },
  methods: {
    increment () {
      let nowTime = new Date().getTime()
      let period = nowTime - this.lastClickTime
      let standardPeriod = 5 * 60 * 1000
      if (period >= standardPeriod) {
        store.commit('increment')
        this.lastClickTime = nowTime
      } else {
        wx.showModal({
          title: '提示',
          content: '五分钟内的连续胎动只能算做一次哦'
        })
      }
    },
    decrement () {
      store.commit('decrement')
    }
  },
  data () {
    return {
      lastClickTime: ''
    }
  }
}
</script>

<style>
.count-round {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7em;      
  height: 7em;      
  background-color:#ffffff;
  opacity:0.8;
  border-radius: 50%;      
  -moz-border-radius: 50%;      
  -webkit-border-radius: 50%; 
}
.count-round>p {
    color: rgba(238, 63, 77, 1);
    font-size: 1rem;
}

</style>
