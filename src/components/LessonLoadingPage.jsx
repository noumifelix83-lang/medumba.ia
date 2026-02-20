import { useState, useEffect } from 'react';

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
                @keyframes star-spin {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
                @keyframes sun-rays {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
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

            {/* ── Sun (top-left) ───────────────────────────────────────────── */}
            <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 1 }}>
                {/* Rays ring */}
                <div style={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    width: '72px', height: '72px',
                    marginTop: '-36px', marginLeft: '-36px',
                    animation: 'sun-rays 12s linear infinite',
                }}>
                    {[...Array(8)].map((_, i) => (
                        <div key={i} style={{
                            position: 'absolute',
                            width: '4px', height: '14px',
                            backgroundColor: '#FFD700',
                            borderRadius: '99px',
                            top: '50%', left: '50%',
                            transformOrigin: '50% 38px',
                            transform: `translate(-50%, -50%) translateY(-38px) rotate(${i * 45}deg)`,
                            opacity: 0.85,
                        }}/>
                    ))}
                </div>
                {/* Sun disc */}
                <div style={{
                    width: '48px', height: '48px',
                    background: 'radial-gradient(circle, #FFE566 60%, #FFC107 100%)',
                    borderRadius: '50%',
                    position: 'relative', zIndex: 1,
                }}/>
            </div>

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
                <svg
                    viewBox="0 0 220 300"
                    style={{
                        height: 'min(52vh, 290px)',
                        width: 'auto',
                        filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.1))',
                        animation: 'teacher-bounce 2s ease-in-out infinite',
                        position: 'relative', zIndex: 2,
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <ellipse cx="110" cy="296" rx="55" ry="6" fill="rgba(0,0,0,0.07)"/>

                    {/* HAIR BACK */}
                    <ellipse cx="110" cy="58"  rx="48" ry="48" fill="#1a0800"/>
                    <circle  cx="84"  cy="26"  r="18"           fill="#1a0800"/>
                    <circle  cx="136" cy="26"  r="18"           fill="#1a0800"/>

                    {/* HEAD */}
                    <circle cx="110" cy="72" r="40" fill="#d4956a"/>

                    {/* HAIR FRONT */}
                    <path d="M70 58 Q75 26 110 24 Q145 26 150 58 Q132 46 110 46 Q88 46 70 58Z"
                          fill="#1a0800"/>

                    {/* BOWS */}
                    <ellipse cx="84"  cy="24" rx="14" ry="9" fill="#FF6B6B" transform="rotate(-15,84,24)"/>
                    <ellipse cx="84"  cy="24" rx="14" ry="9" fill="#FF4D6D" transform="rotate(15,84,24)"/>
                    <circle  cx="84"  cy="24" r="5.5"        fill="#FF8FA3"/>
                    <ellipse cx="136" cy="24" rx="14" ry="9" fill="#FF6B6B" transform="rotate(15,136,24)"/>
                    <ellipse cx="136" cy="24" rx="14" ry="9" fill="#FF4D6D" transform="rotate(-15,136,24)"/>
                    <circle  cx="136" cy="24" r="5.5"        fill="#FF8FA3"/>

                    {/* EYEBROWS */}
                    <path d="M85 60 Q94 54 103 59"
                          stroke="#1a0800" strokeWidth="3" fill="none" strokeLinecap="round"/>
                    <path d="M117 59 Q126 54 135 60"
                          stroke="#1a0800" strokeWidth="3" fill="none" strokeLinecap="round"/>

                    {/* EYES */}
                    <ellipse cx="94"  cy="73" rx="12" ry="13" fill="white"/>
                    <ellipse cx="126" cy="73" rx="12" ry="13" fill="white"/>
                    <circle  cx="94"  cy="74" r="8"           fill="#5c3317"/>
                    <circle  cx="126" cy="74" r="8"           fill="#5c3317"/>
                    <circle  cx="94"  cy="74" r="5.5"         fill="#1a0800"/>
                    <circle  cx="126" cy="74" r="5.5"         fill="#1a0800"/>
                    <circle  cx="98"  cy="68" r="4"           fill="white"/>
                    <circle  cx="130" cy="68" r="4"           fill="white"/>
                    <circle  cx="90"  cy="78" r="1.5"         fill="white" opacity="0.7"/>
                    <circle  cx="122" cy="78" r="1.5"         fill="white" opacity="0.7"/>

                    {/* NOSE */}
                    <ellipse cx="110" cy="87" rx="4.5" ry="3.5" fill="#b5723a" opacity="0.5"/>

                    {/* SMILE */}
                    <path d="M88 97 Q110 115 132 97"
                          stroke="#c06040" strokeWidth="4" fill="none" strokeLinecap="round"/>
                    <path d="M90 98 Q110 113 130 98 Q110 107 90 98Z"
                          fill="white" opacity="0.95"/>

                    {/* CHEEKS */}
                    <ellipse cx="78"  cy="88" rx="13" ry="9" fill="#FF6B6B" opacity="0.28"/>
                    <ellipse cx="142" cy="88" rx="13" ry="9" fill="#FF6B6B" opacity="0.28"/>

                    {/* NECK */}
                    <rect x="100" y="108" width="20" height="18" rx="6" fill="#d4956a"/>

                    {/* DRESS */}
                    <path d="M54 122 Q54 120 110 118 Q166 120 166 122 L172 220 Q110 228 48 220 Z"
                          fill="#26C6DA"/>

                    {/* COLLAR */}
                    <path d="M96 118 L110 136 L124 118" fill="white" opacity="0.95"/>

                    {/* DOTS */}
                    {[[68,145],[88,162],[78,178],[100,150],[122,168],
                      [142,154],[130,176],[152,162],[110,186],[72,192]].map(([x,y],i) => (
                        <circle key={i} cx={x} cy={y} r="3.5" fill="white" opacity="0.28"/>
                    ))}

                    {/* LEFT ARM + WAND */}
                    <path d="M54 128 L28 168 L28 185 L46 185 L68 142 Z" fill="#26C6DA"/>
                    <circle cx="29" cy="183" r="14" fill="#d4956a"/>
                    <line x1="22" y1="179" x2="30" y2="152"
                          stroke="#FFD700" strokeWidth="6" strokeLinecap="round"/>
                    <path
                        d="M30 136 L32 143 L40 143 L33.5 148 L36 155 L30 150.5 L24 155 L26.5 148 L20 143 L28 143 Z"
                        fill="#FFD700"
                        style={{ animation: 'star-spin 3s linear infinite', transformOrigin: '30px 146px' }}
                    />

                    {/* RIGHT ARM + WAVING HAND */}
                    <path d="M166 128 L190 90 L182 84 L158 124 Z" fill="#26C6DA"/>
                    <circle cx="190" cy="87" r="15" fill="#d4956a"/>
                    <path d="M182 80 Q186 74 190 76"
                          stroke="#b5723a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                    <path d="M189 77 Q194 70 198 73"
                          stroke="#b5723a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                    <path d="M197 74 Q201 69 204 73"
                          stroke="#b5723a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>

                    {/* small sparkle */}
                    <path d="M210 62 L211.8 68 L218 69.5 L211.8 71 L210 77 L208.2 71 L202 69.5 L208.2 68 Z"
                          fill="#FFD700" opacity="0.9"
                          style={{ animation: 'star-spin 2s linear infinite', transformOrigin: '210px 69.5px' }}/>

                    {/* SKIRT */}
                    <path d="M50 218 L44 270 L76 270 L88 230 L132 230 L144 270 L176 270 L170 218 Z"
                          fill="#00ACC1"/>

                    {/* SHOES */}
                    <ellipse cx="62"  cy="273" rx="26" ry="10" fill="#FF6B6B"/>
                    <ellipse cx="158" cy="273" rx="26" ry="10" fill="#FF6B6B"/>
                    <rect x="54"  y="268" width="16" height="9" rx="3" fill="#FF8FA3"/>
                    <rect x="150" y="268" width="16" height="9" rx="3" fill="#FF8FA3"/>
                </svg>
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

                {/* Greeting */}
                {userName ? (
                    <p style={{
                        color: '#E91E8C',
                        fontSize: '1rem',
                        fontWeight: '800',
                        margin: 0,
                        textAlign: 'center',
                    }}>
                        {isFr ? `Prêt(e), ${userName} ! 🎉` : `Get ready, ${userName}! 🎉`}
                    </p>
                ) : null}

                {/* Title */}
                <h2 style={{
                    color: '#1565C0',
                    fontSize: '1.5rem',
                    fontWeight: '900',
                    margin: 0,
                    textAlign: 'center',
                }}>
                    {isFr ? '🌟 Chargement...' : '🌟 Loading...'}
                </h2>

                {/* Progress bar */}
                <div style={{
                    width: '100%',
                    height: '16px',
                    backgroundColor: '#e8f0fe',
                    borderRadius: '99px',
                    overflow: 'hidden',
                    border: '2px solid #c5d8fb',
                }}>
                    <div style={{
                        width: `${progress}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #4FC3F7, #1E88E5)',
                        borderRadius: '99px',
                        transition: 'width 0.08s linear',
                        boxShadow: '0 0 10px rgba(79,195,247,0.6)',
                    }}/>
                </div>

                {/* Percentage */}
                <span style={{ color: '#1E88E5', fontSize: '0.9rem', fontWeight: '900' }}>
                    {Math.round(progress)}%
                </span>

                {/* Tip */}
                <p style={{
                    color: '#78909C',
                    fontSize: '0.8rem',
                    textAlign: 'center',
                    maxWidth: '260px',
                    lineHeight: 1.6,
                    fontWeight: '600',
                    margin: 0,
                }}>
                    {isFr
                        ? '✨ Terminez plus vite pour gagner plus de XP et de Diamants !'
                        : '✨ Finish faster to earn more XP and Diamonds!'}
                </p>
            </div>
        </div>
    );
};

export default LessonLoadingPage;
