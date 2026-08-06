export default function SearchBar({ query, setQuery, onSearch, loading }) {
  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control py-2"
        placeholder="Buscar por nombre o cédula..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
      />
      <button 
        className="btn btn-primary px-4 fw-semibold" 
        onClick={onSearch}
        disabled={loading}
        style={{ backgroundColor: '#194191', borderColor: '#194191' }} // Para forzar el azul UCNE si es necesario
      >
        {loading ? "Buscando..." : "Buscar"}
      </button>
    </div>
  );
}