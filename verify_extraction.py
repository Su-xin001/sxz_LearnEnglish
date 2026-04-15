import os

base = r'd:\GitHub\sxz_LearnEnglish\学习资源\CET4备考\07_完整真题'
categories = ['写作', '听力', '阅读', '翻译']

print('=== 文件验证 ===')
for cat in categories:
    folder = os.path.join(base, cat)
    if os.path.exists(folder):
        files = os.listdir(folder)
        for f in files:
            fpath = os.path.join(folder, f)
            size = os.path.getsize(fpath)
            with open(fpath, 'r', encoding='utf-8') as fh:
                content = fh.read()
                lines = content.count('\n')
            print(f'  {cat}/{f}: {size} bytes, {lines} lines')
    else:
        print(f'  {cat}/ - FOLDER NOT FOUND')

print()
print('=== 内容完整性检查 ===')

writing = os.path.join(base, '写作', '2025年12月_第2套_写作.txt')
with open(writing, 'r', encoding='utf-8') as f:
    w = f.read()
has_dir = 'Directions' in w
has_topic = 'academic writing' in w
print(f'写作: 含Directions={has_dir}, 含题目关键词academic writing={has_topic}')

listening = os.path.join(base, '听力', '2025年12月_第2套_听力.txt')
with open(listening, 'r', encoding='utf-8') as f:
    l = f.read()
has_sa = 'Section A' in l
has_sb = 'Section B' in l
has_sc = 'Section C' in l
q_count = 0
for i in range(1, 26):
    if str(i) + '.' in l:
        q_count += 1
print(f'听力: Section A={has_sa}, Section B={has_sb}, Section C={has_sc}, 题目1-25共{q_count}题')

reading = os.path.join(base, '阅读', '2025年12月_第2套_阅读.txt')
with open(reading, 'r', encoding='utf-8') as f:
    r = f.read()
has_ra = 'Section A' in r
has_rb = 'Section B' in r
has_rc = 'Section C' in r
has_wb = 'Word Bank' in r
blank_count = 0
for i in range(26, 36):
    if str(i) in r:
        blank_count += 1
match_count = 0
for i in range(36, 46):
    if str(i) + '.' in r:
        match_count += 1
has_p1 = 'Passage One' in r
has_p2 = 'Passage Two' in r
detail_count = 0
for i in range(46, 56):
    if str(i) + '.' in r:
        detail_count += 1
print(f'阅读: Section A={has_ra}, Section B={has_rb}, Section C={has_rc}')
print(f'  选词填空: Word Bank={has_wb}, 26-35空={blank_count}个')
print(f'  段落匹配: 36-45题={match_count}题')
print(f'  仔细阅读: Passage One={has_p1}, Passage Two={has_p2}, 46-55题={detail_count}题')

translation = os.path.join(base, '翻译', '2025年12月_第2套_翻译.txt')
with open(translation, 'r', encoding='utf-8') as f:
    t = f.read()
has_cn = '城市漫步' in t
has_dir2 = 'Directions' in t
print(f'翻译: 含中文原文={has_cn}, 含Directions={has_dir2}')

print()
print('=== 总结 ===')
total_checks = [has_dir, has_topic, has_sa, has_sb, has_sc, q_count == 25,
                has_ra, has_rb, has_rc, has_wb, blank_count == 10,
                match_count == 10, has_p1, has_p2, detail_count == 10,
                has_cn, has_dir2]
passed = sum(total_checks)
total = len(total_checks)
print(f'通过 {passed}/{total} 项检查')
if passed == total:
    print('所有内容完整性检查通过！')
else:
    print('存在未通过项，请检查上述输出。')
