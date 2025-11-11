import TodoList from "../../components/todolist.tsx";
import {TasksProvider} from "../../providers/tasks/tasks.provider.tsx";

export default function Home() {


  return (
    <div className={"container"}>
      <TasksProvider>
        <TodoList />
      </TasksProvider>
    </div>
  );
}
