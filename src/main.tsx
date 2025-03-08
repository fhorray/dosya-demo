import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { DosyaConfig } from '@fhorray/dosya/types';
import {
  createFolder,
  deleteFolder,
  fetchFiles,
  fetchFolders,
} from '../fetch.ts';
import { DosyaProvider } from '@fhorray/dosya';

const config = {
  baseUrl: '/api',
  defaultFolder: '/',
  defaultView: 'grid',
  fetchers: {
    fetchFiles: async ({ folder, limit, page }) =>
      await fetchFiles({ page, limit, folder }),
    fetchFolders: async () => await fetchFolders(),
    onFolderCreate: async (folder) => await createFolder(folder),
    onFolderDelete: async (folder) => await deleteFolder(folder),
    onFileDelete: async () => null,
    onCreateFile: async () => null,
  },
} satisfies DosyaConfig;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DosyaProvider config={config}>
      <App />
    </DosyaProvider>
  </StrictMode>,
);
