import classNames from 'classnames'
import { COLORS } from 'core/constants'
import { useState } from 'react'
import { motion } from 'framer-motion'
import CuratorRegisterForm from 'modules/auth/register/components/CuratorRegisterForm'
import ArtistRegisterForm from 'modules/auth/register/components/ArtistRegisterForm'
import InfluencerRegisterForm from 'modules/auth/register/components/InfluencerRegisterForm'
import LabelRegisterForm from 'modules/auth/register/components/LabelRegisterForm'
import { Element, scroller } from 'react-scroll'
import AuthHeader from 'components/Headers/AuthHeader'

const registerTypes = [
  {
    title: 'I want to Promote',
    description:
      '"I want to promote music Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"',
    color: COLORS['primary-blue'].DEFAULT,
    className: 'register-type-box-gradient-1',
  },
  {
    title: "I'm a Curator",
    description:
      '"Curator text here Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    color: COLORS['primary-green'].DEFAULT,
    className: 'register-type-box-gradient-2',
  },
  {
    title: "I'm an Influencer",
    description:
      '"Influencer text here Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua\'',
    color: COLORS['primary-magenta'].DEFAULT,
    className: 'register-type-box-gradient-3',
  },
  {
    title: "We're a Label",
    description:
      '"Label text here Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua\'',
    color: COLORS['primary-yellow'].DEFAULT,
    className: 'register-type-box-gradient-4',
  },
]

const RegisterPage = () => {
  const [selectedType, setSelectedType] = useState(0)

  return (
    <div className="login-bg dark:bg-slate-800">
      <AuthHeader />

      <section className="container pt-16 pb-10 mx-auto">
        <div className="pb-10 mx-auto text-center">
          <h3 className="text-2xl font-light">
            Welcome to{' '}
            <span className="font-medium text-primary-blue">SpotFirst</span>
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-8 px-5 lg:px-20 lg:grid-cols-4">
          {registerTypes.map((item, index) => {
            const isActive = selectedType === index
            return (
              <motion.div
                transition={{
                  duration: 0.1,
                }}
                animate={{
                  scale: isActive ? 0.98 : 1,
                }}
                whileTap={{
                  scale: isActive ? 0.98 : 1,
                }}
                onClick={() => {
                  setSelectedType(index)

                  setTimeout(() => {
                    scroller.scrollTo('scroll-item', {
                      duration: 600,
                      delay: 100,
                      smooth: true,
                      offset: -100,
                    })
                  }, 400)
                }}
                key={index}
                className={classNames(
                  `${isActive ? 'shadow-normal' : 'shadow-light'}`,
                  'p-8 transition-all relative bg-white dark:bg-slate-900 duration-150 ease-in cursor-pointer overflow-hidden hover:shadow-normal shadow-light rounded-xl'
                )}
              >
                {isActive && (
                  <motion.span
                    initial={{
                      opacity: 0,
                      scale: 0,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    className={classNames(
                      item.className,
                      'w-full h-full absolute top-0 left-0 -z-10 '
                    )}
                  ></motion.span>
                )}
                <div className="space-y-4 text-center">
                  <h3
                    style={{ color: isActive ? '#fff' : item.color }}
                    className={classNames('text-xl font-semibold ')}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={classNames(
                      `${isActive ? 'text-white' : 'text-slate-400'}`,
                      'text-sm'
                    )}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      <section className="container pb-40 mx-auto">
        <Element name="scroll-item" />
        <div className="lg:px-20">
          {selectedType === 0 && (
            <div>
              <ArtistRegisterForm />
            </div>
          )}
          {selectedType === 1 && (
            <div>
              <CuratorRegisterForm />
            </div>
          )}
          {selectedType === 2 && (
            <div>
              <InfluencerRegisterForm />
            </div>
          )}
          {selectedType === 3 && (
            <div>
              <LabelRegisterForm />
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

RegisterPage.public = true

export default RegisterPage
