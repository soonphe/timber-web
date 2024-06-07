<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'
import menuDashboard from './menu'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard, menuDashboard },
  data() {
    return {
      // 默认用户显示界面，可根据需要自行切换
      // currentRole: 'adminDashboard'
      // currentRole: 'editorDashboard'
      currentRole: 'menuDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (this.roles && !this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>
