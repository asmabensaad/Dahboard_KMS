import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";
import Dashboard from "../scenes/dashboard";
import Topbar from "../scenes/global/Topbar";
import Sidebar from "../scenes/global/Sidebar";
import Team from "../scenes/team";
import Contacts from "../scenes/contacts";
import Secrets from "../scenes/secrets";
import Form from "../scenes/form";
import Calendar from "../scenes/calendar";
import FAQ from "../scenes/faq";
import Geography from "../scenes/geography";

function Index() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='app'>
        <Sidebar />
        <main className='content'>
          <Topbar />
            <Outlet/>
        </main>
      </div>
    </ThemeProvider>
  </ColorModeContext.Provider>
  )
}

export default Index