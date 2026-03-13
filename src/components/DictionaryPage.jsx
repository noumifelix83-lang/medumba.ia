import { useState, useMemo } from 'react';
import { DICTIONARY } from '../data/medumbaDictionary';

const DictionaryPage = ({ nativeLang, onBack }) => {
    const isFr = nativeLang === 'french';
    const [query,    setQuery]    = useState('');
    const [lang,     setLang]     = useState('medumba'); // search in 'medumba' or 'french'
    const [speaking, setSpeaking] = useState(null);

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return [];
        const key = lang === 'medumba' ? 'medumba' : 'french';
        const rank = (w) => {
            const lw = w.toLowerCase();
            if (lw === q)            return 0; // exact match
            if (lw.startsWith(q))    return 1; // starts with
            return 2;                           // contains elsewhere
        };
        return DICTIONARY.filter(e => e[key].toLowerCase().includes(q))
            .sort((a, b) => {
                const diff = rank(a[key]) - rank(b[key]);
                return diff !== 0 ? diff : a[key].localeCompare(b[key]);
            })
            .slice(0, 80); // cap display at 80
    }, [query, lang]);

    const speak = (text) => {
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'fr-FR'; u.rate = 0.8;
        u.onstart = () => setSpeaking(text);
        u.onend   = () => setSpeaking(null);
        u.onerror = () => setSpeaking(null);
        window.speechSynthesis.speak(u);
    };

    return (
        <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', fontFamily: "'Outfit', system-ui, sans-serif" }}>
            <style>{`
                @keyframes dict-in { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
                .dict-row:hover { background: #eff6ff !important; }
            `}</style>

            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg, #16a34a, #4ade80)', padding: '1.25rem 1.5rem 1.5rem', color: '#fff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '38px', height: '38px', cursor: 'pointer', fontSize: '1.2rem', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
                    <div>
                        <div style={{ fontSize: '0.72rem', fontWeight: '700', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.7px' }}>
                            {isFr ? '4 257 mots · Medumba ↔ Français' : '4,257 words · Medumba ↔ French'}
                        </div>
                        <div style={{ fontSize: '1.2rem', fontWeight: '900' }}>📖 {isFr ? 'Dictionnaire Medumba' : 'Medumba Dictionary'}</div>
                    </div>
                </div>

                {/* Search bar */}
                <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', gap: '0.65rem', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
                    <span style={{ fontSize: '1.1rem' }}>🔍</span>
                    <input
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder={lang === 'medumba'
                            ? (isFr ? 'Chercher un mot Medumba…' : 'Search a Medumba word…')
                            : (isFr ? 'Chercher en français…' : 'Search in French…')}
                        style={{
                            flex: 1, border: 'none', outline: 'none', fontSize: '1rem',
                            fontWeight: '600', color: '#0f172a', backgroundColor: 'transparent',
                            fontFamily: 'inherit',
                        }}
                        autoFocus
                    />
                    {query && (
                        <button onClick={() => setQuery('')} style={{ background: '#e2e8f0', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: '900', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                    )}
                </div>

                {/* Search language toggle */}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: '12px', padding: '0.25rem' }}>
                    {[{ id: 'medumba', label: '🇨🇲 Medumba' }, { id: 'french', label: '🇫🇷 Français' }].map(opt => (
                        <button key={opt.id} onClick={() => { setLang(opt.id); setQuery(''); }} style={{
                            flex: 1, padding: '0.45rem', borderRadius: '9px', border: 'none', cursor: 'pointer',
                            backgroundColor: lang === opt.id ? '#fff' : 'transparent',
                            color: lang === opt.id ? '#16a34a' : 'rgba(255,255,255,0.85)',
                            fontWeight: '800', fontSize: '0.85rem', fontFamily: 'inherit', transition: 'all 0.15s',
                        }}>{opt.label}</button>
                    ))}
                </div>
            </div>

            {/* Results / splash */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
                {!query && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 2rem', textAlign: 'center', animation: 'dict-in 0.3s ease-out both' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📖</div>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.5rem' }}>
                            {isFr ? 'Dictionnaire Medumba' : 'Medumba Dictionary'}
                        </h2>
                        <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6, maxWidth: '280px' }}>
                            {isFr
                                ? 'Recherchez parmi 4 257 mots Medumba et leur traduction en français.'
                                : 'Search among 4,257 Medumba words and their French translations.'}
                        </p>
                        {/* Quick examples */}
                        <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
                            {['Mbʉ', 'Ntsə', 'Bùsi', 'Nyàm', 'Mɛn'].map(w => (
                                <button key={w} onClick={() => { setLang('medumba'); setQuery(w); }} style={{ backgroundColor: '#dcfce7', border: '2px solid #bbf7d0', borderRadius: '99px', padding: '0.3rem 0.85rem', fontSize: '0.82rem', fontWeight: '700', color: '#16a34a', cursor: 'pointer', fontFamily: 'inherit' }}>
                                    {w}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {query && results.length === 0 && (
                    <div style={{ padding: '3rem 2rem', textAlign: 'center', animation: 'dict-in 0.25s ease-out both' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🔎</div>
                        <div style={{ fontWeight: '800', color: '#0f172a', marginBottom: '0.4rem' }}>
                            {isFr ? 'Aucun résultat' : 'No results'}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                            {isFr ? `"${query}" introuvable.` : `"${query}" not found.`}
                        </div>
                    </div>
                )}

                {results.length > 0 && (
                    <div style={{ animation: 'dict-in 0.25s ease-out both' }}>
                        <div style={{ padding: '0.75rem 1rem 0.25rem', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            {results.length}{results.length === 80 ? '+' : ''} {isFr ? 'résultats' : 'results'}
                        </div>
                        <div>
                            {results.map((entry, i) => (
                                <div key={i} className="dict-row" style={{
                                    display: 'flex', alignItems: 'center', gap: '0.85rem',
                                    padding: '0.85rem 1rem', borderBottom: '1px solid #f1f5f9',
                                    backgroundColor: '#fff', cursor: 'pointer', transition: 'background 0.15s',
                                    animation: `dict-in 0.3s ease-out ${Math.min(i * 0.02, 0.3)}s both`,
                                }}>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontWeight: '800', fontSize: '1rem', color: '#16a34a', marginBottom: '2px' }}>
                                            {entry.medumba}
                                        </div>
                                        <div style={{ fontSize: '0.85rem', color: '#334155', fontWeight: '600' }}>
                                            🇫🇷 {entry.french}
                                        </div>
                                    </div>
                                    <button onClick={() => speak(entry.medumba)} style={{
                                        background: speaking === entry.medumba ? '#dcfce7' : '#f8fafc',
                                        border: `2px solid ${speaking === entry.medumba ? '#22c55e' : '#e2e8f0'}`,
                                        borderRadius: '50%', width: '38px', height: '38px',
                                        cursor: 'pointer', fontSize: '1.1rem',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                    }}>
                                        {speaking === entry.medumba ? '🔊' : '🔈'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DictionaryPage;
