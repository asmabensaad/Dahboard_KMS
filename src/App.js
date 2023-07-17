import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./Dashboard/Dashboard.jsx";
import Source from "./auth2/Index.js";
import First from "./auth/First.jsx";
import Index from "./scenes/dashboard";
import Team from "./scenes/team";
import Contacts from "./scenes/contacts";
import Secrets from "./scenes/secrets";
import Form from "./scenes/form";
import Calendar from "./scenes/calendar";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";


function App() {

  return (
 

    <Routes>
        <Route path="auth2" element={<Source />} />
        <Route path="/" element={<Dashboard />} >
        {/* <Route path="/" element={<Index />} /> */}
        <Route path="/team" element={<Team />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/secrets" element={<Secrets />} />
        <Route path="/form" element={<Form />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/geography" element={<Geography />} />
        {/* <Route path="*" element={<Navigate to={"/"} />} /> */}
      </Route>
      <Route path="auth" element={<First />} />
     
    </Routes>

  );
}

export default App;
