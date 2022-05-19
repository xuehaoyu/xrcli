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
  folder: true,
  stateless: true,
  includeTest: true
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
      description: 'Specify whether this is a stateless component or not.'
    },
    {
      value: '-ts, --typescript [typescript]',
      description: '是否创建ts模版'
    },
    {
      value: '--include-test',
      description: 'Include a test when creating a component'
    }
  ],
  handler: async (item, program) => {
    const {
      component,
      directory,
      folder = false,
      stateless = false,
      includeTest = false,
      typescript = false
    } = program.parent

    const options = {
      component,
      directory,
      folder,
      stateless,
      includeTest,
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
