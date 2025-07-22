import React, { useState } from 'react';
import Search from './autoComplete';
import './style.css';

export default function App() {
  const [code, setCode] = useState(`function Test () { return "hello"}`);
  return (
    <Search />
  );
}
