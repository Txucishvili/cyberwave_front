import React from 'react';

const HTML = (props) => {
  const {css, js, html, head, initState} = props;

  // console.log('props', js);

  return(
        <html>
          <head>
          {css.map(css => <link key={css} rel="stylesheet" href={`/${css}`} />)}
          </head>
          <body>
          <div> 
          <div
          id="root"
          dangerouslySetInnerHTML={{
            __html: html
          }}
        />
        {js.map(js => <script key={js} src={`/${js}`} />)}

         {/* <script src="/main.js"></script>
         <script src="/runtimechunk~main.js"></script>
         <script src="/vendor.js"></script> */}
         </div>
          </body>
        </html>
  )
};

export default HTML;