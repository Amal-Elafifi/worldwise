import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <div className={styles.footer}>
            <p className={styles.copyright}>
                &copy; copyright {new Date().getFullYear()} 
                by worldwise inc.
            </p>
        </div>
    )
}

export default Footer;