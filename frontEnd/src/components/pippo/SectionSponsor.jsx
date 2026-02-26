import React from "react";
import { Container,Row,Col } from "react-bootstrap";
import img1 from '../../assets/sitelogos1.png';
import img2 from '../../assets/sitelogos2.png';
import img3 from '../../assets/sitelogos3.png';
import img4 from '../../assets/sitelogos4.png';
import img5 from '../../assets/sitelogos5.png';

const SectionSponsor = () =>{

    return(
        <Container>
            <Row>
                <Col>
                <h2 className="text-success text-center">MAIN SPONSOR......</h2>
                <div className="sectionSponsor d-flex justify-content-center align-items-center gap-5">
                    <img src={img1} alt="" />
                    <img src={img2} alt="" />
                    <img src={img3} alt="" />
                    <img src={img4} alt="" />
                    <img src={img5} alt="" />
                </div>
                </Col>
            </Row>
        </Container>
    )
}

export default SectionSponsor