import { useState, useEffect, useRef } from 'react';

const B = '#1B4FD8';

const OTPVerificationPage = ({ onNext, onBack, email, nativeLang }) => {
    const isFrench = nativeLang === 'french';
    const [otp, setOtp]             = useState(['', '', '', '']);
    const [seconds, setSeconds]     = useState(55);
    const [canResend, setCanResend] = useState(false);
    const refs = useRef([]);

    useEffect(() => {
        if (seconds <= 0) { setCanResend(true); return; }
        const id = setTimeout(() => setSeconds((s) => s - 1), 1000);
        return () => clearTimeout(id);
    }, [seconds]);

    const handleResend = () => {
        setSeconds(55);
        setCanResend(false);
        setOtp(['', '', '', '']);
        refs.current[0]?.focus();
    };

    const handleChange = (index, value) => {
        if (!/^\d?$/.test(value)) return;
        const next = [...otp];
        next[index] = value;
        setOtp(next);
        if (value && index < 3) refs.current[index + 1]?.focus();
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) refs.current[index - 1]?.focus();
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
        const next = ['', '', '', ''];
        pasted.split('').forEach((ch, i) => { next[i] = ch; });
        setOtp(next);
        refs.current[Math.min(pasted.length, 3)]?.focus();
    };

    const isComplete = otp.every((d) => d !== '');

    const maskedEmail = email
        ? email.replace(/(.{2}).+(@.+)/, '$1***$2')
        : (isFrench ? 'votre e-mail' : 'your email');

    const t = {
        title:    isFrench ? "Vous avez du courrier 📬" : "You've got mail 📬",
        body:     isFrench
            ? `Nous avons envoyé le code OTP à ${maskedEmail}. Vérifiez votre e-mail et entrez le code ci-dessous.`
            : `We have sent the OTP verification code to ${maskedEmail}. Check your email and enter the code below.`,
        noEmail:  isFrench ? "Vous n'avez pas reçu l'e-mail ?" : "Didn't receive email?",
        resendIn: isFrench ? `Vous pouvez renvoyer dans ${seconds}s` : `You can resend code in ${seconds} s`,
        resend:   isFrench ? 'Renvoyer le code' : 'Resend code',
        confirm:  isFrench ? 'Confirmer' : 'Confirm',
    };

    return (
        <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
            <div style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', position: 'sticky', top: 0, zIndex: 50, backgroundColor: '#fff' }}>
                <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#0f172a', padding: '0.25rem 0.5rem' }}>←</button>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '480px', margin: '0 auto', padding: '1.5rem 1.5rem 2.5rem' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.75rem' }}>{t.title}</h1>
                <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: '1.6', marginBottom: '2.5rem', fontWeight: '500' }}>{t.body}</p>

                {/* 4 OTP boxes */}
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1.5rem' }} onPaste={handlePaste}>
                    {otp.map((digit, i) => (
                        <input
                            key={i}
                            ref={(el) => (refs.current[i] = el)}
                            type="text" inputMode="numeric" maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(i, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(i, e)}
                            style={{
                                width: '64px', height: '72px', textAlign: 'center',
                                fontSize: '1.6rem', fontWeight: '800', borderRadius: '14px',
                                border: `2px solid ${digit ? B : '#e2e8f0'}`,
                                backgroundColor: digit ? '#eff6ff' : '#f8fafc',
                                color: B, outline: 'none', fontFamily: 'inherit',
                                transition: 'border-color 0.15s, background-color 0.15s',
                            }}
                        />
                    ))}
                </div>

                {/* Resend */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem', marginBottom: '2.5rem' }}>
                    <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: '500' }}>{t.noEmail}</span>
                    {canResend ? (
                        <button onClick={handleResend} style={{ background: 'none', border: 'none', color: B, fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                            {t.resend}
                        </button>
                    ) : (
                        <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '600' }}>
                            {t.resendIn}
                        </span>
                    )}
                </div>

                <div style={{ flex: 1 }} />
                <button onClick={() => onNext(otp.join(''))} disabled={!isComplete} style={{ width: '100%', backgroundColor: isComplete ? B : '#cbd5e1', color: '#fff', padding: '1.1rem', borderRadius: '9999px', fontSize: '1.05rem', fontWeight: '700', border: 'none', cursor: isComplete ? 'pointer' : 'not-allowed', boxShadow: isComplete ? '0 8px 24px rgba(27,79,216,0.3)' : 'none', letterSpacing: '0.4px', fontFamily: 'inherit' }}>
                    {t.confirm}
                </button>
            </div>
        </div>
    );
};

export default OTPVerificationPage;
