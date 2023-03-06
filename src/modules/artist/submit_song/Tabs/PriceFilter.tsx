import { useState } from 'react'
import Range from 'components/Range'
import { useAppSelector, useAppDispatch } from 'core/hooks/useRedux'
import { setCuratorPriceFilter } from 'redux/slices/submitSong'

const PriceFilter = () => {
  const dispatch = useAppDispatch()
  const { curatorPriceFilter } = useAppSelector(
    (state) => state.submitSongSlice
  )
  const handlePriceChange = (val) => {
    dispatch(setCuratorPriceFilter(val.values[0]))
  }

  return (
    <Range
      step={1}
      min={0}
      max={20}
      values={Array.of(curatorPriceFilter)}
      handleChange={handlePriceChange}
    />
  )
}

export default PriceFilter
