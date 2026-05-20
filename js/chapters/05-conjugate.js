/* 第 5 章：共轭与模 — 关于实轴对称 */
const chapter05 = {
  id: 'ch5',
  title: '共轭与模',
  subtitle: '关于实轴对称',
  render(container) {
    container.insertAdjacentHTML('beforeend', `
      <div class="chapter">
        <h2>第 5 章：共轭与模</h2>
        <p class="ch-subtitle">关于实轴对称</p>

        <div class="ch-text">
          <p><strong>共轭</strong>是复数最重要的概念之一。一个复数 $z = a + bi$ 的共轭记作：</p>
          <div class="formula-block">$$\\bar{z} = a - bi$$</div>

          <p><strong>几何意义：</strong>共轭相当于<strong>关于实轴（Re 轴）镜面翻转</strong>——虚部取反，实部不变。绿色点是蓝色点的镜像。</p>

          <p><strong>基本性质：</strong></p>
          <ul style="padding-left:20px;margin:12px 0;line-height:2">
            <li>$\\overline{z_1 + z_2} = \\bar{z}_1 + \\bar{z}_2$ — 共轭保持加法</li>
            <li>$\\overline{z_1 \\cdot z_2} = \\bar{z}_1 \\cdot \\bar{z}_2$ — 共轭保持乘法</li>
            <li>$z \\cdot \\bar{z} = a^2 + b^2 = |z|^2$ — 一个复数乘以自己的共轭等于模的平方</li>
          </ul>
        </div>

        <div class="ch-text">
          <p><strong>尝试以下拖拽：</strong></p>
          <ul style="padding-left:20px;margin:12px 0;line-height:2">
            <li>拖到 <span class="highlight">实轴上</span>（虚部=0）— 此时 $z = \\bar{z}$，只有实数等于自己的共轭</li>
            <li>拖到 <span class="highlight">虚轴上</span>（实部=0）— 共轭就是关于实轴对称，$\\bar{z} = -z$</li>
            <li>观察 $z \\cdot \\bar{z}$ 的值与 $|z|^2$ 总是相等</li>
          </ul>
        </div>

        <div class="canvas-wrapper">
          <canvas id="c05-canvas"></canvas>
          <div class="canvas-label">拖拽蓝点，绿色点 = z\u0304（关于实轴对称的镜像点）</div>
        </div>

        <div class="info-panel" id="c05-info">
          <div class="info-item">
            <span class="dot" style="background:#60a5fa"></span>
            <span class="label">z</span>
            <span class="value" id="c05-z">3+2i</span>
          </div>
          <div class="info-item">
            <span class="dot" style="background:#34d399"></span>
            <span class="label">z\u0304</span>
            <span class="value" id="c05-conj">3-2i</span>
          </div>
          <div class="info-item">
            <span class="dot" style="background:#f472b6"></span>
            <span class="label">|z|</span>
            <span class="value" id="c05-mod">3.61</span>
          </div>
          <div class="info-item">
            <span class="dot" style="background:#a78bfa"></span>
            <span class="label">z \u00B7 z\u0304 = |z|\u00B2</span>
            <span class="value" id="c05-sq">13</span>
          </div>
        </div>

        <div class="ch-text">
          <p><strong>数值意义：</strong></p>
          <div class="formula-block">$$z \\cdot \\bar{z} = (a+bi)(a-bi) = a^2 - abi + abi - b^2i^2 = a^2 + b^2 = |z|^2$$</div>
          <p>共轭在复数除法中也有重要应用：</p>
          <div class="formula-block">$$\\frac{z_1}{z_2} = \\frac{z_1 \\bar{z}_2}{z_2 \\bar{z}_2} = \\frac{z_1 \\bar{z}_2}{|z_2|^2}$$</div>
          <p>通过分子分母同乘分母的共轭，将分母化为实数，从而完成除法计算。</p>
        </div>
      </div>
    `);

    const z = new Complex(3, 2);
    const plane = new ComplexPlane('c05-canvas', { scale: 45 });

    plane.addPoint(z, '#60a5fa', 'z', (zp) => {
      const conj = zp.conj();
      document.getElementById('c05-z').textContent = zp.fmt();
      document.getElementById('c05-conj').textContent = conj.fmt();
      document.getElementById('c05-mod').textContent = zp.fmtMod();
      document.getElementById('c05-sq').textContent = cleanNum(parseFloat((zp.r * zp.r).toFixed(2)));

      plane.clearStatic();
      plane.addStaticPoint(conj, '#34d399', 'z\u0304');
      plane.addLine(zp, conj, 'rgba(52,211,153,.3)', true);
    });
  }
};
