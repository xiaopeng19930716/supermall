<!--
 * @Descripttion: 
 * @version: 
 * @Author: 肖鹏
 * @Date: 2020-04-22 19:31:56
 * @LastEditors: 肖鹏
 * @LastEditTime: 2020-04-25 13:47:55
 -->
<template>
  <div>
    <el-dialog
      :visible.sync="dialog.visible"
      width="42%"
      @close="dialog.visible=false"
    >
      <el-card :body-style="{ padding: '0px' }">
        <el-row
          class="msgarea"
          id="msgbox"
        >
          <el-row
            v-for="(item, index) in messages"
            :key="index"
            :class="[!item.isRight? 'left':'right']"
          >
            <el-avatar
              shape="square"
              :size="size"
              :src="item.imgUrl"
            ></el-avatar>
            <p>{{item.message}}</p>
          </el-row>
        </el-row>
        <el-input
          v-model="myMsg"
          placeholder="按Enter发送"
          size="small"
          @keydown.enter.native="sendMessage"
        >
          <template slot="append">
            <el-button
              type="primary"
              @click="sendMessage"
              size="small"
            >发送</el-button>
          </template>
        </el-input>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import Chat from "network/socket/chat";
import { mapGetters } from "vuex";
export default {
  name: "chatDialog",
  components: {},
  props: {
    dialog: {
      visible: Boolean
    }
  },
  data () {
    return {
      msg: {},
      messages: [],
      myMsg: "",
      size: "small",
      loginUser: JSON.parse(sessionStorage.getItem("loginUser"))
    };
  },
  computed: {
    ...mapGetters(["isLogin"]),
    userName () {
      return this.loginUser ? this.loginUser.username : ''
    },
    newMsg () {
      var that = this
      Chat.recive((iconUrl, msg) => {
        that.msg = {
          imgUrl: iconUrl,
          message: msg
        }
      })
      return this.msg;
    }
  },
  watch: {
    newMsg (newVal) {
      if (this.isLogin) {
        this.messages.push(newVal)
      }
    },
    messages: "scrollToBottom",
  },
  created () {
    Chat.init(this.userName);
  },
  methods: {
    sendMessage () {
      console.log(this.isLogin);
      if (!this.isLogin) {
        this.$message({
          message: '你还未登录系统',
          type: 'info',
        });
      } else if (!this.myMsg == "") {
        Chat.send(this.userName, this.myMsg)
        this.messages.push({
          imgUrl: this.loginUser.icon_url,
          message: this.myMsg,
          isRight: true
        })
        this.myMsg = "";
      }
    },
    scrollToBottom () {
      const container = document.getElementById("msgbox");
      this.$nextTick(() => {
        container.scrollTop = container.scrollHeight;
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
.msgarea {
  width: 100%;
  height: 50vh;
  background: #e2e5ef;
  overflow: scroll;
}

.left,
.right {
  width: 100%;
  margin: 0.1rem 0;
  padding: 0.4rem;
  display: flex;

  p {
    max-width: 61.8%;
    margin: 0 0.3rem;
    padding: 0.6rem;
    border-radius: 0.4rem;
    transition: all 0.2s;
    background: activeState;
    border: 0.1rem solid primary;
    color: #fff;

    &:hover {
    }
  }
}

.left {
  justify-content: start;
}

.right {
  justify-content: end;
  flex-direction: row-reverse;
}

.left p {
  background: #fdffff;
  color: black;
}
</style>
