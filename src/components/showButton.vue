<template>
    <div class="show-button">
        
        <p v-if="!isShowCalendar" @click="showNotice">{{ text }}</p>  
        <p v-if="isShowCalendar" @click="showCalendar">{{ text }}</p>   
    </div> 
</template>

<script>
export default {
  methods: {
    showCalendar () {
      let url = '/pages/calendar/main'
      wx.navigateTo({ url })
    },
    showNotice () {
      let url = '/pages/notice/main'
      wx.navigateTo({ url })
    }
  },
  computed: {
    isShowCalendar () {
      return this.isCalendar
    }
  },
  props: {
    text: String,
    isCalendar: Boolean
  },
  data: {
  }
}
</script>

<style>
.show-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;      
  height: 1rem;      
  background-color:#ffffff;
  opacity:0.8;
  border: 1px solid rgba(238, 63, 77, 1);
  border-radius: 30%;      
  -moz-border-radius: 30%;      
  -webkit-border-radius: 30%; 
}
.show-button>p {
    color: rgba(238, 63, 77, 1);
    font-size: 0.36rem;
}

</style>
