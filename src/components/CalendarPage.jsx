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

function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}
// Returns 0=Mon … 6=Sun for the first day of the month
function firstDayOfMonth(year, month) {
    const d = new Date(year, month, 1).getDay(); // 0=Sun…6=Sat
    return (d + 6) % 7; // convert to Mon=0
}

const CalendarPage = ({ nativeLang, onBack }) => {
    const isFr = nativeLang === 'french';
    const today = new Date();
    const [viewYear,  setViewYear]  = useState(today.getFullYear());
    const [viewMonth, setViewMonth] = useState(today.getMonth());
    const [selected,  setSelected]  = useState(null);

    const firstDay = firstDayOfMonth(viewYear, viewMonth);
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

    // build grid cells
    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push({ day: prevDays - firstDay + 1 + i, cur: false });
    for (let d = 1; d <= totalDays; d++) cells.push({ day: d, cur: true });
    while (cells.length % 7 !== 0) cells.push({ day: cells.length - firstDay - totalDays + 1, cur: false });

    const dayLabel = (i) => {
        if (isFr) return DAYS_FR[i];
        return DAYS_EN[i];
    };

    return (
        <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', fontFamily: "'Outfit', system-ui, sans-serif" }}>
            <style>{`
                @keyframes cal-in { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
            `}</style>

            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg, #0056D2, #38bdf8)', padding: '1.25rem 1.5rem 1.5rem', color: '#fff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '38px', height: '38px', cursor: 'pointer', fontSize: '1.2rem', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
                    <div>
                        <div style={{ fontSize: '0.72rem', fontWeight: '700', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.7px' }}>
                            {isFr ? 'Calendrier Medumba' : 'Medumba Calendar'}
                        </div>
                        <div style={{ fontSize: '1.2rem', fontWeight: '900' }}>📅 {isFr ? 'Nda le Nj Medumba' : 'Nda le Nj Medumba'}</div>
                    </div>
                </div>

                {/* Month navigator */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '16px', padding: '0.75rem 1rem' }}>
                    <button onClick={prevMonth} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer', padding: '0 0.5rem' }}>‹</button>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '1.1rem', fontWeight: '900', color: '#fff' }}>
                            {MONTHS_MEDUMBA[viewMonth]}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.8)', fontWeight: '600' }}>
                            {isFr ? MONTHS_FR[viewMonth] : MONTHS_EN[viewMonth]} {viewYear}
                        </div>
                    </div>
                    <button onClick={nextMonth} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer', padding: '0 0.5rem' }}>›</button>
                </div>
            </div>

            {/* Calendar grid */}
            <div style={{ flex: 1, padding: '1.25rem 1rem', animation: 'cal-in 0.35s ease-out both' }}>
                {/* Day headers */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '2px', marginBottom: '0.5rem' }}>
                    {[0,1,2,3,4,5,6].map(i => (
                        <div key={i} style={{ textAlign: 'center', fontSize: '0.65rem', fontWeight: '800', color: '#64748b', padding: '0.4rem 0', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                            {dayLabel(i)}
                        </div>
                    ))}
                </div>

                {/* Day cells */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '4px' }}>
                    {cells.map((cell, idx) => {
                        const today_ = cell.cur && isToday(cell.day);
                        const sel    = cell.cur && selected === cell.day;
                        return (
                            <div
                                key={idx}
                                onClick={() => cell.cur && setSelected(cell.day)}
                                style={{
                                    aspectRatio: '1', display: 'flex', flexDirection: 'column',
                                    alignItems: 'center', justifyContent: 'center',
                                    borderRadius: '12px', cursor: cell.cur ? 'pointer' : 'default',
                                    backgroundColor: today_ ? '#0056D2' : sel ? '#eff6ff' : 'transparent',
                                    border: sel && !today_ ? '2px solid #0056D2' : '2px solid transparent',
                                    color: today_ ? '#fff' : cell.cur ? '#0f172a' : '#cbd5e1',
                                    fontWeight: today_ ? '900' : cell.cur ? '600' : '400',
                                    fontSize: '0.9rem', transition: 'all 0.15s',
                                }}
                            >
                                {cell.day}
                                {today_ && <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#fff', marginTop: '2px' }} />}
                            </div>
                        );
                    })}
                </div>

                {/* Selected day detail */}
                {selected && (
                    <div style={{ marginTop: '1.25rem', padding: '1.1rem 1.25rem', backgroundColor: '#fff', borderRadius: '18px', border: '2px solid #bfdbfe', boxShadow: '0 4px 16px rgba(0,86,210,0.1)' }}>
                        <div style={{ fontSize: '0.72rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '0.35rem' }}>
                            {isFr ? 'Jour sélectionné' : 'Selected day'}
                        </div>
                        <div style={{ fontSize: '1.2rem', fontWeight: '900', color: '#0056D2' }}>
                            {selected} {MONTHS_MEDUMBA[viewMonth]} {viewYear}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600', marginTop: '0.25rem' }}>
                            {selected} {isFr ? MONTHS_FR[viewMonth] : MONTHS_EN[viewMonth]} {viewYear}
                        </div>
                        {/* Day of week */}
                        <div style={{ marginTop: '0.6rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', backgroundColor: '#eff6ff', borderRadius: '99px', padding: '0.2rem 0.8rem' }}>
                            <span style={{ fontSize: '0.78rem', fontWeight: '700', color: '#0056D2' }}>
                                {DAYS_MEDUMBA[((new Date(viewYear, viewMonth, selected).getDay() + 6) % 7)]}
                            </span>
                        </div>
                    </div>
                )}

                {/* Month names legend */}
                <div style={{ marginTop: '1.5rem' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.75rem' }}>
                        📋 {isFr ? 'Mois en Medumba' : 'Months in Medumba'}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        {MONTHS_MEDUMBA.map((m, i) => (
                            <div key={i} onClick={() => { setViewMonth(i); setSelected(null); }} style={{
                                display: 'flex', alignItems: 'center', gap: '0.6rem',
                                padding: '0.5rem 0.75rem', borderRadius: '10px', cursor: 'pointer',
                                backgroundColor: viewMonth === i ? '#eff6ff' : '#fff',
                                border: `1.5px solid ${viewMonth === i ? '#0056D2' : '#e2e8f0'}`,
                                transition: 'all 0.15s',
                            }}>
                                <span style={{ fontSize: '0.7rem', fontWeight: '800', color: '#94a3b8', width: '18px' }}>{String(i+1).padStart(2,'0')}</span>
                                <div>
                                    <div style={{ fontSize: '0.8rem', fontWeight: '700', color: viewMonth === i ? '#0056D2' : '#0f172a' }}>{m}</div>
                                    <div style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: '600' }}>{isFr ? MONTHS_FR[i] : MONTHS_EN[i]}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Day names legend */}
                <div style={{ marginTop: '1.5rem' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.75rem' }}>
                        📅 {isFr ? 'Jours de la semaine en Medumba' : 'Days of the week in Medumba'}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {DAYS_MEDUMBA.map((d, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.55rem 0.85rem', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                                <span style={{ fontSize: '0.72rem', fontWeight: '700', color: '#94a3b8', width: '28px' }}>{isFr ? DAYS_FR[i] : DAYS_EN[i]}</span>
                                <span style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0056D2' }}>{d}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ marginTop: '1.25rem', padding: '0.75rem 1rem', backgroundColor: '#f1f5f9', borderRadius: '12px' }}>
                    <p style={{ fontSize: '0.72rem', color: '#64748b', margin: 0, fontWeight: '600', textAlign: 'center' }}>
                        🇨🇲 {isFr ? 'Calendrier Medumba — Nda le Njɔ Medumba · METCHEZIN Franklin' : 'Medumba Calendar — Nda le Njɔ Medumba · METCHEZIN Franklin'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CalendarPage;
