/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Flex, ThemeUIStyleObject } from 'theme-ui'
import Header from './NavHeader/header'
import Footer from './Footer/footer'

export default function Layout({ children }) {
  return (
    <Flex
      sx={{
        minHeight: '100vh',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Header />
      <main
        sx={{
          variant: 'layout.main',
        }}
      >
        {children}
      </main>
      <Footer sx={undefined} />
    </Flex>
  )
}
