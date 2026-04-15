# 🎓 sxz_LearnEnglish — Obsidian 英语学习仓库

> 一个功能完善的 Obsidian 英语学习仓库，专为大学生设计，以"极其方便日常学习"为核心目标。

## ✨ 特性

- 📖 **单词学习系统** — 结构化单词库，支持多维度分类（词性/主题/难度/记忆阶段），间隔重复复习
- 📚 **阅读学习系统** — 悬停查词、划词翻译、高亮标记、生词摘录、长难句分析
- 🎧 **听力学习模块** — 盲听记录、对照原文、连读标注、跟读练习
- 🗣️ **口语练习记录** — 话题练习、表达对比、发音纠正、语法纠错
- 📐 **语法学习笔记** — 语法体系梳理、易错点记录、练习题
- ✍️ **写作练习系统** — 限时写作、AI批改、好词好句积累
- 📊 **学习仪表盘** — Dataview 驱动的统计面板，一目了然
- 🔄 **间隔重复** — SM-2 算法自动安排复习
- 🔗 **双向链接** — 知识点关联，构建英语知识图谱
- ⌨️ **快捷操作** — 全套快捷键，一键插入模板
- 🎨 **界面美化** — 自定义 CSS 主题，紫色渐变风格

## 📁 仓库结构

```
sxz_LearnEnglish/
├── 00-仪表盘/          📊 学习仪表盘和总览
├── 01-单词库/          📖 单词学习系统
│   ├── 按主题/         按主题分类
│   ├── 按词性/         按词性分类
│   ├── 按难度/         按难度分类
│   └── 按记忆阶段/     按记忆阶段分类
├── 02-阅读/            📚 阅读学习系统
│   ├── 文章/           英文文章笔记
│   └── 书籍/           英文书籍笔记
├── 03-听力/            🎧 听力学习
├── 04-口语/            🗣️ 口语练习
├── 05-语法/            📐 语法学习
├── 06-写作/            ✍️ 写作练习
├── 07-日记/            📅 每日学习日记
├── 08-资源/            📎 学习资源
├── 09-归档/            📦 归档内容
├── 模板/               📝 笔记模板
└── RSS文章/            📡 RSS订阅文章
```

## 🔌 插件列表

| 插件 | 功能 |
| ---- | ---- |
| [Spaced Repetition](https://github.com/st3v3nmw/obsidian-spaced-repetition) | 间隔重复闪卡复习 |
| [Language Learner](https://github.com/guopenghui/obsidian-language-learner) | 划词翻译、词典查询 |
| [English Assistant](https://github.com/yo-ga/obsidian-english-assistant) | AI英语助手、写作批改 |
| [Hi-Words](https://github.com/InedibleQ/obsidian-hi-words) | 单词高亮与悬停释义 |
| [Dataview](https://github.com/blacksmithgu/obsidian-dataview) | 数据查询与统计 |
| [Templater](https://github.com/SilentVoid13/Templater) | 高级模板系统 |
| [Calendar](https://github.com/liamcain/obsidian-calendar-plugin) | 日历视图 |
| [Obsidian Git](https://github.com/Vinzent03/obsidian-git) | Git自动备份 |
| [Media Extended](https://github.com/aidenlx/media-extended) | 媒体增强播放 |
| [RSS Dashboard](https://github.com/obsidianmd/rss-dashboard) | RSS订阅 |
| [Various Complements](https://github.com/tadashi-aikawa/obsidian-various-complements) | 智能补全 |
| [BRAT](https://github.com/TfTHacker/obsidian42-brat) | Beta插件管理 |

## ⌨️ 快捷键

| 快捷键 | 功能 |
| ------- | ---- |
| `Alt+R` | 复习单词卡片 |
| `Alt+D` | 查词翻译 |
| `Alt+1~7` | 快速插入对应模板 |
| `Alt+J` | 打开今日日记 |
| `Alt+G` | 打开知识图谱 |
| `Alt+O` | 快速切换文件 |
| `Alt+S` | 随机复习笔记 |

## 🚀 安装使用

### 前置要求

- [Obsidian](https://obsidian.md/) v1.0+
- Git（用于自动备份）

### 安装步骤

1. **克隆仓库**
   ```bash
   git clone https://github.com/your-username/sxz_LearnEnglish.git
   ```

2. **用 Obsidian 打开**
   - 打开 Obsidian → 打开文件夹作为仓库 → 选择 `sxz_LearnEnglish`

3. **安装插件**
   - 进入 设置 → 第三方插件 → 关闭安全模式
   - 点击"重新加载"按钮，所有插件将自动加载
   - 部分插件可能需要手动启用

4. **启用 CSS 样式**
   - 进入 设置 → 外观 → CSS 代码片段
   - 确认以下片段已启用：
     - ✅ 英语学习主题
     - ✅ 单词卡片样式
     - ✅ 学习标注样式
     - ✅ 仪表盘样式

5. **（可选）配置 API Key**
   - English Assistant 插件可配置 OpenAI API Key 以启用 AI 批改功能
   - Hi-Words 插件可配置 AI 词典 API

### 推荐字体

- 中文：[霞鹜文楷](https://github.com/lxgw/LxgwWenKai)（开源免费）
- 英文：Inter / Times New Roman
- 代码：JetBrains Mono / Fira Code

## 📝 使用流程

### 日常学习

1. 打开 **英语学习仪表盘** 查看今日任务
2. `Alt+R` 复习待复习单词
3. `Alt+1` 添加新单词
4. `Alt+2` 创建阅读笔记，粘贴英文文章
5. 阅读时 `Ctrl+悬停` 查词，`==高亮==` 标记重点
6. `Alt+J` 打开今日日记，记录学习内容

### 每周回顾

1. 查看知识图谱，检查知识点关联
2. 整理语法笔记
3. 完成写作练习
4. 总结本周学习

## 📄 模板系统

| 模板 | 快捷键 | 说明 |
| ---- | ------ | ---- |
| 单词卡 | `Alt+1` | 含音标、释义、例句、词根词缀、记忆技巧 |
| 阅读笔记 | `Alt+2` | 含生词摘录、长难句分析、文章摘要 |
| 听力笔记 | `Alt+3` | 含盲听记录、对照原文、连读标注 |
| 口语练习 | `Alt+4` | 含表达对比、发音纠正、语法纠错 |
| 语法笔记 | `Alt+5` | 含规则说明、用法示例、易错点、练习题 |
| 写作练习 | `Alt+6` | 含自检清单、AI批改、好词好句 |
| 学习日记 | `Alt+7` | 含每日计划、学习记录、收获总结 |

## 🏗️ 设计理念

- **极其方便** — 所有操作都有快捷键，模板自动匹配文件夹
- **结构化** — Frontmatter 元数据驱动，Dataview 查询统计
- **关联性** — 双向链接连接知识点，构建英语知识图谱
- **可追溯** — Git 自动备份，学习记录永不丢失
- **渐进式** — 从简单开始，逐步完善知识体系

## 📜 License

MIT License
