/* ===========================
   canvas.js — 复平面 Canvas 引擎 (v2)
   修复：统一使用 CSS 像素坐标系
   鼠标 + 触屏双支持
   =========================== */

class ComplexPlane {
  constructor(canvasId, opts = {}) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.opts = Object.assign({
      scale: 40,
      showGrid: true,
      showTickLabels: true,
      allowDrag: true,
      bgColor: '#0f172a',
      gridColor: 'rgba(148,163,184,.12)',
      axisColor: 'rgba(148,163,184,.5)',
      labelColor: 'rgba(148,163,184,.6)',
      originLabel: 'O',
    }, opts);

    this.points = [];
    this.staticPoints = [];
    this.lines = [];
    this.circles = [];
    this.dragging = null;
    this.dragOffset = null;

    this._resize();
    this._setupEvents();

    const ro = new ResizeObserver(() => this._resize());
    ro.observe(this.canvas.parentElement);
  }

  _resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const size = Math.min(rect.width, 500);
    const dpr = window.devicePixelRatio || 1;
    this.canvas.style.width = size + 'px';
    this.canvas.style.height = size + 'px';
    this.canvas.width = Math.round(size * dpr);
    this.canvas.height = Math.round(size * dpr);
    this.dpr = dpr;
    this.size = size;
    this.cx = size / 2;
    this.cy = size / 2;
    this.scale = this.opts.scale;
    this.render();
  }

  _setupEvents() {
    const c = this.canvas;

    c.addEventListener('mousedown', e => this._onDown(e));
    window.addEventListener('mousemove', e => this._onMove(e));
    window.addEventListener('mouseup', e => this._onUp(e));

    c.addEventListener('touchstart', e => {
      e.preventDefault();
      const t = e.touches[0];
      this._onDown(t);
    }, { passive: false });
    c.addEventListener('touchmove', e => {
      e.preventDefault();
      const t = e.touches[0];
      this._onMove(t);
    }, { passive: false });
    c.addEventListener('touchend', e => {
      e.preventDefault();
      this._onUp(e);
    }, { passive: false });
  }

  /** 获取鼠标在 CSS 像素坐标系中的位置 */
  _getPos(e) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  _onDown(e) {
    if (!this.opts.allowDrag) return;
    const pos = this._getPos(e);
    const hitRadius = 20;

    for (let i = this.points.length - 1; i >= 0; i--) {
      const pt = this.points[i];
      const px = this.cx + pt.z.a * this.scale;
      const py = this.cy - pt.z.b * this.scale;
      const dx = pos.x - px;
      const dy = pos.y - py;
      if (dx * dx + dy * dy <= hitRadius * hitRadius) {
        this.dragging = pt;
        this.dragOffset = { x: dx, y: dy };
        this.canvas.style.cursor = 'grabbing';
        return;
      }
    }
  }

  _onMove(e) {
    if (!this.dragging) return;
    const pos = this._getPos(e);
    const newX = (pos.x - this.dragOffset.x - this.cx) / this.scale;
    const newY = (this.cy - pos.y + this.dragOffset.y) / this.scale;
    this.dragging.z.a = Math.round(newX * 100) / 100;
    this.dragging.z.b = Math.round(newY * 100) / 100;
    this.render();
    if (this.dragging.onChange) this.dragging.onChange(this.dragging.z);
  }

  _onUp(e) {
    if (this.dragging) {
      this.canvas.style.cursor = 'grab';
      this.dragging = null;
      this.dragOffset = null;
    }
  }

  addPoint(z, color, label, onChange) {
    const pt = { z, color, label, onChange };
    this.points.push(pt);
    this.render();
    return pt;
  }

  addStaticPoint(z, color, label) {
    this.staticPoints.push({ z, color, label, type: 'point' });
    this.render();
  }

  addStaticVector(z, color, label) {
    this.staticPoints.push({ z, color, label, type: 'vector' });
    this.render();
  }

  addLine(z1, z2, color, dashed = false) {
    this.lines.push({ z1, z2, color, dashed });
    this.render();
  }

  addCircle(cx, cy, r, color, dashed = false) {
    this.circles.push({ cx, cy, r, color, dashed });
    this.render();
  }

  clearDynamic() {
    this.points = [];
    this.render();
  }

  clearAll() {
    this.points = [];
    this.staticPoints = [];
    this.lines = [];
    this.circles = [];
    this.render();
  }

  clearStatic() {
    this.staticPoints = [];
    this.lines = [];
    this.circles = [];
    this.render();
  }

  clearStaticPoints() {
    this.staticPoints = [];
    this.render();
  }

  /* ========================
     渲染：使用 CSS 像素坐标系
     每帧先缩放 ctx 到设备像素
     ======================== */
  render() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const s = this.scale;

    // 重置变换并缩放到设备像素
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(this.dpr, this.dpr);

    // 清空（使用 CSS 像素尺寸）
    ctx.fillStyle = this.opts.bgColor;
    ctx.fillRect(0, 0, this.size, this.size);

    // 网格
    if (this.opts.showGrid) this._drawGrid(ctx, this.size, this.size, s);

    // 坐标轴
    this._drawAxes(ctx, this.size, this.size, s);

    // 圆
    for (const c of this.circles) {
      this._drawCircle(ctx, c);
    }

    // 线段
    for (const l of this.lines) {
      this._drawLine(ctx, l);
    }

    // 静态点/向量
    for (const sp of this.staticPoints) {
      if (sp.type === 'vector') {
        this._drawVector(ctx, sp, false);
      } else {
        this._drawPoint(ctx, sp, false);
      }
    }

    // 拖拽点
    for (const pt of this.points) {
      this._drawPoint(ctx, pt, true);
      this._drawVectorFromOrigin(ctx, pt);
    }

    // 恢复变换
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  // ---- 坐标变换 ----
  _toPixel(z) {
    return {
      x: this.cx + z.a * this.scale,
      y: this.cy - z.b * this.scale,
    };
  }

  // ---- 绘图 ----

  _drawGrid(ctx, w, h, s) {
    ctx.strokeStyle = this.opts.gridColor;
    ctx.lineWidth = 0.5;

    const step = s;
    for (let x = this.cx % step; x < w; x += step) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = this.cy % step; y < h; y += step) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }
  }

  _drawAxes(ctx, w, h, s) {
    const ax = this.opts.axisColor;
    const lc = this.opts.labelColor;

    // 坐标轴线
    ctx.strokeStyle = ax;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, this.cy); ctx.lineTo(w, this.cy); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(this.cx, 0); ctx.lineTo(this.cx, h); ctx.stroke();

    // 箭头
    ctx.fillStyle = ax;
    this._arrow(ctx, w - 8, this.cy, -1, 0);
    this._arrow(ctx, this.cx, 8, 0, 1);

    // 标签
    ctx.fillStyle = lc;
    ctx.font = '12px sans-serif';
    ctx.fillText('Re', w - 30, this.cy - 10);
    ctx.fillText('Im', this.cx + 10, 20);

    // 原点
    ctx.font = '12px sans-serif';
    ctx.fillText(this.opts.originLabel || 'O', this.cx + 6, this.cy + 18);

    // 刻度
    if (this.opts.showTickLabels) {
      ctx.fillStyle = lc;
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';

      const range = Math.floor(this.cx / s);
      for (let i = -range; i <= range; i++) {
        if (i === 0) continue;
        const px = this.cx + i * s;
        if (px < 0 || px > w) continue;
        ctx.fillText(i, px, this.cy + 4);
      }

      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      for (let i = -range; i <= range; i++) {
        if (i === 0) continue;
        const py = this.cy - i * s;
        if (py < 0 || py > h) continue;
        ctx.fillText(i + 'i', this.cx - 6, py);
      }
    }
  }

  _arrow(ctx, x, y, dx, dy) {
    const len = 10;
    const angle = Math.PI / 6;
    const a = Math.atan2(dy, dx);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - len * Math.cos(a - angle), y - len * Math.sin(a - angle));
    ctx.moveTo(x, y);
    ctx.lineTo(x - len * Math.cos(a + angle), y - len * Math.sin(a + angle));
    ctx.stroke();
  }

  _drawPoint(ctx, pt, isDraggable) {
    const p = this._toPixel(pt.z);
    const r = isDraggable ? 7 : 5;

    // 光环
    if (isDraggable) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, r + 6, 0, Math.PI * 2);
      ctx.fillStyle = pt.color + '20';
      ctx.fill();
    }

    // 实心圆
    ctx.beginPath();
    ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
    ctx.fillStyle = pt.color;
    ctx.fill();

    // 标签
    if (pt.label) {
      ctx.fillStyle = pt.color;
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'bottom';
      ctx.fillText(pt.label, p.x + (r + 6), p.y - 6);
    }
  }

  _drawVectorFromOrigin(ctx, pt) {
    const p = this._toPixel(pt.z);
    ctx.strokeStyle = pt.color;
    ctx.lineWidth = 2;
    ctx.setLineDash([]);
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.moveTo(this.cx, this.cy);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    ctx.globalAlpha = 1;

    // 箭头
    const angle = Math.atan2(p.y - this.cy, p.x - this.cx);
    const len = 8;
    const a = Math.PI / 6;
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x - len * Math.cos(angle - a), p.y - len * Math.sin(angle - a));
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x - len * Math.cos(angle + a), p.y - len * Math.sin(angle + a));
    ctx.stroke();
  }

  _drawVector(ctx, sp) {
    const p = this._toPixel(sp.z);
    ctx.strokeStyle = sp.color;
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.moveTo(this.cx, this.cy);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  _drawLine(ctx, l) {
    const p1 = this._toPixel(l.z1);
    const p2 = this._toPixel(l.z2);
    ctx.strokeStyle = l.color;
    ctx.lineWidth = 1.5;
    ctx.setLineDash(l.dashed ? [6, 4] : []);
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  _drawCircle(ctx, c) {
    ctx.strokeStyle = c.color;
    ctx.lineWidth = 1.5;
    ctx.setLineDash(c.dashed ? [6, 4] : []);
    ctx.beginPath();
    ctx.arc(
      this.cx + c.cx * this.scale,
      this.cy - c.cy * this.scale,
      c.r * this.scale,
      0, Math.PI * 2
    );
    ctx.stroke();
    ctx.setLineDash([]);
  }
}
