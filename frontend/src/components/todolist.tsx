import {useTasks} from "./usetasks.tsx";
import {useEffect} from "react";


const TodoList = () => {
  const {
    tasks,
    loading,
    error,
    fetchTasks,
    createTaskHandler,
    updateTaskHandler,
    deleteTaskHandler,
  } = useTasks();

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h2>Task List</h2>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const title = (form.elements.namedItem("title") as HTMLInputElement).value;
          const description = (form.elements.namedItem("description") as HTMLInputElement).value;

          await createTaskHandler({ title, description });
          form.reset();
        }}
        style={{ marginBottom: "1rem" }}
      >
        <input name="title" placeholder="Title" required />
        <input name="description" placeholder="Description" />
        <button type="submit">Add Task</button>
      </form>

      {/* ✅ Task list */}
      <ul>
        {tasks.map((task, index) => {
          if (task.type === "create" || task.type === "update") {
            return (
              <li key={("id" in task && task.id) || index}>
                <strong>{task.body.title}</strong>
                {task.body.description && <p>{task.body.description}</p>}
                <button
                  onClick={() =>
                    updateTaskHandler(
                      "id" in task ? task.id : "",
                      { title: task.body.title + " (Updated)" }
                    )
                  }
                >
                  Update
                </button>
                {"id" in task && (
                  <button onClick={() => deleteTaskHandler(task.id!)}>Delete</button>
                )}
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
};

export default TodoList;
