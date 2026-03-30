import { useState, useMemo, useEffect, useRef } from 'react';
import { DICTIONARY } from '../data/medumbaDictionary';
import { MEDUMBA_EXPRESSIONS } from '../data/medumbaExpressions';

/* Normalise expressions to the same shape as DICTIONARY entries */
const EXPR_ENTRIES = MEDUMBA_EXPRESSIONS.map(e => ({
    medumba: e.medumba,
    french:  e.fr,
    isExpression: true,
}));

const ALL_ENTRIES = [...DICTIONARY, ...EXPR_ENTRIES];

const AI_URL = 'https://medumba-ai.onrender.com/api/translate';

const DictionaryPage = ({ nativeLang, onBack }) => {
    const isFr = nativeLang === 'french';
    const [query,    setQuery]    = useState('');
    const [lang,     setLang]     = useState('medumba'); // search in 'medumba' or 'french'
    const [speaking, setSpeaking] = useState(null);

    /* ── AI Translator widget (splash page) ── */
    const [aiInput,   setAiInput]   = useState('');
    const [aiDir,     setAiDir]     = useState('fr-md');
    const [aiResult,  setAiResult]  = useState(null);
    const [aiLoading, setAiLoading] = useState(false);
    const [aiError,   setAiError]   = useState(null);
    const [copied,    setCopied]    = useState(false);

    /* ── AI result for "no results" auto-translate ── */
    const [autoResult,  setAutoResult]  = useState(null);
    const [autoLoading, setAutoLoading] = useState(false);
    const autoQueryRef = useRef('');

    /* ── AI panel on result rows ── */
    const [rowAiId,      setRowAiId]      = useState(null); // entry index
    const [rowAiResult,  setRowAiResult]  = useState(null);
    const [rowAiLoading, setRowAiLoading] = useState(false);

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return [];
        const key = lang === 'medumba' ? 'medumba' : 'french';
        const rank = (w) => {
            const lw = w.toLowerCase();
            if (lw === q)            return 0;
            if (lw.startsWith(q))    return 1;
            return 2;
        };
        return ALL_ENTRIES.filter(e => e[key].toLowerCase().includes(q))
            .sort((a, b) => {
                const diff = rank(a[key]) - rank(b[key]);
                return diff !== 0 ? diff : a[key].localeCompare(b[key]);
            })
            .slice(0, 80);
    }, [query, lang]);

    /* ── Auto-translate when no results ── */
    useEffect(() => {
        const q = query.trim();
        if (!q || results.length > 0) { setAutoResult(null); return; }
        if (autoQueryRef.current === q) return;
        autoQueryRef.current = q;
        const dir = lang === 'medumba' ? 'md-fr' : 'fr-md';
        setAutoLoading(true);
        setAutoResult(null);
        fetch(AI_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ input: q, direction: dir, useLlm: true, maxSuggestions: 5 }),
        })
            .then(r => r.json())
            .then(d => setAutoResult(d))
            .catch(() => setAutoResult(null))
            .finally(() => setAutoLoading(false));
    }, [query, results.length, lang]);

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

    const translateWidget = async () => {
        if (!aiInput.trim()) return;
        setAiLoading(true);
        setAiResult(null);
        setAiError(null);
        try {
            const res = await fetch(AI_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ input: aiInput.trim(), direction: aiDir, useLlm: true, maxSuggestions: 5 }),
            });
            const data = await res.json();
            setAiResult(data);
        } catch {
            setAiError(isFr ? 'Erreur de connexion à l\'IA' : 'Could not connect to AI');
        } finally {
            setAiLoading(false);
        }
    };

    const translateRow = async (entry, idx) => {
        if (rowAiId === idx) { setRowAiId(null); setRowAiResult(null); return; }
        setRowAiId(idx);
        setRowAiResult(null);
        setRowAiLoading(true);
        try {
            const res = await fetch(AI_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ input: entry.french, direction: 'fr-md', useLlm: true, maxSuggestions: 3 }),
            });
            const data = await res.json();
            setRowAiResult(data);
        } catch {
            setRowAiResult(null);
        } finally {
            setRowAiLoading(false);
        }
    };

    const copyText = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        });
    };

    /* ── Shared styles ── */
    const aiCardStyle = {
        marginTop: '1.5rem', width: '100%', maxWidth: '360px',
        backgroundColor: '#fff', borderRadius: '20px',
        border: '2px solid #bbf7d0',
        boxShadow: '0 4px 20px rgba(22,163,74,0.1)',
        overflow: 'hidden',
    };

    return (
        <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', fontFamily: "'Outfit', system-ui, sans-serif" }}>
            <style>{`
                @keyframes dict-in { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
                @keyframes spin { to { transform: rotate(360deg); } }
                .dict-row:hover { background: #eff6ff !important; }
                .ai-btn:hover { opacity: 0.85; }
            `}</style>

            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg, #16a34a, #4ade80)', padding: '1.25rem 1.5rem 1.5rem', color: '#fff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '38px', height: '38px', cursor: 'pointer', fontSize: '1.2rem', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
                    <div>
                        <div style={{ fontSize: '0.72rem', fontWeight: '700', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.7px' }}>
                            {isFr ? '4 516 entrées · Mots & Expressions' : '4,516 entries · Words & Expressions'}
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
                        style={{ flex: 1, border: 'none', outline: 'none', fontSize: '1rem', fontWeight: '600', color: '#0f172a', backgroundColor: 'transparent', fontFamily: 'inherit' }}
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

                {/* ── SPLASH (no query) ── */}
                {!query && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem 1.5rem', animation: 'dict-in 0.3s ease-out both' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>📖</div>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.4rem', textAlign: 'center' }}>
                            {isFr ? 'Dictionnaire Medumba' : 'Medumba Dictionary'}
                        </h2>
                        <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.6, maxWidth: '280px', textAlign: 'center', marginBottom: '1.25rem' }}>
                            {isFr
                                ? 'Recherchez parmi 4 257 mots et 259 expressions.'
                                : 'Search among 4,257 words and 259 expressions.'}
                        </p>

                        {/* Quick examples */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginBottom: '0.5rem' }}>
                            {['Mbʉ', 'Ntsə', 'Bùsi', 'Nyàm', 'Mɛn'].map(w => (
                                <button key={w} onClick={() => { setLang('medumba'); setQuery(w); }} style={{ backgroundColor: '#dcfce7', border: '2px solid #bbf7d0', borderRadius: '99px', padding: '0.3rem 0.85rem', fontSize: '0.82rem', fontWeight: '700', color: '#16a34a', cursor: 'pointer', fontFamily: 'inherit' }}>
                                    {w}
                                </button>
                            ))}
                        </div>

                        {/* ── AI Translator Widget ── */}
                        <div style={aiCardStyle}>
                            {/* Widget header */}
                            <div style={{
                                background: 'linear-gradient(135deg, #16a34a, #4ade80)',
                                padding: '0.85rem 1.1rem',
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ fontSize: '1.2rem' }}>🤖</span>
                                    <span style={{ fontWeight: '800', fontSize: '0.9rem', color: '#fff' }}>
                                        {isFr ? 'Traducteur IA Medumba' : 'Medumba AI Translator'}
                                    </span>
                                </div>
                            </div>

                            {/* Direction toggle */}
                            <div style={{ display: 'flex', alignItems: 'center', padding: '0.75rem 1rem', gap: '0.5rem', borderBottom: '1px solid #f0fdf4' }}>
                                <span style={{ flex: 1, fontSize: '0.8rem', fontWeight: '700', color: aiDir === 'fr-md' ? '#16a34a' : '#94a3b8', textAlign: 'center' }}>
                                    🇫🇷 {isFr ? 'Français' : 'French'}
                                </span>
                                <button
                                    onClick={() => { setAiDir(d => d === 'fr-md' ? 'md-fr' : 'fr-md'); setAiResult(null); setAiInput(''); }}
                                    style={{ background: '#f0fdf4', border: '2px solid #bbf7d0', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                                >⇄</button>
                                <span style={{ flex: 1, fontSize: '0.8rem', fontWeight: '700', color: aiDir === 'md-fr' ? '#16a34a' : '#94a3b8', textAlign: 'center' }}>
                                    🇨🇲 Medumba
                                </span>
                            </div>

                            {/* Input */}
                            <div style={{ padding: '0.75rem 1rem' }}>
                                <textarea
                                    value={aiInput}
                                    onChange={e => { setAiInput(e.target.value); setAiResult(null); }}
                                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); translateWidget(); } }}
                                    placeholder={aiDir === 'fr-md'
                                        ? (isFr ? 'Entrez du texte français…' : 'Enter French text…')
                                        : (isFr ? 'Entrez du texte Medumba…' : 'Enter Medumba text…')}
                                    rows={3}
                                    style={{
                                        width: '100%', border: '2px solid #e2e8f0', borderRadius: '12px',
                                        padding: '0.6rem 0.75rem', fontSize: '0.9rem', fontFamily: 'inherit',
                                        resize: 'none', outline: 'none', color: '#0f172a',
                                        boxSizing: 'border-box', lineHeight: 1.5,
                                    }}
                                />
                                <button
                                    onClick={translateWidget}
                                    disabled={aiLoading || !aiInput.trim()}
                                    className="ai-btn"
                                    style={{
                                        marginTop: '0.6rem', width: '100%',
                                        background: aiLoading || !aiInput.trim() ? '#e2e8f0' : 'linear-gradient(135deg, #16a34a, #4ade80)',
                                        color: aiLoading || !aiInput.trim() ? '#94a3b8' : '#fff',
                                        border: 'none', borderRadius: '10px', padding: '0.65rem',
                                        fontWeight: '800', fontSize: '0.9rem', cursor: aiLoading || !aiInput.trim() ? 'default' : 'pointer',
                                        fontFamily: 'inherit', transition: 'all 0.15s',
                                    }}
                                >
                                    {aiLoading
                                        ? (isFr ? 'Traduction en cours…' : 'Translating…')
                                        : (isFr ? 'Traduire' : 'Translate')}
                                </button>
                            </div>

                            {/* Result */}
                            {aiError && (
                                <div style={{ margin: '0 1rem 0.75rem', padding: '0.65rem', backgroundColor: '#fef2f2', borderRadius: '10px', fontSize: '0.82rem', color: '#dc2626', fontWeight: '600' }}>
                                    ⚠️ {aiError}
                                </div>
                            )}
                            {aiResult?.translation && (
                                <div style={{ margin: '0 1rem 1rem', padding: '0.85rem', backgroundColor: '#f0fdf4', borderRadius: '12px', border: '1.5px solid #bbf7d0' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                                        <span style={{ fontWeight: '800', fontSize: '1rem', color: '#16a34a', lineHeight: 1.5, flex: 1 }}>
                                            {aiResult.translation}
                                        </span>
                                        <button onClick={() => copyText(aiResult.translation)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', flexShrink: 0 }}>
                                            {copied ? '✅' : '📋'}
                                        </button>
                                    </div>
                                    {aiResult.reasoning && (
                                        <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#64748b', lineHeight: 1.5 }}>
                                            💡 {aiResult.reasoning.slice(0, 120)}{aiResult.reasoning.length > 120 ? '…' : ''}
                                        </div>
                                    )}
                                    {aiResult.suggestions?.length > 0 && (
                                        <div style={{ marginTop: '0.6rem', display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                                            {aiResult.suggestions.slice(0, 4).map((s, i) => (
                                                <span key={i} style={{ fontSize: '0.7rem', backgroundColor: '#dcfce7', color: '#16a34a', borderRadius: '99px', padding: '0.15rem 0.55rem', fontWeight: '700' }}>
                                                    {s.source} → {s.target}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* ── NO RESULTS + AUTO AI TRANSLATION ── */}
                {query && results.length === 0 && (
                    <div style={{ padding: '2.5rem 1.5rem', textAlign: 'center', animation: 'dict-in 0.25s ease-out both', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔎</div>
                        <div style={{ fontWeight: '800', color: '#0f172a', marginBottom: '0.3rem' }}>
                            {isFr ? 'Aucun résultat dans le dictionnaire' : 'Not found in dictionary'}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.5rem' }}>
                            {isFr ? `"${query}" — consultation de l'IA…` : `"${query}" — asking AI…`}
                        </div>

                        {/* Auto AI result */}
                        {autoLoading && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#16a34a', fontWeight: '700', fontSize: '0.9rem' }}>
                                <div style={{ width: '18px', height: '18px', border: '3px solid #bbf7d0', borderTopColor: '#16a34a', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                                {isFr ? 'L\'IA analyse…' : 'AI analyzing…'}
                            </div>
                        )}

                        {autoResult?.translation && autoResult.translation !== query.trim() && (
                            <div style={{ width: '100%', maxWidth: '340px', backgroundColor: '#fff', borderRadius: '18px', border: '2px solid #bbf7d0', overflow: 'hidden', boxShadow: '0 4px 16px rgba(22,163,74,0.1)' }}>
                                <div style={{ background: 'linear-gradient(135deg, #16a34a, #4ade80)', padding: '0.7rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ fontSize: '1rem' }}>🤖</span>
                                    <span style={{ fontWeight: '800', fontSize: '0.82rem', color: '#fff' }}>
                                        {isFr ? 'Traduction IA' : 'AI Translation'}
                                    </span>
                                    <span style={{ marginLeft: 'auto', fontSize: '0.65rem', backgroundColor: 'rgba(255,255,255,0.25)', color: '#fff', borderRadius: '99px', padding: '0.1rem 0.45rem', fontWeight: '700' }}>
                                        {lang === 'medumba' ? 'Med → Fr' : 'Fr → Med'}
                                    </span>
                                </div>
                                <div style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{ fontWeight: '800', fontSize: '1.05rem', color: '#16a34a' }}>
                                            {autoResult.translation}
                                        </span>
                                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                                            <button onClick={() => speak(autoResult.translation)} style={{ background: '#f0fdf4', border: '2px solid #bbf7d0', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🔈</button>
                                            <button onClick={() => copyText(autoResult.translation)} style={{ background: '#f0fdf4', border: '2px solid #bbf7d0', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📋</button>
                                        </div>
                                    </div>
                                    {autoResult.reasoning && (
                                        <div style={{ marginTop: '0.6rem', fontSize: '0.75rem', color: '#64748b', lineHeight: 1.5 }}>
                                            💡 {autoResult.reasoning.slice(0, 140)}{autoResult.reasoning.length > 140 ? '…' : ''}
                                        </div>
                                    )}
                                    {autoResult.suggestions?.length > 0 && (
                                        <div style={{ marginTop: '0.6rem', display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                                            {autoResult.suggestions.slice(0, 4).map((s, i) => (
                                                <span key={i} style={{ fontSize: '0.7rem', backgroundColor: '#dcfce7', color: '#16a34a', borderRadius: '99px', padding: '0.15rem 0.55rem', fontWeight: '700' }}>
                                                    {s.source} → {s.target}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* ── RESULTS LIST ── */}
                {results.length > 0 && (
                    <div style={{ animation: 'dict-in 0.25s ease-out both' }}>
                        <div style={{ padding: '0.75rem 1rem 0.25rem', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            {results.length}{results.length === 80 ? '+' : ''} {isFr ? 'résultats' : 'results'}
                        </div>
                        <div>
                            {results.map((entry, i) => (
                                <div key={i}>
                                    <div className="dict-row" style={{
                                        display: 'flex', alignItems: 'center', gap: '0.85rem',
                                        padding: '0.85rem 1rem', borderBottom: rowAiId === i ? 'none' : '1px solid #f1f5f9',
                                        backgroundColor: '#fff', cursor: 'pointer', transition: 'background 0.15s',
                                        animation: `dict-in 0.3s ease-out ${Math.min(i * 0.02, 0.3)}s both`,
                                    }}>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '2px', flexWrap: 'wrap' }}>
                                                <span style={{ fontWeight: '800', fontSize: '1rem', color: '#16a34a' }}>
                                                    {entry.medumba}
                                                </span>
                                                {entry.isExpression && (
                                                    <span style={{ fontSize: '0.62rem', fontWeight: '800', color: '#7c3aed', backgroundColor: '#f3e8ff', borderRadius: '99px', padding: '0.1rem 0.45rem', letterSpacing: '0.4px', textTransform: 'uppercase', flexShrink: 0 }}>
                                                        {isFr ? 'Expression' : 'Phrase'}
                                                    </span>
                                                )}
                                            </div>
                                            <div style={{ fontSize: '0.85rem', color: '#334155', fontWeight: '600' }}>
                                                🇫🇷 {entry.french}
                                            </div>
                                        </div>
                                        {/* Speak button */}
                                        <button onClick={() => speak(entry.medumba)} style={{
                                            background: speaking === entry.medumba ? '#dcfce7' : '#f8fafc',
                                            border: `2px solid ${speaking === entry.medumba ? '#22c55e' : '#e2e8f0'}`,
                                            borderRadius: '50%', width: '36px', height: '36px',
                                            cursor: 'pointer', fontSize: '1rem',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                        }}>
                                            {speaking === entry.medumba ? '🔊' : '🔈'}
                                        </button>
                                        {/* AI button */}
                                        <button
                                            onClick={() => { translateRow(entry, i); }}
                                            style={{
                                                background: rowAiId === i ? '#f0fdf4' : '#f8fafc',
                                                border: `2px solid ${rowAiId === i ? '#16a34a' : '#e2e8f0'}`,
                                                borderRadius: '50%', width: '36px', height: '36px',
                                                cursor: 'pointer', fontSize: '1rem',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                            }}
                                            title={isFr ? 'Analyser avec l\'IA' : 'Analyze with AI'}
                                        >
                                            {rowAiLoading && rowAiId === i
                                                ? <div style={{ width: '14px', height: '14px', border: '2px solid #bbf7d0', borderTopColor: '#16a34a', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                                                : '🤖'}
                                        </button>
                                    </div>

                                    {/* Inline AI panel for this row */}
                                    {rowAiId === i && rowAiResult?.translation && (
                                        <div style={{
                                            margin: '0 0.75rem 0.75rem',
                                            padding: '0.85rem', borderRadius: '14px',
                                            backgroundColor: '#f0fdf4', border: '1.5px solid #bbf7d0',
                                            borderBottom: '1px solid #f1f5f9',
                                            animation: 'dict-in 0.2s ease-out both',
                                        }}>
                                            <div style={{ fontSize: '0.72rem', fontWeight: '700', color: '#16a34a', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                                                🤖 {isFr ? 'Analyse IA' : 'AI Analysis'}
                                            </div>
                                            <div style={{ fontWeight: '800', fontSize: '0.95rem', color: '#0f172a', marginBottom: '0.35rem' }}>
                                                {rowAiResult.translation}
                                            </div>
                                            {rowAiResult.reasoning && (
                                                <div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.5 }}>
                                                    {rowAiResult.reasoning.slice(0, 160)}{rowAiResult.reasoning.length > 160 ? '…' : ''}
                                                </div>
                                            )}
                                        </div>
                                    )}
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
