import { PostGraphileAmberPreset } from "postgraphile/presets/amber";
import { makePgService } from "postgraphile/adaptors/pg";
import { PostGraphileConnectionFilterPreset } from "postgraphile-plugin-connection-filter";
import { PgManyToManyPreset } from "@graphile-contrib/pg-many-to-many";
import { PgSimplifyInflectionPreset } from "@graphile/simplify-inflection";
import { config } from "dotenv";

// load env variables
config();

// For configuration file details, see: https://postgraphile.org/postgraphile/next/config

/** @satisfies {GraphileConfig.Preset} */
const preset = {
  extends: [
    PostGraphileAmberPreset,
    PostGraphileConnectionFilterPreset,
    PgManyToManyPreset,
    // PgAggregatesPreset,
    PgSimplifyInflectionPreset,
  ],
  disablePlugins: ["PgRBACPlugin"],
  pgServices: [
    makePgService({
      // Database connection string:
      connectionString: process.env.DATABASE_URL,
      // List of schemas to expose:
      schemas: process.env.DATABASE_SCHEMAS?.split(",") ?? ["public"],
      // Disable LISTEN/NOTIFY:
      pubsub: false,
    }),
  ],
  grafserv: {
    port: 5678,
    websockets: false,
  },
  grafast: {
    explain: true,
  },
};

export default preset;
