import logout from "@/actions/logout";
import { Button } from "@/components/ui/button";

function LogoutBtn() {
  return (
    <Button onClick={logout} variant={"destructive"}>
      Logout
    </Button>
  );
}

export default LogoutBtn;
