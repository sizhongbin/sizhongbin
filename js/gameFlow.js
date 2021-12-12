/* 存档初始化，为避免cookie超过4K尽量减少字符数 */
function initSave() {
  var save = [
    /* 0:关卡进度，存已通关关卡键。下标0为总进度，1-为各职业进度，对应职业键 */
    [0,
      0],
    /* 1:怪物情报，存已有情报怪物键*/
    [1,
      2],
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
    /* 11:携带物品，[物品,数量]，存键 */
    [[0,
      1]],
    /* 12:支援，存键 */
    [],
    /* 13:仓库物品，[道具,数量]，存键 */
    [],
    /* 14:公会名，0无，1天禁仙境 */
    0
  ];
  Cookies.set("s", JSON.stringify(save), {
    expires: 365
  });
  return;
}
/* 存档对象化 */
function convertSaveToYou() {
  var save = JSON.parse(Cookies.get("s"));
  you = {
    currentStage: save[0],
    sensedEnemy: save[1],
    jobLv: save[2],
    currentJob: save[3],
    attribute: save[4],
    race: save[5],
    size: save[6],
    zeny: save[7],
    stats: {
      str: save[8][0],
      agi: save[8][1],
      vit: save[8][2],
      int: save[8][3],
      dex: save[8][4],
      luk: save[8][5]
    },
    equip: {
      "头上": {
        id: save[9][0][0],
        card: save[9][0][1]},
      "头中": {
        id: save[9][1][0],
        card: save[9][1][1]},
      "头下": {
        id: save[9][2][0],
        card: save[9][2][1]},
      "身体": {
        id: save[9][3][0],
        card: save[9][3][1]},
      "副手": {
        id: save[9][4][0],
        card: save[9][4][1]},
      "主手": {
        id: save[9][5][0],
        card: save[9][5][1]},
      "披挂": {
        id: save[9][6][0],
        card: save[9][6][1]},
      "鞋子": {
        id: save[9][7][0],
        card: save[9][7][1]},
      "饰品一": {
        id: save[9][8][0],
        card: save[9][8][1]},
      "饰品二": {
        id: save[9][9][0],
        card: save[9][9][1]}},
    learnedSkill: (function() {
      var obj = {};
      for (let i = 0; i < save[10].length; i++)
        obj[save[10][i][0]] = {
        id: save[10][i][1][0],
        lv: save[10][i][1][1]};
      return obj;
    })(),
    carriedItem: (function() {
      var obj = {};
      for (let i = 0; i < save[11].length; i++)
        obj[save[11][i][0]] = save[11][i][1];
      return obj;
    })(),
    assist: [],
    storeItem: (function() {
      var obj = {};
      for (let i = 0; i < save[13].length; i++)
        obj[save[13][i][0]] = save[13][i][1];
      return obj;
    })(),
    guild: (save[14] === 1?"天禁仙境": "无")
  };
  return;
}
/* 通过值找键*/
function findKey(obj, value, compare = (a, b) => a === b) {
  return Object.keys(obj).find(k => compare(obj[k], value))
}
/* 关卡信息展示关卡敌人 */
function displayStageEnemy(selectedStage) {
  var container = "";
  for (let i = 0; i < stageData(selectedStage).enemy.length; i++) {
    container += "<tr><td>"+(i+1)+"</td><td>"+enemyData(stageData(selectedStage).enemy[i]).name+"</td><td>"; if (you.sensedEnemy.includes(stageData(selectedStage).enemy[i]))container += "<button>详细</button></td></tr>"; else container += "不明</td></tr>"
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
  /* 新游戏时建存档 */
  if (isNewGame)initSave();
  /* 存档对象化 */
  convertSaveToYou();
  /* 取关卡进度 */
  var currentStage;
  if (you.currentStage[0] !== 0) {
    /* 进选关界面*/
    currentStage = you.currentStage[you.currentJob];
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