const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com', 'guerrillamail.com', 'guerrillamail.net', 'guerrillamail.org',
  'guerrillamail.biz', 'guerrillamail.de', 'sharklasers.com', 'grr.la',
  '10minutemail.com', '10minutemail.net', 'tempmail.com', 'temp-mail.org',
  'temp-mail.io', 'yopmail.com', 'yopmail.net', 'throwawaymail.com',
  'maildrop.cc', 'fakeinbox.com', 'trashmail.com', 'trashmail.net',
  'getairmail.com', 'mohmal.com', 'nada.email', 'getnada.com', 'mailnesia.com',
  'emailondeck.com', 'spambog.com', 'mailsac.com', 'pokemail.net',
  'dispostable.com', 'mintemail.com', 'spamgourmet.com', 'mailcatch.com',
  'mvrht.net', 'tempinbox.com', 'mytemp.email', 'inboxbear.com',
  'discard.email', 'mailtemp.info', 'tempmailo.com', 'fakemail.net',
  'spam4.me', 'tmpmail.org', 'mailpoof.com', 'emailfake.com',
]);

const json = (body, status) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export async function POST(request) {
  const body = await request.json();
  const { email: rawEmail, Address } = body;

  // Honeypot: real users never fill this. Return success so bots don't retry.
  if (Address) return json({ success: true }, 200);

  const email = typeof rawEmail === 'string' ? rawEmail.trim() : '';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'Invalid email' }, 400);
  }

  const [localPart, domain] = email.toLowerCase().split('@');

  // Gmail dot-trick: bots generate addresses like sw.an.s.mel.in.1.9.9.7@gmail.com
  // to bypass dedup since Gmail ignores dots. >3 dots in the local part is bot-signature.
  if ((localPart.match(/\./g) || []).length > 3) {
    return json({ success: true }, 200);
  }

  // Disposable / throwaway inboxes used for one-off signups.
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return json({ success: true }, 200);
  }

  // WordPress's own form handler, on the main site. The old api.homeworld.bio
  // hostname is a stale DNS record with no certificate, so it fails the TLS
  // handshake before reaching anything. Same handler the homeworld.bio
  // newsletter box posts to.
  const response = await fetch('https://www.homeworld.bio/api/forms/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, Address: '' }),
  });

  const data = await response.text();

  return new Response(data, {
    status: response.status,
    headers: { 'Content-Type': response.headers.get('Content-Type') || 'application/json' },
  });
}
