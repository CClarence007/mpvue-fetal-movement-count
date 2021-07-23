<template>
    <div>
        <calendar
        calendar-style= "calendar"
        header-style= "header"
        board-style= "board"
        :days-color= "dayStyle"
         />
         <div class="notice">
           <p><span style="color:rgba(32, 137, 77, 1)">绿色</span>表示这一天胎动次数正常</p>
           <p><span style="color:rgba(238, 63, 77, 1)">红色</span>表示这一天胎动次数较少</p>
         </div>
    </div>
</template>

<script>
export default {
  componets: {
  },
  methods: {
    renderDayStyle (array, userId) {
      this.dayStyle = []
      let nowDate = new Date()
      let nowMonth = nowDate.getMonth()
      array.forEach(item => {
        if (nowMonth === parseInt(item.dateStr.split('-')[1]) - 1 && item.userId === userId) {
          this.dayStyle.push({
            month: 'current',
            day: parseInt(item.dateStr.split('-')[2]),
            color: 'white',
            background: item.isSuccess ? 'rgba(32, 137, 77, 1)' : 'rgba(238, 63, 77, 1)'
          })
        }
      })
    }
  },
  props: {
    text: String
  },
  data () {
    return {
      dayStyle: [
      ],
      openid: ''
    }
  },
  mounted () {
    wx.cloud.callFunction({ name: 'getOpenId' }).then(res => {
      this.openid = res.result.openid
      const db = wx.cloud.database({
        env: 'mona-meng-4gtmrzid91290cf0'
      })
      db.collection('history').get().then(res => {
        this.renderDayStyle(res.data, this.openid)
      })
    })
  }
}
</script>



<style>
.calendar {
  border: 1px solid rgba(238, 63, 77, 1);
  border-radius: 8%;
  color: rgba(238, 63, 77, 1);
  padding-top: 1rem;  
  padding-left: 0.2rem;   
  padding-right: 0.2rem; 
}
.header {
  font-size: large;
  font-family: '华文细黑';
  font-weight: bold;
  color: rgba(238, 63, 77, 1);
}
.board {
  font-size: normal;
  font-family: '华文细黑';
  font-weight: bold;
  color: rgba(238, 63, 77, 1);
}
.notice {
  padding-left: 0.5rem;
  padding-top: 0.4rem;
  font-family: '华文细黑';
  font-weight: normal;
  font-size: 0.38rem;
}

</style>
