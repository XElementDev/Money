/// <reference path="../../../../../node_modules/@types/jquery/index.d.ts" />


class NewAssetViewModel {

	public constructor() {
		this.setDefaultValues();
	}


	private setDefaultValues(): void {
		$("#asset-type-expense").prop("checked", true);
	}

}


new NewAssetViewModel();
