/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserProfile } from './types';
import { INITIAL_USER_PROFILE } from './data/mockKenyanData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { LandingView } from './views/LandingView';
import { DemoView } from './views/DemoView';
import { OnboardingView } from './views/OnboardingView';
import { DashboardView } from './views/DashboardView';

type AppView = 'landing' | 'demo' | 'onboarding' | 'dashboard';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>(() => {
    // Check initial pathname or hash
    const path = window.location.pathname;
    if (path.includes('/demo')) return 'demo';
    if (path.includes('/onboarding')) return 'onboarding';
    if (path.includes('/dashboard')) return 'dashboard';
    
    const hash = window.location.hash.replace('#', '');
    if (hash === 'demo' || hash === 'onboarding' || hash === 'dashboard') {
      return hash as AppView;
    }
    return 'landing';
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('kazai_user_profile');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      // Storage access may be denied in sandboxed iframes
    }
    return INITIAL_USER_PROFILE;
  });

  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(() => {
    try {
      return localStorage.getItem('kazai_onboarded') === 'true';
    } catch (e) {
      return false;
    }
  });

  // Sync route
  const handleNavigate = (view: AppView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      const newPath = view === 'landing' ? '/' : `/${view}`;
      window.history.pushState({}, '', newPath);
    } catch (e) {
      // In sandboxed iframes pushState might be restricted; state is maintained
    }
  };

  // Handle popstate for back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      try {
        const path = window.location.pathname;
        if (path.includes('/demo')) setCurrentView('demo');
        else if (path.includes('/onboarding')) setCurrentView('onboarding');
        else if (path.includes('/dashboard')) setCurrentView('dashboard');
        else setCurrentView('landing');
      } catch (e) {}
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update profile
  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setUserProfile((prev) => {
      const next = { ...prev, ...updated };
      try {
        localStorage.setItem('kazai_user_profile', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  // Onboarding completion
  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setHasCompletedOnboarding(true);
    try {
      localStorage.setItem('kazai_user_profile', JSON.stringify(profile));
      localStorage.setItem('kazai_onboarded', 'true');
    } catch (e) {}
    handleNavigate('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#080d0a] text-slate-100 flex flex-col font-sans selection:bg-emerald-400 selection:text-black pb-14 md:pb-0">
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        hasOnboarded={hasCompletedOnboarding}
      />

      {/* Main View Router */}
      <main className="flex-1 flex flex-col">
        {currentView === 'landing' && (
          <LandingView
            onStartTrial={() => handleNavigate('onboarding')}
            onExploreDemo={() => handleNavigate('demo')}
          />
        )}

        {currentView === 'demo' && (
          <DemoView
            onStartTrial={() => handleNavigate('onboarding')}
          />
        )}

        {currentView === 'onboarding' && (
          <OnboardingView
            onComplete={handleOnboardingComplete}
            onCancel={() => handleNavigate('landing')}
          />
        )}

        {currentView === 'dashboard' && (
          <DashboardView
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
            onNavigateToDemo={() => handleNavigate('demo')}
          />
        )}
      </main>

      {/* Mobile Super-App Thumb Dock (Ergonomic for phones) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#09100c]/95 backdrop-blur-xl border-t border-emerald-500/20 px-3 py-2 flex items-center justify-around font-mono text-[11px]">
        <button
          onClick={() => handleNavigate('landing')}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-colors ${
            currentView === 'landing' ? 'text-emerald-400 font-bold' : 'text-slate-400'
          }`}
        >
          <span>HOME</span>
        </button>

        <button
          onClick={() => handleNavigate('demo')}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-colors ${
            currentView === 'demo' ? 'text-emerald-400 font-bold' : 'text-slate-400'
          }`}
        >
          <span>DEMO</span>
        </button>

        <button
          onClick={() => handleNavigate('onboarding')}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-colors ${
            currentView === 'onboarding' ? 'text-emerald-400 font-bold' : 'text-slate-400'
          }`}
        >
          <span>TRIAL</span>
        </button>

        {hasCompletedOnboarding && (
          <button
            onClick={() => handleNavigate('dashboard')}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-colors ${
              currentView === 'dashboard' ? 'text-emerald-400 font-bold' : 'text-slate-400'
            }`}
          >
            <span>DASHBOARD</span>
          </button>
        )}
      </div>

      {/* Persistent Floating Install App PWA Button for Notifications */}
      <PWAInstallBanner />

      {/* Authoritative Kenyan Trust Footer */}
      {(currentView === 'landing' || currentView === 'demo') && <Footer />}
    </div>
  );
}
