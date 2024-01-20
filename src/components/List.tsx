import styled from "@emotion/styled";
import React, { FC, useEffect, useRef, useState } from "react";
import { Item } from "./Item";
import { SafelyRenderChildren } from "./SafelyRenderChildren";
import { useScrollPosition } from "../hooks/useScrollPosition";

const itemHeight = 30;
const visibleListSize = 1000;

const ScrollWrapper = styled.div`
	border: 1px solid black;
	width: 100%;
	height: 100%;
	height: 500px;
	overflow: auto;
`;

export interface ListProps {
	items: string[];
}

export const List: FC<ListProps> = ({ items, children }) => {
	const totalListHeight = itemHeight * items.length;
	let ListWrapper = styled.ul`
		margin: 0;
		padding: 0;
		position: relative;
		height: ${totalListHeight}px;
	`;

	const scrollWrapperRef = useRef();
	const position = useScrollPosition(scrollWrapperRef);
	const [start, setStart] = useState(0);

	useEffect(() => {
		// approximately calculate the current top item offset
		const relativeScrollbarPosition = position / totalListHeight;
		const currentTop = Math.floor(items.length * relativeScrollbarPosition);

		// if current top element is too far from the start of the visible list then find new start position
		// in this case, i am setting (visibleListSize / 2) to be the threshold of "too far"
		if (
			!Number.isNaN(currentTop) &&
			Math.abs(currentTop - start) >= visibleListSize / 2
		) {
			setStart(Math.max(0, currentTop - visibleListSize / 2));
		}
	}, [position]);

	return (
		<ScrollWrapper ref={scrollWrapperRef}>
			<ListWrapper style={{ paddingTop: `${itemHeight * start}px` }}>
				{/**
				 * Note: `SafelyRenderChildren` should NOT be removed while solving
				 * this interview. This prevents rendering too many list items and
				 * potentially crashing the web page. This also enforces an artificial
				 * limit (visibleListSize) to the amount of children that can be rendered at one
				 * time during virtualization.
				 */}
				<SafelyRenderChildren>
					{items.slice(start, start + visibleListSize).map((word) => (
						<Item key={word}>{word}</Item>
					))}
				</SafelyRenderChildren>
			</ListWrapper>
		</ScrollWrapper>
	);
};
