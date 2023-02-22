import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { SpinnerCircular } from 'spinners-react'

interface SettingTextAreaProps {
  name: string
  placeholder: string
  label: string
  value: string
  required?: boolean
  update: (value: string) => Promise<void>
}

interface FieldValues {
  value: string
}

const SettingTextArea: FC<SettingTextAreaProps> = ({
  label,
  value,
  placeholder,
  update,
  required = true,
}) => {
  const [editable, setEditable] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit } = useForm<FieldValues>()

  const onSubmit = async (data: FieldValues) => {
    setLoading(true)
    update(data['value']).then(() => {
      setLoading(false)
      setEditable(false)
    })
  }

  return (
    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="flex mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        {editable ? (
          <form className="flex w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex-grow">
              <textarea
                {...register('value', {
                  required: required,
                })}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={placeholder}
                rows={4}
                defaultValue={value}
              />
            </div>
            {loading ? (
              <>
                <div className="flex-shrink-0">
                  <SpinnerCircular
                    size={30}
                    secondaryColor={'transparent'}
                    color="#C93FC0"
                  />
                </div>
              </>
            ) : (
              <>
                <span className="flex-shrink-0 ml-4">
                  <button
                    type="submit"
                    className="font-medium bg-white rounded-md text-primary-magenta hover:text-purple-500 focus:outline-none"
                  >
                    Confirm
                  </button>
                </span>
                <span className="flex-shrink-0 ml-4">
                  <button
                    onClick={() => {
                      setEditable(false)
                    }}
                    type="button"
                    className="font-medium bg-white rounded-md text-gray-500 hover:text-gray-600 focus:outline-none "
                  >
                    Cancel
                  </button>
                </span>
              </>
            )}
          </form>
        ) : (
          <>
            <span className="flex-grow">{value}</span>
            <span className="flex-shrink-0 ml-4">
              <button
                onClick={() => {
                  setEditable(true)
                }}
                type="button"
                className="font-medium w-full bg-white rounded-md text-primary-magenta hover:text-purple-500 focus:outline-none "
              >
                Update
              </button>
            </span>
          </>
        )}
      </dd>
    </div>
  )
}

export default SettingTextArea
