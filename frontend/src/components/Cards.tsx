import { FileText, Share2, Trash2, Image as ImageIcon, Link as LinkIcon } from "lucide-react";
import { useEffect } from "react";
import { YoutubeIcon, TwitterIcon } from "./icons";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface CardsInterface {
  title: string;
  contents: string;
  tags?: string[];
  date: string;
  links: string;
  type: "youtube" | "twitter" | "article" | "image" | "text" | "link";
}

function Cards({ title, contents, tags, date, links, type }: CardsInterface) {
  useEffect(() => {
    if (type === "twitter") {
      // Dynamically load Twitter embed script
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [type]);

  const getIcon = () => {
    switch (type) {
      case "youtube":
        return <YoutubeIcon size={16} className="text-muted-foreground" />;
      case "twitter":
        return <TwitterIcon size={16} className="text-muted-foreground" />;
      case "image":
        return <ImageIcon size={16} className="text-muted-foreground" />;
      case "link":
        return <LinkIcon size={16} className="text-muted-foreground" />;
      default:
        return <FileText size={16} className="text-muted-foreground" />;
    }
  };

  const renderContent = () => {
    switch (type) {
      case "youtube": {
        const ytMatch = links?.match(
          /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
        );
        const ytId = ytMatch ? ytMatch[1] : null;
        return ytId ? (
          <iframe
            className="w-full aspect-video rounded-md"
            src={`https://www.youtube.com/embed/${ytId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <p className="text-sm text-muted-foreground">Invalid YouTube Link</p>
        );
      }
      case "twitter":
        return (
          <div className="w-full h-full overflow-y-auto custom-scrollbar">
            <blockquote className="twitter-tweet" data-theme="light">
              <a href={links.replace("x.com", "twitter.com")}></a>
            </blockquote>
          </div>
        );
      case "image":
        return (
          <img
            src={links || contents}
            alt={title}
            className="w-full h-full object-cover rounded-md"
          />
        );
      case "link":
        return (
          <a
            href={links}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:underline break-all text-sm"
          >
            {links || contents}
          </a>
        );
      case "text":
      case "article":
      default: {
        // Strip HTML if present and truncate to 60 words
        const plainText = contents.replace(/<[^>]*>?/gm, "");
        const words = plainText.split(/\s+/);
        const truncated =
          words.length > 60
            ? words.slice(0, 60).join(" ") + "..."
            : plainText;
        return (
          <p className="text-sm text-foreground whitespace-pre-wrap">
            {truncated}
          </p>
        );
      }
    }
  };

  return (
    <Card className="w-72 h-96 flex flex-col">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            {getIcon()}
            <span className="text-sm font-normal text-muted-foreground line-clamp-1">
              {title}
            </span>
          </div>
        </CardTitle>
        <CardAction>
          <div className="flex items-center gap-2">
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Share2 size={16} />
            </button>
            <button className="text-muted-foreground hover:text-destructive transition-colors">
              <Trash2 size={16} />
            </button>
          </div>
        </CardAction>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden">
        {renderContent()}
      </CardContent>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 px-(--card-spacing) pt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-indigo-50 px-3 py-0.5 text-xs font-medium text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <CardFooter className="mt-auto pt-4 pb-(--card-spacing)">
        <span className="text-xs text-muted-foreground">Added on {date}</span>
      </CardFooter>
    </Card>
  );
}

export default Cards;