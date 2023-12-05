import { Botao } from '../Pratos/styled'
import {
  CartContainer,
  CartItem,
  InputGroup,
  Overlay,
  Preco,
  Sidebar,
  Titulo,
  Total
} from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from '../../store'
import { clear, close, remove } from '../../store/reducers/cart'
import { formatPrice } from '../ListaPratos'
import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { usePurchaseMutation } from '../../services/api'
import { useNavigate } from 'react-router-dom'
import InputMask from 'react-input-mask'

const Cart = () => {
  const { isOpen, items } = useSelector((state: RootReducer) => state.cart)

  const [cart, setCart] = useState(true)
  const [purchaseData, setPurchaseData] = useState(false)
  const [paymentData, setPaymentData] = useState(false)
  const [checkout, setCheckout] = useState(false)
  const [emptyCart, setEmptyCart] = useState(false)
  const navigate = useNavigate()

  const [purchase, { isSuccess, data }] = usePurchaseMutation()

  const dispatch = useDispatch()

  const form = useFormik({
    initialValues: {
      recipient: '',
      address: '',
      city: '',
      cep: '',
      houseNumber: '',
      complement: '',
      cardName: '',
      cardNumber: '',
      cardCode: '',
      expireMonth: '',
      expireYear: ''
    },
    validationSchema: Yup.object({
      recipient: Yup.string()
        .min(5, 'O nome precisa ter pelo menos 5 caracteres')
        .required('O campo é obrigatório'),
      address: Yup.string()
        .min(8, 'Insira um endereço válido')
        .required('O campo é obrigatório'),
      city: Yup.string().required('O campo é obrigatório'),
      cep: Yup.string()
        .min(9, 'insira um CEP válido')
        .max(9, 'insira um CEP válido')
        .required('O campo é obrigatório'),
      houseNumber: Yup.string().required('O campo é obrigatório'),
      cardName: Yup.string()
        .min(5, 'O campo precisa ter pelo menos 5 caracteres')
        .required('O campo é obrigatório'),
      cardNumber: Yup.string()
        .min(19, 'O campo precisa ter 16 numeros')
        .max(19, 'O campo precisa ter 16 numeros')
        .required('O campo é obrigatório'),
      cardCode: Yup.string()
        .min(3, 'O campo precisa ter 3 números')
        .max(3, 'O campo precisa ter 3 números')
        .required('O campo é obrigatório'),
      expireMonth: Yup.string()
        .min(1, 'O campo precisa ter pelo menos 1 número')
        .max(2, 'O campo precisa ter pelo no maximo 2 números')
        .required('O campo é obrigatório'),
      expireYear: Yup.string()
        .min(4, 'O campo precisa ter 4 números')
        .max(4, 'O campo precisa ter 4 números')
        .required('O campo é obrigatório')
    }),
    onSubmit: (values) => {
      purchase({
        products: [
          {
            id: 1,
            price: 10
          }
        ],
        delivery: {
          receiver: values.recipient,
          address: {
            description: values.address,
            city: values.city,
            zipCode: values.cep,
            number: Number(values.houseNumber),
            complement: values.complement
          }
        },
        payment: {
          card: {
            name: values.cardName,
            number: values.cardNumber,
            code: values.cardCode,
            expires: {
              month: Number(values.expireMonth),
              year: Number(values.expireYear)
            }
          }
        }
      })
    }
  })

  const getErrorMessage = (fieldName: string, message?: string) => {
    const isTouched = fieldName in form.touched
    const isInvalid = fieldName in form.errors

    if (isTouched && isInvalid) return message
    return ''
  }

  const closeCart = () => {
    dispatch(close())
  }

  const removeItem = (id: number) => {
    dispatch(remove(id))
  }

  const getTotalPrice = () => {
    return items.reduce((acumulador, valorAtual) => {
      return (acumulador += valorAtual.preco)
    }, 0)
  }

  const goToPurchase = () => {
    setCart(false)
    setPurchaseData(true)
  }

  const backToCart = () => {
    setCart(true)
    setPurchaseData(false)
    setPaymentData(false)
    setCheckout(false)
  }

  const goToPayment = () => {
    if (
      !form.errors.recipient &&
      !form.errors.address &&
      !form.errors.city &&
      !form.errors.cep &&
      !form.errors.houseNumber
    ) {
      setPurchaseData(false)
      setPaymentData(true)
    }
  }

  const backToPurchase = () => {
    setPaymentData(false)
    setPurchaseData(true)
  }

  const goToCheckout = () => {
    if (
      !form.errors.cardName &&
      !form.errors.cardNumber &&
      !form.errors.cardCode &&
      !form.errors.expireMonth &&
      !form.errors.expireYear
    ) {
      setPaymentData(false)
      setCheckout(true)
      dispatch(clear())
    }
  }

  const finishPurchase = () => {
    setCart(true)
    setCheckout(false)
    closeCart()
    setEmptyCart(false)
    navigate('/')
    window.location.reload()
  }

  return (
    <CartContainer className={isOpen ? 'is-open' : ''}>
      <Overlay onClick={closeCart} />
      <Sidebar className={cart ? '' : 'is-closed'}>
        {items.length > 0 ? (
          <>
            <ul>
              {items.map((item) => (
                <CartItem key={item.id}>
                  <img src={item.foto} alt={item.nome} />
                  <div>
                    <h3>{item.nome}</h3>
                    <Preco>{formatPrice(item.preco)}</Preco>
                  </div>
                  <button onClick={() => removeItem(item.id)} />
                </CartItem>
              ))}
            </ul>
            <Total>
              Valor total <span>{formatPrice(getTotalPrice())}</span>
            </Total>
            <Botao onClick={goToPurchase}>Continuar com a entrega</Botao>
          </>
        ) : (
          <p className="empty-cart">
            O carrinho está vazio, adcione pelo menos um item para continuar com
            a compra.
          </p>
        )}
      </Sidebar>

      {isSuccess && data ? (
        <Sidebar className={checkout ? '' : 'is-closed'}>
          <Titulo>Pedido realizado - {data.orderId}</Titulo>
          <p>
            Estamos felizes em informar que seu pedido já está em processo de
            preparação e, em breve, será entregue no endereço fornecido.
          </p>
          <p>
            Gostaríamos de ressaltar que nossos entregadores não estão
            autorizados a realizar cobranças extras.
          </p>
          <p>
            Lembre-se da importância de higienizar as mãos após o recebimento do
            pedido, garantindo assim sua segurança e bem-estar durante a
            refeição.
          </p>
          <p>
            Esperamos que desfrute de uma deliciosa e agradável experiência
            gastronômica. Bom apetite!
          </p>
          <Botao onClick={finishPurchase}>Concluir</Botao>
        </Sidebar>
      ) : (
        <>
          <Sidebar className={purchaseData ? '' : 'is-closed'}>
            <Titulo>Entrega</Titulo>
            <form onSubmit={form.handleSubmit}>
              <div>
                <label htmlFor="recipient">Quem irá receber</label>
                <input
                  type="text"
                  name="recipient"
                  id="recipient"
                  value={form.values.recipient}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  className={getErrorMessage('recipient') ? 'error' : ''}
                />
                <small>
                  {getErrorMessage('recipient', form.errors.recipient)}
                </small>
              </div>
              <div>
                <label htmlFor="address">Endereço</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={form.values.address}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  className={getErrorMessage('address') ? 'error' : ''}
                />
                <small>{getErrorMessage('address', form.errors.address)}</small>
              </div>
              <div>
                <label htmlFor="city">Cidade</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={form.values.city}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  className={getErrorMessage('city') ? 'error' : ''}
                />
                <small>{getErrorMessage('city', form.errors.city)}</small>
              </div>
              <InputGroup>
                <div>
                  <label htmlFor="cep">CEP</label>
                  <InputMask
                    type="text"
                    name="cep"
                    id="cep"
                    value={form.values.cep}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    className={getErrorMessage('cep') ? 'error' : ''}
                    mask="99999-999"
                  />
                  <small>{getErrorMessage('cep', form.errors.cep)}</small>
                </div>
                <div>
                  <label htmlFor="houseNumber">Número</label>
                  <input
                    type="number"
                    name="houseNumber"
                    id="houseNumber"
                    value={form.values.houseNumber}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    className={getErrorMessage('houseNumber') ? 'error' : ''}
                  />
                  <small>
                    {getErrorMessage('houseNumber', form.errors.houseNumber)}
                  </small>
                </div>
              </InputGroup>
              <div>
                <label htmlFor="complement">Complemento (opcional)</label>
                <input
                  type="text"
                  name="complement"
                  id="complement"
                  value={form.values.complement}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
              </div>
            </form>
            {form.dirty ? (
              <Botao type="button" onClick={goToPayment}>
                Continuar com pagamento
              </Botao>
            ) : (
              ''
            )}
            <Botao type="button" onClick={backToCart}>
              Voltar para carrinho
            </Botao>
          </Sidebar>
          <Sidebar className={paymentData ? '' : 'is-closed'}>
            <Titulo>
              Pagamento - Valor a pagar {formatPrice(getTotalPrice())}
            </Titulo>
            <form onSubmit={form.handleSubmit}>
              <div>
                <label htmlFor="cardName">Nome no cartão</label>
                <input
                  type="text"
                  name="cardName"
                  id="cardName"
                  value={form.values.cardName}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  className={getErrorMessage('cardName') ? 'error' : ''}
                />
                <small>
                  {getErrorMessage('cardName', form.errors.cardName)}
                </small>
              </div>
              <InputGroup>
                <div>
                  <label htmlFor="cardNumber">Número do cartão</label>
                  <InputMask
                    type="text"
                    name="cardNumber"
                    id="cardNumber"
                    value={form.values.cardNumber}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    className={getErrorMessage('cardNumber') ? 'error' : ''}
                    mask="9999.9999.9999.9999"
                  />
                  <small>
                    {getErrorMessage('cardNumber', form.errors.cardNumber)}
                  </small>
                </div>
                <div>
                  <label htmlFor="cardCode">CVV</label>
                  <InputMask
                    type="text"
                    name="cardCode"
                    id="cardCode"
                    value={form.values.cardCode}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    className={`${
                      getErrorMessage('cardCode') ? 'error ' : ''
                    }tamanhoCvv`}
                    mask="999"
                  />
                  <small>
                    {getErrorMessage('cardCode', form.errors.cardCode)}
                  </small>
                </div>
              </InputGroup>
              <InputGroup>
                <div>
                  <label htmlFor="expireMonth">Mês de vencimento</label>
                  <input
                    type="text"
                    name="expireMonth"
                    id="expireMonth"
                    value={form.values.expireMonth}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    className={getErrorMessage('expireMonth') ? 'error' : ''}
                  />
                  <small>
                    {getErrorMessage('expireMonth', form.errors.expireMonth)}
                  </small>
                </div>
                <div>
                  <label htmlFor="expireYear">Ano de vencimento</label>
                  <input
                    type="text"
                    name="expireYear"
                    id="expireYear"
                    value={form.values.expireYear}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    className={getErrorMessage('expireYear') ? 'error' : ''}
                  />
                  <small>
                    {getErrorMessage('expireYear', form.errors.expireYear)}
                  </small>
                </div>
              </InputGroup>
            </form>
            {form.dirty ? (
              <Botao type="button" onClick={goToCheckout}>
                Finalizar pagamento
              </Botao>
            ) : (
              ''
            )}
            <Botao type="button" onClick={backToPurchase}>
              Voltar para a edição de endereço
            </Botao>
          </Sidebar>
        </>
      )}
    </CartContainer>
  )
}

export default Cart
