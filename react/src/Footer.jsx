import React from "react";
import "./Footer.css";
import phone from "./photos/phone.svg";
import mail from "./photos/mail.svg";
import insta from "./photos/instaMini.svg";
import tiktok from "./photos/tiktok.svg";
import facebook from "./photos/facebook.svg";
import whatsapp from "./photos/whatsapp.svg";
import send from "./photos/send.svg";
import logo from "./photos/a.png";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="footer">
      <div id="logoSec">
          <img src={logo}/>
      </div>
      <div id="containerF">
        <div>
          <p className="title">contact us</p>
          <ul>
            <li className="li"> 
              <img src={mail} className='iccons lg'/>
              Unic@gmail.com
            </li>
          </ul>
          <p className="title follow" >Follow us on</p>
          <div className="social">
            <img src={insta} className='iccons'/>
            <img src={facebook} className='iccons'/>
            <img src={whatsapp} className='iccons'/>
            <img src={tiktok} className='iccons'/>
          </div>
        </div>
        <div className="FullScrenDiv">
          <p className="title">profil</p>
          <ul>
          <li className="li">
                My Account
            </li> 
            <li className="li">
                Login
            </li> 
            <li className="li">
                My cart
            </li> 
            <li className="li">
                Wishlist
            </li>
          </ul>
        </div>
        <div>
          <p className="title">services</p>
          <ul>
            <li className="li">
                About us
            </li>
            <li className="li">
                Delivery Information
            </li>
          </ul>
        </div>
        <div className="FullScrenDiv">
          <p className="title">Nos cataloges</p>
          <ul>
            
            <li className="li">
            <Link to='/products/categories/5'>Hoodies</Link>
            </li>
            <li className="li">
                <Link to='/products/categories/2'>Jackets</Link>
            </li>
            <li className="li">
                <Link to='/products/categories/7'>Pants</Link>
            </li>
            <li className="li">
                <Link to='/products/categories/1'>Sweatshirts</Link>
            </li> <li className="li">
                <Link to='/products/categories/3'>Tanks Tops</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
