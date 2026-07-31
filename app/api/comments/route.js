import { NextResponse } from 'next/server';
import { addComment } from '../lib/storage';

// Configuration
const COMMENT_MAX_LENGTH = parseInt(process.env.COMMENT_MAX_LENGTH || '500');

// POST - Submit a new comment
export async function POST(request) {
  try {
    const body = await request.json();

    // Validate comment data
    if (!validateComment(body)) {
      return NextResponse.json(
        { error: `Invalid comment data. Required: ${requiredFields(body).join(', ')}` },
        { status: 400 }
      );
    }

    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for');
    const clientIp = forwarded ? forwarded.split(',')[0].trim() : 'unknown';

    // Sanitize comment
    const sanitizedComment = sanitizeComment(body, clientIp);

    const page = sanitizedComment.pageName;

    // Add comment
    await addComment(page, sanitizedComment);

    return NextResponse.json({
      success: true,
      message: 'Comment submitted successfully! It will appear after moderation.',
      id: sanitizedComment.id
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit comment' },
      { status: 500 }
    );
  }
}

// A general offer to help (the Contribute button in the nav, footer and
// homepage) is not anchored to a passage, so it carries no selectedText.
// Submissions from the in-page annotation flow always do.
function requiredFields(comment) {
  const base = ['comment', 'pageName', 'context'];
  return comment.contributor ? base : ['selectedText', ...base];
}

function validateComment(comment) {
  return requiredFields(comment).every(
    field => field in comment && String(comment[field]).trim()
  );
}

function sanitizeComment(comment, clientIp) {
  const sanitized = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    selectedText: String(comment.selectedText || '').trim().slice(0, COMMENT_MAX_LENGTH),
    comment: String(comment.comment).trim().slice(0, COMMENT_MAX_LENGTH),
    pageName: String(comment.pageName).toLowerCase().trim(),
    context: {
      sectionTitle: String(comment.context?.sectionTitle || 'Unknown Section').trim().slice(0, 200),
      selectedText: String(comment.selectedText || '').trim().slice(0, COMMENT_MAX_LENGTH)
    },
    timestamp: new Date().toISOString(),
    approved: false,
    ip: clientIp
  };

  if (comment.contributor) {
    sanitized.contributor = {
      name: String(comment.contributor.name || '').trim().slice(0, 200),
      email: String(comment.contributor.email || '').trim().slice(0, 200),
      description: String(comment.contributor.description || '').trim().slice(0, COMMENT_MAX_LENGTH)
    };
  }

  return sanitized;
}

