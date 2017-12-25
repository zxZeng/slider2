/**
 * Created by zy on 2017/11/24.
 */
"use strict";
//$(function(){
//    var timer1 = setInterval(replay,3000);
//});

function replay(obj){
    obj = obj || {};
    obj.selector = obj.selector || "#slider";
    obj.type = obj.type || "slider";
    obj.width = obj.width || "800px";
    obj.height = obj.height || "500px";
    obj.transitionTime = obj.transitionTime || "1s";
    obj.replayTime = obj.replayTime || "1s";
    obj.autoplay = obj.autoplay || "true";
    obj.dian = obj.dian || "circle";
    var selector = $(obj.selector+" figure");
    var timer1,index1,index2;
    var downWidth,upWidth,s;

    $("body").attr("ondragstart","return false");
    //图片定位
    function ImgPosition(){
        selector.css({
            "position":"absolute",
            "top":0,
            "left":0
        });
        selector.css("display","none");
        $(selector[0]).css("display","block");
    }
    if(obj.type == "fade"){
        ImgPosition();
        timer1=setInterval(fade,3000)
    }else if(obj.type == "slider"){
        ImgPosition();
        timer1 = setInterval(slider,3000);
    }
    // 点点的形状是方形
    if(obj.dian == "square"){
        $(" #circle span").css("border-radius","0");
    }
    // 点点的形状是菱形
    if(obj.dian == "rhombus"){
        $(" #circle span").css({
            "border-radius":"0",
            "transform": "rotate(45deg)"
        });
    }

    // 添加圆圈按钮
    $(obj.selector).append(`
        <div id="circle"></div>
    `);
    for(var i=0;i<selector.length;i++){
        $("#circle").append(`
            <span style="cursor: pointer;" data-index="${i}"></span>
        `)
    }
    let index=0;
    //圆圈按钮自动轮播
    function circle(){
        $(" #circle span").css("border-color","#fff");
        $($(" #circle span")[index]).css("border-color","#FF8015");
    }
    //点击圆圈按钮
    $(" #circle span").click(function(){
        // 淡入淡出
        if(obj.type == "fade"){
            index= $(this).attr("data-index");//获取当前点击的点点的id
            selector.fadeOut();         //所有隐藏
            $(selector[index]).fadeIn();// 当前显示
            //index = id;
            //console.log(index);
            circle();
        //左右滑动
        }else if(obj.type == "slider"){
            var  id = $(this).attr("data-index");
            //点击右边的点点
            if(id>index){
                //所有的图片隐藏
                selector.css({
                    "display":"none"
                });
                //当前的图片显示
                $(selector[index]).css({
                    "display":"block"
                });
                //点击的点点的id对应的图片显示
                $(selector[id]).css({
                    "display":"block",
                    "left":obj.width
                });
                setTimeout(function(){
                    $(selector[index]).css({
                        "left":"-"+obj.width
                    });
                    $(selector[id]).css({
                        "left":0
                    });
                    index =id;
                    circle();
                    //console.log("zuo",index);
                },50);
            }
            //点击左边的点点
            if(id < index){
                //console.log("you",index);
                selector.css({
                    "display":"none"
                });
                $(selector[index]).css({
                    "display":"block"
                });
                $(selector[id]).css({
                    "display":"block",
                    "left":"-"+obj.width
                });
                setTimeout(function(){
                    $(selector[index]).css({
                        "left":obj.width
                    });
                    $(selector[id]).css({
                        "left":0
                    });
                    index =id;
                    circle();
                },50)
            }
        }

    });
    //鼠标移入框框清除定时器
    $(obj.selector).mouseenter(function(){
        clearInterval(timer1)
    });
    //鼠标移出框框清除定时器
    $(obj.selector).mouseleave(function(){
        if(obj.type == "fade"){
            timer1=setInterval(fade,3000)
        }else if(obj.type == "slider"){
            timer1=setInterval(slider,3000)
        }
    });
    //淡入淡出向右轮播
    function fade(){
        index++;
        if(index == selector.length){
            index = 0;
        }
        //console.log("img",index);
        selector.fadeOut();
        $(selector[index]).fadeIn();
        circle();
    }

    //滑动向左轮播
    function slider(){
        index++;
        index1 =index-1;
        index2 =index-2;
        if(index == selector.length){
            index = 0
        }
        if(index2 <0){
           index2 =  selector.length-1;
        }
        selector.css({
            "display":"none"
        });
        $(selector[index1]).css({
            "display":"block"
        });
        $(selector[index]).css({
            "display":"block",
            "left":obj.width
        });

        setTimeout(function(){
            $(selector[index1]).css({
                "left":"-"+obj.width
            });
            $(selector[index]).css({
                "left":0
            });
        },50);
        circle()
    }
    //滑动向右轮播
    function sliderRight(){
        //console.log("FIRST",index);
        index--;
        index1=index+1;
        index2 = index+2;
        if(index<0){
            index = $(selector).length-1;
        }
        if(index2==$(selector).length){
            index2=0
        }
        selector.css({
            "display":"none"
        });
        $(selector[index1]).css({
            "display":"block"
        });
        $(selector[index]).css({
            "display":"block",
            "left":"-"+obj.width
        });

        setTimeout(function(){
            $(selector[index1]).css({
                "left":obj.width
            });
            $(selector[index]).css({
                "left":0
            });
        },50);
       circle();

    }

    //左右拖动
    selector.mousedown(function(e){
        downWidth = e.clientX;
    });
    $(document).mouseup(function(e){
        upWidth = e.clientX;
        s = downWidth - upWidth;
        //console.log(s);
         //向左拖动
        if(s>100){
            if(obj.type == "fade"){
                fade();
            }else if(obj.type == "slider"){
                slider();
            }
        }
        //向右拖动
        if(s<-100){
            if(obj.type == "fade"){
                //向左的基础上减2
                index-=2;
                if(index==-2){
                    index = selector.length-2;
                }
                fade();
            }else if(obj.type == "slider"){
                sliderRight();
            }
        }
    })




}




