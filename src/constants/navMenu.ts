export const navMenu = [
	{ name: 'Home', path: '/' },
	{ name: 'Diary', path: '/diary' },
	{ name: 'About', path: '/about' },
	{ name: 'Help', path: '/help' },
	{ name: 'Try it', path: '/try' },
	{ name: 'Sign In', path: '/signin' }
];

export const dashboardNavMenu = [
	{ name: 'Dashboard', path: '/diary' }, // 메인 대시보드
	{ name: 'Diary', path: '/diary/list' }, // 전체 일기 목록
	{
		name: 'Emotion',
		path: '/diary/emotion'
	}, // 감정 분석/통계
	{
		name: 'Mascot Room',
		path: '/diary/mascot'
	}, // 마스코트 공간
	{ name: 'Echo Letter', path: '/diary/letter' }, // 감정 편지
	{ name: 'Settings', path: '/diary/setting' },
	{ name: 'Log out', path: '/' },
	{ name: 'Profile', path: '/profile' }
];
