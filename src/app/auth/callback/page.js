'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';

export default function OAuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // Handle OAuth callback
    const handleOAuthCallback = () => {
      const hash = window.location.hash;
      
      if (hash.includes('access_token=')) {
        // Parse the OAuth response
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get('access_token');
        const tokenType = params.get('token_type');
        const expiresIn = params.get('expires_in');
        
        if (accessToken) {
          // Store the access token and metadata
          const tokenData = {
            accessToken,
            tokenType: tokenType || 'Bearer',
            expiresIn: parseInt(expiresIn) || 3600,
            timestamp: Date.now()
          };
          
          localStorage.setItem('googleDriveAccessToken', JSON.stringify(tokenData));
          
          // Get the return URL or default to dashboard
          const returnUrl = localStorage.getItem('oauthReturnUrl') || '/dashboard';
          localStorage.removeItem('oauthReturnUrl');
          
          // Redirect back to the original page
          router.replace(returnUrl);
        } else {
          // Handle error case
          console.error('No access token received');
          router.replace('/dashboard?error=oauth_failed');
        }
      } else if (hash.includes('error=')) {
        // Handle OAuth error
        const params = new URLSearchParams(hash.substring(1));
        const error = params.get('error');
        const errorDescription = params.get('error_description');
        
        console.error('OAuth Error:', error, errorDescription);
        router.replace('/dashboard?error=oauth_denied');
      } else {
        // No valid OAuth response, redirect to dashboard
        router.replace('/dashboard');
      }
    };

    // Small delay to ensure the component is mounted
    const timeout = setTimeout(handleOAuthCallback, 100);
    
    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
      <div className="text-center">
        <Loader className="w-8 h-8 text-white animate-spin mx-auto mb-4" />
        <h2 className="text-white text-xl font-semibold mb-2">Connecting to Google Drive</h2>
        <p className="text-white/70">Please wait while we complete the authorization...</p>
      </div>
    </div>
  );
}
