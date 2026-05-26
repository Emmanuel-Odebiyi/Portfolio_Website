import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ cacheDir: 'C:/Users/HP/Documents/Portfolio_Website/tina/__generated__/.cache/1779819927600', url: 'http://localhost:4001/graphql', token: 'dummy', queries,  });
export default client;
  