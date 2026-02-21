import { useState, useEffect } from 'react';
import loadingVec from '../assets/loading vec.png';

const LessonLoadingPage = ({ onReady, isFr, lessonTitle, userName }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setProgress((p) => {
                if (p >= 100) { clearInterval(id); return 100; }
                return Math.min(p + 1.6, 100);
            });
        }, 40);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        if (progress >= 100) {
            const t = setTimeout(onReady, 650);
            return () => clearTimeout(t);
        }
    }, [progress, onReady]);

    const floaters = [
        { ch: 'A', color: '#FF6B6B' }, { ch: 'B', color: '#4FC3F7' },
        { ch: '⭐', color: '#FFD700' }, { ch: 'C', color: '#66BB6A' },
        { ch: 'D', color: '#CE93D8' }, { ch: '✏️', color: '#FFB74D' },
        { ch: 'E', color: '#FF6B6B' }, { ch: '⭐', color: '#FFD700' },
    ];

    return (
        <div style={{
            width: '100%',
            height: '100vh',
            backgroundColor: '#f5f9ff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontFamily: "'Outfit', system-ui, sans-serif",
            overflow: 'hidden',
            position: 'relative',
        }}>
            <style>{`
                @keyframes float-up {
                    0%   { transform: translateY(0);        opacity: 0; }
                    10%  { opacity: 1; }
                    90%  { opacity: 0.6; }
                    100% { transform: translateY(-108vh);   opacity: 0; }
                }
                @keyframes teacher-bounce {
                    0%, 100% { transform: translateY(0);     }
                    40%      { transform: translateY(-14px); }
                }
                @keyframes badge-pop {
                    0%, 100% { transform: scale(1);    }
                    50%      { transform: scale(1.05); }
                }
                @keyframes cloud-drift {
                    0%, 100% { transform: translateX(0);    }
                    50%      { transform: translateX(10px); }
                }
            `}</style>

            {/* ── Floating letters ─────────────────────────────────────────── */}
            {floaters.map((f, i) => (
                <div key={i} style={{
                    position: 'absolute',
                    bottom: `${-4 + (i % 4)}%`,
                    left: `${8 + (i * 26 % 84)}%`,
                    fontSize: `${1.1 + (i % 3) * 0.35}rem`,
                    fontWeight: '900',
                    color: f.color,
                    animation: `float-up ${6 + (i * 0.8) % 4}s ease-in ${(i * 0.9) % 3}s infinite`,
                    pointerEvents: 'none',
                    userSelect: 'none',
                    zIndex: 0,
                }}>{f.ch}</div>
            ))}

            {/* ── Cloud (top-right) ────────────────────────────────────────── */}
            <div style={{
                position: 'absolute', top: '1.8rem', right: '1.5rem',
                animation: 'cloud-drift 5s ease-in-out infinite', zIndex: 1,
            }}>
                <svg width="72" height="38" viewBox="0 0 72 38">
                    <circle cx="26" cy="26" r="15" fill="white"/>
                    <circle cx="43" cy="24" r="13" fill="white"/>
                    <circle cx="16" cy="30" r="11" fill="white"/>
                    <rect x="5" y="26" width="62" height="12" rx="6" fill="white"/>
                </svg>
            </div>

            {/* ── Teacher illustration ──────────────────────────────────────── */}
            <div style={{
                position: 'relative',
                width: '100%', maxWidth: '400px',
                flex: '1 1 auto', minHeight: 0,
                display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                paddingTop: '1.5rem', zIndex: 2,
            }}>
                <img
                    src={loadingVec}
                    alt="Teacher"
                    style={{
                        height: 'min(52vh, 290px)',
                        width: 'auto',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.1))',
                        animation: 'teacher-bounce 2s ease-in-out infinite',
                    }}
                />
            </div>

            {/* ── Bottom content ────────────────────────────────────────────── */}
            <div style={{
                width: '100%', maxWidth: '400px',
                padding: '0.5rem 1.5rem 2.2rem',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '0.7rem',
                zIndex: 3, flex: '0 0 auto',
            }}>
                {/* Lesson badge */}
                <div style={{
                    backgroundColor: '#FFF8DC',
                    border: '2px solid #FFD700',
                    borderRadius: '99px',
                    padding: '0.4rem 1.2rem',
                    color: '#B8860B',
                    fontSize: '0.82rem',
                    fontWeight: '800',
                    animation: 'badge-pop 1.8s ease-in-out infinite',
                    boxShadow: '0 3px 10px rgba(255,200,0,0.2)',
                }}>
                    📚 {lessonTitle}
                </div>

                {userName ? (
                    <p style={{ color: '#E91E8C', fontSize: '1rem', fontWeight: '800', margin: 0, textAlign: 'center' }}>
                        {isFr ? `Prêt(e), ${userName} ! 🎉` : `Get ready, ${userName}! 🎉`}
                    </p>
                ) : null}

                <h2 style={{ color: '#1565C0', fontSize: '1.5rem', fontWeight: '900', margin: 0, textAlign: 'center' }}>
                    {isFr ? '🌟 Chargement...' : '🌟 Loading...'}
                </h2>

                <div style={{
                    width: '100%', height: '16px',
                    backgroundColor: '#e8f0fe', borderRadius: '99px',
                    overflow: 'hidden', border: '2px solid #c5d8fb',
                }}>
                    <div style={{
                        width: `${progress}%`, height: '100%',
                        background: 'linear-gradient(90deg, #4FC3F7, #1E88E5)',
                        borderRadius: '99px', transition: 'width 0.08s linear',
                        boxShadow: '0 0 10px rgba(79,195,247,0.6)',
                    }}/>
                </div>

                <span style={{ color: '#1E88E5', fontSize: '0.9rem', fontWeight: '900' }}>
                    {Math.round(progress)}%
                </span>

                <p style={{ color: '#78909C', fontSize: '0.8rem', textAlign: 'center', maxWidth: '260px', lineHeight: 1.6, fontWeight: '600', margin: 0 }}>
                    {isFr ? '✨ Terminez plus vite pour gagner plus de XP et de Diamants !' : '✨ Finish faster to earn more XP and Diamonds!'}
                </p>
            </div>
        </div>
    );
};

export default LessonLoadingPage;
