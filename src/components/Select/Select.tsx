import { FC } from 'react'
import Select, {
  ActionMeta,
  GroupBase,
  OptionsOrGroups,
  SingleValue,
} from 'react-select'

interface ReactSelectProps {
  options: OptionsOrGroups<any, GroupBase<any>>
  onChange?: (newValue: SingleValue<any>, actionMeta: ActionMeta<any>) => void
  defaultValue: any
}

const ReactSelect: FC<ReactSelectProps> = ({
  options,
  onChange,
  defaultValue,
}) => {
  return (
    <Select
      defaultValue={defaultValue}
      classNamePrefix="react-select"
      onChange={onChange}
      options={options}
    />
  )
}

export default ReactSelect
