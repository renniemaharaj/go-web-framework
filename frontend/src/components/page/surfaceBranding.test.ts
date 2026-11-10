import { describe, expect, it } from "vitest";
import { defaultSettings } from "../ui/GravityParticles/engine";
import { SECTION_TYPE_DESCRIPTIONS, SECTION_TYPE_GROUPS } from "./types";

describe("Go Web Framework surface defaults", () => {
  it("uses Go Web Framework in platform-owned visible defaults", () => {
    expect(defaultSettings.rendererText).toBe("Go Web Framework");
    expect(SECTION_TYPE_DESCRIPTIONS.resource_embed).toContain("Go Web Framework");
    expect(SECTION_TYPE_GROUPS.find(group => group.id === "embeds")?.description).toContain(
      "Go Web Framework"
    );
  });
});
