import styled from 'styled-components'
import { cores } from '../../styles'

export const Rodape = styled.footer`
  background-color: ${cores.antiqueWhite};
  margin-top: 80px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

export const LogoRodape = styled.img`
  margin-bottom: 32px;
`

export const Social = styled.img`
  width: 24px;
  height: 24px;
`

export const SocialContainer = styled.div`
  margin-bottom: 80px;
  display: flex;
  gap: 8px;
`

export const Texto = styled.p`
  font-size: 10px;
`
