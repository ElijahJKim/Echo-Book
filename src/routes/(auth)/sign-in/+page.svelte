<script lang="ts">
	import AuthForm from '$lib/components/AuthForm.svelte';
	import { errorCode } from '../../../server/auth/authStore.ts';
	import { googleSignIn, signIn } from '../../../server/auth/signIn.ts';

	// Svelte 컴포넌트 임포트

	// ------------------- Svelte 5 상태 (useState 대체) -------------------
	let email = $state('');
	let password = $state('');
	let errorMsg = $state('');

	// ------------------- Svelte 5 이펙트 (useEffect 대체) -------------------
	// $effect는 의존성 배열([errorCode])을 명시할 필요 없이,
	// 내부에서 사용된 반응형 변수($errorCode)가 바뀔 때마다 실행됩니다.
	$effect(() => {
		// Store 값에 접근하기 위해 $을 붙입니다. ($errorCode)
		if (!errorCode) return;

		if ($errorCode === 'auth/invalid-credential') {
			errorMsg = 'Please check your email or password.';
		} else {
			// 기타 에러 처리 로직 추가
			errorMsg = 'An unexpected error occurred.';
		}
	});

	// ------------------- 함수 (handleSubmit 대체) -------------------
	const handleSubmit = (e: SubmitEvent) => {
		// e.preventDefault()는 Svelte에서 on:submit|preventDefault로 처리할 수 있으나,
		// 여기서는 함수 내부에서 직접 호출하거나, AuthForm에서 처리하도록 구현할 수도 있습니다.
		e.preventDefault();
		errorMsg = ''; // 오류 메시지 초기화
		signIn(email, password);
	};

	// ------------------- 컴포넌트 렌더링 -------------------
</script>

<AuthForm
	title={'Login'}
	subtitle={'Let’s continue your journey'}
	onSubmit={handleSubmit}
	btnText={'Log in'}
	btnGoogleText={'Log in with Google'}
	questionText={"Don't have account?"}
	questionLink={'Sign up'}
	link={'/signup'}
	{errorMsg}
	googleClick={googleSignIn}
>
	<input type="email" placeholder="Email" bind:value={email} required />
	<input type="password" placeholder="Password" bind:value={password} required />
</AuthForm>
