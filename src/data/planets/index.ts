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

export const Cydonia = CydoniaData as PlanetData;
