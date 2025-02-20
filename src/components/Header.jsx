import Logo from "../assets/logo.jpg";
export default function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={Logo} alt="A restaurant" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <button>Cart (0)</button>
      </nav>
    </header>
  );
}
