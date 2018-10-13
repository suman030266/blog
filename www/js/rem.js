~function () {
    let computed = function () {
        let desW = 640;
        let devW = document.documentElement.clientWidth;
        if (devW >= 640) {
            return document.documentElement.style.fontSize = '100px';
        }
        document.documentElement.style.fontSize = devW / desW * 100 + 'px';
    };
    computed();
    window.addEventListener('resize', computed, false);
}();
