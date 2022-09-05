import React from "react";
import styled from "styled-components";
import { WEAHTER } from "../../utils/weatherData";

interface Props {
	onGetWeather: (weather: number) => void;
	selectedWeather: number;
}

const SelectWeather = ({ onGetWeather, selectedWeather }: Props) => {
	return (
		<RadioWrapperTag>
			{WEAHTER.map(({ id, value, icon, text }) => (
				<label htmlFor={id} key={id}>
					<input
						type="radio"
						id={id}
						name="weather"
						value={value}
						checked={selectedWeather=== value}
						onChange={()=>onGetWeather(value)}
					/>
					<div>
						<abbr title={text}>{icon}</abbr>
						<span>{text}</span>
					</div>
				</label>
			))}
		</RadioWrapperTag>
	);
};

export default SelectWeather;

const RadioWrapperTag = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	flex: 2;
	height: 100%;
	justify-content: space-between;
	column-gap: 0.5em;
	min-width: min-content;
	label {
		position: relative;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		input {
			position: relative;
			z-index: 1;
			appearance: none;
			display: none;
		}
		div {
			display: flex;
			align-items: center;
			justify-content: center;
			column-gap: 0.5em;
			padding: 0.3em;
			background-color: white;
			border-radius: 5px;
			box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
			font-size: 1.1rem;
			width: 100%;
			height: 100%;
			@media screen and (min-width: 768px) {
				font-size: 1.25rem;
			}
			@media screen and (min-width: 1024px) {
				font-size: 1.5rem;
			}
			abbr {
				text-decoration: none;
			}
			span {
				font-size: 0.5rem;
				@media screen and (max-width: 600px) {
					display: none;
				}
				@media screen and (min-width: 820px) {
					font-size: 0.75rem;
				}
				@media screen and (min-width: 1024px) {
					font-size: 1rem;
				}
			}
		}
		input:checked ~ div {
			transition: all 0.5s;
			box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
			background-color: skyblue;
			color: white;
		}
	}
`;
