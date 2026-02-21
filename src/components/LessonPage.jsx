import { useState } from 'react';
import { MEDUMBA_QUESTIONS } from '../data/medumbaDictionary';

/* ════════════════════════════════════════════════════════════════════
   QUESTION DATA
   Each question:
     sourceFr  — sentence shown when interface = French
     sourceEn  — sentence shown when interface = English
     answer    — correct word array (in target language)
     bank      — all tiles offered (answer + distractors)
     audio     — text fed to SpeechSynthesis (target lang)
════════════════════════════════════════════════════════════════════ */
const QUESTIONS = {
    /* ── English course ── */
    e1: [   // Hello!
        {
            sourceFr: 'Comment vous appelez-vous',
            sourceEn: 'What is your name',
            answer: ['What', 'is', 'your', 'name'],
            bank:   ['What', 'is', 'your', 'name', 'Who', 'are', 'you', 'my'],
            audio:  'What is your name',
        },
        {
            sourceFr: 'Je m\'appelle Marie',
            sourceEn: 'My name is Marie',
            answer: ['My', 'name', 'is', 'Marie'],
            bank:   ['My', 'name', 'is', 'Marie', 'Her', 'your', 'was', 'John'],
            audio:  'My name is Marie',
        },
        {
            sourceFr: 'Enchanté de vous rencontrer',
            sourceEn: 'Nice to meet you',
            answer: ['Nice', 'to', 'meet', 'you'],
            bank:   ['Nice', 'to', 'meet', 'you', 'Good', 'see', 'him', 'great'],
            audio:  'Nice to meet you',
        },
    ],
    e2: [   // Alphabet
        {
            sourceFr: 'Je marche et elle nage',
            sourceEn: 'I walk and she swims',
            answer: ['I', 'walk', 'and', 'she', 'swims'],
            bank:   ['I', 'walk', 'and', 'she', 'swims', 'runs', 'he', 'we'],
            audio:  'I walk and she swims',
        },
        {
            sourceFr: 'Il mange une pomme',
            sourceEn: 'He eats an apple',
            answer: ['He', 'eats', 'an', 'apple'],
            bank:   ['He', 'eats', 'an', 'apple', 'she', 'drinks', 'the', 'banana'],
            audio:  'He eats an apple',
        },
        {
            sourceFr: 'Nous jouons ensemble',
            sourceEn: 'We play together',
            answer: ['We', 'play', 'together'],
            bank:   ['We', 'play', 'together', 'I', 'run', 'alone', 'they', 'jump'],
            audio:  'We play together',
        },
        {
            sourceFr: 'Elle lit un livre',
            sourceEn: 'She reads a book',
            answer: ['She', 'reads', 'a', 'book'],
            bank:   ['She', 'reads', 'a', 'book', 'he', 'writes', 'the', 'letter'],
            audio:  'She reads a book',
        },
        {
            sourceFr: 'Je t\'aime',
            sourceEn: 'I love you',
            answer: ['I', 'love', 'you'],
            bank:   ['I', 'love', 'you', 'she', 'like', 'him', 'we', 'hate'],
            audio:  'I love you',
        },
    ],
    e3: [   // Numbers
        {
            sourceFr: 'J\'ai vingt ans',
            sourceEn: 'I am twenty years old',
            answer: ['I', 'am', 'twenty', 'years', 'old'],
            bank:   ['I', 'am', 'twenty', 'years', 'old', 'she', 'thirty', 'ten', 'new'],
            audio:  'I am twenty years old',
        },
    ],
    e4: [   // Colors
        {
            sourceFr: 'Le ciel est bleu',
            sourceEn: 'The sky is blue',
            answer: ['The', 'sky', 'is', 'blue'],
            bank:   ['The', 'sky', 'is', 'blue', 'sea', 'green', 'was', 'red'],
            audio:  'The sky is blue',
        },
    ],
    e5: [   // Animals
        {
            sourceFr: 'Le chien court vite',
            sourceEn: 'The dog runs fast',
            answer: ['The', 'dog', 'runs', 'fast'],
            bank:   ['The', 'dog', 'runs', 'fast', 'cat', 'walks', 'slow', 'a'],
            audio:  'The dog runs fast',
        },
    ],
    e6: [   // Shopping
        {
            sourceFr: 'Combien ça coûte',
            sourceEn: 'How much does it cost',
            answer: ['How', 'much', 'does', 'it', 'cost'],
            bank:   ['How', 'much', 'does', 'it', 'cost', 'what', 'is', 'the', 'price'],
            audio:  'How much does it cost',
        },
    ],
    /* ── Medumba course — from Dictionnaire Ncobnkùn.xlsx ── */
    ...MEDUMBA_QUESTIONS,
};

/* fallback pool when no specific lesson data exists */
const FALLBACK_EN = QUESTIONS.e2;
const FALLBACK_MD = QUESTIONS.l1;

const DIAMONDS_PER_Q = 5;
const XP_PER_Q       = 10;

/* ════════════════════════════════════════════════════════════════════
   COMPONENT
════════════════════════════════════════════════════════════════════ */
const LessonPage = ({ lesson, learnLang, isFr, onFinish, onClose }) => {
    const questions = QUESTIONS[lesson?.id]
        ?? (learnLang === 'english' ? FALLBACK_EN : FALLBACK_MD);

    const [currentQ,       setCurrentQ]       = useState(0);
    const [placed,         setPlaced]         = useState([]);   // bank indices in order placed
    const [status,         setStatus]         = useState(null); // null | 'correct' | 'wrong'
    const [diamondsEarned, setDiamondsEarned] = useState(0);
    const [xpEarned,       setXpEarned]       = useState(0);
    const [completed,      setCompleted]      = useState(false);
    const [speaking,       setSpeaking]       = useState(false);

    const q      = questions[currentQ];
    const bank   = q?.bank   ?? [];
    const answer = q?.answer ?? [];

    /* Source sentence: for English course always show French source so the exercise
       makes sense (translate FROM French TO English).
       For Medumba course show in current interface lang. */
    const source = learnLang === 'english'
        ? (q?.sourceFr ?? '')
        : (isFr ? (q?.sourceFr ?? '') : (q?.sourceEn ?? ''));

    const audioLang = learnLang === 'english' ? 'en-US' : 'fr-FR';

    /* ── Audio (Web Speech API) ── */
    const playAudio = () => {
        if (!q?.audio || !window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const utt = new SpeechSynthesisUtterance(q.audio);
        utt.lang = audioLang;
        utt.rate = 0.82;
        utt.onstart = () => setSpeaking(true);
        utt.onend   = () => setSpeaking(false);
        utt.onerror = () => setSpeaking(false);
        window.speechSynthesis.speak(utt);
    };

    /* ── Word selection ── */
    const usedSet = new Set(placed);

    const pickWord = (idx) => {
        if (status !== null) return;
        if (usedSet.has(idx))  return;
        setPlaced((p) => [...p, idx]);
    };

    const removeWord = (pos) => {
        if (status !== null) return;
        setPlaced((p) => p.filter((_, i) => i !== pos));
    };

    /* ── Check ── */
    const checkAnswer = () => {
        const userAnswer = placed.map((i) => bank[i]);
        const correct    = userAnswer.length === answer.length
            && userAnswer.every((w, i) => w === answer[i]);
        setStatus(correct ? 'correct' : 'wrong');
        if (correct) {
            setDiamondsEarned((d) => d + DIAMONDS_PER_Q);
            setXpEarned((x) => x + XP_PER_Q);
        }
    };

    /* ── Continue to next question ── */
    const handleContinue = () => {
        if (currentQ >= questions.length - 1) {
            setCompleted(true);
        } else {
            setCurrentQ((q) => q + 1);
            setPlaced([]);
            setStatus(null);
        }
    };

    const canCheck = placed.length > 0 && status === null;
    const progress = questions.length > 0
        ? Math.round((currentQ / questions.length) * 100)
        : 0;

    /* ════════════════════════════════════════════════════
       COMPLETION SCREEN
    ════════════════════════════════════════════════════ */
    if (completed) {
        return (
            <div style={{
                width: '100%', height: '100vh',
                backgroundColor: '#f8fafc',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: '2rem', textAlign: 'center',
                fontFamily: "'Outfit', system-ui, sans-serif",
            }}>
                <style>{`
                    @keyframes confetti-fall {
                        0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
                        100% { transform: translateY(60px)  rotate(360deg); opacity: 0; }
                    }
                    @keyframes badge-pop {
                        0%   { transform: scale(0.4); opacity: 0; }
                        70%  { transform: scale(1.12); opacity: 1; }
                        100% { transform: scale(1); }
                    }
                `}</style>

                {/* Confetti particles */}
                {['#0056D2','#f59e0b','#10b981','#ef4444','#8b5cf6'].map((c, i) => (
                    [...Array(3)].map((_, j) => (
                        <div key={`${i}-${j}`} style={{
                            position: 'fixed',
                            top: `${10 + j * 12}%`,
                            left: `${10 + i * 18 + j * 5}%`,
                            width: '8px', height: '8px',
                            backgroundColor: c,
                            borderRadius: j % 2 === 0 ? '50%' : '2px',
                            animation: `confetti-fall ${1.2 + j * 0.3}s ease-in ${i * 0.15}s forwards`,
                            zIndex: 0,
                        }} />
                    ))
                ))}

                {/* Badge */}
                <div style={{
                    width: '100px', height: '100px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #0056D2, #38bdf8)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '2.8rem', marginBottom: '1.5rem',
                    boxShadow: '0 12px 32px rgba(0,86,210,0.4)',
                    animation: 'badge-pop 0.6s cubic-bezier(0.175,0.885,0.32,1.275) both',
                    zIndex: 1,
                }}>
                    🎉
                </div>

                <h1 style={{
                    fontSize: '1.9rem', fontWeight: '900', color: '#0f172a',
                    marginBottom: '0.5rem', zIndex: 1,
                }}>
                    {isFr ? 'Leçon terminée !' : 'Lesson complete!'}
                </h1>
                <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '2rem', zIndex: 1 }}>
                    {isFr ? 'Excellent travail ! Continuez comme ça.' : 'Great work! Keep it up.'}
                </p>

                {/* Rewards */}
                <div style={{
                    display: 'flex', gap: '1rem', marginBottom: '2.5rem', zIndex: 1,
                }}>
                    {[
                        { icon: '⚡', val: `+${xpEarned} XP`, bg: '#eff6ff',  border: '#bfdbfe', text: '#0056D2' },
                        { icon: '💎', val: `+${diamondsEarned}`,   bg: '#f0fdf4', border: '#bbf7d0', text: '#16a34a' },
                    ].map((r) => (
                        <div key={r.val} style={{
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            padding: '0.75rem 1.25rem', borderRadius: '14px',
                            backgroundColor: r.bg, border: `2px solid ${r.border}`,
                        }}>
                            <span style={{ fontSize: '1.3rem' }}>{r.icon}</span>
                            <span style={{ fontWeight: '800', fontSize: '1rem', color: r.text }}>{r.val}</span>
                        </div>
                    ))}
                </div>

                <button
                    onClick={onFinish}
                    style={{
                        width: '100%', maxWidth: '320px',
                        backgroundColor: '#0056D2', color: '#fff',
                        padding: '1.1rem', borderRadius: '9999px',
                        fontSize: '1rem', fontWeight: '700', border: 'none',
                        cursor: 'pointer', fontFamily: 'inherit',
                        boxShadow: '0 8px 20px rgba(0,86,210,0.35)',
                        zIndex: 1,
                    }}
                >
                    {isFr ? 'Retour au tableau de bord' : 'Back to dashboard'}
                </button>
            </div>
        );
    }

    /* ════════════════════════════════════════════════════
       MAIN EXERCISE SCREEN
    ════════════════════════════════════════════════════ */
    const feedbackCorrect = status === 'correct';

    return (
        <div style={{
            width: '100%', height: '100vh',
            backgroundColor: '#f8fafc',
            display: 'flex', flexDirection: 'column',
            fontFamily: "'Outfit', system-ui, sans-serif",
            overflow: 'hidden',
        }}>
            <style>{`
                @keyframes tile-pop {
                    0%   { transform: scale(0.8); opacity: 0; }
                    60%  { transform: scale(1.08); }
                    100% { transform: scale(1); opacity: 1; }
                }
                @keyframes feedback-slide {
                    from { transform: translateY(100%); }
                    to   { transform: translateY(0); }
                }
                @keyframes speaker-wave {
                    0%, 100% { transform: scale(1); }
                    50%      { transform: scale(1.25); }
                }
            `}</style>

            {/* ── Top bar ── */}
            <div style={{
                backgroundColor: '#fff',
                borderBottom: '2px solid #e5e7eb',
                padding: '0.85rem 1.5rem',
                display: 'flex', alignItems: 'center', gap: '1rem',
                flexShrink: 0,
            }}>
                {/* Close */}
                <button
                    onClick={onClose}
                    style={{
                        width: '36px', height: '36px', borderRadius: '50%',
                        border: '2px solid #e2e8f0', backgroundColor: 'transparent',
                        cursor: 'pointer', fontSize: '1rem', fontWeight: '700',
                        color: '#64748b', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', flexShrink: 0,
                        fontFamily: 'inherit',
                    }}
                >
                    ✕
                </button>

                {/* Progress bar */}
                <div style={{
                    flex: 1, height: '14px',
                    backgroundColor: '#e2e8f0',
                    borderRadius: '99px', overflow: 'hidden',
                }}>
                    <div style={{
                        height: '100%',
                        width: `${progress}%`,
                        background: 'linear-gradient(90deg, #0056D2, #38bdf8)',
                        borderRadius: '99px',
                        transition: 'width 0.5s ease',
                    }} />
                </div>

                {/* Question counter */}
                <span style={{
                    fontSize: '0.78rem', fontWeight: '700',
                    color: '#0056D2', whiteSpace: 'nowrap', flexShrink: 0,
                }}>
                    {currentQ + 1} / {questions.length}
                </span>

                {/* Diamonds earned so far */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '4px',
                    backgroundColor: '#f0fdf4', border: '2px solid #bbf7d0',
                    borderRadius: '99px', padding: '0.3rem 0.75rem', flexShrink: 0,
                }}>
                    <span style={{ fontSize: '0.9rem' }}>💎</span>
                    <span style={{ fontWeight: '800', fontSize: '0.82rem', color: '#16a34a' }}>
                        +{diamondsEarned}
                    </span>
                </div>
            </div>

            {/* ── Content ── */}
            <div style={{
                flex: 1, overflowY: 'auto',
                padding: '1.75rem 1.5rem 0',
                display: 'flex', flexDirection: 'column',
                maxWidth: '640px', width: '100%', margin: '0 auto',
            }}>
                {/* Instruction */}
                <p style={{
                    fontSize: '0.78rem', fontWeight: '700',
                    color: '#64748b', textTransform: 'uppercase',
                    letterSpacing: '0.8px', marginBottom: '0.35rem',
                }}>
                    {isFr ? 'Traduisez cette phrase' : 'Translate this sentence'}
                </p>

                {/* Source sentence card */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    backgroundColor: '#fff', border: '2px solid #e2e8f0',
                    borderRadius: '18px', padding: '1.1rem 1.3rem',
                    marginBottom: '1.5rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                }}>
                    {/* Audio button */}
                    <button
                        onClick={playAudio}
                        style={{
                            width: '48px', height: '48px', borderRadius: '50%',
                            backgroundColor: speaking ? '#eff6ff' : '#f8fafc',
                            border: `2px solid ${speaking ? '#0056D2' : '#e2e8f0'}`,
                            cursor: 'pointer', fontSize: '1.4rem',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0, transition: 'all 0.15s',
                            animation: speaking ? 'speaker-wave 0.6s ease-in-out infinite' : 'none',
                        }}
                        title={isFr ? 'Écouter' : 'Listen'}
                    >
                        {speaking ? '🔊' : '🔈'}
                    </button>

                    <span style={{
                        fontSize: '1.25rem', fontWeight: '700', color: '#0f172a',
                        lineHeight: 1.4,
                    }}>
                        {source}
                    </span>
                </div>

                {/* ── Answer area ── */}
                <div style={{
                    minHeight: '72px',
                    border: `2px dashed ${placed.length > 0 ? '#0056D2' : '#cbd5e1'}`,
                    borderRadius: '16px',
                    backgroundColor: placed.length > 0 ? '#eff6ff' : '#f8fafc',
                    padding: '0.75rem 1rem',
                    display: 'flex', flexWrap: 'wrap',
                    alignItems: 'center', gap: '0.5rem',
                    marginBottom: '1.5rem',
                    transition: 'all 0.2s',
                }}>
                    {placed.length === 0 ? (
                        <span style={{
                            color: '#94a3b8', fontSize: '0.85rem', fontWeight: '600',
                        }}>
                            {isFr ? 'Sélectionnez les mots ci-dessous…' : 'Tap words below to build your answer…'}
                        </span>
                    ) : (
                        placed.map((bankIdx, pos) => (
                            <button
                                key={pos}
                                onClick={() => removeWord(pos)}
                                disabled={status !== null}
                                style={{
                                    padding: '0.45rem 1rem',
                                    borderRadius: '10px',
                                    backgroundColor: '#0056D2',
                                    color: '#fff',
                                    border: '2px solid #0041a3',
                                    fontWeight: '700', fontSize: '0.95rem',
                                    cursor: status !== null ? 'default' : 'pointer',
                                    fontFamily: 'inherit',
                                    animation: 'tile-pop 0.2s ease-out both',
                                    boxShadow: '0 3px 0 #0041a3',
                                    transition: 'transform 0.1s',
                                }}
                                onMouseDown={(e) => { if (status === null) e.currentTarget.style.transform = 'translateY(3px)'; }}
                                onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                {bank[bankIdx]}
                            </button>
                        ))
                    )}
                </div>

                {/* ── Word bank ── */}
                <div style={{
                    fontSize: '0.7rem', fontWeight: '700', color: '#94a3b8',
                    textTransform: 'uppercase', letterSpacing: '0.8px',
                    marginBottom: '0.65rem',
                }}>
                    {isFr ? 'Mots disponibles' : 'Available words'}
                </div>
                <div style={{
                    display: 'flex', flexWrap: 'wrap', gap: '0.55rem',
                    marginBottom: '1.5rem',
                }}>
                    {bank.map((word, idx) => {
                        const used = usedSet.has(idx);
                        return (
                            <button
                                key={idx}
                                onClick={() => pickWord(idx)}
                                disabled={used || status !== null}
                                style={{
                                    padding: '0.48rem 1rem',
                                    borderRadius: '10px',
                                    backgroundColor: used ? '#f1f5f9' : '#fff',
                                    color: used ? '#cbd5e1' : '#0f172a',
                                    border: `2px solid ${used ? '#e2e8f0' : '#cbd5e1'}`,
                                    fontWeight: '700', fontSize: '0.95rem',
                                    cursor: used || status !== null ? 'default' : 'pointer',
                                    fontFamily: 'inherit',
                                    boxShadow: used ? 'none' : '0 3px 0 #cbd5e1',
                                    transition: 'all 0.12s',
                                    opacity: used ? 0.4 : 1,
                                }}
                                onMouseDown={(e) => {
                                    if (!used && status === null) e.currentTarget.style.transform = 'translateY(3px)';
                                }}
                                onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                {word}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ── Bottom action / feedback ── */}
            {status === null ? (
                /* Check button */
                <div style={{
                    padding: '1rem 1.5rem',
                    borderTop: '2px solid #e5e7eb',
                    backgroundColor: '#fff',
                    maxWidth: '640px', width: '100%', margin: '0 auto',
                }}>
                    <button
                        onClick={checkAnswer}
                        disabled={!canCheck}
                        style={{
                            width: '100%',
                            backgroundColor: canCheck ? '#0056D2' : '#cbd5e1',
                            color: '#fff', padding: '1rem',
                            borderRadius: '9999px',
                            fontSize: '1rem', fontWeight: '700',
                            border: 'none',
                            cursor: canCheck ? 'pointer' : 'not-allowed',
                            fontFamily: 'inherit',
                            boxShadow: canCheck ? '0 8px 20px rgba(0,86,210,0.3)' : 'none',
                            letterSpacing: '0.4px',
                            transition: 'all 0.15s',
                        }}
                    >
                        {isFr ? 'Vérifier →' : 'Check →'}
                    </button>
                </div>
            ) : (
                /* Feedback panel — slides up */
                <div style={{
                    backgroundColor: feedbackCorrect ? '#f0fdf4' : '#fef2f2',
                    borderTop: `3px solid ${feedbackCorrect ? '#22c55e' : '#ef4444'}`,
                    padding: '1.25rem 1.5rem',
                    animation: 'feedback-slide 0.3s ease-out',
                    maxWidth: '640px', width: '100%', margin: '0 auto',
                }}>
                    {/* Result line */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '0.6rem',
                        marginBottom: feedbackCorrect ? '0.75rem' : '0.4rem',
                    }}>
                        <span style={{ fontSize: '1.4rem' }}>
                            {feedbackCorrect ? '✅' : '❌'}
                        </span>
                        <span style={{
                            fontWeight: '800', fontSize: '1.05rem',
                            color: feedbackCorrect ? '#16a34a' : '#dc2626',
                        }}>
                            {feedbackCorrect
                                ? (isFr ? 'Correct !' : 'Correct!')
                                : (isFr ? 'Pas tout à fait…' : 'Not quite…')}
                        </span>
                        {feedbackCorrect && (
                            <span style={{
                                marginLeft: 'auto',
                                backgroundColor: '#dcfce7', color: '#16a34a',
                                borderRadius: '99px', padding: '0.2rem 0.7rem',
                                fontSize: '0.78rem', fontWeight: '800',
                            }}>
                                +{DIAMONDS_PER_Q} 💎  +{XP_PER_Q} XP
                            </span>
                        )}
                    </div>

                    {/* Wrong: show correct answer */}
                    {!feedbackCorrect && (
                        <p style={{
                            fontSize: '0.88rem', color: '#64748b',
                            marginBottom: '0.75rem', fontWeight: '600',
                        }}>
                            {isFr ? 'Bonne réponse : ' : 'Correct answer: '}
                            <strong style={{ color: '#0f172a' }}>{answer.join(' ')}</strong>
                        </p>
                    )}

                    <button
                        onClick={handleContinue}
                        style={{
                            width: '100%',
                            backgroundColor: feedbackCorrect ? '#22c55e' : '#ef4444',
                            color: '#fff', padding: '0.9rem',
                            borderRadius: '9999px',
                            fontSize: '1rem', fontWeight: '700',
                            border: 'none', cursor: 'pointer',
                            fontFamily: 'inherit', letterSpacing: '0.4px',
                            boxShadow: `0 6px 16px ${feedbackCorrect ? 'rgba(34,197,94,0.35)' : 'rgba(239,68,68,0.35)'}`,
                        }}
                    >
                        {isFr ? 'Continuer →' : 'Continue →'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default LessonPage;
