import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { savingGoalsTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

// GET /api/goals - List all saving goals
router.get("/", async (_req, res) => {
  try {
    const goals = await db.select().from(savingGoalsTable);

    const formatted = goals.map((g) => ({
      id: g.id,
      title: g.title,
      targetAmount: Number(g.targetAmount),
      savedAmount: Number(g.savedAmount),
      deadline: g.deadline.toISOString(),
      emoji: g.emoji,
      color: g.color,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error fetching goals:", err);
    res.status(500).json({ error: "Failed to fetch goals" });
  }
});

// POST /api/goals - Create a new saving goal
router.post("/", async (req, res) => {
  try {
    const { title, targetAmount, savedAmount, deadline, emoji, color } = req.body;

    const [goal] = await db
      .insert(savingGoalsTable)
      .values({
        title,
        targetAmount: String(targetAmount),
        savedAmount: String(savedAmount || 0),
        deadline: new Date(deadline),
        emoji,
        color,
      })
      .returning();

    res.status(201).json({
      id: goal.id,
      title: goal.title,
      targetAmount: Number(goal.targetAmount),
      savedAmount: Number(goal.savedAmount),
      deadline: goal.deadline.toISOString(),
      emoji: goal.emoji,
      color: goal.color,
    });
  } catch (err) {
    console.error("Error creating goal:", err);
    res.status(500).json({ error: "Failed to create goal" });
  }
});

// PUT /api/goals/:id - Update a goal's saved amount
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { savedAmount } = req.body;

    const [goal] = await db
      .update(savingGoalsTable)
      .set({ savedAmount: String(savedAmount), updatedAt: new Date() })
      .where(eq(savingGoalsTable.id, id))
      .returning();

    res.json({
      id: goal.id,
      title: goal.title,
      targetAmount: Number(goal.targetAmount),
      savedAmount: Number(goal.savedAmount),
      deadline: goal.deadline.toISOString(),
      emoji: goal.emoji,
      color: goal.color,
    });
  } catch (err) {
    console.error("Error updating goal:", err);
    res.status(500).json({ error: "Failed to update goal" });
  }
});

// DELETE /api/goals/:id - Delete a saving goal
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.delete(savingGoalsTable).where(eq(savingGoalsTable.id, id));
    res.status(204).send();
  } catch (err) {
    console.error("Error deleting goal:", err);
    res.status(500).json({ error: "Failed to delete goal" });
  }
});

export default router;
