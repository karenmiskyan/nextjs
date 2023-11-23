import {Html, Head, Main, NextScript} from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                {/*<link rel='manifest' href='/manifest.json' />*/}
                <link rel='apple-touch-icon' href='/assets/images/koalogo.png'></link>
                <meta name='theme-color' content='#fff'/>
                {/*<script src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCoVE9yQ3Y_48ThEQV7bYtdMxSXeBZ72AU&libraries=places`}></script>*/}
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
            </Head>
            <body>
            <Main/>
            <NextScript/>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-EJ0LRGKXYM"></script>
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-EJ0LRGKXYM');
                gtag('set', {'user_id': ''});
                gtag('set', 'dimension1','');
              `,
                }}
            />
            </body>
        </Html>
    );
}
