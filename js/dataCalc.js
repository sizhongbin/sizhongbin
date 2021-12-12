/* 角色副属性计算 */
function getSubStats() {
  var subStats = {
    maxhp: you.jobLv[0]+you.stats.vit*3,
    maxsp: you.jobLv[0]+you.stats.int*3,
    maxweight: you.jobLv[0]+you.stats.str*3,
    atk: 0,
    matk: you.stats.int,
    def: you.stats.vit,
    mdef: you.stats.int,
    hit: you.stats.dex*5,
    flee: you.stats.agi*5,
    cri: you.stats.luk,
    maxap: 1,
    mov: 1,
    ct: 0,
    range: 0
  };
  return subStats;
}
/* 装备面板加成属性计算 */
function getEquipBonusStats() {
  var totalBonusStats = {
    str: 0,
    agi: 0,
    vit: 0,
    int: 0,
    dex: 0,
    luk: 0,
    maxhp: 0,
    maxsp: 0,
    maxweight: 0,
    atk: 0,
    watk: 0,
    matk: 0,
    wmatk: 0,
    def: 0,
    wdef: 0,
    mdef: 0,
    wmdef: 0,
    hit: 0,
    flee: 0,
    cri: 0,
    maxap: 0,
    mov: 0,
    ct: 0,
    range: 0,
    attribute: 0
  };
  if (equipData(you.equip["主手"].id).type === ("弓" || "乐器" || "鞭"))totalBonusStats.atk += you.stats.dex;
  else totalBonusStats.atk += you.stats.str;
  for (let i = 0; i < you.equip.length; i++) {
    if (equipData(you.equip[i].id).series === "防具")totalBonusStats.wdef += equipData(you.equip[i].id).wdef;
    else {
      totalBonusStats.watk += equipData(you.equip[key].id).watk;
      totalBonusStats.range += equipData(you.equip[key].id).range
    };
    for (let j = 0; j < equipData(you.equip[i].id).script.length; i++) {
      if (equipData(you.equip[i].id).script[j].type == "statsBonus")totalBonusStats[equipData(you.equip[i].id).script[j].effect().stats] += equipData(you.equip[i].id).script[j].effect().value;
      if (equipData(you.equip[i].id).script[j].type == "attributeChange")totalBonusStats.attribute = equipData(you.equip[i].id).script[j].effect();
    }
    for (let j = 0; j < you.equip[i].card.length; j++) {
      for (let k = 0; k < equipData(you.equip[i].card[j]).script.length; k++) {
        if (equipData(you.equip[i].card[j]).script[k].type == "statsBonus")totalBonusStats[equipData(you.equip[i].card[j]).script[k].effect().stats] += equipData(you.equip[i].card[j]).script[k].effect().value; if (equipData(you.equip[i].card[j]).script[k].type == "attributeChange")totalBonusStats.attribute = equipData(you.equip[i].card[j]).script[k].effect().attribute;
      }
    }
  };
  return totalBonusStats;
}
/* 被动技能加成属性计算*/
function getSkillBonusStats() {
  var totalBonusStats = {
    str: 0,
    agi: 0,
    vit: 0,
    int: 0,
    dex: 0,
    luk: 0,
    maxhp: 0,
    maxsp: 0,
    maxweight: 0,
    atk: 0,
    watk: 0,
    matk: 0,
    wmatk: 0,
    def: 0,
    wdef: 0,
    mdef: 0,
    wmdef: 0,
    hit: 0,
    flee: 0,
    cri: 0,
    maxap: 0,
    mov: 0,
    ct: 0,
    range: 0
  };
  for (let i = 0; i < you.learnedSkill.length; i++) {
    for (let j = 0; j < you.learnedSkill[i].skill.length; j++) {
      if (youSkillData(you.learnedSkill[i].skill[j].id).series != "被动")continue; for (let k = 0; k < youSkillData(you.learnedSkill[i].skill[j].id).script(you.learnedSkill[i].skill[j].lv).length; k++) {
        if (youSkillData(you.learnedSkill[i].skill[j].id).script(you.learnedSkill[i].skill[j].id)[k].type == "statsBonus")totalBunusStats[youSkillData(you.learnedSkill[i].skill[j].id).script(you.learnedSkill[i].skill[j].id)[k].effect().stats] += youSkillData(you.learnedSkill[i].skill[j].id).script(you.learnedSkill[i].skill[j].id)[k].effect().value;
      }
    }
  }
  return totalBonusStats;
}