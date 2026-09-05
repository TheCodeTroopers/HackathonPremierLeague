export default function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body || {};
    const expectedEmail = process.env.ADMIN_EMAIL || 'admin@hpl';
    const expectedPassword = process.env.ADMIN_PASSWORD || 'admin@123';

    if (email && email.trim().toLowerCase() === expectedEmail.toLowerCase() && password === expectedPassword) {
      return res.status(200).json({
        success: true,
        token: 'hpl_adm_token_' + Buffer.from(email + ':' + Date.now()).toString('base64'),
        user: { email: expectedEmail, role: 'administrator' }
      });
    }

    return res.status(401).json({
      success: false,
      error: 'Invalid administrator email or password.'
    });
  } catch (e) {
    return res.status(400).json({ success: false, error: 'Malformed request payload' });
  }
}
