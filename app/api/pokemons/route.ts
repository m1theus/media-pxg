import { Pokemon } from "@/app/page";
import { PokeAPI } from "@/lib/types/pokeapi.dto";
import { NextResponse } from "next/server";
import { readFileSync } from "node:fs";
import path from "node:path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "pokemons.json");
    const fileContents = readFileSync(filePath, "utf-8");
    const data: Pokemon[] = JSON.parse(fileContents);

    const pokesWithoutImage = data.filter(
      (pokemon) => pokemon.image === null || pokemon.image === undefined
    );

    if (pokesWithoutImage) {
      const promises = data.map(async (poke: Pokemon) => {
        if (poke.image === null || poke.image === undefined) {
          console.log("no image", poke.image, poke.nome);
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${poke.numero || ""}`
          );
          if (response.ok) {
            const pokeAPI: PokeAPI = await response.json();
            poke["image"] = pokeAPI.sprites.front_default;
          }
        }
      });

      await Promise.all(promises);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.log({ error });
    return NextResponse.json([{ error: "Pokemon not found" }], { status: 404 });
  }
}
