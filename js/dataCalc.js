/* 角色副属性计算 */
function getSubStats() {
  var subStats = {
    maxhp: you.jobLv[0] + you.stats.vit * 3,
    maxsp: you.jobLv[0] + you.stats.int * 3,
    maxweight: you.jobLv[0] * 2 + you.stats.str * 6,
    atk: 0,
    matk: you.stats.int,
    def: you.stats.vit,
    mdef: you.stats.int,
    hit: you.stats.dex * 5,
    flee: you.stats.agi * 5,
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
  if (equipData(you.equip["主手"].id).type === ("弓" || "乐器" || "鞭")) totalBonusStats.atk += you.stats.dex;
  else totalBonusStats.atk += you.stats.str;
  for (key in you.equip) {
    if (equipData(you.equip[key].id).series === "防具") totalBonusStats.wdef += equipData(you.equip[key].id).wdef;
    else {
      totalBonusStats.watk += equipData(you.equip[key].id).watk;
      totalBonusStats.range += equipData(you.equip[key].id).range
    };
    for (let i = 0; i < equipData(you.equip[key].id).script.length; i++) {
      if (equipData(you.equip[key].id).script[i].type == "statsBonus")
      totalBonusStats[equipData(you.equip[key].id).script[i].effect().stats] += equipData(you.equip[key].id).script[i].effect().value;
      if (equipData(you.equip[key].id).script[i].type == "attributeChange")
      totalBonusStats.attribute = equipData(you.equip[key].id).script[i].effect();
    }
    for (let i = 0; i < you.equip[key].card.length; i++) {
      for (let j = 0; j < equipData(you.equip[key].card[i]).script.length; j++) {
        if (equipData(you.equip[key].card[i]).script[j].type == "statsBonus") totalBonusStats[equipData(you.equip[key].card[i]).script[j].effect().stats] += equipData(you.equip[key].card[i]).script[j].effect().value; 
        if (equipData(you.equip[key].card[i]).script[j].type == "attributeChange") totalBonusStats.attribute = equipData(you.equip[key].card[i]).script[j].effect().attribute;
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
      if (youSkillData(you.learnedSkill[i].skill[j].id).series != "被动") continue; for (let k = 0; k < youSkillData(you.learnedSkill[i].skill[j].id).script(you.learnedSkill[i].skill[j].lv).length; k++) {
        if (youSkillData(you.learnedSkill[i].skill[j].id).script(you.learnedSkill[i].skill[j].id)[k].type == "statsBonus") totalBunusStats[youSkillData(you.learnedSkill[i].skill[j].id).script(you.learnedSkill[i].skill[j].id)[k].effect().stats] += youSkillData(you.learnedSkill[i].skill[j].id).script(you.learnedSkill[i].skill[j].id)[k].effect().value;
      }
    }
  }
  return totalBonusStats;
}
/* 加成六维计算 */
function getBonusStats() {
  var equipBonusStats = getEquipBonusStats();
  var skillBonusStats = getSkillBonusStats();
  var bonusStats =
  {
    str: equipBonusStats.str + skillBonusStats.str,
    agi: equipBonusStats.agi + skillBonusStats.agi,
    vit: equipBonusStats.vit + skillBonusStats.vit,
    int: equipBonusStats.int + skillBonusStats.int,
    dex: equipBonusStats.dex + skillBonusStats.dex,
    luk: equipBonusStats.luk + skillBonusStats.luk
  };
  return bonusStats;
}
/* 根据武器类型计算atk的属性满3加成 */
function getYouExtraAtk(modifierStr = 0, modifierDex = 0) {
  var bonusStats = getBonusStats();
  if (equipData(you.equip["主手"].id).type != ("弓" || "乐器" || "鞭"))
    return bonusStats.str + modifierStr + parseInt((you.stats.str + bonusStats.str + modifierStr) / 3) * 2 + parseInt((you.stats.dex + bonusStats.dex + modifierDex) / 3);
  else
    return bonusStats.dex + parseInt((you.stats.dex + bonusStats.dex + modifierDex) / 3) * 2 + parseInt((you.stats.str + bonusStats.str + modifierStr) / 3);
}
/* 总面板属性计算 */
function getBoardStats() {
  var bonusStats = getBonusStats();
  var subStats = getSubStats();
  var equipBonusStats = getEquipBonusStats();
  var skillBonusStats = getSkillBonusStats();
  var boardStats =
  {
    str: you.stats.str + bonusStats.str,
    agi: you.stats.agi + bonusStats.agi,
    vit: you.stats.vit + bonusStats.vit,
    int: you.stats.int + bonusStats.int,
    dex: you.stats.dex + bonusStats.dex,
    luk: you.stats.luk + bonusStats.luk,
    maxhp: subStats.maxhp + equipBonusStats.maxhp + skillBonusStats.maxhp + bonusStats.vit * 3,
    maxsp: subStats.maxsp + equipBonusStats.maxsp + skillBonusStats.maxsp + bonusStats.int * 3,
    maxweight: subStats.maxweight + equipBonusStats.maxweight + skillBonusStats.maxweight + bonusStats.str * 6,
    atk: subStats.atk + equipBonusStats.atk + skillBonusStats.atk + getYouExtraAtk(),
    watk: equipBonusStats.watk + skillBonusStats.watk,
    matk: subStats.matk + equipBonusStats.matk + skillBonusStats.matk + bonusStats.int + parseInt((you.stats.int + bonusStats.int) / 3) * 2,
    wmatk: equipBonusStats.wmatk + skillBonusStats.wmatk,
    def: subStats.def + equipBonusStats.def + skillBonusStats.def + bonusStats.vit + parseInt((you.stats.luk + bonusStats.luk) / 3),
    wdef: equipBonusStats.wdef + skillBonusStats.wdef,
    mdef: subStats.mdef + equipBonusStats.mdef + skillBonusStats.mdef + bonusStats.int + parseInt((you.stats.luk + bonusStats.luk) / 3),
    wmdef: equipBonusStats.wmdef + skillBonusStats.wmdef,
    hit: subStats.hit + equipBonusStats.hit + skillBonusStats.hit + bonusStats.dex * 5 + parseInt((you.stats.luk + bonusStats.luk) / 3),
    flee: subStats.flee + equipBonusStats.flee + skillBonusStats.flee + bonusStats.agi * 5 + parseInt((you.stats.luk + bonusStats.luk) / 3),
    cri: subStats.cri + equipBonusStats.cri + skillBonusStats.cri + bonusStats.luk,
    maxap: Math.min(subStats.maxap + equipBonusStats.maxap + skillBonusStats.maxap + parseInt((you.stats.agi + bonusStats.agi) / 6), 7),
    mov: subStats.mov + equipBonusStats.mov + skillBonusStats.mov,
    ct: subStats.ct + equipBonusStats.ct + skillBonusStats.ct + parseInt((you.stats.dex + bonusStats.dex) / 6),
    range: subStats.range + equipBonusStats.range + skillBonusStats.range,
    attribute: (equipBonusStats.attribute == 0 ? you.attribute : equipBonusStats.attribute),
    race: you.race,
    size: you.size
  };
  return boardStats;
}
/* 负重计算 */
function getCarriedWeight() {
  var total = 0;
  for (let i = 0; i < Object.keys(you.carriedItem).length; i++)
    total += itemData(Object.keys(you.carriedItem)[i]).wt * you.carriedItem[Object.keys(you.carriedItem)[i]];
  for (let i = 0; i < Object.keys(you.equip).length; i++) {
    total += equipData(you.equip[Object.keys(you.equip)[i]].id).wt;
    for (let j = 0; j < you.equip[Object.keys(you.equip)[i]].card.length; j++)
      total += equipData(you.equip[Object.keys(you.equip)[i]].card[j]).wt;
  }
  return total;
}
/* 剩余属性点计算 */
function getStatsPoint() {
  return you.jobLv[0] + 5 - you.stats.str - you.stats.agi - you.stats.vit - you.stats.int - you.stats.dex - you.stats.luk;
}
/* watk特殊调整计算 */
function getSpecialWatkModifier() {
  return 0;
}
/* wdef特殊调整计算 */
function getSpecialWdefModifier() {
  return 0;
}
/* 伤害调整计算 */
function getSpecialDamageModifier() {
  return 0;
}