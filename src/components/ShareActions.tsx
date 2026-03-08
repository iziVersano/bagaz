'use client';

import { useState } from 'react';

interface ShareActionsProps {
  shareText: string;
}

export default function ShareActions({ shareText }: ShareActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: 'בג״צומטר — תוצאת הסימולציה',
          text: shareText,
        });
      } catch {
        // user cancelled
      }
    }
  };

  const canShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  return (
    <div className="flex gap-3">
      <button
        onClick={handleCopy}
        className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-gray-600 bg-gray-800 hover:bg-gray-700 text-white text-sm py-3 transition-colors"
      >
        {copied ? (
          <>
            <span>✓</span>
            <span>הועתק!</span>
          </>
        ) : (
          <>
            <span>📋</span>
            <span>העתק קישור</span>
          </>
        )}
      </button>
      {canShare && (
        <button
          onClick={handleNativeShare}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-blue-600 bg-blue-700 hover:bg-blue-600 text-white text-sm py-3 transition-colors"
        >
          <span>🔗</span>
          <span>שתף</span>
        </button>
      )}
    </div>
  );
}
