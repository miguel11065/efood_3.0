import { PulseLoader } from 'react-spinners'
import { Container } from './styles'
import { cores } from '../../styles'

const Loader = () => (
  <Container>
    <PulseLoader color={cores.indianRed} />
  </Container>
)

export default Loader
