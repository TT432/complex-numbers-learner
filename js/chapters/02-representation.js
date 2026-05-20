/* 第 2 章：复数的表示 */
const chapter02 = {
  id: 'ch2',
  title: '复数的表示',
  subtitle: '直角坐标与极坐标',
  render(container) {
    container.insertAdjacentHTML('beforeend', `
      <div class="chapter">
        <h2>第 2 章：复数的表示</h2>
        <p class="ch-subtitle">直角坐标与极坐标</p>

        <div class="ch-text">
          <p>同一个点有两种描述方式：</p>

          <p><strong>直角坐标（代数形式）</strong></p>
          <div class="formula-block">$$z = a + bi$$</div>
          <p>$(a, b)$ 即点的"横纵位置"。</p>

          <p><strong>极坐标（三角形式）</strong></p>
          <div class="formula-block">$$z = r(\\cos\\theta + i\\sin\\theta)$$</div>
          <p>$r$ = 点到原点的距离（<strong>模</strong> modulus），$\\theta$ = 与实轴正方向的夹角（<strong>辐角</strong> argument）。</p>

          <ul style="padding-left:20px;margin:12px 0;line-height:2">
            <li>$r = |z| = \\sqrt{a^2 + b^2}$</li>
            <li>$\\theta = \\arg(z) = \\tan^{-1}(b/a)$</li>
          </ul>

          <p>由欧拉公式 $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$，极坐标可简写为 <strong>$z = re^{i\\theta}$</strong>。下文 info 面板中的"极坐标"栏即此形式。</p>
        </div>

        <div class="canvas-wrapper">
          <canvas id="c02-canvas"></canvas>
          <div class="canvas-label">拖拽蓝点：两种表示法描述同一个点</div>
        </div>

        <div class="info-panel" id="c02-info">
          <div class="info-item">
            <span class="dot" style="background:#60a5fa"></span>
            <span class="label">直角坐标</span>
            <span class="value" id="c02-rect">0</span>
          </div>
          <div class="info-item">
            <span class="dot" style="background:#34d399"></span>
            <span class="label">模 |z|</span>
            <span class="value" id="c02-mod">0</span>
          </div>
          <div class="info-item">
            <span class="dot" style="background:#f472b6"></span>
            <span class="label">辐角 \u03B8</span>
            <span class="value" id="c02-arg">0\u00B0</span>
          </div>
          <div class="info-item">
            <span class="dot" style="background:#a78bfa"></span>
            <span class="label">极坐标</span>
            <span class="value" id="c02-polar">0</span>
          </div>
        </div>

        <div class="ch-text">
          <p>极坐标将"乘法和乘方"简化为模的缩放和辐角的加减——第 4、6 章会展示这一点。</p>
        </div>
      </div>
    `);

    const z = new Complex(0, 0);
    const plane = new ComplexPlane('c02-canvas', { scale: 50 });
    plane.addPoint(z, '#60a5fa', 'z', (zp) => {
      document.getElementById('c02-rect').textContent = zp.fmt();
      document.getElementById('c02-mod').textContent = zp.fmtMod();
      document.getElementById('c02-arg').textContent = cleanNum(parseFloat(zp.deg.toFixed(1))) + '\u00B0';
      document.getElementById('c02-polar').textContent = zp.fmtPolar();
    });
    document.getElementById('c02-mod').textContent = z.fmtMod();
    document.getElementById('c02-arg').textContent = '0\u00B0';
    document.getElementById('c02-polar').textContent = z.fmtPolar();
    plane.addCircle(0, 0, 5, 'rgba(148,163,184,.15)', true);
    plane.addStaticPoint(new Complex(1, 0), 'rgba(148,163,184,.3)', null);
    plane.addStaticPoint(new Complex(0, 1), 'rgba(148,163,184,.3)', null);
    plane.addStaticPoint(new Complex(-1, 0), 'rgba(148,163,184,.3)', null);
    plane.addStaticPoint(new Complex(0, -1), 'rgba(148,163,184,.3)', null);
  }
};
