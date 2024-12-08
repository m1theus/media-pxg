import { NextResponse } from "next/server";
import { readFileSync } from "node:fs";
import path from "node:path";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 9; // Items per page

  try {
    const filePath = path.join(process.cwd(), "public", "pokemons.json");
    const fileContents = readFileSync(filePath, "utf-8");
    const data = JSON.parse(fileContents);

    // const data = JSON.parse(readFileSync("pokemon.json"));
    // const response = await fetch(
    //   `https://pokeapi.co/api/v2/pokemon/${query?.toLowerCase() || ""}`
    // );
    // const data = await response.json();

    // const pokemon = {
    //   name: data.name,
    //   image: data.sprites.front_default,
    //   level: 20,
    // };

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json([{ error: "Pokemon not found" }], { status: 404 });
  }
}
