import { useAppSelector } from 'core/hooks/useRedux'
import { FC } from 'react'
import { getTrackBackground, Range } from 'react-range'

const VolumeSlider: FC<{
  onChangeVolume: (value: number) => void
}> = ({ onChangeVolume }) => {
  const player = useAppSelector((state) => state.playerSlice)

  const handleChange = (values: number[]) => {
    const value = values[0]
    onChangeVolume(value)
  }

  return (
    <>
      <div className="w-[120px] mx-3">
        <Range
          step={0.1}
          min={0}
          max={1}
          values={[player.volume]}
          onChange={handleChange}
          renderTrack={({ props, children }) => (
            <div
              className="h-[4px] w-full rounded-md bg-slate-200"
              {...props}
              style={{
                ...props.style,
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: '5px',
                  width: '100%',
                  borderRadius: '4px',
                  background: getTrackBackground({
                    values: [player.volume],
                    colors: ['#548BF4', '#ddd'],
                    min: 0,
                    max: 1,
                  }),
                  // alignSelf: "center"
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              className="rounded-full hidden w-[6px] h-[6px] bg-primary-blue"
              {...props}
              style={{
                ...props.style,
              }}
            />
          )}
        />
      </div>
    </>
  )
}

export default VolumeSlider
