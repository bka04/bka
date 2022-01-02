import './Acrobatics.css';
import Card from '../components/UI/Card';
import Slideshow from '../components/UI/Slideshow';

const Acrobatics = (props) => {
  return (
    <div className='mainAcrobaticsContainer'>
      <Card className='white'>
        <Slideshow></Slideshow>
      </Card>
    </div>
  )
}

export default Acrobatics;