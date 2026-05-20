/* 第 3 章：复数的加减法 */
const chapter03 = {
  id: 'ch3',
  title: '复数的加减法',
  subtitle: '向量的平移',
  render(container) {
    container.insertAdjacentHTML('beforeend', `
      <div class="chapter">
        <h2>📖 第 3 章：复数的加减法</h2>
        <p class="ch-subtitle">向量的平移</p>

        <div class="ch-text">
          <p>复数的加减法在几何上就是 <strong>向量的加减</strong>：</p>
          <div class="formula-block">
            $$z_1 + z_2 = (a_1 + a_2) + (b_1 + b_2)i$$
          </div>
          <p><span class="highlight">加法</span> = 向量平移（平行四边形法则）</p>
          <p><span class="highlight2">减法</span> = 反向平移</p>
          <p>拖拽下方两个蓝点，观察和与差的变化：</p>
        </div>

        <div class="canvas-wrapper">
          <canvas id="c03-canvas"></canvas>
          <div class="canvas-label">👆 拖拽蓝色点，观察粉色 (和) 与橙色 (差)</div>
        </div>

        <div class="info-panel" id="c03-info">
          <div class="info-item">
            <span class="dot" style="background:#60a5fa"></span>
            <span class="label">z₁</span>
            <span class="value" id="c03-z1">3 + 2i</span>
          </div>
          <div class="info-item">
            <span class="dot" style="background:#34d399"></span>
            <span class="label">z₂</span>
            <span class="value" id="c03-z2">1 + 3i</span>
          </div>
          <div class="info-item">
            <span class="dot" style="background:#f472b6"></span>
            <span class="label">z₁ + z₂</span>
            <span class="value" id="c03-add">4 + 5i</span>
          </div>
          <div class="info-item">
            <span class="dot" style="background:#fb923c"></span>
            <span class="label">z₁ − z₂</span>
            <span class="value" id="c03-sub">2 − 1i</span>
          </div>
        </div>

        <div class="ch-text">
          <p>💡 试试把 z₂ 的实部和虚部取反：z₁ − z₂ 其实就是 z₁ + (−z₂)。</p>
        </div>
      </div>
    `);

    const z1 = new Complex(3, 2);
    const z2 = new Complex(1, 3);
    const plane = new ComplexPlane('c03-canvas', { scale: 40 });

    function update(z1p, z2p) {
      const add = z1p.add(z2p);
      const sub = z1p.sub(z2p);
      document.getElementById('c03-z1').textContent = z1p.fmt();
      document.getElementById('c03-z2').textContent = z2p.fmt();
      document.getElementById('c03-add').textContent = add.fmt();
      document.getElementById('c03-sub').textContent = sub.fmt();

      // 清除旧的静态元素
      plane.clearStatic();
      // 画结果
      plane.addStaticVector(add, '#f472b6');
      plane.addStaticVector(sub, '#fb923c');
      // 画平行四边形辅助线
      plane.addLine(z1p, z1p.add(z2p), 'rgba(96,165,250,.2)', true);
      plane.addLine(z2p, z1p.add(z2p), 'rgba(52,211,153,.2)', true);
    }

    plane.addPoint(z1, '#60a5fa', 'z₁', (zp) => {
      update(zp, z2);
    });
    plane.addPoint(z2, '#34d399', 'z₂', (zp) => {
      update(z1, zp);
    });

    update(z1, z2);
  }
};
