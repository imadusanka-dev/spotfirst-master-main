import { useAppDispatch, useAppSelector } from 'core/hooks/useRedux'
import AppLayout from 'core/layouts/AppLayout'
import { ROLE } from 'core/types'
import { ReactElement } from 'react'
import { Pause, PlayCircle } from 'react-feather'
import { setIsPlaying, setSong } from 'redux/slices/player'

const playlist = [
  {
    id: '1',
    trackTitle: 'Pasoori',
    artistName: 'Shae Gill, Ali Sath',
    imageUrl:
      'https://i.scdn.co/image/ab67616d00001e023f3d35703bdcd917dad51c4f',
    songUrl:
      'https://p.scdn.co/mp3-preview/88c67d6fadc0971cd8884b3f28d508723de9fa54?cid=104468da6c7e400da4d14acbaaf5301f',
    platform: 'spotify',
  },
  {
    id: '2',
    trackTitle: 'Lamb Of God - Laid To Rest',
    artistName: 'Lamb Of God',
    imageUrl: 'https://i1.sndcdn.com/artworks-000006510334-s8nlrp-t500x500.jpg',
    songUrl: 'https://soundcloud.com/dodshasten/lamb-of-god-laid-to-rest',
    platform: 'soundcloud',
  },
  {
    id: '3',
    trackTitle: 'Jalebi Baby',
    artistName: 'Tesher x Jason Derulo',
    imageUrl:
      'https://i.ytimg.com/an_webp/CTmKrwFu7wg/mqdefault_6s.webp?du=3000&sqp=COii0JYG&rs=AOn4CLCsVYo0ngRx6kwFey_AHl_ddA-b1g',
    songUrl: 'https://www.youtube.com/watch?v=CTmKrwFu7wg',
    platform: 'youtube',
  },
  {
    id: '4',
    trackTitle: 'BREAK MY SOUL',
    artistName: 'Beyoncé',
    imageUrl:
      'https://is5-ssl.mzstatic.com/image/thumb/Music112/v4/05/05/f3/0505f338-9873-feb4-af7f-27a470405e5f/196589246974.jpg/500x500bb.webp',
    songUrl:
      'https://music.apple.com/us/album/break-my-soul/1630005298?i=1630005854',
    platform: 'applemusic',
  },
]

const PlayerDemoPage = () => {
  const player = useAppSelector((state) => state.playerSlice)
  const dispatch = useAppDispatch()

  const setPlaySong = (i: any) =>
    dispatch(
      setSong({
        title: i.trackTitle,
        albumArt: i.imageUrl,
        artist: i.artistName,
        isPlaying: true,
        audioUrl: i.songUrl,
        currentTime: 0,
      })
    )

  return (
    <>
      <section className="max-w-5xl">
        <h1>Player Demo</h1>
        <div className="mt-4 flex flex-col space-y-3">
          {playlist.map((i) => {
            const isSame = player.title === i.trackTitle
            return (
              <div className="flex group rounded-lg overflow-hidden" key={i.id}>
                <button
                  onClick={() => {
                    if (!isSame) {
                      setPlaySong(i)
                    } else {
                      dispatch(setIsPlaying(!player.isPlaying))
                    }
                  }}
                  className="rounded-lg sele flex items-center justify-center overflow-hidden w-[100px] min-w-[100px] h-[100px] bg-primary-blue"
                >
                  <span className="absolute">
                    {!isSame ? (
                      <PlayCircle
                        strokeWidth={1.5}
                        className="text-white  group-hover:scale-[0.9] transition-all duration-300 "
                        size={60}
                      />
                    ) : !player.isPlaying ? (
                      <PlayCircle
                        strokeWidth={1.5}
                        className="text-white  group-hover:scale-[0.9] transition-all duration-300 "
                        size={60}
                      />
                    ) : (
                      <Pause
                        className="text-white  group-hover:scale-[0.9] transition-all duration-300"
                        size={60}
                      />
                    )}
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-full  object-cover h-full"
                    src={i.imageUrl}
                    alt={i.trackTitle}
                  />
                </button>
                <div className="p-4 group-hover:bg-slate-50 w-full">
                  <h4>{i.trackTitle}</h4>
                  <span className="text-slate-500 text-sm">{i.artistName}</span>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

PlayerDemoPage.getLayout = function getLayout(page: ReactElement, role: ROLE) {
  return <AppLayout role={role}>{page}</AppLayout>
}

export default PlayerDemoPage
