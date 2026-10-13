import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Buttons from "./components/Buttons";
import Cards from "./components/Cards";
import CreateContentModal from "./components/CreateContentModal";
import type { CreateContentInput } from "./components/CreateContentModal";
import ShareBrainModal from "./components/ShareBrainModal";
import AuthModal from "./components/AuthModal";
import type { AuthMode, AuthSuccessData } from "./components/AuthModal";
import { AppSidebar } from "./components/AppSidebar";
import type { SidebarFilterType } from "./components/AppSidebar";
import { SidebarProvider } from "./components/ui/sidebar";
import LandingPage from "./components/LandingPage";
import api from "./lib/axios";
import { Spinner } from "./components/ui/spinner";

interface CardItem {
  id: string;
  title: string;
  contents: string;
  tags?: string[];
  date: string;
  links: string;
  type: "youtube" | "twitter" | "article" | "image" | "text" | "link";
}

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<string | null>(() => {
    return localStorage.getItem("currentUser");
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("signup");
  const [contents, setContents] = useState<CardItem[]>([]);
  const [selectedType, setSelectedType] = useState<SidebarFilterType>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!currentUser) {
      setContents([]);
      setIsLoading(false);
      return;
    }
    const fetchContent = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await api.get("/content");
        const formattedContents: CardItem[] = response.data.contents.map(
          (item: any) => ({
            id: item._id,
            title: item.title,
            contents: item.link,
            tags: item.tags.map((tag: any) => tag.title),
            date: "",
            links: item.link,
            type: item.type,
          }),
        );
        setContents(formattedContents);
      } catch (error:any) {
        console.error("Error fetching contents",error);
        setError(error);
      }finally{
        setIsLoading(false);
      }
    };
    fetchContent();
  },[currentUser]);

  const handleOpenAuth = (mode: AuthMode = "signup") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (_mode: AuthMode, data: AuthSuccessData) => {
    setCurrentUser(data.username);
    localStorage.setItem("currentUser", data.username);
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    setIsAuthModalOpen(false);
    navigate("/dashboard");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleEnterApp = () => {
    if (currentUser) {
      navigate("/dashboard");
    } else {
      handleOpenAuth("signup");
    }
  };

const handleAddContent = async (newContent: CreateContentInput) => {
  try {
    const response = await api.post("/content", {
      title: newContent.title,
      link: newContent.links,
      type: newContent.type,
      tags: newContent.tags,
    });

    const saved = response.data.content;

    const item: CardItem = {
      id: saved._id,
      title: saved.title,
      contents: saved.content ?? saved.link ?? "",
      tags: saved.tags?.map((tag: any) =>
        typeof tag === "string" ? tag : tag.title ?? tag.name ?? ""
      ) ?? [],
      date: saved.createdAt
        ? new Date(saved.createdAt).toLocaleDateString()
        : newContent.date,
      links: saved.link ?? "",
      type: saved.type,
    };

    setContents((prev) => [item, ...prev]);
    setIsModalOpen(false);
  } catch (err) {
    console.error("Error creating content:", err);
  }
};

  const filteredContents = contents.filter((item) => {
    if (selectedType === "all") return true;
    if (selectedType === "tags") return (item.tags?.length ?? 0) > 0;
    return item.type === selectedType;
  });

  return (
    <Routes>
     
      <Route
        path="/"
        element={
          currentUser ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <div className="min-h-screen bg-background text-foreground">
              <LandingPage
                onOpenAuth={handleOpenAuth}
                onEnterApp={handleEnterApp}
                currentUser={currentUser}
              />

              {/* Modal Auth Component */}
              <AuthModal
                open={isAuthModalOpen}
                defaultMode={authMode}
                onClose={() => setIsAuthModalOpen(false)}
                onAuthSuccess={handleAuthSuccess}
              />
            </div>
          )
        }
      />

      {/* Route: /dashboard (Main App Dashboard) */}
      <Route
        path="/dashboard"
        element={
          currentUser ? (
            <SidebarProvider defaultOpen={true}>
              <div className="flex min-h-screen w-full bg-background text-foreground">
                {/* Shadcn Sidebar */}
                <AppSidebar
                  selectedType={selectedType}
                  onSelectType={(type) => setSelectedType(type)}
                />

                {/* Main Content Area */}
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                  {/* Header Action Buttons (without "Back to Landing" button) */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-border/60 mb-8">
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight text-foreground capitalize">
                        {selectedType === "all"
                          ? "All Notes"
                          : `${selectedType}s`}
                      </h2>
                      <p className="text-xs md:text-sm text-muted-foreground mt-1">
                        Manage and organize your curated digital knowledge.
                      </p>
                    </div>
                    <Buttons
                      setIsModalOpen={setIsModalOpen}
                      setIsShareModalOpen={setIsShareModalOpen}
                      setIsAuthModalOpen={() => handleOpenAuth("signin")}
                      currentUser={currentUser}
                      onLogout={handleLogout}
                    />
                  </div>

                  {/* Cards Grid */}
                  {isLoading ? (
                    <div className="flex items-center justify-center py-32">
                      <Spinner className="size-8 text-primary" />
                    </div>
                  ) : error ? (
          <p className="py-10 text-center text-destructive">
      {error}
  </p>
                  ):
                  
                  
                   filteredContents.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredContents.map((card) => (
                        <Cards
                          key={card.id}
                          title={card.title}
                          contents={card.contents}
                          tags={card.tags}
                          date={card.date}
                          links={card.links}
                          type={card.type}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-border rounded-2xl bg-card/40">
                      <p className="text-base font-medium text-foreground">
                        No items found for this category
                      </p>
                      <p className="text-sm text-muted-foreground mt-1 mb-4">
                        Click the &ldquo;Add Content&rdquo; button above to
                        create one.
                      </p>
                    </div>
                  )}
                </main>

                {/* Create Content Modal */}
                <CreateContentModal
                  open={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  onSubmit={handleAddContent}
                />

                {/* Share Second Brain Modal */}
                <ShareBrainModal
                  open={isShareModalOpen}
                  onClose={() => setIsShareModalOpen(false)}
                  itemCount={contents!.length}
                />

                {/* Modal Auth Component */}
                <AuthModal
                  open={isAuthModalOpen}
                  defaultMode={authMode}
                  onClose={() => setIsAuthModalOpen(false)}
                  onAuthSuccess={handleAuthSuccess}
                />
              </div>
            </SidebarProvider>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
