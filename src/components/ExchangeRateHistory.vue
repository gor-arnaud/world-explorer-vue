<template>
  <div class="chart-container">
    <h2>Exchange rate history for {{ currency }} against {{ baseCurrency }}</h2>
    <div ref="chart"></div>
  </div>
</template>
<script>
import { createChart } from "lightweight-charts";
import axios from "axios";

let chart = null;
let series = null;

export default {
  name: "ExchangeRateHistory",
  props: {
    currency: {
      type: String,
      default: "",
    }
  },
  computed: {
    dataUrl: function () {
      return `https://api.exchangerate.host/timeseries?start_date=2022-12-01&end_date=2023-01-10&base=${this.baseCurrency}&symbols=${this.currency}`;
    },
    baseCurrency: function() {
      return this.$store.state.baseCurrency;
    }
  },
  methods: {
    createChart: function () {
      chart = createChart(this.$refs.chart, {
        width: 400,
        height: 300,
      });

      series = chart.addLineSeries();
    },
    refreshChart: function () {
      console.log("refresh chart with : ", this.dataUrl)
      axios
        .get(this.dataUrl)
        .then((result) => {
          const data = Object.keys(result.data.rates).map((key) => {
            return {
              time: key,
              value: result.data.rates[key][this.currency],
            };
          });

          series.setData(data);
        })
        .catch((error) => console.error(error));
    },
    removeChart: function () {
      if (chart) {
        chart.remove();
        chart = null;
      }
      if (series) series = null;
    },
  },
  mounted() {
    this.createChart();
    this.refreshChart();
  },
  watch: {
    dataUrl: function () {
      this.refreshChart();
    },
  },
};
</script>