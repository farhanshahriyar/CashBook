import { Router, type IRouter } from "express";
import healthRouter from "./health";
import transactionsRouter from "./transactions";
import budgetsRouter from "./budgets";
import goalsRouter from "./goals";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/transactions", transactionsRouter);
router.use("/budgets", budgetsRouter);
router.use("/goals", goalsRouter);

export default router;
