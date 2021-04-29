import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class RootDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
          <meta name="description" content="Dev.log" />
          <meta name="keywords" content="blog,react,antd,webpack,css,javascript" />
          <link rel="manifest" href="/static/manifest.json" />
          <link rel="shortcut icon" href="/static/favicon.ico" /> */}
          <title>외출 난이도</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}