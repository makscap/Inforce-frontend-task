import logo from "../../images/logo.png";
import s from "./Footer.module.css";

export function Footer() {
  return (
    <div>
      <footer className={s.footer}>
        <div className="container">
          <a className={s.link} href="/">
            <img className={s.logo} src={logo} alt="logo" width="40px" />
            <span className={s.title}>PRODUCT'S SHOP</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
