"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [users, setUsers] = useState([]); // State to store users
  const [loading, setLoading] = useState(true); // State to handle loading

  // Function to fetch users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://api.github.com/users", {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch the users");
      }
      const data = await res.json();
      setUsers(data); // Update the state with the fetched users
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={styles.page}>
      <h1 style={{fontSize:"46px",textAlign:"center",padding:"50px 0 0 0 "}}>GitHub Users</h1>
      <main className={styles.main}>
        {users.map((user) => {
          const { login, id, avatar_url, html_url } = user;
          return (
            <div key={id} className={styles.profile}>
              <div style={{display:"flex",alignItems:"center"}}>
                <img src={avatar_url} alt={login} className={styles.image} />
                <h3 className={styles.name}>{login}</h3>
              </div>
              <a href={html_url} className={styles.link} >Visit Profile</a>
            </div>
          );
        })}
      </main>
    </div>
  );
}
