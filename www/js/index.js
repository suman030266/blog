$(document).on('touchstart touchmove', function(e) {
    e.preventDefault();
});
function cubeRender() {
    var $cubeBox = $('.cubeBox'),
        $box = $cubeBox.find('.box');
    var touchBegin = function (e) {
        var point = e.changedTouches[0];
        $(this).attr({
            strX: point.clientX,
            strY: point.clientY,
            isMove: false,
            changeX: 0,
            changeY: 0
        });
    };

    var touching = function (e) {
        var point = e.changedTouches[0],
            $this = $(this);
        var changeX = point.clientX - parseFloat($this.attr('strX')),
            changeY = point.clientY - parseFloat($this.attr('strY'));
        if (Math.abs(changeX) > 10 || Math.abs(changeY) > 10) {
            $this.attr({
                isMove: true,
                changeX: changeX,
                changeY: changeY
            });
        }
    };

    var touchEnd = function (e) {
        var point = e.changedTouches[0],
            $this = $(this);
        var isMove = $this.attr('isMove'),
            changeX = parseFloat($this.attr('changeX')),
            changeY = parseFloat($this.attr('changeY')),
            rotateX = parseFloat($this.attr('rotateX')),
            rotateY = parseFloat($this.attr('rotateY'));
        if (isMove === 'false') return;

        rotateX = rotateX - changeY / 3;
        rotateY = rotateY + changeX / 3;
        $this.css(`transform`, `scale(.6) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`).attr({
            rotateX: rotateX,
            rotateY: rotateY
        });
    };

    return {
        init: function () {
            $cubeBox.css('display', 'block');

            //=>事件绑定实现相关效果
            $box.attr({
                rotateX: -30,
                rotateY: 45
            }).on({
                touchstart: touchBegin,
                touchmove: touching,
                touchend: touchEnd
            });

            //=>每一个页面的点击操作
            $box.find('li').tap(function () {
                var index = $(this).index();
                switch(index){
                    case 0:
                        window.location.href = location.href + 'pro-intro.html';
                        break;
                    case 1:
                        window.location.href = location.href + 'school-intro.html';
                        break;
                    case 2:
                        window.location.href = location.href + 'article1.html';
                        break;
                    case 3:
                        window.location.href = location.href + 'article2.html';
                        break;
                    case 4:
                        window.location.href = location.href + 'teacher.html';
                        break;
                    case 5:
                        window.location.href = location.href + 'touch-us.html';
                        break;
                }
                // /pro-intro.html
                // $cubeBox.css('display', 'none');
                // var index = $(this).index();
                // detailRender.init(index);
            });
        }
    }
}

/*--DETAIL--*/
var detailRender = (function ($) {
    var $detailBox = $('.detailBox'),
        $cubeBox = $('.cubeBox'),
        $returnLink = $detailBox.find('.returnLink'),
        swipeExample = null;
    var $makisuBox = $('#makisuBox');

    var change = function (example) {
        var {slides:slideAry, activeIndex}=example;

        //=>PAGE1单独处理
        if (activeIndex === 0) {
            $makisuBox.makisu({
                selector: 'dd',
                overlap: 0.6,
                speed: 0.8
            });
            $makisuBox.makisu('open');
        } else {
            $makisuBox.makisu({
                selector: 'dd',
                overlap: 0,
                speed: 0
            });
            $makisuBox.makisu('close');
        }

        //=>给当前活动块设置ID,其它块移除ID
        [].forEach.call(slideAry, function(item, index){
            if (index === activeIndex) {
                item.id = 'page' + (activeIndex + 1);
                return;
            }
            item.id = null;
        });
    };

    return {
        init: function(argIndex){
            var index = argIndex || 0;
            $detailBox.css('display', 'block');

            //=>INIT SWIPER
            if (!swipeExample) {
                //=>RETURN
                $returnLink.tap(function(){
                    $detailBox.css('display', 'none');
                    $cubeBox.css('display', 'block');
                });

                swipeExample = new Swiper('.swiper-container', {
                    effect: 'coverflow',
                    onInit: change,
                    onTransitionEnd: change
                });
            }

            index = index > 5 ? 5 : index;
            swipeExample.slideTo(index, 0);
        }
    }
})(Zepto);

cubeRender().init();
