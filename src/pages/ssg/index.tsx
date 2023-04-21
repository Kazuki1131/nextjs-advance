import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

type SSGProps = {
	message: string;
};

// NextPage<props>でpropsが入るPageであることを明示
const SSG: NextPage<SSGProps> = ({ message }) => {
	return (
		<div>
			<Head>
				<title>SSG</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<p>
					このページは静的サイト生成によってビルド時に生成されたページです。
				</p>
				<p>{message}</p>
			</main>
		</div>
	);
};

export const getStaticProps: GetStaticProps<SSGProps> = async (context) => {
	const timestamp = new Date().toLocaleString();
	const message = `${timestamp}にgetStaticPropsが実行されました。`;

  // ここで返したpropsをもとにページコンポーネントを描画する
	return {
		props: {
			message,
		},
	};
};

export default SSG;
