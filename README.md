# React Command Line `xhy-rcli`

`xhy-rcli` is a utility to help quickly scaffold out new, production-grade applications and provide generators for rapid application development.

```sh
npm install -g xhy-rcli
```

## Overview

```
Usage: xhy-rcli [options] [command]

Commands:

  generate <item>
  new <appName>

Options:

  -h, --help                       输出使用信息
  -V, --version                    输出版本号
  -d, --directory [directory]      将放置项目的输出目录
  -c, --component [componentName]  组件的名称
  -f, --folder [folder]            这个组件是否应该有它自己的文件夹
  -s, --stateless [stateless]      指定这是否是无状态组件
  -t, --type [type]                指定组件类型 class | fn (默认class)
  -ts, --typescript [typescript]   指定这是否是ts组件
  --include-test                   创建组件时包含测试
  -t, --test [testFramework]       选择要包含在构建中的测试框架
  -l, --linter [linter]            选择要包含在构建中的 linter
```

## Scaffolding new applications

您可以通过运行快速搭建新应用程序:

```sh
$ xhy-rcli new appName
```

这将创建一个名为 `applicationName` 的文件夹，其中包含一个基础项目，该项目将允许您运行一个开发服务器，其中包括热模块替换等有用功能。 它还提供了一个基本的生产级实现，包括对服务器端渲染、基本 Express 安全性和资产指纹识别的支持。

您可以通过在应用程序根文件夹中运行以下命令来使用这两个功能：

```sh
# 启动
$ npm run start:dev

# 构建
$ npm run build

# 启动:生产
$ npm run start:prod
```

### Scaffold options

You can pass in a variety of options while generating a new application. As of right now, `xhy-rcli` supports two flags, `--test` and `--linter` and has implementations for the `jest` testing framework as well as `eslint`.

To include them when building out your application, just do the following:

```sh
$ xhy-rcli new appName -t jest -l eslint
```

And the project will now have `jest` and `eslint` support for testing and linting, respectively.

## Generators

`xhy-rcli` 支持通过运行以下命令轻松生成组件：

```sh
$ xhy-rcli generate component -c ComponentName
```

By default, this will generate components and put them in your application's `src/cmoponents` folder. If you want to change that, just use the `-d, --directory` flag:

```sh
$ xhy-rcli generate component -c ComponentName -d some/other/directory
```

You can also specify whether the generated component should be a stateless component with the `-s, --stateless` flag:

```sh
$ xhy-rcli generate component -c ComponentName -s
```

In addition, you can scaffold out a component folder with an included CSS file for working with CSS Modules by using the `-f, --folder` flag:

```sh
$ xhy-rcli generate component -c ComponentName -f
```

Finally, you can choose to include a test for your component in the directory's `__tests__` folder by using the `--include-test` flag:

```sh
$ xhy-rcli generate component -c ComponentName -t
```
