'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, AlertTriangle, Loader, Trash2 } from 'lucide-react';

const PAGE_DISPLAY_NAMES = {
  'for-biologists': 'Mining 101',
  'for-miners': 'Biology 101',
  'what-is-biomining': 'What Is Biomining?',
  'complex-materials': 'Complex Materials Playbook',
  'flowsheets': 'Example Flowsheets',
  'technology-evaluation': 'Technology Assessment Checklists',
  'research': 'Frontier Challenges',
  'glossary': 'Core Glossary',
  'citations': 'References',
  'contribute-modal': 'Contribute Modal',
};

const displayPageName = (slug) =>
  PAGE_DISPLAY_NAMES[slug] || slug;

export default function AdminCommentsPage() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adminToken, setAdminToken] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [filter, setFilter] = useState('pending'); // pending, approved, all

  useEffect(() => {
    // Check if token is stored
    const storedToken = localStorage.getItem('adminToken');
    if (storedToken) {
      setAdminToken(storedToken);
      loadComments(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const loadComments = async (token) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/admin/comments`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setComments(data);
        setAuthenticated(true);
        localStorage.setItem('adminToken', token);
      } else if (response.status === 401) {
        setAuthenticated(false);
        localStorage.removeItem('adminToken');
        alert('Authentication failed: that admin token was not accepted.');
      } else {
        // The token WAS accepted and something further down failed - most often
        // the comment store being unreachable. Reporting that as an auth failure
        // sends people hunting for a token problem that does not exist, so say
        // what actually happened and keep the token for a retry.
        let detail = '';
        try {
          const data = await response.json();
          if (data && data.error) detail = ` (${data.error})`;
        } catch {
          // response had no JSON body; the status code is enough
        }
        setAuthenticated(false);
        alert(
          `Signed in successfully, but the comments could not be loaded${detail}. ` +
          `The server returned HTTP ${response.status}. This usually means the ` +
          `comment database is unavailable rather than a problem with your token.`
        );
      }
    } catch (error) {
      alert('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = (e) => {
    e.preventDefault();
    loadComments(adminToken);
  };

  const handleModerate = async (page, commentId, action) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/admin/comments`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify({ page, commentId, action })
      });

      if (response.ok) {
        // Reload comments
        await loadComments(adminToken);
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to moderate comment');
      }
    } catch (error) {
      alert('Failed to moderate comment');
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setAdminToken('');
    localStorage.removeItem('adminToken');
  };

  const getFilteredComments = () => {
    return comments.map(pageData => ({
      ...pageData,
      comments: pageData.comments.filter(comment => {
        if (filter === 'pending') return !comment.approved && !comment.rejected;
        if (filter === 'approved') return comment.approved;
        if (filter === 'rejected') return comment.rejected;
        return true; // all
      })
    })).filter(pageData => pageData.comments.length > 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-emerald-400 animate-spin mx-auto mb-4" />
          <p className="text-white text-xl">Loading comments...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 flex items-center justify-center p-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 max-w-md w-full">
          <div className="text-center mb-6">
            <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Admin Authentication</h1>
            <p className="text-slate-300">Enter your admin token to access comment moderation</p>
          </div>

          <form onSubmit={handleAuth}>
            <input
              type="password"
              value={adminToken}
              onChange={(e) => setAdminToken(e.target.value)}
              placeholder="Admin Token"
              className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-4"
              required
            />
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Authenticate
            </button>
          </form>

          <div className="mt-6 p-4 bg-yellow-900/30 border border-yellow-600/50 rounded-lg">
            <p className="text-sm text-yellow-200">
              <strong>Note:</strong> Set ADMIN_TOKEN in your environment variables. For development, you can set it in .env.local
            </p>
          </div>
        </div>
      </div>
    );
  }

  const filteredComments = getFilteredComments();
  const pendingCount = comments.reduce((sum, page) =>
    sum + page.comments.filter(c => !c.approved && !c.rejected).length, 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Comment Moderation</h1>
            <p className="text-emerald-700">
              {pendingCount} pending comment{pendingCount !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'pending'
                ? 'bg-emerald-600 text-white'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
          >
            Pending ({pendingCount})
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'approved'
                ? 'bg-emerald-600 text-white'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'rejected'
                ? 'bg-emerald-600 text-white'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
          >
            Rejected
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-emerald-600 text-white'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
          >
            All
          </button>
        </div>

        {/* Comments by Page */}
        {filteredComments.length === 0 ? (
          <div className="text-center py-12">
            <Clock className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-300 text-xl">No comments to display</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredComments.map(pageData => (
              <div key={pageData.page} className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
                <div className="bg-emerald-900/30 px-6 py-4 border-b border-white/10">
                  <h2 className="text-xl font-bold text-white">
                    {displayPageName(pageData.page)}
                  </h2>
                  <p className="text-xs text-slate-400 font-mono">/{pageData.page}</p>
                  <p className="text-sm text-slate-300">
                    {pageData.comments.length} comment{pageData.comments.length !== 1 ? 's' : ''}
                  </p>
                </div>

                <div className="p-6 space-y-4">
                  {pageData.comments.map(comment => (
                    <div
                      key={comment.id}
                      className="bg-slate-800/50 rounded-lg p-4 border border-slate-600/50"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                              comment.approved
                                ? 'bg-green-900/50 text-green-300'
                                : comment.rejected
                                  ? 'bg-red-900/50 text-red-300'
                                  : 'bg-yellow-900/50 text-yellow-300'
                            }`}>
                              {comment.approved ? 'Approved' : comment.rejected ? 'Rejected' : 'Pending'}
                            </span>
                            <span className="text-xs text-slate-400">
                              {new Date(comment.timestamp).toLocaleString()}
                            </span>
                            <span className="text-xs text-slate-500">
                              IP: {comment.ip}
                            </span>
                          </div>
                          <div className="text-sm text-emerald-300 mb-2">
                            Section: {displayPageName(pageData.page)}
                            {comment.context?.sectionTitle && comment.context.sectionTitle !== 'Main Content'
                              ? ` › ${comment.context.sectionTitle}`
                              : ''}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          {!comment.approved && !comment.rejected && (
                            <>
                              <button
                                onClick={() => handleModerate(pageData.page, comment.id, 'approve')}
                                className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors"
                                title="Approve"
                              >
                                <CheckCircle className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleModerate(pageData.page, comment.id, 'reject')}
                                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
                                title="Reject"
                              >
                                <XCircle className="w-5 h-5" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => {
                              if (window.confirm('Permanently delete this comment?')) {
                                handleModerate(pageData.page, comment.id, 'delete');
                              }
                            }}
                            className="bg-slate-600 hover:bg-slate-700 text-white p-2 rounded-lg transition-colors"
                            title="Delete permanently"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {comment.selectedText && (
                        <div className="mb-3 p-3 bg-slate-700/50 rounded border-l-4 border-emerald-500">
                          <p className="text-xs text-slate-400 mb-1">Selected Text:</p>
                          <p className="text-slate-200 italic">"{comment.selectedText}"</p>
                        </div>
                      )}

                      {comment.comment && (
                        <div>
                          <p className="text-xs text-slate-400 mb-1">Comment:</p>
                          <p className="text-white">{comment.comment}</p>
                        </div>
                      )}

                      {comment.contributor && (
                        <div className="mt-3 p-3 bg-emerald-900/30 rounded border-l-4 border-emerald-400">
                          <p className="text-xs text-emerald-300 font-semibold mb-2">Contributor Interest</p>
                          {comment.contributor.name && (
                            <p className="text-sm text-slate-200"><span className="text-slate-400">Name:</span> {comment.contributor.name}</p>
                          )}
                          {comment.contributor.email && (
                            <p className="text-sm text-slate-200"><span className="text-slate-400">Email:</span> {comment.contributor.email}</p>
                          )}
                          {comment.contributor.description && (
                            <p className="text-sm text-slate-200 mt-1"><span className="text-slate-400">Proposed contribution:</span> {comment.contributor.description}</p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
