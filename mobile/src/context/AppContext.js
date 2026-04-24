import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [nativeLang, setNativeLang] = useState('fr');
  const [learningLang, setLearningLang] = useState('medumba');
  const [connection, setConnection] = useState(null);
  const [proficiency, setProficiency] = useState(null);
  const [reason, setReason] = useState(null);
  const [goals, setGoals] = useState([]);
  const [dailyGoal, setDailyGoal] = useState('normal');
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userStats] = useState({ streak: 7, xp: 340, gems: 50, hearts: 4 });

  const profile = {
    name: userName,
    age: userAge,
    email: userEmail,
    connection,
    proficiency,
    reason,
    goals,
    dailyGoal,
  };

  return (
    <AppContext.Provider value={{
      nativeLang, setNativeLang,
      learningLang, setLearningLang,
      connection, setConnection,
      proficiency, setProficiency,
      reason, setReason,
      goals, setGoals,
      dailyGoal, setDailyGoal,
      userName, setUserName,
      userAge, setUserAge,
      userEmail, setUserEmail,
      userStats,
      profile,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
