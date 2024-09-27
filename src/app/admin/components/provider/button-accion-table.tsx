"use client";

import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import AlertDialogComponent from "./alert-dialog";
import { Provider } from "@/types";
import DialogNewProvider from "./dialog-new-provider";

interface Props {
  provider: Provider;
}

export const ButtonActionTable = ({ provider }: Props) => {
  return (
    <div className="flex space-x-4">
      <DialogNewProvider provider={provider}>
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogNewProvider>

      {provider && <AlertDialogComponent provider={provider} />}
    </div>
  );
};
