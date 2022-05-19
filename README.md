# React 命令行 `rcli-xhy`

`rcli-xhy` 快速生成react组件的包

```sh
npm install -g rcli-xhy
```

## 预览

```
Usage: rcli-xhy [options] [command]

Commands:

  generate <item>
  new <appName>

Options:
  [全局]
  -h, --help                       输出使用信息
  -V, --version                    输出版本号
  [generate]
  -d, --directory [directory]      将放置项目的输出目录
  -c, --component [componentName]  组件的名称
  -f, --folder [folder]            这个组件是否应该有它自己的文件夹
  -s, --stateless [stateless]      指定这是否是无状态组件
  -t, --type [type]                指定组件类型 class | fn (默认class)
  --typescript                     指定这是否是ts组件
  [new]
  -t, --test [testFramework]       选择要包含在构建中的测试框架
  -l, --linter [linter]            选择要包含在构建中的 linter
```

## 生成

`rcli-xhy` 支持通过运行以下命令轻松生成组件：

```sh
$ rcli-xhy generate component -c ComponentName
```

默认情况下，生成的组件放在 `src/cmoponents` 下。 如果你想改变它，只需使用 `-d, --directory` 标志：

```sh
$ rcli-xhy generate component -c ComponentName -d some/other/directory
```

用 `-s, --stateless` 标志指定生成组件的css：

```sh
$ rcli-xhy generate component -c ComponentName -s
```

默认情况下创建指定组件名的文件, 使用 `-f, --folder` 标志构建一个index模式的文件夹

```sh
$ rcli-xhy generate component -c ComponentName -f
```

默认情况下创建类组件，使用 `-t, --type`  `class or fn`标志创建不同类型的组件:

```sh
$ rcli-xhy generate component -t ComponentName -t class|fn
```

默认情况下创建js组件, 使用 `--typescript` 标志构建一个typescript组件:

```sh
$ rcli-xhy generate component -c ComponentName --typescript
```
## 脚手架新应用

您可以通过运行快速搭建新应用程序:

```sh
$ rcli-xhy new appName
```

这将创建一个名为 `appName` 的文件夹，其中包含一个基础项目，该项目将允许您运行一个开发服务器，其中包括热模块替换等有用功能

您可以通过在应用程序根文件夹中运行以下命令来使用这两个功能：

```sh
# 启动
$ npm run start:dev

# 构建
$ npm run build

# 启动:生产
$ npm run start:prod
```

### 脚手架选项

您可以在生成新应用程序时传递各种选项。 截至目前，`rcli-xhy` 支持两个标志，`--test` 和 `--linter`，并实现了 `jest` 测试框架和 `eslint`

要在构建应用程序时包含它们，只需执行以下操作:

```sh
$ rcli-xhy new appName -t jest -l eslint
```

该项目现在将分别为测试和 linting 提供 `jest` 和 `eslint` 支持。