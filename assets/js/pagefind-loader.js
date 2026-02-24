// Pagefind Search Loader
// CSS is preloaded in the search template head block.
(function() {
  var el = document.getElementById('search');
  var pagefindBase = (el && el.dataset.pagefindBase) || '/pagefind/';

  var js = document.createElement('script');
  js.src = pagefindBase + 'pagefind-ui.js';
  js.onload = function() {
    new PagefindUI({
      element: '#search',
      showSubResults: true,
      showImages: false
    });
  };
  js.onerror = function() {
    var el = document.getElementById('search');
    if (el) {
      var p = document.createElement('p');
      p.className = 'text-dim';
      p.textContent = el.dataset.searchUnavailable || 'Search index not available. Run the build pipeline to enable search.';
      el.textContent = '';
      el.appendChild(p);
    }
  };
  document.body.appendChild(js);
})();
