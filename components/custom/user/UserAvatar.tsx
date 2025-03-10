import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "next-auth";

function UserAvatar({ user, className }: { user: User; className?: string }) {
  return (
    <Avatar className={className}>
      <AvatarImage
        src={`${user?.image}`}
        loading="lazy"
        alt={`${user.name} Avatar`}
      />
      <AvatarFallback>
        {user?.name ? `${user?.name[0] + user?.name[1]}` : "Au"}
      </AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
