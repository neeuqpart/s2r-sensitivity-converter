export function convert({source,roblox,multiplier,dpi,targetDpi,yaw=.022,robloxYaw=.5,reverse=false}) {
  for (const value of [reverse ? multiplier : source,roblox,dpi,targetDpi,yaw,robloxYaw]) if (!Number.isFinite(value) || value <= 0) throw new Error('Use a number greater than zero in every field.');
  const result = reverse ? roblox * multiplier * robloxYaw * targetDpi / (yaw * dpi) : source * yaw * dpi / (roblox * robloxYaw * targetDpi);
  const degrees = reverse ? roblox * multiplier * robloxYaw : source * yaw;
  const cm = 360 * 2.54 / (degrees * (reverse ? targetDpi : dpi));
  if (!Number.isFinite(result) || !Number.isFinite(cm)) throw new Error('These values are too large or too small to calculate.');
  return {value:result,cm,effective:reverse ? roblox*multiplier : roblox*result};
}
