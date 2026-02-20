import { useState, useEffect, useRef } from 'react';

const OTPVerificationPage = ({ onNext, onBack, email, nativeLang }) => {
    const isFrench = nativeLang === 'french';
    const [otp, setOtp]           = useState(['', '', '', '', '', '']);
    const [seconds, setSeconds]   = useState(55);
    const [canResend, setCanResend] = useState(false);
    const refs = useRef([]);

    // Countdown
    useEffect(() => {
        if (seconds <= 0) { setCanResend(true); return; }
        const id = setTimeout(() => setSeconds((s) => s - 1), 1000);
        return () => clearTimeout(id);
    }, [seconds]);

    const handleResend = () => {
        setSeconds(55);
        setCanResend(false);
        setOtp(['', '', '', '', '', '']);
        refs.current[0]?.focus();
    };

    const handleChange = (index, value) => {
        if (!/^\d?$/.test(value)) return; // digits only
        const next = [...otp];
        next[index] = value;
        setOtp(next);
        if (value && index < 5) refs.current[index + 1]?.focus();
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            refs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        const next = [...otp];
        pasted.split('').forEach((char, i) => { next[i] = char; });
        setOtp(next);
        const focusIdx = Math.min(pasted.length, 5);
        refs.current[focusIdx]?.focus();
    };

    const isComplete = otp.every((d) => d !== '');

    const maskedEmail = email
        ? email.replace(/(.{2}).+(@.+)/, '$1***$2')
        : (isFrench ? 'votre e-mail' : 'your email');

    const t = {
        title:    isFrench ? 'Vous avez du courrier 📬'   : "You've got mail 📬",
        body:     isFrench
            ? `Nous avons envoyé le code de vérification OTP à ${maskedEmail}. Vérifiez votre e-mail et entrez le code ci-dessous.`
            : `We sent the OTP verification code to ${maskedEmail}. Check your email and enter the code below.`,
        noEmail:  isFrench ? "Vous n'avez pas reçu l'e-mail ?" : "Didn't receive email?",
        resendIn: isFrench ? `Vous pouvez renvoyer dans ${seconds}s` : `You can resend in ${seconds}s`,
        resend:   isFrench ? 'Renvoyer le code'               : 'Resend code',
        confirm:  isFrench ? 'Confirmer'                      : 'Confirm',
    };

    return (
        <div style={{
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f8fafc',
        }}>
            {/* Top bar */}
            <div style={{
                padding: '1rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                position: 'sticky',
                top: 0,
                zIndex: 50,
                backgroundColor: '#f8fafc',
            }}>
                <button onClick={onBack} style={{
                    background: 'none', border: 'none',
                    fontSize: '1.5rem', cursor: 'pointer',
                    color: '#0f172a', padding: '0.5rem', borderRadius: '50%',
                }}>←</button>
            </div>

            {/* Content */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                maxWidth: '480px',
                margin: '0 auto',
                padding: '1.5rem 1.5rem 2.5rem',
            }}>
                <h1 style={{
                    fontSize: '1.6rem', fontWeight: '800',
                    color: '#0f172a', marginBottom: '0.75rem',
                }}>
                    {t.title}
                </h1>
                <p style={{
                    fontSize: '0.95rem', color: '#64748b',
                    lineHeight: '1.6', marginBottom: '2.5rem', fontWeight: '500',
                }}>
                    {t.body}
                </p>

                {/* OTP boxes */}
                <div style={{
                    display: 'flex',
                    gap: '0.65rem',
                    justifyContent: 'center',
                    marginBottom: '2rem',
                }}
                    onPaste={handlePaste}
                >
                    {otp.map((digit, i) => (
                        <input
                            key={i}
                            ref={(el) => (refs.current[i] = el)}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(i, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(i, e)}
                            style={{
                                width: '48px',
                                height: '56px',
                                textAlign: 'center',
                                fontSize: '1.4rem',
                                fontWeight: '800',
                                borderRadius: '14px',
                                border: `2px solid ${digit ? '#0056D2' : '#e2e8f0'}`,
                                backgroundColor: digit ? '#eff6ff' : '#fff',
                                color: '#0056D2',
                                outline: 'none',
                                fontFamily: 'inherit',
                                transition: 'border-color 0.15s, background-color 0.15s',
                            }}
                        />
                    ))}
                </div>

                {/* Resend section */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.35rem',
                    marginBottom: '2rem',
                }}>
                    <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: '500' }}>
                        {t.noEmail}
                    </span>
                    {canResend ? (
                        <button
                            onClick={handleResend}
                            style={{
                                background: 'none', border: 'none',
                                color: '#0056D2', fontWeight: '700',
                                fontSize: '0.9rem', cursor: 'pointer',
                                fontFamily: 'inherit',
                            }}
                        >
                            {t.resend}
                        </button>
                    ) : (
                        <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '600' }}>
                            {t.resendIn}
                        </span>
                    )}
                </div>

                {/* Confirm */}
                <button
                    onClick={() => onNext(otp.join(''))}
                    disabled={!isComplete}
                    style={{
                        width: '100%',
                        backgroundColor: isComplete ? '#0056D2' : '#cbd5e1',
                        color: '#fff',
                        padding: '1.1rem',
                        borderRadius: '9999px',
                        fontSize: '1rem',
                        fontWeight: '700',
                        border: 'none',
                        cursor: isComplete ? 'pointer' : 'not-allowed',
                        boxShadow: isComplete ? '0 8px 20px rgba(0,86,210,0.3)' : 'none',
                        letterSpacing: '0.4px',
                        fontFamily: 'inherit',
                        marginTop: 'auto',
                    }}
                >
                    {t.confirm}
                </button>
            </div>
        </div>
    );
};

export default OTPVerificationPage;
