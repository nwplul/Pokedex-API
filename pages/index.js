import Head from "next/head";
import Link from "next/link";
import styles from '../styles/Home.module.css';
import bg from '../public/pokewallpaper.jpg';
import Image from "next/image";


export default function IndexPage() {
  return (
    <div className={styles.teste}>
      <div>
        <Image src={bg} />
      </div>
      <div className={styles.mainPage}>

        <Head>
          <title>Pokedex</title>
          <meta name="description" content="Pokedex" />
          <link rel="icon" href="favicon.ico" />
        </Head>

        <h1>Bem vindo a Pokedex!</h1>
        <Link href="http://localhost:3000/pokedex">
          <a className={styles.mainPageLink}>Go!</a>
        </Link>

      </div >
    </div>


  )
}