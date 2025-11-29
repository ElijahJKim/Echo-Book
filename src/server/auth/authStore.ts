import { writable } from 'svelte/store';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from './firebase.ts';

// 유저 정보 저장 스토어 (앱 전체에서 구독 가능)
export const user = writable<User | null>(null);

// 로딩 상태 스토어
export const loading = writable(true);

// 에러 코드 스토어 (액션 함수들에서 상태 업데이트)
export const errorCode = writable<string | null>(null);

// 성공 여부 스토어
export const isSuccess = writable(false);

// ------------------- 초기화 및 구독 -------------------

// 컴포넌트 마운트와 관계없이, 모듈 로드 시 즉시 실행
onAuthStateChanged(auth, (currentUser) => {
	user.set(currentUser);
	loading.set(false);
});
