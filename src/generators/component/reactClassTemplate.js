export const reactClassTemplate = (options) => {
  const { folder, component, stateless, typescript } = options
  const imports = ["import React from 'react';"]

  if (stateless) {
    imports.push(`import './${folder ? 'index' : component}.css';`)
  }

  const ins = []
  if (typescript) {
    ins.push(...['', 'interface IProps {}', '', 'interface IState {}'])
  }

  const tempDom = `<div class="${component}-block">
  <div class="${component}-block__header">
    <h2 class="${component}-block__title"></h2>
  </div>
  <div class="${component}-block__content">
    <img class="${component}-block__img" src="" />
  </div>
  </div>`
  let componentTemplate
  if (typescript) {
    componentTemplate = `export default class ${component} extends React.Component<IProps, IState> {
    render() {
      return (
        ${tempDom}
      );
    }
  }`
  } else {
    componentTemplate = `export default class ${component} extends React.Component {
      render() {
        return (
          ${tempDom}
        );
      }
    }`
  }

  const template = [...imports, ...ins, '', componentTemplate, '']

  return template.join('\n')
}
