import styled from 'styled-components'
import { cores } from '../../styles'

export const Card = styled.div`
  position: relative;
`

export const CardContainer = styled.div`
  border: solid 1px ${cores.indianRed};
  color: ${cores.indianRed};
  border-top: none;
  padding: 8px;
`

export const Imagem = styled.img`
  width: 100%;
  height: 217px;
  display: block;
  object-fit: cover;
`

export const Titulo = styled.h3`
  font-weight: 700;
  font-size: 18px;
  margin-top: 8px;
`

export const TituloContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
  justify-content: space-between;
`

export const Avaliacao = styled.span`
  margin-right: 8px;
  font-weight: bold;
  font-size: 18px;
`

export const AvaliacaoContainer = styled.div`
  display: flex;
  align-items: center;
`

export const Descricao = styled.p`
  font-size: 14px;
  line-height: 22px;
  display: block;
  margin-bottom: 16px;
`

export const Botao = styled.a`
  font-size: 14px;
  font-weight: 700;
  padding: 4px 6px;
  background-color: ${cores.indianRed};
  color: ${cores.antiqueWhite};
  cursor: pointer;
  border: none;
`

export const Infos = styled.span`
  display: block;
  position: absolute;
  margin-left: 10px;
  top: 16px;
  right: 16px;
`
