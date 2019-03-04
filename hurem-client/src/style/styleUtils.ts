import { css } from 'styled-components';

const size = {
	desktop: '2560px',
	laptopL: '1440px',
	laptopM: '1200px',
	laptopS: '1024px',
	tablet: '768px',
	mobileL: '425px',
	mobileM: '375px',
	mobileS: '320px',
};

export const media = {
	desktop: `(max-width: ${size.desktop})`,  // 2560px;
	laptopL: `(max-width: ${size.laptopL})`, // 1440px;
	laptopM: `(max-width: ${size.laptopM})`, // 1200px;
	laptopS: `(max-width: ${size.laptopS})`, // 1024px;
	tablet: `(max-width: ${size.tablet})`,
	mobileL: `(max-width: ${size.mobileL})`,
	mobileM: `(max-width: ${size.mobileM})`,
	mobileS: `(max-width: ${size.mobileS})`,
};

// 그림자 효과: https://codepen.io/sdthornton/pen/wBZdXq 기반
export const shadow = (weight: number) => {
	const shadows = [
		css`box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);`,
		css`box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);`,
		css`box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);`,
		css`box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);`,
		css`box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);`
	];

	return shadows[weight];
};