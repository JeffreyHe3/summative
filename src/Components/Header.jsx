import "./style.css"
import { useNavigate } from "react-router-dom"
import { useStoreContext } from "../Context";

function Header() {
  const navigate = useNavigate();
  const { fName, email, setEmail } = useStoreContext();

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
      {email ? (
        <>
          <h1 className="title">{`Hi ${fName}!`}</h1>
          <button className="headerButtons" onClick={() => navigate("/cart")}>Cart</button>
          <button className="headerButtons" onClick={() => navigate("/settings")}>Settings</button>
          <button className="headerButtons" onClick={() => { setEmail(null); navigate("/"); }}>Logout</button><br />
          <input type="text" id="searchBar" placeholder="Search Movies Here" onInput={(e) => onSearch(e)} />
        </>
      ) : (
        <>
          <button className="headerButtons" onClick={() => navigate("/login")}>Login</button>
          <button className="headerButtons" onClick={() => navigate("/register")}>Register</button>
        </>
      )}
    </div>
  );
}

export default Header;