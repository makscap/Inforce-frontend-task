import logo from "../../images/logo.png";
import s from "./Header.module.css";
import ButtonAddProduct from "../ProductsList/ButtonAddProduct/ButtonAddProduct";

export function Header() {
  return (
    <div className={s.headerSection}>
      <div className="container">
        <header className={s.header}>
          <a className={s.link} href="/">
            <img className={s.logo} src={logo} alt="logo" width="40px" />
            <span className={s.title}>PRODUCT'S SHOP</span>
          </a>
          <ButtonAddProduct />
        </header>
      </div>
    </div>
  );
}
