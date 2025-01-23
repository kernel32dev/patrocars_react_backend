import type { Request, Response } from "express";
import { validate, validateId } from "./utils";
import { z } from "zod";
import * as database from "./database";

export function listVeiculos(req: Request, res: Response) {
    res.json(database.selectVeiculo());
}

export function createVeiculo(req: Request, res: Response) {
    const body = validate(req.body, z.object({
        nome: z.string().min(1),
        montadoraId: z.number(),
        anoLancamento: z.number().min(1886).max(new Date().getFullYear()),
        preco: z.number().positive(),
        combustivel: z.string().min(1),
        potencia: z.number().optional(),
        consumoMedio: z.number().positive().optional(),
        statusProducao: z.boolean(),
    }));
    const veiculo = database.insertVeiculo(body);
    res.json(veiculo);
}

export function updateVeiculo(req: Request<{veiculoId: string}>, res: Response) {
    const veiculoId = validateId(req.params.veiculoId);
    const body = validate(req.body, z.object({
        nome: z.string().min(1),
        montadoraId: z.number(),
        anoLancamento: z.number().min(1886).max(new Date().getFullYear()),
        preco: z.number().positive(),
        combustivel: z.string().min(1),
        potencia: z.number().optional(),
        consumoMedio: z.number().positive().optional(),
        statusProducao: z.boolean(),
    }));
    const veiculo = database.updateVeiculo({
        id: veiculoId,
        ...body,
    });
    res.json(veiculo);
}

export function deleteVeiculo(req: Request<{veiculoId: string}>, res: Response) {
    const veiculoId = validateId(req.params.veiculoId);
    database.deleteVeiculo(veiculoId);
    res.json({});
}
