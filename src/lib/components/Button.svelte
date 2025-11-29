<script lang="ts">
	interface Props {
		to: string;
		text: string;
		handleClick?: () => void;
	}

	let { to, text, handleClick }: Props = $props();
</script>

{#if to}
	<a href={to} class="btn">
		{text}
	</a>
{:else}
	<button on:click={handleClick} class="btn">
		{text}
	</button>
{/if}

<style lang="scss">
	.btn {
		outline: none;
		background-color: $color-orange;
		padding: 0.5rem;
		border-radius: 7px;
		color: $color-cream;
		transition: 0.1s ease-in;
		border: 2px solid $color-orange;
		cursor: pointer;
		&:hover {
			color: $color-orange;
			background-color: $color-cream;
		}
	}
</style>
