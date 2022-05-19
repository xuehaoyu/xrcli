import invariant from 'fbjs/lib/invariant'
import { command } from './command'
import { generators } from '../generators'
import { printError } from '../utilities/print'
import { requiredOptions } from '../utilities/requiredOptions'

// Component, Component Folder, test, class syntax, component syntax
// Route
// path option, default to src/components

const checkRequiredOptions = requiredOptions({
  component: true,
  directory: false,
  folder: false,
  stateless: false,
  type: false,
  typescript: false
})

export const generate = command({
  name: 'generate <item>',
  options: [
    {
      value: '-d, --directory [directory]',
      description: '将放置组件的输出目录。',
      defaultValue: 'src/components'
    },
    {
      value: '-c, --component [componentName]',
      description: '组件名'
    },
    {
      value: '-f, --folder [folder]',
      description: '组件是否有它自己的文件夹'
    },
    {
      value: '-s, --stateless [stateless]',
      description: 'css文件类型'
    },
    {
      value: '-t, --type [type]',
      description: '组件类型,类组件或者函数组件',
      defaultValue: 'class'
    },
    {
      value: '--typescript',
      description: '是否创建ts模版'
    }
  ],
  handler: async (item, program) => {
    const {
      component,
      directory,
      type,
      folder = false,
      stateless,
      typescript = false
    } = program.parent

    const options = {
      component,
      directory,
      type,
      folder,
      stateless,
      typescript
    }

    try {
      invariant(
        item === 'component',
        'Whoops! `generate` expects `component` right now.'
      )

      checkRequiredOptions(options)

      const generator = generators[item]
      await generator(options)
    } catch (error) {
      printError(error)
    }
  }
})
