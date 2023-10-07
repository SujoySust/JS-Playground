const app = require("express")();
const {Client} = require("pg");
const HashRing = require("hashring");
const crypto = require("crypto");

const hr = new HashRing();

hr.add("5432");
hr.add("5433");
hr.add("5434");

const clients = {
    "5432": new Client({
        "host": "172.17.0.2",
        "port": "5432",
        "user": "postgres",
        "password": "postgres",
        "database": "postgres",
    }),

    "5433": new Client({
        "host": "172.17.0.3",
        "port": "5433",
        "user": "postgres",
        "password": "postgres",
        "database": "postgres",
    }),

    "5434": new Client({
        "host": "172.17.0.4",
        "port": "5434",
        "user": "postgres",
        "password": "postgres",
        "database": "postgres",
    })
}

 connect();

async function connect() {
    try {
        await clients["5432"].connect();
        await clients["5433"].connect();
        await clients["5434"].connect();
    } catch(e){

    }
}


app.get("/:urlId", async (req, res) => {
    const urlId = req.params.urlId;
    const server = hr.get(urlId);
    const result = await clients[server].query("SELECT * FROM URL_TABLE WHERE URL_ID = $1", [urlId]);
    if(result.rowCount > 0) {
        res.send({
            "urlId": result.url_id,
            "url": result.url,
            "server": server,
        })
    } else {
        res.sendStatus(404);
    }
})

app.post("/", async (req, res) => {
    const url = req.query.url;

    //consistenly hash 
    const hash = crypto.createHash("sha256").update(url).digest("base64");
    const urlId = hash.substring(0,5);
    const server = hr.get(urlId);

    console.log(server);

    await clients[server].query("INSERT INTO url_table (url, url_id) VALUES($1,$2)", [url, urlId]);

    res.send({
        "urlId": urlId,
        "url": url,
        "server": server,
    });
})

app.listen("3000", ()=> console.log("Listening to 3000.."));