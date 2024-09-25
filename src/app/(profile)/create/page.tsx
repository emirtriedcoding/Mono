import { auth } from "@/app/auth";
import Create from "@/components/profile/Create";

const CreatePage = async () => {
  const session = await auth();
  return <Create session={session} />;
};

export default CreatePage;
