import { observer } from 'mobx-react-lite';
import { Row, Col } from 'antd';
import CategoryBar from '../components/CategoryBar';
import schkkv from "../images/schkkv.png";

const Flats = () => {
  return (
    <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", width: "100%" }}>
        <img src={schkkv} style={{ maxWidth: "80%" }} alt="Schk Image" />
      </div>
      <CategoryBar />
    </div>
  );
};

export default observer(Flats);