import React from "react";
import styled from "styled-components/macro";
import { FaPlus } from "react-icons/fa";

export const PlusIcon = () => {
  return <Icon />;
};

const Icon = styled(FaPlus)`
  width: 26px;

  @media (min-width: 768px) {
    width: 30px;
  }
`;
