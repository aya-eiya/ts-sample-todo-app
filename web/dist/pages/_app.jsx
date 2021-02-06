import '../../styles/globals.css';
import { Provider } from 'react-redux';
import rootStore from './stores';
var MyApp = function (_a) {
    var Component = _a.Component, pageProps = _a.pageProps;
    return (<Provider store={rootStore}>
    <Component {...pageProps}/>
  </Provider>);
};
export default MyApp;
