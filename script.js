(function () {
    var RAW_URL = 'https://raw.githubusercontent.com/maks3592/Roblox-script/main/script.lua';

    var btn = document.getElementById('downloadButton');
    var bar = document.getElementById('progress-bar');
    var progress = document.getElementById('progress-container');
    var check = document.getElementById('checkmark');
    var smiley = document.getElementById('smiley');
    var box = document.getElementById('message-box');
    var closeBtn = document.getElementById('close-message');
    var copyBtn = document.getElementById('copyButton');
    var copyStatus = document.getElementById('copy-status');
    var loader = document.getElementById('loader');

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

    function finish() {
        check.style.display = 'block';
        smiley.style.display = 'block';
        box.style.display = 'block';
        btn.disabled = false;
    }

    btn.addEventListener('click', function () {
        btn.disabled = true;
        check.style.display = 'none';
        smiley.style.display = 'none';
        bar.style.width = '0%';
        progress.style.display = 'block';
        // запускаем анимацию на следующем кадре
        requestAnimationFrame(function () {
            requestAnimationFrame(function () { bar.style.width = '100%'; });
        });

        var animation = new Promise(function (resolve) { setTimeout(resolve, 2000); });
        var download = fetch(RAW_URL, { cache: 'no-store' })
            .then(function (r) {
                if (!r.ok) throw new Error('HTTP ' + r.status);
                return r.text();
            })
            .then(saveBlob)
            .catch(function () {
                // запасной вариант — открыть файл напрямую
                window.open(RAW_URL, '_blank', 'noopener');
            });

        Promise.all([animation, download]).then(function () {
            progress.style.display = 'none';
            finish();
        });
    });

    closeBtn.addEventListener('click', function () { box.style.display = 'none'; });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') box.style.display = 'none';
    });

    copyBtn.addEventListener('click', function () {
        var text = loader.textContent.trim();
        var done = function (ok) {
            copyStatus.textContent = ok ? 'Скопировано ✔' : 'Не удалось скопировать — выдели код вручную';
            setTimeout(function () { copyStatus.textContent = ''; }, 2500);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
        } else {
            done(false);
        }
    });
})();
