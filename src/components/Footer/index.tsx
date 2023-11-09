import logo from '../../assets/images/logo.svg'
import insta from '../../assets/images/instagram.svg'
import face from '../../assets/images/facebook.svg'
import twitter from '../../assets/images/twitter.svg'
import { LogoRodape, Rodape, Social, SocialContainer, Texto } from './styles'

const Footer = () => (
  <Rodape>
    <LogoRodape src={logo} />
    <SocialContainer>
      <Social src={insta} />
      <Social src={face} />
      <Social src={twitter} />
    </SocialContainer>
    <Texto>
      A efood é uma plataforma para divulgação de estabelecimentos, a
      responsabilidade pela entrega, qualidade dos produtos é toda do
      estabelecimento contratado.
    </Texto>
  </Rodape>
)

export default Footer
