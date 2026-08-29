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
  // Silent fallback if paths differ
}

export default defineConfig({
  plugins: [react()],
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

