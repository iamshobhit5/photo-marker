'use client';

import { useState } from 'react';


export default function Home() {
  const [files, setFiles] = useState([]);

  async function folderSelectionHandler(e: React.SyntheticEvent) {
    e.preventDefault();

    const dirHandle = await window.showDirectoryPicker();
    const fileList = [];

  }

  return (
    <div className="">
      <header className="bg-black text-white p-4 font-bold align-middle font-[family-name:var(--font-geist-sans)] ">
        Gallery
      </header>
      <div className="flex h-screen">
        <div className="m-auto">
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" type="button" onClick={folderSelectionHandler}>
            Choose a location:
          </button>
        </div>
      </div>

      <footer className="">
        <p>This is footer</p>
      </footer>
    </div>
  );
}
