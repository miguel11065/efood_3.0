import { RestauranteLista } from '../../pages/Home'
import { Imagem, NomeRestaurante, Tipos } from './styles'

type Props = {
  restBanner: RestauranteLista
}

const BannerProfile = ({ restBanner }: Props) => (
  <Imagem style={{ backgroundImage: `url(${restBanner.capa})` }}>
    <div className="container">
      <Tipos>{restBanner.tipo}</Tipos>
      <NomeRestaurante>{restBanner.titulo}</NomeRestaurante>
    </div>
  </Imagem>
)

export default BannerProfile
