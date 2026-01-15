/**
 * 全时空军事名将乱战 - 战斗引擎
 */

class CombatEngine {
    constructor() {
        this.phases = [
            { id: 'reconnaissance', name: '侦察', indicators: ['infoAsymmetry', 'commandEntropy'] },
            { id: 'maneuver', name: '机动', indicators: ['strategicDepth', 'environmentConversion'] },
            { id: 'engagement', name: '交战', indicators: ['battleValue', 'casualtyRatio', 'opponentWeight'] },
            { id: 'logistics', name: '后勤', indicators: ['resourceConversion', 'troopConversion', 'organizationGranularity'] },
            { id: 'morale', name: '士气', indicators: ['moraleAnchor', 'commanderCharisma', 'errorTolerance'] },
            { id: 'pursuit', name: '追击', indicators: ['multiLineCooperation', 'conquestStability'] }
        ];
    }

    /**
     * 应用地形权重到分数
     */
    applyTerrainWeights(scores, terrain) {
        const profile = TERRAIN_PROFILES[terrain];
        if (!profile) return { ...scores };

        const adjusted = { ...scores };
        for (const [key, weight] of Object.entries(profile.weights)) {
            if (adjusted[key] !== undefined) {
                adjusted[key] = Math.round(adjusted[key] * weight);
            }
        }
        return adjusted;
    }

    /**
     * 应用母题加成
     */
    applyMotifBonus(scores, motifs) {
        const adjusted = { ...scores };
        for (const motif of motifs) {
            const def = MOTIF_DEFINITIONS[motif];
            if (def && def.scoreAdjustments) {
                for (const [key, bonus] of Object.entries(def.scoreAdjustments)) {
                    if (adjusted[key] !== undefined) {
                        adjusted[key] += bonus;
                    }
                }
            }
        }
        return adjusted;
    }

    /**
     * 应用 C/Q 元参数进行分数收缩
     * 低覆盖度/质量的名将分数向均值回归
     */
    applyCQShrinkage(scores, meta, globalMean = 75) {
        const shrinkFactor = meta.coverageC * meta.qualityQ;
        const adjusted = {};
        for (const [key, value] of Object.entries(scores)) {
            // 分数 = 全局均值 + (原分数 - 全局均值) * 收缩因子
            adjusted[key] = Math.round(globalMean + (value - globalMean) * shrinkFactor);
        }
        return adjusted;
    }

    /**
     * 添加不确定性（基于 sigma 参数）
     */
    addUncertainty(scores, sigma, seed) {
        const rng = this.seededRandom(seed);
        const adjusted = {};
        for (const [key, value] of Object.entries(scores)) {
            // 正态分布近似
            const noise = this.gaussianRandom(rng) * sigma;
            adjusted[key] = Math.max(1, Math.min(100, Math.round(value + noise)));
        }
        return adjusted;
    }

    /**
     * 带种子的随机数生成器
     */
    seededRandom(seed) {
        let state = seed;
        return () => {
            state = (state * 1103515245 + 12345) & 0x7fffffff;
            return state / 0x7fffffff;
        };
    }

    /**
     * Box-Muller 正态分布
     */
    gaussianRandom(rng) {
        const u1 = rng();
        const u2 = rng();
        return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    }

    /**
     * 计算单个阶段的战斗结果
     */
    calculatePhaseResult(phase, scoresA, scoresB, rng) {
        let totalA = 0, totalB = 0;
        const details = [];

        for (const indicator of phase.indicators) {
            const valA = scoresA[indicator] || 50;
            const valB = scoresB[indicator] || 50;
            totalA += valA;
            totalB += valB;
            details.push({
                indicator,
                label: SCORE_LABELS[indicator],
                valueA: valA,
                valueB: valB
            });
        }

        // 添加随机波动 (±10%)
        const noiseA = 1 + (rng() - 0.5) * 0.2;
        const noiseB = 1 + (rng() - 0.5) * 0.2;
        totalA *= noiseA;
        totalB *= noiseB;

        const winner = totalA > totalB ? 'A' : totalB > totalA ? 'B' : 'tie';
        const advantage = Math.abs(totalA - totalB) / Math.max(totalA, totalB) * 100;

        return {
            phase: phase.id,
            phaseName: phase.name,
            scoreA: Math.round(totalA),
            scoreB: Math.round(totalB),
            winner,
            advantage: Math.round(advantage),
            details
        };
    }

    /**
     * 执行完整战斗
     */
    executeBattle(generalA, generalB, terrain, seed = Date.now()) {
        const rng = this.seededRandom(seed);

        // 准备双方分数
        let scoresA = { ...generalA.scores };
        let scoresB = { ...generalB.scores };

        // 1. 应用 C/Q 收缩
        scoresA = this.applyCQShrinkage(scoresA, generalA.meta);
        scoresB = this.applyCQShrinkage(scoresB, generalB.meta);

        // 2. 应用地形权重
        scoresA = this.applyTerrainWeights(scoresA, terrain);
        scoresB = this.applyTerrainWeights(scoresB, terrain);

        // 3. 应用母题加成
        scoresA = this.applyMotifBonus(scoresA, generalA.motifs);
        scoresB = this.applyMotifBonus(scoresB, generalB.motifs);

        // 4. 添加不确定性
        scoresA = this.addUncertainty(scoresA, generalA.meta.sigma, seed);
        scoresB = this.addUncertainty(scoresB, generalB.meta.sigma, seed + 1);

        // 执行各阶段战斗
        const rounds = [];
        let winsA = 0, winsB = 0;
        let moraleA = 100, moraleB = 100;
        let resourcesA = 100, resourcesB = 100;

        for (const phase of this.phases) {
            const result = this.calculatePhaseResult(phase, scoresA, scoresB, rng);

            // 更新士气和资源
            if (result.winner === 'A') {
                winsA++;
                moraleA = Math.min(100, moraleA + 5);
                moraleB = Math.max(0, moraleB - 10);
                resourcesB = Math.max(0, resourcesB - 5);
            } else if (result.winner === 'B') {
                winsB++;
                moraleB = Math.min(100, moraleB + 5);
                moraleA = Math.max(0, moraleA - 10);
                resourcesA = Math.max(0, resourcesA - 5);
            }

            result.moraleA = moraleA;
            result.moraleB = moraleB;
            result.resourcesA = resourcesA;
            result.resourcesB = resourcesB;
            rounds.push(result);

            // 士气崩溃检查
            if (moraleA <= 0 || moraleB <= 0) break;
        }

        // 确定最终胜者
        let winner, winnerExplanation;
        if (moraleA <= 0) {
            winner = generalB;
            winnerExplanation = `${generalA.name}士气崩溃，${generalB.name}获胜！`;
        } else if (moraleB <= 0) {
            winner = generalA;
            winnerExplanation = `${generalB.name}士气崩溃，${generalA.name}获胜！`;
        } else if (winsA > winsB) {
            winner = generalA;
            winnerExplanation = `${generalA.name}在${winsA}个阶段中取胜，赢得战役！`;
        } else if (winsB > winsA) {
            winner = generalB;
            winnerExplanation = `${generalB.name}在${winsB}个阶段中取胜，赢得战役！`;
        } else {
            winner = null;
            winnerExplanation = '双方势均力敌，战役陷入僵局！';
        }

        // 分析关键因素
        const keyFactors = this.analyzeKeyFactors(generalA, generalB, scoresA, scoresB, terrain);

        return {
            seed,
            terrain,
            terrainName: TERRAIN_PROFILES[terrain].nameZh,
            generalA,
            generalB,
            rounds,
            winner,
            winnerExplanation,
            keyFactors,
            finalState: {
                moraleA, moraleB,
                resourcesA, resourcesB,
                winsA, winsB
            }
        };
    }

    /**
     * 分析关键胜负因素
     */
    analyzeKeyFactors(generalA, generalB, scoresA, scoresB, terrain) {
        const factors = [];
        const allKeys = Object.keys(SCORE_LABELS);

        for (const key of allKeys) {
            const diff = scoresA[key] - scoresB[key];
            if (Math.abs(diff) >= 10) {
                factors.push({
                    indicator: key,
                    label: SCORE_LABELS[key],
                    diff,
                    advantage: diff > 0 ? generalA.name : generalB.name,
                    explanation: this.getFactorExplanation(key, diff, generalA, generalB)
                });
            }
        }

        // 按差距排序
        factors.sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff));
        return factors.slice(0, 5);
    }

    /**
     * 生成因素解释
     */
    getFactorExplanation(key, diff, generalA, generalB) {
        const advantageGeneral = diff > 0 ? generalA : generalB;
        const label = SCORE_LABELS[key];
        return `${advantageGeneral.name}在"${label}"方面领先${Math.abs(diff)}点`;
    }

    /**
     * 生成战斗叙事
     */
    generateNarrative(result) {
        const narratives = [];

        narratives.push(`【${result.terrainName}战役】`);
        narratives.push(`${result.generalA.name} VS ${result.generalB.name}`);
        narratives.push('');

        for (const round of result.rounds) {
            let phaseText = `📍 ${round.phaseName}阶段：`;
            if (round.winner === 'A') {
                phaseText += `${result.generalA.name}占优 (+${round.advantage}%)`;
            } else if (round.winner === 'B') {
                phaseText += `${result.generalB.name}占优 (+${round.advantage}%)`;
            } else {
                phaseText += '双方僵持';
            }
            narratives.push(phaseText);

            // 关键指标
            const keyDetail = round.details.reduce((a, b) =>
                Math.abs(a.valueA - a.valueB) > Math.abs(b.valueA - b.valueB) ? a : b
            );
            narratives.push(`  └ 关键：${keyDetail.label} (${keyDetail.valueA} vs ${keyDetail.valueB})`);
            narratives.push(`  └ 士气：${round.moraleA} / ${round.moraleB}`);
        }

        narratives.push('');
        narratives.push(`🏆 ${result.winnerExplanation}`);

        return narratives;
    }
}

// 全局战斗引擎实例
const combatEngine = new CombatEngine();
