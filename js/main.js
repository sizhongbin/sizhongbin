/* cookies操作 */
const Cookies = {
  // 写入cookie
  set: function(name, value, iDay) {
    var newDate = new Date();
    newDate.setDate(newDate.getDate() + iDay);
    value = encodeURIComponent(value);
    document.cookie = name + "=" + value + ";expires=" + newDate + ";path=/";
  },
  // 读取cookie
  get: function(name) {
    var cookie = decodeURIComponent(document.cookie);
    var arr = cookie.split("; ");
    for (var i = 0; i < arr.length; i++) {
      var arr2 = arr[i].split("=");
      if (arr2[0] == name) {
        return arr2[1];
      }
    }
  }
};
/* 游戏开始 */
function gameStart() {
  /* 显示版本号 */
  document.getElementById("ver").innerHTML = "Dev.20211216";
  document.getElementById("updateLogButton").style.visibility = "visible";
  /* 判断存档是否存在 */
  var saveData = Cookies.get("s");
  let button = document.createElement("button");
  button.id = "gameStartButton";
  if (!saveData) {
    button.innerHTML = "开始游戏";
    button.setAttribute("onclick", "gameLoad(1)");
  } else {

    button.innerHTML = "继续游戏";
    button.setAttribute("onclick", "gameLoad(0)");
  }
  document.getElementById("gameStart").appendChild(button);
  return;
}
/* 执行主流程 */
gameStart();