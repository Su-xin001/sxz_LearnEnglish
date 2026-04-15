import os
import re

BASE_DIR = r'd:\GitHub\sxz_LearnEnglish\单词库\按难度分级\四六级'
VOCAB_FILE = r'd:\GitHub\sxz_LearnEnglish\学习资源\CET4备考\05_核心词汇\高频词汇\CET4核心高频词汇300词.md'

def parse_vocab_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    words = []
    pattern = r'\|\s*(\d+)\s*\|\s*([a-zA-Z\s\-]+?)\s*\|\s*(/[^/]+/)\s*\|\s*([a-z\./\s]+?)\s*\|\s*([^|]+?)\s*\|\s*(\d+)\s*\|\s*([^|]*?)\s*\|'
    matches = re.findall(pattern, content)
    for m in matches:
        seq, word, phonetic, pos, meaning, freq, collocation = m
        words.append(word.strip())
    return words

def verify():
    vocab_words = parse_vocab_file(VOCAB_FILE)
    print(f"词汇表中单词数: {len(vocab_words)}")

    files = [f for f in os.listdir(BASE_DIR) if f.endswith('.md') and f != '.placeholder.md']
    print(f"卡片文件数: {len(files)}")

    card_words = set()
    missing_fields = []
    pos_distribution = {}
    errors = []

    for f in files:
        filepath = os.path.join(BASE_DIR, f)
        with open(filepath, 'r', encoding='utf-8') as fh:
            content = fh.read()

        word_from_name = f.split('_')[0]
        card_words.add(word_from_name)

        if '拼写:' not in content:
            missing_fields.append(f"{f}: 缺少拼写")
        if '国际音标:' not in content:
            missing_fields.append(f"{f}: 缺少音标")
        if '词性分类:' not in content:
            missing_fields.append(f"{f}: 缺少词性")
        if '难度等级: 四六级' not in content:
            missing_fields.append(f"{f}: 难度等级不是四六级")
        if '中文释义' not in content:
            missing_fields.append(f"{f}: 缺少中文释义")
        if '#flashcards' not in content:
            missing_fields.append(f"{f}: 缺少复习卡片")

        pos_match = re.search(r'词性分类: (.+)', content)
        if pos_match:
            pos = pos_match.group(1).strip()
            pos_distribution[pos] = pos_distribution.get(pos, 0) + 1

        spelling_match = re.search(r'拼写: (.+)', content)
        if spelling_match and spelling_match.group(1).strip() != word_from_name:
            errors.append(f"{f}: 文件名单词={word_from_name}, 拼写字段={spelling_match.group(1).strip()}")

    missing_words = set(vocab_words) - card_words
    extra_words = card_words - set(vocab_words)

    print(f"\n=== 词性分布 ===")
    for pos, count in sorted(pos_distribution.items(), key=lambda x: -x[1]):
        print(f"  {pos}: {count}词")

    print(f"\n=== 缺失单词 ===")
    if missing_words:
        for w in sorted(missing_words):
            print(f"  缺少: {w}")
    else:
        print("  无缺失，所有词汇表单词均有对应卡片")

    print(f"\n=== 多余单词 ===")
    if extra_words:
        for w in sorted(extra_words):
            print(f"  多余: {w}")
    else:
        print("  无多余卡片")

    print(f"\n=== 字段缺失检查 ===")
    if missing_fields:
        for mf in missing_fields[:10]:
            print(f"  {mf}")
        if len(missing_fields) > 10:
            print(f"  ... 还有 {len(missing_fields) - 10} 项")
    else:
        print("  所有卡片字段完整")

    print(f"\n=== 拼写一致性检查 ===")
    if errors:
        for e in errors:
            print(f"  {e}")
    else:
        print("  所有卡片拼写与文件名一致")

    total_checks = [
        len(missing_words) == 0,
        len(missing_fields) == 0,
        len(errors) == 0,
        len(files) >= 298,
    ]
    passed = sum(total_checks)
    print(f"\n=== 总结: 通过 {passed}/{len(total_checks)} 项检查 ===")
    if passed == len(total_checks):
        print("所有验证通过！")
    else:
        print("存在未通过项，请检查上述输出。")

if __name__ == '__main__':
    verify()
