(function () {
    var RAW_URL = 'https://raw.githubusercontent.com/maks3592/Roblox-script/main/script.lua';

    var btn = document.getElementById('downloadButton');
    var label = btn.querySelector('.btn-label');
    var bar = document.getElementById('progress-bar');
    var progress = document.getElementById('progress-container');
    var percent = document.getElementById('progress-text');
    var done = document.getElementById('done');
    var box = document.getElementById('message-box');
    var boxText = document.getElementById('message-text');
    var closeBtn = document.getElementById('close-message');
    var copyBtn = document.getElementById('copyButton');
    var loader = document.getElementById('loader');

    var reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ================= анимированный космос ================= */
    var canvas = document.getElementById('space');
    var ctx = canvas.getContext('2d');
    var stars = [], shooting = [], W = 0, H = 0, dpr = 1;

    function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        var count = Math.round(Math.min(220, (W * H) / 7000));
        stars = [];
        for (var i = 0; i < count; i++) {
            stars.push({
                x: Math.random() * W,
                y: Math.random() * H,
                z: Math.random() * 0.9 + 0.1,        // глубина: ближе = крупнее и быстрее
                p: Math.random() * Math.PI * 2       // фаза мерцания
            });
        }
    }

    function spawnShooting() {
        shooting.push({
            x: Math.random() * W * 0.8 + W * 0.2,
            y: Math.random() * H * 0.4,
            vx: -(6 + Math.random() * 5),
            vy: 3 + Math.random() * 3,
            life: 1
        });
    }

    var last = 0, nextShot = 1500;
    function frame(t) {
        var dt = Math.min(t - last, 50);
        last = t;
        ctx.clearRect(0, 0, W, H);

        for (var i = 0; i < stars.length; i++) {
            var s = stars[i];
            s.y += s.z * 0.35 * (dt / 16);
            if (s.y > H + 2) { s.y = -2; s.x = Math.random() * W; }
            var tw = 0.55 + 0.45 * Math.sin(t / 600 + s.p);
            ctx.globalAlpha = tw * (0.4 + s.z * 0.6);
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.z * 1.5, 0, 6.2832);
            ctx.fill();
        }

        nextShot -= dt;
        if (nextShot <= 0) { spawnShooting(); nextShot = 2500 + Math.random() * 4500; }

        for (var j = shooting.length - 1; j >= 0; j--) {
            var m = shooting[j];
            m.x += m.vx * (dt / 16);
            m.y += m.vy * (dt / 16);
            m.life -= 0.012 * (dt / 16);
            if (m.life <= 0) { shooting.splice(j, 1); continue; }
            var g = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 8, m.y - m.vy * 8);
            g.addColorStop(0, 'rgba(255,255,255,' + m.life + ')');
            g.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.globalAlpha = 1;
            ctx.strokeStyle = g;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(m.x, m.y);
            ctx.lineTo(m.x - m.vx * 8, m.y - m.vy * 8);
            ctx.stroke();
        }

        requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener('resize', resize);
    if (reduceMotion) {
        // статичные звёзды без движения
        stars.forEach(function (s) {
            ctx.globalAlpha = 0.4 + s.z * 0.6;
            ctx.fillStyle = '#fff';
            ctx.beginPath(); ctx.arc(s.x, s.y, s.z * 1.5, 0, 6.2832); ctx.fill();
        });
    } else {
        requestAnimationFrame(frame);
    }

    /* ================= скачивание ================= */
    function rand(min, max) { return min + Math.random() * (max - min); }

    function saveBlob(text) {
        var blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'script.lua';
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    }

    function setProgress(v) {
        bar.style.width = v.toFixed(1) + '%';
        percent.textContent = Math.floor(v) + '%';
    }

    // «живая» загрузка: случайная общая длительность и неравномерные рывки
    function fakeProgress(totalMs, onDone) {
        var start = performance.now();
        var value = 0;
        (function step() {
            var elapsed = performance.now() - start;
            var target = Math.min(100, (elapsed / totalMs) * 100);
            if (target < 100) {
                // иногда «подвисаем», иногда прыгаем вперёд
                var r = Math.random();
                if (r < 0.12) target = value;
                else if (r > 0.93) target = Math.min(99, target + rand(3, 9));
                value = Math.max(value, Math.min(99, target));
                setProgress(value);
                setTimeout(step, rand(60, 220));
            } else {
                setProgress(100);
                onDone();
            }
        })();
    }

    function showMessage(text) {
        boxText.textContent = text;
        box.classList.add('show');
    }

    btn.addEventListener('click', function () {
        if (btn.disabled) return;
        btn.disabled = true;
        label.textContent = 'Скачиваем…';
        done.style.display = 'none';
        setProgress(0);
        progress.style.display = 'block';

        var duration = rand(1500, 5500);
        var finishedFake = false, finishedFetch = false, text = null;

        function tryFinish() {
            if (!(finishedFake && finishedFetch)) return;
            if (text !== null) saveBlob(text);
            else window.open(RAW_URL, '_blank', 'noopener'); // запасной вариант
            progress.style.display = 'none';
            done.style.display = 'block';
            label.textContent = 'Скачать script.lua';
            btn.disabled = false;
            showMessage('Спасибо за то, что пользуетесь моим скриптом! 🚀');
        }

        fakeProgress(duration, function () { finishedFake = true; tryFinish(); });

        fetch(RAW_URL, { cache: 'no-store' })
            .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
            .then(function (t) { text = t; })
            .catch(function () { text = null; })
            .then(function () { finishedFetch = true; tryFinish(); });
    });

    /* ================= копирование ================= */
    function fallbackCopy(text) {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        var ok = false;
        try { ok = document.execCommand('copy'); } catch (e) {}
        ta.remove();
        return ok;
    }

    copyBtn.addEventListener('click', function () {
        var text = loader.textContent.trim();
        var onResult = function (ok) {
            showMessage(ok
                ? 'Скопировано! Спасибо, что пользуетесь моим скриптом! 💙'
                : 'Не удалось скопировать автоматически — выдели код и скопируй вручную (Ctrl + C).');
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(
                function () { onResult(true); },
                function () { onResult(fallbackCopy(text)); }
            );
        } else {
            onResult(fallbackCopy(text));
        }
    });

    /* ================= модальное окно ================= */
    function hideMessage() { box.classList.remove('show'); }
    closeBtn.addEventListener('click', hideMessage);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') hideMessage(); });
})();
