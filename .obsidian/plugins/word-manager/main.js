const { Plugin, Modal, Notice, PluginSettingTab, Setting } = require("obsidian");

const DEFAULT_SETTINGS = {
  wordFolder: "01-单词库",
  defaultDifficulty: "CET4",
  defaultMemoryStage: "新词",
  importFolder: "08-资源/导入",
  templatePath: "07-模板/单词卡片模板.md",
  categories: {
    pos: ["noun", "verb", "adjective", "adverb", "preposition", "conjunction", "pronoun"],
    difficulty: ["CET4", "CET6", "考研", "雅思托福"],
    topic: ["教育", "科技", "环境", "社会", "经济", "健康", "政治", "生活"],
    memory_stage: ["新词", "学习中", "已掌握"]
  },
  posLabels: {
    noun: "名词 n.",
    verb: "动词 v.",
    adjective: "形容词 adj.",
    adverb: "副词 adv.",
    preposition: "介词 prep.",
    conjunction: "连词 conj.",
    pronoun: "代词 pron."
  },
  difficultyFolders: {
    CET4: "01-单词库/按难度分级/CET4核心",
    CET6: "01-单词库/按难度分级/CET6核心",
    "考研": "01-单词库/按难度分级/考研词汇",
    "雅思托福": "01-单词库/按难度分级/雅思托福"
  },
  shortcutKey: "Ctrl+Shift+W"
};

class WordManagerPlugin extends Plugin {
  constructor(app, manifest) {
    super(app, manifest);
    this.settings = DEFAULT_SETTINGS;
  }

  async onload() {
    await this.loadSettings();
    this.addSettingTab(new WordManagerSettingTab(this.app, this));

    this.addCommand({
      id: "add-word",
      name: "快速添加单词",
      callback: () => {
        const editor = this.app.workspace.activeEditor?.editor;
        if (editor) {
          const selection = editor.getSelection().trim();
          if (selection) {
            this.openAddWordModal(selection);
          } else {
            this.openAddWordModal();
          }
        } else {
          this.openAddWordModal();
        }
      },
      hotkeys: [{ modifiers: ["Mod", "Shift"], key: "w" }]
    });

    this.addCommand({
      id: "add-word-from-selection",
      name: "从选中文本添加单词",
      editorCallback: (editor) => {
        const selection = editor.getSelection().trim();
        if (selection) {
          this.openAddWordModal(selection);
        } else {
          new Notice("请先选中一个单词");
        }
      },
      hotkeys: [{ modifiers: ["Mod", "Shift"], key: "a" }]
    });

    this.addCommand({
      id: "import-csv",
      name: "批量导入CSV单词",
      callback: () => this.openImportModal()
    });

    this.addCommand({
      id: "manage-categories",
      name: "管理单词分类",
      editorCallback: (editor) => {
        const file = this.app.workspace.getActiveFile();
        if (file && file.path.startsWith(this.settings.wordFolder)) {
          this.openCategoryModal(file);
        } else {
          new Notice("请在单词库中的笔记上使用此功能");
        }
      },
      hotkeys: [{ modifiers: ["Mod", "Shift"], key: "c" }]
    });

    this.addCommand({
      id: "update-mastery",
      name: "更新掌握度",
      callback: () => {
        const file = this.app.workspace.getActiveFile();
        if (file && file.path.startsWith(this.settings.wordFolder)) {
          this.openMasteryModal(file);
        } else {
          new Notice("请在单词库中的笔记上使用此功能");
        }
      }
    });

    this.addCommand({
      id: "browse-categories",
      name: "浏览分类视图",
      callback: () => this.openCategoryBrowser()
    });

    this.addCommand({
      id: "batch-categorize",
      name: "批量分类管理",
      callback: () => this.openBatchCategoryModal()
    });

    this.addCommand({
      id: "add-category-to-word",
      name: "快捷添加分类标签",
      editorCallback: (editor) => {
        const file = this.app.workspace.getActiveFile();
        if (file && file.path.startsWith(this.settings.wordFolder)) {
          this.openQuickCategoryModal(file);
        } else {
          new Notice("请在单词库中的笔记上使用此功能");
        }
      },
      hotkeys: [{ modifiers: ["Mod", "Shift"], key: "t" }]
    });

    this.registerEvent(
      this.app.workspace.on("editor-menu", (menu, editor) => {
        const selection = editor.getSelection().trim();
        if (selection && /^[a-zA-Z\s-]+$/.test(selection)) {
          menu.addItem((item) => {
            item.setTitle("添加到单词库")
              .setIcon("plus-circle")
              .onClick(() => this.openAddWordModal(selection));
          });
          menu.addItem((item) => {
            item.setTitle("快速查词")
              .setIcon("search")
              .onClick(() => this.lookupWord(selection));
          });
        }
      })
    );

    this.registerEvent(
      this.app.workspace.on("file-menu", (menu, file) => {
        if (file && file.path.startsWith(this.settings.wordFolder) && file.extension === "md") {
          menu.addItem((item) => {
            item.setTitle("管理单词分类")
              .setIcon("tags")
              .onClick(() => this.openCategoryModal(file));
          });
          menu.addItem((item) => {
            item.setTitle("快捷添加分类")
              .setIcon("tag")
              .onClick(() => this.openQuickCategoryModal(file));
          });
        }
      })
    );

    new Notice("Word Manager 插件已加载");
  }

  onunload() {
    new Notice("Word Manager 插件已卸载");
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  lookupWord(word) {
    const encodedWord = encodeURIComponent(word);
    window.open(`https://www.youdao.com/result?word=${encodedWord}&lang=en`, "_blank");
  }

  async fetchWordTranslation(word) {
    try {
      const encodedWord = encodeURIComponent(word);
      const url = `https://dict.youdao.com/jsonapi?q=${encodedWord}&doctype=json`;
      
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      const result = {
        word: word,
        phonetic_uk: "",
        phonetic_us: "",
        pos: [],
        meaning: "",
        example_en: "",
        example_zh: "",
        synonyms: [],
        derivatives: []
      };
      
      if (data.ec && data.ec.word && data.ec.word.length > 0) {
        const wordData = data.ec.word[0];
        
        if (wordData.ukphone) result.phonetic_uk = wordData.ukphone;
        if (wordData.usphone) result.phonetic_us = wordData.usphone;
        
        if (wordData.trs && wordData.trs.length > 0) {
          const meanings = [];
          const posSet = new Set();
          
          wordData.trs.forEach((tr) => {
            if (tr.tr && tr.tr.length > 0) {
              const meaning = tr.tr[0].l && tr.tr[0].l.i && tr.tr[0].l.i.length > 0 
                ? tr.tr[0].l.i[0] 
                : "";
              if (meaning) {
                const pos = tr.pos || "";
                if (pos) {
                  const posMap = {
                    "n.": "noun",
                    "v.": "verb",
                    "adj.": "adjective",
                    "adv.": "adverb",
                    "prep.": "preposition",
                    "conj.": "conjunction",
                    "pron.": "pronoun"
                  };
                  const mappedPos = posMap[pos];
                  if (mappedPos) posSet.add(mappedPos);
                  meanings.push(`${pos} ${meaning}`);
                } else {
                  meanings.push(meaning);
                }
              }
            }
          });
          
          result.meaning = meanings.join("; ");
          result.pos = Array.from(posSet);
        }
      }
      
      if (data.web_trans && data.web_trans.web_translation && data.web_trans.web_translation.length > 0) {
        const webTrans = data.web_trans.web_translation;
        if (!result.meaning && webTrans[0].value) {
          result.meaning = webTrans[0].value;
        }
      }
      
      if (data.blng_sents_part && data.blng_sents_part.sentence_pair && data.blng_sents_part.sentence_pair.length > 0) {
        const example = data.blng_sents_part.sentence_pair[0];
        if (example.sentence) result.example_en = example.sentence;
        if (example.sentence_translation) result.example_zh = example.sentence_translation;
      }
      
      if (data.rel_word && data.rel_word.rels && data.rel_word.rels.length > 0) {
        data.rel_word.rels.forEach((rel) => {
          if (rel.rel && rel.rel.name === "同近义词" && rel.words && rel.words.length > 0) {
            rel.words.slice(0, 5).forEach((w) => {
              if (w.w) result.synonyms.push(w.w);
            });
          }
          if (rel.rel && rel.rel.name === "派生" && rel.words && rel.words.length > 0) {
            rel.words.slice(0, 5).forEach((w) => {
              if (w.w) result.derivatives.push(w.w);
            });
          }
        });
      }
      
      return result;
    } catch (error) {
      console.warn("获取翻译失败:", error);
      return null;
    }
  }

  openAddWordModal(prefillWord) {
    new AddWordModal(this.app, this, prefillWord || "").open();
  }

  openImportModal() {
    new ImportCSVModal(this.app, this).open();
  }

  openCategoryModal(file) {
    new CategoryModal(this.app, this, file).open();
  }

  openMasteryModal(file) {
    new MasteryModal(this.app, this, file).open();
  }

  openCategoryBrowser() {
    new CategoryBrowserModal(this.app, this).open();
  }

  openBatchCategoryModal() {
    new BatchCategoryModal(this.app, this).open();
  }

  openQuickCategoryModal(file) {
    new QuickCategoryModal(this.app, this, file).open();
  }

  async createWordNote(wordData) {
    const { word, phonetic_uk, phonetic_us, pos, difficulty, topic, definitions, memory_method, synonyms, antonyms, derivatives } = wordData;
    const folder = this.settings.difficultyFolders[difficulty] || this.settings.difficultyFolders[this.settings.defaultDifficulty];
    const fileName = word.toLowerCase().replace(/\s+/g, "-");
    const filePath = `${folder}/${fileName}.md`;

    const existingFile = this.app.vault.getAbstractFileByPath(filePath);
    if (existingFile) {
      new Notice(`单词 "${word}" 已存在: ${filePath}`);
      return null;
    }

    const posArray = pos || [];
    const topicArray = topic || [];
    const today = new Date().toISOString().split("T")[0];

    const frontmatter = [
      "---",
      `word: "${word}"`,
      `phonetic_uk: "${phonetic_uk || ""}"`,
      `phonetic_us: "${phonetic_us || ""}"`,
      "pos:",
      ...posArray.map((p) => `  - ${p}`),
      `difficulty: "${difficulty || this.settings.defaultDifficulty}"`,
      "topic:",
      ...topicArray.map((t) => `  - ${t}`),
      `memory_stage: "${this.settings.defaultMemoryStage}"`,
      `date_added: "${today}"`,
      "mastery: 0",
      "tags:",
      "  - 单词",
      "  - flashcards",
      ...(difficulty ? [`  - ${difficulty}`] : []),
      "aliases: []",
      "---"
    ].join("\n");

    let definitionsSection = "";
    if (definitions && definitions.length > 0) {
      definitionsSection = '\n## 释义\n\n<div class="definition-block">\n\n**常用义项**\n\n';
      definitions.forEach((def, i) => {
        definitionsSection += `${i + 1}. **${def.pos || ""}** ${def.meaning}\n`;
        if (def.examples && def.examples.length > 0) {
          def.examples.forEach((ex) => {
            definitionsSection += `   - <div class="example-sentence">${ex.en}\n   <span class="chinese-translation">${ex.zh}</span></div>\n`;
          });
        }
      });
      definitionsSection += "\n</div>\n";
    }

    let memorySection = "";
    if (memory_method) {
      memorySection = `\n## 记忆方法\n\n<div class="memory-section">\n\n${memory_method}\n\n</div>\n`;
    }

    let relatedSection = "";
    if ((derivatives && derivatives.length > 0) || (synonyms && synonyms.length > 0) || (antonyms && antonyms.length > 0)) {
      relatedSection = "\n## 相关词汇\n\n";
      if (derivatives && derivatives.length > 0) {
        relatedSection += '**派生词**\n<div class="related-words">\n';
        derivatives.forEach((d) => { relatedSection += `<span class="related-word">[[${d}]]</span>\n`; });
        relatedSection += "</div>\n\n";
      }
      if (synonyms && synonyms.length > 0) {
        relatedSection += '**同义词**\n<div class="related-words">\n';
        synonyms.forEach((s) => { relatedSection += `<span class="related-word">[[${s}]]</span>\n`; });
        relatedSection += "</div>\n\n";
      }
      if (antonyms && antonyms.length > 0) {
        relatedSection += '**反义词**\n<div class="related-words">\n';
        antonyms.forEach((a) => { relatedSection += `<span class="related-word">[[${a}]]</span>\n`; });
        relatedSection += "</div>\n";
      }
    }

    let flashcardsSection = "\n## 复习卡片\n\n#flashcards\n\n";
    if (definitions && definitions.length > 0) {
      definitions.forEach((def) => {
        flashcardsSection += `${word} (${def.pos || ""}) :: ${def.meaning}\n`;
      });
    }

    const content = `# ${word}\n\n## 音标与词性\n\n<div class="word-card">\n\n<div class="word-title">\n${word}\n<span class="phonetic">UK /${phonetic_uk || ""}/ US /${phonetic_us || ""}/</span>\n</div>\n\n<div>\n${posArray.map((p) => `<span class="pos-tag">${this.settings.posLabels[p] || p}</span>`).join("\n")}\n</div>\n\n</div>\n${definitionsSection}${memorySection}${relatedSection}${flashcardsSection}`;

    if (!this.app.vault.getAbstractFileByPath(folder)) {
      await this.app.vault.createFolder(folder).catch(() => {});
    }

    const file = await this.app.vault.create(filePath, content);
    new Notice(`单词 "${word}" 已添加到 ${filePath}`);
    return file;
  }

  async importFromCSV(csvContent, difficulty) {
    const lines = csvContent.split("\n").filter((l) => l.trim());
    if (lines.length < 2) {
      new Notice("CSV文件格式错误：至少需要表头和一行数据");
      return { success: 0, failed: 0, errors: ["CSV文件为空"] };
    }

    const header = lines[0].split(",").map((h) => h.trim().replace(/"/g, "").toLowerCase());
    const results = { success: 0, failed: 0, errors: [] };

    const wordIdx = header.indexOf("word");
    const phoneticUkIdx = header.indexOf("phonetic_uk");
    const phoneticUsIdx = header.indexOf("phonetic_us");
    const posIdx = header.indexOf("pos");
    const meaningIdx = header.indexOf("meaning");
    const difficultyIdx = header.indexOf("difficulty");
    const topicIdx = header.indexOf("topic");
    const exampleEnIdx = header.indexOf("example_en");
    const exampleZhIdx = header.indexOf("example_zh");
    const memoryIdx = header.indexOf("memory");
    const synonymsIdx = header.indexOf("synonyms");
    const antonymsIdx = header.indexOf("antonyms");
    const derivativesIdx = header.indexOf("derivatives");

    if (wordIdx === -1 || meaningIdx === -1) {
      new Notice("CSV文件必须包含 word 和 meaning 列");
      return { success: 0, failed: 0, errors: ["缺少必要列: word, meaning"] };
    }

    for (let i = 1; i < lines.length; i++) {
      try {
        const cols = this.parseCSVLine(lines[i]);
        const word = (cols[wordIdx] || "").trim().replace(/"/g, "");
        if (!word) continue;

        const wordDifficulty = difficultyIdx >= 0 ? (cols[difficultyIdx] || "").trim() : difficulty;
        const posStr = posIdx >= 0 ? (cols[posIdx] || "").trim() : "";
        const posArray = posStr ? posStr.split(/[;|]/).map((p) => p.trim()).filter((p) => p) : [];
        const topicStr = topicIdx >= 0 ? (cols[topicIdx] || "").trim() : "";
        const topicArray = topicStr ? topicStr.split(/[;|]/).map((t) => t.trim()).filter((t) => t) : [];

        const definitions = [];
        const meaning = (cols[meaningIdx] || "").trim();
        if (meaning) {
          const def = { pos: posArray.length > 0 ? posArray[0] : "", meaning, examples: [] };
          if (exampleEnIdx >= 0 && cols[exampleEnIdx]) {
            def.examples.push({
              en: cols[exampleEnIdx].trim(),
              zh: exampleZhIdx >= 0 ? (cols[exampleZhIdx] || "").trim() : ""
            });
          }
          definitions.push(def);
        }

        const synonymsStr = synonymsIdx >= 0 ? (cols[synonymsIdx] || "").trim() : "";
        const synonyms = synonymsStr ? synonymsStr.split(/[;|]/).map((s) => s.trim()).filter((s) => s) : [];
        const antonymsStr = antonymsIdx >= 0 ? (cols[antonymsIdx] || "").trim() : "";
        const antonyms = antonymsStr ? antonymsStr.split(/[;|]/).map((a) => a.trim()).filter((a) => a) : [];
        const derivativesStr = derivativesIdx >= 0 ? (cols[derivativesIdx] || "").trim() : "";
        const derivatives = derivativesStr ? derivativesStr.split(/[;|]/).map((d) => d.trim()).filter((d) => d) : [];

        await this.createWordNote({
          word,
          phonetic_uk: phoneticUkIdx >= 0 ? (cols[phoneticUkIdx] || "").trim() : "",
          phonetic_us: phoneticUsIdx >= 0 ? (cols[phoneticUsIdx] || "").trim() : "",
          pos: posArray,
          difficulty: wordDifficulty || this.settings.defaultDifficulty,
          topic: topicArray,
          definitions,
          memory_method: memoryIdx >= 0 ? (cols[memoryIdx] || "").trim() : "",
          synonyms,
          antonyms,
          derivatives
        });
        results.success++;
      } catch (e) {
        results.failed++;
        results.errors.push(`第${i + 1}行: ${e.message}`);
      }
    }

    return results;
  }

  parseCSVLine(line) {
    const result = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === "," && !inQuotes) {
        result.push(current);
        current = "";
      } else {
        current += char;
      }
    }
    result.push(current);
    return result;
  }

  async updateWordCategories(file, categories) {
    await this.app.fileManager.processFrontMatter(file, (fm) => {
      if (categories.pos !== undefined) fm.pos = categories.pos;
      if (categories.difficulty !== undefined) fm.difficulty = categories.difficulty;
      if (categories.topic !== undefined) fm.topic = categories.topic;
      if (categories.memory_stage !== undefined) fm.memory_stage = categories.memory_stage;
      if (categories.mastery !== undefined) fm.mastery = categories.mastery;

      const tags = fm.tags || [];
      const categoryTags = ["CET4", "CET6", "考研", "雅思托福"];
      categoryTags.forEach((tag) => {
        const idx = tags.indexOf(tag);
        if (idx >= 0) tags.splice(idx, 1);
      });
      if (categories.difficulty && categoryTags.includes(categories.difficulty)) {
        tags.push(categories.difficulty);
      }
      fm.tags = tags;
    });

    if (categories.difficulty) {
      const targetFolder = this.settings.difficultyFolders[categories.difficulty];
      if (targetFolder) {
        const currentPath = file.path;
        const fileName = file.name;
        const newPath = `${targetFolder}/${fileName}`;
        if (!currentPath.startsWith(targetFolder)) {
          try {
            if (!this.app.vault.getAbstractFileByPath(targetFolder)) {
              await this.app.vault.createFolder(targetFolder).catch(() => {});
            }
            await this.app.fileManager.renameFile(file, newPath);
          } catch (e) {
            new Notice(`移动文件失败: ${e.message}`);
          }
        }
      }
    }
    new Notice("分类已更新");
  }
}

class AddWordModal extends Modal {
  constructor(app, plugin, prefillWord) {
    super(app);
    this.plugin = plugin;
    this.prefillWord = prefillWord;
  }

  async onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h2", { text: "添加新单词" });

    const form = contentEl.createEl("div", { cls: "word-manager-form" });

    const wordField = this.createField(form, "单词 *", "text", this.prefillWord || "");
    const phoneticUkField = this.createField(form, "英式音标", "text", "");
    const phoneticUsField = this.createField(form, "美式音标", "text", "");

    const posContainer = form.createEl("div", { cls: "form-field" });
    posContainer.createEl("label", { text: "词性（可多选）" });
    const posCheckboxes = posContainer.createEl("div", { cls: "checkbox-group" });
    const posValues = [];
    Object.entries(this.plugin.settings.posLabels).forEach(([key, label]) => {
      const labelEl = posCheckboxes.createEl("label", { cls: "checkbox-label" });
      const cb = labelEl.createEl("input", { type: "checkbox", value: key });
      labelEl.createSpan({ text: ` ${label}` });
      cb.addEventListener("change", () => {
        const idx = posValues.indexOf(key);
        if (cb.checked && idx === -1) posValues.push(key);
        else if (!cb.checked && idx >= 0) posValues.splice(idx, 1);
      });
    });

    const difficultyField = this.createSelect(form, "难度", this.plugin.settings.categories.difficulty, this.plugin.settings.defaultDifficulty);

    const topicContainer = form.createEl("div", { cls: "form-field" });
    topicContainer.createEl("label", { text: "主题（可多选）" });
    const topicCheckboxes = topicContainer.createEl("div", { cls: "checkbox-group" });
    const topicValues = [];
    this.plugin.settings.categories.topic.forEach((t) => {
      const labelEl = topicCheckboxes.createEl("label", { cls: "checkbox-label" });
      const cb = labelEl.createEl("input", { type: "checkbox", value: t });
      labelEl.createSpan({ text: ` ${t}` });
      cb.addEventListener("change", () => {
        const idx = topicValues.indexOf(t);
        if (cb.checked && idx === -1) topicValues.push(t);
        else if (!cb.checked && idx >= 0) topicValues.splice(idx, 1);
      });
    });

    const meaningField = this.createTextarea(form, "释义 *", "");
    const exampleEnField = this.createTextarea(form, "英文例句", "");
    const exampleZhField = this.createTextarea(form, "中文翻译", "");
    const memoryField = this.createTextarea(form, "记忆方法", "");
    const synonymsField = this.createField(form, "同义词（分号分隔）", "text", "");
    const antonymsField = this.createField(form, "反义词（分号分隔）", "text", "");
    const derivativesField = this.createField(form, "派生词（分号分隔）", "text", "");

    const autoFillStatus = form.createEl("div", { cls: "autofill-status" });

    if (this.prefillWord) {
      autoFillStatus.createEl("span", { text: "正在自动获取翻译...", cls: "autofill-loading" });
      
      try {
        const translation = await this.plugin.fetchWordTranslation(this.prefillWord);
        
        if (translation) {
          if (translation.phonetic_uk) phoneticUkField.value = translation.phonetic_uk;
          if (translation.phonetic_us) phoneticUsField.value = translation.phonetic_us;
          if (translation.meaning) meaningField.value = translation.meaning;
          if (translation.example_en) exampleEnField.value = translation.example_en;
          if (translation.example_zh) exampleZhField.value = translation.example_zh;
          if (translation.synonyms.length > 0) synonymsField.value = translation.synonyms.join("; ");
          if (translation.derivatives.length > 0) derivativesField.value = translation.derivatives.join("; ");
          
          if (translation.pos.length > 0) {
            translation.pos.forEach((posKey) => {
              const cb = posCheckboxes.querySelector(`input[value="${posKey}"]`);
              if (cb) {
                cb.checked = true;
                if (!posValues.includes(posKey)) posValues.push(posKey);
              }
            });
          }
          
          autoFillStatus.empty();
          autoFillStatus.createEl("span", { text: "✓ 已自动填充翻译数据", cls: "autofill-success" });
        } else {
          autoFillStatus.empty();
          autoFillStatus.createEl("span", { text: "⚠ 无法获取自动翻译，请手动输入", cls: "autofill-warning" });
        }
      } catch (error) {
        autoFillStatus.empty();
        autoFillStatus.createEl("span", { text: "⚠ 获取翻译失败，请手动输入", cls: "autofill-warning" });
      }
    }

    const btnContainer = form.createEl("div", { cls: "form-buttons" });
    const submitBtn = btnContainer.createEl("button", { text: "添加", cls: "mod-cta" });
    const cancelBtn = btnContainer.createEl("button", { text: "取消" });

    submitBtn.addEventListener("click", async () => {
      const word = wordField.value.trim();
      const meaning = meaningField.value.trim();
      if (!word || !meaning) {
        new Notice("单词和释义为必填项");
        return;
      }

      const definitions = [];
      if (meaning) {
        const def = {
          pos: posValues.length > 0 ? posValues[0] : "",
          meaning,
          examples: []
        };
        if (exampleEnField.value.trim()) {
          def.examples.push({
            en: exampleEnField.value.trim(),
            zh: exampleZhField.value.trim()
          });
        }
        definitions.push(def);
      }

      await this.plugin.createWordNote({
        word,
        phonetic_uk: phoneticUkField.value.trim(),
        phonetic_us: phoneticUsField.value.trim(),
        pos: posValues,
        difficulty: difficultyField.value,
        topic: topicValues,
        definitions,
        memory_method: memoryField.value.trim(),
        synonyms: synonymsField.value.trim() ? synonymsField.value.trim().split(";").map((s) => s.trim()).filter((s) => s) : [],
        antonyms: antonymsField.value.trim() ? antonymsField.value.trim().split(";").map((a) => a.trim()).filter((a) => a) : [],
        derivatives: derivativesField.value.trim() ? derivativesField.value.trim().split(";").map((d) => d.trim()).filter((d) => d) : []
      });

      this.close();
    });

    cancelBtn.addEventListener("click", () => this.close());
  }

  createField(container, label, type, value) {
    const field = container.createEl("div", { cls: "form-field" });
    field.createEl("label", { text: label });
    const input = field.createEl("input", { type, value, cls: "form-input" });
    return input;
  }

  createTextarea(container, label, value) {
    const field = container.createEl("div", { cls: "form-field" });
    field.createEl("label", { text: label });
    const textarea = field.createEl("textarea", { value, cls: "form-textarea" });
    return textarea;
  }

  createSelect(container, label, options, selected) {
    const field = container.createEl("div", { cls: "form-field" });
    field.createEl("label", { text: label });
    const select = field.createEl("select", { cls: "form-select" });
    options.forEach((opt) => {
      const option = select.createEl("option", { text: opt, value: opt });
      if (opt === selected) option.selected = true;
    });
    return select;
  }

  onClose() {
    this.contentEl.empty();
  }
}

class ImportCSVModal extends Modal {
  constructor(app, plugin) {
    super(app);
    this.plugin = plugin;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h2", { text: "批量导入CSV单词" });

    const info = contentEl.createEl("div", { cls: "import-info" });
    info.createEl("p", { text: "CSV格式要求：" });
    const formatList = info.createEl("ul");
    formatList.createEl("li", { text: "必填列：word, meaning" });
    formatList.createEl("li", { text: "可选列：phonetic_uk, phonetic_us, pos, difficulty, topic, example_en, example_zh, memory, synonyms, antonyms, derivatives" });
    formatList.createEl("li", { text: "多值字段用分号(;)分隔，如 pos: verb;adjective" });
    formatList.createEl("li", { text: "CSV文件请放置在 08-资源/导入 文件夹中" });

    const exampleCode = contentEl.createEl("pre", { cls: "csv-example" });
    exampleCode.createEl("code", {
      text: "word,phonetic_us,pos,meaning,difficulty,topic,example_en,example_zh,memory,synonyms,antonyms,derivatives\nabandon,/əˈbændən/,verb,放弃；抛弃,CET4,社会,He abandoned his plan.,他放弃了计划。,a+band+on=在带上→放弃,desert;forsake,keep;retain,abandonment;abandoned"
    });

    const difficultyField = this.createSelect(contentEl, "默认难度（CSV中无difficulty列时使用）", this.plugin.settings.categories.difficulty, this.plugin.settings.defaultDifficulty);

    contentEl.createEl("hr");

    const section1 = contentEl.createEl("div");
    section1.createEl("h3", { text: "方式一：从文件导入" });
    const importFolder = this.plugin.settings.importFolder;
    const filesInFolder = this.app.vault.getFiles().filter((f) => f.path.startsWith(importFolder) && f.extension === "csv");

    if (filesInFolder.length > 0) {
      const fileList = section1.createEl("div", { cls: "file-list" });
      filesInFolder.forEach((f) => {
        const fileItem = fileList.createEl("div", { cls: "file-item" });
        fileItem.createEl("span", { text: f.name });
        const importBtn = fileItem.createEl("button", { text: "导入", cls: "mod-cta" });
        importBtn.addEventListener("click", async () => {
          const content = await this.app.vault.read(f);
          const result = await this.plugin.importFromCSV(content, difficultyField.value);
          new Notice(`导入完成：成功 ${result.success} 个，失败 ${result.failed} 个`);
          if (result.errors.length > 0) {
            console.warn("导入错误:", result.errors);
          }
          this.close();
        });
      });
    } else {
      section1.createEl("p", { text: `暂无CSV文件，请将文件放入 ${importFolder} 文件夹`, cls: "empty-hint" });
    }

    contentEl.createEl("hr");

    const section2 = contentEl.createEl("div");
    section2.createEl("h3", { text: "方式二：粘贴CSV内容" });
    const csvInput = section2.createEl("textarea", {
      cls: "csv-input",
      attr: { placeholder: "粘贴CSV内容到这里...", rows: "8" }
    });

    const btnContainer = contentEl.createEl("div", { cls: "form-buttons" });
    const importBtn = btnContainer.createEl("button", { text: "导入", cls: "mod-cta" });
    const cancelBtn = btnContainer.createEl("button", { text: "取消" });

    importBtn.addEventListener("click", async () => {
      const csvContent = csvInput.value.trim();
      if (!csvContent) {
        new Notice("请输入CSV内容");
        return;
      }
      const result = await this.plugin.importFromCSV(csvContent, difficultyField.value);
      new Notice(`导入完成：成功 ${result.success} 个，失败 ${result.failed} 个`);
      if (result.errors.length > 0) {
        console.warn("导入错误:", result.errors);
      }
      this.close();
    });

    cancelBtn.addEventListener("click", () => this.close());
  }

  createSelect(container, label, options, selected) {
    const field = container.createEl("div", { cls: "form-field" });
    field.createEl("label", { text: label });
    const select = field.createEl("select", { cls: "form-select" });
    options.forEach((opt) => {
      const option = select.createEl("option", { text: opt, value: opt });
      if (opt === selected) option.selected = true;
    });
    return select;
  }

  onClose() {
    this.contentEl.empty();
  }
}

class CategoryModal extends Modal {
  constructor(app, plugin, file) {
    super(app);
    this.plugin = plugin;
    this.file = file;
  }

  async onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h2", { text: "管理单词分类" });

    const cache = this.app.metadataCache.getFileCache(this.file);
    const fm = cache?.frontmatter || {};
    const currentPos = fm.pos || [];
    const currentDifficulty = fm.difficulty || "";
    const currentTopic = fm.topic || [];
    const currentMemoryStage = fm.memory_stage || "";
    const currentMastery = fm.mastery ?? 0;

    contentEl.createEl("h3", { text: "词性分类（可多选）" });
    const posContainer = contentEl.createEl("div", { cls: "checkbox-group" });
    const posValues = [...currentPos];
    Object.entries(this.plugin.settings.posLabels).forEach(([key, label]) => {
      const labelEl = posContainer.createEl("label", { cls: "checkbox-label" });
      const cb = labelEl.createEl("input", { type: "checkbox", value: key });
      if (currentPos.includes(key)) cb.checked = true;
      labelEl.createSpan({ text: ` ${label}` });
      cb.addEventListener("change", () => {
        const idx = posValues.indexOf(key);
        if (cb.checked && idx === -1) posValues.push(key);
        else if (!cb.checked && idx >= 0) posValues.splice(idx, 1);
      });
    });

    contentEl.createEl("h3", { text: "难度分级" });
    const difficultySelect = contentEl.createEl("select", { cls: "form-select" });
    this.plugin.settings.categories.difficulty.forEach((d) => {
      const opt = difficultySelect.createEl("option", { text: d, value: d });
      if (d === currentDifficulty) opt.selected = true;
    });

    contentEl.createEl("h3", { text: "主题分类（可多选）" });
    const topicContainer = contentEl.createEl("div", { cls: "checkbox-group" });
    const topicValues = [...currentTopic];
    this.plugin.settings.categories.topic.forEach((t) => {
      const labelEl = topicContainer.createEl("label", { cls: "checkbox-label" });
      const cb = labelEl.createEl("input", { type: "checkbox", value: t });
      if (currentTopic.includes(t)) cb.checked = true;
      labelEl.createSpan({ text: ` ${t}` });
      cb.addEventListener("change", () => {
        const idx = topicValues.indexOf(t);
        if (cb.checked && idx === -1) topicValues.push(t);
        else if (!cb.checked && idx >= 0) topicValues.splice(idx, 1);
      });
    });

    contentEl.createEl("h3", { text: "记忆阶段" });
    const memorySelect = contentEl.createEl("select", { cls: "form-select" });
    this.plugin.settings.categories.memory_stage.forEach((m) => {
      const opt = memorySelect.createEl("option", { text: m, value: m });
      if (m === currentMemoryStage) opt.selected = true;
    });

    contentEl.createEl("h3", { text: "掌握度" });
    const masteryContainer = contentEl.createEl("div", { cls: "mastery-container" });
    const masteryDisplay = masteryContainer.createEl("span", { text: `${currentMastery}`, cls: "mastery-value" });
    const masterySlider = masteryContainer.createEl("input", {
      type: "range",
      cls: "mastery-slider",
      attr: { min: "0", max: "5", value: String(currentMastery) }
    });
    masterySlider.addEventListener("input", () => {
      masteryDisplay.textContent = masterySlider.value;
    });

    const btnContainer = contentEl.createEl("div", { cls: "form-buttons" });
    const saveBtn = btnContainer.createEl("button", { text: "保存", cls: "mod-cta" });
    const cancelBtn = btnContainer.createEl("button", { text: "取消" });

    saveBtn.addEventListener("click", async () => {
      await this.plugin.updateWordCategories(this.file, {
        pos: posValues,
        difficulty: difficultySelect.value,
        topic: topicValues,
        memory_stage: memorySelect.value,
        mastery: parseInt(masterySlider.value)
      });
      this.close();
    });

    cancelBtn.addEventListener("click", () => this.close());
  }

  onClose() {
    this.contentEl.empty();
  }
}

class MasteryModal extends Modal {
  constructor(app, plugin, file) {
    super(app);
    this.plugin = plugin;
    this.file = file;
  }

  async onOpen() {
    const { contentEl } = this;
    contentEl.empty();

    const cache = this.app.metadataCache.getFileCache(this.file);
    const fm = cache?.frontmatter || {};
    const word = fm.word || this.file.basename;
    const currentMastery = fm.mastery ?? 0;
    const currentStage = fm.memory_stage || "新词";

    contentEl.createEl("h2", { text: `掌握度：${word}` });
    contentEl.createEl("p", { text: `当前状态：${currentStage}（掌握度 ${currentMastery}/5）` });

    const masteryContainer = contentEl.createEl("div", { cls: "mastery-container" });
    const masteryDisplay = masteryContainer.createEl("span", { text: `${currentMastery}`, cls: "mastery-value" });
    const masterySlider = masteryContainer.createEl("input", {
      type: "range",
      cls: "mastery-slider",
      attr: { min: "0", max: "5", value: String(currentMastery) }
    });
    masterySlider.addEventListener("input", () => {
      masteryDisplay.textContent = masterySlider.value;
    });

    const quickBtns = contentEl.createEl("div", { cls: "quick-mastery-buttons" });
    const stages = [
      { label: "新词", mastery: 0, stage: "新词" },
      { label: "初学", mastery: 1, stage: "新词" },
      { label: "学习中", mastery: 2, stage: "学习中" },
      { label: "较熟悉", mastery: 3, stage: "学习中" },
      { label: "熟悉", mastery: 4, stage: "已掌握" },
      { label: "已掌握", mastery: 5, stage: "已掌握" }
    ];
    stages.forEach((s) => {
      const btn = quickBtns.createEl("button", { text: `${s.label} (${s.mastery})` });
      btn.addEventListener("click", async () => {
        await this.plugin.updateWordCategories(this.file, {
          mastery: s.mastery,
          memory_stage: s.stage
        });
        this.close();
      });
    });

    const btnContainer = contentEl.createEl("div", { cls: "form-buttons" });
    const saveBtn = btnContainer.createEl("button", { text: "保存", cls: "mod-cta" });
    const cancelBtn = btnContainer.createEl("button", { text: "取消" });

    saveBtn.addEventListener("click", async () => {
      const newMastery = parseInt(masterySlider.value);
      const newStage = newMastery >= 4 ? "已掌握" : newMastery >= 2 ? "学习中" : "新词";
      await this.plugin.updateWordCategories(this.file, {
        mastery: newMastery,
        memory_stage: newStage
      });
      this.close();
    });

    cancelBtn.addEventListener("click", () => this.close());
  }

  onClose() {
    this.contentEl.empty();
  }
}

class CategoryBrowserModal extends Modal {
  constructor(app, plugin) {
    super(app);
    this.plugin = plugin;
  }

  async onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h2", { text: "分类浏览器" });

    const wordFiles = this.app.vault.getFiles().filter(
      (f) => f.path.startsWith(this.plugin.settings.wordFolder) && f.extension === "md"
    );

    const stats = { pos: {}, difficulty: {}, topic: {}, memory_stage: {} };
    const wordData = [];

    for (const file of wordFiles) {
      const cache = this.app.metadataCache.getFileCache(file);
      const fm = cache?.frontmatter || {};
      const word = fm.word || file.basename;
      wordData.push({ file, fm, word });
      (fm.pos || []).forEach((p) => { stats.pos[p] = (stats.pos[p] || 0) + 1; });
      if (fm.difficulty) stats.difficulty[fm.difficulty] = (stats.difficulty[fm.difficulty] || 0) + 1;
      (fm.topic || []).forEach((t) => { stats.topic[t] = (stats.topic[t] || 0) + 1; });
      if (fm.memory_stage) stats.memory_stage[fm.memory_stage] = (stats.memory_stage[fm.memory_stage] || 0) + 1;
    }

    contentEl.createEl("p", { text: `共 ${wordFiles.length} 个单词`, cls: "stats-summary" });

    const tabs = contentEl.createEl("div", { cls: "category-tabs" });
    const tabContent = contentEl.createEl("div", { cls: "category-tab-content" });

    const categories = [
      { key: "difficulty", label: "难度分级", data: stats.difficulty },
      { key: "pos", label: "词性分类", data: stats.pos },
      { key: "topic", label: "主题分类", data: stats.topic },
      { key: "memory_stage", label: "记忆阶段", data: stats.memory_stage }
    ];

    let activeTab = "difficulty";

    const renderTab = (key) => {
      tabContent.empty();
      const cat = categories.find((c) => c.key === key);
      if (!cat) return;

      const entries = Object.entries(cat.data).sort((a, b) => b[1] - a[1]);
      if (entries.length === 0) {
        tabContent.createEl("p", { text: "暂无数据", cls: "empty-hint" });
        return;
      }

      entries.forEach(([name, count]) => {
        const item = tabContent.createEl("div", { cls: "category-item" });
        const info = item.createEl("div", { cls: "category-item-info" });
        info.createEl("span", { text: name, cls: "category-name" });
        info.createEl("span", { text: `${count} 个单词`, cls: "category-count" });

        const bar = item.createEl("div", { cls: "category-bar" });
        const fill = bar.createEl("div", { cls: "category-bar-fill" });
        const maxCount = entries[0][1];
        fill.style.width = `${(count / maxCount) * 100}%`;

        const wordList = item.createEl("div", { cls: "category-word-list", attr: { style: "display:none" } });
        const matchingWords = wordData.filter((w) => {
          if (key === "pos") return (w.fm.pos || []).includes(name);
          if (key === "topic") return (w.fm.topic || []).includes(name);
          if (key === "difficulty") return w.fm.difficulty === name;
          if (key === "memory_stage") return w.fm.memory_stage === name;
          return false;
        });

        matchingWords.slice(0, 20).forEach((w) => {
          const wordLink = wordList.createEl("div", { cls: "word-link-item" });
          wordLink.createEl("a", {
            text: w.word,
            cls: "internal-link",
            attr: { "data-href": w.file.path, href: w.file.path }
          });
          wordLink.addEventListener("click", (e) => {
            e.preventDefault();
            this.app.workspace.openLinkText(w.file.path, "");
          });
        });

        if (matchingWords.length > 20) {
          wordList.createEl("p", { text: `...还有 ${matchingWords.length - 20} 个单词`, cls: "more-hint" });
        }

        const toggleBtn = item.createEl("button", { text: "展开", cls: "toggle-btn" });
        toggleBtn.addEventListener("click", () => {
          const isVisible = wordList.style.display !== "none";
          wordList.style.display = isVisible ? "none" : "block";
          toggleBtn.textContent = isVisible ? "展开" : "收起";
        });
      });
    };

    categories.forEach((cat) => {
      const tab = tabs.createEl("button", {
        text: cat.label,
        cls: cat.key === activeTab ? "category-tab active" : "category-tab"
      });
      tab.addEventListener("click", () => {
        tabs.querySelectorAll("button").forEach((b) => b.removeClass("active"));
        tab.addClass("active");
        activeTab = cat.key;
        renderTab(cat.key);
      });
    });

    renderTab(activeTab);
  }

  onClose() {
    this.contentEl.empty();
  }
}

class BatchCategoryModal extends Modal {
  constructor(app, plugin) {
    super(app);
    this.plugin = plugin;
  }

  async onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h2", { text: "批量分类管理" });

    const wordFiles = this.app.vault.getFiles().filter(
      (f) => f.path.startsWith(this.plugin.settings.wordFolder) && f.extension === "md"
    );

    contentEl.createEl("p", { text: `单词库中共有 ${wordFiles.length} 个单词`, cls: "stats-summary" });

    const filterSection = contentEl.createEl("div", { cls: "batch-filter" });
    filterSection.createEl("h3", { text: "筛选条件" });

    const filterPosContainer = filterSection.createEl("div", { cls: "form-field" });
    filterPosContainer.createEl("label", { text: "按词性筛选" });
    const filterPosSelect = filterPosContainer.createEl("select", { cls: "form-select" });
    filterPosSelect.createEl("option", { text: "全部", value: "" });
    this.plugin.settings.categories.pos.forEach((p) => {
      filterPosSelect.createEl("option", { text: this.plugin.settings.posLabels[p] || p, value: p });
    });

    const filterDifficultyContainer = filterSection.createEl("div", { cls: "form-field" });
    filterDifficultyContainer.createEl("label", { text: "按难度筛选" });
    const filterDifficultySelect = filterDifficultyContainer.createEl("select", { cls: "form-select" });
    filterDifficultySelect.createEl("option", { text: "全部", value: "" });
    this.plugin.settings.categories.difficulty.forEach((d) => {
      filterDifficultySelect.createEl("option", { text: d, value: d });
    });

    const filterTopicContainer = filterSection.createEl("div", { cls: "form-field" });
    filterTopicContainer.createEl("label", { text: "按主题筛选" });
    const filterTopicSelect = filterTopicContainer.createEl("select", { cls: "form-select" });
    filterTopicSelect.createEl("option", { text: "全部", value: "" });
    this.plugin.settings.categories.topic.forEach((t) => {
      filterTopicSelect.createEl("option", { text: t, value: t });
    });

    const filterStageContainer = filterSection.createEl("div", { cls: "form-field" });
    filterStageContainer.createEl("label", { text: "按记忆阶段筛选" });
    const filterStageSelect = filterStageContainer.createEl("select", { cls: "form-select" });
    filterStageSelect.createEl("option", { text: "全部", value: "" });
    this.plugin.settings.categories.memory_stage.forEach((m) => {
      filterStageSelect.createEl("option", { text: m, value: m });
    });

    const wordListContainer = contentEl.createEl("div", { cls: "batch-word-list" });
    const selectedFiles = new Set();

    const renderWordList = () => {
      wordListContainer.empty();
      selectedFiles.clear();

      const filteredFiles = wordFiles.filter((f) => {
        const cache = this.app.metadataCache.getFileCache(f);
        const fm = cache?.frontmatter || {};
        if (filterPosSelect.value && !(fm.pos || []).includes(filterPosSelect.value)) return false;
        if (filterDifficultySelect.value && fm.difficulty !== filterDifficultySelect.value) return false;
        if (filterTopicSelect.value && !(fm.topic || []).includes(filterTopicSelect.value)) return false;
        if (filterStageSelect.value && fm.memory_stage !== filterStageSelect.value) return false;
        return true;
      });

      const selectAllBtn = wordListContainer.createEl("button", { text: "全选/取消全选", cls: "select-all-btn" });
      const countDisplay = wordListContainer.createEl("span", { text: "已选 0 个", cls: "selected-count" });

      const listEl = wordListContainer.createEl("div", { cls: "batch-list" });
      filteredFiles.forEach((f) => {
        const cache = this.app.metadataCache.getFileCache(f);
        const fm = cache?.frontmatter || {};
        const word = fm.word || f.basename;

        const item = listEl.createEl("div", { cls: "batch-item" });
        const cb = item.createEl("input", { type: "checkbox", value: f.path });
        item.createEl("span", { text: word, cls: "batch-word-name" });
        const tags = (fm.pos || []).concat(fm.difficulty ? [fm.difficulty] : []).concat(fm.topic || []);
        item.createEl("span", { text: tags.join(", "), cls: "batch-word-tags" });

        cb.addEventListener("change", () => {
          if (cb.checked) selectedFiles.add(f);
          else selectedFiles.delete(f);
          countDisplay.textContent = `已选 ${selectedFiles.size} 个`;
        });
      });

      selectAllBtn.addEventListener("click", () => {
        const checkboxes = listEl.querySelectorAll("input[type=checkbox]");
        const allChecked = Array.from(checkboxes).every((c) => c.checked);
        checkboxes.forEach((c) => {
          c.checked = !allChecked;
          const file = wordFiles.find((f) => f.path === c.value);
          if (file) {
            if (!allChecked) selectedFiles.add(file);
            else selectedFiles.delete(file);
          }
        });
        countDisplay.textContent = `已选 ${selectedFiles.size} 个`;
      });
    };

    [filterPosSelect, filterDifficultySelect, filterTopicSelect, filterStageSelect].forEach((sel) => {
      sel.addEventListener("change", renderWordList);
    });

    renderWordList();

    const actionSection = contentEl.createEl("div", { cls: "batch-action" });
    actionSection.createEl("h3", { text: "批量操作" });

    const actionPosContainer = actionSection.createEl("div", { cls: "form-field" });
    actionPosContainer.createEl("label", { text: "添加词性" });
    const actionPosCheckboxes = actionPosContainer.createEl("div", { cls: "checkbox-group" });
    const actionPosValues = [];
    Object.entries(this.plugin.settings.posLabels).forEach(([key, label]) => {
      const labelEl = actionPosCheckboxes.createEl("label", { cls: "checkbox-label" });
      const cb = labelEl.createEl("input", { type: "checkbox", value: key });
      labelEl.createSpan({ text: ` ${label}` });
      cb.addEventListener("change", () => {
        const idx = actionPosValues.indexOf(key);
        if (cb.checked && idx === -1) actionPosValues.push(key);
        else if (!cb.checked && idx >= 0) actionPosValues.splice(idx, 1);
      });
    });

    const actionDifficultyContainer = actionSection.createEl("div", { cls: "form-field" });
    actionDifficultyContainer.createEl("label", { text: "设置难度" });
    const actionDifficultySelect = actionDifficultyContainer.createEl("select", { cls: "form-select" });
    actionDifficultySelect.createEl("option", { text: "不修改", value: "" });
    this.plugin.settings.categories.difficulty.forEach((d) => {
      actionDifficultySelect.createEl("option", { text: d, value: d });
    });

    const actionTopicContainer = actionSection.createEl("div", { cls: "form-field" });
    actionTopicContainer.createEl("label", { text: "添加主题" });
    const actionTopicCheckboxes = actionTopicContainer.createEl("div", { cls: "checkbox-group" });
    const actionTopicValues = [];
    this.plugin.settings.categories.topic.forEach((t) => {
      const labelEl = actionTopicCheckboxes.createEl("label", { cls: "checkbox-label" });
      const cb = labelEl.createEl("input", { type: "checkbox", value: t });
      labelEl.createSpan({ text: ` ${t}` });
      cb.addEventListener("change", () => {
        const idx = actionTopicValues.indexOf(t);
        if (cb.checked && idx === -1) actionTopicValues.push(t);
        else if (!cb.checked && idx >= 0) actionTopicValues.splice(idx, 1);
      });
    });

    const actionStageContainer = actionSection.createEl("div", { cls: "form-field" });
    actionStageContainer.createEl("label", { text: "设置记忆阶段" });
    const actionStageSelect = actionStageContainer.createEl("select", { cls: "form-select" });
    actionStageSelect.createEl("option", { text: "不修改", value: "" });
    this.plugin.settings.categories.memory_stage.forEach((m) => {
      actionStageSelect.createEl("option", { text: m, value: m });
    });

    const btnContainer = contentEl.createEl("div", { cls: "form-buttons" });
    const applyBtn = btnContainer.createEl("button", { text: "应用批量修改", cls: "mod-cta" });
    const cancelBtn = btnContainer.createEl("button", { text: "取消" });

    applyBtn.addEventListener("click", async () => {
      if (selectedFiles.size === 0) {
        new Notice("请先选择要修改的单词");
        return;
      }

      let processed = 0;
      for (const file of selectedFiles) {
        try {
          await this.app.fileManager.processFrontMatter(file, (fm) => {
            if (actionPosValues.length > 0) {
              const currentPos = fm.pos || [];
              actionPosValues.forEach((p) => {
                if (!currentPos.includes(p)) currentPos.push(p);
              });
              fm.pos = currentPos;
            }
            if (actionDifficultySelect.value) {
              fm.difficulty = actionDifficultySelect.value;
              const tags = fm.tags || [];
              const categoryTags = ["CET4", "CET6", "考研", "雅思托福"];
              categoryTags.forEach((tag) => {
                const idx = tags.indexOf(tag);
                if (idx >= 0) tags.splice(idx, 1);
              });
              if (categoryTags.includes(actionDifficultySelect.value)) {
                tags.push(actionDifficultySelect.value);
              }
              fm.tags = tags;
            }
            if (actionTopicValues.length > 0) {
              const currentTopic = fm.topic || [];
              actionTopicValues.forEach((t) => {
                if (!currentTopic.includes(t)) currentTopic.push(t);
              });
              fm.topic = currentTopic;
            }
            if (actionStageSelect.value) {
              fm.memory_stage = actionStageSelect.value;
            }
          });
          processed++;
        } catch (e) {
          console.warn(`批量分类失败: ${file.path}`, e);
        }
      }

      if (actionDifficultySelect.value) {
        const targetFolder = this.plugin.settings.difficultyFolders[actionDifficultySelect.value];
        if (targetFolder) {
          for (const file of selectedFiles) {
            const fileName = file.name;
            const newPath = `${targetFolder}/${fileName}`;
            if (!file.path.startsWith(targetFolder)) {
              try {
                if (!this.app.vault.getAbstractFileByPath(targetFolder)) {
                  await this.app.vault.createFolder(targetFolder).catch(() => {});
                }
                await this.app.fileManager.renameFile(file, newPath);
              } catch (e) {
                console.warn(`移动文件失败: ${file.path}`, e);
              }
            }
          }
        }
      }

      new Notice(`已更新 ${processed} 个单词的分类`);
      this.close();
    });

    cancelBtn.addEventListener("click", () => this.close());
  }

  onClose() {
    this.contentEl.empty();
  }
}

class QuickCategoryModal extends Modal {
  constructor(app, plugin, file) {
    super(app);
    this.plugin = plugin;
    this.file = file;
  }

  async onOpen() {
    const { contentEl } = this;
    contentEl.empty();

    const cache = this.app.metadataCache.getFileCache(this.file);
    const fm = cache?.frontmatter || {};
    const word = fm.word || this.file.basename;

    contentEl.createEl("h2", { text: `快捷分类：${word}` });

    const currentCategories = contentEl.createEl("div", { cls: "current-categories" });
    currentCategories.createEl("h3", { text: "当前分类" });

    const posTags = (fm.pos || []).map((p) => this.plugin.settings.posLabels[p] || p);
    const diffTag = fm.difficulty || "未设置";
    const topicTags = (fm.topic || []);
    const stageTag = fm.memory_stage || "未设置";

    currentCategories.createEl("div", { cls: "current-tags", text: `词性: ${posTags.join(", ") || "无"}` });
    currentCategories.createEl("div", { cls: "current-tags", text: `难度: ${diffTag}` });
    currentCategories.createEl("div", { cls: "current-tags", text: `主题: ${topicTags.join(", ") || "无"}` });
    currentCategories.createEl("div", { cls: "current-tags", text: `阶段: ${stageTag}` });

    contentEl.createEl("h3", { text: "快速添加分类" });

    const quickActions = contentEl.createEl("div", { cls: "quick-actions" });

    this.plugin.settings.categories.pos.forEach((p) => {
      const isActive = (fm.pos || []).includes(p);
      const btn = quickActions.createEl("button", {
        text: this.plugin.settings.posLabels[p] || p,
        cls: isActive ? "quick-action-btn active" : "quick-action-btn"
      });
      btn.addEventListener("click", async () => {
        await this.app.fileManager.processFrontMatter(this.file, (fm2) => {
          const pos = fm2.pos || [];
          const idx = pos.indexOf(p);
          if (idx >= 0) pos.splice(idx, 1);
          else pos.push(p);
          fm2.pos = pos;
        });
        new Notice(`${isActive ? "移除" : "添加"}词性: ${this.plugin.settings.posLabels[p] || p}`);
        this.onOpen();
      });
    });

    contentEl.createEl("h3", { text: "难度" });
    const diffActions = contentEl.createEl("div", { cls: "quick-actions" });
    this.plugin.settings.categories.difficulty.forEach((d) => {
      const isActive = fm.difficulty === d;
      const btn = diffActions.createEl("button", {
        text: d,
        cls: isActive ? "quick-action-btn active" : "quick-action-btn"
      });
      btn.addEventListener("click", async () => {
        await this.plugin.updateWordCategories(this.file, { difficulty: d });
        this.onOpen();
      });
    });

    contentEl.createEl("h3", { text: "主题" });
    const topicActions = contentEl.createEl("div", { cls: "quick-actions" });
    this.plugin.settings.categories.topic.forEach((t) => {
      const isActive = (fm.topic || []).includes(t);
      const btn = topicActions.createEl("button", {
        text: t,
        cls: isActive ? "quick-action-btn active" : "quick-action-btn"
      });
      btn.addEventListener("click", async () => {
        await this.app.fileManager.processFrontMatter(this.file, (fm2) => {
          const topics = fm2.topic || [];
          const idx = topics.indexOf(t);
          if (idx >= 0) topics.splice(idx, 1);
          else topics.push(t);
          fm2.topic = topics;
        });
        new Notice(`${isActive ? "移除" : "添加"}主题: ${t}`);
        this.onOpen();
      });
    });

    contentEl.createEl("h3", { text: "记忆阶段" });
    const stageActions = contentEl.createEl("div", { cls: "quick-actions" });
    this.plugin.settings.categories.memory_stage.forEach((m) => {
      const isActive = fm.memory_stage === m;
      const btn = stageActions.createEl("button", {
        text: m,
        cls: isActive ? "quick-action-btn active" : "quick-action-btn"
      });
      btn.addEventListener("click", async () => {
        await this.plugin.updateWordCategories(this.file, { memory_stage: m });
        this.onOpen();
      });
    });

    const btnContainer = contentEl.createEl("div", { cls: "form-buttons" });
    const closeBtn = btnContainer.createEl("button", { text: "关闭" });
    closeBtn.addEventListener("click", () => this.close());
  }

  onClose() {
    this.contentEl.empty();
  }
}

class WordManagerSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Word Manager 设置" });

    new Setting(containerEl)
      .setName("单词库文件夹")
      .setDesc("单词笔记存放的根目录")
      .addText((text) =>
        text.setValue(this.plugin.settings.wordFolder).onChange(async (value) => {
          this.plugin.settings.wordFolder = value;
          await this.plugin.saveSettings();
        })
      );

    new Setting(containerEl)
      .setName("默认难度")
      .setDesc("新添加单词的默认难度级别")
      .addDropdown((dd) =>
        dd.addOptions(Object.fromEntries(this.plugin.settings.categories.difficulty.map((d) => [d, d])))
          .setValue(this.plugin.settings.defaultDifficulty)
          .onChange(async (value) => {
            this.plugin.settings.defaultDifficulty = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("CSV导入文件夹")
      .setDesc("CSV文件存放的目录")
      .addText((text) =>
        text.setValue(this.plugin.settings.importFolder).onChange(async (value) => {
          this.plugin.settings.importFolder = value;
          await this.plugin.saveSettings();
        })
      );

    containerEl.createEl("h3", { text: "难度级别对应文件夹" });
    Object.entries(this.plugin.settings.difficultyFolders).forEach(([key, value]) => {
      new Setting(containerEl)
        .setName(key)
        .addText((text) =>
          text.setValue(value).onChange(async (val) => {
            this.plugin.settings.difficultyFolders[key] = val;
            await this.plugin.saveSettings();
          })
        );
    });
  }
}

module.exports = WordManagerPlugin;