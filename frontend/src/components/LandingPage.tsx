import { useState } from "react";
import {
  BrainIcon,
  YoutubeIcon,
  TwitterIcon,
} from "./icons";
import {
  WavyUnderline,
  HandDrawnArrow,
  MagentaSparkle,
  IdeaDoodle,
  SwirlDoodle,
  DoodleSmileyBrain,
  DoodlePaperAirplane,
  DoodleStickyNote,
  DoodleCoffeeCup,
  DoodleLoopArrow,
  DoodleStarsCluster,
  DoodleHighlightBox,
} from "./LandingDoodles";
import {
  ArrowRight,
  Check,
  FileText,
  Link2,
  Share2,
  Search,
  Layers,
  Shield,
  Zap,
  Globe,
  Tag,
  Copy,
  ExternalLink,
  BookOpen,
  Code2,
  GraduationCap,
  Palette,
  Briefcase,
  Compass,
} from "lucide-react";

interface LandingPageProps {
  onOpenAuth: (mode?: "signin" | "signup") => void;
  onEnterApp: () => void;
  currentUser?: string | null;
}

export function LandingPage({
  onOpenAuth,
  onEnterApp,
  currentUser,
}: LandingPageProps) {
  const [copiedShareLink, setCopiedShareLink] = useState(false);

  const handleCopyLink = () => {
    setCopiedShareLink(true);
    setTimeout(() => setCopiedShareLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-pink-100 selection:text-pink-900 overflow-x-hidden">
      {/* =========================================================
          HERO SECTION (with Logo, Fun Doodles, CTA, and Preview)
      ========================================================= */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-28">
        {/* Margin Fun Doodles */}
        <div className="absolute top-12 left-6 xl:left-14 hidden lg:flex flex-col items-center gap-2 select-none opacity-85">
          <IdeaDoodle className="text-gray-800" />
          <span className="text-[11px] font-handwriting text-pink-600 font-medium rotate-[-6deg]">
            Got a new idea?
          </span>
        </div>

        <div className="absolute top-16 right-8 xl:right-16 hidden lg:flex flex-col items-center gap-2 select-none opacity-85">
          <DoodleCoffeeCup />
          <span className="text-[11px] font-handwriting text-gray-500 font-medium rotate-[5deg]">
            Fuel for thought ☕
          </span>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Logo & Brand Identity with Cute Character Brain */}
          <div className="flex items-center justify-center gap-3 mb-5 select-none relative">
            <div className="flex items-center justify-center text-indigo-600 transition-transform duration-200 hover:scale-105">
              <BrainIcon size={40} className="stroke-[2.2]" />
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-950">
              Second Brain
            </span>

            {/* Playful Floating Smiley Brain Doodle */}
            <div className="hidden sm:block absolute -right-4 -top-8 text-gray-800 transform rotate-6 hover:rotate-12 transition-transform duration-200">
              <DoodleSmileyBrain className="w-12 h-12" />
            </div>
          </div>

          {/* Expressive Tag Badge with Star Cluster */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-200 bg-pink-50/70 text-xs font-semibold text-pink-700 mb-6 relative">
            <MagentaSparkle size={14} />
            <span>A Personal Knowledge Sanctuary</span>
            <div className="absolute -top-3 -right-6 hidden sm:block">
              <DoodleStarsCluster className="w-8 h-8 opacity-80" />
            </div>
          </div>

          {/* Centered Large Direct Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-950 tracking-tight leading-[1.08] max-w-4xl mx-auto">
            Your personal vault to store and recall{" "}
            <span className="relative inline-block whitespace-nowrap">
              <span>all useful knowledge</span>
              <WavyUnderline className="absolute left-0 -bottom-3 w-full" />
            </span>
          </h1>

          {/* Purpose & Usage Description */}
          <p className="mt-7 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Stop losing brilliant YouTube videos, X threads, articles, bookmarks,
            and thoughts in endless open tabs. Second Brain is the fast, organized
            sanctuary to store, organize, and retrieve every kind of useful digital
            information.
          </p>

          {/* Action CTAs with Fun Doodles */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4 relative">
            {currentUser ? (
              <button
                type="button"
                onClick={onEnterApp}
                className="w-full sm:w-auto h-12 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base shadow-sm hover:shadow-indigo-200/50 hover:shadow-lg transition-all duration-150 flex items-center justify-center gap-2.5 cursor-pointer active:scale-98"
              >
                <span>Open My Vault ({currentUser})</span>
                <ArrowRight size={18} />
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => onOpenAuth("signup")}
                  className="w-full sm:w-auto h-12 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base shadow-sm hover:shadow-indigo-200/50 hover:shadow-lg transition-all duration-150 flex items-center justify-center gap-2.5 cursor-pointer active:scale-98"
                >
                  <span>Get Started — It&apos;s Free</span>
                  <ArrowRight size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => onOpenAuth("signin")}
                  className="w-full sm:w-auto h-12 px-6 rounded-xl border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700 font-medium text-base transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Log In to Existing Vault</span>
                </button>
              </>
            )}

            {/* Hand-drawn Arrow Doodle */}
            <div className="hidden md:flex items-center gap-1.5 absolute -right-36 top-1 text-gray-500 select-none">
              <HandDrawnArrow className="w-14 h-8 text-pink-600" direction="left" />
              <span className="text-xs font-handwriting text-pink-600 font-semibold tracking-wide rotate-3">
                No credit card needed!
              </span>
            </div>
          </div>

          {/* Tiny Reassurance Line with Swirl Doodle */}
          <div className="mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500">
            <span>Free forever tier</span>
            <span>·</span>
            <span>Instant 30-second setup</span>
            <span>·</span>
            <span>Private by default</span>
          </div>

          {/* Lightly Framed Product Preview with Sticky Note Doodle */}
          <div className="mt-14 sm:mt-16 relative mx-auto max-w-4xl">
            {/* Fun Hand-drawn Sticky Note Overhanging */}
            <div className="hidden md:block absolute -left-10 -top-8 z-20 transform -rotate-12 hover:rotate-0 transition-transform duration-200 select-none drop-shadow-sm">
              <DoodleStickyNote />
            </div>

            {/* Fun Paper Airplane Floating Right */}
            <div className="hidden md:block absolute -right-16 -top-12 z-20 select-none">
              <DoodlePaperAirplane className="w-28 h-16" />
            </div>

            <div className="rounded-2xl border border-gray-200/90 bg-gray-50/50 p-2 sm:p-4 shadow-xl">
              <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-xs">
                {/* Window Header Bar */}
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400/80"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-400/80"></span>
                    <span className="w-3 h-3 rounded-full bg-green-400/80"></span>
                    <span className="text-xs font-medium text-gray-400 ml-2">
                      secondbrain.vault/dashboard
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                      Live Preview
                    </span>
                  </div>
                </div>

                {/* Preview Body with Mock App Layout */}
                <div className="grid grid-cols-1 md:grid-cols-4 bg-gray-50/30 min-h-[360px]">
                  {/* Mini Sidebar */}
                  <div className="hidden md:block p-4 border-r border-gray-100 bg-white text-left space-y-4">
                    <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                      <BrainIcon size={20} />
                      <span>Second Brain</span>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-indigo-50 text-indigo-600 font-semibold">
                        <Layers size={14} />
                        <span>All Notes</span>
                      </div>
                      <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50">
                        <TwitterIcon size={14} />
                        <span>Tweets</span>
                      </div>
                      <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50">
                        <YoutubeIcon size={14} />
                        <span>Videos</span>
                      </div>
                      <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50">
                        <FileText size={14} />
                        <span>Documents</span>
                      </div>
                      <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50">
                        <Link2 size={14} />
                        <span>Links</span>
                      </div>
                    </div>
                  </div>

                  {/* Mini Main Grid */}
                  <div className="p-4 sm:p-6 md:col-span-3 text-left space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">
                          Curated Digital Knowledge
                        </h4>
                        <p className="text-xs text-gray-500">
                          All your captured resources in one visual grid
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-700 flex items-center gap-1.5">
                          <Share2 size={13} />
                          Share Brain
                        </span>
                        <button
                          type="button"
                          onClick={onEnterApp}
                          className="text-xs font-medium px-3 py-1.5 rounded-lg bg-indigo-600 text-white flex items-center gap-1.5 hover:bg-indigo-700 cursor-pointer"
                        >
                          Enter App →
                        </button>
                      </div>
                    </div>

                    {/* 3 Sample Mock Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {/* YouTube Card */}
                      <div className="p-3.5 rounded-xl border border-gray-200 bg-white shadow-2xs space-y-2">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span className="flex items-center gap-1 text-red-600 font-medium">
                            <YoutubeIcon size={14} /> YouTube
                          </span>
                          <span>18 Aug</span>
                        </div>
                        <p className="text-xs font-semibold text-gray-900 line-clamp-1">
                          AI &amp; ML Roadmap
                        </p>
                        <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center text-[10px] text-gray-400">
                          ▶ Video Embed
                        </div>
                        <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-medium">
                          #productivity
                        </span>
                      </div>

                      {/* Twitter Card */}
                      <div className="p-3.5 rounded-xl border border-gray-200 bg-white shadow-2xs space-y-2">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span className="flex items-center gap-1 text-sky-500 font-medium">
                            <TwitterIcon size={14} /> Tweet
                          </span>
                          <span>18 Aug</span>
                        </div>
                        <p className="text-xs font-semibold text-gray-900 line-clamp-1">
                          Modern Tech Updates
                        </p>
                        <div className="p-2 bg-gray-50 rounded-md border border-gray-100 text-[11px] text-gray-600 italic">
                          &ldquo;Exciting announcement regarding modern tech stacks...&rdquo;
                        </div>
                        <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-medium">
                          #react
                        </span>
                      </div>

                      {/* Note Card */}
                      <div className="p-3.5 rounded-xl border border-gray-200 bg-white shadow-2xs space-y-2">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span className="flex items-center gap-1 text-gray-700 font-medium">
                            <FileText size={14} /> Note
                          </span>
                          <span>18 Aug</span>
                        </div>
                        <p className="text-xs font-semibold text-gray-900 line-clamp-1">
                          Brainstorming
                        </p>
                        <p className="text-[11px] text-gray-600 line-clamp-3">
                          Building a personal Second Brain to store knowledge and
                          digital resources effectively.
                        </p>
                        <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-medium">
                          #ideas
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FEATURES SECTION (with fun doodle annotations)
      ========================================================= */}
      <section className="py-20 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-200/80 relative">
        {/* Floating Swirl in background */}
        <div className="absolute top-12 right-12 hidden lg:block opacity-70">
          <SwirlDoodle />
        </div>

        <div className="max-w-3xl mb-12 text-left relative">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-600 uppercase tracking-widest mb-3">
            <MagentaSparkle size={14} /> Universal Intake &amp; Storage
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-950 tracking-tight leading-tight">
            Capture every piece of wisdom with{" "}
            <DoodleHighlightBox>zero friction</DoodleHighlightBox>.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            Whatever you find on the web has an instant home here. Second Brain acts as a
            secure, clutter-free vault for all kinds of useful media formats.
          </p>
        </div>

        {/* Wide Magenta-Accented Feature Card with loop arrow */}
        <div className="rounded-2xl border-2 border-pink-300/80 bg-linear-to-b from-pink-50/40 to-white p-6 sm:p-10 shadow-sm relative overflow-hidden mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-xl space-y-4 text-left">
              <span className="inline-block px-3 py-1 rounded-full bg-pink-600 text-white text-xs font-bold uppercase tracking-wider">
                Multi-Format Ingestion
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-950">
                YouTube, X / Twitter, Articles, Links &amp; Notes
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Paste any link or jot down a thought. Second Brain automatically detects the
                format, embeds responsive players or tweet previews, and lets you attach tags
                and personal notes alongside them.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1 rounded-md bg-white border border-pink-200 text-xs font-semibold text-gray-800 flex items-center gap-1.5 shadow-2xs">
                  <YoutubeIcon size={14} className="text-red-600" /> Embedded YouTube
                </span>
                <span className="px-3 py-1 rounded-md bg-white border border-pink-200 text-xs font-semibold text-gray-800 flex items-center gap-1.5 shadow-2xs">
                  <TwitterIcon size={14} className="text-sky-500" /> Live Tweets
                </span>
                <span className="px-3 py-1 rounded-md bg-white border border-pink-200 text-xs font-semibold text-gray-800 flex items-center gap-1.5 shadow-2xs">
                  <FileText size={14} className="text-indigo-600" /> Rich Articles
                </span>
                <span className="px-3 py-1 rounded-md bg-white border border-pink-200 text-xs font-semibold text-gray-800 flex items-center gap-1.5 shadow-2xs">
                  <Link2 size={14} className="text-emerald-600" /> Web Links
                </span>
              </div>
            </div>

            {/* Quick Intake Demo Box */}
            <div className="w-full lg:w-96 rounded-xl border border-pink-200/90 bg-white p-5 shadow-sm text-left space-y-3 relative">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                <BrainIcon size={20} className="text-pink-600" />
                <span className="text-xs font-bold text-gray-900">
                  Quick Add Content
                </span>
              </div>
              <div className="text-xs font-mono bg-gray-50 p-2.5 rounded-lg border border-gray-200 text-gray-700">
                https://youtube.com/watch?v=...
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Detected: Video Player</span>
                <span className="text-pink-600 font-bold">Auto-embedded ✓</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-2xs space-y-3 hover:border-indigo-200 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Tag size={20} />
            </div>
            <h4 className="text-base font-bold text-gray-950">
              Universal Tagging
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Tag any card with <code className="text-indigo-600 font-semibold">#productivity</code> or <code className="text-indigo-600 font-semibold">#react</code> to cross-reference ideas across different media types.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-2xs space-y-3 hover:border-pink-200 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center font-bold">
              <Search size={20} />
            </div>
            <h4 className="text-base font-bold text-gray-950">
              Instant Vault Search
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Find any bookmarked resource, note, or excerpt in milliseconds without digging through buried browser histories.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-2xs space-y-3 hover:border-sky-200 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
              <Zap size={20} />
            </div>
            <h4 className="text-base font-bold text-gray-950">
              Media-Type Filters
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              View exclusively Tweets, Videos, Documents, or Web Links from the sidebar with one simple click.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-2xs space-y-3 hover:border-emerald-200 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Shield size={20} />
            </div>
            <h4 className="text-base font-bold text-gray-950">
              Private by Default
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Your knowledge vault is completely private to your account until you choose to generate a public share link.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          SHARING SECTION (with Airplane & Loop Doodles)
      ========================================================= */}
      <section className="py-20 md:py-24 bg-gray-50/70 border-t border-gray-200/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 relative">
            {/* Paper Airplane Flying Above Header */}
            <div className="hidden sm:block absolute -top-8 -right-8 opacity-90">
              <DoodlePaperAirplane className="w-24 h-14" />
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-600 uppercase tracking-widest mb-2">
              <MagentaSparkle size={14} /> Collaborative Knowledge
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
              Share your curated brain with one click.
            </h2>
            <p className="mt-4 text-gray-600 text-base">
              Curating resources for a team project, reading group, or audience?
              Generate a public vault link in seconds without giving away edit permissions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
            {/* Left Column: Share Card Preview */}
            <div className="lg:col-span-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm text-left space-y-5 relative">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Share2 size={16} />
                  </div>
                  <h3 className="font-bold text-gray-950 text-base">
                    Share Your Second Brain
                  </h3>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium">
                  Public Link
                </span>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Share your entire collection of notes, documents, tweets, and
                videos with others. They&apos;ll be able to explore your curated
                resources in their own browser.
              </p>

              {/* Copy Share Button with Loop Arrow Doodle */}
              <div className="relative">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  {copiedShareLink ? (
                    <>
                      <Check size={16} className="stroke-[2.5]" />
                      <span>Link Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} className="stroke-[2.2]" />
                      <span>Copy Shareable Link</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-center text-xs text-gray-400">
                URL: <span className="font-mono text-gray-600">secondbrain.app/share/vault</span>
              </p>
            </div>

            {/* Right Column: Key Sharing Benefits with Loop Arrow */}
            <div className="lg:col-span-6 space-y-4 text-left relative">
              <div className="hidden xl:block absolute -top-8 -right-10">
                <DoodleLoopArrow className="w-16 h-12" />
              </div>

              <div className="p-5 rounded-xl border border-gray-200 bg-white shadow-2xs space-y-2">
                <h4 className="font-bold text-gray-950 text-sm flex items-center gap-2">
                  <Globe size={16} className="text-indigo-600" />
                  Read-Only Public Views
                </h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  Followers and peers can browse your bookmarks and watch videos without
                  modifying your private database.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-gray-200 bg-white shadow-2xs space-y-2">
                <h4 className="font-bold text-gray-950 text-sm flex items-center gap-2">
                  <Shield size={16} className="text-pink-600" />
                  Total Privacy Control
                </h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  You are always in control of when your vault is public or private.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-gray-200 bg-white shadow-2xs space-y-2">
                <h4 className="font-bold text-gray-950 text-sm flex items-center gap-2">
                  <ExternalLink size={16} className="text-emerald-600" />
                  Portfolio &amp; Social Links
                </h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  Easily link your public brain from your Twitter bio, GitHub README, or personal website.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          USE CASES SECTION (with character brain & stars)
      ========================================================= */}
      <section className="py-20 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-200/80 relative">
        <div className="text-center max-w-3xl mx-auto mb-14 relative">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-600 uppercase tracking-widest mb-2">
            <MagentaSparkle size={14} /> Tailored For You
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight mt-1">
            Built for how curious minds work.
          </h2>
          <p className="mt-4 text-gray-600 text-base">
            Whether you&apos;re developing software, publishing research, or learning new domains.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-10 shadow-sm text-left relative">
          {/* Subtle Smiley Brain in corner */}
          <div className="hidden sm:block absolute -top-7 right-8">
            <DoodleSmileyBrain className="w-12 h-12 opacity-80" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-base">
                <Code2 size={20} />
                <span>Developers</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Save GitHub repositories, compiler optimization videos, framework release notes, and architecture diagrams.
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-pink-600 font-bold text-base">
                <GraduationCap size={20} />
                <span>Researchers &amp; Academics</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Keep ArXiv paper links, seminar recordings, conference tweets, and hypothesis notes in one tagged archive.
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-base">
                <Palette size={20} />
                <span>Creators &amp; Writers</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Collect inspiration hooks, storytelling breakdowns, viral tweets, and podcast timestamps without browser lag.
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-amber-600 font-bold text-base">
                <Briefcase size={20} />
                <span>Product Thinkers</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Document competitor updates, user feedback quotes, SaaS growth case studies, and feature roadmap ideas.
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-purple-600 font-bold text-base">
                <BookOpen size={20} />
                <span>Students</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Organize courses with separate tags, save lecture recordings, and create quick exam revision collections.
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-cyan-600 font-bold text-base">
                <Compass size={20} />
                <span>Lifelong Learners</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Archive podcast insights, history threads, philosophy essays, and life wisdom for decades to come.
              </p>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-gray-500">
              No complex setup required · Works instantly in any modern browser
            </span>
            <button
              type="button"
              onClick={() => onOpenAuth("signup")}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold tracking-wide transition-colors cursor-pointer flex items-center gap-2 shadow-xs hover:shadow-md"
            >
              <span>Get Started with Second Brain</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================
          COMPACT BOTTOM BAR
      ========================================================= */}
      <footer className="border-t border-gray-200/90 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-2 font-bold text-gray-900">
            <BrainIcon size={20} className="text-indigo-600" />
            <span>Second Brain</span>
          </div>
          <p>© {new Date().getFullYear()} Second Brain. A vault for all useful knowledge.</p>
          <button
            type="button"
            onClick={() => onOpenAuth("signin")}
            className="text-indigo-600 hover:text-indigo-700 font-semibold cursor-pointer"
          >
            Log in to Vault
          </button>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
