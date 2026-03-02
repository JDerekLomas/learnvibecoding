const STORAGE_KEY = "lvc-progress";

export interface LearnerData {
  reflections: Record<string, string>;
  projects: Array<{
    url: string;
    description: string;
    module: string;
    date: string;
  }>;
  assessments: Array<{
    id: string;
    value: number | string;
    date: string;
  }>;
  visited: string[];
  critiques: Array<{
    id: string;
    choice: string;
    reasoning: string;
    date: string;
  }>;
  buildSessions: Array<{
    id: string;
    module: string;
    intention: string;
    successCriteria: string;
    startedAt: string;
    completedAt?: string;
    outcome?: "achieved" | "partially" | "no" | "stuck";
    debrief?: string;
    date: string;
  }>;
  disconnects: Array<{
    id: string;
    reflection: string;
    date: string;
  }>;
  discoveries: Array<{
    id: string;
    prompt: string;
    feelings: string[];
    audience: string;
    date: string;
  }>;
}

function empty(): LearnerData {
  return {
    reflections: {},
    projects: [],
    assessments: [],
    visited: [],
    critiques: [],
    buildSessions: [],
    disconnects: [],
    discoveries: [],
  };
}

export function getData(): LearnerData {
  if (typeof window === "undefined") return empty();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...empty(), ...JSON.parse(raw) } : empty();
  } catch {
    return empty();
  }
}

function save(data: LearnerData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function saveReflection(id: string, text: string) {
  const d = getData();
  d.reflections[id] = text;
  save(d);
  notifyChange();
}

export function saveProject(project: { url: string; description: string; module: string }) {
  const d = getData();
  d.projects.push({ ...project, date: new Date().toISOString().slice(0, 10) });
  save(d);
  notifyChange();
}

const CHANGE_EVENT = "lvc-progress-change";

function notifyChange() {
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function onProgressChange(callback: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, callback);
  return () => window.removeEventListener(CHANGE_EVENT, callback);
}

export function saveAssessment(id: string, value: number | string) {
  const d = getData();
  const last = d.assessments.filter((a) => a.id === id).pop();
  if (last && last.value === value) return;
  d.assessments.push({ id, value, date: new Date().toISOString().slice(0, 10) });
  save(d);
  notifyChange();
}

export function markVisited(path: string) {
  const d = getData();
  if (!d.visited.includes(path)) {
    d.visited.push(path);
    save(d);
  }
}

export function saveCritique(critique: { id: string; choice: string; reasoning: string }) {
  const d = getData();
  d.critiques.push({ ...critique, date: new Date().toISOString().slice(0, 10) });
  save(d);
  notifyChange();
}

export function saveBuildSession(session: LearnerData["buildSessions"][number]) {
  const d = getData();
  const idx = d.buildSessions.findIndex((s) => s.id === session.id && !s.completedAt);
  if (idx >= 0) {
    d.buildSessions[idx] = session;
  } else {
    d.buildSessions.push(session);
  }
  save(d);
  notifyChange();
}

export function saveDisconnect(id: string, reflection: string) {
  const d = getData();
  d.disconnects.push({ id, reflection, date: new Date().toISOString().slice(0, 10) });
  save(d);
  notifyChange();
}

export function saveDiscovery(discovery: { id: string; prompt: string; feelings: string[]; audience: string }) {
  const d = getData();
  d.discoveries.push({ ...discovery, date: new Date().toISOString().slice(0, 10) });
  save(d);
  notifyChange();
}

export function hasExerciseData(path: string): boolean {
  const d = getData();
  const moduleKey = path.replace(/^\//, "");
  const prefix = moduleKey + "-";
  const hasReflection = Object.keys(d.reflections).some((k) => k.startsWith(prefix));
  const hasProject = d.projects.some((p) => p.module === moduleKey);
  const hasAssessment = d.assessments.some((a) => a.id.startsWith(prefix));
  const hasCritique = d.critiques.some((c) => c.id.startsWith(prefix));
  const hasBuildSession = d.buildSessions.some((b) => b.module === moduleKey);
  const hasDisconnect = d.disconnects.some((dc) => dc.id.startsWith(prefix));
  const hasDiscovery = d.discoveries.some((disc) => disc.id.startsWith(prefix));
  return hasReflection || hasProject || hasAssessment || hasCritique || hasBuildSession || hasDisconnect || hasDiscovery;
}
