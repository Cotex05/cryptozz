import Head from 'next/head'
import styles from '../styles/Home.module.css'
import CoinGecko from 'coingecko-api';
const coinGeckoClient = new CoinGecko();

export default function Home(props) {
  const { data } = props.result;

  const formatPercent = number =>
    `${new Number(number).toFixed(2)}%`

  const formatDollar = (number, maximumSignificantDigits) =>
    new Intl.NumberFormat(
      'en-US',
      {
        style: 'currency',
        currency: 'USD',
        maximumSignificantDigits
      })
      .format(number);

  return (

    <div className={styles.containerfluid + " " + styles.background}>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>Cryptozz</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>
      </Head>

      <nav className="navbar navbar-dark">
        <div className="container-fluid">
          <h1 className={styles.toph}><u>Cryptozz</u></h1>
        </div>
      </nav>

      <img src="/btc.png" height="50px" width="50px" className={styles.cube} />

      <div className={styles.cube}></div>
      <img src="/xrp.png" height="50px" width="50px" className={styles.cube} />
      <img src="/ltc.png" height="50px" width="50px" className={styles.cube} />
      <img src="/ada.png" height="50px" width="50px" className={styles.cube} />
      <img src="/bnb.png" height="50px" width="50px" className={styles.cube} />
      <img src="/eth.png" height="50px" width="50px" className={styles.cube} />
      <img src="/link.png" height="50px" width="50px" className={styles.cube} />

      <section className={styles.glass}>
        <div className="container-sm my-5">
          <table className='table table-dark table-striped table-sm'>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>24H Change </th>
                <th>Price</th>
                <th>Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {data.map(coin => (
                <tr key={coin.id}>
                  <td>
                    <img src={coin.image}
                      style={{ width: 25, height: 25, marginRight: 10 }} />
                    {coin.symbol.toUpperCase()}</td>
                  <td>
                    <span className={coin.price_change_percentage_24h > 0 ? (
                      'text-success') : 'text-danger'}
                    >
                      {formatPercent(coin.price_change_percentage_24h)}
                    </span>
                  </td>
                  <td>{formatDollar(coin.current_price, 20)}</td>
                  <td>{formatDollar(coin.market_cap, 12)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>

  )
}

export async function getServerSideProps(context) {

  const params = {
    order: CoinGecko.ORDER.MARKET_CAP_DESC
  }

  const result = await coinGeckoClient.coins.markets({ params });

  return {
    props: {
      result
    }
  }
}
