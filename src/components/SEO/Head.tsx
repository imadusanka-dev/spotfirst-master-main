import Head from 'next/head'
import { FC } from 'react'

interface SEOHeadProps {
  title: string
  description?: string
  url?: string
  image?: string
}

const SEOHead: FC<SEOHeadProps> = ({ title, description, url, image }) => {
  return (
    <>
      <Head>
        <title>{title ?? 'Spotfirst'} </title>

        <meta name="description" content={description} />

        <meta property="og:type" content="product" />

        <meta
          property="og:title"
          content={`${title ?? 'Spotfirst'}`}
          key="title"
        />

        <meta property="og:description" content={description} />

        {image && <meta property="og:image" content={image} />}

        <meta property="og:url" content={url} />

        <meta property="og:site_name" content="Spotfirst" />
      </Head>
    </>
  )
}

export default SEOHead
