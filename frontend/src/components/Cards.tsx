
import { FileText, Share2, Trash2 } from "lucide-react";
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
  links:string
}

function Cards({ title, contents, tags, date,links }: CardsInterface) {
  return (
    <Card className="w-72 min-h-64">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-muted-foreground" />
            <span className="text-sm font-normal text-muted-foreground">
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

      <CardContent className="flex-1">
        <div
          className="prose prose-sm dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: contents }}
        />
      </CardContent>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 px-(--card-spacing)">
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

      <CardFooter>
        <span className="text-xs text-muted-foreground">
          Added on {date}
        </span>
      </CardFooter>
    </Card>
  );
}

export default Cards;