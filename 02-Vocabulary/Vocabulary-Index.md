---
type: vocabulary-index
tags:
  - vocabulary
  - index
---

## 单词库总览

### 统计数据

```dataview
TABLE length(rows) AS "单词数量"
FROM "02-Vocabulary/By-Alphabet"
WHERE type = "vocabulary-word"
GROUP BY difficulty
```

### 按字母浏览

```dataview
TABLE word, phonetic, pos, definition-zh, mastery
FROM "02-Vocabulary/By-Alphabet"
WHERE type = "vocabulary-word"
SORT word ASC
```

### 按主题浏览

```dataview
LIST
FROM "02-Vocabulary/By-Theme"
WHERE type = "vocabulary-theme"
SORT theme ASC
```

### 按难度浏览

- [[02-Vocabulary/By-Difficulty/Beginner-Words|初级词汇 (Beginner)]]
- [[02-Vocabulary/By-Difficulty/Intermediate-Words|中级词汇 (Intermediate)]]
- [[02-Vocabulary/By-Difficulty/Advanced-Words|高级词汇 (Advanced)]]

### 待复习单词

```dataview
TABLE word, definition-zh, review-count, date-reviewed
FROM "02-Vocabulary/By-Alphabet"
WHERE type = "vocabulary-word" AND mastery < 3
SORT review-count ASC, date-reviewed ASC
LIMIT 20
```

### 已掌握单词

```dataview
TABLE word, definition-zh, review-count
FROM "02-Vocabulary/By-Alphabet"
WHERE type = "vocabulary-word" AND mastery >= 5
SORT word ASC
```
