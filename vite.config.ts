import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path'; // 1. path 모듈 불러오기

export default defineConfig({
	plugins: [sveltekit()],
	css: {
		preprocessorOptions: {
			scss: {
				// 2. process.cwd()와 path.resolve를 사용해 절대 경로로 지정
				// 3. 오타 수정: responsvie -> responsive
				additionalData: `
                    @import "${path.resolve(process.cwd(), 'src/styles/_responsive.scss')}"; 
                    @import "${path.resolve(process.cwd(), 'src/styles/_colors.scss')}";
                `
			}
		}
	}
});
