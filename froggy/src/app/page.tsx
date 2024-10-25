import Link from 'next/link';
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const GAME_SETS = {
  'tadpole': { 
    title: 'Tadpole', 
    description: 'Perfect for beginners', 
    bgClass: 'bg-primary/5' 
  },
  'young': { 
    title: 'Young Frog', 
    description: 'For intermediate players', 
    bgClass: 'bg-primary/10' 
  },
  'froggy': { 
    title: 'Froggy', 
    description: 'For experienced players', 
    bgClass: 'bg-primary/20' 
  }
} as const;

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-foreground">
          FROGGY!
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(GAME_SETS).map(([key, set]) => (
            <Link href={`/play/${key}`} key={key} className="block">
              <Card 
                className={`${set.bgClass} hover:bg-primary/30 transition-colors duration-200
                  cursor-pointer border-2 border-border hover:border-primary/50`}
              >
                <CardHeader className="text-xl font-bold">{set.title}</CardHeader>
                <CardContent>{set.description}</CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}