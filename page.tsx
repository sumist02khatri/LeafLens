"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import RecommendationCard from "@/components/recommendation-card"
import { Leaf } from "lucide-react"

interface Plant {
  commonName: string
  scientificName: string
  description: string
}

export default function Home() {
  const [identifiedPlant, setIdentifiedPlant] = useState<Plant | null>(null)

  const identifyPlant = () => {
    // Simulate plant identification
    setIdentifiedPlant({
      commonName: "Sugar Maple",
      scientificName: "Acer saccharum",
      description: "A deciduous tree known for its brilliant fall colors and sweet sap used for maple syrup.",
    })
  }

  return (
    <main className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Reforestation Assistant</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center space-y-4 min-h-[300px]">
              <div className="w-32 h-32 bg-emerald-50 rounded-full flex items-center justify-center">
                <Leaf className="h-16 w-16 text-emerald-500" />
              </div>
              <Button onClick={identifyPlant} className="bg-emerald-600 hover:bg-emerald-700">
                Identify Plant
              </Button>
              <p className="text-sm text-muted-foreground text-center">Click to simulate identifying a plant</p>
            </div>
          </CardContent>
        </Card>

        <RecommendationCard identifiedPlant={identifiedPlant} />
      </div>
    </main>
  )
}
