<template>
  <div class="dashboard-editor-container">
      <el-header>
        <img style="vertical-align: text-bottom" src="@/assets/icon/title_icon.jpg" alt="" width="60">
        <span style="vertical-align: text-bottom">中台通用化组件</span>
      </el-header>
      <el-row :gutter="40" class="panel-group">
        <el-col v-for="item in list" :key="item.id" :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel" @click="handleSetLineChartData(item.link)">
            <div class="card-panel-icon-wrapper icon-people">
              <!--            <img class="card-panel-icon" src="@/assets/icon/group_4.png" alt="404" style="width: 48px">-->
              <img class="card-panel-icon" :src=imgSrc(item.icon) alt="404" style="width: 64px">
              <!--            <svg-icon :icon-class="item.icon" class-name="card-panel-icon" />-->
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                {{ item.title }}
              </div>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-header>
        <img style="vertical-align: text-bottom" src="@/assets/icon/title_icon.jpg" alt="" width="60">
        <span style="vertical-align: text-bottom">常用运维工具</span>
      </el-header>
      <el-row :gutter="40" class="panel-group">
        <el-col v-for="item in commonList" :key="item.id" :xs="6" :sm="6" :lg="3" class="card-panel-col">
          <div class="card-panel2" @click="handleSetLineChartData(item.link)">
            <div class="card-panel-icon-wrapper icon-message">
              <img class="card-panel-icon" :src=imgSrc(item.icon) alt="404" style="width: 64px">
              <!--            <svg-icon :icon-class="item.icon" class-name="card-panel-icon" />-->
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                {{ item.title }}
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import { indexGetList, indexCommonGetList } from '@/api/server'

export default {
  name: 'DashboardMenu',
  data() {
    return {
      list: {
        type: Array,
        default() {
          return []
        }
      },
      commonList: {
        type: Array,
        default() {
          return []
        }
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    imgSrc: function(index) {
      if (index) {
        return require('@/assets/icon/' + (index) + '.png')
      }
    },
    handleSetLineChartData(type) {
      window.open(type)
      // this.$emit('handleSetLineChartData', type)
    },
    fetchData() {
      indexGetList().then(response => {
        this.list = response.data
      }).catch(err => {
        console.log(err)
      })
      indexCommonGetList().then(response => {
        this.commonList = response.data
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
.el-header, .el-footer {
  background-color: #FFFFFF;
  color: #333;
  text-align: center;
  line-height: 60px;
  font-size: 30px;
  font-weight: normal;
  color: #333333;
  font-family: "Microsoft YaHei";
  border-radius: 7px;
}
.panel-group {
  margin-top: 20px;

  .card-panel-col {
    margin-bottom: 24px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    border-radius: 7px;
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 7px 0 0 7px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: left;
      width: 50%;
      font-weight: bold;
      margin-top: 38px;
      margin-left: 10px;
      text-align: center;

      .card-panel-text {
        line-height: 24px;
        color: rgba(0, 0, 0, 0.65);
        font-size: 24px;
        /*margin-bottom: 12px;*/
        text-align: center;
      }

      .card-panel-num {
        margin-top: 0px;
        font-size: 20px;
        text-align: left;
      }
    }
  }
  .card-panel2 {
    height: 200px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    border-radius: 7px;
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 7px 1000px 0 7px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      width: 100%;
      float: left;
      font-weight: bold;
      margin-top: 38px;
      //margin-left: 10px;
      text-align: center;
      word-break: break-all;

      .card-panel-text {
        line-height: 24px;
        color: rgba(0, 0, 0, 0.65);
        font-size: 24px;
        /*margin-bottom: 12px;*/
        text-align: center;
      }

      .card-panel-num {
        margin-top: 0px;
        font-size: 20px;
        text-align: left;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
