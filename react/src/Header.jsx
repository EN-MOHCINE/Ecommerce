import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "./Header.css";
import Insta from "./photos/insta.svg";
import Facebook from "./photos/fb.svg";
import Zwa9a from "./photos/zwa9a.svg";
import Logo from "./photos/whiteLogo.svg";
import Blogo from "./photos/blackLogo.svg";
import Flesh from "./photos/fleshDrop.svg";
import Search from "./photos/search.svg";
import WCart from "./photos/cart.svg";
import UserIcon from "./photos/user.svg";
import Favorite from "./photos/favorite.svg";
import CartHover from "./photos/cartHover.svg";
import UserIconHover from "./photos/userHover.svg";
import FavoriteHover from "./photos/favoriteHover.svg";
import World from "./photos/world.svg";
import Bsearch from "./photos/Bsearch.svg";
import Bcart from "./photos/Bcart.svg";
import Bfavorite from "./photos/Bfavorite.svg";
import Buser from "./photos/Buser.svg";
import SignIn from "./Components/SignIn";
import Cart from "./Components/Cart";
import hamburgerNav from "./photos/hamburgerNav.svg";
import BhamburgerNav from "./photos/BhamburgerNav.svg";
function Header() {
  const location = useLocation();
  const [collectionName, setCollectionName] = useState([]);
  const [categoriesName, setCategoriesName] = useState([]);
  const [t, i18n] = useTranslation();
  const [isClicked, setIsClicked] = useState(false);
  const [stickyNav, setStickyNav] = useState(false);
  const [styleHeader, setStyleHeader] = useState("");
  const [authDiv, setAuthDiv] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const [countCart, setCountCart] = useState("");
  const [visibilityCart, setVisiblityCart] = useState(false);
  const [searchKey, setSearchKey] = useState(false);
  const [collectionSection, setCollectionSection] = useState(false);
  const [categoriesSection, setCategoriesSection] = useState(false);
  const [navMobile, setNavMobile] = useState(false);
  const focusIn = useRef();
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/dropDownCollections")
      .then((response) => {
        setCollectionName(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("http://127.0.0.1:8000/api/dropDownCategories")
      .then((response) => {
        setCategoriesName(response.data);
      });
  }, []);
  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/api/countCart/${localStorage.getItem("user_id")}`
      )
      .then((response) => {
        setCountCart(response.data);
      });
  });
  useEffect(() => {
    if (location.pathname === "/") {
      if (stickyNav) {
        setStyleHeader("HeaderOther");
      } else {
        setStyleHeader("HeaderIndex");
      }
    } else {
      setStyleHeader("HeaderOther");
    }
  }, [location.pathname, stickyNav]);
  function handleAuth() {
    if (!localStorage.getItem("user_id")) {
      setAuthDiv("visible");
    }
  }
  function handleCart() {
    if (!localStorage.getItem("user_id")) {
      setAuthDiv("visible");
    } else {
      setVisiblityCart(true);
    }
  }
  function handleLogout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_role");
    navigate("/");
  }
  function callIT() {
    SearchClick();
    focusInput();
  }
  function SearchClick() {
    setIsClicked(!isClicked);
    setSearchKey("");
  }
  function focusInput() {
    focusIn.current.focus();
  }

  localStorage.setItem("transliton", i18n.language);
  useEffect(() => {
    setUserName(localStorage.getItem("user_name"));
  }, [localStorage.getItem("user_id")]);

  function stickyEv() {
    if (window.scrollY > 1) {
      setStickyNav(true);
    } else {
      setStickyNav(false);
    }
  }
  function handleSearch(params) {
    axios.get();
  }
  window.addEventListener("scroll", stickyEv);

  return (
    <>
      <Cart visibility={visibilityCart} setVisibility={setVisiblityCart} />
      {navMobile ? (
        <div id="mobileNav">
          <span
            onClick={() => setNavMobile(false)}
            style={{ position: "absolute", right: "10px", cursor: "pointer" }}
          >
            X
          </span>
          <ul>
            <li>
              <img src={Buser} style={{ width: "15px", marginRight: "5px" }} />
              {localStorage.getItem("user_id") ? (
                localStorage.getItem("user_name") !== "undefined" || "" ? (
                  <span>{userName}</span>
                ) : (
                  ""
                )
              ) : (
                <span onClick={handleAuth}>Connect</span>
              )}
            </li>
            {localStorage.getItem("user_role") ? (
              <li
                onClick={() => {
                  navigate("/adminPannel");
                  setNavMobile(false);
                }}
              >
                Admin panel
              </li>
            ) : (
              ""
            )}
            <li onClick={() => setCollectionSection(!collectionSection)}>
              Collections
              <ul
                className="MobilList"
                id=""
                style={{ display: collectionSection ? "block" : "none" }}
              >
                {collectionName.length !== 0 ? (
                  collectionName.map((collection) => (
                    <Link
                      to={`/products/collections/collections/${collection.collection_id}`}
                      key={collection.collection_id}
                      onClick={() => setNavMobile(false)}
                    >
                      <li className="mobileNavLinks">
                        {collection.collection_name}
                      </li>
                    </Link>
                  ))
                ) : (
                  <li>accun result</li>
                )}
              </ul>
            </li>
            <li onClick={() => setCategoriesSection(!categoriesSection)}>
              Categories
              <ul
                className="MobilList"
                id=""
                style={{ display: categoriesSection ? "block" : "none" }}
              >
                {categoriesName.length !== 0 ? (
                  categoriesName.map((category) => (
                    <Link
                      to={`/products/categories/categories/${category.category_id}`}
                      key={category.category_id}
                      onClick={() => setNavMobile(false)}
                    >
                      <li className="mobileNavLinks">
                        {category.name_Category}
                      </li>
                    </Link>
                  ))
                ) : (
                  <li>accune result</li>
                )}
              </ul>
            </li>
            <li>
              <Link
                style={{ color: "black" }}
                to="/contact"
                onClick={() => setNavMobile(false)}
              >
                Contact us
              </Link>
            </li>
            {localStorage.getItem("user_id") ? (
              <li
                onClick={() => {
                  handleLogout();
                  setNavMobile(false);
                }}
              >
                Log out
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      ) : (
        ""
      )}

      <div id="support">
        <span>
          <img src={World} alt="" />
          <select
            value={i18n.language}
            onChange={(e) => {
              i18n.changeLanguage(e.target.value);
            }}
          >
            <option value="en">English</option>
            <option value="fr">Frensh</option>
            <option value="ar">Arabe</option>
          </select>
        </span>
        <span className="HeaderSup news">
          <img src={Zwa9a} alt="zwa9a" className="zwa9a" />
          <div>
            <p id={localStorage.getItem == "ar" ? "p1" : "p"}>
              {t("support.news")}
            </p>
          </div>
          <img src={Zwa9a} alt="zwa9a" className="zwa9a" />
        </span>
        <span>
          <a href="https://www.instagram.com/b1unique/" target="_blank">
            <img src={Insta} alt="svg inst" />
          </a>
          <a
            href="https://web.facebook.com/profile.php?id=100089980466968"
            target="_blank"
          >
            {" "}
            <img src={Facebook} alt="svg fb" />
          </a>
        </span>
      </div>

      <div className={styleHeader}>
        <div
          id="searchDiv"
          className="navLinkM"
          style={{ visibility: isClicked ? "visible" : "hidden" }}
        >
          <div>
          <Link to={`products/search/${searchKey}`} id="icconLinksearch">
            <img src={Search} onClick={SearchClick} />
          </Link>
          <input
            type="text"
            ref={focusIn}
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <button onClick={SearchClick} id="closeBtnSearch">
            X
          </button>
          </div>
        </div>
        <ul id="navbar">
          <li className="searchM" onClick={() => setNavMobile(true)}>
            <img
              src={
                location.pathname == "/"
                  ? stickyNav
                    ? BhamburgerNav
                    : hamburgerNav
                  : BhamburgerNav
              }
            />
          </li>
          <li className="navLink navLinkM" id="searchList">
            <img
              src={
                location.pathname == "/"
                  ? stickyNav
                    ? Bsearch
                    : Search
                  : Bsearch
              }
              onClick={callIT}
            />
          </li>
          <li className="navLink navLinkM" id="collection">
            {t("nav.0")} <img src={Flesh} alt="" />
            <ul className="dropDown" id="collectionList">
              {collectionName.length !== 0 ? (
                collectionName.map((collection) => (
                  <Link
                    to={`/products/collections/collections/${collection.collection_id}`}
                    key={collection.collection_id}
                  >
                    <li key={collection.collection_id}>
                      {collection.collection_name}
                    </li>
                  </Link>
                ))
              ) : (
                <li>accun result</li>
              )}
            </ul>
          </li>
          <li className="navLink navLinkM" id="clothing">
            {t("nav.1")} <img src={Flesh} alt="" />
            <ul className="dropDown" id="clothingList">
              {categoriesName.length !== 0 ? (
                categoriesName.map((category) => (
                  <Link
                    to={`/products/categories/categories/${category.category_id}`}
                    key={category.category_id}
                  >
                    <li>{category.name_Category}</li>
                  </Link>
                ))
              ) : (
                <li>accune result</li>
              )}
            </ul>
          </li>
          <Link to="/" className="navLink logoLink">
            {location.pathname == "/" ? (
              stickyNav ? (
                <img src={Blogo} alt="svg inst" className="logo" />
              ) : (
                <img src={Logo} alt="svg inst" className="logo" />
              )
            ) : (
              <img src={Blogo} alt="svg inst" className="logo" />
            )}
          </Link>
          <li to="/About" className="navLink navLinkM" id="about">
            {t("nav.2")} <img src={Flesh} alt="" />
            <ul className="dropDown" id="aboutList">
              <Link>
                <li>Our Story</li>
              </Link>
              <Link>
                <li>Our Brand Values</li>
              </Link>
            </ul>
          </li>
          <li className="navLink navLinkM">
            <Link className="a" to="/contact">
              {t("nav.3")}
            </Link>
          </li>
          <li className="navLink " id="iconList">
            {localStorage.getItem("user_name") !== "undefined" || "" ? (
              <span className="navLinkM">{userName}</span>
            ) : (
              ""
            )}

            <div
              id={userName ? "dropDownUser" : ""}
              className="navLinkM"
              onClick={handleAuth}
            >
              <img
                src={
                  location.pathname == "/"
                    ? stickyNav
                      ? Buser
                      : UserIcon
                    : Buser
                }
                className="headerIconRight"
              />
              <img src={UserIconHover} className="headerIconRightHover" />
              <ul className="dropDown" id="userList">
                {localStorage.getItem("user_role") === "2" ? (
                  <Link to={"/adminPannel/products"}>
                    <li>Admin panel</li>
                  </Link>
                ) : (
                  ""
                )}
                <Link>
                  <li onClick={handleLogout}>commands</li>
                </Link>
                <a>
                  <li onClick={handleLogout}>logout</li>
                </a>
              </ul>
            </div>
            <ul className="searchM">
              <li className="navLink searchM" id="searchList">
                <img
                  src={
                    location.pathname == "/"
                      ? stickyNav
                        ? Bsearch
                        : Search
                      : Bsearch
                  }
                  onClick={callIT}
                />
              </li>
            </ul>
            <div onClick={handleCart}>
              <img
                src={
                  location.pathname == "/" ? (stickyNav ? Bcart : WCart) : Bcart
                }
                className="headerIconRight"
              />
              <img src={CartHover} className="headerIconRightHover" alt="" />
              <span className="iconBadge">{countCart ? countCart : 0}</span>
            </div>
            <div onClick={handleAuth} className="navLinkM">
              <img
                src={
                  location.pathname == "/"
                    ? stickyNav
                      ? Bfavorite
                      : Favorite
                    : Bfavorite
                }
                className="headerIconRight"
              />
              <img src={FavoriteHover} className="headerIconRightHover" />
              <span className="iconBadge">0</span>
            </div>
          </li>
        </ul>
        <SignIn visibility={authDiv} setVisiblity={setAuthDiv} />
      </div>
    </>
  );
}

export default Header;
