import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UpgradeModalProps } from "@/utils/types";
import { CrownIcon, Zap } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { PricingTable } from "@clerk/nextjs";

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
    <div className="w-full">
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-h-[90vh] w-full overflow-y-auto sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Upgrade to Pro <CrownIcon className="h-4 w-4" />
            </DialogTitle>
            <DialogDescription>
              This will be your last free project. Upgrade to Pro for Unlimated
              projects.
            </DialogDescription>
          </DialogHeader>
          <div className="w-full space-y-6">
            {restrictedTool && (
              <Alert className="border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
                <Zap />
                <AlertDescription>
                  <p className="text-base text-orange-500">
                    {getToolName(restrictedTool)} -pro feature
                  </p>
                  {reason && (
                    <p className="text-xs text-gray-500 dark:text-gray-200">
                      {reason}
                    </p>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </div>
          <DialogFooter>
            <PricingTable
              checkoutProps={{
                appearance: {
                  elements: {
                    drawerRoot: {
                      zIndex: 20000,
                    },
                  },
                },
              }}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpgradeModel;
