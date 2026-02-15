import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useAuth } from "./AuthContext";
import { db } from "@/firebase/config";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  image: string;
  link: string;
  github: string;
}

interface Order {
  id: string;
  clientName: string;
  clientEmail: string;
  totalAmount: string;
  date: string;
  status: string;
  services: {
    id: string;
    name: string;
    price: number;
    category: string;
  }[];
}

interface Message {
  id: string;
  name: string;
  email: string;
  text: string;
  date: string;
  status?: string;
}

interface ProjectContextType {
  projects: Project[];
  orders: Order[];
  messages: Message[];
  addProject: (project: Omit<Project, "id">) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  addOrder: (order: Omit<Order, "id" | "date" | "status">) => Promise<void>;
  deleteOrder: (id: string) => Promise<void>;
  addMessage: (message: Omit<Message, "id" | "date">) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
}

export const ProjectContext = createContext<ProjectContextType | undefined>(
  undefined,
);

export const ProjectsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { currentUser } = useAuth();

  const [projects, setProjects] = useState<Project[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const projectsRef = collection(db, "projects_db");
    const qProjects = query(projectsRef, orderBy("timestamp", "desc"));

    const unsubscribeProjects = onSnapshot(
      qProjects,
      (snapshot) => {
        const projectsData = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })) as Project[];
        setProjects(projectsData);
      },
      (error) => {
        console.error("PROJECT_PUBLIC_SYNC_ERROR:", error);
      },
    );

    return () => unsubscribeProjects();
  }, []);

  useEffect(() => {
    let unsubscribeMessages: () => void = () => {};
    let unsubscribeOrders: () => void = () => {};

    if (currentUser?.email === "wiscol15@gmail.com") {
      const messagesRef = collection(db, "messages_db");
      const qMessages = query(messagesRef, orderBy("timestamp", "desc"));
      unsubscribeMessages = onSnapshot(qMessages, (snapshot) => {
        setMessages(
          snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as Message[],
        );
      });

      const ordersRef = collection(db, "orders");
      const qOrders = query(ordersRef, orderBy("timestamp", "desc"));
      unsubscribeOrders = onSnapshot(qOrders, (snapshot) => {
        setOrders(
          snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as Order[],
        );
      });
    } else {
      setMessages([]);
      setOrders([]);
    }

    return () => {
      unsubscribeMessages();
      unsubscribeOrders();
    };
  }, [currentUser]);

  const addProject = async (project: Omit<Project, "id">) => {
    try {
      await addDoc(collection(db, "projects_db"), {
        ...project,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error("FAIL_PROJECT_INJECTION:", error);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await deleteDoc(doc(db, "projects_db", id));
    } catch (error) {
      console.error("FAIL_PROJECT_PURGE:", error);
    }
  };

  const addMessage = async (message: Omit<Message, "id" | "date">) => {
    try {
      await addDoc(collection(db, "messages_db"), {
        ...message,
        date: new Date().toLocaleString(),
        timestamp: serverTimestamp(),
        status: "UNREAD",
      });
    } catch (error) {
      console.error("FAIL_MESSAGE_SEND:", error);
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      await deleteDoc(doc(db, "messages_db", id));
    } catch (error) {
      console.error("FAIL_MESSAGE_PURGE:", error);
    }
  };

  const addOrder = useCallback(
    async (orderData: Omit<Order, "id" | "date" | "status">) => {
      try {
        await addDoc(collection(db, "orders"), {
          ...orderData,
          date: new Date().toLocaleString(),
          timestamp: serverTimestamp(),
          status: "Pendiente",
        });
      } catch (error) {
        console.error("FAIL_ORDER_INJECTION:", error);
      }
    },
    [],
  );

  const deleteOrder = async (id: string) => {
    try {
      await deleteDoc(doc(db, "orders", id));
    } catch (error) {
      console.error("FAIL_ORDER_PURGE:", error);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        orders,
        messages,
        addProject,
        deleteProject,
        addOrder,
        deleteOrder,
        addMessage,
        deleteMessage,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context)
    throw new Error("useProjects debe usarse dentro de ProjectsProvider");
  return context;
};
