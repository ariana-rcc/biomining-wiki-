'use client';

import React, { useState } from 'react';
import { X, Send, AlertCircle } from 'lucide-react';
import { track } from '@vercel/analytics';

export default function ContributeModal({ isOpen, onClose }) {
  const [contributorName, setContributorName] = useState('');
  const [contributorEmail, setContributorEmail] = useState('');
  const [contributorDescription, setContributorDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (contributorDescription.trim().length < 5) {
      setSubmitMessage({ type: 'error', text: 'Please describe your proposed contribution (at least 5 characters).' });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedText: '',
          comment: 'Interested in contributing to the handbook.',
          pageName: 'contribute-modal',
          context: { sectionTitle: 'Contribute Button' },
          contributor: {
            name: contributorName,
            email: contributorEmail,
            description: contributorDescription
          }
        })
      });

      const text = await response.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        throw new Error(`Server returned invalid response: ${text.slice(0, 100)}`);
      }

      if (response.ok) {
        track('Contributor Signup', { source: 'modal' });
        setSubmitMessage({ type: 'success', text: data.message || 'Thank you! We\'ll be in touch.' });
        setContributorName('');
        setContributorEmail('');
        setContributorDescription('');
        setTimeout(() => {
          setSubmitMessage(null);
          onClose();
        }, 2000);
      } else {
        setSubmitMessage({ type: 'error', text: data.error || 'Failed to submit. Please try again.' });
      }
    } catch (error) {
      setSubmitMessage({ type: 'error', text: `Error: ${error.message}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#264563]">Interested in Contributing?</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-[#264563] mb-5">
          Whether it's adding a new section, expanding existing content, contributing real-world examples, or reviewing for accuracy — let us know what you have in mind.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            value={contributorDescription}
            onChange={(e) => setContributorDescription(e.target.value)}
            placeholder="Briefly describe your proposed contribution..."
            className="w-full p-3 border border-slate-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
            rows="3"
            required
          />
          <input
            type="text"
            value={contributorName}
            onChange={(e) => setContributorName(e.target.value)}
            placeholder="Your name"
            className="w-full p-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
            required
          />
          <input
            type="email"
            value={contributorEmail}
            onChange={(e) => setContributorEmail(e.target.value)}
            placeholder="Your email"
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
            {isSubmitting ? 'Submitting...' : 'Submit'}
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
