import { Collapse } from 'antd';

const Panel = Collapse.Panel;

const Accordion = ({items, ...rest}) => {
  const panels = items.map(item => {
    return (
      <Panel header={item.header} key={item.key}>
        {item.component}
      </Panel>
    )
  })
  return (
    <Collapse {...rest}>
      {panels}
    </Collapse>
  )
}

export default Accordion
