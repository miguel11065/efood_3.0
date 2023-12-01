import { PulseLoader } from 'react-spinners'
import Header from '../../components/Header'
import ListaRestaurante from '../../components/ListaRestaurantes'
import { useGetRestaurantesQuery } from '../../services/api'
import Loader from '../../components/Loader'

export interface PratoLista {
  id: number
  foto: string
  nome: string
  descricao: string
  preco: number
  porcao: string
}
export type RestauranteLista = {
  id: number
  titulo: string
  destacado?: string
  tipo: string
  avaliacao: number
  descricao: string
  capa: string
  cardapio: PratoLista[]
}

const Home = () => {
  const { data: listaRestaurante, isLoading } = useGetRestaurantesQuery()

  if (listaRestaurante) {
    return (
      <>
        <Header />
        <ListaRestaurante restaurantes={listaRestaurante} />
      </>
    )
  }
  return <Loader />
}

export default Home
