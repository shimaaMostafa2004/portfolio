(function () {
  var STORAGE_KEY = 'preferred-lang';
  var PARAM_KEY = 'lang';
  var SUPPORTED = { ar: true, en: true };
  var DEFAULT_LANG = 'ar';
  var currentLang = DEFAULT_LANG;
  var bundles = {};

  function getInitialLang() {
    try {
      var params = new URLSearchParams(window.location.search);
      var byParam = params.get(PARAM_KEY);
      if (SUPPORTED[byParam]) {
        localStorage.setItem(STORAGE_KEY, byParam);
        return byParam;
      }

      var stored = localStorage.getItem(STORAGE_KEY);
      if (SUPPORTED[stored]) return stored;
    } catch (error) {}
    return DEFAULT_LANG;
  }

  function getByPath(source, path) {
    if (!source || !path) return undefined;
    return String(path)
      .split('.')
      .reduce(function (acc, key) {
        return acc && Object.prototype.hasOwnProperty.call(acc, key) ? acc[key] : undefined;
      }, source);
  }

  function injectStyles() {
    if (document.getElementById('site-i18n-style')) return;

    var style = document.createElement('style');
    style.id = 'site-i18n-style';
    style.textContent = [
      'body.lang-en [data-ar]{display:none!important}',
      'body.lang-ar [data-en]{display:none!important}',
      '.site-lang-switch{position:fixed;left:1rem;bottom:1rem;z-index:99999;display:flex;gap:.35rem;padding:.35rem;background:rgba(13,11,26,.9);border:1px solid rgba(112,213,230,.25);border-radius:999px;backdrop-filter:blur(10px)}',
      '.site-lang-btn{border:0;background:transparent;color:#9bf0ff;padding:.38rem .68rem;border-radius:999px;font-size:.72rem;font-weight:800;letter-spacing:.06em;cursor:pointer}',
      '.site-lang-btn.active{background:#9bf0ff;color:#001f24}'
    ].join('');

    document.head.appendChild(style);
  }

  function applyDocumentDirection(lang) {
    var html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.body.classList.toggle('lang-ar', lang === 'ar');
    document.body.classList.toggle('lang-en', lang === 'en');
  }

  function t(key, fallback) {
    var text = getByPath(bundles[currentLang], key);
    if (typeof text === 'string') return text;
    if (typeof fallback === 'string') return fallback;
    return '';
  }

  function applyDataI18n() {
    var nodes = document.querySelectorAll('[data-i18n]');
    nodes.forEach(function (node) {
      var key = node.getAttribute('data-i18n');
      if (!key) return;
      var fallback = node.getAttribute('data-i18n-fallback');
      if (!fallback) fallback = (node.textContent || '').trim();
      var value = t(key, fallback);
      if (value) node.textContent = value;
    });

    var attrNodes = document.querySelectorAll('[data-i18n-attr]');
    attrNodes.forEach(function (node) {
      var mapping = (node.getAttribute('data-i18n-attr') || '').split(',');
      mapping.forEach(function (entry) {
        var pair = entry.split(':');
        if (pair.length !== 2) return;
        var attr = pair[0].trim();
        var key = pair[1].trim();
        if (!attr || !key) return;
        var fallback = node.getAttribute(attr) || '';
        var value = t(key, fallback);
        if (value) node.setAttribute(attr, value);
      });
    });
  }

  function updateButtons() {
    var buttons = document.querySelectorAll('.site-lang-btn');
    buttons.forEach(function (button) {
      var buttonLang = button.getAttribute('data-lang');
      var isActive = buttonLang === currentLang;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
      if (buttonLang === 'ar') button.textContent = t('lang.ar_short', 'عربي');
      if (buttonLang === 'en') button.textContent = t('lang.en_short', 'EN');
    });
  }

  function emitLangChange() {
    window.dispatchEvent(
      new CustomEvent('site:lang-change', { detail: { lang: currentLang } })
    );
  }

  function applyLanguage() {
    applyDocumentDirection(currentLang);
    applyDataI18n();
    updateButtons();
    emitLangChange();
  }

  function loadBundle(lang) {
    if (bundles[lang]) return Promise.resolve(bundles[lang]);
    return fetch('/i18n/' + lang + '.json', { cache: 'no-cache' })
      .then(function (res) {
        if (!res.ok) throw new Error('Failed to load i18n bundle');
        return res.json();
      })
      .then(function (json) {
        bundles[lang] = json || {};
        return bundles[lang];
      })
      .catch(function () {
        bundles[lang] = {};
        return bundles[lang];
      });
  }

  function switchLanguage(nextLang) {
    if (!SUPPORTED[nextLang]) return;
    currentLang = nextLang;
    try {
      localStorage.setItem(STORAGE_KEY, currentLang);
    } catch (error) {}

    loadBundle(currentLang).then(applyLanguage);
  }

  function injectToggle() {
    if (document.querySelector('.site-lang-switch')) return;

    var wrapper = document.createElement('div');
    wrapper.className = 'site-lang-switch';
    wrapper.setAttribute('role', 'group');
    wrapper.setAttribute('aria-label', 'Language switch');

    var buttonAr = document.createElement('button');
    buttonAr.className = 'site-lang-btn';
    buttonAr.type = 'button';
    buttonAr.setAttribute('data-lang', 'ar');
    buttonAr.addEventListener('click', function () { switchLanguage('ar'); });

    var buttonEn = document.createElement('button');
    buttonEn.className = 'site-lang-btn';
    buttonEn.type = 'button';
    buttonEn.setAttribute('data-lang', 'en');
    buttonEn.addEventListener('click', function () { switchLanguage('en'); });

    wrapper.appendChild(buttonAr);
    wrapper.appendChild(buttonEn);
    document.body.appendChild(wrapper);
    updateButtons();
  }

  function init() {
    injectStyles();
    currentLang = getInitialLang();

    Promise.all([loadBundle(DEFAULT_LANG), loadBundle(currentLang)]).then(function () {
      applyLanguage();
      injectToggle();
      updateButtons();
    });
  }

  window.siteI18n = {
    t: t,
    getLang: function () { return currentLang; },
    switchLanguage: switchLanguage,
    apply: applyLanguage
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
