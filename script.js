(function () {
    var RAW_URL = 'https://raw.githubusercontent.com/maks3592/Roblox-script/main/script.lua';

    /* ================= переводы ================= */
    var I18N = {
        en: {
            subtitle: 'Download the script and make the most of it',
            download: 'Download script.lua',
            downloading: 'Downloading…',
            or: 'or copy the short loader',
            copy: 'Copy code',
            featuresTitle: 'What it does',
            f1: '⚡ Instant teleportation to chests',
            f2: '🖥️ Handy menu — show/hide with the <kbd>End</kbd> key',
            f3: '🧩 Works with popular executors',
            f4: '🛑 Some chests require quests',
            howTitle: 'How to use',
            s1: 'Press “Download script.lua” or copy the loader.',
            s2: 'Join <a href="https://www.roblox.com/games/5256165620" target="_blank" rel="noopener">3-2-1 Blast Off Simulator!</a>',
            s3: 'Paste the code into your executor and press Execute.',
            author: 'Author:',
            risk: 'Use at your own risk.',
            thanksDownload: 'Thank you for using my script! 🚀',
            thanksCopy: 'Copied! Thank you for using my script! 💙',
            copyFail: 'Could not copy automatically — select the code and copy it manually (Ctrl + C).',
            langAria: 'Switch to Russian',
            langLabel: 'RU',
            close: 'Close'
        },
        ru: {
            subtitle: 'Скачай скрипт и используй его на максимум',
            download: 'Скачать script.lua',
            downloading: 'Скачиваем…',
            or: 'или скопируй короткий загрузчик',
            copy: 'Скопировать код',
            featuresTitle: 'Что умеет скрипт',
            f1: '⚡ Мгновенная телепортация к сундукам',
            f2: '🖥️ Удобное меню — открыть/скрыть клавишей <kbd>End</kbd>',
            f3: '🧩 Работает с популярными executor\'ами',
            f4: '🛑 Для некоторых сундуков нужны квесты',
            howTitle: 'Как пользоваться',
            s1: 'Нажми «Скачать script.lua» или скопируй загрузчик.',
            s2: 'Зайди в <a href="https://www.roblox.com/games/5256165620" target="_blank" rel="noopener">3-2-1 Blast Off Simulator!</a>',
            s3: 'Вставь код в executor и нажми Execute.',
            author: 'Автор:',
            risk: 'Используй на свой риск.',
            thanksDownload: 'Спасибо за то, что пользуетесь моим скриптом! 🚀',
            thanksCopy: 'Скопировано! Спасибо, что пользуетесь моим скриптом! 💙',
            copyFail: 'Не удалось скопировать автоматически — выдели код и скопируй вручную (Ctrl + C).',
            langAria: 'Switch to English',
            langLabel: 'EN',
            close: 'Закрыть'
        }
    };

    var lang = 'en';
    try {
        var saved = localStorage.getItem('lang');
        if (saved === 'ru' || saved === 'en') lang = saved;
    } catch (e) {}
    var q = /[?&]lang=(ru|en)/.exec(location.search);
    if (q) lang = q[1];

    function t(key) { return I18N[lang][key]; }

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
    var langBtn = document.getElementById('langButton');
    var langLabel = document.getElementById('langLabel');
    var downloading = false;
    var lastMessageKey = null;

    function applyLang() {
        document.documentElement.lang = lang;
        var nodes = document.querySelectorAll('[data-i18n]');
        for (var i = 0; i < nodes.length; i++) {
            var key = nodes[i].getAttribute('data-i18n');
            if (key === 'download' && downloading) continue;
            nodes[i].innerHTML = t(key);
        }
        langLabel.textContent = t('langLabel');
        langBtn.setAttribute('aria-label', t('langAria'));
        langBtn.title = t('langAria');
        closeBtn.setAttribute('aria-label', t('close'));
        if (downloading) label.textContent = t('downloading');
        if (lastMessageKey && box.classList.contains('show')) boxText.textContent = t(lastMessageKey);
    }

    langBtn.addEventListener('click', function () {
        lang = lang === 'en' ? 'ru' : 'en';
        try { localStorage.setItem('lang', lang); } catch (e) {}
        applyLang();
    });

    /* ================= анимированный космос ================= */
    var reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
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
                z: Math.random() * 0.9 + 0.1,
                p: Math.random() * Math.PI * 2
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
    function frame(ts) {
        var dt = Math.min(ts - last, 50) * (reduceMotion ? 0.4 : 1);
        last = ts;
        ctx.clearRect(0, 0, W, H);

        for (var i = 0; i < stars.length; i++) {
            var s = stars[i];
            s.y += s.z * 0.35 * (dt / 16);
            if (s.y > H + 2) { s.y = -2; s.x = Math.random() * W; }
            var tw = 0.55 + 0.45 * Math.sin(ts / 600 + s.p);
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
    requestAnimationFrame(frame);

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
            if (elapsed >= totalMs) { setProgress(100); onDone(); return; }
            var target = (elapsed / totalMs) * 100;
            var r = Math.random();
            if (r < 0.12) target = value;                                  // подвисли
            else if (r > 0.93) target = target + rand(3, 9);               // рывок вперёд
            value = Math.max(value, Math.min(99, target));
            setProgress(value);
            setTimeout(step, rand(80, 260));
        })();
    }

    function showMessage(key) {
        lastMessageKey = key;
        boxText.textContent = t(key);
        box.classList.add('show');
    }

    btn.addEventListener('click', function () {
        if (downloading) return;
        downloading = true;
        btn.disabled = true;
        label.textContent = t('downloading');
        done.style.display = 'none';
        setProgress(0);
        progress.style.display = 'block';

        var duration = rand(2000, 9000);   // от 2 до 9 секунд
        var finishedFake = false, finishedFetch = false, text = null;

        function tryFinish() {
            if (!(finishedFake && finishedFetch)) return;
            // файл сохраняется только когда полоса дошла до 100%
            if (text !== null) saveBlob(text);
            else window.open(RAW_URL, '_blank', 'noopener');
            progress.style.display = 'none';
            done.style.display = 'block';
            downloading = false;
            label.textContent = t('download');
            btn.disabled = false;
            showMessage('thanksDownload');
        }

        fakeProgress(duration, function () { finishedFake = true; tryFinish(); });

        fetch(RAW_URL, { cache: 'no-store' })
            .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
            .then(function (body) { text = body; })
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
        var onResult = function (ok) { showMessage(ok ? 'thanksCopy' : 'copyFail'); };
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

    applyLang();
})();
