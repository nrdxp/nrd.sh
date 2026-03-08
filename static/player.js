// Custom audio player — progressive enhancement
// Finds all .media-sidebar containers with <audio> and replaces native controls with styled ones.
// No-JS fallback: native player shown, custom controls stay hidden.
(function () {
    document.querySelectorAll('.media-sidebar').forEach(function (w) {
        var a = w.querySelector('audio');
        if (!a) return;

        var p = w.querySelector('.listen-player');
        if (!p) return;

        var btn = w.querySelector('.listen-play');
        var track = w.querySelector('.listen-track');
        var bar = w.querySelector('.listen-progress');
        var time = w.querySelector('.listen-time');
        var dl = w.querySelector('.listen-dl');

        // Hide native, show custom
        a.removeAttribute('controls');
        a.style.display = 'none';
        p.removeAttribute('hidden');

        // Wire download link
        if (dl) {
            var src = a.querySelector('source');
            dl.href = src ? src.src : a.src;
        }

        function fmt(s) {
            s = Math.floor(s);
            var m = Math.floor(s / 60);
            return m + ':' + (s % 60 < 10 ? '0' : '') + (s % 60);
        }

        btn.onclick = function () { a.paused ? a.play() : a.pause(); };
        a.onplay = function () { btn.textContent = '\u275A\u275A'; };
        a.onpause = function () { btn.textContent = '\u25B6'; };
        a.ontimeupdate = function () {
            if (a.duration) bar.style.width = (a.currentTime / a.duration * 100) + '%';
            time.textContent = fmt(a.currentTime) + (a.duration ? ' / ' + fmt(a.duration) : '');
        };
        track.onclick = function (e) {
            if (a.duration) a.currentTime = (e.offsetX / track.offsetWidth) * a.duration;
        };
    });
})();
