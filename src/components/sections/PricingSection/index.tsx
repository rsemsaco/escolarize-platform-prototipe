import * as React from 'react';
import classNames from 'classnames';
import Markdown from 'markdown-to-jsx';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { getDataAttrs } from '../../../utils/get-data-attrs';
import Section from '../Section';
import TitleBlock from '../../blocks/TitleBlock';
import ImageBlock from '../../blocks/ImageBlock';
import { Action, Badge } from '../../atoms';

// 🔑 Firebase
import { db } from '../../../utils/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default function PricingSection(props: any) {
  const { elementId, colors, backgroundImage, badge, title, subtitle, plans = [], styles = {}, enableAnnotations } = props;

  // 🔎 Estados da busca
  const [queryText, setQueryText] = React.useState('');
  const [field, setField] = React.useState('all');
  const [results, setResults] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<any>(null);

  // 🔍 Função de busca no Firestore
  const handleSearch = async () => {
    if (!queryText.trim()) return;
    setLoading(true);

    try {
      const firebaseCollection = props.firebaseCollection || 'Artigos_Brasil';
      const colRef = collection(db, firebaseCollection);
      const snapshot = await getDocs(colRef);

      const allData: any[] = [];
      snapshot.forEach((doc) => allData.push(doc.data()));

      const lowerQuery = queryText.toLowerCase();

      const filtered = allData.filter((item) => {
        if (field === 'all') {
          return (
            item['Título do Documento']?.toLowerCase().includes(lowerQuery) ||
            item['Todos os autores']?.toLowerCase().includes(lowerQuery) ||
            item['Marcador']?.toLowerCase().includes(lowerQuery)
          );
        } else {
          return item[field]?.toLowerCase().includes(lowerQuery);
        }
      });

      setResults(filtered);
    } catch (error) {
      console.error('❌ Erro ao buscar no Firebase:', error);
      setResults([]);
    }

    setLoading(false);
  };

  // 📤 Exportar CSV
  const exportCSV = () => {
    if (!results.length) return alert('Nenhum dado para exportar.');
    const headers = ['Título do Documento','Todos os autores','Revista','Data de Publicação','URL','Marcador'];
    let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\r\n";
    results.forEach(row => {
      csvContent += headers.map(h => `"${row[h] || ''}"`).join(",") + "\r\n";
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `escolarize_busca.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Section
      elementId={elementId}
      className="sb-component-pricing-section"
      colors={colors}
      backgroundImage={backgroundImage}
      styles={styles?.self}
      {...getDataAttrs(props)}
    >
      <div className={classNames('w-full', 'flex', 'flex-col', mapStyles({ alignItems: styles?.self?.justifyContent ?? 'flex-start' }))}>

        {/* Badge */}
        {badge && <Badge {...badge} className="w-full max-w-sectionBody" {...(enableAnnotations && { 'data-sb-field-path': '.badge' })} />}

        {/* Título */}
        {title && (
          <TitleBlock
            {...title}
            className={classNames('w-full', 'max-w-sectionBody', { 'mt-4': badge?.label })}
            {...(enableAnnotations && { 'data-sb-field-path': '.title' })}
          />
        )}

        {/* Subtítulo */}
        {subtitle && (
          <p
            className={classNames(
              'w-full',
              'max-w-sectionBody',
              'text-lg',
              'sm:text-2xl',
              styles?.subtitle ? mapStyles(styles?.subtitle) : undefined,
              { 'mt-4': badge?.label || title?.text }
            )}
            {...(enableAnnotations && { 'data-sb-field-path': '.subtitle' })}
          >
            {subtitle}
          </p>
        )}

        {/* 🔎 Barra de pesquisa - AGORA abaixo do subtítulo */}
        <div style={{ margin: '1.5rem 0', display:'flex', gap:'0.5rem', flexWrap:'wrap', width:'100%', maxWidth:'800px' }}>
          <select
            value={field}
            onChange={(e) => setField(e.target.value)}
            style={{ padding:'0.5rem', borderRadius:'4px', border:'1px solid #ccc', backgroundColor:'#f0f0f0' }}
          >
            <option value="all">Todos</option>
            <option value="Todos os autores">Autores</option>
            <option value="Título do Documento">Título</option>
            <option value="Marcador">Marcador</option>
          </select>
          <input
            type="text"
            placeholder="Digite sua pesquisa..."
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            style={{ flex:1, padding:'0.5rem', borderRadius:'4px', border:'1px solid #ccc', backgroundColor:'#f0f0f0' }}
          />
          <button
            onClick={handleSearch}
            style={{ padding:'0.5rem 1rem', borderRadius:'4px', backgroundColor:'#d3d3d3', border:'none', cursor:'pointer' }}
          >
            Pesquisar
          </button>
          <button
            onClick={exportCSV}
            style={{ padding:'0.5rem 1rem', borderRadius:'4px', backgroundColor:'#d3d3d3', border:'none', cursor:'pointer' }}
          >
            Exportar CSV
          </button>
        </div>

        {/* 📋 Resultados */}
        <div className="mb-6" style={{ display:'flex', flexDirection:'column', gap:'0.5rem', width:'100%', maxWidth:'800px' }}>
          {loading && <p>Carregando...</p>}
          {!loading && !results.length && queryText && <p>Nenhum resultado encontrado.</p>}
          {results.map((item, index) => (
            <div
              key={index}
              style={{
                padding:'0.5rem',
                border:'1px solid #ccc',
                borderRadius:'4px',
                backgroundColor:'#f7f7f7',
                cursor:'pointer'
              }}
              onClick={() => { setSelectedItem(item); setShowModal(true); }}
            >
              <strong>{item["Título do Documento"]}</strong>
              <p>{item["Todos os autores"]} - {item["Revista"]} ({item["Data de Publicação"]})</p>
            </div>
          ))}
        </div>

        {/* Modal de detalhes */}
        {showModal && selectedItem && (
          <div
            style={{
              position:'fixed', top:0, left:0, width:'100%', height:'100%',
              backgroundColor:'rgba(0,0,0,0.4)', display:'flex', justifyContent:'center', alignItems:'center', zIndex:1000
            }}
            onClick={() => setShowModal(false)}
          >
            <div
              style={{
                backgroundColor:'#f0f0f0',
                padding:'1rem 1.5rem',
                borderRadius:'6px',
                minWidth:'300px',
                maxWidth:'90%',
                maxHeight:'80%',
                overflowY:'auto'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 style={{ marginBottom:'0.5rem' }}>{selectedItem["Título do Documento"]}</h3>
              <p><strong>Autores:</strong> {selectedItem["Todos os autores"] || 'N/A'}</p>
              <p><strong>Revista:</strong> {selectedItem["Revista"] || 'N/A'}</p>
              <p><strong>Data de Publicação:</strong> {selectedItem["Data de Publicação"] || 'N/A'}</p>
              <p><strong>URL:</strong> {selectedItem["URL"] ? <a href={selectedItem["URL"]} target="_blank">{selectedItem["URL"]}</a> : 'N/A'}</p>
              <p><strong>Marcador:</strong> {selectedItem["Marcador"] || 'N/A'}</p>
              <button
                style={{ marginTop:'1rem', padding:'0.5rem 1rem', borderRadius:'4px', border:'none', backgroundColor:'#d3d3d3', cursor:'pointer' }}
                onClick={() => setShowModal(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        )}

        {/* Planos originais */}
        {plans.length > 0 && (
          <div className={classNames('w-full', 'overflow-x-hidden', { 'mt-12': !!(badge?.label || title?.text || subtitle) })}>
            <div
              className={classNames(
                'flex',
                'flex-wrap',
                'items-stretch',
                mapStyles({ justifyContent: styles?.self?.justifyContent ?? 'flex-start' }),
                'gap-y-10',
                '-mx-5'
              )}
              {...(enableAnnotations && { 'data-sb-field-path': '.plans' })}
            >
              {plans.map((plan: any, index: number) => (
                <div
                  key={index}
                  className="px-5 basis-full max-w-full sm:basis-5/6 sm:max-w-[83.33333%] md:basis-2/3 md:max-w-[66.66667%] lg:basis-1/3 lg:max-w-[33.33333%]"
                >
                  <PricingPlan {...plan} hasSectionTitle={!!title?.text} {...(enableAnnotations && { 'data-sb-field-path': `.${index}` })} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}

function PricingPlan(props: any) {
  const { elementId, title, price, details, description, features = [], image, actions = [], colors = 'bg-light-fg-dark', styles = {}, hasSectionTitle } = props;
  const fieldPath = props['data-sb-field-path'];
  const TitleTag: any = hasSectionTitle ? 'h3' : 'h2';

  return (
    <div
      id={elementId}
      className={classNames(
        'sb-card',
        'h-full',
        colors,
        styles?.self?.margin ? mapStyles({ margin: styles?.self?.margin }) : undefined,
        styles?.self?.borderWidth && styles?.self?.borderWidth !== 0 && styles?.self?.borderStyle !== 'none'
          ? mapStyles({
              borderWidth: styles?.self?.borderWidth,
              borderStyle: styles?.self?.borderStyle,
              borderColor: styles?.self?.borderColor ?? 'border-primary'
            })
          : undefined,
        styles?.self?.borderRadius ? mapStyles({ borderRadius: styles?.self?.borderRadius }) : undefined,
        styles?.self?.textAlign ? mapStyles({ textAlign: styles?.self?.textAlign }) : undefined,
        'overflow-hidden',
        'flex',
        'flex-col'
      )}
      data-sb-field-path={fieldPath}
    >
      {image?.url && (
        <ImageBlock
          {...image}
          className={classNames('flex', mapStyles({ justifyContent: styles?.self?.justifyContent ?? 'flex-start' }))}
          {...(fieldPath && { 'data-sb-field-path': '.image' })}
        />
      )}
      {(title || price || details || description || features.length > 0 || actions.length > 0) && (
        <div
          id={elementId}
          className={classNames('grow', 'flex', 'flex-col', styles?.self?.padding ? mapStyles({ padding: styles?.self?.padding }) : undefined)}
        >
          {title && (
            <TitleTag
              className="text-xl font-normal normal-case tracking-normal no-underline"
              {...(fieldPath && { 'data-sb-field-path': '.title' })}
            >
              {title}
            </TitleTag>
          )}
          {(price || details) && (
            <div className={classNames({ 'mt-6': title })}>
              {price && (
                <div className="text-4xl sm:text-6xl font-medium" {...(fieldPath && { 'data-sb-field-path': '.price' })}>
                  {price}
                </div>
              )}
              {details && (
                <div
                  className={classNames('text-sm', 'font-medium', { 'mt-2': title })}
                  {...(fieldPath && { 'data-sb-field-path': '.details' })}
                >
                  {details}
                </div>
              )}
            </div>
          )}
          {description && (
            <Markdown
              options={{ forceBlock: true, forceWrapper: true }}
              className={classNames('sb-markdown', { 'mt-10': title || price || details })}
              {...(fieldPath && { 'data-sb-field-path': '.description' })}
            >
              {description}
            </Markdown>
          )}
          {features.length > 0 && (
            <ul
              className={classNames('list-disc', 'list-inside', 'text-sm', 'space-y-2', {
                'mt-4': description,
                'mt-10': !description && (title || price || details)
              })}
              {...(fieldPath && { 'data-sb-field-path': '.features' })}
            >
              {features.map((bullet: string, index: number) => (
                <li key={index} {...(fieldPath && { 'data-sb-field-path': `.${index}` })}>
                  {bullet}
                </li>
              ))}
            </ul>
          )}
          {actions.length > 0 && (
            <div
              className={classNames(
                'flex',
                'flex-wrap',
                mapStyles({ justifyContent: styles?.self?.justifyContent ?? 'flex-start' }),
                'items-center',
                'gap-4',
                {
                  'mt-auto pt-12': title || price || details || description || features.length > 0
                }
              )}
              {...(fieldPath && { 'data-sb-field-path': '.actions' })}
            >
              {actions.map((action: any, index: number) => (
                <Action key={index} {...action} className="lg:whitespace-nowrap" {...(fieldPath && { 'data-sb-field-path': `.${index}` })} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
