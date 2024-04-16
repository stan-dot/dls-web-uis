import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from '@repo/ui/button';

function App() {
  const [count, setCount] = useState(0)
  const m = tomography();

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <h5> hello from the subtitle</h5>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Button appName={'vite'}><p>nothing, but from tomography we get: {m}</p></Button>
    </>
  )
}

export default App
