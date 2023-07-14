import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import User from "../UI/User";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [creators, setCreators] = useState([]);
  

  async function fetchData() {
    
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
    );
    
    setCreators(data);
  }

  useEffect(() => {
    fetchData();
  }, []);
  

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    dots:false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      900: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="zoom-in" data-aos-duration="1500">Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          
            {creators.length
              ? 
              <OwlCarousel className="owl-theme" {...options}>
              {
               creators.map((creator) => (
                  <User creator={creator} key={creator.id} />
                ))}
                </OwlCarousel>:
                (
                  <>
                  <OwlCarousel className="owl-theme" {...options}>
                      {new Array(8).fill(0).map((_, index) => (
                        <div className="nft_coll skeleton_Slide" key={index}>
                          <div className="nft_wrap ">
                            <Link to={``}>
                              <Skeleton width="100%" height="150px" />
                            </Link>
                          </div>
                          <div className="nft_coll_pp">
                            <Link to={``}>
                              <Skeleton
                                width="50px"
                                height="50px"
                                borderRadius="50%"
                              />
                            </Link>
                            <i className="fa fa-check"></i>
                          </div>
                          <div className="nft_coll_info">
                            <Link to="">
                              <Skeleton width="100px" height="20px" />
                            </Link>
                            <br />
                            <Skeleton width="60px" height="20px" />
                          </div>
                        </div>
                      ))}
                      </OwlCarousel>
                  </>
                )}
          
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
