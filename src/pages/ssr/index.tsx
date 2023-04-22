import { NextPage } from 'next';
import Head from 'next/head';

type SSRProps = {
	message: string;
};

const SSR: NextPage<SSRProps> = ({ message }) => {
	return (
		<div>
			<Head>
				<title>SSR</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<p>
					このページはサーバーサイドレンダリングによってリクエスト時に生成されたページです。
				</p>
				<p>{message}</p>
			</main>
		</div>
	);
};

// getServerSidePropsはリクエスト時に実行される
export const getServerSideProps = async () => {
	const timestamp = new Date().toLocaleString();
	const message = `${timestamp}にgetServerSidePropsが実行されました。`;

	return {
		props: {
			message,
		},
	};
};
export default SSR;
