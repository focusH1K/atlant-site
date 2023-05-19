import React from "react";
import { Row, Col, Divider } from "antd";
import schk from "../images/schk.png";
import manager1 from '../images/manager1.jpg'
import manager2 from '../images/manager2.jpg'
import manager3 from '../images/manager3.jpg'

const Home = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", width: "100%" }}>
        <img src={schk} style={{ maxWidth: "80%" }} alt="Schk Image" />
      </div>

      <div className='mt-3' style={{ backgroundColor: "#fff", padding: "20px", width: "100%" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center" }}>О проекте</h2>
          <p style={{ textAlign: "center" }}>
            Мы предлагаем почувствовать на себе всю красоту и удобство нашего жилого комплекса, состоящего из 3 корпусов высотой в 25 этажей. 
            Архитектура корпусов образует колону, возле которой находится все, что нужно для лучшей жизни.
            В районе работают магазины, школы и детские сады. Вся территория жилого комплекса озеленена, присутствует парк, в котором развлечений найдется для каждого.
          </p>
        </div>
      </div>

      <div style={{ backgroundColor: "#f0f2f5", padding: "20px", width: "100%" }}>
        <h2 className='mb-3' style={{ textAlign: "center" }}>Наши менеджеры</h2>
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={12} md={8} lg={8} xl={8}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <img src={manager1} style={{ width: "80%", maxWidth: "300px" }} alt="Менеджер 1" />
              <h3 style={{ textAlign: "center" }}>Матвеева Светлана Андреевна</h3>
              <h5 style={{ textAlign: "center" }}>Стаж работы более 10 лет</h5>
            </div>
          </Col>

          <Col xs={24} sm={12} md={8} lg={8} xl={8}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <img src={manager2} style={{ width: "80%", maxWidth: "300px" }} alt="Менеджер 2" />
              <h3 style={{ textAlign: "center" }}>Каекин Герман Тарасович</h3>
              <h5 style={{ textAlign: "center" }}>Стаж работы более 8 лет</h5>
            </div>
          </Col>

          <Col xs={24} sm={12} md={8} lg={8} xl={8}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <img src={manager3} style={{ width: "80%", maxWidth: "300px" }} alt="Менеджер 3" />
              <h3 style={{ textAlign: "center" }}>Афанасьев Антон Арсеньевич</h3>
              <h5 style={{ textAlign: "center" }}>Стаж работы более 8 лет</h5>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Home;