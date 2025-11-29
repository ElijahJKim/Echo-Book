import {
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut as firebaseSignOut
} from 'firebase/auth';
import { goto } from '$app/navigation';

import { auth, googleProvider } from './firebase.ts';
import { errorCode, isSuccess } from './authStore.ts';

export const signIn = async (email: string, password: string): Promise<void> => {
	errorCode.set(null);
	isSuccess.set(false);
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);

		if (!userCredential.user.emailVerified) {
			await firebaseSignOut(auth);
			errorCode.set('auth/email-not-verified');
			return;
		}

		goto('/');
		isSuccess.set(true);
	} catch (error: any) {
		errorCode.set(error.code);
	}
};

export const googleSignIn = async (): Promise<void> => {
	errorCode.set(null);
	try {
		await signInWithPopup(auth, googleProvider);
		// 성공 시 onAuthStateChanged 리스너가 user 상태를 업데이트하고 네비게이션을 처리함
	} catch (error) {
		console.log('구글 로그인 실패', error);
		// 필요하다면 에러 코드를 세팅
	}
};
