import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

type ISRProps = {
	message: string;
};

// ISRPropsをpropsとして受け取るPageであることを明示
const ISR: NextPage<ISRProps> = ({ message }) => {
	const router = useRouter();

	if (router.isFallback) {
		return <div>ロード中...</div>;
	}

	return (
		<div>
			<Head>
				<title>ISR</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<p>
					このページはインクリメンタルサイト生成によってリクエスト時に生成されたページです。
				</p>
				<p>{message}</p>
			</main>
		</div>
	);
};

export const getStaticProps = async () => {
	const timestamp = new Date().toLocaleString();
	const message = `${timestamp}にgetStaticPropsが実行されました。`;

	return {
		props: {
			message,
		},
		// 60秒後に再生成する
		revalidate: 60,
	};
};

export default ISR;
