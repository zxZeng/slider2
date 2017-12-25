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
    //ͼƬ��λ
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
    // ������״�Ƿ���
    if(obj.dian == "square"){
        $(" #circle span").css("border-radius","0");
    }
    // ������״������
    if(obj.dian == "rhombus"){
        $(" #circle span").css({
            "border-radius":"0",
            "transform": "rotate(45deg)"
        });
    }

    // ���ԲȦ��ť
    $(obj.selector).append(`
        <div id="circle"></div>
    `);
    for(var i=0;i<selector.length;i++){
        $("#circle").append(`
            <span style="cursor: pointer;" data-index="${i}"></span>
        `)
    }
    let index=0;
    //ԲȦ��ť�Զ��ֲ�
    function circle(){
        $(" #circle span").css("border-color","#fff");
        $($(" #circle span")[index]).css("border-color","#FF8015");
    }
    //���ԲȦ��ť
    $(" #circle span").click(function(){
        // ���뵭��
        if(obj.type == "fade"){
            index= $(this).attr("data-index");//��ȡ��ǰ����ĵ���id
            selector.fadeOut();         //��������
            $(selector[index]).fadeIn();// ��ǰ��ʾ
            //index = id;
            //console.log(index);
            circle();
        //���һ���
        }else if(obj.type == "slider"){
            var  id = $(this).attr("data-index");
            //����ұߵĵ��
            if(id>index){
                //���е�ͼƬ����
                selector.css({
                    "display":"none"
                });
                //��ǰ��ͼƬ��ʾ
                $(selector[index]).css({
                    "display":"block"
                });
                //����ĵ���id��Ӧ��ͼƬ��ʾ
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
            //�����ߵĵ��
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
    //��������������ʱ��
    $(obj.selector).mouseenter(function(){
        clearInterval(timer1)
    });
    //����Ƴ���������ʱ��
    $(obj.selector).mouseleave(function(){
        if(obj.type == "fade"){
            timer1=setInterval(fade,3000)
        }else if(obj.type == "slider"){
            timer1=setInterval(slider,3000)
        }
    });
    //���뵭�������ֲ�
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

    //���������ֲ�
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
    //���������ֲ�
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

    //�����϶�
    selector.mousedown(function(e){
        downWidth = e.clientX;
    });
    $(document).mouseup(function(e){
        upWidth = e.clientX;
        s = downWidth - upWidth;
        //console.log(s);
         //�����϶�
        if(s>100){
            if(obj.type == "fade"){
                fade();
            }else if(obj.type == "slider"){
                slider();
            }
        }
        //�����϶�
        if(s<-100){
            if(obj.type == "fade"){
                //����Ļ����ϼ�2
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




