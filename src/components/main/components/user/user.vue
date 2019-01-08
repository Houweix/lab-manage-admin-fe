<template>
  <div class="user-avator-dropdown">
    <Dropdown @on-click="handleClick">
      <Badge :dot="!!messageUnreadCount">
        <Avatar :src="userImg"/>
      </Badge>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="mine">个人中心</DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import "./user.less";
import Cookies from "js-cookie";
import userImg from "@/assets/images/user.jpg";
// import { mapActions } from "vuex";
// import adminModel from "@/api/admin.js";

export default {
  name: "User",
  props: {
    userAvator: {
      type: String,
      default: ""
    },
    messageUnreadCount: {
      type: Number,
      default: 0
    }
  },
  methods: {
    logout () {
      // 删除cookies
      if (Cookies.get("user")) {
        Cookies.remove("user");
      }

      this.$Notice.success({
        title: "退出登录成功",
        desc: false
      });

      setTimeout(() => {
        this.$router.push({
          name: "login"
        });
      }, 1000);
    },
    //  进入个人中心
    enterMine () {
      console.log(123);
      this.$router.push({ name: "personal" });
      // this.$router.push({ name: "argu" });
    },
    handleClick (name) {
      switch (name) {
        // 退出登录
        case "logout":
          this.logout();
          break;
        // 进入个人中心
        case "mine":
          this.enterMine();
          break;
      }
    }
  },
  data () {
    return {
      userImg: userImg
    }
  }
};
</script>
