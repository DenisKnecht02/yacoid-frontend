<script lang="ts">
	import feather from 'feather-icons';

	export let icon: string;
	export let size: string = '24px';
	export let strokeWidth: string = '2';
	export let color: string = '#FFF';
	export let fillColor: string = 'none';
	export let settings: object = {};
	export let hoverIcon: string = '';
	export let hoverColor: string = '';
	export let hoverSize: string = '';
	export let hoverFillColor: string = 'none';
	export let hoverStrokeWidth: number = 2;
	export let hovering: boolean = false;
	export let spin: boolean = false;
	export let spinOnHover: boolean = false;
	export let pulse: boolean = false;
	export let ping: boolean = false;
	export let onClick: any = () => {};
	let className: string = '';
	export { className as class };

	if (!color) {
		color = '#FFF';
	}

	if (!fillColor) {
		// if fillColor = '', then set it to default: none
		fillColor = 'none';
	}

	if (!hoverIcon) {
		hoverIcon = icon;
	}

	if (!hoverFillColor) {
		hoverFillColor = 'none';
	}

	if (fillColor && (!hoverFillColor || hoverFillColor === 'none')) {
		hoverFillColor = fillColor;
	}

	function giveSize() {
		let w: number = 0;
		if (typeof window !== 'undefined') {
			w = window.innerWidth;
		}

		if (w < 640) {
			size = '16px';
		} else if (w < 768) {
			size = '24px';
		} else if (w < 1024) {
			size = '28px';
		} else if (w < 1280) {
			size = '32px';
		} else {
			size = '40px';
		}
	}

	let cssClasses: string[] = [];
	if (className) cssClasses.push(className);
	if (spin) cssClasses.push('animations');
	if (spinOnHover) cssClasses.push('hover:animate-spin');
	if (pulse) cssClasses.push('animate-pulse');
	if (ping) cssClasses.push('animate-ping');

	let componentHovering: boolean = false;
	let iconSettings = JSON.parse(JSON.stringify(settings));
	iconSettings.color = color;
	iconSettings.fill = fillColor;
	iconSettings['stroke-width'] = strokeWidth;

	if (size.length > 0) {
		iconSettings.width = size;
		iconSettings.height = size;
	}

	const iconHoverColor = hoverColor ? hoverColor : color;

	function createSVG(icon: string, settings: feather.FeatherAttributes) {
		let svg = '';
		if (feather.icons[icon]) {
			svg = feather.icons[icon].toSvg(settings);
		} else {
			svg = feather.icons['help-circle'].toSvg(settings);
		}

		return svg;
	}

	let svg = createSVG(icon, iconSettings);

	function changeToHoverState() {
		componentHovering = true;
		onHover();
	}

	function onHover() {
		iconSettings.width = hoverSize;
		iconSettings.height = hoverSize;
		iconSettings.color = iconHoverColor;
		iconSettings.fill = hoverFillColor;
		iconSettings['stroke-width'] = hoverStrokeWidth;
		svg = createSVG(hoverIcon, iconSettings);
	}

	function changeToNoHoverState() {
		componentHovering = false;
		onDehover();
	}

	function onDehover() {
		iconSettings.width = size;
		iconSettings.height = size;
		iconSettings.color = color;
		iconSettings.fill = fillColor;
		iconSettings['stroke-width'] = strokeWidth;
		svg = createSVG(icon, iconSettings);
	}

	$: {
		//giveSize();

		if (!hoverSize) {
			hoverSize = size;
		}

		if (hovering || componentHovering) onHover();
		else onDehover();

		if (icon) {
			hoverIcon = icon;
			if (hovering || componentHovering) onHover();
			else onDehover();
		}

		if (strokeWidth) {
			iconSettings['stroke-width'] = strokeWidth;
			if (!hovering && !componentHovering) svg = createSVG(icon, iconSettings);
		}

		if (color) {
			iconSettings.color = color;
			if (!hovering && !componentHovering) svg = createSVG(icon, iconSettings);
		}

		if (fillColor) {
			iconSettings.fill = fillColor;
			if (!hovering && !componentHovering) svg = createSVG(icon, iconSettings);
		}

		if (hoverColor) {
			iconSettings.color = hoverColor;
			if (hovering && componentHovering) svg = createSVG(icon, iconSettings);
		}

		if (hoverFillColor) {
			iconSettings.fill = hoverFillColor;
			if (hovering && componentHovering) svg = createSVG(icon, iconSettings);
		}
	}
</script>

<div
	on:click={onClick}
	on:mouseenter={changeToHoverState}
	on:mouseleave={changeToNoHoverState}
	class={cssClasses.join(' ')}
	id="icondiv"
>
	{@html svg}
</div>

<style lang="postcss">
	.animations {
		animation: spin 1s linear infinite, pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}
</style>
