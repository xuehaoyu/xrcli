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
  const tempDomTitle = component.toLowerCase()
  const tempDom = `<div className="${tempDomTitle}-block">
  <div className="${tempDomTitle}-block__header">
    <h2 className="${tempDomTitle}-block__title"></h2>
  </div>
  <div className="${tempDomTitle}-block__content">
    <img className="${tempDomTitle}-block__img" src="" />
  </div>
  </div>`
  let componentTemplate
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
