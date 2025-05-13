import "./style.css"
import { useCallback, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useStoreContext } from "../Context";

function Header() {
  const navigate = useNavigate();
  const { setLogged, logged, fName, search, setSearch } = useStoreContext();

  function debounce(func, delay) {
    let timer;

    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay)
    }
  }

  const sendRequest = useCallback((value) => {
    setSearch(value);
    navigate("/movies/search");
  }, []);

  const debouncedSendRequest = useMemo(() => {
    return debounce(sendRequest, 500);
  }, [sendRequest]);

  const onChange = (e) => {
    debouncedSendRequest(e.target.value);
  };

  return (
    <div id="header">
      <h1 className="title">Jeffrey's Movies</h1>
      {logged ?
        <>
          <h1 className="title">{`Hi ${fName}!`}</h1>
          <button className="headerButtons" onClick={() => navigate("/cart")}>Cart</button>
          <button className="headerButtons" onClick={() => navigate("/settings")}>Settings</button>
          <button className="headerButtons" onClick={() => { setLogged(false); navigate("/"); }}>Logout</button><br />
          <input type="text" id="searchBar" placeholder="Search Movies Here" defaultValue={search} onChange={onChange} />
        </> : <>
          <button className="headerButtons" onClick={() => navigate("/login")}>Login</button>
          <button className="headerButtons" onClick={() => navigate("/register")}>Register</button>
        </>
      }
    </div>
  )
}

export default Header;