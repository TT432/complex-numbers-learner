/* 第 4 章：复数的乘除法 */
const chapter04 = {
  id: 'ch4',
  title: '复数的乘除法',
  subtitle: '旋转 + 缩放',
  render(container) {
    container.insertAdjacentHTML('beforeend', `
      <div class="chapter">
        <h2>📖 第 4 章：复数的乘除法</h2>
        <p class="ch-subtitle">旋转 + 缩放</p>

        <div class="ch-text">
          <p>复数的乘除法在几何上非常优雅——它同时包含 <strong>旋转</strong> 和 <strong>缩放</strong>：</p>
          <div class="formula-block">$$z_1 \\times z_2 = r_1 r_2 [\\cos(\\theta_1+\\theta_2) + i\\sin(\\theta_1+\\theta_2)]$$</div>
          <p>用文字说就是：</p>
          <ul style="padding-left:20px;margin:12px 0;line-height:2">
            <li><span class="highlight">模</span>：相乘 ⇒ $|z_1 z_2| = |z_1| \\cdot |z_2|$</li>
            <li><span class="highlight2">辐角</span>：相加 ⇒ $\\arg(z_1 z_2) = \\arg(z_1) + \\arg(z_2)$</li>
          </ul>
          <p>也就是说，乘以一个复数相当于先缩放到它的模，再旋转它的辐角。</p>
          <p>特别地，乘以 <span class="highlight">i</span> 就是逆时针旋转 <strong>90°</strong>！</p>
        </div>

        <div class="canvas-wrapper">
          <canvas id="c04-canvas"></canvas>
          <div class="canvas-label">👆 拖拽蓝色点，粉色=乘积，橙色=商</div>
        </div>

        <div class="info-panel" id="c04-info">
          <div class="info-item">
            <span class="dot" style="background:#60a5fa"></span>
            <span class="label">z₁</span>
            <span class="value" id="c04-z1">2 + 2i</span>
          </div>
          <div class="info-item">
            <span class="dot" style="background:#34d399"></span>
            <span class="label">z₂</span>
            <span class="value" id="c04-z2">1 + 2i</span>
          </div>
          <div class="info-item">
            <span class="dot" style="background:#f472b6"></span>
            <span class="label">z₁ × z₂</span>
            <span class="value" id="c04-mul">−2 + 6i</span>
          </div>
          <div class="info-item">
            <span class="dot" style="background:#fb923c"></span>
            <span class="label">z₁ ÷ z₂</span>
            <span class="value" id="c04-div">1.20 − 0.40i</span>
          </div>
        </div>

        <div class="control-group">
          <label>
            乘以 i：
            <button class="animate-btn" id="c04-mul-i">z₁ × i</button>
          </label>
          <label>
            乘以 −i：
            <button class="animate-btn" id="c04-mul-ni">z₁ × (−i)</button>
          </label>
        </div>

        <div class="ch-text">
          <p>💡 试着把 z₂ 拖到实轴上（虚部=0），看看乘法退化成普通的缩放。</p>
          <p>💡 再把 z₂ 拖到单位圆上（模=1），看看乘法退化成纯旋转。</p>
        </div>
      </div>
    `;

    const z1 = new Complex(2, 2);
    const z2 = new Complex(1, 2);
    const plane = new ComplexPlane('c04-canvas', { scale: 40 });

    function update(z1p, z2p) {
      const mul = z1p.mul(z2p);
      const div = z1p.div(z2p);
      document.getElementById('c04-z1').textContent = z1p.fmt();
      document.getElementById('c04-z2').textContent = z2p.fmt();
      document.getElementById('c04-mul').textContent = mul.fmt();
      document.getElementById('c04-div').textContent = div.fmt();

      plane.clearStatic();
      plane.addStaticVector(mul, '#f472b6', '');
      plane.addStaticVector(div, '#fb923c', '');
    }

    plane.addPoint(z1, '#60a5fa', 'z₁', (zp) => update(zp, z2));
    plane.addPoint(z2, '#34d399', 'z₂', (zp) => update(z1, zp));
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
