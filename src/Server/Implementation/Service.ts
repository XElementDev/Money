import * as express from "express";
import * as http from "http";//Node.js
import * as urljoin from "url-join";

import * as CompanyInfo from "../../Common/Publishing/CompanyInfo";
import * as ProductInfo from "../../Common/Publishing/ProductInfo";
import { RegisterRoutes as registerRoutesSync } from "./generated/routes";

//#region import-only
import { PersonController } from "./controllers/PersonController";
//#endregion


//#region not unit-tested
export class MoneyRestService {

	public constructor() {
		this.app = express();
		this.router = express.Router();

		this.configureRoutesSync();

		return;
	}


	private configureRoutesSync(): void {
		registerRoutesSync(this.router);

		const path = "/" + urljoin(CompanyInfo.internalNameSync(), ProductInfo.internalNameSync(), 
		                           "API", "REST");
		this.app.use(path, this.router);

		return;
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
		return;
	}


	private app: express.Express;

	private router: express.Router;

}
//#endregion
