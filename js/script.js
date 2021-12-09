/* 角色初始化 */
function initYou() {
  var you = {
    currentStage: "0",
    jobClearedStage: [],
    sensedEnemy: ["波利",
      "绿棉虫",
      "疯兔"],
    jobLv: {
      "基本": 3,
      "初心者": 3
    },
    currentJob: "初心者",
    attribute: "无",
    race: "人形",
    size: "中",
    zeny: 0,
    stats: {
      str: 2,
      agi: 1,
      vit: 2,
      int: 1,
      dex: 1,
      luk: 1
    },
    equip: {
      "头上": {
        name: "空",
        card: []},
      "头中": {
        name: "空",
        card: []},
      "头下": {
        name: "空",
        card: []},
      "身体": {
        name: "冒险衣",
        card: []},
      "主手": {
        name: "短剑",
        card: []},
      "副手": {
        name: "空",
        card: []},
      "披挂": {
        name: "空",
        card: []},
      "鞋子": {
        name: "空",
        card: []},
      "饰品一": {
        name: "空",
        card: []},
      "饰品二": {
        name: "空",
        card: []}},
    learnedSkill: {
      "初心者": {
        "基本技能": 1,
        "紧急治疗": 1
      }
    },
    carriedItem: {
      "初学者专用药水": 1
    },
    assist: [],
    storeItem: [],
    guild: "无"
  };
  Cookies.set("saveData", JSON.stringify(you), {
    expires: 365
  });
  return you;
}
/* 关卡数据*/
function stageData(stageNumber) {
  switch (stageNumber) {
    case "0": return {
      name: "初心者训练场",
      enemy: ["波利",
        "疯兔",
        "绿棉虫"]
    };
  }
}
/* 写入关卡敌人 */
function displayStageEnemy(selectedStage) {
  var container = "";
  var you = JSON.parse(Cookies.get("saveData"));
  for (let i = 0; i < stageData(selectedStage).enemy.length; i++) {
    container += "<tr><td>"+(i+1)+"</td><td>"+stageData(selectedStage).enemy[i]+"</td><td>"; if (you.sensedEnemy.includes(stageData(selectedStage).enemy[i]))container += "<button>详细</button></td></tr>"; else container += "不明</td></tr>"
  }
  document.getElementById("stageEnemyList").innerHTML = container;
}
/* 故事继续按钮事件 */
function storyContinue(preId, nextId) {
  /* 前一个元素淡出 */
  document.getElementById(preId).style.opacity = 0;
  /* 过渡结束后改display */
  function a() {
    document.getElementById(preId).style.display = "none";
    document.getElementById(nextId).style.display = "block";
  };
  setTimeout(a, 500);
  /* 后一个元素淡入 */
  function b() {
    document.getElementById(nextId).style.opacity = 1;
  }
  setTimeout(b, 600);
  return;
}
/* 进入关卡信息 */
function stageInfo(preId, selectedStage) {
  /* 故事淡出 */
  document.getElementById(preId).style.opacity = "0";
  /* 过渡结束后改display */
  function a() {
    document.getElementById(preId).style.display = "none"; document.getElementById("stageInfoBox").style.display = "block";
  }
  setTimeout(a, 500);
  /* 写入关卡数字、关卡名*/
  document.getElementById("stageNumber").innerHTML = "Stage&nbsp;"+selectedStage;
  document.getElementById("stageName").innerHTML = stageData(selectedStage).name;
  /* 写入关卡敌人 */
  document.getElementById("stageEnemyTitle").innerHTML = "Enemy（Wave："+stageData(selectedStage).enemy.length+"）";
  displayStageEnemy(selectedStage);
  /* 关卡信息淡入 */
  function b() {
    document.getElementById("stageInfoBox").style.opacity = 1;
  }
  setTimeout(b, 600);
}
/* 读档，传1新开档 */
function gameLoad(isNewGame) {
  /* 取关卡进度 */
  var currentStage;
  if (isNewGame)currentStage = initYou().currentStage;
  else currentStage = JSON.parse(Cookies.get("saveData")).currentStage;
  if (currentStage !== "0") {
    /* 进选关界面*/
  } else {
    /* 开序章 */
    storyContinue("gameStart", "chapter0");
  }
  return;
}
/* 游戏开始 */
function gameStart() {
  /* 显示版本号 */
  document.getElementById("ver").innerHTML = "Dev.20211210";
  /* 判断存档是否存在 */
  var saveData = Cookies.get("saveData");
  if (!saveData) {
    let button = document.createElement("button");
    button.innerHTML = "开始游戏";
    button.setAttribute("onclick", "gameLoad(1)");
    document.getElementById("gameStart").appendChild(button);
  } else {
    let button = document.createElement("button");
    button.innerHTML = "继续游戏";
    button.setAttribute("onclick", "gameLoad(0)");
    document.getElementById("gameStart").appendChild(button);
  }
  return;
}