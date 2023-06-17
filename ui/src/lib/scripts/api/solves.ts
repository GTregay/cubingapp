import { post } from "./common";

export type MinSolve = {
    id: number;
    time: number;
}

export type Penalty = undefined | "+2" | "DNF";

export type Solve = 
    MinSolve & {
    uid: number;
    scramble: string;
    moves: string;
    puzzle: string;
    sessionId: number;
    penalty: Penalty;
}

export async function create(solve: Solve): Promise<{ id: number }> {
    return post("/createSolve", solve);
}

export async function read(id: number): Promise<Solve> {
    return post("/readSolve", { id });
}

export async function readAll(sessionId: number): Promise<MinSolve[]> {
    return (await post("/readSolves", { sessionId })) ?? [];
}

export async function del(id: number): Promise<void> {
    return post("/deleteSolve", { id });
}