import { Imagem, Logo, Title } from './styles'
import bannerImg from '../../assets/images/banner.png'
import logo from '../../assets/images/logo.svg'

import { Link } from 'react-router-dom'

const Hero = () => (
  <Imagem style={{ backgroundImage: `url(${bannerImg})` }}>
    <Link to="/">
      <Logo src={logo} alt="logo" />
    </Link>
    <Title>Viva experiências gastronômicas no conforto da sua casa</Title>
  </Imagem>
)

export default Hero
