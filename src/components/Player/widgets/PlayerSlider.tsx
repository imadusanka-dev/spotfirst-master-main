import { useAppSelector } from 'core/hooks/useRedux'
import { FC } from 'react'
import { getTrackBackground, Range } from 'react-range'

const PlayerSlider: FC<{
  onChangeTime: (duration: number) => void
}> = ({ onChangeTime }) => {
  const player = useAppSelector((state) => state.playerSlice)

  const handleChange = (values: number[]) => {
    onChangeTime(values[0])
  }

  return (
    <>
      <div className="w-full">
        <Range
          step={0.1}
          min={0}
          max={player.duration !== 0 ? player.duration : 100}
          values={[player.currentTime]}
          onChange={handleChange}
          renderTrack={({ props, children }) => (
            <div
              className="h-[3px] w-full rounded-md bg-slate-200"
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
                    values: [player.currentTime],
                    colors: ['#548BF4', '#ddd'],
                    min: 0,
                    max: player.duration !== 0 ? player.duration : 100,
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
              className="rounded-full hidden justify-center items-center -mt-[1px] w-[8px] h-[8px] bg-primary-blue"
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

export default PlayerSlider
