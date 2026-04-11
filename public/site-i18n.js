(function () {
  var STORAGE_KEY = 'preferred-lang';
  var PARAM_KEY = 'lang';
  var RETRY_KEY = 'i18n_retry';

  function setGoogleCookie(value) {
    var host = window.location.hostname;
    document.cookie = 'googtrans=' + value + ';path=/';
    document.cookie = 'googtrans=' + value + ';domain=' + host + ';path=/';
  }

  function getInitialLang() {
    try {
      var params = new URLSearchParams(window.location.search);
      var byParam = params.get(PARAM_KEY);
      if (byParam === 'ar' || byParam === 'en') {
        localStorage.setItem(STORAGE_KEY, byParam);
        return byParam;
      }

      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'ar' || stored === 'en') return stored;
    } catch (error) {}

    return 'ar';
  }

  function applyDocumentDirection(lang) {
    var html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.body.classList.toggle('lang-ar', lang === 'ar');
    document.body.classList.toggle('lang-en', lang === 'en');
  }

  function updateButtons(lang) {
    var buttons = document.querySelectorAll('.site-lang-btn');
    buttons.forEach(function (button) {
      var isActive = button.getAttribute('data-lang') === lang;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
  }

  function localizeBrandText(lang) {
    var AR_BRAND = 'النواة المعمارية';
    var EN_BRAND = 'Architectural Core';

    var brandElements = document.querySelectorAll('.brand');
    brandElements.forEach(function (element) {
      var currentText = (element.textContent || '').trim();
      if (!element.dataset.brandAr) {
        element.dataset.brandAr = currentText || AR_BRAND;
      }
      if (!element.dataset.brandEn) {
        element.dataset.brandEn = EN_BRAND;
      }

      element.textContent = lang === 'en' ? element.dataset.brandEn : element.dataset.brandAr;
    });
  }

  function switchLanguage(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (error) {}

    applyDocumentDirection(lang);
    updateButtons(lang);
    applyGoogleTranslate(lang);
  }

  function injectStyles() {
    if (document.getElementById('site-i18n-style')) return;

    var style = document.createElement('style');
    style.id = 'site-i18n-style';
    style.textContent = [
      '.site-lang-switch{position:fixed;left:1rem;bottom:1rem;z-index:99999;display:flex;gap:.35rem;padding:.35rem;background:rgba(13,11,26,.9);border:1px solid rgba(112,213,230,.25);border-radius:999px;backdrop-filter:blur(10px)}',
      '.site-lang-btn{border:0;background:transparent;color:#9bf0ff;padding:.38rem .68rem;border-radius:999px;font-size:.72rem;font-weight:800;letter-spacing:.06em;cursor:pointer}',
      '.site-lang-btn.active{background:#9bf0ff;color:#001f24}',
      '#google_translate_element,.goog-logo-link,.goog-te-gadget span{display:none!important}',
      '.goog-te-gadget{font-size:0!important}',
      'body{top:0!important}',
      '.goog-te-banner-frame.skiptranslate{display:none!important}'
    ].join('');

    document.head.appendChild(style);
  }

  function injectToggle(lang) {
    if (document.querySelector('.site-lang-switch')) return;

    var wrapper = document.createElement('div');
    wrapper.className = 'site-lang-switch';
    wrapper.setAttribute('role', 'group');
    wrapper.setAttribute('aria-label', 'Language switch');

    var buttonAr = document.createElement('button');
    buttonAr.className = 'site-lang-btn';
    buttonAr.type = 'button';
    buttonAr.textContent = 'عربي';
    buttonAr.setAttribute('data-lang', 'ar');
    buttonAr.setAttribute('aria-pressed', String(lang === 'ar'));

    var buttonEn = document.createElement('button');
    buttonEn.className = 'site-lang-btn';
    buttonEn.type = 'button';
    buttonEn.textContent = 'EN';
    buttonEn.setAttribute('data-lang', 'en');
    buttonEn.setAttribute('aria-pressed', String(lang === 'en'));

    buttonAr.addEventListener('click', function () {
      switchLanguage('ar');
    });

    buttonEn.addEventListener('click', function () {
      switchLanguage('en');
    });

    wrapper.appendChild(buttonAr);
    wrapper.appendChild(buttonEn);
    document.body.appendChild(wrapper);
    updateButtons(lang);
  }

  function ensureGoogleTranslateScript() {
    if (document.getElementById('google_translate_element')) return;

    var holder = document.createElement('div');
    holder.id = 'google_translate_element';
    holder.style.display = 'none';
    document.body.appendChild(holder);

    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'ar',
          includedLanguages: 'ar,en',
          autoDisplay: false
        },
        'google_translate_element'
      );
    };

    var script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.defer = true;
    document.head.appendChild(script);
  }

  function findTranslateSelect() {
    return document.querySelector('.goog-te-combo');
  }

  function applyGoogleTranslate(lang) {
    setGoogleCookie(lang === 'en' ? '/ar/en' : '/ar/ar');

    var target = lang === 'en' ? 'en' : 'ar';
    var tries = 0;
    var maxTries = 30;
    var applied = false;
    var interval = setInterval(function () {
      var select = findTranslateSelect();
      if (!select) {
        tries += 1;
        if (tries >= maxTries) {
          clearInterval(interval);
          if (lang === 'en') {
            fallbackToEnglishTranslate();
          }
        }
        return;
      }

      select.value = target;
      select.dispatchEvent(new Event('change'));
      applied = true;
      clearInterval(interval);
    }, 120);

    return function wasApplied() {
      return applied;
    };
  }

  function fallbackToEnglishTranslate() {
    var current = new URL(window.location.href);
    var retry = current.searchParams.get(RETRY_KEY);

    if (retry !== '1') {
      current.searchParams.set(PARAM_KEY, 'en');
      current.searchParams.set(RETRY_KEY, '1');
      window.location.replace(current.toString());
      return;
    }

    var cleanUrl = new URL(window.location.href);
    cleanUrl.searchParams.delete(RETRY_KEY);
    var target =
      'https://translate.google.com/translate?sl=ar&tl=en&u=' +
      encodeURIComponent(cleanUrl.toString());
    window.location.replace(target);
  }

  function init() {
    var lang = getInitialLang();
    applyDocumentDirection(lang);
    localizeBrandText(lang);
    injectStyles();
    injectToggle(lang);
    ensureGoogleTranslateScript();
    applyGoogleTranslate(lang);

    try {
      var url = new URL(window.location.href);
      if (url.searchParams.get(RETRY_KEY) === '1') {
        url.searchParams.delete(RETRY_KEY);
        window.history.replaceState({}, '', url.toString());
      }
    } catch (error) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
