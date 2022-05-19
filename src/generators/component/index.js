import path from 'path'
import { lstat, outputFileSync } from 'fs-extra'
import { jestTestTemplate } from './jestTestTemplate'
import { reactClassTemplate } from './reactClassTemplate'
import { reactFnTemplate } from './reactFnTemplate'
import { exportHelperTemplate } from './exportHelperTemplate'
import { print, printWarning } from '../../utilities/print'

// 创建文件夹组件
const createComponentFolder = (options) =>
  new Promise((resolve, reject) => {
    const { component, directory, stateless, includeTest, typescript } =
      options

    const distPath = path.resolve(process.cwd(), directory)
    const componentTestPath = path.resolve(
      distPath,
      `__tests__/${component}-test.js`
    )

    const componentFolderPath = path.resolve(distPath, component)
    const indexPath = path.resolve(componentFolderPath, 'index.js')
    const stylePath = path.resolve(componentFolderPath, `${component}.css`)
    const componentPath = path.resolve(
      componentFolderPath,
      `${component}.${typescript ? 'tsx' : 'jsx'}`
    )

    lstat(componentFolderPath, (error, stats) => {
      if (!error && stats.isDirectory()) {
        printWarning(
          `A directory for the component ${component} already exists at ${componentFolderPath}`
        )
        reject(new Error())
        return
      }

      print('Creating export helper file')
      outputFileSync(indexPath, exportHelperTemplate(component))

      if (stateless) {
        print('Creating React Stateless Component file')
        outputFileSync(componentPath, reactFnTemplate(component, true))
      } else {
        print('Creating React Component Class file')
        outputFileSync(componentPath, reactClassTemplate(component, false))
      }

      if (includeTest) {
        print('Creating test file')
        outputFileSync(componentTestPath, jestTestTemplate(component))
      }

      if (stateless) {
        print('创建默认css文件')
        outputFileSync(stylePath, '')
      }

      resolve()
    })
  })

// 创建文件组件
const createComponentFile = (options) =>
  new Promise((resolve, reject) => {
    const { component, directory, stateless, includeTest, typescript } =
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

      if (stateless) {
        print('Creating React Stateless Component file')
        outputFileSync(componentFilePath, reactFnTemplate(component, true))
      } else {
        print('Creating React Component Class file')
        outputFileSync(componentFilePath, reactClassTemplate(component, false))
      }

      if (includeTest) {
        print('Creating test file')
        outputFileSync(componentTestPath, jestTestTemplate(component))
      }

      if (stateless) {
        print('创建默认css文件')
        outputFileSync(stylePath, '')
      }

      resolve()
    })
  })

export const componentGenerator = async (options) => {
  const { folder, ...rest } = options

  try {
    if (folder) {
      await createComponentFolder(rest)
    } else {
      await createComponentFile(rest)
    }

    print(`✅  生成 React 组件: ${options.component}`)
  } catch (error) {}
}
