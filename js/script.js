/* 角色数据 */
var you;
/* 存档初始化，为避免cookie超过4K尽量减少字符数 */
function initSave() {
  var save = [
    /* 0:关卡进度，存已通关关卡键。下标0为总进度，1-为各职业进度，对应职业键 */
    [0],
    /* 1:怪物情报，存已有情报怪物键*/
    [],
    /* 2:职业等级，存等级。下标0为基本等级，1-为各职业等级，对应职业键 */
    [3,
      3],
    /* 3:当前职业键 */
    1,
    /* 4:初始属性键 */
    0,
    /* 5:初始种族键 */
    0,
    /* 6:初始体型键 */
    1,
    /* 7:钱 */
    0,
    /* 8:六维，下标对应savidl */
    [2,
      1,
      2,
      1,
      1,
      1],
    /* 9:装备，[部位[装备,[卡片]]]，最后为投射物，存键 */
    [[0,
      []],
      [0,
        []],
      [0,
        []],
      [2,
        []],
      [0,
        []],
      [1,
        []],
      [0,
        []],
      [0,
        []],
      [0,
        []],
      [0,
        []],
      0],
    /* 10:习得技能，[职业,[技能]]，存键 */
    [[1,
      [0,
        1]]],
    /* 11:携带物品，[大类,道具,数量]，存键 */
    [[2,
      0,
      1]],
    /* 12:支援，存键 */
    [],
    /* 13:仓库物品，[大类,道具,数量]，存键 */
    [],
    /* 14:公会名，0无，1天禁仙境 */
    0
  ];
  Cookies.set("s", JSON.stringify(save), {
    expires: 365
  });
  return;
}
/* 通过值找键*/
function findKey(obj, value, compare = (a, b) => a === b) {
  return Object.keys(obj).find(k => compare(obj[k], value))
}
/* 职业名键值互转，用in检索，by为key则输出value，by为value则输出key*/
function getJobKeyOrValue(input, by = "key") {
  var job = {
    0: "基本",
    1: "初心者",
    2: "剑士"
  };
  if (by === "key")return job[input];
  else if (by === "value")return findKey(job, input);
  else return 0;
}
/* 将存档转换为角色数据*/
function convertSaveToYou() {
  var save = JSON.parse(Cookies.get("s"));
  you = {
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
    learnedSkill: [{
      job: "初心者",
      skill: [{
        name: "基本技能",
        lv: 1
      },
        {
          name: "紧急治疗",
          lv: 1
        }]}],
    carriedItem: [{
      name: "初学者专用药水",
      quantity: 1
    }],
    assist: [],
    storeItem: [],
    guild: "无"
  };
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
  var you = JSON.parse(Cookies.get("s"));
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
  if (isNewGame)currentStage = initSave().currentStage;
  else currentStage = JSON.parse(Cookies.get("s")).currentStage;
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
  var saveData = Cookies.get("s");
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