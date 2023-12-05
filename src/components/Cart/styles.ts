import styled from 'styled-components'
import { cores } from '../../styles'
import { Botao } from '../Pratos/styled'
import lixeira from '../../assets/images/lixeira.svg'

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.7;
`
export const CartContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  justify-content: flex-end;
  z-index: 1;

  &.is-open {
    display: flex;
  }
`

export const Sidebar = styled.aside`
  background-color: ${cores.indianRed};
  z-index: 1;
  padding: 32px 8px 0 8px;
  max-width: 360px;
  width: 100%;

  ${Botao} {
    max-width: 100%;
    width: 100%;
    margin-bottom: 8px;
  }

  label {
    color: ${cores.antiqueWhite};
    margin-bottom: 8px;
    display: block;
  }

  input {
    background-color: ${cores.antiqueWhite};
    color: ${cores.indianRed};
    border: 1px solid ${cores.antiqueWhite};
    height: 32px;
    padding: 0 8px;
    width: 100%;
    margin-bottom: 8px;

    &.error {
      border: 2px solid red;
      color: red;
    }
  }

  small {
    font-size: 14px;
  color: red;
  font wheight: bold;
  line-height: 22px;
  margin-bottom: 8px;
  }

  p {
    color: ${cores.antiqueWhite};
    font-size: 14px;
    line-height: 22px;
    margin-bottom: 16px;
  }

  .marginBottom {
    margin-bottom: 16px;
  }

  &.is-closed {
    display: none;
  }

  .empty-cart {
    font-size: 14px;
    line-height: 22px;
    text-align: center;
  }
`

export const InputGroup = styled.div`
  display: flex;
  gap: 34px;

  .tamanhoCvv {
    max-width: 87px;
  }
`

export const Titulo = styled.h3`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: ${cores.antiqueWhite};
  margin-bottom: 16px;
`

export const Preco = styled.h4`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  margin-top: 16px;
  color: ${cores.indianRed};
`

export const Total = styled.p`
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  margin-top: 40px;
  color: ${cores.antiqueWhite};
  display: flex;
  justify-content: space-between;
`

export const CartItem = styled.li`
  display: flex;
  background-color: ${cores.antiqueWhite};
  color: ${cores.indianRed};
  padding: 8px;
  margin-bottom: 16px;
  position: relative;

  img {
    height: 80px;
    width: 80px;
    object-fit: cover;
    margin-right: 8px;
  }

  h3 {
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
  }

  button {
    background-image: url(${lixeira});
    background-color: transparent;
    height: 16px;
    width: 16px;
    right: 8px;
    // margin-top: 4px;
    border: none;
    cursor: pointer;
    position: absolute;
    // bottom: 8;
    right: 8;
  }
`
