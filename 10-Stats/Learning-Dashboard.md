---
type: stats-dashboard
tags:
  - stats
  - dashboard
---

## 📊 学习数据仪表盘

### 词汇统计

```dataview
TABLE length(rows) AS "数量"
FROM "02-Vocabulary/By-Alphabet"
WHERE type = "vocabulary-word"
GROUP BY difficulty
```

### 掌握度分布

```dataview
TABLE length(rows) AS "数量"
FROM "02-Vocabulary/By-Alphabet"
WHERE type = "vocabulary-word"
GROUP BY choice(mastery >= 5, "已掌握", mastery >= 3, "熟悉", mastery >= 1, "学习中", "未开始")
```

### 最近7天学习记录

```dataview
TABLE study-minutes AS "学习时长", words-learned AS "新学单词", words-reviewed AS "复习单词", articles-read AS "阅读篇数"
FROM "00-Daily-Notes"
WHERE type = "daily-note"
SORT date DESC
LIMIT 7
```

### 待复习单词

```dataview
TABLE word, definition-zh, review-count, date-reviewed
FROM "02-Vocabulary/By-Alphabet"
WHERE type = "vocabulary-word" AND mastery < 3
SORT review-count ASC
LIMIT 15
```

### 阅读文章统计

```dataview
TABLE file.link AS "文章", difficulty AS "难度", date-added AS "添加日期"
FROM "01-Reading/Articles"
WHERE type = "reading-article"
SORT date-added DESC
LIMIT 10
```

### 闪卡复习统计

使用 `obsidian-spaced-repetition` 插件查看详细复习数据。

### 本周目标进度

- [ ] 新学单词 30 个
- [ ] 复习单词 100 个
- [ ] 阅读文章 5 篇
- [ ] 写作练习 2 篇
