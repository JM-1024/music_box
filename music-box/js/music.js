$(document).ready(function(){
    var index=0;
    var li=$(".banner ul li") //获取li元素
    var img=$(".music .m_img img") //获取img元素
    var text=$(".music .m_text") //获取歌曲名
    var prev=$(".music .m_btn .m_prev") //上一首
    var play=$(".music .m_btn .m_play") //播放/暂停
    var next=$(".music .m_btn .m_next") //下一首
    var mp3=$(".music .m_mp3") //媒体元素

    var musicl=$(".music")
    var mlc=$(".music .m_close") //隐藏边栏

    var range=$(".music .range") //音量
    //var rangeNum=$(".music .rangeNum") //音量显示
    var playbar=$(".music .playbar")
    var playBarFlag=false

    var flag=false //歌曲是否播放
    var close=false //播放栏是否隐藏
    mp3.get(0).volume=0.3 //默认音量


    // setInterval(function(){
    //     rangeNum.value=range.value
    // },10)
    setInterval(function(){
        range.change(function(){        
            // rangeNum.val(range.val())
            mp3.get(0).volume=range.val()/100
        })

        mp3.get(0).oncanplay=function(){     
            playBarFlag=true
        }
        playbar.click(function(){
            //console.log(playbar.val())
            mp3.get(0).currentTime=playbar.val()
        })
        if(playBarFlag){
            playbar.attr("max",parseInt(mp3.get(0).duration))
            playbar.val(parseInt(mp3.get(0).currentTime))

            //console.log(parseInt(mp3.get(0).currentTime))
            if(parseInt(mp3.get(0).duration)==parseInt(mp3.get(0).currentTime)){
                nextMusic()

            }
            //console.log(parseInt(mp3.get(0).currentTime))
            //playbar.attr("value",20)
        }


    },500)

    li.click(function(){
        // li.children().removeClass("rotate")  //图片旋转
        // $(this).children().addClass("rotate")
        playBarFlag=false
        index=$(this).index();   //索引
        show(index+1);

        imgName=$(this).attr("datasrc")
        mp3.attr("src",imgName)

        flag=true
        flag=true
        con_play(index,flag)  //播放

    });
    mlc.click(function(){
        close=!close
        if(close){
            musicl.css({
                "left":"-530px",
                "transition":"all .5s linear"
            })
            mlc.text("")
        }else{
            musicl.css({
                "left":"0px",
                "transition":"all .5s linear"
            })
            mlc.text("")
        }
        

    });


    function con_play(idx,flag){
        li.children().removeClass("rotate")
        li.eq(idx).children().addClass("rotate")

        if(flag){
            mp3.get(0).play();
            play.text("")
            play.attr("title","暂停")
            li.eq(idx).children().addClass("rotate")
            
            flag=false
        }else{
            mp3.get(0).pause();
            play.text("")
            play.attr("title","播放")
            li.children().removeClass("rotate")
            flag=true
        }
    }

    play.click(function(){
        playBarFlag=false
        flag=!flag
        //console.log(index)
        con_play(index,flag)
    })
    prev.click(function(){
        playBarFlag=false
        index=(index+3)%4
        show(index+1);
        imgName=li.eq(index).attr("datasrc")
        mp3.attr("src",imgName)
        con_play(index,flag)
    })
    next.click(function(){
        nextMusic()
    })

    function nextMusic(){
        playBarFlag=false
        index=(index+5)%4
        imgName=li.eq(index).attr("datasrc")
        mp3.attr("src",imgName)
        con_play(index,flag)
        show(index+1);
    }
    
    function show(idx){
        change_bgimg(idx);
        change_img_text(idx)        
        
    }
    
    function change_bgimg(idx){
        $("body").css({
            "background":"url(images/" + idx + ".jpg) no-repeat",
            "background-size":"cover"
        })
    }
    function change_img_text(idx){
        img.attr("src","images/" + idx + ".jpg")
        text.html(li.eq(idx-1).attr("title"))
    }
})