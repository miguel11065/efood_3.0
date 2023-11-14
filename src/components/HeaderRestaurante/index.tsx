import { Link } from 'react-router-dom'
import { HeaderBar } from './styles'
import bannerImg from '../../assets/images/banner.png'
import logo from '../../assets/images/logo.svg'
import { useDispatch, useSelector } from 'react-redux'
import { open } from '../../store/reducers/cart'
import { RootReducer } from '../../store'

const HeaderRestaurante = () => {
  const dispatch = useDispatch()
  const { items } = useSelector((state: RootReducer) => state.cart)

  const openCart = () => {
    dispatch(open())
  }

  return (
    <div style={{ backgroundImage: `url(${bannerImg})` }}>
      <HeaderBar className="container">
        <Link to="/">Restaurantes</Link>
        <img src={logo} alt="EFOOD" />
        <h3 onClick={openCart}>{items.length} produto(s) no carrinho</h3>
      </HeaderBar>
    </div>
  )
}

export default HeaderRestaurante
