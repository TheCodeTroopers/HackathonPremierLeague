import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

// Auto-sync generated artifacts into src/assets/ for seamless bundling
try {
  const headerSrc = 'C:/Users/User/.gemini/antigravity/brain/a46dd85b-502a-48b0-9342-5dfb255eb844/timeline_header_artwork_1787921275328.jpg';
  const headerDest = path.resolve(__dirname, './src/assets/hpl_timeline_header.jpg');
  if (fs.existsSync(headerSrc)) {
    fs.copyFileSync(headerSrc, headerDest);
  }

  const champsSrc = 'C:/Users/User/.gemini/antigravity/brain/a46dd85b-502a-48b0-9342-5dfb255eb844/timeline_champions_artwork_1787921294088.jpg';
  const champsDest = path.resolve(__dirname, './src/assets/hpl_timeline_champions.jpg');
  if (fs.existsSync(champsSrc)) {
    fs.copyFileSync(champsSrc, champsDest);
  }

  const footerSrc = 'C:/Users/User/.gemini/antigravity/brain/a46dd85b-502a-48b0-9342-5dfb255eb844/hpl_footer_brush_bg_1787924380508.jpg';
  const footerDest = path.resolve(__dirname, './src/assets/hpl_timeline_footer_bg.jpg');
  if (fs.existsSync(footerSrc)) {
    fs.copyFileSync(footerSrc, footerDest);
  }
} catch (e) {
  console.warn('Artifact copy note:', e);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@artifacts': 'C:/Users/User/.gemini/antigravity/brain/a46dd85b-502a-48b0-9342-5dfb255eb844',
      '@artifacts_old': 'C:/Users/User/.gemini/antigravity/brain/bf7d7bef-3dac-4af0-96b7-7cc75b2bc764'
    }
  },
  server: {
    port: 3000,
    open: true,
    fs: {
      strict: false,
      allow: [
        'D:/HPL',
        'C:/Users/User/.gemini/antigravity/brain/a46dd85b-502a-48b0-9342-5dfb255eb844',
        'C:/Users/User/.gemini/antigravity/brain/bf7d7bef-3dac-4af0-96b7-7cc75b2bc764'
      ]
    }
  }
})
