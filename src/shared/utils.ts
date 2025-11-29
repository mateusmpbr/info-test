export function toKebabCase(name: string) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

export function isUUIDv4(value: any) {
  return (
    typeof value === "string" &&
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(
      value
    )
  );
}

export function isPlaca(value: any) {
  return typeof value === "string" && value.length === 7;
}

export function isChassi(value: any) {
  return typeof value === "string" && value.length === 17;
}

export function isRenavam(value: any) {
  const s = String(value);
  return /^\d+$/.test(s) && s.length >= 9 && s.length <= 11;
}

export function isString(value: any) {
  return typeof value === "string";
}

export function isYear(value: any) {
  return /^\d{4}$/.test(String(value));
}

export function isPayloadEmpty(payload: any) {
  return (
    !payload ||
    (typeof payload === "object" && Object.keys(payload).length === 0)
  );
}
