import { auth } from "@/auth";
import LogoutBtn from "@/components/auth/logout-btn";

async function DashboardPage() {
  const session = await auth();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {session?.user?.email}</p>
      <LogoutBtn />
    </div>
  );
}

export default DashboardPage;
