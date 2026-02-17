import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import SettingsPage from "./SettingsPage";

export default function Layout() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <Navigation toggleSettings={() => setShowSettings(prev => !prev)} />      

      <SettingsPage
        visible={showSettings}
        onClose={() => setShowSettings(false)}
      />

      <main>
        <Outlet />
      </main>
    </div>
  );
}
