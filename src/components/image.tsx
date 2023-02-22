import React from 'react'
// import { Image as Img } from 'theme-ui';
import Image from 'next/legacy/image'

export default function Images({ src, ...rest }) {
  return <Image src={src} {...rest} />
}
