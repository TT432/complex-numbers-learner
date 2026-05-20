/* 第 4 章：复数的乘除法 — 旋转与缩放 */
const chapter04 = {
  id: 'ch4',
  title: '复数的乘除法',
  subtitle: '旋转与缩放',
  render(container) {
    container.insertAdjacentHTML('beforeend', `
      <div class="chapter">
        <h2>第 4 章：复数的乘除法</h2>
        <p class="ch-subtitle">旋转与缩放</p>

        <div class="ch-text">
          <p>复数的乘除法在几何上极为优雅——它同时包含<strong>旋转</strong>和<strong>缩放</strong>。</p>

          <p><strong>代数公式</strong></p>
          <div class="formula-block">$$(a_1+b_1i)(a_2+b_2i) = (a_1a_2 - b_1b_2) + (a_1b_2 + a_2b_1)i$$</div>

          <p><strong>几何意义（极坐标视角）：</strong></p>
          <div class="formula-block">$$z_1 z_2 = r_1 r_2 [\\cos(\\theta_1+\\theta_2) + i\\sin(\\theta_1+\\theta_2)]$$</div>
          <ul style="padding-left:20px;margin:12px 0;line-height:2">
            <li><span class="highlight">模相乘</span>：$|z_1 z_2| = |z_1| \\cdot |z_2|$</li>
            <li><span class="highlight2">辐角相加</span>：$\\arg(z_1 z_2) = \\arg(z_1) + \\arg(z_2)$</li>
          </ul>
          <p>乘以一个复数，相当于：先缩放到 $z_2$ 的模，再旋转 $z_2$ 的辐角。</p>
        </div>

        <div class="ch-text">
          <p><strong>关键实验：</strong></p>
          <ul style="padding-left:20px;margin:12px 0;line-height:2">
            <li>拖 $z_2$ 到 <span class="highlight">(1, 0)</span>（$z_2=1$）— 乘除不变，因为模为 1、辐角为 0</li>
            <li>拖 $z_2$ 到 <span class="highlight">单位圆上</span>（$|z_2|=1$）— 乘法<strong>退化为纯旋转</strong>，不改变模长</li>
            <li>拖 $z_2$ 到 <span class="highlight">实轴上</span>（虚部=0）— 乘法<strong>退化为纯缩放</strong>，不改变方向</li>
            <li>特别地，乘以 <span class="highlight">i</span> 就是逆时针旋转 <strong>90\u00B0</strong></li>
          </ul>
        </div>

        <div class="canvas-wrapper">
          <canvas id="c04-canvas"></canvas>
          <div class="canvas-label">拖拽蓝色点，粉色 = 乘积（旋转+缩放），橙色 = 商</div>
        </div>

        <div class="info-panel" id="c04-info">
          <div class="info-item">
            <span class="dot" style="background:#60a5fa"></span>
            <span class="label">z\u2081</span>
            <span class="value" id="c04-z1">2+2i</span>
          </div>
          <div class="info-item">
            <span class="dot" style="background:#34d399"></span>
            <span class="label">z\u2082</span>
            <span class="value" id="c04-z2">1+2i</span>
          </div>
          <div class="info-item">
            <span class="dot" style="background:#f472b6"></span>
            <span class="label">z\u2081 \u00D7 z\u2082</span>
            <span class="value" id="c04-mul">-2+6i</span>
          </div>
          <div class="info-item">
            <span class="dot" style="background:#fb923c"></span>
            <span class="label">z\u2081 \u00F7 z\u2082</span>
            <span class="value" id="c04-div">1.2-0.4i</span>
          </div>
        </div>

        <div class="info-panel" id="c04-polar-info">
          <div class="info-item">
            <span class="dot" style="background:var(--text-muted)"></span>
            <span class="label">|z\u2081| \u00B7 |z\u2082| =</span>
            <span class="value" id="c04-mod-prod">5.66</span>
          </div>
          <div class="info-item">
            <span class="dot" style="background:var(--text-muted)"></span>
            <span class="label">\u03B8\u2081 + \u03B8\u2082 =</span>
            <span class="value" id="c04-angle-sum">108.4\u00B0</span>
          </div>
        </div>

        <div class="control-group">
          <label>
            旋转操作：
            <button class="btn" id="c04-mul-i">z\u2081 \u00D7 i</button>
            <button class="btn" id="c04-mul-ni">z\u2081 \u00D7 (\u2212i)</button>
          </label>
        </div>

        <div class="ch-text">
          <p><strong>数值意义：</strong></p>
          <div class="formula-block">$$(a+bi)(c+di) = (ac-bd) + (ad+bc)i$$</div>
          <p>注意 $ac - bd$ 中的减号：这与实数乘法不同，交叉项 $ad$ 和 $bc$ 在实部中相减、在虚部中相加。这正是"旋转"在代数中的体现。</p>
          <p>除法 $z_1 / z_2$ 则是逆操作：模相除、辐角相减。</p>
        </div>
      </div>
    `);

    const z1 = new Complex(2, 2);
    const z2 = new Complex(1, 2);
    const plane = new ComplexPlane('c04-canvas', { scale: 45 });

    function update(z1p, z2p) {
      const mul = z1p.mul(z2p);
      const div = z1p.div(z2p);
      document.getElementById('c04-z1').textContent = z1p.fmt();
      document.getElementById('c04-z2').textContent = z2p.fmt();
      document.getElementById('c04-mul').textContent = mul.fmt();
      document.getElementById('c04-div').textContent = div.fmt();

      // 极坐标信息：模相乘、辐角相加
      document.getElementById('c04-mod-prod').textContent = (z1p.r * z2p.r).toFixed(2);
      const angleSum = z1p.deg + z2p.deg;
      document.getElementById('c04-angle-sum').textContent = angleSum.toFixed(1) + '\u00B0';

      plane.clearStatic();
      plane.addStaticVector(mul, '#f472b6', '');
      plane.addStaticVector(div, '#fb923c', '');
    }

    plane.addPoint(z1, '#60a5fa', 'z\u2081', (zp) => update(zp, z2));
    plane.addPoint(z2, '#34d399', 'z\u2082', (zp) => update(z1, zp));
    // 单位圆参考
    plane.addCircle(0, 0, 1, 'rgba(148,163,184,.2)', true);
    update(z1, z2);

    document.getElementById('c04-mul-i').onclick = () => {
      const newZ1 = z1.mul(new Complex(0, 1));
      z1.a = newZ1.a; z1.b = newZ1.b;
      plane.render();
      update(z1, z2);
    };
    document.getElementById('c04-mul-ni').onclick = () => {
      const newZ1 = z1.mul(new Complex(0, -1));
      z1.a = newZ1.a; z1.b = newZ1.b;
      plane.render();
      update(z1, z2);
    };
  }
};
