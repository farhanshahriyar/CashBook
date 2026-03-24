import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { budgetsTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

// GET /api/budgets - List all budgets
router.get("/", async (_req, res) => {
  try {
    const budgets = await db.select().from(budgetsTable);

    const formatted = budgets.map((b) => ({
      id: b.id,
      category: b.category,
      limit: Number(b.limitAmount),
      spent: Number(b.spent),
      color: b.color,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error fetching budgets:", err);
    res.status(500).json({ error: "Failed to fetch budgets" });
  }
});

// POST /api/budgets - Create a new budget
router.post("/", async (req, res) => {
  try {
    const { category, limit, spent, color } = req.body;

    const [budget] = await db
      .insert(budgetsTable)
      .values({
        category,
        limitAmount: String(limit),
        spent: String(spent || 0),
        color,
      })
      .returning();

    res.status(201).json({
      id: budget.id,
      category: budget.category,
      limit: Number(budget.limitAmount),
      spent: Number(budget.spent),
      color: budget.color,
    });
  } catch (err) {
    console.error("Error creating budget:", err);
    res.status(500).json({ error: "Failed to create budget" });
  }
});

// PUT /api/budgets/:id - Update a budget's spent amount
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { spent } = req.body;

    const [budget] = await db
      .update(budgetsTable)
      .set({ spent: String(spent), updatedAt: new Date() })
      .where(eq(budgetsTable.id, id))
      .returning();

    res.json({
      id: budget.id,
      category: budget.category,
      limit: Number(budget.limitAmount),
      spent: Number(budget.spent),
      color: budget.color,
    });
  } catch (err) {
    console.error("Error updating budget:", err);
    res.status(500).json({ error: "Failed to update budget" });
  }
});

export default router;
