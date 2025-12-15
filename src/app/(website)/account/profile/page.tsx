import { getServerSession } from "next-auth";
import ProfileForm from "./_components/profile-form";
import { authOptions } from "@/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <section>{session && <ProfileForm userInfo={session?.user} />}</section>
    </>
  );
}
