import Image from "next/image";
import styles from "@style/page.module.css";
import PessoasTable from "@organism/PessoasTable";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
       <PessoasTable/>
      </div>
    </main>
  );
}
