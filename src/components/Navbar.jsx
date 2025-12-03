export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px 40px",
        position: "sticky",
        top: 0,
        zIndex: 10,
        backdropFilter: "blur(12px)",
        background: "rgba(15,23,42,0.6)",
        borderBottom: "1px solid rgba(255,255,255,0.08)"
      }}
    >
      <h2 style={{ margin: 0 }}>Yash</h2>

      <div style={{ display: "flex", gap: "25px" }}>
        <a style={{color:'white'}} className="nav-link" href="#about">About</a>
        <a style={{color:'white'}} className="nav-link" href="#education">Education</a>
        <a style={{color:'white'}} className="nav-link" href="#skills">Skills</a>
        <a style={{color:'white'}} className="nav-link" href="#projects">Projects</a>
        <a style={{color:'white'}} className="nav-link" href="#contact">Contact</a>
      </div>
    </nav>
  );
}
