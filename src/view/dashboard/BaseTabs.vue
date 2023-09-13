<script lang="ts" setup>
import { TabsPaneContext } from "element-plus";
import { ref } from "vue";
import BaseChartVue from "~/components/BaseChart.vue";
const activeName = ref("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};

const option = {
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: ["客流量", "支付笔数"],
  },
  grid: {
    left: "3%",
    right: "4%",
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  dataZoom: [
    {
      type: "slider",
      show: true,
    },
    {
      type: "inside",
    },
  ],
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
    ],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "客流量",
      type: "line",
      data: [30, 27, 30, 25, 45, 26, 32, 27, 30, 25, 45, 26, 32, 33, 50, 50],
    },
    {
      name: "支付笔数",
      type: "line",
      data: [15, 24, 17, 43, 40, 58, 13, 24, 17, 43, 40, 58, 13, 46, 52, 52],
    },
  ],
};
</script>

<template>
  <ElTabs v-model="activeName" class="tabs" @tab-click="handleClick">
    <ElTabPane name="first">
      <template #label>
        <div :style="{ width: '10rem', padding: '0 0 20px 10px' }">
          <div :style="{ display: 'inline-block', width: '50%' }">
            <p text-5 m-0>Stores 0</p>
            <p text-4 m-0>转换率</p>
            <p text-6 m-0>62%</p>
          </div>
          <div :style="{ display: 'inline-block', width: '50%' }">
            <ElProgress
              type="circle"
              stroke-linecap="butt"
              :width="64"
              :stroke-width="8"
              :percentage="62"
              :format="() => { return '' }"
            />
          </div>
        </div>
      </template>
    </ElTabPane>
    <ElTabPane label="Config" name="second">
      <template #label>
        <div :style="{ width: '10rem', padding: '0 0 20px 10px' }">
          <div :style="{ display: 'inline-block', width: '50%' }">
            <p text-5 m-0>Stores 1</p>
            <p text-4 m-0>转换率</p>
            <p text-6 m-0>80%</p>
          </div>
          <div :style="{ display: 'inline-block', width: '50%' }">
            <ElProgress
              type="circle"
              stroke-linecap="butt"
              :width="64"
              :stroke-width="8"
              :percentage="80"
              :format="() => { return '' }"
            />
          </div>
        </div>
      </template>
    </ElTabPane>
    <ElTabPane name="third">
      <template #label>
        <div :style="{ width: '10rem', padding: '0 0 20px 10px' }">
          <div :style="{ display: 'inline-block', width: '50%' }">
            <p text-5 m-0>Stores 2</p>
            <p text-4 m-0>转换率</p>
            <p text-6 m-0>45%</p>
          </div>
          <div :style="{ display: 'inline-block', width: '50%' }">
            <ElProgress
              type="circle"
              stroke-linecap="butt"
              :width="64"
              :stroke-width="8"
              :percentage="45"
              :format="() => { return '' }"
            />
          </div>
        </div>
      </template>
    </ElTabPane>
    <ElTabPane name="fourth">
      <template #label>
        <div :style="{ width: '10rem', padding: '0 0 20px 10px' }">
          <div :style="{ display: 'inline-block', width: '50%' }">
            <p text-5 m-0>Stores 3</p>
            <p text-4 m-0>转换率</p>
            <p text-6 m-0>75%</p>
          </div>
          <div :style="{ display: 'inline-block', width: '50%' }">
            <ElProgress
              type="circle"
              stroke-linecap="butt"
              :width="64"
              :stroke-width="8"
              :percentage="75"
              :format="() => { return '' }"
            />
          </div>
        </div>
      </template>
    </ElTabPane>
    <ElTabPane name="five">
      <template #label>
        <div :style="{ width: '10rem', padding: '0 0 20px 10px' }">
          <div :style="{ display: 'inline-block', width: '50%' }">
            <p text-5 m-0>Stores 4</p>
            <p text-4 m-0>转换率</p>
            <p text-6 m-0>30%</p>
          </div>
          <div :style="{ display: 'inline-block', width: '50%' }">
            <ElProgress
              type="circle"
              stroke-linecap="butt"
              :width="64"
              :stroke-width="8"
              :percentage="30"
              :format="() => { return '' }"
            />
          </div>
        </div>
      </template>
    </ElTabPane>
    <BaseChartVue :height="'500px'" :option="option" chartId="lineChart" />
  </ElTabs>
</template>

<style scoped>
.tabs :deep(.ep-tabs__item) {
  height: auto;
}
</style>
