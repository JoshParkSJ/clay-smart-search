import ExcelUI from '../components/ExcelUI';
import './globals.css';

export const metadata = {
  title: 'Clay - Smart Search Demo',
  icons: {
    icon: '/clay-logo-tab.png',
  },
};

export default function Home() {
  return (
    <main>
      <ExcelUI />
    </main>
  )
}
