<template>
<div class='security'>
  <div class="security-bar">
    <ul>
      <li>
        <label>Question1:</label>
        <input type="text" v-model="question1" :readonly="isReadonly"  placeholder="">
      </li>
      <li>
        <label>Answer1:</label>
        <input type="text" v-model="answer1" :readonly="isReadonly" placeholder="">
      </li>
      <li>
        <label>Question2:</label>
        <input type="text" v-model="question2"  :readonly="isReadonly"  placeholder="">
      </li>
      <li>
        <label>Answer2:</label>
        <input type="text" v-model="answer2" :readonly="isReadonly" placeholder="">
      </li>
    </ul>
    <button v-if="isReadonly" :disabled="inClickProcess" @click="unbindQA">{{saveBtnText}}</button>
    <button v-else :disabled="inClickProcess" @click="dbSaveQA">{{saveBtnText}}</button>
  </div>
</div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'security',
  //  import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
  //  这里存放数据
    return {
      safeQuestions: [],
      unbindUrl: '',
      unbindMsg: '',
      isReadonly: false,
      question1: '',
      question2: '',
      answer1: '',
      answer2: '',
      saveBtnText: '立即保存',
      inClickProcess: false
    }
  },
  //  监听属性 类似于data概念
  computed: {},
  //  监控data中的数据变化
  watch: {
  },
  //  方法集合
  methods: {
    /**
     * @description 保存密保信息
     */
    saveQA () {
      if (this.inClickProcess) {
        return false
      }
      let _this = this
      if (!_this.question1) {
        _this.AlertWarning('请输入问题一')
        return false
      }
      if (!_this.answer1) {
        _this.AlertWarning('请输入答案一')
        return false
      }
      if (!_this.question2) {
        _this.AlertWarning('请输入问题二')
        return false
      }
      if (!_this.answer2) {
        _this.AlertWarning('请输入答案二')
        return false
      }
      _this.inClickProcess = true
      _this.saveBtnText = '正在保存'
      let url = '/api/account/savesafequestanswer'
      let params = {
        QuestionFirst: _this.question1,
        AnswerFirst: _this.answer1,
        QuestionSecond: _this.question2,
        AnswerSecond: _this.answer2,
        Token: _this.getinfo().token
      }
      _this.$https
        .fetchPost(url, _this.secret(params))
        .then(res => {
          _this.inClickProcess = false
          _this.saveBtnText = '立即保存'
          if (res.data.Success === true) {
            this.isReadonly = true
            _this.safeQuestions = [
              { Question: _this.question1 },
              { Question: _this.question2 }
            ]
            _this.AlertSuccess('保存成功')
          } else {
            _this.NormalFailConfirm(res.data)
          }
        })
        .catch(err => {
          _this.inClickProcess = false
          _this.saveBtnText = '立即保存'
          console.log('error', err)
        })
    },
    /**
     * @description 解绑更改
     */
    unbindQA () {
      if (this.unbindMsg.length > 0) {
        this.AlertWarning(this.unbindMsg)
      } else {
        window.open(this.unbindUrl.concat('&t=3'), '_blank')
      }
    },
    dbSaveQA: _.debounce(function () {
      console.log('current_time', new Date())
      this.saveQA()
    }, 1000, {
      leading: true,
      trailing: false
    })
  },
  //  生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  //  生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.safeQuestions = this.$route.params.data
    if (this.safeQuestions.length === 2) {
      this.isReadonly = true
      this.question1 = this.safeQuestions[0].Question
      this.question2 = this.safeQuestions[1].Question
      this.answer1 = '*******'
      this.answer2 = '*******'
      this.unbindUrl = this.$route.params.unbindUrl
      this.unbindMsg = this.$route.params.unbindMsg
      this.saveBtnText = 'Unbind'
    }
    this.$emit('getStatus', 'Security Info', 'back', 'hide', true)
  }
}
</script>
<style scoped>
.security{
  width: 100%;
  padding: 0 0.3rem;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 0.88rem;
  bottom: 0;
  background:  url(../../../../assets/images/allpage_bg@2x.jpg);
  background-size: 100% 100%;
  background-attachment: fixed;
}
.security .security-bar{
  margin-top: 0.2rem;
  width: 100%;
  background: #fff;
  border-radius: 0.06rem;
  padding: 0 0.3rem;
  box-sizing: border-box;
}
.security .security-bar ul{
  width: 100%;
  overflow: hidden;
}
.security .security-bar ul li{
  width: 100%;
  height: 0.98rem;
  line-height: 0.98rem;
  border-bottom: 0.02rem solid #ddd;
}
.security .security-bar ul li label{
  font-size: 0.25rem;
  color: #6b6b6b;
}
.security .security-bar ul li input{
  width: 4.8rem;
  height: 0.96rem;
  float: right;
  color: #6b6b6b;
  font-size: 0.3rem;
}
.security .security-bar ul li input::-webkit-input-placeholder{
  color: #bbb;
}
.security .security-bar button{
  width: 100%;
  height: 0.98rem;
  background: #0088ff;
  text-align: center;
  line-height: 0.98rem;
  border-radius: 0.06rem;
  color: #fff;
  font-size: 0.3rem;
  margin: 0.8rem 0;
}
</style>
