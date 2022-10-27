<template>
  <div class="tabs">
    <el-tag
      v-for="(tag, index) in tags"
      :key="tag.name"
      :closable="tag.name !== 'home'"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      @click="changeMenu(tag)"
      @close="handleClose(tag, index)"
      size="small"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "CommonTag",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
  methods: {
    ...mapMutations({
      close: "closeTag",
    }),
    changeMenu(item) {
      this.$router.push({ name: item.name });
    },
    handleClose(tag, index) {
      const length = this.tags.length - 1;
      this.close(tag);
      // 删除的不是当前页面的标签，页面不变，不做任何处理
      if (tag.name !== this.$route.name) {
        return;
      }
      // 删除的是最右侧，而且是当前页面的标签，则需要跳转到前一个标签页面
      if (index === length) {
        this.$router.push({
          name: this.tags[index - 1].name,
        });
      } else {
        // 删除的是中间的标签，而且是当前页面的标签，则需要跳转到右侧的标签页面
        this.$router.push({
          name: this.tags[index].name,
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.tabs {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
