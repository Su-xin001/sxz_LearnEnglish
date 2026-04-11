# 🎓 sxz_LearnEnglish - Obsidian 英语学习仓库

> 一个功能完善、结构清晰、操作便捷的 Obsidian 英语学习系统

---

## 📖 项目简介

本项目是一个基于 Obsidian 笔记软件构建的综合性英语学习仓库，旨在帮助学习者：
- ✅ 系统化管理英语学习材料
- ✅ 高效积累和复习词汇
- ✅ 追踪学习进度和成果
- ✅ 建立完整的英语学习闭环（输入→积累→复习→输出）

---

## ✨ 核心特性

### 📖 阅读辅助系统
- 多难度分级阅读材料（Beginner/Intermediate/Advanced）
- 划词翻译和单词快速查询
- 自动提取生词并创建卡片
- 难句解析和笔记标注
- 阅读进度追踪

### 📝 词汇管理系统
- 多维度分类（字母/主题/难度）
- 完整的单词信息（拼写/音标/词性/释义/例句）
- 记忆方法记录（词根词缀/联想记忆）
- 相关词汇关联（同义词/反义词/派生词）
- 间隔重复复习（基于 SM-2 算法）

### 🔄 智能复习系统
- SM-2 记忆算法自动安排复习
- 单词卡片制作和管理
- 记忆曲线追踪
- 学习统计分析
- 牌组管理

### 📊 学习追踪系统
- 每日学习记录模板
- 周/月总结模板
- 数据可视化展示（Dataview）
- 进度追踪仪表板
- 学习成果统计

---

## 📁 仓库结构

```
sxz_LearnEnglish/
├── 00-Inbox/                    # 📥 临时收集箱
├── 01-Reading/                  # 📖 阅读材料区
│   ├── Articles/                # 文章（按难度分级）
│   ├── News/                    # 新闻报道
│   ├── Books/                   # 书籍摘录
│   └── Academic-Papers/         # 学术论文
├── 02-Vocabulary/               # 📝 词汇库
│   ├── By-Alphabet/             # 按字母分类 (A-Z)
│   ├── By-Topic/                # 按主题分类
│   └── By-Level/                # 按难度分级
├── 03-Notes/                    # 📓 学习笔记
│   ├── Daily-Notes/             # 每日笔记
│   ├── Weekly-Reviews/          # 周复习
│   └── Monthly-Reviews/         # 月总结
├── 04-Writing/                  # ✍️ 写作练习
├── 05-Listening/                # 🎧 听力材料
├── 06-Speaking/                 # 🗣️ 口语练习
├── 07-Review-System/            # 🔄 复习系统
├── 08-Resources/                # 📦 资源库
├── 09-Templates/                # 📋 模板库
└── 10-Documentation/            # 📖 文档中心
```

---

## 🔌 核心插件

### 已安装插件
1. **Obsidian English Assistant** - 词典和翻译辅助
2. **Spaced Repetition** - 间隔重复记忆系统
3. **Language Learner** - 语言学习辅助
4. **Hi-Words** - 词频统计和高亮
5. **Dataview** - 数据查询和展示
6. **Templater** - 高级模板引擎
7. **RSS Dashboard** - RSS 订阅管理
8. **Media Extended** - 媒体播放增强
9. **Various Complements** - 自动补全
10. **Obsidian Git** - 版本控制和备份

### 插件功能对比

| 插件 | 阅读辅助 | 单词管理 | 复习系统 | 学习统计 |
|------|---------|---------|---------|---------|
| English Assistant | ✅ | ✅ | ❌ | ❌ |
| Spaced Repetition | ❌ | ✅ | ✅ | ✅ |
| Language Learner | ✅ | ✅ | ❌ | ✅ |
| Hi-Words | ✅ | ✅ | ❌ | ✅ |
| Dataview | ❌ | ✅ | ❌ | ✅ |

---

## 🚀 快速开始

### 1. 环境准备
```bash
# 克隆仓库
git clone https://github.com/your-username/sxz_LearnEnglish.git

# 或使用 Obsidian 打开现有文件夹
```

### 2. 插件配置
1. 打开 Obsidian 设置
2. 启用所有已安装的社区插件
3. 按照 `10-Documentation/04-插件配置指南.md` 配置各插件

### 3. 模板设置
1. 设置 → 文件与链接
2. 模板文件夹：`09-Templates`
3. 每日笔记模板：`Daily-Note-Template`

### 4. 开始学习
1. 打开 [[Homepage]] 页面
2. 创建今日笔记（Ctrl+Shift+N）
3. 选择阅读文章开始学习

---

## 📚 文档导航

### 新手必读
- [[02-仓库使用指南]] - 完整功能说明
- [[03-操作手册]] - 详细操作步骤
- [[04-插件配置指南]] - 插件配置详解
- [[01-文件命名规范]] - 命名规则说明

### 模板文件
- [[Vocabulary-Card-Template]] - 单词卡片模板
- [[Reading-Article-Template]] - 阅读文章模板
- [[Daily-Note-Template]] - 每日笔记模板
- [[Weekly-Review-Template]] - 周复习模板

---

## 🎯 标准学习流程

### 每日学习闭环

```
📖 阅读文章
    ↓
📝 收集生词
    ↓
📋 制作卡片
    ↓
🔄 定期复习
    ↓
📊 总结反思
    ↓
📖 继续阅读
```

### 具体步骤

1. **晨间复习** (15 分钟)
   - 打开 Review 面板
   - 完成今日复习任务
   - 记录复习结果

2. **阅读训练** (30 分钟)
   - 选择合适难度文章
   - 阅读并标记生词
   - 查询和理解难点

3. **词汇积累** (20 分钟)
   - 整理生词到词汇库
   - 制作单词卡片
   - 添加标签分类

4. **晚间总结** (15 分钟)
   - 填写每日笔记
   - 记录收获与反思
   - 制定明日计划

---

## ⌨️ 快捷键速查

| 功能 | 快捷键 | 说明 |
|------|--------|------|
| 查询单词 | `Ctrl+Shift+D` | 快速查词 |
| 创建单词卡 | `Ctrl+Shift+V` | 添加生词 |
| 今日笔记 | `Ctrl+Shift+N` | 打开日记 |
| 插入模板 | `Ctrl+Shift+T` | 使用模板 |
| 开始复习 | `Ctrl+Shift+R` | 间隔复习 |
| 全局搜索 | `Ctrl+Shift+F` | 搜索内容 |

---

## 📊 学习统计

### Dataview 查询示例

**今日学习统计**:
````markdown
```dataview
TABLE sum(new-words) as "新词", 
       sum(review-words) as "复习", 
       sum(study-time) as "时长 (分钟)"
FROM "03-Notes/Daily-Notes"
WHERE date = date(today)
```
````

**本周进度**:
````markdown
```dataview
TABLE sum(new-words) as "新词",
       sum(review-words) as "复习",
       count(file.name) as "文章数"
FROM "03-Notes/Daily-Notes"
WHERE date >= start-of-week
```
````

---

## 🎨 个性化配置

### 主题推荐
- **Minimal** - 简洁高效
- **Blue Topaz** - 功能强大
- **Things** - 美观现代

### CSS 代码片段
可在 `.obsidian/snippets/` 文件夹添加自定义样式

### 插件优化
根据学习目标调整插件配置：
- 应试导向：重点使用 Spaced Repetition
- 应用导向：重点使用 Media Extended
- 学术导向：重点使用 Dataview

---

## 📈 学习建议

### 成功关键
1. ✅ 坚持每日打卡
2. ✅ 及时整理内容
3. ✅ 定期复习总结
4. ✅ 善用模板和快捷键
5. ✅ 保持仓库整洁

### 时间管理
- **晨间** (15min): 复习昨日单词
- **午间** (30min): 阅读新文章
- **晚间** (15min): 整理笔记，制定计划

### 复习策略
- 每日复习：新词次日复习
- 每周复习：周末总结本周内容
- 每月复习：月末回顾重点难点

---

## 🔧 常见问题

### 插件不工作
1. 检查插件是否启用
2. 重启 Obsidian
3. 重新安装插件
4. 查看控制台错误

### 模板不生效
1. 检查模板路径是否正确
2. 确认 Templater 插件已启用
3. 检查模板语法

### 同步冲突
1. 使用 Git 管理版本
2. 定期备份
3. 避免多设备同时编辑

---

## 📞 支持与反馈

### 遇到问题？
1. 查看文档说明
2. 检查插件文档
3. 搜索社区论坛
4. 提交 Issue

### 资源链接
- [Obsidian 官方文档](https://help.obsidian.md/)
- [Obsidian 中文社区](https://forum.obsidian.md/)
- [插件开发文档](https://marcus.se.net/obsidian-plugin-docs/)

---

## 📄 许可证

本项目采用 MIT 许可证

---

## 👨‍💻 维护者

**sxz_LearnEnglish**

---

**版本**: 1.0  
**创建日期**: 2026-04-11  
**最后更新**: 2026-04-11

---

> 💡 **提示**: 将 [[Homepage]] 设为 Obsidian 首页，方便快速导航
> 
> 设置方法：设置 → 外观 → 打开的笔记 → 选择 "Homepage"
