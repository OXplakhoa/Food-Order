import Logo from "../assets/logo.jpg";
export default function Header() {
  return (
    <>
      <header id="main-header">
        <div id="title">
          <img src={Logo} alt="Logo" />
          <h1>ReactFOOD</h1>
        </div>
        <button>Cart</button>
      </header>
    </>
  );
}
