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
  };return you;
}

function main(){console.log(initYou());console.log(123);return 1;}