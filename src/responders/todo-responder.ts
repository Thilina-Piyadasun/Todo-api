import TodoSchema from "../common/model/todo-schema";
import { Types } from "mongoose";
import { TodoResponse } from "../common/response/todo-response";
import { RESPONSE_STATUS } from "../common/constants";

export namespace TodoResponder {
  /**
   *
   * This will save the received Todo_item to the mongoDB
   * req.body will contain the newly added todo_item
   * @param req
   * @param res
   */
  export async function save(req: any, res: any): Promise<any> {
    const response = new TodoResponse(RESPONSE_STATUS.FAILED, [], "");

    try {
      const { id, status, description, createDate, endDate } = req.body;

      const todo_schema = new TodoSchema({
        _id: new Types.ObjectId(),
        id: id,
        status: status,
        description: description,
        createDate: createDate,
        endDate: endDate,
      });
      const result = await todo_schema.save();
      response.status = RESPONSE_STATUS.SUCCESS;
      response.data = [result];
      response.message = "Successfully saved to DB";
    } catch (e) {
      console.error("[todo-responder save] Error while saving to DB", e);
      response.message = "Error while saving to DB";
      res.status(500).json(response);
    }
    return res.json(response);
  }

  /**
   * This method will fetch  all the stored todo's
   * @param req
   * @param res
   */
  export async function load(req: any, res: any): Promise<any> {
    const response = new TodoResponse(RESPONSE_STATUS.FAILED, [], "");
    try {
      const result = await TodoSchema.find();
      response.status = RESPONSE_STATUS.SUCCESS;
      response.data = [result];
      response.message = "Successfully load from DB";
    } catch (e) {
      console.error(
        `[todo-responder save] Error while loading data  from DB`,
        e
      );
      response.message = `Error while deleting loading data from DB`;
      res.status(500).json(response);
    }
    return res.json(response);
  }

  export async function deleteTodo(req: any, res: any): Promise<any> {
    const response = new TodoResponse(RESPONSE_STATUS.FAILED, [], "");
    const todo_item_id = req.params["id"];
    try {
      const result = await TodoSchema.findOneAndRemove({ id: todo_item_id });
      response.status = RESPONSE_STATUS.SUCCESS;
      response.data = [result];
      response.message = "Successfully deleted from DB";
    } catch (e) {
      console.error(
        `[todo-responder save] Error while deleting id ${todo_item_id} from DB`,
        e
      );
      response.message = `Error while deleting record id ${todo_item_id} from DB`;
      res.status(500).json(response);
    }
    return res.json(response);
  }

  export async function updateTodoState(req: any, res: any) {
    const response = new TodoResponse(RESPONSE_STATUS.FAILED, [], "");
    const todo_item_id = req.params["id"];
    try {
      const { status } = req.body;
      const dbObject = await TodoSchema.findOne({ id: todo_item_id });
      console.log(dbObject);
      if (dbObject) {
        dbObject.status = status;
        const savedObject = await dbObject.save();
        response.status = RESPONSE_STATUS.SUCCESS;
        response.data = [savedObject];
        response.message = "Successfully deleted from DB";
        res.json(response);
      } else {
        res.status(404).send(response);
      }
    } catch (e) {
      console.error(
        `[todo-responder save] Error while updating id ${todo_item_id} from DB`,
        e
      );
      response.message = `Error while updating record id ${todo_item_id} from DB`;
      res.status(500).json(response);
    }
  }
}
