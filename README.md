<p align="center">
  <h1 align="center">🎓 sxz_LearnEnglish</h1>
  <p align="center"><strong>基于 Obsidian 的大学生英语学习系统</strong></p>
  <p align="center">
    <img src="https://img.shields.io/badge/Obsidian-1.0+-7c3aed?style=flat-square&logo=obsidian" alt="Obsidian">
    <img src="https://img.shields.io/badge/Plugins-14-059669?style=flat-square" alt="Plugins">
    <img src="https://img.shields.io/badge/Templates-7-2563eb?style=flat-square" alt="Templates">
    <img src="https://img.shields.io/badge/License-MIT-d97706?style=flat-square" alt="License">
  </p>


---

## 📖 项目概述

**sxz_LearnEnglish** 是一个基于 [Obsidian](https://obsidian.md) 构建的功能完善、高效实用的英语学习仓库，专为大学生设计。以"极其方便日常学习"为核心目标，将单词管理、阅读辅助、写作练习、听力训练、语法学习五大模块整合在一个知识库中，通过 Dataview 数据驱动仪表盘、间隔重复记忆算法、自定义插件和 CSS 美化，打造沉浸式英语学习环境。

### 设计理念

- **数据驱动**：Dataview 实时统计学习数据，量化学习进度
- **科学记忆**：SM-2 间隔重复算法，高效巩固长期记忆
- **多维度分类**：一词多分类（词性/主题/难度/记忆阶段），灵活检索
- **沉浸体验**：紫色主题 + 卡片式布局 + 渐变动画，减少视觉疲劳
- **一键操作**：快捷键覆盖核心操作，减少上下文切换

---

## ✨ 核心功能

### 📚 单词管理系统

| 功能 | 说明 |
|------|------|
| 结构化单词卡片 | 音标、词性、多义项释义、例句、记忆方法、派生词、同反义词 |
| 多维度分类 | 按词性 / 主题 / 难度（CET4·CET6·考研·雅思托福）/ 记忆阶段 |
| 多种添加方式 | 模板创建 · 划词添加 · CSV 批量导入 |
| 间隔重复复习 | 基于 SM-2 算法的科学记忆系统 |
| 自定义插件 | Word Manager 插件：快速添加、批量导入、一词多分类 |

### 📖 阅读辅助系统

| 功能 | 说明 |
|------|------|
| 划词即时翻译 | `Ctrl + 鼠标悬停`，多词典源（有道/剑桥/DeepL） |
| 多色彩高亮标注 | 生词(粉) · 好句(橙) · 重点(黄) · 已掌握(绿) · 待复习(蓝) |
| 批注系统 | 笔记 / 疑问 / 洞察三种批注类型 |
| 生词一键入库 | 阅读中遇到的生词直接添加到单词库 |

### ✍️ 写作练习系统

| 功能 | 说明 |
|------|------|
| AI 智能批改 | 语法纠错、表达优化、多风格改写 |
| 范文积累 | 分类存储优秀范文 |
| 写作模板 | 议论文 / 说明文 / 应用文模板 |

### 🎧 听力资源系统

| 功能 | 说明 |
|------|------|
| 精听三步法 | 大意 → 细节 → 查漏补缺 |
| 媒体增强播放 | 时间戳笔记、截图标注 |
| TTS 朗读 | 选中文本即可朗读 |

### 📊 数据驱动学习中心

| 功能 | 说明 |
|------|------|
| Dataview 仪表盘 | 实时统计单词量、阅读量、掌握度分布 |
| 学习进度追踪 | 按日 / 周 / 月查看学习数据 |
| 间隔重复提醒 | 待复习单词自动排列 |

---

## 🗂️ 仓库结构

```
sxz_LearnEnglish/
├── 00-仪表盘/                  # 学习中心与统计
│   ├── 学习中心.md              # 主仪表盘（建议设为首页）
│   ├── 学习统计.md              # 详细学习数据分析
│   ├── 快捷键指南.md            # 快捷键参考
│   ├── 插件配置说明.md          # 插件配置文档
│   └── 仓库结构说明与操作手册.md  # 完整操作手册
│
├── 01-单词库/                  # 单词管理系统
│   ├── 单词库主页.md            # 单词库导航与统计
│   ├── 按词性分类/              # 名词/动词/形容词等
│   ├── 按主题分类/              # 教育/科技/环境等
│   ├── 按难度分级/              # CET4/CET6/考研/雅思托福
│   └── 词根词缀/                # 词根词缀学习
│
├── 02-阅读材料/                # 阅读辅助系统
│   ├── 文章/                   # 英文文章
│   ├── 书籍/                   # 英文书籍笔记
│   ├── 新闻/                   # 英文新闻
│   └── 真题/                   # 考试真题阅读
│
├── 03-语法笔记/                # 语法学习系统
│   ├── 基础语法/                # 时态/句型/语态等
│   ├── 进阶语法/                # 从句/非谓语/虚拟语气等
│   └── 语法专题/                # 易混淆/特殊用法等
│
├── 04-写作练习/                # 写作练习系统
│   ├── 范文积累/                # 优秀范文
│   ├── 写作练习/                # 个人习作
│   └── 写作模板/                # 写作框架模板
│
├── 05-听力资源/                # 听力练习系统
│   ├── 听力材料/                # 音频文件
│   └── 听力笔记/                # 听力记录
│
├── 06-学习计划/                # 学习计划管理
│
├── 07-模板/                    # 标准化模板库
│   ├── 单词卡片模板.md
│   ├── 阅读笔记模板.md
│   ├── 语法笔记模板.md
│   ├── 写作练习模板.md
│   ├── 每日学习模板.md
│   ├── 学习日志模板.md
│   └── 听力笔记模板.md
│
├── 08-资源/                    # 资源文件
│   ├── 附件/                   # PDF/图片等附件
│   ├── 音频/                   # 音频资源
│   ├── 图片/                   # 图片资源
│   └── 导入/                   # CSV 导入文件
│
├── 09-每日记录/                # 每日学习记录
│   ├── 每日记录主页.md          # 记录导航与统计
│   ├── 日记/                   # 每日日记（Alt+T 创建）
│   └── 学习日志/                # 独立学习日志
│
└── 10-归档/                    # 已完成/过期内容
```

---

## 🔌 插件生态

### 核心学习插件

| 插件 | 功能 | 快捷键 |
|------|------|--------|
| **Word Manager** | 单词快速添加、CSV 批量导入、一词多分类 | `Ctrl+Shift+W/A/C/T` |
| obsidian-spaced-repetition | 间隔重复记忆（SM-2 算法） | `Ctrl+Shift+R` |
| obsidian-language-learner | 划词翻译、词典查询 | `Ctrl+Shift+L` |
| obsidian-english-assistant | AI 英语助手、写作批改 | — |
| hi-words | 单词高亮、词汇本 | — |
| ob-english-learner | 英语学习套件 | — |

### 效率与工具插件

| 插件 | 功能 |
|------|------|
| dataview | 数据查询、仪表盘驱动（JS 内联查询 + DQL） |
| templater-obsidian | 模板引擎、文件夹模板自动应用 |
| various-complements | 智能补全 |
| obsidian-calendar-plugin | 日历视图 |
| media-extended | 媒体增强播放 |
| rss-dashboard | RSS 英文资讯订阅 |
| obsidian-git | Git 自动备份 |
| obsidian42-brat | Beta 插件管理器 |

### 自定义插件

| 插件 | 版本 | 说明 |
|------|------|------|
| **Word Manager** | v1.0.0 | 自研插件，提供单词快速添加、CSV 批量导入、一词多分类管理功能 |

---

## �️ 技术栈

| 类别 | 技术 |
|------|------|
| 知识库框架 | [Obsidian](https://obsidian.md) (v1.0+) |
| 查询引擎 | [Dataview](https://github.com/blacksmithgu/obsidian-dataview) (DQL + JS API) |
| 模板引擎 | [Templater](https://github.com/SilentVoid13/Templater) |
| 记忆算法 | SM-2 间隔重复 |
| 自定义插件 | Obsidian Plugin API (TypeScript/JavaScript) |
| 样式系统 | CSS Snippets (4 个自定义片段) |
| 版本管理 | Git + obsidian-git 自动备份 |
| 数据格式 | Markdown + YAML Frontmatter |

---

## �🚀 安装与配置

### 前置要求

- [Obsidian](https://obsidian.md) 桌面版 v1.0 及以上
- Git（用于克隆仓库和自动备份）

### 安装步骤

#### 1. 克隆仓库

```bash
git clone https://github.com/your-username/sxz_LearnEnglish.git
cd sxz_LearnEnglish
```

#### 2. 用 Obsidian 打开仓库

1. 启动 Obsidian
2. 选择 **"打开文件夹作为仓库"**
3. 选择克隆下来的 `sxz_LearnEnglish` 文件夹

#### 3. 启用插件

1. 进入 **设置 → 第三方插件**
2. 关闭 **"安全模式"**
3. 点击 **"重新加载"** 按钮
4. 在插件列表中逐个启用所需插件

> 仓库已包含所有插件文件，无需额外下载。Word Manager 为自研插件，已预装在 `.obsidian/plugins/word-manager/` 中。

#### 4. 启用 CSS 样式片段

1. 进入 **设置 → 外观 → CSS 代码片段**
2. 点击 **"刷新"** 按钮
3. 启用以下 4 个片段：

| 片段 | 功能 |
|------|------|
| `英语学习主题` | 紫色主题配色、行距优化、链接样式 |
| `单词卡片样式` | 单词卡片排版、音标、释义、例句样式 |
| `学习标注样式` | 5 色高亮、3 种批注、单词掌握度标记 |
| `仪表盘样式` | 卡片布局、统计数据、渐变动画、响应式 |

#### 5. 设置首页

1. 安装 [Homepage](https://github.com/mirnovov/obsidian-homepage) 插件（可选）
2. 将 `00-仪表盘/学习中心.md` 设为首页

---

## 📝 使用方法

### 快捷键速查

| 快捷键 | 功能 | 说明 |
|--------|------|------|
| `Alt+T` | 打开今日日记 | 打开/创建今天的日记 |
| `Ctrl+Shift+W` | 快速添加单词 | 弹出添加单词对话框 |
| `Ctrl+Shift+A` | 从选中文本添加 | 选中单词后一键添加 |
| `Ctrl+Shift+C` | 管理单词分类 | 修改当前单词的所有分类 |
| `Ctrl+Shift+T` | 快捷添加分类 | 一键切换分类标签 |
| `Ctrl+Shift+R` | 开始复习 | 启动间隔重复复习 |
| `Ctrl+Shift+L` | 划词查词 | 即时查词翻译 |
| `Ctrl+Alt+T` | 插入模板 | Templater 插入模板 |
| `Ctrl+Alt+N` | 从模板创建 | Templater 从模板创建笔记 |

### 日常操作

#### 添加新单词

1. **快捷添加**：按 `Ctrl+Shift+W`，在弹窗中输入单词信息
2. **划词添加**：选中编辑器中的英文单词，按 `Ctrl+Shift+A`
3. **模板创建**：`Ctrl+P` → "Templater: Create note from template" → 选择"单词卡片模板"
4. **批量导入**：`Ctrl+P` → "批量导入CSV"，选择 CSV 文件导入

#### 阅读英文文章

1. `Ctrl+P` → 选择"阅读笔记模板" → 创建阅读笔记
2. 粘贴原文，使用 `Ctrl+鼠标悬停` 划词翻译
3. 选中文本 → 右键 → 高亮标注 / 添加批注
4. 生词一键添加到单词库

#### 复习单词

1. 按 `Ctrl+Shift+R` 启动间隔重复复习
2. 根据掌握程度评分（1-5）
3. SM-2 算法自动安排下次复习时间

#### 写作练习

1. `Ctrl+P` → 选择"写作练习模板"
2. 撰写作文
3. 使用 English Assistant 插件进行 AI 批改

#### 每日记录

1. 按 `Alt+T` 打开/创建今日日记
2. 日记自动应用模板，存放在 `09-每日记录/日记/` 文件夹
3. 在 `09-每日记录/学习日志/` 中创建独立主题的学习日志

### CSV 批量导入格式

CSV 文件应包含以下列（首行为表头）：

```csv
word,phonetic_us,phonetic_uk,pos,definition_cn,example_en,difficulty
abandon,/əˈbændən/,,v.,放弃；遗弃,He abandoned his plan.,CET4
```

| 字段 | 必填 | 说明 |
|------|------|------|
| `word` | ✅ | 单词 |
| `phonetic_us` | ❌ | 美式音标 |
| `phonetic_uk` | ❌ | 英式音标 |
| `pos` | ❌ | 词性 |
| `definition_cn` | ❌ | 中文释义 |
| `example_en` | ❌ | 英文例句 |
| `difficulty` | ❌ | 难度级别（CET4/CET6/考研/雅思托福） |

---

## 🎨 自定义样式

仓库包含 4 个 CSS 样式片段，位于 `.obsidian/snippets/` 目录：

### 英语学习主题 (`英语学习主题.css`)

- 紫色主题配色（亮色/暗色模式自适应）
- 行距优化（1.9 倍行高）
- 链接样式增强
- 高亮标记渐变效果
- 标签圆角样式

### 单词卡片样式 (`单词卡片样式.css`)

- 单词卡片排版（圆角边框、阴影）
- 音标、释义、例句分区样式
- 记忆方法区域渐变背景
- 难度徽章（CET4 绿/CET6 蓝/考研橙/雅思粉）
- 亮色/暗色模式适配

### 学习标注样式 (`学习标注样式.css`)

- 5 色高亮标注（黄/绿/蓝/粉/橙）
- 3 种批注类型（笔记/疑问/洞察）
- 单词掌握度波浪下划线（未知红/学习中橙/已掌握绿）

### 仪表盘样式 (`仪表盘样式.css`)

- 卡片式网格布局（CSS Grid）
- 统计卡片彩色主题（紫/绿/蓝/橙）
- 渐变标题 + 装饰分隔线
- 悬停动画（上移 + 阴影 + 顶部高亮条）
- 响应式断点（≤600px 单列 / 601-900px 双列 / >900px 自适应）
- Dataview 表格美化

---

## 🤝 贡献指南

欢迎贡献！你可以通过以下方式参与：

### 报告问题

1. 在 [Issues](https://github.com/your-username/sxz_LearnEnglish/issues) 中创建新 Issue
2. 使用清晰的标题描述问题
3. 包含复现步骤、预期行为和实际行为

### 提交改进

1. Fork 本仓库
2. 创建功能分支：`git checkout -b feature/your-feature`
3. 提交更改：`git commit -m 'Add some feature'`
4. 推送分支：`git push origin feature/your-feature`
5. 提交 Pull Request

### 贡献方向

- 📝 补充单词库数据（CET4/CET6/考研/雅思托福词汇）
- 📖 添加阅读材料和配套笔记
- 🎨 优化 CSS 样式和主题
- 🔌 改进 Word Manager 插件功能
- 📚 完善语法笔记和写作模板
- 🌐 多语言支持

---

## 📄 许可证

本项目基于 [MIT License](https://opensource.org/licenses/MIT) 开源。

```
MIT License

Copyright (c) 2026 sxz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## � 联系方式

- **GitHub Issues**：[提交问题](https://github.com/your-username/sxz_LearnEnglish/issues)
- **GitHub Discussions**：[参与讨论](https://github.com/your-username/sxz_LearnEnglish/discussions)

---

<p align="center">
  <sub>Built with ❤️ using <a href="https://obsidian.md">Obsidian</a></sub>
</p>
