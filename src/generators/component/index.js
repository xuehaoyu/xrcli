import path from 'path'
import { lstat, outputFileSync } from 'fs-extra'
import { jestTestTemplate } from './jestTestTemplate'
import { reactClassTemplate } from './reactClassTemplate'
import { reactFnTemplate } from './reactFnTemplate'
import { print, printWarning } from '../../utilities/print'

// 创建文件夹组件
const createComponentFolder = (options) =>
  new Promise((resolve, reject) => {
    const {
      folder,
      component,
      directory,
      type,
      stateless,
      includeTest,
      typescript
    } = options

    const distPath = path.resolve(process.cwd(), directory)
    const componentTestPath = path.resolve(
      distPath,
      `__tests__/${component}-test.${typescript ? 'tsx' : 'jsx'}`
    )
    const componentFolderPath = path.resolve(distPath, component)
    const stylePath = path.resolve(componentFolderPath, `${folder ? 'index' : component}.css`)
    const componentPath = path.resolve(
      componentFolderPath,
      `${folder ? 'index' : component}.${typescript ? 'tsx' : 'jsx'}`
    )

    lstat(componentFolderPath, (error, stats) => {
      if (!error && stats.isDirectory()) {
        printWarning(
          `A directory for the component ${component} already exists at ${componentFolderPath}`
        )
        reject(new Error())
        return
      }

      if (type === 'class') {
        print('创建一个类组件')
        outputFileSync(componentPath, reactClassTemplate(component, stateless))
      } else if (type === 'fn') {
        print('创建一个函数组件')
        outputFileSync(componentPath, reactFnTemplate(options))
      } else {
        print('创建一个类组件')
        outputFileSync(componentPath, reactClassTemplate(component, stateless))
      }

      if (stateless) {
        print('创建默认css文件')
        outputFileSync(stylePath, '')
      }

      if (includeTest) {
        print('创建测试文件')
        outputFileSync(componentTestPath, jestTestTemplate(component))
      }

      resolve()
    })
  })

// 创建文件组件
const createComponentFile = (options) =>
  new Promise((resolve, reject) => {
    const { component, directory, type, stateless, includeTest, typescript } =
      options

    const distPath = path.resolve(process.cwd(), directory)
    const componentFilePath = path.resolve(
      distPath,
      `${component}.${typescript ? 'tsx' : 'jsx'}`
    )
    const stylePath = path.resolve(distPath, `${component}.css`)
    const componentTestPath = path.resolve(
      distPath,
      `__tests__/${component}-test.js`
    )

    lstat(componentFilePath, (error, stats) => {
      if (!error && stats.isFile()) {
        printWarning(
          `A file already exists for the component ${component} at ${componentFilePath}`
        )
        reject(new Error())
        return
      }

      if (type === 'class') {
        print('创建一个类组件')
        outputFileSync(
          componentFilePath,
          reactClassTemplate(component, stateless)
        )
      } else if (type === 'fn') {
        print('创建一个函数组件')
        outputFileSync(componentFilePath, reactFnTemplate(options))
      } else {
        print('创建一个类组件')
        outputFileSync(
          componentFilePath,
          reactClassTemplate(component, stateless)
        )
      }

      if (stateless) {
        print('创建默认css文件')
        outputFileSync(stylePath, '')
      }

      if (includeTest) {
        print('创建测试文件')
        outputFileSync(componentTestPath, jestTestTemplate(component))
      }

      resolve()
    })
  })

export const componentGenerator = async (options) => {
  const { folder } = options

  try {
    if (folder) {
      await createComponentFolder(options)
    } else {
      await createComponentFile(options)
    }

    print(`✅  生成 React 组件: ${options.component}`)
  } catch (error) {}
}
