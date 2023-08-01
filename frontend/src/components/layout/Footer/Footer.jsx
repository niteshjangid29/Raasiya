import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaRegCopyright,
} from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-12">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <Link to="/">Return & Exchange Request</Link>
              </li>
              <li>
                <Link to="/">Frequently Asked Questions</Link>
              </li>
              <li>
                <Link to="/">Wholesale Enquiry</Link>
              </li>
              <li>
                <Link to="/">Terms of Service</Link>
              </li>
              <li>
                <Link to="/">Refund Policy</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4 col-12">
            <h3>Customer Service</h3>
            <ul>
              <li>
                <Link to="/">Track Order</Link>
              </li>
              <li>
                <Link to="/">Terms & Conditons</Link>
              </li>
              <li>
                <Link to="/">Shipping & Delivry Policy</Link>
              </li>
              <li>
                <Link to="/">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/">Disclaimer Policy</Link>
              </li>
              <li>
                <Link to="/">Cancellation & Refund Policy</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4 col-12">
            <h3>Contact Us</h3>
            <ul className="footer-contact">
              <li>
                <a href="tel:+918591950399">
                  <FaPhoneAlt />
                  +91 85919 50399
                </a>
              </li>
              <li>
                <a href="mailto:customercare@raasiya.com">
                  <FaEnvelope />
                  customercare@raasiya.com
                </a>
              </li>
              <li>
                <Link to="/">
                  <MdLocationPin fontSize="1rem" />
                  Unit No. CA/4, 2nd Floor, Suyog Industrial Estate, LBS Marg,
                  Vikhroli West, Mumbai - 400 083
                </Link>
              </li>
            </ul>
            <div className="social-media">
              <a
                href="https://instagram.com/raasiyahomefashion?igshid=MzRlODBiNWFlZA=="
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100092622751991&mibextid=LQQJ4d"
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.linkedin.com/company/raasiya-home-fashion"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedinIn />
              </a>
              {/* <Link to="/">
                <FaPinterest />
              </Link> */}
            </div>
          </div>
        </div>
      </div>
      <hr />
      <p>
        Copyright <FaRegCopyright /> 2023 Raasiya Pvt Ltd
      </p>
    </div>
  );
};

export default Footer;
