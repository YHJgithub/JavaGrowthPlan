const SK = 'java_growth_roadmap_v3';
const THEME_SK = 'java_growth_roadmap_theme';
const VICTORY_SK = 'java_growth_roadmap_victory_v1';
const TOTAL_WEEKS = 40;

let done = {};
let activePhase = 0;
let open = {};
let themeMode = localStorage.getItem(THEME_SK) || 'dark';
let eventsBound = false;
let overlayKeyHandler = null;
let sheetKeyHandler = null;
let victoryKeyHandler = null;
let sectionCompleteKeyHandler = null;
let sectionCompleteOnClose = null;
let victoryAutoShowTimer = null;
let alertCloseTimer = null;
let sheetCloseTimer = null;
let alertGeneration = 0;
let sheetGeneration = 0;
let modalActionPending = false;

function cancelVictoryAutoShow() {
  if (victoryAutoShowTimer) {
    clearTimeout(victoryAutoShowTimer);
    victoryAutoShowTimer = null;
  }
}

function forceDismissSectionComplete() {
  const overlay = document.getElementById('sectionCompleteOverlay');
  if (!overlay || overlay.hidden) return;

  overlay.classList.remove('show');
  VictoryConfetti.stop();
  SectionMusic.stop();
  if (sectionCompleteKeyHandler) {
    document.removeEventListener('keydown', sectionCompleteKeyHandler);
    sectionCompleteKeyHandler = null;
  }
  sectionCompleteOnClose = null;
  overlay.hidden = true;
  if (!document.getElementById('victoryOverlay')?.classList.contains('show')) {
    document.body.style.overflow = '';
  }
}

function forceDismissVictory() {
  const overlay = document.getElementById('victoryOverlay');
  if (!overlay || overlay.hidden) return;

  overlay.classList.remove('show');
  VictoryConfetti.stop();
  VictoryMusic.stop();
  document.body.style.overflow = '';
  if (victoryKeyHandler) {
    document.removeEventListener('keydown', victoryKeyHandler);
    victoryKeyHandler = null;
  }
  overlay.hidden = true;
}

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

function haptic(type) {
  if (!navigator.vibrate) return;
  const patterns = {
    light: 8,
    success: [10, 40, 10],
    warning: [12, 60, 12],
    victory: [30, 40, 30, 40, 50, 80, 40, 30, 40, 30, 60],
  };
  navigator.vibrate(patterns[type] || 8);
}

function isAllRequiredDone() {
  return prog(requiredTasks(allTasks())).pct === 100;
}

function markVictorySeen() {
  localStorage.setItem(VICTORY_SK, '1');
}

function clearVictorySeen() {
  localStorage.removeItem(VICTORY_SK);
}

function shouldShowVictory() {
  return isAllRequiredDone() && !localStorage.getItem(VICTORY_SK);
}

function closeVictoryScreen() {
  const overlay = document.getElementById('victoryOverlay');
  if (!overlay || overlay.hidden) return;

  overlay.classList.remove('show');
  VictoryConfetti.stop();
  VictoryMusic.stop();
  document.body.style.overflow = '';
  if (victoryKeyHandler) {
    document.removeEventListener('keydown', victoryKeyHandler);
    victoryKeyHandler = null;
  }

  setTimeout(() => {
    overlay.hidden = true;
  }, 320);
}

function closeSectionCompleteScreen() {
  const overlay = document.getElementById('sectionCompleteOverlay');
  if (!overlay || overlay.hidden) return;

  overlay.classList.remove('show');
  VictoryConfetti.stop();
  SectionMusic.stop();
  if (sectionCompleteKeyHandler) {
    document.removeEventListener('keydown', sectionCompleteKeyHandler);
    sectionCompleteKeyHandler = null;
  }

  const onClose = sectionCompleteOnClose;
  sectionCompleteOnClose = null;

  setTimeout(() => {
    overlay.hidden = true;
    if (!document.getElementById('victoryOverlay')?.classList.contains('show')) {
      document.body.style.overflow = '';
    }
    if (onClose) onClose();
  }, 280);
}

function showSectionCompleteScreen(sec, options = {}) {
  forceDismissSectionComplete();

  const overlay = document.getElementById('sectionCompleteOverlay');
  const weekEl = document.getElementById('sectionCompleteWeek');
  const subtitleEl = document.getElementById('sectionCompleteSubtitle');
  const messageEl = document.getElementById('sectionCompleteMessage');
  const closeBtn = document.getElementById('sectionCompleteClose');
  const canvas = document.getElementById('sectionCompleteConfetti');
  if (!overlay || !weekEl || !subtitleEl || !messageEl || !closeBtn) return;

  const ph = PHASES[activePhase];
  overlay.style.setProperty('--phase-color', ph.color);
  weekEl.textContent = sec.week;
  subtitleEl.textContent = sec.title;
  messageEl.textContent = '本小节全部任务已完成，继续加油！';
  sectionCompleteOnClose = options.onClose || null;

  overlay.hidden = false;
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => {
    overlay.classList.add('show');
    if (canvas) VictoryConfetti.start(canvas, { intensity: 'light' });
  });

  haptic('success');
  SectionMusic.play();

  closeBtn.onclick = () => {
    haptic('light');
    closeSectionCompleteScreen();
  };

  sectionCompleteKeyHandler = (e) => {
    if (e.key === 'Escape') closeSectionCompleteScreen();
  };
  document.addEventListener('keydown', sectionCompleteKeyHandler);

  setTimeout(() => closeBtn.focus(), 350);
}

function showVictoryScreen(options = {}) {
  const { music = true, musicDelay = 0 } = options;
  forceDismissSectionComplete();
  const overlay = document.getElementById('victoryOverlay');
  const messageEl = document.getElementById('victoryMessage');
  const statsEl = document.getElementById('victoryStats');
  const closeBtn = document.getElementById('victoryClose');
  const canvas = document.getElementById('victoryConfetti');
  if (!overlay || !messageEl || !statsEl) return;

  const { reqTotal, total } = getProgressSnapshot();
  messageEl.textContent = `${TOTAL_WEEKS} 周成长路线圆满收官，可以投递简历了！`;
  statsEl.innerHTML = `
    <div class="victory-stat">
      <span class="victory-stat-value">${reqTotal.total}</span>
      <span class="victory-stat-label">必做完成</span>
    </div>
    <div class="victory-stat">
      <span class="victory-stat-value">${PHASES.length}</span>
      <span class="victory-stat-label">阶段通关</span>
    </div>
    <div class="victory-stat">
      <span class="victory-stat-value">${total.total}</span>
      <span class="victory-stat-label">全部完成</span>
    </div>`;

  overlay.hidden = false;
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => {
    overlay.classList.add('show');
    if (canvas) VictoryConfetti.start(canvas);
  });

  haptic('victory');
  if (music) VictoryMusic.play(musicDelay);
  markVictorySeen();

  closeBtn.onclick = () => {
    haptic('light');
    closeVictoryScreen();
  };

  victoryKeyHandler = (e) => {
    if (e.key === 'Escape') closeVictoryScreen();
  };
  document.addEventListener('keydown', victoryKeyHandler);

  setTimeout(() => closeBtn.focus(), 400);
}

function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => el.classList.remove('show'), 2400);
}

function showAlert({ title, message, actions }) {
  return new Promise((resolve) => {
    cancelVictoryAutoShow();
    forceDismissVictory();
    forceDismissSectionComplete();
    clearTimeout(alertCloseTimer);
    alertCloseTimer = null;

    const gen = ++alertGeneration;
    const overlay = document.getElementById('iosOverlay');
    const titleEl = document.getElementById('iosAlertTitle');
    const messageEl = document.getElementById('iosAlertMessage');
    const actionsEl = document.getElementById('iosAlertActions');

    titleEl.textContent = title;
    messageEl.textContent = message || '';
    messageEl.hidden = !message;
    actionsEl.innerHTML = '';

    actions.forEach((action) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'ios-alert-btn'
        + (action.destructive ? ' destructive' : '')
        + (action.cancel ? ' cancel' : '');
      btn.textContent = action.label;
      btn.addEventListener('click', () => {
        VictoryMusic.prepareSync();
        closeAlert(action.value);
      });
      actionsEl.appendChild(btn);
    });

    overlay.hidden = false;
    overlay.classList.add('is-active');
    requestAnimationFrame(() => {
      if (gen !== alertGeneration) return;
      overlay.classList.add('show');
    });

    const focusBtn = actionsEl.querySelector('.cancel') || actionsEl.querySelector('button');
    if (focusBtn) focusBtn.focus();

    overlayKeyHandler = (e) => {
      if (e.key === 'Escape') {
        const cancel = actions.find(a => a.cancel);
        closeAlert(cancel ? cancel.value : undefined);
      }
    };
    document.addEventListener('keydown', overlayKeyHandler);

    overlay.onclick = (e) => {
      if (e.target === overlay) {
        const cancel = actions.find(a => a.cancel);
        closeAlert(cancel ? cancel.value : undefined);
      }
    };

    function closeAlert(value) {
      if (gen !== alertGeneration) return;
      overlay.classList.remove('show', 'is-active');
      document.removeEventListener('keydown', overlayKeyHandler);
      overlay.onclick = null;
      clearTimeout(alertCloseTimer);
      alertCloseTimer = setTimeout(() => {
        if (gen !== alertGeneration) return;
        overlay.hidden = true;
        resolve(value);
      }, 220);
    }
  });
}

function showActionSheet(items) {
  return new Promise((resolve) => {
    cancelVictoryAutoShow();
    forceDismissVictory();
    clearTimeout(sheetCloseTimer);
    sheetCloseTimer = null;

    const gen = ++sheetGeneration;
    const overlay = document.getElementById('iosSheetOverlay');
    const actionsEl = document.getElementById('iosSheetActions');
    const cancelBtn = document.getElementById('iosSheetCancel');

    actionsEl.innerHTML = '';
    items.forEach((item) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'ios-sheet-btn' + (item.destructive ? ' destructive' : '');
      btn.textContent = item.label;
      btn.addEventListener('click', () => closeSheet(item.value));
      actionsEl.appendChild(btn);
    });

    overlay.hidden = false;
    overlay.classList.add('is-active');
    requestAnimationFrame(() => {
      if (gen !== sheetGeneration) return;
      overlay.classList.add('show');
    });

    cancelBtn.onclick = () => closeSheet(null);
    overlay.onclick = (e) => {
      if (e.target === overlay) closeSheet(null);
    };

    sheetKeyHandler = (e) => {
      if (e.key === 'Escape') closeSheet(null);
    };
    document.addEventListener('keydown', sheetKeyHandler);

    function closeSheet(value) {
      if (gen !== sheetGeneration) return;
      overlay.classList.remove('show', 'is-active');
      document.removeEventListener('keydown', sheetKeyHandler);
      overlay.onclick = null;
      cancelBtn.onclick = null;
      clearTimeout(sheetCloseTimer);
      sheetCloseTimer = setTimeout(() => {
        if (gen !== sheetGeneration) return;
        overlay.hidden = true;
        resolve(value);
      }, 280);
    }
  });
}

function themeSwitcherHtml() {
  return `<div class="theme-switcher" role="group" aria-label="主题切换">
    <button type="button" class="theme-btn${themeMode === 'dark' ? ' active' : ''}" data-action="theme" data-theme="dark">深色</button>
    <button type="button" class="theme-btn${themeMode === 'light' ? ' active' : ''}" data-action="theme" data-theme="light">浅色</button>
    <button type="button" class="theme-btn${themeMode === 'system' ? ' active' : ''}" data-action="theme" data-theme="system">系统</button>
  </div>`;
}

function setTheme(mode) {
  if (!['dark', 'light', 'system'].includes(mode)) return;
  themeMode = mode;
  document.documentElement.setAttribute('data-theme', mode);
  localStorage.setItem(THEME_SK, mode);
  updateThemeMeta();
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === mode);
  });
  haptic('light');
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

function esc(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

function getProgressSnapshot() {
  const tasks = allTasks();
  const req = requiredTasks(tasks);
  const total = prog(tasks);
  const reqTotal = prog(req);
  const ph = PHASES[activePhase];
  const phTasks = ph.sections.flatMap(s => s.tasks);
  const phReq = requiredTasks(phTasks);
  const phProg = prog(phReq);
  const phAllProg = prog(phTasks);
  const tabProgress = PHASES.map(p => prog(requiredTasks(p.sections.flatMap(s => s.tasks))));
  return { tasks, req, total, reqTotal, ph, phTasks, phProg, phAllProg, tabProgress };
}

function taskTagsHtml(task) {
  let prefix = task.optional
    ? '<span class="task-tag optional">选做</span>'
    : '<span class="task-tag required">必做</span>';
  if (task.practice) prefix += '<span class="task-tag practice">实践</span>';
  if (task.parallel) prefix += '<span class="task-tag parallel">并行</span>';
  return prefix;
}

function sectionsHtml(ph) {
  let html = `<div class="sections" style="--phase-color:${ph.color}">`;
  ph.sections.forEach((sec, idx) => {
    const sp = prog(requiredTasks(sec.tasks));
    const isOpen = !!open[sec.id];
    const allDone = sp.pct === 100;
    const isLast = idx === ph.sections.length - 1;

    html += `<div class="section${isOpen ? ' open' : ''}${allDone ? ' done' : ''}${isLast ? ' last' : ''}" id="sec-${sec.id}" data-section-id="${sec.id}">
      <button type="button" class="section-header" data-action="section" data-section="${sec.id}"
        aria-expanded="${isOpen}" aria-controls="body-${sec.id}">
        <div class="section-info">
          <div class="section-meta">
            <span class="section-week" style="color:${ph.color}">${esc(sec.week)}</span>
            <span class="section-title">${esc(sec.title)}</span>
          </div>
        </div>
        <span class="section-count${allDone ? ' all-done' : ''}">${formatSectionCount(sec)}${allDone ? ' ✓' : ''}</span>
        <span class="section-chevron" aria-hidden="true">›</span>
      </button>
      <div class="section-body-wrap">
        <div class="section-body" id="body-${sec.id}">`;

    if (sec.resources && sec.resources.length) {
      html += '<div class="resources"><div class="resources-label">推荐学习资源</div><div class="resource-list">';
      sec.resources.forEach(r => {
        if (r.url) {
          html += `<a class="resource-link" href="${esc(r.url)}" target="_blank" rel="noopener">
            <span class="rtype">${esc(r.type)}</span>${esc(r.label)}</a>`;
        } else {
          html += `<span class="resource-link no-url"><span class="rtype">${esc(r.type)}</span>${esc(r.label)}</span>`;
        }
      });
      html += '</div></div>';
    }

    sec.tasks.forEach(task => {
      const isDone = !!done[task.id];
      html += `<button type="button" class="task${isDone ? ' done' : ''}${task.optional ? ' optional-task' : ''}"
        role="checkbox" aria-checked="${isDone}" data-action="task" data-task="${task.id}" data-section="${sec.id}">
        <span class="checkbox" aria-hidden="true">
          <svg viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
        <span class="task-text">${taskTagsHtml(task)}${esc(task.t)}</span>
      </button>`;
    });

    html += '</div></div></div>';
  });
  html += '</div>';
  return html;
}

function phaseContentHtml() {
  const { ph, phProg, phAllProg } = getProgressSnapshot();

  let html = `<div class="phase-content" style="--phase-color:${ph.color}">`;
  html += `<div class="phase-card">
    <div class="phase-card-header">
      <div>
        <span class="phase-tag" style="background:${ph.color}18;color:${ph.color};border:1px solid ${ph.color}44">Phase ${ph.n}</span>
        <div class="phase-sub">${esc(ph.sub)}</div>
        <div class="phase-title">${esc(ph.title)}</div>
        ${ph.note ? `<div class="phase-sub phase-note">${esc(ph.note)}</div>` : ''}
      </div>
      <div class="phase-stats">
        <div class="phase-pct" style="color:${ph.color}">${phProg.pct}%</div>
        <div class="phase-sub">必做 <span class="phase-req-count">${phProg.n} / ${phProg.total}</span></div>
        <div class="required-label">全部 <span class="phase-all-count">${phAllProg.n}/${phAllProg.total}</span></div>
      </div>
    </div>
    <div class="progress-track phase-progress-track">
      <div class="progress-fill phase-progress-fill" style="width:${phProg.pct}%"></div>
    </div>
  </div>`;

  html += sectionsHtml(ph);

  html += `<div class="footer-actions footer-desktop">
    <button type="button" class="btn" data-action="expand-all">展开全部</button>
    <button type="button" class="btn" data-action="collapse-all">收起全部</button>
    <button type="button" class="btn" data-action="complete-all">圆满收官</button>
    <button type="button" class="btn btn-danger" data-action="reset">重置进度</button>
  </div>
  <div class="footer-actions footer-mobile">
    <button type="button" class="btn btn-more" data-action="more-actions">更多操作</button>
  </div>`;

  html += '</div>';
  return html;
}

function headerHtml() {
  const { tasks, reqTotal, total } = getProgressSnapshot();

  return `<div class="sticky-nav" id="stickyNav" aria-hidden="true">
    <div class="sticky-nav-inner">
      <span class="sticky-title">Java 成长路线图</span>
      <span class="sticky-pct">${reqTotal.pct}%</span>
    </div>
    <div class="progress-track sticky-progress">
      <div class="progress-fill header-progress-fill" style="width:${reqTotal.pct}%"></div>
    </div>
  </div>
  <div class="header">
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
            <div class="overall-label">必做 <span class="overall-req-count">${reqTotal.n} / ${reqTotal.total}</span></div>
            <div class="required-label">全部 <span class="overall-all-count">${total.n} / ${total.total}</span></div>
          </div>
          <div class="overall-pct" style="color:${reqTotal.pct === 100 ? 'var(--success)' : 'var(--accent)'}">${reqTotal.pct}%</div>
        </div>
      </div>
    </div>
    <div class="progress-track header-progress-track">
      <div class="progress-fill header-progress-fill" style="width:${reqTotal.pct}%"></div>
    </div>
    <div class="legend">
      <span class="legend-item"><span class="task-tag required">必做</span> 面试/项目核心</span>
      <span class="legend-item"><span class="task-tag optional">选做</span> 时间紧可跳过</span>
      <span class="legend-item"><span class="task-tag practice">实践</span> 需写代码</span>
      <span class="legend-item"><span class="task-tag parallel">并行</span> 全程持续</span>
    </div>
  </div>`;
}

function phaseTabsHtml() {
  const { tabProgress } = getProgressSnapshot();
  let html = '<div class="phase-tabs-segment"><div class="phase-tabs" role="tablist" aria-label="学习阶段">';
  PHASES.forEach((p, i) => {
    const pp = tabProgress[i];
    const active = i === activePhase;
    html += `<button type="button" role="tab" aria-selected="${active}" class="phase-tab${active ? ' active' : ''}"
      style="--tab-color:${p.color}" data-action="phase" data-phase="${i}">
      <span>P${p.n}</span>
      <div class="mini-track"><div class="mini-fill" style="width:${pp.pct}%;background:${p.color}"></div></div>
    </button>`;
  });
  html += '</div></div>';
  return html;
}

function render(full = true) {
  const app = document.getElementById('app');
  if (full) {
    app.innerHTML = headerHtml() + phaseTabsHtml() + '<div id="phaseContentMount"></div>';
    document.getElementById('phaseContentMount').innerHTML = phaseContentHtml();
    bindEvents();
    initStickyNav();
  }
}

function renderPhaseContent(animate = false) {
  const mount = document.getElementById('phaseContentMount');
  if (!mount) {
    render(true);
    return;
  }

  const prevHeight = mount.offsetHeight;
  if (prevHeight > 0) mount.style.minHeight = prevHeight + 'px';

  const doUpdate = () => {
    mount.innerHTML = phaseContentHtml();
  };

  const finish = () => {
    mount.style.minHeight = '';
  };

  if (animate && typeof document.startViewTransition === 'function') {
    const transition = document.startViewTransition(doUpdate);
    transition.finished.then(finish).catch(finish);
    setTimeout(finish, 350);
  } else {
    doUpdate();
    finish();
  }
}

function updateProgressUI() {
  const { reqTotal, total, phProg, phAllProg, tabProgress } = getProgressSnapshot();

  document.querySelectorAll('.overall-pct').forEach(el => {
    el.textContent = reqTotal.pct + '%';
    el.style.color = reqTotal.pct === 100 ? 'var(--success)' : 'var(--accent)';
  });

  const reqCount = document.querySelector('.overall-req-count');
  if (reqCount) reqCount.textContent = `${reqTotal.n} / ${reqTotal.total}`;
  const allCount = document.querySelector('.overall-all-count');
  if (allCount) allCount.textContent = `${total.n} / ${total.total}`;

  document.querySelectorAll('.header-progress-fill').forEach(el => {
    el.style.width = reqTotal.pct + '%';
  });

  const stickyPct = document.querySelector('.sticky-pct');
  if (stickyPct) stickyPct.textContent = reqTotal.pct + '%';

  const phasePct = document.querySelector('.phase-pct');
  if (phasePct) phasePct.textContent = phProg.pct + '%';
  const phaseReq = document.querySelector('.phase-req-count');
  if (phaseReq) phaseReq.textContent = `${phProg.n} / ${phProg.total}`;
  const phaseAll = document.querySelector('.phase-all-count');
  if (phaseAll) phaseAll.textContent = `${phAllProg.n}/${phAllProg.total}`;
  const phaseFill = document.querySelector('.phase-progress-fill');
  if (phaseFill) phaseFill.style.width = phProg.pct + '%';

  document.querySelectorAll('.phase-tab').forEach((tab, i) => {
    const pp = tabProgress[i];
    const fill = tab.querySelector('.mini-fill');
    if (fill) fill.style.width = pp.pct + '%';
  });
}

function updatePhaseTabs() {
  document.querySelectorAll('.phase-tab').forEach((tab, i) => {
    const active = i === activePhase;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', active);
  });
}

function updateSectionUI(sectionId) {
  const sec = PHASES[activePhase].sections.find(s => s.id === sectionId);
  const sectionEl = document.getElementById('sec-' + sectionId);
  if (!sec || !sectionEl) return;

  const sp = prog(requiredTasks(sec.tasks));
  const countEl = sectionEl.querySelector('.section-count');
  if (countEl) {
    countEl.textContent = formatSectionCount(sec) + (sp.pct === 100 ? ' ✓' : '');
    countEl.classList.toggle('all-done', sp.pct === 100);
  }
  sectionEl.classList.toggle('done', sp.pct === 100);
}

function updateTaskRow(taskId) {
  const btn = document.querySelector(`[data-task="${taskId}"]`);
  if (!btn) return;
  const isDone = !!done[taskId];
  btn.classList.toggle('done', isDone);
  btn.setAttribute('aria-checked', isDone);
}

function toggleSection(sid) {
  open[sid] = !open[sid];
  saveState();
  haptic('light');

  const sectionEl = document.getElementById('sec-' + sid);
  if (sectionEl) {
    const isOpen = !!open[sid];
    sectionEl.classList.toggle('open', isOpen);
    const header = sectionEl.querySelector('.section-header');
    if (header) header.setAttribute('aria-expanded', isOpen);
  }
}

function toggleTask(id, sectionId) {
  const phTasks = PHASES[activePhase].sections.flatMap(s => s.tasks);
  const wasDone = !!done[id];
  done[id] = !wasDone;
  saveState();

  updateTaskRow(id);
  updateSectionUI(sectionId);
  updateProgressUI();

  if (!wasDone) {
    haptic('success');
    const allDone = isAllRequiredDone();
    const sec = PHASES[activePhase].sections.find(s => s.id === sectionId);
    const secAllDone = sec && prog(sec.tasks).pct === 100;
    const phaseComplete = prog(requiredTasks(phTasks)).pct === 100;

    if (secAllDone && !allDone) {
      showSectionCompleteScreen(sec, {
        onClose: () => {
          if (phaseComplete) {
            showToast('阶段「' + PHASES[activePhase].title + '」必做项已全部完成！');
          }
        },
      });
    } else if (phaseComplete && !allDone) {
      showToast('阶段「' + PHASES[activePhase].title + '」必做项已全部完成！');
    }
    if (allDone && shouldShowVictory()) {
      VictoryMusic.play(0.4);
      setTimeout(() => showVictoryScreen({ music: false }), 400);
    }
  } else {
    haptic('light');
    if (!isAllRequiredDone()) clearVictorySeen();
  }
}

function goPhase(i) {
  if (i === activePhase || i < 0 || i >= PHASES.length) return;
  activePhase = i;
  open = {};
  saveState();
  haptic('light');
  updatePhaseTabs();
  renderPhaseContent(true);
  updateProgressUI();
  window.scrollTo({ top: 0 });
}

function expandAll() {
  PHASES[activePhase].sections.forEach(s => { open[s.id] = true; });
  saveState();
  document.querySelectorAll('.section').forEach(el => {
    el.classList.add('open');
    const header = el.querySelector('.section-header');
    if (header) header.setAttribute('aria-expanded', 'true');
  });
  haptic('light');
}

function collapseAll() {
  open = {};
  saveState();
  document.querySelectorAll('.section').forEach(el => {
    el.classList.remove('open');
    const header = el.querySelector('.section-header');
    if (header) header.setAttribute('aria-expanded', 'false');
  });
  haptic('light');
}

async function completeAllTasks() {
  if (modalActionPending) return;
  const total = prog(allTasks());
  if (total.pct === 100) {
    showToast('路线已全部完成');
    return;
  }

  modalActionPending = true;
  try {
    haptic('warning');
    const confirmed = await showAlert({
      title: '确认圆满收官？',
      message: '将标记路线图内全部任务为已完成（含选做），可通过「重置进度」撤销。',
      actions: [
        { label: '取消', cancel: true, value: false },
        { label: '确认收官', value: true },
      ],
    });
    if (!confirmed) return;

    allTasks().forEach(t => { done[t.id] = true; });
    saveState();
    renderPhaseContent();
    updateProgressUI();
    haptic('success');

    if (shouldShowVictory()) {
      VictoryMusic.play(0.4);
      setTimeout(() => showVictoryScreen({ music: false }), 400);
    } else {
      showToast('圆满收官，全部任务已标记完成');
    }
  } finally {
    modalActionPending = false;
  }
}

async function resetProgress() {
  if (modalActionPending) return;

  modalActionPending = true;
  try {
    haptic('warning');
    const confirmed = await showAlert({
      title: '清空所有进度？',
      message: '此操作不可撤销，所有勾选记录将被删除。',
      actions: [
        { label: '取消', cancel: true, value: false },
        { label: '清空', destructive: true, value: true },
      ],
    });
    if (!confirmed) return;

    done = {};
    open = {};
    localStorage.removeItem(SK);
    clearVictorySeen();
    closeVictoryScreen();
    saveState();
    renderPhaseContent();
    updateProgressUI();
    showToast('进度已重置');
    haptic('light');
  } finally {
    modalActionPending = false;
  }
}

async function handleMoreActions() {
  if (modalActionPending) return;

  modalActionPending = true;
  let action;
  try {
    action = await showActionSheet([
      { label: '展开全部', value: 'expand' },
      { label: '收起全部', value: 'collapse' },
      { label: '圆满收官', value: 'complete-all' },
      { label: '重置进度', value: 'reset', destructive: true },
    ]);
  } finally {
    modalActionPending = false;
  }

  if (action === 'expand') expandAll();
  else if (action === 'collapse') collapseAll();
  else if (action === 'complete-all') completeAllTasks();
  else if (action === 'reset') resetProgress();
}

function bindEvents() {
  if (eventsBound) return;
  eventsBound = true;

  const app = document.getElementById('app');
  app.addEventListener('click', (e) => {
    VictoryMusic.prepare();
    SectionMusic.prepare();
    const target = e.target.closest('[data-action]');
    if (!target || target.disabled) return;

    const action = target.dataset.action;
    switch (action) {
      case 'phase':
        goPhase(+target.dataset.phase);
        break;
      case 'section':
        toggleSection(target.dataset.section);
        break;
      case 'task':
        toggleTask(target.dataset.task, target.dataset.section);
        break;
      case 'theme':
        setTheme(target.dataset.theme);
        break;
      case 'expand-all':
        expandAll();
        break;
      case 'collapse-all':
        collapseAll();
        break;
      case 'complete-all':
        completeAllTasks();
        break;
      case 'reset':
        resetProgress();
        break;
      case 'more-actions':
        handleMoreActions();
        break;
    }
  });
}

function initStickyNav() {
  const stickyNav = document.getElementById('stickyNav');
  const header = document.querySelector('.header');
  if (!stickyNav || !header) return;

  if (initStickyNav._handler) {
    window.removeEventListener('scroll', initStickyNav._handler);
  }

  const handler = () => {
    const threshold = header.offsetHeight * 0.6;
    const visible = window.scrollY > threshold;
    stickyNav.classList.toggle('visible', visible);
    stickyNav.setAttribute('aria-hidden', !visible);
  };

  initStickyNav._handler = handler;
  window.addEventListener('scroll', handler, { passive: true });
  handler();
}

load();
initThemeListener();
updateThemeMeta();
render(true);
if (shouldShowVictory()) {
  victoryAutoShowTimer = setTimeout(showVictoryScreen, 600);
}
