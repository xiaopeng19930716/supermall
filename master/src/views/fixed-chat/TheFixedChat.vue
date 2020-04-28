<!--
 * @Descripttion: 
 * @version: 
 * @Author: 肖鹏
 * @Date: 2020-04-22 19:08:40
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-28 18:16:17
 -->
<template>
  <div>
    <i
      class="el-icon-chat-dot-round chat-bar"
      @click="chatDialog.visible=true"
    ></i>
    <ChatDialog :dialog="chatDialog" />
  </div>
</template>

<script>
import ChatDialog from "container/fixed-chat/ChatDialog";
export default {
  name: "TheFixedChat",
  components: { ChatDialog },
  data () {
    return {
      chatDialog: {
        visible: false
      }
    };
  },
  computed: {},
  created () { },
  methods: {}
};
</script>

<style lang="stylus" scoped>
i {
  background: activeState;
  color: light;
  position: absolute;
  right: 0;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  box-shadow: 0 0 0.5rem activeState;
  top: 30vh;
  z-index: 100;
  text-align: center;
  font-size: 4rem;
}
</style>
