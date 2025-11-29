<main>
	<section class="homehero">
		<div class="homehero__wrapper">
			<p class="homehero__main-text">Track Your Feelings Understand Your Growth</p>
			<p class="homehero__sub-text">Echo helps you turn emotions into self-awareness.</p>
			<img src={'/assets/hero_bg.png'} alt="" />
		</div>
	</section>
</main>

<style lang="scss">
	.homehero {
		width: 100%;

		&__wrapper {
			padding-top: 10rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 1rem;
			img {
				width: 100%;
			}
		}
		&__main-text {
			font-size: 3rem;
			line-height: 1;
			font-weight: 700;
			text-align: center;
			max-width: 350px;
			@include dvTablet {
				font-size: 4.5rem;
				max-width: 80%;
			}
		}
		&__sub-text {
			font-size: 1rem;
			font-weight: 600;
			text-align: center;
			max-width: 350px;
			@include dvTablet {
				font-size: 1.25rem;
				max-width: 80%;
				color: $color-grey;
			}
		}
		img {
			width: 100%;
			max-width: 30%;
		}
	}
</style>
