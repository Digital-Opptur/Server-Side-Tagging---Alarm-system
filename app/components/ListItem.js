import styles from '../styles/ListItem.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faCoffee, faRefresh, faWarning } from '@fortawesome/free-solid-svg-icons'


import moment from 'moment'
import Link from 'next/link';

const ListItem = (item) => {
    /**
     * TODO: Add refresh function for site based on db._id
     */
    return(
        <div className={styles.item}>
            <div className={styles.itemWrapper}>
                <FontAwesomeIcon className={styles.button} icon={faRefresh} style={{height: 16}} />
                <p style={{marginLeft: 10}}>{moment(item?.ts).format('HH:mm:ss')}</p> 
                <p style={{marginLeft: 20}}>{item?.name}</p>
            </div>
            <div className={styles.itemWrapper}>
                <p  style={{marginRight: 10}}>
                    <Link href={`${item?.url}/healthz`}className={styles.itemUrl} target="_blank" passHref>
                        {item?.url}
                    </Link>
                </p>
                {item.up ?
                    <FontAwesomeIcon icon={faCheckCircle} style={{height: 16, color: '#53d769'}} />
                    :
                    <FontAwesomeIcon icon={faWarning} style={{height: 16, color: '#fc3d39'}} />
                }
            </div>
        </div>
    )
}

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

export default ListItem;