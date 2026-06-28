"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Exercise {
  id: number;
  name: string;
  bodyPart: string;
  equipment: string;
  sets?: number;
  reps?: number;
}

export default function RouteHandlersPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterPart, setFilterPart] = useState("");
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error" | "info";
  } | null>(null);

  // Form states
  const [createForm, setCreateForm] = useState({
    name: "",
    bodyPart: "",
    equipment: "",
    sets: "",
    reps: "",
  });
  const [updateForm, setUpdateForm] = useState({
    id: "",
    name: "",
    bodyPart: "",
    equipment: "",
    sets: "",
    reps: "",
  });
  const [deleteId, setDeleteId] = useState("");

  // active code snippet tab
  const [activeTab, setActiveTab] = useState<"get" | "post" | "put" | "delete">(
    "get",
  );

  const showMessage = (
    text: string,
    type: "success" | "error" | "info" = "info",
  ) => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  const fetchExercises = async (filter = "") => {
    setLoading(true);
    try {
      const url = filter
        ? `/api/exercises?bodyPart=${encodeURIComponent(filter)}`
        : "/api/exercises";
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch exercises");
      const data = await res.json();
      setExercises(Array.isArray(data) ? data : data ? [data] : []);
    } catch (err: any) {
      showMessage(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchExercises();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createForm.name || !createForm.bodyPart || !createForm.equipment) {
      showMessage("Please fill out all required fields", "error");
      return;
    }
    try {
      const res = await fetch("/api/exercises", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...createForm,
          sets: createForm.sets ? Number(createForm.sets) : undefined,
          reps: createForm.reps ? Number(createForm.reps) : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create exercise");
      showMessage(`Created "${data.name}" successfully!`, "success");
      setCreateForm({
        name: "",
        bodyPart: "",
        equipment: "",
        sets: "",
        reps: "",
      });
      fetchExercises();
    } catch (err: any) {
      showMessage(err.message, "error");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateForm.id) {
      showMessage("Please enter the Exercise ID to update", "error");
      return;
    }
    try {
      // Build clean payload
      const payload: any = {};
      if (updateForm.name) payload.name = updateForm.name;
      if (updateForm.bodyPart) payload.bodyPart = updateForm.bodyPart;
      if (updateForm.equipment) payload.equipment = updateForm.equipment;
      if (updateForm.sets) payload.sets = Number(updateForm.sets);
      if (updateForm.reps) payload.reps = Number(updateForm.reps);

      const res = await fetch(`/api/exercises/${updateForm.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update exercise");
      showMessage(
        `Updated exercise #${updateForm.id} successfully!`,
        "success",
      );
      setUpdateForm({
        id: "",
        name: "",
        bodyPart: "",
        equipment: "",
        sets: "",
        reps: "",
      });
      fetchExercises();
    } catch (err: any) {
      showMessage(err.message, "error");
    }
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deleteId) {
      showMessage("Please enter the Exercise ID to delete", "error");
      return;
    }
    try {
      const res = await fetch(`/api/exercises/${deleteId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete exercise");
      showMessage(`Deleted exercise #${deleteId} successfully!`, "success");
      setDeleteId("");
      fetchExercises();
    } catch (err: any) {
      showMessage(err.message, "error");
    }
  };

  // Code snippets generator
  const codeSnippets = {
    get: `// GET /api/exercises\nfetch('/api/exercises${filterPart ? `?bodyPart=${filterPart}` : ""}')\n  .then(res => res.json())\n  .then(data => console.log(data));`,
    post: `// POST /api/exercises\nfetch('/api/exercises', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({\n    name: "${createForm.name || "Deadlift"}",\n    bodyPart: "${createForm.bodyPart || "Back"}",\n    equipment: "${createForm.equipment || "Barbell"}"\n  })\n}).then(res => res.json());`,
    put: `// PUT /api/exercises/[id]\nfetch('/api/exercises/${updateForm.id || "1"}', {\n  method: 'PUT',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({\n    name: "${updateForm.name || "Dumbbell Press"}"\n  })\n}).then(res => res.json());`,
    delete: `// DELETE /api/exercises/[id]\nfetch('/api/exercises/${deleteId || "1"}', {\n  method: 'DELETE'\n}).then(res => res.json());`,
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <Link
          href="/"
          className="strategy-tag"
          style={{
            marginBottom: "1rem",
            display: "inline-flex",
            textDecoration: "none",
          }}
        >
          ← Back to Topics
        </Link>
        <div
          className="strategy-badge isr"
          style={{
            background: "rgba(167, 139, 250, 0.1)",
            color: "#a78bfa",
            borderColor: "rgba(167, 139, 250, 0.3)",
          }}
        >
          ⚙️ Route Handlers (APIs)
        </div>
        <h1 className="page-title">Next.js REST API CRUD</h1>
        <p className="page-description">
          Practice building fully functional REST API route handlers. Check out
          how client requests trigger database actions inside Next.js API
          endpoints.
        </p>
      </div>

      {/* Toast notifications */}
      {message && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            padding: "0.75rem 1.25rem",
            borderRadius: "8px",
            backgroundColor:
              message.type === "success"
                ? "rgba(52, 211, 153, 0.15)"
                : message.type === "error"
                  ? "rgba(239, 68, 68, 0.15)"
                  : "var(--bg-card)",
            color:
              message.type === "success"
                ? "var(--ssg-color)"
                : message.type === "error"
                  ? "#f87171"
                  : "var(--text-primary)",
            border: `1px solid ${message.type === "success" ? "var(--ssg-border)" : message.type === "error" ? "rgba(239,68,68,0.3)" : "var(--border)"}`,
            zIndex: 9999,
            boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
            fontSize: "0.85rem",
          }}
        >
          {message.text}
        </div>
      )}

      {/* Informational specs */}
      <div className="info-card">
        <div className="info-card-title">
          How API Route Handlers work in Next.js 16
        </div>
        <div className="info-card-grid">
          <div className="info-item">
            <span className="info-label">File Convention</span>
            <span className="info-value">route.ts / route.js</span>
          </div>
          <div className="info-item">
            <span className="info-label">Dynamic Segments</span>
            <span className="info-value">/exercises/[id]/route.ts</span>
          </div>
          <div className="info-item">
            <span className="info-label">Response Handler</span>
            <span className="info-value">NextResponse.json()</span>
          </div>
          <div className="info-item">
            <span className="info-label">HTTP Methods</span>
            <span className="info-value">GET, POST, PUT, DELETE</span>
          </div>
        </div>
      </div>

      {/* Grid container: Left is Database, Right is Controls */}
      <div
        className="detail-layout"
        style={{ gridTemplateColumns: "1fr 1.2fr" }}
      >
        {/* Left Side: Live Database Viewer */}
        <div>
          <div className="section-label">
            📋 Live Database Viewer (exercises)
          </div>

          {/* Query Filter */}
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
            <input
              type="text"
              placeholder="Filter by bodyPart (e.g. Chest, Back)..."
              value={filterPart}
              onChange={(e) => setFilterPart(e.target.value)}
              style={{
                flex: 1,
                padding: "0.5rem 0.75rem",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                backgroundColor: "var(--bg-card)",
                color: "var(--text-primary)",
                fontSize: "0.85rem",
              }}
            />
            <button
              onClick={() => fetchExercises(filterPart)}
              className="retry-btn"
              style={{ margin: 0, padding: "0.5rem 1rem" }}
            >
              Apply Filter
            </button>
            {filterPart && (
              <button
                onClick={() => {
                  setFilterPart("");
                  fetchExercises("");
                }}
                style={{
                  padding: "0.5rem",
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  backgroundColor: "transparent",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                }}
              >
                Clear
              </button>
            )}
          </div>

          {/* List */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              maxHeight: "450px",
              overflowY: "auto",
            }}
          >
            {loading ? (
              <div
                className="skeleton"
                style={{ height: "100px", borderRadius: "12px" }}
              ></div>
            ) : exercises.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "2rem",
                  color: "var(--text-muted)",
                  border: "1px dashed var(--border)",
                  borderRadius: "12px",
                }}
              >
                No exercises found.
              </div>
            ) : (
              exercises.map((ex) => (
                <div
                  key={ex.id}
                  className="feature-card"
                  style={{ padding: "1rem", position: "relative" }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      fontSize: "0.7rem",
                      padding: "2px 6px",
                      borderRadius: "6px",
                      backgroundColor: "var(--bg-secondary)",
                      border: "1px solid var(--border)",
                      color: "var(--text-muted)",
                      fontFamily: "JetBrains Mono, monospace",
                    }}
                  >
                    ID: {ex.id}
                  </span>
                  <div
                    style={{
                      fontWeight: "700",
                      fontSize: "0.95rem",
                      color: "var(--text-primary)",
                    }}
                  >
                    {ex.name}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      marginTop: "0.5rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      className="detail-tag"
                      style={{ fontSize: "0.7rem", padding: "1px 6px" }}
                    >
                      💪 {ex.bodyPart}
                    </span>
                    <span
                      className="detail-tag"
                      style={{ fontSize: "0.7rem", padding: "1px 6px" }}
                    >
                      🛠️ {ex.equipment}
                    </span>
                    {ex.sets && (
                      <span
                        className="detail-tag"
                        style={{ fontSize: "0.7rem", padding: "1px 6px" }}
                      >
                        🔄 {ex.sets} Sets
                      </span>
                    )}
                    {ex.reps && (
                      <span
                        className="detail-tag"
                        style={{ fontSize: "0.7rem", padding: "1px 6px" }}
                      >
                        🎯 {ex.reps} Reps
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side: Interactive Controls */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <div className="section-label">⚡ API Console Operations</div>

          {/* CREATE Form */}
          <form
            onSubmit={handleCreate}
            className="info-card"
            style={{ margin: 0 }}
          >
            <div
              className="info-card-title"
              style={{
                color: "var(--ssg-color)",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>POST /api/exercises</span>
              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                CREATE
              </span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.75rem",
                marginTop: "0.75rem",
              }}
            >
              <input
                type="text"
                placeholder="Name (e.g. Hammer Curl)*"
                required
                value={createForm.name}
                onChange={(e) =>
                  setCreateForm({ ...createForm, name: e.target.value })
                }
                style={{
                  padding: "0.5rem",
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--bg-secondary)",
                  color: "white",
                  fontSize: "0.8rem",
                }}
              />
              <input
                type="text"
                placeholder="Body Part (e.g. Arms)*"
                required
                value={createForm.bodyPart}
                onChange={(e) =>
                  setCreateForm({ ...createForm, bodyPart: e.target.value })
                }
                style={{
                  padding: "0.5rem",
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--bg-secondary)",
                  color: "white",
                  fontSize: "0.8rem",
                }}
              />
              <input
                type="text"
                placeholder="Equipment (e.g. Dumbbell)*"
                required
                value={createForm.equipment}
                onChange={(e) =>
                  setCreateForm({ ...createForm, equipment: e.target.value })
                }
                style={{
                  padding: "0.5rem",
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--bg-secondary)",
                  color: "white",
                  fontSize: "0.8rem",
                }}
              />
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  type="number"
                  placeholder="Sets"
                  value={createForm.sets}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, sets: e.target.value })
                  }
                  style={{
                    width: "50%",
                    padding: "0.5rem",
                    borderRadius: "6px",
                    border: "1px solid var(--border)",
                    backgroundColor: "var(--bg-secondary)",
                    color: "white",
                    fontSize: "0.8rem",
                  }}
                />
                <input
                  type="number"
                  placeholder="Reps"
                  value={createForm.reps}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, reps: e.target.value })
                  }
                  style={{
                    width: "50%",
                    padding: "0.5rem",
                    borderRadius: "6px",
                    border: "1px solid var(--border)",
                    backgroundColor: "var(--bg-secondary)",
                    color: "white",
                    fontSize: "0.8rem",
                  }}
                />
              </div>
            </div>
            <button
              type="submit"
              className="retry-btn"
              style={{
                width: "100%",
                marginTop: "0.75rem",
                backgroundColor: "var(--ssg-color)",
                backgroundImage: "none",
                color: "#000",
              }}
            >
              Submit POST Request
            </button>
          </form>

          {/* UPDATE Form */}
          <form
            onSubmit={handleUpdate}
            className="info-card"
            style={{ margin: 0 }}
          >
            <div
              className="info-card-title"
              style={{
                color: "var(--isr-color)",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>PUT /api/exercises/[id]</span>
              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                UPDATE
              </span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.75rem",
                marginTop: "0.75rem",
              }}
            >
              <input
                type="number"
                placeholder="Exercise ID to Update*"
                required
                value={updateForm.id}
                onChange={(e) =>
                  setUpdateForm({ ...updateForm, id: e.target.value })
                }
                style={{
                  padding: "0.5rem",
                  borderRadius: "6px",
                  border: "1px solid var(--isr-border)",
                  backgroundColor: "var(--bg-secondary)",
                  color: "white",
                  fontSize: "0.8rem",
                }}
              />
              <input
                type="text"
                placeholder="New Name (Optional)"
                value={updateForm.name}
                onChange={(e) =>
                  setUpdateForm({ ...updateForm, name: e.target.value })
                }
                style={{
                  padding: "0.5rem",
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--bg-secondary)",
                  color: "white",
                  fontSize: "0.8rem",
                }}
              />
              <input
                type="text"
                placeholder="New Body Part (Optional)"
                value={updateForm.bodyPart}
                onChange={(e) =>
                  setUpdateForm({ ...updateForm, bodyPart: e.target.value })
                }
                style={{
                  padding: "0.5rem",
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--bg-secondary)",
                  color: "white",
                  fontSize: "0.8rem",
                }}
              />
              <input
                type="text"
                placeholder="New Equipment (Optional)"
                value={updateForm.equipment}
                onChange={(e) =>
                  setUpdateForm({ ...updateForm, equipment: e.target.value })
                }
                style={{
                  padding: "0.5rem",
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--bg-secondary)",
                  color: "white",
                  fontSize: "0.8rem",
                }}
              />
            </div>
            <button
              type="submit"
              className="retry-btn"
              style={{
                width: "100%",
                marginTop: "0.75rem",
                backgroundColor: "var(--isr-color)",
                backgroundImage: "none",
                color: "#000",
              }}
            >
              Submit PUT Request
            </button>
          </form>

          {/* DELETE Form */}
          <form
            onSubmit={handleDelete}
            className="info-card"
            style={{ margin: 0 }}
          >
            <div
              className="info-card-title"
              style={{
                color: "#f87171",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>DELETE /api/exercises/[id]</span>
              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                DELETE
              </span>
            </div>
            <div
              style={{ display: "flex", gap: "0.75rem", marginTop: "0.75rem" }}
            >
              <input
                type="number"
                placeholder="Exercise ID to Delete*"
                required
                value={deleteId}
                onChange={(e) => setDeleteId(e.target.value)}
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  borderRadius: "6px",
                  border: "1px solid rgba(239, 68, 68, 0.4)",
                  backgroundColor: "var(--bg-secondary)",
                  color: "white",
                  fontSize: "0.8rem",
                }}
              />
              <button
                type="submit"
                className="retry-btn"
                style={{
                  margin: 0,
                  backgroundColor: "#f87171",
                  backgroundImage: "none",
                  color: "#000",
                }}
              >
                Submit DELETE Request
              </button>
            </div>
          </form>

          {/* Dynamic Code Snippets Reference */}
          <div className="info-card" style={{ margin: 0 }}>
            <div className="info-card-title">Code Snippet Preview</div>
            <div
              style={{ display: "flex", gap: "0.25rem", margin: "0.5rem 0" }}
            >
              {(["get", "post", "put", "delete"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: "0.25rem 0.6rem",
                    fontSize: "0.75rem",
                    borderRadius: "6px",
                    border: "1px solid var(--border)",
                    backgroundColor:
                      activeTab === tab ? "var(--border-hover)" : "transparent",
                    color:
                      activeTab === tab
                        ? "var(--text-primary)"
                        : "var(--text-secondary)",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
            <pre
              style={{
                backgroundColor: "var(--bg-secondary)",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.75rem",
                color: "#a78bfa",
                overflowX: "auto",
                whiteSpace: "pre-wrap",
              }}
            >
              {codeSnippets[activeTab]}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
