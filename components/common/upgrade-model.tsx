import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UpgradeModalProps } from "@/utils/types";

const UpgradeModel = ({
  isOpen,
  onClose,
  restrictedTool,
  reason,
}: UpgradeModalProps) => {
  const getToolName = (toolId: string): string => {
    const toolNames: { [key: string]: string } = {
      background: "AI Background Tools",
      ai_extender: "AI Image Extender",
      ai_edit: "Ai Editor",
    };
    return toolNames[toolId] || "premium feature";
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger open={isOpen} onOpenChange={onClose}>
          Open
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpgradeModel;
