import express from "express";
import { TodoResponder } from "../responders/todo-responder";

/**
 * Routers
 *
 */
const router = express.Router();

router.get("/", TodoResponder.load);
router.post("/", TodoResponder.save);
router.delete("/:id", TodoResponder.deleteTodo);
router.put("/status/:id", TodoResponder.updateTodoState);

export default router;
