import { useState } from 'react';

// Medumba numbers (Bamileke/Medumba tradition)
const NUMBERS = [
    { n: 0,   medumba: 'Puu',           frEn: ['Zéro', 'Zero']       },
    { n: 1,   medumba: 'Dɔɔ',           frEn: ['Un',   'One']        },
    { n: 2,   medumba: 'Bâ',            frEn: ['Deux', 'Two']        },
    { n: 3,   medumba: 'Sàt',           frEn: ['Trois','Three']      },
    { n: 4,   medumba: 'Nàt',           frEn: ['Quatre','Four']      },
    { n: 5,   medumba: 'Tàn',           frEn: ['Cinq', 'Five']       },
    { n: 6,   medumba: 'Ntuùk',         frEn: ['Six',  'Six']        },
    { n: 7,   medumba: 'Sàmbà',         frEn: ['Sept', 'Seven']      },
    { n: 8,   medumba: 'Sɛ́t',           frEn: ['Huit', 'Eight']      },
    { n: 9,   medumba: 'Ngwɛ̀n',         frEn: ['Neuf', 'Nine']       },
    { n: 10,  medumba: 'Kùm',           frEn: ['Dix',  'Ten']        },
    { n: 11,  medumba: 'Kùm nə dɔɔ',   frEn: ['Onze', 'Eleven']     },
    { n: 12,  medumba: 'Kùm nə bâ',    frEn: ['Douze','Twelve']     },
    { n: 13,  medumba: 'Kùm nə sàt',   frEn: ['Treize','Thirteen']  },
    { n: 14,  medumba: 'Kùm nə nàt',   frEn: ['Quatorze','Fourteen']},
    { n: 15,  medumba: 'Kùm nə tàn',   frEn: ['Quinze','Fifteen']   },
    { n: 16,  medumba: 'Kùm nə ntuùk', frEn: ['Seize','Sixteen']    },
    { n: 17,  medumba: 'Kùm nə sàmbà', frEn: ['Dix-sept','Seventeen']},
    { n: 18,  medumba: 'Kùm nə sɛ́t',   frEn: ['Dix-huit','Eighteen']},
    { n: 19,  medumba: 'Kùm nə ngwɛ̀n', frEn: ['Dix-neuf','Nineteen']},
    { n: 20,  medumba: 'Bâ kùm',       frEn: ['Vingt','Twenty']     },
    { n: 30,  medumba: 'Sàt kùm',      frEn: ['Trente','Thirty']    },
    { n: 40,  medumba: 'Nàt kùm',      frEn: ['Quarante','Forty']   },
    { n: 50,  medumba: 'Tàn kùm',      frEn: ['Cinquante','Fifty']  },
    { n: 100, medumba: 'Dzàp',         frEn: ['Cent','Hundred']     },
    { n: 1000,medumba: 'Kàŋ',          frEn: ['Mille','Thousand']   },
];

// Simple quiz pool
const makeQuiz = () => {
    const pool = NUMBERS.slice(0, 20);
    const q    = pool[Math.floor(Math.random() * pool.length)];
    const wrong = pool.filter(x => x.n !== q.n).sort(() => Math.random() - 0.5).slice(0, 3);
    const opts  = [q, ...wrong].sort(() => Math.random() - 0.5);
    return { q, opts };
};

const CountingPage = ({ nativeLang, onBack }) => {
    const isFr = nativeLang === 'french';
    const [tab,       setTab]       = useState('list');   // 'list' | 'quiz'
    const [speaking,  setSpeaking]  = useState(null);
    const [quiz,      setQuiz]      = useState(() => makeQuiz());
    const [picked,    setPicked]    = useState(null);
    const [score,     setScore]     = useState(0);
    const [total,     setTotal]     = useState(0);

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

    const pick = (opt) => {
        if (picked) return;
        setPicked(opt.n);
        const correct = opt.n === quiz.q.n;
        setTotal(t => t + 1);
        if (correct) setScore(s => s + 1);
    };

    const nextQuiz = () => { setPicked(null); setQuiz(makeQuiz()); };

    return (
        <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', fontFamily: "'Outfit', system-ui, sans-serif" }}>
            <style>{`
                @keyframes num-in { from { opacity:0; transform:scale(0.9); } to { opacity:1; transform:scale(1); } }
            `}</style>

            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg, #0891b2, #67e8f9)', padding: '1.25rem 1.5rem 1.25rem', color: '#fff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '38px', height: '38px', cursor: 'pointer', fontSize: '1.2rem', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
                    <div>
                        <div style={{ fontSize: '0.72rem', fontWeight: '700', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.7px' }}>
                            {isFr ? 'Les nombres en Medumba' : 'Numbers in Medumba'}
                        </div>
                        <div style={{ fontSize: '1.2rem', fontWeight: '900' }}>🔢 {isFr ? 'Compter' : 'Counting'}</div>
                    </div>
                </div>
                {/* Tabs */}
                <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '12px', padding: '0.3rem' }}>
                    {[{ id: 'list', en: 'Numbers', fr: 'Liste' }, { id: 'quiz', en: 'Quiz', fr: 'Quiz' }].map(t => (
                        <button key={t.id} onClick={() => { setTab(t.id); setPicked(null); setQuiz(makeQuiz()); }} style={{
                            flex: 1, padding: '0.5rem', borderRadius: '9px', border: 'none', cursor: 'pointer',
                            backgroundColor: tab === t.id ? '#fff' : 'transparent',
                            color: tab === t.id ? '#0891b2' : 'rgba(255,255,255,0.85)',
                            fontWeight: '800', fontSize: '0.9rem', fontFamily: 'inherit', transition: 'all 0.15s',
                        }}>{isFr ? t.fr : t.en}</button>
                    ))}
                </div>
            </div>

            <div style={{ flex: 1, padding: '1.25rem 1rem', animation: 'num-in 0.3s ease-out both' }}>
                {tab === 'list' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        {NUMBERS.map((num, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', backgroundColor: '#fff', borderRadius: '16px', border: '2px solid #e2e8f0', padding: '0.85rem 1rem', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'linear-gradient(135deg, #0891b2, #67e8f9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '1rem', color: '#fff', flexShrink: 0 }}>
                                    {num.n}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0891b2' }}>{num.medumba}</div>
                                    <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '600' }}>{isFr ? num.frEn[0] : num.frEn[1]}</div>
                                </div>
                                <button onClick={() => speak(num.medumba)} style={{ background: speaking === num.medumba ? '#eff6ff' : '#f8fafc', border: `2px solid ${speaking === num.medumba ? '#0891b2' : '#e2e8f0'}`, borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    {speaking === num.medumba ? '🔊' : '🔈'}
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {tab === 'quiz' && (
                    <div>
                        {/* Score */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                            <div style={{ backgroundColor: '#eff6ff', borderRadius: '99px', padding: '0.3rem 0.9rem', fontSize: '0.82rem', fontWeight: '800', color: '#0891b2' }}>
                                ⭐ {score} / {total}
                            </div>
                        </div>

                        {/* Question card */}
                        <div style={{ backgroundColor: '#fff', borderRadius: '24px', border: '2px solid #bae6fd', padding: '2rem 1.5rem', textAlign: 'center', marginBottom: '1.25rem', boxShadow: '0 4px 16px rgba(8,145,178,0.1)' }}>
                            <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.7px', marginBottom: '0.5rem' }}>
                                {isFr ? 'Que signifie ce mot Medumba ?' : 'What does this Medumba word mean?'}
                            </div>
                            <div style={{ fontSize: '2.8rem', fontWeight: '900', color: '#0891b2', marginBottom: '0.5rem' }}>
                                {quiz.q.medumba}
                            </div>
                            <button onClick={() => speak(quiz.q.medumba)} style={{ background: '#f0f9ff', border: '2px solid #bae6fd', borderRadius: '99px', padding: '0.4rem 1rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '700', color: '#0891b2', fontFamily: 'inherit' }}>
                                🔈 {isFr ? 'Écouter' : 'Listen'}
                            </button>
                        </div>

                        {/* Options */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.7rem', marginBottom: '1rem' }}>
                            {quiz.opts.map(opt => {
                                const isCorrect = picked !== null && opt.n === quiz.q.n;
                                const isWrong   = picked === opt.n && opt.n !== quiz.q.n;
                                return (
                                    <button key={opt.n} onClick={() => pick(opt)} style={{
                                        padding: '1rem', borderRadius: '16px', border: `2px solid ${isCorrect ? '#22c55e' : isWrong ? '#ef4444' : picked ? '#e2e8f0' : '#bae6fd'}`,
                                        backgroundColor: isCorrect ? '#dcfce7' : isWrong ? '#fee2e2' : picked ? '#f8fafc' : '#fff',
                                        color: isCorrect ? '#16a34a' : isWrong ? '#dc2626' : '#0f172a',
                                        fontWeight: '800', fontSize: '1rem', cursor: picked ? 'default' : 'pointer',
                                        fontFamily: 'inherit', transition: 'all 0.15s',
                                    }}>
                                        <div style={{ fontSize: '1.4rem', marginBottom: '0.25rem' }}>{opt.n}</div>
                                        <div style={{ fontSize: '0.78rem', fontWeight: '700', color: 'inherit', opacity: 0.8 }}>
                                            {isFr ? opt.frEn[0] : opt.frEn[1]}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {picked !== null && (
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ marginBottom: '0.75rem', fontWeight: '800', fontSize: '1rem', color: picked === quiz.q.n ? '#16a34a' : '#dc2626' }}>
                                    {picked === quiz.q.n
                                        ? (isFr ? '✅ Correct !' : '✅ Correct!')
                                        : (isFr ? `❌ C'était : ${quiz.q.n} (${quiz.q.medumba})` : `❌ It was: ${quiz.q.n} (${quiz.q.medumba})`)}
                                </div>
                                <button onClick={nextQuiz} style={{ backgroundColor: '#0891b2', color: '#fff', border: 'none', borderRadius: '9999px', padding: '0.9rem 2.5rem', fontWeight: '800', fontSize: '1rem', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 6px 16px rgba(8,145,178,0.35)' }}>
                                    {isFr ? 'Suivant →' : 'Next →'}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CountingPage;
