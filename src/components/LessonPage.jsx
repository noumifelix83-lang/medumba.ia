import { useState, useEffect, useRef } from 'react';
import { MEDUMBA_QUESTIONS } from '../data/medumbaDictionary';
import { generateLessonQuestions } from '../utils/lessonGenerator';
import frameImg from '../assets/Frame.png';
import celebrationImg from '../assets/Auto Layout Vertical.png';

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

/* format seconds as M:SS */
function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
}

/* ════════════════════════════════════════════════════════════════════
   COMPONENT
════════════════════════════════════════════════════════════════════ */
const LessonPage = ({ lesson, learnLang, isFr, profile, onFinish, onShare, onClose }) => {
    const questions = generateLessonQuestions(lesson?.id, profile ?? {}, QUESTIONS, learnLang);

    const startTimeRef = useRef(Date.now());

    const [currentQ,       setCurrentQ]       = useState(0);
    /* tile state */
    const [placed,         setPlaced]         = useState([]);
    /* meaning / audio state */
    const [selectedOption, setSelectedOption] = useState(null);
    /* match state */
    const [leftSel,        setLeftSel]        = useState(null);
    const [matched,        setMatched]        = useState(new Set());
    const [wrongPair,      setWrongPair]      = useState(null);  // { left, right }
    /* shared state */
    const [status,         setStatus]         = useState(null);  // null | 'correct' | 'wrong'
    const [diamondsEarned, setDiamondsEarned] = useState(0);
    const [xpEarned,       setXpEarned]       = useState(0);
    const [correctCount,   setCorrectCount]   = useState(0);
    const [completed,      setCompleted]      = useState(false);
    const [speaking,       setSpeaking]       = useState(false);
    const [showExitModal,  setShowExitModal]  = useState(false);

    const q    = questions[currentQ];
    const type = q?.type ?? 'tile';

    /* ── shuffle columns once per match question ── */
    const [shuffledLeft,  setShuffledLeft]  = useState([]);
    const [shuffledRight, setShuffledRight] = useState([]);

    useEffect(() => {
        if (type === 'match' && q?.pairs) {
            const left  = [...q.pairs].sort(() => Math.random() - 0.5);
            const right = [...q.pairs].sort(() => Math.random() - 0.5);
            setShuffledLeft(left);
            setShuffledRight(right);
            setMatched(new Set());
            setLeftSel(null);
            setWrongPair(null);
        }
        // Reset per-question state
        setPlaced([]);
        setSelectedOption(null);
        setStatus(null);
    }, [currentQ]);

    /* ── Audio auto-play for audio questions ── */
    useEffect(() => {
        if (type === 'audio' && q?.audio) {
            setTimeout(() => playAudio(q.audio, 'fr-FR'), 400);
        }
    }, [currentQ, type]);

    /* ── Web Speech ── */
    const audioLang = learnLang === 'english' ? 'en-US' : 'fr-FR';

    const playAudio = (text, lang) => {
        if (!text || !window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const utt = new SpeechSynthesisUtterance(text);
        utt.lang = lang ?? audioLang;
        utt.rate = 0.82;
        utt.onstart = () => setSpeaking(true);
        utt.onend   = () => setSpeaking(false);
        utt.onerror = () => setSpeaking(false);
        window.speechSynthesis.speak(utt);
    };

    /* ── Tile word selection ── */
    const bank    = q?.bank ?? [];
    const answer  = q?.answer ?? [];
    const usedSet = new Set(placed);

    const pickWord   = (idx) => { if (status !== null || usedSet.has(idx)) return; setPlaced(p => [...p, idx]); };
    const removeWord = (pos) => { if (status !== null) return; setPlaced(p => p.filter((_, i) => i !== pos)); };

    /* ── Check (tile / meaning / audio) ── */
    const checkAnswer = () => {
        let correct = false;
        if (type === 'tile') {
            const ua = placed.map(i => bank[i]);
            correct  = ua.length === answer.length && ua.every((w, i) => w === answer[i]);
        } else {
            const ans = isFr ? q.answerFr : q.answer;
            correct   = selectedOption === ans;
        }
        setStatus(correct ? 'correct' : 'wrong');
        if (correct) {
            setDiamondsEarned(d => d + DIAMONDS_PER_Q);
            setXpEarned(x => x + XP_PER_Q);
            setCorrectCount(c => c + 1);
        }
    };

    /* ── Match pair tap ── */
    const tapLeft  = (pair) => { if (status !== null) return; setLeftSel(pair.medumba); setWrongPair(null); };
    const tapRight = (pair) => {
        if (status !== null || !leftSel) return;
        const isMatch = q.pairs.some(p => p.medumba === leftSel && p === pair);
        if (isMatch) {
            const next = new Set(matched);
            next.add(leftSel);
            setMatched(next);
            setLeftSel(null);
            setWrongPair(null);
            if (next.size === q.pairs.length) {
                // All matched — award and advance
                setDiamondsEarned(d => d + DIAMONDS_PER_Q * q.pairs.length);
                setXpEarned(x => x + XP_PER_Q * q.pairs.length);
                setCorrectCount(c => c + 1);
                setTimeout(handleContinue, 600);
            }
        } else {
            setWrongPair({ left: leftSel, right: pair.medumba });
            setLeftSel(null);
            setTimeout(() => setWrongPair(null), 700);
        }
    };

    /* ── Continue ── */
    const handleContinue = () => {
        if (currentQ >= questions.length - 1) {
            setCompleted(true);
        } else {
            setCurrentQ(q => q + 1);
        }
    };

    const canCheck = type === 'tile'
        ? placed.length > 0 && status === null
        : selectedOption !== null && status === null;

    const progress = questions.length > 0
        ? Math.round((currentQ / questions.length) * 100)
        : 0;

    /* ════════════════════════════════════════════════════
       COMPLETION SCREEN — Auto Layout Vertical design
    ════════════════════════════════════════════════════ */
    if (completed) {
        const elapsed  = Math.floor((Date.now() - startTimeRef.current) / 1000);
        const accuracy = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

        return (
            <div style={{
                width: '100%', height: '100vh',
                backgroundColor: '#f8fafc',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: '2rem 1.5rem', textAlign: 'center',
                fontFamily: "'Outfit', system-ui, sans-serif",
                gap: '1.25rem',
            }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#0056D2', margin: 0 }}>
                    {isFr ? 'Leçon terminée !' : 'Lesson completed!'}
                </h1>

                <img src={celebrationImg} alt="Celebration" style={{ width: '240px', maxWidth: '80%', height: 'auto' }} />

                {/* Diamonds card */}
                <div style={{
                    width: '100%', maxWidth: '320px',
                    backgroundColor: '#0056D2', borderRadius: '16px',
                    padding: '1rem', color: '#fff',
                }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: '700', opacity: 0.8, marginBottom: '0.4rem' }}>
                        {isFr ? 'Diamants' : 'Diamonds'}
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: '900' }}>💎 {diamondsEarned}</div>
                </div>

                {/* Stats row */}
                <div style={{ display: 'flex', gap: '0.75rem', width: '100%', maxWidth: '320px' }}>
                    {[
                        { label: isFr ? 'Total XP' : 'Total XP', value: xpEarned,           bg: '#f59e0b', icon: '⚡' },
                        { label: isFr ? 'Temps'    : 'Time',     value: formatTime(elapsed), bg: '#22c55e', icon: '⏱' },
                        { label: isFr ? 'Précision': 'Accuracy', value: `${accuracy}%`,     bg: '#ef4444', icon: '🎯' },
                    ].map(s => (
                        <div key={s.label} style={{
                            flex: 1, backgroundColor: s.bg, borderRadius: '14px',
                            padding: '0.75rem 0.5rem', color: '#fff', textAlign: 'center',
                        }}>
                            <div style={{ fontSize: '1.2rem' }}>{s.icon}</div>
                            <div style={{ fontSize: '1rem', fontWeight: '900' }}>{s.value}</div>
                            <div style={{ fontSize: '0.65rem', fontWeight: '700', opacity: 0.85 }}>{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: '0.75rem', width: '100%', maxWidth: '320px' }}>
                    <button
                        onClick={() => onShare?.()}
                        style={{
                            flex: 1, padding: '1rem', borderRadius: '9999px',
                            backgroundColor: '#eff6ff', color: '#0056D2',
                            border: '2px solid #bfdbfe', fontWeight: '700',
                            fontSize: '0.95rem', cursor: 'pointer', fontFamily: 'inherit',
                        }}
                    >
                        {isFr ? 'Partager' : 'Share'}
                    </button>
                    <button
                        onClick={() => onFinish({ xp: xpEarned, diamonds: diamondsEarned, time: elapsed, accuracy })}
                        style={{
                            flex: 2, padding: '1rem', borderRadius: '9999px',
                            backgroundColor: '#0056D2', color: '#fff',
                            border: 'none', fontWeight: '700',
                            fontSize: '0.95rem', cursor: 'pointer', fontFamily: 'inherit',
                            boxShadow: '0 6px 16px rgba(0,86,210,0.35)',
                        }}
                    >
                        {isFr ? 'Continuer →' : 'Continue →'}
                    </button>
                </div>
            </div>
        );
    }

    /* ════════════════════════════════════════════════════
       MAIN EXERCISE SCREEN
    ════════════════════════════════════════════════════ */
    const feedbackCorrect = status === 'correct';

    /* ── Meaning / Audio options ── */
    const options    = isFr ? (q?.optionsFr ?? []) : (q?.options ?? []);
    const correctAns = isFr ? q?.answerFr : q?.answer;

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
                @keyframes wrong-flash {
                    0%, 100% { background-color: #fef2f2; }
                    50%      { background-color: #fecaca; }
                }
                @keyframes audio-pulse {
                    0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0,86,210,0.4); }
                    50%      { transform: scale(1.06); box-shadow: 0 0 0 16px rgba(0,86,210,0); }
                }
                @keyframes modal-in {
                    from { transform: scale(0.85) translateY(20px); opacity: 0; }
                    to   { transform: scale(1) translateY(0);        opacity: 1; }
                }
            `}</style>

            {/* ── Exit confirmation modal ── */}
            {showExitModal && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 999,
                    backgroundColor: 'rgba(15,23,42,0.55)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '1.5rem',
                }}>
                    <div style={{
                        backgroundColor: '#fff', borderRadius: '28px',
                        padding: '2.25rem 1.75rem', width: '100%', maxWidth: '340px',
                        textAlign: 'center', boxShadow: '0 24px 64px rgba(0,0,0,0.22)',
                        animation: 'modal-in 0.25s cubic-bezier(0.175,0.885,0.32,1.275) both',
                        fontFamily: "'Outfit', system-ui, sans-serif",
                    }}>
                        <div style={{ fontSize: '3.5rem', marginBottom: '0.75rem', lineHeight: 1 }}>😟</div>
                        <h2 style={{ fontSize: '1.35rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.5rem' }}>
                            {isFr ? 'Quitter la leçon ?' : 'Leave the lesson?'}
                        </h2>
                        <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.75rem', lineHeight: 1.6 }}>
                            {isFr
                                ? 'Votre progression dans cet exercice sera perdue.'
                                : 'Your progress in this exercise will be lost.'}
                        </p>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button
                                onClick={onClose}
                                style={{
                                    flex: 1, padding: '0.9rem', borderRadius: '9999px',
                                    backgroundColor: '#fee2e2', color: '#dc2626',
                                    border: '2px solid #fecaca', fontWeight: '700',
                                    fontSize: '0.9rem', cursor: 'pointer', fontFamily: 'inherit',
                                }}
                            >
                                {isFr ? 'Quitter' : 'Leave'}
                            </button>
                            <button
                                onClick={() => setShowExitModal(false)}
                                style={{
                                    flex: 2, padding: '0.9rem', borderRadius: '9999px',
                                    backgroundColor: '#0056D2', color: '#fff',
                                    border: 'none', fontWeight: '700',
                                    fontSize: '0.9rem', cursor: 'pointer', fontFamily: 'inherit',
                                    boxShadow: '0 6px 16px rgba(0,86,210,0.35)',
                                }}
                            >
                                {isFr ? 'Continuer ✊' : 'Keep going ✊'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Top bar ── */}
            <div style={{
                backgroundColor: '#fff', borderBottom: '2px solid #e5e7eb',
                padding: '0.85rem 1.5rem',
                display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0,
            }}>
                <button onClick={() => setShowExitModal(true)} style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    border: '2px solid #e2e8f0', backgroundColor: 'transparent',
                    cursor: 'pointer', fontSize: '1rem', fontWeight: '700',
                    color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, fontFamily: 'inherit',
                }}>✕</button>

                <div style={{ flex: 1, height: '14px', backgroundColor: '#e2e8f0', borderRadius: '99px', overflow: 'hidden' }}>
                    <div style={{
                        height: '100%', width: `${progress}%`,
                        background: 'linear-gradient(90deg, #0056D2, #38bdf8)',
                        borderRadius: '99px', transition: 'width 0.5s ease',
                    }} />
                </div>

                <span style={{ fontSize: '0.78rem', fontWeight: '700', color: '#0056D2', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    {currentQ + 1} / {questions.length}
                </span>

                <div style={{
                    display: 'flex', alignItems: 'center', gap: '4px',
                    backgroundColor: '#f0fdf4', border: '2px solid #bbf7d0',
                    borderRadius: '99px', padding: '0.3rem 0.75rem', flexShrink: 0,
                }}>
                    <span style={{ fontSize: '0.9rem' }}>💎</span>
                    <span style={{ fontWeight: '800', fontSize: '0.82rem', color: '#16a34a' }}>+{diamondsEarned}</span>
                </div>
            </div>

            {/* ── Content ── */}
            <div style={{
                flex: 1, overflowY: 'auto',
                padding: '1.75rem 1.5rem 0',
                display: 'flex', flexDirection: 'column',
                maxWidth: '640px', width: '100%', margin: '0 auto',
                position: 'relative',
            }}>
                {/* Frame decoration */}
                <img src={frameImg} alt="" aria-hidden="true" style={{
                    position: 'absolute', top: '0.5rem', right: '1rem',
                    width: '72px', height: 'auto', opacity: 0.9,
                    pointerEvents: 'none',
                }} />

                {/* ── Instruction ── */}
                <p style={{
                    fontSize: '0.78rem', fontWeight: '700', color: '#64748b',
                    textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '0.35rem',
                }}>
                    {type === 'tile'    && (isFr ? 'Traduisez cette phrase' : 'Translate this sentence')}
                    {type === 'meaning' && (isFr ? 'Que signifie ce mot ?' : 'What does this word mean?')}
                    {type === 'audio'   && (isFr ? "Qu'est-ce que dit l'audio ?" : 'What does the audio say?')}
                    {type === 'match'   && (isFr ? 'Associez les mots' : 'Match the words')}
                </p>

                {/* ════ TILE exercise ════ */}
                {type === 'tile' && (<>
                    {/* Source sentence card */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '1rem',
                        backgroundColor: '#fff', border: '2px solid #e2e8f0',
                        borderRadius: '18px', padding: '1.1rem 1.3rem',
                        marginBottom: '1.5rem',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    }}>
                        <button onClick={() => playAudio(q?.audio)} style={{
                            width: '48px', height: '48px', borderRadius: '50%',
                            backgroundColor: speaking ? '#eff6ff' : '#f8fafc',
                            border: `2px solid ${speaking ? '#0056D2' : '#e2e8f0'}`,
                            cursor: 'pointer', fontSize: '1.4rem',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0, transition: 'all 0.15s',
                            animation: speaking ? 'speaker-wave 0.6s ease-in-out infinite' : 'none',
                        }}>
                            {speaking ? '🔊' : '🔈'}
                        </button>
                        <span style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', lineHeight: 1.4 }}>
                            {learnLang === 'english' ? (q?.sourceFr ?? '') : (isFr ? (q?.sourceFr ?? '') : (q?.sourceEn ?? ''))}
                        </span>
                    </div>

                    {/* Answer area */}
                    <div style={{
                        minHeight: '72px',
                        border: `2px dashed ${placed.length > 0 ? '#0056D2' : '#cbd5e1'}`,
                        borderRadius: '16px',
                        backgroundColor: placed.length > 0 ? '#eff6ff' : '#f8fafc',
                        padding: '0.75rem 1rem',
                        display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem',
                        marginBottom: '1.5rem', transition: 'all 0.2s',
                    }}>
                        {placed.length === 0 ? (
                            <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: '600' }}>
                                {isFr ? 'Sélectionnez les mots ci-dessous…' : 'Tap words below to build your answer…'}
                            </span>
                        ) : placed.map((bankIdx, pos) => (
                            <button key={pos} onClick={() => removeWord(pos)} disabled={status !== null} style={{
                                padding: '0.45rem 1rem', borderRadius: '10px',
                                backgroundColor: '#0056D2', color: '#fff',
                                border: '2px solid #0041a3', fontWeight: '700', fontSize: '0.95rem',
                                cursor: status !== null ? 'default' : 'pointer', fontFamily: 'inherit',
                                animation: 'tile-pop 0.2s ease-out both',
                                boxShadow: '0 3px 0 #0041a3', transition: 'transform 0.1s',
                            }}
                                onMouseDown={e => { if (status === null) e.currentTarget.style.transform = 'translateY(3px)'; }}
                                onMouseUp={e => e.currentTarget.style.transform = 'translateY(0)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                            >{bank[bankIdx]}</button>
                        ))}
                    </div>

                    {/* Word bank */}
                    <div style={{ fontSize: '0.7rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '0.65rem' }}>
                        {isFr ? 'Mots disponibles' : 'Available words'}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem', marginBottom: '1.5rem' }}>
                        {bank.map((word, idx) => {
                            const used = usedSet.has(idx);
                            return (
                                <button key={idx} onClick={() => pickWord(idx)} disabled={used || status !== null} style={{
                                    padding: '0.48rem 1rem', borderRadius: '10px',
                                    backgroundColor: used ? '#f1f5f9' : '#fff',
                                    color: used ? '#cbd5e1' : '#0f172a',
                                    border: `2px solid ${used ? '#e2e8f0' : '#cbd5e1'}`,
                                    fontWeight: '700', fontSize: '0.95rem',
                                    cursor: used || status !== null ? 'default' : 'pointer', fontFamily: 'inherit',
                                    boxShadow: used ? 'none' : '0 3px 0 #cbd5e1',
                                    transition: 'all 0.12s', opacity: used ? 0.4 : 1,
                                }}
                                    onMouseDown={e => { if (!used && status === null) e.currentTarget.style.transform = 'translateY(3px)'; }}
                                    onMouseUp={e => e.currentTarget.style.transform = 'translateY(0)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                                >{word}</button>
                            );
                        })}
                    </div>
                </>)}

                {/* ════ MEANING exercise ════ */}
                {type === 'meaning' && (<>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '1rem',
                        backgroundColor: '#fff', border: '2px solid #e2e8f0',
                        borderRadius: '18px', padding: '1.1rem 1.3rem',
                        marginBottom: '1.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    }}>
                        <button onClick={() => playAudio(q?.audio, 'fr-FR')} style={{
                            width: '48px', height: '48px', borderRadius: '50%',
                            backgroundColor: speaking ? '#eff6ff' : '#f8fafc',
                            border: `2px solid ${speaking ? '#0056D2' : '#e2e8f0'}`,
                            cursor: 'pointer', fontSize: '1.4rem',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0, transition: 'all 0.15s',
                            animation: speaking ? 'speaker-wave 0.6s ease-in-out infinite' : 'none',
                        }}>{speaking ? '🔊' : '🔈'}</button>
                        <span style={{ fontSize: '1.6rem', fontWeight: '900', color: '#0056D2', lineHeight: 1.2 }}>
                            {q?.sourceFr}
                        </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        {options.map(opt => {
                            const isSelected = selectedOption === opt;
                            const isCorrect  = status !== null && opt === correctAns;
                            const isWrong    = status === 'wrong' && isSelected;
                            return (
                                <button key={opt} onClick={() => { if (status === null) setSelectedOption(opt); }} disabled={status !== null} style={{
                                    padding: '1rem 0.75rem', borderRadius: '14px', fontFamily: 'inherit',
                                    fontSize: '1rem', fontWeight: '700', cursor: status !== null ? 'default' : 'pointer',
                                    backgroundColor: isCorrect ? '#dcfce7' : isWrong ? '#fee2e2' : isSelected ? '#eff6ff' : '#fff',
                                    border: `2px solid ${isCorrect ? '#22c55e' : isWrong ? '#ef4444' : isSelected ? '#0056D2' : '#e2e8f0'}`,
                                    color: isCorrect ? '#16a34a' : isWrong ? '#dc2626' : isSelected ? '#0056D2' : '#0f172a',
                                    transition: 'all 0.15s', boxShadow: isSelected && status === null ? '0 4px 12px rgba(0,86,210,0.2)' : 'none',
                                }}>{opt}</button>
                            );
                        })}
                    </div>
                </>)}

                {/* ════ AUDIO exercise ════ */}
                {type === 'audio' && (<>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.75rem', gap: '0.75rem' }}>
                        <button onClick={() => playAudio(q?.audio, 'fr-FR')} style={{
                            width: '96px', height: '96px', borderRadius: '50%',
                            backgroundColor: '#eff6ff', border: '4px solid #0056D2',
                            cursor: 'pointer', fontSize: '2.5rem',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            animation: speaking ? 'speaker-wave 0.6s ease-in-out infinite' : 'audio-pulse 2s ease-in-out infinite',
                        }}>{speaking ? '🔊' : '🔈'}</button>
                        <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#64748b' }}>
                            {isFr ? 'Appuyer pour rejouer' : 'Tap to replay'}
                        </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        {options.map(opt => {
                            const isSelected = selectedOption === opt;
                            const isCorrect  = status !== null && opt === correctAns;
                            const isWrong    = status === 'wrong' && isSelected;
                            return (
                                <button key={opt} onClick={() => { if (status === null) setSelectedOption(opt); }} disabled={status !== null} style={{
                                    padding: '1rem 0.75rem', borderRadius: '14px', fontFamily: 'inherit',
                                    fontSize: '1rem', fontWeight: '700', cursor: status !== null ? 'default' : 'pointer',
                                    backgroundColor: isCorrect ? '#dcfce7' : isWrong ? '#fee2e2' : isSelected ? '#eff6ff' : '#fff',
                                    border: `2px solid ${isCorrect ? '#22c55e' : isWrong ? '#ef4444' : isSelected ? '#0056D2' : '#e2e8f0'}`,
                                    color: isCorrect ? '#16a34a' : isWrong ? '#dc2626' : isSelected ? '#0056D2' : '#0f172a',
                                    transition: 'all 0.15s',
                                }}>{opt}</button>
                            );
                        })}
                    </div>
                </>)}

                {/* ════ MATCH exercise ════ */}
                {type === 'match' && (
                    <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        {/* Left column — Medumba */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            <div style={{ fontSize: '0.7rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.7px', marginBottom: '0.25rem' }}>
                                Medumba
                            </div>
                            {shuffledLeft.map(pair => {
                                const isMatched = matched.has(pair.medumba);
                                const isSelected = leftSel === pair.medumba;
                                const isWrong  = wrongPair?.left === pair.medumba;
                                return (
                                    <button key={pair.medumba} onClick={() => !isMatched && tapLeft(pair)} disabled={isMatched} style={{
                                        padding: '0.75rem', borderRadius: '12px', fontFamily: 'inherit',
                                        fontSize: '0.95rem', fontWeight: '700', cursor: isMatched ? 'default' : 'pointer',
                                        backgroundColor: isMatched ? '#dcfce7' : isWrong ? '#fee2e2' : isSelected ? '#eff6ff' : '#fff',
                                        border: `2px solid ${isMatched ? '#22c55e' : isWrong ? '#ef4444' : isSelected ? '#0056D2' : '#e2e8f0'}`,
                                        color: isMatched ? '#16a34a' : isWrong ? '#dc2626' : isSelected ? '#0056D2' : '#0f172a',
                                        transition: 'all 0.15s',
                                        animation: isWrong ? 'wrong-flash 0.35s ease-in-out 2' : 'none',
                                    }}>{pair.medumba}</button>
                                );
                            })}
                        </div>

                        {/* Right column — Translation */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            <div style={{ fontSize: '0.7rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.7px', marginBottom: '0.25rem' }}>
                                {isFr ? 'Français' : 'English'}
                            </div>
                            {shuffledRight.map(pair => {
                                const label     = isFr ? pair.french : pair.english;
                                const isMatched = matched.has(pair.medumba);
                                const isWrong   = wrongPair?.right === pair.medumba;
                                return (
                                    <button key={pair.medumba} onClick={() => !isMatched && tapRight(pair)} disabled={isMatched || !leftSel} style={{
                                        padding: '0.75rem', borderRadius: '12px', fontFamily: 'inherit',
                                        fontSize: '0.95rem', fontWeight: '700',
                                        cursor: isMatched || !leftSel ? 'default' : 'pointer',
                                        backgroundColor: isMatched ? '#dcfce7' : isWrong ? '#fee2e2' : leftSel ? '#fffbeb' : '#fff',
                                        border: `2px solid ${isMatched ? '#22c55e' : isWrong ? '#ef4444' : leftSel ? '#f59e0b' : '#e2e8f0'}`,
                                        color: isMatched ? '#16a34a' : isWrong ? '#dc2626' : '#0f172a',
                                        transition: 'all 0.15s',
                                        animation: isWrong ? 'wrong-flash 0.35s ease-in-out 2' : 'none',
                                    }}>{label}</button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* ── Bottom action / feedback ── */}
            {type === 'match' ? null : status === null ? (
                <div style={{
                    padding: '1rem 1.5rem', borderTop: '2px solid #e5e7eb',
                    backgroundColor: '#fff', maxWidth: '640px', width: '100%', margin: '0 auto',
                }}>
                    <button onClick={checkAnswer} disabled={!canCheck} style={{
                        width: '100%',
                        backgroundColor: canCheck ? '#0056D2' : '#cbd5e1',
                        color: '#fff', padding: '1rem', borderRadius: '9999px',
                        fontSize: '1rem', fontWeight: '700', border: 'none',
                        cursor: canCheck ? 'pointer' : 'not-allowed', fontFamily: 'inherit',
                        boxShadow: canCheck ? '0 8px 20px rgba(0,86,210,0.3)' : 'none',
                        letterSpacing: '0.4px', transition: 'all 0.15s',
                    }}>
                        {isFr ? 'Vérifier →' : 'Check →'}
                    </button>
                </div>
            ) : (
                <div style={{
                    backgroundColor: feedbackCorrect ? '#f0fdf4' : '#fef2f2',
                    borderTop: `3px solid ${feedbackCorrect ? '#22c55e' : '#ef4444'}`,
                    padding: '1.25rem 1.5rem',
                    animation: 'feedback-slide 0.3s ease-out',
                    maxWidth: '640px', width: '100%', margin: '0 auto',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: feedbackCorrect ? '0.75rem' : '0.4rem' }}>
                        <span style={{ fontSize: '1.4rem' }}>{feedbackCorrect ? '✅' : '❌'}</span>
                        <span style={{ fontWeight: '800', fontSize: '1.05rem', color: feedbackCorrect ? '#16a34a' : '#dc2626' }}>
                            {feedbackCorrect ? (isFr ? 'Correct !' : 'Correct!') : (isFr ? 'Pas tout à fait…' : 'Not quite…')}
                        </span>
                        {feedbackCorrect && (
                            <span style={{
                                marginLeft: 'auto', backgroundColor: '#dcfce7', color: '#16a34a',
                                borderRadius: '99px', padding: '0.2rem 0.7rem',
                                fontSize: '0.78rem', fontWeight: '800',
                            }}>+{DIAMONDS_PER_Q} 💎  +{XP_PER_Q} XP</span>
                        )}
                    </div>
                    {!feedbackCorrect && (
                        <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '0.75rem', fontWeight: '600' }}>
                            {isFr ? 'Bonne réponse : ' : 'Correct answer: '}
                            <strong style={{ color: '#0f172a' }}>
                                {type === 'tile' ? answer.join(' ') : correctAns}
                            </strong>
                        </p>
                    )}
                    <button onClick={handleContinue} style={{
                        width: '100%',
                        backgroundColor: feedbackCorrect ? '#22c55e' : '#ef4444',
                        color: '#fff', padding: '0.9rem', borderRadius: '9999px',
                        fontSize: '1rem', fontWeight: '700', border: 'none',
                        cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.4px',
                        boxShadow: `0 6px 16px ${feedbackCorrect ? 'rgba(34,197,94,0.35)' : 'rgba(239,68,68,0.35)'}`,
                    }}>
                        {isFr ? 'Continuer →' : 'Continue →'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default LessonPage;
