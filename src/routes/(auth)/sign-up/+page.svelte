<script lang="ts">
	import { goto } from '$app/navigation'; // React의 useNavigate 대체
	import AuthForm from '$lib/components/AuthForm.svelte';
	import { errorCode, isSuccess } from '../../../server/auth/authStore.ts';
	import { googleSignUp, signUp } from '../../../server/auth/signUp.ts';

	// ------------------- Svelte 5 상태 (useState 대체) -------------------
	let name = $state('');
	let email = $state('');
	let password = $state('');
	let errorMsg = $state('');

	// ------------------- Svelte 5 이펙트 (useEffect 대체) -------------------
	// 회원가입 성공 시 페이지 이동 처리
	$effect(() => {
		// $isSuccess Store 값이 true일 때만 실행
		if (isSuccess) {
			goto('/signin'); // SvelteKit 네비게이션 함수
		}
	});

	// 에러 코드 변화 감지 및 메시지 설정
	$effect(() => {
		// $errorCode Store 값이 없을 경우 종료
		if (!errorCode) return;

		// 에러 코드에 따른 메시지 설정
		if ($errorCode === 'auth/invalid-email') {
			errorMsg = 'Please enter a valid email address.';
		} else if ($errorCode === 'auth/email-already-in-use') {
			errorMsg = 'This email is already registered.';
		} else if ($errorCode === 'auth/weak-password') {
			errorMsg = 'Password should be at least 6 characters.';
		} else {
			errorMsg = 'An unknown error occurred. Please try again.';
		}
	});

	// ------------------- 함수 (handleSubmit 대체) -------------------
	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();
		errorMsg = ''; // 오류 메시지 초기화
		// authStore에서 비동기 회원가입 함수 호출
		signUp(name, email, password);
		// 페이지 이동은 $effect에서 $isSuccess가 변경된 후 처리됩니다.
	};
</script>

<AuthForm
	title={'Create an Account'}
	subtitle={'Let’s start with your journey'}
	onSubmit={handleSubmit}
	btnText={'Create account'}
	btnGoogleText={'Sign up with Google'}
	questionText={'Already have account?'}
	questionLink={'Log in'}
	link={'/signin'}
	{errorMsg}
	googleClick={googleSignUp}
>
	<input type="text" placeholder="Name" bind:value={name} required />
	<input type="email" placeholder="Email" bind:value={email} required />
	<input type="password" placeholder="Password" bind:value={password} required />
</AuthForm>
