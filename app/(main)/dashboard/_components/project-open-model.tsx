import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { usePlanAccess } from "@/hooks/use-plan-access";
import { AlertTriangleIcon } from "lucide-react";
type ProjectOpenModelProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ProjectOpenModel = ({ isOpen, onClose }: ProjectOpenModelProps) => {
  const { isFree, canCreateProject } = usePlanAccess();
  const { data: project } = useConvexQuery(api.project.getUserProjects);
  const currenprojectcount = Array.isArray(project) ? project.length : 0;
  const canCreate = canCreateProject(currenprojectcount);

  const handelChange = () => {
    onClose();
  };
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={handelChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Your Project</DialogTitle>
            {isFree && <Badge> {currenprojectcount}/3 </Badge>}
            <div>
              {isFree && currenprojectcount >= 2 && (
                <Alert className="max-w-md border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
                  <AlertTriangleIcon />

                  <AlertTitle>
                    <p>
                      {currenprojectcount === 2
                        ? "This is your last free Project"
                        : "Your Project limit is reached"}
                    </p>
                  </AlertTitle>
                  <AlertDescription>
                    <p>
                      {currenprojectcount === 2
                        ? "This will be your last free project. Upgrade to Pro for Unlimated projects"
                        : "Free plan is limited to 3 projects"}
                    </p>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectOpenModel;
