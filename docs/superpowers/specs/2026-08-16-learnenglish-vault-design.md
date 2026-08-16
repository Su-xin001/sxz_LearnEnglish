# sxz_LearnEnglish 仓库搭建设计

- 日期：2026-08-16
- 状态：已获用户批准（2026-08-16）
- 范围：从零重建英语学习 Obsidian 仓库（旧仓库内容保留在 git 历史，不恢复）

## 1. 背景与约束

- 用途：大学生英语学习，全场景（词汇积累 / 阅读素材 / 听力口语 / 写作语法）
- 核心诉求：极其方便日常使用（Windows 桌面）
- AI 深度参与：obsidian-mcp 已配置（`notes` vault 指向本仓库），AI 可读写笔记
- 插件选型依据：已批准的工具清单（必装 Spaced Repetition、Obsidian Git；推荐 Dataview、Templater、QuickAdd、Obsidian Dictionary、Edge TTS、Obsidian Web Clipper）
- 旧仓库（git HEAD 2026-05-04）不恢复内容，仅作为参考

## 2. 目录结构

```
sxz_LearnEnglish/
├── README.md                  # 项目入口：简介、快速开始
├── 00-仪表盘/
│   ├── 学习中心.md            # 主仪表盘（Dataview 统计 + 导航）
│   ├── 使用指南.md            # 目录说明、快捷键、插件安装清单、AI 用法
│   └── 工具清单.md            # 由仓库根目录移入（选型参考文档）
├── 01-词汇/
│   ├── 词汇索引.md            # Dataview：按难度/词性/记忆阶段动态聚合
│   ├── CET4核心/  CET6核心/ 考研词汇/ 雅思托福/ 其他/   # 按难度一层物理分层
├── 02-阅读/                   # 阅读索引.md（按状态聚合）+ 笔记散放
├── 03-写作/                   # 写作索引.md（按类型/批改状态聚合）+ 习作散放
├── 04-听力口语/               # 听力口语索引.md + 笔记散放
├── 05-模板与资源/
│   ├── 模板/                  # 6 个模板（Templater + 核心模板）
│   └── 资源/                  # 图片/音频/导入CSV（.gitignore 已有规则）
├── 06-每日记录/               # Daily notes 目录（核心插件 daily-notes）
├── 99-归档/                   # 已完成/不再活跃内容
├── docs/superpowers/specs/    # 设计文档
└── .obsidian/                 # 配置
```

设计原则：目录两层为主（场景目录 + 少量子目录）；多维分类（难度/主题/词性/记忆阶段）由 Dataview 按 frontmatter 动态索引，不建深子目录。

## 3. frontmatter Schema

### 单词卡（01-词汇/）

```yaml
---
word: abandon
phonetic: /əˈbændən/
pos: ["v.", "n."]          # 词性数组
meaning: ["放弃；抛弃", "放任"]   # 与 pos 一一对应
difficulty: CET4          # CET4|CET6|考研|雅思托福|其他（与目录对应）
topic: [行为, 心理]        # 主题标签（Dataview 按主题聚合）
stage: new                # new|learning|mastered（记忆阶段）
root: ab-（离开）+andon（控制）  # 词根词缀（可空）
example: He abandoned the plan at the last minute.
tags: [flashcards/CET4, 单词]
---
```

- Spaced Repetition 依据 `#flashcards/牌组名` 自动建牌组（如 `#flashcards/CET4`）
- `difficulty` 与物理目录一致，保证 Dataview 与文件浏览双通道一致

### 阅读笔记（02-阅读/）

```yaml
---
title: <标题>
source: <来源，如 经济学人/The Economist>
date: 2026-08-16
status: 待读            # 待读|精读中|已完成
difficulty: 中等        # 简单|中等|困难
tags: [阅读, 外刊]      # 外刊|真题|文章|书籍|新闻
---
```

### 写作练习（03-写作/）

```yaml
---
title: <题目>
date: 2026-08-16
type: 议论文           # 议论文|说明文|应用文|其他
status: 待批改         # 待批改|已批改|已修改
ai_review: ""         # AI 批改结论摘要（写回）
tags: [写作]
---
```

### 听力口语（04-听力口语/）

```yaml
---
title: <材料名>
date: 2026-08-16
source: <来源>
status: 待精听         # 待精听|精听中|已完成
tags: [听力]
---
```

### 每日记录（06-每日记录/，Daily notes 自动生成）

```yaml
---
date: 2026-08-16
tags: [每日记录]
---
```

## 4. 模板清单（05-模板与资源/模板/）

| 模板 | 用途 | 机制 |
|---|---|---|
| 单词卡片模板.md | 新建单词卡（自动填日期、示例结构） | Templater / 核心模板 |
| 阅读精读模板.md | 文章精读（原文摘录/生词/好句/批注区） | 核心模板 |
| 写作练习模板.md | 习作 + AI 批改区（批改记录/修改后版本） | 核心模板 |
| 听力精听模板.md | 精听（原文/生词/跟读记录） | 核心模板 |
| 每日学习模板.md | Daily notes 模板（今日目标/新词/复习/写作） | Daily notes 指定 |
| 学习日志模板.md | 周/月学习日志 | 核心模板 |

## 5. Dataview 查询

- **学习中心（00-仪表盘/学习中心.md）**：各难度单词数（GROUP BY difficulty）、记忆阶段分布（GROUP BY stage）、各场景笔记数、最近 7 天新增单词
- **词汇索引（01-词汇/词汇索引.md）**：TABLE word, pos, difficulty, stage FROM "01-词汇" WHERE contains(tags,"单词")，可按难度/词性/阶段筛选
- **阅读索引（02-阅读/阅读索引.md）**：按 status 聚合
- **写作索引（03-写作/写作索引.md）**：按 type/status 聚合（含 ai_review 显示）
- **听力口语索引（04-听力口语/听力口语索引.md）**：按 status 聚合

## 6. AI 工作流（REASONIX.md）

仓库根创建 `REASONIX.md`，定义 AI 助手行为：

1. **查词与建卡**：遇到生词 → 生成标准单词卡（frontmatter 完整）→ 写入 `01-词汇/<难度>/` → 打 `#flashcards/<难度>` 标签 → 告知用户
2. **阅读辅助**：精读时提取生词（一键入库）、好句（存例句库）、批注
3. **写作批改**：读取作文 → 语法/用词/结构批改 → 写回 `ai_review` 字段与修改建议
4. **每日总结**：汇总今日新词/复习/写作情况
5. 遵守约定：不删除用户笔记；示例内容标注可删；路径优先用 vault 相对路径

## 7. 插件与配置

- 插件本体由用户在 Obsidian 社区商店安装（官方渠道、版本自动匹配）；安装清单写入 `00-仪表盘/使用指南.md`
- 我预置 `.obsidian` 配置：`core-plugins.json`（templates/daily-notes 等开关）、模板目录指向 `05-模板与资源/模板/`、Daily notes 目录指向 `06-每日记录/`
- obsidian-mcp 已配置（全局 config.toml），本仓库即 `notes` vault

## 8. 示例内容（标注"示例，可删除"）

- 6-8 张单词卡（覆盖 CET4/CET6/考研/雅思托福、不同词性与主题）
- 1 篇示例阅读精读、1 篇示例写作（演示 ai_review 字段）、1 篇示例听力笔记
- 1 份示例 CSV（`05-模板与资源/资源/导入/`，供 CSV 批量导入参考）

## 9. 里程碑

1. 目录骨架 + README
2. `.obsidian` 配置（模板目录、daily notes、核心插件）
3. 6 个模板
4. Dataview 索引页 + 学习中心仪表盘
5. 示例内容（单词卡 + 示例笔记 + CSV）
6. REASONIX.md + 使用指南 + 整理工具清单位置
7. git 初始提交（保留旧仓库历史）
