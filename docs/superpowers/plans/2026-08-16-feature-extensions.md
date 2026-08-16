# 功能扩展（划词翻译/AI对话/标注/统计）实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为 sxz_LearnEnglish 安装 Lingo/Annotator/Copilot/Obsidian Charts/Homepage/Calendar 六个插件，配置 Copilot（DeepSeek）、Homepage、Charts，更新使用指南，提交并推送。

**Architecture:** 插件从 GitHub 官方 Releases 下载到 `.obsidian/plugins/<id>/`（目录名=manifest id）；`community-plugins.json` 为启用列表；Copilot 的 API key 仅写入本地 `data.json` 并加入 `.gitignore`；文档更新进 `00-仪表盘/使用指南.md`。

**Tech Stack:** Obsidian 社区插件（main.js/manifest.json/styles.css）、curl、git。

## Global Constraints

- spec：`docs/superpowers/specs/2026-08-16-feature-extensions-design.md`（已批准，commit 444a4b7）
- **DeepSeek API key 绝不写入任何将提交 git 的文件**；仅存于 `.obsidian/plugins/copilot/data.json`，该文件加入 `.gitignore`
- 插件目录名必须等于 manifest.json 的 `id`；每插件需含 `main.js`+`manifest.json`+`styles.css`
- 下载使用 `curl -fsSL --ssl-no-revoke`（Windows schannel 吊销检查兼容）
- `community-plugins.json` 最终应含 13 个 id（现有 7 + 新增 6）
- Web Clipper 为浏览器扩展，只写安装指南不代装

---

### Task 1: 下载安装 6 个插件

**Files:**
- Create: `.obsidian/plugins/<id>/{main.js,manifest.json,styles.css}` × 6

**Interfaces:**
- Consumes: 无
- Produces: 6 个插件目录（id 待 Task 2 以 manifest 校验）

- [ ] **Step 1: 下载**（推测 id：`lingo`、`obsidian-annotator`、`copilot`、`obsidian-charts`、`homepage`、`obsidian-calendar-plugin`）
  ```bash
  for p in "lingo:tangramor/obsidian-lingo" "obsidian-annotator:elias-sundqvist/obsidian-annotator" "copilot:logancyang/obsidian-copilot" "obsidian-charts:phibr0/obsidian-charts" "homepage:mirnovov/obsidian-homepage" "obsidian-calendar-plugin:liamcain/obsidian-calendar-plugin"; do
    id="${p%%:*}"; repo="${p#*:}"; mkdir -p ".obsidian/plugins/$id"
    for f in main.js manifest.json styles.css; do
      curl -fsSL --ssl-no-revoke -o ".obsidian/plugins/$id/$f" "https://github.com/$repo/releases/latest/download/$f" 2>/dev/null && echo "OK $id/$f" || echo "no $id/$f"
    done
  done
  ```
- [ ] **Step 2: 校验目录名==manifest id**，不一致则 `mv` 修正；确认 6 插件 3 文件齐全

---

### Task 2: 启用列表更新

**Files:**
- Modify: `.obsidian/community-plugins.json`（追加 6 个 id）

**Interfaces:**
- Consumes: Task 1 确认的 6 个 manifest id
- Produces: 13 个插件的启用列表（Obsidian 启动即加载）

- [ ] **Step 1: 读取 6 个 manifest id**（`python -c "import json;print(json.load(open(...))['id'])"`）
- [ ] **Step 2: 重写 community-plugins.json** 为 13 个 id 的 JSON 数组（保留原 7 个 + 新 6 个）
- [ ] **Step 3: 验证**：`python -c` 解析 JSON，长度==13

---

### Task 3: Copilot（DeepSeek）+ Homepage 预置配置

**Files:**
- Create: `.obsidian/plugins/copilot/data.json`（含 DeepSeek 端点与 API key）
- Modify: `.gitignore`（追加 `.obsidian/plugins/copilot/data.json`）
- Create: `.obsidian/plugins/homepage/data.json`

**Interfaces:**
- Consumes: Task 1 的 copilot/homepage 插件
- Produces: Copilot 可直接使用的 DeepSeek 配置；Homepage 启动直达学习中心

- [ ] **Step 1: 写 copilot/data.json**：DeepSeek 原生配置（`deepseekApiKey` 取用户提供的 key、`defaultModelKey=deepseek-chat|deepseek`、`defaultChainType=llm_chain`），schema 以 Copilot 官方 data 结构为准（必要时精简为最小可用配置并附手动配置指南）
- [ ] **Step 2: .gitignore 追加** `.obsidian/plugins/copilot/data.json`；`git check-ignore` 验证生效
- [ ] **Step 3: 写 homepage/data.json**：`{"homepage": "学习中心"}`（按插件 schema 调整）
- [ ] **Step 4: 验证**：`git status` 中 copilot/data.json 不出现

---

### Task 4: 文档与示例更新

**Files:**
- Modify: `00-仪表盘/学习中心.md`（加 Charts 图表示例）
- Modify: `00-仪表盘/使用指南.md`（新增 5 个功能小节）
- Modify: `REASONIX.md`（Copilot 提示）

**Interfaces:**
- Consumes: Task 2/3 的插件与配置
- Produces: 用户可见的功能说明与 Web Clipper 安装步骤

- [ ] **Step 1: 学习中心加 Charts 柱状图**（数据源 `01-词汇` 按 difficulty 统计的 dataview 查询嵌入 chart）
- [ ] **Step 2: 使用指南新增小节**：划词翻译（Lingo 用法：选中文本即译，默认 Google 引擎）、AI 对话（Copilot：Add Custom Model → baseUrl `https://api.deepseek.com/v1` + model `deepseek-chat`，key 在插件设置填写——**文档不含明文 key**）、PDF 标注（Annotator：打开 PDF 标注生成笔记）、网页剪藏（Web Clipper：浏览器商店安装 → 配置 vault 路径 → 剪藏到 `02-阅读/`）、学习图表（Charts 用法）
- [ ] **Step 3: REASONIX.md 补充**："Copilot 为 Obsidian 内 AI 对话入口，行为遵循本文件规范"
- [ ] **Step 4: 验证**：`grep` 使用指南含各功能关键词；`git grep` 确认仓库无明文 API key

---

### Task 5: 最终验证、提交、推送

**Files:**
- 全部改动

**Interfaces:**
- Consumes: Task 1-4 全部成果
- Produces: 干净的仓库基线（插件就绪、文档更新、无 key 泄露）

- [ ] **Step 1: 完整性验证**：6 新插件 3 文件齐全、13 个 manifest id 目录匹配
- [ ] **Step 2: 安全验证**：`git grep` 确认仓库无明文 API key；`git check-ignore .obsidian/plugins/copilot/data.json` 命中
- [ ] **Step 3: 提交**：`git add .obsidian/plugins/ .obsidian/community-plugins.json .gitignore 00-仪表盘/ REASONIX.md && git commit -m "feat: add 6 plugins (lingo, annotator, copilot, charts, homepage, calendar)"`
- [ ] **Step 4: 推送**：`git push origin main`
- [ ] **Step 5: 汇报**：插件清单+版本、用户待办（重启 Obsidian、Copilot 填 key 若 data.json 预置未生效、浏览器装 Web Clipper）

---

## Self-Review

- **Spec 覆盖**：6 插件安装（T1）、id 校验与启用列表（T2）、Copilot DeepSeek+key 安全+Homepage（T3）、Charts 示例+使用指南+REASONIX（T4）、验证提交推送（T5）——覆盖 spec 全部 6 里程碑；Web Clipper 指南在 T4
- **占位符**：无 TBD/TODO；命令与 schema 明确
- **一致性**：key 只在 T3 Step 1 出现且明确 gitignore；目录名==manifest id 规则全链一致；community-plugins 13 id 目标明确
