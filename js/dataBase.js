/* 职业数据 */
function jobData(key) {
  var jobData = {
    0: "基本",
    1: "初心者",
    2: "剑士"
  };
  return jobData[key];
}
/* 关卡数据 */
function stageData(key) {
  var stageData = {
    0: {
      number: "0",
      name: "初心者修炼场",
      enemy: [1,
        2,
        3]}
  };
  return stageData[key];
}
/* 敌人数据 */
function enemyData(key) {
  var enemyData = {
    1: {
      name: "波利",
      attribute: "水",
      race: "植物",
      size: "中",
      type: "被动",
      maxhp: 4,
      atk: 3,
      watk: 0,
      matk: 1,
      wmatk: 0,
      def: 1,
      wdef: 0,
      mdef: 1,
      wmdef: 0,
      hit: 5,
      flee: 5,
      cri: 1,
      maxap: 1,
      mov: 1,
      ct: 0,
      hate: 0,
      range: 1,
      skill: [{
        id: 1,
        lv: 1,
        condition: function() {
          return 1;
        }
      }]},
    2: {
      name: "疯兔",
      attribute: "无",
      race: "动物",
      size: "小",
      type: "被动",
      maxhp: 5,
      atk: 3,
      watk: 1,
      matk: 1,
      wmatk: 0,
      def: 1,
      wdef: 0,
      mdef: 1,
      wmdef: 0,
      hit: 5,
      flee: 5,
      cri: 1,
      maxap: 1,
      mov: 1,
      ct: 0,
      hate: 0,
      range: 1,
      skill: [{
        name: "攻击",
        lv: 1,
        condition: function() {
          return 1;
        }
      }]},
    3: {
      name: "绿棉虫",
      attribute: "地",
      race: "昆虫",
      size: "小",
      type: "被动",
      maxhp: 8,
      atk: 3,
      watk: 1,
      matk: 1,
      wmatk: 0,
      def: 1,
      wdef: 1,
      mdef: 1,
      wmdef: 0,
      hit: 5,
      flee: 5,
      cri: 1,
      maxap: 1,
      mov: 1,
      ct: 0,
      hate: 0,
      range: 1,
      skill: [{
        id: 1,
        lv: 1,
        condition: function() {
          return 1;
        }
      }]}
  }
  return enemyData[key];
}
/* 敌人技能数据 */
function enemySkillData(key) {
  var enemySkillData = {
    0: {
      name: "攻击",
      ap: function(lv = 1) {
        return 1;
      },
      ct: function(lv = 1) {
        return 0;
      },
      cd: function(lv = 1) {
        return 0;
      },
      target: ["敌人"],
      condition: "无",
      series: "攻击",
      type: "物理",
      attribute: "无",
      range: "自身",
      script: function(target, lv) {
        if (battleMiss(battleGetEnemy().hit, battleGetYou().flee))return "Miss"; let isCritical = battleCritical(battleGetEnemy().cri); let modifier=-((battleGetEnemy().atk*2+battleGetEnemy().watk*(1+getSpecialWatkModifier())-battleGetYou().def*2-battleGetYou().wdef*(1+getSpecialWdefModifier()))*(1+getSpecialDamageModifier())); if (isCritical)modifier = (modifier*1.25).toFixed(0); modifier = Math.min(modifier, -1); battleYouModifier.hp += modifier; battleRefreshMessage("hpDamage", battleGetEnemy().name, battleGetYou().name, Math.abs(modifier)); return (isCritical?"<font style=\'color:yellow;\'>": "")+modifier+(isCritical?"&nbsp!!</font>": "");
      }
    }
  };
  return enemySkillData[key];
}
/* 装备数据 */
function equipData(key) {
  var equipData = {
    2000: {
      name: "空",
      series: "防具",
      type: "其它",
      wdef: 0,
      wt: 0,
      attribute: "无",
      requireJob: [],
      slot: 0,
      intro: "无",
      script: []},
    1000: {
      name: "空手",
      series: "武器",
      type: "拳套",
      watk: 0,
      wt: 0,
      attribute: "无",
      range: 1,
      requireJob: [],
      slot: 0,
      intro: "赤手空拳",
      script: []},
    1001: {
      name: "短剑",
      series: "武器",
      type: "短剑",
      watk: 1,
      wt: 4,
      attribute: "无",
      range: 1,
      requireJob: ["初心者",
        "剑士",
        "魔法师",
        "弓箭手",
        "盗贼",
        "商人"],
      slot: 0,
      intro: "几乎任何人都能使用的短剑。",
      script: []},
    2002: {
      name: "冒险衣",
      series: "防具",
      type: "身体",
      wdef: 2,
      wt: 3,
      attribute: "无",
      requireJob: ["无"],
      slot: 0,
      intro: "专为冒险者制作的衣服。",
      script: []},
    2001: {
      name: "棉衬衫",
      series: "防具",
      type: "身体",
      wdef: 1,
      wt: 1,
      attribute: "无",
      requireJob: ["无"],
      slot: 0,
      intro: "穿着非常舒服的衣服。",
      script: []},
    3000: {
      name: "无",
      series: "卡片",
      type: "无",
      wt: 0,
      intro: "无",
      script: []}
  };
  return equipData[key];
}
/* 道具数据 */
function itemData(key) {
  var itemData = {
    1: {
      name: "初学者专用药水",
      wt: 0.1,
      ap: 0,
      ct: 0,
      cd: 1,
      requireJob: "无",
      intro: "回复5点HP",
      series: "回复",
      type: "道具",
      range: 0,
      target: ["自己"],
      script: [{
        type: "hpRecovery",
        effect: 5
      }]/*function(target) {
        battleYouModifier.hp += Math.min(battleGetYou().maxhp-battleGetYou().hp, 5); battleRefreshMessage("hpRecovery", battleGetYou().name, 5);
        return 5;
      }*/
    }
  };
  return itemData[key];
}
/* 角色技能数据 */
function youSkillData(key) {
  var youSkillData = {
    0: {
      name: "攻击",
      maxlv: 1,
      sp: function(lv = 1) {
        return 0;
      },
      ap: function(lv = 1) {
        return 1;
      },
      ct: function(lv = 1) {
        return 0;
      },
      cd: function(lv = 1) {
        return 0;
      },
      requireSkill: [],
      requireWeapon: [],
      intro: "攻击",
      series: "攻击",
      type: "物理",
      attribute: "武器",
      range: "武器",
      target: ["敌人"],
      script: function(target, lv) {
        if (battleMiss(battleGetYou().hit, battleGetEnemy().flee))return "Miss"; let modifier=-((battleGetYou().atk*2+battleGetYou().watk*(1+getSpecialWatkModifier())-battleGetEnemy().def*2-battleGetEnemy().wdef*(1+getSpecialWdefModifier()))*(1+getSpecialDamageModifier())); battleEnemyModifier.hp += modifier; battleRefreshMessage("hpDamage", battleGetYou().name, battleGetEnemy().name, Math.abs(modifier));
        return modifier;
      }},
    1: {
      name: "基本技能",
      maxlv: 1,
      sp: function(lv = 1) {
        return 0;
      },
      ap: function(lv = 1) {
        return 0;
      },
      ct: function(lv = 1) {
        return 0;
      },
      cd: function(lv = 1) {
        return 0;
      },
      requireSkill: [],
      requireWeapon: [],
      intro: "冒险者的基本技能",
      series: "被动",
      type: "物理",
      attribute: "无",
      range: 0,
      target: ["自己"],
      script: function(target, lv) {}},
    2: {
      name: "紧急治疗",
      maxlv: 1,
      sp: function(lv = 1) {
        return 2;
      },
      ap: function(lv = 1) {
        return "All";
      },
      ct: function(lv = 1) {
        return 0;
      },
      cd: function(lv = 1) {
        return 0;
      },
      requireSkill: [{
        name: "基本技能",
        lv: 1
      }],
      requireWeapon: [],
      intro: "回复自身5点HP",
      series: "回复",
      type: "魔法",
      attribute: "无",
      range: 0,
      target: ["自己"],
      script: function(target, lv) {
        battleYouModifier.hp += Math.min(battleGetYou().maxhp-battleGetYou().hp, 5); battleRefreshMessage("hpRecovery", battleGetYou().name, 5); return 5;
      }}
  };
  return youSkillData[key];
}