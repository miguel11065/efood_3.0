import { Card, Titulo, Descricao, Botao, PratoImg } from './styled'

type Props = {
  image: string
  title: string
  description: string
}

const ProfileList = ({ image, title, description }: Props) => {
  const getDescription = (description: string) => {
    if (description.length > 130) {
      return description.slice(0, 130) + '...'
    }
  }
  return (
    <Card>
      <PratoImg src={image} alt="" />
      <Titulo>{title}</Titulo>
      <Descricao>{getDescription(description)}</Descricao>
      <Botao>Mais detalhes</Botao>
    </Card>
  )
}

export default ProfileList
