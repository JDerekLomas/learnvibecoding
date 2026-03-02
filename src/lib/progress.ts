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
}

function empty(): LearnerData {
  return { reflections: {}, projects: [], assessments: [], visited: [] };
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
}

export function saveProject(project: { url: string; description: string; module: string }) {
  const d = getData();
  d.projects.push({ ...project, date: new Date().toISOString().slice(0, 10) });
  save(d);
}

export function saveAssessment(id: string, value: number | string) {
  const d = getData();
  d.assessments.push({ id, value, date: new Date().toISOString().slice(0, 10) });
  save(d);
}

export function markVisited(path: string) {
  const d = getData();
  if (!d.visited.includes(path)) {
    d.visited.push(path);
    save(d);
  }
}

export function hasExerciseData(path: string): boolean {
  const d = getData();
  const moduleKey = path.replace(/^\//, "");
  const hasReflection = Object.keys(d.reflections).some((k) => k.startsWith(moduleKey));
  const hasProject = d.projects.some((p) => p.module === moduleKey);
  const hasAssessment = d.assessments.some((a) => a.id.startsWith(moduleKey));
  return hasReflection || hasProject || hasAssessment;
}
