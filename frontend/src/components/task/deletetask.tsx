import {deletetask} from "../apicalls.tsx";
import React from "react";

interface DeleteTasksProps {
    id: string;
    ondelete?: () => void;
}
const deletetasks = ({ id, ondelete }: DeleteTasksProps) => {

    const [deleting, setDeleting] = React.useState(false);
    const handleDelete = async (taskId: string) => {
        try {
            setDeleting(true);
            await deletetask(taskId);
            console.log(`Task with id ${taskId} deleted successfully.`);
            ondelete?.();
        } catch (error) {
            console.error(`Failed to delete task with id ${taskId}:`, error);
        }
        finally {
            setDeleting(false);
        }
    };
    return (
        <button
            disabled={!id || deleting}

    onClick={() => {
                if (id && window.confirm("Are you sure you want to delete this task?")) {
                   void handleDelete(id);
                }
            }}
        >
            {deleting ? "Deleting..." : "Delete"}

        </button>
    );
};
export default deletetasks;
