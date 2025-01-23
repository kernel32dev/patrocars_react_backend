import express from "express";
import cors from "cors";
import { catchApiExceptions as api } from "./error";
import * as montadora from "./montadora";
import * as veiculo from "./veiculo";

const app = express();
const port = 4040;

app.use(cors());
app.use(express.json());

app.get("/api/montadora", api(montadora.listMontadoras));
app.post("/api/montadora", api(montadora.createMontadora));
app.put("/api/montadora/:montadoraId", api(montadora.updateMontadora));
app.delete("/api/montadora/:montadoraId", api(montadora.deleteMontadora));

app.get("/api/veiculo", api(veiculo.listVeiculos));
app.post("/api/veiculo", api(veiculo.createVeiculo));
app.put("/api/veiculo/:veiculoId", api(veiculo.updateVeiculo));
app.delete("/api/veiculo/:veiculoId", api(veiculo.deleteVeiculo));

app.listen(port, () => {
    console.log(`Escutando na porta ${port}`);
});
