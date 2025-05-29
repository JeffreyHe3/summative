import "./style.css"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useStoreContext } from "../Context";
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useStoreContext();
  const [name, setName] = useState([]);

  useEffect(() => {
    if (user && user.displayName) {
      setName(user.displayName.split(" "));
    }
    console.log(user.displayName)
    console.log(name[0])
    console.log(name[1])
  }, [user]);

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    }
  }

  const onSearch = debounce((e) => {
    if (e.target.value) {
      navigate(`/movies/search/${e.target.value}`);
    }
  }, 500);

  return (
    <div id="header">
      <h1 className="title">Jeffrey's Movies</h1>
      {user ? (
        <>
          <h1 className="title">{`Hi ${name[0]}!`}</h1>
          <button className="headerButtons" onClick={() => navigate("/cart")}>Cart</button>
          <button className="headerButtons" onClick={() => navigate("/settings")}>Settings</button>
          <button className="headerButtons" onClick={() => { setUser(null); signOut(auth); navigate("/"); }}>Logout</button><br />
          <input type="text" id="searchBar" placeholder="Search Movies Here" onInput={(e) => onSearch(e)} />
        </>
      ) : (
        <>
          <button className="headerButtons" onClick={() => navigate("/login")}>Login</button>
          <button className="headerButtons" onClick={() => navigate("/register")}>Register</button>
        </>
      )
      }
    </div>
  );
}

export default Header;