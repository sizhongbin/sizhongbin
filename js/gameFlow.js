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
    [[2000,
      []],
      [2000,
        []],
      [2000,
        []],
      [2002,
        []],
      [2000,
        []],
      [1001,
        []],
      [2000,
        []],
      [2000,
        []],
      [2000,
        []],
      [2000,
        []],
      0],
    /* 10:习得技能，[技能,等级]，存键 */
    [[1,
      1],
      [2,
        1]],
    /* 11:携带物品，[物品,数量]，存键 */
    [[1,
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
        card: save[9][0][1]
      },
      "头中": {
        id: save[9][1][0],
        card: save[9][1][1]
      },
      "头下": {
        id: save[9][2][0],
        card: save[9][2][1]
      },
      "身体": {
        id: save[9][3][0],
        card: save[9][3][1]
      },
      "副手": {
        id: save[9][4][0],
        card: save[9][4][1]
      },
      "主手": {
        id: save[9][5][0],
        card: save[9][5][1]
      },
      "披挂": {
        id: save[9][6][0],
        card: save[9][6][1]
      },
      "鞋子": {
        id: save[9][7][0],
        card: save[9][7][1]
      },
      "饰品一": {
        id: save[9][8][0],
        card: save[9][8][1]
      },
      "饰品二": {
        id: save[9][9][0],
        card: save[9][9][1]
      }
    },
    learnedSkill: (() => {
      var obj = {};
      for (let i = 0; i < save[10].length; i++)
        obj[save[10][i][0]] = save[10][i][1];
      return obj;
    })(),
    carriedItem: (function () {
      var obj = {};
      for (let i = 0; i < save[11].length; i++)
        obj[save[11][i][0]] = save[11][i][1];
      return obj;
    })(),
    assist: [],
    storeItem: (function () {
      var obj = {};
      for (let i = 0; i < save[13].length; i++)
        obj[save[13][i][0]] = save[13][i][1];
      return obj;
    })(),
    guild: (save[14] === 1 ? "天禁仙境": "无")
  };
  return;
}
/* 通过值找键*/
function findKey(obj, value, compare = (a, b) => a === b) {
  return Object.keys(obj).find(k => compare(obj[k], value))
}
/* 游戏开始 */
function gameStart() {
  /* 显示版本号 */
  document.getElementById("ver").innerHTML = "Dev.20211214";
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
/* 读档，传1新开档 */
function gameLoad(isNewGame) {
  /* 新游戏时建存档 */
  if (isNewGame) initSave();
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
/* 故事继续按钮事件 */
function storyContinue(preId, nextId) {
  /* 前一个元素隐藏，透明度复原 */
  document.getElementById(preId).style.display = "none";
  document.getElementById(preId).style.opacity = 0;
  /* 后一个元素取消隐藏 */
  document.getElementById(nextId).style.display = "block";
  /* 后一个元素淡入 */
  function a() {
    document.getElementById(nextId).style.opacity = 1;
  }
  setTimeout(a, 100);
  return;
}
/* 进入关卡信息 */
function stageInfo(preId) {
  /* 故事隐藏 */
  document.getElementById(preId).style.display = "none";
  document.getElementById(preId).style.opacity = "0";
  /* 关卡信息取消隐藏 */
  document.getElementById("stageInfoBox").style.display = "block";
  /* 写入关卡数字、关卡名*/
  document.getElementById("stageNumber").innerHTML = "Stage&nbsp;" + selectedStage;
  document.getElementById("stageName").innerHTML = stageData(selectedStage).name;
  /* 写入关卡敌人 */
  document.getElementById("stageEnemyTitle").innerHTML = "Enemy（Wave：" + stageData(selectedStage).enemy.length + "）";
  displayStageEnemy(selectedStage);
  /* 关卡信息淡入 */
  function a() {
    document.getElementById("stageInfoBox").style.opacity = 1;
  }
  setTimeout(a, 100);
  return;
}
/* 关卡信息展示关卡敌人 */
function displayStageEnemy(selectedStage) {
  var container = "";
  for (let i = 0; i < stageData(selectedStage).enemy.length; i++) {
    container += "<tr><td>" + (i + 1) + "</td><td>" + enemyData(stageData(selectedStage).enemy[i]).name + "</td><td>"; if (you.sensedEnemy.includes(stageData(selectedStage).enemy[i])) container += "<button>详细</button></td></tr>"; else container += "不明</td></tr>"
  }
  document.getElementById("stageEnemyList").innerHTML = container;
}
/* 展示角色信息 */
function charaInfo(scene) {
  /* 根据调用场景隐藏窗口 */
  if (scene === "stageInfo") {
    document.getElementById("stageInfoBox").style.display = "none";
    document.getElementById("stageInfoBox").style.opacity = "0";
    document.getElementById("charaInfoBox").style.display = "block";
  }
  /* 写入基本信息 */
  var boardStats = getBoardStats();
  var bonusStats = getBonusStats();
  document.getElementById("baseLv").innerHTML = "Base Lv."+you.jobLv[0];
  document.getElementById("currentJob").innerHTML = jobData(you.currentJob).name;
  document.getElementById("jobLv").innerHTML = "Job Lv."+you.jobLv[you.currentJob];
  document.getElementById("hp").innerHTML = boardStats.maxhp + "&nbsp;/&nbsp;" + boardStats.maxhp;
  document.getElementById("sp").innerHTML = boardStats.maxsp + "&nbsp;/&nbsp;" + boardStats.maxsp;
  document.getElementById("weight").innerHTML = getCarriedWeight() + "&nbsp;/&nbsp;" + boardStats.maxweight;
  document.getElementById("zeny").innerHTML = you.zeny;
  /* 写入六维 */
  document.getElementById("str").innerHTML = you.stats.str+"&nbsp;+&nbsp;"+bonusStats.str;
  document.getElementById("agi").innerHTML = you.stats.agi+"&nbsp;+&nbsp;"+bonusStats.agi;
  document.getElementById("vit").innerHTML = you.stats.vit+"&nbsp;+&nbsp;"+bonusStats.vit;
  document.getElementById("int").innerHTML = you.stats.int+"&nbsp;+&nbsp;"+bonusStats.int;
  document.getElementById("dex").innerHTML = you.stats.dex+"&nbsp;+&nbsp;"+bonusStats.dex;
  document.getElementById("luk").innerHTML = you.stats.luk+"&nbsp;+&nbsp;"+bonusStats.luk;
  /* 写入副属性 */
  document.getElementById("atk").innerHTML = boardStats.atk+"&nbsp;+&nbsp;"+boardStats.watk;
  document.getElementById("matk").innerHTML = boardStats.matk+"&nbsp;+&nbsp;"+boardStats.wmatk;
  document.getElementById("def").innerHTML = boardStats.def+"&nbsp;+&nbsp;"+boardStats.wdef;
  document.getElementById("mdef").innerHTML = boardStats.mdef+"&nbsp;+&nbsp;"+boardStats.wmdef;
  document.getElementById("hit").innerHTML = boardStats.hit;
  document.getElementById("flee").innerHTML = boardStats.flee;
  document.getElementById("cri").innerHTML = boardStats.cri;
  document.getElementById("ap").innerHTML = boardStats.maxap;
  document.getElementById("statusPoint").innerHTML = getStatsPoint();
  document.getElementById("guild").innerHTML = you.guild;
  /* 如有剩余点数则展示加点按钮，无则隐藏 */
  if (getStatsPoint()) {
    for (let i = 0; i < document.getElementsByClassName("addStats").length; i++)
      document.getElementsByClassName("addStats")[i].style.visibility = "visible";
  } else {
    for (let i = 0; i < document.getElementsByClassName("addStats").length; i++)
      document.getElementsByClassName("addStats")[i].style.visibility = "hidden";
  }
  /* 淡入 */
  function a() {
    document.getElementById("charaInfoBox").style.opacity = 1;
  }
  setTimeout(a, 100);
  return;
}
/* 六维加点*/
function addStats(stat) {
  you.stats[stat] += 1;
  charaInfo();
}
/* 重置六维加点 */
function resetStats() {
  you.stats.str = 1;
  you.stats.agi = 1;
  you.stats.vit = 1;
  you.stats.int = 1;
  you.stats.dex = 1;
  you.stats.luk = 1;
  charaInfo();
}
/* 展示技能信息 */
function skillInfo(scene) {
  /* 根据调用场景隐藏窗口 */
  if (scene === "stageInfo") {
    document.getElementById("stageInfoBox").style.display = "none";
    document.getElementById("skillInfoBox").style.opacity = "0";
    document.getElementById("skillInfoBox").style.display = "block";
  }
  /* 根据现有职业展示head */
  if (you.currentJob > 0) document.getElementById("job0").style.display = "flex";
  if (you.currentJob > 10) document.getElementById("job1").style.display = "flex";
  /* 根据调用场景写入技能列表 */
  if (scene === "stageInfo") skillInfoContent(0);
  else if (scene === "battle") skillInfoContent();
  /* 淡入 */
  function a() {
    document.getElementById("skillInfoBox").style.opacity = 1;
  }
  setTimeout(a, 100);
  return;
}
function skillInfoContent(tab = -1) {
  var title = "";
  /* 不传参时维持上次选择的tab，传参时根据tab改变展示*/
  if (tab >= 0) {
    for (let i = 0; i < 4; i++)
      document.getElementById("job"+i).className = "skillInfoHeadTab";
    document.getElementById("job"+tab).className = "skillInfoHeadTabSelected";
    tab = "job" + tab;
  }
  else tab = document.getElementsByClassName("skillInfoHeadTabSelected")[0].getAttribute("id");
  /* 写入展示信息 */
  /* tab为0时必定为初心者*/
  if (tab === "job0") {
    /* 【职业名】 */
    title += "<tr><th colspan='2'>";
    title += "【" + jobData(1).name + "】";
    title += "</th><th colspan='2'>";
    /* 剩余技能点 */
    let point;
    title += "剩余点数：";
    point = (() => {
      let usedPoint = 0;
      for (key in you.learnedSkill)
        if (jobData(1).skillList.includes(Number(key)))
          usedPoint += you.learnedSkill[key];
      return you.jobLv[1] - 1 - usedPoint;
    })();
    title += point;
    title += "</th></tr>";
    /* 页面增加列表头 */
    document.getElementById("skillInfoTable").innerHTML = title;
    for (let i = 0; i < jobData(1).skillList.length; i++) {
      let row = "";
      /* 技能名 */
      row += "<tr><td>" + youSkillData(jobData(1).skillList[i]).name + "</td>";
      /* 等级 */
      let learnedLv = you.learnedSkill[jobData(1).skillList[i]];
      row += "<td>" + (learnedLv ? learnedLv : 0) + "&nbsp;/&nbsp;" + youSkillData(jobData(1).skillList[i]).maxlv + "</td>";
      /* 学习按钮 */
      row += "<td><button id='learn" + jobData(1).skillList[i] + "' onclick='learnSkill(" + jobData(1).skillList[i] + ")'>+</button></td>";
      /* 详细按钮 */
      row += "<td><button id='detail" + jobData(1).skillList[i] + "' class='skillInfoDetailButton' onclick='skillDetail(" + jobData(1).skillList[i] + ")'>详情</button></td></tr>";
      /* 页面增加列表 */
      document.getElementById("skillInfoTable").innerHTML += row;
      /* 判断学习按钮是否隐藏 */
      if ((!point) || (learnedLv == youSkillData(jobData(1).skillList[i]).maxlv))
        document.getElementById("learn" + jobData(1).skillList[i]).style.visibility = "hidden";
      else
        document.getElementById("learn" + jobData(1).skillList[i]).style.visibility = "visible";
    }
  }
  return;
}
/* 重置技能 */
function resetSkill() {
  you.learnedSkill = {};
  skillInfoContent();
}
/* 学习技能 */
function learnSkill(id) {
  if (you.learnedSkill[id]) you.learnedSkill[id] += 1;
  else you.learnedSkill[id] = 1;
  skillInfoContent();
}