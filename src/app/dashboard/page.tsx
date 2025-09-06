import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { monasteries } from "@/lib/data";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Explore the sacred monasteries of Sikkim.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {monasteries.map((monastery) => (
          <Card key={monastery.id} className="flex flex-col">
            <CardHeader className="p-0">
              <div className="relative aspect-video w-full">
                <Image
                  src={`${monastery.image}?${monastery.id}`}
                  alt={`Image of ${monastery.name}`}
                  data-ai-hint="monastery building"
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <div className="p-6 pb-0">
                <CardTitle className="font-headline text-2xl">{monastery.name}</CardTitle>
                <CardDescription>{monastery.district}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow p-6">
              <p className="line-clamp-3 text-sm">{monastery.description}</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/dashboard/monasteries/${monastery.id}`}>
                  Explore
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

    