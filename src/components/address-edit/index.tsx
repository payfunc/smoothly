// tslint:disable-next-line: no-implicit-dependencies
import { Component, Event, EventEmitter, Prop, h, Listen } from "@stencil/core"
import { Address, Trigger } from "smoothly-model"
import * as isoly from "isoly"

@Component({
	tag: "smoothly-address-edit",
	styleUrl: "style.css",
	scoped: true,
})
export class AddressEdit {
	@Prop() value: string | Address
	get address(): Address { return typeof(this.value) == "string" ? JSON.parse(this.value) as Address : this.value }
	@Event() change: EventEmitter<Address>
	@Listen("trigger")
	onTrigger(e: CustomEvent<Trigger>) {
		if (e.detail.name == "cancel") {
			this.change.emit(this.address)
		}
	}
	onSubmit(e: CustomEvent) {
		e.stopPropagation()
		const result: Address = { ...e.detail, countryCode: isoly.CountryCode.Name.parse(e.detail.country), country: undefined }
		this.change.emit(result)
	}
	render() {
		return Address.SE.is(this.address) || Address.FI.is(this.address) ?
		[
			<form>
				<smoothly-input type="text" name="street" value={ this.address.street }>Street</smoothly-input>
				<smoothly-input type="text" name="zipCode" value={ this.address.zipCode }>Zip</smoothly-input>
				<smoothly-input type="text" name="city" value={ this.address.city }>City</smoothly-input>
				<smoothly-input type="text" name="country" value={ isoly.CountryCode.Name.from("en", this.address.countryCode) }>Country</smoothly-input>
				<div>
					<smoothly-submit color="primary" fill="clear" prevent onSubmit={ (e: CustomEvent) => this.onSubmit(e) }>Save</smoothly-submit>
					<smoothly-trigger color="primary" fill="clear" name="cancel">Cancel</smoothly-trigger>
				</div>
			</form>,
		] :
		<p>Unknown address country: { JSON.stringify(this.address) }</p>
	}
}
