import { RadarController } from "chart.js";

// https://www.chartjs.org/docs/latest/developers/charts.html#extending-existing-chart-types
class CustomRadarController extends RadarController {
  draw() {
    //super.draw(arguments);
    const ctx = this.chart.ctx;
    ctx.save();
    ctx.strokeStyle = "gray";
    ctx.fillStyle = "rgb(189 189 188)"
    ctx.lineWidth = 1;
    const meta = this.getMeta();
    if (meta.label === 'Transmission')
    for (let i = 0; i < meta.data.length; i++) {
        const point = meta.data[i];
        const { x, y } = point.getProps(["x", "y"]);
        const { radius } = point.options;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill()
        ctx.closePath();

    }
    ctx.restore();
  }
}

CustomRadarController.id = "derivedRadar";
CustomRadarController.defaults = RadarController.defaults;

export default CustomRadarController;
