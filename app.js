/**
 * 全时空军事名将乱战 - 主应用逻辑
 */

class GameApp {
    constructor() {
        this.state = {
            phase: 'selection', // selection | terrain | battle | result
            selectedGenerals: [null, null],
            currentPlayer: 0,
            selectedTerrain: null,
            battleResult: null,
            battleHistory: []
        };

        this.init();
    }

    init() {
        this.renderGeneralGrid();
        this.renderTerrainGrid();
        this.setupEventListeners();
        this.createDetailModal();
        this.updateUI();
    }

    // ==================== 渲染方法 ====================

    renderGeneralGrid() {
        const grid = document.getElementById('general-grid');
        grid.innerHTML = '';

        for (const general of GENERALS) {
            const card = this.createGeneralCard(general);
            grid.appendChild(card);
        }
    }

    createGeneralCard(general, size = 'normal') {
        const card = document.createElement('div');
        card.className = `general-card ${size}`;
        card.dataset.id = general.id;

        const avgScore = this.calculateAvgScore(general.scores);
        const regionLabel = REGION_LABELS[general.region] || general.region;
        const eraLabel = ERA_LABELS[general.era] || general.era;

        card.innerHTML = `
            <div class="general-avatar">${general.name.charAt(0)}</div>
            <div class="general-info">
                <h3 class="general-name">${general.name}</h3>
                <div class="general-meta">
                    <span class="region-tag">${regionLabel}</span>
                    <span class="era-tag">${eraLabel}</span>
                </div>
                <div class="general-score">
                    <span class="score-value">${avgScore}</span>
                    <span class="score-label">综合</span>
                </div>
            </div>
            <div class="general-motifs">
                ${general.motifs.slice(0, 2).map(m =>
            `<span class="motif-tag">${MOTIF_DEFINITIONS[m]?.nameZh || m}</span>`
        ).join('')}
            </div>
            <button class="detail-btn" data-id="${general.id}" title="查看详情">📊</button>
        `;

        return card;
    }

    calculateAvgScore(scores) {
        const values = Object.values(scores);
        return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
    }

    renderTerrainGrid() {
        const grid = document.getElementById('terrain-grid');
        grid.innerHTML = '';

        for (const [key, terrain] of Object.entries(TERRAIN_PROFILES)) {
            const card = document.createElement('div');
            card.className = 'terrain-card';
            card.dataset.terrain = key;

            const bonuses = Object.entries(terrain.weights)
                .filter(([_, v]) => v > 1)
                .slice(0, 3)
                .map(([k, v]) => `${SCORE_LABELS[k]} +${Math.round((v - 1) * 100)}%`);

            card.innerHTML = `
                <div class="terrain-icon">${this.getTerrainIcon(key)}</div>
                <h3 class="terrain-name">${terrain.nameZh}</h3>
                <div class="terrain-bonuses">
                    ${bonuses.map(b => `<span class="bonus-tag">↑${b}</span>`).join('')}
                </div>
            `;

            grid.appendChild(card);
        }
    }

    getTerrainIcon(terrain) {
        const icons = {
            plains: '🌾',
            river: '🌊',
            mountain: '⛰️',
            forest: '🌲',
            desert: '🏜️',
            urban: '🏰'
        };
        return icons[terrain] || '🗺️';
    }

    renderSelectedGenerals() {
        const containers = [
            document.getElementById('selected-general-1'),
            document.getElementById('selected-general-2')
        ];

        for (let i = 0; i < 2; i++) {
            const general = this.state.selectedGenerals[i];
            const container = containers[i];

            if (general) {
                container.innerHTML = '';
                const card = this.createGeneralCard(general, 'large');
                card.classList.add('selected');
                container.appendChild(card);

                // 添加雷达图
                this.renderRadarChart(container, general);
            } else {
                container.innerHTML = `
                    <div class="empty-slot">
                        <span class="slot-icon">👤</span>
                        <span class="slot-text">选择${i === 0 ? '红方' : '蓝方'}名将</span>
                    </div>
                `;
            }
        }
    }

    renderRadarChart(container, general) {
        const canvas = document.createElement('canvas');
        canvas.className = 'radar-chart';
        canvas.width = 200;
        canvas.height = 200;
        container.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const center = { x: 100, y: 100 };
        const radius = 80;

        // 选取6个关键指标
        const keys = ['battleValue', 'strategicDepth', 'commandEntropy',
            'moraleAnchor', 'environmentConversion', 'infoAsymmetry'];
        const values = keys.map(k => general.scores[k] / 100);

        // 绘制背景
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        for (let r = 0.2; r <= 1; r += 0.2) {
            ctx.beginPath();
            for (let i = 0; i <= keys.length; i++) {
                const angle = (i / keys.length) * Math.PI * 2 - Math.PI / 2;
                const x = center.x + Math.cos(angle) * radius * r;
                const y = center.y + Math.sin(angle) * radius * r;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.stroke();
        }

        // 绘制数据
        ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
        ctx.strokeStyle = 'rgba(255, 215, 0, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i <= keys.length; i++) {
            const index = i % keys.length;
            const angle = (index / keys.length) * Math.PI * 2 - Math.PI / 2;
            const x = center.x + Math.cos(angle) * radius * values[index];
            const y = center.y + Math.sin(angle) * radius * values[index];
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    renderBattleResult() {
        const result = this.state.battleResult;
        if (!result) return;

        const container = document.getElementById('battle-log');
        const narrative = combatEngine.generateNarrative(result);

        container.innerHTML = `
            <div class="battle-narrative">
                ${narrative.map(line => `<p>${line}</p>`).join('')}
            </div>
            <div class="key-factors">
                <h4>关键因素分析</h4>
                ${result.keyFactors.map(f => `
                    <div class="factor-item ${f.diff > 0 ? 'advantage-a' : 'advantage-b'}">
                        <span class="factor-label">${f.label}</span>
                        <span class="factor-diff">${f.diff > 0 ? '+' : ''}${f.diff}</span>
                        <span class="factor-advantage">${f.advantage}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // ==================== 详情弹窗 ====================

    createDetailModal() {
        const modal = document.createElement('div');
        modal.id = 'detail-modal';
        modal.className = 'modal hidden';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2 id="modal-title">名将详情</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body" id="modal-body"></div>
            </div>
        `;
        document.body.appendChild(modal);

        // 关闭按钮事件
        modal.querySelector('.modal-close').addEventListener('click', () => {
            this.hideDetailModal();
        });

        // 点击背景关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.hideDetailModal();
            }
        });
    }

    showDetailModal(generalId) {
        const general = GENERALS.find(g => g.id === generalId);
        if (!general) return;

        const modal = document.getElementById('detail-modal');
        const title = document.getElementById('modal-title');
        const body = document.getElementById('modal-body');

        title.textContent = `${general.name} - 详细数值`;

        // 生成分组展示的数值
        let html = `
            <div class="detail-header">
                <div class="detail-avatar">${general.name.charAt(0)}</div>
                <div class="detail-info">
                    <div class="detail-tags">
                        <span class="region-tag">${REGION_LABELS[general.region]}</span>
                        <span class="era-tag">${ERA_LABELS[general.era]}</span>
                    </div>
                    <div class="detail-years">${general.birthYear || '?'} - ${general.deathYear || '?'}</div>
                    <div class="detail-avg">综合评分: <strong>${this.calculateAvgScore(general.scores)}</strong></div>
                </div>
            </div>
            <div class="detail-motifs">
                <h4>战术母题</h4>
                <div class="motif-list">
                    ${general.motifs.map(m => {
            const def = MOTIF_DEFINITIONS[m];
            return `<div class="motif-item">
                            <span class="motif-name">${def?.nameZh || m}</span>
                            <span class="motif-desc">${def?.description || ''}</span>
                        </div>`;
        }).join('')}
                </div>
            </div>
            <div class="detail-scores">
                <h4>属性数值</h4>
        `;

        // 按分组展示
        for (const [groupName, keys] of Object.entries(SCORE_GROUPS)) {
            html += `<div class="score-group">
                <h5>${groupName}</h5>
                <div class="score-list">`;

            for (const key of keys) {
                const value = general.scores[key];
                const label = SCORE_LABELS[key];
                const barWidth = value;
                const barColor = value >= 90 ? '#ffd700' : value >= 80 ? '#00d9ff' : value >= 70 ? '#2ed573' : '#9999aa';

                html += `
                    <div class="score-row">
                        <span class="score-name">${label}</span>
                        <div class="score-bar-container">
                            <div class="score-bar" style="width: ${barWidth}%; background: ${barColor}"></div>
                        </div>
                        <span class="score-num">${value}</span>
                    </div>
                `;
            }

            html += `</div></div>`;
        }

        html += `
            </div>
            <div class="detail-meta">
                <h4>元参数 (公平性)</h4>
                <div class="meta-list">
                    <div class="meta-item">
                        <span>证据覆盖度 (C)</span>
                        <span>${(general.meta.coverageC * 100).toFixed(0)}%</span>
                    </div>
                    <div class="meta-item">
                        <span>证据质量 (Q)</span>
                        <span>${(general.meta.qualityQ * 100).toFixed(0)}%</span>
                    </div>
                    <div class="meta-item">
                        <span>不确定性 (σ)</span>
                        <span>±${general.meta.sigma}</span>
                    </div>
                </div>
            </div>
        `;

        body.innerHTML = html;
        modal.classList.remove('hidden');
    }

    hideDetailModal() {
        document.getElementById('detail-modal').classList.add('hidden');
    }

    // ==================== 事件处理 ====================

    setupEventListeners() {
        // 名将选择
        document.getElementById('general-grid').addEventListener('click', (e) => {
            // 检查是否点击了详情按钮
            if (e.target.classList.contains('detail-btn')) {
                e.stopPropagation();
                this.showDetailModal(e.target.dataset.id);
                return;
            }

            const card = e.target.closest('.general-card');
            if (card && this.state.phase === 'selection') {
                this.selectGeneral(card.dataset.id);
            }
        });

        // 已选名将区域的详情按钮
        document.querySelector('.selected-generals').addEventListener('click', (e) => {
            if (e.target.classList.contains('detail-btn')) {
                e.stopPropagation();
                this.showDetailModal(e.target.dataset.id);
            }
        });

        // 地形选择
        document.getElementById('terrain-grid').addEventListener('click', (e) => {
            const card = e.target.closest('.terrain-card');
            if (card && this.state.phase === 'terrain') {
                this.selectTerrain(card.dataset.terrain);
            }
        });

        // 开始战斗按钮
        document.getElementById('start-battle-btn').addEventListener('click', () => {
            this.startBattle();
        });

        // 重新开始按钮
        document.getElementById('restart-btn').addEventListener('click', () => {
            this.restart();
        });

        // 搜索筛选
        document.getElementById('search-input').addEventListener('input', (e) => {
            this.filterGenerals(e.target.value);
        });

        // 地区筛选
        document.getElementById('region-filter').addEventListener('change', (e) => {
            this.filterByRegion(e.target.value);
        });
    }

    selectGeneral(id) {
        const general = GENERALS.find(g => g.id === id);
        if (!general) return;

        // 检查是否已选择
        if (this.state.selectedGenerals.includes(general)) {
            this.showMessage('该名将已被选择！', 'warning');
            return;
        }

        // 选择当前玩家的名将
        this.state.selectedGenerals[this.state.currentPlayer] = general;

        // 切换玩家
        this.state.currentPlayer = (this.state.currentPlayer + 1) % 2;

        // 检查是否两方都选完
        if (this.state.selectedGenerals[0] && this.state.selectedGenerals[1]) {
            this.state.phase = 'terrain';
        }

        this.updateUI();
        this.renderSelectedGenerals();
    }

    selectTerrain(terrain) {
        this.state.selectedTerrain = terrain;

        // 高亮选中的地形
        document.querySelectorAll('.terrain-card').forEach(card => {
            card.classList.toggle('selected', card.dataset.terrain === terrain);
        });

        // 启用开始战斗按钮
        document.getElementById('start-battle-btn').disabled = false;
    }

    startBattle() {
        if (!this.state.selectedGenerals[0] || !this.state.selectedGenerals[1] || !this.state.selectedTerrain) {
            this.showMessage('请先选择双方名将和战斗地形！', 'error');
            return;
        }

        this.state.phase = 'battle';
        this.updateUI();

        // 执行战斗
        const result = combatEngine.executeBattle(
            this.state.selectedGenerals[0],
            this.state.selectedGenerals[1],
            this.state.selectedTerrain
        );

        this.state.battleResult = result;
        this.state.battleHistory.push(result);

        // 动画展示战斗过程
        this.animateBattle(result);
    }

    animateBattle(result) {
        const container = document.getElementById('battle-log');
        container.innerHTML = '<div class="battle-loading">战斗进行中...</div>';

        let roundIndex = 0;
        const showRound = () => {
            if (roundIndex < result.rounds.length) {
                const round = result.rounds[roundIndex];
                this.appendRoundLog(round, result);
                roundIndex++;
                setTimeout(showRound, 800);
            } else {
                // 显示最终结果
                this.state.phase = 'result';
                this.updateUI();
                this.renderBattleResult();
            }
        };

        setTimeout(() => {
            container.innerHTML = '';
            showRound();
        }, 500);
    }

    appendRoundLog(round, result) {
        const container = document.getElementById('battle-log');
        const div = document.createElement('div');
        div.className = `round-log ${round.winner === 'A' ? 'win-a' : round.winner === 'B' ? 'win-b' : 'tie'}`;

        let winnerName = round.winner === 'A' ? result.generalA.name :
            round.winner === 'B' ? result.generalB.name : '平局';

        div.innerHTML = `
            <div class="round-header">
                <span class="round-phase">📍 ${round.phaseName}</span>
                <span class="round-result">${winnerName} ${round.winner !== 'tie' ? `(+${round.advantage}%)` : ''}</span>
            </div>
            <div class="round-scores">
                <span class="score-a">${result.generalA.name}: ${round.scoreA}</span>
                <span class="score-b">${result.generalB.name}: ${round.scoreB}</span>
            </div>
            <div class="morale-bar">
                <div class="morale-a" style="width: ${round.moraleA}%">${round.moraleA}</div>
                <div class="morale-b" style="width: ${round.moraleB}%">${round.moraleB}</div>
            </div>
        `;

        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
    }

    restart() {
        this.state = {
            phase: 'selection',
            selectedGenerals: [null, null],
            currentPlayer: 0,
            selectedTerrain: null,
            battleResult: null,
            battleHistory: this.state.battleHistory
        };

        this.renderSelectedGenerals();
        document.querySelectorAll('.terrain-card').forEach(card => {
            card.classList.remove('selected');
        });
        document.getElementById('start-battle-btn').disabled = true;
        document.getElementById('battle-log').innerHTML = '';

        this.updateUI();
    }

    filterGenerals(query) {
        const cards = document.querySelectorAll('#general-grid .general-card');
        const lowerQuery = query.toLowerCase();

        cards.forEach(card => {
            const general = GENERALS.find(g => g.id === card.dataset.id);
            const match = general.name.toLowerCase().includes(lowerQuery) ||
                general.id.toLowerCase().includes(lowerQuery);
            card.style.display = match ? '' : 'none';
        });
    }

    filterByRegion(region) {
        const cards = document.querySelectorAll('#general-grid .general-card');

        cards.forEach(card => {
            const general = GENERALS.find(g => g.id === card.dataset.id);
            const match = !region || general.region === region;
            card.style.display = match ? '' : 'none';
        });
    }

    // ==================== UI 更新 ====================

    updateUI() {
        // 更新阶段提示
        const phaseHint = document.getElementById('phase-hint');
        const hints = {
            selection: `选择名将 (${this.state.currentPlayer === 0 ? '红方' : '蓝方'}回合)`,
            terrain: '选择战斗地形',
            battle: '战斗进行中...',
            result: '战斗结束'
        };
        phaseHint.textContent = hints[this.state.phase];

        // 更新面板可见性
        document.getElementById('selection-panel').classList.toggle('hidden',
            this.state.phase !== 'selection');
        document.getElementById('terrain-panel').classList.toggle('hidden',
            this.state.phase !== 'terrain' && this.state.phase !== 'battle' && this.state.phase !== 'result');
        document.getElementById('battle-panel').classList.toggle('hidden',
            this.state.phase !== 'battle' && this.state.phase !== 'result');

        // 更新按钮状态
        document.getElementById('start-battle-btn').classList.toggle('hidden',
            this.state.phase !== 'terrain');
        document.getElementById('restart-btn').classList.toggle('hidden',
            this.state.phase !== 'result');
    }

    showMessage(text, type = 'info') {
        const msg = document.createElement('div');
        msg.className = `message ${type}`;
        msg.textContent = text;
        document.body.appendChild(msg);

        setTimeout(() => msg.remove(), 3000);
    }
}

// 启动应用
document.addEventListener('DOMContentLoaded', () => {
    window.game = new GameApp();
});

