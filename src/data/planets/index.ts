/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import type { PlanetData } from "@/lib/schemas";

import MercuryData from "./mercury.toml";
import VenusData from "./venus.toml";
import EarthData from "./earth.toml";
import MarsData from "./mars.toml";
import JupiterData from "./jupiter.toml";
import SaturnData from "./saturn.toml";
import UranusData from "./uranus.toml";
import NeptuneData from "./neptune.toml";
import PlutoData from "./pluto.toml";
import ArcadiaData from "./arcadia.toml";
import DaguerreData from "./daguerre.toml";
import NortiaData from "./nortia.toml";
import OrpheusData from "./orpheus.toml";
import MoritakumiData from "./moritakumi.toml";
import GanymedeData from "./ganymede.toml";
import CydoniaData from "./cydonia.toml";


export const Mercury = MercuryData as PlanetData;
export const Venus = VenusData as PlanetData;
export const Earth = EarthData as PlanetData;
export const Mars = MarsData as PlanetData;
export const Jupiter = JupiterData as PlanetData;
export const Saturn = SaturnData as PlanetData;
export const Uranus = UranusData as PlanetData;
export const Neptune = NeptuneData as PlanetData;
export const Pluto = PlutoData as PlanetData;

export const Arcadia = ArcadiaData as PlanetData;
export const Daguerre = DaguerreData as PlanetData;
export const Nortia = NortiaData as PlanetData;
export const Orpheus = OrpheusData as PlanetData;
export const Moritakumi = MoritakumiData as PlanetData;
export const Ganymede = GanymedeData as PlanetData;
export const Cydonia = CydoniaData as PlanetData;

export const AllMajorPlanets = [
    Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto
] as const;

export const AllMinorPlanets = [
    Arcadia, Daguerre, Nortia, Orpheus, Moritakumi, Ganymede, Cydonia
] as const;

export const AllPlanets = [
    // ...AllMajorPlanets,
    ...AllMinorPlanets,
] as const;
