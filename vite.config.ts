import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

// Auto-sync generated & uploaded assets directly into src/assets/
const generatedImgPath = 'C:/Users/User/.gemini/antigravity/brain/1d124332-b4c7-43d0-8afd-7d8cccbfabd4/ps3_internship_aggregator_1787999259219.jpg';
const destImgPath = path.resolve(__dirname, 'src/assets/ps3_internship_aggregator.jpg');

const uploadedPosterPath = 'C:/Users/User/.gemini/antigravity/brain/1d124332-b4c7-43d0-8afd-7d8cccbfabd4/.user_uploaded/media_1787999137530.jpg';
const destPosterPath = path.resolve(__dirname, 'src/assets/ps_original_mock.jpg');

try {
  if (fs.existsSync(generatedImgPath)) {
    fs.copyFileSync(generatedImgPath, destImgPath);
  }
  if (fs.existsSync(uploadedPosterPath)) {
    fs.copyFileSync(uploadedPosterPath, destPosterPath);
  }
} catch (e) {
  // Silent fallback
}

// Auto-sync admin illustration assets directly into src/assets/
const adminEvalSrc = 'C:/Users/User/.gemini/antigravity/brain/d5d05f19-e8b9-48f2-bd0b-aca1f084736d/admin_team_evaluation_1788626880689.jpg';
const adminEvalDest = path.resolve(__dirname, 'src/assets/hpl_admin_eval_art.jpg');
const adminBadgeSrc = 'C:/Users/User/.gemini/antigravity/brain/d5d05f19-e8b9-48f2-bd0b-aca1f084736d/admin_clipboard_badge_1788626900712.jpg';
const adminBadgeDest = path.resolve(__dirname, 'src/assets/hpl_admin_clipboard_badge.jpg');

try {
  if (fs.existsSync(adminEvalSrc) && !fs.existsSync(adminEvalDest)) {
    fs.copyFileSync(adminEvalSrc, adminEvalDest);
  }
  if (fs.existsSync(adminBadgeSrc) && !fs.existsSync(adminBadgeDest)) {
    fs.copyFileSync(adminBadgeSrc, adminBadgeDest);
  }
} catch (e) {
  // Silent fallback
}

// Backend Server Environment Reader
function loadEnvBackend() {
  try {
    const envContent = fs.readFileSync(path.resolve(__dirname, '.env'), 'utf-8');
    const env: Record<string, string> = {};
    envContent.split('\n').forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        let val = (match[2] || '').trim();
        if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
        if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
        env[match[1]] = val;
      }
    });
    return env;
  } catch (e) {
    return {};
  }
}

// Backend Authentication Plugin - Credentials strictly verified on server
const adminAuthBackendPlugin = () => ({
  name: 'hpl-admin-backend-auth',
  configureServer(server: any) {
    server.middlewares.use((req: any, res: any, next: any) => {
      const url = req.originalUrl || req.url || '';
      if (url.includes('/api/admin/login')) {
        if (req.method === 'OPTIONS') {
          res.statusCode = 200;
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
          res.end();
          return;
        }
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const { email, password } = JSON.parse(body);
              const env = loadEnvBackend();
              const expectedEmail = env.ADMIN_EMAIL || process.env.ADMIN_EMAIL || 'admin@hpl';
              const expectedPassword = env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || 'admin@123';

              if (email && email.trim().toLowerCase() === expectedEmail.toLowerCase() && password === expectedPassword) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                  success: true,
                  token: 'hpl_adm_token_' + Buffer.from(email + ':' + Date.now()).toString('base64'),
                  user: { email: expectedEmail, role: 'administrator' }
                }));
              } else {
                res.statusCode = 401;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                  success: false,
                  error: 'Invalid administrator email or password.'
                }));
              }
            } catch (err) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: 'Malformed request payload' }));
            }
          });
          return;
        }
      }
      next();
    });
  }
});

export default defineConfig({
  plugins: [react(), adminAuthBackendPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-dom/client',
      '@supabase/supabase-js',
      'lucide-react',
      'gsap'
    ]
  },
  server: {
    port: 3000,
    open: true,
    host: true,
    allowedHosts: true,
    fs: {
      allow: [
        '..',
        'C:/Users/User/.gemini/antigravity/brain'
      ]
    }
  }
})

