var canPlay = false;
var isPlay = false;
var all_time = 0;
var loop = false;
var ifShowVolume = false;
var videoNode = document.querySelector('#video');
var playNode = document.querySelector('.control_left_play');
var nextNode = document.querySelector('.control_left_next');
var timeNode = document.querySelector('.time');
var moveBtnNode = document.querySelector('.move_btn');
var nowProgressNode = document.querySelector('.now_progress');
var allProgressNode = document.querySelector('.all_progress');
var volumeControls = document.querySelectorAll('.volume_control');
var nowVolumeNode = document.querySelector('.now_volume');
var FullNode = document.querySelector('.control_right_quanping');
//1.设置资源路径
videoNode.src = 'static/video/kobe.mp4';
//2.设置视频的第一帧
//videoNode.poster = 'static/image/kobe.jpeg'; 设置这个会导致src 设置失败

videoNode.loop = loop;
//3.重新加载
document.querySelector('.control_right_reload').onclick=function(){
  videoNode.load();
  videoNode.src = 'static/video/kobe.mp4';
  videoNode.poster = 'static/image/kobe.jpeg';
}
//4.是否加载完成
videoNode.addEventListener('canplay',function(){
  canPlay = true;
  console.log('资源已经加载完成');
  all_time = timeUtil(videoNode.duration);
  timeNode.innerText = '00:00/'+all_time;
})
//5.播放暂停
playNode.onclick = function(){
  if(!isPlay){
    document.querySelector('.icon-zanting').style.display = 'block';
    document.querySelector('.icon-play').style.display = 'none';
    videoNode.play();
  }else{
    document.querySelector('.icon-zanting').style.display = 'none';
    document.querySelector('.icon-play').style.display = 'block';
    videoNode.pause();
  }
  isPlay = !isPlay;
}
// 5.前进5s
nextNode.onclick = function(){
  videoNode.currentTime = videoNode.currentTime + 5;
}
// 6.设置视频进度
videoNode.addEventListener('timeupdate',function(){
  var currentTime = videoNode.currentTime;
  var change_width = allProgressNode.offsetWidth*(currentTime/videoNode.duration);
  moveBtnNode.style.left = change_width-4+'px';
  nowProgressNode.style.width = change_width+'px';

  timeNode.innerText = timeUtil(currentTime)+'/'+all_time;
  console.log(currentTime);
})
// 7.进度定位按钮
moveBtnNode.onmousedown = function(e){
  var ev = e || event;
  var clientX = ev.clientX;
  var offsetLeft = this.offsetLeft;
  
  var startLeft = clientX - offsetLeft;
  var needLeft = 0;
  var maxWidth = 0;
  document.onmousemove = function(e){
    var ev = e || event;
    needLeft = ev.clientX - startLeft;
    maxWidth = allProgressNode.offsetWidth;

    needLeft = needLeft < 0 ? 0 : needLeft;
    needLeft = needLeft > maxWidth ? maxWidth : needLeft;

    // 获取百分比
    var change_width = allProgressNode.offsetWidth*(needLeft / maxWidth);

    moveBtnNode.style.left = (change_width-4)+'px';
    nowProgressNode.style.width = change_width+'px';

    // 设置以播放的时间
    timeNode.innerText = timeUtil(videoNode.duration* (needLeft / maxWidth))+"/"+all_time;

  }
  document.onmouseup = function(e){
    document.onmousemove = document.onmouseup = null;
    videoNode.currentTime = videoNode.duration * (needLeft / maxWidth ); 
  }

}
//8.设置循环
document.querySelector('.control_right_xunhuan').onclick = function(){
  loop = !loop;
  videoNode.loop = loop;
  if(loop){
    document.querySelector('.control_right_xunhuan > i').innerText = '';
  }else{
    document.querySelector('.control_right_xunhuan > i').innerText = 'x';
  }
}
//9.设置播放的速度
document.querySelector('.control_right_multiple > ul >li:nth-child(1)').onclick = function(){
  videoNode.playbackRate = 2;
}
document.querySelector('.control_right_multiple > ul >li:nth-child(2)').onclick = function(){
  videoNode.playbackRate = 1.5;
}
document.querySelector('.control_right_multiple > ul >li:nth-child(3)').onclick = function(){
  videoNode.playbackRate = 0.5;
}
// 10.实现音量的加减
document.querySelector('.control_right_volume').onclick = function(e){
  if(e.target.nodeName == 'I'){
    ifShowVolume = !ifShowVolume;
    if(ifShowVolume){
      volumeControls[0].style.display = 'block';
      volumeControls[1].style.display = 'block';
    }else{
      volumeControls[0].style.display = 'none';
      volumeControls[1].style.display = 'none';
    }
  }
}
document.querySelector('input[type=range]').onchange = function(e){
  var el = e || event;
  var value = el.target.value / 100;
  // 设置音量
  videoNode.volume = value;
  // 设置已经播放的高度
  nowVolumeNode.style.height = (80 * value-2)+'px';
}
document.querySelector('input[type=range]').oninput = function(e){
  var el = e || event;
  var value = el.target.value / 100;
  console.log(value)
  // 设置音量
  videoNode.volume = value;
  // 设置已经播放的高度
  nowVolumeNode.style.height = (80 * value)+'px';
}
// 实现全屏播放
FullNode.onclick = function () {
  if (videoNode.webkitRequestFullscreen) {
    videoNode.webkitRequestFullscreen();
  }
  else if (videoNode.mozRequestFullScreen) {
    videoNode.mozRequestFullScreen();
  }
  else {
    videoNode.requestFullscreen();
  }
};
function timeUtil(time){
  var a = parseInt(time / 60);
  var b = parseInt(time % 60);
  if(a<10){
    a = "0"+a;
  }
  if(b<10){
    b = "0"+b;
  }
  return a+":"+b
}