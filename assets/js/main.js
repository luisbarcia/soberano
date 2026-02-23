// Soberano Theme - Minimal JS
(function() {
  'use strict';

  // ---- Mobile nav toggle ----
  // Swap CSS-only anchor toggle for JS-enhanced button toggle
  var noscriptToggle = document.querySelector('.nav-toggle--noscript');
  var jsToggle = document.querySelector('.nav-toggle--js');
  var nav = document.querySelector('.nav');

  if (noscriptToggle && jsToggle) {
    noscriptToggle.classList.add('hidden');
    jsToggle.classList.remove('hidden');
  }

  if (jsToggle && nav) {
    jsToggle.addEventListener('click', function() {
      nav.classList.toggle('nav--open');
      var isOpen = nav.classList.contains('nav--open');
      jsToggle.textContent = isOpen ? '[x]' : '[=]';
      jsToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
      if (!jsToggle.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('nav--open');
        jsToggle.textContent = '[=]';
        jsToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ---- Copy button on code blocks ----
  document.querySelectorAll('pre').forEach(function(pre) {
    // Skip if already has a button (e.g. from Hugo highlight shortcode)
    if (pre.querySelector('.copy-btn')) return;

    var wrapper = document.createElement('div');
    wrapper.className = 'code-block';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    var btn = document.createElement('button');
    btn.className = 'copy-btn';
    var copyLabel = document.body.dataset.copyLabel || 'Copy';
    var copiedLabel = document.body.dataset.copiedLabel || 'Copied!';

    btn.textContent = copyLabel;
    btn.setAttribute('aria-label', document.body.dataset.copyAria || 'Copy code to clipboard');
    wrapper.appendChild(btn);

    btn.addEventListener('click', function() {
      var code = pre.querySelector('code');
      var text = code ? code.textContent : pre.textContent;

      navigator.clipboard.writeText(text).then(function() {
        btn.textContent = copiedLabel;
        btn.classList.add('copy-btn--success');
        setTimeout(function() {
          btn.textContent = copyLabel;
          btn.classList.remove('copy-btn--success');
        }, 1500);
      }).catch(function() {
        btn.textContent = document.body.dataset.errorLabel || 'Error';
        setTimeout(function() { btn.textContent = copyLabel; }, 1500);
      });
    });
  });
  // ---- Reading progress bar ----
  var progressBar = document.getElementById('reading-progress');
  if (progressBar) {
    window.addEventListener('scroll', function() {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        progressBar.style.setProperty('--progress', (scrollTop / docHeight * 100) + '%');
      }
    }, { passive: true });
  }
})();
