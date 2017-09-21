import Reactotron, { trackGlobalErrors } from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'
import sagaPlugin from 'reactotron-redux-saga'

  // then add it to the plugin list
Reactotron
  .configure({ name: 'Bagger' })
  .use(trackGlobalErrors()) // <--- here we go!
  .use(reactotronRedux())
  .use(sagaPlugin()) //  <- here i am!
  .connect() //Don't forget about me!