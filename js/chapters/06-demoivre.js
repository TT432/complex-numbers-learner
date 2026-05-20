/* 第 6 章：De Moivre 定理与单位根 */
const chapter06 = {
  id: 'ch6',
  title: 'De Moivre 定理',
  subtitle: '乘方与单位根',
  render(container) {
    container.insertAdjacentHTML('beforeend', `
      <div class="chapter">
        <h2>📖 第 6 章：De Moivre 定理</h2>
        <p class="ch-subtitle">乘方与单位根</p>

        <div class="ch-text">
          <p>利用极坐标形式，复数的乘方变得极其简单：</p>
          <div class="formula-block">$$[r(\\cos\\theta + i\\sin\\theta)]^n = r^n(\\cos n\\theta + i\\sin n\\theta)$$</div>
          <p>这就是 <strong>De Moivre 定理</strong>。它告诉我们：</p>
          <ul style="padding-left:20px;margin:12px 0;line-height:2">
            <li>模被 <span class="highlight">乘方</span>：$r \\to r^n$</li>
            <li>辐角被 <span class="highlight">放大 n 倍</span>：$\\theta \\to n\\theta$</li>
          </ul>
          <p>拖动下面的滑块，观察 $z^n$ 如何随着 n 的变化而旋转和缩放：</p>
        </div>

        <div class="canvas-wrapper">
          <canvas id="c06-canvas"></canvas>
          <div class="canvas-label">👆 拖拽蓝点调整 z，滑块调整 n</div>
        </div>

        <div class="control-group">
          <label>
            n 的次方
            <input type="range" id="c06-slider" min="1" max="8" step="1" value="2">
            <span class="control-value" id="c06-n-val">2</span>
          </label>
        </div>

        <div class="info-panel" id="c06-info">
          <div class="info-item">
            <span class="dot" style="background:#60a5fa"></span>
            <span class="label">z</span>
            <span class="value" id="c06-z">1.50 + 1.00i</span>
          </div>
          <div class="info-item">
            <span class="dot" style="background:#f472b6"></span>
            <span class="label">zⁿ</span>
            <span class="value" id="c06-zn">1.25 + 3.00i</span>
          </div>
        </div>

        <div class="ch-text">
          <h3 style="margin:16px 0 8px">单位根 — zⁿ = 1</h3>
          <p>方程 $z^n = 1$ 在复数域恰好有 <strong>n 个解</strong>，它们均匀分布在单位圆上，构成一个正 n 边形：</p>
          <div class="formula-block">$$z_k = \\cos\\frac{2\\pi k}{n} + i\\sin\\frac{2\\pi k}{n},\\quad k = 0,1,\\dots,n-1$$</div>
          <p>调整下方的 n 值观察：</p>
        </div>

        <div class="control-group">
          <label>
            单位根 n =
            <input type="range" id="c06-root-slider" min="1" max="12" step="1" value="5">
            <span class="control-value" id="c06-root-n-val">5</span>
          </label>
        </div>

        <div class="canvas-wrapper">
          <canvas id="c06-canvas2"></canvas>
          <div class="canvas-label">n 次单位根构成一个正 n 边形</div>
        </div>
      </div>
    `);

    // ---- 第一部分：z^n ----
    const z = new Complex(1.5, 1);
    const plane = new ComplexPlane('c06-canvas', { scale: 40 });
    let n = 2;

    function updatePower() {
      const zn = z.pow(n);
      document.getElementById('c06-z').textContent = z.fmt();
      document.getElementById('c06-zn').textContent = zn.fmt();
      plane.clearStatic();
      plane.addStaticVector(zn, '#f472b6', 'zⁿ');
    }

    plane.addPoint(z, '#60a5fa', 'z', (zp) => updatePower());
    updatePower();

    document.getElementById('c06-slider').oninput = function() {
      n = parseInt(this.value);
      document.getElementById('c06-n-val').textContent = n;
      updatePower();
    };

    // ---- 第二部分：单位根 ----
    const plane2 = new ComplexPlane('c06-canvas2', { scale: 50 });
    let rootN = 5;

    function updateRoots() {
      plane2.clearAll();
      const roots = unitRoots(rootN);
      const colors = ['#60a5fa','#34d399','#f472b6','#fb923c','#a78bfa','#fbbf24','#ef4444','#06b6d4','#8b5cf6','#ec4899','#14b8a6','#f97316'];

      // 单位圆
      plane2.addCircle(0, 0, 1, 'rgba(148,163,184,.3)', true);

      // 正多边形连线
      for (let i = 0; i < rootN; i++) {
        const j = (i + 1) % rootN;
        plane2.addLine(roots[i], roots[j], 'rgba(96,165,250,.3)');
      }

      // 根的点
      roots.forEach((rz, idx) => {
        plane2.addStaticPoint(rz, colors[idx % colors.length], `ω^{${idx}}`);
      });
    }

    updateRoots();

    document.getElementById('c06-root-slider').oninput = function() {
      rootN = parseInt(this.value);
      document.getElementById('c06-root-n-val').textContent = rootN;
      updateRoots();
    };
  }
};
