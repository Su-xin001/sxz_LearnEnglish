# sxz_LearnEnglish 仓库搭建实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 从零搭建 sxz_LearnEnglish 英语学习 Obsidian 仓库（目录骨架、配置、模板、Dataview 索引、示例内容、AI 指令），并完成 git 初始提交。

**Architecture:** 场景化浅目录（00-06 + 99）承载笔记文件；frontmatter 元数据 + Dataview 动态索引承担多维分类与统计；`#flashcards/<难度>` 标签驱动 Spaced Repetition；REASONIX.md 规范 AI（经 obsidian-mcp）的学习工作流。

**Tech Stack:** Obsidian（Windows 桌面）、Dataview、Templater、Spaced Repetition、Daily notes/Templates 核心插件、Markdown frontmatter、git。

## Global Constraints

- 设计依据：`docs/superpowers/specs/2026-08-16-learnenglish-vault-design.md`（已批准，commit 5c32fa7）
- 从零重建：不恢复旧仓库内容（旧内容保留在 git 历史）
- frontmatter 字段名与取值必须与 spec 第 3 节一致（word/phonetic/pos/meaning/difficulty/topic/stage/root/example；difficulty 取值 CET4|CET6|考研|雅思托福|其他）
- 单词卡 tags 必须含 `flashcards/<难度>`（Spaced Repetition 牌组）与 `单词`
- 目录编号：00-仪表盘、01-词汇、02-阅读、03-写作、04-听力口语、05-模板与资源、06-每日记录、99-归档
- 示例内容必须标注"示例"且可删除
- 插件本体不在本计划内安装（用户在 Obsidian 社区商店安装）；本计划只预置 .obsidian 目录类配置
- Windows 路径；文件编码 UTF-8

---

### Task 1: 目录骨架 + README

**Files:**
- Create: `README.md`
- Create（含 `.gitkeep`，git 不跟踪空目录）: `00-仪表盘/`、`01-词汇/CET4核心/`、`01-词汇/CET6核心/`、`01-词汇/考研词汇/`、`01-词汇/雅思托福/`、`01-词汇/其他/`、`02-阅读/`、`03-写作/`、`04-听力口语/`、`05-模板与资源/模板/`、`05-模板与资源/资源/图片/`、`05-模板与资源/资源/音频/`、`05-模板与资源/资源/导入/`、`06-每日记录/`、`99-归档/`、`docs/superpowers/plans/`

**Interfaces:**
- Consumes: 无（首个任务）
- Produces: 目录路径约定，后续所有任务的文件路径均依赖

- [ ] **Step 1: 创建目录骨架**（bash `mkdir -p`，含 `.gitkeep`）
- [ ] **Step 2: 编写 README.md**
  - 标题 `# 🎓 sxz_LearnEnglish`、一句话简介、快速开始（安装插件 → 打开 `00-仪表盘/学习中心`）
  - 目录结构表（00-06 + 99 各目录用途）
  - AI 使用说明（REASONIX.md 概览）+ 插件清单摘要（指向使用指南）
- [ ] **Step 3: 验证**：`find . -name .gitkeep | wc -l` ≥ 15；README.md 含"学习中心"
- [ ] **Step 4: Commit**：`git add README.md 00-仪表盘 01-词汇 02-阅读 03-写作 04-听力口语 05-模板与资源 06-每日记录 99-归档 docs/superpowers/plans && git commit -m "chore: scaffold vault directories and README"`（显式路径提交，旧文件删除统一留给 Task 7 定稿提交）

---

### Task 2: .obsidian 配置（模板目录 / Daily notes / 核心插件）

**Files:**
- Create: `.obsidian/templates.json`
- Create: `.obsidian/daily-notes.json`
- Inspect: `.obsidian/core-plugins.json`（确认 templates/daily-notes/properties 已启用，不改动 Obsidian 运行时生成的键）

**Interfaces:**
- Consumes: Task 1 的目录路径
- Produces: 模板目录与每日记录目录的 Obsidian 配置；Task 3 的模板文件放置于配置指向的目录

- [ ] **Step 1: 写入 `.obsidian/templates.json`**
  ```json
  { "folder": "05-模板与资源/模板" }
  ```
- [ ] **Step 2: 写入 `.obsidian/daily-notes.json`**
  ```json
  { "folder": "06-每日记录", "format": "YYYY-MM-DD", "template": "05-模板与资源/模板/每日学习模板" }
  ```
- [ ] **Step 3: 核对 core-plugins.json** 含 `"daily-notes": true` 与 `"templates": true`（当前已启用，无需修改）
- [ ] **Step 4: 验证**：`python -c "import json;[json.load(open(p,encoding='utf-8')) for p in [r'.obsidian/templates.json',r'.obsidian/daily-notes.json']];print('JSON OK')"`
- [ ] **Step 5: Commit**：`git add .obsidian/templates.json .obsidian/daily-notes.json && git commit -m "chore: configure templates and daily-notes folders"`

---

### Task 3: 6 个模板（05-模板与资源/模板/）

**Files:**
- Create: `05-模板与资源/模板/单词卡片模板.md`
- Create: `05-模板与资源/模板/阅读精读模板.md`
- Create: `05-模板与资源/模板/写作练习模板.md`
- Create: `05-模板与资源/模板/听力精听模板.md`
- Create: `05-模板与资源/模板/每日学习模板.md`
- Create: `05-模板与资源/模板/学习日志模板.md`

**Interfaces:**
- Consumes: Task 2 的目录配置（模板目录已指向此处）
- Produces: 模板文件供 Task 5 示例内容与用户日常使用；每日学习模板被 daily-notes.json 引用

- [ ] **Step 1: 单词卡片模板**：frontmatter 含全部 spec 字段（word/phonetic/pos/meaning/difficulty/topic/stage/root/example，difficulty 默认 CET4，stage 默认 new，tags 含 `flashcards/CET4` 与 `单词`）；正文含 释义/例句/记忆方法/派生词 小节与"文件应保存到 `01-词汇/<难度>/`"注释
- [ ] **Step 2: 阅读精读模板**：frontmatter（title/source/date/status/difficulty/tags 含 `阅读`）；正文含 原文摘录/生词表/好句/批注 小节
- [ ] **Step 3: 写作练习模板**：frontmatter（title/date/type/status/ai_review/tags 含 `写作`）；正文含 题目/正文/批改记录/修改后版本 小节
- [ ] **Step 4: 听力精听模板**：frontmatter（title/date/source/status/tags 含 `听力`）；正文含 原文/生词/跟读记录 小节
- [ ] **Step 5: 每日学习模板**：frontmatter（date/tags 含 `每日记录`）；正文含 今日目标/新词/复习/写作/反思 小节
- [ ] **Step 6: 学习日志模板**：frontmatter（date/period/tags 含 `日志`）；正文含 阶段总结/数据回顾/下阶段计划 小节
- [ ] **Step 7: 验证**：6 个文件存在且均含 frontmatter 与 `tags`
- [ ] **Step 8: Commit**：`git add 05-模板与资源/模板/ && git commit -m "feat: add 6 note templates"`

---

### Task 4: Dataview 索引页 + 学习中心仪表盘

**Files:**
- Create: `00-仪表盘/学习中心.md`
- Create: `01-词汇/词汇索引.md`
- Create: `02-阅读/阅读索引.md`
- Create: `03-写作/写作索引.md`
- Create: `04-听力口语/听力口语索引.md`

**Interfaces:**
- Consumes: Task 3 确立的 frontmatter 字段约定
- Produces: 数据查询契约（`difficulty`/`stage`/`status` 等字段），Task 5 示例内容必须与之匹配

- [ ] **Step 1: 学习中心**：Dataview 查询——各难度单词数（`GROUP BY difficulty`）、记忆阶段分布（`GROUP BY stage`）、各场景笔记数（按 tags 计数）、最近 7 天新增（`WHERE date>=date(today)-dur(7 days)`）；加导航链接到各索引页
- [ ] **Step 2: 词汇索引**：`TABLE word, pos, difficulty, stage FROM "01-词汇" WHERE contains(tags,"单词") SORT difficulty` + 难度/词性筛选说明
- [ ] **Step 3: 阅读索引**：`TABLE source, status, date FROM "02-阅读" WHERE contains(tags,"阅读") SORT date DESC`
- [ ] **Step 4: 写作索引**：`TABLE type, status, ai_review FROM "03-写作" WHERE contains(tags,"写作") SORT date DESC`
- [ ] **Step 5: 听力口语索引**：`TABLE source, status, date FROM "04-听力口语" WHERE contains(tags,"听力") SORT date DESC`
- [ ] **Step 6: 验证**：5 个文件存在且含 `dataview` 查询代码块
- [ ] **Step 7: Commit**：`git add 00-仪表盘/ 01-词汇/词汇索引.md 02-阅读/阅读索引.md 03-写作/写作索引.md 04-听力口语/听力口语索引.md && git commit -m "feat: add dataview index pages and dashboard"`

---

### Task 5: 示例内容（单词卡 + 示例笔记 + CSV）

**Files:**
- Create: `01-词汇/CET4核心/abandon.md`、`01-词汇/CET4核心/approach.md`、`01-词汇/CET6核心/elaborate.md`、`01-词汇/考研词汇/contemplate.md`、`01-词汇/雅思托福/resilient.md`、`01-词汇/其他/curious.md`（6 张卡，覆盖 5 个难度档与不同词性/主题）
- Create: `02-阅读/示例-经济学人精读.md`
- Create: `03-写作/示例-议论文练习.md`（含 ai_review 演示内容）
- Create: `04-听力口语/示例-听力精听.md`
- Create: `05-模板与资源/资源/导入/示例单词导入.csv`

**Interfaces:**
- Consumes: Task 3/4 的 frontmatter 契约与目录
- Produces: 演示数据（用户可删除），验证 Dataview 查询渲染效果

- [ ] **Step 1: 6 张单词卡**：frontmatter 完整（word/phonetic/pos/meaning/difficulty/topic/stage/root/example），`tags` 含 `flashcards/<难度>` 与 `单词`；正文含 释义/例句/记忆方法；难度与所在目录一致；首行注释"示例卡片，可删除"
- [ ] **Step 2: 示例阅读精读**：frontmatter 完整 + 精读正文（原文摘录/生词/好句/批注）
- [ ] **Step 3: 示例写作**：frontmatter（type 议论文、status 已批改、ai_review 填演示批改摘要）+ 正文含批改记录
- [ ] **Step 4: 示例听力精听**：frontmatter 完整 + 精听正文
- [ ] **Step 5: 示例 CSV**：表头 `word,phonetic,pos,meaning,difficulty,topic,stage` + 3 行示例数据（与单词卡 schema 一致）
- [ ] **Step 6: 验证**：`grep -l "flashcards/" 01-词汇/*/*.md | wc -l` = 6；`grep -c "示例" 各示例文件` ≥ 1；CSV 表头与 spec 字段一致
- [ ] **Step 7: Commit**：`git add 01-词汇/ 02-阅读/ 03-写作/ 04-听力口语/ 05-模板与资源/资源/导入/ && git commit -m "feat: add sample vocabulary cards and notes"`

---

### Task 6: REASONIX.md + 使用指南 + 工具清单移动

**Files:**
- Create: `REASONIX.md`
- Create: `00-仪表盘/使用指南.md`
- Move: `工具清单.md` → `00-仪表盘/工具清单.md`

**Interfaces:**
- Consumes: 全部既有成果（目录、模板、索引、示例）
- Produces: 仓库级 AI 行为规范（REASONIX.md）+ 面向用户的完整使用文档

- [ ] **Step 1: REASONIX.md**：AI 角色（英语学习助手）；工作流 4 条——①查词建卡（frontmatter 完整、写入 `01-词汇/<难度>/`、打 `#flashcards/<难度>`）②阅读辅助（生词入库/好句/批注）③写作批改（写回 ai_review 与修改建议）④每日总结；约束——不删除用户笔记、示例标注可删、路径用 vault 相对路径、中文交流
- [ ] **Step 2: 使用指南**：目录结构表、快捷键（Daily notes/Templates/命令面板）、插件安装清单（必装 Spaced Repetition/Obsidian Git；推荐 Dataview/Templater/QuickAdd/Obsidian Dictionary/Edge TTS，附社区商店搜索名）、AI 用法（经 obsidian-mcp 的对话示例）
- [ ] **Step 3: 移动工具清单**：`git mv 工具清单.md 00-仪表盘/工具清单.md`
- [ ] **Step 4: 验证**：REASONIX.md 含"flashcards"；使用指南含"Spaced Repetition"；`ls 00-仪表盘/工具清单.md` 存在
- [ ] **Step 5: Commit**：`git add REASONIX.md "00-仪表盘/使用指南.md" && git commit -m "docs: add AI instructions and usage guide"`（工具清单的移动已在 Step 3 由 git mv 完成，随本次提交一并记录；旧文件删除统一留给 Task 7）

---

### Task 7: git 初始提交（从零重建定稿）

**Files:**
- 全部（含旧仓库文件的删除——符合"从零重建"决定，旧内容仍保留在 git 历史）

**Interfaces:**
- Consumes: Task 1-6 全部成果
- Produces: 干净的仓库基线（`git status` clean）

- [ ] **Step 1: 检查残留**：`git status --short` 应只剩预期改动；确认 `工具清单.md` 已移动（无根目录残留）
- [ ] **Step 2: 全面提交**：`git add -A && git commit -m "feat: rebuild learnenglish vault from scratch"`
- [ ] **Step 3: 验证**：`git status --short` 为空；`git log --oneline -5` 显示 spec → 骨架 → 配置 → 模板 → 索引 → 示例 → 文档 → 重建定稿的提交链
- [ ] **Step 4: 汇报**：向用户总结仓库结构、待用户操作项（安装插件、打开 Obsidian 验证 Dataview/复习功能）

---

## Self-Review

- **Spec 覆盖**：目录结构（T1/T6 使用指南）、frontmatter（T3/T5）、模板 6 个（T3）、Dataview 查询（T4）、AI 工作流 REASONIX.md（T6）、插件配置与指南（T2/T6）、示例内容（T5）、git 提交（T1/T7）——均有点对点任务；spec 第 7 节"插件本体由用户安装"由 T6 使用指南承接
- **占位符**：无 TBD/TODO；每个模板/索引给出结构要点与字段契约；步骤含验证命令
- **类型一致性**：`difficulty` 取值（CET4|CET6|考研|雅思托福|其他）、`stage`（new|learning|mastered）、tags 约定（`flashcards/<难度>`、`单词`）在 T3 定义、T4 查询引用、T5 数据填充、T6 指令引用，全链一致；CSV 表头与单词卡 schema 一致
