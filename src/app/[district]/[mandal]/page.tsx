import { notFound } from "next/navigation";
import {
  fetchMandalPortal,
  listMandalPortalParams,
} from "@/lib/data/mandalRepository";
import { MandalPortalClient } from "@/components/MandalPortalClient";

export const revalidate = 60;

type Props = {
  params: Promise<{ district: string; mandal: string }>;
};

export async function generateStaticParams() {
  return listMandalPortalParams();
}

export default async function MandalHubPage({ params }: Props) {
  const { district, mandal } = await params;
  const data = await fetchMandalPortal(district, mandal);

  if (!data) {
    notFound();
  }

  return <MandalPortalClient mandal={data} />;
}
