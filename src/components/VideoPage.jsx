const CATEGORIES = [
    {
        iconEn: '👋', labelEn: 'Greetings & Basics', labelFr: 'Salutations & Bases',
        videos: [
            { titleEn: 'Hello in Medumba', titleFr: 'Bonjour en Medumba', duration: '3:24', thumb: '🗣️' },
            { titleEn: 'Introducing yourself', titleFr: 'Se présenter', duration: '5:10', thumb: '🤝' },
            { titleEn: 'Common phrases', titleFr: 'Phrases courantes', duration: '7:45', thumb: '💬' },
        ],
    },
    {
        iconEn: '🔤', labelEn: 'Pronunciation', labelFr: 'Prononciation',
        videos: [
            { titleEn: 'Medumba tones', titleFr: 'Les tons Medumba', duration: '6:12', thumb: '🎵' },
            { titleEn: 'Vowels & consonants', titleFr: 'Voyelles & consonnes', duration: '8:30', thumb: '🔤' },
        ],
    },
    {
        iconEn: '🏡', labelEn: 'Daily Life', labelFr: 'Vie Quotidienne',
        videos: [
            { titleEn: 'At the market', titleFr: 'Au marché', duration: '4:55', thumb: '🛒' },
            { titleEn: 'Food & cooking', titleFr: 'Nourriture & cuisine', duration: '6:38', thumb: '🍽️' },
            { titleEn: 'Family vocabulary', titleFr: 'Vocabulaire famille', duration: '5:20', thumb: '👨‍👩‍👧' },
        ],
    },
    {
        iconEn: '🎭', labelEn: 'Culture & Traditions', labelFr: 'Culture & Traditions',
        videos: [
            { titleEn: 'Bamileke traditions', titleFr: 'Traditions Bamiléké', duration: '9:15', thumb: '🥁' },
            { titleEn: 'Medumba proverbs', titleFr: 'Proverbes Medumba', duration: '4:00', thumb: '📜' },
        ],
    },
];

const VideoPage = ({ nativeLang, onBack }) => {
    const isFr = nativeLang === 'french';

    return (
        <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', fontFamily: "'Outfit', system-ui, sans-serif" }}>
            <style>{`
                @keyframes vid-in { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
                .vid-card:hover { box-shadow: 0 8px 24px rgba(124,58,237,0.2) !important; transform: translateY(-2px); }
            `}</style>

            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)', padding: '1.25rem 1.5rem 2rem', color: '#fff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '38px', height: '38px', cursor: 'pointer', fontSize: '1.2rem', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
                    <div>
                        <div style={{ fontSize: '0.72rem', fontWeight: '700', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.7px' }}>
                            {isFr ? 'Apprendre par la vidéo' : 'Learn by video'}
                        </div>
                        <div style={{ fontSize: '1.2rem', fontWeight: '900' }}>🎥 {isFr ? 'Vidéos Medumba' : 'Medumba Videos'}</div>
                    </div>
                </div>

                {/* Coming soon banner */}
                <div style={{ backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: '14px', padding: '0.9rem 1.1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.4rem' }}>🚀</span>
                    <div>
                        <div style={{ fontWeight: '800', fontSize: '0.9rem' }}>
                            {isFr ? 'Vidéos bientôt disponibles !' : 'Videos coming soon!'}
                        </div>
                        <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>
                            {isFr ? 'Abonnez-vous pour être notifié.' : 'Subscribe to get notified.'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Category list */}
            <div style={{ flex: 1, padding: '1.25rem 1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'vid-in 0.35s ease-out both' }}>
                {CATEGORIES.map((cat, ci) => (
                    <div key={ci}>
                        <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.65rem' }}>
                            {cat.iconEn} {isFr ? cat.labelFr : cat.labelEn}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                            {cat.videos.map((vid, vi) => (
                                <div key={vi} className="vid-card" style={{
                                    display: 'flex', alignItems: 'center', gap: '0.85rem',
                                    backgroundColor: '#fff', borderRadius: '16px',
                                    border: '2px solid #e2e8f0', padding: '0.85rem 1rem',
                                    cursor: 'pointer', transition: 'all 0.2s',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                    animation: `vid-in 0.4s ease-out ${(ci * 3 + vi) * 0.05}s both`,
                                }}>
                                    {/* Thumbnail */}
                                    <div style={{
                                        width: '56px', height: '56px', borderRadius: '12px', flexShrink: 0,
                                        background: 'linear-gradient(135deg, #7c3aed22, #a78bfa44)',
                                        border: '2px solid #a78bfa44',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '1.6rem', position: 'relative',
                                    }}>
                                        {vid.thumb}
                                        <div style={{
                                            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            backgroundColor: 'rgba(124,58,237,0.12)', borderRadius: '10px',
                                        }}>
                                            <div style={{ width: '22px', height: '22px', backgroundColor: '#7c3aed', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <span style={{ fontSize: '0.6rem', color: '#fff', marginLeft: '2px' }}>▶</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontWeight: '700', fontSize: '0.9rem', color: '#0f172a', marginBottom: '2px' }}>
                                            {isFr ? vid.titleFr : vid.titleEn}
                                        </div>
                                        <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                            <span>⏱ {vid.duration}</span>
                                            <span>·</span>
                                            <span style={{ backgroundColor: '#f3e8ff', color: '#7c3aed', borderRadius: '99px', padding: '0.1rem 0.5rem', fontWeight: '700' }}>
                                                {isFr ? 'Bientôt' : 'Coming soon'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideoPage;
