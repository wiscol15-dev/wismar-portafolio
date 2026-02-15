import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Loader2, X, AlertCircle, Cpu, Chrome, Apple } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { s } from "./login-styles";
import MetaTags from "@/components/seo/MetaTags";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login, loginWithGoogle, loginWithApple } = useAuth();

  const createLog = async (userEmail: string | null) => {
    try {
      await addDoc(collection(db, "security_logs"), {
        action: "Inicio_Sesion_Validado",
        user: userEmail || "Anonymous_Node",
        status: "Success",
        timestamp: serverTimestamp(),
      });
      console.log("AUDITORÍA: Evento de acceso persistido en Cloud.");
    } catch (err) {
      console.error("FALLO_AUDITORIA_LOG:", err);
    }
  };

  const redirectToHome = () => {
    navigate("/", { replace: true });
    console.log("SISTEMA: Identidad validada. Redirigiendo a Nodo_Principal.");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const userCredential = await login(email, password);
      await createLog(userCredential.user.email);
      redirectToHome();
    } catch (err: any) {
      console.error("FALLO_AUTENTICACIÓN:", err.message);
      setError(
        "ERROR 403: Credenciales no reconocidas en el servidor central.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (method: "google" | "apple") => {
    setError("");
    setIsLoading(true);
    try {
      const userCredential = await (method === "google"
        ? loginWithGoogle()
        : loginWithApple());
      await createLog(userCredential.user.email);
      redirectToHome();
    } catch (err: any) {
      console.error(`ERROR_AUTH_${method.toUpperCase()}:`, err.message);
      setError(
        `ERROR 401: Fallo en la sincronización con el nodo ${method.toUpperCase()}.`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <MetaTags
        title="Acceso Root"
        description="Panel de autenticación segura para el ecosistema Wismar.Dev. Acceso restringido a nodos autorizados."
      />

      <div className={s.mainWrapper}>
        <div className={s.authCard}>
          {/* ACCESIBILIDAD: Añadido aria-label para que los lectores de pantalla entiendan la acción de la X */}
          <button
            onClick={() => navigate("/")}
            className={s.closeBtn}
            aria-label="Cerrar y volver al inicio"
          >
            <X size={20} />
          </button>

          <div className={s.terminalBar}>
            <div className="flex gap-2">
              <div className={s.terminalDotRed} aria-hidden="true" />
              <div className={s.terminalDotYellow} aria-hidden="true" />
              <div className={s.terminalDotGreen} aria-hidden="true" />
            </div>
            <div className={s.terminalText}>bash --login --audit-sync-v3</div>
          </div>

          <div className={s.formPadding}>
            <div className={s.headerBox}>
              <h1 className={s.titleH1}>
                ACCESO <span className="text-[#44d62c]">ROOT_</span>
              </h1>
              <p className={s.statusSub}>// Cloud_Auth_Active [Funchal_Node]</p>
            </div>

            {error && (
              <div className={s.errorBox} role="alert">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className={s.inputGroup}>
                <label htmlFor="email-input" className={s.inputLabel}>
                  // identifier_email
                </label>
                <input
                  id="email-input"
                  type="email"
                  required
                  placeholder="correo@wismar.dev"
                  className={s.inputField}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>

              <div className={s.inputGroup}>
                <label htmlFor="password-input" className={s.inputLabel}>
                  // access_token_secret
                </label>
                <input
                  id="password-input"
                  type="password"
                  required
                  placeholder="••••••••"
                  className={s.inputField}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className={s.submitBtn}
                aria-label="Iniciar sesión con correo y contraseña"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <span className="flex items-center gap-3">
                    <Cpu size={20} aria-hidden="true" /> INICIAR PROTOCOLO
                  </span>
                )}
              </Button>
            </form>

            <div className={s.dividerBox}>
              <span className={s.dividerText}>External_Auth_Nodes</span>
            </div>

            <div className={s.socialGrid}>
              <Button
                type="button"
                disabled={isLoading}
                onClick={() => handleSocialLogin("google")}
                variant="outline"
                className={s.socialBtn}
                aria-label="Iniciar sesión con cuenta de Google"
              >
                <Chrome size={18} aria-hidden="true" />{" "}
                <span className={s.socialBtnText}>Google</span>
              </Button>
              <Button
                type="button"
                disabled={isLoading}
                onClick={() => handleSocialLogin("apple")}
                variant="outline"
                className={s.socialBtn}
                aria-label="Iniciar sesión con cuenta de Apple"
              >
                <Apple size={18} aria-hidden="true" />{" "}
                <span className={s.socialBtnText}>Apple ID</span>
              </Button>
            </div>

            <div className={s.footerLinkBox}>
              <Link to="/auth/register" className={s.footerLink}>
                ¿No tienes identidad?{" "}
                <span className={s.footerLinkHighlight}>REGISTRARSE</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
