/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextComponentType, NextPage, NextPageContext } from 'next'
import { PublicComponentConfig } from './PublicComponentConfig'
import { ROLE } from 'core/types'
import { ReactElement, ReactNode } from 'react'
import { AppProps } from 'next/app'

export type NextComponentWithAuth = NextComponentType<
  NextPageContext,
  any,
  {}
> &
  Partial<PublicComponentConfig>

export type NextPageWithLayout = NextPage &
  NextComponentWithAuth & {
    getLayout?: (page: ReactElement, role?: ROLE) => ReactNode
  }

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
