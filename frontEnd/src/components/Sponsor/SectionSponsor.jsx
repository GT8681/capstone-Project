import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import img1 from '../../assets/sitelogos1.png';
import img2 from '../../assets/sitelogos2.png';
import img3 from '../../assets/sitelogos3.png';
import img4 from '../../assets/sitelogos4.png';
import img5 from '../../assets/sitelogos5.png';

const SectionSponsor = () => {

    return (

        <div className="container text-center my-5">
            <h4 className="text-success mb-4">MAIN SPONSOR......</h4>
            <div className="row align-items-center justify-content-center g-4">
                <div className="col-4 col-md-2">
                    <img src={img1} className="img-fluid" alt="Sponsor" />
                </div>
                <div className="col-4 col-md-2">
                    <img src={img2} className="img-fluid" alt="Sponsor" />
                </div>
                <div className="col-4 col-md-2">
                    <img src={img3} className="img-fluid" alt="Sponsor" />
                </div>
                <div className="col-4 col-md-2">
                    <img src={img4} className="img-fluid" alt="Sponsor" />
                </div>
                <div className="col-4 col-md-2">
                    <img src={img5} className="img-fluid" alt="Sponsor" />
                </div>
            </div>
        </div>

    )
}

export default SectionSponsor



