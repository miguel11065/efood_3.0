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
import { close, remove } from '../../store/reducers/cart'
import { formatPrice } from '../ListaPratos'
import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { usePurchaseMutation } from '../../services/api'

const Cart = () => {
  const { isOpen, items } = useSelector((state: RootReducer) => state.cart)

  const [cart, setCart] = useState(true)
  const [purchaseData, setPurchaseData] = useState(false)
  const [paymentData, setPaymentData] = useState(false)
  const [checkout, setCheckout] = useState(false)

  const [purchase, { isLoading, isSuccess, isError, data }] =
    usePurchaseMutation()

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
      cardCode: Yup.number()
        .min(3, 'O campo precisa ter 3 números')
        // .max(3, 'O campo precisa ter 3 números')
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
            code: Number(values.cardCode),
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
      return (acumulador += valorAtual.preco!)
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
    setPurchaseData(false)
    setPaymentData(true)
  }

  const backToPurchase = () => {
    setPaymentData(false)
    setPurchaseData(true)
  }

  const goToCheckout = () => {
    setPaymentData(false)
    setCheckout(true)
  }

  const finishPurchase = () => {
    setCart(true)
    setCheckout(false)
    closeCart()
  }

  return (
    <CartContainer className={isOpen ? 'is-open' : ''}>
      <Overlay onClick={closeCart} />
      <Sidebar className={cart ? '' : 'is-closed'}>
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
          <h3>Valor total</h3>
          <h3>{formatPrice(getTotalPrice())}</h3>
        </Total>
        <Botao type="button" onClick={goToPurchase}>
          Continuar com a entrega
        </Botao>
      </Sidebar>
      <Sidebar className={purchaseData ? '' : 'is-closed'}>
        <Titulo>Entrega</Titulo>
        <form onSubmit={form.handleSubmit}>
          <div>
            <label htmlFor="recipient">Quem irá receber</label>
            <input
              id="recipient"
              type="text"
              name="recipient"
              value={form.values.recipient}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            <small>{getErrorMessage('recipient', form.errors.recipient)}</small>
          </div>
          <div>
            <label htmlFor="address">Endereço</label>
            <input
              id="address"
              type="text"
              name="address"
              value={form.values.address}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            <small>{getErrorMessage('address', form.errors.address)}</small>
          </div>
          <div>
            <label htmlFor="city">Cidade</label>
            <input
              id="city"
              type="text"
              name="city"
              value={form.values.city}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            <small>{getErrorMessage('city', form.errors.city)}</small>
          </div>
          <InputGroup>
            <div>
              <label htmlFor="cep">CEP</label>
              <input
                id="cep"
                type="text"
                name="cep"
                value={form.values.cep}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              <small>{getErrorMessage('cep', form.errors.cep)}</small>
            </div>
            <div>
              <label htmlFor="houseNumber">Número</label>
              <input
                id="houseNumber"
                type="number"
                name="houseNumber"
                value={form.values.houseNumber}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              <small>
                {getErrorMessage('houseNumber', form.errors.houseNumber)}
              </small>
            </div>
          </InputGroup>
          <div className="marginBottom">
            <label htmlFor="complement">Complemento (opcional)</label>
            <input
              id="complement"
              type="text"
              name="complement"
              value={form.values.complement}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
          </div>
        </form>
        <Botao type="button" onClick={goToPayment}>
          Continuar com o pagamento
        </Botao>
        <Botao type="button" onClick={backToCart}>
          Voltar para o carrinho
        </Botao>
      </Sidebar>
      <Sidebar className={paymentData ? '' : 'is-closed'}>
        <Titulo>Pagamento - Valor a pagar R$ 200,00</Titulo>
        <form onSubmit={form.handleSubmit}>
          <div>
            <label htmlFor="cardName">Nome no cartão</label>
            <input
              id="cardName"
              type="text"
              name="cardName"
              value={form.values.cardName}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            <small>{getErrorMessage('cardName', form.errors.cardName)}</small>
          </div>
          <InputGroup>
            <div>
              <label htmlFor="cardNumber">Número do cartão</label>
              <input
                id="cardNumber"
                name="cardNumber"
                type="text"
                value={form.values.cardNumber}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              <small>
                {getErrorMessage('cardNumber', form.errors.cardNumber)}
              </small>
            </div>
            <div>
              <label htmlFor="cardCode">CVV</label>
              <input
                className="tamanhoCvv"
                id="cardCode"
                type="text"
                name="cardCode"
                value={form.values.cardCode}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              <small>{getErrorMessage('cardCode', form.errors.cardCode)}</small>
            </div>
          </InputGroup>
          <InputGroup className="marginBottom">
            <div>
              <label htmlFor="expireMonth">Mês de vencimento</label>
              <input
                id="expireMonth"
                type="text"
                name="expireMonth"
                value={form.values.expireMonth}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              <small>
                {getErrorMessage('expireMonth', form.errors.expireMonth)}
              </small>
            </div>
            <div>
              <label htmlFor="expireYear">Ano de vencimento</label>
              <input
                id="expireYear"
                type="number"
                name="expireYear"
                value={form.values.expireYear}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              <small>
                {getErrorMessage('expireYear', form.errors.expireYear)}
              </small>
            </div>
          </InputGroup>
        </form>
        <Botao type="button" onClick={goToCheckout}>
          Finalizar pagamento
        </Botao>
        <Botao type="button" onClick={backToPurchase}>
          Voltar para a edição de endereço
        </Botao>
      </Sidebar>
      {isSuccess ? (
        <Sidebar className={checkout ? '' : 'is-closed'}>
          <Titulo>Pedido realizado - numero do pedido</Titulo>
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
          <Botao type="button" onClick={finishPurchase}>
            Concluir
          </Botao>
        </Sidebar>
      ) : (
        <Sidebar>
          <h4>Erro na compra</h4>
          <Botao type="button" onClick={goToPayment}>
            Voltar para a edição de pagamento
          </Botao>
        </Sidebar>
      )}
    </CartContainer>
  )
}

export default Cart
