import styled from 'styled-components'
import { cores } from '../../styles'

export const Imagem = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 280px;
  display: block;
  margin-bottom: 56px;
  position: relative;
  padding-top: 25px;

  &::after {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    content: '';
  }

  .container {
    z-index: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
  }
`

export const Tipos = styled.h3`
  color: ${cores.white};
  font-weight: 100;
  font-size: 32px;
  text-transform: capitalize;
`

export const NomeRestaurante = styled.h3`
  color: ${cores.white};
  font-weight: bold;
  font-size: 32px;
  padding-bottom: 32px;
`
