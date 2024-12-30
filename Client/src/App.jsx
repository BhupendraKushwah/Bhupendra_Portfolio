import {React,lazy} from "react";
import './App.css';
import './output.css';
const Route = lazy(() => import("./Route/index"));
function App() {
  return (
   <Route/>
  );
}

export default App;
