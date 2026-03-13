import { useState, useRef } from 'react';

/* ══════════════════════════════════════════════════════════════════
   Video catalogue — served from /public/videos/
══════════════════════════════════════════════════════════════════ */
const CATEGORIES = [
    {
        id: 'intro',
        icon: '🎬', color: '#7c3aed', grad: 'linear-gradient(135deg,#7c3aed,#a855f7)',
        labelEn: 'Introduction', labelFr: 'Introduction',
        descEn: 'Start here — Medumba basics', descFr: 'Commencez ici — bases du Medumba',
        videos: [
            { src: '/videos/intro/intro_01_salutation.mp4',  titleFr: "Salutation (Cà'tə̀)",    titleEn: "Greeting (Cà'tə̀)",       descFr: 'Comment saluer',              descEn: 'How to greet',            thumb: '👋', bg: 'linear-gradient(135deg,#7c3aed,#a855f7)' },
            { src: '/videos/intro/intro_02_7jours.mp4',      titleFr: '7 jours de la semaine', titleEn: '7 days of the week',      descFr: 'Les 7 jours en Medumba',      descEn: '7 days in Medumba',       thumb: '📅', bg: 'linear-gradient(135deg,#0891b2,#06b6d4)' },
            { src: '/videos/intro/intro_03_bagwud.mp4',      titleFr: 'Bǎgwud',               titleEn: 'Bǎgwud',                  descFr: 'Vocabulaire culturel',        descEn: 'Cultural vocabulary',     thumb: '🏺', bg: 'linear-gradient(135deg,#d97706,#f59e0b)' },
            { src: '/videos/intro/intro_04_matin.mp4',       titleFr: 'Le matin',              titleEn: 'The morning',             descFr: 'Expressions du matin',        descEn: 'Morning expressions',     thumb: '🌅', bg: 'linear-gradient(135deg,#f97316,#fb923c)' },
            { src: '/videos/intro/intro_05_8jours.mp4',      titleFr: '8 jours (calendrier)',  titleEn: '8-day calendar',          descFr: 'Calendrier Medumba',          descEn: 'Medumba calendar',        thumb: '🗓️', bg: 'linear-gradient(135deg,#0f766e,#14b8a6)' },
            { src: '/videos/intro/intro_06_mois.mp4',        titleFr: "Mois de l'année",       titleEn: 'Months of the year',      descFr: 'Les 12 mois en Medumba',      descEn: '12 months in Medumba',    thumb: '📆', bg: 'linear-gradient(135deg,#4f46e5,#818cf8)' },
            { src: '/videos/intro/intro_07_maison.mp4',      titleFr: 'La maison (Tǔnndα)',    titleEn: 'The house (Tǔnndα)',       descFr: 'Vocabulaire de la maison',    descEn: 'Home vocabulary',         thumb: '🏠', bg: 'linear-gradient(135deg,#16a34a,#4ade80)' },
            { src: '/videos/intro/intro_08_mots.mp4',        titleFr: 'Les mots (Tʉntə̀)',     titleEn: 'Words (Tʉntə̀)',           descFr: 'Mots et chiffres de base',    descEn: 'Basic words & numbers',   thumb: '🔢', bg: 'linear-gradient(135deg,#dc2626,#f87171)' },
        ],
    },
    {
        id: 'niveau1',
        icon: '📗', color: '#16a34a', grad: 'linear-gradient(135deg,#16a34a,#4ade80)',
        labelEn: 'Level 1', labelFr: 'Niveau 1',
        descEn: 'Everyday conversations', descFr: 'Conversations du quotidien',
        videos: [
            { src: '/videos/niveau1/n1_04_salutation1.mp4',  titleFr: 'Salutations 1',          titleEn: 'Greetings 1',             descFr: 'Formules de salutation',      descEn: 'Greeting formulas',       thumb: '🤝', bg: 'linear-gradient(135deg,#16a34a,#4ade80)' },
            { src: '/videos/niveau1/n1_05_salutation2.mp4',  titleFr: 'Salutations 2',          titleEn: 'Greetings 2',             descFr: 'Salutations approfondies',    descEn: 'Extended greetings',      thumb: '😊', bg: 'linear-gradient(135deg,#0891b2,#22d3ee)' },
            { src: '/videos/niveau1/n1_03_monnom.mp4',       titleFr: "Mon nom (Mfǎ' nὰ)",      titleEn: "My name (Mfǎ' nὰ)",       descFr: 'Se présenter',                descEn: 'Introducing yourself',    thumb: '🪪', bg: 'linear-gradient(135deg,#7c3aed,#a78bfa)' },
            { src: '/videos/niveau1/n1_01_marche1.mp4',      titleFr: 'Au marché — partie 1',   titleEn: 'At the market — part 1',  descFr: 'Dialogue au marché',          descEn: 'Market dialogue',         thumb: '🛒', bg: 'linear-gradient(135deg,#d97706,#fbbf24)' },
            { src: '/videos/niveau1/n1_02_marche2.mp4',      titleFr: 'Au marché — partie 2',   titleEn: 'At the market — part 2',  descFr: 'Négocier et acheter',         descEn: 'Haggling & buying',       thumb: '💰', bg: 'linear-gradient(135deg,#b45309,#f59e0b)' },
            { src: '/videos/niveau1/n1_06_demanderju.mp4',   titleFr: 'Demander le jour',       titleEn: 'Asking the day',          descFr: 'Demander la date',            descEn: 'Asking for the date',     thumb: '❓', bg: 'linear-gradient(135deg,#0f766e,#2dd4bf)' },
            { src: '/videos/niveau1/n1_07_demander.mp4',     titleFr: 'Demander quelque chose', titleEn: 'Asking for something',    descFr: 'Formuler une demande',        descEn: 'Making a request',        thumb: '🙏', bg: 'linear-gradient(135deg,#4f46e5,#6366f1)' },
            { src: '/videos/niveau1/n1_08_manger.mp4',       titleFr: "Manger un repas",        titleEn: 'Eating a meal',           descFr: 'Vocabulaire des repas',       descEn: 'Meal vocabulary',         thumb: '🍽️', bg: 'linear-gradient(135deg,#dc2626,#fb7185)' },
            { src: '/videos/niveau1/n1_09_dormir.mp4',       titleFr: 'Dormir (tswǐ wud)',      titleEn: 'Sleeping (tswǐ wud)',     descFr: 'Expressions du soir',         descEn: 'Evening expressions',     thumb: '😴', bg: 'linear-gradient(135deg,#1e3a5f,#3b82f6)' },
        ],
    },
    {
        id: 'niveau2',
        icon: '📘', color: '#0891b2', grad: 'linear-gradient(135deg,#0891b2,#22d3ee)',
        labelEn: 'Level 2', labelFr: 'Niveau 2',
        descEn: 'Advanced topics', descFr: 'Sujets avancés',
        videos: [
            { src: '/videos/niveau2/n2_01_chanson.mp4',      titleFr: 'Chanson Medumba (Caŋ)', titleEn: 'Medumba song (Caŋ)',       descFr: 'Apprendre par la chanson',    descEn: 'Learn through song',      thumb: '🎵', bg: 'linear-gradient(135deg,#7c3aed,#c084fc)' },
            { src: '/videos/niveau2/n2_02_bonnenuit.mp4',    titleFr: 'Bonne nuit, enfant',    titleEn: 'Goodnight, child',         descFr: 'Expressions pour enfants',    descEn: 'For children',            thumb: '🌙', bg: 'linear-gradient(135deg,#1e3a5f,#6366f1)' },
        ],
    },
    {
        id: 'dessin',
        icon: '🎨', color: '#e11d48', grad: 'linear-gradient(135deg,#e11d48,#fb7185)',
        labelEn: 'Drawings', labelFr: 'Dessins Medumba',
        descEn: 'Animated visual lessons', descFr: 'Leçons animées visuelles',
        videos: [
            { src: '/videos/dessin/dessin_01.mp4', titleFr: 'Dessin 01', titleEn: 'Drawing 01', descFr: 'Leçon animée n°1',  descEn: 'Lesson #1',  thumb: '✏️', bg: 'linear-gradient(135deg,#e11d48,#f43f5e)' },
            { src: '/videos/dessin/dessin_02.mp4', titleFr: 'Dessin 02', titleEn: 'Drawing 02', descFr: 'Leçon animée n°2',  descEn: 'Lesson #2',  thumb: '🖍️', bg: 'linear-gradient(135deg,#d97706,#fb923c)' },
            { src: '/videos/dessin/dessin_03.mp4', titleFr: 'Dessin 03', titleEn: 'Drawing 03', descFr: 'Leçon animée n°3',  descEn: 'Lesson #3',  thumb: '🎨', bg: 'linear-gradient(135deg,#16a34a,#4ade80)' },
            { src: '/videos/dessin/dessin_04.mp4', titleFr: 'Dessin 04', titleEn: 'Drawing 04', descFr: 'Leçon animée n°4',  descEn: 'Lesson #4',  thumb: '🖌️', bg: 'linear-gradient(135deg,#0891b2,#22d3ee)' },
            { src: '/videos/dessin/dessin_05.mp4', titleFr: 'Dessin 05', titleEn: 'Drawing 05', descFr: 'Leçon animée n°5',  descEn: 'Lesson #5',  thumb: '✏️', bg: 'linear-gradient(135deg,#7c3aed,#a78bfa)' },
            { src: '/videos/dessin/dessin_06.mp4', titleFr: 'Dessin 06', titleEn: 'Drawing 06', descFr: 'Leçon animée n°6',  descEn: 'Lesson #6',  thumb: '🖍️', bg: 'linear-gradient(135deg,#0f766e,#14b8a6)' },
            { src: '/videos/dessin/dessin_07.mp4', titleFr: 'Dessin 07', titleEn: 'Drawing 07', descFr: 'Leçon animée n°7',  descEn: 'Lesson #7',  thumb: '🎨', bg: 'linear-gradient(135deg,#4f46e5,#818cf8)' },
            { src: '/videos/dessin/dessin_08.mp4', titleFr: 'Dessin 08', titleEn: 'Drawing 08', descFr: 'Leçon animée n°8',  descEn: 'Lesson #8',  thumb: '🖌️', bg: 'linear-gradient(135deg,#dc2626,#f87171)' },
            { src: '/videos/dessin/dessin_09.mp4', titleFr: 'Dessin 09', titleEn: 'Drawing 09', descFr: 'Leçon animée n°9',  descEn: 'Lesson #9',  thumb: '✏️', bg: 'linear-gradient(135deg,#b45309,#fbbf24)' },
            { src: '/videos/dessin/dessin_10.mp4', titleFr: 'Dessin 10', titleEn: 'Drawing 10', descFr: 'Leçon animée n°10', descEn: 'Lesson #10', thumb: '🖍️', bg: 'linear-gradient(135deg,#7c3aed,#c084fc)' },
            { src: '/videos/dessin/dessin_11.mp4', titleFr: 'Dessin 11', titleEn: 'Drawing 11', descFr: 'Leçon animée n°11', descEn: 'Lesson #11', thumb: '🎨', bg: 'linear-gradient(135deg,#16a34a,#86efac)' },
            { src: '/videos/dessin/dessin_12.mp4', titleFr: 'Dessin 12', titleEn: 'Drawing 12', descFr: 'Leçon animée n°12', descEn: 'Lesson #12', thumb: '🖌️', bg: 'linear-gradient(135deg,#0891b2,#67e8f9)' },
        ],
    },
];

/* ── Inline video player modal ─────────────────────────────── */
const VideoPlayer = ({ video, cat, isFr, onClose }) => (
    <div
        onClick={onClose}
        style={{
            position: 'fixed', inset: 0, zIndex: 999,
            backgroundColor: 'rgba(0,0,0,0.92)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
        }}
    >
        <div
            onClick={e => e.stopPropagation()}
            style={{
                width: '100%', maxWidth: '520px',
                backgroundColor: '#0f172a', borderRadius: '24px',
                overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
            }}
        >
            <div style={{
                padding: '1rem 1.1rem',
                background: video.bg,
                display: 'flex', alignItems: 'center', gap: '0.8rem',
            }}>
                <span style={{ fontSize: '1.5rem' }}>{video.thumb}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: '900', fontSize: '0.95rem', color: '#fff', lineHeight: 1.2 }}>
                        {isFr ? video.titleFr : video.titleEn}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.8)', fontWeight: '600', marginTop: '2px' }}>
                        {isFr ? video.descFr : video.descEn}
                    </div>
                </div>
                <button onClick={onClose} style={{
                    background: 'rgba(0,0,0,0.3)', border: 'none',
                    borderRadius: '50%', width: '34px', height: '34px',
                    cursor: 'pointer', color: '#fff', fontSize: '0.9rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>✕</button>
            </div>
            <video
                src={video.src} controls autoPlay
                style={{ width: '100%', display: 'block', backgroundColor: '#000', maxHeight: '65vh' }}
            />
        </div>
    </div>
);

/* ── Horizontal row card ───────────────────────────────────── */
const VideoCard = ({ video, index, onPlay }) => (
    <div
        onClick={onPlay}
        style={{
            flexShrink: 0, width: '150px', cursor: 'pointer',
            transition: 'transform 0.2s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >
        {/* Thumbnail */}
        <div style={{
            width: '150px', height: '105px', borderRadius: '14px',
            background: video.bg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden',
            boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
        }}>
            {/* Number badge */}
            <div style={{
                position: 'absolute', top: '8px', left: '8px',
                backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)',
                borderRadius: '8px', padding: '2px 7px',
                fontSize: '0.62rem', fontWeight: '900', color: '#fff',
                letterSpacing: '0.3px',
            }}>
                #{String(index + 1).padStart(2, '0')}
            </div>

            {/* Emoji */}
            <span style={{ fontSize: '2.8rem', filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.3))' }}>
                {video.thumb}
            </span>

            {/* Play button overlay */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)',
                display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                paddingBottom: '8px',
            }}>
                <div style={{
                    width: '30px', height: '30px', borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.92)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.35)',
                }}>
                    <span style={{ fontSize: '0.7rem', color: '#0f172a', marginLeft: '2px' }}>▶</span>
                </div>
            </div>
        </div>

        {/* Title below card */}
        <div style={{ marginTop: '0.5rem', paddingLeft: '2px' }}>
            <div style={{
                fontWeight: '800', fontSize: '0.78rem', color: '#e2e8f0',
                lineHeight: 1.25, display: '-webkit-box',
                WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
            }}>
                {video.titleFr}
            </div>
        </div>
    </div>
);

/* ── Featured hero card (first intro video) ────────────────── */
const HeroCard = ({ video, isFr, onPlay }) => (
    <div
        onClick={onPlay}
        style={{
            position: 'relative', width: '100%', height: '200px',
            borderRadius: '20px', overflow: 'hidden', cursor: 'pointer',
            background: video.bg,
            boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
            transition: 'transform 0.2s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.01)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >
        {/* Background emoji decoration */}
        <div style={{
            position: 'absolute', right: '24px', top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '7rem', opacity: 0.25,
            filter: 'blur(2px)',
            pointerEvents: 'none',
        }}>
            {video.thumb}
        </div>

        {/* Gradient overlay */}
        <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, rgba(0,0,0,0.65) 40%, transparent 100%)',
        }} />

        {/* Content */}
        <div style={{
            position: 'relative', zIndex: 1,
            padding: '1.5rem',
            height: '100%',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
            <div>
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                    backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)',
                    borderRadius: '99px', padding: '0.2rem 0.7rem',
                    fontSize: '0.65rem', fontWeight: '800', color: '#fff',
                    letterSpacing: '0.5px', textTransform: 'uppercase',
                    marginBottom: '0.6rem',
                }}>
                    ⭐ {isFr ? 'À la une' : 'Featured'}
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: '900', color: '#fff', lineHeight: 1.25 }}>
                    {isFr ? video.titleFr : video.titleEn}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)', fontWeight: '600', marginTop: '0.3rem' }}>
                    {isFr ? video.descFr : video.descEn}
                </div>
            </div>

            {/* Play button */}
            <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    backgroundColor: '#fff', color: '#0f172a',
                    borderRadius: '99px', padding: '0.55rem 1.2rem',
                    fontWeight: '900', fontSize: '0.85rem', cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                }}>
                    ▶ {isFr ? 'Regarder' : 'Watch now'}
                </div>
            </div>
        </div>
    </div>
);

/* ══════════════════════════════════════════════════════════════════
   VideoPage
══════════════════════════════════════════════════════════════════ */
const VideoPage = ({ nativeLang, onBack }) => {
    const isFr = nativeLang === 'french';
    const [playing, setPlaying] = useState(null);

    const totalVideos = CATEGORIES.reduce((sum, c) => sum + c.videos.length, 0);
    const featuredVideo = CATEGORIES[0].videos[0];

    return (
        <div style={{
            width: '100%', minHeight: '100vh',
            backgroundColor: '#0f172a',
            display: 'flex', flexDirection: 'column',
            fontFamily: "'Outfit', system-ui, sans-serif",
        }}>
            <style>{`
                ::-webkit-scrollbar { display: none; }
                @keyframes fade-up { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
            `}</style>

            {/* Player modal */}
            {playing && (
                <VideoPlayer
                    video={playing.video}
                    cat={playing.cat}
                    isFr={isFr}
                    onClose={() => setPlaying(null)}
                />
            )}

            {/* ── Top nav ── */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                padding: '1.25rem 1.25rem 0',
                position: 'sticky', top: 0, zIndex: 50,
                background: 'linear-gradient(to bottom, #0f172a 80%, transparent)',
            }}>
                <button onClick={onBack} style={{
                    background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '50%', width: '40px', height: '40px',
                    cursor: 'pointer', fontSize: '1.1rem', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(8px)', flexShrink: 0,
                }}>←</button>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: '900', color: '#fff' }}>
                        🎥 {isFr ? 'Vidéos Medumba' : 'Medumba Videos'}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.5)', fontWeight: '600' }}>
                        {totalVideos} {isFr ? 'vidéos · 4 collections' : 'videos · 4 collections'}
                    </div>
                </div>
            </div>

            {/* ── Content ── */}
            <div style={{ flex: 1, padding: '1.25rem 1.25rem 3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                {/* Featured hero */}
                <div style={{ animation: 'fade-up 0.4s ease-out both' }}>
                    <HeroCard
                        video={featuredVideo}
                        isFr={isFr}
                        onPlay={() => setPlaying({ video: featuredVideo, cat: CATEGORIES[0] })}
                    />
                </div>

                {/* Category rows */}
                {CATEGORIES.map((cat, ci) => (
                    <div key={cat.id} style={{ animation: `fade-up 0.4s ease-out ${0.1 + ci * 0.08}s both` }}>
                        {/* Section header */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.85rem' }}>
                            <div style={{
                                width: '4px', height: '22px', borderRadius: '2px',
                                background: cat.grad,
                            }} />
                            <div>
                                <div style={{ fontSize: '1rem', fontWeight: '900', color: '#f1f5f9', lineHeight: 1.1 }}>
                                    {cat.icon} {isFr ? cat.labelFr : cat.labelEn}
                                </div>
                                <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', fontWeight: '600' }}>
                                    {isFr ? cat.descFr : cat.descEn} · {cat.videos.length} {isFr ? 'vidéos' : 'videos'}
                                </div>
                            </div>
                        </div>

                        {/* Horizontal scroll row */}
                        <div style={{
                            display: 'flex', gap: '0.85rem',
                            overflowX: 'auto', paddingBottom: '0.5rem',
                            scrollbarWidth: 'none',
                            marginLeft: '-1.25rem', marginRight: '-1.25rem',
                            paddingLeft: '1.25rem', paddingRight: '1.25rem',
                        }}>
                            {cat.videos.map((vid, vi) => (
                                <VideoCard
                                    key={vi}
                                    video={vid}
                                    index={vi}
                                    onPlay={() => setPlaying({ video: vid, cat })}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideoPage;
