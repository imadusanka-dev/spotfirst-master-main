import React from 'react'
import { ThemeProvider } from 'theme-ui'
import theme from 'theme'
import SEO from 'components/seo'
import Layout from 'components/layout'
import Banner from 'sections/banner'
import Security from 'sections/security'
import Dashboard from 'sections/dashboard'
import UltimateFeatures from 'sections/ultimate-features'

const LandingHomePage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <SEO title="SpotFirst" description="Collection of spotify songs" />
        <Banner />
        <Security />
        <Dashboard />
        <UltimateFeatures />
      </Layout>
    </ThemeProvider>
  )
}

LandingHomePage.public = true

export default LandingHomePage
