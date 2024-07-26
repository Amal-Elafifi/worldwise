import { Outlet } from "react-router-dom";
import Logo from "./Logo";
import AppNav from "./AppNav";
import Footer from "./Footer";
import styles from "./SideBar.module.css";

const SideBar = () => {
    return (
        <div className={styles.sidebar}>
            <Logo/>
            <AppNav/>
            <Outlet/>
            <Footer/>
        </div>
    )
}
export default SideBar;