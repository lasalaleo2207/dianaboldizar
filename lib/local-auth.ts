export type LocalRole = "superadmin" | "editor" | "viewer";

export type LocalUser = {
  id: string;
  fullName: string;
  email: string;
  password: string;
  role: LocalRole;
  status: "active" | "inactive";
  createdAt: string;
};

const USERS_KEY = "centro-control-users";
const SESSION_KEY = "centro-control-session";

export const defaultSuperadmin: LocalUser = {
  id: "laura-superadmin",
  fullName: "Laura Salazar",
  email: "laura@venadigital.com.co",
  password: "123456",
  role: "superadmin",
  status: "active",
  createdAt: "2026-06-04"
};

function isBrowser() {
  return typeof window !== "undefined";
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function getUsers(): LocalUser[] {
  if (!isBrowser()) return [defaultSuperadmin];

  const stored = window.localStorage.getItem(USERS_KEY);
  if (!stored) {
    window.localStorage.setItem(USERS_KEY, JSON.stringify([defaultSuperadmin]));
    return [defaultSuperadmin];
  }

  try {
    const parsed = JSON.parse(stored) as LocalUser[];
    const hasLaura = parsed.some((user) => normalizeEmail(user.email) === defaultSuperadmin.email);
    const users = hasLaura
      ? parsed.map((user) =>
          normalizeEmail(user.email) === defaultSuperadmin.email
            ? { ...user, ...defaultSuperadmin }
            : user
        )
      : [defaultSuperadmin, ...parsed];
    window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return users;
  } catch {
    window.localStorage.setItem(USERS_KEY, JSON.stringify([defaultSuperadmin]));
    return [defaultSuperadmin];
  }
}

export function saveUsers(users: LocalUser[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function loginLocalUser(email: string, password: string) {
  const user = getUsers().find(
    (item) => normalizeEmail(item.email) === normalizeEmail(email) && item.password === password && item.status === "active"
  );

  if (!user || !isBrowser()) return null;

  window.localStorage.setItem(SESSION_KEY, JSON.stringify({ userId: user.id }));
  return user;
}

export function getCurrentUser() {
  if (!isBrowser()) return null;

  const session = window.localStorage.getItem(SESSION_KEY);
  if (!session) return null;

  try {
    const parsed = JSON.parse(session) as { userId: string };
    return getUsers().find((user) => user.id === parsed.userId && user.status === "active") ?? null;
  } catch {
    window.localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function logoutLocalUser() {
  if (!isBrowser()) return;
  window.localStorage.removeItem(SESSION_KEY);
}

export function createLocalUser(input: Pick<LocalUser, "fullName" | "email" | "password">) {
  const users = getUsers();
  const email = normalizeEmail(input.email);
  const exists = users.some((user) => normalizeEmail(user.email) === email);

  if (exists) {
    throw new Error("Ya existe un usuario con ese correo.");
  }

  if (input.password.length < 6) {
    throw new Error("La contraseña debe tener al menos 6 caracteres.");
  }

  const user: LocalUser = {
    id: crypto.randomUUID(),
    fullName: input.fullName.trim(),
    email,
    password: input.password,
    role: "superadmin",
    status: "active",
    createdAt: new Date().toISOString().slice(0, 10)
  };

  saveUsers([...users, user]);
  return user;
}
