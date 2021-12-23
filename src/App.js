import { useState } from "react";

import Header from "./components/Layout/Header";
import Author from "./components/Author/Author";
import Games from "./components/Games/Games";

function App() {
  const [activeContent, setActiveContent] = useState('Author');
  const contentChangeHandler = (content) => {
    setActiveContent(content);
  }

  return (
    <div>
      <Header activeContent={activeContent} onContentChange={contentChangeHandler} />
      {activeContent === 'Author' && <Author />}
      {activeContent === 'Games' && <Games />}
    </div>
  );
}

export default App;
