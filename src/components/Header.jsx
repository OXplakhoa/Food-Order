import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartUpdated, setCartUpdated] = useState(false);
  const prevCartItemsRef = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalCartItems = cartCtx.items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    if (totalCartItems > prevCartItemsRef.current) {
      setCartUpdated(true);
      const timer = setTimeout(() => setCartUpdated(false), 500);
      return () => clearTimeout(timer);
    }
    prevCartItemsRef.current = totalCartItems;
  }, [totalCartItems]);

  const handleShowCart = () => {
    userProgressCtx.showCart();
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/auth?mode=login");
  };

  const loginHandler = () => {
    navigate("/auth?mode=login");
  };

  return (
    <header id="main-header" className={isScrolled ? "scrolled" : ""}>
      <div id="title">
        <img src={Logo} alt="A restaurant" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        {isLoggedIn ? (
          <Button textOnly onClick={logoutHandler}>Đăng xuất</Button>
        ) : (
          <Button textOnly onClick={loginHandler}>Đăng nhập</Button>
        )}
        <Button 
          onClick={handleShowCart} 
          className={cartUpdated ? "cart-updated" : ""}
        >
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
