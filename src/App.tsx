import { useDosya } from '@fhorray/dosya';
import { UploadIcon } from 'lucide-react';
import { useEffect } from 'react';
import { DosyaTree } from './components/dosya-tree';
import { Header } from './components/grid/header';
import { Filters } from './components/filters';
import { DosyaGrid } from './components/grid';

function App() {
  const { files, folders, context, uploader, filters } = useDosya();

  // useeffect to set images
  useEffect(() => {
    // fetch images
    const fetchData = async () => {
      files.setList({
        folder: context.config.defaultFolder,
        limit: 10,
        page: 1,
      }),
        folders.setList('root');
    };

    fetchData();
  }, []);

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

        <button
          className="w-full rounded-md  text-white"
          onClick={() => {
            uploader.toggle();
          }}
        >
          <UploadIcon />
          Upload File
        </button>
        <DosyaTree />
      </aside>

      <main className="w-full max-w-[80%] ml-[20%] flex flex-col">
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
      </main>
    </main>
  );
}

export default App;
