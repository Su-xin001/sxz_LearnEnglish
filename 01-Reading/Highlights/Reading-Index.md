---
type: reading-highlights
tags:
  - reading
  - highlights
---

## 阅读高亮汇总

```dataview
TABLE file.link AS "文章", difficulty AS "难度", date-added AS "添加日期"
FROM "01-Reading/Articles"
WHERE type = "reading-article"
SORT date-added DESC
```

## 待复习文章

```dataview
LIST
FROM "01-Reading/Articles"
WHERE type = "reading-article" AND !contains(tags, "#reviewed")
SORT date-added ASC
LIMIT 10
```
