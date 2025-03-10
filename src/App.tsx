import { useDosya } from '@fhorray/dosya';
import {
  DosyaGrid,
  DosyaTree,
  Filters,
  FolderSelector,
  Header,
  UploadFileButton,
} from '@fhorray/dosya/ui';
import { UploadIcon } from 'lucide-react';

function App() {
  const { context, filters, folders } = useDosya();

  console.log(folders.current);

  return (
    <main className="flex gap-4 w-full">
      {/* SIDEBAR */}
      <aside className="w-full bg-white  max-w-[20%] border-r-2 border-gray-200 p-4 h-screen overflow-y-auto fixed space-y-4">
        {/* ERROR */}
        {context.error.message && (
          <div className="bg-red-500 text-white p-2 rounded">
            {context.error.message}
          </div>
        )}

        <UploadFileButton>
          <UploadIcon />
          New File
        </UploadFileButton>

        <FolderSelector
          onSelect={(folder) => {
            folders.setCurrent(folder);
          }}
        />
        <DosyaTree />
      </aside>

      <section className="w-full max-w-[80%] ml-[20%] flex flex-col">
        {/* HEADER */}
        <Header
          currentView={context.config.viewMode.default}
          setView={context.config.viewMode.set}
        />

        {/* FILTERS */}
        <div className="w-full px-4">
          <span>{`search: ${filters.search?.name}`}</span>
        </div>
        <Filters />

        {/* GRID */}
        <div className="w-full p-4">
          <DosyaGrid />
        </div>
      </section>
    </main>
  );
}

export default App;
