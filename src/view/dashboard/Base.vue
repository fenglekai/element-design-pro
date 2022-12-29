<script lang="ts" setup>
import { computed, ref } from "vue";
import BaseChartVue from "~/components/BaseChart.vue";
import ProductTable from "./ProductTable.vue";
import BaseTabs from "./BaseTabs.vue";
import * as echarts from "echarts";

const pieOption = {
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: "5%",
    left: "center",
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: false,
        position: "center",
      },
      labelLine: {
        show: true,
      },
      data: [
        { value: 1048, name: "Search Engine" },
        { value: 735, name: "Direct" },
        { value: 580, name: "Email" },
        { value: 484, name: "Union Ads" },
        { value: 300, name: "Video Ads" },
      ],
    },
  ],
};
const barOption = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      // Use axis to trigger tooltip
      type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
    },
  },
  legend: {},
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: {
    type: "value",
  },
  yAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  series: [
    {
      name: "Direct",
      type: "bar",
      stack: "total",
      label: {
        show: true,
      },
      emphasis: {
        focus: "series",
      },
      data: [320, 302, 301, 334, 390, 330, 320],
    },
    {
      name: "Mail Ad",
      type: "bar",
      stack: "total",
      label: {
        show: true,
      },
      emphasis: {
        focus: "series",
      },
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: "Affiliate Ad",
      type: "bar",
      stack: "total",
      label: {
        show: true,
      },
      emphasis: {
        focus: "series",
      },
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: "Video Ad",
      type: "bar",
      stack: "total",
      label: {
        show: true,
      },
      emphasis: {
        focus: "series",
      },
      data: [150, 212, 201, 154, 190, 330, 410],
    },
    {
      name: "Search Engine",
      type: "bar",
      stack: "total",
      label: {
        show: true,
      },
      emphasis: {
        focus: "series",
      },
      data: [820, 832, 901, 934, 1290, 1330, 1320],
    },
  ],
};

const gaugeValue = ref(0);

const gaugeOption = computed(() => {
  return {
    series: [
      {
        type: "gauge",
        axisLine: {
          lineStyle: {
            width: 20,
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
            color: [
              [0.3, "#f4664a"],
              [0.5, "#f5db7c"],
              [0.7, "#a0d911"],
              [1, "#30bf78"],
            ],
          },
        },
        pointer: {
          itemStyle: {
            color: "inherit",
          },
        },
        axisTick: "none",
        splitLine: "none",
        axisLabel: "none",
        detail: {
          valueAnimation: true,
          formatter: (value: any) => {
            if (value <= 30) {
              return "差";
            } else if (value <= 50) {
              return "中";
            } else if (value <= 70) {
              return "良";
            }
            return "优";
          },
          color: "inherit",
        },
        data: [
          {
            value: gaugeValue.value,
          },
        ],
      },
    ],
  };
});

setInterval(function () {
  gaugeValue.value = +(Math.random() * 100).toFixed(2);
}, 2000);

const lineOption = {
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月"],
  },
  yAxis: {
    type: "value",
    axisLabel: {
      formatter: function (val: any) {
        return val + "%";
      },
    },
  },
  series: [
    {
      name: "数据占比",
      type: "line",
      data: [22, 23, 18, 24, 32, 33, 52],
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgba(91,143,249,0.3)",
          },
          {
            offset: 1,
            color: "rgba(91,143,249,0)",
          },
        ]),
      },
    },
  ],
};
const barOption2 = {
  legend: {},
  tooltip: {},
  dataset: {
    source: [
      ["product", "2015", "2016", "2017"],
      ["欧洲", 43.3, 85.8, 93.7],
      ["美洲", 83.1, 73.4, 55.1],
      ["非洲", 86.4, 65.2, 82.5],
    ],
  },
  xAxis: { type: "category" },
  yAxis: {
    name: "产品销量",
    nameLocation: "middle",
    nameTextStyle: {
      padding: 20,
    },
  },
  // Declare several bar series, each will be mapped
  // to a column of dataset.source by default.
  series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
};
</script>

<template>
  <ElRow px-6 pt-6 w-full :gutter="24">
    <ElCol mb-4 :span="12" :xs="24">
      <ElCard shadow="hover">
        <div font-bold mb-4>
          <span>资产配置达成</span>
        </div>
        <BaseChartVue :option="pieOption" chartId="pieChart" />
      </ElCard>
    </ElCol>
    <ElCol mb-4 :span="12" :xs="24">
      <ElCard shadow="hover">
        <div font-bold mb-4>
          <span>年销量统计</span>
        </div>
        <BaseChartVue :option="barOption" chartId="barChart" />
      </ElCard>
    </ElCol>
    <ElCol mb-4 :span="16" :xs="24">
      <ElCard shadow="hover" :body-style="{ padding: 0 }">
        <template #header>
          <div flex justify-between items-center>
            <span font-bold>进行中的项目</span>
            <el-link type="primary">全部项目</el-link>
          </div>
        </template>
        <ProductTable />
      </ElCard>
    </ElCol>
    <ElCol mb-4 :span="8" :xs="24">
      <ElCard shadow="hover">
        <div font-bold mb-4>
          <span>年度收益</span>
        </div>
        <BaseChartVue
          :option="gaugeOption"
          chartId="gaugeChart"
          height="19.2rem"
        />
      </ElCard>
    </ElCol>
    <ElCol mb-4>
      <ElCard shadow="hover">
        <BaseTabs />
      </ElCard>
    </ElCol>
    <ElCol mb-4 :span="12" :xs="24">
      <ElCard shadow="hover">
        <div font-bold mb-4>
          <span>年度趋势</span>
        </div>
        <BaseChartVue :option="lineOption" chartId="lineChartTwo" />
      </ElCard>
    </ElCol>
    <ElCol mb-4 :span="12" :xs="24">
      <ElCard shadow="hover">
        <div font-bold mb-4>
          <span>年度趋势</span>
        </div>
        <BaseChartVue :option="barOption2" chartId="barChartTwo" />
      </ElCard>
    </ElCol>
  </ElRow>
</template>

<style lang="scss" scoped>
.text-color {
  color: var(--ep-text-color-secondary);
}
</style>
