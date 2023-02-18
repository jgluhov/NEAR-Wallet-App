import Header from '../header/Header';
import styles from './page.module.css';

interface IPageProps {
  children: React.ReactNode;
}

const Page = (props: IPageProps) => {
  return (
    <div className={styles.page}>
      <Header className={styles.header} />
      <div className={styles.content}>
        { props.children }
      </div>
    </div>
  ) 
}

export default Page;