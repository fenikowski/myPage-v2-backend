import { readFileSync } from "fs";
export default {
    environment   : 'production',
    port          : 5000,
    bodyLimit     : '300kb',
    saltRounds    : 10,
    db            : {
        host    : "***",
        user    : "***",
        password: "***",
        timezone: "+00:00",
        database: "personal_website_schema",
        port    : 3306, 
        ssl     : { ca: readFileSync("./src/ssl/DigiCertGlobalRootCA.crt.pem") }
    }
}