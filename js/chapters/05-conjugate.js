/* 第 5 章：共轭与模 */
const chapter05 = {
  id: 'ch5',
  title: '共轭与模',
  subtitle: '关于实轴对称',
  render(container) {
    container.innerHTML = `
      <div class="chapter">
        <h2>📖 第 5 章：共轭与模</h2>
        <p class="ch-subtitle">关于实轴对称</p>

        <div class="ch-text">
          <p><strong>共轭</strong> 是复数最重要的概念之一。一个复数 $z = a + bi$ 的共轭记作：</p>
          <div class="formula-block">$$\\bar{z} = a - bi$$</div>
          <p>几何上，共轭相当于 <span class="highlight">关于实轴（Re 轴）镜面翻转</span>。</p>
          <p>有趣的性质：</p>
          <ul style="padding-left:20px;margin:12px 0;line-height:2">
            <li>$z \\cdot \\bar{z} = a^2 + b^2 = |z|^2$ — 一个复数乘以自己的共轭等于模的平方</li>
            <li>$\\overline{z_1 + z_2} = \\bar{z}_1 + \\bar{z}_2$ — 共轭对加法保持</li>
            <li>$\\overline{z_1 \\cdot z_2} = \\bar{z}_1 \\cdot \\bar{z}_2$ — 共轭对乘法保持</li>
          </ul>
        </div>

        <div class="canvas-wrapper">
          <canvas id="c05-canvas"></canvas>
          <div class="canvas-label">👆 拖拽蓝点，绿色点是它的共轭（关于实轴对称）</div>
        </div>

        <div class="info-panel" id="c05-info">
          <div class="info-item">
            <span class="dot" style="background:#60a5fa"></span>
            <span class="label">z</span>
            <span class="value" id="c05-z">3 + 2i</span>
          </div>
          <div class="info-item">
            <span class="dot" style="background:#34d399"></span>
            <span class="label">z̄</span>
            <span class="value" id="c05-conj">3 − 2i</span>
          </div>
          <div class="info-item">
            <span class="dot" style="background:#f472b6"></span>
            <span class="label">|z|</span>
            <span class="value" id="c05-mod">3.61</span>
          </div>
          <div class="info-item">
            <span class="dot" style="background:#a78bfa"></span>
            <span class="label">z · z̄ = |z|²</span>
            <span class="value" id="c05-sq">13.00</span>
          </div>
        </div>

        <div class="ch-text">
          <p>💡 试试把 z 拖到实轴上（虚部=0），此时 z = z̄。只有实数等于自己的共轭。</p>
          <p>💡 再试试把 z 拖到虚轴上（实部=0），看看纯虚数的共轭是什么。</p>
        </div>
      </div>
    `;

    const z = new Complex(3, 2);
    const plane = new ComplexPlane('c05-canvas', { scale: 45 });

    plane.addPoint(z, '#60a5fa', 'z', (zp) => {
      const conj = zp.conj();
      document.getElementById('c05-z').textContent = zp.fmt();
      document.getElementById('c05-conj').textContent = conj.fmt();
      document.getElementById('c05-mod').textContent = zp.r.toFixed(2);
      document.getElementById('c05-sq').textContent = (zp.r * zp.r).toFixed(2);

      plane.clearStatic();
      plane.addStaticPoint(conj, '#34d399', 'z̄');
      // 连线：z 和 z̄ 关于实轴对称
      plane.addLine(zp, conj, 'rgba(52,211,153,.3)', true);
    });
  }
};
