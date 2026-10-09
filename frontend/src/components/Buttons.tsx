import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Share2 } from "lucide-react"
function Buttons() {
  return (
    <div className="flex gap-5">
    <Button variant={"default"} size={"lg"} className={"px-4 py-4"}>
        <Plus size={6}/>
        Add Content
        </Button>
    <Button variant={"secondary"} size={"lg"} className={"px-6"}>
        <Share2 size={6}/>
        Share Brain</Button>

    </div>
  )
}

export default Buttons