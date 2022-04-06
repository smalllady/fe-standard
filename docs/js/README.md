## 编码规范
统一团队的编码规范，有助于代码的维护,目的是统一一些相对主观化的代码风格。
### 单行代码块
在单行代码块中使用空格

不推荐
```js
function foo () {return true}
 if (foo) {bar = 0}
```

推荐

```js
function foo () { return true }
if (foo) { bar = 0 }
```

### 大括号风格
在编程过程中，大括号风格与缩进风格紧密联系，用来描述大括号相对代码块位置的方法有很多。在 JavaScript 中，主要有三种风格，如下：

- One True Brace Style

```js
if (foo) {
  bar()
} else {
  baz()
}
```
- Stroustrup
```js
if (foo) {
  bar()
}
else {
  baz()
}
```
- Allman
```js
if (foo)
{
  bar()
}
else
{
  baz()
}
```
>我们团队约定使用 第一种： *One True Brace Style* 风格
### 变量命名
当命名变量时，主流分为驼峰式命名（constiableName）和下划线命名（constiable_name）两大阵营。
>团队约定使用驼峰式命名
### 拖尾逗号
在 ECMAScript5 里面，对象字面量中的拖尾逗号是合法的，但在 IE8（非 IE8 文档模式）下，当出现拖尾逗号，则会抛出错误。

拖尾逗号的例子：

```js
const foo = {
  name: 'foo',
  age: '22',
}
```
拖尾逗号的好处是，简化了对象和数组添加或删除元素，我们只需要修改新增的行即可，并不会增加差异化的代码行数。
>因为拖尾逗号有好也有不好，所以团队约定允许在最后一个元素或属性与闭括号 ] 或 } 在不同行时，可以（但不要求）使用拖尾逗号。当在同一行时，禁止使用拖尾逗号。

### 逗号空格
逗号前后的空格可以提高代码的可读性，团队约定在逗号后面使用空格，逗号前面不加空格。

不推荐
```js
const foo = 1,bar = 2
const foo = 1 , bar = 2
const foo = 1 ,bar = 2
```
推荐
```js
const foo = 1, bar = 2
```
### 逗号风格
逗号分隔列表时，在 JavaScript 中主要有两种逗号风格：
- 标准风格，逗号放置在当前行的末尾
- 逗号前置风格，逗号放置在下一行的开始位置
>团队约定使用标准风格

不推荐
```js
const foo = 1
,
bar = 2

const foo = 1
, bar = 2

const foo = ['name'
          , 'age']
```
推荐
```js
const foo = 1,
    bar = 2

const foo = ['name',
            'age']
```
### 计算属性的空格
> 团队约定在对象的计算属性内，禁止使用空格

不推荐
```js
obj['foo' ]
obj[ 'foo']
obj[ 'foo' ]
```
推荐
```js
obj['foo']
```
### 拖尾换行
在非空文件中，存在拖尾换行是一个常见的 UNIX 风格，它的好处是可以方便在串联和追加文件时不会打断 Shell 的提示。在日常的项目中，保留拖尾换行的好处是，可以减少版本控制时的代码冲突。

不推荐
```js
function func () {
  // do something
}
```

推荐
```js
function func () {
  // do something
}
  // 此处是新的一行
```
> 可以通过 .editorconfig 添加 EOL
### 函数调用
>为了避免语法错误，团队约定在函数调用时，禁止使用空格

不推荐
```js
fn ()
fn
()
```
推荐
```js
fn()
```
### 缩进
>代码保持一致的缩进,但缩进用两个空格，还是四个空格，是用 Tab 还是空格呢？这样的争论太多了，也得不出答案。结合一些优秀的开源项目，我们约定使用空格来缩进，而且缩进使用两个空格。我们可以通过配置 .editorconfig ，将 Tab 自动转换为空格。
### 对象字面量的键值缩进
>团队约定对象字面量的键和值之间不能存在空格，且要求对象字面量的冒号和值之间存在一个空格

不推荐
```js
const obj = { 'foo' : 'haha' }
```
推荐
```js
const obj = { 'foo': 'haha' }
```
### 构造函数首字母大写
在 JavaScript 中 new 操作符用来创建某个特定类型的对象的一个实例，该类型的对象是由一个构造函数表示的。由于构造函数只是常规函数，唯一区别是使用 new 来调用。
>所以我们团队约定构造函数的首字母要大小，以此来区分构造函数和普通函数。

不推荐
```js
const fooItem = new foo()
```

推荐
```js
const fooItem = new Foo()
```
### 构造函数的参数
在 JavaScript 中，通过 new 调用构造函数时，如果不带参数，可以省略后面的圆括号。但这样会造成与整体的代码风格不一致，所以团队约定使用圆括号

不推荐
```js
const person = new Person
```

推荐
```js
const person = new Person()
```
### 链式调用
链式调用如果放在同一行，往往会造成代码的可读性差，但有些时候，短的链式调用并不会影响美观。
>所以本规范约定一行最多只能有四个链式调用，超过就要求换行。
### 空行

>空白行对于分离代码逻辑有帮助，但过多的空行会占据屏幕的空间，影响可读性。团队约定最大连续空行数为 2

不推荐

```js
const a = 1



const b = 2
```
推荐
```js
const a = 1


const b = 2
```
### 链式赋值

链式赋值容易造成代码的可读性差，
>所以团队约定禁止使用链式赋值

不推荐
```js
const a = b = c = 1
```
推荐
```js
const a = 1
const b = 1
const c = 1
```
### 变量声明
JavaScript 允许在一个声明中，声明多个变量。
>团队约定在声明变量时，一个声明只能有一个变量

不推荐
```js
const a, b, c
```

推荐
```js
const a
const b
const c
```
### 代码块空格
一致性是任何风格指南的重要组成部分。虽然在哪里放置块的开括号纯属个人偏好，但在整个项目中应该保持一致。不一致的风格将会分散读者阅读代码的注意力。
>团队约定代码块前要添加空格

不推荐
```js
if (a){
  b()
}

function a (){}
```

推荐
```js
if (a) {
  b()
}

function a () {}
```
### 操作符的空格

>团队约定操作符前后都需要添加空格

不推荐
```js
const sum = 1+2
```

推荐
```js
const sum = 1 + 2
```
### 注释


#### 单行注释


> [强制] 必须独占一行。`//` 后跟一个空格，缩进与下一行被注释说明的代码一致。

#### 多行注释


> [建议] 避免使用 `/*...*/` 这样的多行注释。有多行注释内容时，使用多个单行注释。


#### 文档化注释


> [强制] 为了便于代码阅读和自文档化，以下内容必须包含以 `/**...*/` 形式的块注释中。


1. 文件
2. namespace
3. 类
4. 函数或方法
5. 类属性
6. 事件
7. 全局变量
8. 常量
9. AMD 模块


> [强制] 文档注释前必须空一行。


> [建议] 自文档化的文档说明 what，而不是 how。

#### 文件注释


> [强制] 文件顶部必须包含文件注释，用 `@file` 标识文件说明。


```javascript
/**
 * @file Describe the file
 */
```

> [建议] 文件注释中可以用 `@author` 标识开发者信息。


开发者信息能够体现开发人员对文件的贡献，并且能够让遇到问题或希望了解相关信息的人找到维护人。通常情况文件在被创建时标识的是创建者。随着项目的进展，越来越多的人加入，参与这个文件的开发，新的作者应该被加入 `@author` 标识。

`@author` 标识具有多人时，原则是按照 `责任` 进行排序。通常的说就是如果有问题，就是找第一个人应该比找第二个人有效。比如文件的创建者由于各种原因，模块移交给了其他人或其他团队，后来因为新增需求，其他人在新增代码时，添加 `@author` 标识应该把自己的名字添加在创建人的前面。

`@author` 中的名字不允许被删除。任何劳动成果都应该被尊重。

业务项目中，一个文件可能被多人频繁修改，并且每个人的维护时间都可能不会很长，不建议为文件增加 `@author` 标识。通过版本控制系统追踪变更，按业务逻辑单元确定模块的维护责任人，通过文档与wiki跟踪和查询，是更好的责任管理方式。

对于业务逻辑无关的技术型基础项目，特别是开源的公共项目，应使用 `@author` 标识。



```javascript
/**
 * @file Describe the file
 * @author author-name(mail-name@domain.com)
 *         author-name2(mail-name2@domain.com)
 */
```

#### 命名空间注释


> [建议] 命名空间使用 `@namespace` 标识。


```javascript
/**
 * @namespace
 */
var util = {};
```

#### 类注释


> [建议] 使用 `@class` 标记类或构造函数。


对于使用对象 `constructor` 属性来定义的构造函数，可以使用 `@constructor` 来标记。



```javascript
/**
 * 描述
 *
 * @class
 */
function Developer() {
    // constructor body
}
```

> [建议] 使用 `@extends` 标记类的继承信息。


```javascript
/**
 * 描述
 *
 * @class
 * @extends Developer
 */
function Fronteer() {
    Developer.call(this);
    // constructor body
}
util.inherits(Fronteer, Developer);
```

> [强制] 使用包装方式扩展类成员时， 必须通过 `@lends` 进行重新指向。


没有 `@lends` 标记将无法为该类生成包含扩展类成员的文档。



```javascript
/**
 * 类描述
 *
 * @class
 * @extends Developer
 */
function Fronteer() {
    Developer.call(this);
    // constructor body
}

util.extend(
    Fronteer.prototype,
    /** @lends Fronteer.prototype */{
        getLevel: function () {
            // TODO
        }
    }
);
```

> [强制] 类的属性或方法等成员信息不是 `public` 的，应使用 `@protected` 或 `@private` 标识可访问性。


生成的文档中将有可访问性的标记，避免用户直接使用非 `public` 的属性或方法。


```javascript
/**
 * 类描述
 *
 * @class
 * @extends Developer
 */
var Fronteer = function () {
    Developer.call(this);

    /**
     * 属性描述
     *
     * @type {string}
     * @private
     */
    this.level = 'T12';

    // constructor body
};
util.inherits(Fronteer, Developer);

/**
 * 方法描述
 *
 * @private
 * @return {string} 返回值描述
 */
Fronteer.prototype.getLevel = function () {
};
```


#### 函数/方法注释


> [强制] 函数/方法注释必须包含函数说明，有参数和返回值时必须使用注释标识。


当 `return` 关键字仅作退出函数/方法使用时，无须对返回值作注释标识。


> [强制] 参数和返回值注释必须包含类型信息，且不允许省略参数的说明。

> [建议] 当函数是内部函数，外部不可访问时，可以使用 `@inner` 标识。


```javascript
/**
 * 函数描述
 *
 * @param {string} p1 参数1的说明
 * @param {string} p2 参数2的说明，比较长
 *     那就换行了.
 * @param {number=} p3 参数3的说明（可选）
 * @return {Object} 返回值描述
 */
function foo(p1, p2, p3) {
    var p3 = p3 || 10;
    return {
        p1: p1,
        p2: p2,
        p3: p3
    };
}
```

> [强制] 对 Object 中各项的描述， 必须使用 `@param` 标识。


```javascript
/**
 * 函数描述
 *
 * @param {Object} option 参数描述
 * @param {string} option.url option项描述
 * @param {string=} option.method option项描述，可选参数
 */
function foo(option) {
    // TODO
}
```

> [建议] 重写父类方法时， 应当添加 `@override` 标识。如果重写的形参个数、类型、顺序和返回值类型均未发生变化，可省略 `@param`、`@return`，仅用 `@override` 标识，否则仍应作完整注释。


简而言之，当子类重写的方法能直接套用父类的方法注释时可省略对参数与返回值的注释。

#### 事件注释


> [强制] 必须使用 `@event` 标识事件，事件参数的标识与方法描述的参数标识相同。


```javascript
/**
 * 值变更时触发
 *
 * @event Select#change
 * @param {Object} e e描述
 * @param {string} e.before before描述
 * @param {string} e.after after描述
 */
this.fire(
    'change',
    {
        before: 'foo',
        after: 'bar'
    }
);
```

> [强制] 在会广播事件的函数前使用 `@fires` 标识广播的事件，在广播事件代码前使用 `@event` 标识事件。

> [建议] 对于事件对象的注释，使用 `@param` 标识，生成文档时可读性更好。


```javascript
/**
 * 点击处理
 *
 * @fires Select#change
 * @private
 */
Select.prototype.clickHandler = function () {

    /**
     * 值变更时触发
     *
     * @event Select#change
     * @param {Object} e e描述
     * @param {string} e.before before描述
     * @param {string} e.after after描述
     */
    this.fire(
        'change',
        {
            before: 'foo',
            after: 'bar'
        }
    );
};
```

#### 常量注释


> [强制] 常量必须使用 `@const` 标记，并包含说明和类型信息。


```javascript
/**
 * 常量说明
 *
 * @const
 * @type {string}
 */
var REQUEST_URL = 'myurl.do';
```

#### 复杂类型注释


> [建议] 对于类型未定义的复杂结构的注释，可以使用 `@typedef` 标识来定义。


```javascript
// `namespaceA~` 可以换成其它 namepaths 前缀，目的是为了生成文档中能显示 `@typedef` 定义的类型和链接。
/**
 * 服务器
 *
 * @typedef {Object} namespaceA~Server
 * @property {string} host 主机
 * @property {number} port 端口
 */

/**
 * 服务器列表
 *
 * @type {Array.<namespaceA~Server>}
 */
var servers = [
    {
        host: '1.2.3.4',
        port: 8080
    },
    {
        host: '1.2.3.5',
        port: 8081
    }
];
```


#### AMD 模块注释


> [强制] AMD 模块使用 `@module` 或 `@exports` 标识。


@exports 与 @module 都可以用来标识模块，区别在于 @module 可以省略模块名称。而只使用 @exports 时在 namepaths 中可以省略 module: 前缀。



```javascript
define(
    function (require) {

        /**
         * foo description
         *
         * @exports Foo
         */
        var foo = {
            // TODO
        };

        /**
         * baz description
         *
         * @return {boolean} return description
         */
        foo.baz = function () {
            // TODO
        };

        return foo;

    }
);
```

也可以在 exports 变量前使用 @module 标识：

```javascript
define(
    function (require) {

        /**
         * module description.
         *
         * @module foo
         */
        var exports = {};


        /**
         * bar description
         *
         */
        exports.bar = function () {
            // TODO
        };

        return exports;
    }
);
```

如果直接使用 factory 的 exports 参数，还可以：

```javascript
/**
 * module description.
 *
 * @module
 */
define(
    function (require, exports) {

        /**
         * bar description
         *
         */
        exports.bar = function () {
            // TODO
        };
        return exports;
    }
);
```

>[强制] 对于已使用 `@module` 标识为 AMD模块 的引用，在 `namepaths` 中必须增加 `module:` 作前缀。


namepaths 没有 module: 前缀时，生成的文档中将无法正确生成链接。


```javascript
/**
 * 点击处理
 *
 * @fires module:Select#change
 * @private
 */
Select.prototype.clickHandler = function () {
    /**
     * 值变更时触发
     *
     * @event module:Select#change
     * @param {Object} e e描述
     * @param {string} e.before before描述
     * @param {string} e.after after描述
     */
    this.fire(
        'change',
        {
            before: 'foo',
            after: 'bar'
        }
    );
};
```

>[建议] 对于类定义的模块，可以使用 `@alias` 标识构建函数。


```javascript
/**
 * A module representing a jacket.
 * @module jacket
 */
define(
    function () {

        /**
         * @class
         * @alias module:jacket
         */
        var Jacket = function () {
        };

        return Jacket;
    }
);
```


>[建议] 多模块定义时，可以使用 `@exports` 标识各个模块。


```javascript
// one module
define('html/utils',
    /**
     * Utility functions to ease working with DOM elements.
     * @exports html/utils
     */
    function () {
        var exports = {
        };

        return exports;
    }
);

// another module
define('tag',
    /** @exports tag */
    function () {
        var exports = {
        };

        return exports;
    }
);
```

>[建议] 对于 exports 为 Object 的模块，可以使用`@namespace`标识。


使用 @namespace 而不是 @module 或 @exports 时，对模块的引用可以省略 module: 前缀。

>[建议] 对于 exports 为类名的模块，使用 `@class` 和 `@exports` 标识。



```javascript

// 只使用 @class Bar 时，类方法和属性都必须增加 @name Bar#methodName 来标识，与 @exports 配合可以免除这一麻烦，并且在引用时可以省去 module: 前缀。
// 另外需要注意类名需要使用 var 定义的方式。

/**
 * Bar description
 *
 * @see foo
 * @exports  Bar
 * @class
 */
var Bar = function () {
    // TODO
};

/**
 * baz description
 *
 * @return {(string|Array)} return description
 */
Bar.prototype.baz = function () {
    // TODO
};
```


#### 细节注释


对于内部实现、不容易理解的逻辑说明、摘要信息等，我们可能需要编写细节注释。

>[建议] 细节注释遵循单行注释的格式。说明必须换行时，每行是一个单行注释的起始。


```javascript
function foo(p1, p2, opt_p3) {
    // 这里对具体内部逻辑进行说明
    // 说明太长需要换行
    for (...) {
        ....
    }
}
```

>[强制] 有时我们会使用一些特殊标记进行说明。特殊标记必须使用单行注释的形式。下面列举了一些常用标记：


-  TODO: 有功能待实现。此时需要对将要实现的功能进行简单说明。
-  FIXME: 该处代码运行没问题，但可能由于时间赶或者其他原因，需要修正。此时需要对如何修正进行简单说明。
-  HACK: 为修正某些问题而写的不太好或者使用了某些诡异手段的代码。此时需要对思路或诡异手段进行描述。
-  XXX: 该处存在陷阱。此时需要对陷阱进行描述。

### DOM


#### 元素获取


> [建议] 对于单个元素，尽可能使用 `document.getElementById` 获取，避免使用`document.all`。


>[建议] 对于多个元素的集合，尽可能使用 `context.getElementsByTagName` 获取。其中 `context` 可以为 `document` 或其他元素。指定 `tagName` 参数为 `*` 可以获得所有子元素。

>[建议] 遍历元素集合时，尽量缓存集合长度。如需多次操作同一集合，则应将集合转为数组。


原生获取元素集合的结果并不直接引用 DOM 元素，而是对索引进行读取，所以 DOM 结构的改变会实时反映到结果中。


```html
<div></div>
<span></span>

<script>
var elements = document.getElementsByTagName('*');

// 显示为 DIV
alert(elements[0].tagName);

var div = elements[0];
var p = document.createElement('p');
docpment.body.insertBefore(p, div);

// 显示为 P
alert(elements[0].tagName);
</script>
```


>[建议] 获取元素的直接子元素时使用 `children`。避免使用`childNodes`，除非预期是需要包含文本、注释和属性类型的节点。

#### 样式获取


>[建议] 获取元素实际样式信息时，应使用 `getComputedStyle` 或 `currentStyle`。


通过 style 只能获得内联定义或通过 JavaScript 直接设置的样式。通过 CSS class 设置的元素样式无法直接通过 style 获取。




#### 样式设置


>[建议] 尽可能通过为元素添加预定义的 className 来改变元素样式，避免直接操作 style 设置。

>[强制] 通过 style 对象设置元素样式时，对于带单位非 0 值的属性，不允许省略单位。


除了 IE，标准浏览器会忽略不规范的属性值，导致兼容性问题。




#### DOM 操作


> [建议] 操作 `DOM` 时，尽量减少页面 `reflow`。


页面 reflow 是非常耗时的行为，非常容易导致性能瓶颈。下面一些场景会触发浏览器的reflow：

- DOM元素的添加、修改（内容）、删除。
- 应用新的样式或者修改任何影响元素布局的属性。
- Resize浏览器窗口、滚动页面。
- 读取元素的某些属性（offsetLeft、offsetTop、offsetHeight、offsetWidth、scrollTop/Left/Width/Height、clientTop/Left/Width/Height、getComputedStyle()、currentStyle(in IE)) 。


> [建议] 尽量减少 `DOM` 操作。


DOM 操作也是非常耗时的一种操作，减少 DOM 操作有助于提高性能。举一个简单的例子，构建一个列表。我们可以用两种方式：

1. 在循环体中 createElement 并 append 到父元素中。
2. 在循环体中拼接 HTML 字符串，循环结束后写父元素的 innerHTML。

第一种方法看起来比较标准，但是每次循环都会对 DOM 进行操作，性能极低。在这里推荐使用第二种方法。




#### DOM 事件


> [建议] 优先使用 `addEventListener / attachEvent` 绑定事件，避免直接在 HTML 属性中或 DOM 的 `expando` 属性绑定事件处理。


expando 属性绑定事件容易导致互相覆盖。


> [建议] 使用 `addEventListener` 时第三个参数使用 `false`。


标准浏览器中的 addEventListener 可以通过第三个参数指定两种时间触发模型：冒泡和捕获。而 IE 的 attachEvent 仅支持冒泡的事件触发。所以为了保持一致性，通常 addEventListener 的第三个参数都为 false。


> [建议] 在没有事件自动管理的框架支持下，应持有监听器函数的引用，在适当时候（元素释放、页面卸载等）移除添加的监听器。