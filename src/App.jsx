import React, { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import WelcomePage from './components/WelcomePage';
import LanguageSelectionPage from './components/LanguageSelectionPage';

import ProficiencyPage from './components/ProficiencyPage';
import ReasonPage from './components/ReasonPage';
import AchievePage from './components/AchievePage';
import DailyGoalPage from './components/DailyGoalPage';
import ProfileWelcomePage from './components/ProfileWelcomePage';
import NamePage from './components/NamePage';
import AgePage from './components/AgePage';
import ErrorBoundary from './components/ErrorBoundary';
import DebugOverlay from './components/DebugOverlay';

function App() {
  // 0: Splash, 1: Welcome, 2: Language Selection, 3: Proficiency, 4: Reason, 5: Achieve, 6: Daily Goal
  const [currentStep, setCurrentStep] = useState(0);
  const [nativeLang, setNativeLang] = useState(null);
  const [learningLang, setLearningLang] = useState(null);
  const [achieveGoals, setAchieveGoals] = useState([]);
  const [dailyGoal, setDailyGoal] = useState(null);
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');

  const handleSplashFinish = () => {
    setCurrentStep(1);
  };

  const handleWelcomeNext = () => {
    setCurrentStep(2);
  };

  const handleLanguageNext = () => {
    setCurrentStep(3);
  };

  const handleProficiencyNext = () => {
    setCurrentStep(4);
  };

  const handleReasonNext = () => {
    setCurrentStep(5);
  };

  const handleAchieveNext = (goals) => {
    console.log('App: handleAchieveNext called with:', goals);
    setAchieveGoals(goals);
    setCurrentStep(6);
  };

  const handleDailyGoalNext = (goal) => {
    setDailyGoal(goal);
    setCurrentStep(7); // Go to Profile Welcome
  };

  const handleProfileCreate = () => {
    // Navigate to NamePage
    setCurrentStep(8);
  };

  const handleNameNext = (name) => {
    setFullName(name);
    console.log("Full Name set:", name);
    setCurrentStep(9); // Go to Age Page
  };

  const handleAgeNext = (age) => {
    setAge(age);
    console.log("Age set:", age);
    // Placeholder for next step 
    // setCurrentStep(10);
  };

  const handleProfileSkip = () => {
    // Navigate to dashboard/home
    console.log('Skip clicked');
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  return (
    <>
      {console.log('App: Rendering currentStep:', currentStep)}
      <ErrorBoundary>
        {currentStep === 0 && <SplashScreen onFinish={handleSplashFinish} />}
        {currentStep === 1 && <WelcomePage onNext={handleWelcomeNext} />}
        {currentStep === 2 && (
          <LanguageSelectionPage
            onNext={handleLanguageNext}
            onBack={handleBack}
            nativeLang={nativeLang}
            setNativeLang={setNativeLang}
            learningLang={learningLang}
            setLearningLang={setLearningLang}
          />
        )}
        {currentStep === 3 && (
          <ProficiencyPage
            onNext={handleProficiencyNext}
            onBack={handleBack}
            nativeLang={nativeLang}
            learningLang={learningLang}
          />
        )}
        {currentStep === 4 && (
          <ReasonPage
            onNext={handleReasonNext}
            onBack={handleBack}
            nativeLang={nativeLang}
            learningLang={learningLang}
          />
        )}
        {currentStep === 5 && (
          <AchievePage
            onNext={handleAchieveNext}
            onBack={handleBack}
            nativeLang={nativeLang}
          />
        )}
        {currentStep === 6 && (
          <DailyGoalPage
            onNext={handleDailyGoalNext}
            onBack={handleBack}
            nativeLang={nativeLang}
          />
        )}
        {currentStep === 7 && (
          <ProfileWelcomePage
            onNext={handleProfileCreate}
            onSkip={handleProfileSkip}
            nativeLang={nativeLang}
          />
        )}
        {currentStep === 8 && (
          <NamePage
            onNext={handleNameNext}
            onBack={handleBack}
            nativeLang={nativeLang}
          />
        )}
        {currentStep === 9 && (
          <AgePage
            onNext={handleAgeNext}
            onBack={handleBack}
            nativeLang={nativeLang}
          />
        )}
      </ErrorBoundary>
      <DebugOverlay step={currentStep} achieveGoals={achieveGoals} dailyGoal={dailyGoal} />
    </>
  );
}

export default App;
