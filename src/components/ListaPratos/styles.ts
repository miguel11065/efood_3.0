import styled from 'styled-components'
import { cores } from '../../styles'

export const List = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 32px;
  margin-top: 56px;
`

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: none;
  justify-content: center;
  align-items: center;

  &.visivel {
    display: flex;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
  }
`

export const ModalContent = styled.div`
  background-color: ${cores.indianRed};
  color: ${cores.floralWhite};
  max-width: 1024px;
  height: 344px;
  display: flex;
  z-index: 1;

  > div {
    img {
      width: 280px;
      height: 280px;
      margin: 32px;
      object-fit: cover;
    }
  }
`
export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;

  h4 {
    margin-top: 32px;
    font-size: 18px;
    font-weight: 900;
  }

  p,
  span {
    margin: 16px 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
  }
`
export const Botao = styled.button`
  max-width: 220px;
  height: 24px;
  padding: 4px 8px;
  background-color: ${cores.floralWhite};
  border: none;
  font-size: 14px;
  font-weight: bold;
  color: ${cores.indianRed};
  cursor: pointer;
  margin-top: 60px;
`

export const Fechar = styled.img`
  width: 16px;
  height: 16px;
  margin: 8px;
  cursor: pointer;
`
