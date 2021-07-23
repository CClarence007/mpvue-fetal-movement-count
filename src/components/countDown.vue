<template>
  <span class="count-down" :endTime="endTime" :callback="callback" :endText="endText">
    <slot>
      {{content}}
    </slot>
  </span>
</template>
<script>
import store from '../store/store'
export default {
  data () {
    return {
      content: '',
      isSucesss: true
    }
  },
  computed: {
    count () {
      return store.state.count
    }
  },
  props: {
    endTime: {
      type: String,
      default: ''
    },
    endText: {
      type: String,
      default: '已结束'
    },
    callback: {
      type: Function,
      default: '',
      openid: '',
      cacheId: ''
    }
  },
  mounted () {
    this.countdown(this.endTime)
  },
  methods: {
    countdown (timestamp) {
      let self = this
      let timer = setInterval(function () {
        let nowTime = new Date().getTime()
        let t = timestamp - nowTime
        if (t > 0) {
          let day = Math.floor(t / 86400000)
          let hour = Math.floor((t / 3600000) % 24)
          let min = Math.floor((t / 60000) % 60)
          let sec = Math.floor((t / 1000) % 60)
          hour = hour < 10 ? '0' + hour : hour
          min = min < 10 ? '0' + min : min
          sec = sec < 10 ? '0' + sec : sec
          let format = ''
          if (day > 0) {
            format = `${day}天${hour}小时${min}分${sec}秒`
          }
          if (day <= 0 && hour > 0) {
            format = `${hour}小时${min}分${sec}秒`
          }
          if (day <= 0 && hour <= 0) {
            format = `${min} : ${sec}`
          }
          self.content = format
        } else {
          clearInterval(timer)
          self.content = self.endText
          self.judgeSuccess()
          self._callback()
        }
      }, 1000)
    },
    _callback () {
      if (this.callback && this.callback instanceof Function) {
        this.callback(...this)
      }
    },
    judgeSuccess () {
      if (this.count >= 3) {
        this.isSucesss = true
      } else {
        this.isSucesss = false
      }
      this.submitCache(this.isSucesss)
      store.commit('setCount', 0)
    },
    submitCache (isSuccess) {
      wx.cloud.callFunction({ name: 'getOpenId' }).then(res => {
        this.openid = res.result.openid
        const db = wx.cloud.database({
          env: 'mona-meng-4gtmrzid91290cf0'
        })
        db.collection('history').doc(this.openid + this.dateToString(new Date())).set({
          data: {
            dateStr: this.dateToString(new Date()),
            isSucesss: isSuccess,
            userId: this.openid
          }
        })
      })
    },
    dateToString (date) {
      let year = date.getFullYear()
      let month = (date.getMonth() + 1).toString()
      let day = (date.getDate()).toString()
      if (month.length === 1) {
        month = '0' + month
      }
      if (day.length === 1) {
        day = '0' + day
      }
      var dateTime = year + '-' + month + '-' + day
      return dateTime
    }
  }
}
</script>

<style scoped>
    .count-down {
        position: absolute;
        top: 0.2rem;
        right: 0.2rem;
    }
</style>