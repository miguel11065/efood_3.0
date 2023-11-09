import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import ListaRestaurante from '../../components/ListaRestaurantes'

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
  const [listaRestaurante, setListaRestaurante] = useState<RestauranteLista[]>(
    []
  )

  useEffect(() => {
    fetch('https://fake-api-tau.vercel.app/api/efood/restaurantes')
      .then((res) => res.json())
      .then((res) => setListaRestaurante(res))
  }, [])
  return (
    <>
      <Header />
      <ListaRestaurante restaurantes={listaRestaurante} />
    </>
  )
}

export default Home
