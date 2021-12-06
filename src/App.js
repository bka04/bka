import { useState } from "react";

import Header from "./components/Layout/Header";
import Author from "./components/Author/Author";

function App() {
  const [activeContent, setActiveContent] = useState('Author');
  const contentChangeHandler = (content) => {
    setActiveContent(content);
  }

  return (
    <div>
      <Header activeContent={activeContent} onContentChange={contentChangeHandler} />
      {activeContent === 'Author' && <Author />}
    </div>
  );
}

export default App;
