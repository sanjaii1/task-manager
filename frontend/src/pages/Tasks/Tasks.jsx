import useTasks from "../../hooks/useTasks";

export default function Tasks() {
  const { tasks, updateStatus } = useTasks();

  return (
    <div className="p-6">
      {tasks.map(t => (
        <div key={t._id} className="border p-3 mb-2">
          <h3>{t.title}</h3>
          <select value={t.status} onChange={(e)=>updateStatus(t._id,e.target.value)}>
            <option>pending</option>
            <option>in-progress</option>
            <option>done</option>
          </select>
        </div>
      ))}
    </div>
  );
}
