import styled from 'styled-components'
import { cores } from '../../styles'

export const BannerImage = styled.div`
  width: 100%;
  height: 180px;
`
export const HeaderBar = styled.header`
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 186px;

  a,
  h3 {
    color: ${cores.indianRed};
    text-decoration: none;
    font-size: 18px;
    font-weight: bold;
  }
`
