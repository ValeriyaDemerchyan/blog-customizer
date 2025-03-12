import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';
import { Select } from 'src/ui/select';

import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { useRef, useState } from 'react';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Text } from 'src/ui/text';

export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: {
	currentArticleState: ArticleStateType;
	setCurrentArticleState: (param: ArticleStateType) => void;
}) => {
	const [formState, setFormState] = useState(currentArticleState);
	const [isOpen, setIsOpen] = useState(false);
	const sidebarRef = useRef<HTMLDivElement | null>(null);

	const handleToggleForm = () => {
		setIsOpen((prev) => !prev);
	};

	useOutsideClickClose({
		isOpen,
		rootRef: sidebarRef,
		onClose: () => setIsOpen(false),
		onChange: (newValue) => setIsOpen(newValue),
	});

	const handleChange = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setFormState((prevState) => ({ ...prevState, [field]: value }));
		};
	};

	const handleApplyChanges = (event: React.FormEvent) => {
		event.preventDefault();
		setCurrentArticleState({
			...formState,
		});
	};

	const handleResetChanges = () => {
		setFormState({
			...defaultArticleState,
		});
		setCurrentArticleState({
			...defaultArticleState,
		});
	};
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggleForm} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleApplyChanges}
					onReset={handleResetChanges}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						placeholder='Выберите шрифт'
						onChange={handleChange('fontFamilyOption')}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleChange('fontSizeOption')}
						title='Размер шрифта'
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						placeholder='Выберите цвет шрифта'
						onChange={handleChange('fontColor')}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						placeholder='Выберите цвет фона'
						onChange={handleChange('backgroundColor')}
						title='Цвет фона'
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						placeholder='Выберите ширину контента'
						onChange={handleChange('contentWidth')}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
