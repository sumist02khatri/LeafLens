"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, TreeDeciduous } from "lucide-react"

interface Plant {
  commonName: string
  scientificName: string
  description: string
}

interface RecommendationCardProps {
  identifiedPlant: Plant | null
}

async function getRecommendations(lat: number, lng: number, plant: Plant) {
  // This would be replaced with your actual API call
  console.log(`Fetching recommendations for ${plant.commonName} at ${lat}, ${lng}`)

  // Simulate API call
  return new Promise<Plant[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          commonName: "Red Oak",
          scientificName: "Quercus rubra",
          description: "A large deciduous tree with broad spreading branches that provide excellent shade.",
        },
        {
          commonName: "White Pine",
          scientificName: "Pinus strobus",
          description: "Fast-growing evergreen with soft, bluish-green needles that are excellent for reforestation.",
        },
        {
          commonName: "River Birch",
          scientificName: "Betula nigra",
          description: "Highly adaptable tree with distinctive peeling bark, good for erosion control.",
        },
      ])
    }, 1500)
  })
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ identifiedPlant }) => {
  const [recommendations, setRecommendations] = useState<Plant[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (identifiedPlant) {
      loadRecommendations()
    }
  }, [identifiedPlant])

  const loadRecommendations = async () => {
    if (!identifiedPlant) return

    try {
      setLoading(true)
      // Generate location with some randomness around a base point
      const lat = 40 + (Math.random() * 10 - 5)
      const lng = -90 + (Math.random() * 20 - 10)

      const results = await getRecommendations(lat, lng, identifiedPlant)
      setRecommendations(results)
    } catch (error) {
      console.error("Error loading recommendations:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!identifiedPlant) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-emerald-600" />
            Reforestation Recommendations
          </CardTitle>
          <CardDescription>Identify a plant to get reforestation recommendations</CardDescription>
        </CardHeader>
        <CardContent className="h-48 flex items-center justify-center text-muted-foreground text-sm">
          <p>No plant identified yet</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-emerald-600" />
          Reforestation Recommendations
        </CardTitle>
        <CardDescription>Native species compatible with your area</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="h-48 flex items-center justify-center">
            <div className="animate-pulse space-y-2 text-center">
              <TreeDeciduous className="h-8 w-8 text-emerald-400 mx-auto" />
              <p className="text-sm text-emerald-500">Finding compatible species...</p>
            </div>
          </div>
        ) : recommendations.length > 0 ? (
          <div className="space-y-3">
            {recommendations.map((plant, index) => (
              <div key={index} className="plant-card border border-emerald-100 rounded-md p-3 animate-in fade-in">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-emerald-800">{plant.commonName}</h3>
                    <p className="text-xs italic text-emerald-600">{plant.scientificName}</p>
                  </div>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    Native
                  </Badge>
                </div>
                <p className="text-xs text-emerald-700 mt-2 line-clamp-2">{plant.description}</p>
              </div>
            ))}
            <p className="text-xs text-emerald-600 italic text-center">
              These native species are well-suited for reforestation in your area
            </p>
          </div>
        ) : (
          <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
            <p>No recommendations available</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default RecommendationCard
