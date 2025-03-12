import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from '../../constants/articleProps';
import styles from './App.module.scss';
import { CSSProperties, useState } from 'react';

export const App = () => {
	const [currentArticleState, setCurrentArticleState] =
		useState(defaultArticleState);
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': currentArticleState.fontFamilyOption.value,
					'--font-size': currentArticleState.fontSizeOption.value,
					'--font-color': currentArticleState.fontColor.value,
					'--container-width': currentArticleState.contentWidth.value,
					'--bg-color': currentArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				currentArticleState={currentArticleState}
				setCurrentArticleState={setCurrentArticleState}
			/>
			<Article />
		</main>
	);
};
