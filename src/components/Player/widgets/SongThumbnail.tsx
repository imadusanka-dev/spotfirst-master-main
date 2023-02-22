import classNames from 'classnames'
import { useAppSelector } from 'core/hooks/useRedux'
import Image from 'next/legacy/image'
import { FC } from 'react'

interface SongThumbnailProps {
  albumArt?: string
}

const SongThumbnail: FC<SongThumbnailProps> = ({ albumArt }) => {
  const isPlaying = useAppSelector((state) => state.playerSlice.isPlaying)
  return (
    <div
      className={classNames(
        isPlaying
          ? 'shadow-[#1980f57f] scale-100'
          : 'shadow-transparent scale-90 ',
        'relative shadow-normal delay-300 transition-all duration-300  overflow-hidden w-[55px] min-w-[55px] h-[55px] min-h-[55px] bg-slate-200 rounded-md'
      )}
    >
      {albumArt && (
        <Image
          layout="fill"
          objectFit="cover"
          src={albumArt}
          placeholder="blur"
          blurDataURL={albumArt}
          alt={'Album Art'}
        />
      )}
    </div>
  )
}

export default SongThumbnail
