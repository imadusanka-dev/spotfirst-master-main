import { FC } from 'react'
import Select, {
  ActionMeta,
  GroupBase,
  MultiValue,
  OptionsOrGroups,
} from 'react-select'

interface MultiSelectProps {
  options: OptionsOrGroups<unknown, GroupBase<unknown>>
  onChange?: (
    newValue: MultiValue<unknown>,
    actionMeta: ActionMeta<unknown>
  ) => void
  defaultValue: any
}

const MultiSelect: FC<MultiSelectProps> = ({
  options,
  onChange,
  defaultValue,
}) => {
  return (
    <Select
      defaultValue={defaultValue}
      classNamePrefix="multiselect"
      onChange={onChange}
      isMulti
      options={options}
    />
  )
}

export default MultiSelect
