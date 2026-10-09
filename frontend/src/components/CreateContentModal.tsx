import React, { useState, useEffect } from "react";
import {
  X,
  
  
  FileText,
  Image as ImageIcon,
  Type,
  Link as LinkIcon,
  Plus,
  Calendar,
  Tag as TagIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { YoutubeIcon as Youtube } from "./icons/YoutubeIcon";
import {TwitterIcon as Twitter} from './icons/TwitterIcon'
export type ContentType =
  | "youtube"
  | "twitter"
  | "article"
  | "image"
  | "text"
  | "link";

export interface CreateContentInput {
  title: string;
  contents: string;
  tags: string[];
  date: string;
  links: string;
  type: ContentType;
}

export interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (content: CreateContentInput) => void;
}

const CONTENT_TYPES: {
  type: ContentType;
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  linkPlaceholder: string;
  contentPlaceholder: string;
}[] = [
  {
    type: "youtube",
    label: "YouTube",
    icon: Youtube,
    linkPlaceholder: "https://www.youtube.com/watch?v=...",
    contentPlaceholder: "Notes or summary of the video...",
  },
  {
    type: "twitter",
    label: "Twitter / X",
    icon: Twitter,
    linkPlaceholder: "https://x.com/username/status/...",
    contentPlaceholder: "Notes or key takeaways from the tweet...",
  },
  {
    type: "article",
    label: "Article",
    icon: FileText,
    linkPlaceholder: "https://example.com/article-url",
    contentPlaceholder: "Article notes, markdown summary, or excerpt...",
  },
  {
    type: "image",
    label: "Image",
    icon: ImageIcon,
    linkPlaceholder: "https://example.com/image.png",
    contentPlaceholder: "Image caption or description...",
  },
  {
    type: "text",
    label: "Text Note",
    icon: Type,
    linkPlaceholder: "Optional reference URL (optional)",
    contentPlaceholder: "Write your thoughts, ideas, or notes here...",
  },
  {
    type: "link",
    label: "Web Link",
    icon: LinkIcon,
    linkPlaceholder: "https://...",
    contentPlaceholder: "Description or notes about this link...",
  },
];

// Helper to format date like "9th Oct 2026"
function getFormattedToday(): string {
  const date = new Date();
  const day = date.getDate();
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  const getOrdinalSuffix = (n: number) => {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
}

export function CreateContentModal({
  open,
  onClose,
  onSubmit,
}: CreateContentModalProps) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<ContentType>("youtube");
  const [links, setLinks] = useState("");
  const [contents, setContents] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [date, setDate] = useState(getFormattedToday());
  const [errors, setErrors] = useState<{ title?: string; links?: string }>({});

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      setTitle("");
      setType("youtube");
      setLinks("");
      setContents("");
      setTagInput("");
      setTags([]);
      setDate(getFormattedToday());
      setErrors({});
    }
  }, [open]);

  if (!open) return null;

  const currentTypeConfig =
    CONTENT_TYPES.find((t) => t.type === type) || CONTENT_TYPES[0];

  const handleAddTag = () => {
    const trimmed = tagInput.trim().replace(/^#/, "").toLowerCase();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { title?: string; links?: string } = {};
    if (!title.trim()) {
      newErrors.title = "Title is required";
    }
    if ((type === "youtube" || type === "twitter" || type === "link") && !links.trim()) {
      newErrors.links = "Link URL is required for this type";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload: CreateContentInput = {
      title: title.trim(),
      contents: contents.trim(),
      tags,
      date: date.trim() || getFormattedToday(),
      links: links.trim(),
      type,
    };

    onSubmit?.(payload);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl text-card-foreground transition-all duration-200 max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Add New Content
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Save links, videos, tweets, notes, or articles to your second brain.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto py-4 space-y-4 pr-1"
        >
          {/* Content Type Selector */}
          <div>
            <label className="block text-xs font-medium text-foreground mb-2">
              Content Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {CONTENT_TYPES.map((item) => {
                const Icon = item.icon;
                const isSelected = type === item.type;
                return (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => {
                      setType(item.type);
                      setErrors((prev) => ({ ...prev, links: undefined }));
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                      isSelected
                        ? "bg-primary text-primary-foreground border-primary shadow-xs"
                        : "bg-background text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground"
                    }`}
                  >
                    <Icon size={15} />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title Field */}
          <div>
            <label
              htmlFor="content-title"
              className="block text-xs font-medium text-foreground mb-1.5"
            >
              Title <span className="text-destructive">*</span>
            </label>
            <input
              id="content-title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
              }}
              placeholder="e.g. Building AI Agents, React Server Components..."
              className={`w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${
                errors.title ? "border-destructive focus:ring-destructive" : "border-input"
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-xs text-destructive">{errors.title}</p>
            )}
          </div>

          {/* Link URL Field */}
          <div>
            <label
              htmlFor="content-link"
              className="block text-xs font-medium text-foreground mb-1.5"
            >
              Link / URL{" "}
              {type === "youtube" || type === "twitter" || type === "link" ? (
                <span className="text-destructive">*</span>
              ) : (
                <span className="text-muted-foreground font-normal">(optional)</span>
              )}
            </label>
            <div className="relative">
              <input
                id="content-link"
                type="url"
                value={links}
                onChange={(e) => {
                  setLinks(e.target.value);
                  if (errors.links) setErrors((prev) => ({ ...prev, links: undefined }));
                }}
                placeholder={currentTypeConfig.linkPlaceholder}
                className={`w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${
                  errors.links ? "border-destructive focus:ring-destructive" : "border-input"
                }`}
              />
            </div>
            {errors.links && (
              <p className="mt-1 text-xs text-destructive">{errors.links}</p>
            )}
          </div>

          {/* Content / Notes Field */}
          <div>
            <label
              htmlFor="content-body"
              className="block text-xs font-medium text-foreground mb-1.5"
            >
              Contents / Description
            </label>
            <textarea
              id="content-body"
              rows={3}
              value={contents}
              onChange={(e) => setContents(e.target.value)}
              placeholder={currentTypeConfig.contentPlaceholder}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors resize-y"
            />
          </div>

          {/* Tags Field */}
          <div>
            <label
              htmlFor="content-tags"
              className="block text-xs font-medium text-foreground mb-1.5"
            >
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <div className="relative flex-1">
                <TagIcon
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  id="content-tags"
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder="Type tag and press Enter (e.g. productivity)"
                  className="w-full rounded-lg border border-input bg-background pl-8 pr-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                />
              </div>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleAddTag}
                className="h-auto py-1.5"
              >
                <Plus size={14} />
                Add
              </Button>
            </div>

            {/* Tag Badges */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800"
                  >
                    #{t}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(t)}
                      className="hover:text-destructive focus:outline-none ml-0.5"
                      aria-label={`Remove tag ${t}`}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Date Field */}
          <div>
            <label
              htmlFor="content-date"
              className="block text-xs font-medium text-foreground mb-1.5"
            >
              Date
            </label>
            <div className="relative">
              <Calendar
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                id="content-date"
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. 18th Aug 2026"
                className="w-full rounded-lg border border-input bg-background pl-8 pr-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
              />
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 border-t border-border pt-4">
          <Button
            type="button"
            variant="ghost"
            size="default"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="default"
            size="default"
            onClick={handleSubmit}
            className="px-5"
          >
            Add Content
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateContentModal;