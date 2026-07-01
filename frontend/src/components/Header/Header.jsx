import "./Header.css";

function Header() {
  return (
    <div className="text-center mb-5">
      <h1 className="fw-bold text-primary">
        Azure AI Loan Statement Extractor
      </h1>

      <p className="text-muted">
        Upload a loan statement and let Azure AI Document Intelligence extract
        the important information automatically.
      </p>
    </div>
  );
}

export default Header;
