import React from 'react'
import { Provider } from 'react-redux'

import Store from './Store'
import BaseNavigation from './Router'

const Root = () => (
  <Provider store={Store}>
    <BaseNavigation />
  </Provider>
)

export default Root
