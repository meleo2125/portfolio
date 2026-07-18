import { getProjects, getSiteContent } from "@/lib/data";
import { AdminDashboard } from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const projects = await getProjects();
  const siteContent = await getSiteContent();

  return (
    <AdminDashboard 
      initialProjects={projects} 
      initialSiteContent={siteContent} 
    />
  );
}
