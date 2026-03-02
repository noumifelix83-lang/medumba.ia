import { useState } from 'react';
import SplashScreen             from './components/SplashScreen';
import WelcomePage              from './components/WelcomePage';
import LanguageSelectionPage    from './components/LanguageSelectionPage';
import HubPage                  from './components/HubPage';
import CalendarPage             from './components/CalendarPage';
import VideoPage                from './components/VideoPage';
import CountingPage             from './components/CountingPage';
import DictionaryPage           from './components/DictionaryPage';
import ProficiencyPage          from './components/ProficiencyPage';
import ReasonPage               from './components/ReasonPage';
import AchievePage              from './components/AchievePage';
import DailyGoalPage            from './components/DailyGoalPage';
import ProfileWelcomePage       from './components/ProfileWelcomePage';
import NamePage                 from './components/NamePage';
import AgePage                  from './components/AgePage';
import EmailPage                from './components/EmailPage';
import PasswordPage             from './components/PasswordPage';
import SuccessPage              from './components/SuccessPage';
import LoginPage                from './components/LoginPage';
import ForgotPasswordPage       from './components/ForgotPasswordPage';
import OTPVerificationPage      from './components/OTPVerificationPage';
import NewPasswordPage          from './components/NewPasswordPage';
import PasswordResetSuccessPage from './components/PasswordResetSuccessPage';
import DashboardPage            from './components/DashboardPage';
import ErrorBoundary            from './components/ErrorBoundary';

// ─── Step map ───────────────────────────────────────────────────────────────
//  0  Splash
//  1  Welcome
//  2  Language Selection (native lang only → learningLang always 'medumba')
// 24  Hub Dashboard      ┐ new feature hub
// 25  Calendar           │
// 26  Videos             │
// 27  Counting           │
// 28  Dictionary         ┘
//  3  Proficiency                ┐
//  4  Reason                     │ Courses onboarding
//  5  Achieve                    │
//  6  Daily Goal                 ┘
//  7  Profile Welcome  (Skip→15) ┐
//  8  Name                       │ Account creation
//  9  Age                        │
// 10  Email                      │
// 11  Password                   │
// 12  Success          (→15)     ┘
// 13  Login            (→15 | Forgot→20)
// 20  Forgot Password  (→21)     ┐
// 21  OTP Verification (→22)     │ Password reset
// 22  New Password     (→23)     │
// 23  Reset Success    (→15)     ┘
// 15  Gamified Dashboard

function App() {
  const [step, setStep] = useState(0);

  // ── Language selection ───────────────────────────────────────────
  const [nativeLang,   setNativeLang]   = useState(null);
  // learningLang is always 'medumba' — the app's sole purpose
  const learningLang = 'medumba';

  // ── Onboarding profile ───────────────────────────────────────────
  const [proficiency, setProficiency] = useState(null);
  const [reason,      setReason]      = useState(null);
  const [goals,       setGoals]       = useState([]);
  const [dailyGoal,   setDailyGoal]   = useState(null);

  // ── Account creation ─────────────────────────────────────────────
  const [userName,  setUserName]  = useState('');
  const [userAge,   setUserAge]   = useState('');
  const [userEmail, setUserEmail] = useState('');

  // ── Password reset ───────────────────────────────────────────────
  const [resetEmail, setResetEmail] = useState('');

  // ── Static game stats ────────────────────────────────────────────
  const [userStats] = useState({ streak: 7, xp: 340, gems: 50, hearts: 4 });

  const go   = (n) => setStep(n);
  const back = () => setStep((s) => Math.max(0, s - 1));

  // ── Assembled profile object ─────────────────────────────────────
  const profile = {
    name:        userName,
    age:         userAge,
    email:       userEmail,
    proficiency: proficiency,
    reason:      reason,
    goals:       goals,
    dailyGoal:   dailyGoal ?? 'normal',
  };

  return (
    <ErrorBoundary>

      {/* ── Splash ── */}
      {step === 0 && <SplashScreen onFinish={() => go(1)} />}

      {/* ── Welcome ── */}
      {step === 1 && <WelcomePage onNext={() => go(2)} onLogin={() => go(13)} />}

      {/* ── Language selection (native only) ── */}
      {step === 2 && (
        <LanguageSelectionPage
          onNext={() => go(24)} onBack={back}
          nativeLang={nativeLang} setNativeLang={setNativeLang}
        />
      )}

      {/* ── Hub Dashboard ── */}
      {step === 24 && (
        <HubPage
          nativeLang={nativeLang}
          onCalendar={  () => go(25)}
          onVideo={     () => go(26)}
          onCounting={  () => go(27)}
          onDictionary={() => go(28)}
          onCourses={   () => go(3)}
        />
      )}

      {/* ── Calendar ── */}
      {step === 25 && <CalendarPage   nativeLang={nativeLang} onBack={() => go(24)} />}

      {/* ── Videos ── */}
      {step === 26 && <VideoPage      nativeLang={nativeLang} onBack={() => go(24)} />}

      {/* ── Counting ── */}
      {step === 27 && <CountingPage   nativeLang={nativeLang} onBack={() => go(24)} />}

      {/* ── Dictionary ── */}
      {step === 28 && <DictionaryPage nativeLang={nativeLang} onBack={() => go(24)} />}

      {/* ── Courses onboarding ── */}
      {step === 3 && (
        <ProficiencyPage
          onNext={(level) => { setProficiency(level); go(4); }}
          onBack={() => go(24)}
          nativeLang={nativeLang} learningLang={learningLang}
        />
      )}
      {step === 4 && (
        <ReasonPage
          onNext={(r) => { setReason(r); go(5); }}
          onBack={back}
          nativeLang={nativeLang} learningLang={learningLang}
        />
      )}
      {step === 5 && (
        <AchievePage
          onNext={(g) => { setGoals(g); go(6); }}
          onBack={back}
          nativeLang={nativeLang}
        />
      )}
      {step === 6 && (
        <DailyGoalPage
          onNext={(dg) => { setDailyGoal(dg); go(7); }}
          onBack={back}
          nativeLang={nativeLang}
        />
      )}

      {/* ── Account creation ── */}
      {step === 7  && <ProfileWelcomePage onNext={() => go(8)} onSkip={() => go(15)} nativeLang={nativeLang} />}
      {step === 8  && <NamePage     onNext={(n) => { setUserName(n);  go(9);  }} onBack={back} nativeLang={nativeLang} />}
      {step === 9  && <AgePage      onNext={(a) => { setUserAge(a);   go(10); }} onBack={back} nativeLang={nativeLang} />}
      {step === 10 && <EmailPage    onNext={(e) => { setUserEmail(e); go(11); }} onBack={back} nativeLang={nativeLang} />}
      {step === 11 && <PasswordPage onNext={() => go(12)} onBack={back} nativeLang={nativeLang} />}
      {step === 12 && <SuccessPage  onNext={() => go(15)}               nativeLang={nativeLang} />}

      {/* ── Login ── */}
      {step === 13 && (
        <LoginPage
          onLogin={() => go(15)} onBack={back}
          onForgotPassword={() => go(20)}
          nativeLang={nativeLang}
        />
      )}

      {/* ── Password reset ── */}
      {step === 20 && <ForgotPasswordPage      onNext={(e) => { setResetEmail(e); go(21); }} onBack={() => go(13)} nativeLang={nativeLang} />}
      {step === 21 && <OTPVerificationPage     onNext={() => go(22)} onBack={() => go(20)} email={resetEmail}       nativeLang={nativeLang} />}
      {step === 22 && <NewPasswordPage         onNext={() => go(23)} onBack={() => go(21)}                          nativeLang={nativeLang} />}
      {step === 23 && <PasswordResetSuccessPage onNext={() => go(15)}                                               nativeLang={nativeLang} />}

      {/* ── Gamified Dashboard ── */}
      {step === 15 && (
        <DashboardPage
          userStats={userStats}
          nativeLang={nativeLang}
          learningLang={learningLang}
          profile={profile}
        />
      )}

    </ErrorBoundary>
  );
}

export default App;
