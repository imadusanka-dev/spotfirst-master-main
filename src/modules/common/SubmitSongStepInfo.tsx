import Image from 'next/legacy/image'
import Link from 'next/link'

const SubmitSongStepInfo = () => {
  return (
    <section className="px-8 pt-8 pb-10 mt-5 rounded-md shadow-normal">
      <div>
        <h4 className="font-title text-lg">
          Follow these easy steps and keep your ratings high!
        </h4>
      </div>

      <div className="grid grid-cols-3 gap-14 mt-8">
        <div>
          {/* <div className=" max-w-[50px] w-[50px] min-h-[50px] bg-primary-blue rounded-full"></div> */}
          <div className="relative">
            <span className="w-[40px] flex items-center justify-center font-title text-lg absolute top-0 right-0  h-[40px] min-w-[40px] bg-primary-blue rounded-full text-white">
              1
            </span>
            <div className="relative min-h-[200px] w-10/12 h-[200px] shadow-light rounded-lg">
              <Image
                className=" w-full min-h-[200px] h-[200px]"
                src="/images/step-1-1.png"
                alt="Step 1"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
          <h4 className="mt-4 text-base">Drop your song</h4>
          <p className="mt-2 text-sm text-gray-500">
            Hit ‘Let’s Submit’ in the menu and share your musical masterpiece*
            with the world by using our quick and easy submission form
          </p>
        </div>
        <div>
          {/* <div className=" max-w-[50px] w-[50px] min-h-[50px] bg-primary-blue rounded-full"></div> */}
          <div className="relative">
            <span className="w-[40px] flex items-center justify-center font-title text-lg absolute top-0 right-0  h-[40px] min-w-[40px] bg-primary-blue rounded-full text-white">
              2
            </span>
            <div className="relative min-h-[200px] w-10/12 h-[200px] shadow-light rounded-lg">
              <Image
                className=" w-full min-h-[200px] h-[200px]"
                src="/images/step-2.png"
                alt="Step 2"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
          <h4 className="mt-4 text-base">Tell us more</h4>
          <p className="mt-2 text-sm text-gray-500">
            Mention everything we need to know about your song such as title,
            genre, and of course, your epic artist name.
          </p>
        </div>
        <div>
          <div className="relative">
            <span className="w-[40px] flex items-center justify-center font-title text-lg absolute top-0 right-0  h-[40px] min-w-[40px] bg-primary-blue rounded-full text-white">
              3
            </span>
            <div className="relative min-h-[200px] w-10/12 h-[200px] shadow-light rounded-lg">
              <Image
                className=" w-full min-h-[200px] h-[200px]"
                src="/images/step-3.png"
                alt="Step 3"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
          <h4 className="mt-4 text-base">Select your curators</h4>
          <p className="mt-2 text-sm text-gray-500">
            Last, but definitely not least, pick out the curators that could
            promote your track best.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <Link
          href={'/artist/submit'}
          className="text-base font-title px-6 py-3 transition-all hover:bg-primary-blue-dark bg-primary-blue text-white rounded-full"
        >
          Submit a Song
        </Link>
      </div>
    </section>
  )
}

export { SubmitSongStepInfo }
