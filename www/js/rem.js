~function () {
    function computed(){
        var desW = '640',
            devW = document.documentElement.clientWidth;
        if (devW >= 640) {
            return document.documentElement.style.fontSize = '100px';
        }
        document.documentElement.style.fontSize = devW / desW * 100 + 'px';
    }
    computed();
    window.addEventListener('resize', computed, false);
}();
