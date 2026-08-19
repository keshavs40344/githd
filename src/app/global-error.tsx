'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="hi">
      <body className="bg-[#030305] text-[#fef9e0] min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#08080f] border border-[#e8a320]/40 rounded-3xl p-8 text-center space-y-5">
          <div className="text-3xl font-bold text-[#f4be45]">ॐ</div>
          <h2 className="text-lg font-bold">Dharma.OS System Recovery</h2>
          <p className="text-xs text-[#fdedb8]/70">
            A critical system fault was recovered gracefully.
          </p>
          <button
            onClick={() => reset()}
            className="w-full py-3 rounded-2xl bg-[#e8a320] text-[#030305] font-bold text-xs"
          >
            पुनः लोड करें (Reload)
          </button>
        </div>
      </body>
    </html>
  );
}
