import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Scrollbar, Zoom } from "swiper";
import "./ProductDetails.css";
// import ReactStars from "react-rating-stars-component";
import { Tab, Tabs } from "react-bootstrap";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/zoom";
import "swiper/css/thumbs";
import "swiper/css/scrollbar";
//

const ProductDetails = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  //   const options = {
  //     edit: false,
  //     color: "gray",
  //     activeColor: "tomato",
  //     value: 3.5,
  //     size: window.innerWidth < 600 ? 20 : 25,
  //     isHalf: true,
  //     a11y: true,
  //   };
  return (
    <div className="container">
      <div className="product row">
        <div className="product-images col-md-6">
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            loop={true}
            zoom={true}
            navigation={true}
            spaceBetween={5}
            slidesPerView={1}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            modules={[Navigation, Thumbs, FreeMode, Zoom]}
            grabCursor={true}
            className="mySlider"
          >
            <SwiperSlide>
              <div className="swiper-zoom-container">
                <img
                  src="https://swiperjs.com/demos/images/nature-1.jpg"
                  alt="slide"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="swiper-zoom-container">
                <img
                  src="https://swiperjs.com/demos/images/nature-2.jpg"
                  alt="slide"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="swiper-zoom-container">
                <img
                  src="https://swiperjs.com/demos/images/nature-3.jpg"
                  alt="slide"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="swiper-zoom-container">
                <img
                  src="https://swiperjs.com/demos/images/nature-4.jpg"
                  alt="slide"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="swiper-zoom-container">
                <img
                  src="https://swiperjs.com/demos/images/nature-5.jpg"
                  alt="slide"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="swiper-zoom-container">
                <img
                  src="https://swiperjs.com/demos/images/nature-6.jpg"
                  alt="slide"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={5}
            slidesPerView={5}
            freeMode={true}
            scrollbar={true}
            watchSlidesProgress={true}
            modules={[Thumbs, FreeMode, Scrollbar]}
            className="mySlider2"
          >
            <SwiperSlide>
              <img
                src="https://swiperjs.com/demos/images/nature-1.jpg"
                alt="slide"
                loading="lazy"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://swiperjs.com/demos/images/nature-2.jpg"
                alt="slide"
                loading="lazy"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://swiperjs.com/demos/images/nature-3.jpg"
                alt="slide"
                loading="lazy"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://swiperjs.com/demos/images/nature-4.jpg"
                alt="slide"
                loading="lazy"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://swiperjs.com/demos/images/nature-5.jpg"
                alt="slide"
                loading="lazy"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://swiperjs.com/demos/images/nature-6.jpg"
                alt="slide"
                loading="lazy"
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="product-details col-md-6">
          <h1 className="product-heading">
            WAVES OF THE ORBITS (SET OF 1 BED & 2 PILLOW COVER) (BED LINEN)
          </h1>
          <div className="product-rating">
            {/* <ReactStars {...options} /> */}
            <div>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalfAlt />
              <FaRegStar />
            </div>
            <span className="mt-1">(1 Review)</span>
          </div>
          <p className="product-sku">
            SKU:
            <span>SUTAHOME009</span>
          </p>
          <div className="product-price">
            <span>Rs. 5,200</span>
            <p>MRP Inclusive of taxes</p>
          </div>

          <hr className="line" />

          <div className="p-quantity-box">
            <span>Quantity:</span>
            <div className="p-quantity">
              <button>-</button>
              <input type="number" defaultValue={1} />
              <button>+</button>
            </div>
          </div>

          <button className="p-button">Add to Cart</button>

          <p className="p-shipping">
            Free shipping on domestic orders above Rs. 2,000
          </p>

          <div className="p-box-2">
            <p>
              <strong>Country of Origin:</strong>India
            </p>
            <p>
              <strong>Packed By:</strong> Raasiya Pvt. Ltd.
            </p>
            <p>
              <strong>Registered Address:</strong>Om ShivAmbika Co-Op Hsg Soc,
              Kalina, Santacruz East, Mumbai-400098
            </p>
          </div>

          <div className="p-box-3">
            <Tabs defaultActiveKey="details" justify>
              <Tab eventKey="details" title="Details" className="p-tab-data">
                Bed Cover : Length - 108 Inches ; Width - 86 Inches Pillow Cover
                : Length - 17.5 Inches; Width - 26 Inches Fabric : Cotton Wash
                Care : Machine Wash Disclaimer: The pictures are clicked in
                daylight. Color may vary slightly from the image due to the
                screen brightness
              </Tab>
              <Tab eventKey="story" title="Story" className="p-tab-data">
                Sometimes on the long winter nights I regret not being an
                astronaut! Orbiting the planets, watching the beautiful universe
                unfold in front of my eyes. I dreamt with open eyes and with
                each sigh you pulled me close & told me that I am a thousand
                glorious suns & a million dazzling stars! Everything that I have
                been longing for! Thank you my bed for being the greatest
                support system I could ever get. For literally always having my
                back! This serene blue coloured cotton and patchwork bedsheet is
                as comfy as it is beautiful!
              </Tab>
              <Tab
                eventKey="description"
                title="Description"
                className="p-tab-data"
              >
                Patchwork is different smaller pieces of fabrics stitched
                together intricately to bring a vibrant design alive. For this
                bedsheet, patchwork is done on cotton fabric. Kantha is
                traditional embroidery that originated from the nimble hands of
                industrious women who upcycled fabric bits into quilts, blankets
                and clothing by stitching them together. The earliest. basic yet
                most laborious kantha stitch is a simple, straight, running
                stitch. The quilt has been minutely detailed with these kantha
                stitches using contrast, bright cotton threads.
              </Tab>
            </Tabs>
          </div>

          <hr className="line" />

          <div className="p-box-4">
            <p>
              <strong>Collections:</strong> ALL, Blue, Cotton, Lucid Dreaming,
              Lucid Dreaming Bed Cover, Suta Home
            </p>
            <p>
              <strong>Type:</strong>Bed Linen
            </p>
          </div>
        </div>
      </div>
      {/* <Swiper
        navigation={true}
        spaceBetween={50}
        slidesPerView={1}
        modules={[Navigation, Thumbs]}
        className="mySwiper2"
      >
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-1.jpg"
            alt="slide"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-2.jpg"
            alt="slide"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-3.jpg"
            alt="slide"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-4.jpg"
            alt="slide"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-5.jpg"
            alt="slide"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-6.jpg"
            alt="slide"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-7.jpg"
            alt="slide"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-8.jpg"
            alt="slide"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-9.jpg"
            alt="slide"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-10.jpg"
            alt="slide"
          />
        </SwiperSlide>
      </Swiper>

      <Swiper
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-1.jpg"
            alt="slide"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-2.jpg"
            alt="slide"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-3.jpg"
            alt="slide"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-4.jpg"
            alt="slide"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-5.jpg"
            alt="slide"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-6.jpg"
            alt="slide"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-7.jpg"
            alt="slide"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-8.jpg"
            alt="slide"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-9.jpg"
            alt="slide"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-10.jpg"
            alt="slide"
          />
        </SwiperSlide>
      </Swiper> */}
    </div>
  );
};

export default ProductDetails;
