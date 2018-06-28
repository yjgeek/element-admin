<template>
  <i :class="['iconfont', 'icon-'+type]"></i>
</template>
<script>
  export default {
    name: "icon",
    props: ['type']
  }
</script>
<style lang="scss">
</style>