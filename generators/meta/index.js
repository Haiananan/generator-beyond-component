var Generator = require("yeoman-generator");
const path = require("path");

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.option("withSchema");
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "组件名称？(首字母大写，例如MetaComponent)",
        default: "MetaComponent",
        store: true,
      },
      {
        type: "input",
        name: "menuPath",
        message: "下级路径？（以components/为根目录）",
        default: "/",
      },
    ]);

    const targetModelPath = this.destinationPath(
      path.join(
        `src/components/${this.answers.menuPath}/${this.answers.name}/model.ts`
      )
    );
    if (this.fs.exists(targetModelPath)) {
      this.answersDuplicate = await this.prompt([
        {
          type: "list",
          name: "duplicate",
          message: "😕该组件已存在，请选择操作：",
          choices: [
            "无视该组件，继续执行",
            "根据组件Schema生成Model和Validation，并视情况改造service.ts",
            "终止执行并退出",
          ],
        },
      ]);
      if (this.answersDuplicate.duplicate === "终止执行") process.exit(0);
      if (
        this.answersDuplicate.duplicate ===
        "根据组件Schema生成Model和Validation，并视情况改造service.ts"
      )
        return;
    }

    this.answersC = await this.prompt([
      {
        type: "list",
        name: "component",
        message: "组件操作：",
        choices: ["不生成", "仅生成", "生成并注册"],
        default: "生成并注册",
      },
    ]);

    if (this.answersC.component !== "不生成")
      this.answersD = await this.prompt([
        {
          type: "list",
          name: "dbName",
          message: "连接的数据库？",
          choices: ["dbMain", "dbHaianhezi"],
        },
      ]);

    this.answersElse = await this.prompt([
      {
        type: "list",
        name: "route",
        message: "路由操作：",
        default: "生成并注册",
        choices: ["不生成", "仅生成", "生成并注册"],
      },
      {
        type: "list",
        name: "test",
        message: "测试操作：",
        default: "不生成",
        choices: ["不生成", "仅生成", "生成并注册"],
      },
    ]);
  }

  writing() {
    if (
      this?.answersDuplicate?.duplicate ===
      "根据组件Schema生成Model和Validation，并视情况改造service.ts"
    ) {
      this._writingModelValidationDuplicateWithSchema();
      return;
    }

    if (this.answersC.component === "仅生成") this._writingCRUD();
    if (this.answersC.component === "生成并注册") {
      this._writingCRUD();
      this._regComponent();
    }
    if (this.answersElse.route === "仅生成") this._writingRoute();
    if (this.answersElse.route === "生成并注册") {
      this._writingRoute();
      this._regRoute();
    }
    if (this.answersElse.test === "仅生成") this._writingTest();
    if (this.answersElse.test === "生成并注册") {
      this._writingTest();
      this._regTest();
    }
  }
  conflicts() {
    this.log("❗️注册操作需要修改文件，请检查：（回车以展开选项）");
  }
  end() {
    this.log("🎉 Powered by @beyond-cli");
  }

  _writingModelValidationDuplicateWithSchema() {
    const codeService = require("./service.js");
    const { name, menuPath } = this.answers;

    const targetModelPath = this.destinationPath(
      path.join(`src/components/${menuPath}/${name}/model.ts`)
    );
    const {
      modelString,
      validationString,
      validationStringWithoutRequired,
      unique,
    } = codeService(targetModelPath);

    this.fs.write(
      targetModelPath,
      this.fs
        .read(targetModelPath)
        .replace(
          "readonly _id: Schema.Types.ObjectId",
          `readonly _id: Schema.Types.ObjectId\n${modelString}`
        )
    );

    const targetValidationPath = path.join(targetModelPath, "../validation.ts");
    this.fs.write(
      targetValidationPath,
      this.fs
        .read(targetValidationPath)
        .replace(
          "const validateCreateSchema = Joi.object({})",
          `const validateCreateSchema = Joi.object({\n${validationString}\n})`
        )
        .replace(
          "const validateUpdateSchema = Joi.object({})",
          `const validateUpdateSchema = Joi.object({\n${validationStringWithoutRequired}\n})`
        )
    );

    if (unique) {
      const targetServicePath = path.join(targetModelPath, "../service.ts");
      this.fs.write(
        targetServicePath,
        this.fs
          .read(targetServicePath)
          .replace("Validation.create)", `Validation.create, '${unique}')`)
          .replace("Validation.update)", `Validation.update, '${unique}')`)
      );
    }
  }
  _writingValidation() {
    const codeService = require("./service");
    const { name, menuPath } = this.answers;
    const targetModelPath = this.destinationPath(
      path.join(`src/components/${menuPath}/${name}/model.ts`)
    );
    const { validationString, validationStringWithoutRequired } =
      codeService(targetModelPath);
  }

  _writingRoute() {
    const { name, menuPath } = this.answers;

    this.fs.copyTpl(
      this.templatePath("router.txt"),
      this.destinationPath(`src/routes/${name}Router.ts`),
      {
        name,
        path: this._formatPath(menuPath)
          ? `${this._formatPath(menuPath)}/`
          : "",
      }
    );
  }

  _regRoute() {
    let indexOld = this.fs.read(this.destinationPath("src/routes/index.ts"));

    let insertImport = `import ${this.answers.name}Router from './${this.answers.name}Router'`;

    this.fs.write(
      this.destinationPath("src/routes/index.ts"),
      insertImport +
        "\n" +
        indexOld.replace(
          "express.Router()",
          `express.Router()\n\n  app.use('${this.answers.name}', ${this.answers.name}Router)`
        )
    );
  }

  _writingCRUD() {
    const pathMeta = this._getPath(this.answers.menuPath);

    const names = ["index", "model", "service", "validation"];
    names.forEach((name) => {
      this.fs.copyTpl(
        this.templatePath(`Meta/${name}.txt`),
        this.destinationPath(
          `src/components/${this.answers.menuPath}/${this.answers.name}/${name}.ts`
        ),
        {
          name: this.answers.name,
          path: pathMeta,
          dbName: this.answersD.dbName,
        }
      );
    });
  }

  _regComponent() {
    let indexOld = this.fs.read(
      this.destinationPath("src/components/index.ts")
    );

    let insertImport = `import * as ${this.answers.name}Component from './${
      this._formatPath(this.answers.menuPath) + "/"
    }${this.answers.name}'`;

    this.fs.write(
      this.destinationPath("src/components/index.ts"),
      insertImport +
        "\n" +
        indexOld.replace("{", `{ ${this.answers.name}Component,`)
    );
  }

  _writingTest() {
    const pathMeta = this._getPath(this.answers.menuPath);
    this.fs.copyTpl(
      this.templatePath(`MetaTest.txt`),
      this.destinationPath(`test/${this.answers.name}Test.js`),
      {
        name: this.answers.name,
        path: pathMeta ? `${pathMeta}/` : "",
      }
    );
  }

  _regTest() {
    const indexOld = this.fs.read(this.destinationPath("test/index.js"));
    const insertImport = `require('./${this.answers.name}Test')`;
    this.fs.write(
      this.destinationPath("test/index.js"),
      indexOld + "\n" + insertImport
    );
  }

  _formatPath(path) {
    return path
      .split("/")
      .filter((d) => d.trim())
      .join("/");
  }

  _getPath(menuPath) {
    let childPathNum = 0;
    if (menuPath && !menuPath.includes("/")) childPathNum = 1;
    if (menuPath && menuPath.includes("/"))
      childPathNum = menuPath.split("/").filter((p) => p.trim()).length;
    const pathMeta = "".padStart(3 * childPathNum, "../");
    return pathMeta;
  }

  _subBetween(str, start, end) {
    if (typeof str !== "string") {
      return "";
    }
    if (typeof start !== "string" || typeof end !== "string") {
      return "";
    }
    const startIndex = str.indexOf(start);
    const endIndex = str.indexOf(end);
    if (startIndex === -1 || endIndex === -1) {
      return "";
    }
    return str.substring(startIndex + start.length, endIndex);
  }
};
