import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "./provider/AuthProvider.tsx";
import { PersistentLogin } from "./provider/PersistentLogin.tsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider>
            <PersistentLogin>
                <App />
            </PersistentLogin>
        </AuthProvider>
    </React.StrictMode>
);
