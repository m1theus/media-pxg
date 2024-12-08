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

export interface Pokemon {
  nome: string;
  numero: number;
  level: number;
  ball1: string;
  ball2: string;
  clan1: string;
  clan2: string;
  tipo1: string;
  tipo2: string;
  regiao: string;
  geracao: string;
  dificuldade: string;
  xpcaught: string;
  pricenpc: string;
  shiny: string;
  fast: string;
  heavy: string;
  preevo2: string;
  preevo1: string;
  evo1: string;
  evo2: string;
  npreevo2: string;
  npreevo1: string;
  nevo1: string;
  nevo2: string;
  mapas: string;
  vip: string;
  moves: string;
  loots: string;
  evoStone: string;
  boost: string;
  booStone: string;
  habilidades: string;
  tablepb: number;
  tablegb: number;
  tablesb: number;
  tableub: number;
  tablebe1: number;
  tablebe2: number;
  tablebe3: number;
  tablebe4: number;
  tablesfb: number;
}

const ballTypes: (keyof BallData)[] = [
  "tablepb",
  "tablegb",
  "tablesb",
  "tableub",
  "tablebe1",
  "tablebe2",
  "tablebe3",
  "tablebe4",
  "tablesfb",
];

const ballNames: Record<keyof BallData, string> = {
  tablepb: "Poké Ball",
  tablegb: "Great Ball",
  tablesb: "Super Ball",
  tableub: "Ultra Ball",
  tablebe1: "Beast Ball 1",
  tablebe2: "Beast Ball 2",
  tablebe3: "Beast Ball 3",
  tablebe4: "Beast Ball 4",
  tablesfb: "Safari Ball",
};

const ballImages: Record<keyof BallData, string> = {
  tablepb: "pokeball.png",
  tablegb: "greatball.png",
  tablesb: "superball.png",
  tableub: "ultraball.png",
  tablebe1: "yumeball.png",
  tablebe2: "soraball.png",
  tablebe3: "tinkerball.png",
  tablebe4: "maguball.png",
  tablesfb: "saffariball.png",
};

export interface BallData {
  tablepb: number;
  tablegb: number;
  tablesb: number;
  tableub: number;
  tablebe1: number;
  tablebe2: number;
  tablebe3: number;
  tablebe4: number;
  tablesfb: number;
}

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
      const filtered = pokemons.filter((pokemon) =>
        pokemon.nome.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPokemons(filtered);
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

      {/* <div className="mb-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">4</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div> */}

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
                  <div className="relative w-48 h-48 bg-black mb-2">
                    <Image
                      src={`/images/${pokemon.nome}.png`}
                      alt={pokemon.nome}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-lg">Level: {pokemon.level}</p>
                </CardContent>
                <CardFooter className="flex flex-col items-start">
                  <h3 className="text-sm font-semibold mb-2">
                    Catch Averages:
                  </h3>
                  <div className="grid grid-cols-3 gap-2 w-full">
                    {ballTypes?.map((ballType) => (
                      <div
                        key={ballType}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <Image
                            src={`/images/balls/${ballImages[ballType]}`}
                            alt={ballNames[ballType]}
                            width={32}
                            height={32}
                            className="object-contain"
                          />
                          <span className="text-xs">{pokemon[ballType]}</span>
                        </div>
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
