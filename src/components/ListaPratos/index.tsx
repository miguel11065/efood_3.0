import { useState } from 'react'
import fechar from '../../assets/images/fechar.svg'
import {
  List,
  Modal,
  ModalContent,
  ModalContainer,
  Fechar,
  Botao
} from './styles'
import { PratoLista } from '../../pages/Home'
import Pratos from '../Pratos'

type Props = {
  items: PratoLista[]
}
interface Lista extends PratoLista {
  isVisible: boolean
}

const formatPrice = (preco = 0) => {
  return new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL'
  }).format(preco)
}

const ProfileList = ({ items }: Props) => {
  const [modal, setModal] = useState<Lista>({
    isVisible: false,
    id: 0,
    foto: '',
    nome: '',
    descricao: '',
    porcao: '',
    preco: 0
  })

  const closeModal = () => {
    setModal({
      isVisible: false,
      id: 0,
      foto: '',
      nome: '',
      descricao: '',
      porcao: '',
      preco: 0
    })
  }

  return (
    <div className="container">
      <List>
        {items.map((prato) => (
          <li
            key={prato.id}
            onClick={() =>
              setModal({
                isVisible: true,
                id: prato.id,
                foto: prato.foto,
                nome: prato.nome,
                descricao: prato.descricao,
                porcao: prato.porcao,
                preco: prato.preco
              })
            }
          >
            <Pratos
              image={prato.foto}
              title={prato.nome}
              description={prato.descricao}
            />
          </li>
        ))}
      </List>
      <Modal className={modal.isVisible ? 'visivel' : ''}>
        <ModalContent>
          <div>
            <img src={modal.foto} alt="" />
          </div>
          <ModalContainer>
            <h4>{modal.nome}</h4>
            <p>{modal.descricao}</p>
            <span>Rende de {modal.porcao}</span>
            <Botao>Adicionar ao carrinho - {formatPrice(modal.preco)}</Botao>
          </ModalContainer>
          <Fechar src={fechar} onClick={() => closeModal()} />
        </ModalContent>
        <div className="overlay" onClick={() => closeModal()}></div>
      </Modal>
    </div>
  )
}

export default ProfileList
