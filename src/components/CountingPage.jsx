import { useState, useRef, useCallback } from 'react';
import vocalSrc from '../assets/vocal-count-medumba.ogg';

// Medumba numbers — source: medumba_counter.jar (2016)
const NUMBERS = [
    { n: 0,    medumba: 'bαnbαn',               frEn: ['Zéro',      'Zero']        },
    { n: 1,    medumba: "ncʉ'",                  frEn: ['Un',        'One']         },
    { n: 2,    medumba: 'bα̂',                    frEn: ['Deux',      'Two']         },
    { n: 3,    medumba: 'tad',                   frEn: ['Trois',     'Three']       },
    { n: 4,    medumba: 'kuὰ',                   frEn: ['Quatre',    'Four']        },
    { n: 5,    medumba: 'tὰn',                   frEn: ['Cinq',      'Five']        },
    { n: 6,    medumba: 'ntogə',                 frEn: ['Six',       'Six']         },
    { n: 7,    medumba: 'sὰmbα̂',                frEn: ['Sept',      'Seven']       },
    { n: 8,    medumba: 'fomə',                  frEn: ['Huit',      'Eight']       },
    { n: 9,    medumba: "bwə̀'ə",                frEn: ['Neuf',      'Nine']        },
    { n: 10,   medumba: 'gham',                  frEn: ['Dix',       'Ten']         },
    { n: 11,   medumba: "ncòbncʉ' gham",         frEn: ['Onze',      'Eleven']      },
    { n: 12,   medumba: 'ncòbbα̂ gham',           frEn: ['Douze',     'Twelve']      },
    { n: 13,   medumba: 'ncòbtad gham',          frEn: ['Treize',    'Thirteen']    },
    { n: 14,   medumba: 'ncòbkuὰ gham',          frEn: ['Quatorze',  'Fourteen']    },
    { n: 15,   medumba: 'ncòbtὰn gham',          frEn: ['Quinze',    'Fifteen']     },
    { n: 16,   medumba: 'ncòbntogə gham',        frEn: ['Seize',     'Sixteen']     },
    { n: 17,   medumba: 'ncòbsὰmbα̂ gham',       frEn: ['Dix-sept',  'Seventeen']   },
    { n: 18,   medumba: 'ncòbfomə gham',         frEn: ['Dix-huit',  'Eighteen']    },
    { n: 19,   medumba: "ncòbbwə̀'ə gham",       frEn: ['Dix-neuf',  'Nineteen']    },
    { n: 20,   medumba: "ŋambα'",                frEn: ['Vingt',     'Twenty']      },
    { n: 30,   medumba: 'ŋamntad',               frEn: ['Trente',    'Thirty']      },
    { n: 40,   medumba: 'ŋamkuὰ',               frEn: ['Quarante',  'Forty']       },
    { n: 50,   medumba: 'ŋamntὰn',               frEn: ['Cinquante', 'Fifty']       },
    { n: 60,   medumba: 'ŋamntogə',              frEn: ['Soixante',  'Sixty']       },
    { n: 70,   medumba: 'ŋamsὰmbα̂',             frEn: ['Soixante-dix','Seventy']   },
    { n: 80,   medumba: 'ŋamfomə',               frEn: ['Quatre-vingts','Eighty']   },
    { n: 90,   medumba: "ŋambwə̀'ə",             frEn: ['Quatre-vingt-dix','Ninety']},
    { n: 100,  medumba: 'tû',                    frEn: ['Cent',      'Hundred']     },
    { n: 1000, medumba: "ncaꞌ",                  frEn: ['Mille',     'Thousand']    },
];

// Audio timestamps (seconds) from vocal-count-medumba.ogg
// 0 & 1 are in the continuous intro block — no isolated clip available.
// Paired counting (Medumba then French) begins at seg1 for number 2.
// Medumba = odd-indexed segments; shift: seg(2k-1) = MD(k+1) for k≥1
const AUDIO_MAP = {
    // 0 & 1 — extracted from intro via RMS energy analysis
    0:    [2.50,  3.60],    // bαnbαn
    1:    [5.20,  6.05],    // ncʉ'
    // 2–9  (odd segs 1,3,5,7,9,11,13,15)
    2:    [7.90,  8.70],    // bα̂
    3:    [10.90, 11.40],   // tad
    4:    [13.45, 14.15],   // kuὰ
    5:    [16.60, 17.10],   // tὰn
    6:    [18.75, 19.65],   // ntogə
    7:    [21.30, 22.35],   // sὰmbα̂
    8:    [23.95, 24.70],   // fomə
    9:    [26.40, 27.30],   // bwə̀'ə
    // 10–19  (odd segs 17,19,21,23,25,27,29,31,33,35)
    10:   [28.95, 29.55],   // gham
    11:   [31.40, 33.35],   // ncòbncʉ' gham
    12:   [34.85, 37.00],   // ncòbbα̂ gham
    13:   [38.50, 40.35],   // ncòbtad gham
    14:   [44.05, 44.75],   // ncòbkuὰ gham
    15:   [47.10, 47.90],   // ncòbtὰn gham
    16:   [50.40, 51.00],   // ncòbntogə gham
    17:   [54.70, 56.65],   // ncòbsὰmbα̂ gham
    18:   [57.95, 59.05],   // ncòbfomə gham
    19:   [61.25, 62.70],   // ncòbbwə̀'ə gham
    // 20 — after long explanation block (seg37 = 8.5s), word at seg38
    20:   [73.25, 73.95],   // ŋambα'
    // tens 30–1000
    30:   [74.70, 76.45],   // ŋamntad
    40:   [77.95, 79.80],   // ŋamkuὰ
    50:   [80.10, 83.00],   // ŋamntὰn
    60:   [83.35, 84.15],   // ŋamntogə
    70:   [86.85, 87.65],   // ŋamsὰmbα̂
    80:   [90.20, 93.30],   // ŋamfomə
    90:   [94.65, 95.80],   // ŋambwə̀'ə
    100:  [97.60, 99.20],   // tû
    1000: [100.75, 102.55], // ncaꞌ
};

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
    const [tab,      setTab]      = useState('list');
    const [speaking, setSpeaking] = useState(null);
    const [quiz,     setQuiz]     = useState(() => makeQuiz());
    const [picked,   setPicked]   = useState(null);
    const [score,    setScore]    = useState(0);
    const [total,    setTotal]    = useState(0);

    const audioCtxRef    = useRef(null);
    const audioBufferRef = useRef(null);
    const loadingRef     = useRef(false);
    const sourceRef      = useRef(null);

    const getCtx = () => {
        if (!audioCtxRef.current)
            audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
        return audioCtxRef.current;
    };

    const loadAudio = useCallback(async () => {
        if (audioBufferRef.current || loadingRef.current) return;
        loadingRef.current = true;
        try {
            const ctx = getCtx();
            const res = await fetch(vocalSrc);
            const ab  = await res.arrayBuffer();
            audioBufferRef.current = await ctx.decodeAudioData(ab);
        } catch (e) {
            console.warn('Audio load failed:', e);
        }
        loadingRef.current = false;
    }, []);

    const playNumber = useCallback(async (n) => {
        const seg = AUDIO_MAP[n];
        if (!seg) return; // n=0 not in recording

        await loadAudio();
        if (!audioBufferRef.current) return;

        const ctx = getCtx();
        if (ctx.state === 'suspended') await ctx.resume();

        // Stop any currently playing segment
        if (sourceRef.current) {
            try { sourceRef.current.stop(); } catch (_) {}
        }

        const source = ctx.createBufferSource();
        source.buffer = audioBufferRef.current;
        source.connect(ctx.destination);
        source.start(0, seg[0], seg[1] - seg[0]);
        source.onended = () => setSpeaking(null);
        sourceRef.current = source;
        setSpeaking(n);
    }, [loadAudio]);

    const pick = (opt) => {
        if (picked) return;
        setPicked(opt.n);
        setTotal(t => t + 1);
        if (opt.n === quiz.q.n) setScore(s => s + 1);
    };

    const nextQuiz = () => { setPicked(null); setQuiz(makeQuiz()); };

    const SpeakerBtn = ({ n }) => {
        const hasAudio = AUDIO_MAP[n] != null;
        const active   = speaking === n;
        return (
            <button
                onClick={() => hasAudio ? playNumber(n) : undefined}
                disabled={!hasAudio}
                style={{
                    background: active ? '#eff6ff' : '#f8fafc',
                    border: `2px solid ${active ? '#0891b2' : hasAudio ? '#e2e8f0' : '#f1f5f9'}`,
                    borderRadius: '50%', width: '40px', height: '40px',
                    cursor: hasAudio ? 'pointer' : 'default',
                    fontSize: '1.2rem', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', flexShrink: 0,
                    opacity: hasAudio ? 1 : 0.35,
                }}
            >
                {active ? '🔊' : '🔈'}
            </button>
        );
    };

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
                                <SpeakerBtn n={num.n} />
                            </div>
                        ))}
                    </div>
                )}

                {tab === 'quiz' && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                            <div style={{ backgroundColor: '#eff6ff', borderRadius: '99px', padding: '0.3rem 0.9rem', fontSize: '0.82rem', fontWeight: '800', color: '#0891b2' }}>
                                ⭐ {score} / {total}
                            </div>
                        </div>

                        <div style={{ backgroundColor: '#fff', borderRadius: '24px', border: '2px solid #bae6fd', padding: '2rem 1.5rem', textAlign: 'center', marginBottom: '1.25rem', boxShadow: '0 4px 16px rgba(8,145,178,0.1)' }}>
                            <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.7px', marginBottom: '0.5rem' }}>
                                {isFr ? 'Que signifie ce mot Medumba ?' : 'What does this Medumba word mean?'}
                            </div>
                            <div style={{ fontSize: '2.8rem', fontWeight: '900', color: '#0891b2', marginBottom: '0.5rem' }}>
                                {quiz.q.medumba}
                            </div>
                            <button onClick={() => playNumber(quiz.q.n)} disabled={!AUDIO_MAP[quiz.q.n]} style={{ background: '#f0f9ff', border: '2px solid #bae6fd', borderRadius: '99px', padding: '0.4rem 1rem', cursor: AUDIO_MAP[quiz.q.n] ? 'pointer' : 'default', fontSize: '0.85rem', fontWeight: '700', color: '#0891b2', fontFamily: 'inherit', opacity: AUDIO_MAP[quiz.q.n] ? 1 : 0.4 }}>
                                🔈 {isFr ? 'Écouter' : 'Listen'}
                            </button>
                        </div>

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
