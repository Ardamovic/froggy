"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, RotateCcw } from "lucide-react"

// Types remain the same...
type CardType = {
  type: keyof typeof ICON_MAP
  title: string
  body: string
  footer?: string
}

type GameSet = "tadpole" | "young" | "froggy"

const ICON_MAP = {
  Drink: "🍻 Drink!",
  "Keep Card": "🃏 Keep!",
  Technical: "🔧 Special!",
  Minigame: "🎲 Minigame!",
  Do: "😎 Do it!",
  "Truth or Drink": "🤭 Truth or Drink!",
  "Dare or Drink": "😵 Dare or Drink!",
  Unknown: "❓",
} as const

function shuffleArray<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5)
}

function GameContent({ gameSet }: { gameSet: GameSet }) {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cards, setCards] = useState<CardType[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const loadCards = async () => {
      try {
        const response = await fetch(`/data/${gameSet}.json`)
        const data: CardType[] = await response.json()
        setCards(shuffleArray(data))
      } catch (error) {
        console.error("Failed to load cards:", error)
        router.push("/")
      }
    }

    loadCards()
  }, [gameSet, router])

  useEffect(() => {
    if (currentIndex >= cards.length && cards.length > 0) {
      setIsComplete(true)
    }
  }, [currentIndex, cards.length])

  const handleCardClick = () => {
    if (currentIndex < cards.length && !isAnimating) {
      if (currentIndex === cards.length - 1) {
        setCurrentIndex(currentIndex + 1)
        return
      }

      setIsAnimating(true)

      // Use a single timeout to reset states
      setTimeout(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1)
        setIsAnimating(false)
      }, 400)
    }
  }

  const handleReset = () => {
    router.push("/")
  }

  if (cards.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <Card className="w-full max-w-md text-center">
          <CardHeader className="text-2xl font-bold">Loading...</CardHeader>
        </Card>
      </div>
    )
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <Card className="w-full max-w-md text-center">
          <CardHeader className="text-2xl font-bold">Game Complete!</CardHeader>
          <CardContent>You've gone through all the cards!</CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Button
              onClick={handleReset}
              className="flex items-center gap-2"
              variant="outline"
            >
              <Home className="w-4 h-4" />
              Return Home
            </Button>
            <Button
              onClick={() => {
                setCurrentIndex(0)
                setIsComplete(false)
              }}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Play Again
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col">
      <div className="max-w-4xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Return Home
          </Button>
          <div className="text-muted-foreground">
            Card {currentIndex + 1} of {cards.length}
          </div>
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center relative">
        <div className="relative w-full max-w-md">
          {/* Stack Preview */}
          {currentIndex < cards.length - 1 && (
            <div className="absolute top-0 left-0 w-full">
              {Array.from({
                length: Math.min(2, cards.length - currentIndex - 1),
              }).map((_, idx) => (
                <div
                  key={idx}
                  className="absolute top-0 left-0 w-full bg-background border-2 border-border rounded-lg"
                  style={{
                    minHeight: "250px",
                    transform: `translateY(${idx * 2}px)`,
                    opacity: 0.5 - idx * 0.2,
                    zIndex: -1,
                  }}
                />
              ))}
            </div>
          )}

          {/* Card Container */}
          <div className="relative w-full">
            {/* Next Card */}
            {currentIndex < cards.length - 1 && (
              <Card
                className={`w-full absolute top-0 left-0 flex flex-col min-h-[250px] ${
                  isAnimating ? "animate-card-reveal" : "opacity-0"
                }`}
                style={{ zIndex: isAnimating ? 2 : 0 }}
              >
                <CardHeader className="text-2xl font-bold flex items-center gap-2 select-none">
                  <span className="text-2xl font-normal select-none">
                    {ICON_MAP[cards[currentIndex + 1].type]}
                  </span>
                  {cards[currentIndex + 1].title}
                </CardHeader>
                <CardContent className="text-xl select-none text-center flex-grow flex items-center justify-center">
                  <div>{cards[currentIndex + 1].body}</div>
                </CardContent>
                {cards[currentIndex + 1].footer && (
                  <CardFooter className="text-sm text-muted-foreground select-none justify-end">
                    or drink: {cards[currentIndex + 1].footer}
                  </CardFooter>
                )}
              </Card>
            )}

            {/* Current Card */}
            {currentIndex < cards.length && (
              <Card
                className={`w-full relative cursor-pointer transition-all duration-400
                  min-h-[250px] flex flex-col
                  @media (hover: hover) {
                    hover:bg-primary/5 hover:border-primary/50
                  }
                  border-2 border-border
                  ${isAnimating ? "animate-card-tuck pointer-events-none" : ""}`}
                onClick={handleCardClick}
                style={{ zIndex: isAnimating ? 1 : 2 }}
              >
                <CardHeader className="text-2xl font-bold flex items-center gap-2 select-none">
                  <span className="text-2xl font-normal select-none">
                    {ICON_MAP[cards[currentIndex].type]}
                  </span>
                  {cards[currentIndex].title}
                </CardHeader>
                <CardContent className="text-xl select-none text-center flex-grow flex items-center justify-center">
                  <div>{cards[currentIndex].body}</div>
                </CardContent>
                {cards[currentIndex].footer && (
                  <CardFooter className="text-sm text-muted-foreground select-none justify-end">
                    or drink: {cards[currentIndex].footer}
                  </CardFooter>
                )}
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function GamePage({
  params,
}: {
  params: Promise<{ set: GameSet }>
}) {
  const resolvedParams = React.use(params)
  return <GameContent gameSet={resolvedParams.set} />
}
