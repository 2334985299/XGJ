var audio = document.querySelector('audio')
var play = document.querySelector('.play')
var dong = document.querySelector('.dong')

// 暂停/播放
play.onclick = function () {
    this.classList.toggle('fa-play')
    this.classList.toggle('fa-pause')
    // 判断音频是否暂停
    if (audio.paused) {
        audio.play()
        dong.style.animationPlayState = 'running'
        document.querySelector('.concollect').style.display = 'block'
    } else {
        audio.pause()
        dong.style.animationPlayState = 'paused'
        document.querySelector('.concollect').style.display = 'none'
    }
}

var totalTime = 0   // 定义全局变量
audio.oncanplay = function () {
    totalTime = audio.duration   // 获得音频总时长
    document.querySelector(".total-time").innerHTML = setTime(totalTime)
}

// 音频时长变化事件
audio.ontimeupdate = function () {
    var currTime = audio.currentTime  // 获得当前时长
    document.querySelector('.curr-time').innerHTML = setTime(currTime)
    // 进度条变化
    document.querySelector(".current").style.width = currTime / totalTime * 100 + "%"
}

// 通过鼠标点击进度条跳转播放位置
// 鼠标点击的位置
var total = document.querySelector('.total')
total.onclick = function (e) {
    var x = e.offsetX
    audio.currentTime = x / this.offsetWidth * totalTime
    // console.log(audio.currTime)
    if (audio.currentTime <= 0) {
        document.querySelector('.play').classList.toggle("fa-pause")
        document.querySelector('.play').classList.toggle("fa-play")
        dong.style.animationPlayState = 'running'
    }
}

// 时长格式的处理
function setTime(time) {
    var m = Math.floor(time % 3600 / 60)
    var s = Math.floor(time % 60)
    m = m >= 10 ? m : "0" + m
    s = s >= 10 ? s : "0" + s
    return m + ":" + s
}


// 音频数组对象
var music = [
    {
        Name: "《被神明写的歌》",
        Secname: "",
        Url: "./mp3/被神明写的歌.mp3",
        Img: "./image/被神明写的歌.jpg"
    },{
        Name: "《热恋夏季》",
        Secname: "陆杰 <i class='fas fa-compact-disc'></i>",
        Url: "./mp3/热恋夏季.mp3",
        Img: "./image/热恋夏季.jpg"
    },{ 
        Name: "《生生世世爱》",
        Secname: "吴雨霏 <i class='fas fa-compact-disc'></i>",
        Url: "./mp3/生生世世爱.mp3",
        Img: "./image/生生世世爱.jpg"
    },{
        Name: "《此生不换》",
        Secname: "青鸟飞鱼 <i class='fas fa-compact-disc'></i>",
        Url: "./mp3/此生不换.mp3",
        Img: "./image/此生不换.jpg"
    },{
        Name: "《One Last Time》",
        Secname: "",
        Url: "./mp3/One Last Time.mp3",
        Img: "./image/One Last Time.jpg"
    },{
        Name: "《Catch My Breath》",
        Secname: " ",
        Url: "./mp3/凯. - Catch My Breath [qmms].mp3",
        Img: "./image/audio0.jpg"
    }, {
        Name: "《反方向的钟》",
        Secname: "周杰伦 <i class='fas fa-compact-disc'></i>",
        Url: "./mp3/九三 - 反方向的钟 (Live).mp3",
        Img: "./image/audio1.jpg"
    }, {
        Name: "《伴你成长》",
        Secname: "张雨桐 <i class='fas fa-compact-disc'></i>",
        Url: "./mp3/伴你成长-白挺.mp3",
        Img: "./image/伴你成长-白挺.jpg"
    }, {
        Name: "《晴天》",
        Secname: "张雨桐 <i class='fas fa-compact-disc'></i>",
        Url: "./mp3/张雨桐 - 晴天.mp3",
        Img: "./image/audio.png"
    }, {
        Name: "《回忆拼给你》",
        Secname: "王贰浪 <i class='fas fa-compact-disc'></i>",
        Url: "./mp3/把回忆拼好给你.mp3",
        Img: "./image/bgimg1.jpg"
    },{
        Name: "《主角》",
        Secname: "马里奥 <i class='fas fa-compact-disc'></i>",
        Url: "./mp3/主角.mp3",
        Img: "./image/audio2.jpg"
    }
]

// 切换部分
var last = document.querySelector('.last')
var next = document.querySelector('.next')
var b = document.querySelector('b')
var b2 = document.querySelector('b:nth-child(2)')
var n = music.length - 1
var Loop = 0   // 播放方式指针
// 下一首
next.onclick = function () {
    Next()
}
function Next() {
    n += 1
    if (n == music.length || n == -1) { n = 0 }
    musicList(n)
    // console.log(n)
    NextLast()
}
// 上一首
last.onclick = function () {
    n -= 1
    if (n == -1 || n == music.length) { n = music.length - 1 }
    musicList(n)
    // console.log(n)
    NextLast()
}
// 随机一首
function randomMusic() {
    n = parseInt(Math.random()*10)
    musicList(n)
    console.log("随机一首: "+music[n].Name)
    NextLast()
    // audio.onended = function () {randomMusic()}
}

var img = document.querySelector("img")
// 音频列表
function musicList(n) {
    b.innerHTML = music[n].Name
    b2.innerHTML = music[n].Secname
    audio.src = music[n].Url
    img.src = music[n].Img
}

// 切换歌曲后的播放操作
function NextLast() {
    if (audio.paused) {
        audio.play()
        dong.style.animationPlayState = 'running'
        document.querySelector('.concollect').style.display = 'block'
    }
    if (play.classList.contains('fa-play')) {
        play.classList.toggle('fa-play')
        play.classList.toggle('fa-pause')
    }
}


// 当前歌曲播放完毕后播放下一首，html里audio标签不要放loop属性
audio.onended = function () {
    Loop == 0 ? Next() : audio.play()
}

var loop = document.querySelector(".loop")
// 播放方式选择
loop.onclick = function () {
    Loop++
    loop.classList.toggle("fa-random")
    loop.classList.toggle("fa-sync-alt")
    if (Loop == 2) Loop = 0
}

// 音乐列表显示
var list = document.querySelector(".list")
var listShow = document.querySelector(".listShow")
var listToggle = 1
list.onclick = function () {
    // document.write("<strong>音乐列表</strong>")
    // for (i = 0; i < music.length; i++) {
    //     document.write("<br>" + music[i].Name)
    // }
    var ln = ""
    for (i = 0; i < music.length; i++) {
        ln += ("<br>" + music[i].Name)
    }
    listShow.style.color = "white"
    listShow.style.position = "absolute"
    listShow.style.top = "65px"
    listShow.style.left = "27%"
    listShow.style.lineHeight = "22px"
    listShow.innerHTML = "<strong>音乐列表</strong> <i class='fas fa-compact-disc'></i>" + ln    
    listToggle++
    if(listToggle%=2){listShow.innerHTML=''}
}


var video = document.querySelector('video')
var plays = document.querySelector('.plays')
// var all=0
// 视频播放暂停
plays.onclick = function () {            
    if (video.paused) {               
        // if(all==0) video.webkitRequestFullscreen()
        video.play()
        console.log("播放")
        // all++;
    } else {
        video.pause()                
    }
}

var vm = new Vue({
    el: '#app',
    data:{
        url: './video.html'
    }
})