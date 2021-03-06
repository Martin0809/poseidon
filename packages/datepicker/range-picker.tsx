import React from 'react'
import styled from 'styled-components'
import DatePicker from './date-picker'
import { DateValue } from './calender'
import theme from '@zcool/theme'

const DateRangeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 253px;
  height: 32px;
  background-color: ${theme.palette.white};
  border: 1px solid #ccc;
  border-radius: 4px;

  > div {
    border: none;

    &:first-child,
    &:last-child {
      height: 30px;
      background-color: transparent;
    }
  }
`

const SplitLine = styled.div`
  width: 9px;
  height: 1px;
  background-color: ${theme.palette.pewter};
`

interface Value {
  from: DateValue
  to: DateValue
}

export interface RangePickerProps {
  startPlaceholder?: string
  endPlaceholder?: string
  value?: Value
  defaultValue?: { from: string; to: string }
  className?: string
  endDatePickerClassName?: string
  startDatePickerClassName?: string
  language?: 'zh' | 'en' | string
  onChange: (value: Value) => void
}

function RangePicker(props: RangePickerProps) {
  const {
    startPlaceholder,
    endPlaceholder,
    value,
    defaultValue,
    className,
    endDatePickerClassName,
    startDatePickerClassName,
    onChange,
    language = 'zh'
  } = props

  const changeDate = (date: DateValue, type: 'from' | 'to') => {
    value[type] = date
    onChange(value)
  }

  return (
    <DateRangeWrapper className={className}>
      <DatePicker
        className={startDatePickerClassName}
        placeholder={startPlaceholder}
        defaultValue={defaultValue ? defaultValue.from : null}
        value={value ? value.from : null}
        onChange={e => changeDate(e, 'from')}
        language={language}
        disabledDatesOfStart={value ? value.to : null}
      />
      <SplitLine />
      <DatePicker
        className={endDatePickerClassName}
        placeholder={endPlaceholder}
        defaultValue={defaultValue ? defaultValue.to : null}
        value={value ? value.to : null}
        onChange={e => changeDate(e, 'to')}
        language={language}
        disabledDatesOfEnd={value ? value.from : null}
      />
    </DateRangeWrapper>
  )
}

export default RangePicker
