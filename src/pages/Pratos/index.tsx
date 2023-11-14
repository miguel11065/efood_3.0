import { useParams } from 'react-router-dom'
import HeaderRestaurante from '../../components/HeaderRestaurante'
import HeroRestaurante from '../../components/HeroRestaurante'
import ListaPratos from '../../components/ListaPratos'
import { useGetPratosQuery } from '../../services/api'

const ProductPage = () => {
  const { id } = useParams()

  const { data: restaurante } = useGetPratosQuery(id!)

  if (!restaurante) {
    return <h3>Carregando...</h3>
  }
  return (
    <>
      <HeaderRestaurante />
      <HeroRestaurante restBanner={restaurante} />
      <ListaPratos items={restaurante.cardapio} />
    </>
  )
}

export default ProductPage
