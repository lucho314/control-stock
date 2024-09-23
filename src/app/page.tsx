import { auth } from "@/auth.config";
import Listproducts from "@/components/list-products";

export default async function Home() {
  let login = false;
  const session = await auth();
  if (session) {
    login = true;
  }
  return <Listproducts login={login} />;
}
