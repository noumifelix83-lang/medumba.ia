import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen        from '../screens/onboarding/SplashScreen';
import WelcomePage         from '../screens/onboarding/WelcomePage';
import LanguageSelection   from '../screens/onboarding/LanguageSelection';
import ConnectionPage      from '../screens/onboarding/ConnectionPage';
import ProficiencyPage     from '../screens/onboarding/ProficiencyPage';
import ReasonPage          from '../screens/onboarding/ReasonPage';
import AchievePage         from '../screens/onboarding/AchievePage';
import DailyGoalPage       from '../screens/onboarding/DailyGoalPage';
import ProfileWelcomePage  from '../screens/auth/ProfileWelcomePage';
import NamePage            from '../screens/auth/NamePage';
import AgePage             from '../screens/auth/AgePage';
import EmailPage           from '../screens/auth/EmailPage';
import PasswordPage        from '../screens/auth/PasswordPage';
import SuccessPage         from '../screens/auth/SuccessPage';
import LoginPage           from '../screens/auth/LoginPage';
import ForgotPasswordPage  from '../screens/auth/ForgotPasswordPage';
import OTPPage             from '../screens/auth/OTPPage';
import NewPasswordPage     from '../screens/auth/NewPasswordPage';
import ResetSuccessPage    from '../screens/auth/ResetSuccessPage';
import DashboardPage       from '../screens/main/DashboardPage';
import LessonPage          from '../screens/main/LessonPage';
import CalendarPage        from '../screens/main/CalendarPage';
import VideoPage           from '../screens/main/VideoPage';
import CountingPage        from '../screens/main/CountingPage';
import DictionaryPage      from '../screens/main/DictionaryPage';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false, gestureEnabled: true }}
      >
        {/* Splash */}
        <Stack.Screen name="Splash"        component={SplashScreen} />

        {/* Welcome */}
        <Stack.Screen name="Welcome"       component={WelcomePage} />

        {/* Onboarding */}
        <Stack.Screen name="Language"      component={LanguageSelection} />
        <Stack.Screen name="Connection"    component={ConnectionPage} />
        <Stack.Screen name="Proficiency"   component={ProficiencyPage} />
        <Stack.Screen name="Reason"        component={ReasonPage} />
        <Stack.Screen name="Achieve"       component={AchievePage} />
        <Stack.Screen name="DailyGoal"     component={DailyGoalPage} />

        {/* Account creation */}
        <Stack.Screen name="ProfileWelcome" component={ProfileWelcomePage} />
        <Stack.Screen name="Name"          component={NamePage} />
        <Stack.Screen name="Age"           component={AgePage} />
        <Stack.Screen name="Email"         component={EmailPage} />
        <Stack.Screen name="Password"      component={PasswordPage} />
        <Stack.Screen name="Success"       component={SuccessPage} />

        {/* Auth */}
        <Stack.Screen name="Login"         component={LoginPage} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordPage} />
        <Stack.Screen name="OTP"           component={OTPPage} />
        <Stack.Screen name="NewPassword"   component={NewPasswordPage} />
        <Stack.Screen name="ResetSuccess"  component={ResetSuccessPage} />

        {/* Main app */}
        <Stack.Screen name="Dashboard"     component={DashboardPage} />
        <Stack.Screen name="Lesson"        component={LessonPage} />
        <Stack.Screen name="Calendar"      component={CalendarPage} />
        <Stack.Screen name="Video"         component={VideoPage} />
        <Stack.Screen name="Counting"      component={CountingPage} />
        <Stack.Screen name="Dictionary"    component={DictionaryPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
