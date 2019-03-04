import * as React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import CommentList from './CommentList';

const Wrapper = styled.div`
	background-color: ${oc.gray[0]};
`;

const InputWrapper = styled.div`
	padding: 0.75rem;
`;

const Input = styled.input`
	display: block;
	background: none;
	outline: none;
	border: none;
	font-size: 0.8rem;
	width: 100%;
	padding-bottom: 0.25rem;
	border-bottom: 1px solid ${oc.gray[5]};

	&:focus {
		border-bottom: 1px solid ${oc.cyan[5]};
	}

	&::placeholder {
		text-align: center;
		color: ${oc.gray[5]};
	}
`;

interface IProps {
	value: string;
	comments: any[];
	onKeyPress(e: React.KeyboardEvent<HTMLInputElement>): void;
	onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

const CommentBlock: React.SFC<IProps> = ({ value, onChange, onKeyPress, comments }) => (
	<Wrapper>
		<InputWrapper>
			<Input
				value={value}
				onChange={onChange}
				onKeyPress={onKeyPress}
				placeholder="덧글을 입력 후 [Enter]를 눌러 작성하세요"
			/>
			<CommentList comments={comments}/>
		</InputWrapper>
	</Wrapper>
);

export default CommentBlock;