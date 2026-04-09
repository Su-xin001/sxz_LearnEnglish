---
title: "{{title}}"
description: 
created: {{date:YYYY-MM-DD}}
tags:
  - vocabulary
  - collection
---

## {{title}}

> [!info] 集合信息
> - **描述**: `=this.description`
> - **创建日期**: `=this.created`

### 📝 单词列表

```dataview
TABLE WITHOUT ID
  file.link AS 单词,
  meaning-zh AS 释义,
  mastery AS 掌握度
FROM "02-Vocabulary/Words"
WHERE contains(source, this.file.name) OR contains(topic, this.file.name)
SORT mastery ASC
```

### 🧠 闪卡

#flashcards/collection/`=this.file.name`

