export const reactFnTemplate = (options) => {
  const { folder, component, stateless, typescript } = options
  const imports = ["import React from 'react';"]

  if (stateless) {
    imports.push(`import './${folder ? 'index' : component}.css';`)
  }

  const ins = []
  if (typescript) {
    ins.push(...['', 'interface IProps {}'])
  }
  let componentTemplate
  const tempDom = `<div class="${component}-block">
      <div class="${component}-block__header">
        <h2 class="${component}-block__title"></h2>
      </div>
      <div class="${component}-block__content">
        <img class="${component}-block__img" src="" />
      </div>
    </div>`
  if (typescript) {
    componentTemplate = `const ${component}: React.FC<IProps> = (props: IProps) => {
      return (
        ${tempDom}
      )
    };`
  } else {
    componentTemplate = `const ${component} = () => {
      return (
        ${tempDom}
      )
    };`
  }
  const template = [
    ...imports,
    ...ins,
    '',
    componentTemplate,
    '',
    `export default ${component};`
  ]
  return template.join('\n')
}
