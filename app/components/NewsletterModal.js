'use client';

import React, { useState } from 'react';
import { X, Send, AlertCircle } from 'lucide-react';
import { track } from '@vercel/analytics';

export default function NewsletterModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, Address: '' })
      });

      if (response.ok) {
        track('Newsletter Signup', { source: 'handbook-modal' });
        setSubmitMessage({ type: 'success', text: "You've been subscribed. Thank you!" });
        setEmail('');
        setTimeout(() => {
          setSubmitMessage(null);
          onClose();
        }, 2000);
      } else {
        setSubmitMessage({ type: 'error', text: 'Failed to subscribe. Please try again.' });
      }
    } catch (error) {
      setSubmitMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#264563]">Newsletter Sign Up</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-[#264563] mb-5">
          Subscribe to stay up to date with Homeworld Collective.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full p-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
            required
          />

          {submitMessage && (
            <div className={`p-3 rounded-lg text-sm flex items-start gap-2 ${
              submitMessage.type === 'success'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{submitMessage.text}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white px-4 py-3 rounded-lg transition-colors font-medium"
          >
            {isSubmitting ? 'Signing up...' : 'Sign Up'}
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
