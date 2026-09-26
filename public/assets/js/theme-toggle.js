(function () {
  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function applyIcon(btn) {
    var icon = btn.querySelector('.theme-toggle-icon');
    if (icon) icon.textContent = currentTheme() === 'dark' ? '☀️' : '🌙';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('themeToggleBtn');
    if (!btn) return;

    applyIcon(btn);

    btn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('gigmapro-theme', next); } catch (e) {}
      applyIcon(btn);
    });
  });
})();
