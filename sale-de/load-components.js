/**
 * Loads HTML components into placeholders (in DOM order).
 * Resolves paths relative to main.html so they work with <base href="../">.
 */
(function() {
    function basePath() {
        var path = window.location.pathname || '';
        return path.replace(/\/[^/]*$/, '/') || '/';
    }
    function loadAll() {
        var placeholders = document.querySelectorAll('#MainContent [data-component]');
        var prefix = basePath();
        var i = 0;
        function next() {
            if (i >= placeholders.length) {
                document.documentElement.classList.add('components-loaded');
                return;
            }
            var el = placeholders[i];
            var path = el.getAttribute('data-component');
            i++;
            if (!path) { next(); return; }
            var url = prefix + path;
            fetch(url)
                .then(function(r) { return r.text(); })
                .then(function(html) {
                    el.innerHTML = html;
                    next();
                })
                .catch(function(err) {
                    console.warn('Component failed to load: ' + url, err);
                    next();
                });
        }
        next();
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadAll);
    } else {
        loadAll();
    }
})();
