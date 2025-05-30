import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { fakeUser } from "./middlewares/fakeUser";
import { ExchangeService } from "./modules/exchange/exchange.service";
import transactionRoutes from "./modules/transactions/routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());
app.use(fakeUser);

app.get("/", (req: Request, res: Response) => {
  res.send("Currency API is running.");
  return;
});

app.get("/test-rate", async (req: Request, res: Response) => {
  try {
    const rate = await ExchangeService.getExchangeRate("USD", "BRL");
    res.json({ rate });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.use("/api", transactionRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorHandler);

export default app;
