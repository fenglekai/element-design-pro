function debounce(
  func: { apply: (arg0: any, arg1: IArguments) => void },
  wait: number | undefined,
  immediate?: any
) {
  let timeout: string | number | NodeJS.Timeout | null | undefined;

  return function (this: any) {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout); // timeout 不为null
    if (immediate) {
      let callNow = !timeout; // 第一次会立即执行，以后只有事件执行后才会再次触发
      timeout = setTimeout(function () {
        timeout = null;
      }, wait);
      if (callNow) {
        func.apply(context, args);
      }
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
  };
}

function setEpColor(color: string, isDark: boolean) {
  /**
   * 根据主题变化混合颜色
   */
  const WHITE = isDark ? "#000000" : "#ffffff"
  const DARK = isDark ? "#ffffff" : "#000000"
  /**
   * 混合颜色
   */
  const mix = (color1: string, color2: string, weight: number) => {
    weight = Math.max(Math.min(Number(weight), 1), 0);
    let r1,g1,b1
    // 判断传入颜色hex或rgb格式
    if (color1.includes('rgb')) {
      const rgb = color1.match(/(\d(\.\d+)?)+/g);
      r1 = parseInt(rgb ? rgb[0] : "0");
      g1 = parseInt(rgb ? rgb[1] : "0");
      b1 = parseInt(rgb ? rgb[2] : "0");
    } else {
      r1 = parseInt(color1.substring(1, 3), 16);
      g1 = parseInt(color1.substring(3, 5), 16);
      b1 = parseInt(color1.substring(5, 7), 16);
    }
    const r2 = parseInt(color2.substring(1, 3), 16);
    const g2 = parseInt(color2.substring(3, 5), 16);
    const b2 = parseInt(color2.substring(5, 7), 16);
    const r = Math.round(r1 * (1 - weight) + r2 * weight);
    const g = Math.round(g1 * (1 - weight) + g2 * weight);
    const b = Math.round(b1 * (1 - weight) + b2 * weight);
    const _r = ("0" + (r || 0).toString(16)).slice(-2);
    const _g = ("0" + (g || 0).toString(16)).slice(-2);
    const _b = ("0" + (b || 0).toString(16)).slice(-2);
    return "#" + _r + _g + _b;
  };
  const ep = document.documentElement;
  // 设置主要颜色
  ep.style.setProperty("--ep-color-primary", color);
  // 循环设置次级颜色
  for (let i = 1; i < 10; i += 1) {
    ep.style.setProperty(
      `--ep-color-primary-light-${i}`,
      mix(color, WHITE, i * 0.1)
    );
  }
  // 设置主要暗色
  const dark = mix(color, DARK, 0.2);
  ep.style.setProperty(`--ep-color-primary-dark-2`, dark);
}

export { debounce, setEpColor };
