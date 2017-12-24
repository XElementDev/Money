import * as express from "express";
import * as http from "http";//Node.js
import * as urljoin from "url-join";


//#region not unit-tested
export class MoneyRestService {

	public constructor() {
		this.app = express();
		this.router = express.Router();

		this.configureRoutesSync();
	}


	private configureRoutesSync(): void {
		this.router.get("/", (req, res) => { res.end("Hello World!"); });
		this.app.use("/", this.router);
	}


	private static async createServer(app: express.Express, port: number): Promise<http.Server> {
		const promise = new Promise<http.Server>((resolve, reject) => {
			const server = app.listen(port, () => { resolve(server); });
		});
		return promise;
	}


	public async start(): Promise<void> {
		const port = 8080;
		await MoneyRestService.createServer(this.app, port);
	}


	private app: express.Express;

	private router: express.Router;

}
//#endregion
