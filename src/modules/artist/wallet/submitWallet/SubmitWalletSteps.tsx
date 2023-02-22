import { CheckIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
import { useAppDispatch, useAppSelector } from 'core/hooks/useRedux'
import { setStep } from 'redux/slices/submitWallet'

const SubmitWalletSteps = () => {
  const { step, steps } = useAppSelector((state) => state.submitWalletSlice)
  const dispatch = useAppDispatch()

  return (
    <nav aria-label="Progress" className="mt-5">
      <ol
        role="list"
        className={classNames(
          step === 3 ? 'flex w-full' : '',
          'overflow-hidden'
        )}
      >
        {steps.map((item, stepIdx) => (
          <li
            key={item.name}
            className={classNames(
              stepIdx !== steps.length - 1
                ? step === 3
                  ? 'w-full'
                  : 'pb-10'
                : '',
              'relative'
            )}
          >
            {steps[stepIdx].completed ? (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    className={classNames(
                      step === 3 ? 'w-full h-0.5' : 'h-full w-0.5',
                      '-ml-px absolute mt-0.5 top-4 left-4  bg-primary-blue'
                    )}
                    aria-hidden="true"
                  />
                ) : null}
                <a
                  onClick={() => {
                    dispatch(setStep(item.step))
                  }}
                  className="relative flex items-start cursor-pointer group"
                >
                  <span className="flex items-center h-9">
                    <span className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-primary-blue group-blue:bg-blue-800">
                      <CheckIcon
                        className="w-5 h-5 text-white"
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                  {step !== 3 && (
                    <span className="flex flex-col min-w-0 ml-4">
                      <span className="text-xs font-semibold tracking-wide uppercase">
                        {item.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {item.description}
                      </span>
                    </span>
                  )}
                </a>
              </>
            ) : item.step === step ? (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    className={classNames(
                      step === 3 ? 'w-full h-0.5' : 'w-0.5 h-full',
                      '-ml-px absolute mt-0.5 top-4 left-4  bg-gray-300'
                    )}
                    aria-hidden="true"
                  />
                ) : null}
                <a
                  onClick={() => {
                    if (steps[stepIdx - 1]?.completed) {
                      dispatch(setStep(item.step))
                    }
                  }}
                  className="relative flex items-start cursor-pointer group"
                  aria-current="step"
                >
                  <span className="flex items-center h-9" aria-hidden="true">
                    <span className="relative z-10 flex items-center justify-center w-8 h-8 bg-white border-2 rounded-full border-pribg-primary-blue">
                      <span className="h-2.5 w-2.5 bg-primary-blue rounded-full" />
                    </span>
                  </span>

                  {step !== 3 && (
                    <span className="flex flex-col min-w-0 ml-4">
                      <span className="text-xs font-semibold tracking-wide uppercase text-pribg-primary-blue">
                        {item.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {item.description}
                      </span>
                    </span>
                  )}
                </a>
              </>
            ) : (
              <>
                {stepIdx !== steps.length - 1 ? (
                  <div
                    className={classNames(
                      step === 3 ? 'w-full h-0.5' : 'w-0.5 h-full',
                      '-ml-px absolute mt-0.5 top-4 left-4 bg-gray-300'
                    )}
                    aria-hidden="true"
                  />
                ) : null}
                <a
                  onClick={() => {
                    if (steps[stepIdx - 1]?.completed) {
                      dispatch(setStep(item.step))
                    }
                  }}
                  className="relative flex items-start cursor-pointer group"
                >
                  <span className="flex items-center h-9" aria-hidden="true">
                    <span className="relative z-10 flex items-center justify-center w-8 h-8 bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400">
                      <span className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300" />
                    </span>
                  </span>

                  {step !== 3 && (
                    <span className="flex flex-col min-w-0 ml-4">
                      <span className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
                        {item.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {item.description}
                      </span>
                    </span>
                  )}
                </a>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default SubmitWalletSteps
