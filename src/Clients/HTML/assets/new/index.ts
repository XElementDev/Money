/// <reference path="../../../../../node_modules/@types/jquery/index.d.ts" />


class NewAssetViewModel {

	public constructor() {
		this.attachBehavior();
		this.setDefaultValues();
	}


	private attachBehavior(): void {
		$("#asset-type-earning").on("click", () => {
			$(NewAssetViewModel.TITLE_HEADER_EXPENSE).hide();
			$(NewAssetViewModel.TITLE_HEADER_EARNING).show();
		});

		$(NewAssetViewModel.RADIO_BUTTON_EXPENSE).on("click", () => {
			$(NewAssetViewModel.TITLE_HEADER_EARNING).hide();
			$(NewAssetViewModel.TITLE_HEADER_EXPENSE).show();
		});
	}


	private static padLeft(target: any, 
	                       totalWidth: number, 
	                       paddingStr: string): string {
		let str = `${target}`;
		while(str.length < totalWidth) {
			str = paddingStr + str;
		}
		return str;
	}


	private setDefaultValues(): void {
		$(NewAssetViewModel.RADIO_BUTTON_EXPENSE).click();

		const today = new Date();
		const year = today.getFullYear();
		const month = today.getMonth()+1;
		const monthStr = NewAssetViewModel.padLeft(month, 2, "0");
		const day = today.getDate();
		const dayStr = NewAssetViewModel.padLeft(day, 2, "0");
		$("#purchase-date").val(`${year}-${monthStr}-${dayStr}`);

		$("#price").val("0.00");

		$("#comment").val("");
	}


	private static readonly RADIO_BUTTON_EXPENSE = "#asset-type-expense";

	private static readonly TITLE_HEADER_EARNING = ".title-header-earning";

	private static readonly TITLE_HEADER_EXPENSE = ".title-header-expense";

}


new NewAssetViewModel();
