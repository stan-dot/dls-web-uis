import { Stack } from "@mui/material";
import './App.css';
import { CountButton } from './components/CountButton';
import DataSideBar from "./components/data-entry/dataSideBar";
import CentrePlot from "./plot/centrePlot";
import diamondLogo from '/assets/images/diamond.svg';

function App() {

  return (
    <>
      <div>
        <a href="https://intranet.diamond.ac.uk/Home.html" target="_blank">
          <img src={diamondLogo} className="logo" alt="Diamond Web logo" />
        </a>
      </div>
      <h1>Dedi app</h1>
        <Stack direction={"row"} spacing={1} margin={1}>
            <DataSideBar />
            <CentrePlot />
        </Stack>
      <div className="card">
        <CountButton />
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App



