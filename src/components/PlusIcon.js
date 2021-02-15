import React from "react";
import { FaPlus } from "react-icons/fa";
import styled from "styled-components/macro";

export const PlusIcon = () => {
  return <Icon />;
};

const Icon = styled(FaPlus)`
  width: 26px;

  @media (min-width: 768px) {
    width: 30px;
  }
`;
