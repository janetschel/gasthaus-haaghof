import {ReviewType} from "../../../types/google/ReviewType";
import styled from "@emotion/styled";
import {Rating, Typography} from "@mui/material";
import React, {ReactElement, useState} from "react";
import {ExpandableReviewDialog} from "./ExpandableReviewDialog";
import {StringUtils} from "../../../utils/string";

interface ReviewData {
    review: ReviewType;
    index: number
}

export const Review = ({ review, index } : ReviewData) => {
    const [open, setOpen] = useState(false);

    const handleExpand = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const formatText = (): ReactElement => {
        return(
            <>
                <Typography gridArea="text"><i>{StringUtils.substr(review.text, 200)}</i></Typography>
                { review.text.length > 200 && <a onClick={handleExpand}>Mehr lesen</a> }
            </>
        );
    };

    return(
        <>
            <StyledReview className={`${index}`}>
                <Typography gridArea="name">{review.authorName}</Typography>
                <Rating value={review.rating} readOnly style={{ justifySelf: "end" }}/>
                {formatText()}
            </StyledReview>

            <ExpandableReviewDialog
                open={open}
                handleClose={handleClose}
                review={review}
            />
        </>
    );
};



const StyledReview = styled.div`
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-template-rows: repeat(2, auto);
    grid-template-areas: "name rating" "text text" "more more";
    gap: 1rem;
    
    > a {
        color: black;
        text-decoration: underline;
        grid-area: more;
    }
    
    > a:hover {
        cursor: pointer;
    }
`;
