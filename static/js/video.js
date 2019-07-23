var canPlay = false;
var isPlay = false;
var videoNode = document.querySelector('#video');
var playNode = document.querySelector('.control_left_play');
var nextNode = document.querySelector('.control_left_next');
var timeNode = document.querySelector('.time');
var all_time = 0;
var moveBtnNode = document.querySelector('.move_btn');
var nowProgressNode = document.querySelector('.now_progress');
var allProgressNode = document.querySelector('.all_progress');
//1.设置资源路径
videoNode.src = 'static/video/kobe.mp4';
//2.设置视频的第一帧
//videoNode.poster = 'static/image/kobe.jpeg'; 设置这个会导致src 设置失败
//3.重新加载
document.querySelector('.control_right_reload').onclick=function(){
  videoNode.reload();
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
  var change_percentage = currentTime/videoNode.duration*100+"%";
  moveBtnNode.style.left = change_percentage;
  nowProgressNode.style.width = change_percentage;

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
    maxWidth = allProgressNode.offsetWidth - 4;

    needLeft = needLeft < -4 ? -4 : needLeft;
    needLeft = needLeft > maxWidth ? maxWidth : needLeft;

    // 获取百分比
    var percentage = needLeft / maxWidth * 100 + "%";
    console.log(percentage)
    moveBtnNode.style.left = percentage;
    nowProgressNode.style.width = percentage;

    // 设置以播放的时间
    timeNode.innerText = timeUtil(videoNode.duration* (needLeft / maxWidth))+"/"+all_time;

  }
  document.onmouseup = function(e){
    document.onmousemove = document.onmouseup = null;
    videoNode.currentTime = videoNode.duration * (needLeft / maxWidth ); 
  }

}
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