import styled from 'styled-components'
import { cores } from '../../styles'

export const Card = styled.div`
  width: 320px;
  display: block;
  padding: 8px;
  background-color: ${cores.indianRed};
`
export const PratoImg = styled.img`
  width: 304px;
  height: 180px;
  object-fit: cover;
`

export const Titulo = styled.h3`
  font-weight: bold;
  font-size: 16px;
  color: ${cores.antiqueWhite};
  margin: 8px 0;
`
export const Descricao = styled.p`
  font-size: 14px;
  color: ${cores.antiqueWhite};
  margin-bottom: 8px;
`

export const Botao = styled.button`
  background-color: ${cores.antiqueWhite};
  color: ${cores.indianRed};
  border: none;
  width: 304px;
  font-weight: bold;
  font-size: 14px;
  padding: 4px;
  cursor: pointer;
`
