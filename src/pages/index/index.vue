<template>
  <div>
    <div class="show">
      <countRound></countRound>
      <count-down :endTime="countEndTime" :callback="callback" endText="计时结束"></count-down>
    </div>
    <div class="operate">
      <div class="description">
        <div class="description-title">操作说明</div>
        <div class="description-content">
        1. 建议28周后每天记录早中晚各一次<br/>
        2. 孕妈妈根据自己的作息，设定胎动闹钟<br/>
        </div>
      </div>
      <div class="control">
        <show-button text= '胎动说明' :isCalendar= false></show-button>
        <show-button text= '胎动日历' :isCalendar= true></show-button>
      </div>
    </div>
  </div>
</template>

<script>
import countRound from '@/components/countRound'
import showButton from '@/components/showButton'
import countDown from '@/components/countDown'

export default {
  data () {
    return {
      countEndTime: ''
    }
  },

  components: {
    countRound,
    showButton,
    countDown
  },
  methods: {
    getCountEndTime () {
      let nowTime = new Date().getTime()
      this.countEndTime = nowTime + 3600000
    }
  },

  created () {
    this.getCountEndTime()
  },

  mounted () {
  }
}
</script>

<style scoped>
.show {
  display: flex;
  height: 6rem;
  background-color: rgba(238, 63, 77, 1);
  justify-content: center;
  align-items: center;
}

.description {
  display: flex;
  height: 2rem;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding-left: 0.5rem;
  padding-top: 0.4rem;
}
.description>.description-title {
  font-family: '华文细黑';
  font-weight: bold;
}
.description>.description-content {
  font-family: '华文细黑';
  font-weight: normal;
  font-size: 0.38rem;
  opacity: 0.9;
}
.control {
  display: flex;
  padding-top: 0.4rem;
  justify-content: space-around;
  align-items: center;
}



</style>
