import Head from 'next/head';
import Router from 'next/router';

const Meta = props => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <link rel="shortcut icon" href="/static/favicon.png" />
    <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500,500i,700,900i&display=swap" rel="stylesheet" />
    <title>HvZ Universe</title>
    <script src = "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    {Router.router && Router.router.asPath == '/hvz-admin/pages' && (
      <link rel="stylesheet" type="text/css" href="/static/react-draft-wysiwyg.css" />
    )}
  </Head>
);

export default Meta;
