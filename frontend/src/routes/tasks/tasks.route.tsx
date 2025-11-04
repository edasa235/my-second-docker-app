import {TasksProvider} from "../../components/TasksContext.tsx";
import TodoList from "../../components/todolist.tsx";

export default function Home() {
  // TODO: implement tasks page
  // TODO: use TasksProvider... how?

  return (
    <div className={"container"}>
      <TasksProvider>
        <TodoList />
      </TasksProvider>
    </div>
  );
}
