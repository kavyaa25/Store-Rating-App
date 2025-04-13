"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

// Mock data for stores
const storesData = [
  {
    id: "1",
    name: "Coffee Haven",
    address: "123 Main Street, Cityville",
    rating: 4.5,
    userRating: 4,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "2",
    name: "Bookworm Paradise",
    address: "456 Oak Avenue, Townsville",
    rating: 4.2,
    userRating: null,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "3",
    name: "Tech Gadgets",
    address: "789 Pine Road, Villageton",
    rating: 3.8,
    userRating: 3,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "4",
    name: "Fresh Groceries",
    address: "101 Maple Lane, Hamletville",
    rating: 4.7,
    userRating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "5",
    name: "Fashion Forward",
    address: "202 Cedar Street, Boroughtown",
    rating: 4.0,
    userRating: null,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "6",
    name: "Healthy Bites",
    address: "303 Birch Boulevard, Villageton",
    rating: 4.3,
    userRating: null,
    image: "/placeholder.svg?height=80&width=80",
  },
]

interface StoresListProps {
  searchQuery: string
}

export function UserStoresList({ searchQuery }: StoresListProps) {
  const { toast } = useToast()
  const [stores, setStores] = useState(storesData)
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [selectedStore, setSelectedStore] = useState<(typeof storesData)[0] | null>(null)

  // Filter stores based on search query
  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleRatingSubmit = () => {
    if (!selectedStore || selectedRating === null) return

    // Update the store rating in our state
    setStores(stores.map((store) => (store.id === selectedStore.id ? { ...store, userRating: selectedRating } : store)))

    toast({
      title: "Rating submitted",
      description: `You rated ${selectedStore.name} ${selectedRating} out of 5 stars.`,
    })

    setSelectedStore(null)
    setSelectedRating(null)
  }

  const openRatingDialog = (store: (typeof storesData)[0]) => {
    setSelectedStore(store)
    setSelectedRating(store.userRating || null)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence>
        {filteredStores.length > 0 ? (
          filteredStores.map((store, index) => (
            <motion.div
              key={store.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <Card className="overflow-hidden border-purple-200 dark:border-purple-800 bg-white/90 dark:bg-black/80 backdrop-blur-sm hover:shadow-lg hover:shadow-purple-200/20 dark:hover:shadow-purple-900/20 transition-all duration-300">
                <CardHeader className="pb-2 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                      <img
                        src={store.image || "/placeholder.svg"}
                        alt={store.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-purple-700 dark:text-purple-300">{store.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground">{store.address}</p>
                  <div className="mt-2 flex items-center">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                        >
                          <Star
                            className={`h-4 w-4 ${
                              i < Math.round(store.rating)
                                ? "fill-purple-500 text-purple-500"
                                : "fill-muted text-muted-foreground"
                            }`}
                          />
                        </motion.div>
                      ))}
                    </div>
                    <span className="ml-2 text-sm font-medium">{store.rating.toFixed(1)}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm">
                    {store.userRating ? (
                      <div className="flex items-center">
                        <span className="mr-2">Your rating:</span>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < store.userRating
                                  ? "fill-purple-500 text-purple-500"
                                  : "fill-muted text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">Not rated yet</span>
                    )}
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openRatingDialog(store)}
                        className="border-purple-300 hover:bg-purple-100 hover:text-purple-700 dark:border-purple-800 dark:hover:bg-purple-900 dark:hover:text-purple-300"
                      >
                        {store.userRating ? "Update Rating" : "Rate Store"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-purple-200 dark:border-purple-800">
                      <DialogHeader>
                        <DialogTitle className="text-purple-700 dark:text-purple-300">
                          Rate {selectedStore?.name}
                        </DialogTitle>
                        <DialogDescription>How would you rate your experience with this store?</DialogDescription>
                      </DialogHeader>
                      <RadioGroup
                        value={selectedRating?.toString() || ""}
                        onValueChange={(value) => setSelectedRating(Number.parseInt(value))}
                        className="flex justify-center gap-4 py-4"
                      >
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <div key={rating} className="flex flex-col items-center gap-1">
                            <RadioGroupItem
                              value={rating.toString()}
                              id={`rating-${rating}`}
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor={`rating-${rating}`}
                              className="flex h-12 w-12 cursor-pointer flex-col items-center justify-center rounded-full border border-purple-200 dark:border-purple-800 transition-all duration-200 peer-data-[state=checked]:border-purple-500 peer-data-[state=checked]:bg-purple-500 peer-data-[state=checked]:text-white"
                            >
                              <motion.span whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                                {rating}
                              </motion.span>
                            </Label>
                            <span className="text-xs">{rating === 1 ? "Poor" : rating === 5 ? "Excellent" : ""}</span>
                          </div>
                        ))}
                      </RadioGroup>
                      <DialogFooter>
                        <Button
                          onClick={handleRatingSubmit}
                          disabled={selectedRating === null}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        >
                          Submit Rating
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </motion.div>
          ))
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center py-10">
            <h3 className="text-lg font-medium text-purple-700 dark:text-purple-300">No stores found</h3>
            <p className="text-muted-foreground">Try adjusting your search query</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
