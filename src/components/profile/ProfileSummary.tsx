import { Session } from "next-auth";
import Link from "next/link";
import { Button } from "../ui/button";

const ProfileSummary = ({ session }: { session: Session }) => {
  const plan = () => {
    switch (session.user.plan) {
      case "BASIC":
        return "مبتدی";
      case "PRO":
        return "پیشرفته";
      case "ULTRA":
        return "حرفه ای";
      default:
        break;
    }
  };

  const trial = session.user.maxImages - session.user.imageCount

  return (
    <div className="p-3 rounded-lg bg-secondary flex items-center gap-5">
      <img
        src={session.user.image}
        alt="User Avatar"
        className="w-8 h-8 rounded-full"
      />
      <span className="text-xs font-semibold text-muted-foreground">
        {session.user.email}
      </span>
      <p className="text-primary text-xs font-bold">تعرفه : {plan()}</p>
      <p className="text-primary text-xs font-bold">
        تعداد تصاویر باقی مونده :{" "}
        {trial}
      </p>
      {
        trial === 0 && (
          <Link href="/#pricing" >
          <Button >
            ارتقا تعرفه
          </Button>
          </Link>
        )
      }
    </div>
  );
};

export default ProfileSummary;
