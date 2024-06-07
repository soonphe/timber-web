<template>
  <ul>
    <li v-for="item in menuItems" :key="item.id">
      <span>{{ item.title }}</span>
      <menu-item v-if="item.children" :menu-items="item.children" />
    </li>
  </ul>
</template>

<!--自定义多层菜单嵌套组件-->
<script>
export default {
  name: 'MenuItem',
  props: {
    menuItems: Array
  }
}
</script>
