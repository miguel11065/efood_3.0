import { RestauranteLista } from '../../pages/Home'
import { Lista } from './styles'
import Restaurante from '../Restaurante'

type Props = {
  restaurantes: RestauranteLista[]
}

const ListaRestaurante = ({ restaurantes }: Props) => {
  const getTags = (restaurante: RestauranteLista) => {
    const tags = []
    if (restaurante.destacado) {
      tags.push('Destaque da semana')
    }
    if (restaurante.tipo) {
      tags.push(restaurante.tipo)
    }
    return tags
  }

  return (
    <div className="container">
      <Lista>
        {restaurantes.map((restaurante) => (
          <li key={restaurante.id}>
            <Restaurante
              id={restaurante.id}
              image={restaurante.capa}
              infos={getTags(restaurante)}
              title={restaurante.titulo}
              rate={restaurante.avaliacao}
              description={restaurante.descricao}
            />
          </li>
        ))}
      </Lista>
    </div>
  )
}

export default ListaRestaurante
