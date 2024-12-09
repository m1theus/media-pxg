"use client";
import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import mapa from "../../public/mapa-pxg.jpg";

function MapWithMarks() {
  const searchParams = useSearchParams();
  const json = searchParams.get("captions") ?? "";
  const { captions } = JSON.parse(json) ?? [];

  useEffect(() => {
    const addMarkers = () => {
      const target = document.getElementById("image-wrapper");

      for (let index = 0; index < captions.length; index++) {
        const { top, left, text } = JSON.parse(captions[index]);

        const marker = document.createElement("span");
        marker.title = "Location";
        marker.className = `marker pokedex pokedex-1`;
        marker.style.top = `${top}%`;
        marker.style.left = `${left}%`;
        marker.innerHTML = `
        <span class="blink-eff"><i class="fa fa-map-marker" /></span>
        <span class="caption">${text}</span>
      `;
        target?.appendChild(marker);
      }
    };

    addMarkers();
  }, [captions]);

  return (
    <div
      id="image-wrapper"
      style={{ position: "relative", display: "inline-block" }}
    >
      <Image
        src={mapa}
        alt="Image"
        priority
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
}

export default function MapPage() {
  return (
    <Suspense>
      <MapWithMarks />
    </Suspense>
  );
}
