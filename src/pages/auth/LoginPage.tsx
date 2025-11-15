// src/pages/auth/LoginPage.tsx
import React from "react";
import LoginForm from "../../components/auth/LoginForm";
import { AppShell } from "../../components/layout/AppShell";

const LoginPage: React.FC = () => {
  return (
    <AppShell>
      <div className="max-w-3xl mx-auto py-12">
        <LoginForm />
      </div>
    </AppShell>
  );
};

export default LoginPage;
