import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const HomeLoading = () => {
  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] border rounded-xl">
      <MessageSkeleton />
      <div className="relative p-3">
        <div className="flex flex-col gap-y-4 w-full">
          <div className="relative">
            <Skeleton className="h-[3.5rem] w-full" />
            <Skeleton className="h-8 w-12 absolute right-3 top-[10px] rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLoading;

const MessageSkeleton = ({ length = 10 }: { length?: number }) => {
  return (
    <div className="flex flex-col-reverse overflow-y-auto no-scrollbar flex-1 gap-y-4 px-4 py-9 relative">
      {Array.from({ length }).map((_, index) => {
        const isCurrentUserMessage = index % 2 === 0;

        return (
          <div
            key={index}
            className={cn("flex w-full mt-5", {
              "justify-end": isCurrentUserMessage,
              "justify-start": !isCurrentUserMessage,
            })}
          >
            <div
              className={cn("flex gap-x-3 tracking-tight", {
                "flex-row-reverse": isCurrentUserMessage,
              })}
            >
              <Skeleton className="h-8 w-8 rounded-md" />

              <div className="flex flex-col gap-y-1">
                <div
                  className={cn("text-muted-foreground text-xs flex gap-x-2", {
                    "flex-row-reverse": isCurrentUserMessage,
                  })}
                >
                  <Skeleton className="h-4 w-8" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div
                  className={cn("flex", {
                    "justify-end": isCurrentUserMessage,
                  })}
                >
                  <Skeleton className="h-10 w-[16rem] md:w-[24rem]" />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
