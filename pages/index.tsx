import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'
import Modal from '../components/Modal'
import Row from '../components/Row'
import { Movie } from '../typings'
import requests from '../utils/requests'
import { useRecoilValue } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import useAuth from '../hooks/useAuth'
import Plans from '../components/Plans'
import { getProducts, Product } from '@stripe/firestore-stripe-payments'
import payments from '../lib/stripe'

interface Props {
  netflixOriginals: Movie[] //you can also do this [Movie]
  trendingNow: Movie[]
  topRated: Movie[]
  actionMovies: Movie[]
  comedyMovies: Movie[]
  horrorMovies: Movie[]
  romanceMovies: Movie[]
  documentaries: Movie[]
  products: Product[]
}

export default function Home({ 
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
  products

} : Props) {

  const showModal = useRecoilValue(modalState)
  const movie = useRecoilValue(movieState)
  // console.log(netflixOriginals) - how to get the types
  const { loading } = useAuth()
  const subscription = false

  if (loading || subscription === null) return null

  if (!subscription) return <Plans products={products} />

  return (
    <div className='relative h-screen bg-gradient-to-b lg:h-[140vh]'>
      <Head>
        <title>Home - Netflix</title>
      </Head>

      <Header />
      <main className='relative pl-4 pb-24 lg:space-y-24 lg:pl-16 lg:pt-24'>
        <Banner netflixOriginals={netflixOriginals} />
        <section className='md:space-y-24'>
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} />
          {/* My List */}
          {/* {list.length > 0 && <Row title="My List" movies={list} />} */}

          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
        </section>
      </main>

      {showModal && <Modal/>}

    </div>
  )
}

export const getServerSideProps = async () => {

  const products= await getProducts(payments, {
    includePrices: true,
    activeOnly: true
  })
    .then((res) => res)
    .catch((error) => console.log(error.message))


  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ])

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
      products,
    },
  }
}