import { ThemeProvider, ThemeProviderProps } from 'next-themes'
import { wrapper } from 'redux/store'
import { AuthWrapper } from 'modules/auth/AuthWrapper'
import { PublicWrapper } from 'modules/auth/PublicWrapper'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import '../styles/global.scss'
import { useAppSelector } from 'core/hooks/useRedux'
import { AuthStates } from 'redux/slices/auth'
import Home from 'pages'
import { AppPropsWithLayout } from 'core/types/next'
import 'rc-tabs/assets/index.css'
import 'rc-drawer/assets/index.css'
import '../assets/css/react-slick.css'
import 'react-modal-video/css/modal-video.min.css'

// theme configuration
const themeConfig: ThemeProviderProps = {
  defaultTheme: 'light',
  enableSystem: true,
  attribute: 'class',
  enableColorScheme: true,
  themes: ['light', 'dark'],
  disableTransitionOnChange: false,
}

const App = ({ Component, pageProps, router }) => {
  const { me, loading } = useAppSelector((state) => state.authReducer)

  let allowed = true

  // Without role allow all authorized users
  if (loading === AuthStates.SUCCESS && me) {
    if (
      router.pathname.startsWith('/artist') &&
      me.primaryRole !== 'ROLE_ARTIST'
    ) {
      allowed = false
    } else if (
      router.pathname.startsWith('/label') &&
      me.primaryRole !== 'ROLE_LABEL'
    ) {
      allowed = false
    } else if (
      router.pathname.startsWith('/admin') &&
      me.primaryRole !== 'ROLE_ADMIN'
    ) {
      allowed = false
    }
  }

  // Use the layout defined at the page level, if available
  const getLayout =
    Component.getLayout ??
    ((page) => {
      return page
    })
  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>

      <ThemeProvider {...themeConfig}>
        {!Component.public ? (
          <AuthWrapper>
            {loading === AuthStates.SUCCESS &&
              me &&
              (allowed ? (
                getLayout(
                  <Component role={me.primaryRole} {...pageProps} />,
                  me.primaryRole
                )
              ) : (
                <Home role={me.primaryRole} />
              ))}
          </AuthWrapper>
        ) : (
          <PublicWrapper>
            {getLayout(<Component {...pageProps} />)}
          </PublicWrapper>
        )}
      </ThemeProvider>

      <Toaster />
    </>
  )
}

export default wrapper.withRedux(App)
