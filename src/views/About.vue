<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
import { addGoods } from '@/api/user.js'
// import { getSecretkey } from '@/api/common.js'
// import { aes } from '@/utils/encryption'
export default {
  name: 'about',
  props: ['id'],
  data () {
    return {
      form: {
        openId: '111'
      }
    }
  },
  created () {
    this.getPos()
  },
  mounted () {
    console.log(1111, this.$route.query.id)
    // console.log('fsdggh', aes.en(JSON.stringify({ pageIndex: 1, pageSize: 10 })))
  },
  methods: {

    getPos () {
      // getSecretkey().then(res => {
      //   const { code, data } = res
      //   if (code === 200) {
      //     console.log(data)
      //     // return data.SecretKey
      //   }
      // })
      addGoods({ id: '1', data: this.form }).then(res => {
        const { code, data } = res
        if (code === 0) {
          console.log(data)
        }
      }).catch(() => {
        console.log('获取失败')
      })
      console.log(this.$store.getters)
      // getGoods({ pageIndex: 1, pageSize: 10 }).then(res => {
      //   const { code, data } = res
      //   if (code === 0) {
      //     console.log(data)
      //   }
      // }).catch(() => {
      //   console.log('获取失败')
      // })
    }
  }
}
</script>
