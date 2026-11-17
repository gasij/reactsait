import React from 'react';
// The four-petal divider used throughout the supplied identity PDF.
export function FolkFlower({ className = '' }) {
  return <svg className={className} viewBox="0 0 100 100" fill="currentColor" aria-hidden="true"><path d="M50 6C34 23 34 36 44 44C36 34 23 34 6 50C23 66 36 66 44 56C34 64 34 77 50 94C66 77 66 64 56 56C64 66 77 66 94 50C77 34 64 34 56 44C66 36 66 23 50 6Z"/></svg>;
}
