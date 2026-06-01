interface NavbarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export function Navbar({ search, onSearchChange }: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        CINE<span>MAX</span>
      </div>

      <ul className="navbar__menu">
        {["Filmes", "Cinemas", "Loja", "Eventos", "Clube"].map((item, index) => (
          <li key={item}>
            <a className={index === 0 ? "active" : ""} href="#">
              {item}
            </a>
          </li>
        ))}
      </ul>

      <div className="navbar__actions">
        <div className="navbar__search">
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Buscar filme..."
          />
          <span>🔍</span>
        </div>

        <button className="button-outline">Entrar</button>
        <button className="button-primary">Cadastrar</button>
      </div>
    </nav>
  );
}
