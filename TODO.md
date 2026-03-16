import { registry } from "@/lib/registry";
import config from "./config";
registry.register(config);
export default config;
export * from "./types";

