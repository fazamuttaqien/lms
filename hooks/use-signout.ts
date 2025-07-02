import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

export function useSignOut() {
  const router = useRouter();
  const handleSignOut = async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          toast.success("Sign out successful");
        },
        onError: err => {
          toast.error(`Sign out failed: ${err.error.message}`);
        },
      },
    });
  };

  return handleSignOut;
}
