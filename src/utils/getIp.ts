export function getClientIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const remoteAddr = request.headers.get("remote-addr");

  return forwarded?.split(",")[0]?.trim() || realIP || remoteAddr || "unknown";
}
