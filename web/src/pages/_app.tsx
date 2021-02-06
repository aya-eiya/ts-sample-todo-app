import '../../styles/globals.css'

import { Provider } from 'react-redux'
import rootStore from './store'

const MyApp = ({
  Component,
  pageProps,
}: {
  Component: React.ElementType<never>
  pageProps: never
}): JSX.Element => (
  <Provider store={rootStore}>
    <Component {...pageProps} />
  </Provider>
)
export default MyApp
