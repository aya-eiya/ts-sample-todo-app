import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: {
  Component: React.ElementType<Object>;
  pageProps: Object
}): JSX.Element => <Component {...pageProps} />;

export default MyApp;