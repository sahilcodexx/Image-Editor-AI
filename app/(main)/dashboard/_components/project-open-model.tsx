import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
type ProjectOpenModelProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ProjectOpenModel = ({ isOpen, onClose }: ProjectOpenModelProps) => {
  const handelChange = () => {
    onClose();
  };
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={handelChange}>
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

export default ProjectOpenModel;
