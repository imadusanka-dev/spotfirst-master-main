import { Switch } from '@headlessui/react'
import CustomDatePicker from 'components/DatePicker'
import classNames from 'classnames'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CURATOR_API } from 'data'
import toast from 'react-hot-toast'

const days = [
  {
    value: 'monday',
    label: 'Monday',
  },
  {
    value: 'tuesday',
    label: 'Tuesday',
  },
  {
    value: 'wednesday',
    label: 'Wednesday',
  },
  {
    value: 'thursday',
    label: 'Thursday',
  },
  {
    value: 'friday',
    label: 'Friday',
  },
  {
    value: 'saturday',
    label: 'Saturday',
  },
  {
    value: 'sunday',
    label: 'Sunday',
  },
]

const AvailabilityTab = () => {
  const { register, handleSubmit } = useForm()

  const [isActive, setActive] = useState(true)
  const [unavailableFrom, setUnavailableFrom] = useState(null)
  const [unavailableTill, setUnavailableTill] = useState(null)
  const [unavailableDates, setUnavailableDates] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: true,
  })

  const handleCheckboxes = (value: string, checked: boolean) => {
    setUnavailableDates({ ...unavailableDates, [value]: checked })
  }

  const onSubmit = async (data) => {
    const payload = {
      unavailableFrom,
      unavailableTill,
      isActive,
      message: data.message,
      unavailableDates,
    }

    try {
      const response = await CURATOR_API.updateCuratorAvailable(payload)
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  return (
    <div className="mt-10 mb-20 divide-y divide-gray-200">
      <div className="space-y-1">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Availability
        </h3>
        <p className="max-w-2xl text-sm text-gray-500">
          Your availability settings
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-10">
          <div className="mt-4">
            <div className="space-y-1">
              <h3 className="mb-4 text-base font-medium leading-6 text-gray-900">
                Change Active Status
              </h3>
              <div className="flex space-x-4">
                <p className="text-sm">Active</p>
                <Switch
                  checked={isActive}
                  onChange={setActive}
                  className={classNames(
                    isActive ? 'bg-primary-blue' : 'bg-gray-200',
                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue'
                  )}
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    aria-hidden="true"
                    className={classNames(
                      isActive ? 'translate-x-5' : 'translate-x-0',
                      'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                    )}
                  />
                </Switch>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="space-y-1">
              <h3 className="mb-3 text-base font-medium leading-6 text-gray-900">
                Unavailable From
              </h3>
              <div>
                <CustomDatePicker
                  onChange={setUnavailableFrom}
                  value={unavailableFrom}
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="space-y-1">
              <h3 className="mb-3 text-base font-medium leading-6 text-gray-900">
                To (including)
              </h3>
              <div>
                <CustomDatePicker
                  onChange={setUnavailableTill}
                  value={unavailableTill}
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="space-y-1">
              <h3 className="mb-3 text-base font-medium leading-6 text-gray-900">
                Add a message (optional)
              </h3>
              <div>
                <textarea
                  cols={30}
                  rows={6}
                  className="w-full bg-transparent border outline-none rounded-lg placeholder:font-light focus:outline-none focus:ring-1 focus:ring-blue-200 px-5 py-3.5 text-sm text-primary-blue-dark"
                  placeholder="Do not be shy! Share all info that could help our curators promote your track!"
                  {...register('message')}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="space-y-1">
              <h3 className="mb-3 text-base font-medium leading-6 text-gray-900">
                Unavailable Dates
              </h3>
              <div>
                <div className="flex space-x-8">
                  {days.map((day) => (
                    <div className="flex space-x-2" key={day.value}>
                      <input
                        checked={unavailableDates[day.value]}
                        onChange={(event) =>
                          handleCheckboxes(day.value, event.target.checked)
                        }
                        value={day.value}
                        className="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        type="checkbox"
                      />
                      <span>{day.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 px-6 select-none py-2 text-sm font-medium text-white rounded-md bg-primary-blue"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default AvailabilityTab
