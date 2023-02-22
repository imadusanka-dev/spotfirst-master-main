import Header from 'components/Headers/Header'
import BottomPlayer from 'components/Player/BottomPlayer'
const BottomSpotifyPlayer = dynamic(
  () => import('components/Player/BottomSpotifyPlayer'),
  {
    ssr: false,
  }
)
import SideNav from 'components/SideNav/SideNav'
import { ROLE } from 'core/types'
import { FC, useState } from 'react'
import dynamic from 'next/dynamic'

interface AppLayoutProps {
  children?: any
  role?: ROLE
}

const AppLayout: FC<AppLayoutProps> = ({ children, role }) => {
  const showNavBarInitially =
    typeof window !== 'undefined' ? window?.screen.width > 1024 : true
  const [showNavBar, setShowNavBar] = useState(showNavBarInitially)

  return (
    <main className="w-screen scrollbar-hide h-screen transition-all duration-100 bg-white dark:bg-slate-800">
      <div className="flex w-full">
        <aside className="h-screen">
          <SideNav
            role={role}
            isVisible={showNavBar}
            sideNavToggleCallback={() => setShowNavBar(!showNavBar)}
          />
        </aside>
        <aside className="flex flex-col w-full h-screen">
          <Header
            role={role}
            isVisible={showNavBar}
            sideNavToggleCallback={() => setShowNavBar(!showNavBar)}
          />
          <section className="px-5 py-5 mb-20 app-layout-scroll-view">
            {children}
          </section>
        </aside>
      </div>
      <aside>
        {/*<BottomPlayer />*/}
        <BottomSpotifyPlayer />
      </aside>
    </main>
  )
}

export default AppLayout
