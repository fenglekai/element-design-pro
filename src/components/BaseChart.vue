<script lang="ts" setup>
import { onMounted, Ref, ref, watch } from "vue";
import * as echarts from "echarts";
import type { ECharts, EChartsOption } from "echarts/types/dist/echarts";
import { debounce } from "~/utils/common";
import { isDark } from "~/composables";

const props = defineProps({
  height: {
    type: String,
    default: () => {
      return "400px";
    },
  },
  chartId: {
    type: String,
    default: () => {
      return "chart";
    },
  },
  option: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

const chartWrapperDom = ref();
const chartDom: Ref<HTMLElement | any> = ref();
let chart: ECharts;

const initEchart = () => {
  if (chart) {
    chart.dispose();
  }
  if (isDark.value) {
    chart = echarts.init(chartDom.value, "dark");
  } else {
    chart = echarts.init(chartDom.value);
  }
  const option: EChartsOption = props.option;
  chart.setOption(option);
};

// 适配Echart主题色
watch(isDark, () => {
  initEchart();
});

// 动态option
watch(
  () => props.option,
  (val) => {
    chart.setOption(val);
  }
);

// 使图表自适应窗口大小
onMounted(() => {
  chartDom.value = document.getElementById(props.chartId);
  chartWrapperDom.value = document.getElementById(props.chartId + "Wrapper");
  initEchart();
  const resizeObserver = new ResizeObserver(
    debounce(function () {
      chart.resize();
    }, 500)
  );
  resizeObserver.observe(chartWrapperDom.value);
});
</script>

<template>
  <div :id="props.chartId + 'Wrapper'" :style="{ width: '100%' }">
    <div
      :id="props.chartId"
      :style="{ width: '100%', height: props.height }"
    ></div>
  </div>
</template>
