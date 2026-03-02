import { useState } from 'react';

const CATEGORIES = [
    {
        id: 'greetings',
        iconEn: '👋', color: '#7c3aed', light: '#f5f3ff', border: '#ddd6fe',
        labelEn: 'Greetings & Basics', labelFr: 'Salutations & Bases',
        descEn: 'Start with the essentials', descFr: 'Commencer par les essentiels',
        videos: [
            { titleEn: 'Hello in Medumba',    titleFr: 'Bonjour en Medumba',   duration: '3:24', thumb: '🗣️',   views: '12K' },
            { titleEn: 'Introducing yourself',titleFr: 'Se présenter',          duration: '5:10', thumb: '🤝',   views: '9K'  },
            { titleEn: 'Common phrases',      titleFr: 'Phrases courantes',     duration: '7:45', thumb: '💬',   views: '15K' },
        ],
    },
    {
        id: 'pronunciation',
        iconEn: '🎵', color: '#0891b2', light: '#f0f9ff', border: '#bae6fd',
        labelEn: 'Pronunciation',      labelFr: 'Prononciation',
        descEn: 'Master Medumba tones', descFr: 'Maîtriser les tons Medumba',
        videos: [
            { titleEn: 'Medumba tones',        titleFr: 'Les tons Medumba',       duration: '6:12', thumb: '🎵', views: '8K'  },
            { titleEn: 'Vowels & consonants',  titleFr: 'Voyelles & consonnes',   duration: '8:30', thumb: '🔤', views: '6K'  },
        ],
    },
    {
        id: 'daily',
        iconEn: '🏡', color: '#16a34a', light: '#f0fdf4', border: '#bbf7d0',
        labelEn: 'Daily Life',         labelFr: 'Vie Quotidienne',
        descEn: 'Everyday Medumba',    descFr: 'Medumba au quotidien',
        videos: [
            { titleEn: 'At the market',       titleFr: 'Au marché',              duration: '4:55', thumb: '🛒',     views: '7K'  },
            { titleEn: 'Food & cooking',      titleFr: 'Nourriture & cuisine',   duration: '6:38', thumb: '🍽️',    views: '11K' },
            { titleEn: 'Family vocabulary',   titleFr: 'Vocabulaire famille',    duration: '5:20', thumb: '👨‍👩‍👧', views: '5K'  },
        ],
    },
    {
        id: 'culture',
        iconEn: '🎭', color: '#d97706', light: '#fffbeb', border: '#fde68a',
        labelEn: 'Culture & Traditions', labelFr: 'Culture & Traditions',
        descEn: 'Bamileke heritage',     descFr: 'Patrimoine Bamiléké',
        videos: [
            { titleEn: 'Bamileke traditions', titleFr: 'Traditions Bamiléké',    duration: '9:15', thumb: '🥁', views: '18K' },
            { titleEn: 'Medumba proverbs',    titleFr: 'Proverbes Medumba',      duration: '4:00', thumb: '📜', views: '4K'  },
        ],
    },
];

const VideoPage = ({ nativeLang, onBack }) => {
    const isFr = nativeLang === 'french';
    const [activeCategory, setActiveCategory] = useState(null);
    const [notified, setNotified] = useState(false);

    const totalVideos = CATEGORIES.reduce((sum, c) => sum + c.videos.length, 0);

    return (
        <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#f1f5f9', display: 'flex', flexDirection: 'column', fontFamily: "'Outfit', system-ui, sans-serif" }}>
            <style>{`
                @keyframes vid-in   { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
                @keyframes vid-pop  { 0% { transform:scale(0.85); opacity:0; } 70% { transform:scale(1.03); } 100% { transform:scale(1); opacity:1; } }
                @keyframes vid-orb  { 0%,100% { opacity:0.5; transform:scale(1); } 50% { opacity:0.85; transform:scale(1.12); } }
                @keyframes vid-pulse { 0%,100% { box-shadow:0 0 0 0 rgba(124,58,237,0.4); } 50% { box-shadow:0 0 0 10px rgba(124,58,237,0); } }
                .vid-card:hover .vid-play  { transform:scale(1.15) !important; }
                .vid-card:hover            { box-shadow:0 10px 30px rgba(0,0,0,0.12) !important; transform:translateY(-2px); }
                .vid-cat:hover             { transform:translateY(-2px); }
            `}</style>

            {/* ══ HERO HEADER ══ */}
            <div style={{ position: 'relative', background: 'linear-gradient(145deg, #7c3aed 0%, #a855f7 55%, #c084fc 100%)', paddingBottom: '3rem', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 60%, rgba(255,255,255,0.09) 0%, transparent 50%), radial-gradient(circle at 80% 10%, rgba(255,255,255,0.06) 0%, transparent 40%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', animation: 'vid-orb 4.5s ease-in-out infinite' }} />
                <div style={{ position: 'absolute', bottom: '30px', left: '-25px', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', animation: 'vid-orb 5.5s ease-in-out infinite 1s' }} />

                <div style={{ position: 'relative', zIndex: 1, padding: '1.5rem 1.5rem 0' }}>
                    {/* Back + title */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                        <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.2)', border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', fontSize: '1.1rem', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', flexShrink: 0 }}>←</button>
                        <div>
                            <div style={{ fontSize: '0.68rem', fontWeight: '700', color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                                {isFr ? 'Apprendre par la vidéo' : 'Learn through video'}
                            </div>
                            <div style={{ fontSize: '1.15rem', fontWeight: '900', color: '#fff' }}>
                                🎥 {isFr ? 'Vidéos Medumba' : 'Medumba Videos'}
                            </div>
                        </div>
                    </div>

                    {/* Stats row */}
                    <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '1.25rem', animation: 'vid-in 0.4s ease-out 0.15s both' }}>
                        {[
                            { n: totalVideos, label: isFr ? 'vidéos' : 'videos', icon: '🎥' },
                            { n: CATEGORIES.length, label: isFr ? 'catégories' : 'categories', icon: '📂' },
                            { n: '100%', label: isFr ? 'gratuit' : 'free', icon: '🎁' },
                        ].map((s, i) => (
                            <div key={i} style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', borderRadius: '14px', padding: '0.55rem 0.5rem', textAlign: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
                                <div style={{ fontSize: '0.8rem' }}>{s.icon}</div>
                                <div style={{ fontSize: '0.95rem', fontWeight: '900', color: '#fff', lineHeight: 1.1 }}>{s.n}</div>
                                <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.75)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.3px' }}>{s.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Coming soon notify card */}
                    <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', borderRadius: '18px', padding: '1rem 1.1rem', display: 'flex', alignItems: 'center', gap: '0.85rem', border: '1.5px solid rgba(255,255,255,0.25)', animation: 'vid-in 0.4s ease-out 0.25s both' }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>🚀</div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '0.88rem', fontWeight: '900', color: '#fff' }}>
                                {isFr ? 'Bientôt disponible !' : 'Coming soon!'}
                            </div>
                            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.8)', fontWeight: '600' }}>
                                {isFr ? 'Abonnez-vous pour être notifié en premier' : 'Subscribe to be notified first'}
                            </div>
                        </div>
                        <button
                            onClick={() => setNotified(n => !n)}
                            style={{
                                backgroundColor: notified ? '#fff' : 'rgba(255,255,255,0.25)',
                                border: '2px solid rgba(255,255,255,0.5)',
                                borderRadius: '99px', padding: '0.35rem 0.9rem',
                                fontSize: '0.75rem', fontWeight: '900',
                                color: notified ? '#7c3aed' : '#fff',
                                cursor: 'pointer', fontFamily: 'inherit',
                                transition: 'all 0.2s', flexShrink: 0,
                                animation: notified ? 'vid-pulse 0.4s ease-out' : 'none',
                            }}
                        >
                            {notified ? (isFr ? '✓ OK !' : '✓ Done!') : (isFr ? 'M\'avertir' : 'Notify me')}
                        </button>
                    </div>
                </div>

                {/* Wave SVG */}
                <svg viewBox="0 0 1440 48" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '48px' }} preserveAspectRatio="none">
                    <path d="M0,24 C360,48 720,0 1080,24 C1260,36 1380,16 1440,24 L1440,48 L0,48 Z" fill="#f1f5f9" />
                </svg>
            </div>

            {/* ══ CONTENT ══ */}
            <div style={{ flex: 1, padding: '1.25rem 1rem 2rem', maxWidth: '540px', width: '100%', margin: '0 auto' }}>

                {/* Category filter chips */}
                <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem', marginBottom: '1.25rem', scrollbarWidth: 'none' }}>
                    <button
                        onClick={() => setActiveCategory(null)}
                        style={{
                            flexShrink: 0, padding: '0.4rem 0.9rem', borderRadius: '99px', border: 'none',
                            backgroundColor: activeCategory === null ? '#7c3aed' : '#fff',
                            color: activeCategory === null ? '#fff' : '#64748b',
                            fontWeight: '800', fontSize: '0.78rem', cursor: 'pointer', fontFamily: 'inherit',
                            border: `1.5px solid ${activeCategory === null ? '#7c3aed' : '#e2e8f0'}`,
                            transition: 'all 0.15s',
                        }}
                    >
                        {isFr ? 'Tout' : 'All'}
                    </button>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                            style={{
                                flexShrink: 0, padding: '0.4rem 0.9rem', borderRadius: '99px',
                                backgroundColor: activeCategory === cat.id ? cat.color : '#fff',
                                color: activeCategory === cat.id ? '#fff' : '#64748b',
                                fontWeight: '800', fontSize: '0.78rem', cursor: 'pointer', fontFamily: 'inherit',
                                border: `1.5px solid ${activeCategory === cat.id ? cat.color : '#e2e8f0'}`,
                                transition: 'all 0.15s',
                            }}
                        >
                            {cat.iconEn} {isFr ? cat.labelFr : cat.labelEn}
                        </button>
                    ))}
                </div>

                {/* Category sections */}
                {CATEGORIES.filter(c => !activeCategory || c.id === activeCategory).map((cat, ci) => (
                    <div key={cat.id} style={{ marginBottom: '1.75rem', animation: `vid-in 0.4s ease-out ${ci * 0.1}s both` }}>
                        {/* Category header */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
                            <div style={{ width: '38px', height: '38px', borderRadius: '12px', backgroundColor: cat.light, border: `2px solid ${cat.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                                {cat.iconEn}
                            </div>
                            <div>
                                <div style={{ fontSize: '0.9rem', fontWeight: '900', color: '#0f172a' }}>
                                    {isFr ? cat.labelFr : cat.labelEn}
                                </div>
                                <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: '600' }}>
                                    {isFr ? cat.descFr : cat.descEn} · {cat.videos.length} {isFr ? 'vidéos' : 'videos'}
                                </div>
                            </div>
                        </div>

                        {/* Video cards */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                            {cat.videos.map((vid, vi) => (
                                <div key={vi} className="vid-card" style={{
                                    display: 'flex', alignItems: 'center', gap: '0.85rem',
                                    backgroundColor: '#fff', borderRadius: '18px',
                                    border: `1.5px solid ${cat.border}`,
                                    padding: '0.85rem', cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                                    animation: `vid-in 0.4s ease-out ${(ci * 3 + vi) * 0.05 + 0.1}s both`,
                                }}>
                                    {/* Thumbnail */}
                                    <div style={{
                                        width: '64px', height: '64px', borderRadius: '14px', flexShrink: 0,
                                        background: `linear-gradient(135deg, ${cat.color}25, ${cat.color}45)`,
                                        border: `2px solid ${cat.border}`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        position: 'relative', overflow: 'hidden',
                                    }}>
                                        <span style={{ fontSize: '1.8rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>{vid.thumb}</span>
                                        {/* Play overlay */}
                                        <div className="vid-play" style={{
                                            position: 'absolute', inset: 0,
                                            backgroundColor: `${cat.color}15`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            transition: 'transform 0.2s ease',
                                        }}>
                                            <div style={{ width: '26px', height: '26px', backgroundColor: cat.color, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 2px 8px ${cat.color}60` }}>
                                                <span style={{ fontSize: '0.6rem', color: '#fff', marginLeft: '2px' }}>▶</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontWeight: '800', fontSize: '0.88rem', color: '#0f172a', marginBottom: '0.25rem', lineHeight: 1.3 }}>
                                            {isFr ? vid.titleFr : vid.titleEn}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                                            <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: '600' }}>⏱ {vid.duration}</span>
                                            <span style={{ color: '#cbd5e1', fontSize: '0.7rem' }}>·</span>
                                            <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: '600' }}>👁 {vid.views}</span>
                                            <div style={{ backgroundColor: cat.light, color: cat.color, borderRadius: '99px', padding: '0.1rem 0.5rem', fontSize: '0.62rem', fontWeight: '800', border: `1px solid ${cat.border}` }}>
                                                {isFr ? 'Bientôt' : 'Coming soon'}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Arrow */}
                                    <div style={{ fontSize: '1rem', color: '#cbd5e1', flexShrink: 0 }}>›</div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Bottom CTA */}
                <div style={{ marginTop: '0.5rem', padding: '1.25rem', backgroundColor: '#fff', borderRadius: '20px', border: '1.5px solid #ddd6fe', boxShadow: '0 4px 16px rgba(124,58,237,0.08)', animation: 'vid-pop 0.5s ease-out 0.4s both' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <span style={{ fontSize: '2rem' }}>🎬</span>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '0.88rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.15rem' }}>
                                {isFr ? 'Vous avez du contenu à partager ?' : 'Have content to share?'}
                            </div>
                            <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '600' }}>
                                {isFr ? 'Contribuez à la préservation de la langue Medumba.' : 'Help preserve the Medumba language.'}
                            </div>
                        </div>
                        <div style={{ backgroundColor: '#7c3aed', color: '#fff', borderRadius: '99px', padding: '0.45rem 0.9rem', fontSize: '0.75rem', fontWeight: '800', cursor: 'pointer' }}>
                            {isFr ? 'Contact' : 'Contact'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPage;
