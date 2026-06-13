import WeddingInvitation from "@/components/WeddingInvitation";

type HomeProps = {
  searchParams?: Promise<{
    to?: string | string[];
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const rawGuestName = Array.isArray(params?.to) ? params.to[0] : params?.to;
  const initialGuestName = rawGuestName ? rawGuestName.replace(/-/g, " ") : "";

  return <WeddingInvitation initialGuestName={initialGuestName} />;
}
