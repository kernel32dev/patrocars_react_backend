interface Montadora {
    id: number;
    nome: string;
    paisOrigem: string;
    anoFundacao: number;
    website: string | null;
}

interface Veiculos {
    id: number;
    nome: string;
    montadoraId: number;
    anoLancamento: number;
    preco: number;
    combustivel: string;
    potencia?: number;
    consumoMedio?: number;
    statusProducao: boolean;
}

let montadoraId = 0;
let veiculoId = 0;

export const montadoras = new Map<number, Montadora>();
export const veiculos = new Map<number, Veiculos>();

export function genMontadoraId(): number {
    return ++montadoraId;
}

export function genVeiculoId(): number {
    return ++veiculoId;
}

export class MontadoraByIdNotFoundError extends Error {
    constructor(readonly id: number) {
        super(`Montadora com ID ${id} não encontrada.`);
    }
}

export class VeiculoByIdNotFoundError extends Error {
    constructor(readonly id: number) {
        super(`Veículo com ID ${id} não encontrada.`);
    }
}

export function selectMontadora(): Montadora[] {
    return Array.from(montadoras.values());
}

export function insertMontadora(montadora: Omit<Montadora, "id">): Montadora {
    const id = genMontadoraId();
    const newMontadora = { id, ...montadora };
    montadoras.set(id, newMontadora);
    return newMontadora;
}

export function updateMontadora(montadora: Montadora): Montadora {
    if (!montadoras.has(montadora.id)) {
        throw new MontadoraByIdNotFoundError(montadora.id);
    }
    montadoras.set(montadora.id, montadora);
    return montadora;
}

export function deleteMontadora(montadoraId: number): void {
    if (!montadoras.has(montadoraId)) {
        throw new MontadoraByIdNotFoundError(montadoraId);
    }
    montadoras.delete(montadoraId);
    // Remover veículos associados a esta montadora
    for (const [id, veiculo] of veiculos) {
        if (veiculo.montadoraId === montadoraId) {
            veiculos.delete(id);
        }
    }
}

export function selectVeiculo(): Veiculos[] {
    return Array.from(veiculos.values());
}

export function insertVeiculo(veiculo: Omit<Veiculos, "id">): Veiculos {
    if (!montadoras.has(veiculo.montadoraId)) {
        throw new MontadoraByIdNotFoundError(veiculo.montadoraId);
    }
    const id = genVeiculoId();
    const newVeiculo = { id, ...veiculo };
    veiculos.set(id, newVeiculo);
    return newVeiculo;
}

export function updateVeiculo(veiculo: Veiculos): Veiculos {
    if (!veiculos.has(veiculo.id)) {
        throw new VeiculoByIdNotFoundError(veiculo.id);
    }
    if (!montadoras.has(veiculo.montadoraId)) {
        throw new MontadoraByIdNotFoundError(veiculo.montadoraId);
    }
    veiculos.set(veiculo.id, veiculo);
    return veiculo;
}

export function deleteVeiculo(veiculoId: number): void {
    if (!veiculos.has(veiculoId)) {
        throw new VeiculoByIdNotFoundError(veiculoId);
    }
    veiculos.delete(veiculoId);
}
// Inserindo Montadoras
insertMontadora({
    nome: "Toyota",
    paisOrigem: "Japão",
    anoFundacao: 1937,
    website: "https://www.toyota-global.com",
});

insertMontadora({
    nome: "Ford",
    paisOrigem: "Estados Unidos",
    anoFundacao: 1903,
    website: "https://www.ford.com",
});

insertMontadora({
    nome: "Volkswagen",
    paisOrigem: "Alemanha",
    anoFundacao: 1937,
    website: "https://www.volkswagen.com",
});

// Inserindo Veículos
insertVeiculo({
    nome: "Corolla",
    montadoraId: 1, // ID da Toyota
    anoLancamento: 1966,
    preco: 120000,
    combustivel: "Gasolina",
    potencia: 139,
    consumoMedio: 14.5,
    statusProducao: true,
});

insertVeiculo({
    nome: "Hilux",
    montadoraId: 1, // ID da Toyota
    anoLancamento: 1968,
    preco: 250000,
    combustivel: "Diesel",
    potencia: 204,
    consumoMedio: 10.5,
    statusProducao: true,
});

insertVeiculo({
    nome: "Mustang",
    montadoraId: 2, // ID da Ford
    anoLancamento: 1964,
    preco: 350000,
    combustivel: "Gasolina",
    potencia: 450,
    consumoMedio: 8.5,
    statusProducao: true,
});
