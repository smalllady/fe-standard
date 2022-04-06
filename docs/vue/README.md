# Vue.js 组件编码规范

<p align="center">
  <img src="/vue.jpeg" width="50%"/>
</p>



## 目标

本规范提供了一种统一的编码规范来编写 [Vue.js](http://vuejs.org/) 代码。这使得代码具有如下的特性：

* 其它开发者或是团队成员更容易阅读和理解。
* IDEs 更容易理解代码，从而提供高亮、格式化等辅助功能
* 更容易使用现有的工具
* 更容易实现缓存以及代码包的分拆

本指南为 [De Voorhoede](https://github.com/voorhoede) 参考 [RiotJS 编码规范](https://github.com/voorhoede/riotjs-style-guide) 而写。

<!-- * [使用 `*.vue` 扩展名](#使用-vue-后缀作为扩展名) -->
<!-- * [为你的项目添加徽章标识](#为你的项目添加徽章标识) -->

## 基于模块开发

始终基于模块的方式来构建你的 app，每一个子模块只做一件事情。

Vue.js 的设计初衷就是帮助开发者更好的开发界面模块。一个模块是应用程序中独立的一个部分。

### 怎么做？

每一个 Vue 组件（等同于模块）[首先]((https://addyosmani.com/first/))必须专注于解决一个[单一的问题](http://en.wikipedia.org/wiki/Single_responsibility_principle)，*独立的*、*可复用的*、*微小的* 和 *可测试的*。

如果你的组件做了太多的事或是变得臃肿，请将其拆分成更小的组件并保持单一的原则。一般来说，尽量保证每一个文件的代码行数不要超过 100 行。也请保证组件可独立的运行。比较好的做法是增加一个单独的 demo 示例。



## Vue 组件命名

组件的命名需遵从以下原则：

* **有意义的**: 不过于具体，也不过于抽象
* **简短**: 2 到 3 个单词
* **具有可读性**: 以便于沟通交流

同时还需要注意：

* 必须符合**自定义元素规范**: [使用连字符](https://www.w3.org/TR/custom-elements/#concepts)分隔单词，切勿使用保留字。
* **`app-` 前缀作为命名空间**: 如果非常通用的话可使用一个单词来命名，这样可以方便于其它项目里复用。

### 为什么？

* 组件是通过组件名来调用的。所以组件名必须简短、富有含义并且具有可读性。

### 如何做？

```html
<!-- 推荐 -->
<app-header></app-header>
<user-list></user-list>
<range-slider></range-slider>

<!-- 避免 -->
<btn-group></btn-group> <!-- 虽然简短但是可读性差. 使用 `button-group` 替代 -->
<ui-slider></ui-slider> <!-- ui 前缀太过于宽泛，在这里意义不明确 -->
<slider></slider> <!-- 与自定义元素规范不兼容 -->
```



## 组件表达式简单化

Vue.js 的表达式是 100% 的 Javascript 表达式。这使得其功能性很强大，但也带来潜在的复杂性。因此，你应该尽量**保持表达式的简单化**。

### 为什么？

* 复杂的行内表达式难以阅读。
* 行内表达式是不能够通用的，这可能会导致重复编码的问题。
* IDE 基本上不能识别行内表达式语法，所以使用行内表达式 IDE 不能提供自动补全和语法校验功能。

### 怎么做？

如果你发现写了太多复杂并难以阅读的行内表达式，那么可以使用 method 或是 computed 属性来替代其功能。

```html
<!-- 推荐 -->
<template>
  <h1>
    {{ `${year}-${month}` }}
  </h1>
</template>
<script type="text/javascript">
  export default {
    computed: {
      month() {
        return this.twoDigits((new Date()).getUTCMonth() + 1);
      },
      year() {
        return (new Date()).getUTCFullYear();
      }
    },
    methods: {
      twoDigits(num) {
        return ('0' + num).slice(-2);
      }
    },
  };
</script>

<!-- 避免 -->
<template>
  <h1>
    {{ `${(new Date()).getUTCFullYear()}-${('0' + ((new Date()).getUTCMonth()+1)).slice(-2)}` }}
  </h1>
</template>
```



### 组件 props 原子化

虽然 Vue.js 支持传递复杂的 JavaScript 对象通过 props 属性，但是你应该尽可能的使用原始类型的数据。尽量只使用 [JavaScript 原始类型](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)（字符串、数字、布尔值）和函数。尽量避免复杂的对象。

### 为什么？

* 使得组件 API 清晰直观。
* 只使用原始类型和函数作为 props 使得组件的 API 更接近于 HTML(5) 原生元素。
* 其它开发者更好的理解每一个 prop 的含义、作用。
* 传递过于复杂的对象使得我们不能够清楚的知道哪些属性或方法被自定义组件使用，这使得代码难以重构和维护。

### 怎么做？

组件的每一个属性单独使用一个 props，并且使用函数或是原始类型的值。

```html
<!-- 推荐 -->
<range-slider
  :values="[10, 20]"
  :min="0"
  :max="100"
  :step="5"
  @on-slide="updateInputs"
  @on-end="updateResults">
</range-slider>

<!-- 避免 -->
<range-slider :config="complexConfigObject"></range-slider>
```



## 验证组件的 props

在 Vue.js 中，组件的 props 即 API，一个稳定并可预测的 API 会使得你的组件更容易被其他开发者使用。

组件 props 通过自定义标签的属性来传递。属性的值可以是 Vue.js 字符串(`:attr="value"` 或 `v-bind:attr="value"`)或是不传。你需要保证组件的 props 能应对不同的情况。

### 为什么？

验证组件 props 可以保证你的组件永远是可用的（防御性编程）。即使其他开发者并未按照你预想的方法使用时也不会出错。

### 怎么做？

* 提供默认值。
* 使用 `type` 属性[校验类型](http://vuejs.org/v2/guide/components.html#Prop-Validation)。
* 使用 props 之前先检查该 prop 是否存在。

```html
<template>
  <input type="range" v-model="value" :max="max" :min="min">
</template>
<script type="text/javascript">
  export default {
    props: {
      max: {
        type: Number, // 这里添加了数字类型的校验
        default() { return 10; },
      },
      min: {
        type: Number,
        default() { return 0; },
      },
      value: {
        type: Number,
        default() { return 4; },
      },
    },
  };
</script>
```



## 将 `this` 赋值给 `component` 变量

在 Vue.js 组件上下文中，`this`指向了组件实例。因此当你切换到了不同的上下文时，要确保 `this` 指向一个可用的 `component` 变量。

换句话说，如果你正在使用 **ES6** 的话，就不要再编写 `var self = this;` 这样的代码了，您可以安全地使用 Vue 组件。

### 为什么？

* 使用 **ES6**，就不再需要将 `this` 保存到一个变量中了。
* 一般来说，当你使用箭头函数时，会保留 `this` 的作用域。（译者注：箭头函数没有它自己的 this 值，箭头函数内的 this 值继承自外围作用域。）
* 如果你没有使用 **ES6**，当然也就不会使用 `箭头函数` 啦，那你必须将 “this” 保存到到某个变量中。这是唯一的例外。

### 怎么做？

```html
<script type="text/javascript">
export default {
  methods: {
    hello() {
      return 'hello';
    },
    printHello() {
      console.log(this.hello());
    },
  },
};
</script>

<!-- 避免 -->
<script type="text/javascript">
export default {
  methods: {
    hello() {
      return 'hello';
    },
    printHello() {
      const self = this; // 没有必要
      console.log(self.hello());
    },
  },
};
</script>
```



## 组件结构化

按照一定的结构组织，使得组件便于理解。

### 为什么？

* 导出一个清晰、组织有序的组件，使得代码易于阅读和理解。同时也便于标准化。
* 按首字母排序 properties、data、computed、watches 和 methods 使得这些对象内的属性便于查找。
* 合理组织，使得组件易于阅读。（name; extends; props, data 和 computed; components; watch 和 methods; lifecycle methods 等）。
* 使用 `name` 属性。借助于 [vue devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en) 可以让你更方便的测试。
* 合理的 CSS 结构，如 [BEM](https://medium.com/tldr-tech/bem-blocks-elements-and-modifiers-6b3b0af9e3ea#.bhnomd7gw) 或 [rscss](https://github.com/rstacruz/rscss) - [详情？](#使用组件名作为样式作用域空间)。
* 使用单文件 .vue 文件格式来组件代码。

### 怎么做？

组件结构化

```html
<template lang="html">
  <div class="Ranger__Wrapper">
    <!-- ... -->
  </div>
</template>

<script type="text/javascript">
  export default {
    // 不要忘记了 name 属性
    name: 'RangeSlider',
    // 使用组件 mixins 共享通用功能
    mixins: [],
    // 组成新的组件
    extends: {},
    // 组件属性、变量
    props: {
      bar: {}, // 按字母顺序
      foo: {},
      fooBar: {},
    },
    // 变量
    data() {},
    computed: {},
    // 使用其它组件
    components: {},
    // 方法
    watch: {},
    methods: {},
    // 生命周期函数
    beforeCreate() {},
    mounted() {},
  };
</script>

<style scoped>
  .Ranger__Wrapper { /* ... */ }
</style>
```



## 组件事件命名

Vue.js 提供的处理函数和表达式都是绑定在 ViewModel 上的，组件的每一个事件都应该按照一个好的命名规范来，这样可以避免不少的开发问题，具体可见如下 **为什么**。

### 为什么？

* 开发者可以随意给事件命名，即使是原生事件的名字，这样会带来迷惑性。
* 过于宽松的事件命名可能与 [DOM 模板不兼容](https://vuejs.org/v2/guide/components.html#DOM-Template-Parsing-Caveats)。

### 怎么做？

* 事件名也使用连字符命名。
* 一个事件的名字对应组件外的一组意义操作，如：upload-success、upload-error 以及 dropzone-upload-success、dropzone-upload-error （如果需要前缀的话）。
* 事件命名应该以动词（如 client-api-load） 或是 名词（如 drive-upload-success）结尾。（[出处](https://github.com/GoogleWebComponents/style-guide#events)）




## 避免 this.$parent

Vue.js 支持组件嵌套，并且子组件可访问父组件的上下文。访问组件之外的上下文违反了[基于模块开发](#基于模块开发)的[第一原则](https://addyosmani.com/first/)。因此你应该尽量避免使用 **`this.$parent`**。

### 为什么？

* 组件必须相互保持独立，Vue 组件也是。如果组件需要访问其父层的上下文就违反了该原则。
* 如果一个组件需要访问其父组件的上下文，那么该组件将不能在其它上下文中复用。

### 怎么做？

* 通过 props 将值传递给子组件。
* 通过 props 传递回调函数给子组件来达到调用父组件方法的目的。
* 通过在子组件触发事件来通知父组件。



## 谨慎使用 this.$refs

Vue.js 支持通过 `ref` 属性来访问其它组件和 HTML 元素。并通过 `this.$refs` 可以得到组件或 HTML 元素的上下文。在大多数情况下，通过 `this.$refs`来访问其它组件的上下文是可以避免的。在使用的的时候你需要注意避免调用了不恰当的组件 API，所以应该尽量避免使用 `this.$refs`。

### 为什么？

* 组件必须是保持独立的，如果一个组件的 API 不能够提供所需的功能，那么这个组件在设计、实现上是有问题的。
* 组件的属性和事件必须足够的给大多数的组件使用。

### 怎么做？

* 提供良好的组件 API。
* 总是关注于组件本身的目的。
* 拒绝定制代码。如果你在一个通用的组件内部编写特定需求的代码，那么代表这个组件的 API 不够通用，或者你可能需要一个新的组件来应对该需求。
* 检查所有的 props 是否有缺失的，如果有提一个 issue 或是完善这个组件。
* 检查所有的事件。子组件向父组件通信一般是通过事件来实现的，但是大多数的开发者更多的关注于 props 从忽视了这点。
* **Props向下传递，事件向上传递！**。以此为目标升级你的组件，提供良好的 API 和 独立性。
* 当遇到 props 和 events 难以实现的功能时，通过 `this.$refs`来实现。
* 当需要操作 DOM 无法通过指令来做的时候可使用 `this.$ref` 而不是 `JQuery`、`document.getElement*`、`document.queryElement`。


```html
<!-- 推荐，并未使用 this.$refs -->
<range :max="max"
  :min="min"
  @current-value="currentValue"
  :step="1"></range>
```

```html
<!-- 使用 this.$refs 的适用情况-->
<modal ref="basicModal">
  <h4>Basic Modal</h4>
  <button class="primary" @click="$refs.basicModal.hide()">Close</button>
</modal>
<button @click="$refs.basicModal.open()">Open modal</button>

<!-- Modal component -->
<template>
  <div v-show="active">
    <!-- ... -->
  </div>
</template>

<script>
  export default {
    // ...
    data() {
      return {
        active: false,
      };
    },
    methods: {
      open() {
        this.active = true;
      },
      hide() {
        this.active = false;
      },
    },
    // ...
  };
</script>

```

```html
<!-- 如果可通过 emited 来做则避免通过 this.$refs 直接访问 -->
<template>
  <range :max="max"
    :min="min"
    ref="range"
    :step="1"></range>
</template>

<script>
  export default {
    // ...
    methods: {
      getRangeCurrentValue() {
        return this.$refs.range.currentValue;
      },
    },
    // ...
  };
</script>
```



## 使用组件名作为样式作用域空间

Vue.js 的组件是自定义元素，这非常适合用来作为样式的根作用域空间。可以将组件名作为 CSS 类的命名空间。

### 为什么？

* 给样式加上作用域空间可以避免组件样式影响外部的样式。
* 保持模块名、目录名、样式根作用域名一样，可以很好的将其关联起来，便于开发者理解。

### 怎么做？

使用组件名作为样式命名的前缀，可基于 BEM 或 OOCSS 范式。同时给 style 标签加上 scoped 属性。加上 scoped 属性编译后会给组件的 class 自动加上唯一的前缀从而避免样式的冲突。

```html
<style scoped>
  /* 推荐 */
  .MyExample { }
  .MyExample li { }
  .MyExample__item { }

  /* 避免 */
  .My-Example { } /* 没有用组件名或模块名限制作用域, 不符合 BEM 规范 */
</style>
```



## 提供组件 API 文档

使用 Vue.js 组件的过程中会创建 Vue 组件实例，这个实例是通过自定义属性配置的。为了便于其他开发者使用该组件，对于这些自定义属性即组件API应该在 `README.md` 文件中进行说明。

## 为什么？

* 良好的文档可以让开发者比较容易的对组件有一个整体的认识，而不用去阅读组件的源码，也更方便开发者使用。
* 组件配置属性即组件的 API，对于组件的用户来说他们更感兴趣的是 API 而不是实现原理。
* 正式的文档会告诉开发者组件 API 变更以及向后的兼容性情况。
* `README.md` 是标准的我们应该首先阅读的文档文件。代码托管网站（GitHub、Bitbucket、Gitlab 等）会默认在仓库中展示该文件作为仓库的介绍。

### 怎么做？

在模块目录中添加 `README.md` 文件：

```
range-slider/
├── range-slider.vue
├── range-slider.less
└── README.md
```

在 README 文件中说明模块的功能以及使用场景。对于 vue 组件来说，比较有用的描述是组件的自定义属性即 API 的描述介绍。

# Range slider

## 功能

range slider 组件可通过拖动的方式来设置一个给定范围内的数值。

该模块使用 [noUiSlider](http://refreshless.com/nouislider/) 来实现跨浏览器和 touch 功能的支持。

## 如何使用

`<range-slider>` 支持如下的自定义属性：


| attribute | type | description
| --- | --- | ---
| `min` | Number | 可拖动的最小值.
| `max` | Number | 可拖动的最大值.
| `values` | Number[] *optional* | 包含最大值和最小值的数组.  如. `values="[10, 20]"`. Defaults to `[opts.min, opts.max]`.
| `step` | Number *optional* | 增加减小的数值单位，默认为 1.
| `on-slide` | Function *optional* | 用户拖动开始按钮或者结束按钮时的回调函数，函数接受 `(values, HANDLE)` 格式的参数。 如： `on-slide={ updateInputs }`,  `component.updateInputs = (values, HANDLE) => { const value = values[HANDLE]; }`.
| `on-end` | Function *optional* | 当用户停止拖动时触发的回调函数，函数接受 `(values, HANDLE)` 格式的参数。


如需要自定义 slider 的样式可参考 [noUiSlider 文档]((http://refreshless.com/nouislider/more/#section-styling))




## 提供组件 demo

添加 `index.html` 文件作为组件的 demo 示例，并提供不同配置情况的效果，说明组件是如何使用的。

### 为什么？

* demo 可以说明组件是独立可使用的。
* demo 可以让开发者预览组件的功能效果。
* demo 可以展示组件各种配置参数下的功能。



## 对组件文件进行代码校验

代码校验可以保持代码的统一性以及追踪语法错误。.vue 文件可以通过使用 `eslint-plugin-html`插件来校验代码。你可以通过 `vue-cli` 来开始你的项目，`vue-cli` 默认会开启代码校验功能。

### 为什么？

* 保证所有的开发者使用同样的编码规范。
* 更早的感知到语法错误。

### 怎么做？

为了校验工具能够校验 `*.vue`文件，你需要将代码编写在 `<script>` 标签中，并使[组件表达式简单化](#保持组件表达式简单化)，因为校验工具无法理解行内表达式，配置校验工具可以访问全局变量 `vue` 和组件的 `props`。

使用eslint+prettier规范与检查代码的方法
-  eslintrc配置
> 基本规范是依托于 vue 官方的eslint-plugin-vue。并使用 Prettier 格式化代码，使样式与规则保持一致。

.eslintrc.js 配置如下：

```js
{
root: true, // 当前配置为根配置，将不再从上级文件夹查找配置
parserOptions: {
 parser: 'babel-eslint', // 采用 babel-eslint 作为语法解析器
 sourceType: 'module',  // 指定来源的类型，有两种script或module
 ecmaVersion: 6, //指定ECMAScript支持的版本，6为ES6
},
env: {
 browser: true, // 设置为所需检查的代码是在浏览器环境运行的
 es6: true // 设置所需检查代码为 es6 语法书写
},
extends: ['plugin:vue/recommended', 'eslint:recommended'],// 扩展使用 vue 检查规则和eslint推荐规则
 rules: {
  'vue/attribute-hyphenation': 0, // 忽略属性连字
  'vue/max-attributes-per-line':[2, { singleline: 10, multiline: { max: 1, allowFirstLine: false } }], // 每行最大属性
  'vue/singleline-html-element-content-newline': 'off', // 单行html元素内容在新的一行
  'vue/multiline-html-element-content-newline': 'off', // 多行html元素内容在新的一行
  'vue/html-closing-bracket-newline': 'off', // html右括号在新的一行
  'vue/no-v-html': 'off', // 不使用v-html
  'vue/html-self-closing': 0, // 忽略html标签自闭合
  'accessor-pairs': 2, // 应同时设置setter和getter
  'arrow-spacing': [2, { before: true, after: true }], // 箭头间距
  'vue/require-default-prop': 0, // 不检查默认属性
  'vue/require-prop-types': 0, // 不检查默认类型
  'block-spacing': [2, 'always'], // 块间距
  'brace-style': [2, '1tbs', { allowSingleLine: true }], // 大括号样式允许单行
  'camelcase': [2, { properties: 'always' }], //为属性强制执行驼峰命名
  'comma-dangle': [2, 'never'], // 逗号不使用悬挂
  'comma-spacing': [2, { before: false, after: true }], // 逗号间距
  'comma-style': [2, 'last'], //（默认）与数组元素，对象属性或变量声明在同一行之后和同一行需要逗号
  'constructor-super': 2,
  'consistent-this': [2, 'that'], //强制this别名为that
  'curly': [2, 'multi-line'], // 当一个块只包含一条语句时，不允许省略花括号。
  'dot-location': [2, 'property'], //成员表达式中的点应与属性部分位于同一行
  'eol-last': 2, // 强制文件以换行符结束（LF）
  'eqeqeq': ['error', 'always', { null: 'ignore' }], // 强制使用全等
  'generator-star-spacing': [2, { before: true, after: true }], // 生成器中'*'两侧都要有间距
  'global-require': 1, // 所有调用require()都位于模块的顶层
  'indent': [2, 2, { SwitchCase: 2 }], //缩进风格
  'key-spacing': [2, { beforeColon: false, afterColon: true }], // 强制在对象字面量属性中的键和值之间保持一致的间距
  'keyword-spacing': [2, { before: true, after: true }], // 关键字如if/function等的间距
  'new-cap': [2, { newIsCap: true, capIsNew: false }],// 允许在没有new操作符的情况下调用大写启动的函数;（默认）要求new使用大写启动函数调用所有操作符
  'new-parens': 2, // JavaScript通过new关键字调用函数时允许省略括号
  'no-array-constructor': 1, // 不允许使用Array构造函数。除非要指定生成数组的长度
  'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 只有开发环境可以使用console
  'no-class-assign': 2, // 不允许修改类声明的变量
  'no-const-assign': 2, // 不能修改使用const关键字声明的变量
  'no-control-regex': 0, // 不允许正则表达式中的控制字符
  'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 只有开发环境可以使用debugger
  'no-delete-var': 2, // 不允许在变量上使用delete操作符
  'no-dupe-args': 2, // 不允许在函数声明或表达式中使用重复的参数名称
  'no-dupe-class-members': 2, // 不允许在类成员中使用重复的参数名称
  'no-dupe-keys': 2, // 不允许在对象文字中使用重复键
  'no-duplicate-case': 2, // 不允许在switch语句的case子句中使用重复的测试表达式
  'no-empty-character-class': 2, // 不允许在正则表达式中使用空字符类
  'no-empty-pattern': 2, // 不允许空块语句
  'no-eval': 2, // 不允许使用eval
  'no-ex-assign': 2, // 不允许在catch子句中重新分配例外
  'no-extend-native': 2, // 不允许直接修改内建对象的原型
  'no-extra-boolean-cast': 2, // 禁止不必要的布尔转换
  'no-extra-parens': [2, 'functions'], // 仅在函数表达式附近禁止不必要的括号
  'no-fallthrough': 2, //消除一个案件无意中掉到另一个案件
  'no-floating-decimal': 2, //消除浮点小数点，并在数值有小数点但在其之前或之后缺少数字时发出警告
  'no-func-assign': 2, // 允许重新分配function声明
  'no-implied-eval': 2, // 消除隐含eval()
  'no-inner-declarations': [2, 'functions'], // 不允许function嵌套块中的声明
  'no-invalid-regexp': 2, //不允许RegExp构造函数中的无效正则表达式字符串
  'no-irregular-whitespace': 2, //捕获无效的空格
  'no-iterator': 2, //消除阴影变量声明
  'no-label-var': 2, //禁止创建与范围内的变量共享名称的标签
  'no-labels': [2, { allowLoop: false, allowSwitch: false }], // 消除 JavaScript 中使用带标签的语句
  'no-lone-blocks': 2, //消除脚本顶层或其他块中不必要的和可能混淆的块
  'no-mixed-spaces-and-tabs': 2, // 不允许使用混合空格和制表符进行缩进
  'no-multi-spaces': 2, // 禁止在逻辑表达式，条件表达式，声明，数组元素，对象属性，序列和函数参数周围使用多个空格
  'no-multi-str': 2, // 防止使用多行字符串
  'no-multiple-empty-lines': [2, { max: 1 }], // 最多一个空行
  'no-native-reassign': 2, // 不允许修改只读全局变量
  'no-new-object': 2, // 不允许使用Object构造函数
  'no-new-require': 2, // 消除new require表达的使用
  'no-new-symbol': 2, // 防止Symbol与new 同时使用的意外错误
  'no-new-wrappers': 2, // 杜绝使用String，Number以及Boolean与new操作
  'no-obj-calls': 2, // 不允许调用Math，JSON和Reflect对象作为功能
  'no-octal': 2, // 不允许使用八进制文字
  'no-octal-escape': 2, // 不允许字符串文字中的八进制转义序列
  'no-path-concat': 2, // 防止 Node.js 中的目录路径字符串连接无效
  'no-redeclare': 2, // 消除在同一范围内具有多个声明的变量
  'no-regex-spaces': 2, // 在正则表达式文字中不允许有多个空格
  'no-return-assign': [2, 'except-parens'], // 消除return陈述中的任务，除非用括号括起来
  'no-self-assign': 2, // 消除自我分配
  'no-self-compare': 2, // 禁止比较变量与自身
  'no-sequences': 2, // 禁止使用逗号运算符
  'no-sparse-arrays': 2, // 不允许稀疏数组文字
  'no-this-before-super': 2, // 在呼call前标记this/super关键字super()
  'no-throw-literal': 2, // 不允许抛出不可能是Error对象的文字和其他表达式
  'no-trailing-spaces': 2, // 不允许在行尾添加尾随空白
  'no-undef': 2, // 任何对未声明的变量的引用都会导致错误
  'no-undef-init': 2, // 消除初始化为undefined的变量声明
  'no-underscore-dangle': 2, // 标识符不能以_开头或结尾
  'no-unexpected-multiline': 2, // 不允许混淆多行表达式
  'no-unmodified-loop-condition': 2, // 查找循环条件内的引用，然后检查这些引用的变量是否在循环中被修改
  'no-unneeded-ternary': [2, { defaultAssignment: false }], // 不允许将条件表达式作为默认的分配模式
  'no-unreachable': 2, // 不允许可达代码return，throw，continue，和break语句后面还有语句。
  'no-unsafe-finally': 2, // 不允许return，throw，break，和continue里面的语句finally块
  'no-unused-vars': [2, { vars: 'all', args: 'after-used' }],
  // 消除未使用的变量，函数和函数的参数
  // vars: 'all' 检查所有变量的使用情况，包括全局范围内的变量。这是默认设置。 args: 'after-used' 只有最后一个参数必须使用。例如，这允许您为函数使用两个命名参数，并且只要您使用第二个参数，ESLint 就不会警告您第一个参数。这是默认设置。
  'no-useless-call': 2, // 标记使用情况，Function.prototype.call()并且Function.prototype.apply()可以用正常的函数调用来替代
  'no-useless-computed-key': 2, // 禁止不必要地使用计算属性键
  'no-useless-constructor': 2, // 在不改变类的工作方式的情况下安全地移除的类构造函数
  'no-useless-escape': 0, // 禁用不必要的转义字符
  'no-whitespace-before-property': 2, // 如果对象的属性位于同一行上，不允许围绕点或在开头括号之前留出空白
  'no-with': 2, //禁用with
  'no-var': 2, // 禁用var
  'one-var': [2, { initialized: 'never' }], // 强制将变量声明为每个函数（对于var）或块（对于let和const）范围一起声明或单独声明。 initialized: 'never' 每个作用域要求多个变量声明用于初始化变量
  'operator-linebreak': [2, 'after', { overrides: { '?': 'before', ':': 'before' } }], // 实施一致的换行
  'padded-blocks': [2, 'never'], // 在块内强制执行一致的空行填充
  'prefer-destructuring': ['error', { object: false, array: false }], // 此规则强制使用解构而不是通过成员表达式访问属性。
  'quotes': [2, 'single', { avoidEscape: true, allowTemplateLiterals: true }],// avoidEscape: true 允许字符串使用单引号或双引号，只要字符串包含必须以其他方式转义的引号 ;allowTemplateLiterals: true 允许字符串使用反引号
  'radix': 2, //parseInt必须指定第二个参数
  'semi': [2, 'never'], // 不使用分号
  'semi-spacing': [2, { before: false, after: true }], // 强制分号间隔
  'space-before-blocks': [2, 'always'], // 块必须至少有一个先前的空间
  'space-before-function-paren': [2, 'never'], // 在(参数后面不允许任何空格
  'space-in-parens': [2, 'never'], // 禁止或要求（或）左边的一个或多个空格
  'space-infix-ops': 2, // 强制二元运算符左右各有一个空格
  'space-unary-ops': [2, { words: true, nonwords: false }],// words: true 如：new，delete，typeof，void，yield 左右必须有空格 // nonwords: false 一元运算符，如：-，+，--，++，!，!!左右不能有空格
  'spaced-comment': [2, 'always', { markers: ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ','] }], // 注释开始后，此规则将强制间距的一致性//或/*
  'template-curly-spacing': [2, 'never'], // 不允许大括号内的空格
  'use-isnan': 2, //禁止比较时使用NaN，只能用isNaN()
  'valid-typeof': 2, //必须使用合法的typeof的值
  'wrap-iife': [2, 'any'], //立即执行函数表达式的小括号风格
  'yield-star-spacing': [2, 'both'], // 强制执行*周围 yield*表达式的间距，两侧都必须有空格
  'yoda': [2, 'never'],
  'prefer-const': 2, // 使用let关键字声明的变量，但在初始分配后从未重新分配变量，应改为const声明
  'object-curly-spacing': [2, 'always', { objectsInObjects: false }],// 不允许以对象元素开始和/或以对象元素结尾的对象的大括号内的间距
  'array-bracket-spacing': [2, 'never'] // 不允许数组括号内的空格
 }
}
```
- eslint 安装与配置

全局安装 eslint
```
npm install -g eslint
```
全局安装 Prettier

```
npm install -g prettier
```
vscode 扩展搜索 `eslint` 和 `prettier`,下载并安装。
<p align="center">
  <img src="/vs1.png"/>
  <img src="/vs2.png"/>
</p>

编辑器 setting.json 中加如下配置：
```json
/* 开启保存时自动格式化 */
"editor.formatOnSave": true,
 
/* eslint的配置 */
"eslint.enable": true,
"eslint.run": "onSave",
"eslint.options": {
  "extensions": [
   ".js",
   ".vue"
  ]
 },
 "editor.codeActionsOnSave": {
  "source.fixAll.eslint": true // 保存时自动修复
 },
 // 关闭 vscode 默认的检查工具
 "html.validate.scripts": false,
 "javascript.validate.enable": false,
 "eslint.alwaysShowStatus": true,
 "eslint.format.enable": true,
 "scss.lint.duplicateProperties": "error",
 "css.lint.duplicateProperties": "error",
 "less.lint.zeroUnits": "error",
 "eslint.validate": [
  "javascript",
  "javascriptreact",
  "vue-html",
  "vue",
  "html"
 ],
 
/* prettier的配置 */
 "prettier.printWidth": 120, // 超过最大值换行
 "prettier.tabWidth": 2, // 缩进字节数
 "prettier.useTabs": true, // 缩进使用tab
 "prettier.semi": false, // 句尾添加分号
 "prettier.singleQuote": true, // 使用单引号代替双引号
 "prettier.proseWrap": "preserve", // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
 "prettier.arrowParens": "avoid", // (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
 "prettier.bracketSpacing": true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
 "prettier.endOfLine": "auto", // 结尾是 \n \r \n\r auto
 "prettier.htmlWhitespaceSensitivity": "ignore",
 "prettier.ignorePath": ".prettierignore", // 不使用prettier格式化的文件填写在项目的.prettierignore文件中
 "prettier.requireConfig": false, // Require a "prettierconfig" to format prettier
 "prettier.trailingComma": "none", // 在对象或数组最后一个元素后面是否加逗号
 
/* 每种语言默认的格式化规则 */
 "[html]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
 },
 "[css]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
 },
 "[scss]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
 },
 "[javascript]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
 },
 "[vue]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
 },
 "[json]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
 },
```
使用 vuecli 创建项目时，不选择 lint 选项。

在项目开发依赖中，加入`@vue/cli-plugin-eslint`、`babel-eslint`、`eslint`、`eslint-plugin-vue`、`prettier`、`prettier-eslint` 依赖
在项目 `package.json` 内加入 `lint` 命令。

开发时，保存文件，即可按 `prettier` 规则格式化文件，并自动修复可修复的 issue，不能自动修复的，请根据提示，手动修复。

vscode 已设置保存时格式化，但有时并不会格式化文件。已保存的文件还存在报错的，请手动格式化，并修改相应问题后，再次保存。

提交代码前，运行 `npm run lint `代码风格检查，确认无误后再进行提交。


## 只在需要时创建组件

### 为什么？

Vue.js 是一个基于组件的框架。如果你不知道何时创建组件可能会导致以下问题：

* 如果组件太大, 可能很难重用和维护;
* 如果组件太小，你的项目就会（因为深层次的嵌套而）被淹没，也更难使组件间通信;

### 怎么做?

* 始终记住为你的项目需求构建你的组件，但是你也应该尝试想到它们能够从中脱颖而出（独立于项目之外）。如果它们能够在你项目之外工作，就像一个库那样，就会使得它们更加健壮和一致。
* 尽可能早地构建你的组件总是更好的，因为这样使得你可以在一个已经存在和稳定的组件上构建你的组件间通信（props & events）。

### 规则

* 首先，尽可能早地尝试构建出诸如模态框、提示框、工具条、菜单、头部等这些明显的（通用型）组件。总之，你知道的这些组件以后一定会在当前页面或者是全局范围内需要。
* 第二，在每一个新的开发项目中，对于一整个页面或者其中的一部分，在进行开发前先尝试思考一下。如果你认为它有一部分应该是一个组件，那么就创建它吧。
* 最后，如果你不确定，那就不要。避免那些“以后可能会有用”的组件污染你的项目。它们可能会永远的只是（静静地）待在那里，这一点也不聪明。注意，一旦你意识到应该这么做，最好是就把它打破，以避免与项目的其他部分构成兼容性和复杂性。

