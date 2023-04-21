import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

type GetStaticPathProps = {
	id: string;
};

const GetStaticPath: NextPage<GetStaticPathProps> = ({ id }) => {
	const router = useRouter();

	if (router.isFallback) {
		return <div>Loading...</div>;
	}

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
				<p>{id}に対応したページです</p>
			</main>
		</div>
	);
};

// getStaticPathsは生成したいページのパスパラメーターの組み合わせを返す
// このファイルはpages/ssg/[id].tsxなので、パスパラメーターとしてidの組み合わせを返す必要がある
export const getStaticPaths: GetStaticPaths = async () => {
	const paths = [
		{
			params: {
				id: '1',
			},
		},
		{
			params: {
				id: '2',
			},
		},
		{
			params: {
				id: '3',
			},
		},
	];

	// fallbackをfalseにすると、pathsで定義されたページ以外は404になる
	return { paths, fallback: false };
};

// getStaticPaths実行後にそれぞれのパスに対してgetStaticPropsが実行される
export const getStaticProps: GetStaticProps<GetStaticPathProps> = async (
	context,
) => {
	// context.paramsにパスパラメータの値が入っている
	// context.params['id']はstring | string[]型なので、値が配列かどうかで場合分けをする
	const id = Array.isArray(context.params?.id) ? context.params?.id[0] : context.params?.id;

	// ここで返したpropsをもとにページコンポーネントを描画する
	return {
		props: {
			id,
		},
	};
};

export default GetStaticPath;
