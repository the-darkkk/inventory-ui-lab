import { NavLink } from 'react-router-dom';

export default function FavoritesBar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
        Галерея інвентарю
      </NavLink>
      <NavLink to="/favorites" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
        Улюблені ❤️
      </NavLink>
    </nav>
  );
}