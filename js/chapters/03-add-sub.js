/* 第 3 章：复数的加减法 */
const chapter03 = {
  id: 'ch3',
  title: '复数的加减法',
  subtitle: '向量的平移',
  render(container) {
    container.insertAdjacentHTML('beforeend', `
      <div class="chapter">
        <h2>第 3 章：复数的加减法</h2>
        <p class="ch-subtitle">向量的平移</p>

        <div class="ch-text">
          <p>复数加减等价于 $\\mathbb{R}^2$ 向量加减：实部和虚部分别独立运算。</p>
          <div class="formula-block">$$(a_1+b_1i) \\pm (a_2+b_2i) = (a_1 \\pm a_2) + (b_1 \\pm b_2)i$$</div>

          <p><strong>几何意义：</strong>每个复数看作从原点出发的向量。加法遵循<strong>平行四边形法则</strong>——$z_1 + z_2$ 即 $z_1$ 与 $z_2$ 的向量和。减法 $z_1 - z_2 = z_1 + (-z_2)$，其中 $-z_2$ 是关于原点对称的向量。</p>

          <p>$|z_1 - z_2|$ 的几何意义是复平面上两点 $z_1$ 与 $z_2$ 之间的<strong>欧氏距离</strong>（Euclidean distance）。</p>
        </div>

        <div class="canvas-wrapper">
          <canvas id="c03-canvas"></canvas>
          <div class="canvas-label">拖拽蓝点：粉色 = 和，橙色 = 差；虚线为平行四边形辅助线</div>
        </div>

        <div class="info-panel" id="c03-info">
          <div class="info-item">
            <span class="dot" style="background:#60a5fa"></span>
            <span class="label">z\u2081</span>
            <span class="value" id="c03-z1">3+2i</span>
          </div>
          <div class="info-item">
            <span class="dot" style="background:#34d399"></span>
            <span class="label">z\u2082</span>
            <span class="value" id="c03-z2">1+3i</span>
          </div>
          <div class="info-item">
            <span class="dot" style="background:#f472b6"></span>
            <span class="label">z\u2081 + z\u2082</span>
            <span class="value" id="c03-add">4+5i</span>
          </div>
          <div class="info-item">
            <span class="dot" style="background:#fb923c"></span>
            <span class="label">z\u2081 \u2212 z\u2082</span>
            <span class="value" id="c03-sub">2-i</span>
          </div>
        </div>

        <div class="ch-text">
          <p>尝试交互：拖 $z_2$ 到 $z_1$ 位置时 $z_1+z_2=2z_1,\;z_1-z_2=0$；拖 $z_2$ 到原点时两者都等于 $z_1$。</p>
        </div>
      </div>
    `);

    const z1 = new Complex(3, 2);
    const z2 = new Complex(1, 3);
    const plane = new ComplexPlane('c03-canvas', { scale: 45 });

    function update(z1p, z2p) {
      const add = z1p.add(z2p);
      const sub = z1p.sub(z2p);
      document.getElementById('c03-z1').textContent = z1p.fmt();
      document.getElementById('c03-z2').textContent = z2p.fmt();
      document.getElementById('c03-add').textContent = add.fmt();
      document.getElementById('c03-sub').textContent = sub.fmt();

      plane.clearStatic();
      plane.addStaticVector(add, '#f472b6');
      plane.addStaticVector(sub, '#fb923c');
      plane.addLine(z1p, z1p.add(z2p), 'rgba(96,165,250,.2)', true);
      plane.addLine(z2p, z1p.add(z2p), 'rgba(52,211,153,.2)', true);
    }

    plane.addPoint(z1, '#60a5fa', 'z\u2081', (zp) => update(zp, z2));
    plane.addPoint(z2, '#34d399', 'z\u2082', (zp) => update(z1, zp));
    update(z1, z2);
  }
};
