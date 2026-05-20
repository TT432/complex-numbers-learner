/* 第 6 章：De Moivre 定理 — 乘方与单位根 */
const chapter06 = {
  id: 'ch6',
  title: 'De Moivre 定理',
  subtitle: '乘方与单位根',
  render(container) {
    container.insertAdjacentHTML('beforeend', `
      <div class="chapter">
        <h2>第 6 章：De Moivre 定理</h2>
        <p class="ch-subtitle">乘方与单位根</p>

        <div class="ch-text">
          <p>利用极坐标形式，复数的乘方变得极其简单。</p>
          <div class="formula-block">$$[r(\\cos\\theta + i\\sin\\theta)]^n = r^n(\\cos n\\theta + i\\sin n\\theta)$$</div>

          <p><strong>几何意义：</strong>乘方 $z^n$ 将模放大 $n$ 次方，将辐角放大 $n$ 倍。</p>
          <ul style="padding-left:20px;margin:12px 0;line-height:2">
            <li>模 $r$ 变成 <span class="highlight">$r^n$</span> — 指数级缩放（$r>1$ 放大，$r<1$ 缩小）</li>
            <li>辐角 $\\theta$ 变成 <span class="highlight">$n\\theta$</span> — 旋转速度随 $n$ 线性增加</li>
          </ul>
        </div>

        <div class="canvas-wrapper">
          <canvas id="c06-canvas"></canvas>
          <div class="canvas-label">拖拽蓝点调整 z，滑块调整 n</div>
        </div>

        <div class="info-panel" id="c06-info">
          <div class="info-item">
            <span class="dot" style="background:#60a5fa"></span>
            <span class="label">z</span>
            <span class="value" id="c06-z">1.5+i</span>
          </div>
          <div class="info-item">
            <span class="dot" style="background:#f472b6"></span>
            <span class="label">z\u207F</span>
            <span class="value" id="c06-zn">1.25+3i</span>
          </div>
        </div>

        <div class="control-group">
          <label>
            指数 n =
            <input type="range" id="c06-slider" min="1" max="8" step="1" value="2">
            <span class="control-value" id="c06-n-val">2</span>
          </label>
        </div>

        <div class="ch-text">
          <p><strong>尝试：</strong></p>
          <ul style="padding-left:20px;margin:12px 0;line-height:2">
            <li>拖 z 到 <span class="highlight">(1, 0)</span>，调整 n — $1^n \\equiv 1$，永远不变</li>
            <li>拖 z 到 <span class="highlight">单位圆上</span>（$r=1$），调整 n — 模不变，只在圆上旋转</li>
            <li>拖 z 到 <span class="highlight">(0, 1)</span>（$z=i$），n=2 — $i^2 = -1$</li>
          </ul>
        </div>

        <div class="ch-text">
          <p><strong>单位根 — $z^n = 1$ 的 n 个解</strong></p>
          <p>方程 $z^n = 1$ 在复数域恰好有 <strong>n 个解</strong>，它们均匀分布在单位圆上，构成一个正 n 边形：</p>
          <div class="formula-block">$$z_k = \\cos\\frac{2\\pi k}{n} + i\\sin\\frac{2\\pi k}{n},\\quad k = 0,1,\\dots,n-1$$</div>
          <p>调整下方的 n 值观察：n=3 构成正三角形，n=4 构成正方形，n=6 构成正六边形。</p>
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
          <div class="canvas-label">n 次单位根均匀分布在单位圆上，构成正 n 边形</div>
        </div>
      </div>
    `);

    // ---- Part 1: z^n ----
    const z = new Complex(1.5, 1);
    const plane = new ComplexPlane('c06-canvas', { scale: 40 });
    let n = 2;

    function updatePower() {
      const zn = z.pow(n);
      document.getElementById('c06-z').textContent = z.fmt();
      document.getElementById('c06-zn').textContent = zn.fmt();
      plane.clearStatic();
      plane.addStaticVector(zn, '#f472b6', 'z\u207F');
    }

    plane.addPoint(z, '#60a5fa', 'z', () => updatePower());
    // 单位圆参考
    plane.addCircle(0, 0, 1, 'rgba(148,163,184,.2)', true);
    updatePower();

    document.getElementById('c06-slider').oninput = function() {
      n = parseInt(this.value);
      document.getElementById('c06-n-val').textContent = n;
      updatePower();
    };

    // ---- Part 2: Unit roots ----
    const plane2 = new ComplexPlane('c06-canvas2', { scale: 50 });
    let rootN = 5;

    function updateRoots() {
      plane2.clearAll();
      const roots = unitRoots(rootN);
      const colors = ['#60a5fa','#34d399','#f472b6','#fb923c','#a78bfa','#fbbf24','#ef4444','#06b6d4','#8b5cf6','#ec4899','#14b8a6','#f97316'];

      plane2.addCircle(0, 0, 1, 'rgba(148,163,184,.3)', true);

      for (let i = 0; i < rootN; i++) {
        const j = (i + 1) % rootN;
        plane2.addLine(roots[i], roots[j], 'rgba(96,165,250,.3)');
      }

      roots.forEach((rz, idx) => {
        plane2.addStaticPoint(rz, colors[idx % colors.length], `\u03C9^{${idx}}`);
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
