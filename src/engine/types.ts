/**
 * 全时空军事名将乱战 - 核心类型定义
 */

// 地区枚举
export type Region =
    | 'EastAsia'
    | 'Europe'
    | 'MediterraneanMiddleEast'
    | 'SouthAsia'
    | 'Americas'
    | 'Other';

// 时代枚举
export type Era =
    | 'Ancient'      // 古代 (公元前)
    | 'Classical'    // 古典 (公元前500-公元500)
    | 'Medieval'     // 中世纪 (500-1500)
    | 'EarlyModern'  // 近代早期 (1500-1800)
    | 'Modern'       // 近现代 (1800-1945)
    | 'Contemporary'; // 当代 (1945-)

// 地形枚举
export type Terrain =
    | 'plains'   // 平原
    | 'river'    // 河流
    | 'mountain' // 山地
    | 'forest'   // 森林
    | 'desert'   // 沙漠
    | 'urban';   // 城市

// 战术母题
export type Motif =
    | 'double_envelopment'    // 双重包围/合围
    | 'feigned_retreat'       // 佯退诱敌
    | 'terrain_funneling'     // 地形漏斗/隘口控制
    | 'shock_morale_anchor'   // 士气锚定：背水/破釜沉舟
    | 'operational_depth'     // 战略纵深/远程机动
    | 'deception_intel_gap'   // 制造信息不对称
    | 'logistics_conversion'  // 补给/资源转化
    | 'coalition_command';    // 盟军/多族群协同

// 18项评分指标
export interface Scores {
    // 基础战绩 (4项)
    battleValue: number;         // 单场价值
    strategicDepth: number;      // 战略纵深
    casualtyRatio: number;       // 战损比
    opponentWeight: number;      // 对手加权

    // 能力修正 (3项)
    techEnvironment: number;     // 技术环境因子
    commandEntropy: number;      // 指挥熵
    environmentConversion: number; // 环境转化率

    // 抗压韧性 (3项)
    politicalResistance: number; // 政治摩擦抗性
    errorTolerance: number;      // 容错空间
    multiLineCooperation: number; // 多线协作

    // 组织成本 (3项)
    resourceConversion: number;  // 资源转化率
    organizationGranularity: number; // 组织颗粒度
    troopConversion: number;     // 兵员转化

    // 心理意志 (3项)
    infoAsymmetry: number;       // 信息不对称制造
    moraleAnchor: number;        // 士气锚定
    commanderCharisma: number;   // 统帅魅力

    // 文明持久 (2项)
    conquestStability: number;   // 征服稳定性
    institutionalInnovation: number; // 制度创新力
}

// 18项指标的键名列表
export const SCORE_KEYS: (keyof Scores)[] = [
    'battleValue', 'strategicDepth', 'casualtyRatio', 'opponentWeight',
    'techEnvironment', 'commandEntropy', 'environmentConversion',
    'politicalResistance', 'errorTolerance', 'multiLineCooperation',
    'resourceConversion', 'organizationGranularity', 'troopConversion',
    'infoAsymmetry', 'moraleAnchor', 'commanderCharisma',
    'conquestStability', 'institutionalInnovation'
];

// 基础战绩4项（不参与文明均值约束）
export const BASE_SCORE_KEYS: (keyof Scores)[] = [
    'battleValue', 'strategicDepth', 'casualtyRatio', 'opponentWeight'
];

// 能力层14项（参与文明均值约束）
export const ABILITY_SCORE_KEYS: (keyof Scores)[] = SCORE_KEYS.filter(
    k => !BASE_SCORE_KEYS.includes(k)
);

// 指标中文名映射
export const SCORE_LABELS: Record<keyof Scores, string> = {
    battleValue: '单场价值',
    strategicDepth: '战略纵深',
    casualtyRatio: '战损比',
    opponentWeight: '对手加权',
    techEnvironment: '技术环境因子',
    commandEntropy: '指挥熵',
    environmentConversion: '环境转化率',
    politicalResistance: '政治摩擦抗性',
    errorTolerance: '容错空间',
    multiLineCooperation: '多线协作',
    resourceConversion: '资源转化率',
    organizationGranularity: '组织颗粒度',
    troopConversion: '兵员转化',
    infoAsymmetry: '信息不对称制造',
    moraleAnchor: '士气锚定',
    commanderCharisma: '统帅魅力',
    conquestStability: '征服稳定性',
    institutionalInnovation: '制度创新力'
};

// 指标分组
export const SCORE_GROUPS = {
    基础战绩: ['battleValue', 'strategicDepth', 'casualtyRatio', 'opponentWeight'] as (keyof Scores)[],
    能力修正: ['techEnvironment', 'commandEntropy', 'environmentConversion'] as (keyof Scores)[],
    抗压韧性: ['politicalResistance', 'errorTolerance', 'multiLineCooperation'] as (keyof Scores)[],
    组织成本: ['resourceConversion', 'organizationGranularity', 'troopConversion'] as (keyof Scores)[],
    心理意志: ['infoAsymmetry', 'moraleAnchor', 'commanderCharisma'] as (keyof Scores)[],
    文明持久: ['conquestStability', 'institutionalInnovation'] as (keyof Scores)[]
};

// 战役信息
export interface Battle {
    titleByLang: Record<string, string>; // 多语言标题
    qid?: string;                        // Wikidata QID
    wikiUrlsByLang?: Record<string, string>;
    matchedMotifs?: MotifMatch[];        // 命中的母题
}

// 母题匹配证据
export interface MotifMatch {
    motif: Motif;
    source: 'keyword' | 'mapping' | 'manual';
    evidence: string; // 触发证据：关键词/战役名/映射规则
}

// 元参数（不属于18项，用于公平性）
export interface Meta {
    coverageC: number;  // 证据覆盖度 0..1
    qualityQ: number;   // 证据质量 0..1
    sigma: number;      // 不确定性（对战抽样用）
}

// 来源信息
export interface Sources {
    wikidataUrl: string;
    wikiUrlsByLang: Record<string, string>;
    pageviews365ByLang: Record<string, number>;
    totalPageviews365: number;
    revisionIdsByLang?: Record<string, string>;
    extractedKeywords?: string[];
}

// 军事家完整数据结构
export interface General {
    id: string;                          // 唯一ID
    name: string;                        // 主显示名（中文优先）
    wikiTitleByLang: Record<string, string>; // 多语言Wikipedia标题
    qid: string;                         // Wikidata QID
    region: Region;
    era: Era;
    tags: string[];
    motifs: Motif[];
    scores: Scores;
    meta: Meta;
    sources: Sources;
    battles: Battle[];
    birthYear?: number;
    deathYear?: number;
}

// 地形权重配置
export interface TerrainProfile {
    name: string;
    nameZh: string;
    weights: Partial<Record<keyof Scores, number>>; // 权重乘数 0.5~1.5
}

// 战斗状态
export interface CombatantState {
    general: General;
    morale: number;       // 士气 0~100
    resources: number;    // 资源 0~100
    posture: number;      // 态势值 0~1
    isEliminated: boolean;
    eliminatedRound?: number;
}

// 回合事件
export interface RoundEvent {
    round: number;
    phase: 'reconnaissance' | 'maneuver' | 'engagement' | 'logistics' | 'morale' | 'pursuit';
    phaseZh: string;
    actors: string[];     // 参与者ID
    description: string;  // 中文描述
    keyIndicators?: { indicator: keyof Scores; value: number; terrainBonus?: number }[];
}

// 战斗结果
export interface BattleResult {
    seed: number;
    terrain: Terrain;
    participants: General[];
    rounds: RoundEvent[];
    winner: General | null;
    winnerExplanation: string; // 关键胜因解释
    keyFactors: { indicator: keyof Scores; diff: number; explanation: string }[];
    finalStates: CombatantState[];
}

// 公平性检查结果
export interface FairnessCheckResult {
    name: string;
    nameZh: string;
    passed: boolean;
    value: number;
    threshold: number;
    details?: string;
}

// 配额常量
export const REGION_QUOTAS: Record<Region, number> = {
    EastAsia: 10,
    Europe: 10,
    MediterraneanMiddleEast: 10,
    SouthAsia: 6,
    Americas: 6,
    Other: 8
};

// 地区中文名
export const REGION_LABELS: Record<Region, string> = {
    EastAsia: '东亚',
    Europe: '欧洲',
    MediterraneanMiddleEast: '地中海与中东',
    SouthAsia: '南亚',
    Americas: '美洲',
    Other: '其他'
};

// 时代中文名
export const ERA_LABELS: Record<Era, string> = {
    Ancient: '上古',
    Classical: '古典',
    Medieval: '中世纪',
    EarlyModern: '近代早期',
    Modern: '近现代',
    Contemporary: '当代'
};

// 母题中文名
export const MOTIF_LABELS: Record<Motif, string> = {
    double_envelopment: '双重包围',
    feigned_retreat: '佯退诱敌',
    terrain_funneling: '地形漏斗',
    shock_morale_anchor: '士气锚定',
    operational_depth: '战略纵深',
    deception_intel_gap: '信息不对称',
    logistics_conversion: '后勤转化',
    coalition_command: '联军指挥'
};

// 地形中文名
export const TERRAIN_LABELS: Record<Terrain, string> = {
    plains: '平原',
    river: '河流',
    mountain: '山地',
    forest: '森林',
    desert: '沙漠',
    urban: '城市'
};
