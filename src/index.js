require("jquery");
window.Zjs = window.$ = window.zjs = window.Yzjs = window.yzjs = window.Yz = window.yz = window.$$app = require("./js/play.zjs");
console.log(`${'\n'} %c Qsjs ${VERSION}  %c http://qsjs.yiruan.wang ${'\n'}${'\n'}`, 'color: #fadfa3; background: #030307; padding:5px 0;', 'background: #fadfa3; padding:5px 0;');

var isiPad = navigator.userAgent.match(/iPad|iPhone|Android|Linux|iPod/i) != null;
// var urls = 'https://cn3.zhongshanchemical.com/hls/20190409/6322654a2f16a17837184fe06b1b955b/1554742206/index.m3u8';
// var urls = 'http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4';
var pic = '';
var jump = '';
var _peerId = '', _peerNum = 0, _totalP2PDownloaded = 0, _totalP2PUploaded = 0;
// var dptype="hls";
var playerType= zjs.gettype('type');
var urls= zjs.gettype('url');

if (isiPad) {
    var pic = 'dp/loading.gif'
}
var type = urls.indexOf('.m3u8') > -1 ? 'hls' : 'auto';
var videoObject = {
    container: '#dplayer', //“#”代表容器的ID，“.”或“”代表容器的class
    variable: 'player', //该属性必需设置，值等于下面的new chplayer()的对象
    loaded: 'loadedHandler', //监听播放器加载成功
    video: urls,
    autoplay: true,
    html5m3u8: true,
    hlsjsConfig: { // hlsjs和CDNBye的配置参数
        debug: false,
        p2pConfig: {
            logLevel: true,
            live: false, // 如果是直播设为true
        }
    }
};
if(playerType=="ck" | playerType=="" )
{
    var player = new ckplayer(videoObject);

    updateStatsck();
    function loadedHandler() { //播放器加载后会调用该函数

        if (zjs.cookie.get(urls) > 0) {
            player.videoSeek(zjs.cookie.get(urls));
            player.addListener('time', Renewaltime);
        } else {
            player.addListener('time', timeHandler);
        }

    }
    //
    function Renewaltime(t) {
        //console.log('续播当前播放的时间：' + t);
        zjs.cookie.set(urls, t, 30);

    }
    function timeHandler(t) {
        //console.log('当前播放的时间：' + t);
        zjs.cookie.set(urls, t, 30);

    }
    function updateStatsck() {
        if (type == 'hls') {
            var text = 'P2P正在为您加速';
        } else {
            var text = '加油你是好样的';
        }
        document.getElementById('stats').innerText = text;
    }
}else
if(playerType=="dp" | playerType==null)
{
    var dp = new DPlayer({
        container: document.getElementById('dplayer'),
        autoplay: true,
        video: {
            url: urls,
            type: type
        },
        hlsjsConfig: {
            p2pConfig: {
                logLevel: true,
                live: false,
            }
        }
    });
    dp.on('loadeddata', function() {
        zjs.cookie.get(urls) ? dp.seek(zjs.cookie.get(urls)) : dp.notice("视频已就绪");
        dp.on('timeupdate', function() {
            if(zjs.cookie) zjs.cookie.set(urls, dp.video.currentTime, 30);
        });
    });
    dp.on("fullscreen", function () { $("#stats").hide(); });
    dp.on("fullscreen_cancel", function (){ $("#stats").show(); });
    dp.on('ended', function() {
        if(jump) { dp.notice("视频已结束,为您跳到下一集"); top.location.href = jump;  }
    });

    dp.on('stats', function (stats) {
        _totalP2PDownloaded = stats.totalP2PDownloaded;
        _totalP2PUploaded = stats.totalP2PUploaded;
        updateStats();
    })
    dp.on('peerId', function (peerId) {
        _peerId = peerId;
    })
    dp.on('peers', function (peers) {
        _peerNum = peers.length;
        updateStats();
    });
    function updateStats() {
        var text = 'CDNBye P2P正在为您加速' + (_totalP2PDownloaded/1024).toFixed(2)
            + 'MB 已分享' + (_totalP2PUploaded/1024).toFixed(2) + 'MB' + ' 连接节点' + _peerNum + '个';
        document.getElementById('stats').innerText = text
    }
}else
{
    alert("不正确的配置项");

}