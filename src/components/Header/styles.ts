import styled from 'styled-components'
import { breakpoints } from '../../styles'

export const Imagem = styled.div`
  width: 100%;
  height: 384px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 80px;
`

export const Logo = styled.img`
  width: 125px;
  margin-top: 40px;
`
export const Title = styled.h2`
  width: 500px;
  height: 84px;
  margin-top: 140px;
  margin-bottom: 40px;
  font-size: 32px;
  font-weight: 00;
  line-height: 40px;
  text-align: center;

  @media (max-width: ${breakpoints.tablet}) {
    max-width: 80%;
    margin-top: 80px;
    font-size: 25px;
  }
`
