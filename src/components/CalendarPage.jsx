import { useState } from 'react';

// Medumba month names (from the traditional Ncobnkùn calendar by METCHEZIN Franklin)
const MONTHS_MEDUMBA = [
    'Mbwognga', 'Nkagna',   'Njwi dcu', 'Nta Kmbw',
    'Nsonə',    'Jwagnkun', 'Ntong',    'Ncôcu',
    'Njagcu',   'Bynsw',    'Nsondm',   'Ntongodm',
];
const MONTHS_FR  = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
const MONTHS_EN  = ['January','February','March','April','May','June','July','August','September','October','November','December'];

// Medumba day names (from the Ncobnkùn calendar)
const DAYS_MEDUMBA = ['Lefète', 'Njam lefète', 'Mvenn tinkié', 'Lè tinkié', 'Njam tinkié', 'Venn tindib', 'Lè tindib'];
const DAYS_FR  = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const DAYS_EN  = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Month colors for visual variety
const MONTH_COLORS = [
    '#0056D2','#7c3aed','#0891b2','#16a34a',
    '#d97706','#dc2626','#0056D2','#7c3aed',
    '#0891b2','#16a34a','#d97706','#dc2626',
];

function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}
function firstDayOfMonth(year, month) {
    const d = new Date(year, month, 1).getDay();
    return (d + 6) % 7; // Mon=0
}

const CalendarPage = ({ nativeLang, onBack }) => {
    const isFr = nativeLang === 'french';
    const today = new Date();
    const [viewYear,  setViewYear]  = useState(today.getFullYear());
    const [viewMonth, setViewMonth] = useState(today.getMonth());
    const [selected,  setSelected]  = useState(null);
    const [showLegend, setShowLegend] = useState('months'); // 'months' | 'days'

    const firstDay  = firstDayOfMonth(viewYear, viewMonth);
    const totalDays = daysInMonth(viewYear, viewMonth);
    const prevDays  = daysInMonth(viewYear, viewMonth - 1 < 0 ? 11 : viewMonth - 1);

    const isToday = (d) =>
        d === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();

    const prevMonth = () => {
        if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
        else setViewMonth(m => m - 1);
        setSelected(null);
    };
    const nextMonth = () => {
        if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
        else setViewMonth(m => m + 1);
        setSelected(null);
    };

    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push({ day: prevDays - firstDay + 1 + i, cur: false });
    for (let d = 1; d <= totalDays; d++) cells.push({ day: d, cur: true });
    while (cells.length % 7 !== 0) cells.push({ day: cells.length - firstDay - totalDays + 1, cur: false });

    const accentColor = MONTH_COLORS[viewMonth];
    const selectedDayOfWeek = selected ? ((new Date(viewYear, viewMonth, selected).getDay() + 6) % 7) : null;

    return (
        <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#f1f5f9', display: 'flex', flexDirection: 'column', fontFamily: "'Outfit', system-ui, sans-serif" }}>
            <style>{`
                @keyframes cal-in   { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
                @keyframes cal-pop  { 0% { transform:scale(0.8); opacity:0; } 70% { transform:scale(1.05); } 100% { transform:scale(1); opacity:1; } }
                @keyframes cal-orb  { 0%,100% { opacity:0.5; transform:scale(1); } 50% { opacity:0.9; transform:scale(1.1); } }
                @keyframes cal-shimmer { 0% { background-position:-200% center; } 100% { background-position:200% center; } }
                .cal-day:hover { background: rgba(0,86,210,0.08) !important; }
                .cal-month-chip:hover { opacity:0.85; transform:scale(0.97); }
            `}</style>

            {/* ══ HERO HEADER ══ */}
            <div style={{
                position: 'relative',
                background: `linear-gradient(145deg, ${accentColor} 0%, #0284c7 60%, #38bdf8 100%)`,
                paddingBottom: '3rem', overflow: 'hidden',
                transition: 'background 0.4s ease',
            }}>
                {/* Background pattern */}
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 15% 60%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 85% 15%, rgba(255,255,255,0.07) 0%, transparent 40%)', pointerEvents: 'none' }} />
                {/* Floating orbs */}
                <div style={{ position: 'absolute', top: '-15px', right: '-15px', width: '140px', height: '140px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)', animation: 'cal-orb 4s ease-in-out infinite' }} />
                <div style={{ position: 'absolute', bottom: '30px', left: '-25px', width: '90px', height: '90px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', animation: 'cal-orb 5s ease-in-out infinite 1.5s' }} />

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 1, padding: '1.5rem 1.5rem 0' }}>
                    {/* Back + title row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                        <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.2)', border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', fontSize: '1.1rem', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', flexShrink: 0 }}>←</button>
                        <div>
                            <div style={{ fontSize: '0.68rem', fontWeight: '700', color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                                {isFr ? 'Calendrier traditionnel' : 'Traditional Calendar'}
                            </div>
                            <div style={{ fontSize: '1.15rem', fontWeight: '900', color: '#fff' }}>
                                📅 {isFr ? 'Nda le Njɔ Medumba' : 'Nda le Njɔ Medumba'}
                            </div>
                        </div>
                    </div>

                    {/* Big month display */}
                    <div style={{ textAlign: 'center', marginBottom: '1.25rem', animation: 'cal-pop 0.5s cubic-bezier(0.175,0.885,0.32,1.275) both' }}>
                        <div style={{ fontSize: '2rem', fontWeight: '900', color: '#fff', letterSpacing: '-0.02em', textShadow: '0 2px 12px rgba(0,0,0,0.2)' }}>
                            {MONTHS_MEDUMBA[viewMonth]}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', fontWeight: '600', marginTop: '0.2rem' }}>
                            {isFr ? MONTHS_FR[viewMonth] : MONTHS_EN[viewMonth]} · {viewYear}
                        </div>
                    </div>

                    {/* Month navigator */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', borderRadius: '18px', padding: '0.5rem', border: '1.5px solid rgba(255,255,255,0.25)' }}>
                        <button onClick={prevMonth} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', fontSize: '1.3rem', cursor: 'pointer', borderRadius: '12px', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
                        {/* Mini month chips */}
                        <div style={{ display: 'flex', gap: '0.35rem', overflow: 'hidden' }}>
                            {[-1, 0, 1].map(offset => {
                                const mi = ((viewMonth + offset + 12) % 12);
                                return (
                                    <div key={offset} onClick={() => { setViewMonth(mi); setSelected(null); }} style={{
                                        padding: '0.3rem 0.7rem', borderRadius: '99px', cursor: 'pointer',
                                        backgroundColor: offset === 0 ? '#fff' : 'transparent',
                                        color: offset === 0 ? accentColor : 'rgba(255,255,255,0.7)',
                                        fontWeight: '800', fontSize: offset === 0 ? '0.82rem' : '0.72rem',
                                        transition: 'all 0.15s',
                                    }}>
                                        {(isFr ? MONTHS_FR : MONTHS_EN)[mi].slice(0, 3)}
                                    </div>
                                );
                            })}
                        </div>
                        <button onClick={nextMonth} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', fontSize: '1.3rem', cursor: 'pointer', borderRadius: '12px', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
                    </div>
                </div>

                {/* Wave SVG */}
                <svg viewBox="0 0 1440 48" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '48px' }} preserveAspectRatio="none">
                    <path d="M0,24 C360,48 720,0 1080,24 C1260,36 1380,16 1440,24 L1440,48 L0,48 Z" fill="#f1f5f9" />
                </svg>
            </div>

            {/* ══ MAIN CONTENT ══ */}
            <div style={{ flex: 1, padding: '1.25rem 1rem 2rem', maxWidth: '540px', width: '100%', margin: '0 auto', animation: 'cal-in 0.35s ease-out 0.1s both' }}>

                {/* Calendar card */}
                <div style={{ backgroundColor: '#fff', borderRadius: '24px', padding: '1.25rem', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', border: '1.5px solid #e2e8f0', marginBottom: '1.25rem' }}>
                    {/* Day headers */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', marginBottom: '0.5rem' }}>
                        {[0,1,2,3,4,5,6].map(i => (
                            <div key={i} style={{ textAlign: 'center', fontSize: '0.62rem', fontWeight: '800', color: i >= 5 ? '#0891b2' : '#94a3b8', padding: '0.35rem 0', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                                {(isFr ? DAYS_FR : DAYS_EN)[i]}
                            </div>
                        ))}
                    </div>

                    {/* Day cells */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '2px' }}>
                        {cells.map((cell, idx) => {
                            const isT = cell.cur && isToday(cell.day);
                            const isSel = cell.cur && selected === cell.day;
                            const col = idx % 7;
                            const isWeekend = col >= 5;
                            return (
                                <div key={idx} className={cell.cur ? 'cal-day' : ''} onClick={() => cell.cur && setSelected(cell.day)} style={{
                                    aspectRatio: '1', display: 'flex', flexDirection: 'column',
                                    alignItems: 'center', justifyContent: 'center',
                                    borderRadius: '10px', cursor: cell.cur ? 'pointer' : 'default',
                                    backgroundColor: isT ? accentColor : isSel ? `${accentColor}18` : 'transparent',
                                    border: isSel && !isT ? `2px solid ${accentColor}` : '2px solid transparent',
                                    color: isT ? '#fff' : cell.cur ? (isWeekend ? accentColor : '#0f172a') : '#cbd5e1',
                                    fontWeight: isT || isSel ? '900' : cell.cur ? '600' : '400',
                                    fontSize: '0.88rem', transition: 'all 0.15s',
                                }}>
                                    {cell.day}
                                    {isT && <div style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: '#fff', marginTop: '2px' }} />}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Selected day detail card */}
                {selected && (
                    <div style={{ marginBottom: '1.25rem', padding: '1.1rem 1.25rem', backgroundColor: '#fff', borderRadius: '20px', border: `2px solid ${accentColor}40`, boxShadow: `0 6px 20px ${accentColor}18`, animation: 'cal-pop 0.3s cubic-bezier(0.175,0.885,0.32,1.275) both' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                            <div style={{ width: '50px', height: '50px', borderRadius: '14px', background: `linear-gradient(135deg, ${accentColor}, #38bdf8)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#fff' }}>
                                <div style={{ fontSize: '1.1rem', fontWeight: '900', lineHeight: 1 }}>{selected}</div>
                                <div style={{ fontSize: '0.55rem', fontWeight: '700', opacity: 0.85, textTransform: 'uppercase' }}>{(isFr ? MONTHS_FR : MONTHS_EN)[viewMonth].slice(0, 3)}</div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '1rem', fontWeight: '900', color: accentColor, lineHeight: 1.2 }}>
                                    {selected} {MONTHS_MEDUMBA[viewMonth]}
                                </div>
                                <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '600', marginTop: '0.15rem' }}>
                                    {selected} {isFr ? MONTHS_FR[viewMonth] : MONTHS_EN[viewMonth]} {viewYear}
                                </div>
                                {selectedDayOfWeek !== null && (
                                    <div style={{ marginTop: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', backgroundColor: `${accentColor}12`, borderRadius: '99px', padding: '0.2rem 0.75rem', border: `1.5px solid ${accentColor}30` }}>
                                        <span style={{ fontSize: '0.78rem', fontWeight: '800', color: accentColor }}>
                                            {DAYS_MEDUMBA[selectedDayOfWeek]}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Legend toggle */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', backgroundColor: '#fff', borderRadius: '14px', padding: '0.3rem', border: '1.5px solid #e2e8f0' }}>
                    {[
                        { id: 'months', en: '📋 Months', fr: '📋 Mois' },
                        { id: 'days',   en: '📅 Days',   fr: '📅 Jours' },
                    ].map(t => (
                        <button key={t.id} onClick={() => setShowLegend(t.id)} style={{
                            flex: 1, padding: '0.55rem', borderRadius: '10px', border: 'none', cursor: 'pointer',
                            backgroundColor: showLegend === t.id ? accentColor : 'transparent',
                            color: showLegend === t.id ? '#fff' : '#64748b',
                            fontWeight: '800', fontSize: '0.82rem', fontFamily: 'inherit', transition: 'all 0.15s',
                        }}>{isFr ? t.fr : t.en}</button>
                    ))}
                </div>

                {/* Months legend */}
                {showLegend === 'months' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', animation: 'cal-in 0.3s ease-out both' }}>
                        {MONTHS_MEDUMBA.map((m, i) => {
                            const c = MONTH_COLORS[i];
                            const isActive = viewMonth === i;
                            return (
                                <div key={i} className="cal-month-chip" onClick={() => { setViewMonth(i); setSelected(null); }} style={{
                                    display: 'flex', alignItems: 'center', gap: '0.6rem',
                                    padding: '0.65rem 0.85rem', borderRadius: '14px', cursor: 'pointer',
                                    backgroundColor: isActive ? `${c}12` : '#fff',
                                    border: `2px solid ${isActive ? c : '#e2e8f0'}`,
                                    transition: 'all 0.15s',
                                }}>
                                    <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: isActive ? c : `${c}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: '900', color: isActive ? '#fff' : c, flexShrink: 0 }}>
                                        {String(i + 1).padStart(2, '0')}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.78rem', fontWeight: '800', color: isActive ? c : '#0f172a', lineHeight: 1.2 }}>{m}</div>
                                        <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: '600' }}>{isFr ? MONTHS_FR[i] : MONTHS_EN[i]}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Days legend */}
                {showLegend === 'days' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', animation: 'cal-in 0.3s ease-out both' }}>
                        {DAYS_MEDUMBA.map((d, i) => (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'center', gap: '0.85rem',
                                padding: '0.75rem 1rem', backgroundColor: '#fff',
                                borderRadius: '14px', border: '1.5px solid #e2e8f0',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                                animation: `cal-in 0.3s ease-out ${i * 0.04}s both`,
                            }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `linear-gradient(135deg, ${accentColor}, #38bdf8)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <span style={{ fontSize: '0.65rem', fontWeight: '900', color: '#fff', textTransform: 'uppercase' }}>{(isFr ? DAYS_FR : DAYS_EN)[i]}</span>
                                </div>
                                <div style={{ fontSize: '0.9rem', fontWeight: '800', color: accentColor, flex: 1 }}>{d}</div>
                                <div style={{ fontSize: '0.72rem', fontWeight: '600', color: '#94a3b8' }}>{i + 1}/7</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Attribution */}
                <div style={{ marginTop: '1.5rem', padding: '0.85rem 1.1rem', backgroundColor: '#fff', borderRadius: '14px', border: '1.5px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span style={{ fontSize: '1.4rem' }}>🇨🇲</span>
                    <p style={{ fontSize: '0.7rem', color: '#94a3b8', margin: 0, fontWeight: '600', lineHeight: 1.5 }}>
                        {isFr
                            ? 'Nda le Njɔ Medumba — Calendrier traditionnel Medumba · METCHEZIN Franklin'
                            : 'Nda le Njɔ Medumba — Traditional Medumba Calendar · METCHEZIN Franklin'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CalendarPage;
