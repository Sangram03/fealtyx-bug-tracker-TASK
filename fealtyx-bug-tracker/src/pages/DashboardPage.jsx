import { useAuthStore } from '../store/authStore';
import { useTaskStore } from '../store/taskStore';
import TaskCard from '../components/TaskCard';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { tasks, addTask } = useTaskStore();

  const handleAdd = () => {
    const title = prompt('Task Title');
    if (title) {
      addTask({ title, description: '', priority: 'Medium', assignee: user.username });
    }
  };

  return (
    <div>
      <h1>Welcome {user.username} ({user.role})</h1>
      {user.role === 'Developer' && <button onClick={handleAdd}>Add Task</button>}
      <div className="task-list">
        {tasks.filter(t => user.role === 'Manager' || t.assignee === user.username).map(task =>
          <TaskCard key={task.id} task={task} />
        )}
      </div>
    </div>
  );
}
