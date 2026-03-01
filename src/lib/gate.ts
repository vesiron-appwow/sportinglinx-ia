export type MemberTier = "free" | "gold" | "platinum" | "trader" | "rbm_stage1" | "rbm_stage2";

export type GateState =
  | { isLoggedIn: false; canAct: false; tier: "free" }
  | { isLoggedIn: true; canAct: false; tier: "free" }
  | { isLoggedIn: true; canAct: true; tier: Exclude<MemberTier, "free"> };

export function canActFromTier(tier: MemberTier): boolean {
  // Locked doctrine: only subscribed members can act
  return tier !== "free";
}

// v1: we read tier from an API endpoint (or mock). If unavailable, treat as free.
export async function getGateState(fetchFn: typeof fetch, apiBase: string, cookieHeader?: string): Promise<GateState> {
  try {
    const r = await fetchFn(`${apiBase}/api/v1/auth/whoami`, {
      method: "GET",
      headers: cookieHeader ? { cookie: cookieHeader } : undefined,
      credentials: "include"
    });

    if (!r.ok) return { isLoggedIn: false, canAct: false, tier: "free" };

    const j = await r.json();
    const tier = (j?.tier ?? "free") as MemberTier;

    if (tier === "free") return { isLoggedIn: true, canAct: false, tier: "free" };
    return { isLoggedIn: true, canAct: true, tier };
  } catch {
    return { isLoggedIn: false, canAct: false, tier: "free" };
  }
}