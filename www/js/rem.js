(function(win){
    var doc=win.document,
        html=doc.documentElement,
        option=html.getAttribute("data-use-rem");
    if(option===null){
        return
    }
    var baseWidth=parseInt(option).toString()==="NaN"?640:parseInt(option);
    var grids=baseWidth/100;
    var clientWidth=html.clientWidth||320;
    html.style.fontSize=clientWidth/grids+"px";
    var testDom=document.createElement("div");
    var testDomWidth=0;
    var adjustRatio=0;
    testDom.style.cssText="height:0;width:1rem;";
    doc.body.appendChild(testDom);
    var calcTestDom=function(){
        testDomWidth=testDom.offsetWidth;
        if(testDomWidth!==Math.round(clientWidth/grids)){
            adjustRatio=clientWidth/grids/testDomWidth;
            var reCalcRem=clientWidth*adjustRatio/grids;
            html.style.fontSize=reCalcRem+"px"
        }else{
            doc.body.removeChild(testDom)
        }
    };
    setTimeout(calcTestDom,20);
    var reCalc=function(){
        var newCW=html.clientWidth;
        if(newCW===clientWidth){return}
        clientWidth=newCW;
        html.style.fontSize=newCW*(adjustRatio?adjustRatio:1)/grids+"px"
    };
    if(!doc.addEventListener){return}
    var resizeEvt="orientationchange" in win?"orientationchange":"resize";
    win.addEventListener(resizeEvt,reCalc,false);
    doc.addEventListener("DOMContentLoaded",reCalc,false);
})(window);