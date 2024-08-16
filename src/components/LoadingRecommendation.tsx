import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function LoadingRecommendation() {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-4">
        Recommendation
      </h2>
      {/* do 5 times */}

      <div className="flex flex-nowrap gap-2">
        {Array.from({ length: 5 }, (_, index) => (
          <Card key={index} className="min-w-40">
            <div className="relative w-full p-2">
              <Skeleton className="w-full aspect-square rounded-lg border" />
              <Skeleton className="w-1/2 h-6 mt-2" />
              <Skeleton className="w-3/4 h-4 mt-1" />
              <Skeleton className="w-full h-4 mt-2 mb-4" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
