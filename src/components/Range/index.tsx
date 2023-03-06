import { Range, getTrackBackground } from 'react-range'

interface IRangeComponentProps {
  values: number[]
  step: number
  min: number
  max: number
  handleChange: (val) => void
}

const RangeComponent = ({
  values,
  step,
  min,
  max,
  handleChange,
}: IRangeComponentProps) => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          margin: '2em',
        }}
      >
        <Range
          values={values}
          step={step}
          min={min}
          max={max}
          onChange={(values) => handleChange({ values })}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: '36px',
                display: 'flex',
                width: '100%',
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: '5px',
                  width: '100%',
                  borderRadius: '4px',
                  background: getTrackBackground({
                    values: values,
                    colors: ['#548BF4', '#ccc'],
                    min: min,
                    max: max,
                  }),
                  alignSelf: 'center',
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '20px',
                width: '20px',
                borderRadius: '100px',
                backgroundColor: '#FFF',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0px 2px 6px #AAA',
              }}
            ></div>
          )}
        />
        <output style={{ marginTop: '8px' }} id="output">
          {values[0].toFixed(1)}
        </output>
      </div>
    </div>
  )
}

export default RangeComponent
