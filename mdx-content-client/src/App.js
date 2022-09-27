import React, { useState, useEffect } from 'react';
import './App.css';

import {compile, run} from "@mdx-js/mdx"
import * as runtime from 'react/jsx-runtime'

function App() {
  const [contentList, setContentList] = useState([])
  const [currentContent, setCurrentContent] = useState(<h1>Click on side menu to load the content</h1>)

  useEffect(() => {
    fetch("http://localhost:3001/content")
      .then(res => res.json())
      .then(setContentList)
  }, []);

  const renderContent = async (content) => {
    const code = String(await compile(content.content, {outputFormat: 'function-body'}))
    const {default: Content} = await run(code, runtime)
    setCurrentContent(Content)
  }

  return (
    <div className="App">
      <div className="Menu">
        {contentList.map(content => <button key={content.title} onClick={()=> {renderContent(content)}}>{content.title}</button>)}
      </div>
      <div>
        {currentContent}
      </div>      
    </div>
  );
}

export default App;
