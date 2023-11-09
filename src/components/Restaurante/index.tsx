import { Link } from 'react-router-dom'
import estrela from '../../assets/images/estrela.svg'
import Tag from '../Tag'

import {
  Avaliacao,
  AvaliacaoContainer,
  Botao,
  Card,
  CardContainer,
  Descricao,
  Imagem,
  Infos,
  Titulo,
  TituloContainer
} from './styles'

type Props = {
  id: number
  image: string
  infos: string[]
  title: string
  rate: number
  description: string
}

const Restaurante = ({ id, image, infos, title, rate, description }: Props) => {
  const getDescricso = (description: string) => {
    if (description.length > 190) {
      return description.slice(0, 195) + '...'
    }
  }
  return (
    <Card>
      <Imagem src={image} />
      <Infos>
        {infos.map((info) => (
          <Tag key={info}>{info}</Tag>
        ))}
      </Infos>
      <CardContainer>
        <TituloContainer>
          <Titulo>{title}</Titulo>
          <AvaliacaoContainer>
            <Avaliacao>{rate}</Avaliacao>
            <span>
              <img src={estrela} />
            </span>
          </AvaliacaoContainer>
        </TituloContainer>
        <Descricao>{getDescricso(description)}</Descricao>
        <Link to={`/restaurante/${id}`}>
          <Botao>Saiba Mais</Botao>
        </Link>
      </CardContainer>
    </Card>
  )
}

export default Restaurante
