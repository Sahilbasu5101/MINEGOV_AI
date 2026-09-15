import { useState, useEffect } from "react";
import "./App.css";
import { LandingPage } from "./views/LandingPage";
import { AccessGateway } from "./views/AccessGateway";
import { RegulatoryGateway } from "./views/RegulatoryGateway";
import { DemoDashboard } from "./views/DemoDashboard";
import MineManagerDashboard from "./pages/MineManager/MineManagerDashboard";

function App() {
  // Read initial route from location hash
  const getInitialView = () => {
    const hash = window.location.hash;
    if (hash === "#demo_mine_manager") {
      return { view: "mineManager", hash };
    }
    if (hash.startsWith("#demo_")) {
      return { view: "dashboard", hash };
    }
    if (
      hash === "#/regulatory-access" ||
      hash === "#/regulatory-gateway" ||
      hash === "#regulatory-access" ||
      hash === "#regulatory-gateway"
    ) {
      return { view: "regulatory", hash };
    }
    if (
      hash === "#/login" ||
      hash === "#/access-gateway" ||
      hash === "#access-gateway"
    ) {
      return { view: "gateway", hash };
    }
    return { view: "home", hash: "" };
  };

  const [routeState, setRouteState] = useState(getInitialView);

  // Sync route on browser forward/back buttons or manual hash modification
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#demo_mine_manager") {
        setRouteState({ view: "mineManager", hash });
      } else if (hash.startsWith("#demo_")) {
        setRouteState({ view: "dashboard", hash });
      } else if (
        hash === "#/regulatory-access" ||
        hash === "#/regulatory-gateway" ||
        hash === "#regulatory-access" ||
        hash === "#regulatory-gateway"
      ) {
        setRouteState({ view: "regulatory", hash });
      } else if (
        hash === "#/login" ||
        hash === "#/access-gateway" ||
        hash === "#access-gateway"
      ) {
        setRouteState({ view: "gateway", hash });
      } else if (hash === "" || hash === "#/" || hash === "#top") {
        setRouteState({ view: "home", hash: "" });
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleEnterMineGov = () => {
    window.location.hash = "#/access-gateway";
    setRouteState({ view: "gateway", hash: "#/access-gateway" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEnterRegulatory = () => {
    window.location.hash = "#/regulatory-access";
    setRouteState({ view: "regulatory", hash: "#/regulatory-access" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToHome = () => {
    window.location.hash = "#/";
    setRouteState({ view: "home", hash: "#/" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToGateway = () => {
    if (routeState.hash.startsWith("#demo_regulatory_")) {
      window.location.hash = "#/regulatory-access";
      setRouteState({ view: "regulatory", hash: "#/regulatory-access" });
    } else {
      window.location.hash = "#/access-gateway";
      setRouteState({ view: "gateway", hash: "#/access-gateway" });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigateToDashboard = (redirectHash) => {
    window.location.hash = redirectHash;
    setRouteState({ view: "dashboard", hash: redirectHash });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (routeState.view === "dashboard") {
    return (
      <DemoDashboard
        currentHash={routeState.hash}
        onBackToGateway={handleBackToGateway}
        onBackToHome={handleBackToHome}
      />
    );
  }

  if (routeState.view === "mineManager") {
    return <MineManagerDashboard />;
  }

  if (routeState.view === "regulatory") {
    return (
      <RegulatoryGateway
        onNavigateToHome={handleBackToHome}
        onNavigateToDashboard={handleNavigateToDashboard}
      />
    );
  }

  if (routeState.view === "gateway") {
    return (
      <AccessGateway
        onNavigateToHome={handleBackToHome}
        onNavigateToDashboard={handleNavigateToDashboard}
      />
    );
  }

  return (
    <LandingPage
      onEnterMineGov={handleEnterMineGov}
      onEnterRegulatory={handleEnterRegulatory}
    />
  );
}

export default App;
