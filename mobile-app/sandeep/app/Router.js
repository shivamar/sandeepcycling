import { StackNavigator } from 'react-navigation'

import Main from './views/Main'
import ParkDetail from './views/ParkDetail'

const BaseNavigation = StackNavigator({
  Main: { screen: Main },
  ParkDetail: { screen: ParkDetail }
})

export default BaseNavigation
