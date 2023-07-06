import production from "./production.js";
import development from "./development.js";

const config = (app) => {
    const CONFIG_ENVS = { production, development };
    return CONFIG_ENVS[app.get('env')];

};

export default config;