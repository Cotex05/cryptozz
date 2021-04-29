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

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Righteous&display=swap" rel="stylesheet" />
      </Head>

      <nav className={styles.navbg + " navbar navbar-expand-md navbar-dark sticky-top"}>
        <div className="container-fluid">
          <h1 className={styles.headerFont + " mx-3"} href="/">Cryptozz</h1>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item mx-4 my-3">
                <a className="btn btn-primary" type="button" href="https://www.tradingview.com/chart/" target="_blank">Trading View</a>
              </li>
              <li className="nav-item mx-4 my-3">
                <a className="btn btn-dark" type="button" href="https://github.com/Cotex05/cryptozz" target="_blank">Github</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <img src="/btc.png" height="20px" width="20px" className={styles.bubble + " " + styles.x1} />

      <img src="/doge.png" height="20px" width="20px" className={styles.bubble + " " + styles.x2} />
      <img src="/xrp.png" height="20px" width="20px" className={styles.bubble + " " + styles.x3} />
      <img src="/ltc.png" height="20px" width="20px" className={styles.bubble + " " + styles.x4} />
      <img src="/ada.png" height="20px" width="20px" className={styles.bubble + " " + styles.x5} />
      <img src="/bnb.png" height="20px" width="20px" className={styles.bubble + " " + styles.x6} />
      <img src="/eth.png" height="20px" width="20px" className={styles.bubble + " " + styles.x7} />
      <img src="/link.png" height="20px" width="20px" className={styles.bubble + " " + styles.x8} />
      <img src="/btt.png" height="20px" width="20px" className={styles.bubble + " " + styles.x9} />
      <img src="/usd.png" height="20px" width="20px" className={styles.bubble + " " + styles.x10} />

      <section className={styles.glass}>
        <div className="container-sm my-1">
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

      <footer className="my-5 pt-5 text-center text-large">
        <p className={styles.footertext + " mb-1"}>Developed 👨‍💻 by cotex</p>
      </footer>

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
