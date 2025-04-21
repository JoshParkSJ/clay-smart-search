import ExcelUI from '../components/ExcelUI';
import styles from "../styles/index.module.css";

export default function Home() {
  return (
    <main>
      <div className={styles.App}>
        <ExcelUI />
      </div>
    </main>
  )
} 
