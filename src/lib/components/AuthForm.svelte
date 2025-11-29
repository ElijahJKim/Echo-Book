<script lang="ts">
	const {
		title,
		subtitle,
		onSubmit,
		btnText,
		btnGoogleText,
		questionText,
		questionLink,
		link,
		googleClick,
		errorMsg,
		children
	} = $props<{
		title: string;
		subtitle: string;
		onSubmit: (event: SubmitEvent) => void;
		btnText: string;
		btnGoogleText: string;
		questionText: string;
		questionLink: string;
		link: string;
		googleClick: (event: MouseEvent) => void;
		errorMsg?: string;
		children: () => unknown;
	}>();
</script>

<div class="auth">
	<div class="auth__wrapper">
		<div class="auth__left">
			<div class="auth__left--container">
				<a href="/">
					<img src={'/assets/logo_read.png'} alt="Read Logo" class="logo__read__img auth__logo" />
				</a>
				<div class="auth__left--middle">
					<h1>{title}</h1>
					<h2>{subtitle}</h2>

					<form id="my-form" onsubmit={onSubmit}>
						{@render children()}
					</form>

					{#if errorMsg}
						<span class="error-msg">{errorMsg}</span>
					{/if}

					<div class="btn-container">
						<button type="submit" form="my-form">
							{btnText}
						</button>
						<button onclick={googleClick}>
							<img src={'/assets/logo_read.png'} alt="Google Logo" />
							{btnGoogleText}
						</button>
					</div>

					<span>
						{questionText}
						<a href={link}>{questionLink}</a>
					</span>
				</div>
				<div class="empty-space"></div>
			</div>
		</div>

		<div class="auth__right">
			<div class="auth__right__top">
				<img src={'assets/auth_bg.png'} alt="Authentication Background" />
			</div>
			<div class="auth__right__bottom--empty"></div>
		</div>
	</div>
</div>

<style lang="scss">
	.auth {
		height: 100vh;

		&__wrapper {
			display: flex;

			height: 100%;
			box-sizing: border-box;
		}
		&__left {
			width: 100%;

			height: 100%;
			padding: 1rem 2rem;
			box-sizing: border-box;
			display: flex;
			justify-content: center;
			@include dvTablet {
				width: 50%;
			}
			&--container {
				height: 100%;
				width: 100%;
				max-width: 35rem;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
			}
			a {
				align-self: flex-start;
			}
			&--middle {
				width: 100%;
				max-width: 300px;
				margin-bottom: 2.5rem;
				h1 {
					font-size: 1.75rem;
					font-weight: 800;
				}
				h2 {
					font-size: 1.05rem;
					font-weight: 500;
					margin-top: 0.75rem;
				}
				form {
					display: flex;
					flex-direction: column;
					gap: 1.25rem;
					width: 100%;
					margin-top: 2.5rem;
					input {
						border: 1px solid rgba(0, 0, 0, 0);
						height: 35px;
						border-bottom-color: #dcdcdc;
						outline: none;
						transform: 0.3s ease;
						&:focus,
						&:hover {
							border-bottom: 1px solid $color-orange;
						}
						&::placeholder {
							opacity: 0.5;
						}
					}
				}
				.btn-container {
					display: flex;
					flex-direction: column;
					gap: 0.75rem;
					width: 100%;
					margin-top: 3rem;
					button {
						border: 1px solid $color-orange;
						background-color: inherit;
						display: flex;
						align-items: center;
						justify-content: center;
						height: 40px;
						border-radius: 30px;
						font-weight: 600;
						cursor: pointer;
						&:first-child {
							background-color: $color-orange;
							color: $color-cream;
							transition: 0.1s ease-in-out;
							&:hover {
								background-color: $color-cream;
								color: $color-orange;
							}
						}
						&:last-child {
							color: $color-orange;
							transition: 0.2s ease-in-out;
							&:hover {
								transform: translate(0, -5px);
								box-shadow: 0 5px 2px rgba(0, 0, 0, 0.2);
							}
						}
					}
					img {
						width: 30px;
						margin-right: 0.5rem;
					}
				}
				span {
					display: flex;
					justify-content: center;
					margin-top: 1rem;
					font-size: 0.9rem;
					gap: 0.5rem;
					a {
						font-weight: bold;
						text-decoration: underline;
					}
				}
				.error-msg {
					color: red;
					font-size: 0.75rem;
				}
			}
		}
		&__right {
			display: none;
			@include dvTablet {
				width: 50%;
				height: 100%;
				display: flex;
				flex-direction: column;
				&__top {
					height: 90%;
					display: flex;

					img {
						width: 100%;
						object-fit: cover;
					}
				}
				&__bottom--empty {
					width: 100%;
					height: 10vh;

					background-color: $color-orange;
				}
			}
		}
	}

	.empty-space {
		height: 22px;
		background-color: red;
	}
</style>
