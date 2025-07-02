'use client';

import { useState } from 'react';
import PhotoViewer from './photoviewer';


export default function Home() {
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const HandleDirectoryPicker = (e: React.ChangeEvent<HTMLInputElement>) => {

    const files = e.target.files;
    if (!files) return;

    const images = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );

    setImageFiles(images);
  }

  return (
    <div className="">
      <header className="bg-black text-white p-4 font-bold align-middle font-[family-name:var(--font-geist-sans)] ">
        Gallery
      </header>
      <div className="flex h-screen">
        <div className="m-auto">
          {imageFiles.length == 0 ? (
          <>
            <label htmlFor="dir-upload" className='text-5xl' > 📁 Select a folder</label>
            <input id="dir-upload" name='picker' type='file' webkitdirectory="true"
              directory="true" multiple accept='image/*' className='hidden'
              onChange={HandleDirectoryPicker} />
          </>
          ): (
            <PhotoViewer imageFiles={imageFiles}/>
          )}
        </div>
      </div>

      <footer className="">
        <p>This is footer</p>
      </footer>
    </div>
  );
}
