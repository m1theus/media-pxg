import { NextResponse } from "next/server";
import { readFileSync } from "node:fs";
import path from "node:path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "pokemons.json");
    const fileContents = readFileSync(filePath, "utf-8");
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.log({ error });
    return NextResponse.json([{ error: "Pokemon not found" }], { status: 404 });
  }
}
