# sxz_LearnEnglish 功能扩展设计（划词翻译 / AI 对话 / 阅读标注 / 统计）

- 日期：2026-08-16
- 状态：已获用户批准（2026-08-16），待实施
- 前置：仓库已从零重建（e4cb424），7 个基础插件已装（7a6621c）

## 1. 背景与目标

用户希望恢复"类似划词翻译"的阅读体验，并扩展 AI 对话与学习统计能力。选定 7 项功能：

| # | 功能 | 插件/方式 | 用途 |
|---|---|---|---|
| 1 | 划词翻译 | Lingo（tangramor/obsidian-lingo） | 选中文本悬浮窗即时翻译（Google 免费引擎默认，可加 DeepL 等） |
| 2 | PDF 标注 | Annotator（elias-sundqvist/obsidian-annotator） | 真题 PDF 精读标注，标注生成笔记 |
| 3 | 网页剪藏 | Obsidian Web Clipper（官方浏览器扩展） | 一键剪藏外刊/网页入仓库（浏览器端安装，无法命令行代装） |
| 4 | AI 对话 | Copilot（logancyang/obsidian-copilot） | Obsidian 内对话：查词/批改/语法解释 |
| 5 | 学习图表 | Obsidian Charts（phibr0/obsidian-charts） | Dataview 数据可视化（难度/阶段分布图） |
| 6 | 启动首页 | Homepage（mirnovov/obsidian-homepage） | 打开 Obsidian 直达学习中心 |
| 7 | 日历视图 | Calendar（liamcain/obsidian-calendar-plugin） | 日历查看每日学习记录 |

## 2. 安装方式

- 6 个插件从 GitHub 官方 Releases 下载 `main.js` + `manifest.json` + `styles.css` 到 `.obsidian/plugins/<id>/`（id 以 manifest 为准，目录名 = manifest id）
- Web Clipper：浏览器扩展，写入使用指南安装步骤（Chrome/Edge 商店 → 配置 vault 路径 → 剪藏到 `02-阅读/`）
- `community-plugins.json` 追加 6 个新 id（启用列表）

## 3. Copilot × DeepSeek 配置与 API Key 安全

- DeepSeek 为 OpenAI 兼容端点：Base URL `https://api.deepseek.com/v1`，Model `deepseek-chat`
- **Key 安全约束（强制）**：
  - 用户提供的 DeepSeek API key **只写入本地** `.obsidian/plugins/copilot/data.json`
  - 该文件加入 `.gitignore`（仿照 `obsidian-git/data.json` 的处理），**禁止提交到 git/GitHub**
  - 设计文档与使用指南中**不出现明文 key**
  - 提示用户：key 已在对话中明文出现，建议到 DeepSeek 控制台重置
- 配置位置：Copilot 插件设置 → Custom Model；若 data.json 预置失败，提供精确手动步骤

## 4. 预置配置

- **Homepage**：`data.json` 首页指向 `学习中心`（笔记名解析）
- **Charts**：学习中心加 1 个按难度柱状图示例（数据源：`01-词汇` 单词的 difficulty 统计）
- **Calendar**：默认配置（识别 `06-每日记录` daily notes 目录）
- **Lingo**：默认 Google 引擎（免 key）
- **Annotator**：默认配置

## 5. 文档更新

- `00-仪表盘/使用指南.md`：新增小节——划词翻译（Lingo 用法）、AI 对话（Copilot + DeepSeek 配置步骤，不含 key 明文）、PDF 标注（Annotator）、网页剪藏（Web Clipper 安装步骤）、学习图表（Charts 用法）
- `REASONIX.md`：补充"Copilot 可作为 Obsidian 内 AI 对话入口（等价于仓库 AI 助手）"提示

## 6. 里程碑（实施顺序）

1. 下载安装 6 插件（Releases 官方渠道，curl --ssl-no-revoke）
2. 校验 manifest id → 修正目录名；完整性检查（3 文件齐全）
3. `community-plugins.json` 追加 6 id
4. 预置配置：Copilot data.json（含 DeepSeek + key）+ `.gitignore` 追加 copilot data.json；Homepage data.json；学习中心 Charts 示例
5. 更新使用指南 + REASONIX.md
6. 验证（插件完整性、JSON 有效、git 不含 key）→ 提交 → push

## 7. 验证要点

- 6 插件目录名 == manifest id，3 文件齐全
- `community-plugins.json` 有效 JSON，共 13 个 id
- `git grep` 确认仓库中**无明文 key**（API key 不应出现在任何已跟踪文件）
- `copilot/data.json` 被 `.gitignore` 覆盖（`git check-ignore` 验证）
