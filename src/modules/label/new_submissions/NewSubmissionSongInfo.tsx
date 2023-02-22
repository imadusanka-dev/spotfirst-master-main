import { useAppDispatch, useAppSelector } from 'core/hooks/useRedux'
import { SongPreview } from 'core/types'
import Image from 'next/legacy/image'
import { FC } from 'react'
import { Calendar, Disc, Music, Pause, PlayCircle, User } from 'react-feather'
import { setIsPlaying, setSong } from 'redux/slices/player'
import dayjs from 'dayjs'

interface NewSubmissionSongInfoProps {
  imageUrl: string
  songName: string
  genres: string[]
  songType: string
  songUrl: string
  artist: string
  preview: SongPreview
  releasedDate: string | null
  label: string | null
  uri: string | null
}

export const NewSubmissionSongInfo: FC<NewSubmissionSongInfoProps> = ({
  imageUrl,
  genres,
  songName,
  songType,
  songUrl,
  artist,
  preview,
  releasedDate,
  label,
  uri,
}) => {
  const player = useAppSelector((state) => state.playerSlice)
  const dispatch = useAppDispatch()

  const isSame = player.title === songName

  return (
    <div className="flex">
      <div
        onClick={() => {
          if (!isSame) {
            dispatch(
              setSong({
                albumArt: imageUrl,
                title: songName,
                audioUrl: songUrl,
                artist: artist,
                currentTime: preview.start,
                isPlaying: true,
                uri: uri,
              })
            )
          } else if (player.title === songName) {
            dispatch(setIsPlaying(!player.isPlaying))
          }
        }}
        className="min-h-[200px] relative  cursor-pointer w-[200px] h-[200px] rounded-lg overflow-hidden  group flex items-center transition-all duration-150 justify-center bg-slate-200 min-w-[200px] "
      >
        <Image
          className="w-full group-hover:scale-110 transition-all duration-700  h-full"
          src={imageUrl}
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          blurDataURL={imageUrl}
          alt="Album art"
        />

        {!isSame ? (
          <PlayCircle
            strokeWidth={1.5}
            className="text-white absolute group-hover:scale-[0.9] transition-all duration-300 "
            size={60}
          />
        ) : !player.isPlaying ? (
          <PlayCircle
            strokeWidth={1.5}
            className="text-white absolute group-hover:scale-[0.9] transition-all duration-300 "
            size={60}
          />
        ) : (
          <Pause
            className="text-white absolute group-hover:scale-[0.9] transition-all duration-300"
            size={60}
          />
        )}
      </div>
      <div className="flex flex-col justify-center w-full ml-4 space-y-2">
        <div className="flex items-center space-x-1">
          <Disc className="text-primary-blue-dark" size={14} />
          <p className="text-primary-blue-dark font-title">{songName}</p>
        </div>
        <div className="flex items-center space-x-1">
          <User className="text-gray-500" size={14} />
          <p className="text-xs text-gray-500">{artist}</p>
        </div>
        <div className="flex items-center space-x-1">
          <Music className="text-gray-500" size={14} />
          <p className="text-xs uppercase text-gray-500">{genres.join(', ')}</p>
        </div>
        <div className="flex items-center space-x-1">
          <Music className="text-gray-500" size={14} />
          <p className="text-xs uppercase text-gray-500">{songType}</p>
        </div>
        <div className="flex items-center space-x-1">
          <Calendar className="text-gray-500" size={14} />
          <p className="text-xs text-gray-500">
            Released Date:{' '}
            {releasedDate ? dayjs(releasedDate).format('DD/MM/YYYY') : 'N/A'}
          </p>
        </div>
        <div className="flex items-center space-x-1">
          <Music className="text-gray-500" size={14} />
          <p className="text-xs text-gray-500">
            Released Under: {label || 'Self Release'}
          </p>
        </div>
      </div>
    </div>
  )
}
