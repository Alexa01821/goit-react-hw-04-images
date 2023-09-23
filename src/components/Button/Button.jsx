import { LoadMoreBtn } from "./ButtonStyled"

export const Button = ({getMorePhoto}) => {
  return (
    <LoadMoreBtn onClick={getMorePhoto}>
        Load more
    </LoadMoreBtn>
  )
}
