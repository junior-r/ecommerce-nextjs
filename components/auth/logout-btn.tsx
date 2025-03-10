import logout from "@/actions/logout";
import { Button } from "@/components/ui/button";

function LogoutBtn() {
  return <Button onClick={logout}>Logout</Button>;
}

export default LogoutBtn;
