import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import { fetchSites } from '../libs/api';
import { useRouter } from 'next/router';
import ListItem from '../components/ListItem';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRefresh } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  const router = useRouter();

  const [sites, setSites] = useState()

  const init = async () => {
    // run asynchronous tasks here
    let response = await fetchSites();
    setSites(response)
};

  useEffect(() => {
    init();
  }, [router])



  return (
    <div className={styles.container}>
      <Head>
        <title>Home | S.A.N.S</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title} style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
          Digital Opptur 
          <div style={{display: 'flex', flexDirection: 'column', paddingLeft: 10}}>
            <a href="https://nextjs.org"style={{fontSize: 12, margin: 0}}>Server Alarm Notification System</a>
            <a href="https://nextjs.org">S.A.N.S!</a>
          </div>
        </h1>
        {/* <h2 className={styles.title} style={{margin: 0, fontSize: 14 }}>
        <a href="https://nextjs.org">Server Alarm Notification System</a>
        </h2> */}
        {/* <p className={styles.description}>
          Get started by editing <code>pages/index.js</code>
        </p> */}
        <div style={{width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
          {sites ? 
            sites.map(site => (
              // <div className=''>{site.name}</div>
              <ListItem {...site} />
            ))
          :
            // <p>Loading...</p>
            // <img src="https://cdn.dribbble.com/users/3742211/screenshots/9195657/media/6796a544d6f9ef1293d8d8d9e60d38d5.gif" height={50} />
            <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <FontAwesomeIcon onClick={() => {}} icon={faRefresh} style={{height: 22}} className={styles.spinner} />
            </div>
          }
        </div>

        {/* <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div> */}
        <footer>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Developed by Stian W. Instebø
            {/* <img src="/vercel.svg" alt="Vercel" className={styles.logo} /> */}
          </a>
        </footer>
      </main>

      
      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
