import * as React from 'react';

interface SearchSidebarProps {
  results: any[];
  years: string[];
  magazines: string[];
  tags: string[];
  onFilterChange: (filterType: string, value: string) => void;
  selectedFilters: {
    year: string;
    magazine: string;
    tag: string;
  };
}

export default function SearchSidebar({
  results,
  years,
  magazines,
  tags,
  onFilterChange,
  selectedFilters
}: SearchSidebarProps) {
  return (
    <aside className="search-sidebar">
      {/* 📊 Quantidade de Resultados */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">Resultados</h3>
        <p className="sidebar-count">
          <strong>{results.length}</strong> artigos encontrados
        </p>
      </div>

      {/* 📅 Filtro por Data */}
      <div className="sidebar-section">
        <h4 className="sidebar-subtitle">Data de Publicação</h4>
        <div className="filter-group">
          <label className="filter-option">
            <input
              type="radio"
              name="year"
              value=""
              checked={selectedFilters.year === ''}
              onChange={(e) => onFilterChange('year', e.target.value)}
            />
            <span>Todos os anos</span>
          </label>
          {years.map((year) => (
            <label key={year} className="filter-option">
              <input
                type="radio"
                name="year"
                value={year}
                checked={selectedFilters.year === year}
                onChange={(e) => onFilterChange('year', e.target.value)}
              />
              <span>{year}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 📰 Filtro por Revista */}
      <div className="sidebar-section">
        <h4 className="sidebar-subtitle">Revista</h4>
        <div className="filter-group">
          <label className="filter-option">
            <input
              type="checkbox"
              value=""
              checked={selectedFilters.magazine === ''}
              onChange={(e) => onFilterChange('magazine', '')}
            />
            <span>Todas</span>
          </label>
          {magazines.map((mag) => (
            <label key={mag} className="filter-option">
              <input
                type="checkbox"
                value={mag}
                checked={selectedFilters.magazine === mag}
                onChange={(e) => onFilterChange('magazine', e.target.value)}
              />
              <span>{mag}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 🏷️ Filtro por Marcador */}
      <div className="sidebar-section">
        <h4 className="sidebar-subtitle">Marcador</h4>
        <div className="filter-group">
          <label className="filter-option">
            <input
              type="checkbox"
              value=""
              checked={selectedFilters.tag === ''}
              onChange={(e) => onFilterChange('tag', '')}
            />
            <span>Todos</span>
          </label>
          {tags.map((tag) => (
            <label key={tag} className="filter-option">
              <input
                type="checkbox"
                value={tag}
                checked={selectedFilters.tag === tag}
                onChange={(e) => onFilterChange('tag', e.target.value)}
              />
              <span>{tag}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
