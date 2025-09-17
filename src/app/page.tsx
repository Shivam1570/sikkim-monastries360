import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { DharmaWheel } from "@/components/icons";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <DharmaWheel className="h-6 w-6 text-primary" />
            <span className="font-headline text-xl">Monastri 360</span>
          </Link>
          <nav className="ml-auto flex items-center gap-4">
            <Button asChild>
              <Link href="/dashboard">
                Explore Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" asChild>
                <Link href="/admin">Admin</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative h-[60vh] min-h-[500px] w-full">
          <Image
            src="https://picsum.photos/seed/hero/1920/1080"
            alt="A serene monastery nestled in the mountains"
            data-ai-hint="monastery mountains"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-foreground p-4">
            <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
              Discover the Soul of Sikkim
            </h1>
            <p className="mt-4 max-w-2xl text-lg md:text-xl">
              Embark on a digital pilgrimage to the sacred monasteries of the Himalayas. Experience ancient wisdom and breathtaking beauty.
            </p>
            <Button size="lg" className="mt-8" asChild>
              <Link href="/dashboard">
                Begin Your Journey <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="py-12 md:py-24">
          <div className="container">
            <h2 className="text-center font-headline text-3xl md:text-4xl font-bold mb-12">
              A Digital Heritage Platform
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Virtual Tours</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Interactive 360° panoramic views of monastery interiors and exteriors to offer a remote exploration experience.</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Digital Archives</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Explore scanned manuscripts, murals, and historical documents with AI-powered search and categorization.</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Cultural Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Stay updated on events, festivals, and sacred rituals with our comprehensive cultural calendar.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Monastri 360. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
