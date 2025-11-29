<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Menu } from '@lucide/svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import MobileMenu from './MobileMenu.svelte';
	import Button from './Button.svelte';
	import { navMenu } from '../../constants/navMenu.ts';

	// ------------------- Svelte 상태 -------------------
	let isMenuOpen = $state(false);

	// Svelte의 bind:this를 위한 변수 선언
	let climbElement: HTMLDivElement;
	let headerElement: HTMLElement;
	let readElement: HTMLImageElement;

	// GSAP 플러그인 등록

	let scrollTriggerInstance: ScrollTrigger | undefined;

	// ------------------- Svelte Lifecycle (useEffect 대체) -------------------
	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		// 요소가 DOM에 마운트된 후 GSAP 애니메이션 설정
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: headerElement,
				start: 'top top',
				end: 'bottom top',
				scrub: 2
			}
		});

		// 애니메이션 정의
		// .fromTo(요소, 시작 속성, 끝 속성, 위치)
		tl.fromTo(climbElement, { y: 0 }, { y: '-100%' }).fromTo(
			readElement,
			{ opacity: 0 },
			{ opacity: 1 },
			'<'
		); // '<'는 이전 애니메이션과 동시에 시작

		scrollTriggerInstance = tl.scrollTrigger;
	});

	onDestroy(() => {
		// 컴포넌트 언마운트 시 ScrollTrigger 인스턴스 정리
		if (scrollTriggerInstance) {
			scrollTriggerInstance.kill();
		}
	});

	// ------------------- 함수 -------------------
	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
</script>

<header class="header" bind:this={headerElement}>
	<div class="header__wrapper">
		<ul class="header__ul header__left">
			{#each navMenu.slice(0, 3) as nav}
				<li>
					<a href={nav.path}>{nav.name}</a>
				</li>
			{/each}
		</ul>

		<div class="header__logo">
			<a href="/">
				<img
					src="/assets/logo_read.png"
					class="logo__read__img"
					alt="Read Logo"
					bind:this={readElement}
				/>
			</a>
		</div>

		<div class="header__middle" bind:this={climbElement}>
			<img src="/assets/logo_climb.png" class="logo__climb__img" alt="Climb Logo" />
		</div>

		<ul class="header__ul header__right">
			{#each navMenu.slice(3, 5) as nav}
				<li>
					<a href={nav.path}>{nav.name}</a>
				</li>
			{/each}

			<!-- {#if $user}
					<Button on:click={logout} text="Log out" />
				{:else} -->
			<li class="sign-in-button">
				<Button to="/sign-in" text="Sign In" />
			</li>
			<!-- {/if} -->
		</ul>

		<button class="mobile__menu__btn" onclick={toggleMenu} aria-label="Toggle menu">
			<Menu />
		</button>

		<MobileMenu bind:isMenuOpen />
	</div>
</header>

<style lang="scss">
	.header {
		width: 100%;
		box-sizing: border-box;
		position: fixed;
		display: flex;
		justify-content: center;
		height: 10vh;
		background-color: white;
		&__wrapper {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			padding: 1.5rem;
			position: relative;
		}
		&__ul {
			display: none;
			gap: 1.5rem;
			transition: all 2s;
			@include dvLaptop {
				display: flex;
			}
		}

		&__left,
		&__right {
			li {
				position: relative;
				padding: 0.5rem 0;
				cursor: pointer;
				&:after,
				&::before {
					transition: all 0.5s;
				}

				&::after {
					position: absolute;
					bottom: 0;
					left: 0;
					right: 0;
					margin: auto;
					width: 0%;
					content: '.';
					color: transparent;
					background-color: $color-orange;
					height: 1px;
					text-align: left;
					opacity: 0;
				}
				&:hover::after {
					width: 100%;
					opacity: 1;
				}
				&:hover {
					color: black;
				}
			}
			.sign-in-button {
				&::after {
					display: none;
				}
			}
		}
		&__middle {
			display: flex;
			align-items: flex-end;
			justify-content: center;
			width: 5rem;
			height: 9rem;
			background-color: $color-orange;
			position: absolute;
			border-bottom-right-radius: 10px;
			border-bottom-left-radius: 10px;
			top: 70%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		.mobile__menu__btn {
			background: none;
			border: none;
			padding: 0;
			cursor: pointer;
			display: block; // 기본은 보임

			// 내부 아이콘 크기 조절 (선택 사항)
			:global(svg) {
				width: 2rem;
				height: 2rem;
			}

			// 노트북 이상 해상도에서는 숨김
			@include dvLaptop {
				display: none;
			}
		}
	}

	.logo__climb__img {
		width: 4rem;
		height: auto;
		object-fit: cover;
	}
</style>
