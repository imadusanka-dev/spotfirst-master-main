import classNames from 'classnames'
import AppLayout from 'core/layouts/AppLayout'
import { ROLE } from 'core/types'
import { FC, ReactElement } from 'react'

const MessagesInbox = () => {
  return (
    <div className="relative mx-auto md:px-8 xl:px-0">
      <section className="mt-4">
        <div className="flex space-x-4">
          <div
            style={{ minHeight: '10vh' }}
            className="shadow-normal  px-5 py-5 mb-5 rounded-lg h-full w-12/12"
          >
            <div>
              <h4 className="text-xl text-slate-800 dark:text-white">
                ABOUT US
              </h4>
            </div>
            <p className="text-md text-gray-500">
              Welcome to SpotFirst! Your go-to submission platform to make your
              high quality music stand out or find the best new releases. Are
              you a promising artist? Or a curator who opens doors? Then we
              believe you deserve a fair chance. Join our community and bring
              the sound of the future to the rest of the world!
            </p>
          </div>
        </div>

        <div className="flex space-x-4">
          <div
            style={{ minHeight: '35vh' }}
            className="shadow-normal  px-5 py-5 rounded-lg h-full w-6/12"
          >
            <div>
              <h4 className="text-xl text-slate-800 dark:text-white">
                Why Spotfirst?
              </h4>
            </div>
            <p className="text-md text-gray-500">
              It is no secret that getting your music out there is difficult.
              Spotify mentions that 60.000 songs are released on their platform
              every day. Simple proof that getting your song noticed by
              influential tastemakers is no easy task. At Spotfirst, we are
              building a bridge from musicians to promoters that every musical
              talent can access. We value artists that are willing to invest in
              their musical career. This is why Spotfirst is only available for
              artists and promoters upon personal invitation. Making our
              platform the meeting place for music and tastemakers that could
              change the world. Did you not receive an invitation yet, but do
              you feel you deserve a spot at Spotfirst? Let us know by filling
              out the request registration form and we will review your profile.
            </p>
          </div>
          <div
            style={{ minHeight: '35vh' }}
            className="shadow-normal  px-5 py-5 rounded-lg h-full w-6/12"
          >
            <div>
              <h4 className="text-xl text-slate-800 dark:text-white">
                How we work
              </h4>
            </div>
            <p className="text-md text-gray-500">
              Spotfirst is made by and for music professionals. Our platform
              connects artists, labels, promoters, influencers and other
              tastemakers that create and boost the best music out there. Are
              you an artist? Sign up to Spotfirst, upload your song and use your
              tokens to pitch your track. Simple! Our quick and easy form helps
              you submit your release within minutes. Afterwards, you decide who
              gets to listen by selecting relevant curators. Pitching costs
              range from 1 token for a Normal Submission to 10 tokens for Super
              Submissions. You can easily store and manage your tokens in your
              digital wallet. We are here for the music. That is why Spotfirst
              guarantees your pitch will be listened to for at least 30 seconds
              and receive proper feedback within 48 hours. This includes a
              positive response to the music or useful tips for the future. One
              way or the other, it is information that helps artists excel.
            </p>
          </div>
        </div>
        <div className="flex space-x-4">
          <div
            style={{ minHeight: '10vh' }}
            className="shadow-normal  px-5 py-5 mt-5 rounded-lg h-full w-12/12"
          >
            <div>
              <h4 className="text-xl text-slate-800 dark:text-white">
                Contact us
              </h4>
            </div>
            <p className="text-md text-gray-500">
              Do you have a question? Or any idea on how to improve our
              platform? We are eager to hear you out! Let us know by using the
              below form. Want to join our platform, but did not receive an
              invitation? If there was a long-list of musical diamonds in the
              rough, we would love to have it. So, we are sorry if we did not
              find you just yet! Tell us more about you in our request
              registration form. We will review your application and get back to
              you as soon as possible.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

interface ChatItemProps {
  online?: boolean
}

const ChatItem: FC<ChatItemProps> = ({ online = false }) => (
  <div className="flex rounded-lg transition-all px-2 cursor-pointer py-2 hover:bg-gray-50 space-x-2">
    <div className="min-w-[40px] relative w-[40px] h-[40px] rounded-full bg-primary-blue">
      <span
        className={classNames(
          online ? 'bg-primary-green' : 'bg-red-500',
          'w-3 h-3  rounded-full absolute select-none top-[-2px] border-2 border-white right-[-2px]'
        )}
      ></span>
    </div>
    <div className="flex flex-col">
      <span className="text-sm">Profile Name</span>
      <span className="text-[12px] text-gray-500">Be the change</span>
    </div>
  </div>
)

MessagesInbox.getLayout = function getLayout(page: ReactElement, role: ROLE) {
  return <AppLayout role={role}>{page}</AppLayout>
}

export default MessagesInbox
