import {
    DirectionsBike, DirectionsRun, DownhillSkiing,
    FitnessCenter, Hiking, Pool, SelfImprovement,
    Snowboarding, SportsBasketball, SportsMma,
    SportsTennis, Surfing, Sports
} from "@mui/icons-material";
import type {ComponentType} from "react";

export const sportsIcons: Record<string, ComponentType> = {
    Gym: FitnessCenter,
    Boxing: SportsMma,
    Surfing: Surfing,
    Basketball: SportsBasketball,
    Snowboarding: Snowboarding,
    Hiking: Hiking,
    Yoga: SelfImprovement,
    Cycling: DirectionsBike,
    Swimming: Pool,
    Tennis: SportsTennis,
    Running: DirectionsRun,
    Skiing: DownhillSkiing,
    default: Sports,
};