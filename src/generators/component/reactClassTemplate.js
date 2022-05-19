export const reactClassTemplate = (options) => {
  const { folder, component, stateless, typescript } = options
  const imports = ["import React from 'react';"]

  if (stateless) {
    imports.push(
      `import './${folder ? 'index' : component}.${stateless || 'css'}';`
    )
  }

  const ins = []
  if (typescript) {
    ins.push(...['', 'interface IProps {}', '', 'interface IState {}'])
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
