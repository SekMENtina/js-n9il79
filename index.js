// Import stylesheets
import './style.css';

import { color, Root, Scrollbar, Tooltip } from '@amcharts/amcharts5';
import AnimatedTheme from '@amcharts/amcharts5/themes/Animated';
import chartLocale_ru_RU from '@amcharts/amcharts5/locales/ru_RU';
import {
  XYChart,
  ValueAxis,
  AxisRendererX,
  AxisRendererY,
  XYCursor,
  StepLineSeries,
  CategoryDateAxis,
  DateAxis,
  CategoryAxis,
} from '@amcharts/amcharts5/xy';

import { throttle } from 'lodash-es';

const handleCursorMove = throttle((e) => {
  console.log('cursor moved');
}, 500);

const items = [
  { date: 1593550800000, value: 100 },
  { date: 1593599136000, value: 30 },
  { date: 1593599176000, value: 100 },
  { date: 1593703536000, value: 30 },
  { date: 1593703576000, value: 100 },
  { date: 1593807936000, value: 30 },
  { date: 1593807976000, value: 100 },
  { date: 1593912336000, value: 30 },
  { date: 1593912376000, value: 100 },
  { date: 1594073657000, value: 60 },
  { date: 1594077196000, value: 100 },
  { date: 1594077756000, value: 30 },
  { date: 1594077796000, value: 60 },
  { date: 1594078098000, value: 100 },
  { date: 1594328400000, value: 100 },
];

let chart = null;
let xAxis = null;
let yAxis = null;
let root = null;

root = Root.new(document.querySelector('#chart'));

root.setThemes([AnimatedTheme.new(root)]);
root.locale = chartLocale_ru_RU;

chart = root.container.children.push(
  XYChart.new(root, {
    cursor: XYCursor.new(root, {
      behavior: 'zoomX',
      xAxis: xAxis,
      yAxis: yAxis,
    }),
    scrollbarX: Scrollbar.new(root, { orientation: 'horizontal' }),
    layout: root.verticalLayout,
  })
);

yAxis = chart.yAxes.push(
  ValueAxis.new(root, {
    renderer: AxisRendererY.new(root, {}),
  })
);

xAxis = chart.xAxes.push(
  DateAxis.new(root, {
    baseInterval: { timeUnit: 'minute', count: 1 },
    renderer: AxisRendererX.new(root, {}),
    tooltipDateFormat: 'dd.MM HH:mm',
    categoryField: 'date',
    tooltip: Tooltip.new(root, { themeTags: ['axis'] }),
  })
);

const cursor = chart.get('cursor');

cursor.lineY.setAll({
  forceHidden: true,
});

cursor.events.on('cursormoved', handleCursorMove);

let series = chart.series.push(
  StepLineSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: 'value',
    valueXField: 'date',
  })
);

series.fills.template.setAll({
  fillOpacity: 0.5,
  visible: true,
});

series.strokes.template.setAll({
  strokeWidth: 2,
});

series.appear();
chart.appear();
series.data.setAll(items);
