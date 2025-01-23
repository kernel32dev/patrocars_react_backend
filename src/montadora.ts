import type { Request, Response } from "express";
import { validate, validateId } from "./utils";
import { z } from "zod";
import * as database from "./database";

export function listMontadoras(req: Request, res: Response) {
    res.json(database.selectMontadora());
}

export function createMontadora(req: Request, res: Response) {
    console.log(req.body);
    const body = validate(req.body, z.object({
        nome: z.string().min(1),
        paisOrigem: z.string().min(1),
        anoFundacao: z.number().min(1850).max(new Date().getFullYear()),
        website: z.string().min(1).nullable(),
    }));
    const montadora = database.insertMontadora(body);
    res.json(montadora);
}

export function updateMontadora(req: Request<{montadoraId: string}>, res: Response) {
    const montadoraId = validateId(req.params.montadoraId);
    const body = validate(req.body, z.object({
        nome: z.string().min(1),
        paisOrigem: z.string().min(1),
        anoFundacao: z.number().min(1850).max(new Date().getFullYear()),
        website: z.string().min(1).nullable(),
    }));
    const montadora = database.updateMontadora({
        id: montadoraId,
        ...body,
    });
    res.json(montadora);
}

export function deleteMontadora(req: Request<{montadoraId: string}>, res: Response) {
    const montadoraId = validateId(req.params.montadoraId);
    database.deleteMontadora(montadoraId);
    res.json({});
}
