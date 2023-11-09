import { Link } from 'react-router-dom'
import { HeaderBar } from './styles'
import bannerImg from '../../assets/images/banner.png'
import logo from '../../assets/images/logo.svg'

const HeaderRestaurante = () => (
  <div style={{ backgroundImage: `url(${bannerImg})` }}>
    <HeaderBar className="container">
      <Link to="/">Restaurantes</Link>
      <img src={logo} alt="EFOOD" />
      <h3>0 produto(s) no carrinho</h3>
    </HeaderBar>
  </div>
)

export default HeaderRestaurante
