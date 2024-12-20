"use client";

import Head from "next/head";

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
import Link from "next/link";
import { AlertCircle, Github, MapPin } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import IframeModal from "@/components/iframe-modal";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

type FilterType = "name" | "tipo" | "clan";

export default function PokemonSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none");
  const [filterType, setFilterType] = useState<FilterType>("name");

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState("50");

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

    switch (filterType) {
      case "name":
        return pokemons.filter((pokemon) =>
          pokemon.nome
            .toLowerCase()
            .includes(debouncedSearchQuery.toLowerCase())
        );
      case "tipo":
        return pokemons.filter(
          (pokemon) =>
            pokemon.tipo1
              .toLowerCase()
              .includes(debouncedSearchQuery.toLowerCase()) ||
            pokemon.tipo2
              .toLowerCase()
              .includes(debouncedSearchQuery.toLowerCase())
        );
      case "clan":
        return pokemons.filter(
          (pokemon) =>
            pokemon.clan1
              .toLowerCase()
              .includes(debouncedSearchQuery.toLowerCase()) ||
            pokemon.clan2
              .toLowerCase()
              .includes(debouncedSearchQuery.toLowerCase())
        );
      default:
        return pokemons;
    }
  }, [debouncedSearchQuery, pokemons, filterType]);

  const sortedPokemons = useMemo(() => {
    if (sortOrder === "none") return filteredPokemons;

    return [...filteredPokemons].sort((a, b) => {
      const totalBallsA = ballTypes.reduce(
        (sum, type) => sum + (a[type] || 0),
        0
      );
      const totalBallsB = ballTypes.reduce(
        (sum, type) => sum + (b[type] || 0),
        0
      );

      return sortOrder === "asc"
        ? totalBallsA - totalBallsB
        : totalBallsB - totalBallsA;
    });
  }, [filteredPokemons, sortOrder]);

  const paginatedPokemons = useMemo(() => {
    const startIndex = (currentPage - 1) * Number(itemsPerPage);
    const endIndex = startIndex + Number(itemsPerPage);
    return sortedPokemons.slice(startIndex, endIndex);
  }, [sortedPokemons, currentPage, itemsPerPage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleSortOrderChange = (order: "asc" | "desc" | "none") => {
    setSortOrder(order);
  };

  const handleFilterTypeChange = (type: FilterType) => {
    setFilterType(type);
    setSearchQuery("");
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(sortedPokemons.length / Number(itemsPerPage))) {
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

  const totalPages = Math.ceil(sortedPokemons.length / Number(itemsPerPage));

  function getMap(mapas: string) {
    const m = mapas.split(";");
    const captions = m.map((i) => {
      if (`{${i}}` === "{no}") return "#";
      return `{${i}}`;
    });

    if (captions.length > 1) {
      return JSON.stringify({ captions });
    }
    return captions[0] === "#" ? "#" : JSON.stringify({ captions });
  }

  function formatPrice(price: number) {
    return `$ ${new Intl.NumberFormat("pt-BR").format(price)}`;
  }

  return (
    <>
      <Head>
        <title>PxG Catch Average - Pokemon Search</title>
        <meta
          name="description"
          content="Discover catch averages, levels, prices, and more for Pokemon in PxG (PokeXGames)!"
        />
        <meta
          name="keywords"
          content="PxG, Pokemon, Catch Average, Levels, Prices, PokeXGames, Media Ball PXG, Media PXG"
        />
        <meta name="author" content="https://media-pxg.vercel.app" />
        <meta
          property="og:title"
          content="PxG Catch Average - Pokemon Search"
        />
        <meta
          property="og:description"
          content="Discover catch averages, levels, prices, and more for Pokemon in PxG (PokeXGames)!"
        />
        <meta property="og:url" content="https://media-pxg.vercel.app" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://media-pxg.vercel.app/banner.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="PxG Catch Average - Pokemon Search"
        />
        <meta
          name="twitter:description"
          content="Discover catch averages, levels, prices, and more for Pokemon in PxG!"
        />
        <meta
          name="twitter:image"
          content="https://media-pxg.vercel.app/banner.png"
        />
        <link rel="canonical" href="https://media-pxg.vercel.app" />
      </Head>

      <div className="container mx-auto p-4 max-w-6xl">
        <Alert variant="destructive" className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            These catch averages might be outdated! If you&apos;d like to
            contribute with more up-to-date information, please open an issue or
            pull request at the following{" "}
            <Link target="_blank" href="https://github.com/m1theus/media-pxg">
              link
            </Link>
          </AlertDescription>
        </Alert>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">PxG Catch Average</h1>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link target="_blank" href="https://github.com/m1theus/media-pxg">
              <Github />
            </Link>
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <Select
            onValueChange={(value) =>
              handleFilterTypeChange(value as FilterType)
            }
            defaultValue="name"
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="tipo">Type</SelectItem>
                <SelectItem value="clan">Clan</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

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
          <Select
            onValueChange={(value) =>
              handleSortOrderChange(value as "asc" | "desc" | "none")
            }
            defaultValue="none"
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by balls count" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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
                    <div className="text-center m-5">
                      <IframeModal
                        pokemon={pokemon.nome}
                        url={`https://wiki.pokexgames.com/index.php/${pokemon.nome}`}
                      />
                    </div>
                    <CardTitle className="text-center">
                      {pokemon.nome}
                      {getMap(pokemon.mapas) === "#" ? (
                        <></>
                      ) : (
                        <Link
                          target={
                            getMap(pokemon.mapas) === "#" ? "_self" : "_blank"
                          }
                          href={
                            getMap(pokemon.mapas) === "#"
                              ? "#"
                              : `/maps?captions=${getMap(pokemon.mapas)}`
                          }
                        >
                          <MapPin />
                        </Link>
                      )}
                    </CardTitle>
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
                    <div className="flex justify-between w-full px-4">
                      <p className="text-lg">Level: {pokemon.level}</p>
                      <p className="text-lg">
                        Price: {formatPrice(+pokemon.pricenpc)}
                      </p>
                    </div>
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
    </>
  );
}
