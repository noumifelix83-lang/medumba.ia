import { useState } from 'react';
import logo from '../assets/logo.png';

const HubPage = ({ nativeLang, onCalendar, onVideo, onCounting, onDictionary, onCourses }) => {
    const isFr = nativeLang === 'french';
    const [visited, setVisited] = useState(new Set());

    const visit = (key, fn) => () => {
        setVisited(prev => new Set([...prev, key]));
        fn();
    };

    const SECTIONS = [
        { key: 'calendar',   icon: '📅', labelEn: 'Calendar',   labelFr: 'Calendrier' },
        { key: 'video',      icon: '🎥', labelEn: 'Videos',     labelFr: 'Vidéos'     },
        { key: 'counting',   icon: '🔢', labelEn: 'Counting',   labelFr: 'Compter'    },
        { key: 'dictionary', icon: '📖', labelEn: 'Dictionary', labelFr: 'Dictionnaire'},
        { key: 'courses',    icon: '📚', labelEn: 'Courses',    labelFr: 'Cours'      },
    ];

    const tiles = [
        {
            key: 'calendar',
            icon: '📅', color: '#0056D2', light: '#eff6ff', border: '#bfdbfe',
            labelEn: 'Calendar',   labelFr: 'Calendrier',
            descEn:  'Traditional Medumba calendar with month & day names',
            descFr:  'Calendrier traditionnel avec noms des mois et jours',
            badgeEn: '12 months', badgeFr: '12 mois',
            onClick: visit('calendar', onCalendar),
        },
        {
            key: 'video',
            icon: '🎥', color: '#7c3aed', light: '#f5f3ff', border: '#ddd6fe',
            labelEn: 'Videos',     labelFr: 'Vidéos',
            descEn:  'Learn Medumba through video lessons',
            descFr:  'Apprenez le Medumba par des leçons vidéo',
            badgeEn: 'Coming soon', badgeFr: 'Bientôt',
            onClick: visit('video', onVideo),
        },
        {
            key: 'counting',
            icon: '🔢', color: '#0891b2', light: '#f0f9ff', border: '#bae6fd',
            labelEn: 'Counting',   labelFr: 'Compter',
            descEn:  'Numbers 0–1000 with audio and quiz',
            descFr:  'Chiffres 0–1000 avec audio et quiz',
            badgeEn: '26 numbers', badgeFr: '26 chiffres',
            onClick: visit('counting', onCounting),
        },
        {
            key: 'dictionary',
            icon: '📖', color: '#16a34a', light: '#f0fdf4', border: '#bbf7d0',
            labelEn: 'Dictionary', labelFr: 'Dictionnaire',
            descEn:  'Search all 4,257 Medumba words',
            descFr:  'Recherchez parmi 4 257 mots Medumba',
            badgeEn: '4,257 words', badgeFr: '4 257 mots',
            onClick: visit('dictionary', onDictionary),
        },
    ];

    const visitedCount = visited.size;
    const progressPct  = Math.round((visitedCount / SECTIONS.length) * 100);

    return (
        <div style={{
            width: '100%', minHeight: '100vh',
            backgroundColor: '#f1f5f9',
            display: 'flex', flexDirection: 'column',
            fontFamily: "'Outfit', system-ui, sans-serif",
        }}>
            <style>{`
                @keyframes hub-fade-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes hub-logo-pop {
                    0%   { transform: scale(0.7) rotate(-8deg); opacity: 0; }
                    60%  { transform: scale(1.1) rotate(2deg); }
                    100% { transform: scale(1) rotate(0deg); opacity: 1; }
                }
                @keyframes hub-pulse {
                    0%, 100% { opacity: 0.6; transform: scale(1); }
                    50%      { opacity: 1;   transform: scale(1.08); }
                }
                @keyframes hub-shimmer {
                    0%   { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                @keyframes hub-bar-fill {
                    from { width: 0%; }
                    to   { width: var(--bar-pct); }
                }
                @keyframes hub-dot-pop {
                    0%   { transform: scale(0); }
                    70%  { transform: scale(1.25); }
                    100% { transform: scale(1); }
                }
                .hub-card:hover  { transform: translateY(-4px) !important; box-shadow: 0 16px 40px rgba(0,0,0,0.12) !important; }
                .hub-card:active { transform: scale(0.98) !important; }
                .hub-cta:hover   { transform: translateY(-3px) scale(1.01) !important; box-shadow: 0 20px 50px rgba(217,119,6,0.5) !important; }
                .hub-cta:active  { transform: scale(0.98) !important; }
            `}</style>

            {/* ═══════════════════ HERO HEADER ═══════════════════ */}
            <div style={{ position: 'relative', background: 'linear-gradient(145deg, #0056D2 0%, #0284c7 55%, #0891b2 100%)', paddingBottom: '3rem', overflow: 'hidden' }}>
                {/* Background pattern */}
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.06) 0%, transparent 40%)', pointerEvents: 'none' }} />
                {/* Floating orbs */}
                <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', animation: 'hub-pulse 4s ease-in-out infinite' }} />
                <div style={{ position: 'absolute', bottom: '20px', left: '-30px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', animation: 'hub-pulse 5s ease-in-out infinite 1s' }} />
                <div style={{ position: 'absolute', top: '40%', left: '55%', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 1, padding: '2.5rem 1.5rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <img src={logo} alt="Medumba" style={{ width: '80px', height: 'auto', marginBottom: '1rem', filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.25))', animation: 'hub-logo-pop 0.7s cubic-bezier(0.175,0.885,0.32,1.275) both' }} />

                    <h1 style={{ fontSize: '2.4rem', fontWeight: '900', color: '#fff', margin: '0 0 0.4rem', letterSpacing: '-0.03em', textShadow: '0 2px 12px rgba(0,0,0,0.2)', animation: 'hub-fade-up 0.5s ease-out 0.15s both' }}>
                        Medumba
                    </h1>
                    <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.88)', fontWeight: '500', margin: '0 0 1.75rem', maxWidth: '280px', lineHeight: 1.5, animation: 'hub-fade-up 0.5s ease-out 0.25s both' }}>
                        {isFr ? 'Explorez la richesse de la langue Bamiléké du Cameroun' : 'Explore the richness of the Bamileke language of Cameroon'}
                    </p>

                    {/* Stats row */}
                    <div style={{ display: 'flex', gap: '0.75rem', animation: 'hub-fade-up 0.5s ease-out 0.35s both' }}>
                        {[
                            { n: '4 257', label: isFr ? 'mots' : 'words',   icon: '📖' },
                            { n: '9',     label: isFr ? 'leçons' : 'lessons', icon: '📚' },
                            { n: '12',    label: isFr ? 'mois' : 'months',   icon: '📅' },
                        ].map((s, i) => (
                            <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', borderRadius: '14px', padding: '0.65rem 0.9rem', textAlign: 'center', minWidth: '72px', border: '1px solid rgba(255,255,255,0.2)' }}>
                                <div style={{ fontSize: '0.85rem' }}>{s.icon}</div>
                                <div style={{ fontSize: '1rem', fontWeight: '900', color: '#fff', lineHeight: 1.1 }}>{s.n}</div>
                                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.75)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Wave SVG */}
                <svg viewBox="0 0 1440 56" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '56px' }} preserveAspectRatio="none">
                    <path d="M0,32 C360,56 720,0 1080,32 C1260,44 1380,24 1440,32 L1440,56 L0,56 Z" fill="#f1f5f9" />
                </svg>
            </div>

            {/* ═══════════════════ MAIN CONTENT ═══════════════════ */}
            <div style={{ flex: 1, padding: '1.25rem 1rem 0.5rem', maxWidth: '540px', width: '100%', margin: '0 auto' }}>

                {/* ═══ EXPLORATION PROGRESS BAR ═══ */}
                <div style={{
                    backgroundColor: '#fff', borderRadius: '20px',
                    padding: '1rem 1.2rem', marginBottom: '1.25rem',
                    border: '1.5px solid #e2e8f0',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                    animation: 'hub-fade-up 0.45s ease-out 0.05s both',
                }}>
                    {/* Header row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.7rem' }}>
                        <div>
                            <div style={{ fontSize: '0.82rem', fontWeight: '900', color: '#0f172a' }}>
                                {isFr ? '🗺️ Votre exploration' : '🗺️ Your exploration'}
                            </div>
                            <div style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: '600', marginTop: '0.1rem' }}>
                                {visitedCount === 0
                                    ? (isFr ? 'Aucune section visitée' : 'No sections visited yet')
                                    : visitedCount === SECTIONS.length
                                        ? (isFr ? '🎉 Tout exploré !' : '🎉 All explored!')
                                        : (isFr ? `${visitedCount} section${visitedCount > 1 ? 's' : ''} visitée${visitedCount > 1 ? 's' : ''}` : `${visitedCount} section${visitedCount > 1 ? 's' : ''} visited`)}
                            </div>
                        </div>
                        <div style={{
                            width: '44px', height: '44px', borderRadius: '50%',
                            background: progressPct === 100
                                ? 'linear-gradient(135deg, #16a34a, #4ade80)'
                                : 'linear-gradient(135deg, #0056D2, #38bdf8)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0, transition: 'background 0.4s ease',
                        }}>
                            <span style={{ fontSize: '0.82rem', fontWeight: '900', color: '#fff' }}>{progressPct}%</span>
                        </div>
                    </div>

                    {/* Progress track */}
                    <div style={{ height: '8px', backgroundColor: '#f1f5f9', borderRadius: '99px', overflow: 'hidden', marginBottom: '0.8rem' }}>
                        <div style={{
                            height: '100%', borderRadius: '99px',
                            width: `${progressPct}%`,
                            background: progressPct === 100
                                ? 'linear-gradient(90deg, #16a34a, #4ade80)'
                                : 'linear-gradient(90deg, #0056D2, #38bdf8)',
                            transition: 'width 0.6s cubic-bezier(0.4,0,0.2,1), background 0.4s ease',
                            position: 'relative', overflow: 'hidden',
                        }}>
                            {/* Shimmer on the bar */}
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)', backgroundSize: '200% 100%', animation: 'hub-shimmer 1.8s linear infinite' }} />
                        </div>
                    </div>

                    {/* Section dots */}
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                        {SECTIONS.map((s) => {
                            const done = visited.has(s.key);
                            return (
                                <div key={s.key} style={{
                                    flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem',
                                }}>
                                    <div style={{
                                        width: '28px', height: '28px', borderRadius: '50%',
                                        backgroundColor: done ? '#0056D2' : '#f1f5f9',
                                        border: `2px solid ${done ? '#0056D2' : '#e2e8f0'}`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '0.7rem',
                                        transition: 'all 0.3s ease',
                                        animation: done ? 'hub-dot-pop 0.35s cubic-bezier(0.175,0.885,0.32,1.275) both' : 'none',
                                    }}>
                                        {done ? '✓' : s.icon}
                                    </div>
                                    <div style={{ fontSize: '0.52rem', fontWeight: '700', color: done ? '#0056D2' : '#94a3b8', textAlign: 'center', lineHeight: 1.2, textTransform: 'uppercase', letterSpacing: '0.2px' }}>
                                        {isFr ? s.labelFr.slice(0, 5) : s.labelEn.slice(0, 5)}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ═══ EXPLORE SECTION ═══ */}
                <div style={{ fontSize: '0.72rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.85rem', paddingLeft: '0.25rem' }}>
                    {isFr ? '🧭 Explorer' : '🧭 Explore'}
                </div>

                {/* 2×2 card grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '1.1rem' }}>
                    {tiles.map((tile, i) => {
                        const done = visited.has(tile.key);
                        return (
                            <div key={i} className="hub-card" onClick={tile.onClick} style={{
                                backgroundColor: '#fff', borderRadius: '20px',
                                padding: '1.25rem 1.1rem 1.1rem',
                                border: `1.5px solid ${done ? tile.color + '55' : tile.border}`,
                                boxShadow: done ? `0 4px 16px ${tile.color}18` : '0 4px 16px rgba(0,0,0,0.06)',
                                cursor: 'pointer', transition: 'transform 0.2s ease, box-shadow 0.2s ease, border 0.3s ease',
                                animation: `hub-fade-up 0.45s ease-out ${0.1 + i * 0.08}s both`,
                                display: 'flex', flexDirection: 'column', gap: '0.6rem',
                                position: 'relative', overflow: 'hidden',
                            }}>
                                {/* Visited checkmark */}
                                {done && (
                                    <div style={{ position: 'absolute', top: '10px', right: '10px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: tile.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', color: '#fff', fontWeight: '900', animation: 'hub-dot-pop 0.35s cubic-bezier(0.175,0.885,0.32,1.275) both' }}>✓</div>
                                )}
                                {/* Icon badge */}
                                <div style={{ width: '46px', height: '46px', borderRadius: '14px', backgroundColor: tile.light, border: `2px solid ${tile.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                                    {tile.icon}
                                </div>
                                <div>
                                    <div style={{ fontWeight: '800', fontSize: '0.95rem', color: '#0f172a', marginBottom: '0.2rem' }}>
                                        {isFr ? tile.labelFr : tile.labelEn}
                                    </div>
                                    <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '500', lineHeight: 1.45 }}>
                                        {isFr ? tile.descFr : tile.descEn}
                                    </div>
                                </div>
                                {/* Badge */}
                                <div style={{ display: 'inline-flex', alignSelf: 'flex-start', backgroundColor: tile.light, border: `1.5px solid ${tile.border}`, borderRadius: '99px', padding: '0.15rem 0.6rem', fontSize: '0.65rem', fontWeight: '800', color: tile.color }}>
                                    {isFr ? tile.badgeFr : tile.badgeEn}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ═══ FEATURED: COURSES CTA ═══ */}
                <div style={{ fontSize: '0.72rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.85rem', paddingLeft: '0.25rem' }}>
                    {isFr ? '🚀 Commencer' : '🚀 Start Learning'}
                </div>
                <div className="hub-cta" onClick={visit('courses', onCourses)} style={{
                    background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 50%, #fbbf24 100%)',
                    borderRadius: '24px', padding: '1.6rem 1.5rem',
                    cursor: 'pointer', position: 'relative', overflow: 'hidden',
                    boxShadow: '0 12px 36px rgba(217,119,6,0.4)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    animation: 'hub-fade-up 0.5s ease-out 0.5s both',
                    display: 'flex', alignItems: 'center', gap: '1.25rem',
                    border: '2px solid rgba(255,255,255,0.3)',
                }}>
                    {/* shimmer overlay */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)', backgroundSize: '200% 100%', animation: 'hub-shimmer 2.5s linear infinite', pointerEvents: 'none', borderRadius: '24px' }} />
                    {/* decorative circles */}
                    <div style={{ position: 'absolute', right: '-20px', top: '-20px', width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.12)' }} />
                    <div style={{ position: 'absolute', right: '30px', bottom: '-30px', width: '70px', height: '70px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.08)' }} />
                    {/* Visited badge */}
                    {visited.has('courses') && (
                        <div style={{ position: 'absolute', top: '12px', right: '12px', backgroundColor: 'rgba(255,255,255,0.35)', borderRadius: '99px', padding: '0.15rem 0.55rem', fontSize: '0.65rem', fontWeight: '900', color: '#fff' }}>✓ {isFr ? 'Visité' : 'Visited'}</div>
                    )}

                    <div style={{ position: 'relative', zIndex: 1, width: '60px', height: '60px', borderRadius: '18px', backgroundColor: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', flexShrink: 0 }}>
                        📚
                    </div>
                    <div style={{ position: 'relative', zIndex: 1, flex: 1 }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: '900', color: '#fff', marginBottom: '0.2rem', textShadow: '0 1px 4px rgba(0,0,0,0.15)' }}>
                            {isFr ? 'Cours Medumba' : 'Medumba Courses'}
                        </div>
                        <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.9)', fontWeight: '600', lineHeight: 1.4 }}>
                            {isFr ? '9 leçons gamifiées · Suivez votre progression' : '9 gamified lessons · Track your progress'}
                        </div>
                        <div style={{ marginTop: '0.6rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: '99px', padding: '0.25rem 0.85rem', fontSize: '0.78rem', fontWeight: '800', color: '#fff' }}>
                            {isFr ? 'Commencer maintenant' : 'Start now'} →
                        </div>
                    </div>
                </div>

                {/* ═══ Cultural footer strip ═══ */}
                <div style={{ margin: '1.5rem 0 2rem', padding: '1rem 1.2rem', backgroundColor: '#fff', borderRadius: '16px', border: '1.5px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '0.85rem', animation: 'hub-fade-up 0.5s ease-out 0.6s both' }}>
                    <span style={{ fontSize: '1.8rem', flexShrink: 0 }}>🇨🇲</span>
                    <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#0f172a' }}>
                            {isFr ? 'Langue Bamiléké · Cameroun' : 'Bamileke Language · Cameroon'}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '500' }}>
                            {isFr ? 'Parlée par plus de 800 000 personnes dans la région de l\'Ouest.' : 'Spoken by over 800,000 people in the Western region.'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HubPage;
