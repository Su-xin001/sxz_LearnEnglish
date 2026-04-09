---
type: flashcard-deck
tags:
  - flashcards
  - vocabulary
---

## 核心词汇闪卡

consistency::一致性，连贯性
immersion::沉浸，浸入
retention::记忆力，保持
patience::耐心
cramming::填鸭式学习
intensity::强度
neural::神经的

## 使用说明

1. 点击左侧栏的 **SR** 图标开始复习
2. 复习时选择"简单/记得/较难"来更新记忆间隔
3. 系统使用 **SM-2 间隔重复算法** 自动安排复习时间
4. 新卡片会在 1 天后首次复习，之后间隔逐渐增大

## 复习统计

```dataview
TABLE length(rows) AS "卡片数量"
FROM "02-Vocabulary"
WHERE contains(tags, "#flashcards")
FLATTEN file.lists AS L
WHERE L.text.contains("::")
GROUP BY file.folder
```
