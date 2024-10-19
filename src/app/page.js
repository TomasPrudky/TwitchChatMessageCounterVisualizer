"use client";

import styles from "./page.module.css";
import TwitchChat from "./components/TwitchChat";
import BarChart from "./components/BarChart";

export default function Home() {
  return (
    <div className={styles.page}>
      <header>
        <div>👦👦🏻👦🏼👦🏽👦🏾👦🏿</div>
      </header>
      <main className={styles.main}>
        <TwitchChat/>
      </main>
      <footer className={styles.footer}>
        <div>🦶🦶🏻🦶🏼🦶🏽🦶🏾🦶🏿</div>
      </footer>
    </div>
  );
}
