---
type: guide
tags:
  - guide
  - plugins
---

# 🔧 插件配置说明

## 已安装插件配置详情

### 1. obsidian-spaced-repetition（间隔重复）

**功能**：闪卡复习，基于 SM-2 算法自动安排复习时间

**关键配置**：
- 闪卡标签：`#flashcards`
- 单行卡片分隔符：`::`（格式：`单词::释义`）
- 反转卡片分隔符：`:::`（格式：`单词:::释义`，双向卡片）
- 多行卡片分隔符：`?`
- 高亮填空：`==答案==` 自动生成填空题
- 算法：SM-2-OSR
- 复习按钮：简单 / 记得 / 较难

**个性化建议**：
- 如果觉得复习量太大，增大 `baseEase`（如 280-300）
- 如果觉得间隔太长，降低 `baseEase`（如 200-230）
- 开启 `loadBalance` 可平衡每日复习量

### 2. obsidian-language-learner（语言学习助手）

**功能**：划词翻译、词典查询、单词发音

**关键配置**：
- 母语：zh（中文）
- 外语：en（英文）
- 触发键：Ctrl + 鼠标悬停
- 词典优先级：有道 > 剑桥 > 句酷 > 沪江 > DeepL
- 自动发音：开启
- 机器翻译：开启

**个性化建议**：
- 如需 DeepL 翻译，需配置 API Key
- 可调整词典高度 `dict_height` 以适配屏幕
- 字体和行高可在设置中调整

### 3. hi-words（单词高亮）

**功能**：在笔记中自动高亮已学单词，鼠标悬停显示释义

**关键配置**：
- 单词本路径：`单词.canvas`
- 悬停显示释义：开启
- 自动高亮：开启
- 高亮样式：下划线
- 掌握度标记：开启
- TTS 发音：有道词典发音

**个性化建议**：
- 可将高亮样式改为 `background`（背景色）或 `color`（文字颜色）
- 添加多个单词本路径以覆盖更多单词

### 4. ob-english-learner（英语学习者）

**功能**：YouTube 视频导入、AI 翻译、字幕生成、TTS

**关键配置**：
- 默认语言：en
- 目标语言：zh
- AI 翻译：开启
- AI 格式化：开启
- 双语字幕：开启
- 语音转文字：开启
- TTS：开启

**个性化建议**：
- AI 功能需要配置 API Key
- 可自定义笔记模板格式
- 支持自定义 AI 提示词

### 5. obsidian-english-assistant（英语助手）

**功能**：语法检查、写作辅助、单词进度追踪

**关键配置**：
- 本地词典：开启（优先本地查询）
- 进度追踪：开启
- 里程碑目标：1000 词
- TTS 发音：开启
- 打卡提醒：开启（每日3个单词目标）

**个性化建议**：
- AI 功能需要配置 API Key
- 可自定义 system prompt 以调整检查风格
- 修改 `checkInGoal` 调整每日打卡目标

### 6. dataview（数据查询）

**功能**：在笔记中嵌入动态查询，生成统计表格

**关键配置**：
- 内联查询：开启
- Dataview JS：开启
- 刷新间隔：2.5秒
- 空值显示：`-`

**个性化建议**：
- 启用 `enableDataviewJs` 可使用更强大的 JS 查询
- 可在 `jsQueriesFile` 中定义复用查询

### 7. templater-obsidian（模板引擎）

**功能**：自动应用模板，支持动态变量和文件夹模板

**关键配置**：
- 模板文件夹：`09-Templates`
- 新建文件时触发：开启
- 文件夹模板映射：
  - `00-Daily-Notes` → `TPL-Daily-Note`
  - `01-Reading/Articles` → `TPL-Reading-Article`
  - `02-Vocabulary/By-Alphabet` → `TPL-Vocabulary-Word`
  - `02-Vocabulary/By-Theme` → `TPL-Vocabulary-Theme`
  - `03-Grammar/Rules` → `TPL-Grammar-Rule`
  - `04-Writing/Essays` → `TPL-Writing-Essay`
  - `07-Review-Plan` → `TPL-Review-Plan`

### 8. obsidian-calendar-plugin（日历）

**功能**：日历视图，快速导航每日笔记

**关键配置**：
- 日期格式：YYYY-MM-DD
- 笔记文件夹：`00-Daily-Notes`
- 模板：`09-Templates/TPL-Daily-Note`

### 9. rss-dashboard（RSS 仪表盘）

**功能**：订阅英文 RSS 源，自动获取文章

**已配置源**：
- Obsidian Changelog

**建议添加源**：
- BBC Learning English
- VOA Learning English
- The Economist
- Medium

### 10. media-extended（媒体增强）

**功能**：增强视频/音频播放，支持时间戳截图

**关键配置**：
- 默认音量：100
- 截图格式：JPEG
- 嵌入加载策略：即时加载
- 链接点击行为：分屏打开

### 11. various-complements（智能补全）

**功能**：自动补全单词、链接等

### 12. obsidian-git（Git 备份）

**功能**：自动 Git 提交和同步

**关键配置**：
- 自动保存间隔：1分钟
- 启动时自动拉取：开启
- 推送前拉取：开启
- 同步策略：merge
