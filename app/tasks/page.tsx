import { AppShell } from "@/components/app-shell";
import { TasksWorkspace } from "@/components/tasks-workspace";

export default function TasksPage() {
  return (
    <AppShell>
      <TasksWorkspace />
    </AppShell>
  );
}
