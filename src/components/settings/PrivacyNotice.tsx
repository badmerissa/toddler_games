'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function PrivacyNotice() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full text-left py-4 border-b border-slate-100 flex items-center justify-between group"
      >
        <div>
          <p className="font-semibold text-slate-800 text-sm">Privacy Notice</p>
          <p className="text-slate-400 text-xs mt-0.5">How we handle your data</p>
        </div>
        <span className="text-indigo-500 text-sm font-semibold group-hover:text-indigo-700 transition-colors">
          View →
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Sheet */}
            <motion.div
              className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl max-h-[85dvh] overflow-y-auto shadow-2xl"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 bg-slate-200 rounded-full" />
              </div>

              <div className="px-6 pb-10 pt-2">
                <h2 className="text-xl font-black text-slate-800 mb-6">Privacy Notice</h2>

                {[
                  {
                    q: 'What data do we collect?',
                    a: 'Nothing. We do not collect any personal information about you or your child. There are no forms, no sign-ups, and no data ever leaves your device.',
                  },
                  {
                    q: "Where is my child's progress stored?",
                    a: "All colouring progress and settings are saved in your browser's local storage — a private area on your own device. This data never leaves your device and is not accessible to us or any third party.",
                  },
                  {
                    q: 'Do you use analytics or tracking?',
                    a: 'No. There are no analytics scripts, no tracking pixels, no advertising cookies, and no third-party services of any kind embedded in this app.',
                  },
                  {
                    q: 'Do you use cookies?',
                    a: 'No cookies are set. We use browser local storage only, which is not transmitted with network requests.',
                  },
                  {
                    q: 'Is an internet connection required?',
                    a: 'Only for the initial page load. Once loaded, the app works fully offline. Your child can play without a connection.',
                  },
                  {
                    q: 'What happens if I clear my browser data?',
                    a: "All saved progress and settings will be removed, as they were only ever stored locally on your device. There is no cloud backup — this is intentional to protect your child's privacy.",
                  },
                ].map(({ q, a }) => (
                  <div key={q} className="mb-5">
                    <h3 className="font-black text-slate-700 text-sm mb-1">{q}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{a}</p>
                  </div>
                ))}

                <button
                  onClick={() => setOpen(false)}
                  className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-3 rounded-2xl transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
