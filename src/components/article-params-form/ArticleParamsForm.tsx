import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';
import { Select } from 'src/ui/select';

import styles from './ArticleParamsForm.module.scss';
import { ArticleStateType, backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions, OptionType } from 'src/constants/articleProps';
import { useRef, useState } from 'react';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

export const ArticleParamsForm = ({
	currentArticleState, 
	setCurrentArticleState,
}: {
	currentArticleState: ArticleStateType;
	setCurrentArticleState: (param: ArticleStateType) => void;
}) => {
	const [tempArticleState, setTempArticleState] = useState(currentArticleState)
	const[isOpen, setIsOpen] = useState(false);
	const sidebarRef = useRef<HTMLDivElement | null>(null);

	const handleToggleForm = () => {
		setIsOpen((prev) => !prev);
	}

	useOutsideClickClose({
		isOpen,
		rootRef: sidebarRef,
		onClose: () => setIsOpen(false),
		onChange: (newValue) => setIsOpen(newValue),
	})

	const handleFontFamilyChange = (selectedFont: OptionType) => {
		setTempArticleState({
			...tempArticleState,
			fontFamilyOption: selectedFont,
		});
	};

	const handleFontSizeChange = (selectedSize: OptionType) => {
		setTempArticleState({
			...tempArticleState,
			fontSizeOption: selectedSize,
		});
	}

	const handleFontColorChange = (selectedColor: OptionType) => {
		setTempArticleState({
			...tempArticleState,
			fontColor: selectedColor,
		});
	}

	const handleBackgroundColorChange = (selectedBackgroundColor: OptionType) => {
		setTempArticleState({
			...tempArticleState,
			backgroundColor: selectedBackgroundColor,
		})
	}

	const handleContentWidth = (selectedWidth: OptionType) => {
		setTempArticleState({
			...tempArticleState,
			contentWidth: selectedWidth,
		})
	}

	const handleApplyChanges = (event: React.FormEvent) => {
		event.preventDefault();
		setCurrentArticleState({
			...tempArticleState,
		});
	}

	const handleResetChanges = (event: React.FormEvent) => {
		event.preventDefault();
		setTempArticleState({
			...defaultArticleState,
		})
		setCurrentArticleState({
			...defaultArticleState,
		})
	}
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggleForm} />
			<aside ref={sidebarRef} className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={handleApplyChanges} onReset={handleResetChanges}>
					<div className={styles.formContainer}>
						<Select
						selected={tempArticleState.fontFamilyOption}
						options={fontFamilyOptions}
						placeholder='Выберите шрифт'
						onChange={handleFontFamilyChange}
						title='Шрифт'
						/>
						<RadioGroup
						name="fontSize"
						selected={tempArticleState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleFontSizeChange}
						title='Размер шрифта'
						/>
						<Select
						selected={tempArticleState.fontColor}
						options={fontColors}
						placeholder='Выберите цвет шрифта'
						onChange={handleFontColorChange}
						title='Цвет шрифта'
						/>
						<Separator />
						<Select
						selected={tempArticleState.backgroundColor}
						options={backgroundColors}
						placeholder='Выберите цвет фона'
						onChange={handleBackgroundColorChange}
						title='Цвет фона'
						/>
						<Select
						selected={tempArticleState.contentWidth}
						options={contentWidthArr}
						placeholder='Выберите ширину контента'
						onChange={handleContentWidth}
						title='Ширина контента'
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
