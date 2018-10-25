let slides = (wrap, curNum) => {

	let options = $.extend({
		//滚动容器
		wrapper : document.getElementById(wrap.id),
		//是否自动滚动
		auto : false,
		//滚动速度
		speed : 6000 ,
		//默认滚动宽度为屏幕宽度
		scrollWidth: document.getElementById(wrap.id).offsetWidth
	}, wrap);

	let wrapper = options.wrapper,
		auto = options.auto,
		speed = options.speed,
		item = wrapper && wrapper.children,
		//clone前banner图数
		length = item && item.length,
		//小点box
		btnBoxs,
		//小点
		ul,
		Arraylis,
		//滚动一屏的宽度
		docWidth = options.scrollWidth,
		//开始数
		num = curNum || 0,
		//第一张
		firstClone,
		//最后一张
		lastClone,
		//定时器
		timer,
		//自动轮播定时器
		autoTimer,
		//判断滑动状态
		start = true,
		//判断触摸状态
		touchStaus = true,
		//触摸位置
		touchX,
		touchY,
		//滑动最小距离
		distance = 20,
		//滑动位置
		release, 
		//慢速滑动位置
		slowRelease,
		//开始时间
		startDate, 
		//结束时间
		endDate, 
		//滑动最小时间
		diff = 200, 
		xMax = docWidth * (length + 1),
		//动画平移位置
		x,
		flag = false,
		//滑动比
		proportion = 45 / docWidth,
		xTotal,
		translateX, 
		transform,
		transformLength,
		slideTransformArr = [0, 45, 90, 135, 180, 225, 270, 315],
		swiperSlide = wrapper.getElementsByClassName('swiper-slide');

	/**
	* 滑动后轮播滚动效果
	*/
	let touchEndScroll = callback => {

		Array.prototype.forEach.call(swiperSlide, function (o, i) {
			// console.log(o, i)
			o.style.webkitTransform = `rotateY(${slideTransformArr[i] + num * 45}deg)`;
		});

		selectActive();
	}

	/**
	* 左滑动
	*/
	let leftHandlerEvent = () => {

		//if (!start) return;
		start = false;
		num --;
		console.log(num)
		// if(num == -swiperSlide.length){
		// 	// num = 0;
		// 	return;
		// }
		touchEndScroll();
	}

	/**
	* 右滑动
	*/
	let rightHandlerEvent = () => {

		//if (!start) return;
		start = false;
		num ++;
		if(num == 1){
			num = 0;
			return;
		}
		touchEndScroll();
	}

	/**
	* 滑动事件
	*/
	let swipe = () => {

		wrapper.addEventListener('touchstart', touchstartTouchX, false);
		wrapper.addEventListener('touchmove', touchmoveTouchX, false);
		wrapper.addEventListener('touchend', touchendTouchX, false);
	}

	/**
	* 滑动开始
	*/
	let touchstartTouchX = e => {

		startDate = + new Date();
		touchX = e.touches[0] && e.touches[0].pageX;
		touchY = e.touches[0] && e.touches[0].pageY;
	}

	//获取当前轮播图是否有值
	let getCurVal = () => {
		
	}

	/**
	* 获取轮播图translate
	*/
	let getTranslateX = () => {
		
		return slideTransformArr.map(function (item) {
		  return item +  num * 45;
		});
	}

	/**
	* touchmove轮播图移动
	*/
	let touchmoveTouchX = e => {

		//滑动位置
		slowRelease = e.changedTouches[0] && e.changedTouches[0].pageX;

		//滑动距离
		x = slowRelease - touchX;
		//如果是左右滑banner去掉浏览器默认事件
		if (x < -5 || x > 5) {
			e.preventDefault();
		}
		
		//滑动一次只取一次值
		if (touchStaus) {
			translateX = getTranslateX();
		}

		//滑动状态为未结束
		touchStaus = false;
		xTotal = parseInt(x*proportion);

		if (xTotal > 0 && num == 0 || xTotal < 0 && num == -(item.length - 1)) {
			flag = false;
			return;
		}
		flag = true;
		Array.prototype.forEach.call(swiperSlide, function (o, i) {

			// o.style.webkitTransform = `rotateY(${translateX[i] + xTotal}deg)`;
		});
	}

	/**
	* 滑动结束轮播图滚动
	*/
	let touchendTouchX = e => {
		if (!flag) return;

		//一次滑动结束
		touchStaus = true;
		endDate = + new Date();
		if(endDate - startDate > diff) {
			//滑动的慢
			if ((x/docWidth) < -0.2) {
				leftHandlerEvent();
				return;
			} else if ((x/docWidth) > 0.2) {
				//if (num <= 0) return;
				rightHandlerEvent();
				return;
			}
			Array.prototype.forEach.call(swiperSlide, function (o, i) {
				o.style.webkitTransform = `rotateY(${translateX[i] + num}deg)`;
			});
		} else if ( 30 < (endDate - startDate) <= diff) {
			if (touchY - e.changedTouches[0].pageY < 20 || touchY - e.changedTouches[0].pageY > -20) {
				//滑动的快
				release = e.changedTouches[0] && e.changedTouches[0].pageX;
				if (release - touchX > distance) {
					console.log(num, '--num---');
					//if (num <= 0) return;

					rightHandlerEvent();
				} else if (touchX - release > distance) {
					leftHandlerEvent();
				}
			}
		}else{
			console.log('234567')
		}
	}

	let selectActive = () => {
		$(".gearDate").hide();
		$('#' + wrap.id).find('.swiper-slide').removeClass('active');
		$('#' + wrap.id).find('.swiper-slide').eq( -num%8 ).addClass('active');
		var index=$("#"+ wrap.id).find(".swiper-slide.active").attr("data-id");
		// if(index==1){
		// 	$("#activedSted").removeClass().addClass("active1");
		// 	$(".step-btn").hide();
		// }else if(index==2){
		// 	$("#activedSted").removeClass().addClass("active2");
		// 	$(".step-btn").hide();
		// }else if(index==3){
		// 	$(".step-btn").hide();
		// 	$("#activedSted").removeClass().addClass("active3")
		// }else{
		// 	$(".step-btn").show();
		// 	$("#activedSted").removeClass().addClass("active4");
		// 	if($('#'+ wrap.id +' .swiper-slide1').find("li.active").length==1 && $('#picktime').val()!="" && $('.swiper-slide3').find("li.active").length==1  && $('.swiper-slide4').find("li.active").length==1){
		// 		$("#activedSted").removeClass().addClass("active5")
		// 		$(".step-btn").find("button").removeClass("disabled");
		// 	}
			
		// }
	}

	/**
	* 轮播图初始化
	*/
	let init  = () => {

		if (length <= 1) return;
		//滑动事件绑定
		swipe();
	}

	!!wrap && !!item && init();
	selectActive();
}

$(function () {
	// window.fnc = slides;
	var preIndex = 0;
	var aBtn = $('.tab-btn span');
	var aDiv = $('.swiper-container .swiper-wrapper');
	for(let i = 0; i < aBtn.length; i++){
		(function (index){
			aBtn[index].onclick = ()=>{
				if(index === preIndex)return;
				console.log(preIndex, index);
				aBtn[preIndex].className = '';
				aDiv[preIndex].className = 'swiper-wrapper';
				aBtn[index].className = 'on';
				aDiv[index].className = 'swiper-wrapper on';
				preIndex = index;
			}
		})(i);
	}
	
	slides({
		id: 'slides1'
	}, 0);
	slides({
		id: 'slides2'
	}, 0);
	slides({
		id: 'slides3'
	}, 0);
});