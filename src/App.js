import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./Dashboard/Dashboard.jsx";
import Source from "./auth2/Index.js";
import Team from "./scenes/team";
import Contacts from "./scenes/contacts";
import Secrets from "./scenes/secrets";
import Form from "./scenes/form";
import Calendar from "./scenes/calendar";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import UpdateSecret from "./scenes/updateSecret";
import CreateSecret from "./scenes/createsecret";
import DetailsSecret from "./scenes/secrets/DetailsSecret.jsx";
import Logout from "./auth2/Logout.js";
import { useUser } from "./scenes/Profile/UserProvider.jsx";
import UserProfile from "./scenes/Profile/UserProfile.jsx";


function App() {
  const { user } = useUser()
  return (
    <Routes>
      {user ? (  // If user is authenticated
        
        <Route path="/" element={<Dashboard />} >
          <Route path="/logout" element={<Logout />} />
        
        {/* <Route path="/" element={<Index />} /> */}
        <Route path="/team" element={<Team />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/secrets" element={<Secrets />} />
        <Route path="/form" element={<Form />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/geography" element={<Geography />} />
        
       <Route path="/createsecret" element={<CreateSecret />} />
       <Route path="/updateSecret" element={<UpdateSecret />} />
       <Route path="/secret/details/:key" element={<DetailsSecret/>} />
       <Route path="/user-profile" element={<UserProfile />} /> 
      
      </Route>
      ) : (
        <>
        <Route path="auth2" element={<Source />} />
        <Route path="*" element={<Navigate to="/auth2" />} />
        </>
      )}
     
     
    </Routes>

  );
}

export default App;
