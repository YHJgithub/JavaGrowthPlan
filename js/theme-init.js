(function () {
  var k = 'java_growth_roadmap_theme';
  var t = localStorage.getItem(k) || 'dark';
  document.documentElement.setAttribute('data-theme', t);
})();