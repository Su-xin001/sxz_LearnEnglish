---
type: review-plan
period: weekly
date-start: <% tp.date.now("YYYY-MM-DD", 0) %>
date-end: <% tp.date.now("YYYY-MM-DD", 7) %>
total-words: 0
tags:
  - review
  - plan
---

## 本周目标

- [ ] 新学单词 `__` 个
- [ ] 复习单词 `__` 个
- [ ] 阅读文章 `__` 篇
- [ ] 写作练习 `__` 篇

## 每日计划

### 周一

- [ ] 

### 周二

- [ ] 

### 周三

- [ ] 

### 周四

- [ ] 

### 周五

- [ ] 

### 周六

- [ ] 

### 周日

- [ ] 

## 本周复习清单

```dataview
TABLE word, definition-zh, mastery, date-reviewed
FROM "02-Vocabulary"
WHERE type = "vocabulary-word" AND mastery < 5
SORT date-reviewed ASC
LIMIT 30
```

## 周总结
