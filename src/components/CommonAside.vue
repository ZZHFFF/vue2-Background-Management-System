<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
    <h3>{{ isCollapse ? "后台" : "通用后台管理系统" }}</h3>
    <el-menu-item
      @click="clickMenu(item)"
      v-for="item in noChildren"
      :index="item.path"
      :key="item.path"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu
      v-for="item in hasChildren"
      :index="item.label"
      :key="item.label"
    >
      <!-- 渲染出‘其他’ -->
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <!-- 页面一 页面二 -->
      <el-menu-item-group
        v-for="(subItem, subIndex) in item.children"
        :key="subItem.path"
      >
        <el-menu-item
          @click="clickMenu(subItem)"
          :index="subIndex.toString()"
          >{{ subItem.label }}</el-menu-item
        >
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100%;
  border: none;
  // 用less可以根据实际的结构写样式 css不可以
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}
</style>

<script>
export default {
  data() {
    return {
      menu: [],
    };
  },
  methods: {
    // 展开指定的 sub-menu 触发
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item) {
      this.$router.push({
        name: item.name,
      });
      this.$store.commit("selectMenu", item);
    },
  },
  computed: {
    noChildren() {
      return this.asyncMenu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.asyncMenu.filter((item) => item.children);
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
    asyncMenu() {
      return this.$store.state.tab.menu;
    },
  },
};
</script>