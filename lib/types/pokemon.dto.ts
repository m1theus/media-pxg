export interface Pokemon {
  nome: string;
  image: string;
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

export const ballTypes: (keyof BallData)[] = [
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

export const ballNames: Record<keyof BallData, string> = {
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

export const ballImages: Record<keyof BallData, string> = {
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
