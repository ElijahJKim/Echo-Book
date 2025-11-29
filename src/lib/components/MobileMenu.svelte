<script lang="ts">
	import { quintOut } from 'svelte/easing';
	import { fly, fade } from 'svelte/transition';
	import { page } from '$app/stores';

	import { navMenu } from '../../constants/navMenu.ts';

	let { isMenuOpen = $bindable() } = $props();
	let currLocation = $derived($page.url.pathname);

	function closeMenu() {
		isMenuOpen = false;
	}
</script>

{#if isMenuOpen}
	<div class="mobile-menu" role="dialog" aria-modal="true">
		<button
			type="button"
			class="mobile-menu__overlay"
			onclick={closeMenu}
			transition:fade={{ duration: 300 }}
			aria-label="Close menu"
		></button>

		<div class="mobile-menu__wrapper" transition:fly={{ x: -100, duration: 300, easing: quintOut }}>
			<img src="/assets/logo_read.png" alt="Read Logo" class="logo__read__img" />

			<ul class="mobile-menu__list">
				{#each navMenu as nav, index (index)}
					<li>
						<a href={nav.path} class:curr__location={currLocation === nav.path} onclick={closeMenu}>
							{nav.name}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
{/if}

<style lang="scss">
	.mobile-menu {
		position: absolute;
		height: 100vh;
		width: 100%;
		top: 0;
		left: 0;
		display: flex;

		&__wrapper {
			width: 75%;
			height: 100%;
			background-color: $color-dark-orange;
			padding-top: 1.5rem;
			padding-left: 0.5rem;
			z-index: 1;
			ul {
				display: flex;
				flex-direction: column;
				gap: 1.5rem;
				padding: 1.2rem;
				li {
					color: $color-cream;
					transition: 0.3s ease-in-out;
					&:hover {
						color: $color-orange;
					}
					a {
						font-size: 2.75rem;
						font-weight: bold;
						cursor: pointer;
					}
					.curr__location {
						color: $color-orange;
					}
				}
			}
		}
		&__overlay {
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.4);
			position: absolute;
		}
	}
</style>
