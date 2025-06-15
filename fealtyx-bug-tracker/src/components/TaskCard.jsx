import { useTaskStore } from '../store/taskStore';
import { useAuthStore } from '../store/authStore';

export default function TaskCard({ task }) {
  const { updateTask, deleteTask, logTime } = useTaskStore();
  const { user } = useAuthStore();

  const closeTask = () => updateTask(task.id, { status: 'Pending Approval' });
  const approveTask = () => updateTask(task.id, { status: 'Closed' });
  const reopenTask = () => updateTask(task.id, { status: 'Open' });

  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>Status: {task.status}</p>
      <p>Priority: {task.priority}</p>
      <p>Assignee: {task.assignee}</p>
      <p>Total time: {task.timeLogs.reduce((a, b) => a + b.duration, 0)} min</p>
      {user.role === 'Developer' && (
        <>
          <button onClick={() => closeTask()}>Close Task</button>
          <button onClick={() => logTime(task.id, 30)}>Log 30 min</button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </>
      )}
      {user.role === 'Manager' && task.status === 'Pending Approval' && (
        <>
          <button onClick={approveTask}>Approve</button>
          <button onClick={reopenTask}>Reopen</button>
        </>
      )}
    </div>
  );
}
