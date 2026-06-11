const SK = 'java_growth_roadmap_v3';
const THEME_SK = 'java_growth_roadmap_theme';
const TOTAL_WEEKS = 40;

// ── State ──
let done = {};
let activePhase = 0;
let open = {};
let themeMode = localStorage.getItem(THEME_SK) || 'dark';

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getResolvedTheme() {
  return themeMode === 'system' ? getSystemTheme() : themeMode;
}

function updateThemeMeta() {
  const meta = document.getElementById('metaThemeColor');
  if (!meta) return;
  const color = getComputedStyle(document.documentElement).getPropertyValue('--theme-meta').trim();
  meta.setAttribute('content', color || (getResolvedTheme() === 'dark' ? '#0a0e14' : '#f4f6f9'));
}

function themeSwitcherHtml() {
  return `<div class="theme-switcher" role="group" aria-label="主题切换">
    <button type="button" class="theme-btn${themeMode === 'dark' ? ' active' : ''}" data-theme="dark" onclick="setTheme('dark')">深色</button>
    <button type="button" class="theme-btn${themeMode === 'light' ? ' active' : ''}" data-theme="light" onclick="setTheme('light')">浅色</button>
    <button type="button" class="theme-btn${themeMode === 'system' ? ' active' : ''}" data-theme="system" onclick="setTheme('system')">系统</button>
  </div>`;
}

function setTheme(mode) {
  if (!['dark', 'light', 'system'].includes(mode)) return;
  themeMode = mode;
  document.documentElement.setAttribute('data-theme', mode);
  localStorage.setItem(THEME_SK, mode);
  updateThemeMeta();
  render();
}

function initThemeListener() {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (themeMode === 'system') updateThemeMeta();
  });
}

function load() {
  try {
    const raw = localStorage.getItem(SK);
    if (raw) {
      const d = JSON.parse(raw);
      if (d.done) done = d.done;
      if (typeof d.p === 'number') activePhase = d.p;
      if (d.open) open = d.open;
    }
  } catch {}
  if (!Object.keys(open).length && PHASES[activePhase]) {
    open[PHASES[activePhase].sections[0].id] = true;
  }
}

function saveState() {
  localStorage.setItem(SK, JSON.stringify({ done, p: activePhase, open }));
}

function allTasks() {
  return PHASES.flatMap(p => p.sections.flatMap(s => s.tasks));
}

function requiredTasks(tasks) {
  return tasks.filter(t => !t.optional);
}

function prog(tasks) {
  const n = tasks.filter(t => done[t.id]).length;
  return { n, total: tasks.length, pct: tasks.length ? Math.round(n / tasks.length * 100) : 0 };
}

function formatSectionCount(sec) {
  const all = sec.tasks;
  const req = requiredTasks(all);
  const sp = prog(req);
  const spAll = prog(all);
  if (req.length < all.length) {
    return `${sp.n}/${sp.total} 必做 · 共 ${spAll.n}/${spAll.total}`;
  }
  return `${sp.n}/${sp.total} 必做`;
}

function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => el.classList.remove('show'), 2200);
}

function toggleSection(sid) {
  open[sid] = !open[sid];
  saveState();
  render();
}

function goPhase(i) {
  activePhase = i;
  const first = PHASES[i].sections[0].id;
  open = { [first]: true };
  saveState();
  render();
}

function resetProgress() {
  if (!confirm('确定要清空所有进度吗？此操作不可撤销。')) return;
  done = {};
  open = { [PHASES[activePhase].sections[0].id]: true };
  localStorage.removeItem(SK);
  saveState();
  render();
  showToast('进度已重置');
}

function esc(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

function render() {
  const app = document.getElementById('app');
  const tasks = allTasks();
  const req = requiredTasks(tasks);
  const total = prog(tasks);
  const reqTotal = prog(req);
  const ph = PHASES[activePhase];
  const phTasks = ph.sections.flatMap(s => s.tasks);
  const phReq = requiredTasks(phTasks);
  const phProg = prog(phReq);
  const phAllProg = prog(phTasks);

  let html = '';

  // Header
  html += `<div class="header">
    <div class="header-top">
      <div class="header-main">
        <h1>Java 成长路线图</h1>
        <p class="subtitle">9–10 个月 · ${TOTAL_WEEKS} 周 · 5 阶段 · 必做 ${reqTotal.total} 项 / 共 ${tasks.length} 项 · 1年+经验定制版</p>
        <span class="badge">技术栈：JDK 17 + Spring Boot 3 + Spring Cloud Alibaba</span>
      </div>
      <div class="header-actions">
        ${themeSwitcherHtml()}
        <div class="overall-progress">
          <div>
            <div class="overall-label">必做 ${reqTotal.n} / ${reqTotal.total}</div>
            <div class="required-label">全部 ${total.n} / ${total.total}</div>
          </div>
          <div class="overall-pct" style="color:${reqTotal.pct===100?'var(--success)':'var(--accent)'}">${reqTotal.pct}%</div>
        </div>
      </div>
    </div>
    <div class="progress-track">
      <div class="progress-fill" style="width:${reqTotal.pct}%"></div>
    </div>
    <div class="legend">
      <span class="legend-item"><span class="task-tag required">必做</span> 面试/项目核心</span>
      <span class="legend-item"><span class="task-tag optional">选做</span> 时间紧可跳过</span>
      <span class="legend-item"><span class="task-tag practice">实践</span> 需写代码</span>
      <span class="legend-item"><span class="task-tag parallel">并行</span> 全程持续</span>
    </div>
  </div>`;

  // Phase tabs
  html += '<div class="phase-tabs">';
  PHASES.forEach((p, i) => {
    const pp = prog(requiredTasks(p.sections.flatMap(s => s.tasks)));
    const active = i === activePhase;
    html += `<button class="phase-tab${active?' active':''}" style="--tab-color:${p.color}" onclick="goPhase(${i})">
      <span>P${p.n}</span>
      <div class="mini-track"><div class="mini-fill" style="width:${pp.pct}%;background:${p.color}"></div></div>
    </button>`;
  });
  html += '</div>';

  // Phase card
  html += `<div class="phase-card" style="--phase-color:${ph.color}">
    <div class="phase-card-header">
      <div>
        <span class="phase-tag" style="background:${ph.color}18;color:${ph.color};border:1px solid ${ph.color}44">Phase ${ph.n}</span>
        <div class="phase-sub">${esc(ph.sub)}</div>
        <div class="phase-title">${esc(ph.title)}</div>
        ${ph.note ? `<div class="phase-sub" style="margin-top:6px;font-style:italic">${esc(ph.note)}</div>` : ''}
      </div>
      <div style="text-align:right">
        <div class="phase-pct" style="color:${ph.color}">${phProg.pct}%</div>
        <div class="phase-sub">必做 ${phProg.n} / ${phProg.total}</div>
        <div class="required-label">全部 ${phAllProg.n}/${phAllProg.total}</div>
      </div>
    </div>
    <div class="progress-track phase-progress-track">
      <div class="progress-fill" style="width:${phProg.pct}%;--phase-color:${ph.color}"></div>
    </div>
  </div>`;

  // Sections
  html += '<div class="sections" style="--phase-color:' + ph.color + '">';
  ph.sections.forEach(sec => {
    const sp = prog(requiredTasks(sec.tasks));
    const isOpen = !!open[sec.id];
    const allDone = sp.pct === 100;

    html += `<div class="section${isOpen?' open':''}${allDone?' done':''}" id="sec-${sec.id}">
      <button class="section-header" onclick="toggleSection('${sec.id}')">
        <span class="section-chevron">›</span>
        <div class="section-info">
          <div class="section-meta">
            <span class="section-week" style="color:${ph.color}">${esc(sec.week)}</span>
            <span class="section-title">${esc(sec.title)}</span>
          </div>
        </div>
        <span class="section-count${allDone?' all-done':''}">${formatSectionCount(sec)}${allDone?' ✓':''}</span>
      </button>
      <div class="section-body">`;

    if (sec.resources && sec.resources.length) {
      html += '<div class="resources"><div class="resources-label">推荐学习资源</div><div class="resource-list">';
      sec.resources.forEach(r => {
        if (r.url) {
          html += `<a class="resource-link" href="${esc(r.url)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">
            <span class="rtype">${esc(r.type)}</span>${esc(r.label)}</a>`;
        } else {
          html += `<span class="resource-link no-url"><span class="rtype">${esc(r.type)}</span>${esc(r.label)}</span>`;
        }
      });
      html += '</div></div>';
    }

    sec.tasks.forEach(task => {
      const isDone = !!done[task.id];
      let prefix = task.optional
        ? '<span class="task-tag optional">选做</span>'
        : '<span class="task-tag required">必做</span>';
      if (task.practice) prefix += '<span class="task-tag practice">实践</span>';
      if (task.parallel) prefix += '<span class="task-tag parallel">并行</span>';

      html += `<div class="task${isDone?' done':''}${task.optional?' optional-task':''}" onclick="toggleTask('${task.id}','${sec.id}')">
        <div class="checkbox">
          <svg viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <span class="task-text">${prefix}${esc(task.t)}</span>
      </div>`;
    });

    html += '</div></div>';
  });
  html += '</div>';

  // Footer
  html += `<div class="footer-actions">
    <button class="btn" onclick="expandAll()">展开全部</button>
    <button class="btn" onclick="collapseAll()">收起全部</button>
    <button class="btn btn-danger" onclick="resetProgress()">重置进度</button>
  </div>`;

  app.innerHTML = html;
}

function toggleTask(id, sectionId) {
  const phTasks = PHASES[activePhase].sections.flatMap(s => s.tasks);
  const wasDone = !!done[id];
  done[id] = !wasDone;
  saveState();
  render();

  if (!wasDone) {
    const sec = PHASES[activePhase].sections.find(s => s.id === sectionId);
    if (sec && prog(requiredTasks(sec.tasks)).pct === 100) showToast('章节「' + sec.title + '」必做项已全部完成！');
    if (prog(requiredTasks(phTasks)).pct === 100) showToast('阶段「' + PHASES[activePhase].title + '」必做项已全部完成！');
    if (prog(requiredTasks(allTasks())).pct === 100) showToast('恭喜！全部必做任务完成，可以投递简历了！');
  }
}

function expandAll() {
  PHASES[activePhase].sections.forEach(s => { open[s.id] = true; });
  saveState();
  render();
}

function collapseAll() {
  open = {};
  saveState();
  render();
}

window.goPhase = goPhase;
window.toggleSection = toggleSection;
window.toggleTask = toggleTask;
window.resetProgress = resetProgress;
window.expandAll = expandAll;
window.collapseAll = collapseAll;
window.setTheme = setTheme;

load();
initThemeListener();
updateThemeMeta();
render();
