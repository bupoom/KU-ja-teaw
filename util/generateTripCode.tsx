export default function generateTripCode(): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const timestamp = Date.now().toString();
  let code = "";

  for (let i = 0; i < 8; i++) {
    const seed = (timestamp.charCodeAt(i % timestamp.length) + Math.random() * 1000) | 0;
    const idx = seed % chars.length;
    code += chars[idx];
  }

  return code;
}