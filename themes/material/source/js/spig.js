//拖动
var _move = false,
    ismove = false, //移动标记,
    isanimate=false,
    _x, _y, //鼠标离控件左上角的相对位置
    move_factor = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, -0.1, -0.2, -0.3, -0.4, -0.5, -0.6, -0.7, -0.75],
    mouseover_msgs=["看我看我看我~~~", "快看我~~~~", "小伙子，这边这边",  "隐身术", "我隐身了！", "你谁，谁啊，谁？"],
    dayStr = ['今天', '明天', '后天'],
    click_msgs_least = ["这个人简直是个怪物！",  "你这样的话，我会很生气的！"],
    click_msgs_most = ["我闪！", "我再闪！~~",  "你敢动我？！", "你再动，你再动！",  "这个人，简直是个皇帝！", "这个是真的牛匹！","这样的操作对我来说不是很正常吗？"];
$(function() {
    if (isindex) { //如果是主页
        var now = (new Date()).getHours();
        if (now > 0 && now <= 6) {
            showMessage(visitor + ' 夜猫子儿，干  嘛，٩(๑❛ᴗ❛๑)۶~', 6000);
        } else if (now > 6 && now <= 11) {
            showMessage(visitor + ' 早上好，你来了啊，(๑*◡*๑)~  嘻嘻……', 6000);
        } else if (now > 11 && now <= 14) {
            showMessage(visitor + ' 中午了呢，(づ｡◕ᴗᴗ◕｡)づ~  嘻嘻……', 6000);
        } else if (now > 14 && now <= 18) {
            showMessage(visitor + ' 干 哈！ ( • ̀ω•́ )~  嘻嘻……', 6000);
        } else {
            showMessage(visitor + ' 想干点儿哈！', 6000);
        }
    }
    else {
        showMessage('欢迎' + visitor + '来到这里《' + title + '》', 6000);
    }
    init();
    otherTagMouseOver();
    otherTagClick();
    boredTalk();
    boredMove();
    scrollbarMove();

});
function init() {
    //初始化小人
    $("#spig").bind("contextmenu", function (e) {
        return false;
    }).animate(
        {
            top: $(".spig").offset().top + 300,
            left: document.body.offsetWidth - 160
        },
        {queue: false, duration: 1000}
    ).mousedown(function (e) {
        if (e.which == 3) {
            showMessage("秘密通道:<br /><a href=\"http://www.loveyatou.top\" title=\"首页\">首页</a>", 10000);
        }
        _move = true;
        _x = e.pageX - parseInt($(this).css("left"));
        _y = e.pageY - parseInt($(this).css("top"));
    });
    var stat_click=0;
    $(".mumu").mouseover(function () {
        $(this).fadeTo("300", 0.3);
        var msg = mouseover_msgs[getRandomNumber(mouseover_msgs.length)];
        if (stat_click > 8 && stat_click % 8 == 0) {
            mouseTouch(msg)
        } else {
            showMessage(msg);
        }
    }).mouseout(function () {
        stat_click++;
        $(this).fadeTo("300", 1)
    }).click(function () {
        var click_msgs = stat_click > 4 ? click_msgs_least.concat(["你摸了我" + stat_click + "次，简直是阔怕！ミﾟДﾟ彡"]) : click_msgs_most;
        mouseTouch(click_msgs[getRandomNumber(click_msgs.length)])
    });
    $("#message").hover(function () {
        $(this).fadeTo("100", 1);
    });
    //移动
    $(document).mousemove(function (e) {
        if (_move) {
            var x = e.pageX - _x;
            var y = e.pageY - _y;
            var wx = $(window).width() - $('#spig').width();
            var dy = $(document).height() - $('#spig').height();
            if (x >= 0 && x <= wx && y > 0 && y <= dy) {
                $("#spig").css({top: y, left: x}); //控件新位置
                ismove = true;
            }
        }
    }).mouseup(function () {
        _move = false;
    });
}
//触动
function mouseTouch(msg) {
    if (!ismove) {
        var distance = getRandomNumber(move_factor.length);
        if (!isanimate) {
            isanimate = true;
            $("#spig").animate(
                {
                    left: document.body.offsetWidth / 2 * (1 + move_factor[distance]),
                    top: document.body.offsetHeight / 2 * (1 + move_factor[distance])
                }, 500,
                'linear',
                function () {
                    showMessage(msg);
                    if (isanimate)  isanimate = false;
                }
            );
        }
    } else {
        ismove = false;
    }
}
//鼠标置于上方
function otherTagMouseOver() {
    $('h2 a').mouseover(function () {
        showMessage('要看看《<span style="color:#0099cc;">' + $(this).text() + '</span>》这篇文章么？');
    });
    $('#prev-page').mouseover(function(){
        showMessage('要翻到上一页吗?');
    });
    $('#next-page').mouseover(function(){
        showMessage('要翻到下一页吗?');
    });
    $('#index-links li a').mouseover(function () {
        showMessage('去 <span style="color:#0099cc;">' + $(this).text() + '</span> 逛逛');
    });
    $('.comments').mouseover(function () {
        showMessage('<span style="color:#0099cc;">' + visitor + '</span> 向评论栏出发吧！');
    });
    $('#submit').mouseover(function () {
        showMessage('确认提交了么？');
    });
    $('#s').mouseover(function () {
        showMessage('输入你想搜索的关键词再按Enter(回车)键就可以搜索啦!');
    });
    $('#go-prev').mouseover(function () {
        showMessage('点它可以后退哦！');
    });
    $('#go-next').mouseover(function () {
        showMessage('点它可以前进哦！');
    });
    $('#refresh').mouseover(function () {
        showMessage('点它可以重新载入此页哦！');
    });
    $('#go-home').mouseover(function () {
        showMessage('点它就可以回到首页啦！');
    });
    $('#addfav').mouseover(function () {
        showMessage('点它可以把此页加入书签哦！');
    });
    $('#nav-two a').mouseover(function () {
        showMessage('嘘，从这里可以进入控制面板的哦！');
    });
    $('.post-category a').mouseover(function () {
        showMessage('点击查看此分类下得所有文章');
    });
    $('.post-heat a').mouseover(function () {
        showMessage('点它可以直接跳到评论列表处.');
    });
    $('#tho-shareto span a').mouseover(function () {
        showMessage('你知道吗?点它可以分享本文到'+$(this).attr('title'));
    });
    $('#switch-to-wap').mouseover(function(){
        showMessage('点击可以切换到手机版博客版面');
    });
}
//点击
function otherTagClick() {
    //鼠标在某些元素上方时
    $('h2 a').click(function () {//标题被点击时
        showMessage('正在用吃奶的劲加载《<span style="color:#0099cc;">' + $(this).text() + '</span>》请稍候');
    });
    $("#author").click(function () {
        showMessage("留下你的尊姓大名！");
        $(".spig").animate(
            {
                top: $("#author").offset().top - 70,
                left: $("#author").offset().left - 170
            },
            {queue: false, duration: 1000});
    });
    $("#email").click(function () {
        showMessage("留下你的邮箱，不然就是无头像人士了！");
        $(".spig").animate(
            {
                top: $("#email").offset().top - 70,
                left: $("#email").offset().left - 170
            },
            {queue: false, duration: 1000});
    });
    $("#url").click(function () {
        showMessage("快快告诉我你的家在哪里，好让我去参观参观！");
        $(".spig").animate(
            {
                top: $("#url").offset().top - 70,
                left: $("#url").offset().left - 170
            },
            {queue: false, duration: 1000});
    });
    $("#comment").click(function () {
        showMessage("认真填写哦！不然会被认作垃圾评论的！我的乖乖~");
        $(".spig").animate(
            {top: $("#comment").offset().top - 70, left: $("#comment").offset().left - 170},
            {queue: false, duration: 1000}
        );
    });
}
//无聊讲点什么
function boredTalk() {
    window.setInterval(function () {
        $.getScript('http://php.weather.sina.com.cn/iframe/index/w_cl.php?code=js&day=2&city=&dfc=1&charset=utf-8', function () {
            var msgs = ["好无聊哦！", "………!………", "^%#&*#%#&*&%*&@%@*&#!", "我可爱吧！嘻嘻!~^_^!~~","谁啊，你啊，好巧啊，谁啊~","从前有座山，山上有座庙，庙里有个老和尚给小和尚讲故事，老和尚说，从前有座山，……"];
            if (window.SWther) {
                var add = window.SWther.add,
                    w = window.SWther.w;
                for (var key in w) {
                    $.each(w[key], function (index, weather) {
                        msgs.push(dayStr[index] + " " + key + " " + weather.s1 + " " + weather.t1 + "℃" + " " + add.update);
                    });
                }
            }
            showMessage(msgs[getRandomNumber(msgs.length)], 10000);
        });
    }, 35000);
}
//无聊动动
function boredMove() {
    window.setInterval(function () {
        $.getScript('http://php.weather.sina.com.cn/iframe/index/w_cl.php?code=js&day=2&city=&dfc=1&charset=utf-8', function () {
            var msgs = ["是不是在找我！~", "好的好的，来了来了！~", "在这里在这里！"];
            if (window.SWther) {
                var add = window.SWther.add,
                    w = window.SWther.w;
                for (var key in w) {
                    $.each(w[key], function (index, weather) {
                        msgs.push(dayStr[index] + " " + key + " " + weather.s1 + " " + weather.t1 + "℃" + " " + add.update);
                        // weather = {city: s,date: SWther.add.now.split(" ")[0] || "",day_weather: q.s1,night_weather: q.s2,day_temp: q.t1,night_temp: q.t2,day_wind: q.p1,night_wind: q.p2};
                    });
                }
            }
            var distance = getRandomNumber(move_factor.length);
            $(".spig").animate(
                {
                    left: document.body.offsetWidth / 2 * (1 + move_factor[distance]),
                    top: document.body.offsetHeight / 2 * (1 + move_factor[distance])
                },
                {duration: 2000, complete: showMessage(msgs[getRandomNumber(msgs.length)])});
        });
    }, 45000);
}
//滚动条
function scrollbarMove() {
    var f = $(".spig").offset().top;
    $(window).scroll(function () {
        $(".spig").animate(
            {top: $(window).scrollTop() + f + 300},
            {queue: false, duration: 1000}
        );
    });
}
//显示消息函数most
function showMessage(a, b) {
    if (b == null) b = 10000;
    $("#message").hide().stop().html(a).fadeIn().fadeTo("1", 1).fadeOut(b);
}
//产生随机数
function getRandomNumber(len){return Math.floor(Math.random() * len)}