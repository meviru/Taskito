import { Http } from "./http-client";
import { Constants } from "@/constants/index";
class TodoList {
    /**
   * This service is used to get Todos List
   * @returns Response from server
   */
    getTodos(): Promise<any> {
        return Http.get(Constants.API_URL.TODOS);
    }
}

export const TodoListService = new TodoList();