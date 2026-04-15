import os
import re
from datetime import datetime

BASE_DIR = r'd:\GitHub\sxz_LearnEnglish\单词库\按难度分级\四六级'
VOCAB_FILE = r'd:\GitHub\sxz_LearnEnglish\学习资源\CET4备考\05_核心词汇\高频词汇\CET4核心高频词汇300词.md'

POS_MAP = {
    'v.': '动词', 'v./n.': '动名词', 'n./v.': '名动词', 'n.': '名词',
    'adj.': '形容词', 'adj./adv.': '形副词', 'adj./n.': '形名词',
    'adv.': '副词', 'n./adj.': '名形词', 'v./adj.': '动形词',
}

POS_CN_MAP = {
    '动词': '动词', '动名词': '动名词', '名动词': '名动词', '名词': '名词',
    '形容词': '形容词', '形副词': '形副词', '名形词': '名形词',
    '副词': '副词', '动形词': '动形词',
}

def parse_vocab_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    words = []
    pattern = r'\|\s*(\d+)\s*\|\s*([a-zA-Z\s\-]+?)\s*\|\s*(/[^/]+/)\s*\|\s*([a-z\./\s]+?)\s*\|\s*([^|]+?)\s*\|\s*(\d+)\s*\|\s*([^|]*?)\s*\|'
    matches = re.findall(pattern, content)

    for m in matches:
        seq, word, phonetic, pos, meaning, freq, collocation = m
        word = word.strip()
        phonetic = phonetic.strip()
        pos = pos.strip()
        meaning = meaning.strip()
        freq = freq.strip()
        collocation = collocation.strip()

        pos_cn = POS_MAP.get(pos, '其他')
        words.append({
            'word': word,
            'phonetic': phonetic,
            'pos': pos,
            'pos_cn': pos_cn,
            'meaning': meaning,
            'freq': freq,
            'collocation': collocation,
        })

    return words

def generate_card(w):
    word = w['word']
    phonetic = w['phonetic']
    pos_cn = w['pos_cn']
    pos_en = w['pos']
    meaning = w['meaning']
    freq = w['freq']
    collocation = w['collocation']

    coll_list = [c.strip() for c in collocation.split(';') if c.strip()]
    coll_display = '；'.join(coll_list) if coll_list else ''

    tags = ['单词', pos_cn, '四六级']

    frontmatter = f"""---
拼写: {word}
国际音标: {phonetic}
词性分类: {pos_cn}
难度等级: 四六级
主题分类: 四六级高频
掌握程度: 陌生
添加日期: 2026-04-14
标签: [{', '.join(tags)}]
类型: 单词卡片
flashcards: true
考频: {freq}
---"""

    meaning_parts = meaning.split('，')
    if len(meaning_parts) > 1:
        sense1 = meaning_parts[0]
        sense2 = '，'.join(meaning_parts[1:])
        senses = f"""### 义项一

**词性**：{pos_cn}（{pos_en}）
**英文释义**：
**中文释义**：{sense1}

### 义项二

**词性**：{pos_cn}（{pos_en}）
**英文释义**：
**中文释义**：{sense2}"""
    else:
        senses = f"""### 义项一

**词性**：{pos_cn}（{pos_en}）
**英文释义**：
**中文释义**：{meaning}"""

    example_section = f"""### 例句 1

> （待补充）
>

### 例句 2

> （待补充）
>"""

    memory_section = f"""### 词根词缀分析

（待补充）

### 联想记忆

（待补充）"""

    related_section = """### 同义词

-

### 反义词

-

### 词族

| 词性 | 单词 | 释义 |
|------|------|------|
| 名词 |  |  |
| 动词 |  |  |
| 形容词 |  |  |
| 副词 |  |  |"""

    flashcard_section = f"""#flashcards

拼写与释义
{word} :: {meaning}

常用搭配
{coll_display}"""

    card = f"""{frontmatter}

# {word}

## 📝 释义

{senses}

---

## 💬 典型例句

{example_section}

---

## 🧠 记忆方法

{memory_section}

---

## 🔗 关联词汇

{related_section}

---

## 📚 词源信息

---

## 🔄 复习卡片

{flashcard_section}

---

## 🔗 关联链接

**关联阅读材料**：

**关联学习笔记**：
"""
    return card

def get_filename(w):
    word = w['word']
    pos_cn = w['pos_cn']
    return f"{word}_{pos_cn}_四六级.md"

def main():
    words = parse_vocab_file(VOCAB_FILE)
    print(f"解析到 {len(words)} 个单词")

    os.makedirs(BASE_DIR, exist_ok=True)

    created = 0
    skipped = 0
    for w in words:
        filename = get_filename(w)
        filepath = os.path.join(BASE_DIR, filename)
        if os.path.exists(filepath):
            skipped += 1
            continue
        card = generate_card(w)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(card)
        created += 1

    print(f"新建 {created} 个单词卡片")
    print(f"跳过 {skipped} 个已存在卡片")
    print(f"总计 {created + skipped} 个")

    all_files = [f for f in os.listdir(BASE_DIR) if f.endswith('.md') and f != '.placeholder.md']
    print(f"四六级目录下现有 {len(all_files)} 个卡片文件")

if __name__ == '__main__':
    main()
