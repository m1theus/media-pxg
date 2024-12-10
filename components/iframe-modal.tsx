"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function IframeModal({
  pokemon,
  url = "https://example.com",
}: {
  pokemon: string;
  url?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">More Information</Button>
      </DialogTrigger>
      <DialogContent
        className="w-full max-w-4xl h-[94vh]"
        aria-describedby={undefined}
      >
        <div className="w-full h-full flex flex-col">
          <DialogHeader className="p-4">
            <DialogTitle>{pokemon} Info</DialogTitle>
          </DialogHeader>
          <iframe
            src={url}
            className="flex-1 w-full border-none"
            title="Embedded Content"
            allowFullScreen
          />
          <DialogFooter className="p-4">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
