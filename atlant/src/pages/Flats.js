import { observer } from 'mobx-react-lite';
import CategoryBar from '../components/CategoryBar';

const Flats = () => {

  return (
    <div>
      <h1 className='mb-4'>Квартиры</h1>
      <CategoryBar />
    </div>
  );
};

export default observer(Flats);