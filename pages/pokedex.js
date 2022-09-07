import styles from '../styles/Home.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Color from 'color-thief-react';
import Loader from '../src/componets/loader';
import pokemonName from 'pokemon';
import Head from 'next/head';

export default function Home() {
    const [defaultPokemon] = useState("mewtwo");
    const [searchPokemon, setSearchPokemon] = useState("");
    const [chinesePokemon, setChinesePokemon] = useState("");
    const [pokemon, setPokemon] = useState([]);
    const [loadingPage, setLoadingPage] = useState(true);
    const IMAGE_URI = pokemon.sprites?.other["official-artwork"].front_default;

    const getPokemon = (name) => {
        setLoadingPage(true)
        axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then((res) => {
                setPokemon(res.data)
                setLoadingPage(false)
                setChinesePokemon(pokemonName.getName(res.data.id || 143, "ja"))
            })
            .catch(() => {
                alert(`Pokemon não encontrado.\n\nRedirecionando para: ${defaultPokemon}`)
                getPokemon(defaultPokemon)
            })
            .finally(() => {
                setSearchPokemon("")
            })
    }

    const handleSearchPokemon = () => {
        getPokemon(searchPokemon.toLocaleLowerCase())
    }

    useEffect(() => {
        getPokemon(defaultPokemon)
    }, [])

    if (loadingPage) {
        return <Loader />
    }

    return (
        <Color src={IMAGE_URI} crossOrigin="anonymous" format="hex">
            {({ data, loading }) => {
                if (loading) return <Loader />


                return (
                    <div className={styles.container} style={{ backgroundColor: data }}>
                        <Head>
                            <title>Pokedex</title>
                            <meta name="description" content="Pokedex" />
                            <link rel="icon" href="favicon.ico" />
                        </Head>
                        <div className={styles.header}>
                            <span className={styles.titleId}>#{pokemon.id}</span>
                            <span className={styles.title}>{pokemon.name}</span>
                        </div>
                        <div className={styles.main}>
                            <div className={styles.leftSide}>
                                <div className={styles.infoLeftSide}>
                                    <span className={styles.japaneseText}>
                                        {chinesePokemon}
                                    </span>
                                    <span className={styles.fontInfo}>Height: {pokemon.height}m</span>
                                    <span className={styles.fontInfo}>Weight: {pokemon.weight}kg</span>
                                </div>
                                <div>
                                    <Image src={IMAGE_URI} width={400} height={400} />
                                </div>
                            </div>

                            <div className={styles.rightSide}>
                                <span className={styles.title}>Base Stats</span>

                                <div className={styles.infoPokemon}>
                                    {pokemon.stats.map((status, index) => (
                                        <div className={styles.cardInfo} key={index}>
                                            {status.stat.name.toUpperCase()}: {status.base_stat}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <br />
                        <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "2rem" }}>
                            <input className={styles.searchButton} value={searchPokemon} placeholder={"snorlax"} onChange={(e) => setSearchPokemon(e.target.value)} />
                            <button className={styles.searchButtonClick} onClick={() => {
                                if (searchPokemon) handleSearchPokemon()
                            }}>Go!</button>
                        </form>

                    </div>
                )
            }}
        </Color>
    )
}