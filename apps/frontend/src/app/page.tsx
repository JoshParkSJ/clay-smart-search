import ExcelUI from '../components/ExcelUI';
import styles from "../styles/index.module.css";

export const metadata = {
  title: 'Clay - Smart Search Demo',
  icons: {
    icon: '../assets/clay-logo-tab.png',
  },
};

export default function Home() {
  return (
    <main>
      <div className={styles.App}>
        <ExcelUI />
      </div>
    </main>
  )
}
