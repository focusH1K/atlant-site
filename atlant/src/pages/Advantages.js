import { Carousel, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import adv from "../images/adv.png";
import parking from '../images/parking.png';
import park from '../images/park.png';
import detsad from '../images/detsad.png';
import React from 'react';

const Advantages = () => {
  const carouselRef = React.createRef();

  const nextSlide = () => {
    carouselRef.current.next();
  };

  const prevSlide = () => {
    carouselRef.current.prev();
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", width: "100%" }}>
          <img src={adv} style={{ maxWidth: "80%" }} alt="Schk Image" />
        </div>
        <h2 style={{ textAlign: "center", marginTop: "50px" }}>Наши преимущества</h2>
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
        <div style={{ position: "relative", width: '800px', margin: '0 auto' }}>
          <Carousel ref={carouselRef} dots={false}>
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src={parking} style={{ width: '65%', height: '50%', objectFit: "contain" }} />
                <div style={{ marginLeft: '20px'}}>
                  <h5>Паркинг</h5>
                  <span>Внутренние дворы свободны от машин. Остановка разрешена только на один час для спец. транспорта и разгрузки. Для постоянных жильцов предусмотрена подземная парковка на 450 машино-мест.</span>
                </div>
                
              </div>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src={detsad} style={{ width: '65%', height: '50%', objectFit: "contain" }} />
                <div style={{ marginLeft: '20px'}}>
                  <h5>Школы и детские сады</h5>
                  <span>Вам не придется тратить много времени на то, чтобы отвести вашего ребенка в школу или детский сад. Все это находится рядом с комплексом. В группах школ и детских садов есть все для того, чтобы дети не могли заскучать.</span>
                </div>
              </div>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src={park} style={{ width: '65%', height: '50%', objectFit: "contain" }} />
                <div style={{ marginLeft: '20px'}}>
                  <h5>Парки и развлечения</h5>
                  <span>Во многих городах России нет места, где можно отдохнуть на свежем воздухе или приятно провести время вместе с семьей. Именно поэтому в нашем комплексе построен парк, в котором всем будет весело и приятно находиться.</span>
                </div>
              </div>
            </div>
          </Carousel>
          <Button
            type="text"
            icon={<LeftOutlined />}
            style={{ position: "absolute", top: "50%", left: 0, transform: "translateY(-50%)" }}
            onClick={prevSlide}
          />
          <Button
            type="text"
            icon={<RightOutlined />}
            style={{ position: "absolute", top: "50%", right: 0, transform: "translateY(-50%)" }}
            onClick={nextSlide}
          />
        </div>
      </div>
    </>
  );
};

export default Advantages;