import * as React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'style/styleUtils';
import Textarea from 'react-textarea-autosize';

import Progress from './Progress';

const Wrapper = styled.div`
	position: relative;
	width: 768px;
	margin: 0 auto;
	padding: 1rem;
	background: ${oc.gray[7]};
	${shadow(1)};

	@media ${media.laptopS} {
		width: 736px;
	}

	@media ${media.tablet} {
		width: 100%;
	}
`;

const StyledTextarea = styled(Textarea)`
	width: 100%;
	background: transparent;
	border: none;
	resize: none;
	outline: none;
	font-size: 1.5rem;
	font-weight: 800;
	color: white;
	&::placeholder {
		color: ${oc.gray[3]};
	}

	@media ${media.tablet} {
		font-size: 1rem;
	}
`;

interface IProps {
	value: string;
	inputRef?: any;
	onPost(): void;
	onChange(e: React.ChangeEvent<HTMLTextAreaElement>): void;
	onPaste(e: React.ClipboardEvent<HTMLTextAreaElement>): void;
}

const WritePost: React.SFC<IProps> = ({ value, onChange, onPost, onPaste, inputRef }) => {

	return (
		<Wrapper>
			<StyledTextarea
				onChange={onChange}
				value={value}
				minRows={3}
				maxRows={10}
				placeholder={`의식의 흐름대로 적어보세요, \n1초이상 아무것도 입력하지 않으면 자동으로 포스팅 됩니다.`}
				onPaste={onPaste}
				inputRef={inputRef}
			/>
			<Progress onPost={onPost} value={value} />
		</Wrapper>
	);
};

export default WritePost;