"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  LogOut, Plus, Trash2, Save, FileText, FolderGit2, 
  Check, AlertCircle, RefreshCw, Layers 
} from "lucide-react";
import { 
  addProject, deleteProject, updateProject, 
  updateSiteContent, logout 
} from "./actions";
import type { Project } from "@/lib/data";

type AdminDashboardProps = {
  initialProjects: Project[];
  initialSiteContent: Record<string, string>;
};

export function AdminDashboard({ initialProjects, initialSiteContent }: AdminDashboardProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"projects" | "content">("projects");
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Logout handler
  const handleLogout = async () => {
    try {
      await logout();
      router.push("/admin/login");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to log out.");
    }
  };

  // State for project forms
  const [newProject, setNewProject] = useState<Project>({
    id: "",
    title: "",
    tagline: "",
    problem: "",
    decision: "",
    build: "",
    outcome: "",
    headline: "",
    stack: [],
    liveUrl: "",
    githubUrl: "",
    status: "LIVE",
  });
  const [newProjectStackStr, setNewProjectStackStr] = useState("");
  const [editingProject, setEditingProject] = useState<Record<string, Project>>({});
  const [editingProjectStackStr, setEditingProjectStackStr] = useState<Record<string, string>>({});

  // Add Project handler
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading("add-project");

    if (!newProject.id.trim() || !newProject.title.trim()) {
      setError("Project ID and Title are required.");
      setLoading(null);
      return;
    }

    try {
      const stack = newProjectStackStr
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      await addProject({
        ...newProject,
        stack,
        headline: newProject.headline?.trim() || undefined,
        liveUrl: newProject.liveUrl?.trim() || undefined,
        githubUrl: newProject.githubUrl?.trim() || undefined,
      });

      setSuccess(`Project "${newProject.title}" added successfully.`);
      // Reset form
      setNewProject({
        id: "",
        title: "",
        tagline: "",
        problem: "",
        decision: "",
        build: "",
        outcome: "",
        headline: "",
        stack: [],
        liveUrl: "",
        githubUrl: "",
        status: "LIVE",
      });
      setNewProjectStackStr("");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to add project.");
    } finally {
      setLoading(null);
    }
  };

  // Save Project handler
  const handleSaveProject = async (id: string) => {
    setError(null);
    setSuccess(null);
    setLoading(`save-${id}`);

    const projectData = editingProject[id];
    if (!projectData) return;

    try {
      const stack = (editingProjectStackStr[id] || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      await updateProject(id, {
        ...projectData,
        stack,
        headline: projectData.headline?.trim() || undefined,
        liveUrl: projectData.liveUrl?.trim() || undefined,
        githubUrl: projectData.githubUrl?.trim() || undefined,
      });

      setSuccess(`Project "${projectData.title}" updated.`);
      // Remove from editing state
      const nextEditing = { ...editingProject };
      delete nextEditing[id];
      setEditingProject(nextEditing);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to save project.");
    } finally {
      setLoading(null);
    }
  };

  // Delete Project handler
  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project permanently?")) return;

    setError(null);
    setSuccess(null);
    setLoading(`delete-${id}`);

    try {
      await deleteProject(id);
      setSuccess("Project deleted successfully.");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to delete project.");
    } finally {
      setLoading(null);
    }
  };

  // Toggle edit state for a project
  const toggleEditProject = (p: Project) => {
    if (editingProject[p.id]) {
      const nextEditing = { ...editingProject };
      delete nextEditing[p.id];
      setEditingProject(nextEditing);
    } else {
      setEditingProject({
        ...editingProject,
        [p.id]: { ...p },
      });
      setEditingProjectStackStr({
        ...editingProjectStackStr,
        [p.id]: p.stack.join(", "),
      });
    }
  };

  // Update inline project edit values
  const setEditValue = (id: string, key: keyof Project, value: any) => {
    const current = editingProject[id];
    if (!current) return;
    setEditingProject({
      ...editingProject,
      [id]: {
        ...current,
        [key]: value,
      },
    });
  };

  // Site content state and actions
  const [siteContent, setSiteContent] = useState<Record<string, string>>(initialSiteContent);
  const handleSaveContent = async (key: string) => {
    setError(null);
    setSuccess(null);
    setLoading(`content-${key}`);

    try {
      await updateSiteContent(key, siteContent[key] || "");
      setSuccess(`Content for "${key}" updated successfully.`);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to update content block.");
    } finally {
      setLoading(null);
    }
  };

  const contentLabels: Record<string, { title: string; desc: string; type: "input" | "textarea" }> = {
    about_p1: {
      title: "About Paragraph 1",
      desc: "Opening paragraph for the bio, typically plain text.",
      type: "textarea",
    },
    about_p2: {
      title: "About Paragraph 2 (HTML support)",
      desc: "Detailing current role. Use <span class='text-text'> or <span class='text-amber'> for high-end text accents.",
      type: "textarea",
    },
    about_p3: {
      title: "About Paragraph 3 (HTML support)",
      desc: "Education details. Supports span tags for colored CGPI/university emphasis.",
      type: "textarea",
    },
    about_p4: {
      title: "About Paragraph 4",
      desc: "Extra activities / range beyond engineering text.",
      type: "textarea",
    },
    status_role: {
      title: "Status Readout: Role",
      desc: "Current designation / job displayed in the right status card.",
      type: "input",
    },
    status_based_in: {
      title: "Status Readout: Location",
      desc: "City / Country of residence.",
      type: "input",
    },
    status_education: {
      title: "Status Readout: Education Short",
      desc: "Short college / degree details.",
      type: "input",
    },
    status_focus: {
      title: "Status Readout: Core Focus",
      desc: "Brief description of current stack/focus areas.",
      type: "input",
    },
    status_cgpi: {
      title: "Status Readout: CGPI score",
      desc: "Grades readout value.",
      type: "input",
    },
    hero_stat_reduction: {
      title: "Hero Stat: Effort Reduction",
      desc: "Effort reduction percentage (e.g. 60–90%).",
      type: "input",
    },
    hero_stat_cgpi: {
      title: "Hero Stat: CGPI",
      desc: "CGPI score displayed in Hero and Education logs (e.g. 9.32 or 9.3).",
      type: "input",
    },
    hero_stat_shipped: {
      title: "Hero Stat: Shipped Apps",
      desc: "Number of shipped production apps (e.g. 5+).",
      type: "input",
    },
  };

  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Top Navbar */}
      <nav className="border-b border-white/5 bg-panel-raised/50 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-amber" />
            <h1 className="font-display text-lg font-medium tracking-tight">
              Control Panel <span className="text-amber">v25.07</span>
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-sm border border-white/10 bg-panel px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-text-muted transition-colors hover:border-red-500/35 hover:text-red-400"
          >
            <LogOut size={13} />
            Disconnect
          </button>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Status Messages */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-sm border border-red-500/25 bg-red-500/5 p-4 text-sm text-red-400">
            <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
            <div>{error}</div>
          </div>
        )}
        {success && (
          <div className="mb-6 flex items-start gap-3 rounded-sm border border-green-500/25 bg-green-500/5 p-4 text-sm text-green-400">
            <Check size={18} className="mt-0.5 flex-shrink-0" />
            <div>{success}</div>
          </div>
        )}

        {/* Tab Selector */}
        <div className="mb-8 flex border-b border-white/5 font-mono text-xs">
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 border-b-2 px-6 py-3 transition-colors ${
              activeTab === "projects"
                ? "border-amber text-amber"
                : "border-transparent text-text-muted hover:text-text"
            }`}
          >
            <FolderGit2 size={14} />
            PROJECTS GRID ({initialProjects.length})
          </button>
          <button
            onClick={() => setActiveTab("content")}
            className={`flex items-center gap-2 border-b-2 px-6 py-3 transition-colors ${
              activeTab === "content"
                ? "border-amber text-amber"
                : "border-transparent text-text-muted hover:text-text"
            }`}
          >
            <FileText size={14} />
            SITE CONTENT (BIO & STATUS)
          </button>
        </div>

        {/* TAB 1: PROJECTS */}
        {activeTab === "projects" && (
          <div className="space-y-12">
            {/* Project List */}
            <div className="space-y-6">
              <h2 className="font-display text-xl font-medium text-text">Active Projects</h2>
              <div className="grid gap-6">
                {initialProjects.map((p, idx) => {
                  const isEditing = !!editingProject[p.id];
                  const editState = editingProject[p.id] || p;

                  return (
                    <div
                      key={p.id}
                      className="panel panel-corners border border-white/5 bg-panel/30 p-6 transition-all"
                    >
                      <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-text-muted">0{idx + 1}</span>
                          <h3 className="font-display text-lg font-medium text-text">
                            {p.title} <span className="font-mono text-xs text-text-muted">({p.id})</span>
                          </h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleEditProject(p)}
                            className="rounded-sm border border-white/10 bg-panel px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-text transition-colors hover:border-amber hover:text-amber"
                          >
                            {isEditing ? "Cancel" : "Edit fields"}
                          </button>
                          <button
                            onClick={() => handleDeleteProject(p.id)}
                            disabled={loading === `delete-${p.id}`}
                            className="flex items-center justify-center rounded-sm border border-white/10 bg-panel p-1.5 text-text-muted hover:border-red-500/35 hover:text-red-400 disabled:opacity-40"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      {/* View Mode */}
                      {!isEditing && (
                        <div className="mt-4 grid gap-4 text-sm md:grid-cols-2 lg:grid-cols-3">
                          <div>
                            <span className="label-mono mb-1 block">Tagline</span>
                            <p className="text-text-muted">{p.tagline}</p>
                          </div>
                          <div>
                            <span className="label-mono mb-1 block">Status</span>
                            <span className="inline-block rounded-sm border border-amber/30 bg-amber/5 px-2 py-0.5 font-mono text-[10px] text-amber">
                              {p.status}
                            </span>
                          </div>
                          <div>
                            <span className="label-mono mb-1 block">Stack</span>
                            <div className="flex flex-wrap gap-1">
                              {p.stack.map((s) => (
                                <span key={s} className="rounded-sm border border-white/5 bg-panel-raised px-1.5 py-0.5 font-mono text-[10px] text-text-muted">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Edit Mode */}
                      {isEditing && (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleSaveProject(p.id);
                          }}
                          className="mt-6 space-y-4"
                        >
                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <label className="label-mono mb-1 block">Title</label>
                              <input
                                type="text"
                                required
                                value={editState.title}
                                onChange={(e) => setEditValue(p.id, "title", e.target.value)}
                                className="w-full rounded-sm border border-white/10 bg-panel-raised px-3 py-2 font-sans text-sm text-text outline-none focus:border-amber"
                              />
                            </div>
                            <div>
                              <label className="label-mono mb-1 block">Tagline</label>
                              <input
                                type="text"
                                required
                                value={editState.tagline}
                                onChange={(e) => setEditValue(p.id, "tagline", e.target.value)}
                                className="w-full rounded-sm border border-white/10 bg-panel-raised px-3 py-2 font-sans text-sm text-text outline-none focus:border-amber"
                              />
                            </div>
                          </div>

                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <label className="label-mono mb-1 block">Problem description</label>
                              <textarea
                                required
                                rows={2}
                                value={editState.problem}
                                onChange={(e) => setEditValue(p.id, "problem", e.target.value)}
                                className="w-full rounded-sm border border-white/10 bg-panel-raised px-3 py-2 font-sans text-sm text-text outline-none focus:border-amber"
                              />
                            </div>
                            <div>
                              <label className="label-mono mb-1 block">Decision rationale</label>
                              <textarea
                                required
                                rows={2}
                                value={editState.decision}
                                onChange={(e) => setEditValue(p.id, "decision", e.target.value)}
                                className="w-full rounded-sm border border-white/10 bg-panel-raised px-3 py-2 font-sans text-sm text-text outline-none focus:border-amber"
                              />
                            </div>
                          </div>

                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <label className="label-mono mb-1 block">Build details</label>
                              <textarea
                                required
                                rows={2}
                                value={editState.build}
                                onChange={(e) => setEditValue(p.id, "build", e.target.value)}
                                className="w-full rounded-sm border border-white/10 bg-panel-raised px-3 py-2 font-sans text-sm text-text outline-none focus:border-amber"
                              />
                            </div>
                            <div>
                              <label className="label-mono mb-1 block">Outcome metrics</label>
                              <textarea
                                required
                                rows={2}
                                value={editState.outcome}
                                onChange={(e) => setEditValue(p.id, "outcome", e.target.value)}
                                className="w-full rounded-sm border border-white/10 bg-panel-raised px-3 py-2 font-sans text-sm text-text outline-none focus:border-amber"
                              />
                            </div>
                          </div>

                          <div className="grid gap-4 md:grid-cols-3">
                            <div>
                              <label className="label-mono mb-1 block">Headline stat (optional)</label>
                              <input
                                type="text"
                                value={editState.headline || ""}
                                onChange={(e) => setEditValue(p.id, "headline", e.target.value)}
                                placeholder="e.g. 90%+ diagnostic accuracy"
                                className="w-full rounded-sm border border-white/10 bg-panel-raised px-3 py-2 font-sans text-sm text-text outline-none focus:border-amber"
                              />
                            </div>
                            <div>
                              <label className="label-mono mb-1 block">Stack (comma-separated)</label>
                              <input
                                type="text"
                                required
                                value={editingProjectStackStr[p.id] || ""}
                                onChange={(e) => {
                                  setEditingProjectStackStr({
                                    ...editingProjectStackStr,
                                    [p.id]: e.target.value,
                                  });
                                }}
                                className="w-full rounded-sm border border-white/10 bg-panel-raised px-3 py-2 font-mono text-sm text-text outline-none focus:border-amber"
                              />
                            </div>
                            <div>
                              <label className="label-mono mb-1 block">Status</label>
                              <select
                                value={editState.status}
                                onChange={(e) => setEditValue(p.id, "status", e.target.value)}
                                className="w-full rounded-sm border border-white/10 bg-panel-raised px-3 py-2 font-mono text-sm text-text outline-none focus:border-amber"
                              >
                                <option value="LIVE">LIVE</option>
                                <option value="ACTIVE">ACTIVE</option>
                                <option value="SHIPPED">SHIPPED</option>
                                <option value="OPEN-SOURCE">OPEN-SOURCE</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <label className="label-mono mb-1 block">Live Demo URL (optional)</label>
                              <input
                                type="url"
                                value={editState.liveUrl || ""}
                                onChange={(e) => setEditValue(p.id, "liveUrl", e.target.value)}
                                className="w-full rounded-sm border border-white/10 bg-panel-raised px-3 py-2 font-sans text-sm text-text outline-none focus:border-amber"
                              />
                            </div>
                            <div>
                              <label className="label-mono mb-1 block">GitHub Source URL (optional)</label>
                              <input
                                type="url"
                                value={editState.githubUrl || ""}
                                onChange={(e) => setEditValue(p.id, "githubUrl", e.target.value)}
                                className="w-full rounded-sm border border-white/10 bg-panel-raised px-3 py-2 font-sans text-sm text-text outline-none focus:border-amber"
                              />
                            </div>
                          </div>

                          <div className="flex justify-end gap-2 pt-2">
                            <button
                              type="button"
                              onClick={() => toggleEditProject(p)}
                              className="rounded-sm border border-white/10 bg-panel px-4 py-2 font-mono text-xs uppercase tracking-wider text-text-muted hover:border-white/20 hover:text-text"
                            >
                              Discard
                            </button>
                            <button
                              type="submit"
                              disabled={loading === `save-${p.id}`}
                              className="flex items-center gap-2 rounded-sm border border-amber bg-amber/10 px-4 py-2 font-mono text-xs uppercase tracking-wider text-amber hover:bg-amber hover:text-bg disabled:opacity-40"
                            >
                              <Save size={12} />
                              {loading === `save-${p.id}` ? "Saving..." : "Save changes"}
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Add Project Form */}
            <div className="panel panel-corners border border-white/10 bg-panel-raised/20 p-6 md:p-8">
              <div className="mb-6 flex items-center gap-2">
                <Plus size={18} className="text-amber" />
                <h2 className="font-display text-xl font-medium text-text">Register New Build</h2>
              </div>
              <form onSubmit={handleAddProject} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <label className="label-mono mb-1 block">Project Unique Slug / ID</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. smart-optimizer"
                      value={newProject.id}
                      onChange={(e) => setNewProject({ ...newProject, id: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                      className="w-full rounded-sm border border-white/10 bg-panel-raised px-3 py-2 font-mono text-sm text-text outline-none focus:border-amber"
                    />
                  </div>
                  <div>
                    <label className="label-mono mb-1 block">Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Smart Optimizer"
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      className="w-full rounded-sm border border-white/10 bg-panel-raised px-3 py-2 font-sans text-sm text-text outline-none focus:border-amber"
                    />
                  </div>
                  <div>
                    <label className="label-mono mb-1 block">Tagline</label>
                    <input
                      type="text"
                      required
                      placeholder="Unified cache manager..."
                      value={newProject.tagline}
                      onChange={(e) => setNewProject({ ...newProject, tagline: e.target.value })}
                      className="w-full rounded-sm border border-white/10 bg-panel-raised px-3 py-2 font-sans text-sm text-text outline-none focus:border-amber"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="label-mono mb-1 block">Problem description</label>
                    <textarea
                      required
                      rows={2}
                      placeholder="What was the core pain point..."
                      value={newProject.problem}
                      onChange={(e) => setNewProject({ ...newProject, problem: e.target.value })}
                      className="w-full rounded-sm border border-white/10 bg-panel-raised px-3 py-2 font-sans text-sm text-text outline-none focus:border-amber"
                    />
                  </div>
                  <div>
                    <label className="label-mono mb-1 block">Decision rationale</label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Why did you design the solution this way..."
                      value={newProject.decision}
                      onChange={(e) => setNewProject({ ...newProject, decision: e.target.value })}
                      className="w-full rounded-sm border border-white/10 bg-panel-raised px-3 py-2 font-sans text-sm text-text outline-none focus:border-amber"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="label-mono mb-1 block">Build details</label>
                    <textarea
                      required
                      rows={2}
                      placeholder="What technologies, APIs and design strategies were compiled..."
                      value={newProject.build}
                      onChange={(e) => setNewProject({ ...newProject, build: e.target.value })}
                      className="w-full rounded-sm border border-white/10 bg-panel-raised px-3 py-2 font-sans text-sm text-text outline-none focus:border-amber"
                    />
                  </div>
                  <div>
                    <label className="label-mono mb-1 block">Outcome metrics</label>
                    <textarea
                      required
                      rows={2}
                      placeholder="What was the measurable output or user reception..."
                      value={newProject.outcome}
                      onChange={(e) => setNewProject({ ...newProject, outcome: e.target.value })}
                      className="w-full rounded-sm border border-white/10 bg-panel-raised px-3 py-2 font-sans text-sm text-text outline-none focus:border-amber"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <label className="label-mono mb-1 block">Headline stat (optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. 70% decrease in overhead"
                      value={newProject.headline}
                      onChange={(e) => setNewProject({ ...newProject, headline: e.target.value })}
                      className="w-full rounded-sm border border-white/10 bg-panel-raised px-3 py-2 font-sans text-sm text-text outline-none focus:border-amber"
                    />
                  </div>
                  <div>
                    <label className="label-mono mb-1 block">Stack (comma-separated)</label>
                    <input
                      type="text"
                      required
                      placeholder="Next.js, TypeScript, PostgreSQL"
                      value={newProjectStackStr}
                      onChange={(e) => setNewProjectStackStr(e.target.value)}
                      className="w-full rounded-sm border border-white/10 bg-panel-raised px-3 py-2 font-mono text-sm text-text outline-none focus:border-amber"
                    />
                  </div>
                  <div>
                    <label className="label-mono mb-1 block">Status</label>
                    <select
                      value={newProject.status}
                      onChange={(e) => setNewProject({ ...newProject, status: e.target.value as any })}
                      className="w-full rounded-sm border border-white/10 bg-panel-raised px-3 py-2 font-mono text-sm text-text outline-none focus:border-amber"
                    >
                      <option value="LIVE">LIVE</option>
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="OPEN-SOURCE">OPEN-SOURCE</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="label-mono mb-1 block">Live Demo URL (optional)</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={newProject.liveUrl}
                      onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                      className="w-full rounded-sm border border-white/10 bg-panel-raised px-3 py-2 font-sans text-sm text-text outline-none focus:border-amber"
                    />
                  </div>
                  <div>
                    <label className="label-mono mb-1 block">GitHub Source URL (optional)</label>
                    <input
                      type="url"
                      placeholder="https://github.com/..."
                      value={newProject.githubUrl}
                      onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                      className="w-full rounded-sm border border-white/10 bg-panel-raised px-3 py-2 font-sans text-sm text-text outline-none focus:border-amber"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={loading === "add-project"}
                    className="flex items-center gap-2 rounded-sm border border-amber bg-amber/10 px-6 py-3 font-mono text-xs uppercase tracking-wider text-amber hover:bg-amber hover:text-bg disabled:opacity-40"
                  >
                    <Plus size={14} />
                    {loading === "add-project" ? "Adding..." : "Add project to database"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 2: SITE CONTENT */}
        {activeTab === "content" && (
          <div className="panel panel-corners border border-white/5 bg-panel/30 p-6 md:p-8 space-y-8">
            <h2 className="font-display text-xl font-medium text-text">Bio & Sidebar Metadata</h2>
            <div className="space-y-6">
              {Object.entries(contentLabels).map(([key, labelInfo]) => {
                const isTextArea = labelInfo.type === "textarea";
                const isSaving = loading === `content-${key}`;

                return (
                  <div key={key} className="border-b border-white/5 pb-6 last:border-b-0 last:pb-0">
                    <div className="mb-2 flex items-center justify-between">
                      <div>
                        <h4 className="font-display font-medium text-text">{labelInfo.title}</h4>
                        <span className="font-mono text-[10px] text-text-muted block mt-0.5">{labelInfo.desc}</span>
                      </div>
                      <button
                        onClick={() => handleSaveContent(key)}
                        disabled={isSaving}
                        className="flex items-center gap-1.5 rounded-sm border border-amber/30 bg-amber/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-amber transition-colors hover:bg-amber hover:text-bg disabled:opacity-40"
                      >
                        {isSaving ? (
                          <RefreshCw size={10} className="animate-spin" />
                        ) : (
                          <Save size={10} />
                        )}
                        {isSaving ? "Saving" : "Save block"}
                      </button>
                    </div>

                    {isTextArea ? (
                      <textarea
                        rows={3}
                        value={siteContent[key] || ""}
                        onChange={(e) => setSiteContent({ ...siteContent, [key]: e.target.value })}
                        className="w-full rounded-sm border border-white/10 bg-panel px-3 py-2 font-mono text-xs text-text outline-none focus:border-amber"
                      />
                    ) : (
                      <input
                        type="text"
                        value={siteContent[key] || ""}
                        onChange={(e) => setSiteContent({ ...siteContent, [key]: e.target.value })}
                        className="w-full rounded-sm border border-white/10 bg-panel px-3 py-2 font-sans text-sm text-text outline-none focus:border-amber"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
