---
type: guide
tags:
  - guide
  - home
---

# 🎓 英语学习仓库使用指南

## 目录结构

```
sxz_LearnEnglish/
├── 00-Daily-Notes/          # 每日学习日记
├── 01-Reading/              # 阅读材料区
│   ├── Articles/            # 英文文章
│   ├── Highlights/          # 阅读高亮汇总
│   ├── RSS-Feeds/           # RSS 订阅文章
│   └── YouTube/             # YouTube 视频笔记
├── 02-Vocabulary/           # 单词库
│   ├── By-Alphabet/         # 按字母分类的单词笔记
│   ├── By-Theme/            # 按主题分类的单词集
│   ├── By-Difficulty/       # 按难度分类的单词
│   ├── Collections/         # 自定义单词集合
│   └── Flashcards/          # 闪卡复习文件
├── 03-Grammar/              # 语法学习
│   ├── Rules/               # 语法规则笔记
│   └── Exercises/           # 语法练习
├── 04-Writing/              # 写作练习
│   ├── Essays/              # 作文练习
│   └── Grammar-Log/         # 语法错误记录
├── 05-Listening/            # 听力训练
│   ├── Dictation/           # 听写练习
│   └── Shadowing/           # 跟读练习
├── 06-Speaking/             # 口语练习
├── 07-Review-Plan/          # 复习计划
├── 08-Resources/            # 学习资源
│   ├── Dictionaries/        # 词典资源
│   ├── Media/               # 媒体文件
│   └── Phonetics/           # 音标学习
├── 09-Templates/            # 模板文件
└── 10-Stats/                # 学习统计
```

## 插件功能一览

| 插件 | 功能 | 使用场景 |
|------|------|----------|
| **obsidian-spaced-repetition** | 间隔重复闪卡 | 单词和语法复习 |
| **obsidian-language-learner** | 划词翻译、词典查询 | 阅读时查词 |
| **hi-words** | 单词高亮标记 | 标记已学/生词 |
| **ob-english-learner** | YouTube导入、AI翻译 | 视频学习 |
| **obsidian-english-assistant** | 语法检查、写作辅助 | 写作练习 |
| **dataview** | 数据查询与统计 | 学习数据仪表盘 |
| **templater-obsidian** | 模板自动应用 | 新建笔记时 |
| **obsidian-calendar-plugin** | 日历视图 | 每日笔记导航 |
| **rss-dashboard** | RSS订阅管理 | 英文文章获取 |
| **media-extended** | 媒体增强播放 | 视频/音频学习 |
| **various-complements** | 智能补全 | 快速输入 |
| **obsidian-git** | Git自动备份 | 仓库同步 |

## 快捷键

| 快捷键 | 功能 |
|--------|------|
| `Alt+D` | 新建每日笔记 |
| `Alt+T` | 插入模板 |
| `Ctrl+Shift+H` | 高亮选中文本 |
| `Ctrl+Shift+F` | 打开闪卡复习 |
| `Ctrl+Q` | 划词翻译 |
| `Ctrl+Shift+G` | 语法检查 |

## 核心功能模块

### 1. 阅读文章

详见 [[01-Reading/Reading-Workflow|阅读工作流]]

- **导入文章**：粘贴到 `01-Reading/Articles/` 或通过 RSS 获取
- **划词翻译**：`Ctrl + 鼠标悬停` 使用 language-learner 插件
- **重点标记**：`==高亮==` 或 `**加粗**` 标记
- **生词收集**：查询后自动保存或手动创建单词笔记

### 2. 单词管理

详见 [[02-Vocabulary/Vocabulary-Index|单词库总览]]

- **添加单词**：在 `02-Vocabulary/By-Alphabet/` 新建笔记（自动应用模板）
- **主题分类**：在 `02-Vocabulary/By-Theme/` 按主题浏览
- **难度分级**：beginner / intermediate / advanced
- **掌握度追踪**：mastery 字段记录（0-5级）

### 3. 闪卡复习

- **打开复习**：点击左侧 SR 图标或 `Ctrl+Shift+F`
- **卡片格式**：`单词::释义`（单行卡片）
- **复习节奏**：SM-2 算法自动安排
- **复习按钮**：简单 / 记得 / 较难

### 4. 学习统计

详见 [[10-Stats/Learning-Dashboard|学习仪表盘]]

- 词汇统计、掌握度分布
- 最近学习记录
- 待复习单词列表
