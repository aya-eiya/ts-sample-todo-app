import "../styles/globals.css";

const _app = ({ Component, pageProps }: {
  Component: React.ElementType<Object>;
  pageProps: Object
}): JSX.Element => <Component {...pageProps} />;

export default _app;