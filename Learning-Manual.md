---
type: guide
tags:
  - guide
  - manual
---

# 📖 日常学习操作手册

## 标准学习流程

### 每日学习流程（建议30-45分钟）

```
1. 打开日记（Alt+D）         → 记录今日学习计划
2. 闪卡复习（Ctrl+Shift+F）  → 15分钟间隔重复复习
3. 阅读文章                  → 10-15分钟精读/泛读
4. 学习新词                  → 5-10个新单词
5. 更新日记                  → 记录学习数据
```

---

## 常见操作步骤

### 操作1：添加新单词

1. 在 `02-Vocabulary/By-Alphabet/` 中新建笔记
2. 文件名使用单词本身（如 `consistency.md`）
3. Templater 自动应用单词模板
4. 填写：音标、词性、释义、例句、记忆方法
5. 在底部添加闪卡行：`单词::释义`
6. 设置 `difficulty` 和 `theme` 字段

### 操作2：导入阅读文章

1. 在 `01-Reading/Articles/` 中新建笔记
2. Templater 自动应用阅读模板
3. 将英文文章粘贴到"原文"部分
4. 阅读时使用 `Ctrl + 鼠标悬停` 查询生词
5. 用 `==高亮==` 标记重点内容
6. 将生词添加到单词库

### 操作3：闪卡复习

1. 点击左侧 SR 图标或按 `Ctrl+Shift+F`
2. 选择要复习的卡片组
3. 看到问题后思考答案
4. 点击"显示答案"
5. 根据记忆情况选择：
   - **简单**：间隔大幅增加
   - **记得**：间隔正常增加
   - **较难**：间隔缩短

### 操作4：创建复习计划

1. 在 `07-Review-Plan/` 中新建笔记
2. Templater 自动应用复习计划模板
3. 设定本周学习目标
4. 每日完成后勾选复选框
5. 周末填写总结

### 操作5：写作练习

1. 在 `04-Writing/Essays/` 中新建笔记
2. 写完初稿后使用 `obsidian-english-assistant` 检查语法
3. 快捷键 `Ctrl+Shift+G` 触发语法检查
4. 根据建议修改，记录错误到 Grammar-Log

---

## 问题排查

### Q: 划词翻译不工作？

1. 确认 `obsidian-language-learner` 插件已启用
2. 检查设置中 `function_key` 是否为 `ctrlKey`
3. 确保按住 Ctrl 键的同时鼠标悬停在单词上
4. 检查网络连接（在线词典需要网络）

### Q: 闪卡不显示？

1. 确认笔记中包含 `#flashcards` 标签
2. 确认卡片格式正确：`单词::释义`
3. 检查 `obsidian-spaced-repetition` 插件是否启用
4. 尝试重启 Obsidian

### Q: 模板不自动应用？

1. 确认 `templater-obsidian` 插件已启用
2. 检查 `Trigger Templater on new file creation` 是否开启
3. 确认文件夹模板映射正确
4. 确认模板文件路径与设置一致

### Q: Dataview 查询无结果？

1. 确认 `dataview` 插件已启用
2. 确认笔记的 frontmatter 格式正确（YAML 语法）
3. 检查查询语句中的字段名与 frontmatter 一致
4. 确认 `Enable Inline Queries` 已开启

### Q: 单词高亮不显示？

1. 确认 `hi-words` 插件已启用
2. 检查单词本路径配置是否正确
3. 确认 `enableAutoHighlight` 已开启
4. 尝试刷新笔记视图

---

## 个性化调整建议

### 调整复习间隔

在 `obsidian-spaced-repetition` 设置中：
- `Base ease`：默认 250，值越大间隔增长越快
- `Lapses interval change`：默认 0.5，答错后间隔缩短比例
- `Easy bonus`：默认 1.3，点"简单"时的额外加成

### 调整词典优先级

在 `obsidian-language-learner` 设置中：
- 修改各词典的 `priority` 值（1最高）
- 按需启用/禁用词典

### 添加 RSS 订阅源

在 `rss-dashboard` 插件中添加：
- BBC Learning English: `https://www.bbc.co.uk/learningenglish/english/features/6-minute-english/rss`
- VOA Learning English: `https://learningenglish.voanews.com/rss`
- 其他你喜欢的英文内容源

### 自定义模板

在 `09-Templates/` 中修改模板文件：
- 添加/删除字段
- 调整内容结构
- 修改后新笔记将使用更新后的模板
