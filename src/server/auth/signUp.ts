import {
	createUserWithEmailAndPassword,
	signInWithPopup,
	sendEmailVerification,
	updateProfile,
	signOut as firebaseSignOut
} from 'firebase/auth';
import { auth, googleProvider } from './firebase.ts';
import { errorCode, isSuccess } from './authStore.ts';

export const signUp = async (name: string, email: string, password: string): Promise<void> => {
	errorCode.set(null);
	isSuccess.set(false);
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);

		await updateProfile(userCredential.user, {
			displayName: name
		});

		await sendEmailVerification(userCredential.user);
		await firebaseSignOut(auth);

		// 성공 플래그 설정 -> SignUp 컴포넌트의 $effect가 감지하여 /signin으로 이동시킴
		isSuccess.set(true);
	} catch (error: any) {
		errorCode.set(error.code);
	}
};

// 구글 회원가입 로직 (사인인 로직과 동일)
export const googleSignUp = async (): Promise<void> => {
	errorCode.set(null);
	try {
		await signInWithPopup(auth, googleProvider);
	} catch (error) {
		console.log('구글 회원가입 실패', error);
	}
};
