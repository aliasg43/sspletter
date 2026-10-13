/* ==========================================================================
   A Little Surprise — script.js
   Sections:
     1. CONFIG        (edit passwords, card messages and the letter here)
     2. TRANSLATIONS  (English / Bengali interface text)
     3. App code
   ========================================================================== */

(function () {
  'use strict';

  /* ======================================================================
     1. CONFIG — EDIT THIS PART
     ====================================================================== */

  const CONFIG = {
    // Accepted passwords (capitalization is ignored). Add, remove or change freely.
    passwords: [
      'rose2026',
      'ourmemory',
      'sunshine',
      'specialday',
      'welcome123'
    ],

    // The share of the cover that must be scratched before a card reveals (0.30 = 30%).
    revealThreshold: 0.30,

    // Messages hidden under the scratch cards (one per card; 7 cards by default).
    // Tip: ~100 characters or fewer looks best; longer text shrinks automatically.
    cards: [
      'Your laugh makes ordinary days feel softer. 🌸',
      'I still smile when I remember our long talks.',
      'Thank you for being kind, even on tired days.',
      'Some of my favourite memories are the quiet ones with you.',
      'You don’t have to be perfect. You are already enough.',
      'Whatever tomorrow brings, I’m grateful for today.',
      'One last little cloud, with one big thank-you. 💛'
    ],

    // The final letter shown after all cards are revealed.
    letter: {
      salutation: 'Dear Meghna,',
      paragraphs: [
        'I wanted to give you something small, slow and a little bit silly — something you could open whenever you felt ready.',
        'Thank you for the kind moments, the laughter, and the quiet days that turned into memories I hold close. If I ever made you feel less than you deserve, I am truly sorry.',
        'There is nothing you need to say back, and no deadline for any answer. Take all the time you need. I just wanted you to know that you matter to me — today, and always.'
      ],
      closing: 'With warmth and a hopeful heart,',
      signature: 'Your Name'
    },

    // Text used by the Share button
    share: {
      title: 'A little surprise',
      text: 'A small surprise, made with care. 💛'
    }
  };

  /* ======================================================================
     2. TRANSLATIONS
     Keys are referenced from index.html (data-i18n, data-i18n-aria,
     data-i18n-placeholder) and from the code below via t('key').
     Letter and card messages are intentionally NOT translated.
     ====================================================================== */

  const I18N = {
    en: {
      pageTitle: 'A Little Surprise',
      'translate': 'Translate',
      'translate.aria': 'Translate page to Bengali',

      'pw.title': 'A little surprise is waiting',
      'pw.lead': 'Enter the password to open it.',
      'pw.label': 'Password',
      'pw.placeholder': 'Type your password',
      'pw.hint': 'Capital or small letters don’t matter.',
      'pw.show': 'Show',
      'pw.hide': 'Hide',
      'pw.submit': 'Open',

      'feedback.empty': 'Please type a password first.',
      'feedback.near': 'You made a tiny mistake! 😅 Don’t worry, let’s try again!',
      'feedback.wrong': 'Uff, you forgot so soon! 😢 Please try another password.',

      'welcome.title': 'As-salamu Alaykum Meghna',
      'welcome.hint': 'Tap a button to begin.',
      'welcome.btn1': 'Wa Alaykum As-salam',
      'welcome.btn2Aria': 'Start the surprise',

      'anim.title': 'A little character tumbles down from the top, dusts itself off, and shyly says: “Oii, sorry! 🥹😳”',

      'cards.title': 'Seven little clouds',
      'cards.lead': 'Scratch each cloud with your finger or mouse to reveal a message.',
      'cards.hint': 'Scratch here ✨',
      'cards.canvasLabel': 'Cloud {n} of {total}. Scratch to reveal the message, or press Enter.',
      'cards.progress': '{n} of {total} revealed',
      'cards.revealed': 'Cloud {n} revealed.',
      'cards.allDone': 'All the clouds are revealed. Your letter is below.',

      'letter.title': 'A letter for you',
      'letter.share': 'Share',
      'share.copied': 'Link copied. You can paste it anywhere.',
      'share.failed': 'Couldn’t share automatically. Please copy the link from your address bar.'
    },

    bn: {
      pageTitle: 'একটি ছোট্ট চমক',
      'translate': 'ইংরেজি',
      'translate.aria': 'ইংরেজিতে ফিরে যাও',

      'pw.title': 'একটি ছোট্ট চমক অপেক্ষা করছে',
      'pw.lead': 'চমকটি খুলতে পাসওয়ার্ড লেখো।',
      'pw.label': 'পাসওয়ার্ড',
      'pw.placeholder': 'তোমার পাসওয়ার্ড লেখো',
      'pw.hint': 'বড় হাতের বা ছোট হাতের অক্ষর নিয়ে চিন্তা করতে হবে না।',
      'pw.show': 'দেখাও',
      'pw.hide': 'লুকাও',
      'pw.submit': 'খোলো',

      'feedback.empty': 'আগে একটি পাসওয়ার্ড লেখো।',
      'feedback.near': 'তুমি একটা ছোট্ট ভুল করে ফেলেছ! 😅 চিন্তা নেই, আবার চেষ্টা করো!',
      'feedback.wrong': 'উফ, এত তাড়াতাড়ি ভুলে গেলে! 😢 দয়া করে অন্য একটা পাসওয়ার্ড দিয়ে চেষ্টা করো।',

      'welcome.title': 'আস-সালামু আলাইকুম মেঘনা',
      'welcome.hint': 'শুরু করতে একটি বোতামে ট্যাপ করো।',
      'welcome.btn1': 'ওয়া আলাইকুম আস-সালাম',
      'welcome.btn2Aria': 'চমকটি শুরু করো',

      'anim.title': 'ছোট্ট একটি চরিত্র ওপর থেকে গড়িয়ে পড়ে, গা থেকে ধুলো ঝেড়ে নেয়, তারপর লাজুক গলায় বলে: “Oii, sorry! 🥹😳”',

      'cards.title': 'সাতটি ছোট্ট মেঘ',
      'cards.lead': 'আঙুল বা মাউস দিয়ে প্রতিটি মেঘ ঘষো, তাহলেই বার্তাটি দেখতে পাবে।',
      'cards.hint': 'এখানে ঘষো ✨',
      'cards.canvasLabel': 'মেঘ {n}/{total}। ঘষে বার্তাটি দেখো, অথবা Enter চাপো।',
      'cards.progress': '{total}টির মধ্যে {n}টি খোলা হয়েছে',
      'cards.revealed': 'মেঘ {n} খোলা হয়েছে।',
      'cards.allDone': 'সবগুলো মেঘ খোলা হয়েছে। তোমার চিঠি নিচে আছে।',

      'letter.title': 'তোমার জন্য একটি চিঠি',
      'letter.share': 'শেয়ার করো',
      'share.copied': 'লিংক কপি হয়েছে। যেখানে ইচ্ছা পেস্ট করতে পারো।',
      'share.failed': 'নিজে থেকে শেয়ার করা গেল না। অ্যাড্রেস বার থেকে লিংকটি কপি করে নাও।'
    }
  };

  /* ======================================================================
     3. APP CODE
     ====================================================================== */

  // Cloud outline in normalized (0–1) coordinates. It is used three times so that
  // everything matches: the CSS clip-path, the canvas cover and the scratch area.
  const CLOUD_SHAPE = {
    rects: [{ x: 0.18, y: 0.52, w: 0.64, h: 0.44 }],
    ellipses: [
      { cx: 0.20, cy: 0.74, rx: 0.19, ry: 0.22 },
      { cx: 0.80, cy: 0.74, rx: 0.19, ry: 0.22 },
      { cx: 0.36, cy: 0.44, rx: 0.21, ry: 0.27 },
      { cx: 0.63, cy: 0.38, rx: 0.25, ry: 0.30 }
    ]
  };

  const BRUSH_RADIUS = 22;       // CSS pixels
  const SAMPLE_STEP = 4;         // pixel sampling step when measuring scratch progress
  const ANIMATION_MS = { dust: 2900, shy: 4200, end: 5800 };
  const RAIN_MS = 4000;

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const els = {
    langToggle: $('#lang-toggle'),
    screens: {
      password: $('#screen-password'),
      welcome: $('#screen-welcome'),
      animation: $('#screen-animation'),
      cards: $('#screen-cards')
    },
    pwForm: $('#password-form'),
    pwInput: $('#password-input'),
    pwRow: $('#pw-input-row'),
    pwToggle: $('#pw-toggle'),
    feedback: $('#password-feedback'),
    choice1: $('#choice-1'),
    choice2: $('#choice-2'),
    scene: $('#scene'),
    cardsList: $('#cards-list'),
    progressDots: $('#progress-dots'),
    progressText: $('#progress-text'),
    letter: $('#screen-letter'),
    letterTitle: $('#letter-title'),
    letterContent: $('#letter-content'),
    shareBtn: $('#share-btn'),
    shareStatus: $('#share-status'),
    srLive: $('#sr-live'),
    rain: $('#rain-layer'),
    clip: $('#cloud-clip')
  };

  const state = {
    lang: 'en',
    feedback: null,        // { key, type }
    shareStatusKey: null,
    cards: [],
    visibleCount: 0,
    revealedCount: 0,
    animationStarted: false,
    letterShown: false,
    rainTimer: null,
    shareTimer: null
  };

  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const prefersReducedMotion = () => reducedMotionQuery.matches;

  /* ---------- Translation helpers ---------- */

  const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

  function localizeNumber(n) {
    const s = String(n);
    return state.lang === 'bn' ? s.replace(/\d/g, (d) => BN_DIGITS[Number(d)]) : s;
  }

  function t(key, vars) {
    const table = I18N[state.lang] || I18N.en;
    let str = table[key];
    if (str === undefined) str = I18N.en[key];
    if (str === undefined) str = key;
    if (vars) {
      str = str.replace(/\{(\w+)\}/g, (m, name) => (vars[name] !== undefined ? vars[name] : m));
    }
    return str;
  }

  function announce(message) {
    els.srLive.textContent = '';
    window.setTimeout(() => { els.srLive.textContent = message; }, 60);
  }

  function applyLanguage() {
    document.documentElement.lang = state.lang;
    document.title = t('pageTitle');

    $$('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
    $$('[data-i18n-aria]').forEach((el) => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
    $$('[data-i18n-placeholder]').forEach((el) => { el.setAttribute('placeholder', t(el.dataset.i18nPlaceholder)); });

    els.langToggle.setAttribute('aria-pressed', String(state.lang === 'bn'));
    els.langToggle.setAttribute('aria-label', t('translate.aria'));

    updatePasswordToggle();
    renderFeedback();
    renderProgress();
    relabelCards();
    renderShareStatus();
  }

  function toggleLanguage() {
    state.lang = state.lang === 'en' ? 'bn' : 'en';
    applyLanguage();
  }

  /* ---------- Screen handling ---------- */

  function showScreen(name) {
    const target = els.screens[name];
    Object.keys(els.screens).forEach((key) => { els.screens[key].hidden = els.screens[key] !== target; });
    target.classList.remove('screen-in');
    void target.offsetWidth; // restart the fade-in
    target.classList.add('screen-in');
    window.scrollTo(0, 0);
    const focusTarget = $('[data-focus]', target);
    if (focusTarget) focusTarget.focus({ preventScroll: true });
  }

  /* ---------- 1. Password ---------- */

  function normalize(value) {
    // trim() forgives accidental spaces added by phone keyboards
    return String(value).trim().toLowerCase();
  }

  function evaluateEntry(entry) {
    const value = normalize(entry);
    if (!value) return 'empty';

    const list = CONFIG.passwords.map(normalize);
    if (list.includes(value)) return 'correct';

    // Exactly six characters that appear consecutively inside a password = tiny mistake
    if (Array.from(value).length === 6 && list.some((pw) => pw.includes(value))) return 'near';

    return 'wrong';
  }

  function setFeedback(key, type) {
    state.feedback = key ? { key, type } : null;
    renderFeedback();
  }

  function renderFeedback() {
    const fb = state.feedback;
    els.feedback.textContent = fb ? t(fb.key) : '';
    els.feedback.className = fb ? 'feedback feedback--' + fb.type : 'feedback';
    if (fb) {
      els.pwInput.setAttribute('aria-invalid', 'true');
      els.pwRow.dataset.state = fb.type;
    } else {
      els.pwInput.removeAttribute('aria-invalid');
      delete els.pwRow.dataset.state;
    }
  }

  function updatePasswordToggle() {
    const visible = els.pwInput.type === 'text';
    els.pwToggle.textContent = t(visible ? 'pw.hide' : 'pw.show');
    els.pwToggle.setAttribute('aria-pressed', String(visible));
  }

  function shakeInput() {
    if (prefersReducedMotion()) return;
    els.pwRow.classList.remove('is-shaking');
    void els.pwRow.offsetWidth;
    els.pwRow.classList.add('is-shaking');
  }

  function rainSadEmojis() {
    if (prefersReducedMotion()) return;

    window.clearTimeout(state.rainTimer);
    els.rain.textContent = '';

    const emojis = ['😢', '😭', '🥺', '😞', '💧'];
    const count = Math.max(18, Math.min(38, Math.round(window.innerWidth / 20)));
    const frag = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const drop = document.createElement('span');
      drop.className = 'rain-drop';
      drop.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      drop.style.left = (Math.random() * 94 + 2).toFixed(1) + 'vw';
      drop.style.fontSize = Math.round(22 + Math.random() * 20) + 'px';
      drop.style.setProperty('--delay', (Math.random() * 1.0).toFixed(2) + 's');   // up to 1.0s
      drop.style.setProperty('--dur', (2.0 + Math.random() * 0.9).toFixed(2) + 's'); // 2.0–2.9s
      drop.style.setProperty('--drift', Math.round(Math.random() * 60 - 30) + 'px');
      frag.appendChild(drop);
    }
    els.rain.appendChild(frag);

    // Last drop ends at ≈3.9s; clean up right after
    state.rainTimer = window.setTimeout(() => { els.rain.textContent = ''; }, RAIN_MS);
  }

  function onPasswordSubmit(event) {
    event.preventDefault();
    const result = evaluateEntry(els.pwInput.value);

    if (result === 'correct') {
      setFeedback(null);
      els.pwInput.value = '';
      els.pwInput.type = 'password';
      updatePasswordToggle();
      showScreen('welcome');
      return;
    }

    if (result === 'empty') {
      setFeedback('feedback.empty', 'empty');
    } else if (result === 'near') {
      setFeedback('feedback.near', 'near');
    } else {
      setFeedback('feedback.wrong', 'wrong');
      rainSadEmojis();   // only for fully incorrect entries
      shakeInput();
    }

    els.pwInput.focus();
    els.pwInput.select();
  }

  function onPasswordToggle() {
    els.pwInput.type = els.pwInput.type === 'password' ? 'text' : 'password';
    updatePasswordToggle();
    els.pwInput.focus();
  }

  /* ---------- 2. Character animation ---------- */

  function startAnimation() {
    if (state.animationStarted) return;
    state.animationStarted = true;
    els.choice1.disabled = true;
    els.choice2.disabled = true;

    showScreen('animation');
    playCharacterAnimation(startCards);
  }

  function playCharacterAnimation(onDone) {
    const scene = els.scene;
    scene.classList.remove('act-fall', 'act-dust', 'act-shy');
    void scene.offsetWidth;

    if (prefersReducedMotion()) {
      // No movement: show the shy pose and the speech bubble for a few seconds
      scene.classList.add('act-shy');
      window.setTimeout(onDone, 3200);
      return;
    }

    scene.classList.add('act-fall');
    window.setTimeout(() => { scene.classList.add('act-dust'); }, ANIMATION_MS.dust);
    window.setTimeout(() => {
      scene.classList.remove('act-dust');
      scene.classList.add('act-shy');
    }, ANIMATION_MS.shy);
    window.setTimeout(onDone, ANIMATION_MS.end);
  }

  /* ---------- 3. Scratch cards ---------- */

  function buildCloudClip() {
    const NS = 'http://www.w3.org/2000/svg';
    CLOUD_SHAPE.rects.forEach((r) => {
      const el = document.createElementNS(NS, 'rect');
      el.setAttribute('x', r.x);
      el.setAttribute('y', r.y);
      el.setAttribute('width', r.w);
      el.setAttribute('height', r.h);
      els.clip.appendChild(el);
    });
    CLOUD_SHAPE.ellipses.forEach((e) => {
      const el = document.createElementNS(NS, 'ellipse');
      el.setAttribute('cx', e.cx);
      el.setAttribute('cy', e.cy);
      el.setAttribute('rx', e.rx);
      el.setAttribute('ry', e.ry);
      els.clip.appendChild(el);
    });
  }

  function traceCloud(ctx, w, h) {
    ctx.beginPath();
    CLOUD_SHAPE.rects.forEach((r) => ctx.rect(r.x * w, r.y * h, r.w * w, r.h * h));
    CLOUD_SHAPE.ellipses.forEach((e) => {
      ctx.moveTo((e.cx + e.rx) * w, e.cy * h);
      ctx.ellipse(e.cx * w, e.cy * h, e.rx * w, e.ry * h, 0, 0, Math.PI * 2);
    });
  }

  function drawCover(ctx, w, h) {
    ctx.save();
    ctx.globalCompositeOperation = 'source-over';

    // soft gold foil, only inside the cloud
    traceCloud(ctx, w, h);
    const base = ctx.createLinearGradient(0, 0, w * 0.8, h);
    base.addColorStop(0, '#f6e6b8');
    base.addColorStop(0.45, '#e5c983');
    base.addColorStop(1, '#bf9648');
    ctx.fillStyle = base;
    ctx.fill();

    ctx.save();
    ctx.clip();

    // puffy highlights on every bump
    CLOUD_SHAPE.ellipses.forEach((e) => {
      const cx = (e.cx - e.rx * 0.25) * w;
      const cy = (e.cy - e.ry * 0.35) * h;
      const r = Math.max(e.rx * w, e.ry * h) * 0.9;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, 'rgba(255,252,238,0.75)');
      g.addColorStop(1, 'rgba(255,252,238,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    });

    // gentle shade toward the bottom
    const shade = ctx.createLinearGradient(0, h * 0.5, 0, h);
    shade.addColorStop(0, 'rgba(120,78,30,0)');
    shade.addColorStop(1, 'rgba(120,78,30,0.35)');
    ctx.fillStyle = shade;
    ctx.fillRect(0, 0, w, h);

    // fine foil lines
    ctx.globalAlpha = 0.12;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = Math.max(1, w / 220);
    for (let x = -h; x < w; x += w / 28) {
      ctx.beginPath();
      ctx.moveTo(x, h);
      ctx.lineTo(x + h, 0);
      ctx.stroke();
    }

    // sparkles
    ctx.globalAlpha = 1;
    const unit = w / 340;
    for (let i = 0; i < 160; i++) {
      ctx.fillStyle = Math.random() < 0.5 ? 'rgba(255,255,255,0.55)' : 'rgba(138,100,25,0.25)';
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, (Math.random() * 1.6 + 0.4) * unit, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
    ctx.restore();
  }

  function countOpaque(ctx, w, h) {
    const data = ctx.getImageData(0, 0, w, h).data;
    let count = 0;
    for (let y = 0; y < h; y += SAMPLE_STEP) {
      for (let x = 0; x < w; x += SAMPLE_STEP) {
        if (data[(y * w + x) * 4 + 3] > 128) count++;
      }
    }
    return count;
  }

  function scratchedFraction(card) {
    if (!card.total) return 0;
    const remaining = countOpaque(card.ctx, card.canvas.width, card.canvas.height);
    return Math.max(0, Math.min(1, 1 - remaining / card.total));
  }

  function buildCards() {
    const total = CONFIG.cards.length;

    CONFIG.cards.forEach((message, index) => {
      const li = document.createElement('li');
      li.className = 'cloud-card';
      li.hidden = true;
      li.style.setProperty('--i', index);

      const body = document.createElement('div');
      body.className = 'cloud-body';

      const msg = document.createElement('p');
      msg.className = 'cloud-message';
      msg.setAttribute('lang', 'en');         // personal content stays as written
      msg.setAttribute('aria-hidden', 'true'); // hidden from screen readers until revealed
      const msgText = document.createElement('span');
      msgText.textContent = message;
      msg.appendChild(msgText);

      const canvas = document.createElement('canvas');
      canvas.className = 'scratch-canvas';
      canvas.tabIndex = 0;
      canvas.setAttribute('role', 'button');

      const hint = document.createElement('span');
      hint.className = 'scratch-hint';
      hint.setAttribute('aria-hidden', 'true');
      hint.dataset.i18n = 'cards.hint';
      hint.textContent = t('cards.hint');

      body.append(msg, canvas, hint);
      li.appendChild(body);
      els.cardsList.appendChild(li);

      const card = {
        index,
        el: li,
        body,
        msg,
        msgText,
        canvas,
        ctx: null,
        total: 0,
        ready: false,
        visible: false,
        revealed: false,
        drawing: false,
        last: null,
        lastCheck: 0,
        brush: 20
      };
      state.cards.push(card);
      bindCardEvents(card);
    });

    // progress dots
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('span');
      dot.className = 'dot';
      els.progressDots.appendChild(dot);
    }
  }

  function relabelCards() {
    const total = state.cards.length;
    state.cards.forEach((card) => {
      card.canvas.setAttribute('aria-label', t('cards.canvasLabel', {
        n: localizeNumber(card.index + 1),
        total: localizeNumber(total)
      }));
    });
  }

  function renderProgress() {
    const total = state.cards.length;
    els.progressText.textContent = t('cards.progress', {
      n: localizeNumber(state.revealedCount),
      total: localizeNumber(total)
    });
    $$('.dot', els.progressDots).forEach((dot, i) => {
      const card = state.cards[i];
      dot.classList.toggle('is-done', !!(card && card.revealed));
      dot.classList.toggle('is-open', !!(card && card.visible && !card.revealed));
    });
  }

  function fitMessage(card) {
    const box = card.msg;
    const text = card.msgText;
    const width = card.body.offsetWidth;
    if (!width) return;

    let size = Math.max(13, Math.round(width * 0.058));
    box.style.fontSize = size + 'px';
    while (size > 11 && (text.offsetHeight > box.clientHeight || text.offsetWidth > box.clientWidth + 1)) {
      size -= 1;
      box.style.fontSize = size + 'px';
    }
  }

  function setupCard(card, tries) {
    tries = tries || 0;
    if (card.ready) return;

    const w = card.body.offsetWidth;
    const h = card.body.offsetHeight;
    if (!w || !h) {
      if (tries < 12) window.requestAnimationFrame(() => setupCard(card, tries + 1));
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    card.canvas.width = Math.round(w * dpr);
    card.canvas.height = Math.round(h * dpr);
    card.ctx = card.canvas.getContext('2d', { willReadFrequently: true });

    drawCover(card.ctx, card.canvas.width, card.canvas.height);
    card.total = countOpaque(card.ctx, card.canvas.width, card.canvas.height);
    card.ready = true;
    card.el.classList.add('is-ready');
    fitMessage(card);
  }

  function showCard(index, silent) {
    const card = state.cards[index];
    if (!card || card.visible) return;

    card.visible = true;
    card.el.hidden = false;
    state.visibleCount++;

    if (!silent) {
      card.el.classList.add('is-entering');
      card.el.addEventListener('animationend', function onEnd(e) {
        if (e.target !== card.body) return;
        card.el.classList.remove('is-entering');
        card.el.removeEventListener('animationend', onEnd);
      });
    }

    window.requestAnimationFrame(() => setupCard(card));
    renderProgress();

    if (!silent) {
      // Bring the new card into view only if it isn't fully visible already
      window.setTimeout(() => {
        const r = card.el.getBoundingClientRect();
        if (r.top < 0 || r.bottom > window.innerHeight) {
          card.el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'center' });
        }
      }, 700);
    }
  }

  function startCards() {
    showScreen('cards');
    renderProgress();
    showCard(0, true);
    showCard(1, true);
  }

  function pointFromEvent(card, event) {
    const rect = card.canvas.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) * (card.canvas.width / rect.width),
      y: (event.clientY - rect.top) * (card.canvas.height / rect.height)
    };
  }

  function scratchDot(card, p) {
    const ctx = card.ctx;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(p.x, p.y, card.brush, 0, Math.PI * 2);
    ctx.fillStyle = '#000';
    ctx.fill();
  }

  function scratchLine(card, from, to) {
    const ctx = card.ctx;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = card.brush * 2;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  }

  function checkProgress(card) {
    card.lastCheck = performance.now();
    if (scratchedFraction(card) >= CONFIG.revealThreshold) revealCard(card);
  }

  function stopDrawing(card) {
    if (!card.drawing) return;
    card.drawing = false;
    card.last = null;
    card.el.classList.remove('is-scratching');
    if (!card.revealed) checkProgress(card);
  }

  function bindCardEvents(card) {
    const canvas = card.canvas;

    canvas.addEventListener('pointerdown', (e) => {
      if (card.revealed || !card.ready) return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      e.preventDefault();

      try { canvas.setPointerCapture(e.pointerId); } catch (err) { /* not critical */ }

      card.drawing = true;
      card.el.classList.add('is-scratching');   // pauses the floating motion
      card.el.classList.add('has-scratch');
      const scale = canvas.width / canvas.getBoundingClientRect().width;
      card.brush = BRUSH_RADIUS * scale;

      const p = pointFromEvent(card, e);
      card.last = p;
      scratchDot(card, p);
    });

    canvas.addEventListener('pointermove', (e) => {
      if (!card.drawing || card.revealed) return;
      e.preventDefault();

      const events = typeof e.getCoalescedEvents === 'function' ? e.getCoalescedEvents() : [];
      const list = events.length ? events : [e];
      list.forEach((ev) => {
        const p = pointFromEvent(card, ev);
        scratchLine(card, card.last || p, p);
        card.last = p;
      });

      if (performance.now() - card.lastCheck > 140) checkProgress(card);
    });

    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((type) => {
      canvas.addEventListener(type, () => stopDrawing(card));
    });

    canvas.addEventListener('contextmenu', (e) => e.preventDefault());

    // Keyboard alternative: Enter or Space reveals the card
    canvas.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        revealCard(card);
      }
    });

    canvas.addEventListener('focus', () => {
      let visible = false;
      try { visible = canvas.matches(':focus-visible'); } catch (err) { visible = false; }
      card.el.classList.toggle('is-focused', visible);
    });
    canvas.addEventListener('blur', () => card.el.classList.remove('is-focused'));
  }

  function revealCard(card) {
    if (card.revealed) return;

    card.revealed = true;
    card.drawing = false;
    card.el.classList.remove('is-scratching', 'is-focused');
    card.el.classList.add('is-revealed', 'is-ready', 'has-scratch');

    card.msg.removeAttribute('aria-hidden');
    card.canvas.tabIndex = -1;
    card.canvas.setAttribute('aria-hidden', 'true');
    card.canvas.blur();
    window.setTimeout(() => { card.canvas.hidden = true; }, 900);

    state.revealedCount++;
    renderProgress();

    const total = state.cards.length;
    announce(card.msgText.textContent + ' — ' + t('cards.revealed', { n: localizeNumber(card.index + 1) }));

    if (state.revealedCount >= total) {
      window.setTimeout(showLetter, 1200);
    } else {
      // show the next hidden card
      showCard(state.visibleCount);
    }
  }

  /* ---------- 4. Letter & sharing ---------- */

  function buildLetter() {
    const { salutation, paragraphs, closing, signature } = CONFIG.letter;
    const add = (cls, text) => {
      const p = document.createElement('p');
      p.className = cls;
      p.textContent = text;
      els.letterContent.appendChild(p);
    };

    els.letterContent.textContent = '';
    if (salutation) add('letter-salutation', salutation);
    paragraphs.forEach((text) => add('letter-paragraph', text));
    if (closing) add('letter-closing', closing);
    if (signature) add('letter-signature', signature);
  }

  function showLetter() {
    if (state.letterShown) return;
    state.letterShown = true;

    els.letter.hidden = false;
    els.letter.querySelector('.letter').classList.add('is-open');
    announce(t('cards.allDone'));

    window.setTimeout(() => {
      els.letter.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
      els.letterTitle.focus({ preventScroll: true });
    }, 80);
  }

  function setShareStatus(key) {
    state.shareStatusKey = key;
    renderShareStatus();
    window.clearTimeout(state.shareTimer);
    if (key) {
      state.shareTimer = window.setTimeout(() => setShareStatus(null), 7000);
    }
  }

  function renderShareStatus() {
    els.shareStatus.textContent = state.shareStatusKey ? t(state.shareStatusKey) : '';
  }

  async function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (err) { /* fall through to the legacy method */ }

    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;';
      document.body.appendChild(ta);
      ta.select();
      ta.setSelectionRange(0, text.length);
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch (err) {
      return false;
    }
  }

  async function shareLetter() {
    const url = window.location.href;
    const data = { title: CONFIG.share.title, text: CONFIG.share.text, url };

    if (navigator.share) {
      try {
        if (!navigator.canShare || navigator.canShare(data)) {
          await navigator.share(data);
          setShareStatus(null);
          return;
        }
      } catch (err) {
        if (err && err.name === 'AbortError') return; // the person closed the share sheet
      }
    }

    const copied = await copyText(url);
    setShareStatus(copied ? 'share.copied' : 'share.failed');
  }

  /* ---------- Init ---------- */

  function init() {
    buildCloudClip();
    buildCards();
    buildLetter();

    els.langToggle.addEventListener('click', toggleLanguage);
    els.pwForm.addEventListener('submit', onPasswordSubmit);
    els.pwToggle.addEventListener('click', onPasswordToggle);
    els.pwRow.addEventListener('animationend', () => els.pwRow.classList.remove('is-shaking'));
    els.choice1.addEventListener('click', startAnimation);
    els.choice2.addEventListener('click', startAnimation);
    els.shareBtn.addEventListener('click', shareLetter);

    let resizeTimer = null;
    window.addEventListener('resize', () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        state.cards.forEach((card) => { if (card.visible && card.ready) fitMessage(card); });
      }, 150);
    });

    applyLanguage();
  }

  init();
})();