/**
 * 全时空军事名将乱战 - 名将数据
 * 合并自 seeds/fallback_part1-4.json
 * 已移除政治摩擦抗性，提升谋略和环境利用分值
 */

const GENERALS = [
    // === Part 1: 西方古典名将 ===
    {
        id: "hannibal",
        name: "汉尼拔·巴卡",
        region: "MediterraneanMiddleEast",
        era: "Classical",
        tags: ["cavalry", "tactical_genius", "strategist"],
        motifs: ["double_envelopment", "operational_depth", "deception_intel_gap"],
        scores: {
            battleValue: 94, strategicDepth: 96, casualtyRatio: 90, opponentWeight: 92,
            techEnvironment: 75, commandEntropy: 90, environmentConversion: 94,
            errorTolerance: 78, multiLineCooperation: 72,
            resourceConversion: 68, organizationGranularity: 80, troopConversion: 75,
            infoAsymmetry: 96, moraleAnchor: 85, commanderCharisma: 90,
            conquestStability: 52, institutionalInnovation: 58
        },
        meta: { coverageC: 0.95, qualityQ: 0.92, sigma: 4.2 },
        birthYear: -247, deathYear: -183
    },
    {
        id: "alexander",
        name: "亚历山大大帝",
        region: "MediterraneanMiddleEast",
        era: "Classical",
        tags: ["cavalry", "conqueror", "empire_builder"],
        motifs: ["operational_depth", "double_envelopment", "shock_morale_anchor"],
        scores: {
            battleValue: 95, strategicDepth: 98, casualtyRatio: 90, opponentWeight: 92,
            techEnvironment: 75, commandEntropy: 90, environmentConversion: 92,
            errorTolerance: 75, multiLineCooperation: 72,
            resourceConversion: 70, organizationGranularity: 80, troopConversion: 78,
            infoAsymmetry: 90, moraleAnchor: 95, commanderCharisma: 98,
            conquestStability: 40, institutionalInnovation: 65
        },
        meta: { coverageC: 0.98, qualityQ: 0.95, sigma: 3.5 },
        birthYear: -356, deathYear: -323
    },
    {
        id: "caesar",
        name: "尤利乌斯·凯撒",
        region: "Europe",
        era: "Classical",
        tags: ["politician", "conqueror", "reformer"],
        motifs: ["operational_depth", "logistics_conversion", "coalition_command"],
        scores: {
            battleValue: 88, strategicDepth: 92, casualtyRatio: 82, opponentWeight: 78,
            techEnvironment: 78, commandEntropy: 85, environmentConversion: 88,
            errorTolerance: 70, multiLineCooperation: 68,
            resourceConversion: 82, organizationGranularity: 88, troopConversion: 80,
            infoAsymmetry: 85, moraleAnchor: 85, commanderCharisma: 92,
            conquestStability: 70, institutionalInnovation: 85
        },
        meta: { coverageC: 0.97, qualityQ: 0.94, sigma: 3.8 },
        birthYear: -100, deathYear: -44
    },
    {
        id: "napoleon",
        name: "拿破仑·波拿巴",
        region: "Europe",
        era: "EarlyModern",
        tags: ["emperor", "reformer", "artillery"],
        motifs: ["operational_depth", "double_envelopment", "deception_intel_gap"],
        scores: {
            battleValue: 94, strategicDepth: 96, casualtyRatio: 78, opponentWeight: 88,
            techEnvironment: 88, commandEntropy: 92, environmentConversion: 90,
            errorTolerance: 65, multiLineCooperation: 70,
            resourceConversion: 75, organizationGranularity: 90, troopConversion: 82,
            infoAsymmetry: 93, moraleAnchor: 90, commanderCharisma: 95,
            conquestStability: 55, institutionalInnovation: 88
        },
        meta: { coverageC: 0.99, qualityQ: 0.96, sigma: 3.2 },
        birthYear: 1769, deathYear: 1821
    },
    {
        id: "genghis_khan",
        name: "成吉思汗",
        region: "EastAsia",
        era: "Medieval",
        tags: ["conqueror", "cavalry", "empire_builder"],
        motifs: ["operational_depth", "feigned_retreat", "deception_intel_gap", "logistics_conversion"],
        scores: {
            battleValue: 90, strategicDepth: 98, casualtyRatio: 72, opponentWeight: 85,
            techEnvironment: 72, commandEntropy: 88, environmentConversion: 96,
            errorTolerance: 78, multiLineCooperation: 85,
            resourceConversion: 88, organizationGranularity: 82, troopConversion: 90,
            infoAsymmetry: 95, moraleAnchor: 88, commanderCharisma: 95,
            conquestStability: 75, institutionalInnovation: 80
        },
        meta: { coverageC: 0.96, qualityQ: 0.90, sigma: 4.5 },
        birthYear: 1162, deathYear: 1227
    },

    // === 韩信 - 兵仙 (第7位) ===
    {
        id: "hanxin",
        name: "韩信",
        region: "EastAsia",
        era: "Classical",
        tags: ["strategist", "tactical_genius", "infantry"],
        motifs: ["shock_morale_anchor", "terrain_funneling", "deception_intel_gap", "double_envelopment"],
        scores: {
            battleValue: 98, strategicDepth: 95, casualtyRatio: 95, opponentWeight: 92,
            techEnvironment: 75, commandEntropy: 98, environmentConversion: 98,
            errorTolerance: 85, multiLineCooperation: 85,
            resourceConversion: 82, organizationGranularity: 90, troopConversion: 92,
            infoAsymmetry: 99, moraleAnchor: 99, commanderCharisma: 82,
            conquestStability: 55, institutionalInnovation: 70
        },
        meta: { coverageC: 0.92, qualityQ: 0.88, sigma: 4.8 },
        birthYear: -231, deathYear: -196
    },

    // === Part 2: 东亚名将 ===
    {
        id: "sunwu",
        name: "孙武",
        region: "EastAsia",
        era: "Classical",
        tags: ["theorist", "strategist"],
        motifs: ["deception_intel_gap", "terrain_funneling", "operational_depth"],
        scores: {
            battleValue: 78, strategicDepth: 85, casualtyRatio: 80, opponentWeight: 72,
            techEnvironment: 65, commandEntropy: 92, environmentConversion: 92,
            errorTolerance: 82, multiLineCooperation: 68,
            resourceConversion: 78, organizationGranularity: 80, troopConversion: 75,
            infoAsymmetry: 99, moraleAnchor: 85, commanderCharisma: 78,
            conquestStability: 65, institutionalInnovation: 95
        },
        meta: { coverageC: 0.85, qualityQ: 0.82, sigma: 5.5 },
        birthYear: -544, deathYear: -496
    },
    {
        id: "zhuge_liang",
        name: "诸葛亮",
        region: "EastAsia",
        era: "Classical",
        tags: ["strategist", "politician", "inventor"],
        motifs: ["deception_intel_gap", "logistics_conversion", "coalition_command"],
        scores: {
            battleValue: 68, strategicDepth: 80, casualtyRatio: 70, opponentWeight: 74,
            techEnvironment: 80, commandEntropy: 82, environmentConversion: 80,
            errorTolerance: 68, multiLineCooperation: 74,
            resourceConversion: 82, organizationGranularity: 86, troopConversion: 78,
            infoAsymmetry: 90, moraleAnchor: 70, commanderCharisma: 82,
            conquestStability: 65, institutionalInnovation: 80
        },
        meta: { coverageC: 0.94, qualityQ: 0.85, sigma: 5.0 },
        birthYear: 181, deathYear: 234
    },
    {
        id: "baiqi",
        name: "白起",
        region: "EastAsia",
        era: "Classical",
        tags: ["ruthless", "siege_master", "infantry"],
        motifs: ["double_envelopment", "logistics_conversion", "terrain_funneling"],
        scores: {
            battleValue: 98, strategicDepth: 92, casualtyRatio: 95, opponentWeight: 92,
            techEnvironment: 70, commandEntropy: 88, environmentConversion: 95,
            errorTolerance: 72, multiLineCooperation: 68,
            resourceConversion: 78, organizationGranularity: 85, troopConversion: 80,
            infoAsymmetry: 90, moraleAnchor: 80, commanderCharisma: 72,
            conquestStability: 58, institutionalInnovation: 47
        },
        meta: { coverageC: 0.88, qualityQ: 0.85, sigma: 5.2 },
        birthYear: -332, deathYear: -257
    },
    {
        id: "cao_cao",
        name: "曹操",
        region: "EastAsia",
        era: "Classical",
        tags: ["politician", "poet", "warlord"],
        motifs: ["deception_intel_gap", "logistics_conversion", "coalition_command"],
        scores: {
            battleValue: 75, strategicDepth: 82, casualtyRatio: 68, opponentWeight: 78,
            techEnvironment: 68, commandEntropy: 80, environmentConversion: 75,
            errorTolerance: 72, multiLineCooperation: 75,
            resourceConversion: 80, organizationGranularity: 82, troopConversion: 78,
            infoAsymmetry: 85, moraleAnchor: 72, commanderCharisma: 85,
            conquestStability: 75, institutionalInnovation: 78
        },
        meta: { coverageC: 0.95, qualityQ: 0.90, sigma: 4.5 },
        birthYear: 155, deathYear: 220
    },

    // === Part 3: 更多东亚名将 ===
    {
        id: "xiang_yu",
        name: "项羽",
        region: "EastAsia",
        era: "Classical",
        tags: ["cavalry", "warrior", "tragic_hero"],
        motifs: ["shock_morale_anchor", "double_envelopment"],
        scores: {
            battleValue: 98, strategicDepth: 80, casualtyRatio: 92, opponentWeight: 90,
            techEnvironment: 70, commandEntropy: 85, environmentConversion: 90,
            errorTolerance: 68, multiLineCooperation: 60,
            resourceConversion: 68, organizationGranularity: 78, troopConversion: 88,
            infoAsymmetry: 82, moraleAnchor: 98, commanderCharisma: 95,
            conquestStability: 40, institutionalInnovation: 44
        },
        meta: { coverageC: 0.92, qualityQ: 0.88, sigma: 4.8 },
        birthYear: -232, deathYear: -202
    },
    {
        id: "li_jing",
        name: "李靖",
        region: "EastAsia",
        era: "Medieval",
        tags: ["cavalry", "strategist", "theorist"],
        motifs: ["operational_depth", "feigned_retreat", "deception_intel_gap"],
        scores: {
            battleValue: 90, strategicDepth: 92, casualtyRatio: 85, opponentWeight: 82,
            techEnvironment: 72, commandEntropy: 90, environmentConversion: 92,
            errorTolerance: 82, multiLineCooperation: 75,
            resourceConversion: 80, organizationGranularity: 85, troopConversion: 82,
            infoAsymmetry: 92, moraleAnchor: 82, commanderCharisma: 80,
            conquestStability: 75, institutionalInnovation: 72
        },
        meta: { coverageC: 0.85, qualityQ: 0.82, sigma: 5.5 },
        birthYear: 571, deathYear: 649
    },
    {
        id: "yue_fei",
        name: "岳飞",
        region: "EastAsia",
        era: "Medieval",
        tags: ["patriot", "infantry", "cavalry"],
        motifs: ["shock_morale_anchor", "logistics_conversion", "terrain_funneling"],
        scores: {
            battleValue: 92, strategicDepth: 85, casualtyRatio: 90, opponentWeight: 88,
            techEnvironment: 70, commandEntropy: 85, environmentConversion: 88,
            errorTolerance: 75, multiLineCooperation: 70,
            resourceConversion: 78, organizationGranularity: 88, troopConversion: 90,
            infoAsymmetry: 82, moraleAnchor: 98, commanderCharisma: 95,
            conquestStability: 45, institutionalInnovation: 55
        },
        meta: { coverageC: 0.90, qualityQ: 0.88, sigma: 4.8 },
        birthYear: 1103, deathYear: 1142
    },
    {
        id: "qi_jiguang",
        name: "戚继光",
        region: "EastAsia",
        era: "EarlyModern",
        tags: ["innovator", "anti_piracy", "trainer"],
        motifs: ["terrain_funneling", "logistics_conversion", "coalition_command"],
        scores: {
            battleValue: 78, strategicDepth: 70, casualtyRatio: 85, opponentWeight: 68,
            techEnvironment: 80, commandEntropy: 72, environmentConversion: 82,
            errorTolerance: 75, multiLineCooperation: 75,
            resourceConversion: 78, organizationGranularity: 88, troopConversion: 85,
            infoAsymmetry: 78, moraleAnchor: 80, commanderCharisma: 75,
            conquestStability: 65, institutionalInnovation: 80
        },
        meta: { coverageC: 0.85, qualityQ: 0.82, sigma: 5.5 },
        birthYear: 1528, deathYear: 1588
    },
    {
        id: "sun_bin",
        name: "孙膑",
        region: "EastAsia",
        era: "Classical",
        tags: ["strategist", "tactician"],
        motifs: ["deception_intel_gap", "terrain_funneling", "feigned_retreat"],
        scores: {
            battleValue: 88, strategicDepth: 85, casualtyRatio: 88, opponentWeight: 82,
            techEnvironment: 62, commandEntropy: 92, environmentConversion: 92,
            errorTolerance: 78, multiLineCooperation: 70,
            resourceConversion: 72, organizationGranularity: 78, troopConversion: 75,
            infoAsymmetry: 98, moraleAnchor: 80, commanderCharisma: 70,
            conquestStability: 55, institutionalInnovation: 80
        },
        meta: { coverageC: 0.82, qualityQ: 0.78, sigma: 6.0 },
        birthYear: -380, deathYear: -316
    },

    // === Part 4: 地中海/中东名将 ===
    {
        id: "scipio",
        name: "大西庇阿",
        region: "Europe",
        era: "Classical",
        tags: ["tactician", "diplomat"],
        motifs: ["double_envelopment", "feigned_retreat"],
        scores: {
            battleValue: 88, strategicDepth: 85, casualtyRatio: 85, opponentWeight: 92,
            techEnvironment: 72, commandEntropy: 85, environmentConversion: 88,
            errorTolerance: 78, multiLineCooperation: 72,
            resourceConversion: 75, organizationGranularity: 80, troopConversion: 78,
            infoAsymmetry: 88, moraleAnchor: 85, commanderCharisma: 88,
            conquestStability: 70, institutionalInnovation: 65
        },
        meta: { coverageC: 0.90, qualityQ: 0.88, sigma: 4.8 },
        birthYear: -236, deathYear: -183
    },
    {
        id: "belisarius",
        name: "贝利撒留",
        region: "MediterraneanMiddleEast",
        era: "Medieval",
        tags: ["cavalry", "defensive_master"],
        motifs: ["terrain_funneling", "deception_intel_gap", "logistics_conversion"],
        scores: {
            battleValue: 88, strategicDepth: 82, casualtyRatio: 90, opponentWeight: 85,
            techEnvironment: 75, commandEntropy: 88, environmentConversion: 90,
            errorTolerance: 85, multiLineCooperation: 78,
            resourceConversion: 88, organizationGranularity: 82, troopConversion: 85,
            infoAsymmetry: 90, moraleAnchor: 82, commanderCharisma: 80,
            conquestStability: 60, institutionalInnovation: 55
        },
        meta: { coverageC: 0.88, qualityQ: 0.85, sigma: 5.0 },
        birthYear: 505, deathYear: 565
    },
    {
        id: "saladin",
        name: "萨拉丁",
        region: "MediterraneanMiddleEast",
        era: "Medieval",
        tags: ["cavalry", "chivalrous", "diplomat"],
        motifs: ["terrain_funneling", "logistics_conversion", "coalition_command"],
        scores: {
            battleValue: 85, strategicDepth: 88, casualtyRatio: 82, opponentWeight: 88,
            techEnvironment: 72, commandEntropy: 82, environmentConversion: 90,
            errorTolerance: 80, multiLineCooperation: 88,
            resourceConversion: 82, organizationGranularity: 78, troopConversion: 80,
            infoAsymmetry: 85, moraleAnchor: 88, commanderCharisma: 92,
            conquestStability: 75, institutionalInnovation: 70
        },
        meta: { coverageC: 0.92, qualityQ: 0.88, sigma: 4.8 },
        birthYear: 1137, deathYear: 1193
    },
    {
        id: "khalid",
        name: "哈立德·本·瓦利德",
        region: "MediterraneanMiddleEast",
        era: "Medieval",
        tags: ["cavalry", "undefeated", "conqueror"],
        motifs: ["operational_depth", "feigned_retreat", "double_envelopment"],
        scores: {
            battleValue: 95, strategicDepth: 90, casualtyRatio: 92, opponentWeight: 85,
            techEnvironment: 68, commandEntropy: 90, environmentConversion: 92,
            errorTolerance: 82, multiLineCooperation: 80,
            resourceConversion: 78, organizationGranularity: 82, troopConversion: 85,
            infoAsymmetry: 92, moraleAnchor: 92, commanderCharisma: 90,
            conquestStability: 72, institutionalInnovation: 65
        },
        meta: { coverageC: 0.88, qualityQ: 0.85, sigma: 5.0 },
        birthYear: 592, deathYear: 642
    },
    {
        id: "cyrus",
        name: "居鲁士大帝",
        region: "MediterraneanMiddleEast",
        era: "Ancient",
        tags: ["conqueror", "empire_builder", "tolerant"],
        motifs: ["operational_depth", "coalition_command", "logistics_conversion"],
        scores: {
            battleValue: 85, strategicDepth: 92, casualtyRatio: 80, opponentWeight: 82,
            techEnvironment: 65, commandEntropy: 82, environmentConversion: 90,
            errorTolerance: 78, multiLineCooperation: 85,
            resourceConversion: 82, organizationGranularity: 78, troopConversion: 80,
            infoAsymmetry: 85, moraleAnchor: 85, commanderCharisma: 92,
            conquestStability: 90, institutionalInnovation: 88
        },
        meta: { coverageC: 0.88, qualityQ: 0.85, sigma: 5.0 },
        birthYear: -600, deathYear: -530
    }
];

// 地形配置（已移除政治摩擦抗性引用）
const TERRAIN_PROFILES = {
    plains: {
        name: "plains", nameZh: "平原",
        weights: { strategicDepth: 1.3, organizationGranularity: 1.2, environmentConversion: 0.8, multiLineCooperation: 1.1, troopConversion: 1.1 }
    },
    river: {
        name: "river", nameZh: "河流",
        weights: { environmentConversion: 1.4, infoAsymmetry: 1.3, strategicDepth: 0.7, resourceConversion: 1.2, errorTolerance: 0.9 }
    },
    mountain: {
        name: "mountain", nameZh: "山地",
        weights: { environmentConversion: 1.5, errorTolerance: 1.3, organizationGranularity: 0.7, commandEntropy: 1.2, moraleAnchor: 1.1 }
    },
    forest: {
        name: "forest", nameZh: "森林",
        weights: { infoAsymmetry: 1.5, commandEntropy: 1.3, strategicDepth: 0.7, environmentConversion: 1.3 }
    },
    desert: {
        name: "desert", nameZh: "沙漠",
        weights: { resourceConversion: 1.4, moraleAnchor: 1.3, troopConversion: 0.7, strategicDepth: 1.2, errorTolerance: 0.9 }
    },
    urban: {
        name: "urban", nameZh: "城市",
        weights: { organizationGranularity: 1.4, infoAsymmetry: 1.3, strategicDepth: 0.7, commanderCharisma: 1.2 }
    }
};

// 战术母题配置
const MOTIF_DEFINITIONS = {
    double_envelopment: {
        nameZh: "双重包围",
        description: "对敌军实施两翼包抄，形成合围态势",
        scoreAdjustments: { infoAsymmetry: 5, commandEntropy: 3, environmentConversion: 3 }
    },
    feigned_retreat: {
        nameZh: "佯退诱敌",
        description: "假装撤退引诱敌军追击，再反戈一击",
        scoreAdjustments: { infoAsymmetry: 5, errorTolerance: 2, environmentConversion: 2 }
    },
    terrain_funneling: {
        nameZh: "地形漏斗",
        description: "利用隘口、渡口等地形限制敌军展开",
        scoreAdjustments: { environmentConversion: 6, organizationGranularity: 2 }
    },
    shock_morale_anchor: {
        nameZh: "士气锚定",
        description: "背水一战、破釜沉舟等激励士气的战术",
        scoreAdjustments: { moraleAnchor: 5, errorTolerance: 2 }
    },
    operational_depth: {
        nameZh: "战略纵深",
        description: "多次连续会战、远程机动作战",
        scoreAdjustments: { strategicDepth: 5, multiLineCooperation: 2, environmentConversion: 2 }
    },
    deception_intel_gap: {
        nameZh: "信息不对称",
        description: "制造情报差距，使敌方判断失误",
        scoreAdjustments: { infoAsymmetry: 6, commandEntropy: 3 }
    },
    logistics_conversion: {
        nameZh: "后勤转化",
        description: "高效的补给管理和资源利用",
        scoreAdjustments: { resourceConversion: 5, troopConversion: 2, environmentConversion: 2 }
    },
    coalition_command: {
        nameZh: "联军指挥",
        description: "协调多国或多族群军队作战",
        scoreAdjustments: { multiLineCooperation: 5, organizationGranularity: 2, commanderCharisma: 2 }
    }
};

// 地区和时代标签
const REGION_LABELS = {
    EastAsia: "东亚",
    Europe: "欧洲",
    MediterraneanMiddleEast: "地中海与中东",
    SouthAsia: "南亚",
    Americas: "美洲",
    Other: "其他"
};

const ERA_LABELS = {
    Ancient: "上古",
    Classical: "古典",
    Medieval: "中世纪",
    EarlyModern: "近代早期",
    Modern: "近现代",
    Contemporary: "当代"
};

// 评分指标标签（已移除政治摩擦抗性）
const SCORE_LABELS = {
    battleValue: "单场价值",
    strategicDepth: "战略纵深",
    casualtyRatio: "战损比",
    opponentWeight: "对手加权",
    techEnvironment: "技术环境因子",
    commandEntropy: "指挥熵",
    environmentConversion: "环境转化率",
    errorTolerance: "容错空间",
    multiLineCooperation: "多线协作",
    resourceConversion: "资源转化率",
    organizationGranularity: "组织颗粒度",
    troopConversion: "兵员转化",
    infoAsymmetry: "谋略水平",
    moraleAnchor: "士气锚定",
    commanderCharisma: "统帅魅力",
    conquestStability: "征服稳定性",
    institutionalInnovation: "制度创新力"
};

// 指标分组（用于详情展示）
const SCORE_GROUPS = {
    "基础战绩": ["battleValue", "strategicDepth", "casualtyRatio", "opponentWeight"],
    "能力修正": ["techEnvironment", "commandEntropy", "environmentConversion"],
    "抗压韧性": ["errorTolerance", "multiLineCooperation"],
    "组织成本": ["resourceConversion", "organizationGranularity", "troopConversion"],
    "心理意志": ["infoAsymmetry", "moraleAnchor", "commanderCharisma"],
    "文明持久": ["conquestStability", "institutionalInnovation"]
};

// 导出（如果需要模块化）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GENERALS, TERRAIN_PROFILES, MOTIF_DEFINITIONS, REGION_LABELS, ERA_LABELS, SCORE_LABELS, SCORE_GROUPS };
}
