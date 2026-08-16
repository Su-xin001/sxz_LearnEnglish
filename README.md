# 🎓 sxz_LearnEnglish

基于 Obsidian 的英语学习仓库 —— 全场景（词汇 / 阅读 / 写作 / 听力口语）+ AI 深度参与，追求**极其方便日常使用**。

## 🚀 快速开始

1. **安装插件**（Obsidian 设置 → 第三方插件 → 社区插件市场）：
   - 必装：`Spaced Repetition`、`Obsidian Git`
   - 推荐：`Dataview`、`Templater`、`QuickAdd`、`Obsidian Dictionary`、`Edge TTS`
   - 详细清单见 `00-仪表盘/使用指南.md`
2. 打开 **`00-仪表盘/学习中心.md`** 查看学习仪表盘（需先启用 Dataview 插件）
3. 新建单词卡：复制 `05-模板与资源/模板/单词卡片模板.md` 到 `01-词汇/<难度>/` 目录，填写后自动进入对应复习牌组（`#flashcards/<难度>`）

## 📁 目录结构

| 目录 | 用途 |
|---|---|
| `00-仪表盘/` | 学习中心（Dataview 统计）、使用指南、工具清单 |
| `01-词汇/` | 单词库，按难度分层（CET4核心/CET6核心/考研词汇/雅思托福/其他） |
| `02-阅读/` | 阅读材料与精读笔记（外刊/真题/文章） |
| `03-写作/` | 写作练习与 AI 批改记录 |
| `04-听力口语/` | 听力精听与口语练习笔记 |
| `05-模板与资源/` | 6 个笔记模板 + 图片/音频/导入 CSV 资源 |
| `06-每日记录/` | Daily notes 自动生成的学习日记 |
| `99-归档/` | 已完成 / 不再活跃的内容 |

多维分类（词性 / 主题 / 记忆阶段）由 Dataview 按笔记 frontmatter 动态生成索引，无需深目录。

## 🤖 AI 深度参与

- 本仓库配置了 **obsidian-mcp**（本地 MCP 服务器），AI 可直接读写你的笔记库（查词建卡、作文批改、每日总结）
- AI 行为规范见 **`REASONIX.md`**（任何 AI 代理打开仓库即遵循）
- 典型工作流：AI 查词 → 生成单词卡（frontmatter 完整）→ 写入 `01-词汇/<难度>/` → Spaced Repetition 按 `#flashcards/<难度>` 安排复习

## 🛠 技术栈

Obsidian（Windows 桌面）· Dataview · Templater · Spaced Repetition · Daily notes/Templates 核心插件 · Markdown frontmatter · git
