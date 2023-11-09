import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import HeaderRestaurante from '../../components/HeaderRestaurante'
import HeroRestaurante from '../../components/HeroRestaurante'
import ListaPratos from '../../components/ListaPratos'
import { RestauranteLista } from '../Home'

const ProductPage = () => {
  const { id } = useParams()

  const [restaurante, setRestaurante] = useState<RestauranteLista>()

  useEffect(() => {
    fetch(`https://fake-api-tau.vercel.app/api/efood/restaurantes/${id}`)
      .then((res) => res.json())
      .then((res) => setRestaurante(res))
  }, [id])

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
