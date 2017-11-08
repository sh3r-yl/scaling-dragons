window.onload = choosePic;
var myPix = new Array("../images/wallpaper-1.jpg", "../images/wallpaper-2.jpg", "../images/wallpaper-3.jpg", "../images/wallpaper-4.jpg", "../images/wallpaper-5.jpg", "../images/wallpaper-6.jpg");
function choosePic() {
  var randomNum = Math.floor((Math.random() * myPix.length));
  $("#wallpaper").style.backgroundImage =
      "url(" + myPix[randomNum] + ")";
}