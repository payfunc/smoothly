import { Component, State, Prop } from "@stencil/core"

@Component({
	tag: "smoothly-spinner",
	styleUrl: "smoothly-spinner.css",
	scoped: true,
})
export class SmoothlySpinner {
	@Prop({ reflectToAttr: true }) active: boolean
	render() {
		return <div>Loading...</div>
	}
}
