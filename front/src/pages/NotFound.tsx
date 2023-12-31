import styles from "./pagesStyles/NotFound.module.css";

function NotFound() {
    return (
      <div className={styles.notFoundWrapper}>
          <img src="/images/cat_cable.png"></img>
          <h2 className={styles.notFoundTitle}>Page not found :(</h2>
      </div>
    );
}

export default NotFound;