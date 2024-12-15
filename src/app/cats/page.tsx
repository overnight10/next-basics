"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import LoadMoreCats from "@/fragments/cats/loadMoreCats";
import Image from "next/image";
import { useEffect, useState } from "react";

const fetchCats = async ({ limit = 10 }: { limit?: number } = {}) => {
  return await fetch(`https://api.thecatapi.com/v1/images/search?limit=${limit}`)
    .then((res) => res.json())
};

type Cat = {
  id: string;
  url: string;
  width: number;
  height: number;
};

type Result = {
  state: "idle";
} | {
  state: "loading";
} | {
  state: "success";
  cats: Cat[];
} | {
  state: "error";
  message: string;
}

export default function Cats() {
  const [result, setResult] = useState<Result>({ state: "idle" });
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const count = result.state === "success" ? result.cats.length : 0

  const loadMore = () => {
    const prevCats = result.state === "success" ? result.cats : []
    fetchCats({ limit: 10 }).then((cats) => {
      setResult(() => ({ state: "success", cats: [...prevCats, ...cats] }));
    }).catch((error) => {
      setResult(() => ({ state: "error", message: error.message }));
    });
  }

  useEffect(() => {
    setResult(() => ({ state: "loading" }));
    fetchCats().then((cats) => {
      setResult(() => ({ state: "success", cats }));
    }).catch((error) => {
      setResult(() => ({ state: "error", message: error.message }));
    });
  }, []);

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(() => api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(() => api.selectedScrollSnap() + 1)
    })

  }, [api])

  return (
    <div className="mx-auto max-w-xs">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {(result.state === "idle" || result.state === "loading") && (
            <div className="flex h-full items-center justify-center">
              <Skeleton className="h-80 w-80 bg-gray-200 rounded-xl" />
            </div>
          )}
          {result.state === "success" && (
            result.cats.map((cat) => (
              <CarouselItem key={cat.id}>
                <Card>
                  <CardContent className="w-80 h-80 rounded-md flex flex-col items-center justify-between gap-y-2 p-0">
                    <Image
                      src={cat.url}
                      alt={cat.id}
                      width={cat.width}
                      height={cat.height}
                      className="max-w-full object-cover max-h-64 rounded-md"
                      unoptimized={true}
                    />
                    <CardFooter className="text-base font-semibold w-fit h-fit">{cat.id}</CardFooter>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))
          )}
          {result.state === "error" && (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-muted-foreground">
                {result.message}
              </p>
            </div>
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        {result.state === "idle" && "Fetching cats..."}
        {result.state === "loading" && "Loading cats..."}
        {result.state === "success" && <>Slide {current} of {count}</>}
      </div>
      <LoadMoreCats disabled={result.state === "idle" || result.state === "loading"} onClick={loadMore} />
    </div>
  )
}
