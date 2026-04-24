const CLIENT_ID_STORAGE_KEY = "client-id";

export function getOrCreateClientId(): string {
  const savedClientId = localStorage.getItem(CLIENT_ID_STORAGE_KEY);

  if (savedClientId) {
    return savedClientId;
  }

  const newClientId = crypto.randomUUID();
  localStorage.setItem(CLIENT_ID_STORAGE_KEY, newClientId);
  return newClientId;
}
