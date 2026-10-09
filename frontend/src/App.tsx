import { useState } from "react";
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

interface CardItem {
  id: string;
  title: string;
  contents: string;
  tags?: string[];
  date: string;
  links: string;
  type: "youtube" | "twitter" | "article" | "image" | "text" | "link";
}

const INITIAL_CONTENTS: CardItem[] = [
  {
    id: "1",
    title: "AI & ML Roadmap",
    contents: "Foundational concepts in deep learning and transformers.",
    tags: ["productivity", "react"],
    date: "18th Aug 2026",
    links: "https://www.youtube.com/watch?v=32uTT424Nx4&list=RD32uTT424Nx4&start_radio=1",
    type: "youtube",
  },
  {
    id: "2",
    title: "Web3 & Tech Updates",
    contents: "Exciting announcement regarding modern tech stacks.",
    tags: ["productivity", "react"],
    date: "18th Aug 2026",
    links: "https://x.com/AbhinavXJ/status/2108505931634163771",
    type: "twitter",
  },
  {
    id: "3",
    title: "Project Ideas & Brainstorming",
    contents: "Building a personal Second Brain app to store knowledge and digital resources effectively.",
    tags: ["productivity", "react"],
    date: "18th Aug 2026",
    links: "",
    type: "text",
  },
];

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<string | null>(() => {
    return localStorage.getItem("currentUser");
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("signup");
  const [contents, setContents] = useState<CardItem[]>(INITIAL_CONTENTS);
  const [selectedType, setSelectedType] = useState<SidebarFilterType>("all");

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

  const handleAddContent = (newContent: CreateContentInput) => {
    const item: CardItem = {
      id: Date.now().toString(),
      title: newContent.title,
      contents: newContent.contents,
      tags: newContent.tags,
      date: newContent.date,
      links: newContent.links,
      type: newContent.type,
    };
    setContents((prev) => [item, ...prev]);
  };

  const filteredContents = contents.filter((item) => {
    if (selectedType === "all") return true;
    if (selectedType === "tags") return (item.tags?.length ?? 0) > 0;
    return item.type === selectedType;
  });

  return (
    <Routes>
      {/* Route: / (Landing Page) */}
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
                        {selectedType === "all" ? "All Notes" : `${selectedType}s`}
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
                  {filteredContents.length > 0 ? (
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
                        Click the &ldquo;Add Content&rdquo; button above to create one.
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
                  itemCount={contents.length}
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
