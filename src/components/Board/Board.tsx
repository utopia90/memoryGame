
import React from 'react'
import { MainBoard } from './Board.styles'



interface Props {
    children: React.ReactNode;
  }

  export const Board: React.FC<Props> = ({children}) => {

    return <MainBoard>{children}</MainBoard>
  }