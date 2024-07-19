'use client';
import React, { useEffect, useState } from 'react';

const isStandalone = () => window.matchMedia('(display-mode: standalone)').matches;

const useStandaloneMode = () => {
  const [standalone, setStandalone] = useState(isStandalone());

  useEffect(() => {
    const mediaQuery = window.matchMedia('(display-mode: standalone)');

    const handleChange = () => {
      setStandalone(mediaQuery.matches);
    };
    handleChange();
    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return standalone;
};

export default function SignUp() {
  const standalone = useStandaloneMode();
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      // Clear local storage
      localStorage.clear();

      // Prompt user to install PWA
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="container text-center">
        <h1>New Sign Up</h1>
        {!standalone && deferredPrompt && (
          <button
            onClick={handleInstallClick}
            className="bg-indigo-600 text-white py-2 px-4 mt-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          >
            Install PWA
          </button>
        )}
      </div>
    </div>
  );
}
