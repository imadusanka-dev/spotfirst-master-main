import React, { useEffect, useState } from 'react'
import { TRACK_API } from 'data'
import { Track } from 'core/types'
import Image from 'next/legacy/image'
const TopTenTracks = () => {
  const [tracks, setTracks] = useState<Track[]>([])

  useEffect(() => {
    TRACK_API.getTopTenTracks()
      .then((response) => {
        setTracks(response?.payload)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <div className="px-4 py-4">
      <div>
        <p className="text-sm text-gray-700">Top 10 Tracks of the week</p>
        <ul className="mt-4 max-h-[300px]  overflow-y-scroll">
          {tracks?.map((track) => {
            return (
              <a
                key={track._id}
                href={track.songUrl}
                target="_blank"
                rel="noreferrer"
              >
                <li className="flex items-center px-2 py-1 space-x-2 transition-all rounded-md cursor-pointer hover:bg-gray-50">
                  <Image
                    src={track.imageUrl}
                    width={30}
                    height={30}
                    className={'w-6 h-6 rounded-full bg-primary-blue'}
                  />
                  <p className="text-xs">{track.trackTitle}</p>
                </li>
              </a>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default TopTenTracks
