import Nav from "@/components/profile/Nav";
import ProfileSummary from "@/components/profile/ProfileSummary";
import { auth } from "../auth";
import { redirect } from "next/navigation";
import RootProvider from "@/provider/RootProvider";

const ProfileLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (!session) return redirect("/");

  console.log(session);

  return (
    <div className="p-5 flex flex-col items-center gap-6">
      <RootProvider>
        <Nav />
        <ProfileSummary session={session} />
        {children}
      </RootProvider>
    </div>
  );
};

export default ProfileLayout;
