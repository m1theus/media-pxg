"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default function PokemonSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState("3");

  useEffect(() => {
    async function fetchPokemons() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/pokemons");
        const data = await response.json();
        setPokemons(data);
      } catch (error) {
        console.error("Failed to fetch pokemons:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPokemons();
  }, []);

  const filteredPokemons = useMemo(() => {
    if (!debouncedSearchQuery.trim()) return pokemons;

    const queryAsNumber = +debouncedSearchQuery;
    return !Number.isNaN(queryAsNumber)
      ? pokemons.filter((pokemon) => +pokemon.level === queryAsNumber)
      : pokemons.filter((pokemon) =>
          pokemon.nome
            .toLowerCase()
            .includes(debouncedSearchQuery.toLowerCase())
        );
  }, [debouncedSearchQuery, pokemons]);

  const paginatedPokemons = useMemo(() => {
    const startIndex = (currentPage - 1) * Number(itemsPerPage);
    const endIndex = startIndex + Number(itemsPerPage);
    return filteredPokemons.slice(startIndex, Number(endIndex));
  }, [filteredPokemons, currentPage, itemsPerPage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (
      currentPage < Math.ceil(filteredPokemons.length / Number(itemsPerPage))
    ) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredPokemons.length / Number(itemsPerPage));

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
          onChange={handleInputChange}
          className="flex-1"
        />
        <Button variant="outline" className="w-24">
          Search
        </Button>
      </div>

      <div className="mb-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={handlePrevPage}
                isActive={currentPage === 1}
              />
            </PaginationItem>

            <Select
              onValueChange={handleItemsPerPageChange}
              defaultValue={itemsPerPage}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Items per page" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {["20", "50", "100", "200", "500"].map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={handleNextPage}
                isActive={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="border-2 p-4">
                <Skeleton className="h-48 w-48 bg-gray-200 mb-4" />
                <Skeleton className="h-6 w-3/4 bg-gray-200 mb-2" />
                <Skeleton className="h-4 w-1/2 bg-gray-200" />
              </div>
            ))
          : paginatedPokemons?.map((pokemon, index) => (
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
