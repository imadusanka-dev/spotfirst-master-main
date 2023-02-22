import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/outline'
import { FC, forwardRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import dayjs from 'dayjs'
import 'react-datepicker/dist/react-datepicker.css'

interface CustomDatePickerProps {
  onChange: (date: Date) => void
  showTimeSelect?: boolean
  value?: Date
}

const CustomDatePicker: FC<CustomDatePickerProps> = ({
  onChange,
  showTimeSelect,
  value,
}) => {
  const [startDate, setStartDate] = useState<Date>(value || dayjs().toDate())

  return (
    <div className="relative max-w-[300px]">
      <DatePicker
        selected={startDate}
        onChange={(date) => {
          onChange(date)
          setStartDate(date)
        }}
        showTimeSelect={showTimeSelect}
        selectsStart
        timeFormat="HH:mm"
        startDate={startDate}
        nextMonthButtonLabel=">"
        previousMonthButtonLabel="<"
        popperClassName="react-datepicker-left"
        customInput={<ButtonInput date={startDate} showTime={showTimeSelect} />}
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="flex items-center justify-between px-2 py-2">
            <span className="text-lg text-slate-600">
              {dayjs(date).format('MMMM YYYY')}
            </span>

            <div className="space-x-2">
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                type="button"
                className={`${
                  prevMonthButtonDisabled && 'cursor-not-allowed opacity-50'
                }
                                            inline-flex p-1 text-sm font-medium text-slate-700 bg-white  rounded shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
                                        `}
              >
                <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                type="button"
                className={`
                                            ${
                                              nextMonthButtonDisabled &&
                                              'cursor-not-allowed opacity-50'
                                            }
                                            inline-flex p-1 text-sm font-medium text-slate-700 bg-white   rounded shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
                                        `}
              >
                <ChevronRightIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        )}
      />
    </div>
  )
}

const ButtonInput = forwardRef<
  HTMLButtonElement,
  { value?: any; onClick?: () => void; showTime?: boolean; date: Date }
>(({ onClick, showTime, date }, ref) => {
  return (
    <button
      onClick={onClick}
      ref={ref}
      type="button"
      className="inline-flex justify-start w-full bg-slate-100 px-3 shadow-sm py-2 text-sm  text-slate-600   rounded-md outline-none  focus:outline-none "
    >
      <span>
        <CalendarIcon className="w-5 h-5 mr-2 text-slate-500" />
      </span>

      {dayjs(date).format(`DD MMMM YYYY ${showTime ? '- hh:mm A' : ''}`)}
    </button>
  )
})

ButtonInput.displayName = 'ButtonInput'

export default CustomDatePicker
