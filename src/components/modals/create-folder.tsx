import { useState } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Loader2Icon } from 'lucide-react';
import { useDosya } from '@fhorray/dosya';
import { DosyaFolder } from '@fhorray/dosya/types';
import { createId } from '@fhorray/dosya/utils';
import { cn } from '../../lib/utils';

type CreateFolderProps = {
  children: React.ReactNode;
  // onCreate: () => void | Promise<void | DosyaFolder | null>;
  // onCreateOptions?: Options<DosyaFolder> | undefined;
};

export const CreateFolder = ({ children }: CreateFolderProps) => {
  const [folderName, setFolderName] = useState('');
  const [color, setColor] = useState('#6366F1');

  const { folders, context } = useDosya();

  if (!folders.modal.isOpen) return null;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newFolder: DosyaFolder = {
      id: createId(),
      name: folderName,
      key:
        folders.current?.key !== undefined
          ? `${folders.current?.key}/${folderName}`
          : folderName,
      parentId: folders.current?.id,
      metadata: {
        color,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };

    // execute function to create folder
    folders.create(newFolder, {
      onSuccess: () => {
        folders.modal.toggle();
      },
    });
  };

  return (
    <Dialog open={folders.modal.isOpen} onOpenChange={folders.modal.toggle}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogTitle className="text-xl font-semibold mb-4">
          Create New Folder
        </DialogTitle>

        <div className="relative">
          {context.state.loading && (
            <Loader2Icon
              className="animate-spin absolute top-1/3 left-[50%] -translate-x-[50%]"
              size={30}
            />
          )}

          <form
            onSubmit={onSubmit}
            className={cn(
              '',
              context.state.loading && 'opacity-35 pointer-events-none',
            )}
          >
            <div className="mb-4">
              <label
                htmlFor="folderName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Folder Name
              </label>
              <input
                type="text"
                id="folderName"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter folder name"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="folderColor"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Folder Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  id="folderColor"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-10 h-10 rounded-md cursor-pointer"
                />
                <span className="text-sm text-gray-500">
                  Choose a color for your folder
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                onClick={folders.modal.toggle}
                variant={'ghost'}
              >
                Cancel
              </Button>
              <Button type="submit">Create Folder</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
