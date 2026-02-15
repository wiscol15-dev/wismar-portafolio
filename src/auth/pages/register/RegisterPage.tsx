import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { Loader2, X, AlertCircle, UserPlus, Chrome, Apple } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { updateProfile } from "firebase/auth";
import { db } from "@/firebase/config";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { s } from "./register-styles";
import MetaTags from "@/components/seo/MetaTags";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { register, loginWithGoogle, loginWithApple } = useAuth();

  const from = location.state?.from?.pathname || "/";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const persistIdentityAndLog = async (user: any, action: string) => {
    try {
      await setDoc(doc(db, "users", user.uid), {
        firstName:
          formData.firstName || user.displayName?.split(" ")[0] || "User",
        lastName:
          formData.lastName || user.displayName?.split(" ")[1] || "Node",
        email: user.email,
        role: user.email === "wiscol15@gmail.com" ? "admin" : "client",
        createdAt: serverTimestamp(),
      });

      await addDoc(collection(db, "security_logs"), {
        action: action,
        user: user.email,
        status: "Success",
        timestamp: serverTimestamp(),
      });
      console.log("SISTEMA: Identidad y Auditoría sincronizadas.");
    } catch (err) {
      console.error("ERROR_CRÍTICO_PERSISTENCIA:", err);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (formData.password !== formData.confirmPassword) {
      setError("ERROR 400: Las contraseñas no coinciden.");
      return;
    }
    setIsLoading(true);
    try {
      const userCredential = await register(formData.email, formData.password);
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: `${formData.firstName} ${formData.lastName}`,
        });
        await persistIdentityAndLog(
          userCredential.user,
          "Nueva_Identidad_Creada",
        );
      }
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(`FALLO_SISTEMA: ${err.code}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = async (method: "google" | "apple") => {
    setError("");
    setIsLoading(true);
    try {
      const userCredential =
        method === "google" ? await loginWithGoogle() : await loginWithApple();
      await persistIdentityAndLog(
        userCredential.user,
        `Registro_OAuth_${method.toUpperCase()}`,
      );
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(`ERROR 401: Fallo en ${method.toUpperCase()}_AUTH.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <MetaTags
        title="Generar Identidad"
        description="Registro de nuevos nodos de usuario en la plataforma tecnológica Wismar.Dev para acceso a servicios exclusivos de arquitectura digital."
      />

      <div className={s.mainWrapper}>
        <div className={s.registerCard}>
          {/* ACCESIBILIDAD: aria-label añadido */}
          <button
            onClick={() => navigate("/")}
            className={s.closeBtn}
            aria-label="Cerrar y cancelar registro"
          >
            <X size={20} />
          </button>

          <div className={s.terminalBar}>
            <div className={s.terminalIndicator} aria-hidden="true" /> bash
            --create --audit-active-v3
          </div>

          <div className={s.paddingBox}>
            <div className={s.headerBox}>
              <h1 className={s.titleH1}>
                REGISTRO <span className="text-[#44d62c]">ROOT_</span>
              </h1>
              <p className={s.redirectionSub}>// Nodo_Redireccion: {from}</p>
            </div>

            {error && (
              <div className={s.errorBox} role="alert">
                <AlertCircle size={16} aria-hidden="true" />{" "}
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleRegister} className={s.form}>
              <div className={s.gridTwoCols}>
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstName" className="sr-only">
                    Nombre
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    required
                    placeholder="Nombre"
                    className={s.inputField}
                    autoComplete="given-name"
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className="sr-only">
                    Apellido
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    required
                    placeholder="Apellido"
                    className={s.inputField}
                    autoComplete="family-name"
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="sr-only">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="correo@wismar.dev"
                  className={s.inputField}
                  autoComplete="email"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className={s.gridTwoCols}>
                <div className="flex flex-col gap-2">
                  <label htmlFor="password" className="sr-only">
                    Contraseña
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    placeholder="access_token"
                    className={s.inputField}
                    autoComplete="new-password"
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="confirmPassword" className="sr-only">
                    Confirmar contraseña
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    required
                    placeholder="confirm_token"
                    className={s.inputField}
                    autoComplete="new-password"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className={s.submitBtn}
                aria-label="Ejecutar creación de identidad"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <span className="flex items-center gap-3">
                    <UserPlus size={18} aria-hidden="true" /> GENERAR IDENTIDAD
                  </span>
                )}
              </Button>
            </form>

            <div className={s.oauthDivider}>
              <span className={s.oauthDividerText}>
                Protocolos OAuth Externos
              </span>
            </div>

            <div className={s.oauthGrid}>
              <Button
                type="button"
                onClick={() => handleSocialAuth("google")}
                variant="outline"
                className={s.oauthBtn}
                aria-label="Registrarse con Google"
              >
                <Chrome size={18} className={s.oauthIcon} aria-hidden="true" />
                <span className={s.oauthText}>Google_Auth</span>
              </Button>
              <Button
                type="button"
                onClick={() => handleSocialAuth("apple")}
                variant="outline"
                className={s.oauthBtn}
                aria-label="Registrarse con Apple"
              >
                <Apple size={18} className={s.oauthIcon} aria-hidden="true" />
                <span className={s.oauthText}>Apple_ID</span>
              </Button>
            </div>

            <div className={s.footerBox}>
              <Link
                to="/auth/login"
                state={{ from: location.state?.from }}
                className={s.footerLink}
              >
                ¿Ya posees identidad?{" "}
                <span className={s.footerLinkHighlight}>INICIAR_SESIÓN_</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
