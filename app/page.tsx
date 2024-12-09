"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ballImages,
  ballNames,
  ballTypes,
  Pokemon,
} from "@/lib/types/pokemon.dto";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function PokemonSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetch("/api/pokemons")
      .then((response) => response.json())
      .then((data) => {
        setPokemons(data);
        setFilteredPokemons(data);
      });
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredPokemons(pokemons);
    } else {
      const q = +searchQuery;
      if (!Number.isNaN(q) && typeof q === "number") {
        const filtered = pokemons.filter((pokemon) => +pokemon.level === q);
        setFilteredPokemons(filtered);
      } else {
        const filtered = pokemons.filter((pokemon) =>
          pokemon.nome.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredPokemons(filtered);
      }
    }
  }, [searchQuery, pokemons]);

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">PxG Catch Average</h1>
        <ThemeToggle />
      </div>

      <div className="flex gap-4 mb-8">
        <Input
          type="text"
          placeholder="Type a pokemon name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button variant="outline" className="w-24">
          Search
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!filteredPokemons || filteredPokemons.length == 0
          ? Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="border-2 p-4">
                <Skeleton className="h-48 w-48 bg-gray-200 mb-4" />
                <Skeleton className="h-6 w-3/4 bg-gray-200 mb-2" />
                <Skeleton className="h-4 w-1/2 bg-gray-200" />
              </div>
            ))
          : filteredPokemons?.map((pokemon, index) => (
              <Card key={index} className="border-2">
                <CardHeader>
                  <CardTitle className="text-center">{pokemon.nome}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="relative w-64 h-64 mb-2">
                    <Image
                      priority
                      src={`/images/pokemons/${pokemon.numero}.png`}
                      alt={pokemon.nome}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-lg">Level: {pokemon.level}</p>
                </CardContent>
                <CardFooter className="flex flex-col items-start">
                  <div className="grid grid-cols-3 gap-2 w-full">
                    {ballTypes?.map((ballType) => (
                      <div
                        key={ballType}
                        className="flex items-center justify-between"
                      >
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <div
                                className="flex items-center"
                                aria-label={ballNames[ballType]}
                              >
                                <Image
                                  src={`/images/balls/${ballImages[ballType]}`}
                                  alt={ballNames[ballType]}
                                  width={32}
                                  height={32}
                                  className="object-contain"
                                />
                                <span className="text-xs">
                                  {pokemon[ballType]}
                                </span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                {ballNames[ballType]} - {pokemon[ballType]}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            ))}
      </div>
    </div>
  );
}
