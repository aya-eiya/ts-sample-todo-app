import '../../styles/globals.css'

import { Provider } from 'react-redux'
import rootStore from './stores'

const MyApp = ({
  Component,
  pageProps,
}: {
  Component: React.ElementType<unknown>
  pageProps: unknown
}): JSX.Element => (
  <Provider store={rootStore}>
    <Component {...pageProps} />
  </Provider>
)
export default MyApp
