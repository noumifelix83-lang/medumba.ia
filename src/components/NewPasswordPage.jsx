import { useState } from 'react';

const NewPasswordPage = ({ onNext, onBack, nativeLang }) => {
    const isFrench = nativeLang === 'french';
    const [password, setPassword]         = useState('');
    const [confirm, setConfirm]           = useState('');
    const [showPass, setShowPass]         = useState(false);
    const [showConfirm, setShowConfirm]   = useState(false);

    const isLong   = password.length >= 6;
    const isMatch  = password === confirm && confirm.length > 0;
    const isValid  = isLong && isMatch;

    const t = {
        title:       isFrench ? 'Nouveau mot de passe 🔒'   : 'New Password 🔒',
        subtitle:    isFrench ? 'Votre nouveau mot de passe doit être différent de celui utilisé précédemment.'
                              : 'Your new password must be different from previously used passwords.',
        passLabel:   isFrench ? 'Nouveau mot de passe'      : 'New password',
        passPH:      isFrench ? 'Minimum 6 caractères'      : 'Minimum 6 characters',
        confLabel:   isFrench ? 'Confirmer le mot de passe' : 'Confirm password',
        confPH:      isFrench ? 'Répétez le mot de passe'   : 'Repeat your password',
        show:        isFrench ? 'Afficher'                  : 'Show',
        hide:        isFrench ? 'Masquer'                   : 'Hide',
        mismatch:    isFrench ? 'Les mots de passe ne correspondent pas' : 'Passwords do not match',
        btn:         isFrench ? 'Continuer'                 : 'Continue',
    };

    const inputBase = {
        padding: '1rem',
        paddingRight: '5rem',
        borderRadius: '16px',
        border: '2px solid #e2e8f0',
        fontSize: '1rem',
        width: '100%',
        outline: 'none',
        backgroundColor: '#fff',
        color: '#0f172a',
        fontFamily: 'inherit',
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
                    lineHeight: '1.6', marginBottom: '2rem', fontWeight: '500',
                }}>
                    {t.subtitle}
                </p>

                {/* New password */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    <label style={{ fontSize: '0.95rem', fontWeight: '600', color: '#64748b' }}>
                        {t.passLabel}
                    </label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showPass ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={t.passPH}
                            style={{
                                ...inputBase,
                                borderColor: password && !isLong ? '#f87171' : '#e2e8f0',
                            }}
                        />
                        <button type="button" onClick={() => setShowPass(!showPass)} style={{
                            position: 'absolute', right: '1rem', top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none', border: 'none',
                            color: '#0056D2', fontWeight: '700',
                            cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'inherit',
                        }}>
                            {showPass ? t.hide : t.show}
                        </button>
                    </div>
                </div>

                {/* Confirm password */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <label style={{ fontSize: '0.95rem', fontWeight: '600', color: '#64748b' }}>
                        {t.confLabel}
                    </label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showConfirm ? 'text' : 'password'}
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            placeholder={t.confPH}
                            style={{
                                ...inputBase,
                                borderColor: confirm && !isMatch ? '#f87171' : '#e2e8f0',
                            }}
                        />
                        <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={{
                            position: 'absolute', right: '1rem', top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none', border: 'none',
                            color: '#0056D2', fontWeight: '700',
                            cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'inherit',
                        }}>
                            {showConfirm ? t.hide : t.show}
                        </button>
                    </div>
                </div>

                {/* Mismatch error */}
                {confirm && !isMatch && (
                    <span style={{ fontSize: '0.82rem', color: '#ef4444', fontWeight: '600', marginBottom: '1rem' }}>
                        {t.mismatch}
                    </span>
                )}

                <div style={{ flex: 1 }} />

                {/* Continue */}
                <button
                    onClick={() => onNext(password)}
                    disabled={!isValid}
                    style={{
                        width: '100%',
                        backgroundColor: isValid ? '#0056D2' : '#cbd5e1',
                        color: '#fff',
                        padding: '1.1rem',
                        borderRadius: '9999px',
                        fontSize: '1rem',
                        fontWeight: '700',
                        border: 'none',
                        cursor: isValid ? 'pointer' : 'not-allowed',
                        boxShadow: isValid ? '0 8px 20px rgba(0,86,210,0.3)' : 'none',
                        letterSpacing: '0.4px',
                        fontFamily: 'inherit',
                        marginTop: '2rem',
                    }}
                >
                    {t.btn}
                </button>
            </div>
        </div>
    );
};

export default NewPasswordPage;
