import { Botao } from '../Pratos/styled'
import {
  CartContainer,
  CartItem,
  Overlay,
  Preco,
  Sidebar,
  Total
} from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../store'
import { close, remove } from '../../store/reducers/cart'
import { formatPrice } from '../ListaPratos'

const Cart = () => {
  const { isOpen, items } = useSelector((state: RootReducer) => state.cart)

  const dispatch = useDispatch()

  const closeCart = () => {
    dispatch(close())
  }

  const removeItem = (id: number) => {
    dispatch(remove(id))
  }

  const getTotalPrice = () => {
    return items.reduce((acumulador, valorAtual) => {
      return (acumulador += valorAtual.preco!)
    }, 0)
  }

  return (
    <CartContainer className={isOpen ? 'is-open' : ''}>
      <Overlay onClick={closeCart} />
      <Sidebar>
        <ul>
          {items.map((item) => (
            <CartItem key={item.id}>
              <img src={item.foto} />
              <div>
                <h3>{item.nome}</h3>
                <Preco>{formatPrice(item.preco)}</Preco>
                <button onClick={() => removeItem(item.id)} type="button" />
              </div>
            </CartItem>
          ))}
        </ul>
        <Total>
          <p>Valor total</p>
          <p>{formatPrice(getTotalPrice())}</p>
        </Total>
        <Botao type="button">Continuar com a entrega</Botao>
      </Sidebar>
    </CartContainer>
  )
}

export default Cart
